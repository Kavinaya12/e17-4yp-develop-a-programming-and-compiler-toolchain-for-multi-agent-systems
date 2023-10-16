import Blockly from "blockly";
import cppGenerator from "../generator/cpp";
import javaGenerator from "../java_generator/java";
import { algorithms } from "../../../InBuiltAlgorithms/InBuiltAlgorithms";

export default function generateBlocksForInBuiltAlgorithms() {
  for (let i = 0; i < algorithms.length; i++) {
    Blockly.Blocks[`algorithm_${i}`] = {
      init: function () {
        this.appendDummyInput().appendField(algorithms[i].name);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setColour(23);
        this.setTooltip(algorithms[i].name);
        this.setHelpUrl("");
        this.setStyle("backgroundColour", "#FFD700"); // Set the background color to gold
        this.setStyle("color", "white"); // Set the text color to white
        this.setStyle("fontSize", "24px"); // Set the font size
        this.setStyle("borderRadius", "8px"); // Add rounded corners
        this.setStyle("border", "2px solid #000"); // Add a border

        this.setInputsInline(false);
        this.setOutput(false);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setStyle("width", "5000px"); // Add a border
        this.setStyle("height", "500px"); // Add a border

        this.setOnChange(function (changeEvent) {
          if (changeEvent.type === Blockly.Events.SELECTED) {
            // The block has been selected
            console.log(" block selected");
            // You can perform any actions you want here.
            // For example, you can disable and clear other selected blocks.
            // disableAndClearOtherBlocks(this);
          }
        });
      },
    };
    //   cppGenerator.algorithm_ = algorithms[i].className;

    javaGenerator.algorithm_ = algorithms[i].className;
    javaGenerator.inbuilt_algorithm = true;

    javaGenerator[`algorithm_${i}`] = function (block) {
      javaGenerator.algorithm_ = algorithms[i].className;
      var code = algorithms[i].code;
      return code;
    };
  }
}
