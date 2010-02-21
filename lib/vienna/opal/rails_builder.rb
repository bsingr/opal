module Vienna
  
  module Opal
    
    # Class to build single rails "project". Used namely in development mode of
    # a rails project. Avoid use in production as some files may take a while to
    # compile. By default, rake task added to rails to allow on the spot 
    # building
    # 
    class RailsBuilder
      
      # options - hash of options. Possible keys are:
      # 
      #   :require - singly symbol or array of symbols/strings representing all
      #              the files to include as part of the build. For example,
      #              [:github, 'twitter'] would compile and include these two
      #              libs as part of the build. Note, these files are first
      #              searched locally, then in specified locations. Additional
      #              lib directories can be specified for custom locations.
      def initialize(options={})
        
      end
      
    end # end RailsBuilder
  end
end
