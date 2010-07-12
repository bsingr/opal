puts "==================== Starting testing"

puts "============= and testing"

puts "true && false - should be false"
puts true && false

puts "true && nil - should be nil"
puts true && nil

puts "true && nol && false - should be nil"
puts true && nil && false

puts "true && 10 && false - should be false"
puts true && 10 && false

puts "true && true - should be true"
puts true && true

puts "true && 'hello' - should be hello"
puts true && "hello"

puts "hello && 10 && 5 - should be 5"
puts "hello" && 10 && 5


puts "=============== or testing"

puts "true || true - should be true"
puts true || true

puts "true || false - should be true"
puts true || false

puts "true || nil - should be true"
puts true || nil
