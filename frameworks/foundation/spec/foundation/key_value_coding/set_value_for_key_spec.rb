
class KVCSettingTest
  
  def initialize
    @ivar_key = 200
    @ivar_key_array = []
  end
  
  def will_change_value_for_key(key)
    @ivar_key_array << :will
    @ivar_key_array << key
  end
  
  def did_change_value_for_key(key)
    @ivar_key_array << :did
    @ivar_key_array << key
  end
  
  def ivar_key_array
    @ivar_key_array
  end
  
  def ivar_key
    @ivar_key
  end  
end

class KVCSettingTest2
  
  def first_name=(first_name)
    @first_name = "set_kvc_style_#{first_name}"
  end
  
  def first_name
    @first_name
  end
end

describe "KeyValueCoding#set_value_for_key" do
  
  it "should call KVO observer methods when setting an ivar" do
    a = KVCSettingTest.new
    a.set_value_for_key 100, 'ivar_key'
    a.ivar_key_array.should == [:will, 'ivar_key', :did, 'ivar_key']
    a.ivar_key.should == 100
  end
  
  it "should use the designated setter when available" do
    a = KVCSettingTest2.new
    a.set_value_for_key "adam", 'first_name'
    a.first_name.should == "set_kvc_style_adam"
  end
  
  it "should raise an error when trying to set an unknown key" do
    a = KVCSettingTest2.new
    a.set_value_for_key 200, 'some_random_key_name'
  end
end
