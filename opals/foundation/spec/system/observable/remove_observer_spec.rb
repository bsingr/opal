
describe "Observable#remove_observer" do
  
  it "should be possible to remove a single observer for a key" do
    a = KVOTestSimple.new
    b = KVOTestSimple.new
    
    a_saw_observer = false
    
    first_observer = a.observe(:first_name) do |info|
      a_saw_observer = true
    end
    
    second_a_saw_observer = false
    
    a.observe(:first_name) do |info|
      second_a_saw_observer = true
    end
    
    a.remove_observer first_observer, :first_name
    a.set_attribute :first_name, "something"
    a.first_name.should == "setting_something"
    
    a_saw_observer.should == false
    second_a_saw_observer.should == true
    
  end
  
  
  it "should not post any notifications to any observer when all removed" do
    c = KVOTestSimple.new
    
    d_saw = e_saw = f_saw = false
    
    d = c.observe :first_name do |info|
      d_saw = true
    end
    
    e = c.observe :first_name do |info|
      e_saw = true
    end
    
    f = c.observe :first_name do |info|
      f_saw = true
    end
    
    c.remove_observer d, :first_name
    c.remove_observer e, :first_name
    c.remove_observer f, :first_name
    
    c.set_attribute :first_name, "something"
    c.first_name.should == "setting_something"
    
    d_saw.should == false
    e_saw.should == false
    f_saw.should == false

  end
  
end
