
describe "Element#hide" do
  
  before(:all) do
    elem = Element.new :div, :id => "element_hide_spec"
  
    elem.html = [
      "<div id='testing_hide_hidden' style='display: none;'></div>",
      "<div id='testing_hide_visible'></div>"
    ].join("")
    
    Document.body << elem
  end
  
  it "should hide elements on the page" do
    Document[:testing_hide_visible].hide
    Document[:testing_hide_visible].visible?.should == false
    Document[:testing_hide_visible].hidden?.should == true
  end
  
  it "should leave already hidden elements hidden" do
    Document[:testing_hide_hidden].hide
    Document[:testing_hide_hidden].visible?.should == false
    Document[:testing_hide_hidden].hidden?.should == true
  end
  
  after :all do
    Document[:element_hide_spec].remove
  end
  
end
