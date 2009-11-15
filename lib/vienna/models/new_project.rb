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
      
      @core_bundle = Vienna::Bundle.new(File.join(system_lib_root, 'base'), self)
      @core_bundle.basic_bundle = true
      @main_bundle = Vienna::Bundle.new(@project_root, self)
      # puts "main bundle:"
      # puts @main_bundle.bundle_name
      # puts @main_bundle.underscored_bundle_name
      # puts @main_bundle.root_file
      
      # puts @main_bundle.info_dictionary.inspect
      @built_bundles = []
      @required_bundles = []
      
      
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
    # 
    # Add project root last....? shouldnt be first in the queue...
    def all_frameworks
      @all_frameworks ||= [] # [project_root]
    end
    
    def prepare!
      FileUtils.mkdir_p(build_prefix)
      FileUtils.mkdir_p(tmp_prefix)
      FileUtils.mkdir_p(img_build_path)
    end
    
    def build_bundle!(a_bundle)
      a_bundle.build!
      @built_bundles << a_bundle
      # now go through each required bundle. if built already, ignore, if not
      # built, then find it, build it, and add to bundle's dependencies
      a_bundle.required_bundles.each do |required|
        if @required_bundles.include? required
          # already dealt with it...
        else
          bundle = Vienna::Bundle.new(required, self)
          a_bundle.add_dependency(bundle)
          @required_bundles << required
          build_bundle!(bundle)
        end
      end
    end
    
    def link_bundle!(a_bundle)
      a_bundle.link!(@output_destination)
    end
    
    def build!
      build_bundle!(@core_bundle)
      # This will also build every bundle required by the main bundle
      build_bundle!(@main_bundle)
      
      @output_destination = File.new(js_build_path, 'w')
      # Combining:
      # ----------
      # 1) build core library and write it to output file
      link_bundle!(@core_bundle)      
      # 2) Write ENV
      write_env_to_output @output_destination
      # 3) Write string tables etc
      # 4) then output main bundle, that will recursively output all required
      #    bundles, in order.
      
      
      # now step through and link each bundle
      link_bundle!(@main_bundle)
      
      @output_destination.close
      
      # bundle_name
      
      # return
      # o = File.new(js_build_path, 'w')
      # # FIXME:
      # # a. output/build 'base' library
      # # we dont want base in frameworks array.... we should remove it....
      # # base = build_file file_for_require_relative_to(root_file, 'base')
      # base = build_file File.join(system_lib_root, 'base', 'lib', 'base') + '.js'
      # puts "build base to #{base}"
      # # here: use combiner to combine all base files into output..
      # base_combiner = Vienna::Builder::Combine.new base, o, self
      # 
      # # 1. Build root file, which will recursively build all required source files, as well as
      # # make up our list of 'all_frameworks
      # build_file root_file
      # # now add root framework...
      # @all_frameworks << project_root
      # 
      # # Write Env.. this is the ENV hash. as well as string tables for the entire application
      # # from all the frameworks. This is put here so it will be globally accessible. It does
      # # not need to go before base beause 1) base defines some needed methods, for symbol etc
      # # and 2) base doesnt need these.... base is all js, no rb.
      # write_env_to_output o
      # 
      #     
      # # Output each bundle/framework in order (currently only resources)
      # # code is output all at the end (for now) until a fix is made
      # all_frameworks.each do |f|
      #   # 0) Start bundle in the code...
      #   o.write "rb_funcall(vn_cBundle, 'begin_new_bundle', 'com.adambeynon.AppKit');"
      #   # 1) Build all images
      #   images = File.join(f, "resources", "**", "*.{png,jpg,jpeg,gif}")
      #   Dir.glob(images).each do |img|
      #     # 32kb * 1024.... make it compatible with IE8 etc
      #     if File.size(img) < 32768
      #       o.write "vn_resource_stack['#{File.basename(img)}']="
      #       o.write "\"data:#{IMAGE_MIME_TYPES['png']};base64,"
      #       data = Base64.encode64(File.read(img))
      #       data.each_line { |line| o.write line.gsub(/\n/, '') }
      #       o.write "\";"
      #     end
      #     # useful to copy image to resource directory as well, incase its needed in raw form
      #     File.copy(img, File.expand_path(File.join(img_build_path, File.basename(img))))
      #   end
      #   
      #   # 2) Build all vib interface files (these are json format, with a custom extension name)
      #   vibs = File.join(f, "resources", "**", "*.{vib}")
      #   Dir.glob(vibs).each do |vib|
      #     o.write "vn_resource_stack['#{File.basename(vib)}']="
      #     Vienna::Builder::Vib.new(vib, o, self).build!
      #     o.write ";"
      #   end
      #   
      #   # 3) Any json files
      #   jsons = File.join(f, "resources", "**", "*.{json}")
      #   Dir.glob(jsons).each do |json|
      #     # o.write "vn_resource_stack['#{File.basename(json)}']="
      #     # Vienna::Builder::Json.new(json, o, self).build!
      #     puts "adding resource for #{json}"
      #     o.write "rb_funcall(vn_cBundle, 'add_resource_to_current_bundle', '#{File.basename(json)}', "
      #     o.write "{ }"
      #     o.write ");"
      #     # vn_bundle_add_resource_to_current_bundle(self, _cmd, resource_path, resource_text)
      #     # o.write ";"
      #   end
      # end
      # 
      # # # VIB: interface builder equivalent files
      # # all_frameworks.each do |f|
      # # 
      # # end
      # 
      # 
      # # output all application code, from all frameworks/bundles, into specified output file
      # root_combiner = Vienna::Builder::Combine.new File.join(tmp_prefix, project_name, 'lib', "#{Vienna.underscore(project_name)}.js"), o, self
      # 
      # 
      # # 3. Copy and combine all CSS source files into a single file, app_name.css
      # c = File.new(css_build_path, 'w')
      # all_frameworks.each do |f|
      #   cssfiles = File.join(f, "resources", "**", "*.css")
      #   Dir.glob(cssfiles).each do |css|
      #     File.readlines(css).map do |l|
      #       c.write l
      #     end
      #   end
      # end
      # c.close
      # 
      # # close output file
      # o.close
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
      @build_prefix ||= (rakefile.config_for(build_mode)[:build_prefix] || 'build/debug')
    end
    
    def tmp_prefix
      @tmp_prefix ||= (rakefile.config_for(build_mode)[:tmp_prefix] || 'build/tmp/debug')
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