# 
# run_loop.rb
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
  
  class RunLoop
    
    # A new loop of the run loop. All actions, view drawing etc should be caught
    # within this runloop and then run one completion
    def self.run(&block)
      # 1. make a new runloop
      run_loop = current_run_loop
      
      # 2. run the event/trigger
      `#{block}.__fun__();`
      
      # 3. now run all rendering etc for the runloop
      @current_run_loop.flush_queue
      
      # puts "======= finished run loop"
      
      # make sure we destroy our current run loop ready for a new one
      @current_run_loop = nil
    end
    
    def self.current_run_loop
      @current_run_loop ||= new
    end
    
    def initialize
      # object => [task list]
      @tasks_to_perform = {}
      # array of tasks in REVERSE order [target, action] - this makes it easier
      # to loop over all tasks by popping them from the end of the array
      @ordered_tasks = []
    end
    
    # add the action for the given target
    # we could splat some args as well to take unlimited args...
    def add_task(target, action)
      
      # puts "adding task for #{target} as #{action}"
      
      object_tasks = (@tasks_to_perform[target] || @tasks_to_perform[target] = [])
      # only do it once..
      unless object_tasks.include? action
        object_tasks << action
        @ordered_tasks.unshift [target, action]
      end
      
      self
    end
    
    # flush the queue
    def flush_queue
      `while ((#{task = @ordered_tasks.pop}).r){`
        task[0].__send__ task[1]
      `}`
      
      @tasks_to_perform = {}
    end
  end
end
