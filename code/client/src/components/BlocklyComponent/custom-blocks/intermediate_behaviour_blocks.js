import Blockly from "blockly";
import cppGenerator from "../generator/cpp";
import javaGenerator from "../java_generator/java";
import { Names } from "blockly/core";
const NameType = Names.NameType;

export default function intermediateBehaviourBlocks() {
  // move_forward_with_obstacle_avoidance ---------------------------

  Blockly.Blocks["move_forward_with_obstacle_avoidance"] = {
    init: function () {
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.appendDummyInput().appendField(
        "Move Forward With Obstacle Avoidance"
      );
      this.appendDummyInput()
        .appendField("Avoidance action:")
        .appendField(
          new Blockly.FieldDropdown([
            ["Stop", "stop"],
            ["Turn left", "turn_left"],
            ["Turn right", "turn_right"],
            ["Random turn", "random_turn"],
          ]),
          "avoidanceAction"
        );
      this.appendDummyInput()
        .appendField("Speed")
        .appendField(new Blockly.FieldNumber(0, 0, 100), "speed");
      this.appendDummyInput()
        .appendField("Distance Threshold")
        .appendField(new Blockly.FieldNumber(0, 0, 100), "distanceThreshold");
      this.appendDummyInput()
        .appendField("Duration")
        .appendField(new Blockly.FieldNumber(0, 0, 100), "duration");
      this.setColour("black");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  javaGenerator["move_forward_with_obstacle_avoidance"] = function (block) {
    javaGenerator.definitions_[
      `import#intermediate_behaviours`
    ] = `import swarm.behaviours.intermediateBehaviours.IntermediateBehaviours;`;

    var avoidanceAction = block.getFieldValue("avoidanceAction");
    var speed = block.getFieldValue("speed");
    var distanceThreshold = block.getFieldValue("distanceThreshold");
    var duration = block.getFieldValue("duration");

    var code = `
        IntermediateBehaviours.moveForwardWithObstacleAvoidance (
          motion, 
          ${speed}, 
          ${duration}, 
          "${avoidanceAction}", 
          ${distanceThreshold}, 
          distSensor )
        `;

    return code;
  };

  // detect_object_with_obstacle_avoidance ---------------------------

  Blockly.Blocks["detect_object_with_obstacle_avoidance"] = {
    init: function () {
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.appendDummyInput().appendField(
        "Detect Object With Obstacle Avoidance"
      );
      this.appendDummyInput()
        .appendField("Object color:")
        .appendField(
          new Blockly.FieldDropdown([
            ["Red", "r"],
            ["Blue", "b"],
            ["Green", "g"],
          ]),
          "color"
        );
      this.appendDummyInput()
        .appendField("Avoidance action:")
        .appendField(
          new Blockly.FieldDropdown([
            ["Stop", "stop"],
            ["Turn left", "turn_left"],
            ["Turn right", "turn_right"],
            ["Random turn", "random_turn"],
          ]),
          "avoidanceAction"
        );
      this.appendDummyInput()
        .appendField("Speed")
        .appendField(new Blockly.FieldNumber(0, 0, 100), "speed");
      this.appendDummyInput()
        .appendField("Distance Threshold")
        .appendField(new Blockly.FieldNumber(0, 0, 100), "distanceThreshold");
      this.appendDummyInput()
        .appendField("Duration")
        .appendField(new Blockly.FieldNumber(0, 0, 100), "duration");
      this.setColour("black");
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  javaGenerator["detect_object_with_obstacle_avoidance"] = function (block) {
    javaGenerator.definitions_[
      `import#intermediate_behaviours`
    ] = `import swarm.behaviours.intermediateBehaviours.IntermediateBehaviours;`;

    var avoidanceAction = block.getFieldValue("avoidanceAction");
    var speed = block.getFieldValue("speed");
    var distanceThreshold = block.getFieldValue("distanceThreshold");
    var duration = block.getFieldValue("duration");
    var color = block.getFieldValue("color");

    var code = `
        IntermediateBehaviours.detectObjectWithObstacleAvoidance (
            motion, 
            ${speed}, 
            ${duration}, 
            "${avoidanceAction}", 
            ${distanceThreshold}, 
            distSensor, 
            colorSensor, 
            "${color}", 
            neoPixel )
        `;

    return code;
  };
}
