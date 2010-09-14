
describe "Element#has_class?" do
  
  before :all do
    elem = Element.new :div, :id => "element_has_class_spec"
  
    elem.html = [
      "<div id='element_has_class_spec_1' class='foo'></div>",
      "<div id='element_has_class_spec_2' class='foo bar'></div>",
      "<div id='element_has_class_spec_3'></div>"
    ].join("")
    
    Document.body << elem
  end
  
  it "should return true if the element has the given class" do
    Document[:element_has_class_spec_1].has_class?('foo').should == true
    Document[:element_has_class_spec_1].has_class?('baz').should == false
  end
  
  it "should return true if the class is one of many the element has" do
    Document[:element_has_class_spec_2].has_class?('foo').should == true
    Document[:element_has_class_spec_2].has_class?('bar').should == true
    Document[:element_has_class_spec_2].has_class?('baz').should == false
  end
  
  it "should return false if the element has no class" do
    Document[:element_has_class_spec_3].has_class?('foo').should == false
  end
  
  it "should not count a partial class name as a matching name" do
    Document[:element_has_class_spec_1].has_class?('fo').should == false
    Document[:element_has_class_spec_1].has_class?('oo').should == false
  end
  
  after :all do
    # puts "running in after all"
    Document[:element_has_class_spec].remove
  end
end
