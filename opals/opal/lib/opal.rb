# Provides similar functionality to 'Gem' top level object.
module Opal
  
  # Returns the full path to the opal with the given name (string/symbol). This
  # does not require the gem in question to have been loaded. It is useful for
  # quickly getting at a resource path for example.
  # 
  # @example
  #   File.join(Opal.path_for_opal(:cherry_kit), 'resources')
  #   # => /opals/cherry_kit/resources
  # 
  # @param [String, Symbol] opal_name
  # @return [String]
  def self.path_for_opal(opal_name)
    raise "need to implement Opal.path_for_opal"
  end
end
