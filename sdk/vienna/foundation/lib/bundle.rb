# 
# bundle.rb
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
  
  class Bundle
    
    class << self
      
      def main_bundle
        @all_bundles['']
      end
      
      def bundle_with_path(path)
        
      end
      
      def bundle_with_url(url)
        
      end
      
      def bundle_for_class(a_class)
        `return rb_ivar_get(#{a_class}, '__bundle__');`
      end
      
      def bundle_with_identifier(identifier)
        
      end
      
      def all_bundles
        
      end
      
      def all_frameworks
        
      end
    end
    
    def init_with_path(path)
      self
    end
    
    def init_with_url(url)
      
    end
    
    def load
      
    end
    
    def loaded?
      true
    end
    
    def unload
      
    end
    
    def bundle_url
      
    end
    
    def resource_url
      
    end
    
    def executable_url
      
    end
    
    def bundle_path
      @bundle_path
    end
    
    def resource_path
      # @bundle_path + "/resources"
    end
    
    def executable_path
      
    end
    
    def url_for_resource(name, with_extension:ext)
      
    end
    
    def path_for_resource(name)
      # puts "getting #{name} and got:"
      # puts @url_map["resources/#{name}"]
      @url_map["resources/#{name}"]
    end
    
    def path_for_resource(name, of_type:ext)
      # check images first, otherwise return normal path
      "resources/#{name}.#{ext}"
    end
    
    def load_vib_named(name, external_name_table:name_table, load_delegate:delegate)
      # puts "load_vib_named"
      vib = VN::Vib.new(name, self, delegate)
      vib.instantiate_vib_with_external_name_table(name_table)
      vib
    end
    
    def resource_contents_for_file(name, of_type:ext)
      @resources["resources/#{name}.#{ext}"]
    end
    
    def info_dictionary
      @info_dictionary
    end
    
  end
end
