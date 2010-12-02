module Opalite
  module Gem
    class Specification
      ##
      # All possible/valid attributes for rubygems. We only actually use a few
      # of these, but they are all listed here to avoid any method_missing's.
      # 
      attr_accessor :name, :version, :date, :summary, :require_paths
      attr_accessor :email, :homepage, :description, :authors, :files
      
      ##
      # Capture RubyGems definition which simply takes a block
      # 
      def initialize
        # we need a block to define our spec..
        raise ArgumentError, "no block given" unless block_given?
        # actually define
        yield self
        # hacky way to keep tabs on the defined spec.
        $opalite_defined_spec = self
      end
      
    end
  end
end
