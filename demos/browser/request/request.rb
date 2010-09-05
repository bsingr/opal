
require 'browser'

puts "and in here"

Document.ready? do
  
  puts "this bit?"
  
  req = Request.new :url => 'good_request.txt'
  
  req.on :success do
    Document[:result].text = req.text
  end
  
  req.on :failure do
    Document[:result].text = "The request didn't go so well."
  end
  
  Document[:good_request].on :click do
    req.send
  end
  
  Document[:bad_request].on :click do
    req.send :url => 'bad_request.txt'
  end
end
