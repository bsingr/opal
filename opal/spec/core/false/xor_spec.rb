describe "FalseClass#^" do
  
  it "returns false if other is nil or false, true otherwise" do
    (false ^ false).should == false
    (false ^ true).should == true
    (false ^ nil).should == false
    (false ^ "").should == true
    (false ^ "string").should == true
  end
end
