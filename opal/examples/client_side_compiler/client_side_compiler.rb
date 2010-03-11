text = "Some text goes here!"
sym = :a_symbol
num = 123456
array = [1, 2, 3]

# Simple block
array.each do |i|
  puts i
end

array2 = array.map do |j|
  j + 5
end

puts array2   # => [6, 7, 8]

# class ClassA
#   
#   attr_accessor :first_name, :second_name
#   
#   def initialize(first_name, second_name)
#     
#   end
#   
#   def full_name
#     # @first_name + @second_name
#   end
#   
# end
# 
# class Class B
#   
# end
