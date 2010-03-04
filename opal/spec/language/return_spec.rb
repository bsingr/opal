describe "The return keyword" do
  it "returns any object directly" do
    def r; return 1; end
    r().should == 1
  end
  
  it "returns an single element array directly" do
    def r; return [1]; end
    r().should == [1]
  end
  
  it "returns an multi element array directly" do
    def r; return [1, 2]; end
    r().should == [1, 2]
  end
  
  it "returns nil by default" do
    def r; return; end
    r().should be_nil
    # r().should == nil
  end
  
  describe "within a block" do
    before(:each) do
    
    end
    
    it "raises a LocalJumpError if there is no lexically enclosing method"
  end
end
