describe "The case statement" do
  
  it "evaluates the body of the when clause matching the case expression" do
    case 1
    when 2; false
    when 1; true
    end.should == true
  end
  
  it "evaluates the body of the when clause whose array expression matches the case expression" do
    case 1
    when 3, 4; false
    when 1, 2; true
    end.should == true
  end
  
  it "evaluates the body of the when clause in left to right order if it's an array exprssion" do
    @calls = []
    def foo; @calls << :foo; end
    def bar; @calls << :bar; end
    
    case true
    when foo, bar;
    end
    
    @calls.should == [:foo, :bar]
  end
  
  it "evaluates the body of the when clause whose range expression includes the case target expression" do
    case 5
    when 21..30; false
    when 1..20; true
    end.should == true
  end
end
