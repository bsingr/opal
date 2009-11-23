/* 
 * Proc.j
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

// should use objj* here..
var rb_cProc = rb_define_class('Proc', CPObject);

Function.prototype.isa = rb_cProc;
Function.prototype.type = T_PROC;

class_addMethods(rb_cProc, [
    
    // rb_define_singleton_method(rb_cProc, 'new', function(self, _cmd) {
    // 
    // });
    
    new objj_method(sel_getUid('call'), function(self, _cmd) {
        // fixme, slice from index 2 instead (i.e. ignore self, _cmd)
        return self.apply(self, [arguments[2]]);
    }),
    
    new objj_method(sel_getUid('[]'), function(self, _cmd) {

    }),
    
    new objj_method(sel_getUid('==='), function(self, _cmd) {

    }),
    
    new objj_method(sel_getUid('yield'), function(self, _cmd) {

    }),
    
    new objj_method(sel_getUid('to_proc'), function(self, _cmd) {

    }),
    
    new objj_method(sel_getUid('arity'), function(self, _cmd) {

    }),
    
    new objj_method(sel_getUid('clone'), function(self, _cmd) {

    }),
    
    new objj_method(sel_getUid('dup'), function(self, _cmd) {

    }),
    
    new objj_method(sel_getUid('=='), function(self, _cmd) {

    }),
    
    new objj_method(sel_getUid('eql?'), function(self, _cmd) {

    }),
    
    new objj_method(sel_getUid('hash'), function(self, _cmd) {

    }),
    
    new objj_method(sel_getUid('to_s'), function(self, _cmd) {

    }),
    
    new objj_method(sel_getUid('lambda?'), function(self, _cmd) {

    }),
    
    new objj_method(sel_getUid('binding'), function(self, _cmd) {

    }),
    
    new objj_method(sel_getUid('curry'), function(self, _cmd) {

    }),
    
    new objj_method(sel_getUid('source_location'), function(self, _cmd) {

    })
]);
