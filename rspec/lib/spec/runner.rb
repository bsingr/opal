require 'spec/runner/options'
require 'spec/runner/reporter'
require 'spec/runner/example_group_runner'

require 'spec/runner/formatter/html_formatter'
require 'spec/runner/formatter/terminal_formatter'

module Spec
  
  module Runner
  
    # Main entry point for spec runner.
    def self.run
      # puts "running"
      options.run_examples
    end
  
    def self.options
      # puts "getting options"
      @options ||= Options.new
      
      # puts "got options"
      @options
    end
    
  end # Runner
end


