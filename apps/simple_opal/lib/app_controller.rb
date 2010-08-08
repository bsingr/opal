# 
# application.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
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

include CherryKit

class AppController
  
  def initialize
    puts "Aright, in AppController.initialize"
  end
  
  def application_will_finish_launching
    puts "my window is:"
    # puts window(:something => 10)
  end
  
  def application_did_finish_launching(notification)
    @main_window = window({})
    
    @main_window.show
    
    test_button = button(:layout => {
        :left => 200,
        :top  => 20,
        :right  => 250,
        :bottom => 100,
        :height => 24
      },
      :enabled  => true
    )
    
    @main_window << test_button
    
    @main_window << button(:layout => {
      :left   => 200,
      :top    => 300,
      :width  => 250,
      :bottom => 100,
      :height => 24
    }, 
    :enabled => false)
    
    @main_window << slider(:layout => {
        :left   => 200,
        :top    => 180,
        :width  => 250,
        :bottom => 100,
        :height => 16
      })
      
      @main_window << slider(:layout => {
          :left   => 500,
          :top    => 180,
          :width  => 250,
          :bottom => 100,
          :height => 14
        },
        :control_size => :small)
    
    `window.test_button = #{test_button};`
    # 
    # b2.title = "shit son!"
    
  end
end

