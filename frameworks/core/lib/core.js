/* 
 * core.js
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

// Dummy function to handle non-subeed require statements.
var require = function require() { } ;

// No console? (Opera..), then define a dummy function to avoid errors.
if (typeof console === 'undefined') {
 var console = console || window.console || { };
 console.log = console.info = console.warn = console.error = function() { };
}

Object.extend = function(target, props) {
  for (var key in props) {
    target[key] = props[key];
  }
  return target;
};

/**
  Runtime.
*/
require('runtime/core');
require('runtime/class');
require('runtime/module');

/**
  Core Library
*/
require('core_library/basic_object');
require('core_library/kernel');
require('core_library/array');
require('core_library/hash');
require('core_library/string');

