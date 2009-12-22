/* 
 * system.js
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

// BasicObject, Object, etc.

// RObject.prototype.toString = function() {
  // console.log('calling toString');
  // return VN$(this, 'to_s');
// }






// //  Hash
// var RHash = function() {
//  this.$klass = rb_cHash ;
//  this.$type = T_HASH;
// 
//  this.keys = [];
//  this.values = { };
//  this.ifnone = nil;
//  return this;
// };
// 
// RHash.prototype.$define_singleton_method = RObject.prototype.$define_singleton_method;
// RHash.prototype.$make_metaclass = RObject.prototype.$make_metaclass;
// 
// VN.$h = function() {
//  var hash = new RHash();
//  for (var i = 0; i < arguments.length; i++) {
//    VN$(hash, '[]=', arguments[i], arguments[i + 1]);
//    i++;
//  }
//  return hash;
// };



// Symbol
var RSymbol = function(ptr) {
this.$klass = rb_cSymbol ;
this.$type = T_SYMBOL;
this.toString = function() {
  // hack, for associative js arrays, we need a unique string name :(
  return this.ptr;
};
this.ptr = ptr;
return this;
};

// Keys are ids, values are their associated instances of RSymbol
//  'adam' => [Obj]
// keys do not contain the ':'
var rb_sym_table = { };


function ID2SYM(id) {
 if (rb_sym_table.hasOwnProperty(id)) {
   return rb_sym_table[id];
 }
 var sym = new RSymbol(id);
 rb_sym_table[id] = sym
 return sym;
};












// <html>
//  <head><title>Ruby eval test..</title>
//  <script src="runtime/eval.js" type="text/javascript" charset="utf-8"></script>
//  
//  <script id="ruby_test_code" type="text/ruby" charset="utf-8">
//    
//    adam, ben = john, adam(10, 13)
//    
//    adam ben, john, :tom => 100
//    
//    ben 1, 13, 14
//    
//    result = if adam
//                10
//              end
//  
//  </script>
//  <script type="text/javascript" charset="utf-8">
//  
//    var str = document.getElementById('ruby_test_code').innerHTML.toString();
//    var parser = vn_ruby_parser();
//    var tok;
//    console.log(parser(str));
//  
//  </script>
// 
//  </head>
//  <body>
//    
//  </body>
// </html>

