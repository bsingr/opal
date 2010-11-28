# 
# target.rb
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
  
  class Target
    
    include StructAccessors
    
    attr_reader :target_name, :target_type, :target_root, :project
    
    def initialize(opts={})
      @target_name = opts.delete :target_name
      @target_root = opts.delete :target_root
      @target_type = opts.delete :target_type
      @project = opts.delete :project
      @build_items = []
      @main_target = opts.delete(:main_target) || false
      @required = nil
      merge! opts
      
      # get opalfile all setup
      opalfile
      # puts "\n\n\n\n######################################## ENV"
      # p Opalfile.env
      # puts "######################################## TASKS"
      # puts @opalfile.tasks.each_key.map { |key| key }
      # puts "######################################## DONE\n\n\n\n"
    end
    
    # builditems.. on;y those that are not hidden
    def build_items
      @build_items.reject { |e| e.hidden? }
    end
    
    # is this the main target
    def main_target?
      @main_target
    end
    
    def inspect
      "#<Target name=#{target_name}, type=#{target_type}>"
    end
    
    def opalfile
      @opalfile ||= Opalfile.new File.join(target_root, 'Opalfile')
    end
    
    # An array of the required items from the opal file
    def required
      return @required if @required
      # puts "checking required"
      req = config[:required]
      # puts "did check rrquired"
      # also make sure we include opal: bad things will happen if we dont
      @required = case req
      when Array
        unless req.include? :opal
          req << :opal
        end
        
        req
      when Symbol
        if req == :opal
          [req]
        else
          [req, :opal]
        end
      else
        # browser if we do not specify anything..
        [:opal, :browser]
      end
    end
    
    def config
      @config ||= HashStruct.new(Opalfile.config_for(project.build_mode, target_name.to_sym))
    end
    
    def prepare!
      # return
      # return @self if @is_prepared
      # puts "===== preparing #{target_name}"
      # @is_prepared = true
      # reset build items
      @build_items = []
      if opalfile.has_task? 'target:prepare'
        opalfile.invoke 'target:prepare', :target   => self, 
                                          :project  => project,
                                          :config   => config
      end
      self
    end
    
    def build!
      # return
      # puts "building: #{target_name}"
      if opalfile.has_task? 'target:build'
        opalfile.invoke 'target:build', :target   => self,
                                        :project  => project,
                                        :config   => config
      end
      
      # puts "################################################ build_items"
      
      # at this point we will have a list of all our actual build items.. so go
      # build them
      build_items.each do |item|
        # p item
        item.build!
      end
      self
    end
    
    # find the build item with the given filename
    def build_item_for(filename)
      @build_items.find do |item|
        item.filename == filename
      end
    end
    
    # Add an item to be built. The path is relative to the target root.
    def add_build_item(item_path, options={})
      options[:filename] = item_path
      @build_items << (res = BuildItem.new(self, options)).prepare!
      res
    end
    
    # add transform (i.e. not just a copy file stage, but we need to compile it
    # etc)
    def add_transform(build_item, options={})
      # puts "adding transform"
      @build_items << (res = BuildItem.new(self, options)).prepare!
      build_item.hide!
    end
    
    def add_composite(filename, options={})
      options[:filename] = filename
      options[:source_items] ||= []
      options[:composite] = true
      
      options[:build_path] ||= File.join(build_root, filename)
      options[:staging_path] ||= File.join(staging_root, filename)
      
      options[:target] ||= self
      options[:project] ||= self
      
      @build_items << (res = BuildItem.new(self, options)).prepare!
      res.source_items.each { |item| item.hide! }
      res
    end
  end
end
