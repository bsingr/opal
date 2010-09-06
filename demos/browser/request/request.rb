
require 'browser'

Document.ready? do
  
  req = Request.new :url => 'good_request.txt'
  
  req.on :success do
    Document[:result].text = req.text
  end
  
  req.on :failure do
    Document[:result].text = "The request didn't go so well."
    puts req.status
    puts req.text
  end
  
  Document[:good_request].on :click do
    req.send
  end
  
  Document[:bad_request].on :click do
    req.send :url => 'bad_request.txt'
  end
end
