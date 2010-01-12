# 
# environment.rb
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

# require File.join(File.dirname(__FILE__), 'boot')
# 
# # applications main() method. Handle app loading etc in app delegate, in
# # app/controllers/app_controller.rb to:
# #   - handle loading
# #   - load gui
# application do |app|
#   
#   # custom place to put application gem/bundle - only applicable to web
#   # '/' by default (same path as index.html and vienna.js)
#   # app.application_path = '/'
#   
#   # custom place to look for vendor gems/bundles. '/vendor/' by default
#   # app.vendor_path = '/vendor'
#   
#   # app.development_region = :en
#   
#   # app delegate class: must be a symbol to avoid loading errors...maybe string instead?
#   # app.application_contoller = :AppController
#   
#   # bundles that this application requires. These will be loaded into the browser
#   # runtime before the application is run. 'gem' used as a "compatible" keyword
#   # for vanilla ruby. This will infact only load vienna bundles located in the 
#   # vendor folder. 'vienna' gem is loaded automatically.
#   # app.gem 'interface_builder'
# end

class View
  class << self
    def adam
      puts 1000
    end
  end
  def bob
    puts 10
  end
end

View.adam