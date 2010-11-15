// Opal module within ruby
var rb_mOpal;

rb_mOpal = rb_define_module('Opal');

// Print the given string to the default console. Currelty Kernel#puts uses this
// method.
var rb_opal_puts = function(self, block, arg) {
  print(arg);
  return rb_nil;
};

rb_define_singleton_method(rb_mOpal, 'puts', rb_opal_puts);
