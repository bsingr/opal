# 
# bundle.rb
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

require 'yaml'

module Vienna
  
  class Bundle
        
    # When building images to base-64, we need the corect mime types:
    IMAGE_MIME_TYPES = {
      'png'   => 'image/png',
      'jpg'   => 'image/jpg',
      'gif'   => 'image/gif',
      'jpeg'  => 'image/jpg'
    }
    
    def initialize(bundle_root, project)
      @bundle_root = bundle_root
      @project = project
      # bundles that this bundle has required
      @required_bundles = []
      # files, in this bundle, that are already built/required
      @required_files = []
      # this holds actual bundle objects that this bundle depends on
      # not all dependencies will be here... if more than one framework
      # depeaneds on anothre bundle, then the first one to 'claim' it will
      # have it as a dependancy. These are added by @project
      @bundle_dependencies = []
    end
    
    # Basic bundles just output code... they skip resources etc and info.yml etc
    def basic_bundle=(flag)
      @basic_bundle = flag
    end
    
    def required_bundles
      @required_bundles
    end
    
    def add_dependency(a_bundle)
      @bundle_dependencies << a_bundle
    end
    
    def bundle_dependencies
      @bundle_dependencies
    end
    
    # returns true if this bundle is the main application bundle...
    def main_bundle?
      @project.main_bundle == self
    end
    
    # Compiles any sources/preprocesses any sources to output. Does NOT
    # combine them to output, simply builds anything into the tmp
    # directory
    def build!
      # puts "building main bundle"
      # add root as required, so nothing else will 'accidentally include it'
      @required_files << root_file
      build_file root_file
      staging_dir = staging_directory
      FileUtils.mkdir_p staging_dir
      staging_file = File.join(staging_directory, File.basename(@bundle_root)) + '.js'
      
      staging_output = File.new(staging_file, 'w')
      Vienna::Builder::Combine.new root_file_tmp_path, staging_output, self 
      staging_output.close
      
      # puts "staging in #{staging_file}"
    end
    
    # for the 'core'/runtime bundle.... this should be a subclass, but its here
    # for the moment
    def basic_bundle_link!(output_file)
      # output_file.write "console.log('outputting #{@bundle_root}');"
      # dependencies..
      bundle_dependencies.each do |dependant|
        dependant.link!(output_file)
      end   
      
      Vienna::Builder::Combine.new root_file_tmp_path, output_file, self   
    end
    
    # Link the output for the given build type (html5, ie7) and then return
    # the path for the staged built file (so @project can link it if needed)
    # 
    # for now just assume html5
    def link!(mode = :html5)
      output_path = File.join(staging_directory, File.basename(@bundle_root)) + '_html5.js'
      output_file = File.new(output_path, 'w')
      # output_file.write "console.log('outputting #{@bundle_root}');"
      # dependencies..
      bundle_dependencies.each do |dependant|
        dependant.link!(mode)
      end

      # begin new bundle
      output_file.write "vnfmwk$1.0$"
      # bundle path..
      p_path = main_bundle? ? "" : "/#{underscored_bundle_name}"
      output_file.write "p#{p_path.length}$#{p_path}"
      # regular resources
      link_resources!(output_file)      
      # image resources
      link_image_resources!(output_file)
      

      
      # Actual Bundle code
      staging_file = File.join(staging_directory, File.basename(@bundle_root)) + '.js'
      staging_arr = File.read(staging_file)
      staging_code = ''
      staging_arr.each_line do |line|
        staging_code << line
      end
      output_file.write "c#{staging_code.length}$#{staging_code}"

      output_file.close
    end
    
    # link this bundle into the given lib path, for the build mode... html5, ie7 etc
    # use the already built staged file (basically, we just pass in all our dependencies)
    # and put their size etc
    def lib_link!(lib_file, mode)
      staged_file = File.join(staging_directory, File.basename(@bundle_root)) + '_html5.js'
      
      bundle_dependencies.each do |dependant|
        dependant.lib_link!(lib_file, mode)
      end
      
      file_data = File.read(staged_file)
      file_str = ''
      file_data.each_line do |line|
        file_str << line
      end
      
      lib_file.write "b#{file_str.length}$#{file_str}"
    end
    
    # Images are treated like url mappers... we are not really encoding a file into the
    # bundle, but we are specifying an 'alternative' url to get to the file. This data
    # or mhtml url just so happens to include the data. Other resources are included
    # usng an 'r' marker, as they are actually embedded within the bundle. The two
    # types are very different...
    def link_image_resources!(output_file)
      images = File.join(@bundle_root, "resources", "**", "*.{png,jpg,jpeg,gif}")
      Dir.glob(images).each do |img|
        # 32kb * 1024.... make it compatible with IE8 etc
        if File.size(img) < 32768
          img_data = "data:image/png;base64,"
          data = Base64.encode64(File.read(img))
          data.each_line { |line| img_data << line.gsub(/\n/, '') }
          # img path is img path relative to bundle_root
          img_path = img.match(/^#{@bundle_root}\/(.*)/)[1]
          
          # full_url_map splits the url path and img data apart, and also inserts the length of
          # each section, so we need to take these markers etc into consideration as well.
          full_url_map = "#{img_path.length}$#{img_path}#{img_data.length}$#{img_data}"
          output_file.write "u#{full_url_map.length}$#{full_url_map}"
        end
        # useful to copy image to resource directory as well, incase its needed in raw form
        # File.copy(img, File.expand_path(File.join(img_build_path, File.basename(img))))
      end
    end
    
    # Collect any other resources - images, sounds etc into the specified
    # directory. This folder should be treated as the base resources folder
    # for the bundle. The fact that other bundles also write here is 
    # irrelevant. (if they do....?)
    def link_resources!(output_file)
      # info dictionary for starters
      info_dict = "vnplist$1.0$#{info_dictionary.to_vnplist}"
      info_dict_path = "info.yml"
      info_dict_map = "#{info_dict_path.length}$#{info_dict_path}#{info_dict.length}$#{info_dict}"
      output_file.write "r#{info_dict_map.length}$#{info_dict_map}"
      
      # YIB Files: these are vib interface files, but in a more readable yaml format.
      # These only exist as a gap between creating a proper gui builder.
      yib_files = File.join(@bundle_root, 'resources', '**', '*.yib')
      Dir.glob(yib_files).each do |yib|
        # puts "Found yib: #{yib}"
        plist = "vnplist$1.0$#{YAML.load_file(yib).to_vnplist}"
        # rename .yib to .vib
        plist_path = yib.match(/^#{@bundle_root}\/(.*)/)[1].gsub(/yib/, 'vib')
        plist_map = "#{plist_path.length}$#{plist_path}#{plist.length}$#{plist}"
        output_file.write "r#{plist_map.length}$#{plist_map}"
        # puts plist
        # puts plist_path
      end
    end
    
    # Build the given file, and return its build path
    # return the build_path..... builders can use this to insert tags ready for
    # including other files relative in their own bundle.
    def build_file(file_path)
      # puts file_path
      file_dir = file_path.match(/^#{@bundle_root}(.*)/)
      
      build_dir = File.join(tmp_directory, File.dirname(file_dir[1]))
      FileUtils.mkdir_p build_dir
      
      if File.extname(file_path) == '.rb'
        build_path = File.expand_path(File.join(build_dir, File.basename(file_path, '.rb')) + '.js')
        builder = Vienna::RubyParser.new(file_path, build_path, self)
      elsif File.extname(file_path) == '.js'
        build_path = File.expand_path(File.join(build_dir, File.basename(file_path)))
        builder = Vienna::Builder::Javascript.new(file_path, build_path, self)
      end
      
      builder.build!
      
      build_path
    end
    
    def root_file_tmp_path
      if File.extname(root_file) == '.rb'
        File.join(tmp_directory, 'lib', File.basename(root_file, '.rb')) + '.js'
      else
        File.join(tmp_directory, 'lib', File.basename(root_file))
      end
    end
    
    # Temp directory for this bundle
    def tmp_directory
      File.join(@project.project_root, @project.tmp_prefix, File.basename(@bundle_root))
    end
    
    # here the bundle is 'staged' into its own file, will all collected source code etc
    # and resources ready for linking. FIXME:: this should create each runtime...
    # html5, ie7 etc
    def staging_directory
      File.join(@project.project_root, @project.tmp_prefix, File.basename(@bundle_root), 'build')
    end
    
    # The base file for the bundle. This will likely be a ruby file, or it
    # might even rarely be a js file. This is usually in @bundle_root/lib/name.rb
    def root_file
      @root_file ||= File.exists?(File.expand_path(File.join(@bundle_root, 'lib', File.basename(@bundle_root)) + '.rb')) ? File.expand_path(File.join(@bundle_root, 'lib', File.basename(@bundle_root)) + '.rb') : File.expand_path(File.join(@bundle_root, 'lib', File.basename(@bundle_root)) + '.js')
    end
    
    # info.yml file for the bundle. The object returned is a representation of
    # the yml file ready for use
    def info_dictionary
      @info_dictionary ||= (File.exist?(File.join(@bundle_root, 'info.yml')) ? YAML.load_file(File.join(@bundle_root, 'info.yml')) : default_info_dictionary)
    end

    # If a bundle is for whatever reason missing one of these, then we will
    # supply a default one, and try to supply as much info to it as we can.
    # If it is missing a yml file, we will assume its an application.
    # Should really throw error if no info file is present.
    def default_info_dictionary

      return {
        'bundle_development_region' => 'English',
        'bundle_icon_file'          => '',
        'bundle_identifier'         => "com.yourcompany.#{File.basename(@bundle_root)}",
        'bundle_name'               => File.basename(@bundle_root),
        'bundle_package_type'       => 'APPL',
        'main_vib_file'             => 'main_menu',
        'principal_class'           => 'VN::Application'
      }
    end
    
    # The name of the bundle. This will be an uppercase/camelcase version, e.g.
    # MyBundleName, rather than the underscore version.
    def bundle_name
      @bundle_name ||= info_dictionary['bundle_name']
    end
    
    # Underscore (rubyfied) version of bundle_name
    def underscored_bundle_name
      @underscored_bundle_name ||= Vienna.underscore(bundle_name)
    end
    
    # bundle identifier (reverse url)
    def bundle_identifier
      @bundle_identifier ||= info_dictionary['bundle_identifier']
    end
    
    def bundle_package_type
      @bundle_package_type ||= info_dictionary['bundle_package_type']
    end
    
    # Main vib file: note, this will only really be used for the main bundle. 
    # We can assume the main bundle will be run as soon as the application
    # loads, so we output this file directly as json, rather than a string.
    def main_vib_file
      @main_vib_file ||= info_dictionary['main_vib_file']
    end
    
    # Location of all 'system' frameworks (just asks project)
    def system_lib_root
      @project.system_lib_root
    end
    
    # Required bundles by this bundle. This is an array of absolute paths to
    # the bundle, not Bundle objects
    def required_bundles
      @required_bundles
    end
    
    # Require path. 
    # ------------
    # When a builder encounters a require statement, this method returns the
    # path that should be built. This method returns nil if the file cannot
    # be found, and it is up to the bundle to handle errors: NOT the builders.
    # If the path is in another bundle/frameworks, then this method will
    # itself notiffy the project that a bundle is required. When this method
    # returns nil, the builder can silently ignore the require statement.
    # 
    #   file - the rb/js file that contains the require statement
    #   require_path - the require statement string, e.g. "app_kit"
    def require_path_relative_to_file(file, require_path)
      # 1) Try local files relative to 'file'
      # -------------------------------------
      # If we find the file, we make sure that it has not already been included..
      # if it has return nil: we do not want a file to be required more than
      # once, otherwise we might create infinite loops of require statements.
      file_dir = File.dirname(file)
      # try .js first
      try_path = File.join(file_dir, require_path) + '.js'
      if File.exists? try_path
        if @required_files.include?(try_path)
          puts "already included #{try_path}"
          return nil
        else
          @required_files << try_path
          return try_path
        end
      end
      try_path = File.join(file_dir, require_path) + '.rb'
      if File.exists? try_path
        if @required_files.include?(try_path)
          puts "already included #{try_path}"
          return nil
        else
          @required_files << try_path
          return try_path
        end
      end
      
      # 2) Check 'vendor bundles' relative to the bundle root (bundle_path/vendor/require_name)
      
      # 3) Check system library bundles
      # -------------------------------
      # If the require file is found here, then return nil because we do not want a new
      # bundle being built by a current bundle. We pass it off to the project, and
      # let the project deal with it. This ensures that we keep bundles seperate.
      # We maintiain a lit in this bundle of 'required bundles', which helps us maintain
      # a list of depenencies ready for linking.
      try_path = File.join(system_lib_root, require_path, 'lib', require_path) + '.js'
      if File.exists? try_path
        @required_bundles << File.join(system_lib_root, require_path)
        # puts "Found framework: #{require_path}"
        return nil
      end
      
      try_path = File.join(system_lib_root, require_path, 'lib', require_path) + '.rb'
      if File.exists? try_path
        @required_bundles << File.join(system_lib_root, require_path)
        # puts "Found framework: #{require_path}"
        return nil
      end
      
      # 4) Cannot find file
      # -------------------
      # If we get here, we cannot find the file to require, so show error?
      # raise 'file error... or something similar'
      puts "Cannot find requirement '#{require_path}' relative to '#{file}'"
      
      nil
    end
    
    def minifies_ruby_output_strings
      # true
      false
    end
    
    
    
    # The value to use as the generated text for strings within ruby code. By
    # using this, we only output strings once, and save a lot of memory. Most
    # strings are created, destroyed and wasted very quickly during message
    # passing. Whatever value returned here should be used. If the compiler
    # should not minimize a string, then the string is just returned - but
    # in quotes, so that at runtime, a string is referenced. Similarly, if an
    # object string reference is to be used, its actual name is retuened so
    # that it can be directly output as it is.
    # 
    # All 4 of the following methods can be turned on/off on a per bundle basis.
    # If on, the bundle jsut asks the info from the @project. If off, it just
    # returns the same/relevant value (Symbol requires rewriting to ID2SYM).
    # 
    # string
    # ------
    # Used for method call names
    def js_id_for_string(str)
      if minifies_ruby_output_strings
        return @project.js_id_for_string(str)
      else
        return "'#{str}'"
      end
    end
    
    # symbol
    # ------
    # References singleton symbols. Symbols are only created once in vienna, like
    # in ruby, so these just point back to the singleton object, or the ID2SYM
    # method, which just retireves the singleton anyway.
    def js_id_for_symbol(sym)
      if minifies_ruby_output_strings
        return @project.js_id_for_symbol(sym)
      else
        return "ID2SYM('#{sym}')"
      end
    end
    
    # ivar
    # ----
    # Similar to string, acceses the table of strings representing ivar names
    def js_id_for_ivar(ivar)
      if minifies_ruby_output_strings
        return @project.js_id_for_ivar(ivar)
      else
        return "'#{ivar}'"
      end
    end
    
    # Const
    # -----
    # Again, like string accesees singleton versions of constant names. This is
    # also used for Classes, Modules, Constants etc.
    def js_id_for_const(const)
      if minifies_ruby_output_strings
        return @project.js_id_for_const(const)
      else
        return "'#{const}'"
      end
    end
    
    def js_replacement_function_name(func_name)
      func_name
    end
  end
end