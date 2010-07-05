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
  
  def == other
    `return #{self}.__str__ === #{other}.__str__;`
  end
  
  def upcase!
    `return #{self}.__str__ = #{self}.__str__.toUpperCase();`
  end
  
end

`console.log("===== String test");`
string_test = "hey there"
`console.log(#{string_test});`
