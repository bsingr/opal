describe "A block with mismatched arguments" do
  
  it "Should fill in unsupplied arguments with nil" do
    ret = nil
    BlockSpecs::Yield.new.two_args { |one, two, three| ret = [one, two, three] }
    ret.should == [1, 2, nil]
  end
end
