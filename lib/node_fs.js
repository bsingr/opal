(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
var node_fs, node_path;
return (node_fs = require('fs'), node_path = require('path'), $class(self, nil, "File", function(self) {
return ($def(self, "expand_path", function(path, dir) {
var self = this;if (dir == undefined) dir = process.cwd();
    if(path.charAt(0) == '/') {
      return node_path.normalize(path);
    } else {
      return node_path.normalize(node_path.join(dir, path));
    }}, 1), $def(self, "join", function(parts) {
var self = this;parts = Array.prototype.slice.call(arguments, 0);
return node_path.join.apply(null, parts);}, 1), $def(self, "dirname", function(path) {
var self = this;return node_path.dirname(path);}, 1), $def(self, "extname", function(path) {
var self = this;return node_path.extname(path);}, 1), $def(self, "basename", function(path, ext) {
var self = this;return node_path.basename(path, ext);}, 1), $def(self, "exist?", function(path) {
var self = this;try {
      var stat = node_fs.statSync(path);
      return Qtrue;
    } catch(e) {
      return Qfalse;
    }}, 1), $def(self, "exists?", function(path) {
var self = this;return (self["m$exist?"](path));}, 1), $def(self, "directory?", function(path) {
var self = this;try {
      var stat = node_fs.statSync(path);
      return stat.isDirectory() ? Qtrue : Qfalse;
    } catch(e) {
      return Qfalse;
    }}, 1), $def(self, "file?", function(path) {
var self = this;try {
      var stat = node_fs.statSync(path);
      return stat.isFile() ? Qtrue : Qfalse;
    } catch(e) {
      return Qfalse;
    }}, 1), $class(self, nil, "Stat", function(self) {
return ($def(self, "initialize", function(file_name) {
var self = this;self.$stat = node_fs.statSync(file_name);}, 0));}, 0));}, 0), $class(self, nil, "Dir", function(self) {
return (nil);}, 0), $class(self, nil, "FS", function(self) {
return ($def(self, "write_file", function() {
var self = this;return (nil);}, 1), $def(self, "write_file_sync", function() {
var self = this;return (nil);}, 1));}, 2), $class(self, nil, "Path", function(self) {
return (nil);}, 2));})();