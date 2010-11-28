
describe "Element#clear" do
  
  before(:all) do
    elem = Element.new :div, :id => "element_clear_spec"
  
    elem.html = [
      "<div id='foo'></div>",
      "<div id='bar'></div>",
      "<div id='baz'></div>"
    ].join("")
    
    Document.body << elem
  end
  
  it "should remove all elements from the receiver and return self" do
    a = Document[:element_clear_spec]
    a.clear.should == a
    a.empty?.should == true
  end
  
  
  after(:all) do
    Document[:element_clear_spec].remove
  end
end
