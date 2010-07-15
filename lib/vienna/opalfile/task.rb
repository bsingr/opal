# 
# task.rb
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
  
  class Opalfile::Task
    
    # action for task
    attr_accessor :action, :prerequisites
    
    def initialize(task_name, opalfile)
      @task_name = task_name
      @prerequisites = []
      @opalfile = opalfile
      @action = nil
      @description = nil
      @scope = opalfile.current_scope
      @invoke_count = 0
    end
    
    def invoke_with_call_array(invocation_array, task_scope_instance)
      @task_scope = task_scope_instance
      # puts "\n##### #@task_name #{self}\n"
      unless invocation_array.include? @task_name
        puts "||||| #{@task_name} actually running"
        invocation_array << @task_name
        
        invocation_array = invoke_prerequisites invocation_array
        @invoke_count += 1
        execute(task_scope_instance)
      
      else
        # puts "!!!!! #@task_name already run this task"
      end
      # puts "~~~~~ Finished #@task_name\n\n"
      invocation_array
    end
    
    def invoke(task_scope_instance)
      invoke_with_call_array [], task_scope_instance
    end
    
    def invoke_prerequisites(invocation_array)
      # puts "--- prerequisites: #{@prerequisites}"
      @prerequisites.each do |pre|
        task = @opalfile[pre, @scope]
        @opalfile.task_scope_stack << (ctx = Vienna::TaskScope.new)
        # puts "#{pre} task: #{task}"
        ctx.task_variables = @task_scope.task_variables
        invocation_array = task.invoke_with_call_array(invocation_array, ctx)
      end
      invocation_array
    end
    
    def execute(task_scope_instance)
      if @action
        task_scope_instance.instance_eval &@action
      else
        # puts "no action to run."
      end
    end
    
    def to_s
      "#<Task name=#@task_name, scope=#@scope prereq=#{@prerequisites.inspect}>"
    end
    
  end
end
