
require 'browser'

Document.ready? do
  
  puts "testing events"
  Document.add_listener :click do |evt|
    puts "in listener"
    puts evt
  end
  
  puts "testing Request"
  req = Request.new
  puts req
  
  req.on :success do
    puts "handler success!"
  end
  
  req.on :failure do
    puts "handler failure!"
  end
  
  req.on :complete do
    puts "handler complete!"
  end
  
  req.send :url       => "javascripts/browser_demo.js"
  
end

