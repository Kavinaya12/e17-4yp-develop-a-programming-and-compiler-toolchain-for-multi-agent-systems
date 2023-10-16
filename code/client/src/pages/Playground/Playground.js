import React from "react";
// import BlocklyPlayground from "../../components/BlocklyPlayground/BlocklyPlayground";
import BlocklyComponent, {
  Block,
  Value,
  Field,
  Shadow,
  Category,
} from "../../components/BlocklyComponent";
import * as libraryBlocks from "blockly/blocks";
import { useSelector } from "react-redux";

function Playground() {
  const { generatedXmlCode } = useSelector((state) => state.firmware);

  // const [inbuiltAlgorithm, setInbuiltAlgorithm] = useState(false);

  const initialXml = `<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="s]bRmbZ++\`1c?{z!/d_:">ROBOT_STATE</variable>
    <variable id="runState">runState</variable>
    <variable id="state">state</variable>
    <variable id="x$leYs{fIiSO1QApRb*c">interrupt</variable>
    <variable id="msg">msg</variable>
    <variable>d</variable>
    <variable>isTaskFound</variable>
    <variable id="rand">rand</variable>
    <variable id="responseThresholdRed">responseThresholdRed</variable>
    <variable id="responseThresholdBlue">responseThresholdBlue</variable>
    <variable id="responseThresholdBlueNext">responseThresholdBlueNext</variable>
    <variable id="responseThresholdRedNext">responseThresholdRedNext</variable>
    <variable id="estimatedTaskDemandForRed">estimatedTaskDemandForRed</variable>
    <variable id="estimatedTaskDemandForBlue">estimatedTaskDemandForBlue</variable>
    <variable id="estimatedTaskSupplyForRed">estimatedTaskSupplyForRed</variable>
    <variable id="estimatedTaskSupplyForBlue">estimatedTaskSupplyForBlue</variable>
    <variable id="taskSelectionProbabilityRed">taskSelectionProbabilityRed</variable>
    <variable id="taskSelectionProbabilityBlue">taskSelectionProbabilityBlue</variable>
    <variable id="robotId">robotId</variable>
    <variable id="selectedTask">selectedTask</variable>
    <variable id="fixedQueueLength">fixedQueueLength</variable>
    <variable id="scalingFactor">scalingFactor</variable>
    <variable id="taskDemandQueue">taskDemandQueue</variable>
    <variable id="taskSupplyQueue">taskSupplyQueue</variable>
    <variable id="taskDemandsFloatArray">taskDemandsFloatArray</variable>
    <variable id="detectedColor">detectedColor</variable>
    <variable id="taskSuppliesFloatArray">taskSuppliesFloatArray</variable>
    <variable id="outputs">outputs</variable>
    <variable id="defaultMoveSpeed">defaultMoveSpeed</variable>
  </variables>
  <block type="procedures_defnoreturn" id="zfserX5aCGAE:_V]Uq8|" x="316" y="31">
    <field name="NAME">algorithm_setup</field>
    <comment pinned="false" h="80" w="160">Describe this function...</comment>
    <statement name="STACK">
      <block type="serial_print" id="[VfaL~(d|rSee|Gn]GkT">
        <field name="msg">algorithm: setup</field>
        <next>
          <block type="neo_color_wave" id="TD/QUmbC5]_](A+90zlv">
            <field name="dtext1">NeoPixel colorwave</field>
            <field name="color_input">100, 100, 100</field>
          </block>
        </next>
      </block>
    </statement>
  </block>
  <block type="procedures_defnoreturn" id="l@{)$#Rw]5D!F@:nM64T" x="584" y="29">
    <field name="NAME">algorithm_start</field>
    <comment pinned="false" h="80" w="160">Describe this function...</comment>
    <statement name="STACK">
      <block type="serial_print" id="qxwMH}D}#fBe6b.5!0^5">
        <field name="msg">algorithm: start</field>
        <next>
          <block type="variables_set" id="u6E\`0xQiSuF[:wi;\`F5s">
            <field name="VAR" id="s]bRmbZ++\`1c?{z!/d_:">ROBOT_STATE</field>
            <value name="VALUE">
              <block type="math_number" id="aZ\`b6~1n,]3)]fxcu5J,">
                <field name="NUM">0</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    </statement>
  </block>
  <block type="procedures_defnoreturn" id="J{]83tn3#1E%7y-2^mW}" x="864" y="23">
    <field name="NAME">algorithm_stop</field>
    <comment pinned="false" h="80" w="160">Describe this function...</comment>
    <statement name="STACK">
      <block type="serial_print" id="t24Ia}-aa$4Dvi]vPX%_">
        <field name="msg">algorithm: stop</field>
        <next>
          <block type="variables_set" id=",6bJB[!f^qD*._e)z:=k">
            <field name="VAR" id="s]bRmbZ++\`1c?{z!/d_:">ROBOT_STATE</field>
            <value name="VALUE">
              <block type="math_number" id="fCq9A;lkam9R)LoeUaTL">
                <field name="NUM">10</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    </statement>
  </block>
  <block type="procedures_defnoreturn" id="zcJoyX5aCGZE:_V]Uq8|" x="588" y="145">
    <field name="NAME">algorithm_reset</field>
    <comment pinned="false" h="80" w="160">Describe this function...</comment>
    <statement name="STACK">
      <block type="serial_print" id=",%$n;2VU[ule:XXG7)mS">
        <field name="msg">algorithm: reset</field>
        <next>
          <block type="variables_set" id="EUA8MNCiL}n(HqC\`.tSr">
            <field name="VAR" id="s]bRmbZ++\`1c?{z!/d_:">ROBOT_STATE</field>
            <value name="VALUE">
              <block type="math_number" id="9ro+5R+*Yj|:_zKcr*;-">
                <field name="NUM">1</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    </statement>
  </block>
  <block type="procedures_defnoreturn" id="Qx\`{\`{8nF9#J$qJ)8)lB" x="873" y="146">
    <field name="NAME">algorithm_execute</field>
    <comment pinned="false" h="80" w="160">Describe this function...</comment>
    <statement name="STACK">
      <block type="serial_print" id="|;wv;a=c3;h\`A.b3-4E/">
        <field name="msg">algorithm: execute</field>      
      </block>
    </statement>
  </block>
  <block type="algorithm" id="^p}^aaT[%+\`,i9VU(A)Y" x="127" y="255">
    <field name="algorithm_name">dynamic_task_allocation</field>
    <field name="superClass_name">Define Super Class Name Here</field>
    <field name="virtualRobot_name">Define Child Class Name Here</field>
    <field name="robot_state_label" id="s]bRmbZ++\`1c?{z!/d_:">ROBOT_STATE</field>
    <field name="robot_state_value">1</field>
    <field name="isTaskFound">isTaskFound</field>
    <field name="responseThresholdRed_label" id="responseThresholdRed">responseThresholdRed</field>
    <field name="responseThresholdBlue_label" id="responseThresholdBlue">responseThresholdBlue</field>
    <field name="responseThresholdRedNext_label" id="responseThresholdRedNext">responseThresholdRedNext</field>
    <field name="responseThresholdBlueNext_label" id="responseThresholdBlueNext">responseThresholdBlueNext</field>
    <field name="estimatedTaskDemandForRed_label" id="estimatedTaskDemandForRed">estimatedTaskDemandForRed</field>
    <field name="estimatedTaskDemandForBlue_label" id="estimatedTaskDemandForBlue">estimatedTaskDemandForBlue</field>
    <field name="estimatedTaskSupplyForRed_label" id="estimatedTaskSupplyForRed">estimatedTaskSupplyForRed</field>
    <field name="estimatedTaskSupplyForBlue_label" id="estimatedTaskSupplyForBlue">estimatedTaskSupplyForBlue</field>
    <field name="taskSelectionProbabilityRed_label" id="taskSelectionProbabilityRed">taskSelectionProbabilityRed</field>
    <field name="taskSelectionProbabilityBlue_label" id="taskSelectionProbabilityBlue">taskSelectionProbabilityBlue</field>
    <field name="robotId_label" id="robotId">robotId</field>
    <field name="selectedTask_label" id="selectedTask">selectedTask</field>
    <field name="fixedQueueLength_label" id="fixedQueueLength">fixedQueueLength</field>
    <field name="fixedQueueLength_value">5</field>
    <field name="scalingFactor_label" id="scalingFactor">scalingFactor</field>
    <field name="scalingFactor_value">0.015</field>
    <field name="taskDemandQueue_label" id="taskDemandQueue">taskDemandQueue</field>
    <field name="taskSupplyQueue_label" id="taskSupplyQueue">taskSupplyQueue</field>
    
    <statement name="algo_body">
      <block type="controls_if" id="=4kTK+MPC(%=/uZS6_A}">
        <mutation elseif="1" else="1"></mutation>
        <value name="IF0">
          <block type="logic_compare" id="d%{shr+U]1],FQR:j+2P">
            <field name="OP">EQ</field>
            <value name="A">
              <block type="variables_get" id="=4~h]lG^?vDJm?fk=hOe">
                <field name="VAR" id="s]bRmbZ++\`1c?{z!/d_:">ROBOT_STATE</field>
              </block>
            </value>
            <value name="B">
              <block type="math_number" id="_^Mp:]tiu+o6ktoK52;u">
                <field name="NUM">0</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO0">
          <block type="procedures_callnoreturn" id="MyZNMgTN:b?ci|vV1DNj">
            <mutation name="algorithm_execute"></mutation>
            <next>
              <block type="delay" id="j*xQRW5EQMB8QM:WnR}^">
                <field name="delay_s">50</field>
              </block>
            </next>
          </block>
        </statement>
        <value name="IF1">
          <block type="logic_compare" id="d1sw^kc7g~76A(q+JVc|">
            <field name="OP">EQ</field>
            <value name="A">
              <block type="variables_get" id="^A;L^1Uex#~(2GsxW2(e">
                <field name="VAR" id="s]bRmbZ++\`1c?{z!/d_:">ROBOT_STATE</field>
              </block>
            </value>
            <value name="B">
              <block type="math_number" id="eDuJ1n)YV_40B|DQS,8j">
                <field name="NUM">1</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO1">
          <block type="procedures_callnoreturn" id="3*$GKuhiib(7iZ,?W|[P">
            <mutation name="algorithm_setup"></mutation>
            <next>
              <block type="variables_set" id="\`8:h:pYq0F2Dihiq\`pHa">
                <field name="VAR" id="s]bRmbZ++\`1c?{z!/d_:">ROBOT_STATE</field>
                <value name="VALUE">
                  <block type="math_number" id="!TxGb=Gt6=\`dLJFg|\`NX">
                    <field name="NUM">10</field>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </statement>
        <statement name="ELSE">
          <block type="delay" id="f=Y{\`}AL%qW,OkncggP%">
            <field name="delay_s">100</field>
          </block>
        </statement>
      </block>
    </statement>
  </block>
  <block type="algorithm_interrupt" id=":Ri6n|XI#ytiol.L|cNq" x="788" y="407">
    <field name="interrupt_variable" id="x$leYs{fIiSO1QApRb*c">interrupt</field>
    <field name="msg_variable" id="C}k8;%~r]6mMiJiCA2b%">msg</field>
  </block>
</xml>`;

  return (
    <div className="mt-5 mb-5">
      {/* <BlocklyPlayground /> */}

      <BlocklyComponent
        readOnly={false}
        trashcan={true}
        media={"https://blockly-demo.appspot.com/static/media/"}
        move={{
          scrollbars: true,
          drag: true,
          wheel: true,
        }}
        grid={{
          spacing: 20,
          length: 1,
          colour: "#434343",
          snap: false,
        }}
        zoom={{
          controls: true,
          wheel: true,
          startScale: 1,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
        }}
        initialXml={generatedXmlCode ? generatedXmlCode : initialXml}
      >
        <Category name="Behavioural">
          <Category name="Atomic">
            <Block type="move_random" />
            <Block type="assign_task" />
            <Block type="move_back" />
            <Block type="move_forward" />
            <Block type="move_turn" />

            <Block type="show_selected_task" />
          </Category>
          <Category name="Pair">
            <Block type="collision_avoidance" />
          </Category>
          <Category name="Cluster">
            <Block type="observe_environment" />
            <Block type="observe" />
            <Block type="evaluate_task_demand" />
            <Block type="evaluate_task_supply" />
            <Block type="select_task" />
            <Block type="add_supply" />
          </Category>
        </Category>

        <Category name="General">
          <Category name="Logic">
            <Block type="logic_compare" />
            <Block type="logic_operation" />
            <Block type="logic_negate" />
            <Block type="logic_boolean" />
            <Block type="logic_null" />
            <Block type="logic_ternary" />
          </Category>

          <Category name="Algorithm">
            <Block type="algorithm" />
            <Block type="algorithm_interrupt" />
            <Block type="simple_algorithm" />
          </Category>
          <Category name="Control Flow">
            <Block type="controls_if" />
            <Block type="delay" />
          </Category>
          <Category name="MQTT">
            <Block type="check_mqtt_messages" />
            <Block type="publish" />
            <Block type="publish_with_content" />
            <Block type="subscribe" />
          </Category>
          <Category name="Variables">
            {/* <Block type="serial_print" /> */}
            <Block type="variables_init"></Block>
            <Block type="variables_get"></Block>
            <Block type="variables_set"></Block>
            <Block type="set_variable_with_type"></Block>
            <Block type="init_object"></Block>
            <Block type="init_variable_with_object"></Block>
          </Category>

          <Category name="String">
            <Block type="text" />
            <Block type="text_multiline" />
            <Block type="text_join" />
            <Block type="text_create_join_container" />
            <Block type="text_create_join_item" />
            <Block type="text_append" />
            <Block type="text_length" />
            <Block type="text_isEmpty" />
            <Block type="text_indexOf" />
            <Block type="text_charAt" />
            <Block type="text_getSubstring" />
            <Block type="text_changeCase" />
            <Block type="text_replace" />
            <Block type="text_reverse" />
          </Category>

          <Category name="Math">
            <Block type="math_number"></Block>
            <Block type="math_arithmetic"></Block>
            <Block type="math_trig"></Block>
            <Block type="math_number_property"></Block>
            <Block type="math_change"></Block>
            <Block type="math_constant"></Block>
            <Block type="math_round"></Block>
            <Block type="math_modulo"></Block>
            <Block type="math_constrain"></Block>
            <Block type="math_random_float"></Block>
          </Category>
          <Category name="Functions" custom="PROCEDURE"></Category>

          <Category name="ESP">
            <Block type="chip_id"></Block>
          </Category>
        </Category>

        <Category name="I/O">
          <Category name="Inputs">
            <Block type="color_sensor_reading" />
          </Category>

          <Category name="Motors">
            <Block type="drive_motors" />
            <Block type="motors_stop" />
          </Category>

          <Category name="Outputs">
            <Block type="serial_print" />
            <Block type="neo_color_wave" />
          </Category>
        </Category>

        {/* <Category name="InBuilt Algorithms">
          {Array.from({ length: 2 }).map((_, index) => {
            return <Block type={`algorithm_${index}`}></Block>;
          })}
        </Category> */}
      </BlocklyComponent>
    </div>
  );
}

export default Playground;
