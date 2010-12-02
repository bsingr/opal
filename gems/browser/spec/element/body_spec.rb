describe "Element.body" do
  
  it "should return the body element of the document" do
    (`#{Browser::Element.body}.__element__ === document.body ? #{true} : #{false}`).should == true
  end
  
  it "should return the same Element instance on multiple calls" do
    Browser::Element.body.object_id.should == Browser::Element.body.object_id
    Browser::Element.body.should == Browser::Element.body
  end
end
