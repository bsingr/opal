# 
#  rakefile.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-19.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  class Rakefile
  
    def initialize
    
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
      puts opts
    end
  
  end
  
end