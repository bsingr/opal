describe "The '&&' statement" do |adam|
  
  it "short-circuits evaluation at the first condition to be false" do
    puts "running FIRST && spec"
    raise "shit"
  end
  
  it "no error" do
    puts "second example"
  end
  
  it "no imp error"
end
