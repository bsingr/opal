(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm(['exist?']);
var node_fs, node_path;
return (node_fs = require('fs'), node_path = require('path'), $class(self, nil, "File", function(self) {
return ($def(self, "expand_path", function(self, path, dir) {
if (dir == undefined) dir = process.cwd();
    if(path.charAt(0) == '/') {
      return node_path.normalize(path);
    } else {
      return node_path.normalize(node_path.join(dir, path));
    }}, 1), $def(self, "join", function(self, parts) {
parts = Array.prototype.slice.call(arguments, 1);
return node_path.join.apply(null, parts);}, 1), $def(self, "dirname", function(self, path) {
return node_path.dirname(path);}, 1), $def(self, "extname", function(self, path) {
return node_path.extname(path);}, 1), $def(self, "basename", function(self, path, ext) {
return node_path.basename(path, ext);}, 1), $def(self, "exist?", function(self, path) {
try {
      var stat = node_fs.statSync(path);
      return Qtrue;
    } catch(e) {
      return Qfalse;
    }}, 1), $def(self, "exists?", function(self, path) {
return (self.$m["exist?"](self, path));}, 1), $def(self, "directory?", function(self, path) {
try {
      var stat = node_fs.statSync(path);
      return stat.isDirectory() ? Qtrue : Qfalse;
    } catch(e) {
      return Qfalse;
    }}, 1), $def(self, "file?", function(self, path) {
try {
      var stat = node_fs.statSync(path);
      return stat.isFile() ? Qtrue : Qfalse;
    } catch(e) {
      return Qfalse;
    }}, 1), $class(self, nil, "Stat", function(self) {
return ($def(self, "initialize", function(self, file_name) {
self.$stat = node_fs.statSync(file_name);}, 0));}, 0));}, 0), $class(self, nil, "Dir", function(self) {
return (nil);}, 0), $class(self, nil, "FS", function(self) {
return ($def(self, "write_file", function(self) {
return (nil);}, 1), $def(self, "write_file_sync", function(self) {
return (nil);}, 1));}, 2), $class(self, nil, "Path", function(self) {
return (nil);}, 2));})();