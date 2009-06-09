# 
#  xib.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-06-04.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

require 'rexml/document'

module Vienna
  
  module Builder
    
    class Xib
      
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
          
        when "archive"
          file.write "{\"archive\":{"
          element.each_element do |e|
            output_element file, e
            file.write "," if e.next_element
            end
          file.write "}}"
          
        when "data"
          file.write "\"data\":{"
          element.each_element do |e|
            output_element file, e
            file.write "," if e.next_element
          end
          file.write "}"
          
        when "int", "integer", "string", "bool", "double"
          file.write "\"#{element.attribute "key"}\": " if element.attribute "key"
          file.write "{\"#{element.name}\": \"#{element.text}\"}"
          
        when "reference"
          file.write "\"#{element.attribute "key"}\": " if element.attribute "key"
          file.write "{\"id\":\"#{element.attribute "ref"}\"}"
          
        when "nil"
          file.write "\"#{element.attribute "key"}\": " if element.attribute "key"
          file.write "{\"nil\":\"\"}"
          
        when "object"
          # file.write "\"#{element.attribute "key"}\": " unless element.attribute("class") == "NSMutableArray" or element.attribute("class") == "NSArray"
          #           file.write "{\"class\": \"#{element.attribute "class"}\",\"id\": \"#{element.attribute "id"}\", \"objects\":{"
          #           element.each_element { |e| output_element file, e }
          #           file.write "}},"
          case (element.attribute "class").to_s
            
          when "NSMutableArray", "NSArray"
            file.write "\"#{element.attribute "key"}\": {\"class\": \"#{element.attribute "class"}\",\"id\": \"#{element.attribute "id"}\", \"objects\":["
            element.each_element do |e|
              unless e.name == "bool" and e.attribute("key").to_s == "EncodedWithXMLCoder"
                output_element file, e
                file.write "," if e.next_element
            end
            end
            file.write "]}"
          else
            file.write "\"#{element.attribute "key"}\": " if element.attribute "key"
            file.write "{\"class\": \"#{element.attribute "class"}\",\"id\": \"#{element.attribute "id"}\", \"objects\":{"
            element.each_element do |e|
              output_element file, e
              file.write "," if e.next_element
              end
            file.write "}}"
          end
        end
      end
      
    end
  end
  
end