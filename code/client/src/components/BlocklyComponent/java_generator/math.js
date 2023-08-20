import javaGenerator from './java';

javaGenerator['math_number'] = function(block) {
    // Numeric value.
    var code = block.getFieldValue('NUM');
    var order = code >= 0 ? javaGenerator.ORDER_ATOMIC : javaGenerator.ORDER_UNARY_NEGATION;
    return [code, order];
  };
  