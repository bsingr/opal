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
    
    def generate_bodystmt(stmt)
    
      case stmt.node
      when :def
        generate_def stmt
      when :numeric
        generate_numeric stmt
      when :call
        generate_call stmt
      when :identifier
        generate_identifier stmt
      when :self
        generate_self stmt
      when :array
        generate_array stmt
      when :assign
        generate_assign stmt
      # when ','
      #   generate_bodystmt bodystmt[:left]
      #   generate_bodystmt bodystmt[:right]
      else
        write "\nUnknown type for generate_bodystmt: #{stmt}\n"
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
      
      self.current_self_start_def
      
      #output argument adjustments..... variable arg lengths etc
      if definition[:bodystmt]
        definition[:bodystmt].each do |stmt|
          # puts stmt
          generate_bodystmt stmt
          write ";\n"
        end
      end
      
      self.current_self_end_def
      
      # output body of methods
      write "});\n"
    end
    
    
    def generate_assign stmt
      write 'var '
      generate_bodystmt stmt[:lhs]
      write ' = '
      generate_bodystmt stmt[:rhs]
    end
    
    
    
    def generate_array stmt
      write '['
      
      stmt[:args].each do |a|
        write ',' unless stmt[:args].first == a
        generate_bodystmt a
      end
      
      write ']'
    end
    
    
    def generate_identifier identifier
      write identifier[:name]
    end
    
    def generate_self identifier
      write current_self
    end
    
    def generate_call call
      if call[:recv]
        generate_bodystmt call[:recv]
      else
        write current_self
      end
        
      write ".$call('#{call[:meth]}', )"
    end
    
    
    def generate_numeric numeric
      write numeric[:value]
    end
    
  end
end