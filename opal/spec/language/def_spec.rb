describe "Redefining a method" do
  
  it "replaces the original method" do
    def barfoo; 100; end
    barfoo.should == 100
    
    def barfoo; 200; end
    barfoo.should == 200
  end
end
