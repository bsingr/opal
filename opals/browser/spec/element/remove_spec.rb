
describe "Element#remove" do
  
  before(:all) do
    elem = Element.new :div, :id => "element_remove_spec"
  
    elem.html = [
      "<div id='remove_spec_1'></div>",
      "<div id='remove_spec_2'></div>"
    ].join("")
    
    Document.body << elem
  end
  
  it "should remove the receiver from its parent, but not delete it" do
    e = Document[:element_remove_spec]
    Document[:remove_spec_1].remove
    Document[:remove_spec_2].remove
    e.empty?.should == true
  end
  
  after :all do
    Document[:element_remove_spec].remove
  end
end
