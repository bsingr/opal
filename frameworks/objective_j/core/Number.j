/* 
 * Number.js
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

class_addMethods(CPNumber, [

    new objj_method(sel_getUid('coerce'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('+@'), function(self, _cmd) {
        return self;
    }),
    
    new objj_method(sel_getUid('-@'), function(self, _cmd) {
        return self * -1;
    }),
    
    new objj_method(sel_getUid('<=>'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('eql?'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('quo'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('fdiv'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('div'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('divmod'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('modulo'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('remainder'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('abs'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('magnitude'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('to_int'), function(self, _cmd) {
        return parseInt(self);
    }),
    
    new objj_method(sel_getUid('real?'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('integer?'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('zero?'), function(self, _cmd) {
        return self === 0 ? true : false;
    }),
    
    new objj_method(sel_getUid('nonzero?'), function(self, _cmd) {
        return self === 0 ? false : true;
    }),
    
    new objj_method(sel_getUid('floor'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('ceil'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('round'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('truncate'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('step'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('odd?'), function(self, _cmd) {
        return self %2 == 0 ? false  :true;
    }),
    
    new objj_method(sel_getUid('even?'), function(self, _cmd) {
        return self %2 == 0 ? true : false;
    }),
    
    new objj_method(sel_getUid('upto'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('downto'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('times'), function(self, _cmd, block) {
        for (var i = 0; i < self; i++) {
            rb_funcall(block, 'call', i);
            // objj_msgSend(block, 'call', i);
        }
        return self;
    }),
    
    new objj_method(sel_getUid('succ'), function(self, _cmd) {
        return self + 1;
    }),
    
    new objj_method(sel_getUid('next'), function(self, _cmd) {
        return self + 1;
    }),
    
    new objj_method(sel_getUid('pred'), function(self, _cmd) {
        return self - 1
    }),
    
    new objj_method(sel_getUid('chr'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('ord'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('to_i'), function(self, _cmd) {
        return parseInt(self);
    }),
    
    new objj_method(sel_getUid('to_s'), function(self, _cmd) {
        return new String(self);
    }),
    
    new objj_method(sel_getUid('+'), function(self, _cmd, i) {
        return self + i;
    }),
    
    new objj_method(sel_getUid('-'), function(self, _cmd, i) {
        return self - i;
    }),
    
    new objj_method(sel_getUid('*'), function(self, _cmd, i) {
        return self * i;
    }),
    
    new objj_method(sel_getUid('/'), function(self, _cmd, i) {
        return self / i;
    }),
    
    new objj_method(sel_getUid('%'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('**'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('=='), function(self, _cmd, other) {
        return self == other ? true : false;
    }),
    
    new objj_method(sel_getUid('>'), function(self, _cmd, other) {
        return self > other ? true : false;
    }),
    
    new objj_method(sel_getUid('>='), function(self, _cmd, other) {
        return self >= other ? true : false;
    }),
    
    new objj_method(sel_getUid('<'), function(self, _cmd, other) {
        return self < other ? true : false;
    }),
    
    new objj_method(sel_getUid('<='), function(self, _cmd, other) {
        return self <= other ? true : false;
    }),
    
    new objj_method(sel_getUid('~'), function(self, _cmd, other) {

    }),
    
    new objj_method(sel_getUid('&'), function(self, _cmd, other) {
        return self & other;
    }),
    
    new objj_method(sel_getUid('|'), function(self, _cmd, other) {
        return self | other;
    }),
    
    new objj_method(sel_getUid('^'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('[]'), function(self, _cmd) {
        
    }),
    
    new objj_method(sel_getUid('<<'), function(self, _cmd, other) {
        return self << other;
    }),
    
    new objj_method(sel_getUid('>>'), function(self, _cmd, other) {
        return self >> other;
    }),
    
    new objj_method(sel_getUid('to_f'), function(self, _cmd) {
        return parseFloat(self);
    }),
]);
