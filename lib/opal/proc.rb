class Proc
  
  def to_proc
    self
  end
  
  def ==(other)
    `return (#{self} == #{other} ? #{true} : #{false});`
  end
  
  def call(*args)
    `if (#{self}.__lambda__) {
      try {
        return #{self}.apply(#{self}.__self__, #{args});
      }
      catch (e) {
        // first try and catch a break (from the lambda proc)
        if (e.__keyword__ == 'break') {
          //console.log("break!");
          return e.opal_value;
        }
        
        // look for next statements
        if (e.__keyword__ == 'next') {
          return e.opal_value;
        }
        
        // next try and catch return error statement (simply return it)
        if (e.__keyword__ == 'return') {
          return e.opal_value;
        }
        
        // redo - simply recall block?
        if (e.__keyword__ == 'redo') {
          return arguments.callee.apply(#{self});
        }
        
        // worst case, rethrow error
        throw e;
      }
    }
    else {
      //throw "cannot .call for non lambda block.. yet"
      return #{self}.apply(#{self}.__self__, #{args});
    }`
  end
  
  def to_s
    `return "#<" + #{self}.class_name + ":" + #{self}.id + ">";`
  end
  
  def inspect
    to_s
  end
end
