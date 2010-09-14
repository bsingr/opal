# 
# # require 'browser'
# 
# Document.ready? do
#   
#   # raise "100"
#   
#   req = Request.new :url => 'good_request.txt'
#   
#   req.on :success do
#     Document[:result].text = req.text
#   end
#   
#   req.on :failure do
#     Document[:result].text = "The request didn't go so well."
#     puts req.status
#     puts req.text
#   end
#   
#   Document[:good_request].on :click do
#     req.send
#   end
#   
#   Document[:bad_request].on :click do
#     req.send :url => 'bad_request.txt'
#   end
# end
# 
# def something(a, b)
#   raise a
# end
# 
# def something_a(a, b, c)
#   something "adam", [a, b, c]
# end
# 
# something_a 100, 200, 400
# 
# 

puts "way"

Document.ready? do
  a = Element.new :div
  a.class = "something"
  # `console.log(#{Document.body});`
  Document.body.append a
  a.text = "something amazinf"
  
  a.style(:background_color => 'blue')

  # a.style[:background_color] = 'blue'

  puts a.style
  a.style[:background_color] = 'red'
  puts a.style(:background_color)
  puts "aaa"
  puts a.css['background_color']
  
  b = Element.new :span, :id => "heyson", :class => "wow bob", :text => "meh"
  Document.body << b
end


