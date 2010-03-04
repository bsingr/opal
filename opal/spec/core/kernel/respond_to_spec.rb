module KernelSpecs
  class A
    def public_method; end    
  end
end

describe "Kernel.respond_to?" do
  it "indicates if a singleton object responds to a particular message"
end

describe "Kernel#respond_to?" do
  before(:each) do
   @a = KernelSpecs::A.new
  end
  
  it "returns false if the given method was undefined" do
    @a.respond_to?(:undefed_method).should == false
    @a.respond_to?('undefed_method').should == false
  end
  
  it "returns true if obj responds to the given public method" do
    @a.respond_to?("five").should == false
    @a.respond_to?(:public_method).should == true
    @a.respond_to?("public_method").should == true
  end
end
