module Spec
  
  module Runner
    
    # Main entry point. Here need to load all spec files, then run them.
    # 
    def self.run
      # require all specs
      Dir['spec/**/*.rb'].each { |spec| require spec }
    end
    
  end # end Runner
end
