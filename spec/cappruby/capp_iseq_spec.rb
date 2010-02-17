require 'spec_helper'

include Vienna::CappRuby

describe Vienna::CappRuby::RubyBuilder::CappIseq do

  before(:each) do
    @top = RubyBuilder::CappIseq.new(RubyBuilder::ISEQ_TYPE_TOP)
  end    
  
  it "should loop local names back to _aa after _z" do
    24.times { |i| @top.push_local_name(i.to_s) }
    @top.push_local_name("buz").should == "_z"
    @top.push_local_name("biz").should == "_aa"
  end
  
  it "should not allow duplicate local names" do
    # @top.push_local_name("adam").should == @top.push_local_name("ben")
  end
  
  context "creating a new iseq_type_top iseq" do
    
    it "should start counting locals from 'a' (_a)" do
      @top.local_current.should == "a"
    end
    
    it "should assign top self to local variable _a" do
      @top.to_s.should == "var _a = cappruby_top_self;"
    end
    
    it "should simply return nil when no statements are given" do
      # @top.to_s.should =~ /.*return nil;$/
      # this maybe should not be the case for "top"
    end
    
    it "should initially return nil for looking up any local" do
      @top.lookup_local("a").should == nil
      @top.lookup_local("").should == nil
      @top.lookup_local(nil).should == nil
      @top.lookup_local(" ").should == nil
      @top.lookup_local("_").should == nil
      @top.lookup_local("_a").should == nil
    end      
    
    it "should return _b for the first local lookup" do
      @top.push_local_name("foo").should == "_b"
    end                                        
    
    it "should return _c for second argument local" do
      @top.push_local_name("foo")
      @top.push_local_name("bar").should == "_c"
    end                                                                         
  end
  
  context "iseq_type_block" do
    
    before(:each) do
      @block = RubyBuilder::CappIseq.new(RubyBuilder::ISEQ_TYPE_BLOCK)
    end
    
    it "should start local names couting from parent" do
      @top.push_local_name("wow")
      @block.parent_iseq = @top
      @block.push_local_name("john").should == "_c"
      @block.push_local_name("adam").should == "_d"
    end
    
    it "should return local name counting back to parent when finialized" do
      # _a is self for top iseq.
      @top.push_local_name("george").should == "_b"
      @block.parent_iseq = @top
      @block.push_local_name("first").should == "_c"
      @block.finalize
      @top.push_local_name("something").should == "_d"
    end
    
    it "should not allow parent to reuse a local name (minimized)" do
      current = @top.local_current
      @block.parent_iseq = @top
      @block.push_local_name("adam")
      @block.finalize
      @top.push_local_name("ben").should_not == current
    end
    
  end
  
end
