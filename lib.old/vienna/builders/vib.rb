module Vienna
  
  module Builder
    
    class Vib
      
      def initialize(source, output_file, project)
        @source = source
        @output = output_file
        @project = project
      end
      
      def build!
        t = ""
        File.readlines(@source).map do |l|
          t << l
        end
        @output.write(JSMin.minify(t))
      end
    end
  end
end