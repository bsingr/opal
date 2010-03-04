describe "Array#join" do
  it "does not seperates elements when the passed seperator is nil" do
    [1, 2, 3].join(nil).should == '123'
  end
  
  it "does not process the separator if the array is empty" do
    a = []
    sep = Object.new
    a.join(sep).should == ""
  end
end
