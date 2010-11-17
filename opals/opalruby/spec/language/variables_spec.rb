describe "Single assignment" do
  it "Assignment does not modify the lhs, it reassigns its reference" do
    a = 'Foobar'
    b = a
    b = 'Bazquux'
    a.should == 'Foobar'
    b.should == 'Bazquux'
  end
  
  it "Assignment does not copy the object being assigned, just creates a new reference to it" do
    a = []
    b = a
    b << 1
    a.should == [1]
  end
  
  it "If rhs has multiple arguments, lhs becomes an Array of them" do
    a = 1, 2, 3
  end
end

describe "Operator assignment 'var op= expr'" do
  it "is equivalent to 'var = var op expr'" do
    x = 13
    (x += 5).should == 18
    x.should == 18
    
    x = 17
    (x -= 11).should == 6
    x.should == 6
    
    x = 2
    (x *= 5).should == 10
    x.should == 10
    
    # x = 36
    # (x /= 9).should == 4
    # x.should == 4
    
    # x = 23
    # (x %= 5).should == 3
    # x.should == 3
    # (x %= 3).should == 0
    # x.should == 0
    
    # x = 2
    # (x **= 3).should == 8
    # x.should == 8
    
    # x = 4
    # (x |= 3).should == 7
    # x.should == 7
    # (x |= 4).should == 7
    # x.should == 7
    
    # x = 6
    # (x &= 3).should == 2
    # x.should == 2
    # (x &= 4).should == 0
    # x.should == 0
    
    # x = 2
    # (x ^= 3).should == 1
    # x.should == 1
    # (x ^= 4).should == 5
    # x.should == 5
    
    # x = 17
    # (x <<= 3).should == 136
    # x.should == 136
    
    # x = 5
    # (x >>= 1).should == 2
    # x.should == 2

    x = nil
    (x ||= 17).should == 17
    x.should == 17
    (x ||= 2).should == 17
    x.should == 17

    # x = false
    # (x &&= true).should == false
    # x.should == false
    # (x &&= false).should == false
    # x.should == false
    # x = true
    # (x &&= true).should == true
    # x.should == true
    # (x &&= false).should == false
    # x.should == false
  end
end

describe "Operator assignment 'obj[idx] op= expr'" do
  it "is equivalent to 'obj[idx] = obj[idx] op expr'" do
    x = [2, 13, 7]
    (x[1] += 5).should == 18
    x.should == [2, 18, 7]
    
    x = [17, 6]
    (x[0] -= 11).should == 6
    x.should == [6, 6]
  end
end

