/* 
 * objj_additions.js
 * opal
 * 
 * Created by Adam Beynon.
 * Copyright 2010 Adam Beynon.
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

/**
  Stuff in here are things that are generally useful, and could be implemented
  as part of vanilla objj.
  
  They are kept here to avoid possible conflicts in the future.
*/ 

/**
  Types: useful for identifying types of objects: extends CLS, OBJ types.
*/
T_CLASS   = 0;
T_MODULE  = 1;
T_OBJECT  = 2;
T_ICLASS  = 3;
T_STRING  = 4;
T_ARRAY   = 5;
T_NUMBER  = 6;
T_PROC    = 7;
T_SYMBOL  = 8;
T_HASH    = 9;
T_BOOLEAN = 10;

// //  type support
// Number.prototype.objj_flags = T_NUMBER;
// Array.prototype.objj_flags = T_ARRAY;
// Boolean.prototype.objj_flags = T_BOOLEAN;
// Function.prototype.objj_flags = T_PROC;

/**
  CLS_SINGLETON
  
  Identifiy objects as singletons (or more specifically, classes)
  
  This is also a "nicer" way for handling KVO replacing classes.. makes the idea
  more generic.
*/
CLS_SINGLETON = 0x16;

/**
  Duplicate class - for now a hack, need to actually do this.
*/
function objj_duplicateClass(klass, name) {
  var c = objj_allocateClassPair(klass, name);
  
  objj_registerClassPair(c);
  _class_initialize(c);
  return c;
};

/**
  Proc/Block/Func
*/
objj_registerClassPair(objj_allocateClassPair(CPObject, "CPBlock"));

Function.prototype.isa = CPBlock;

/**
  Boolean/BOOL/bool
*/
objj_registerClassPair(objj_allocateClassPair(CPObject, "CPBoolean"));

Boolean.prototype.isa = CPBoolean;

/**
  NilClass .. currently wont work as nil in objj is null, but we still use it in
  cappruby (in msgSend we detect nil, and set the class to CPNil)
*/
objj_registerClassPair(objj_allocateClassPair(CPObject, "CPNil"));
