# 
# dsl.rb
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
    
    # enter the new mode (:debug, :all, :spec, :release, etc.)
    def mode(mode_name, &block)
      @current_mode = mode_name
      # make sure our global env has this mode
      self.class.env[mode_name] ||= Hash.new
      # configure all configs within
      instance_eval(&block)
      # always go back to :all when outside a mode - modes cannot be nested
      @current_mode = :all
    end
    
    def config(config_name, opts={})
      # ensure we have a configuration setting for config_name in current mode
      self.class.env[@current_mode][config_name] ||= Hash.new
      # merge in new options with already existing options
      self.class.env[@current_mode][config_name].merge! opts
    end
    
    def desc(description)
      @last_desc = description
    end
    
    def task(task_name, &block)
      define_task task_name, &block
    end
    
    def namespace(name=nil, &block)
      define_namespace(name, &block)
    end
    
  end
end
