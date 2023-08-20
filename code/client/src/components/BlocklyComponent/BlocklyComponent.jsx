import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { setAlgorithmName, setGeneratedCppCode, setGeneratedXmlCode, setGeneratedJavaCode } from "../../Redux/FirmwareFile";
import { increase } from "../../Redux/CodeGenSteps";
import { StepForwardOutlined } from '@ant-design/icons'

import Blockly from "blockly/core";
import locale from "blockly/msg/en";

import "./generator/all";
import "./java_generator/all";

import "./custom-blocks";
import cppGen from "./generator/cpp";
import javaGen from "./java_generator/java"

import { Button, Select } from "antd";

Blockly.setLocale(locale);

function BlocklyComponent(props) {
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();

  // redux related variables
  const dispatch = useDispatch()

  const [selectedLanguage, setSelectedLanguage] = useState('cpp'); // Initialize with 'cpp'

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
  };

  const handleNext = (selectedLanguage) => {
    generateCode(selectedLanguage)
    generateXML()
    dispatch(increase())
  }

  const generateCode = (selectedLanguage) => {
    // Initialize the corresponding code generator based on the selected language
    const codeGen = selectedLanguage === 'cpp' ? cppGen : javaGen;
    //cppGen.init(primaryWorkspace.current);
    codeGen.init(primaryWorkspace.current);
    //var code = cppGen.workspaceToCode(primaryWorkspace.current);
    var generatedcode = codeGen.workspaceToCode(primaryWorkspace.current);
    //console.log(javacode);
    console.log(generatedcode);
    const algorithmName = codeGen.algorithm_
    dispatch(setAlgorithmName(algorithmName)) // set algorithm name in redux state
    dispatch(setGeneratedCppCode(generatedcode)) // set generated cpp code in redux state
    /*if (selectedLanguage === 'cpp') {
      dispatch(setGeneratedCppCode(generatedcode));
    } else if (selectedLanguage === 'java') {
      dispatch(setGeneratedJavaCode(generatedcode));
    }*/
    //console.log(code);
  };

  const generateXML = () => {
    var xmlDom = Blockly.Xml.workspaceToDom(primaryWorkspace.current);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    dispatch(setGeneratedXmlCode(xmlText)) // set generated xml code in redux state
    //console.log(xmlText);
  };

  useEffect(() => {
    const { initialXml, children, ...rest } = props;
    primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      ...rest,
    });

    if (initialXml) {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(initialXml),
        primaryWorkspace.current
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialXml]);

  const { Option } = Select;

  return (
    <React.Fragment>
      {/* Add dropdown or radio buttons for language selection */}
      <Select value={selectedLanguage} onChange={handleLanguageChange}>
        <Option value="cpp">C++</Option>
        <Option value="java">Java</Option>
      </Select>
      <Button type="primary" onClick={() => handleNext(selectedLanguage)}>
        <div className='d-flex'>
            <div>Next</div>
            <div style={{marginTop: '-3px', marginRight: '3px'}}><StepForwardOutlined /></div>
        </div>
      </Button>
      <div ref={blocklyDiv} id="blocklyDiv" />
      <div style={{ display: "none" }} ref={toolbox}>
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default BlocklyComponent;
