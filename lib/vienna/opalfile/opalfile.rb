# 
# opalfile.rb
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
    
    attr_reader :tasks
    
    # array of TaskScope instances
    attr_reader :task_scope_stack
    
    attr_reader :opalfile_path
    
    # Access the global modes and configs
    def self.env
      @opalfile_env ||= {:all => {}}
    end
    
    # Access the global mode/config
    def self.config_for(mode, config)
      res = {}
      # First: merge in all configs that apply to all modes
      if env.has_key?(:all) and env[:all].has_key?(:all)
        res.merge!(env[:all][:all]) 
      end
      # Second: merge in all configs that apply to current mode
      if env.has_key?(mode) and env[mode].has_key?(:all)
        res.merge!(env[mode][:all])
      end
      # Third: merge in target configs that apply to all modes
      if env.has_key?(:all) and env[:all].has_key?(config)
        res.merge!(env[:all][config])
      end
      # Forth: merge in target configs that apply to current mode
      if env.has_key?(mode) and env[mode].has_key?(config)
        res.merge!(env[mode][config])
      end
      # return our full config
      res
    end
    
    # set the root opalfile
    def self.root_opalfile=(path_to_root)
      @root_opalfile = new(path_to_root)
    end
    
    def self.root_opalfile
      @root_opalfile
    end
    
    
    def initialize(root)
      @opalfile_path = root
      # default mode is :all
      @current_mode = :all
      @configs = {}
      @namespace_scope = []
      # stack of TaskScope instanced for instance_evaling context
      @task_scope_stack = []
      @tasks = {}
      
      # firstly copy tasks etc from root, if it exists?
      root_opalfile = self.class.root_opalfile
      # merge unless root_opalfile.nil?
      @tasks = root_opalfile.tasks.dup unless root_opalfile.nil?
      
      instance_eval File.read(root) if File.exist? root

    end
    
    def has_task?(task_name)
      @tasks.has_key?(task_name)
    end
    
    # force invoke the given task name with the given options
    def invoke(task_name, options={})
      # puts "need to invoke #{task_name}"
      @task_scope_stack << (ctx = Vienna::TaskScope.new)
      ctx.task_variables = options
      ctx.opalfile = self
      @tasks[task_name].invoke(ctx)
      @task_scope_stack.pop
    end
    
    # find task name with scope
    def [](name, scope=nil)
      task_name = name.to_s
      if scope
        task_name = scope + ":" + task_name
      end
      if @tasks[task_name]
        return @tasks[task_name]
      end
      task_name = name.to_s
      @tasks[task_name] or raise "Don't know how to build task #{name}"
    end
    
    def config_for(config_name)
      config = {}
      config_name = config_name.to_sym
      config.merge!(@configs[:all]) if @configs.has_key? :all
      config.merge!(@configs[config_name]) if @configs.has_key? config_name
      config
    end

  end
end
