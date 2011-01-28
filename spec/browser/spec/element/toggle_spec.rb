
describe "Element#toggle" do
  
  before(:all) do
    elem = Element.new :div, :id => "element_toggle_spec"
  
    elem.html = [
      "<div id='testing_toggle_hidden' style='display: none;'></div>",
      "<div id='testing_toggle_visible'></div>"
    ].join("")
    
    Document.body << elem
  end
  
  it "should show elements that are currently hidden" do
    Document[:testing_toggle_hidden].toggle
    Document[:testing_toggle_hidden].visible?.should == true
    Document[:testing_toggle_hidden].hidden?.should == false
  end
  
  it "should hide elements that are currently visible" do
    Document[:testing_toggle_visible].toggle
    Document[:testing_toggle_visible].visible?.should == false
    Document[:testing_toggle_visible].hidden?.should == true
  end
  
  after :all do
    Document[:element_toggle_spec].remove
  end
  
end
