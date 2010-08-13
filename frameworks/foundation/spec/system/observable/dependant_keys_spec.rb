
class DependantKeysTest
  
  attr_reader :a, :b, :c
  
  keys_affecting :a => [:b, :c]
  
  def initialize
    @a = "a"
    @b = "b"
    @c = "c"
  end
  
  def a=(a)
    @a = a
  end
  
  def a
    "#{@a}_#{b}_#{c}"
  end
  
  def b=(b)
    @b = b
  end
  
  def c=(c)
    @c = c
  end
end

describe "KeyValueObserving#keys_affecting" do
  
  it "should notify observer when an affecting key is changed" do
    # puts "==================================================================="
    obj = DependantKeysTest.new
    
    capture_a = nil
    
    notification_count = 0
    
    notifications = []
    
    obj.observe :a do |changes|
      notifications << :a
      capture_a = obj.a
      notification_count = notification_count + 1
    end
    
    obj.observe :b do |changes|
      notifications << :b
    end
    
    obj.observe :c do |changes|
      notifications << :c
    end
    
    obj.a = "adam"
    capture_a.should == "adam_b_c"
    notification_count.should == 1
    notifications.should == [:a]
    
    notifications = []
    obj.b = "tom"
    capture_a.should == "adam_tom_c"
    notification_count.should == 2
    notifications.should == [:b, :a]
    
    notifications = []
    obj.c = "ben"
    capture_a.should == "adam_tom_ben"
    notification_count.should == 3
    notifications.should == [:c, :a]
  end
end