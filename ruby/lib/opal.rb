
require "opal/v8"

##
# Assumption now is that opal will be running with therubyracer gem
#
module Opal
  def self.run
    Opal::V8.run
  end
end
