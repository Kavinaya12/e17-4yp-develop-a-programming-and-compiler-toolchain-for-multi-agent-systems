import Blockly from "blockly";
import { Names } from "blockly/core";
import cppGenerator from "../generator/cpp";
const NameType = Names.NameType;

Blockly.Blocks["delay"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Delay")
      .appendField(new Blockly.FieldNumber(0, 0), "delay_s");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Waits for number of seconds");
    this.setHelpUrl("");
  },
};

cppGenerator["delay"] = function (block) {
  var number_delay_s = block.getFieldValue("delay_s");
  var code = `delay(${number_delay_s});\n`;
  return code;
};

Blockly.Blocks["serial_print"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Serial Print")
      .appendField(new Blockly.FieldTextInput("msg"), "msg");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("Serial print");
    this.setHelpUrl("");
  },
};
cppGenerator["serial_print"] = function (block) {
  var text_msg = block.getFieldValue("msg");
  var code = `Serial.println("${text_msg}");\n`;
  return code;
};

Blockly.Blocks["move_random"] = {
  init: function () {
  this.appendDummyInput()
  .appendField("Random Movement")
  .appendField("Left")
  .appendField(new Blockly.FieldNumber(0), "left")
  .appendField("Right")
  .appendField(new Blockly.FieldNumber(0), "right")
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setColour(230);
  this.setTooltip("Performs random movement with the given parameters");
  this.setHelpUrl("");
  },
};
cppGenerator["move_random"] = function (block) {
  cppGenerator.definitions_[`include#atomic_behaviors`] = `#include "atomic_behaviours/atomic_behaviours.h"`;
  var left = block.getFieldValue("left");
  var right = block.getFieldValue("right");
  
  var code = `move_random(${left}, ${right}); `;
  return code;
  };

Blockly.Blocks["random_turn"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Random Turn")
      .appendField("Angle")
      .appendField(new Blockly.FieldNumber(0), "angle")
      .appendField("Delay (ms)")
      .appendField(new Blockly.FieldNumber(0), "delay_ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Performs a random turn with the given angle and delay");
    this.setHelpUrl("");
  },
};
cppGenerator["random_turn"] = function (block) {
  
  var angle = block.getFieldValue("angle");
  var delay_ms = block.getFieldValue("delay_ms");

  var code = `random_turn(${angle}, ${delay_ms});`;
  return code;
};
   
Blockly.Blocks["move_back"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Move Backward")
      .appendField("Left")
      .appendField(new Blockly.FieldNumber(0), "left")
      .appendField("Right")
      .appendField(new Blockly.FieldNumber(0), "right")
      .appendField("Delay (ms)")
      .appendField(new Blockly.FieldNumber(0), "delay_ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Moves backward with the given motor values and delay");
    this.setHelpUrl("");
  },
};
cppGenerator["move_back"] = function (block) {
  
  var left = block.getFieldValue("left");
  var right = block.getFieldValue("right");
  var delay_ms = block.getFieldValue("delay_ms");

  var code = `move_back(${left}, ${right}, ${delay_ms});`;
  return code;
};

Blockly.Blocks["read_distance"] = {
  init: function () {
    this.appendDummyInput().appendField("Read Distance");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Reads the distance and returns the value");
    this.setHelpUrl("");
  },
};
cppGenerator["read_distance"] = function (block) {
  cppGenerator.definitions_[
    `include#distance_read`
  ] = `#include "atomic_behaviours/atomic_behaviours.h"`;
  var code = `read_distance()`;
  return [code, cppGenerator.ORDER_ATOMIC];
};

Blockly.Blocks["collision_avoidance"] = {
  init: function () {
    this.appendDummyInput().appendField("Collision Avoidance");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

cppGenerator["collision_avoidance"] = function (block) {
  //var body = cppGenerator.statementToCode(block, "collision_avoidance_body");
  cppGenerator.definitions_[`include#pair_bahaviors`] = `#include "pair_behaviours/pair_behaviours.h"`;
  var code = `collision_avoidance();`;
  return code;
};

Blockly.Blocks["observe_environment"] = {
  init: function () {
    this.appendDummyInput().appendField("Observe Environment");
    this.setOutput(true, "Boolean");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

cppGenerator["observe_environment"] = function (block) {
  //var body = cppGenerator.statementToCode(block, "collision_avoidance_body");
  cppGenerator.definitions_[`include#cluster_bahaviors`] = `#include "cluster_behaviours/cluster_behaviours.h"`;
  var code = `observe_environment()`;
  return [code, cppGenerator.ORDER_ATOMIC];
};

Blockly.Blocks["assign_task"] = {
  init: function () {
    this.appendDummyInput().appendField("Assign Task");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

cppGenerator["assign_task"] = function (block) {
  
  var code = `assign_task();`;
  return code;
};


Blockly.Blocks["read_color"] = {
  init: function () {
    this.appendDummyInput().appendField("Read Color");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Reads the color and stores it in the provided variable");
    this.setHelpUrl("");
  },
};
cppGenerator["read_color"] = function (block) {
 
  var code = `read_color(&obsColor);`;
  return code;
};
/*
Blockly.Blocks["obs_color_variable"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("obsColor"), "VAR");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
// Generate the code for the obs_color_variable block
cppGenerator["obs_color_variable"] = function (block) {
  var variableName = block.getFieldValue("VAR");
  return [variableName, cppGenerator.ORDER_ATOMIC];
};*/

Blockly.Blocks["obs_color"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("obsColor")
      .appendField(new Blockly.FieldDropdown([
        ["R", "R"],
        ["G", "G"],
        ["B", "B"]
      ]), "color_property");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
cppGenerator["obs_color"] = function (block) {
  //var variableName = block.getFieldValue("VAR");
  var colorProperty = block.getFieldValue("color_property");
  var code = `obsColor.${colorProperty}`;
  return [code, cppGenerator.ORDER_ATOMIC];
};


Blockly.Blocks["drive_motors"] = {
  init: function () {
    this.appendDummyInput().appendField("Drive Motor");
    this.appendDummyInput()
      .appendField("left-motor-speed")
      .appendField(new Blockly.FieldNumber(0, 0, 255), "left-motor-speed");
    this.appendDummyInput()
      .appendField("right-motor-speed")
      .appendField(new Blockly.FieldNumber(0), "right-motor-speed");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Activate motor");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["motors_stop"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Stop Motors");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
cppGenerator["motors_stop"] = function (block) {
  cppGenerator.definitions_[
    `include#motors_stop`
  ] = `#include "modules/motors/motors.h"`;
  var code = `motors.stop();`;
  return code;
};

Blockly.Blocks["algorithm"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput("Algorithm"),
      "algorithm_name"
    );
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldVariable("ROBOT_STATE"),
        "robot_state_label"
      )
      .appendField(new Blockly.FieldNumber(0, 0, 10), "robot_state_value");
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldVariable("isTaskFound"),
        "isTaskFound"
      );
      //.appendField(new Blockly.FieldVariable("obsColor"), "VAR");
    /*this.appendDummyInput()
      .appendField(
        new Blockly.FieldVariable("obsColor"),
        "VAR"
      );*/
    this.appendStatementInput("algo_body")
      .setCheck(null)
      .appendField("algorithm_loop");
    // this.appendStatementInput("loop").setCheck(null).appendField("Loop");
    // this.appendStatementInput("interrupt")
    //   .setCheck(null)
    //   .appendField("Interrupt");
    // this.appendStatementInput("start").setCheck(null).appendField("Start");
    // this.appendStatementInput("reset").setCheck(null).appendField("Reset");
    // this.appendStatementInput("stop"delay).setCheck(null).appendField("Stop");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
cppGenerator["algorithm"] = function (block) {
  console.log(cppGenerator.nameDB_, NameType.VARIABLE);
  cppGenerator.definitions_[`include#algorithm`] = `#include "algorithm.h"`;
  cppGenerator.definitions_[`include#mqtt`] = `#include "mqtt/mqtt.h"`;
  var variable_name = cppGenerator.nameDB_.getName(
    block.getFieldValue("algorithm_name"),
    NameType.VARIABLE
  );
  cppGenerator.algorithm_ = variable_name;
  var variable_robot_state_label = cppGenerator.nameDB_.getName(
    block.getFieldValue("robot_state_label"),
    NameType.VARIABLE
  );
  console.log(variable_robot_state_label);
  var number_robot_state_value = block.getFieldValue("robot_state_value");
/*
  var variable_obsColor = cppGenerator.nameDB_.getName(
    block.getFieldValue("obsColor"),
    NameType.VARIABLE
  );
*/

  
  var variable_isTaskFound = cppGenerator.nameDB_.getName(
    block.getFieldValue("isTaskFound"),
    NameType.VARIABLE
  );

  var body = cppGenerator.statementToCode(block, "algo_body");
  // var statements_loop = cppGenerator.statementToCode(block, "loop");
  // var statements_interrupt = cppGenerator.statementToCode(block, "interrupt");
  // var statements_start = cppGenerator.statementToCode(block, "start");
  // var statements_stop = cppGenerator.statementToCode(block, "stop");
  // var statements_reset = cppGenerator.statementToCode(block, "reset");
  // TODO: Assemble JavaScript into code variable.
  var code = `
    int ${variable_robot_state_label} = ${number_robot_state_value};
    
    bool ${variable_isTaskFound};

    void algorithm_loop() {
      \t${body}
    }

  `;
  return code;
};

/*
cppGenerator["read_distance"] = function (block) {
  cppGenerator.definitions_[
    `include#distance_read`
  ] = `#include "atomic_behaviours/atomic_behaviours.h"`;
  var code = `
    motors.stop();
    int d = distance_read();
    Serial.printf("algo_dist: %d\\n", d);
    ${cppGenerator.INDENT}return d;
  `;
  return [code, cppGenerator.ORDER_ATOMIC];
};

cppGenerator["read_color"] = function (block) {
  var code = `
    motors.stop();
    color_t obsColor;
    color_read(&obsColor);
  `;
  return code;
};*/

Blockly.Blocks["variable"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("myVariable"), "varName")
      .appendField("variable of type")
      .appendField(
        new Blockly.FieldDropdown([
          ["int", "int"],
          ["flot", "flot"],
          ["double", "double"],
        ]),
        "variableType"
      )
      .appendField("initialized to");
    this.appendValueInput("initValue").setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, [
      "variable",
      "class-instance-variable",
      "object-pointer",
    ]);
    this.setNextStatement(true, [
      "variable",
      "class-instance-variable",
      "object-pointer",
    ]);
    this.setColour(290);
    this.setTooltip("tooltip");
    this.setHelpUrl("https://github.com/dineshLL/lisa/wiki");
  },
};

/**
 * Parameter block definition
 * @type {{init: Blockly.Blocks.parameter.init}}
 */
Blockly.Blocks["parameter"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ["int", "int"],
          ["float", "float"],
          ["double", "double"],
          ["char", "char"],
          ["char[]", "char[]"],
          ["real", "real"],
        ]),
        "NAME"
      )
      .appendField("parameter as")
      .appendField(
        new Blockly.FieldTextInput("parameter-name"),
        "parameter-name"
      );
    this.setPreviousStatement(true, "parameter");
    this.setNextStatement(true, "parameter");
    this.setColour(230);
    this.setTooltip("Passed param");
  },
};

Blockly.Blocks["boolean_input"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput("default"),
      "NAME"
    );
    this.setOutput(true, "Number");
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("https://github.com/dineshLL/lisa/wiki");
  },
};

Blockly.Blocks["boolean_input"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput("default"),
      "NAME"
    );
    this.setOutput(true, "Number");
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("http://www.example.com/");
  },
};

/**
 * Object variable block definition
 * @type {{init: Blockly.Blocks.objectVariable.init}}
 */

Blockly.Blocks["class-instance-variable"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("instance of")
      .appendField(new Blockly.FieldDropdown([["", ""]]), "class_name")
      .appendField("as")
      .appendField(new Blockly.FieldTextInput("variable"), "variable_name");
    this.setPreviousStatement(true, [
      "class-instance-variable",
      "object-pointer",
      "variable",
    ]);
    this.setNextStatement(true, [
      "class-instance-variable",
      "object-pointer",
      "variable",
    ]);
    this.setColour(260);
    this.setTooltip("");
  },
};

/**
 * Pointer  block definition
 * @type {{init: Blockly.Blocks.objectVariable.init}}
 */

Blockly.Blocks["object-pointer"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("myVariable"), "pointer_name")
      .appendField("pointer of object")
      .appendField(new Blockly.FieldTextInput("className"), "class_name");
    this.setPreviousStatement(true, [
      "object-pointer",
      "class-instance-variable",
      "variable",
    ]);
    this.setNextStatement(true, [
      "object-pointer",
      "class-instance-variable",
      "variable",
    ]);
    this.setColour(20);
    this.setTooltip("");
  },
};

Blockly.Blocks["variables_init"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldLabelSerializable("Initialize variable"),
        "dtext1"
      )
      .appendField(new Blockly.FieldVariable("item"), "var_name")
      .appendField("of type")
      .appendField(
        new Blockly.FieldDropdown([
          ["int", "int"],
          ["float", "float"],
          ["double", "double"],
        ]),
        "var_type"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

cppGenerator["variables_init"] = function (block) {
  var variable_var_name = cppGenerator.nameDB_.getName(
    block.getFieldValue("var_name"),
    NameType.VARIABLE
  );
  var dropdown_var_type = block.getFieldValue("var_type");
  var initialValue;
  switch (dropdown_var_type) {
    case "int":
      initialValue = 0;
      break;
    case "double":
      initialValue = 0;
      break;
    case "float":
      initialValue = 0;
      break;
    case "string":
      initialValue = "";
      break;
    default:
      initialValue = null;
      break;
  }
  var code = `${dropdown_var_type} ${variable_var_name} ${
    initialValue !== null ? ` = ${initialValue};` : ";"
  }\n`;
  return code;
};

Blockly.Blocks["neo_color_wave"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldLabelSerializable("NeoPixel colorwave"),
        "dtext1"
      )
      .appendField(
        new Blockly.FieldDropdown([
          ["Red", "100, 0, 0"],
          ["Green", "0, 100, 0"],
          ["White", "100, 100, 100"],
          ["Yellow", "100, 100, 0"],
        ]),
        "color_input"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(15);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

cppGenerator["neo_color_wave"] = function (block) {
  cppGenerator.definitions_[
    `include#neo_color_wave`
  ] = `#include "modules/neopixel/neopixel.h"`;
  var dropdown_color_input = block.getFieldValue("color_input");
  var neopixelDefStart = `#ifdef NEOPIXEL_INDICATIONS`;
  var neopixelDefEnd = `#endif\n`;
  var code = `
    ${neopixelDefStart}
    \tpixelColorWave(${dropdown_color_input});
    ${neopixelDefEnd}
  `;
  return code;
};

Blockly.Blocks["algorithm_interrupt"] = {
  init: function () {
    this.appendDummyInput().appendField("algorithm_interrupt");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("robot_interrupt_t")
      .appendField(new Blockly.FieldVariable("robot_interrupt"), "interrupt_variable")
      .appendField(",")
      .appendField("char *")
      .appendField(new Blockly.FieldVariable("msg"), "msg_variable");
    this.appendStatementInput("interrupt_body").setCheck(null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["check_mqtt_messages"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Check new mqtt messages in")
      .appendField(new Blockly.FieldNumber(0, 0), "delay_s");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip("Waits for number of seconds");
    this.setHelpUrl("");
  },
};

Blockly.Blocks['publish'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Publish");
    this.appendStatementInput("Topic")
        .setCheck(null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['subscribe'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Subscribe");
    this.appendStatementInput("Topic")
        .setCheck(null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['publish_with_content'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Publish To Topic");
    this.appendValueInput("Topic")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .appendField("With Content");
    this.appendValueInput("Message")
        .setCheck(null);
    this.setInputsInline(true);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['chip_id'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Chip ID");
    this.setOutput(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

cppGenerator["chip_id"] = function () {
  return "(int)(ESP.getEfuseMac() & 0xffffffff)";
};