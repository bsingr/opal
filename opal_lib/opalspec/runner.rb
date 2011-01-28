require 'spec/runner/options'
require 'spec/runner/reporter'
require 'spec/runner/example_group_runner'

require 'spec/runner/formatter/html_formatter'
require 'spec/runner/formatter/terminal_formatter'

module Spec
  module Runner
  
    def self.run
      options.run_examples
    end
  
    def self.options
      @options ||= Options.new
      @options
    end
    
    def self.autorun
      if ARGV.length == 0
        puts "Spec: no input files given"
        return
      end
      
      ARGV.each do |spec|
        if File.exists? spec
          require File.expand_path(spec)
        else
          raise "Bad spec to load (does not exist): #{spec}"
        end
      end
            
      Spec::Runner.run
    end
    
  end # Runner
end
