class KVCPathTestA
  
  attr_accessor :part_b
  
end

class KVCPathTestB
  
  attr_accessor :part_c
  
end

class KVCPathTestC
  
  attr_accessor :first_name
  
end


describe "KeyValueCoding#value_for_key_path" do
  
  it "should call regular value_for_key when no dot-splitter detected" do
    a = KVCPathTestA.new
    b = KVCPathTestB.new
    a.part_b = b
    a.value_for_key_path('part_b').should == b
  end
  
  it "should split the path for paths which are dot seperated" do
    a = KVCPathTestA.new
    b = KVCPathTestB.new
    c = KVCPathTestC.new
        
    a.part_b = b
    b.part_c = c
    c.first_name = "adam"
    
    a.value_for_key_path('part_b.part_c').should == c
    a.value_for_key_path('part_b.part_c.first_name').should == "adam"
  end
  
  it "should eventually return nil if nil is encountered anywhere along path" do
    nil.value_for_key_path('a.b.c.d.e').should == nil
    
    c = KVCPathTestC.new
    c.first_name = nil
    c.value_for_key_path('first_name.second_name').should == nil
    
  end
end
