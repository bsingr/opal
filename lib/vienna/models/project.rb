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
    
    # the main target
    attr_reader :main_target
    
    def self.load project_path
      if File.exists? File.join(project_path, 'Opalfile')
        return new(project_path)
      end
      nil
    end
    
    BASE_OPALFILE = File.join(Vienna::PATH, 'Opalfile')
    
    def initialize(project_root, build_options)
      @build_options = build_options
      @project_root = project_root
      @targets = nil
      # lets begin by loading our root opalfile
      # @opalfile = Opalfile.new(BASE_OPALFILE)
      opalfile
      puts "\n\n\n\n######################################## ENV"
      p Opalfile.env
      puts "######################################## TASKS"
      puts @opalfile.tasks.each_key.map { |key| key }
      puts "######################################## DONE\n\n\n\n"
    end
    
    def inspect
      "#<Vienna::Project #{File.basename(project_root)}>"
    end
    
    # Opalfile is a build task setup for each bundle, app, opal or theme. It 
    # allows the developer to setup custom build options and processes which
    # can depend on the environment etc. Inspired by Buildfiles in Sproutcore.
    def opalfile
      return @opalfile if @opalfile
      Opalfile.root_opalfile = BASE_OPALFILE
      @opalfile = Opalfile.root_opalfile
    end
    
    def config
      @config
      # ...
    end
    
    # Add a new referenced target (target_name) from the given target. The given
    # target is used as it might have a sub-vendor or sub-theme where the given
    # target is actually stored.
    def require_target(target_name, from_target)
      
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
      target = add_target :target_name => File.basename(project_root),
                 :target_type => :opal,
                 :target_root => project_root,
                 :project     => self
                 
      @main_target = target
      # find all targets for this project_root with given config
      find_targets_for target, config
      # targets
      @targets
    end
    
    # Find all targets relative to the given root_path with the given config
    def find_targets_for the_target, config
      puts "looking for targets..... #{the_target.target_name}"
      # p the_target.opalfile
      the_target.required.each do |target|
        # if we already know about the target, skip it
        next if @targets.has_key?(target)
        # currently only look in our own frameworks/ root
        try_path = File.join(Vienna::PATH, 'frameworks', target.to_s)
        
        if File.exist?(try_path) and File.directory?(try_path)
          # found target, so add it
          target = add_target :target_name  => target.to_s,
                              :target_type  => :opal,
                              :target_root  => try_path,
                              :project      => self
          # search this target for all dependencies
          find_targets_for target, config
        else
          raise "Could not find required opal #{target}. (Required in #{the_target.target_name})"
        end
      end
    end
    
    # add a target
    def add_target(options)
      targets[options[:target_name]] = Target.new options
    end
    
    def build!()
      # get main target and put it at the end
      all_targets = targets.each_value.to_a

      all_targets.push all_targets.slice!(all_targets.index @main_target)
      all_targets.each do |target|
        
        puts "\n############################################################"
        puts "# #{target.target_name}"
        puts "############################################################\n"
        # prepare
        target.prepare!
        # go through and build each to get list of build_items
        target.build!
      end
    end
    
    # def get the build mode
    def build_mode
      @build_options[:build_mode] || :debug
    end
    
    # build root. by default this is the root of the main target, but can be 
    # custom
    def build_root
      @build_options[:build_root] || @main_target.target_root
    end
  end
end
