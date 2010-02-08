/* 
 * cappruby.js
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
  Main CappRuby entry point. 
  
  main_file - the .rb file to load (and run)
  args - Passed from main. We send these to CPApplicationMain
  namedArgs - ditto.
*/
function cappruby_main(main_file, args, namedArgs) {
  cappruby_init();
  // need to require main cappruby.rb file
  // var libs = rb_dir_s_glob(rb_cDir, 'glob:', '/Frameworks/CappRuby/**/*.rb');
  // console.log(libs);
  // require main file
  rb_require_file(main_file);
  // cappruby_file_hash['/lib/application.rb'](cappruby_top_self);
  // cappruby_trial(cappruby_top_self);
  CPApplicationMain(args, namedArgs);
  // console.log("jere");
};

/**
  RTEST: given the val 'val', return the truthyness in ruby terms:
  
  only nil, undefined and false are false. 0, "" are both true
*/
function RTEST(val) {
  if (val === nil || val === undefined || val === false) return false;
  return true;
};

/**
  ORTEST: both lhs and rhs are functions. eval lhs, if ruby false, then return
  result of evaling rhs
*/
function ORTEST(lhs, rhs) {
  var res = lhs();
  if (RTEST(res)) return res;
  return rhs();
};

/**
  ANDTEST
*/
function ANDTEST(lhs, rhs) {
  var res = lhs();
  if (RTEST(res)) return rhs();
  return res;
};

/**
  call all cappruby inits
*/
function cappruby_init() {
  Init_Object();
  Init_Dir();
  Init_File();
  Init_Array();
  Init_String();
  Init_Numeric();
  Init_Hash();
  Init_Proc();
  Init_VM();
  Init_Load();
  Init_Mappings();
};
