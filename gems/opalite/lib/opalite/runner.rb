
module Opal
  module Runner
    ##
    # Run from command line. For now we assume 'build' command
    #
    def self.run(args)
      raise "Usage: opalite build [opal_name.opalspec]" unless args.length == 2
      
      puts "reading"
      gemspec = File.read args[1]
      puts "read"
      
      Opal.class_eval gemspec, args[1]
      
      # by default, build just the main opal.
      spec = $opalite_defined_spec
      
      raise "Error constructing Gem Specification" unless spec
      
      builder = Opal::Builder.new spec
      builder.build
      
      
      # puts "running with: #{args.inspect}"
      # puts "need to read #{args[1]}"
    end
    

  end
end
