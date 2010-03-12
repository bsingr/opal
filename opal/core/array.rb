class Array
  
  def to_a
    self
  end
  
  def length
    `return #{self}.length;`
  end
  
  alias_method :size, :length
  
  def each(&block)
    `for (var i = 0; i < #{self}.length; i++){`
      yield `#{self}[i]`
    `}`
    self
  end
  
  def include?(obj)
    `return #{self}.indexOf(#{obj}) != -1 ? true : false;`
  end
  
  def push(obj)
    `#{self}.push(#{obj});`
    self
  end
  
  alias_method :<<, :push
  
  def empty?
    `return #{self}.length == 0;`
  end
  
  def at(index)
    `if (#{index} >= 0) {
      if (#{index} > #{self}.length) return nil;
      return #{self}[#{index}];
    }
    else {
      if (#{index} < -#{self}.length) return nil;
      return #{self}[#{self}.length + #{index}];
    }`
  end
  
  def join(other)
    other = "" if other.nil?
    `return #{self}.join(#{other});`
  end
  
  def last(num)
    `if (#{self}.length == 0) {
      if (#{num} != undefined) {
        return [];
      }
      else {
        return nil;
      }
    }
    if (#{num} != undefined) {
      return #{self}.slice(#{self}.length - #{num}, #{self}.length);
    }
    return #{self}[#{self}.length - 1];`
  end
  
  def first
    `return #{self}[0];`
  end
  
  def collect(&block)
    `var i, res = [];
    for (i = 0; i < #{self}.length; i++) {
      res.push(vm_yield(#{block}, [#{self}[i]]));
    }
    return res;`
  end
  
  alias_method :map, :collect
  
  def [](index)
    `return #{self}[#{index}];`
  end
  
  def []=(index, value)
    `return #{self}[#{index}]=#{value};`
  end
  
  def unshift(value)
    `return #{self}.unshift(#{value});`
  end
  
  def ==(other)
    `if (#{self} === #{other}) return true;
    if (#{other}.klass !== rb_cArray) return false;
    if (#{self}.length !== #{other}.length) return false;
    for (var i = 0; i < #{self}.length; i++) {
      if (!rb_funcall(#{self}[i], "==", #{other}[i])) return false;
    }
    return true;`
  end
  
  def to_s
    `var res = [];
    for (var i = 0; i < #{self}.length; i++) {
      res.push(vm_send(#{self}[i], "to_s", [], nil, 0));
    }
    return res.join("");`
  end
  
  def inspect
    `var res = ["["]
    for (var i = 0; i < #{self}.length; i++) {
      if (i > 0) res.push(", ");
      res.push(vm_send(#{self}[i], "inspect", [], nil, 0));
    }
    res.push("]");
    return res.join("");`
  end
  
  def pop(num)
    `if (#{num} === undefined) {
      return #{self}.pop();
    }
    else if (#{self}.length == 0) {
      return [];
    }
    else {
      var r = #{self}.slice(#{self}.length - #{num}, #{self}.length);
      #{self}.splice(#{self}.length - #{num}, #{self}.length);
      return r;
    }`
  end
  
  def select(&block)
    `var res = [], v;
    for (var i = 0; i < #{self}.length; i++) {
      v = vm_yield(#{block}, [#{self}[i]]);
      if (RTEST(v)) res.push(#{self}[i]);
    }
    return res;`
  end
  
  def *(num)
    `if (#{num}.klass == rb_cString) {
      return #{self}.join(#{num});
    }
    else {
      var res = [];
      for (var i = 0; i < #{num}; i++) {
        for (var j = 0; j < #{self}.length; j++) {
          res.push(ary[j]);
        }
      }
      return res;
    }`
  end
end
