require 'rake'
require 'rake/tasklib'

module Opal
  module Rake
    
    class OpalTask < ::Rake::TaskLib
      
      attr_accessor :files
      
      attr_accessor :options
      
      def initialize(name = :opal)
        @name = name
        @files = []
        @options = []
        yield self if block_given?
        
        define_rake_task
      end
      
      def define_rake_task
        desc "Build opal files"
        task(@name) do
          Opal.build!((['--files', @files] + [@options]).flatten)
        end
      end
    end
  end
end
