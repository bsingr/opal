# 
#  file.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-16.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  # This class is used to represent a file that is, or will be, parsed and 
  # tokeniszed by the parser. This class holds references to scanners used
  # to tokenize the file, the file's path, and other details that might be
  # used at some point during parsing.
  class ObjectiveCFile
    
    attr_accessor :scanner, :file_path, :current_line
    
    attr_accessor :implementations, :interfaces, :protocols
    attr_accessor :functions, :typedefs, :structs, :defines
    attr_accessor :at_class_list
    
    attr_accessor :imported_files
    
    def initialize(file_path, parser)
          
      @implementations = []
      @interfaces = []
      @functions = []
      @protocols = []
      @typedefs = []
      @structs = []
      @defines = []
      
      @at_class_list = []

      # array of other files DIRECTLY imported by this file. note, these should 
      # only be the files that this file has the specific import for. Files that
      # are imported by these files are referenced in each specific file object,
      # so including trees of objects is easily done by recursevly getting this
      # array from child elements
      @imported_files = []
      
      @file_path = file_path
      @valid_file = true
      @current_line = 1
      @parser = parser
      
      if File.exists? file_path
        f = File.new(file_path)
        text = f.read
        @scanner = StringScanner.new(text)
      else
        puts "Imported file #{file_path} does not exist"
        @valid_file = false
      end
    end
    
    def file_name
      @file_path
    end
    
    def valid?
      @valid_file
    end
  end
end