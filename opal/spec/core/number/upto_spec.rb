describe "Number#upto" do
  it "does not yield when stop is less than self" do
    result = []
    5.upto(4) { |x| result << x }
    result.should == []
  end
  
  it "yields once when stop equals self" do
    result = []
    5.upto(5) { |x| result << x }
    result.should == [5]
  end
  
  it "yields while increasing self until it is less than stop" do
    result = []
    2.upto(5) { |x| result << x }
    result.should == [2, 3, 4, 5]
  end
  
  it "yields while increasing self until it is greater than floor of a Float endpoint" do
    result = []
    9.upto(13.3) { |i| result << i }
    # FIXME: this reads to parser as -(5.upto(-1.3) {...}) :(
    # -5.upto(-1.3) { |i| result << i }
    # result.should == [9, 10, 11, 12, 13, -5, -4, -3, -2]
  end
end
