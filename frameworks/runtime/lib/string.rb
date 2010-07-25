# 
#  string.rb
#  vienna
#  
#  Created by Adam Beynon on 2010-06-30.
#  Copyright 2010 Adam Beynon. All rights reserved.
# 

class String
  
  def initialize(string="")
    `#{self}.__str__ = #{string};`
  end
  
  def index(string)
    `var res = #{self}.__str__.indexOf(#{string}.__str__);
    if (res != -1) {
      return vnN(res);
    }
    return #{nil};`
  end
  
  def slice(start, finish)
    `return vnS(#{self}.__str__.substr(#{start}.__num__, #{finish}.__num__));`
  end
  
  def == other
    `return (#{self}.__str__ === #{other}.__str__) ? #{true} : #{false};`
  end
  
  def upcase!
    `return #{self}.__str__ = #{self}.__str__.toUpperCase();`
  end
  
  def <<(string)
    `#{self}.__str__ += #{string.to_s}.__str__;`
    self
  end
  
  def to_s
    self
  end
  
  def length
    `return vnN(#{self}.__str__.length);`
  end
  
  def split(str)
    `var res = #{self}.__str__.split(#{str}.__str__);
    for (var i = 0; i < res.length; i++) {
      res[i] = vnS(res[i]);
    };
    return vnA.apply(res, res);`
  end
  
end
