# 
# module.rb
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

`cModule.$define_alloc_func(function(module_s_alloc) {
  
});`

class Module
  
  def freeze
    
  end
  
  def ===
    
  end
  
  def ==
    
  end
  
  def <=>
    
  end
  
  # def <
  #   
  # end
  # 
  # def <=
  #   
  # end
  # 
  # def >
  #   
  # end
  # 
  # def >=
  #   
  # end
  
  def initialize_copy
    
  end
  
  def to_s
    
  end
  
  def included_modules
    
  end
  
  def include?
    
  end
  
  def name
    
  end
  
  def ancestors
    
  end
  
  def attr
    
  end
  
  def attr_reader
    `var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < args.length; i++) {
      
      var body = new Function('self', '_cmd', 'return self.$i_g("@' + args[i] + '");')
      self.$def(args[i], body);
    }`
  end
  
  def attr_writer
    `var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < args.length; i++) {
      
      var body = new Function('self', '_cmd', 'val', 'VN$(self, "will_change_value_for_key","' + args[i] + '"); var ret = self.$i_s("@' + args[i] + '",val); VN$(self, "did_change_value_for_key","' + args[i] + '"); return ret;');
      self.$def(args[i] + '=', body);
    }`
  end
  
  def attr_accessor
    `var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < args.length; i++) {
      VN$(self, 'attr_reader', args[i]);
      VN$(self, 'attr_writer', args[i]);
    }`
  end
  
  def initialize
    
  end
  
  def instance_methods
    
  end
  
  def public_instance_methods
    
  end
  
  def protected_instance_methods
    
  end
  
  def private_instance_methods
    
  end
  
  def constants
    
  end
  
  def const_get
    
  end
  
  def const_set
    
  end
  
  def const_defined?
    
  end
  
  def remove_const
    
  end
  
  def const_missing
    
  end
  
  def class_variables
    
  end
  
  def remove_class_variable
    
  end

  def class_variable_get
    
  end
  
  def class_variable_set
    
  end
  
  def class_variable_defined?
    
  end
end
