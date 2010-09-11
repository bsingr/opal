# 
# file.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

class File
  
  # class << self
    
  # end
  
  def self.join(*parts)
    `return #{parts}.join("/");`
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
