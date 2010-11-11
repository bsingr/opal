
describe "Block parameters" do
  it "does not override a shodowed variable from the outer scope" do
    i = 0
    a = [1, 2, 3]
    a.each { |i| ;}
    i.should == 0
  end
  
  it "captures variables from the outer scope" do
    a = [1, 2, 3]
    sum = 0
    vari = nil
    a.each { |vari| sum = sum + vari }
    sum.should == 6
    vari.should == nil
  end
end