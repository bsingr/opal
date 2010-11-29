// Initialize ruby/opal. This should really get passed ARGV, but we will do this
// later.
exports.init = function() {
  print("init in ruby");
  // require core libs
  rb_run(function() {
    print('require opal');
    rb_require('opal');
  });
};

// main.. we might or might not call this.. more likely we will...
// init() just boots, where as main() will load a specific program
exports.main = function(switches, program_file, argv) {
  print("ok, need to run " + program_file);
  if (io_file_exists(program_file)) {
    print("it exists!");
    rb_const_set(rb_cObject, 'ARGV', argv);
    rb_run(function() {
      extensions['.rb'](program_file);
    });
  }
  else {
    print ("errr, cannot find it!");
    throw {};
  }
};
