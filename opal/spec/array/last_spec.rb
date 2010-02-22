# require "spec_helper"

describe "Array#last" do
  it "returns the last element" do
    [0, 1, 2, 3, 4, 5].last.should == 5
  end
  
  it "returns nil if self is empty" do
    [].last.should == nil
  end
  
  it "returns the last count elements if given a count" do
    [1, 2, 3, 4, 5, 6].last(3).should == [4, 5, 6]
  end
  
  it "returns an empty array when passed a count on empty array" do
    [].last.should == []
  end
end
