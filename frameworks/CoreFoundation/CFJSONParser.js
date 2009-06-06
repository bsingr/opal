// 
//  CFJSONParser.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// typedef struct {
//     CFDataRef jsonData;
// }CFJSONParserRef;
// 
function CFJSONParserRef(jsonData)
{
    this.jsonData = jsonData;
}

// extern CFJSONParserRef CFJSONParserCreate(CFDataRef jsonData);
// 
function CFJSONParserCreate(jsonData)
{
    return new CFJSONParserRef(jsonData);
}

// extern bool CFJSONParserParse(CFJSONParseRef parser);
// 
function CFJSONParserParse(parser)
{
    var at,
        ch,
        escapee = {
            '"':  '"',
            '\\': '\\',
            '/':  '/',
            b:    '\b',
            f:    '\f',
            n:    '\n',
            r:    '\r',
            t:    '\t'
        },
        text;
    
    var error = function(m)
    {
        console.log("message:" + m + "...... at:" + at +  " /////// text:");
        // throw {
        //             name:    'SyntaxError',
        //             message: m,
        //             at:      at,
        //             text:    text
        //         };
    };

    var next = function(c)
    {
        if (c && c !== ch) {
            error("Expected '" + c + "' instead of '" + ch + "'");
        }

        ch = text.charAt(at);
        at += 1;
        return ch;
    };

    var number = function()
    {
        var number,
            string = '';

        if (ch === '-') {
            string = '-';
            next('-');
        }
        while (ch >= '0' && ch <= '9') {
            string += ch;
            next();
        }
        if (ch === '.') {
            string += '.';
            while (next() && ch >= '0' && ch <= '9') {
                string += ch;
            }
        }
        if (ch === 'e' || ch === 'E') {
            string += ch;
            next();
            if (ch === '-' || ch === '+') {
                string += ch;
                next();
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
        }
        number = +string;
        if (isNaN(number)) {
            error("Bad number");
        } else {
            return number;
        }
    };

    var string = function()
    {

        var hex,
            i,
            string = '',
            uffff;
        if (ch === '"') {
            while (next()) {
                if (ch === '"') {
                    next();
                    return string;
                } else if (ch === '\\') {
                    next();
                    if (ch === 'u') {
                        uffff = 0;
                        for (i = 0; i < 4; i += 1) {
                            hex = parseInt(next(), 16);
                            if (!isFinite(hex)) {
                                break;
                            }
                            uffff = uffff * 16 + hex;
                        }
                        string += String.fromCharCode(uffff);
                    } else if (typeof escapee[ch] === 'string') {
                        string += escapee[ch];
                    } else {
                        break;
                    }
                } else {
                    string += ch;
                }
            }
        }
        error("Bad string");
    };

    var white = function()
    {
        while (ch && ch <= ' ') {
            next();
        }
    },

    var word = function ()
    {
        switch (ch) {
        case 't':
            next('t');
            next('r');
            next('u');
            next('e');
            return true;
        case 'f':
            next('f');
            next('a');
            next('l');
            next('s');
            next('e');
            return false;
        case 'n':
            next('n');
            next('u');
            next('l');
            next('l');
            return null;
        }
        error("Unexpected '" + ch + "'");
    };

    var value;

    var array = function()
    {
        var array = [];

        if (ch === '[') {
            next('[');
            white();
            if (ch === ']') {
                next(']');
                return array;   // empty array
            }
            while (ch) {
                array.push(value());
                white();
                if (ch === ']') {
                    next(']');
                    return array;
                }
                next(',');
                white();
            }
        }
        error("Bad array");
    };

    var dictionary = function()
    {
        var key;
        var newDict = new CFMutableDictionaryRef();

        if (ch === '{') {
            next('{');
            white();
            if (ch === '}') {
                next('}');
                return newDict;   // empty object
            }
            while (ch) {
                key = string();
                white();
                next(':');
                if (CFDictionaryContainsKey(newDict, key)) {
                    error('Duplicate key "' + key + '"');
                }
                CFDictionarySetValue(newDict, key, value());
                white();
                if (ch === '}') {
                    next('}');
                    return newDict;
                }
                next(',');
                white();
            }
        }
        error("Bad dictionary");
    };

    var value = function()
    {

        white();
        switch (ch) {
        case '{':
            return dictionary();
        case '[':
            return array();
        case '"':
            return string();
        case '-':
            return number();
        default:
            return ch >= '0' && ch <= '9' ? number() : word();
        }
    };

        var result;

        text = parser.jsonData;
        at = 0;
        ch = ' ';
        result = value();
        white();
        if (ch) {
            error("Syntax error");
        }

        return result;
}