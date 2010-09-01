
describe "self in an eigenclass body (class << obj)" do
  it "is TrueClass for true" do
    class << true; self; end.should == TrueClass
  end
  
  it "is FalseClass for false" do
    class << false; self; end.should == FalseClass
  end
  
  it "is NilClass for nil" do
    class << nil; self; end.should == NilClass
  end
  
  it "is a singleton Class instance" do
    mock = Object.new
    cls = class << mock; self; end
    cls.is_a?(Class).should == true
    puts cls
    `console.log(#{cls});`
  end
end

class Object
  
  class << self
    
    def shit_son; end
  end
  
end
