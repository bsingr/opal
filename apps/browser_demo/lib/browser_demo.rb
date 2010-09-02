
require 'browser'

puts "browser demo, eeek!"

puts "is doc ready? #{Document.ready?}"


Document.ready? do
  puts "doc is ready!"
  puts "is Document ready/? #{Document.ready?}"
  
  Document.ready? do
    puts "doing first"
  end
  
  puts "doing second"
end


