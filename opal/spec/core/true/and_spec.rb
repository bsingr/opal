describe "TrueClass#&" do
  
  it "returns false if other is false or nil, true otherwise" do
    (true & true).should == true
    (true & false).should == false
    (true & nil).should == false
    (true & "").should == true
    (true & "something").should == true
  end
end
