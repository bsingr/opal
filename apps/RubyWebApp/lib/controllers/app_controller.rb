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

module RubyWebApp
  
  class AppController
    
    TABLE_VIEW_DATA = [
      { :name => 'Adam', :age => 23, :band => 'Led Zepplin' },
      { :name => 'Ben', :age => 20, :band => 'Pendulum' },
      { :name => 'Tom', :age => 30, :band => 'Tweenies' },
      { :name => 'Becky', :age => 12, :band => '50 pence' },
      { :name => 'Dad', :age => 24, :band => 'Take That' },
      { :name => 'Mum', :age => 25, :band => 'Rod Stewart' }
    ]
    
    def initialize
      # puts 'initialising app controller'
      @adam = 10
      @test_binding = false
    end
    
    def number_of_rows_in_table_view(table_view)
      TABLE_VIEW_DATA.length
    end
    
    def table_view(table_view, object_value_for_table_column:table_column, row:row)
      # TABLE_VIEW_DATA[row][table_column.identifier]
    end
    
    def adam?
      @adam
    end
    
    def test_binding
      @test_binding
    end
    
    def test_binding= aValue
      @test_binding = aValue
    end

    def will_finish_launching (notification)
      # puts 'Application will finish launching!'
    end

    def did_finish_launching (notification)
      # puts 'Application did finish launching!!'
      # JSON.get('http://search.twitter.com/trends.json?callback=vn_jsonp_callback_0', nil) do |json|
      #         puts json
      #         json[:trends].each do |trend|
      #           puts trend[:name]
      #         end
      #         # json is either an object with the result from the json feed, or, nil. nil is likely if an 
      #         # error occured
      #       end
    end
  end
end
