describe "Array#pop" do
  
  it "removes and returns the last element of the array" do
    a = ["a", 1, nil, true]
    
    a.pop.should == true
    a.should == ["a", 1, nil]
    
    a.pop.should == nil
    a.should == ["a", 1]
    
    a.pop.should == 1
    a.should == ["a"]
    
    a.pop.should == "a"
    a.should == []
  end
  
  it "removes nil if there are no more elements" do
    [].pop.should == nil
  end
  
  describe "passed a number n as an arguments" do
    
    it "removes and returns an array with the last n elements of the array" do
      a = [1, 2, 3, 4, 5, 6]
      
      a.pop(0).should == []
      a.should == [1, 2, 3, 4, 5, 6]
      
      a.pop(1).should == [6]
      a.should == [1, 2, 3, 4, 5]
      
      a.pop(2).should == [4, 5]
      a.should == [1, 2, 3]
      
      a.pop(3).should == [1, 2, 3]
      a.should == []
    end
    
    it "returns a new empty array if there are no more elements" do
      a = []
      popped1 = a.pop(1)
      popped1.should == []
      a.should == []
      
      popped2 = a.pop(2)
      popped2.should == []
      a.should == []
    end
    
    it "returns whole elements if n exceeds size of the array" do
      # a = [1, 2, 3, 4, 5]
      # a.pop(6).should == [1, 2, 3, 4, 5]
      # a.should == []
    end
  end
end
