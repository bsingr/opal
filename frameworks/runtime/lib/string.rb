# 
#  string.rb
#  vienna
#  
#  Created by Adam Beynon on 2010-06-30.
#  Copyright 2010 Adam Beynon. All rights reserved.
# 

class String
  
  # def initialize(string="")
    # `#{self} = #{string};`
  # end
  
  def index(string)
    `var res = #{self}.indexOf(#{string});
    if (res != -1) {
      return res;
    }
    return #{nil};`
  end
  
  def slice(start, finish)
    `return #{self}.substr(#{start}, #{finish});`
  end
  
  def == other
    `return (#{self} == #{other}) ? #{true} : #{false};`
  end
  
  def +(other)
    `return #{self} + #{other};`
  end
  
  def upcase!
    `return #{self} = #{self}.toUpperCase();`
  end
  
  def <<(string)
    `#{self} += #{string.to_s};`
    self
  end
  
  def to_s
    self
  end
  
  def length
    `return #{self}.length;`
  end
  
  def split(str)
    `return #{self}.split(#{str});`
  end
  
end
