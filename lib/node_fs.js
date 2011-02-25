var node_fs, node_path;
node_fs = require('fs');
node_path = require('path');


$class(self, nil, "File", function() {var self = this;  

  $def(self, "expand_path", function(path, dir) {var self = this;    
    if (dir == undefined) dir = process.cwd();
    if(path.charAt(0) == '/') {
      return node_path.normalize(path);
    } else {
      return node_path.normalize(node_path.join(dir, path));
    }
  }, 1);  

  $def(self, "join", function(parts) {var self = this;parts = [].slice.call(arguments, 0);    
    return node_path.join.apply(null, parts);
  }, 1);  

  $def(self, "dirname", function(path) {var self = this;    
    return node_path.dirname(path);
  }, 1);  

  $def(self, "extname", function(path) {var self = this;    
    return node_path.extname(path);
  }, 1);  

  $def(self, "basename", function(path, ext) {var self = this;    
    return node_path.basename(path, ext);
  }, 1);  

  $def(self, "exist?", function(path) {var self = this;    
    try {
      var stat = node_fs.statSync(path);
      return Qtrue;
    } catch(e) {
      return Qfalse;
    }
  }, 1);  

  $def(self, "exists?", function(path) {var self = this;    
    return self["m$exist?"](self.m$path());
  }, 1);  

  $def(self, "directory?", function(path) {var self = this;    
    try {
      var stat = node_fs.statSync(path);
      return stat.isDirectory() ? Qtrue : Qfalse;
    } catch(e) {
      return Qfalse;
    }
  }, 1);  

  $def(self, "file?", function(path) {var self = this;    
    try {
      var stat = node_fs.statSync(path);
      return stat.isFile() ? Qtrue : Qfalse;
    } catch(e) {
      return Qfalse;
    }
  }, 1);  

  $class(self, nil, "Stat", function() {var self = this;    
    $def(self, "initialize", function(file_name) {var self = this;      
      self.$stat = node_fs.statSync(file_name);
    }, 0);
  }, 0);
}, 0);


$class(self, nil, "Dir", function() {var self = this;

}, 0);



$class(self, nil, "FS", function() {var self = this;  

  $def(self, "write_file", function() {var self = this;    return nil;

  }, 1);  

  $def(self, "write_file_sync", function() {var self = this;    return nil;

  }, 1);
}, 2);





$class(self, nil, "Path", function() {var self = this;

}, 2);