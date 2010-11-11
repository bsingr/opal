require 'opalspec/matchers'
require 'opalspec/expectations'
require 'opalspec/example'
require 'opalspec/runner'
require 'opalspec/dsl'

describe "First Describe" do
  
  it "should do something first" do
    1.should == 2
  end
  
  it "should do something second" do
    1.should == 1
  end
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


puts "OK, running"

Spec::Runner.run
