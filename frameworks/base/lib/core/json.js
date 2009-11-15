/*
    http://www.JSON.org/json2.js
    2009-09-29

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

// Reformats the object into a Ruby compatible object. Basically, objects are 
// converted into hashes, and null into 'nil'
function JSONParserReformatter(object)
{
  var hash = new RHash();
  for (var prop in object) {
    var val = object[prop];
    
    if (val == null) {
      val = nil;
    }
    else if (val.$klass == cArray) {
      val = JSONParserReformatterArray(val);
    }
    else if (val.constructor == Object) {
      val = JSONParserReformatter(val);
    }
    
    VN$(hash, 'store', prop, val);
  }
  return hash;
}

function JSONParserReformatterArray(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == null) {
      array[i] = nil;
    }
    else if (array[i].$klass == cArray) {
      array[i] = JSONParserReformatterArray(array[i]);
    }
    else if (array[i].constructor == Object) {
      array[i] = JSONParserReformatter(array[i]);
    }
  }
  return array;
}

function JSONParserParse(parse_text)
{
  var at,
    ch,
    escapee = {
      '"':  '"',
      '\\': '\\',
      '/':  '/',
      b:  '\b',
      f:  '\f',
      n:  '\n',
      r:  '\r',
      t:  '\t'
    },
    text;
  
  var error = function(m)
  {
    console.log("message:" + m + "...... at:" + at +  " /////// text:");
    // throw {
    //       name:  'SyntaxError',
    //       message: m,
    //       at:    at,
    //       text:  text
    //     };
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
  };

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
      return nil;
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
    var newDict = new RHash();

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
        if (VN$(newDict, 'has_key?', key)) {
          error('Duplicate key "' + key + '"');
        }
        VN$(newDict, 'store', key, value());
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

    text = parse_text;
    at = 0;
    ch = ' ';
    result = value();
    white();
    if (ch) {
      error("Syntax error");
    }

    return result;
}