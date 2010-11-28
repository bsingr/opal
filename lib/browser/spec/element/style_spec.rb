
describe "Element#style" do
  
  before(:all) do
    elem = Element.new :div, :id => "element_style_spec"
  
    elem.html = [
      "<div id='testing_string' style='display: none;'></div>",
      "<div id='testing_string2' style='background: red;'></div>",
      "<div id='testing_string3' style='background-color: blue;'></div>"
    ].join("")
    
    Document.body << elem
  end
  
  it "should return a CSS property when given a string" do
    Document[:testing_string].style('display').should == "none"
    Document[:testing_string2].style('background').should == "red"
  end
  
  it "should accept and convert snakecase names to camelcase" do
    Document[:testing_string3].style('background_color').should == "blue"
  end
  
  it "should accept and convert hyphencase names to camelcase" do
    Document[:testing_string3].style('background-color').should == "blue"
  end
  
  it "should just use camelcase names as they are" do
    Document[:testing_string3].style('backgroundColor').should == "blue"
  end
  
  it "should return an empty string for non-existant style names" do
    Document[:testing_string3].style('some-stupid-name-qwery').should == ""
  end
  
  it "should allow symbols to be used instead of strings" do
    Document[:testing_string3].style(:background_color).should == "blue"
  end
  
  it "sets each hash property in turn on the element" do
    Document[:testing_string].style :display => ''
    Document[:testing_string].style('display').should == ''
    Document[:testing_string].visible?.should == true
  end
  
  it "returns a StyleDeclaration instance for the element when no params" do
    s = Document[:testing_string].style
    s.class.should == Element::StyleDeclaration
  end
  
  it "StyleDeclaration#[] performs in the same way as #style when string" do
    Document[:testing_string3].style['backgroundColor'].should == "blue"
    Document[:testing_string3].style['background_color'].should == "blue"
    Document[:testing_string3].style[:background_color].should == "blue"
  end
  
  it "StyleDeclaration#[]= should perform in the same way as #style hash" do
    Document[:testing_string3].style[:display] = "none"
    Document[:testing_string3].visible?.should == false
    Document[:testing_string3].style[:display] = ""
    Document[:testing_string3].visible?.should == true
  end
  
  after :all do
    Document[:element_style_spec].remove
  end
  
end
