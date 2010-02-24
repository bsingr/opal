describe "The || operator" do
  
  it "evaluates to true if any of its operands are true" do
    if false || true || nil
      x = true
    end
    x.should == true
  end
  
  it "evaluates to false if all of its operands are false" do
    if false || nil
      x = true
    end
    x.should == nil
  end
  
  it "is evaluated before assignment operators" do
    x = nil || true
    x.should == true
  end
end
