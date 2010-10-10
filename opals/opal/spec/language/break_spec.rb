
describe "The break statement" do
  it "ends block execution if used within block" do
    a = []
    lambda {
      a << 1
      break
      a << 2
    }.call
    a.should == [1]
  end
  
  it "causes block to return value passed to break" do
    lambda { break 123; 456 }.call.should == 123
  end
  
  it "causes block to return nil if an empty expression passed to break" do
    lambda { break (); 456 }.call.should == nil
  end
  
  it "causes block to return nil if no value passed to break" do
    lambda { break; 456 }.call.should == nil
  end
end

# describe "Executing break from within a block" do
#   
#   it "returns from the invoking singleton method" do
#     obj = Object.new
#     def obj.meth_with_block
#       yield
#       raise "break didn't break from the singleton method"
#     end
#     obj.meth_with_block { break :value }.should == :value
#   end
# end
