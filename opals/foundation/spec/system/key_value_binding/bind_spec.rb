
class KVBTesterA
  
  attr_accessor :first_name
  
end

class KVBTesterB
  
  attr_reader :my_name
  
  def initialize
    @my_name = "Jon Stewart"
  end
  
end

describe "KeyValueBinding#bind_to" do
  
  it "show allow bindings to be exposed" do
    KVBTesterA.expose_binding :foo_test
    KVBTesterA.expose_binding :bar_test
    
    KVBTesterA.new.respond_to?(:foo_test_binding=).should == true
    KVBTesterA.new.respond_to?(:bar_test_binding=).should == true
  end
  
  it "should propogate KVC compliant chnages to bound objects" do
    a = KVBTesterA.new
    b = KVBTesterB.new
    
    a.first_name = "Roger"
            
    b.bind :my_name, :to => a, :path => :first_name
    
    b.my_name.should == "Roger"
    
    a.first_name = "Adam Beynon"
  
    b.my_name.should == "Adam Beynon"
  end
  
end
