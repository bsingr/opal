require 'spec/runner/example_group_runner'

module Spec
  
  module Runner
    
    # Main entry point. Here need to load all spec files, then run them.
    # 
    def self.run
      # require all specs
      # Dir['spec/**/*.rb'].each { |spec| require spec }
      puts "running"
    end
    
  end # end Runner
end
