describe "Array#map" do
  
  it "returns a copy of array with each element replaced by the value returned by block" do
    a = ['a', 'b', 'c', 'd']
    b = a.map { |i| i + '!' }
    b.should == ['a!', 'b!', 'c!', 'd!']
    b.object_id.should_not == a.object_id
  end
  
  it "does not return subclass instance" do
    [1, 2, 3].map { |x| x + 1 }.class.should == Array
  end
  
  it "does not change self" do
    a = ['a', 'b', 'c', 'd']
    b = a.map { |i| i + '!' }
    a.should == ['a', 'b', 'c', 'd']
  end
end
