import javaGenerator from './java';
import { Names } from "blockly/core";

javaGenerator['variables_get'] = function(block) {
    // Variable getter.
    var code = javaGenerator.nameDB_.getName(
      block.getFieldValue('VAR'),
      Names.NameType.VARIABLE
    );
    return [code, javaGenerator.ORDER_ATOMIC];
  };
  
javaGenerator['variables_set'] = function(block) {
  // Variable setter.
  const argument0 = javaGenerator.valueToCode(block, 'VALUE', javaGenerator.ORDER_ASSIGNMENT) || '0';
  const varName = javaGenerator.variableDB_.getName(block.getFieldValue('VAR'), Names.NameType.VARIABLE);

  return 'this.'+varName + ' = ' + argument0 + ';\n';
};
  