# 
#  foundation.rb
#  vienna
#  
#  Created by Adam Beynon on 2010-07-21.
#  Copyright 2010 Adam Beynon. All rights reserved.
# 

puts "running in foundation!"

require 'opal'

# require all our framework stuff
Dir.glob('foundation/**/*.rb').each do |rb|
  puts rb
end

# require our main application.rb file
require File.join(Dir.getwd, 'lib', 'application')


