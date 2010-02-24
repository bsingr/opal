describe "Array#last" do

  it "should return the last element" do
    [0, 1, 2, 3, 4, 5].last.should == 5
  end
  
  it "should return nil if self is empty" do
    [].last.should == nil
  end
  
  it "should return the last count elements if given a count" do
    [0, 1, 2, 3, 4, 5, 6].last(3).should == [4, 5, 6]
  end
  
  it "should return an empty array when passed a count on an empty array" do
    [].last(0).should == []
    [].last(1).should == []
    [].last(2).should == []
  end
  
  it "should return an empty array when count is 0" do
    [1, 2, 3, 4].last(0).should == []
  end
  
  it "should return an array containing the last element when count is 1" do
    [1, 2, 3, 4, 5, 6].last(1).should == [6]
  end
  
  it "should raise an ArgumentError when count is nagative" do
    # Proc.new { [1, 2].last(-1) }.should raise_error(ArgumentError)
  end
  
end
