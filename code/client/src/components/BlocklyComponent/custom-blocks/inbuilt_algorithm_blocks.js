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
        this.setStyle("backgroundColour", "#FFD700");
        this.setStyle("color", "white");
        this.setStyle("fontSize", "24px");
        this.setStyle("borderRadius", "8px");
        this.setStyle("border", "2px solid #000");

        this.setInputsInline(false);
        this.setOutput(false);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setStyle("width", "5000px");
        this.setStyle("height", "500px");

        this.setOnChange(function (changeEvent) {
          if (changeEvent.type === Blockly.Events.SELECTED) {
            console.log(" block selected");
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
