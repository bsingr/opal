
describe "Element#show" do
  
  before(:all) do
    elem = Element.new :div, :id => "element_show_spec"
  
    elem.html = [
      "<div id='testing_show_hidden' style='display: none;'></div>",
      "<div id='testing_show_visible'></div>"
    ].join("")
    
    Document.body << elem
  end
  
  it "should show elements on the page" do
    Document[:testing_show_hidden].show
    Document[:testing_show_hidden].visible?.should == true
    Document[:testing_show_hidden].hidden?.should == false
  end
  
  it "should leave already visible elements visible" do
    Document[:testing_show_visible].show
    Document[:testing_show_visible].visible?.should == true
    Document[:testing_show_visible].hidden?.should == false
  end
  
  after :all do
    Document[:element_show_spec].remove
  end
  
end
