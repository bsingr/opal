puts "test bin file"

# proc
proc do
  
end

# true and false should be native now

true
false

# nil should just be null
nil

# self should be this
self

# property access should be native
# self['first_name']

# property setting should be native
# self['something_else'] = 10


# ivar access should be native
@first_name

# ivar setting should be native
@second_name = "beynon"

puts "native + operator"
34 + 48


puts "native - operator"
34 - 12

puts "native * operator"
12 * 78

puts "native/ operator"
34 / 82

puts "native <, <=, >, >= operators"
10 < 100
23 <= 20
34 > 0929
292 >= 929292

puts "native == / === / != operator"
100 == 200
100 === 200
100 != 20

puts "Hash/Dictionary"
{
  'adam'  => 200,
  'ben'   => 300
}

puts "JSON object"
json = {
  x: 20,
  y: 100
}

puts "calling with hash"
# do_something 10, 20, 'thrity' => 30, 'forty' => 40

puts "calling with json"
# do_json 10, 20, thirty: 30, forty: 40


puts "truthiness"

if true
  puts "true is true"
end

if 100
  puts "100 is true"
end

unless false
  puts "false is false"
end

puts 100 if 10

puts 200 unless 0

if 10 == 10

elsif 200 == 200
  
else
  
end

puts "accessing actual properties"

# ::document::getElementsById 100
# 
# document::length
# 
# document::size = 100
# 
# ::document::title

# ::parseInt 2

def length
  self::length
end

def point_make(x, y)
  { x: x, y:y }
end

::console::log(point_make(100, 300))

a = point_make(300, 400)

puts "aref/aset"

puts a['x']
puts a::x
puts a[]
puts a::y


puts "! and not"

!!true

not true

# puts block_given?

[1, 2, 3, 4].each do |a|
  puts a
end

def initialize(type, options)
  `if (!#{options}) { #{options} = vnH()}`
  # puts "creating new element #{type}"
  `#{self}.__element__ = document.createElement(#{type.to_s});`
  @tag_name = type.to_s
  set options
end

def initialize(type, options)
  options = {} unless options
  
  self::__element__ = ::document::createElement(type)
  # `if (!#{options}) { #{options} = vnH()}`
  # puts "creating new element #{type}"
  # `#{self}.__element__ = document.createElement(#{type.to_s});`
  @tag_name = type.to_s
  set options
end
