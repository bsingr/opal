# 
# task_manager.rb
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

module Vienna
  
  class Opalfile
    
    def define_task task_name, &block
      if task_name.is_a? Hash
        name = task_name.keys.first
        dep = task_name[name]
      else
        name = task_name
        dep = []
      end
      
      full_name = @namespace_scope.dup.push(name) * ":"
      
      task = (@tasks[full_name] ||= Task.new full_name, self)
      task.action = block
      task.prerequisites = dep
      
      @last_desc = nil
    end
    
    def current_scope
      @namespace_scope * ":"
    end
    
    def define_namespace(name)
      # puts "in new namespace #{name}"
      @namespace_scope.push name
      yield
      @namespace_scope.pop
    end
    
  end
end
