# 
#  plist.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-06-05.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  module Builder
  
    class Plist
    
      def initialize(source, dest, project)
        @source = source
        @dest = dest
        @project = project
      end
    
      def build!
        file = File.new @source
        output = File.new @dest, 'w'
        doc = REXML::Document.new file
        output_element output, doc.root
      end
    
      def output_element(file, element)
        case element.name 
        when "plist"
          file.write "{\"plist\":{"
          element.each_element do |e|
          output_element file, e
          file.write "," if e.next_element
          end
          file.write "}}"
      
        when "dict"
          file.write "\"dict\":{"
          element.each_element do |e|
          output_element file, e
          end
          file.write "}"
    
        when "key"
          file.write "\"#{element.text}\":"
    
        when "string"
          file.write "{\"#{element.name}\": \"#{element.text}\"}"
          file.write "," if element.next_element
    
        end
      end
    end
  end
end
