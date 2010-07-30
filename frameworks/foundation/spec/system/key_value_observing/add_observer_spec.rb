class KVOTestSimple
  
  attr_reader :first_name
  
  attr_accessor :second_name
  
  attr_reader :new_value, :old_value, :kvo_object
  
  def initialize
    @did_see_observation = false
    @some_ivar_we_can_set = nil
  end
  
  def did_see_observation?
    @did_see_observation
  end
  
  def first_name=(first_name)
    @first_name = "setting_#{first_name}"
  end
  
  def observe_value(path, object, changes, context)
    @did_see_observation = true
    @old_value = changes[:old]
    @new_value = changes[:new]
    @kvo_object = object
  end
  
end

describe "KeyValueObserving#add_observer" do
  
  it "should allow a simple observer to be added" do
    a = KVOTestSimple.new
    
    a.add_observer a, 'first_name', nil, nil
    a.set_value_for_key 'adam', 'first_name'
    # KVOTestSimple#observe_value will be called here
    a.first_name.should == "setting_adam"
    a.did_see_observation?.should == true
    
    a.new_value.should == "setting_adam"
    a.old_value.should == nil
    a.kvo_object.should == a
  end
  
  
  it "should only observe and post notifications for observed keys" do
    b = KVOTestSimple.new
    b.add_observer b, 'first_name', nil, nil
    b.set_value_for_key 'adam', 'second_name'   
    b.second_name.should == 'adam'
    b.did_see_observation?.should == false
  end
  
  
  it "should allow multiple observers for a single key" do
    c = KVOTestSimple.new
    d = KVOTestSimple.new
    
    c.add_observer c, 'first_name', nil, nil
    c.add_observer d, 'first_name', nil, nil
    c.set_value_for_key 'some_name', 'first_name'
    
    c.first_name.should == 'setting_some_name'
    
    c.did_see_observation?.should == true
    c.value_for_key('did_see_observation').should == true
  end
  
  
  it "should be possible to observe instance variables" do
    e = KVOTestSimple.new
    
    e.add_observer e, 'some_ivar_we_can_set', nil, nil
    e.set_value_for_key 200, 'some_ivar_we_can_set'
    
    e.value_for_key('some_ivar_we_can_set').should == 200
    e.did_see_observation?.should == true
    
    e.new_value.should == 200
    e.old_value.should == nil
  end
end
