
describe "Document.ready?" do
  
  it "should return true once the document is ready" do
    Document.ready?.should == true
  end
  
  it "should execute blocks immediately when the document is ready" do
    result = []
    Document.ready? do
      result << :a
    end
    result << :b
    result.should == [:a, :b]
  end
end
