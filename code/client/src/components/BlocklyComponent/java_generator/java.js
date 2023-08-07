import * as Blockly from "blockly/core";
import { Workspace } from "blockly/core";

// define the generator object for java
Blockly.java = new Blockly.Generator("java");

Blockly.java.C_VARIABLE_TYPES = [
    ["float", "float"],
    ["int", "int"],
    ["short", "short"],
    ["boolean", "boolean"],
  ];

Blockly.java.SWARM_ALGO_SIGNATURES = [
"algorithm_setup",
"algorithm_start",
"algorithm_execute",
"algorithm_interrupt",
"algorithm_reset",
"algorithm_stop",
];

Blockly.java.C_GLOBAL_VARS = [];

Blockly.java.addReservedWords(
      "abstract, assert, boolean, break, byte, case, catch, char, class, const, continue, default, do, double, else, enum, exports, extends, false, final,"+
       "finally, float, for, if, implements, import, instanceof, int, interface, long, module, native, new, null, package, private, protected, public, requires,"+ 
       "return, short, static, strictfp, super, switch, synchronized, this, throw, throws, transient, true, try, var, void, volatile, while,boolean, byte, short, int,"+ 
       "long, float, double, char,if, else, switch, case, default, while, do, for, break, continue, return,try, catch, finally, throw, throws,class, interface, extends,"+ 
       "implements, new, this, super, static, final, abstract, volatile, synchronized, native, strictfp, enum,package, import,null, void, true, false"
  );

Blockly.java.INFINITE_LOOP_TRAP = null;

Blockly.java.ORDER_ATOMIC = 0; // 0 "" ...
Blockly.java.ORDER_MEMBER = 2; // . []
Blockly.java.ORDER_FUNCTION_CALL = 2; // ()
Blockly.java.ORDER_INCREMENT = 3; // ++
Blockly.java.ORDER_DECREMENT = 3; // --
Blockly.java.ORDER_LOGICAL_NOT = 3; // !
Blockly.java.ORDER_BITWISE_NOT = 3; // ~
Blockly.java.ORDER_UNARY_PLUS = 3; // +
Blockly.java.ORDER_UNARY_NEGATION = 3; // -
Blockly.java.ORDER_MULTIPLICATION = 5; // *
Blockly.java.ORDER_DIVISION = 5; // /
Blockly.java.ORDER_MODULUS = 5; // %
Blockly.java.ORDER_ADDITION = 6; // +
Blockly.java.ORDER_SUBTRACTION = 6; // -
Blockly.java.ORDER_BITWISE_SHIFT = 7; // << >>
Blockly.java.ORDER_RELATIONAL = 8; // < <= > >=
Blockly.java.ORDER_EQUALITY = 9; // == !=
Blockly.java.ORDER_BITWISE_AND = 10; // &
Blockly.java.ORDER_BITWISE_XOR = 11; // ^
Blockly.java.ORDER_BITWISE_OR = 12; // |
Blockly.java.ORDER_LOGICAL_AND = 13; // &&
Blockly.java.ORDER_LOGICAL_OR = 14; // ||
Blockly.java.ORDER_CONDITIONAL = 15; // ?:
Blockly.java.ORDER_ASSIGNMENT = 15; // = += -= *= /= %= <<= >>= ...
Blockly.java.ORDER_COMMA = 17; // ,
Blockly.java.ORDER_NONE = 99; // (...)

Blockly.java.isInitialized = false;

Blockly.java.init = function(workspace) {
    Object.getPrototypeOf(this).init.call(this);
  
    // Create a new variable database for java if not already created
    if (!this.nameDB_) {
      this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_);
    } else {
      this.nameDB_.reset();
    }
  
    // Create a dictionary of definitions to be printed before the code.
    Blockly.java.definitions_ = Object.create(null);
    // Generate a unique algorithm name for java
    Blockly.java.algorithm_ = "Algorithm_" + Date.now();
  
    // Create a dictionary mapping desired function names in definitions_
    // to actual function names (to avoid collisions with user functions).
    Blockly.java.functionNames_ = Object.create(null);
    Blockly.java.times_ = Object.create(null);
  
    // Create a set to store imported packages/classes.
    Blockly.java.imports_ = new Set();
  
    // Create a set to store class-level variable declarations.
    Blockly.java.classVariables_ = new Set();
  
    // Initialize the code to be generated for the main function.
    Blockly.java.mainCode_ = '';
  
    // Initialize the package and class name.
    Blockly.java.packageName_ = 'com.example'; // Set your desired package name here.
    Blockly.java.className_ = 'Main'; // Set your desired class name here.
  
    // Set the default access modifier for class-level variables.
    Blockly.java.defaultAccessModifier_ = 'private';
  
    // Set the default access modifier for methods.
    Blockly.java.defaultMethodAccessModifier_ = 'public';
  
    // Set the default data type for variables and method return type.
    Blockly.java.defaultDataType_ = 'int';

    // Generate variable declarations for global variables (if using Blockly.Variables)
    if (Blockly.Variables) {
      if (!Blockly.java.variableDB_) {
        Blockly.java.variableDB_ = new Blockly.Names(Blockly.java.RESERVED_WORDS_);
      } else {
        Blockly.java.variableDB_.reset();
      }
  
      var defvars = [];
      var variables = Blockly.Variables.allUsedVarModels(workspace);
      for (var x = 0; x < variables.length; x++) {
        if (variables[x][3] == "global") {
          defvars[x] =
            variables[x][0] +
            variables[x][1] +
            " " +
            Blockly.java.variableDB_.getName(
              variables[x][2],
              Blockly.Variables.NAME_TYPE
            ) +
            ";";
        }
      }
      Blockly.java.definitions_["variables"] = defvars.join("\n");
    }
  
    // Set whether to generate comments for blocks (true/false).
    Blockly.java.commentBlocks_ = true;
  
    // Set whether to generate getters and setters for class-level variables (true/false).
    Blockly.java.generateGettersSetters_ = true;
  
    // Set whether to use 'this' keyword for class-level variables (true/false).
    Blockly.java.useThisForClassVariables_ = true;
  
    // Set whether to use 'this' keyword for method parameters (true/false).
    Blockly.java.useThisForMethodParams_ = true;
  
    // Set whether to use 'this' keyword for variable assignments (true/false).
    Blockly.java.useThisForVariableAssignments_ = true;
  
    // Set whether to generate 'main' method (true/false).
    Blockly.java.generateMainMethod_ = true;
  
    // Set whether to use a separate file for class definition (true/false).
    Blockly.java.separateClassFile_ = false;
  
    // Set whether to use java 8 'final' keyword for variables (true/false).
    Blockly.java.useFinalForVariables_ = false;
  
    // Set whether to use java 8 'final' keyword for parameters (true/false).
    Blockly.java.useFinalForParameters_ = false;
  
    // Set whether to use java 8 'final' keyword for class-level variables (true/false).
    Blockly.java.useFinalForClassVariables_ = false;
  
    // Set whether to use java 8 'final' keyword for method return type (true/false).
    Blockly.java.useFinalForMethodReturnType_ = false;
  
    // Set whether to use java 8 'final' keyword for method parameters (true/false).
    Blockly.java.useFinalForMethodParameters_ = false;
  
    // Set whether to use java 8 'var' keyword for variable declarations (true/false).
    Blockly.java.useVarForVariableDeclarations_ = false;
  
    // Set whether to use java 8 'var' keyword for method return type (true/false).
    Blockly.java.useVarForMethodReturnType_ = false;
  
    // Set whether to use java 8 'var' keyword for method parameters (true/false).
    Blockly.java.useVarForMethodParameters_ = false;
  
    // Set any additional settings or flags needed for java code generation.
  
    Blockly.java.isInitialized = true;
  };

  Blockly.java.finish = function (code) {
    console.log(code);
    // Indent every line.
    if (code) {
      code = this.prefixLines(code, Blockly.java.INDENT);
    }
    code = "\n" + code;
  
    // Convert the definitions dictionary into a list.
    var imports = [];
    var classDeclarations = [];
    var methodDeclarations = [];
    var methodDefinitions = [];
  
    for (var name in Blockly.java.definitions_) {
      var def = Blockly.java.definitions_[name];
  
      if (name.startsWith("import")) {
        imports.push(def);
      } else if (name.startsWith("class_declare")) {
        classDeclarations.push(def);
      } else if (name.startsWith("method_declare")) {
        methodDeclarations.push(def);
      } else {
        methodDefinitions.push(def);
      }
    }
  
    // Combine the code snippets into the final java code.
    var allImports = imports.join("\n") + "\n\n";
    var allClassDeclarations = classDeclarations.join("\n\n") + "\n\n";
    var allMethodDeclarations = methodDeclarations.join("\n\n") + "\n\n";
    var allMethodDefinitions = methodDefinitions.join("\n\n");
  
    var finalCode = allImports + code + allClassDeclarations + allMethodDeclarations + allMethodDefinitions + "\n"+'}';

    this.isInitialized = false;
    this.nameDB_.reset();
    console.log(finalCode);
    return finalCode;
  };

  //to add a semicolon (;) to the end of the code line
  Blockly.java.scrubNakedValue = function (line) {
    return line.trim() + ";\n";
  };

  Blockly.java.quote = function (string) {
    string = string
      .replace(/\\/g, "\\\\")   // Replace backslash with double backslash
      .replace(/'/g, "\\'")     // Replace single quote with escaped single quote
      .replace(/"/g, '\\"')     // Replace double quote with escaped double quote
      .replace(/\n/g, "\\n")    // Replace newline with escaped newline
      .replace(/\r/g, "\\r")    // Replace carriage return with escaped carriage return
      .replace(/\t/g, "\\t");   // Replace tab with escaped tab
    return string;
  };

  //used to handle comments
  Blockly.java.scrub_ = function (block, code) {
    if (code === null) {
      // Block has handled code generation itself.
      return '';
    }
    let commentCode = '';
  
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
      // Collect comment for this block.
      const comment = block.getCommentText();
      if (comment) {
        commentCode += this.prefixLines(comment, '// ') + '\n';
      }
  
      // Collect comments for all value arguments.
      // Don't collect comments for nested statements.
      for (let x = 0; x < block.inputList.length; x++) {
        if (block.inputList[x].type === Blockly.INPUT_VALUE) {
          const childBlock = block.inputList[x].connection.targetBlock();
          if (childBlock) {
            const nestedComment = this.allNestedComments(childBlock);
            if (nestedComment) {
              commentCode += this.prefixLines(nestedComment, '// ');
            }
          }
        }
      }
    }
  
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = this.blockToCode(nextBlock);
    return commentCode + code + nextCode;
  };
  
  //constructor
  Blockly.java['constructor'] = function(block) {
    var branchParams = Blockly.java.statementToCode(block, 'PARAMS');
    var params = branchParams.split('$$');
    if (params.length > 2) {
      for (var i = 0; i < params.length - 3; i++) {
        params[i] = params[i] + ', ';
      }
      branchParams = params.join('');
    } else {
      branchParams = params.join('');
    }
    // Removing the starting indentation and last comma
    branchParams = branchParams.substring(2, branchParams.lastIndexOf(','));
  
    var code = 'public $$CONSTRUCTOR_NAME$$(' + branchParams + ') {\n';
    code += this.prefixLines(this.scrub(block, 'STATEMENTS'), Blockly.java.INDENT);
    code += '\n}\n';
    return code;
  };
  
export default Blockly.java;
  
  
  // Additional methods and settings for java code generator can be added here.

  /*
  Blockly.java.init = function (workspace) {
    
    // Set up the variable map and populate variables and procedures
    Blockly.java.nameDB_.setVariableMap(workspace.getVariableMap());
    Blockly.java.nameDB_.populateVariables(workspace);
    Blockly.java.nameDB_.populateProcedures(workspace);
  
    
  
    // Generate a unique algorithm name for java
    //Blockly.java.algorithm_ = "Algorithm_" + System.currentTimeMillis();
  
    // Create dictionaries for function names and timing information (if needed)
    Blockly.java.functionNames_ = Object.create(null);
    Blockly.java.times_ = Object.create(null);
  
    // Generate variable declarations for global variables (if using Blockly.Variables)
    if (Blockly.Variables) {
      if (!Blockly.java.variableDB_) {
        Blockly.java.variableDB_ = new Blockly.Names(Blockly.java.RESERVED_WORDS_);
      } else {
        Blockly.java.variableDB_.reset();
      }
  
      var defvars = [];
      var variables = Blockly.Variables.allUsedVarModels(workspace);
      for (var x = 0; x < variables.length; x++) {
        if (variables[x][3] == "global") {
          defvars[x] =
            variables[x][0] +
            variables[x][1] +
            " " +
            Blockly.java.variableDB_.getName(
              variables[x][2],
              Blockly.Variables.NAME_TYPE
            ) +
            ";";
        }
      }
      Blockly.java.definitions_["variables"] = defvars.join("\n");
    }
  
    // Set the initialization flag to true
    Blockly.java.isInitialized = true;
  };
  */

  