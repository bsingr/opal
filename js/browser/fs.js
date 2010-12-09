/**
  Loading libs and gems etc. This is where loading and registering takes place
  to "pretend" that we can load files. We refer to this as our filesystem, fake
  it may be
*/

/**
  Register a gem. Might be called more than once per gem (e.g. register core
  gem, then register test files, then register image resources etc)
  
  @param [JSONObject] gem_definition
*/
exports.register_gem = function(gem_definition) {
  print("Registering gem");
  print(gem_definition);
}
