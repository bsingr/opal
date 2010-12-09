module Opalite
  
  ##
  # Main opal builder. The file built by this opal will be named in the format
  # opal_name-1.0.0.js and will contain the gem name, version, etc, as well as
  # all the lib and bin files. Test files will not be included
  # 
  class Builder
    
    def initialize(spec)
      @spec = spec
      @out_dir = "#{@spec.name}-#{@spec.version}.opal"
    end
    
    ##
    # Build the opalite in JSON format
    # 
    def build
      result = ["{\n"]
      result << "\"name\": #{@spec.name.inspect},\n"
      result << "\"version\": #{@spec.version.inspect}\n"
      result << "}"
      
      puts result.join('')
      puts success
      
      puts "=== core files"
      build_core_files
      
      puts "=== test files"
      build_test_files
    end
    
    ##
    # Build the main opalite file (lib source code and bin source code)
    #
    def build_core_files
      out = File.join @out_dir, "#{@spec.name}-#{@spec.version}.js"
      core_files = Dir["lib/**/*.rb"] + Dir["lib/**/*.js"]
      files = {}
      
      core_files.each do |core_file|
        files[core_file] = Opal.compile(File.read(core_file))
      end
      
      result = []
      result << "Opal.register_gem({"
      result << "\"name\": \"#{@spec.name}\","
      result << "\"version\": \"#{@spec.version}\","
      result << "\"files\": {"
      
      file_out = []
      
      files.each do |file_name, content|
        file_out << "\"#{file_name}\":#{content}"
      end
      
      result << file_out.join(", ")
      
      result << "}"
      result << "});"
      
      File.open out, "w" do |output|
        output.write result.join
      end
    end
    
    ##
    # Build just the test files for opal into the file: (replacing correct 
    # version and name) opal_name-1.0.0.opal/opal_name-1.0.0-test.js 
    # 
    # Format:
    # =======
    # 
    # Assuming name: opal, version: 1.0.0, and 2 spec files.
    # 
    # Opal.register_gem({
    #   "name": "opal",
    #   "version": "1.0.0",
    #   "files": {
    #     "spec/spec_helper.rb": "...code...",
    #     "spec/core/some_method.rb": "...code...",
    #     "spec/core/some_method2.rb": "...code..."
    #   }
    # });
    # 
    # Where "...code..." will be the compiled ruby code (as javascript). We use
    # register_gem because thats the type of input the files were originally. We
    # can, and do, register the same name more than once (once for core libs, 
    # again for specs, and maybe again for resources (datauri and mhtml)). To
    # register normal libs, we use register_lib.
    # 
    def build_test_files
      out = File.join @out_dir, "#{@spec.name}-#{@spec.version}-test.js"
      puts "out is: #{out}"
      files = {}
      
      @spec.test_files.each do |test_file|
        puts test_file
        files[test_file] = Opal.compile(File.read(test_file))
      end
      
      result = []
      result << "Opal.register_gem({"
      result << "\"name\": \"#{@spec.name}\","
      result << "\"version\": \"#{@spec.version}\","
      result << "\"files\": {"
      
      file_out = []
      
      files.each do |file_name, content|
        file_out << "\"#{file_name}\":#{content}"
      end
      
      result << file_out.join(", ")
      
      result << "}"
      result << "});"
      
      File.open out, "w" do |output|
        output.write result.join
      end
    end
    
    ##
    # Write the actual opalite to disk (with predetermined filename)
    # 
    def write_opalite
      
    end
    
    ##
    # Report if success
    # 
    def success
      ["  Successfully build Opalite",
       "  Name: #{@spec.name}",
       "  Version: #{@spec.version}",
       "  File: #{@spec.name}-#{@spec.version}.opal"].join("\n")
    end
  end
end
