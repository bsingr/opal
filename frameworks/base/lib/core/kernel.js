// # 
// # kernel.rb
// # vienna
// # 
// # Created by Adam Beynon.
// # Copyright 2009 Adam Beynon.
// #
// # Permission is hereby granted, free of charge, to any person obtaining a copy
// # of this software and associated documentation files (the "Software"), to deal
// # in the Software without restriction, including without limitation the rights
// # to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// # copies of the Software, and to permit persons to whom the Software is
// # furnished to do so, subject to the following conditions:
// # 
// # The above copyright notice and this permission notice shall be included in
// # all copies or substantial portions of the Software.
// # 
// # THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// # IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// # FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// # AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// # LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// # OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// # THE SOFTWARE.
// #
// 
// module Kernel
// 
//   def nil?
//     false
//   end
// 
//   def ===(other)
//  
//   end
// 
//   def =~(obj)
//    nil
//   end
// 
//   def !=(obj)
//    # self =~ obj ? false : true
//   end
// 
//   def eql?(obj)
//  
//   end
// 
//   def class
//  
//   end
// 
//   def clone
//  
//   end
// 
//   def dup
//  
//   end
// 
//   def initialize_copy (orig)
//  
//   end
//   
//   def taint
//     
//   end
//   
//   def tainted?
//     
//   end
//   
//   def untaint
//     
//   end
//   
//   def untrust
//     
//   end
//   
//   def untrusted?
//     
//   end
//   
//   def trust
//     
//   end
//   
//   def freeze
//     
//   end
//   
//   def frozen?
//     
//   end
//   
//   def to_s
//     `return "#<" + RClass.obj_classname(this) + ":0x00000000>" ;`
//   end
//   
//   def inspect
//     ""
//   end
//   
//   def methods
//     
//   end
//   
//   def singleton_methods
//     
//   end
//   
//   def protected_methods
//     
//   end
//   
//   def private_methods
//     
//   end
//   
//   def public_methods
//     
//   end
//   
//   def instance_variables
//     
//   end
//   
//   def instance_variable_get
//     
//   end
//   
//   def instance_variable_set
//     
//   end
//   
//   def instance_variable_defined?
//     
//   end
//   
//   def remove_instance_variable
//     
//   end
// 
//   def instance_of?
//     `switch (klass.$type) {
//       case VN.MODULE:
//       case VN.CLASS:
//       case VN.ICLASS:
//       break ;
//      default:
//        VN.type_error('class or module required');
//      }
//      if (this.$klass == klass) return true ;
//     return false ;`
//   end
//   
//   def kind_of?
//     `switch (klass.$type) {
//       case VN.MODULE:
//       case VN.CLASS:
//       case VN.ICLASS:
//         break ;
//       default:
//         VN.type_error('class or module required');
//     }
//     var k = self.$klass ;
//     while (k) {
//       if (k == klass) {
//         return true;
//       }
//       k = k.$super;
//     }
//     return false; `   
//   end
//   
//   def is_a?
//     `switch (klass.$type) {
//       case VN.MODULE:
//       case VN.CLASS:
//       case VN.ICLASS:
//         break ;
//       default:
//         VN.type_error('class or module required');
//     }
//     var k = self.$klass ;
//     while (k) {
//       if (k == klass) {
//         return true;
//       }
//       k = k.$super;
//     }
//     return false;    `
//   end
//   
//   def puts
//     
//   end
//   
//   def taps
//     
//   end
// end
