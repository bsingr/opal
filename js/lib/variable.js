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
    "value": rb_nil,
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
  if (!entry) return rb_nil;
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
