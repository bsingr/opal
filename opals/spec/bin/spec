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


# if we run in the browser, we really want to wait until the document is ready
# before we start running..
if RUBY_PLATFORM == "browser"
  Document.ready? do
    # puts "running in ready"
    Spec::Runner.run
  end
else
  Spec::Runner.run
end

# require "spec"
# 
# Dir.glob(File.join(Dir.getwd, 'opals', 'opal', 'spec/**/*.rb')).each do |rb|
#   puts "requiring #{rb}"
#   require rb
# end
# 
# Spec::Runner.run
