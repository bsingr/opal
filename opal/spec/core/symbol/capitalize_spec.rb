describe "Symbol#capitalize" do
  
  it "returns a Symbol" do
    :glark.capitalize.should be_an_instance_of(Symbol)
  end
  
  it "converts the first character to uppercase if it is ASCII" do
    :lower.capitalize.should == :Lower
  end
  
  it "leaves the first character alone if it is not an alphabetical ASCII character"
  
  it "converts subsequent uppercase ASCII characters to their lowercase equivalents" do
    :lOWER.capitalize.should == :Lower
  end
  
  it "leaves ASCII characters already in the correct case as they were" do
    :Title.capitalize.should == :Title
  end
  
  it "works with both upper- and lowercase ASCII characters in the same Symbol" do
    :mIxEd.capitalize.should == :Mixed
  end
  
  it "leaves uppercase Unicode characters as they were"

  it "leaves lowercase Unicode characters as they were"

  it "leaves non-alphabetic ASCII characters as they were"
end
