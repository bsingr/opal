# 
# new_project.rb
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
  
  attr_accessor :project_root
  
  class NewProject
    
    def initialize(project_root)
      @project_root = File.expand_path(project_root)
      
      # ruby/js specific requirements
      @js_str_to_id = {}
      @js_str_prefix = "a"
      @js_sym_to_id = {}
      @js_sym_prefix = "a"
      @js_ivar_to_id = {}
      @js_ivar_prefix = "a"
      @js_const_to_id = {}
      @js_const_prefix = "a"
    end
    
    # Hash of js functions that we can replace during compilation. Using the
    # smaller names (the values _X) saved a lot of character typing, and over
    # a large application will save HUGE amounts of bandwidth.
    JS_FUNCTION_NAMES = {
      'RTEST'                       => '_A',
      'ORTEST'                      => '_B',
      'ANDTEST'                     => '_C',
      'NOTTEST'                     => '_D',
      'rb_funcall'                  => '_E',
      'rb_supcall'                  => '_F',
      'rb_ivar_set'                 => '_G',
      'rb_ivar_get'                 => '_H',
      'rb_define_method'            => '_I',
      'rb_define_singleton_method'  => '_J',
      'rb_define_module'            => '_K',
      'rb_define_module_under'      => '_L',
      'rb_define_class'             => '_M',
      'rb_define_class_under'       => '_N',
      'ID2SYM'                      => '_O'
    }
    
    def js_replacement_function_name(func_name)
      if JS_FUNCTION_NAMES[func_name]
        JS_FUNCTION_NAMES[func_name]
      else
        func_name
      end
    end
    
    # Hash of js var names to shorter equivalents... using rb_cObject lots will
    # use a lot of extra bandwidth, so the shorter name is more ideal.
    JS_VARIABLE_NAMES = {
      'rb_cObject'                  => '_1',
      'rb_top_self'                 => '_2'
    }
    
    def rakefile
      @rakefile ||= Rakefile.new.load!(@project_root)
    end
    
    def root_file
      # if it is defined, use that, other wise use underscore-case vesion
      # of project name (.rb), e.g. MyApp => my_app.rb .. also assume it 
      # is inside the lib folder? project_root/lib/my_app.rb
      # @root_file ||= File.expand_path(File.join(project_root, (rakefile.config_for(build_mode)[:root_file] || File.join('lib', Vienna.underscore(project_name)) + '.js')))
      @root_file ||= File.expand_path(File.join(project_root, (rakefile.config_for(build_mode)[:root_file] || File.join('lib', Vienna.underscore(project_name)) + '.rb')))
      
    end
    
    def project_name
      @project_name ||= File.basename(project_root)
    end
    
    def project_root
      @project_root
    end
    
    def project_lib_root
      @project_lib_root ||= File.expand_path(File.join(project_root, 'lib'))
    end
    
    # Location of the system libraries: base, browser, vienna, etc.
    def system_lib_root
      @system_lib_root ||= File.expand_path(File.join(Vienna::PATH, 'frameworks'))
    end
    
    # Where the project can put other 'libraries' to be optionally built in.
    # This allows for very basic external frameworks to be included with an
    # webapp, or, allows a unified place for frameworks to be shared 
    # between multiple apps in a ROR application
    def vendor_lib_root
      # @vendor_lib_root ||= 
    end
    
    # all the frameworks. the main framework is added, and then each framework added after this
    # is automaticallty included. This helps with then finding resources, configs etc for adding
    # to the bundle, namely: css and image resources, as well as localizations etc
    def all_frameworks
      @all_frameworks ||= [project_root]
    end
    
    def prepare!
      FileUtils.mkdir_p(build_prefix)
      FileUtils.mkdir_p(tmp_prefix)
      FileUtils.mkdir_p(img_build_path)
    end
    
    IMAGE_MIME_TYPES = {
      'png'   => 'image/png',
      'jpg'   => 'image/jpg',
      'gif'   => 'image/gif',
      'jpeg'  => 'image/jpg'
    }
    
    def build!
      o = File.new(js_build_path, 'w')
      # FIXME:
      # a. output/build 'base' library
      base = build_file file_for_require_relative_to(root_file, 'base')
      puts "build base to #{base}"
      # here: use combiner to combine all base files into output..
      base_combiner = Vienna::Builder::Combine.new base, o, self
      
      # 1. Build root file, which will recursively build all required source files, as well as
      # make up our list of 'all_frameworks
      build_file root_file
      
      # 4. Copy all image resources into the predetermined output folder
      all_frameworks.each do |f|
        images = File.join(f, "resources", "**", "*.{png,jpg,jpeg}")
        Dir.glob(images).each do |img|
          # puts "Found image: #{img} size: #{File.size(img)}"
          
          # 32kb * 1024.... make it compatible with IE8 etc
          if File.size(img) < 32768
            # puts img
            o.write "vn_resource_stack['#{File.basename(img)}']="
            o.write "\"data:#{IMAGE_MIME_TYPES['png']};base64,"
            data = Base64.encode64(File.read(img))
            data.each_line { |line| o.write line.gsub(/\n/, '') }
            # o.write
            o.write "\";"
            # o.write "console.log('added #{File.basename(img)}');"
          end
          
          File.copy(img, File.expand_path(File.join(img_build_path, File.basename(img))))
        end
      end
      
      # b. output string, symbols, consts etc
      # c. output env as hash
      # d. output all other frameworks
      
      
      
      # 2. Combine all these built source files into the calculated destination, which will be
      # app_name.js
      
      write_env_to_output o
      root_combiner = Vienna::Builder::Combine.new File.join(tmp_prefix, project_name, 'lib', 'ruby_web_app.js'), o, self
      
      
      # 3. Copy and combine all CSS source files into a single file, app_name.css
      c = File.new(css_build_path, 'w')
      all_frameworks.each do |f|
        cssfiles = File.join(f, "resources", "**", "*.css")
        Dir.glob(cssfiles).each do |css|
          File.readlines(css).map do |l|
            c.write l
          end
        end
      end
      c.close
      
      
      

      
      # close js file
      o.close
    end
  
    
    # This writes any env settings to the build file. This will be the first JS code within
    # the application to run, so any assumptions cannot be made as to the condition of the
    # browser: also, no frameworks will yet be run
    # 
    # We can include ENV settings from user's Rakefile, as well as other bits and pieces.
    # We can also hardcode image urls, css urls etc
    def write_env_to_output file
      file.write "\n"
      JS_FUNCTION_NAMES.each_pair do |key, value|
        file.write "#{value}=#{key};\n"
      end
      @js_sym_to_id.each_pair do |key, value|
        file.write "_$#{value}=#{js_replacement_function_name('ID2SYM')}('#{key}');\n"
      end 
      file.write "\n"
      # file.write "\n\n\n\n"
      @js_str_to_id.each_pair do |key, value|
        file.write "s$#{value}='#{key}';\n"
      end 
      file.write "\n"
      # file.write "\n\n\n\n"
      @js_ivar_to_id.each_pair do |key, value|
        file.write "i$#{value}='#{key}';\n"
      end    
      file.write "\n"
      # file.write "\n\n\n\n"
      @js_const_to_id.each_pair do |key, value|
        file.write "#{value}='#{key}';\n"
      end
      # file.write "console.profile();"
      # file.write "VN$ENV = { 'display_mode': 'render', 'image_dir': 'images' };"
      
      file.write "rb_oENV = VN.$h('display_mode', 'render', 'image_dir', 'images');"
      file.write "rb_cObject.$c_s('ENV', rb_oENV);"
    end
    
    
    def build_file(file)
      # file_dir is the relative file_name to place the built file in the tmp diectoty.
      file_dir =  if match = file.match(/^#{system_lib_root}(.*)/)
                    File.dirname(match[1])
                  elsif match = file.match(/^#{project_root}(.*)/)
                    File.dirname(File.join(project_name, match[1]))
                  end
      
      unless file_dir
        puts "cannot find file_dir for #{file}"
        exit
      end
      
      # puts match[1]
      
      build_dir = File.join(project_root, tmp_prefix, file_dir)
      FileUtils.mkdir_p build_dir
      
      if File.extname(file) == '.rb'
        build_path = File.expand_path(File.join(build_dir, File.basename(file, '.rb')) + '.js')
        builder = Vienna::RubyParser.new file, build_path, self
      elsif File.extname(file) == '.js'
        build_path = File.expand_path(File.join(build_dir, File.basename(file)))
        builder = Vienna::Builder::Javascript.new file, build_path, self
      else
        puts 'Wrong file type for building..'
      end
      
      builder.build!
      
      # builder.requirements.each do |r|
      #   # puts file_for_require_relative_to file, r
      #   req_file = file_for_require_relative_to(file, r)
      #   if req_file.nil?
      #     puts "CANNOT include file: #{r}"
      #   else
      #     build_file req_file
      #   end
      # end
      
      build_path
    end
    
    # Get the actual file needed when a require statement is found inside `file`
    def file_for_require_relative_to(file, require_path)    
      # first try local files...
      file_dir = File.dirname(file)
      # try .js first
      try_path = File.join(file_dir, require_path) + '.js'
      if File.exists? try_path
        return try_path
      end
      try_path = File.join(file_dir, require_path) + '.rb'
      if File.exists? try_path
        return try_path
      end
      # Check vendor bundles...
      
      # Check system library bundles
      try_path = File.join(system_lib_root, require_path, 'lib', require_path) + '.js'
      if File.exists? try_path
        # add the library to project lubraries, so css etc can all be added later.. as well
        # as adding languages, etc.
        all_frameworks << File.expand_path(File.join(system_lib_root, require_path))
        puts "Found framework: #{require_path}"
        return try_path
      end
      
      try_path = File.join(system_lib_root, require_path, 'lib', require_path) + '.rb'
      if File.exists? try_path
        # add the library to project lubraries, so css etc can all be added later.. as well
        # as adding languages, etc.
        all_frameworks << File.expand_path(File.join(system_lib_root, require_path))
        puts "Found framework: #{require_path}"
        return try_path
      end
    end
    
    # The actual path where the final my_app_name.js file will be built to. This
    # name includes the my_app_name.js filename
    def js_build_path
      File.expand_path(File.join(project_root, build_prefix, Vienna.underscore(project_name)) + '.js')
    end
    
    def css_build_path
      File.expand_path(File.join(project_root, build_prefix, Vienna.underscore(project_name)) + '.css')
    end
    
    def img_build_path
      File.expand_path(File.join(project_root, build_prefix, 'images'))
    end
    
    def build_prefix
      @build_prefix ||= (rakefile.config_for(build_mode)[:build_prefix] || 'build')
    end
    
    def tmp_prefix
      @tmp_prefix ||= (rakefile.config_for(build_mode)[:tmp_prefix] || 'build/tmp')
    end
    
    def build_mode
      @build_mode ||= :debug
    end
    
    
    
    # runtime specific things
    
    # the id for the given string when used at runtime
    def js_id_for_string(str)
      if @js_str_to_id.has_key?(str)
        # puts "has #{sym}"
        return @js_str_to_id[str]
      else
        res = String.new(@js_str_prefix)
        @js_str_to_id[str] = res
        @js_str_prefix.succ!
        res
      end
    end

    # the id for the given symbol when used at runtime
    def js_id_for_symbol(sym)
      if @js_sym_to_id.has_key?(sym)
        # puts "has #{sym}"
        return @js_sym_to_id[sym]
      else
        res = String.new(@js_sym_prefix)
        @js_sym_to_id[sym] = res
        @js_sym_prefix.succ!
        res
      end
    end
    
    def js_id_for_ivar(ivar)
      if @js_ivar_to_id.has_key?(ivar)
        # puts "has #{sym}"
        return @js_ivar_to_id[ivar]
      else
        res = String.new(@js_ivar_prefix)
        @js_ivar_to_id[ivar] = res
        @js_ivar_prefix.succ!
        res
      end      
    end

    def js_id_for_const(const)
       if @js_const_to_id.has_key?(const)
         # puts "has #{sym}"
         return @js_const_to_id[const]
       else
         res = "c$#{@js_const_prefix}"
         @js_const_to_id[const] = res
         @js_const_prefix.succ!
         res
       end      
     end
  end
end