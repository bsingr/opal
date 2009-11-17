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
    
    def main_bundle
      @main_bundle
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
    
    # default bootstrap code... pull from rakefile for customization?
    def bootstrap_code
      %{
        function vn_bootstrap_main() {
          if (true) {
            // html5
            var lib_path = "#{Vienna.underscore(project_name)}_html5.js";
            var lib = new vn_lib(lib_path, function(lib) {
              console.log('lib loaded callback!');
            });
            lib.load();
          } else {
            // ie7
          }
        };

        window.onload = vn_bootstrap_main;
      }
    end

    
    def build!
      build_bundle!(@core_bundle)
      # This will also build every bundle required by the main bundle
      build_bundle!(@main_bundle)
      
      @output_destination = File.new(js_build_path, 'w')
      # basic bundle link
      @core_bundle.basic_bundle_link!(@output_destination)
      # bootstrap code
      min_bootstrap = JSMin.minify(bootstrap_code)
      @output_destination.write min_bootstrap
      # finished with runtime
      @output_destination.close
      
      # lib js file
      build_lib!

    end
    
    # Wrong!!!!
    # 
    # This is silly...... instead, create two lib files: html5 and ie7. The bootstrap
    # in core .js file decides which one to load... we could insert bootstrap into that
    # original js file, which also states to load a lib file in the first place... no
    # bootstrap code = regular ruby environament... much better. :D This way, the bundles
    # will have to build twice... two modes: html, and ie7 mode. kapeche!!!
    # 
    # bootstrap code to include in main file. Basically, works out if we need to get
    # html5 data ui resources, or older ie7 mhtml resource file, and adds it to the
    # required libs, so that downloads. All bundle code exectutes when all resources
    # etc have downloaded so there is no worry about resources not being available.
    # lib code (outside bundles such as this) will execute on load, but resource
    # declarations in bundles, libs etc will all run before bundle code is run. Finally,
    # when all bundle code is run, then 'main' is called, which in turn calls 
    # VN.ApplicationMain();
    # BOOTSTRAP_CODE = %{
    #   if (true) {
    #     //html5
    #     console.log('html5');
    #   } else {
    #     // ie7
    #     console.log('ie7');
    #   }
    # }
    
    # Build the 'lib file'
    def build_lib!
      @lib_output_destination = File.new(js_lib_build_path, 'w')
      # header
      @lib_output_destination.write "vnlib$1.0$"
      # env content - project wide stuff
      env_content = { 'display_mode' => 'render', 'image_dir' => 'images' }.to_vnplist
      @lib_output_destination.write "e#{env_content.length}$#{env_content}"
      # bootstrap code.. none by default
      # bootstrap_code = JSMin.minify(BOOTSTRAP_CODE)
      # @lib_output_destination.write "c#{bootstrap_code.length}$#{bootstrap_code}"
      
      # symbol tables etc: just code to be executed...
      # for now just function names.. we should check rakefile to see if user wants to 
      # do this... might differ between debug mode and release mode...
      sym_table_code = ""
      JS_FUNCTION_NAMES.each do |key, value|
        sym_table_code << "#{value}=#{key};"
      end
      @lib_output_destination.write "c#{sym_table_code.length}$#{sym_table_code}"
      
      # now each bundle...
      @main_bundle.link!(:html5)
      @main_bundle.lib_link!(@lib_output_destination, :html5)
      
      
      @lib_output_destination.close
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
    
    # the lib object code
    def js_lib_build_path
      File.expand_path(File.join(project_root, build_prefix, Vienna.underscore(project_name)) + '_html5.js')
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