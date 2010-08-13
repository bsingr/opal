
class KVCTest
  
  def initialize
    @ivar_key_name = 300
  end
  
  def first_key
    100
  end
  
  def second_key?
    200
  end
  
end

describe "Attributes#get_attribute" do
  
  it "should call the getter method if one exists" do
    t = KVCTest.new
    t.get_attribute('first_key').should == 100
    t.get_attribute(:first_key).should == 100
  end
  
  it "should call a designated boolean getter method if defined" do
    t = KVCTest.new
    t.get_attribute('second_key').should == 200
    t.get_attribute(:second_key).should == 200
  end
  
  it "should access an instance variable with the key name" do
    t = KVCTest.new
    t.get_attribute('ivar_key_name').should == 300
    t.get_attribute(:ivar_key_name).should == 300
  end
  
  it "should raise an error when the given key name cannot be found" do
    t = KVCTest.new
    t.get_attribute('unknown_key').should_raise
  end
  
  it "should always return nil when value_for_key is called on nil" do
    nil.get_attribute('some_key_name_which_will_not_exist').should == nil
    nil.get_attribute(:nil_key).should == nil
  end
end

describe "Hash KeyValueCoding#value_for_key" do
  
  it "should use string keys to access Hash keys and return their value" do
    hash = { 'first_name' => 100, 'second_name' => 200 }
    hash.get_attribute('first_name').should == 100
    hash.get_attribute('second_name').should == 200
  end
  
  it "should return the Hash default for unknown keys" do
    hash = {}
    hash.get_attribute('some_unknown_key').should == nil
  end
  
  it "should not treat symbols as string names for accessing keys" do
    hash = { :first_name => 100, 'second_name' => 200 }
    hash.get_attribute(:first_name).should == nil
    hash.get_attribute('second_name').should == 200
    hash.get_attribute(:second_name).should == 200
  end
end

