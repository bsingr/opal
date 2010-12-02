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
    
    def self.autorun
      puts "autorunning!"
      ARGV.each do |spec|
        puts "need to load spec #{spec}"
        if File.exists? spec
          puts "it exists! #{File.expand_path(spec)}"
          require File.expand_path(spec)
        else
          puts "Bad spec to load (does not exist): #{spec}"
        end
      end
      
      Spec::Runner.run
    end
    
  end # Runner
end


