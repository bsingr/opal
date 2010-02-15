require 'capp_ruby'

include CappRuby

# AppController class is the CPApp delegate
class AppController
  
  def applicationWillFinishLaunching(notification)
    main_window
  end
  
  def applicationDidFinishLaunching(notification)

  end
  
  # return or build the main window
  def main_window
    @main_window ||= window :title => "Twitter Client",:style =>:bridge do |win|
      
      s = CPScrollView.alloc.initWithFrame CGRectMake(0,50,900,200)
      s.autoresizingMask = CPViewWidthSizable | CPViewHeightSizable
      
      t = CPTableView.alloc.initWithFrame CGRectMake(s.bounds)
      
      c1 = CPTableColumn.alloc.initWithIdentifier "TwitterUserName"
      c1.headerView.stringValue = "Twitter User Name"
      c1.width = 125
      t.addTableColumn c1
      
      c2 = CPTableColumn.alloc.initWithIdentifier "Tweet"
      c2.headerView.stringValue = "Tweet"
      c2.width = 725
      t.addTableColumn c2
      
      
      
      s << t
      win << s
    end
  end
  
end
