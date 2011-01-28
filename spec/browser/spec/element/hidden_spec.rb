
describe "Element#hidden?" do
  
  before(:all) do
    elem = Element.new :div, :id => "element_hidden_spec"
  
    elem.html = [
      "<div id='testing_hidden' style='display: none;'></div>",
      "<div id='testing_not_hidden'></div>"
    ].join("")
    
    Document.body << elem
  end
  
  it "should correctly identify elements that are hidden" do
    Document[:testing_hidden].hidden?.should == true
    Document[:testing_not_hidden].hidden?.should == false
  end
  
  after :all do
    Document[:element_hidden_spec].remove
  end
end
