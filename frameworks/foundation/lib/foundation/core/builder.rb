# 
# builder.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
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


module CherryKit
  
  # Builder module is in charge of registering and constructing methods for
  # a DSL like syntax for building up interfaces with default options for 
  # classes.
  module Builder
    
    # Builder DSL methods added to classes
    module BuilderClassMethods

      # Register the given builder_name with a set of default options
      # builder_options. Each option given to the builder, once merged with
      # options given on the construction of a builder instance, will be set on
      # the resulting object instance using key value coding.
      # 
      #     class SomeViewClass < View
      # 
      #       register_builder :some_view, :background_color => :blue
      # 
      #     end
      # 
      #     # create an instance
      #     some_view :size => [100, 200], :background_color  => :red
      #     # => #<SomeViewClass:102923>
      # 
      # @param {Symbol} builder_name
      # @param {Hash} builder_options
      # @returns {Class} self
      # 
      def register_builder(builder_name, builder_options)
        puts "registering builder #{builder_name}"

        builder_class = self

        CherryKit.define_method(builder_name) do |options, &block|
          puts "some code here"
          puts builder_options
          puts "builder class is #{builder_class}"
          # options = {}
          builder_class.build options
        end
      end
      
      # Create an instance from the receiver class
      def build(builder_options)
        object = allocate
 
        object.initialize_from_builder builder_options
        
        # now go through each builder_option that is left in hash
        builder_options.each do |key, value|
          puts "builder setting #{key} to #{value}"
          object.set_value_for_key value, key
        end
        # simply return our object
        object
      end
    end #BuilderClassMethods

    # Builder DSL methods that are added to instances
    module BuilderMethods

      def initialize_from_builder(builder_options)
        # default, just call initialize, no params
        initialize
      end
    end # BuilderMethods
      
  end # Builder
end

Object.extend CherryKit::Builder::BuilderClassMethods
Object.include CherryKit::Builder::BuilderMethods
