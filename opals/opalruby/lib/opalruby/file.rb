

class File
  
  # class << self
    
  # end
  
  def self.join(*parts)
    # Fixme: use splat
    OpalVM.join parts
  end
  
  # Returns all components of the filename given in `file_name` except the last
  # one. The filename must be formed using forward slashed ("/") regardless of
  # the separator used on the local filesystem.
  # 
  # @example
  #   File.dirname "home/adam/work/ruby.rb"
  #   # => "/home/adam/work"
  # 
  # @param [String] file_name
  # @return [String]
  def self.dirname(file_name)
    `return #{file_name}.substr(0, #{file_name}.lastIndexOf('/'));`
  end
  
  def self.expand_path(path = "")
    `var start_slash = (#{path}[0] === "/");
    var parts = #{path}.split("/");
    var result = [];
    var part;
    for (var i = 0; i < parts.length; i++) {
      part = parts[i];
      switch (part) {
        case '..':
          result.pop();
          break;
        case '.':
          break;
        case '':
          break;
        default:
          result.push(part);
      }
    }
    
    if (start_slash) {
      // if we started with a slash, use that
      return "/" + result.join("/");
    } else {
      // otherwise join with our current working dir
      return opal.getwd + "/" + result.join("/");
    }`
  end
end
