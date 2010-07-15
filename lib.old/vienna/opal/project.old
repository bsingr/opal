module Vienna
  
  module Opal
    
    class Project
      
      attr_reader :app_dir, :app_name, :app_title
      
      def initialize
        @app_dir = Dir.getwd
        @app_name = File.basename(@app_dir)
        @app_title = @app_name.split('_').collect { |p| p.capitalize }.join(' ')
      end
      
      # Normal build
      # 
      def build!
        # make sure opal js exists, if not, build it
        update_opal! unless File.exist?(opal_js_file)
        # app js file
        File.open(project_js_file, 'w') do |out|
          # all ruby sources
          ruby_sources.each do |src|
            name = /^#{@app_dir}\/(.*)/.match(src)[1]
            str = Vienna::CherryKit::RubyBuilder.new(src, nil, name).build!
            out.write %{opal_define_file("#{name}",#{str});}
          end
          # main ruby file to load
          out.write %{opal_browser_main("#{main_rb_name}");}
        end
      end
      
      # Update the opal.js file in the app root
      # 
      def update_opal!
        File.open(opal_js_file, 'w') do |out|
          out.write Vienna::Opal.build_opal_browser(true)
        end
      end
      
      # Path to opal.js file
      # 
      def opal_js_file
        File.join(@app_dir, 'opal.js')
      end
      
      # Path to project's js file
      # 
      def project_js_file
        File.join(@app_dir, "#{app_name}.js")
      end
      
      # Main file's name
      # 
      def main_rb_name
        OPAL_BUILD_OPTIONS[:main]
      end
      
      # All ruby sources we need to build: main js file from options, as well as
      # all require files.
      # 
      def ruby_sources
        sources = []
        path = File.join(@app_dir, main_rb_name)
        sources << path if File.exist?(path)
        sources
      end
    
    end # end Porject
  end
end
