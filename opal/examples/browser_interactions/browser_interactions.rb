


Document.ready? do
  puts Element.find(:adam2)
  
  puts Element.find('#adam2')

  Element.find(".first").each do |elem|
    puts elem
  end
  
  
  a = Element[:outer_div]
  puts a
  puts a[:inner_div1]
  
  
  
  Document[:adam].add_listener :click do |event|
    `console.log(#{event});`
    puts event
    puts self
  end
  
  # puts URI.parse("http://www.ruby-lang.org/")
  
  # req = Net::HTTP.new("http://www.google.com/")
  # req.start do |res|
  #   puts res
  # end
  
  puts Net::HTTP.get('www.example.com', '/index.html')
end
