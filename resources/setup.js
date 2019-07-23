
'use strict';

//Create a namespace for the application.
let Code = {};

//Lookup for names of supported languages.  Keys should be in ISO 639 format.
Code.LANGUAGE_NAME = {
    'ar': 'العربية',
    'be-tarask': 'Taraškievica',
    'br': 'Brezhoneg',
    'ca': 'Català',
    'cs': 'Česky',
    'da': 'Dansk',
    'de': 'Deutsch',
    'el': 'Ελληνικά',
    'en': 'English',
    'es': 'Español',
    'et': 'Eesti',
    'fa': 'فارسی',
    'fr': 'Français',
    'he': 'עברית',
    'hrx': 'Hunsrik',
    'hu': 'Magyar',
    'ia': 'Interlingua',
    'is': 'Íslenska',
    'it': 'Italiano',
    'ja': '日本語',
    'kab': 'Kabyle',
    'ko': '한국어',
    'mk': 'Македонски',
    'ms': 'Bahasa Melayu',
    'nb': 'Norsk Bokmål',
    'nl': 'Nederlands, Vlaams',
    'oc': 'Lenga d\'òc',
    'pl': 'Polski',
    'pms': 'Piemontèis',
};

//List of RTL languages.
Code.LANGUAGE_RTL = ['ar', 'fa', 'he', 'lki'];

//Blockly's main workspace.
Code.workspace = null;

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if parameter not found.
 * @return {string} The parameter value or the default value if not found.
 */
Code.getStringParamFromUrl = function(name, defaultValue) {
    let val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

// Get the language of this user from the URL
Code.getLang = function() {
    let lang = Code.getStringParamFromUrl('lang', '');
    if (Code.LANGUAGE_NAME[lang] === undefined) {
      // Default to English.
      lang = 'en';
    }
    return lang;
};

/**
 * Is the current language (Code.LANG) an RTL language?
 * @return {boolean} True if RTL, false if LTR.
 */
Code.isRtl = function() {
    return Code.LANGUAGE_RTL.indexOf(Code.LANG) != -1;
};

//Load blocks
Code.loadBlocks = function(defaultXml) {
    if(defaultXml){
        // Load the editor with default starting blocks.
        let xml = Blockly.Xml.textToDom(defaultXml);
        Blockly.Xml.domToWorkspace(xml, Code.workspace);
    }
};

// Load the Prettify CSS and JavaScript.
Code.importPrettify = function() {
    let script = document.createElement('script');
    script.setAttribute('src', 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js');
    document.head.appendChild(script);
};

Code.LANG = Code.getLang();

Code.TABS_ = ['blocks', 'javascript', 'arduino'];

Code.selected = 'javascript';

/**
 * Check whether all blocks in use have generator functions.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.checkAllGeneratorFunctionsDefined = function(generator) {
    let blocks = Code.workspace.getAllBlocks(false);
    let missingBlockGenerators = [];
    for (let i = 0; i < blocks.length; i++) {
      let blockType = blocks[i].type;
      if (!generator[blockType]) {
        if (missingBlockGenerators.indexOf(blockType) === -1) {
          missingBlockGenerators.push(blockType);
        }
      }
    }
  
    let valid = missingBlockGenerators.length == 0;
    if (!valid) {
        let msg = 'The generator code for the following blocks not specified for '
            + generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
        Blockly.alert(msg);  // Assuming synchronous. No callback.
    }
    return valid;
};

/**
 * Attempt to generate the code and display it in the UI, pretty printed.
 * @param generator {!Blockly.Generator} The generator to use.
 * @param prettyPrintType {string} The file type key for the pretty printer.
 */
Code.attemptCodeGeneration = function(generator, prettyPrintType) {
    let content = document.getElementById("textDiv");

    if (Code.checkAllGeneratorFunctionsDefined(generator)) {
        let code = generator.workspaceToCode(Code.workspace);
        
        let boolVars = [];
        let floatVars = [];
        let stringVars = [];

        //filter vars to the three groups above
        Blockly.Variables.allUsedVarModels(Code.workspace).forEach((element)=>{
            let firstDefIndex = code.indexOf(element.name + " =");
            let valueStr = code.substring(code.indexOf("=",firstDefIndex) + 2,code.indexOf(";",firstDefIndex));
            if(valueStr == "true" || valueStr == "false")
            {
                boolVars.push(element.name);
            }
            else if(isNaN(valueStr))
            {
                stringVars.push(element.name);
            }
            else {
                floatVars.push(element.name);
            }
        });

        //removing the vars and replacing them with the apropriate C data types
        if(code.indexOf("var") >= 0 && code.indexOf("var") < code.indexOf("void setup")){
            code = code.substring(code.indexOf(";") + 1, code.length - 1);
            code = (stringVars.length > 0)? ("String " + stringVars.concat() + ";\n" + code) : code;
            code = (floatVars.length > 0)? ("float " + floatVars.concat() + ";\n" + code) : code;
            code = (boolVars.length > 0)? ("bool " + boolVars.concat() + ";\n" + code) : code;
        }

        code = code.replace(/'/g, "\"");

        if (typeof PR.prettyPrintOne == 'function') {
            code = PR.prettyPrintOne(code, prettyPrintType);
            content.innerHTML = code;
        }
    }
}

let blocklyDiv = document.getElementById("blocklyDiv");

Code.init = function() {

    let rtl = Code.isRtl();

    for(let messageKey in MSG) {
        if (messageKey.indexOf('cat') == 0) {
          Blockly.Msg[messageKey.toUpperCase()] = MSG[messageKey];
        }
    }

    // Construct the toolbox XML, replacing translated letiable names.
    let toolboxText = document.getElementById('toolbox').outerHTML;
    toolboxText = toolboxText.replace(/(^|[^%]){(\w+)}/g,
      function(m, p1, p2) {return p1 + MSG[p2];});
    let toolboxXml = Blockly.Xml.textToDom(toolboxText);

    Code.workspace = Blockly.inject(blocklyDiv,
        {
            grid: {
                    spacing: 25,
                    length: 3,
                    colour: '#ccc',
                    snap: true
                  },
            media: 'resources/media/',
            rtl: rtl,
            toolbox: toolboxXml,
            zoom: {controls: true,wheel: true}
        }
    );

    Code.loadBlocks("<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"setup\" id=\"mRuK0--$0K7Q.R_eOWvC\" x=\"188\" y=\"138\"><next><block type=\"loop\" id=\"trk=o.C{-1`gAE]5lH8v\"></block></next></block></xml>");
    
    setTimeout(
        ()=>{
            Code.importPrettify();
            
            Code.workspace.addChangeListener(()=>{
                Code.attemptCodeGeneration(Blockly.JavaScript,"js");
            });
            setTimeout(()=>{
                Code.attemptCodeGeneration(Blockly.JavaScript,"js");
            },15);
        },1);
}

let onresize = function(e) {
    Blockly.svgResize(Code.workspace);
};

function setup()
{
    Code.init();
    //  the style below is written in js to overwrite previously defined styles
    //  you cannot put it inside an external style sheet
    blocklyDiv.style.position = "absolute";
    blocklyDiv.style.top = "10%";
    blocklyDiv.style.left = "0%";
    blocklyDiv.style.height = "90%";
    blocklyDiv.style.width = "65%";
    
    window.addEventListener('resize', onresize, false);
    Blockly.svgResize(Code.workspace);
}

// Load the Code demo's language strings.
document.write('<script src="resources/msg/' + Code.LANG + '.js"></script>\n');

// Load Blockly's language strings.
document.write('<script src="resources/js/' + Code.LANG + '.js"></script>\n');

document.body.onload = setup;


/*
    window.onkeydown = keyDown;
    
    function keyDown(e)
    {
        let btnDown = e.which || e.keyCode;
    
        if (btnDown == 88)
        {
            let xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
            let xmlText = Blockly.Xml.domToPrettyText(xmlDom);
            console.log(xmlText);
        }
    }
*/