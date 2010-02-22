require 'spec_helper'

include Vienna::CherryKit

describe Vienna::CherryKit::RubyBuilder::Iseq do
  
  before(:each) do
    @top = RubyBuilder::Iseq.new(RubyBuilder::ISEQ_TYPE_TOP)
  end
  
  it "should not allow duplicate local names"
  
  it "should not allow duplicate argument names" # should raise error if happens
  
  it "should start local naming from '_a'" do
    @top.push_arg_name("adam").should == "_a"
  end
  
  it "should increment local names from _a through lowercase alphabet" do
    @top.push_arg_name("foo").should == "_a"
    @top.push_arg_name("bar").should == "_b"
    @top.push_arg_name("buz").should == "_c"
  end
  
  it "should loop local names back to _aa after _z" do
    25.times { |i| @top.push_arg_name("___#{i}")  }
    @top.push_arg_name("foo").should == "_z"
    @top.push_arg_name("bar").should == "_aa"
    @top.push_arg_name("buz").should == "_ab"
  end
  
  describe "adam" do
    it "wayy" do
      puts @top
    end
  end
  
end
