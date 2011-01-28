
describe "Element#next" do
  before(:all) do
    elem = Element.new :div, :id => :element_next_spec
    elem.html = [
      "<div id='next_spec_1'></div>",
      "<div id='next_spec_2'></div>",
      "<p id='next_spec_3'></p>",
      "<span id='next_spec_last'></span>"
    ].join("")
    Document.body << elem
  end
  
  it "should return the next element on the page" do
    Document[:next_spec_1].next.id.should == 'next_spec_2'
    Document[:next_spec_2].next.id.should == 'next_spec_3'
  end
  
  it "should filter the next element if selector given" do
    # Document[:next_spec_1].next('p').id.should == 'next_spec_3'
  end
  
  it "should return nil if the receiver has no matching next element" do
    Document[:next_spec_last].next.should == nil
    # Document[:next_spec_3].next('p').should == nil
  end
  
  after :all do
    Document[:element_next_spec].remove
  end
end
