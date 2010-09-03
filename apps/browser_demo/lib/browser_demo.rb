
require 'browser'

# puts "browser demo, eeek!"

# puts "is doc ready? #{Document.ready?}"


Document.ready? do
  puts "doc is now ready"
  puts Document
  
  # puts "wow element is:"
  puts Document['#wow']
  # puts Document[:wow].on :click do |event|
  #   
  # end
  puts Document['.typess']
  puts Document['div']
  
  # puts "wow.."
  wow = Document[:wow]
  
  puts "does wow have class names..."
  testers = [
    'typess',
    :typess,
    'types'
  ]
  
  testers.each do |test|
    puts "does 'wow' have #{test.inspect}?"
    puts wow.has_class? test
  end
  
  
  puts "ytesting add class"
  wow.add_class 'shsit'
  wow.add_class 'types'
  wow.add_class 'typess'
  
  puts "testing remove class"
  wow.remove_class 'benny'
  wow.remove_class :shsit
  wow.remove_class 'types'
  
  puts "testing toggle_clas"
  wow.toggle_class 'adam'
  wow.toggle_class 'beynon'
  wow.toggle_class 'adam'
  
  
  puts "testing window.."
  puts Window
  
  puts "document:"
  puts Window.document
  
  puts "window:"
  puts Window.window
  
  puts "testing Element#new etc"
  a = Element.new :div
  
  wow << a
end


