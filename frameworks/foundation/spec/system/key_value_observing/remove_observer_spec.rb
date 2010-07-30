
describe "KeyValueObserving#remove_observer" do
  
  it "should be possible to remove a single observer for a key" do
    a = KVOTestSimple.new
    b = KVOTestSimple.new
    
    a.add_observer a, 'first_name', nil, nil
    a.add_observer b, 'first_name', nil, nil
    
    a.remove_observer a, 'first_name'
    
    a.set_value_for_key 'something', 'first_name'
    
    a.first_name.should == "setting_something"
    
    a.did_see_observation?.should == false
    b.did_see_observation?.should == true
  end
  
  
  it "should not post any notifications to any observer when all removed" do
    c = KVOTestSimple.new
    d = KVOTestSimple.new
    e = KVOTestSimple.new
    
    c.add_observer c, 'first_name', nil, nil
    c.add_observer d, 'first_name', nil, nil
    c.add_observer e, 'first_name', nil, nil
    
    c.remove_observer c, 'first_name'
    c.remove_observer d, 'first_name'
    c.remove_observer e, 'first_name'
    
    c.set_value_for_key 'something', 'first_name'
    c.first_name.should == "setting_something"
    
    c.did_see_observation?.should == false
    d.did_see_observation?.should == false
    e.did_see_observation?.should == false
  end
  
end
