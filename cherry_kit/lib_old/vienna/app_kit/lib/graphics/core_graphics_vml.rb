# 
# vml_graphics_context.rb
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

# module Vienna
#   
#   # For IE browsers, use VML (as they do not support Canvas, yet).
#   if ENV[:graphics_context_platform] == :vml
#     
#     class GraphicsContext < Element
#       
#       def initialize
#         tag_name = 'div'
#         @first_time = true
#         @element = `document.createElement('div')`
#         # @ctx = `#{@element}.getContext('2d')`
#         @type = div
#         
#         # VML specific
#         @ctx_stack = []
#         @ctx = 
#       end
#       
#       def _create_new_context
#         `return {
#           alpha: 1.0, lineWidth: 1.0, lineJoin: 'miter', lineCap: 'flat'
#         };`
#       end
#       
#       def _create_copy_of_context(content)
#         `return {
#           alpha: context.alpha, lineWidth: context.lineWidth, lineJoin: context.lineJoin, lineCap: context.lineCap
#         };`
#       end
#     end
# 
#   end
# end
