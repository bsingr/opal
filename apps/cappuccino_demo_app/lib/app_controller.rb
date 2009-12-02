# 
# app_controller.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2009 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

if 3
  "a"
else
  "b"
end

# so we can use the 'builder' methods.
include Vienna::Mappings

# Root object in vienna (for capp) is CPObject, so we can ommit the superclass
class AppController
  
  def something()
    a = [1,2, 3]
    a.each do |i|
      i == 2 ? next : puts(i)
    end
    return 4
  end
  
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
    
    d = `{
      name: "Adam Beynon",
      age: 23
    }`
    j = JSONObject.new(d)
    puts j.name 
  end
 
  def applicationDidFinishLaunching(notification)

    @window = window :title => "My Window", :style => [:bridge] do |win|
      # win << button(:title => "adam", :frame => [50,50,300,24]) do |b|
      #   b.on_action do
      #     puts "button clicked!"
      #   end
      # end
      win << button(:title => "adam", :frame => [50,50,300,24], :enabled => false, :on_action => Proc.new { puts "Button Clicked!" })
      win.orderFront self
    end
      



    # table = CPTableView.alloc.initWithFrame content_view.bounds
    # table.addTableColumn column :id => 'Person', :title => "People"
    # table.delegate = self
    # table.dataSource = self

    CPMenu.menuBarVisible = true
    puts "trying something"
    puts something
  end

  def numberOfRowsInTableView(table_view)
    5
  end

  def tableView(table_view, objectValueForTableColumn:table_column, row:row)
    "adam"
  end
end
