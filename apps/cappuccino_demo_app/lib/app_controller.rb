# Ruby version of AppController.j
# Adam Beynon
# Vienna (VRuby).


# Root object in vienna (for capp) is CPObject, so we can ommit the superclass
class AppController
  
  # Constants like this are available in objj. They are just set on a class:
  # 
  #   var myName = AppController.MY_NAME;
  # 
  MY_NAME = "Adam"
  
  # Used for table data (fixture)
  TABLE_DATA = [
    { :name => 'Adam Beynon', :age => 23 },
    { :name => 'Spongebob Squarepants', :age => 73 },
    { :name => 'John Smith', :age => 28 }
  ]
  
  # Ruby will see the methods as:
  #   AppController#window
  #   AppController#window=()
  # 
  # Capp/JS sees the resulting methods as
  #   [AppController window]
  #   [AppController setWindow:aWindow]
  attr_accessor :window
  
  # Vienna compiler automatically 'rubifies' method names, so we can use the
  # underscore notation here. Vienna detects that it contains one parameter,
  # so this method actually has the selector 'applicationDidFinishLaunching:'
  def application_did_finish_launching(notification)
    # ivars, just like ruby. Again, method calls can use the rubified syntax,
    # which is automatically translated at compile time to the correct style.
    # Also, macruby style method calls.
    @window = CPWindow.alloc.init_with_content_rect(CGRectMakeZero(), style_mask:CPBorderlessBridgeWindowMask)
    
    content_view = @window.content_view
    
    label = CPTextField.alloc.init_with_frame CGRectMakeZero()
    
    # ruby style setters are automatically mapped to objj style set* methods. So,
    # this is actually the same as 'label.setStringValue("Hello from ruby!")'
    # Also, string construction to inject constant value into string
    label.string_value = "Hello from #{MY_NAME}!"
    
    label.font = CPFont.bold_system_font_of_size(22.0)
    label.size_to_fit
    
    # Ruby style method for adding subviews. This can also be called directly on
    # the window that just adds it to the window's content view.
    content_view << label
    
    @window.order_front self
    
    CPMenu.menu_bar_visible = true
    
    # Inline objective-c...
    @shared_application = `[CPApplication sharedApplication]`
    
    # puts calls CPLog for unification of methods.
    puts "App finished launching!!"
  end
  
  
  # Table delegate method:
  # 
  # - (int)numberOfRowsInTableView:(CPTableView)tableView
  # 
  def number_of_rows_in_table_view(table_view)
    # return explict length of our fixture array
    TABLE_DATA.length
  end
  
  # Objj style message definiton
  # 
  # - (id)tableView:(CPTableView)tableView objectValueForTableColumn:(CPTableColumn)tableColumn row:(int)row
  # 
  def table_view(table_view, object_value_for_table_column:table_column, row:row)
    # use row to get right record, then the ruby symbol version of the table's
    # identifier. Explicit return...
    TABLE_DATA[row][table_column.identifier.to_sym]
  end

end
