
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
  
  it "should propogate KVC compliant chnages to bound objects" do
    a = KVBTesterA.new
    b = KVBTesterB.new
    
    a.first_name = "Roger"
    
    b.bind 'my_name', a, 'first_name', nil
    
    b.my_name.should == "Roger"
    
    a.first_name = "Adam Beynon"
  
    b.my_name.should == "Adam Beynon"
  end
  
end
