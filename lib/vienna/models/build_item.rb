# 
# build_item.rb
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

require File.join(File.dirname(__FILE__), 'struct_accessors')

module Vienna
  
  # An item to be build (ruby, css, image etc)
  class BuildItem
    
    include StructAccessors
    
    # target
    attr_reader :target
    
    def initialize(target, options={})
      puts "making a new build item with filename: #{options[:filename]}"
      @target = target
      merge! options
    end
    
    # Should this item be included in the build. Items might be to start, but
    # might then be hidden. e.g, ruby files are first put in a copy stage, but
    # then they are changed to a 'build:ruby' stage instead, so the inital item
    # will become hidden.
    def hidden?
      self[:hidden] ||= false
    end
    
    # For use with above: actually sets builditem to be hidden
    def hide!
      self[:hidden] = true
      self
    end
    
    # This is called whenever the build item is created. Uses 'entry:prepare' 
    # task
    def prepare!
      opalfile = target.opalfile
      if opalfile.has_task? 'build_item:prepare'
        opalfile.invoke 'build_item:prepare',
          :build_item => self,
          :target     => target,
          :config     => target.config,
          :project    => target.project
      end
      self
    end
    
    # Build the item
    def build!
      build_to build_path
    end
    
    def stage!
      build_to staging_path
    end
    
    def build_to(out_path)
      raise "no build task defined for #{filename}" if build_task.nil?
      
      # find build task
      opalfile = target.opalfile
      if !opalfile.has_task? build_task
        raise "Could not build #{filename}: no task defined (#{build_task})"
      end
      
      opalfile.invoke build_task,
        :entry      => self,
        :target     => target,
        :config     => target.config,
        :project    => target.project,
        :src_path   => source_path,
        :src_paths  => source_paths,
        :dst_path   => dst_path
      
      self
    end
    
  end
end
