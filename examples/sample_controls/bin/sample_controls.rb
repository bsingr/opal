# native ruby support. This file allows a vienna app to run natively using
# the ruby install on the host machine. Currently macruby only (as it uses
# macruy as a cheap way to get into cocoa) - gtk, win32 support coming soon.

# !currently macruby only!

# basically require environemnt.rb. This does (everything?) we need
require File.join(File.dirname(__FILE__), '..', 'config', 'environment')
