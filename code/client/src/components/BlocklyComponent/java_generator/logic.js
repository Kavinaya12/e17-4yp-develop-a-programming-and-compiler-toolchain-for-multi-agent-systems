import javaGenerator from './java';

javaGenerator['controls_if'] = function(block) {
    // If/else-if/else condition.
    let n = 0;
    let code = '';
    let branchCode, conditionCode;
    
    if (javaGenerator.STATEMENT_PREFIX) {
      // Automatic prefix insertion is switched off for this block. Add manually.
      code += javaGenerator.injectId(javaGenerator.STATEMENT_PREFIX, block);
    }
    
    do {
      conditionCode = javaGenerator.valueToCode(block, 'IF' + n, javaGenerator.ORDER_NONE) || 'false';
      branchCode = javaGenerator.statementToCode(block, 'DO' + n);
      
      if (javaGenerator.STATEMENT_SUFFIX) {
        branchCode = javaGenerator.prefixLines(
          javaGenerator.injectId(javaGenerator.STATEMENT_SUFFIX, block), javaGenerator.INDENT) +
          branchCode;
      }
      
      code += (n > 0 ? 'else ' : '') + 'if (' + conditionCode + ') {\n' +
        branchCode + '\n}';
      
      n++;
    } while (block.getInput('IF' + n));
    
    if (block.getInput('ELSE') || javaGenerator.STATEMENT_SUFFIX) {
      branchCode = javaGenerator.statementToCode(block, 'ELSE');
      
      if (javaGenerator.STATEMENT_SUFFIX) {
        branchCode = javaGenerator.prefixLines(
          javaGenerator.injectId(javaGenerator.STATEMENT_SUFFIX, block), javaGenerator.INDENT) +
          branchCode;
      }
      
      code += ' else {\n' + branchCode + '\n}';
    }
    
    return code + '\n';
  };

  javaGenerator['logic_compare'] = function(block) {
    // Comparison operator.
    const OPERATORS = {
      'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>='
    };
    const operator = OPERATORS[block.getFieldValue('OP')];
    const order = (operator === '==' || operator === '!=') ?
      javaGenerator.ORDER_EQUALITY :
      javaGenerator.ORDER_RELATIONAL;
    const argument0 = javaGenerator.valueToCode(block, 'A', order) || '0';
    const argument1 = javaGenerator.valueToCode(block, 'B', order) || '0';
    const code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
  };
  
  
