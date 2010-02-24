describe "Basic assignment" do
  
  it "allows the rhs to be assigned to the lhs" do
    a = nil;        a.should == nil
    a = 1;          a.should == 1
    a = [];         a.should == []
    a = [1];        a.should == [1]
    a = [nil];      a.should == [nil]
    a = [1, 2];     a.should == [1, 2]
  end
  
  it "allows chained assignment" do
    (a = 1 + b = 2 + c = 4 + d = 8).should == 15
    d.should == 8
    c.should == 12
    b.should == 14
    a.should == 15
  end
end

describe "Conditonal assignment" do
  
  it "assigns the lhs if previously unasigned" do
    1.should == 1
  end
end
