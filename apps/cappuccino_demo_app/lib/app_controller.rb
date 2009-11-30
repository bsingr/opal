# Ruby version of AppController.j
# Adam Beynon
# Vienna (VRuby).

# so we can use the 'builder' methods.
include Vienna::Builder

# Root object in vienna (for capp) is CPObject, so we can ommit the superclass
class AppController
  
  MY_NAME = "Adam Beynon"
  
  TABLE_DATA = [
    { :name => 'Adam Beynon', :age => 23 },
    { :name => 'Spongebob Squarepants', :age => 73 },
    { :name => 'John Smith', :age => 28 }
  ]
  
  attr_accessor :window
  
  def applicationWillFinishLaunching(notification)
    a = ["adam", "charles", "beynon"]
    puts "CPString block mapping:"
    # can use cappuccino methods as procs as well [CPString uppercaseString];
    puts a.map(&:uppercaseString)

    h = Hash.new
    # puts h.to_a
    TABLE_DATA.each do |i|
      i.each do |key,value|
        puts "I have #{key} for #{value}"
      end
    end
  end
  
  
  def _applicationDidFinishLaunching(notification)
    @window = window :style => :bridge do |win|
      win << (label :value => "Hello from #{MY_NAME}!")
      #  
      #  win << button :title => "My Button", :origin => [100,100] do |btn|
      #    btn.sizeToFit
      #    btn.on_action { puts "Buton was clicked!" }
      #  end
      #  
      #  win.orderFront self
    end
  end
  
  
  def applicationDidFinishLaunching(notification)

    @window = CPWindow.alloc.initWithContentRect(CGRectMakeZero(), styleMask:CPBorderlessBridgeWindowMask)
    content_view = @window.contentView
    
    name = CPTableColumn.alloc.initWithIdentifier "People"
    name.width = 145.0
    
    table = CPTableView.alloc.initWithFrame content_view.bounds
    table.addTableColumn name
    table.delegate = self
    table.dataSource = self
    content_view << table
  
    
    # label = CPTextField.alloc.initWithFrame CGRectMakeZero()
    #    label.stringValue = "Hello from #{MY_NAME}!"
    #    label.font = CPFont.boldSystemFontOfSize(22.0)
    #    label.sizeToFit
    #    
    #    btn = CPButton.alloc.initWithFrame CGRectMakeZero()
    #    btn.title = "My Button"
    #    btn.sizeToFit
    #    btn.frameOrigin = CPPoint.new(100, 100)
    #    
    #    content_view << label
    #    @window << btn
    #    
    #    btn.on_action do
    #      puts "Button was clicked."
    #    end
        
    # btn.on_action { puts "Clicked the button." }
    
    @window.orderFront self
  
    
    # Inline objective-c...
    `[CPMenu setMenuBarVisible:true];`
    
    # puts "window frame:"
    f = CPPoint.new(100,100)
    f.in_rect?(@window.frame)
    # puts nil.nil?
  end
  
  def numberOfRowsInTableView(table_view)
    # TABLE_DATA.length
    5
  end
  
  def tableView(table_view, objectValueForTableColumn:table_column, row:row)
    "adam"
    # TABLE_DATA[row][table_column.identifier.to_sym]
  end
end
