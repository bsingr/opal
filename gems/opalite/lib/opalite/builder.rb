module Opalite
  
  ##
  # Main opal builder. The file built by this opal will be named in the format
  # opal_name-1.0.0.js and will contain the gem name, version, etc, as well as
  # all the lib and bin files. Test files will not be included
  # 
  class Builder
    
    def initialize(spec)
      @spec = spec
    end
    
    ##
    # Build the opalite in JSON format
    # 
    def build
      result = ["{\n"]
      result << "\"name\": #{@spec.name.inspect},\n"
      result << "\"version\": #{@spec.version.inspect}\n"
      result << "}"
      
      puts result.join('')
      puts success
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
