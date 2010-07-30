
describe "KeyValueCoding#set_value_for_key_path" do
  
  it "should call regular set_value_for_key when no dot used in path" do
    a = KVCPathTestA.new
    b = KVCPathTestB.new
    a.set_value_for_key_path b, 'part_b'
    a.part_b.should == b
  end
  
  it "should split the path for dot seperated keys, using the last part to set the key" do
    a = KVCPathTestA.new
    b = KVCPathTestB.new
    c = KVCPathTestC.new
    
    a.set_value_for_key_path b, 'part_b'
    a.set_value_for_key_path c, 'part_b.part_c'
    a.set_value_for_key_path "adam", 'part_b.part_c.first_name'
    
    a.value_for_key_path('part_b').should == b
    a.value_for_key_path('part_b.part_c').should == c
    a.value_for_key_path('part_b.part_c.first_name').should == "adam"
  end
end
