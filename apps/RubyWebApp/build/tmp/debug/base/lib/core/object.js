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

var metaclass;
var cBasicObject = VN.boot_defclass('BasicObject', null);
var cObject = VN.boot_defclass('Object', cBasicObject);
var cModule = VN.boot_defclass('Module', cObject);
var cClass = VN.boot_defclass('Class', cModule);

metaclass = cBasicObject.$make_metaclass(cClass);
metaclass = cObject.$make_metaclass(metaclass);
metaclass = cModule.$make_metaclass(metaclass);
metaclass = cClass.$make_metaclass(metaclass);

VN.boot_defmetametaclass(cModule, metaclass);
VN.boot_defmetametaclass(cObject, metaclass);
VN.boot_defmetametaclass(cBasicObject, metaclass);

/**
  BasicObject necessary methods
*/
cBasicObject.$define_private_method('initialize', VN.obj_dummy, 0);
cBasicObject.$define_alloc_func(VN.class_allocate_instance);
cBasicObject.$define_method('==', VN.obj_equal, 1);
cBasicObject.$define_method('equal?', VN.obj_equal, 1);
cBasicObject.$define_method('!', VN.obj_not, 0);
cBasicObject.$define_method('!=', VN.obj_not_equal);
cBasicObject.$define_private_method('singleton_method_added', VN.obj_dummy, 1);
cBasicObject.$define_private_method('singleton_method_removed', VN.obj_dummy, 1);
cBasicObject.$define_private_method('singleton_method_undefined', VN.obj_dummy, 1);

/**
  Kernel neccessary methods
*/
mKernel = RModule.define("Kernel");
// VN.include_module(VN.cObject, VN.mKernel);
cClass.$define_private_method('inherited', VN.obj_dummy, 1);
cModule.$define_private_method('included', VN.obj_dummy, 1);
cModule.$define_private_method('extended', VN.obj_dummy, 1);
cModule.$define_private_method('method_added', VN.obj_dummy, 1);
cModule.$define_private_method('method_removed', VN.obj_dummy, 1);
cModule.$define_private_method('method_undefined', VN.obj_dummy, 1);

/**
  Base Classes/Modules
*/
// VN.cNilClass = RClass.define('NilClass', VN.cObject);
var cNilClass = RClass.define('NilClass', cObject);
var cString = RClass.define('String', cObject);

// // VN.cTrueClass = VN.define_class('TrueClass', VN.cObject);
// // VN.cFalseClass = VN.define_class('FalseClass', VN.cObject);
// // VN.cArray = VN.define_class('Array', VN.cObject);
// // VN.cString = VN.define_class('String', VN.cObject);
// // VN.cSymbol = VN.define_class('Symbol', VN.cObject);
// 
// 
// /**
//   Initialize top self - the 'main' object at runtime
// */
// VN.top_self = VN.obj_alloc(VN.cObject);
// 
// VN.top_self.$define_singleton_method('to_s', function() {
//   return 'main';
// });

