require 'opalspec/runner/options'
require 'opalspec/runner/reporter'
require 'opalspec/runner/example_group_runner'

require 'opalspec/runner/formatter/html_formatter'
require 'opalspec/runner/formatter/terminal_formatter'

module Spec
  
  module Runner
  
    # Main entry point for spec runner.
    def self.run
      puts "running"
      options.run_examples
    end
  
    def self.options
      puts "getting options"
      @options ||= Options.new
      
      puts "got options"
      @options
    end
    
  end # Runner
end


