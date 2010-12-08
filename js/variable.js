// set the constant on the given class
var rb_const_set = function(klass, id, val) {
  // klass.$i[id] = val;
  klass.$c_prototype[id] = val;
  return val;
};

var rb_const_get = function(klass, id) {
  // print("finding id: " + id);
  // io_puts('finding id ' + id);
  // io_puts(klass.__classid__);
  // io_puts(klass.$f);
  if (klass.$c[id])
    return (klass.$c[id]);
  
  var parent = klass.$parent;
  // io_puts(parent.__classid__);
  // stop infinite loop (objects object is object??)
  while (parent && parent != rb_cObject) {
    // io_puts(parent.__classid__);
    // print(parent == rb_cObject);
    if (parent.$c[id])
      return parent.$c[id];
    
    parent = parent.$parent;
  }
  // print("trying from " + klass.__classid__);
  // for (var prop in klass.$c) print(prop);
  io_puts("Cannot find constant: " + id);
  rb_raise(rb_eNameError, 'uninitialized constant ' + id);
};

// is const defined
var rb_const_defined = function(klass, id) {
  if (klass.$c[id])
    return true;
  
  return false;
};

// set ivar
// @global
rb_ivar_set = function(obj, id, val) {
  obj[id] = val;
  return val;
};

// @global
rb_ivar_get = function(obj, id) {
  return obj.hasOwnProperty(id) ? obj[id] : Qnil;
};

// @global
rb_ivar_defined = function(obj, id) {
  return obj.hasOwnProperty(id) ? true : false;
};

// global id table
// @local
// 
// @entries are mapped globalid => Object. Object contains the keys:
//  - name, value, getter, setter.
var rb_global_tbl = {};

// defined a hooked (global) variable
// 
// @local
// 
// @param [String] name the name of the global (e.g. '$:')
// @param [Function] getter the getter function to use for the variable
// @param [Function] setter the setter function to use for setting variable
// @returns null
// 
var rb_define_hooked_variable = function(name, getter, setter) {
  var entry = {
    "name": name,
    "value": Qnil,
    "getter": getter,
    "setter": setter
  };
  
  rb_global_tbl[name] = entry;
};

// A default read only getter for a global variable. This will simply throw a
// name error with the given id. This can be used for variables that should not
// be altered.
var rb_gvar_readonly_setter = function(id, value) {
  rb_raise(rb_eNameError, id + " is a read-only variable");
};

// Retrieve a global variable. This will use the assigned getter.
// 
// @local
var rb_gvar_get = function(id) {
  var entry = rb_global_tbl[id];
  if (!entry) return Qnil;
  return entry.getter(id);
};

// Set a global. If not already set, then we assign basic getters and setters
// 
// @local
var rb_gvar_set = function(id, value) {
  var entry = rb_global_tbl[id];
  if (entry) return entry.setter(id, value);
  
  // make a new default..
  rb_define_hooked_variable(id, 
    // getter
    function(id) {
      return rb_global_tbl[id].value;
    },
    // setter
    function(id, value) {
      return rb_global_tbl[id].value = value;
    }
  );
  
  return rb_gvar_set(id, value);
};
