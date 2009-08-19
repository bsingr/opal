/* 
 * object.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var Class = { };

/**
  Extends the object passed as the first parameter using the properties
  defined in the second argument.
*/
Object.extend = function() {

  var target = arguments[0] || { };
  var idx = 1;
  var len = arguments.length;
  var options;
  
  if (len == 1) {
    target = this;
    idx = 0;
  }
  
  for ( ; idx < len; idx++) {
    if (!(options = arguments[idx])) continue;
    for (var key in options) {
      target[key] = options[key];
    }
  }
  
  return target;
};

// var initializing = false,
// fnTest = /xyz/.test(function() {
//   xyz;
// }) ? /b_superb/: /.*/;
// // The base Class implementation (does nothing)
// this.Class = function() {};
// 
// // Create a new Class that inherits from this class
// Class.extend = function(prop) {
//   var _super = this.prototype;
// 
//   // Instantiate a base class (but only create the instance,
//   // don't run the init constructor)
//   initializing = true;
//   var prototype = new this();
//   initializing = false;
//   // Copy the properties over onto the new prototype
//   for (var name in prop) {
//     // Check if we're overwriting an existing function
//     prototype[name] = typeof prop[name] == "function" &&
//     typeof _super[name] == "function" && fnTest.test(prop[name]) ?
//     (function(name, fn) {
//       return function() {
//         var tmp = this._super;
// 
//         // Add a new ._super() method that is the same method
//         // but on the super-class
//         this._super = _super[name];
// 
// 
//         // The method only need to be bound temporarily, so we
//         // remove it when we're done executing
//         var ret = fn.apply(this, arguments);
//         this._super = tmp;
// 
//         return ret;
//       };
//     })(name, prop[name]) :
//     prop[name];
//   }
// 
//   // The dummy class constructor
//   function Class() {
//     if (!initializing) {
//       if (arguments.length == 0) {
//         this.init.apply(this, arguments);
//       }
//       else {
//         var args = [],
//         idx = 1;
//         // first argument is the custom initializer, so from the 2nd
//         // argument we want to apply to the initializer.
//         for (; idx < arguments.length; idx++) {
//           args.push(arguments[idx])
//         }
//         if (this[arguments[0]]) {
//           this[arguments[0]].apply(this, args);
//         }
//         else {
//           console.log(arguments[0] + " does not exist: " + arguments.length)
//           console.log(args);
//         }
//       }
//     }
//   }
// 
//   // Populate our constructed prototype object
//   Class.prototype = prototype;
// 
//   // Enforce the constructor to be what we expect
//   Class.constructor = Class;
// 
//   // And make this class extendable
//   Class.extend = arguments.callee;
// 
//   Class.create = function(args) {
//     return new this(args);
//   };
// 
//   return Class;
// };
// 
// 


// // Inspired by base2 and Prototype
//  (function() {
//   var initializing = false,
//   fnTest = /xyz/.test(function() {
//     xyz;
//   }) ? /b_superb/: /.*/;
//   // The base Class implementation (does nothing)
//   this.Class = function() {};
//
//   // Create a new Class that inherits from this class
//   Class.extend = function(prop) {
//     var _super = this.prototype;
//
//     // Instantiate a base class (but only create the instance,
//     // don't run the init constructor)
//     initializing = true;
//     var prototype = new this();
//     initializing = false;
//
//     // Copy the properties over onto the new prototype
//     for (var name in prop) {
//       // Check if we're overwriting an existing function
//       prototype[name] = typeof prop[name] == "function" &&
//       typeof _super[name] == "function" && fnTest.test(prop[name]) ?
//       (function(name, fn) {
//         return function() {
//           var tmp = this._super;
//
//           // Add a new ._super() method that is the same method
//           // but on the super-class
//           this._super = _super[name];
//
//
//           // The method only need to be bound temporarily, so we
//           // remove it when we're done executing
//           var ret = fn.apply(this, arguments);
//           this._super = tmp;
//
//           return ret;
//         };
//       })(name, prop[name]) :
//       prop[name];
//     }
//
//     // The dummy class constructor
//     function Class() {
//       if (!initializing) {
//         if (arguments.length == 0) {
//           this.init.apply(this, arguments);
//         }
//         else {
//           var args = [],
//           idx = 1;
//           // first argument is the custom initializer, so from the 2nd
//           // argument we want to apply to the initializer.
//           for (; idx < arguments.length; idx++) {
//             args.push(arguments[idx])
//           }
//           this[arguments[0]].apply(this, args);
//         }
//       }
//     }
//
//     // Populate our constructed prototype object
//     Class.prototype = prototype;
//
//     // Enforce the constructor to be what we expect
//     Class.constructor = Class;
//
//     // And make this class extendable
//     Class.extend = arguments.callee;
//
//     return Class;
//   };
// })();
