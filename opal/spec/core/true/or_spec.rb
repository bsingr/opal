describe "TrueClass#|" do
  
  it "returns true" do
    (true | true).should == true
    (true | false).should == true
    (true | nil).should == true
    (true | "").should == true
    (true | "charles").should == true
  end
end
