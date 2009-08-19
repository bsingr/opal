/* 
 * object.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var rb_cBasicObject;
var rb_mKernel;
var rb_cObject;
var rb_cModule;
var rb_cClass;
var rb_cData;

var rb_cNilClass;
var rb_cTrueClass;
var rb_cFalseClass;

function rb_equal(obj1, obj2) {
  var result;
  if (obj1 == obj2) return true;
  result = rb_funcall(obj1, id_eq, 1, obj2); // id_eq = '=='
  if RTEST(result) return Qtrue;
  return Qfalse;
};

function rb_eql(obj1, obj2) {
  return RTEST(rb_funcall(obj1, id_eql, 1, obj2));
};

function rb_obj_equal(obj1, obj2) {
  return (obj1 == obj2) ? Qtrue : Qfalse;
};

function rb_obj_not(obj) {
  return RTEST(obj) ? Qfalse : Qtrue;
};

function rb_obj_not_equal(obj1, obj2) {
  var result = rb_funcall(obj1, id_eq, 1, obj2);
  return RTEST(result) ? Qfalse : Qtrue;
};

function rb_class_real(cl) {
  return cl;
};

function rb_obj_class(obj) {
  
};

function init_copy(dest, obj) {
  
};

function rb_obj_clone(obj) {
  
};

function rb_obj_dup(obj) {
  
};

function rb_obj_init_copy(obj, orig) {
  
};

function rb_any_to_s(obj) {
  
};

function rb_inspect(obj) {
  
};

function inspect_i(id, value, str) {
  
};

function inspect_obj(obj, str, recur) {
  
};

function rb_obj_inspect(obj) {
  
};

function rb_obj_is_instance_of(obj, c) {
  
};

function rb_obj_is_kind_of(obj, c) {
  
};

function rb_obj_tap(obj) {
  
};

function rb_obj_dummy() {
  return Qnil;
};

function rb_obj_tainted(obj) {
  
};

function rb_obj_taint(obj) {
  
};

function rb_obj_untaint(obj) {
  
};

function rb_obj_untrusted(obj) {
  
};

function rb_obj_untrust(obj) {
  
}

function rb_obj_trust(obj) {
  
};

function rb_obj_infect(obj1, obj2) {
  
};

function rb_obj_freeze(obj) {
  
};

function rb_obj_frozen_p(obj) {
  
};







function rb_true(obj) {
  return Qtrue;
};

function rb_false(obj) {
  return Qfalse;
};

function rb_obj_match(obj1, obj2) {
  return Qnil;
};

function rb_obj_not_match(obj1, obj2) {
  var result = rb_funcall(obj1, '!~', 1, obj2);
  return RTEST(result) ? Qfalse : Qtrue;
};



/*
 *  call-seq:
 *     Class.new(super_class=Object)   =>    a_class
 *  
 *  Creates a new anonymous (unnamed) class with the given superclass
 *  (or <code>Object</code> if no parameter is given). You can give a
 *  class a name by assigning the class object to a constant.
 *     
 */

static VALUE
rb_class_initialize(int argc, VALUE *argv, VALUE klass)
{
    VALUE super;

    if (RCLASS_SUPER(klass) != 0) {
	rb_raise(rb_eTypeError, "already initialized class");
    }
    if (argc == 0) {
	super = rb_cObject;
    }
    else {
	rb_scan_args(argc, argv, "01", &super);
	rb_check_inheritable(super);
    }
    RCLASS_SUPER(klass) = super;
    rb_make_metaclass(klass, RBASIC(super)->klass);
    rb_class_inherited(super, klass);
    rb_mod_initialize(klass);

    return klass;
}

/*
 *  call-seq:
 *     class.allocate()   =>   obj
 *  
 *  Allocates space for a new object of <i>class</i>'s class and does not
 *  call initialize on the new instance. The returned object must be an
 *  instance of <i>class</i>.
 *  
 *      klass = Class.new do
 *        def initialize(*args)
 *          @initialized = true
 *        end
 *      
 *        def initialized?
 *          @initialized || false
 *        end
 *      end
 *      
 *      klass.allocate.initialized? #=> false
 *     
 */



/*
 *  call-seq:
 *     attr_reader(symbol, ...)    => nil
 *     attr(symbol, ...)             => nil
 *  
 *  Creates instance variables and corresponding methods that return the
 *  value of each instance variable. Equivalent to calling
 *  ``<code>attr</code><i>:name</i>'' on each name in turn.
 */

static VALUE
rb_mod_attr_reader(int argc, VALUE *argv, VALUE klass)
{
    int i;

    for (i=0; i<argc; i++) {
	rb_attr(klass, rb_to_id(argv[i]), Qtrue, Qfalse, Qtrue);
    }
    return Qnil;
}

VALUE
rb_mod_attr(int argc, VALUE *argv, VALUE klass)
{
    if (argc == 2 && (argv[1] == Qtrue || argv[1] == Qfalse)) {
	rb_warning("optional boolean argument is obsoleted");
	rb_attr(klass, rb_to_id(argv[0]), 1, RTEST(argv[1]), Qtrue);
	return Qnil;
    }
    return rb_mod_attr_reader(argc, argv, klass);
}

/*
 *  call-seq:
 *      attr_writer(symbol, ...)    => nil
 *  
 *  Creates an accessor method to allow assignment to the attribute
 *  <i>aSymbol</i><code>.id2name</code>.
 */

static VALUE
rb_mod_attr_writer(int argc, VALUE *argv, VALUE klass)
{
    int i;

    for (i=0; i<argc; i++) {
	rb_attr(klass, rb_to_id(argv[i]), Qfalse, Qtrue, Qtrue);
    }
    return Qnil;
}

/*
 *  call-seq:
 *     attr_accessor(symbol, ...)    => nil
 *  
 *  Defines a named attribute for this module, where the name is
 *  <i>symbol.</i><code>id2name</code>, creating an instance variable
 *  (<code>@name</code>) and a corresponding access method to read it.
 *  Also creates a method called <code>name=</code> to set the attribute.
 *     
 *     module Mod
 *       attr_accessor(:one, :two)
 *     end
 *     Mod.instance_methods.sort   #=> [:one, :one=, :two, :two=]
 */

static VALUE
rb_mod_attr_accessor(int argc, VALUE *argv, VALUE klass)
{
    int i;

    for (i=0; i<argc; i++) {
	rb_attr(klass, rb_to_id(argv[i]), Qtrue, Qtrue, Qtrue);
    }
    return Qnil;
}

/*
 *  call-seq:
 *     mod.const_get(sym, inherit=true)    => obj
 *  
 *  Returns the value of the named constant in <i>mod</i>.
 *     
 *     Math.const_get(:PI)   #=> 3.14159265358979
 *
 *  If the constant is not defined or is defined by the ancestors and
 *  +inherit+ is false, +NameError+ will be raised.
 */

static VALUE
rb_mod_const_get(int argc, VALUE *argv, VALUE mod)
{
    VALUE name, recur;
    ID id;

    if (argc == 1) {
	name = argv[0];
	recur = Qtrue;
    }
    else {
	rb_scan_args(argc, argv, "11", &name, &recur);
    }
    id = rb_to_id(name);
    if (!rb_is_const_id(id)) {
	rb_name_error(id, "wrong constant name %s", rb_id2name(id));
    }
    return RTEST(recur) ? rb_const_get(mod, id) : rb_const_get_at(mod, id);
}

/*
 *  call-seq:
 *     mod.const_set(sym, obj)    => obj
 *  
 *  Sets the named constant to the given object, returning that object.
 *  Creates a new constant if no constant with the given name previously
 *  existed.
 *     
 *     Math.const_set("HIGH_SCHOOL_PI", 22.0/7.0)   #=> 3.14285714285714
 *     Math::HIGH_SCHOOL_PI - Math::PI              #=> 0.00126448926734968
 */

static VALUE
rb_mod_const_set(VALUE mod, VALUE name, VALUE value)
{
    ID id = rb_to_id(name);

    if (!rb_is_const_id(id)) {
	rb_name_error(id, "wrong constant name %s", rb_id2name(id));
    }
    rb_const_set(mod, id, value);
    return value;
}

/*
 *  call-seq:
 *     mod.const_defined?(sym, inherit=true)   => true or false
 *  
 *  Returns <code>true</code> if a constant with the given name is
 *  defined by <i>mod</i>, or its ancestors if +inherit+ is not false.
 *     
 *     Math.const_defined? "PI"   #=> true
 *     IO.const_defined? "SYNC"   #=> true
 *     IO.const_defined? "SYNC", false   #=> false
 */

static VALUE
rb_mod_const_defined(int argc, VALUE *argv, VALUE mod)
{
    VALUE name, recur;
    ID id;

    if (argc == 1) {
	name = argv[0];
	recur = Qtrue;
    }
    else {
	rb_scan_args(argc, argv, "11", &name, &recur);
    }
    id = rb_to_id(name);
    if (!rb_is_const_id(id)) {
	rb_name_error(id, "wrong constant name %s", rb_id2name(id));
    }
    return RTEST(recur) ? rb_const_defined(mod, id) : rb_const_defined_at(mod, id);
}

/*
 *  call-seq:
 *     obj.methods    => array
 *  
 *  Returns a list of the names of methods publicly accessible in
 *  <i>obj</i>. This will include all the methods accessible in
 *  <i>obj</i>'s ancestors.
 *     
 *     class Klass
 *       def kMethod()
 *       end
 *     end
 *     k = Klass.new
 *     k.methods[0..9]    #=> ["kMethod", "freeze", "nil?", "is_a?", 
 *                        #    "class", "instance_variable_set",
 *                        #    "methods", "extend", "__send__", "instance_eval"]
 *     k.methods.length   #=> 42
 */

static VALUE
rb_obj_methods(int argc, VALUE *argv, VALUE obj)
{
  retry:
    if (argc == 0) {
	VALUE args[1];

	args[0] = Qtrue;
	return rb_class_instance_methods(1, args, CLASS_OF(obj));
    }
    else {
	VALUE recur;

	rb_scan_args(argc, argv, "1", &recur);
	if (RTEST(recur)) {
	    argc = 0;
	    goto retry;
	}
	return rb_obj_singleton_methods(argc, argv, obj);
    }
}

/*
 *  call-seq:
 *     obj.protected_methods(all=true)   => array
 *  
 *  Returns the list of protected methods accessible to <i>obj</i>. If
 *  the <i>all</i> parameter is set to <code>false</code>, only those methods
 *  in the receiver will be listed.
 */

static VALUE
rb_obj_protected_methods(int argc, VALUE *argv, VALUE obj)
{
    if (argc == 0) {		/* hack to stop warning */
	VALUE args[1];

	args[0] = Qtrue;
	return rb_class_protected_instance_methods(1, args, CLASS_OF(obj));
    }
    return rb_class_protected_instance_methods(argc, argv, CLASS_OF(obj));
}

/*
 *  call-seq:
 *     obj.private_methods(all=true)   => array
 *  
 *  Returns the list of private methods accessible to <i>obj</i>. If
 *  the <i>all</i> parameter is set to <code>false</code>, only those methods
 *  in the receiver will be listed.
 */

static VALUE
rb_obj_private_methods(int argc, VALUE *argv, VALUE obj)
{
    if (argc == 0) {		/* hack to stop warning */
	VALUE args[1];

	args[0] = Qtrue;
	return rb_class_private_instance_methods(1, args, CLASS_OF(obj));
    }
    return rb_class_private_instance_methods(argc, argv, CLASS_OF(obj));
}

/*
 *  call-seq:
 *     obj.public_methods(all=true)   => array
 *  
 *  Returns the list of public methods accessible to <i>obj</i>. If
 *  the <i>all</i> parameter is set to <code>false</code>, only those methods
 *  in the receiver will be listed.
 */

static VALUE
rb_obj_public_methods(int argc, VALUE *argv, VALUE obj)
{
    if (argc == 0) {		/* hack to stop warning */
	VALUE args[1];

	args[0] = Qtrue;
	return rb_class_public_instance_methods(1, args, CLASS_OF(obj));
    }
    return rb_class_public_instance_methods(argc, argv, CLASS_OF(obj));
}

/*
 *  call-seq:
 *     obj.instance_variable_get(symbol)    => obj
 *
 *  Returns the value of the given instance variable, or nil if the
 *  instance variable is not set. The <code>@</code> part of the
 *  variable name should be included for regular instance
 *  variables. Throws a <code>NameError</code> exception if the
 *  supplied symbol is not valid as an instance variable name.
 *     
 *     class Fred
 *       def initialize(p1, p2)
 *         @a, @b = p1, p2
 *       end
 *     end
 *     fred = Fred.new('cat', 99)
 *     fred.instance_variable_get(:@a)    #=> "cat"
 *     fred.instance_variable_get("@b")   #=> 99
 */

static VALUE
rb_obj_ivar_get(VALUE obj, VALUE iv)
{
    ID id = rb_to_id(iv);

    if (!rb_is_instance_id(id)) {
	rb_name_error(id, "`%s' is not allowed as an instance variable name", rb_id2name(id));
    }
    return rb_ivar_get(obj, id);
}

/*
 *  call-seq:
 *     obj.instance_variable_set(symbol, obj)    => obj
 *  
 *  Sets the instance variable names by <i>symbol</i> to
 *  <i>object</i>, thereby frustrating the efforts of the class's
 *  author to attempt to provide proper encapsulation. The variable
 *  did not have to exist prior to this call.
 *     
 *     class Fred
 *       def initialize(p1, p2)
 *         @a, @b = p1, p2
 *       end
 *     end
 *     fred = Fred.new('cat', 99)
 *     fred.instance_variable_set(:@a, 'dog')   #=> "dog"
 *     fred.instance_variable_set(:@c, 'cat')   #=> "cat"
 *     fred.inspect                             #=> "#<Fred:0x401b3da8 @a=\"dog\", @b=99, @c=\"cat\">"
 */

static VALUE
rb_obj_ivar_set(VALUE obj, VALUE iv, VALUE val)
{
    ID id = rb_to_id(iv);

    if (!rb_is_instance_id(id)) {
	rb_name_error(id, "`%s' is not allowed as an instance variable name", rb_id2name(id));
    }
    return rb_ivar_set(obj, id, val);
}

/*
 *  call-seq:
 *     obj.instance_variable_defined?(symbol)    => true or false
 *
 *  Returns <code>true</code> if the given instance variable is
 *  defined in <i>obj</i>.
 *
 *     class Fred
 *       def initialize(p1, p2)
 *         @a, @b = p1, p2
 *       end
 *     end
 *     fred = Fred.new('cat', 99)
 *     fred.instance_variable_defined?(:@a)    #=> true
 *     fred.instance_variable_defined?("@b")   #=> true
 *     fred.instance_variable_defined?("@c")   #=> false
 */

static VALUE
rb_obj_ivar_defined(VALUE obj, VALUE iv)
{
    ID id = rb_to_id(iv);

    if (!rb_is_instance_id(id)) {
	rb_name_error(id, "`%s' is not allowed as an instance variable name", rb_id2name(id));
    }
    return rb_ivar_defined(obj, id);
}

/*
 *  call-seq:
 *     mod.class_variable_get(symbol)    => obj
 *  
 *  Returns the value of the given class variable (or throws a
 *  <code>NameError</code> exception). The <code>@@</code> part of the
 *  variable name should be included for regular class variables
 *     
 *     class Fred
 *       @@foo = 99
 *     end
 *     Fred.class_variable_get(:@@foo)     #=> 99
 */

static VALUE
rb_mod_cvar_get(VALUE obj, VALUE iv)
{
    ID id = rb_to_id(iv);

    if (!rb_is_class_id(id)) {
	rb_name_error(id, "`%s' is not allowed as a class variable name", rb_id2name(id));
    }
    return rb_cvar_get(obj, id);
}

/*
 *  call-seq:
 *     obj.class_variable_set(symbol, obj)    => obj
 *  
 *  Sets the class variable names by <i>symbol</i> to
 *  <i>object</i>.
 *     
 *     class Fred
 *       @@foo = 99
 *       def foo
 *         @@foo
 *       end
 *     end
 *     Fred.class_variable_set(:@@foo, 101)     #=> 101
 *     Fred.new.foo                             #=> 101
 */

static VALUE
rb_mod_cvar_set(VALUE obj, VALUE iv, VALUE val)
{
    ID id = rb_to_id(iv);

    if (!rb_is_class_id(id)) {
	rb_name_error(id, "`%s' is not allowed as a class variable name", rb_id2name(id));
    }
    rb_cvar_set(obj, id, val);
    return val;
}

/*
 *  call-seq:
 *     obj.class_variable_defined?(symbol)    => true or false
 *
 *  Returns <code>true</code> if the given class variable is defined
 *  in <i>obj</i>.
 *
 *     class Fred
 *       @@foo = 99
 *     end
 *     Fred.class_variable_defined?(:@@foo)    #=> true
 *     Fred.class_variable_defined?(:@@bar)    #=> false
 */

static VALUE
rb_mod_cvar_defined(VALUE obj, VALUE iv)
{
    ID id = rb_to_id(iv);

    if (!rb_is_class_id(id)) {
	rb_name_error(id, "`%s' is not allowed as a class variable name", rb_id2name(id));
    }
    return rb_cvar_defined(obj, id);
}

static struct conv_method_tbl {
    const char *method;
    ID id;
} conv_method_names[] = {
    {"to_int", 0},
    {"to_ary", 0},
    {"to_str", 0},
    {"to_sym", 0},
    {"to_hash", 0},
    {"to_proc", 0},
    {"to_io", 0},
    {"to_a", 0},
    {"to_s", 0},
    {NULL, 0}
};

static VALUE
convert_type(VALUE val, const char *tname, const char *method, int raise)
{
    ID m = 0;
    int i;

    for (i=0; conv_method_names[i].method; i++) {
	if (conv_method_names[i].method[0] == method[0] &&
	    strcmp(conv_method_names[i].method, method) == 0) {
	    m = conv_method_names[i].id;
	    break;
	}
    }
    if (!m) m = rb_intern(method);
    if (!rb_respond_to(val, m)) {
	if (raise) {
	    rb_raise(rb_eTypeError, "can't convert %s into %s",
		     NIL_P(val) ? "nil" :
		     val == Qtrue ? "true" :
		     val == Qfalse ? "false" :
		     rb_obj_classname(val), 
		     tname);
	}
	else {
	    return Qnil;
	}
    }
    return rb_funcall(val, m, 0);
}

VALUE
rb_convert_type(VALUE val, int type, const char *tname, const char *method)
{
    VALUE v;

    if (TYPE(val) == type) return val;
    v = convert_type(val, tname, method, Qtrue);
    if (TYPE(v) != type) {
	const char *cname = rb_obj_classname(val);
	rb_raise(rb_eTypeError, "can't convert %s to %s (%s#%s gives %s)",
		 cname, tname, cname, method, rb_obj_classname(v));
    }
    return v;
}

VALUE
rb_check_convert_type(VALUE val, int type, const char *tname, const char *method)
{
    VALUE v;

    /* always convert T_DATA */
    if (TYPE(val) == type && type != T_DATA) return val;
    v = convert_type(val, tname, method, Qfalse);
    if (NIL_P(v)) return Qnil;
    if (TYPE(v) != type) {
	const char *cname = rb_obj_classname(val);
	rb_raise(rb_eTypeError, "can't convert %s to %s (%s#%s gives %s)",
		 cname, tname, cname, method, rb_obj_classname(v));
    }
    return v;
}


static VALUE
rb_to_integer(VALUE val, const char *method)
{
    VALUE v;

    if (FIXNUM_P(val)) return val;
    v = convert_type(val, "Integer", method, Qtrue);
    if (!rb_obj_is_kind_of(v, rb_cInteger)) {
	const char *cname = rb_obj_classname(val);
	rb_raise(rb_eTypeError, "can't convert %s to Integer (%s#%s gives %s)",
		 cname, cname, method, rb_obj_classname(v));
    }
    return v;
}

VALUE
rb_check_to_integer(VALUE val, const char *method)
{
    VALUE v;

    if (FIXNUM_P(val)) return val;
    v = convert_type(val, "Integer", method, Qfalse);
    if (!rb_obj_is_kind_of(v, rb_cInteger)) {
	return Qnil;
    }
    return v;
}

VALUE
rb_to_int(VALUE val)
{
    return rb_to_integer(val, "to_int");
}

VALUE
rb_Integer(VALUE val)
{
    VALUE tmp;

    switch (TYPE(val)) {
      case T_FLOAT:
	if (RFLOAT_VALUE(val) <= (double)FIXNUM_MAX
	    && RFLOAT_VALUE(val) >= (double)FIXNUM_MIN) {
	    break;
	}
	return rb_dbl2big(RFLOAT_VALUE(val));

      case T_FIXNUM:
      case T_BIGNUM:
	return val;

      case T_STRING:
	return rb_str_to_inum(val, 0, Qtrue);

      case T_NIL:
	rb_raise(rb_eTypeError, "can't convert nil into Integer");
	break;

      default:
	break;
    }
    tmp = convert_type(val, "Integer", "to_int", Qfalse);
    if (NIL_P(tmp)) {
	return rb_to_integer(val, "to_i");
    }
    return tmp;
}

/*
 *  call-seq:
 *     Integer(arg)    => integer
 *  
 *  Converts <i>arg</i> to a <code>Fixnum</code> or <code>Bignum</code>.
 *  Numeric types are converted directly (with floating point numbers
 *  being truncated). If <i>arg</i> is a <code>String</code>, leading
 *  radix indicators (<code>0</code>, <code>0b</code>, and
 *  <code>0x</code>) are honored. Others are converted using
 *  <code>to_int</code> and <code>to_i</code>. This behavior is
 *  different from that of <code>String#to_i</code>.
 *     
 *     Integer(123.999)    #=> 123
 *     Integer("0x1a")     #=> 26
 *     Integer(Time.new)   #=> 1204973019
 */

static VALUE
rb_f_integer(VALUE obj, VALUE arg)
{
    return rb_Integer(arg);
}

double
rb_cstr_to_dbl(const char *p, int badcheck)
{
    const char *q;
    char *end;
    double d;
    const char *ellipsis = "";
    int w;
#define OutOfRange() (((w = end - p) > 20) ? (w = 20, ellipsis = "...") : (ellipsis = ""))

    if (!p) return 0.0;
    q = p;
    while (ISSPACE(*p)) p++;
    d = strtod(p, &end);
    if (errno == ERANGE) {
	OutOfRange();
	rb_warning("Float %.*s%s out of range", w, p, ellipsis);
	errno = 0;
    }
    if (p == end) {
	if (badcheck) {
	  bad:
	    rb_invalid_str(q, "Float()");
	}
	return d;
    }
    if (*end) {
	char buf[DBL_DIG * 4 + 10];
	char *n = buf;
	char *e = buf + sizeof(buf) - 1;
	char prev = 0;

	while (p < end && n < e) prev = *n++ = *p++;
	while (*p) {
	    if (*p == '_') {
		/* remove underscores between digits */
		if (badcheck) {
		    if (n == buf || !ISDIGIT(prev)) goto bad;
		    ++p;
		    if (!ISDIGIT(*p)) goto bad;
		}
		else {
		    while (*++p == '_');
		    continue;
		}
	    }
	    prev = *p++;
	    if (n < e) *n++ = prev;
	}
	*n = '\0';
	p = buf;
	d = strtod(p, &end);
	if (errno == ERANGE) {
	    OutOfRange();
	    rb_warning("Float %.*s%s out of range", w, p, ellipsis);
	    errno = 0;
	}
	if (badcheck) {
	    if (!end || p == end) goto bad;
	    while (*end && ISSPACE(*end)) end++;
	    if (*end) goto bad;
	}
    }
    if (errno == ERANGE) {
	errno = 0;
	OutOfRange();
	rb_raise(rb_eArgError, "Float %.*s%s out of range", w, q, ellipsis);
    }
    return d;
}

double
rb_str_to_dbl(VALUE str, int badcheck)
{
    char *s;
    long len;

    StringValue(str);
    s = RSTRING_PTR(str);
    len = RSTRING_LEN(str);
    if (s) {
	if (s[len]) {		/* no sentinel somehow */
	    char *p = ALLOCA_N(char, len+1);

	    MEMCPY(p, s, char, len);
	    p[len] = '\0';
	    s = p;
	}
	if (badcheck && len != strlen(s)) {
	    rb_raise(rb_eArgError, "string for Float contains null byte");
	}
    }
    return rb_cstr_to_dbl(s, badcheck);
}

VALUE
rb_Float(VALUE val)
{
    switch (TYPE(val)) {
      case T_FIXNUM:
	return DBL2NUM((double)FIX2LONG(val));

      case T_FLOAT:
	return val;

      case T_BIGNUM:
	return DBL2NUM(rb_big2dbl(val));

      case T_STRING:
	return DBL2NUM(rb_str_to_dbl(val, Qtrue));

      case T_NIL:
	rb_raise(rb_eTypeError, "can't convert nil into Float");
	break;

      default:
	return rb_convert_type(val, T_FLOAT, "Float", "to_f");
    }
}

/*
 *  call-seq:
 *     Float(arg)    => float
 *  
 *  Returns <i>arg</i> converted to a float. Numeric types are converted
 *  directly, the rest are converted using <i>arg</i>.to_f. As of Ruby
 *  1.8, converting <code>nil</code> generates a <code>TypeError</code>.
 *     
 *     Float(1)           #=> 1.0
 *     Float("123.456")   #=> 123.456
 */

static VALUE
rb_f_float(VALUE obj, VALUE arg)
{
    return rb_Float(arg);
}

VALUE
rb_to_float(VALUE val)
{
    if (TYPE(val) == T_FLOAT) return val;
    if (!rb_obj_is_kind_of(val, rb_cNumeric)) {
	rb_raise(rb_eTypeError, "can't convert %s into Float",
		 NIL_P(val) ? "nil" :
		 val == Qtrue ? "true" :
		 val == Qfalse ? "false" :
		 rb_obj_classname(val));
    }
    return rb_convert_type(val, T_FLOAT, "Float", "to_f");
}

double
rb_num2dbl(VALUE val)
{
    switch (TYPE(val)) {
      case T_FLOAT:
	return RFLOAT_VALUE(val);

      case T_STRING:
	rb_raise(rb_eTypeError, "no implicit conversion to float from string");
	break;

      case T_NIL:
	rb_raise(rb_eTypeError, "no implicit conversion to float from nil");
	break;

      default:
	break;
    }

    return RFLOAT_VALUE(rb_Float(val));
}

char*
rb_str2cstr(VALUE str, long *len)
{
    StringValue(str);
    if (len) *len = RSTRING_LEN(str);
    else if (RTEST(ruby_verbose) && RSTRING_LEN(str) != strlen(RSTRING_PTR(str))) {
	rb_warn("string contains \\0 character");
    }
    return RSTRING_PTR(str);
}

VALUE
rb_String(VALUE val)
{
    return rb_convert_type(val, T_STRING, "String", "to_s");
}



VALUE
rb_Array(VALUE val)
{
    VALUE tmp = rb_check_array_type(val);

    if (NIL_P(tmp)) {
	tmp = rb_check_convert_type(val, T_ARRAY, "Array", "to_a");
	if (NIL_P(tmp)) {
	    return rb_ary_new3(1, val);
	}
    }
    return tmp;
}


/*
 *  call-seq:
 *     Array(arg)    => array
 *  
 *  Returns <i>arg</i> as an <code>Array</code>. First tries to call
 *  <i>arg</i><code>.to_ary</code>, then <i>arg</i><code>.to_a</code>.
 *     
 *     Array(1..5)   #=> [1, 2, 3, 4, 5]
 */



static VALUE
boot_defclass(const char *name, VALUE super)
{
    extern st_table *rb_class_tbl;
    VALUE obj = rb_class_boot(super);
    ID id = rb_intern(name);

    rb_name_class(obj, id);
    st_add_direct(rb_class_tbl, id, obj);
    rb_const_set((rb_cObject ? rb_cObject : obj), id, obj);
    return obj;
}

static void
boot_defmetametaclass(VALUE klass, VALUE metametaclass)
{
    RBASIC(RBASIC(klass)->klass)->klass = metametaclass;
}


