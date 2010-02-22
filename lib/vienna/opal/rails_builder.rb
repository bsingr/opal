module Vienna
  
  module Opal
    
    # Class to build single rails "project". Used namely in development mode of
    # a rails project. Avoid use in production as some files may take a while to
    # compile. By default, rake task added to rails to allow on the spot 
    # building
    # 
    class RailsBuilder
      
      # Where to initially look for "requires". By deafult it is Dir.getwd
      attr_writer :source_directory
      
      def initialize(options={})
        @options = {:minify => true}.merge(options)
        @require_files = []
        puts "building a rails builder"
      end
      
      # Do actual build. Result returned as a string
      # 
      def build!
        result = []
        result << Vienna::Opal.build_opal_browser(minify?)
        @require_files.each do |rb|
          # first check local directory
          if File.exist?(File.join(@source_directory, "#{rb}.rb"))
            str = build_file(File.join(@source_directory, "#{rb}.rb"), "#{rb}.rb")
            result << %{opal_define_file("#{rb}.rb",#{str});}
          # next check libs path - might also have a dir associated with it
          elsif File.exist?(File.join(Opal.libpath, "#{rb}.rb"))
            build_name = "vendor/#{rb}.rb"
            str = build_file(File.join(Opal.libpath, "#{rb}.rb"), build_name)
            result << %{opal_define_file("#{build_name}", #{str});}
            # try glob for dir as well as single file
            Dir[File.join(Opal.libpath, rb.to_s, "**/*.rb")].each do |g|
              build_name = "vendor/" + /^#{Opal.libpath}\/(.*)/.match(g)[1]
              str = build_file(g, build_name)
              result << %{opal_define_file("#{build_name}", #{str});}
            end
          else
            puts "#{rb} does not exist"
          end
        end
        
        result << %{opal_browser_main("#{@main_file}.rb");}
        result.join("")
      end
      
      # Build the file at the given full path. Returns a string result
      # Build name is the local name to give the __FILE__ and resulting opal 
      # file. Files in source_dir should be named locally. Libs will take the
      # form vendor/spec.rb
      # 
      def build_file(full_path, build_name)
        Vienna::CherryKit::RubyBuilder.new(full_path, nil, build_name).build!
      end
      
      # Minify js code. Taken from init options
      # 
      def minify?
        @options[:minify]
      end
      
      # Where to look for source files initially. Should be working directory
      # 
      def source_directory
        @source_directory || Dir.getwd
      end
      
      # Tell the builder to require the given file/lib/etc.
      # Initially searches is source_directory, then searches a list of "known  
      # places"
      # 
      def require_file(name)
        # avoid duplicates
        (@require_files << name) unless @require_files.include?(name)
      end
      
      # Main file to run. Sets a line in js to load the given filename. Must be
      # in the "source" directoy. Build this file if not in require_files
      # 
      def main_file=(name)
        @main_file = name
        require_file(name)
      end
    end # end RailsBuilder
  end
end
