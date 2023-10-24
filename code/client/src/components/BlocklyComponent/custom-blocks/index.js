import Blockly from "blockly";
import { Names } from "blockly/core";
import cppGenerator from "../generator/cpp";
import javaGenerator from "../java_generator/java";
import generateBlocksForInBuiltAlgorithms from "./inbuilt_algorithm_blocks";
import intermediateBehaviourBlocks from "./intermediate_behaviour_blocks";

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

javaGenerator["delay"] = function (block) {
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
javaGenerator["serial_print"] = function (block) {
  var text_msg = block.getFieldValue("msg");
  var code = `System.out.println("${text_msg}");\n`;
  return code;
};

/*    ATOMIC BLOCKS   */

//using
Blockly.Blocks["move_random"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Random Movement")
      .appendField("Left")
      .appendField(new Blockly.FieldNumber(0), "left")
      .appendField("Right")
      .appendField(new Blockly.FieldNumber(0), "right");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Performs random movement with the given parameters");
    this.setHelpUrl("");
  },
};
cppGenerator["move_random"] = function (block) {
  cppGenerator.definitions_[
    `include#atomic_behaviors`
  ] = `#include "atomic_behaviours/atomic_behaviours.h"`;
  var left = block.getFieldValue("left");
  var right = block.getFieldValue("right");

  var code = `move_random(${left}, ${right});\n`;
  return code;
};
javaGenerator["move_random"] = function (block) {
  javaGenerator.definitions_[
    `import#atomic_behaviours`
  ] = `import atomic_behaviours.AtomicBehaviours;`;
  var left = block.getFieldValue("left");
  var right = block.getFieldValue("right");

  var code = `move_random(${left}, ${right});\n`;
  return code;
};

//using-VR
Blockly.Blocks["show_selected_task"] = {
  init: function () {
    this.appendDummyInput().appendField("Show Selected Task");
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ["Red", "r"],
        ["Blue", "b"],
        ["SelectedTask", "selectedTask"],
      ]),
      "selectedTask"
    );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip(
      "Show the selected task (either 'r' for Red or 'b' for Blue)"
    );
    this.setHelpUrl("");
  },
};
javaGenerator["show_selected_task"] = function (block) {
  javaGenerator.definitions_[
    `import#atomic_behaviors`
  ] = `import swarm.behaviours.atomicBehaviours.AtomicBehaviours;`;
  var dropdown_selectedtask = block.getFieldValue("selectedTask");
  if (dropdown_selectedtask == "selectedTask") {
    var code = `atomicBehaviours.showSelectedTask(${dropdown_selectedtask},this.neoPixel,this.simpleComm,this.getId());\n`;
  } else {
    var code = `atomicBehaviours.showSelectedTask("${dropdown_selectedtask}",this.neoPixel,this.simpleComm,this.getId());\n`;
  }

  return code;
};

//using
Blockly.Blocks["assign_task"] = {
  init: function () {
    this.appendDummyInput().appendField("Assign Task");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
cppGenerator["assign_task"] = function (block) {
  var code = `assign_task();`;
  return code;
};
javaGenerator["assign_task"] = function (block) {
  var code = `assign_task();`;
  return code;
};

//not using
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
    this.setColour(160);
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

//using -VR simple behaviour
Blockly.Blocks["move_back"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Move Back")
      .appendField("Default Move Speed")
      .appendField(new Blockly.FieldNumber(0), "defaultMoveSpeed")
      .appendField("Duration (ms)")
      .appendField(new Blockly.FieldNumber(0), "duration_ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Moves backward with the given speed and duration");
    this.setHelpUrl("");
  },
};
javaGenerator["move_back"] = function (block) {
  var defaultMoveSpeed = block.getFieldValue("defaultMoveSpeed");
  var duration_ms = block.getFieldValue("duration_ms");

  var code = `AtomicBehaviours.moveBack(motion, ${defaultMoveSpeed}, ${duration_ms});`;
  return code;
};

//using -VR simple behaviour
Blockly.Blocks["move_forward"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Move Forward")
      .appendField("Default Move Speed")
      .appendField(new Blockly.FieldNumber(100), "defaultMoveSpeed")
      .appendField("Duration (ms)")
      .appendField(new Blockly.FieldNumber(2000), "duration_ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Moves forward with the given speed and duration");
    this.setHelpUrl("");
  },
};
javaGenerator["move_forward"] = function (block) {
  var defaultMoveSpeed = block.getFieldValue("defaultMoveSpeed");
  var duration_ms = block.getFieldValue("duration_ms");

  var code = `AtomicBehaviours.moveForward(motion, ${defaultMoveSpeed}, ${duration_ms});`;
  return code;
};

//using -VR simple behaviour
Blockly.Blocks["move_turn"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Move Turn")
      .appendField("Default Move Speed")
      .appendField(new Blockly.FieldNumber(90), "defaultMoveSpeed")
      .appendField("Duration (ms)")
      .appendField(new Blockly.FieldNumber(1000), "duration_ms")
      .appendField("Sign (1 or -1)")
      .appendField(new Blockly.FieldNumber(1), "sign");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Moves turn with the given speed,sign and duration");
    this.setHelpUrl("");
  },
};
javaGenerator["move_turn"] = function (block) {
  var defaultMoveSpeed = block.getFieldValue("defaultMoveSpeed");
  var duration_ms = block.getFieldValue("duration_ms");
  var sign = block.getFieldValue("sign");

  var code = `AtomicBehaviours.turn(motion, ${defaultMoveSpeed}, ${sign}, ${duration_ms});`;
  return code;
};

//not using
Blockly.Blocks["read_distance"] = {
  init: function () {
    this.appendDummyInput().appendField("Read Distance");
    this.setOutput(true, "Number");
    this.setColour(160);
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

//not using
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

/*    PAIR BLOCKS   */

//using
Blockly.Blocks["collision_avoidance"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Collision Avoidance")
      .appendField("Collision Threshold")
      .appendField(new Blockly.FieldNumber(20), "collisionThreshold_value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
cppGenerator["collision_avoidance"] = function (block) {
  //var body = cppGenerator.statementToCode(block, "collision_avoidance_body");
  cppGenerator.definitions_[
    `include#pair_bahaviors`
  ] = `#include "pair_behaviours/pair_behaviours.h"`;
  var number_collisionThreshold_value = block.getFieldValue(
    "collisionThreshold_value"
  );
  var code = `collision_avoidance(${number_collisionThreshold_value});\n`;
  return code;
};
javaGenerator["collision_avoidance"] = function (block) {
  //var body = cppGenerator.statementToCode(block, "collision_avoidance_body");
  javaGenerator.definitions_[
    `import#pair_bahaviors`
  ] = `import pair_behaviours.PairBehaviours;`;
  var number_collisionThreshold_value = block.getFieldValue(
    "collisionThreshold_value"
  );
  var code = `collision_avoidance(${number_collisionThreshold_value});\n`;
  return code;
};

/*     CLUSTER BLOCKS    */

//using
Blockly.Blocks["observe_environment"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Observe Environment")
      .appendField("Blue Threshold1")
      .appendField(new Blockly.FieldNumber(115), "blueThreshold_value1")
      .appendField("Blue Threshold2")
      .appendField(new Blockly.FieldNumber(130), "blueThreshold_value2");
    this.setOutput(true, "Boolean");
    this.setColour(370);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
cppGenerator["observe_environment"] = function (block) {
  //var body = cppGenerator.statementToCode(block, "collision_avoidance_body");
  cppGenerator.definitions_[
    `include#cluster_bahaviors`
  ] = `#include "cluster_behaviours/cluster_behaviours.h"`;
  var number_blueThreshold_value1 = block.getFieldValue("blueThreshold_value1");
  var number_blueThreshold_value2 = block.getFieldValue("blueThreshold_value2");
  var code = `observe_environment(${number_blueThreshold_value1},${number_blueThreshold_value2})`;
  return [code, cppGenerator.ORDER_ATOMIC];
};
javaGenerator["observe_environment"] = function (block) {
  //var body = cppGenerator.statementToCode(block, "collision_avoidance_body");
  javaGenerator.definitions_[
    `import#cluster_bahaviors`
  ] = `import cluster_behaviours.ClusterBehaviours;`;
  var number_blueThreshold_value1 = block.getFieldValue("blueThreshold_value1");
  var number_blueThreshold_value2 = block.getFieldValue("blueThreshold_value2");
  var code = `observe_environment(${number_blueThreshold_value1},${number_blueThreshold_value2})`;
  return [code, cppGenerator.ORDER_ATOMIC];
};

//using -VR
Blockly.Blocks["observe"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Observe")
      .appendField("Detected Color")
      .appendField(new Blockly.FieldVariable("detectedColor"), "detectedColor");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(370);
    this.setTooltip("Observes and performs actions based on detected color");
    this.setHelpUrl("");
  },
};
javaGenerator["observe"] = function (block) {
  javaGenerator.definitions_[
    `import#cluster_behaviours`
  ] = `import swarm.behaviours.clusterBehaviours.ClusterBehaviours;`;
  var detectedColor = block.getFieldValue("detectedColor");

  var code = `clusterBehaviours.observe(${detectedColor}, this.taskDemandQueue, this.taskSupplyQueue, fixedQueueLength, robotId, this.robotMqttClient);\n`;
  return code;
};

//using
Blockly.Blocks["evaluate_task_demand"] = {
  init: function () {
    this.appendDummyInput().appendField("Evaluate Task Demand");

    this.setOutput(true, "Array");
    this.setColour(370);
    this.setTooltip("Evaluate task demand and return an array");
    this.setHelpUrl("");
  },
};
javaGenerator["evaluate_task_demand"] = function (block) {
  var code = `clusterBehaviours.evaluateTaskDemand(this.taskDemandQueue, fixedQueueLength, robotId);
  this.estimatedTaskDemandForRed = taskDemandsFloatArray[0];
  this.estimatedTaskDemandForBlue = taskDemandsFloatArray[1];\n
`;
  return [code, cppGenerator.ORDER_ATOMIC];
};

//using
Blockly.Blocks["evaluate_task_supply"] = {
  init: function () {
    this.appendDummyInput().appendField("Evaluate Task Supply");

    this.setOutput(true, "Array");
    this.setColour(370);
    this.setTooltip("Evaluate task demand and return an array");
    this.setHelpUrl("");
  },
};
javaGenerator["evaluate_task_supply"] = function (block) {
  var code = `clusterBehaviours.evaluateTaskSupply(this.taskSupplyQueue, fixedQueueLength, robotId);
this.estimatedTaskSupplyForRed = taskSuppliesFloatArray[0];
this.estimatedTaskSupplyForBlue = taskSuppliesFloatArray[1];\n
`;
  return [code, cppGenerator.ORDER_ATOMIC];
};

//using
Blockly.Blocks["select_task"] = {
  init: function () {
    this.appendDummyInput().appendField("Select Task");
    this.setOutput(true, "Array");
    this.setColour(370);
    this.setTooltip("Evaluate task demand and return an array");
    this.setHelpUrl("");
  },
};
javaGenerator["select_task"] = function (block) {
  var taskSupplyQueue = block.getFieldValue("taskSupplyQueue");
  var fixedQueueLength = block.getFieldValue("fixedQueueLength");
  var robotId = block.getFieldValue("robotId");

  var code = `clusterBehaviours.selectTask(this.responseThresholdRed,this.responseThresholdBlue,scalingFactor,this.estimatedTaskDemandForRed,this.estimatedTaskSupplyForRed,this.estimatedTaskDemandForBlue,this.estimatedTaskSupplyForBlue,n,robotId);
selectedTask = (String) outputs.get(0);
this.responseThresholdRedNext = (float) outputs.get(1);
this.responseThresholdBlueNext = (float) outputs.get(2);
this.taskSelectionProbabilityRed = (float) outputs.get(3);
this.taskSelectionProbabilityBlue = (float) outputs.get(4);\n
this.responseThresholdRed = this.responseThresholdRedNext;
this.responseThresholdBlue = this.responseThresholdBlueNext;\n
  `;
  return [code, cppGenerator.ORDER_ATOMIC];
};

//using
Blockly.Blocks["add_supply"] = {
  init: function () {
    this.appendDummyInput().appendField("Add Supply");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(370);
    this.setTooltip("Add supply");
    this.setHelpUrl("");
  },
};
javaGenerator["add_supply"] = function (block) {
  var code = `clusterBehaviours.addSupply(parts[0],this.taskSupplyQueue,fixedQueueLength);\n`;
  return code;
};

// not using
Blockly.Blocks["obs_color"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("obsColor")
      .appendField(
        new Blockly.FieldDropdown([
          ["R", "R"],
          ["G", "G"],
          ["B", "B"],
        ]),
        "color_property"
      );
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

//using -VR
Blockly.Blocks["color_sensor_reading"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Get color sensor reading and assign to")
      .appendField(new Blockly.FieldVariable("detectedColor"), "var_name");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip(
      "Get the color sensor reading and assign it to a variable."
    );
    this.setHelpUrl("");
  },
};
javaGenerator["color_sensor_reading"] = function (block) {
  javaGenerator.definitions_[
    `import#RGBColorType`
  ] = `import swarm.robot.types.RGBColorType;`;

  var variable_var_name = javaGenerator.variableDB_.getName(
    block.getFieldValue("var_name"),
    Blockly.Variables.NAME_TYPE
  );

  var code =
    "RGBColorType " + variable_var_name + " = colorSensor.getColor();\n";
  return code;
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
    this.appendDummyInput().appendField("Stop Motors");
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
javaGenerator["motors_stop"] = function (block) {
  javaGenerator.definitions_[
    `import#motors_stop`
  ] = `import modules.motors.Motors;`;
  var code = `motors.stop();`;
  return code;
};

// Main dynamic task allocation algorithm
Blockly.Blocks["algorithm"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput("DynamicTaskAllocationRobot"),
      "algorithm_name"
    );
    this.appendDummyInput()
      .appendField("Super Class:")
      .appendField(
        new Blockly.FieldDropdown([
          ["DynamicTaskAllocationRobot", "DynamicTaskAllocationRobot"],
          ["ObstacleAvoidanceRobot", "ObstacleAvoidanceRobot"],
          ["RandomBehaviour", "RandomBehaviour"],
          ["VirtualRobot", "VirtualRobot"],
        ]),
        "superClass_name"
      );
    this.appendDummyInput()
      .appendField("Child Class:")
      .appendField(
        new Blockly.FieldDropdown([
          ["DynamicTaskAllocationRobot", "DynamicTaskAllocationRobot"],
          ["ObstacleAvoidanceRobot", "ObstacleAvoidanceRobot"],
          ["RandomBehaviour", "RandomBehaviour"],
          ["VirtualRobot", "VirtualRobot"],
        ]),
        "virtualRobot_name"
      );

    // Add object for Behaviours
    this.appendDummyInput("dummyInput1")
      .appendField("Object for cluster behaviours:")
      .appendField(
        new Blockly.FieldTextInput("clusterBehaviours"),
        "objectCluster"
      )
      .setAlign(Blockly.ALIGN_LEFT);
    this.appendDummyInput("dummyInput2")
      .appendField("Object for atomic behaviours:")
      .appendField(
        new Blockly.FieldTextInput("atomicBehaviours"),
        "objectAtomic"
      )
      .setAlign(Blockly.ALIGN_LEFT);

    // Add queues for demand and supply queues
    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("taskDemandQueue"),
      "taskDemandQueue_label"
    );
    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("taskSupplyQueue"),
      "taskSupplyQueue_label"
    );

    this.appendDummyInput()
      .appendField(
        new Blockly.FieldVariable("fixedQueueLength"),
        "fixedQueueLength_label"
      )
      .appendField(
        new Blockly.FieldNumber(0, 0, 100),
        "fixedQueueLength_value"
      );

    this.appendDummyInput()
      .appendField(
        new Blockly.FieldVariable("scalingFactor"),
        "scalingFactor_label"
      )
      .appendField(
        new Blockly.FieldNumber(0.015, 0, 1, 0.001),
        "scalingFactor_value"
      );

    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("responseThresholdRed"),
      "responseThresholdRed_label"
    );
    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("responseThresholdBlue"),
      "responseThresholdBlue_label"
    );
    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("responseThresholdRedNext"),
      "responseThresholdRedNext_label"
    );
    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("responseThresholdBlueNext"),
      "responseThresholdBlueNext_label"
    );
    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("estimatedTaskDemandForRed"),
      "estimatedTaskDemandForRed_label"
    );
    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("estimatedTaskDemandForBlue"),
      "estimatedTaskDemandForBlue_label"
    );
    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("estimatedTaskSupplyForRed"),
      "estimatedTaskSupplyForRed_label"
    );
    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("estimatedTaskSupplyForBlue"),
      "estimatedTaskSupplyForBlue_label"
    );
    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("taskSelectionProbabilityRed"),
      "taskSelectionProbabilityRed_label"
    );
    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("taskSelectionProbabilityBlue"),
      "taskSelectionProbabilityBlue_label"
    );
    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("robotId"),
      "robotId_label"
    );
    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("selectedTask"),
      "selectedTask_label"
    );
    /*this.appendDummyInput()
      .appendField(
        new Blockly.FieldVariable("Collision_Threshold"),
        "collisionThreshold"
      )
      .appendField(new Blockly.FieldNumber(0, 0, 255), "collisionThreshold_value");*/
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
  javaGenerator.inbuilt_algorithm = false;

  var variable_isTaskFound = cppGenerator.nameDB_.getName(
    block.getFieldValue("isTaskFound"),
    NameType.VARIABLE
  );

  /*var variable_collisionThreshold = cppGenerator.nameDB_.getName(
    block.getFieldValue("collisionThreshold"),
    NameType.VARIABLE
  );
  var number_collisionThreshold_value = block.getFieldValue("collisionThreshold_value");*/

  var body = cppGenerator.statementToCode(block, "algo_body");
  // var statements_loop = cppGenerator.statementToCode(block, "loop");
  // var statements_interrupt = cppGenerator.statementToCode(block, "interrupt");
  // var statements_start = cppGenerator.statementToCode(block, "start");
  // var statements_stop = cppGenerator.statementToCode(block, "stop");
  // var statements_reset = cppGenerator.statementToCode(block, "reset");
  // TODO: Assemble JavaScript into code variable.
  var code = `
  
    void algorithm_loop() {
      \t${body}
    }

  `;
  return code;
};
javaGenerator["algorithm"] = function (block) {
  javaGenerator.definitions_[`package#robots_samples`] = `package Robots;`;
  javaGenerator.definitions_[`import#javaUtil`] = `import java.util.*;`;
  javaGenerator.definitions_[
    `import#SensorException`
  ] = `import swarm.robot.exception.SensorException;`;

  var variable_name = javaGenerator.nameDB_.getName(
    block.getFieldValue("algorithm_name"),
    NameType.VARIABLE
  );
  javaGenerator.algorithm_ = variable_name;
  javaGenerator.inbuilt_algorithm = false;

  var virtualRobot_name = javaGenerator.nameDB_.getName(
    block.getFieldValue("virtualRobot_name"),
    NameType.VARIABLE
  );

  var superClassName = javaGenerator.nameDB_.getName(
    block.getFieldValue("superClass_name"),
    NameType.VARIABLE
  );

  var variable_responseThresholdRed_label = javaGenerator.nameDB_.getName(
    block.getFieldValue("responseThresholdRed_label"),
    NameType.VARIABLE
  );
  var variable_responseThresholdBlue_label = javaGenerator.nameDB_.getName(
    block.getFieldValue("responseThresholdBlue_label"),
    NameType.VARIABLE
  );
  var variable_responseThresholdRedNext_label = javaGenerator.nameDB_.getName(
    block.getFieldValue("responseThresholdRedNext_label"),
    NameType.VARIABLE
  );
  var variable_responseThresholdBlueNext_label = javaGenerator.nameDB_.getName(
    block.getFieldValue("responseThresholdBlueNext_label"),
    NameType.VARIABLE
  );
  var variable_estimatedTaskDemandForRed_label = javaGenerator.nameDB_.getName(
    block.getFieldValue("estimatedTaskDemandForRed_label"),
    NameType.VARIABLE
  );
  var variable_estimatedTaskDemandForBlue_label = javaGenerator.nameDB_.getName(
    block.getFieldValue("estimatedTaskDemandForBlue_label"),
    NameType.VARIABLE
  );
  var variable_estimatedTaskSupplyForRed_label = javaGenerator.nameDB_.getName(
    block.getFieldValue("estimatedTaskSupplyForRed_label"),
    NameType.VARIABLE
  );
  var variable_estimatedTaskSupplyForBlue_label = javaGenerator.nameDB_.getName(
    block.getFieldValue("estimatedTaskSupplyForBlue_label"),
    NameType.VARIABLE
  );
  var variable_taskSelectionProbabilityRed_label =
    javaGenerator.nameDB_.getName(
      block.getFieldValue("taskSelectionProbabilityRed_label"),
      NameType.VARIABLE
    );
  var variable_taskSelectionProbabilityBlue_label =
    javaGenerator.nameDB_.getName(
      block.getFieldValue("taskSelectionProbabilityBlue_label"),
      NameType.VARIABLE
    );
  var variable_robotId_label = javaGenerator.nameDB_.getName(
    block.getFieldValue("robotId_label"),
    NameType.VARIABLE
  );
  var variable_selectedTask_label = javaGenerator.nameDB_.getName(
    block.getFieldValue("selectedTask_label"),
    NameType.VARIABLE
  );
  var variable_objectCluster = javaGenerator.nameDB_.getName(
    block.getFieldValue("objectCluster"),
    NameType.VARIABLE
  );
  var variable_objectAtomic = javaGenerator.nameDB_.getName(
    block.getFieldValue("objectAtomic"),
    NameType.VARIABLE
  );
  var variable_demandQueue = javaGenerator.nameDB_.getName(
    block.getFieldValue("taskDemandQueue_label"),
    NameType.VARIABLE
  );
  var variable_supplyQueue = javaGenerator.nameDB_.getName(
    block.getFieldValue("taskSupplyQueue_label"),
    NameType.VARIABLE
  );
  var variable_fixedQueueLength_label = javaGenerator.nameDB_.getName(
    block.getFieldValue("fixedQueueLength_label"),
    NameType.VARIABLE
  );
  var number_fixedQueueLength_value = block.getFieldValue(
    "fixedQueueLength_value"
  );
  var variable_scalingFactor_label = javaGenerator.nameDB_.getName(
    block.getFieldValue("scalingFactor_label"),
    NameType.VARIABLE
  );
  var number_scalingFactor_value = block.getFieldValue("scalingFactor_value");

  var body = javaGenerator.statementToCode(block, "algo_body");
  // var statements_loop = cppGenerator.statementToCode(block, "loop");
  // var statements_interrupt = cppGenerator.statementToCode(block, "interrupt");
  // var statements_start = cppGenerator.statementToCode(block, "start");
  // var statements_stop = cppGenerator.statementToCode(block, "stop");
  // var statements_reset = cppGenerator.statementToCode(block, "reset");
  // TODO: Assemble JavaScript into code variable.

  var code = `
  public class ${virtualRobot_name} extends ${superClassName} {

    ClusterBehaviours ${variable_objectCluster} = new ClusterBehaviours();
    AtomicBehaviours ${variable_objectAtomic} = new AtomicBehaviours();
    Queue<String> ${variable_demandQueue} = new LinkedList<>();
    Queue<String> ${variable_supplyQueue} = new LinkedList<>();
    static int ${variable_fixedQueueLength_label} = ${number_fixedQueueLength_value};
    static float ${variable_scalingFactor_label} = ${number_scalingFactor_value}f;
    static int n = 10;
    robotState runState = robotState.RUN;

    float responseThresholdRed;
    float responseThresholdBlue;
    float ${variable_responseThresholdRedNext_label};
    float ${variable_responseThresholdBlueNext_label};
    float ${variable_estimatedTaskDemandForRed_label};
    float ${variable_estimatedTaskDemandForBlue_label};
    float ${variable_estimatedTaskSupplyForRed_label};
    float ${variable_estimatedTaskSupplyForBlue_label};
    float ${variable_taskSelectionProbabilityRed_label};
    float ${variable_taskSelectionProbabilityBlue_label};

    int ${variable_robotId_label};
    String ${variable_selectedTask_label};

    public ${virtualRobot_name}(int id, double x, double y, double heading) {
      super(id, x, y, heading);
      ${variable_robotId_label} = id;
  }

    // Algorithm loop
    public void loop() throws Exception {
      \tsuper.loop();\n
      action2Future = executor.submit(() -> {\n
        try {\n
          runTaskAllocationAlgorithm();\n
        } catch (SensorException e) {\n
          throw new RuntimeException(e);\n
        }\n
      });\n
    }

  `;

  return code;
};

//simple algorithm block
Blockly.Blocks["simple_algorithm"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput("RandomBehaviour"),
      "algorithm_name"
    );
    this.appendDummyInput()
      .appendField("Super Class:")
      .appendField(
        new Blockly.FieldDropdown([
          ["DynamicTaskAllocationRobot", "DynamicTaskAllocationRobot"],
          ["ObstacleAvoidanceRobot", "ObstacleAvoidanceRobot"],
          ["RandomBehaviour", "RandomBehaviour"],
          ["VirtualRobot", "VirtualRobot"],
        ]),
        "superClass_name"
      );
    this.appendDummyInput()
      .appendField("Child Class:")
      .appendField(
        new Blockly.FieldDropdown([
          ["DynamicTaskAllocationRobot", "DynamicTaskAllocationRobot"],
          ["ObstacleAvoidanceRobot", "ObstacleAvoidanceRobot"],
          ["RandomBehaviour", "RandomBehaviour"],
          ["VirtualRobot", "VirtualRobot"],
        ]),
        "virtualRobot_name"
      );
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldVariable("defaultMoveSpeed"),
        "defaultMoveSpeed_label"
      )
      .appendField(
        new Blockly.FieldNumber(0, 0, 1000),
        "defaultMoveSpeed_value"
      );

    this.appendStatementInput("algo_body")
      .setCheck(null)
      .appendField("algorithm_loop");

    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

javaGenerator["simple_algorithm"] = function (block) {
  javaGenerator.definitions_[`package#robots_samples`] = `package Robots;`;
  javaGenerator.definitions_[
    `import#virtualRobot`
  ] = `import swarm.robot.VirtualRobot;`;
  javaGenerator.definitions_[
    `import#atomic_behaviours`
  ] = `import swarm.behaviours.atomicBehaviours.AtomicBehaviours;`;

  var variable_name = javaGenerator.nameDB_.getName(
    block.getFieldValue("algorithm_name"),
    NameType.VARIABLE
  );
  javaGenerator.algorithm_ = variable_name;
  javaGenerator.inbuilt_algorithm = false;

  var virtualRobot_name = javaGenerator.nameDB_.getName(
    block.getFieldValue("virtualRobot_name"),
    NameType.VARIABLE
  );

  var superClassName = javaGenerator.nameDB_.getName(
    block.getFieldValue("superClass_name"),
    NameType.VARIABLE
  );

  var variable_defaultMoveSpeed_label = javaGenerator.nameDB_.getName(
    block.getFieldValue("defaultMoveSpeed_label"),
    NameType.VARIABLE
  );
  var number_defaultMoveSpeed_value = block.getFieldValue(
    "defaultMoveSpeed_value"
  );

  var body = javaGenerator.statementToCode(block, "algo_body");

  var code = `
  public class ${virtualRobot_name} extends ${superClassName} {

    private int ${variable_defaultMoveSpeed_label} = ${number_defaultMoveSpeed_value};
    robotState runState = robotState.RUN;

    public ${virtualRobot_name}(int id, double x, double y, double heading) {
      super(id, x, y, heading);
    }

    // Algorithm loop
    public void loop() throws Exception {
      \tsuper.loop();\n
      \t${body}
    }

  `;

  return code;
};

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
          ["int[]", "int[]"],
          ["float[]", "float[]"],
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

javaGenerator["variables_init"] = function (block) {
  var variable_var_name = javaGenerator.nameDB_.getName(
    block.getFieldValue("var_name"),
    NameType.VARIABLE
  );
  var dropdown_var_type = block.getFieldValue("var_type");
  var initialValue;
  switch (dropdown_var_type) {
    case "int":
      initialValue = "0";
      break;
    case "double":
      initialValue = "0.0";
      break;
    case "float":
      initialValue = "0.0f";
      break;
    case "string":
      initialValue = '""';
      break;
    case "int[]":
      initialValue = "[]";
      break;
    case "float[]":
      initialValue = "[]";
      break;
    default:
      initialValue = "null";
      break;
  }
  var code =
    dropdown_var_type + " " + variable_var_name + " = " + initialValue + ";";
  return code + "\n";
};

Blockly.Blocks["set_variable_with_type"] = {
  init: function () {
    // Define a dynamic dropdown for variable type.
    var dropdown = new Blockly.FieldDropdown([
      ["int", "int"],
      ["float", "float"],
      ["double", "double"],
      ["String", "String"],
      ["int[]", "int[]"],
      ["float[]", "float[]"],
      ["String[]", "String[]"],
      ["List<Object>", "List<Object>"],
      // Add more types as needed
    ]);

    this.appendDummyInput()
      .appendField("Create variable")
      .appendField(new Blockly.FieldVariable("item"), "var_name")
      .appendField("of type")
      .appendField(dropdown, "var_type"); // Include the dropdown here
    this.appendValueInput("value")
      .setCheck(null)
      .appendField("and initialize to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip(
      "Create a variable with a specified type and initial value."
    );
  },
};

javaGenerator["set_variable_with_type"] = function (block) {
  var varName = block.getFieldValue("var_name");
  var varType = block.getFieldValue("var_type"); // Get the selected type
  var initialValue =
    javaGenerator.valueToCode(block, "value", javaGenerator.ORDER_NONE) || "0";
  var code = varType + " " + varName + " = " + initialValue + ";\n";
  return code;
};

Blockly.Blocks["init_instance_variable"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initialize instance variable")
      .appendField(
        new Blockly.FieldTextInput("responseThresholdRed"),
        "var_name"
      )
      .appendField("with value");
    this.appendValueInput("value")
      .setCheck(["Number", "Variable"])
      .appendField("value");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
javaGenerator["init_instance_variable"] = function (block) {
  var variable_name = block.getFieldValue("var_name");
  var value = javaGenerator.valueToCode(
    block,
    "value",
    javaGenerator.ORDER_ATOMIC
  );

  var code = "this." + variable_name + " = " + value + ";\n";
  return code;
};

// Initialize Variable with object block
Blockly.Blocks["init_variable_with_object"] = {
  init: function () {
    this.appendValueInput("OBJECT")
      .setCheck(null)
      .appendField("Initialize")
      .appendField(new Blockly.FieldVariable(""), "var_name")
      .appendField("with object");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

// Java code generator for Initialize Variable with object block
javaGenerator["init_variable_with_object"] = function (block) {
  var variable_var_name = javaGenerator.variableDB_.getName(
    block.getFieldValue("var_name"),
    Blockly.Variables.NAME_TYPE
  );
  var object_name = javaGenerator.valueToCode(
    block,
    "OBJECT",
    javaGenerator.ORDER_ATOMIC
  );
  var code = "this." + variable_var_name + " = " + "rand.nextFloat();\n";
  return code;
};

// Initialize Object block
Blockly.Blocks["init_object"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initialize object")
      .appendField(new Blockly.FieldVariable("obj"), "object_instance")
      .appendField("as new")
      .appendField(new Blockly.FieldTextInput("ObjectClass"), "object_class")
      .appendField("();");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

// Java code generator for Initialize Object block
javaGenerator["init_object"] = function (block) {
  var object_instance = javaGenerator.variableDB_.getName(
    block.getFieldValue("object_instance"),
    Blockly.Variables.NAME_TYPE
  );
  var object_class = block.getFieldValue("object_class");
  var code =
    object_class + " " + object_instance + " = new " + object_class + "();\n";
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

javaGenerator["neo_color_wave"] = function (block) {
  var dropdown_color_input = block.getFieldValue("color_input");
  var code = `
  neoPixel.changeColor(${dropdown_color_input});
  `;
  return code;
};
Blockly.Blocks["algorithm_interrupt"] = {
  init: function () {
    var dropdown = new Blockly.FieldDropdown([
      ["int", "int"],
      ["float", "float"],
      ["double", "double"],
      ["String", "String"],
      ["int[]", "int[]"],
      ["float[]", "float[]"],
      ["String[]", "String[]"],
      ["List<Object>", "List<Object>"],
      // Add more types as needed
    ]);
    this.appendDummyInput()
      .appendField("message")
      .appendField(new Blockly.FieldVariable("msg"), "msg_variable")
      .appendField("of type")
      .appendField(dropdown, "var_type"); // Include the dropdown here
    this.appendDummyInput().appendField("algorithm_interrupt");

    this.appendStatementInput("interrupt_body").setCheck(null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
Blockly.Blocks["algorithm_interrupt"] = {
  init: function () {
    var dropdown = new Blockly.FieldDropdown([
      ["int", "int"],
      ["float", "float"],
      ["double", "double"],
      ["String", "String"],
      ["int[]", "int[]"],
      ["float[]", "float[]"],
      ["String[]", "String[]"],
      ["List<Object>", "List<Object>"],
      // Add more types as needed
    ]);
    this.appendDummyInput().appendField("communicationInterrupt");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("message")
      .appendField(new Blockly.FieldVariable("msg"), "msg_variable")
      .appendField("of type")
      .appendField(dropdown, "var_type"); // Include the dropdown here
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

Blockly.Blocks["publish"] = {
  init: function () {
    this.appendDummyInput().appendField("Publish");
    this.appendStatementInput("Topic").setCheck(null);
    this.setColour(65);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["subscribe"] = {
  init: function () {
    this.appendDummyInput().appendField("Subscribe");
    this.appendStatementInput("Topic").setCheck(null);
    this.setColour(65);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["publish_with_content"] = {
  init: function () {
    this.appendDummyInput().appendField("Publish To Topic");
    this.appendValueInput("Topic").setCheck(null).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput().appendField("With Content");
    this.appendValueInput("Message").setCheck(null);
    this.setInputsInline(true);
    this.setColour(65);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["chip_id"] = {
  init: function () {
    this.appendDummyInput().appendField("Chip ID");
    this.setOutput(true, null);
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

cppGenerator["chip_id"] = function () {
  return "(int)(ESP.getEfuseMac() & 0xffffffff)";
};

// inbuilt algorithms ---------------

const generatedAlgoBlocks = generateBlocksForInBuiltAlgorithms();
for (const blockName in generatedAlgoBlocks) {
  Blockly.Blocks[blockName] = generatedAlgoBlocks[blockName];
}

// intermediate behaviour blocks

const intermediatenBehavBlocks = intermediateBehaviourBlocks();
for (const blockName in intermediatenBehavBlocks) {
  Blockly.Blocks[blockName] = intermediatenBehavBlocks[blockName];
}
