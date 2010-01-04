# 
# capp_bundle.rb
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
  
  # Bundle for use with Cappuccino applications. Bundles/frameworks/apps built
  # with this will conform to the Cappuccino style app bundles. Note, the majority
  # of work is still left to cappuccino, this just builds .j files, their Info.plist
  # and other resources. Packaging apps is left to press etc in jake.
  class CappBundle
    
    attr_reader :bundle_root, :project
    
    def initialize(bundle_root, project)
      @bundle_root = bundle_root
      @project = project
      # puts plist_info_dictionary.inspect
    end
    
    def bundle_name
      @bundle_name ||= File.basename(bundle_root)
    end
    
    # def info_dictionary
      # @info_dictionary ||= (File.exist?(File.join(@bundle_root, 'info.yml')) ? YAML.load_file(File.join(@bundle_root, 'info.yml')) : default_info_dictionary)
    # end
    
    def info_dictionary
      @info_dictionary ||= (File.exist?(File.join(@bundle_root, 'Info.plist')) ? ::Vienna::Plist.load_file(File.join(@bundle_root, 'Info.plist')) : default_info_dictionary)
    end
    
    # FMWK, APPL (future: BNDL)
    def bundle_type
      # should we throw error if we dont have an entry for this?
      @bundle_type ||= info_dictionary['CPBundlePackageType'] || 'APPL'
    end
    
    # use project's build_prefix
    def build_prefix
      if application?
        @project.build_prefix
      else
        File.join(@project.build_prefix, 'Frameworks', bundle_name.vn_capitalize)
      end
    end
    
    def project_root
      @project.project_root
    end
    
    # For applications, use main.rb. Otherwise, for frameworks, use 
    # bundle_name.rb
    def root_file
      if bundle_type == "APPL"
        try = File.join(@bundle_root, 'lib', 'main.rb')
        return try if File.exist? try
        try = File.join(@bundle_root, 'lib', 'main.j')
        return try if File.exist? try
        abort "Cannot find root file for application in #{@bundle_root}"
      else
        try = File.join(@bundle_root, 'lib', bundle_name) + '.rb'
        return try if File.exist? try
        try = File.join(@bundle_root, 'lib', bundle_name) + '.js'
        return try if File.exist? try
        abort "Cannot find root file for framework in #{@bundle_root}"
      end
    end
    
    # If this bundle is the main bundle (application bundle)
    def application?
      bundle_type == "APPL"
    end
    
    # This bundle if a frameworks
    def framework?
      bundle_type == "FMWK"
    end
    
    def default_info_dictionary
      # for now: error, later, make one for them.
      abort "Error: no info dictionary found for bundle: #{@bundle_root}"
    end
    
    def rakefile
      
    end
    
    def prepare!
      
    end
    
    def build!
      build_dir = File.join(project_root, build_prefix)
      build_name = File.basename(root_file, File.extname(root_file))
      build_name = build_name.vn_capitalize unless build_name === "main"
      FileUtils.mkdir_p(build_dir)
      root_parser = ObjjRuby.new(root_file, File.join(build_dir, build_name) + '.j', self)
      root_parser.build!
      
      if application?
        
      end
    end
    
    def build_ruby_file(path)
      build_dir = File.join(project_root, build_prefix)
      # build_name = File.basename(path, File.extname(path))
      build_name = /^#{bundle_root}\/lib\/(.*)#{File.extname(path)}/.match(path)[1]
      build_name = build_name.split('/').map { |e| e.vn_capitalize }
      # abort build_name
      d = File.join(build_dir, build_name) + '.j'
      FileUtils.mkdir_p(File.dirname(d))
      p = ObjjRuby.new(path, d, self)
      p.build!
    end
    
    def system_lib_root
      @system_lib_root ||= File.expand_path(File.join(Vienna::PATH, 'sdk', @project.sdk))
    end
    
    # When a require statement is found, try and find it. The return from this method
    # is the import directive to use for the output .j file. If a file cannot be
    # found, then we assume it to be a built in framework, so respond with an
    # appropriate @import. Also, we have local libs here , namely 'vienna', so if
    # we include that, then return as appropriate. Search order:
    # 
    #   1. Relative local files (in same, or lower dir). Try .rb, then .j, then .js
    #   2. Local library files: try local frameworks, and build as appropriate
    #   3. Assume its a library, as we cant find it. Add @import <F/F.j>
    # 
    def require_path_for_file(file_path, require_path)
      file_dir = File.dirname(file_path)
      
      # 1. Local/relative file
      try_path = File.join(file_dir, require_path) + '.rb'
      if File.exists? try_path
        # build_ruby_file(try_path)
        # puts "need to build relative file: #{try_path}"
        build_ruby_file(try_path)
        return "@import \"#{require_path.split(/\//).map{ |w| w.vn_capitalize }.join('/')}.j\""
      end
      
      try_path = File.join(file_dir, require_path) + '.js'
      if File.exists? try_path
        # build_ruby_file(try_path)
        puts "need to build relative file: #{try_path}"
        return "@import \"#{require_path.split(/\//).map{ |w| w.vn_capitalize }.join('/')}.j\""
      end
      
      try_path = File.join(file_dir, require_path) + '.j'
      if File.exists? try_path
        # build_ruby_file(try_path)
        puts "need to build relative file: #{try_path}"
        return "@import \"#{require_path.split(/\//).map{ |w| w.vn_capitalize }.join('/')}.j\""
      end
      
      # 2. Local/system framework (from ruby side of things)
      try_bundle = File.join(system_lib_root, require_path)
      if File.exist? File.join(try_bundle, 'Info.plist')
        # we need to build local framework/bundle
        # puts "need to build system framework: #{require_path}"
        @project.require_bundle(try_bundle)
        return "@import <#{require_path.vn_capitalize}/#{require_path.vn_capitalize}.j>"
      end
      
      # 3. assume its a library
      puts "cannot find import: #{require_path}. Assuming framework."
      return "@import <#{require_path.vn_capitalize}/#{require_path.vn_capitalize}.j>"
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
