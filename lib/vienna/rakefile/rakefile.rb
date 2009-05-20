# 
#  rakefile.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-19.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 
# 
# This rakefile system is loosely based on Buildfile by sproutit
# www.github.com/sproutit and is influnenced by their config system
# to manage builds. It takes a different appraoch however, by tying
# these in to Objective-C compiler directives and autobuild names.

module Vienna
  
  class Rakefile
  
    def initialize
      @configs = {}
    end
  
    def load!(filename)
    
      if File.directory? filename
        load! File.join(filename, 'Rakefile')
      elsif File.exist? filename
        text = File.read(filename)
        instance_eval text
      end
      return self
    end
  
    def config(config_name, opts = {})
      config_name = config_name.to_sym
      config = {}
      config.merge! opts
      @configs.store config_name, config
    end
    
    def config_for(config_name)
      config = {}
      config_name = config_name.to_sym
      config.merge!(@configs[:all]) if @configs.has_key? :all
      config.merge!(@configs[config_name]) if @configs.has_key? config_name
      return config
    end
    
    
    def namespace(name=nil, &block)
      # puts "namespace: #{name}"
    end
    
    def desc(description)
      # puts "description"
    end
    
  end
end