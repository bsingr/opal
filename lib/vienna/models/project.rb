# 
# project.rb
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
  
  class Project
    
    # full path to project
    attr_reader :project_root
    
    # build options
    attr_reader :build_options
    
    def self.load project_path
      if File.exists? File.join(project_path, 'Opalfile')
        return new(project_path)
      end
      nil
    end
    
    def initialize(project_root)
      @project_root = project_root
    end
    
    def inspect
      "#<Vienna::Project #{File.basename(project_root)}>"
    end
    
    # Opalfile is a build task setup for each bundle, app, opal or theme. It 
    # allows the developer to setup custom build options and processes which
    # can depend on the environment etc. Inspired by Buildfiles in Sproutcore.
    def opalfile
      @opalfile ||= Opalfile.new.load!(project_root)
    end
    
    def config
      @config
      # ...
    end
    
    # Every target. A target is a opal, theme, or application. Recursively find
    # if needed.
    def targets
      # If we have already found them, just return them
      return @targets if @targets
      # hash of targets: target name to target instance
      @targets = {}
      # first we must add ourselves as a target - default is opal type 
      # application
      puts "need to add self as target"
      add_target :target_name => File.basename(project_root),
                 :target_type => :opal,
                 :target_root => project_root,
                 :project     => self
      # find all targets for this project_root with given config
      find_targets_for project_root, config
      # targets
      @targets
    end
    
    # Find all targets relative to the given root_path with the given config
    def find_targets_for target_root, config
      puts "looking for targets"
    end
    
    # add a target
    def add_target(options)
      targets[options[:target_name]] = Target.new options
    end
    
    def build!(options)
      
      # first: get all targets
      
      
      # second: should really clean
      @build_options = options
      
      # build each build_item in each target
      @targets.each do |target_name, target|
        # prepare
        target.prepare!
        # go through and build each to get list of build_items
        target.build!
        # go through each build item now and build it
        puts "----- Actualy building #{target}"
        build_items = target.build_items
        
        build_items.each do |item|
          p item
          item.build!
        end
      end
    end
  end
end
