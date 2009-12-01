# # Ruby version of AppController.j
# # Adam Beynon
# # Vienna (VRuby).
# 
# # so we can use the 'builder' methods.
include Vienna::Mappings

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
    # can use cappuccino methods as procs as well [CPString uppercaseString];
    a.map(&:uppercaseString)
  end
 
  def applicationDidFinishLaunching(notification)

    @window = CPWindow.alloc.initWithContentRect(CGRectMakeZero(), styleMask:CPBorderlessBridgeWindowMask)
    content_view = @window.contentView

    table = CPTableView.alloc.initWithFrame content_view.bounds
    table.addTableColumn column :id => 'Person', :title => "People"
    table.delegate = self
    table.dataSource = self
    content_view << table
        
    @window << button(:title => "adam", :frame => [50,50,300,24]) do |b|
      b.on_action do
        puts "button clicked!"
      end
    end
    
    @window.orderFront self

    # Inline objective-c...
    `[CPMenu setMenuBarVisible:true];`
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
