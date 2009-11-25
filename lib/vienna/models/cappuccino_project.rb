# 
# cappuccino_project.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2009 Adam Beynon.
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

module Vienna
  
  class CappuccinoProject
    
    attr_accessor :project_root
    
    def initialize(project_root)
      @project_root = project_root
      # puts @project_root
    end
    
    def prepare!
      # puts "build path: #{File.join(@project_root, build_prefix)}"
      # puts "tmp path: #{File.join(@project_root, tmp_prefix)}"
      FileUtils.mkdir_p(build_prefix)
      FileUtils.mkdir_p(tmp_prefix)
    end
    
    # Building will first compile all ruby files. For the moment, we assume only 
    # applications can be built. Support for Frameworks and bundles will follow.
    # Basically, find the main.rb file in lib, and recursively build. main.rb will
    # include the file it needs, and those files will include the files they need
    # etc etc. If a file includes a framework (like main.rb will load foundation
    # and appkit), we must output the relevant file require statement. Basically,
    # if we cant find a file, assume its a framework. could be 'app_kit' or 
    # 'app_kit/app_kit'
    def build!
      # puts "need to build root file: #{File.join(@project_root, 'lib', 'main.rb')}"
      build_root_file
    end
    
    def build_root_file
      root_path = File.join(@project_root, 'lib', 'main.rb')
      unless File.exist?(root_path)
        raise 'Root file does not exist (main.rb)'
      end
      
      # file exists..
      root_parser = Vienna::ObjjRuby.new(root_path, File.join(project_root, build_prefix, 'main.j'), self)
      root_parser.build!
    end
    
    # when the file 'file_path' gets a require statement 'require_path'
    # returns the string for the @import statement. This will include
    # the @impor <... etc stuff, so just dump this raw string into the
    # .j file
    def require_path_for_file(file_path, require_path)
      # local file.. wrap in quotes.. if its a .j or .js file, do not change the case
      # if its a .rb file, change the case
      
      # not local file, wrap in angle brackets and uppercase. if like app_kit, then 
      # chnage to AppKit/AppKit.j
      "@import <#{capitalize_string(require_path)}>"
    end
    
    def capitalize_string(str)
      str.split(/[^a-z0-9]/i).map{|w| w.capitalize}.join
    end
    
    def rakefile
      @rakefile ||= Rakefile.new.load!(@project_root)
    end
    
    def build_prefix
      @build_prefix ||= (rakefile.config_for(build_mode)[:build_prefix] || 'build/debug') 
    end
    
    def tmp_prefix
      @tmp_prefix ||= (rakefile.config_for(build_mode)[:tmp_prefix] || 'build/tmp/debug') 
    end
    
    def build_mode
      @build_mode ||= :debug
    end
    
    # Replacement names..
    def js_replacement_function_name(func_name)
      func_name
    end
    
    def js_id_for_string(str)
      str
    end
  end
end

class String
  
  # if semi is true, this inserts a semi colon at the end as well
  def vn_selectorize(semi=false)
    # allows for optinaol underscore for 'private' methods.
    split =  self.match(/^([_]?[^_]*)_(.*)/)
    
    return "#{self}#{semi ? ":" : ""}" unless split
    # puts "(#{self}) #{split[1]} ............... #{split[2]}"
    return "_#{split[2]}#{semi ? ":" : ""}" if split[1] == ""
    "#{split[1]}#{split[2].split(/[^a-z0-9]/i).map{|w| w.capitalize}.join}#{semi ? ":" : ""}"
  end
end