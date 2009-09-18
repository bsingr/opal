# 
# generate.rb
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
  
  class RubyParser
    
    def generate_class(klass)
      push_current_self # klass.js_name
      write "var #{current_self} = RClass.define('#{klass.klass_name}', #{klass.super_klass}) ;\n"
      # generate_bodystmt klass.bodystmt
      # puts klass.bodystmt
      klass.bodystmt.each do |b|
        generate_bodystmt b
      end
      
      pop_current_self
    end
    
    def generate_bodystmt(bodystmt)
    
      case bodystmt.node
      when :def
        generate_def bodystmt
      when ','
        generate_bodystmt bodystmt[:left]
        generate_bodystmt bodystmt[:right]
      else
        write "\nUnknown type for generate_bodystmt: #{bodystmt}\n"
      end
    end
    
    def generate_def(definition)
      write "#{current_self}.$#{definition[:singleton] ? 'define_singleton_method' : 'define_method'}('#{definition[:fname]}', function("
      definition[:f_arglist][:arg].each do |a|
        # unless first item, add a commar....
        write ", " unless definition[:f_arglist][:arg].first == a
        write a
      end
      #output arguments...
      write ") {\n"
      #output argument adjustments..... variable arg lengths etc
      if definition[:bodystmt]
        definition[:bodystmt].each do |stmt|
          puts stmt
          generate_bodystmt stmt
        end
      end
      # output body of methods
      write "});\n"
    end
    
  end
end