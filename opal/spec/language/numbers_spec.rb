describe "Ruby numbers in various ways" do
  
  it "the standard way" do
    435.should == 435
  end
  
  it "with underscore separations" do
    4_35.should == 435
  end
  
  it "with some decimals" do
    4.35.should == 4.35
  end
end
