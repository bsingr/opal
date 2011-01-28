
describe "Element#attr" do
  
  it "should" do
    
  end
  before(:all) do
  #   elem = Element.new :div, :id => :element_attr_spec
  #   elem.html = [
  #     "<div id='attr_spec_1' value='foo' class='jacob' title='john'></div>",
  #     "<input id='attr_spec_2' type='text' rel='hurley'>",
  #     "<input id='attr_spec_3' type='checkbox' title='jack'>",
  #     "<input id='attr_spec_4' type='radio' name='sawyer'>"
  #   ].join('')
  #   Document.body << elem
  end
  # 
  # it "should return the attribute value when given a string/symbol" do
  #   Document[:attr_spec_1].attr('value').should == 'foo'
  #   Document[:attr_spec_2].attr('type').should == 'text'
  #   Document[:attr_spec_3].attr('type').should == 'checkbox'
  #   Document[:attr_spec_4].attr('type').should == 'radio'
  #   
  #   Document[:attr_spec_1].attr('class').should == 'jacob'
  #   Document[:attr_spec_2].attr('rel').should == 'hurley'
  #   Document[:attr_spec_3].attr('title').should == 'jack'
  #   Document[:attr_spec_4].attr('name').should == 'sawyer'
  # end
  # 
  # it "should return nil for a non existant attribute" do
  #   Document[:attr_spec_1].attr('name').should == nil
  #   Document[:attr_spec_1].attr(:name).should == nil
  #   
  #   Document[:attr_spec_1].attr(:title).should == 'john'
  #   Document[:attr_spec_1].title = ''
  #   Document[:attr_spec_1].attr(:title).should == nil
  #   
  #   Document[:attr_spec_1].title = nil
  #   Document[:attr_spec_1].attr(:title).should == nil
  # end
  # 
  # it "should set each property in turn when given a hash" do
  #   elem = Document[:attr_spec_4]
  #   elem.attr :foo => 'adam', :bar => 'charles', :baz => 'beynon'
  #   elem.attr('foo').should == 'adam'
  #   elem.attr(:bar).should == 'charles'
  #   elem.attr('baz').should == 'beynon'
  # end
  # 
  # it "should return the receiver when given a hash of attributes" do
  #   elem = Document[:attr_spec_4]
  #   elem.attr(:foo => 'a', :bar => 'b').should == elem
  # end
  # 
  # it "should return an instance of AttributeAccessor when given no args" do
  #   Document[:attr_spec_1].attr.class.should == Element::AttributeAccessor
  # end
  # 
  # it "AttributeAccessor#[] should act like giving #attr a string/symbol" do
  #   Document[:attr_spec_1].attr[:value].should == 'foo'
  #   Document[:attr_spec_1].attr[:class].should == 'jacob'
  #   Document[:attr_spec_1].attr['value'].should == 'foo'
  #   Document[:attr_spec_1].attr['class'].should == 'jacob'
  # end
  # 
  # it "AttributeAccessor#[]= should act like giving #attr a key/value pair but should return the set value" do
  #   Document[:attr_spec_1].attr[:value] = 'stephen'
  #   Document[:attr_spec_1].attr('value').should == 'stephen'
  #   Document[:attr_spec_1].attr['class'] = 'jon'
  #   Document[:attr_spec_1].attr(:class).should == 'jon'
  # end
  # 
  # after :all do
  #   Document[:element_attr_spec].remove
  # end
end
