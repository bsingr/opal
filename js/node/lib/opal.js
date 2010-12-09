/**
  Main include file for node packages. NOTE: this will NOT run opal, it will
  just require it so it has the ability to compile etc
*/

var fs = require('fs');
var path = require('path');

var runtime_content = 
  fs.readFileSync(path.join(path.dirname(__filename), 'runtime.js'));

