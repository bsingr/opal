require 'foundation'
require 'app_kit'

# loads all vienna stuff
require 'vienna/vienna'
require 'app_controller'

def main(args, named_args)
  CPApplicationMain(args, named_args)
end

class AppController
  
  # normal method
  def my_selector(wow, bob:something)
    my_selector 100, bob:92830
    @adam
    @_adam
    @_adam_beynon
    @adam_beynon
  end
  
  # 'private' method
  def _my_really_long_selector
  
  end
  
  # method with a single param (one param means treat it like a selector with semi colon)
  def my_method_to_do_something_with(obj)
    
  end
  
  def applicationWillFinishLaunching(notification)
    
  end
  
  def application_did_finish_launching(notification)
    puts "Woop!"
  end
end