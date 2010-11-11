// Node.js specific functionality

// Returns the current working directory
exports.getwd = function() {
  return process.cwd();
};


// When "server side", our RUBY_PLATFORM is just 'opal'.. browser sets it to
// 'browser'.
exports.ruby_platform = "opal";

// Should we keep in line with mri? we support some 1.9 features, but not all..
// ... hmmm.
exports.ruby_version = "1.9.0";
