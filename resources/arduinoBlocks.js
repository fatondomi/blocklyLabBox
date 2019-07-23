

Blockly.Blocks["setup"] = {
    init: function() {
        this.jsonInit(
            {
                "message0": "Setup %1",
                "args0": [
                  {
                    "type": "input_statement",
                    "name": "setup"
                  }
                ],
                "nextStatement": null,
                "colour": 300,
                "tooltip": "",
                "helpUrl": ""
            });
        this.setDeletable(false);
    }
};

Blockly.JavaScript['setup'] = function(block) {
    var statements_setup = Blockly.JavaScript.statementToCode(block, 'setup');
    // TODO: Assemble JavaScript into code variable.
    var code = "void setup()\n{\n" + statements_setup + "}\n";
    return code;
};


Blockly.Blocks["loop"] = {
    init: function() {
        this.jsonInit(
            {
                "message0": "Loop %1",
                "args0": [
                  {
                    "type": "input_statement",
                    "name": "loop"
                  }
                ],
                "previousStatement": null,
                "colour": 300,
                "tooltip": "",
                "helpUrl": ""
            });
        this.setDeletable(false);
    }
};

Blockly.JavaScript['loop'] = function(block) {
    var statements_loop = Blockly.JavaScript.statementToCode(block, 'loop');
    // TODO: Assemble JavaScript into code variable.
    var code = "\nvoid loop()\n{\n" + statements_loop + "}\n\n";
    return code;
};


Blockly.Blocks["pinmode"] = {
    init: function() {
        this.jsonInit(
            {
                "type": "pinmode",
                "message0": "pinMode %1 %2",
                "args0": [
                  {
                    "type": "field_dropdown",
                    "name": "pin",
                    "options": [
                        ["0","0"],
                        ["1","1"],
                        ["2","2"],
                        ["3","3"],
                        ["4","4"],
                        ["5","5"],
                        ["6","6"],
                        ["7","7"],
                        ["A0","A0"],
                        ["A1","A1"],
                        ["A2","A2"],
                        ["A3","A3"]
                    ]
                  },
                  {
                    "type": "field_dropdown",
                    "name": "mode",
                    "options": [
                      ["OUTPUT","OUTPUT"],
                      ["INPUT","INPUT"],
                      ["INPUT_PULLUP","INPUT_PULLUP"]
                    ]
                  }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 230,
                "tooltip": "",
                "helpUrl": ""
            });
    }
}

Blockly.JavaScript['pinmode'] = function(block) {
    let dropdown_pin = block.getFieldValue('pin');
    let dropdown_mode = block.getFieldValue('mode');
    
    let code = "pinMode(" + dropdown_pin + "," + dropdown_mode + ");\n";
    return code;
};


Blockly.Blocks["digitalwrite"] = {
    init: function() {
        this.jsonInit(
            {
                "message0": "digitalWrite %1 %2",
                "args0": [
                  {
                    "type": "field_dropdown",
                    "name": "pin",
                    "options": [
                        ["0","0"],
                        ["1","1"],
                        ["2","2"],
                        ["3","3"],
                        ["4","4"],
                        ["5","5"],
                        ["6","6"],
                        ["7","7"],
                        ["A0","A0"],
                        ["A1","A1"],
                        ["A2","A2"],
                        ["A3","A3"]
                    ]
                  },
                  {
                    "type": "field_dropdown",
                    "name": "drive",
                    "options": [
                      ["HIGH","HIGH"],
                      ["LOW","LOW"]
                    ]
                  }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 230,
                "tooltip": "",
                "helpUrl": ""
            });
    }
}

Blockly.JavaScript['digitalwrite'] = function(block) {
    let dropdown_pin = block.getFieldValue('pin');
    let dropdown_drive = block.getFieldValue('drive');
    
    let code = "digitalWrite(" + dropdown_pin + "," + dropdown_drive + ");\n";
    return code;
};


Blockly.Blocks["digitalread"] = {
    init: function() {
        this.jsonInit(
            {
                "message0": "digitalRead %1",
                "args0": [
                  {
                    "type": "field_dropdown",
                    "name": "pin",
                    "options": [
                        ["0","0"],
                        ["1","1"],
                        ["2","2"],
                        ["3","3"],
                        ["4","4"],
                        ["5","5"],
                        ["6","6"],
                        ["7","7"],
                        ["A0","A0"],
                        ["A1","A1"],
                        ["A2","A2"],
                        ["A3","A3"]
                    ]
                  }
                ],
                "output": "Boolean",
                "colour": 230,
                "tooltip": "",
                "helpUrl": ""
            });
    }
}

Blockly.JavaScript['digitalread'] = function(block) {
    let dropdown_pin = block.getFieldValue('pin');
    let code = "digitalRead(" + dropdown_pin + ")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.Blocks["driveoption"] = {
    init: function() {
        this.jsonInit(
            {
                "message0": "%1",
                "args0": [
                  {
                    "type": "field_dropdown",
                    "name": "drive",
                    "options": [
                        ["HIGH","HIGH"],
                        ["LOW","LOW"]
                    ]
                  }
                ],
                "output": "Boolean",
                "colour": 230,
                "tooltip": "",
                "helpUrl": ""
            });
    }
}

Blockly.JavaScript['driveoption'] = function(block) {
    let dropdown_drive = block.getFieldValue('drive');
    return [dropdown_drive, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.Blocks["analogwrite"] = {
    init: function() {
        this.jsonInit(
            {
                "message0": "analogWrite %1 %2",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "pin",
                        "options": [
                            ["0","0"],
                            ["1","1"],
                            ["2","2"],
                            ["3","3"],
                            ["4","4"],
                            ["5","5"],
                            ["6","6"],
                            ["7","7"],
                            ["A0","A0"],
                            ["A1","A1"],
                            ["A2","A2"],
                            ["A3","A3"]
                        ]
                    },
                    {
                        "type": "input_value",
                        "name": "drive",
                        "check": "Number"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 230,
                "tooltip": "",
                "helpUrl": ""
            });
    }
}

Blockly.JavaScript['analogwrite'] = function(block) {
    let dropdown_pin = block.getFieldValue('pin');
    let value_drive = Blockly.JavaScript.valueToCode(block, 'drive', Blockly.JavaScript.ORDER_ATOMIC);
    if(value_drive.indexOf("(")>=0)
    {
        value_drive = value_drive.substring(value_drive.indexOf("(")+1,value_drive.indexOf(")"));
    }
    value_drive -= 0;
    value_drive = (value_drive>255)?255:value_drive;
    value_drive = (value_drive<0)?0:value_drive;
    let code = "analogWrite(" + dropdown_pin + "," + value_drive + ");\n";
    return code;
};


Blockly.Blocks["analogread"] = {
    init: function() {
        this.jsonInit(
            {
                "message0": "analogRead %1",
                "args0": [
                  {
                    "type": "field_dropdown",
                    "name": "pin",
                    "options": [
                        ["0","0"],
                        ["1","1"],
                        ["2","2"],
                        ["3","3"],
                        ["4","4"],
                        ["5","5"],
                        ["6","6"],
                        ["7","7"],
                        ["A0","A0"],
                        ["A1","A1"],
                        ["A2","A2"],
                        ["A3","A3"]
                    ]
                  }
                ],
                "output": "Number",
                "colour": 230,
                "tooltip": "",
                "helpUrl": ""
            });
    }
}

Blockly.JavaScript['analogread'] = function(block) {
    let dropdown_pin = block.getFieldValue('pin');
    let code = "analogRead(" + dropdown_pin + ")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


