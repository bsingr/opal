require 'opalspec/matchers'
require 'opalspec/expectations'
require 'opalspec/example'
require 'opalspec/runner'
require 'opalspec/dsl'

Dir.glob(File.join(Dir.getwd, 'opals', 'opalruby', 'spec/**/def_spec.rb')).each do |rb|
  puts rb
  require rb
end


# 
# describe "Second Describe" do
#     
#   it "secondly should do this first" do
#     raise "shit son, this went badly"
#   end
#   
#   it "secondly should do this second" #do
#     
#   #end
# end

Spec::Runner.run
