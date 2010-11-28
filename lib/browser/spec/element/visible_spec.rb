
describe "Element#visible?" do
  
  before(:all) do
    elem = Element.new :div, :id => "element_visible_spec"
  
    elem.html = [
      "<div id='testing_visible'></div>",
      "<div id='testing_not_visible' style='display: none;'></div>"
    ].join("")
    
    Document.body << elem
  end
  
  it "should correctly identify elements that are visible" do
    Document[:testing_visible].visible?.should == true
    Document[:testing_not_visible].visible?.should == false
  end
  
  after :all do
    Document[:element_visible_spec].remove
  end
end
