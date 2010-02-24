ClassSpecsNumber = 12

module ClassSpecs
  Number = 12
end

describe "A class definition" do
  
  it "creates a new class" do
    ClassSpecs::A.class.should == Class
    ClassSpecs::A.new.class.should == ClassSpecs::A
  end
  
  it "has no class variables" do
    ClassSpecs::A.class_variables.should == []
  end
  
  it "false" do
    3.should eql(34)
  end
end
