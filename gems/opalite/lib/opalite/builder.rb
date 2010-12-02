module Opalite
  class Builder
    
    def initialize(spec)
      @spec = spec
    end
    
    ##
    # Build the opalite in JSON format
    # 
    def build
      result = ["{"]
      # result << %Q{"name": "opal"}
      result << "}"
      
      puts result.join('')
    end
    
    ##
    # Write the actual opalite to disk (with predetermined filename)
    # 
    def write_opalite
      
    end
    
    ##
    # Report if success
    # 
    def success
      ["  Successfully build Opalite",
       "  Name: #{@spec.name}",
       "  Version: #{@spec.version}",
       "  File: #{@spec.name}.gem"].join("\n")
    end
  end
end
