
module Opalite
  module Runner
    ##
    # Run from command line. For now we assume 'build' command
    #
    def self.run(args)
      raise "Usage: opalite build [gem_name.gemspec]" unless args.length == 2
      
      gemspec = File.read args[1]
      
      Opalite::Gem.class_eval gemspec, args[1]
      
      
      # puts "running with: #{args.inspect}"
      # puts "need to read #{args[1]}"
    end
    

  end
end
