import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlgorithmName,
  setGeneratedCppCode,
  setGeneratedXmlCode,
  setGeneratedJavaCode,
  setGeneratedCode,
  setSelectedLanguage,
  changeSelectedLanguage,
  setIsInbuiltAlgorithm,
  algorithmName,
} from "../../Redux/FirmwareFile";
import { increase } from "../../Redux/CodeGenSteps";
import { StepForwardOutlined } from "@ant-design/icons";
import { Row } from "reactstrap";
import { algorithms } from "../../InBuiltAlgorithms/InBuiltAlgorithms";

import Blockly from "blockly/core";
import locale from "blockly/msg/en";

import "./generator/all";
import "./java_generator/all";

import "./custom-blocks";
import cppGen from "./generator/cpp";
import javaGen from "./java_generator/java";

import { Button, Select } from "antd";

Blockly.setLocale(locale);

function BlocklyComponent(props) {
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();

  // redux related variables
  const dispatch = useDispatch();
  const { selectedLanguage, isInbuiltAlgorithm } = useSelector(
    (state) => state.firmware
  );
  //const [selectedLanguage, setSelectedLanguage] = useState('cpp'); // Initialize with 'cpp'

  const [selectedAlgorithm, setSelectedAlgorithm] = useState(
    algorithmName || "None"
  );
  const [error, setError] = useState(false);

  const handleSelectAlgorithm = (value) => {
    dispatch(setAlgorithmName(value));
    setSelectedAlgorithm(value);
  };

  const handleLanguageChange = (value) => {
    dispatch(setSelectedLanguage(value));
  };

  const handleNext = (selectedLanguage) => {
    if (isInbuiltAlgorithm && selectedAlgorithm === "None") setError(true);
    else {
      if (isInbuiltAlgorithm) dispatch(setAlgorithmName(selectedAlgorithm));
      else {
        generateCode(selectedLanguage);
        generateXML();
      }
      dispatch(increase());
      dispatch(changeSelectedLanguage(selectedLanguage));
    }
  };

  const generateCode = (selectedLanguage) => {
    // Initialize the corresponding code generator based on the selected language
    const codeGen = selectedLanguage === "cpp" ? cppGen : javaGen;
    //cppGen.init(primaryWorkspace.current);
    codeGen.init(primaryWorkspace.current);
    //var code = cppGen.workspaceToCode(primaryWorkspace.current);
    var generatedcode = codeGen.workspaceToCode(primaryWorkspace.current);
    //console.log(javacode);

    const algorithmName = codeGen.algorithm_;
    const inbuiltAlgorithm = codeGen.inbuilt_algorithm ? true : false;

    dispatch(setAlgorithmName(algorithmName)); // set algorithm name in redux state
    dispatch(
      setGeneratedCode(
        isInbuiltAlgorithm
          ? algorithms.find((algo) => algo.className === algorithmName).code
          : generatedcode
      )
    ); // set generated cpp code in redux state
    dispatch(setIsInbuiltAlgorithm(inbuiltAlgorithm));
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
    dispatch(setGeneratedXmlCode(xmlText)); // set generated xml code in redux state
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

    try {
      // Set up the change listener here, inside the useEffect.
      primaryWorkspace.current.addChangeListener(function (event) {
        if (event.type === Blockly.Events.SELECTED) {
          var selectedBlock = primaryWorkspace.current.getBlockById(
            event.newValue
          );
          if (selectedBlock && /^algorithm_\d+$/.test(selectedBlock.type)) {
            // A block with a type name like "algorithm_1", "algorithm_2", etc., is selected.
            // Now, you can disable and clear other selected blocks.
            console.log("disableAndClearOtherBlocks(selectedBlock)");
          }
        }
      });
    } catch (error) {
      // Handle any errors that occur during Blockly initialization.
      console.error("Error initializing Blockly:", error);
    }
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
        <div className="d-flex">
          <div>Next</div>
          <div style={{ marginTop: "-3px", marginRight: "3px" }}>
            <StepForwardOutlined />
          </div>
        </div>
      </Button>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {isInbuiltAlgorithm && (
          <Row
            xxl="6"
            xl="6"
            lg="6"
            md="6"
            sm="12"
            xs="12"
            align="middle"
            // justify="center"
          >
            <div
              className="d-flex"
              // justify="center"
              style={{ whiteSpace: "nowrap", marginRight: "100px" }}
            >
              <h6>Choose an Algorithm</h6>
            </div>
            <Select
              value={selectedAlgorithm}
              onChange={handleSelectAlgorithm}
              style={{
                minWidth: "200px",
                borderColor: error ? "red" : "",
              }}
            >
              {algorithms.map((i) => (
                <Option value={i.className}>{i.name}</Option>
              ))}
            </Select>
          </Row>
        )}
        {!isInbuiltAlgorithm && (
          <Button
            type="primary"
            onClick={() => {
              dispatch(setIsInbuiltAlgorithm(true));
              console.log(isInbuiltAlgorithm);
            }}
          >
            <div className="d-flex">
              <div>Choose an Inbuilt Algorithm</div>
            </div>
          </Button>
        )}
        {isInbuiltAlgorithm && (
          <Button
            type="primary"
            onClick={() => {
              dispatch(setIsInbuiltAlgorithm(false), setError(false));
            }}
            // style={{ marginLeft: "15px" }}
          >
            <div className="d-flex">
              <div>Develop an algorithm</div>
            </div>
          </Button>
        )}
      </div>
      {error && isInbuiltAlgorithm && (
        <div
          style={{
            color: "red",
            margin: "10px",
            marginRight: "250px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          Please select an algorithm name before proceeding.
        </div>
      )}
      <div
        style={{
          // backgroundColor: isInbuiltAlgorithm ? "lightgrey" : "transparent", // Grey with 50% opacity
          pointerEvents: isInbuiltAlgorithm ? "none" : "auto", // Disable clicking on contained elements
          zIndex: 999,
        }}
      >
        <div ref={blocklyDiv} id="blocklyDiv" />
        <div style={{ display: "none" }} ref={toolbox}>
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
}

export default BlocklyComponent;
