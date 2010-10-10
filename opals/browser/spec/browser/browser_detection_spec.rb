
describe "Browser.opera?, Browser.msie?, Browser.safari?" do
  
  it "should detect the current browser" do
    (Browser.opera? || Browser.msie? || Browser.safari?).should == true
  end
end
