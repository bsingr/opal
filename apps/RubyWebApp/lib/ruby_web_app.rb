# 
# ruby_web_app.rb
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

require 'vienna'

module RubyWebApp
  
  # include Vienna
  
  VERSION = "0.0.1"
  
  def self.version
    VERSION
  end
end

require 'builders/main_menu'
require 'controllers/app_controller'

Vienna::App.run do |app|
  
  VN::Builder.build :main_menu, :owner => VN::App, :top_level_objects => [] do |builder|
    # puts "# builder finished!"
    
    # puts 'AppDelegate'
    # puts VN::App.delegate
    
    # puts 'Setting value for adam to 20'
    # VN::App.delegate.set_value 20, for_key:'adam'
    # puts VN::App.delegate.value_for_key 'adam'
    
    # CGSetHeight(100)
    
    # :"set_value:for_key:"
    
  end

end

