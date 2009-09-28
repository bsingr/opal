# 
#  vienna.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-09-23.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

require 'browser'

module Vienna
  
  # We can now use Vienna.app.*.* as a key path, or, using the shorteer version
  # VN.app.*.*.....
  def app
    @@app ||= VN::Application.shared_application
  end
  
end

# Shorter namespaced name
VN = Vienna

require 'foundation'
require 'app_kit'
