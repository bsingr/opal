# 
#  ajax.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-09-09.
#  Copyright 2009 Adam Beynon. All rights reserved.
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

# Used to perform AJAX requests to a server. AJAX wraps around the native request
# in the browser, handling cross browser differences.
class AJAX
  
  def initialize(options={})
    @request = `new XMLHttpRequest();
    #[@request].send(null);`
  end
  
  # Usage:
  # 
  #   AJAX.get my_js_file.js, :option_1 => 'something', :option_2 => 'something_else' do |response|
  #     puts 'received response!
  #   end
  # 
  # finished.
  def self.get(url, options, &block)
    
  end
  
end