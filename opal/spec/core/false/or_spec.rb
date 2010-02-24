describe "FalseClass#|" do
  
  it "returns false if other is false or nil, true otherwise" do
    (false | false).should == false
    (false | nil).should == false
    (false | true).should == true
    (false | "").should == true
    (false | "string").should == true
    (false | 0).should == true
  end
end
