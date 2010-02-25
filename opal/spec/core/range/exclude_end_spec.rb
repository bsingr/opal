describe "Range#exclude_end?" do
  
  it "returns true if the range excludes the end value" do
    (-2..2).exclude_end?.should == false
    ('A'..'B').exclude_end?.should == false
    (0.5..2.4).exclude_end?.should == false
    
    (0...5).exclude_end?.should == true
    ('A'...'B').exclude_end?.should == true
    (0.5...2.4).exclude_end?.should == true
  end
end
