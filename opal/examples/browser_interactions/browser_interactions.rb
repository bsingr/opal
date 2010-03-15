


Document.ready? do
  puts Element.find(:adam2)
  
  puts Element.find('#adam2')

  Element.find(".first").each do |elem|
    puts elem
  end
  
  
  a = Element[:outer_div]
  puts a
  puts a[:inner_div1]
end