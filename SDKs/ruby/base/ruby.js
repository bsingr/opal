/* 
 * ruby.js
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

// Basic Ruby types
var RUBY_T_NONE   = 0x00,

    RUBY_T_OBJECT = 0x01,
    RUBY_T_CLASS  = 0x02,
    RUBY_T_MODULE = 0x03,
    RUBY_T_FLOAT  = 0x04,
    RUBY_T_STRING = 0x05,
    RUBY_T_REGEXP = 0x06,
    RUBY_T_ARRAY  = 0x07,
    RUBY_T_HASH   = 0x08,
    RUBY_T_STRUCT = 0x09,
    RUBY_T_BIGNUM = 0x0a,
    RUBY_T_FILE   = 0x0b,
    RUBY_T_DATA   = 0x0c,
    RUBY_T_MATCH  = 0x0d,
    RUBY_T_COMPLEX  = 0x0e,
    RUBY_T_RATIONAL = 0x0f,

    RUBY_T_NIL    = 0x11,
    RUBY_T_TRUE   = 0x12,
    RUBY_T_FALSE  = 0x13,
    RUBY_T_SYMBOL = 0x14,
    RUBY_T_FIXNUM = 0x15,

    RUBY_T_UNDEF  = 0x1b,
    RUBY_T_NODE   = 0x1c,
    RUBY_T_ICLASS = 0x1d,
    RUBY_T_ZOMBIE = 0x1e,

    RUBY_T_MASK   = 0x1f;

/**
  @param {VALUE} val
  @param {int} type
*/
function rb_check_type(val, type) {
  
};

/**
  @param {VALUE} val
  @returns VALUE
*/
function rb_str_to_str(val) {
  
};

/**
  @param {VALUE} val
  @returns VALUE
*/
function rb_string_value(val) {
  
};

/**
  @returns VALUE
*/
function rb_newobj() {
  
};

function RBasic() {
  this.flags = null; // VALUE
  this.klass = null; // VALUE
};

function RObject() {
  this.basic = null; // RBasic
  this.iv_index_tbl = null; // st_stable
};

function RClass() {
  this.basic = null; // RBasic
  this.ptr = {
    super_class: null, // VALUE
    iv_tbl: null, // st_table
  };
  this.m_tbl = null; // st_table
  this.iv_index_tbl = null; // st_table
};


function RFloat() {
  this.basic = null; // RBasic
  this.float_value = 0.0; // float
};

function RString() {
  this.basic = null; // RBasic
  this.ptr = ''; // char *
};

function RArray() {
  this.basic = null; // RBasic
  this.ptr = []; // ptr
};

function RRegexp() {
  this.basic = null; // RBasic
  this.src = null; // VALUE
};

function RHash() {
  this.basic = null; // RBasic
  this.ntbl = null; // st_table
  this.ifnone = null; // VALUE
};

function RStruct() {
  this.basic = null; // RBasic
  this.ptr = null; // VALUE
};

function RBignum() {
  this.basic = null;
  this.digits = null;
};

/**
  @param {String} name
  @param {VALUE} super_class
  @returns VALUE
*/
function rb_define_class(name, super_class) {
  
};

/**
  @param {String} name
  @returns VALUE
*/
function rb_define_module(name) {
  
};

/**
  @param {VALUE} top
  @param {String} name
  @param {VALUE} super_class
  @returns VALUE
*/
function rb_define_class_under(top, name, super_class) {
  
};

/**
  @param {VALUE} top
  @param {String} name
  @returns VALUE
*/
function rb_define_module_under(top, name) {
  
};

/**
  @param {VALUE} klass
  @param {VALUE} module
*/
function rb_include_module(klass, module) {
  
};

/**
  @param {VALUE} obj
  @param {VALUE} ext
*/
function rb_extend_object(obj, ext) {
  
};

// rb_global_variable

// void rb_define_variable(const char*,VALUE*);
function rb_define_variable(name, val) {
  
};

// void rb_define_virtual_variable(const char*,VALUE(*)(ANYARGS),void(*)(ANYARGS));
function rb_define_virtual_variable(name, val, val2) {
  
};

// void rb_define_hooked_variable(const char*,VALUE*,VALUE(*)(ANYARGS),void(*)(ANYARGS));
function rb_define_hooked_variable(name, val, val2, val3) {
  
};

// void rb_define_readonly_variable(const char*,VALUE*);
function rb_define_readonly_variable(name, val) {
  
};

// void rb_define_const(VALUE,const char*,VALUE);
function rb_define_const(val, name, val2) {
  
};

// void rb_define_global_const(const char*,VALUE);
function rb_define_global_const(name, val) {
  
};

// 

// void rb_define_method(VALUE,const char*,VALUE(*)(ANYARGS),int);
function rb_define_method(klass, name, args, count) {
  
};

// void rb_define_module_function(VALUE,const char*,VALUE(*)(ANYARGS),int);
function rb_define_module_function(module, name, args, count) {
  
};

// void rb_define_global_function(const char*,VALUE(*)(ANYARGS),int);
function rb_define_global_function(name, args, count) {
  
};

// 

// void rb_undef_method(VALUE,const char*);
function rb_undef_method(klass, name) {
  
};

// void rb_define_alias(VALUE,const char*,const char*);
function rb_define_alias(klass, name, name2) {
  
};

// void rb_define_attr(VALUE,const char*,int,int);
function rb_define_attr(klass, name, count, count2) {
  
};

// void rb_global_variable(VALUE*);
// void rb_gc_register_mark_object(VALUE);
// void rb_gc_register_address(VALUE*);
// void rb_gc_unregister_address(VALUE*);
// 
// ID rb_intern(const char*);
// ID rb_intern2(const char*, long);
// ID rb_intern_str(VALUE str);
// const char *rb_id2name(ID);
// ID rb_to_id(VALUE);
// VALUE rb_id2str(ID);
// 
// 
// const char *rb_class2name(VALUE);
// const char *rb_obj_classname(VALUE);


// void rb_p(VALUE);
function rb_p(val) {
  
};

// VALUE rb_funcall(VALUE, ID, int, ...);
function rb_funcall(obj, method, count) {
  
};

// VALUE rb_funcall2(VALUE, ID, int, const VALUE*);
function rb_funcall2(obj, name, count, val) {
  
};

// VALUE rb_funcall3(VALUE, ID, int, const VALUE*);
function rb_funcall3(obj, metho, count, val) {
  
};

// int rb_scan_args(int, const VALUE*, const char*, ...);
// VALUE rb_call_super(int, const VALUE*);
// 
// VALUE rb_gv_set(const char*, VALUE);
// VALUE rb_gv_get(const char*);
// VALUE rb_iv_get(VALUE, const char*);
// VALUE rb_iv_set(VALUE, const char*, VALUE);
// 
// VALUE rb_equal(VALUE,VALUE);
// 
// VALUE *rb_ruby_verbose_ptr(void);
// VALUE *rb_ruby_debug_ptr(void);
// #define ruby_verbose (*rb_ruby_verbose_ptr())
// #define ruby_debug   (*rb_ruby_debug_ptr())
// 
// PRINTF_ARGS(NORETURN(void rb_raise(VALUE, const char*, ...)), 2, 3);
// PRINTF_ARGS(NORETURN(void rb_fatal(const char*, ...)), 1, 2);
// PRINTF_ARGS(NORETURN(void rb_bug(const char*, ...)), 1, 2);
// NORETURN(void rb_sys_fail(const char*));
// NORETURN(void rb_iter_break(void));
// NORETURN(void rb_exit(int));
// NORETURN(void rb_notimplement(void));
// 
// /* reports if `-w' specified */
// PRINTF_ARGS(void rb_warning(const char*, ...), 1, 2);
// PRINTF_ARGS(void rb_compile_warning(const char *, int, const char*, ...), 3, 4);
// PRINTF_ARGS(void rb_sys_warning(const char*, ...), 1, 2);
// /* reports always */
// PRINTF_ARGS(void rb_warn(const char*, ...), 1, 2);
// PRINTF_ARGS(void rb_compile_warn(const char *, int, const char*, ...), 3, 4);
// 
// typedef VALUE rb_block_call_func(VALUE, VALUE, int, VALUE*);
// 
// VALUE rb_each(VALUE);
function rb_each(obj) {
  
};

// VALUE rb_yield(VALUE);
function rb_yield(obj) {
  
};

// VALUE rb_yield_values(int n, ...);
// VALUE rb_yield_values2(int n, const VALUE *argv);
// VALUE rb_yield_splat(VALUE);
// int rb_block_given_p(void);
// void rb_need_block(void);
// VALUE rb_iterate(VALUE(*)(VALUE),VALUE,VALUE(*)(ANYARGS),VALUE);
// VALUE rb_block_call(VALUE,ID,int,VALUE*,VALUE(*)(ANYARGS),VALUE);
// VALUE rb_rescue(VALUE(*)(ANYARGS),VALUE,VALUE(*)(ANYARGS),VALUE);
// VALUE rb_rescue2(VALUE(*)(ANYARGS),VALUE,VALUE(*)(ANYARGS),VALUE,...);
// VALUE rb_ensure(VALUE(*)(ANYARGS),VALUE,VALUE(*)(ANYARGS),VALUE);
// VALUE rb_catch(const char*,VALUE(*)(ANYARGS),VALUE);
// VALUE rb_catch_obj(VALUE,VALUE(*)(ANYARGS),VALUE);
// NORETURN(void rb_throw(const char*,VALUE));
// NORETURN(void rb_throw_obj(VALUE,VALUE));

// VALUE rb_require(const char*);
function rb_require(path) {
  
};
