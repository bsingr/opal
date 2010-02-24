describe "Literal (A::X) constant resolution" do
  
  describe "with statically assigned constants" do
    
    it "searches the immediate class or module scope first" do
      ConstantSpecs::ClassA::CS_CONST10.should == :const10_10
      ConstantSpecs::ModuleA::CS_CONST10.should == :const10_1
    end
  end
end
