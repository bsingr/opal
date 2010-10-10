
describe "Element#empty?" do
  
  before(:all) do
    elem = Element.new :div, :id => "element_empty_spec"
  
    elem.html = [
      "<div id='element_empty_spec_1'></div>",
      "<div id='element_empty_spec_2'><p></p></div>",
      "<div id='element_empty_spec_3'>         </div>"
    ].join("")
    
    Document.body << elem
  end
  
  it "should correctly return if an element is empty or not of content" do
    Document[:element_empty_spec_1].empty?.should == true
    Document[:element_empty_spec_2].empty?.should == false
  end
  
  it "should ignore whitespace if there is no other content" do
    Document[:element_empty_spec_3].empty?.should == true
  end
  
  after :all do
    # puts "running in after all"
    Document[:element_empty_spec].remove
  end
end
