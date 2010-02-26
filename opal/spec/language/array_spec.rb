describe "Array literals" do
  
  it "[] should return a new array populated with the given elements" do
    array = [1, 'a', nil]
    array.should be_kind_of(Array)
    array[0].should == 1
    array[1].should == "a"
    array[2].should == nil
  end
  
  it "[] treats empty expressions as nil elements" do
    array = [0, (), 2, (), 4]
    array.should be_kind_of(Array)
    array[0].should == 0
    array[1].should == nil
    array[2].should == 2
    array[3].should == nil
    array[4].should == 4
  end
  
  it "[] accepts a literal hash without curly braces as its only parameter"
  
end

describe "Bareword array lieral" do
  
  it "%w() transforms unquoted barewords into an array"
  
  it "%W() transforms unquoted barewords into an array, supporting interpolation"
  
  it "%W() always treats interpolated expressions as a single word"
  
  it "treats consecutive whitespace characters the same as one"
  
  it "treats whitespace as literals characters when escaped by a backslash"
end


