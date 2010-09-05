
describe "Attributes#set_path" do
  
  it "should call regular set_path when no dot used in path" do
    a = KVCPathTestA.new
    b = KVCPathTestB.new
    a.set_path 'part_b', b
    a.part_b.should == b
  end
  
  it "should split the path for dot seperated keys, using the last part to set the key" do
    a = KVCPathTestA.new
    b = KVCPathTestB.new
    c = KVCPathTestC.new
    
    a.set_path 'part_b', b
    a.set_path 'part_b.part_c', c
    a.set_path 'part_b.part_c.first_name', "adam"
    
    a.get_path('part_b').should == b
    a.get_path('part_b.part_c').should == c
    a.get_path('part_b.part_c.first_name').should == "adam"
  end
end
