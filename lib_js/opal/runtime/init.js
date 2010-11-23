// Initialize ruby/opal. This should really get passed ARGV, but we will do this
// later.
exports.init = function() {
  print("init in ruby");
  // require core libs
  rb_run(function() {
    print('require opal');
    rb_require('opal');
    // rb_require('mspec');
  });
  
};
