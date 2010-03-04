describe "Redefining a method" do
  
  it "replaces the original method" do
    def barfoo; 100; end
    barfoo.should == 100
    
    def barfoo; 200; end
    barfoo.should == 200
  end
end

describe "An instance method definitioon with a splat" do
  it "accepts an unnamed '*' argument" do
    def foo(*); end;
    
    foo.should == nil
    foo(1, 2).should == nil
    # foo(1, 2, 3, 4, :a, :b, 'c', 'd').should == nil
  end
  
  it "accepts a named * argument" do
    def foo(*a); a; end;
    foo.should == []
    foo(1, 2).should == [1, 2]
    foo([:a]).should == [[:a]]
  end
  
  it "accepts non-* arguments before the * argument"
  
  it "allows only a single * argument"
  
  it "requires the presence of any arguments that precede the *"
  
end

describe "An instance method with a default argument" do
  it "evaluates the default when no arguments are passed" do
    def foo(a = 1)
      a
    end
    foo.should == 1
    foo(2).should == 2
  end
  
  it "evaluates the default empty expression when no arguments are passed" do
    def foo(a = ())
      a
    end
    foo.should == nil
    foo(2).should == 2
  end
  
  it "assigns an empty Array to an unused splat argument" do
    def foo(a = 1, *b)
      [a, b]
    end
    foo.should == [1, []]
    foo(2).should == [2, []]
  end
  
  it "evaluates the default when required arguments precede it"
  
  it "prefers to assign to a default argument before a splat argument"
  
  it "prefers to assign to a default argument when there are no required arguments" do
    def foo(a = 1, *args)
      [a, args]
    end
    foo(2, 2).should == [2, [2]]
  end
  
  # it "does not evaluate the default when passed a value and a * argument" do
  #   def foo(a, b = 2, *args)
  #     [a,b,args]
  #   end
  #   foo(2,3,3).should == [2,3,[3]]
  # end
end

describe "A singleton method definition" do
  it "can be declared for a local variable" do
    a = Object.new
    def a.foo
      5
    end
    a.foo.should == 5
  end
  
  it "can be declared for an instance variable" do
    @a = Object.new
    def @a.foo
      6
    end
    @a.foo.should == 6
  end
  
  it "can be declared for a global variable"
  
  it "can be declared for a class variable"
  
  it "can be declared with an empty method body" do
    class DefSpec
      def self.foo;end
    end
    DefSpec.foo.should == nil
  end
  
  it "can be redefined" do
    obj = Object.new
    def obj.==(other)
      1
    end
    (obj==1).should == 1
    def obj.==(other)
      2
    end
    (obj==2).should == 2
  end
end

describe "A method definition inside a metaclass scope" do
  it "can create a class method" do
    class DefSpecSingleton
      class << self
        def a_class_method;self;end
      end
    end
    
    DefSpecSingleton.a_class_method.should == DefSpecSingleton
  end
  
  it "can create a singleton method" do
    obj = Object.new
    class << obj
      def a_singleton_method;self;end
    end
    
    obj.a_singleton_method.should == obj
  end
end

describe "A nested method definition" do
  it "creates an instance method when evaluated in an instance method" do
    class DefSpecNested
      def create_instance_method
        def an_instance_method;self;end
        an_instance_method
      end
    end
    
    obj = DefSpecNested.new
    obj.create_instance_method.should == obj
    obj.an_instance_method.should == obj
    
    other = DefSpecNested.new
    other.an_instance_method.should == other
  end
end
