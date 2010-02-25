describe "A Symbol literal" do
  
  it "is a ':' followed by any number of valid characters" do
    a = :foo
    a.should be_kind_of(Symbol)
    a.inspect.should == ':foo'
  end
  
  it "is a ':' followed by any valid variable, method, or constant name" do
    [ :Foo,
      :foo,
      :@foo,
      :@@foo,
      # :$foo, This one current fails to parse
      :_,
      :~,
      :-,
      :FOO,
      :_Foo,
      :&,
      :_9
    ].each { |s| s.should be_kind_of(Symbol) }
  end
  
  it "is a  ':' followed by a single or double-quoted string that may contain otherwise invalid characters"
  
  it "may contain '::' in the string"
  
  it "is converted to a literal, unquoted representation if the symbol contains only valid characters"
  
  it "can be created by the %s-delimited expression"
  
  it "is the same object when created from identical strings"
  
  it "does not contain null in the string"
end
