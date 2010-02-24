describe "Assignment via yield" do
  
  it "assigns objects to block variables" do
    def f; yield nil; end;      f { |a| a.should == nil }
    def f; yield 1; end;        f { |a| a.should == 1 }
    def f; yield []; end;       f { |a| a.should == [] }
    def f; yield [1]; end;      f { |a| a.should == [1] }
    def f; yield [nil]; end;    f { |a| a.should == [nil] }
  end
  
end
