# erm, a better way to do this would be nice...
node_fs = `require('fs')`
node_path = `require('path')`

# ruby File class
class File

  def self.expand_path(path, dir)
    `if (dir == undefined) dir = process.cwd();
    if(path.charAt(0) == '/') {
      return node_path.normalize(path);
    } else {
      return node_path.normalize(node_path.join(dir, path));
    }`
  end

  def self.join(*parts)
    `return node_path.join.apply(null, parts);`
  end

  def self.dirname(path)
    `return node_path.dirname(path);`
  end

  def self.extname(path)
    `return node_path.extname(path);`
  end

  def self.basename(path, ext)
    `return node_path.basename(path, ext);`
  end

  def self.exist?(path)
    `try {
      var stat = node_fs.statSync(path);
      return Qtrue;
    } catch(e) {
      return Qfalse;
    }`
  end

  def self.exists?(path)
    exist? path
  end

  def self.directory?(path)
    `try {
      var stat = node_fs.statSync(path);
      return stat.isDirectory() ? Qtrue : Qfalse;
    } catch(e) {
      return Qfalse;
    }`
  end

  def self.file?(path)
    `try {
      var stat = node_fs.statSync(path);
      return stat.isFile() ? Qtrue : Qfalse;
    } catch(e) {
      return Qfalse;
    }`
  end

  class Stat
    def initialize(file_name)
      `self.$stat = node_fs.statSync(file_name);` 
    end
  end
end

# ruby dir class
class Dir

end

# Special FS module... wraps all node FS methods... here we provide the
# same nice async methods offered by node
module FS

  def self.write_file()

  end

  def self.write_file_sync()

  end
end

# like fs, but all path methods. Do we actually need this? there are no
# extra async methods, and it duplicated everything already found in
# ruby's File or Dir... lets just keep pure ruby variaiants, and use
# module FS just for our new async stuffs?
module Path

end

