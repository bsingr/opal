/* 
 * mapings.js
 * cappruby
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
  New system
*/
function cr_mappings_s_defaults(cls, sel, name, default_options) {
  var f = function(k, sel, options) {
    var _$ = cappruby_block; cappruby_block = nil;
    // get all correct options from defaults and user.
    var h = new objj_dictionary();
    rb_hash_merge(h, 'merge:', default_options);
    rb_hash_merge(h, 'merge:', options);
    
    // resulting obj
    var obj = objj_msgSend(cls, "alloc");
    objj_msgSend(obj, "init_with_options:", h);

    if (_$) cr_yield(_$, [obj]);
    return obj;
  };
  
  rb_define_method(CappRuby, name.ptr + ":", f, 1);
  
  return cls;
};

function cr_mappings_s_constant(cls, sel, name, hash) {
  var c;
  if (!cls['@cappruby_constants']) {
    c = rb_ivar_set(cls, '@cappruby_constants', rb_hash_new());
  }
  else {
    c = cls['@cappruby_constants'];
  }
  dictionary_setValue(c, name, hash);
  return cls;
};

function cr_mappings_s_constant_name(cls, sel, name) {
  return dictionary_getValue(cls['@cappruby_constants'], name);
};


/**
  Initialize mappings. All methods are added to Kernel module to avoid 
  over populating the Object namespace. (hide from Cappuccino).
*/
function Init_Mappings() {
  
  rb_define_method(rb_cModule, "defaults:", cr_mappings_s_defaults, -1);
  rb_define_method(rb_cModule, "constant:", cr_mappings_s_constant, -1);
  rb_define_method(rb_cModule,"constant_name:", cr_mappings_s_constant_name,-1);

  Init_Mappings_Geometry();
};
