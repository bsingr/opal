# puts "running spec!"

# To run specs, do the following in order:
# 
# 1. require() spec opal
# 2. Setup rspec
# 3. require spec/spec_helper.rb from current working dir (i.e. main target)
# 4. Dir.glob over spec/**/*.rb in working dir to get all specs
# 5. Run specs.

# 1
require 'spec'

# 2
# nothing to do?

# 3

# 4
Dir.glob(File.join(Dir.getwd, 'spec/**/*.rb')).each do |rb|
  require rb
end

# 5
Spec::Runner.run
