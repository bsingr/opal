describe "Range#to_s" do
  
  it "provides a printable form of self" do
    (0..21).to_s.should == "0..21"
    (-8..0).to_s.should == "-8..0"
    (-411..959).to_s.should == "-411..959"
    ('A'..'Z').to_s.should == "A..Z"
    ('A'...'Z').to_s.should == "A...Z"
    (0.5..2.4).to_s.should == "0.5..2.4"
  end
end
