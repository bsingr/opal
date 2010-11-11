
describe "Redefining a method" do
  
  it "replaces the original method" do
    def barFoo; 100; end
    barFoo.should == 100
    
    def barFoo; 200; end
    barFoo.should == 200
  end
end