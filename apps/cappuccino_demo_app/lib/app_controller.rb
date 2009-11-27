# Ruby version of AppController.j
# Adam Beynon
# Vienna (VRuby).

class CPWindow < CPResponder
  
  def <<(view)
    self.contentView << view
  end
end

class CPView < CPResponder
  
  def <<(view)
    addSubview view
  end
end

# Root object in vienna (for capp) is CPObject, so we can ommit the superclass
class AppController
  
  MY_NAME = "Adam Beynon"
  
  TABLE_DATA = [
    { :name => 'Adam Beynon', :age => 23 },
    { :name => 'Spongebob Squarepants', :age => 73 },
    { :name => 'John Smith', :age => 28 }
  ]
  
  attr_accessor :window
  
  def applicationDidFinishLaunching(notification)

    @window = CPWindow.alloc.initWithContentRect(CGRectMakeZero(), styleMask:CPBorderlessBridgeWindowMask)
    content_view = @window.contentView
    
    label = CPTextField.alloc.initWithFrame CGRectMakeZero()
    label.stringValue = "Hello from #{MY_NAME}!"
    label.font = CPFont.boldSystemFontOfSize(22.0)
    label.sizeToFit
    @window << label
    # content_view << label
    
    @window.orderFront self
    CPMenu.menuBarVisible = true
    
    # Inline objective-c...
    @shared_application = `[CPApplication sharedApplication]`

    # 'puts' calls CPLog for unification of methods.
    # puts "App finished launching!!"
  end
  
  def numberOfRowsInTableView(table_view)
    TABLE_DATA.length
  end
  
  def tableView(table_view, objectValueForTableColumn:table_column, row:row)
    TABLE_DATA[row][table_column.identifier.to_sym]
  end
end
