require 'spec/runner/options'
require 'spec/runner/reporter'
require 'spec/runner/example_group_runner'
require 'spec/runner/formatter/html_formatter'

module Spec
  
  module Runner
    
    # Main entry point. Here need to load all spec files, then run them.
    # 
    def self.run
      # require all specs
      # Dir['spec/**/*.rb'].each { |spec| require spec }
      puts "running"
      options.run_examples
    end
    
    def self.options
      @options ||= Options.new
    end
    
  end # end Runner
end
