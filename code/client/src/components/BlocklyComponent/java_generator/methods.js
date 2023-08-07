import javaGenerator from "./java";
import { Names } from "blockly/core";
import Blockly from 'blockly';

javaGenerator['procedures_defreturn'] = function(block) {
    // Define a procedure with a return value.
    const funcName = javaGenerator.nameDB_.getName(
      block.getFieldValue('NAME'),
      Blockly.Names.NAME_TYPE_PROCEDURE
    );
    let xfix1 = '';
    if (javaGenerator.STATEMENT_PREFIX) {
      xfix1 += javaGenerator.injectId(javaGenerator.STATEMENT_PREFIX, block);
    }
    if (javaGenerator.STATEMENT_SUFFIX) {
      xfix1 += javaGenerator.injectId(javaGenerator.STATEMENT_SUFFIX, block);
    }
    if (xfix1) {
      xfix1 = javaGenerator.prefixLines(xfix1, javaGenerator.INDENT);
    }
    let loopTrap = '';
    if (javaGenerator.INFINITE_LOOP_TRAP) {
      loopTrap = javaGenerator.prefixLines(
        javaGenerator.injectId(javaGenerator.INFINITE_LOOP_TRAP, block),
        javaGenerator.INDENT
      );
    }
    const branch = javaGenerator.statementToCode(block, 'STACK');
    let returnValue =
      javaGenerator.valueToCode(block, 'RETURN', javaGenerator.ORDER_NONE) || '';
    let xfix2 = '';
    if (branch && returnValue) {
      // After executing the function body, revisit this block for the return.
      xfix2 = xfix1;
    }
    if (returnValue) {
      returnValue = javaGenerator.INDENT + 'return ' + returnValue + ';\n';
    }
    const returnType = returnValue ? 'dynamic' : 'void';
    const args = [];
    const variables = block.getVars();
    for (let i = 0; i < variables.length; i++) {
      args[i] = javaGenerator.nameDB_.getName(
        variables[i],
        Blockly.Names.NAME_TYPE_VARIABLE
      );
    }
    let code =
      'public static ' +
      returnType +
      ' ' +
      funcName +
      '(' +
      args.join(', ') +
      ') {\n' +
      xfix1 +
      loopTrap +
      branch +
      xfix2 +
      returnValue +
      '}';
    code = javaGenerator.scrub_(block, code);
    // Add % so as not to collide with helper functions in definitions list.
    javaGenerator.definitions_['%' + funcName] = code;
    return null;
  };
  
// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
javaGenerator["procedures_defnoreturn"] = javaGenerator["procedures_defreturn"];

javaGenerator['procedures_callreturn'] = function(block) {
    // Call a procedure with a return value.
    const funcName = javaGenerator.nameDB_.getName(
      block.getFieldValue('NAME'),
      Blockly.Names.DEVELOPER_VARIABLE_TYPE
    );
    const args = [];
    const variables = block.getVars();
    for (let i = 0; i < variables.length; i++) {
      args[i] =
        javaGenerator.valueToCode(block, 'ARG' + i, javaGenerator.ORDER_NONE) ||
        'null';
    }
    let code = funcName + '(' + args.join(', ') + ');';
    return [code, javaGenerator.ORDER_FUNCTION_CALL];
  };

javaGenerator['procedures_callnoreturn'] = function(block) {
    // Call a procedure with no return value.
    // Generated code is for a function call as a statement is the same as a
    // function call as a value, with the addition of line ending.
    var tuple = javaGenerator['procedures_callreturn'](block);
    return tuple[0] + ';\n';
};

javaGenerator['algorithm_interrupt'] = function (block) {
    var variable_interrupt_variable = javaGenerator.variableDB_.getName(
      block.getFieldValue("interrupt_variable"),
      Blockly.Variables.NAME_TYPE
    );
    var variable_msg_variable = javaGenerator.variableDB_.getName(
      block.getFieldValue("msg_variable"),
      Blockly.Variables.NAME_TYPE
    );
    var statements_interrupt_body = javaGenerator.statementToCode(
      block,
      "interrupt_body"
    );
    var code = `public void algorithm_interrupt(robot_interrupt_t ${variable_interrupt_variable}, String ${variable_msg_variable}) {
      ${statements_interrupt_body}
    }\n`;
    return code;
  };
  
  
  