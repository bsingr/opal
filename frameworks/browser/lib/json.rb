# 
# json.rb
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

# JSON responses will plain text, so we must parse it using JSON parser.
class JSON
  
  def initialize(url, options, &block)
    
  end
  
  def self.get(url, options, &block)
    # detect if jsonp, if so, pass these params onto JSONP
    # for now, assume it is jsonp
    # - detect JSONP by looking at url.. is it same as window url
    JSONP.get(url, options, block)
  end
end

# JSONP results will already be a Javascript object, so we must go through and
# convert it into a ruby based object: swap out objects for hashes.
class JSONP
  
  # An array of all the callback methods so that they can be manually deleted, altered
  # etc
  # NOTE: all functions are actually added to the window namespace... easily accessible,
  # and are of the form vn_jsonp_callback_id, where id is a number starting from 0, and
  # incremented per request
  JSONP_CALLBACKS = []
  
  def initialize(url, options, &block)
    @url = url
    @callback = "vn_jsonp_callback_0"
    @block = block
    JSONP_CALLBACKS << @callback
    puts "Initializing JSNOP connection with url: #{@url}"
    get!
  end
  
  def get!
    `window[#{@callback}] = function(response) {
      VN$(self, 'got_response', response);
    };`
    @script = `document.createElement('script')`
    `#{@script}.setAttribute('type', 'text/javascript');`
    `#{@script}.setAttribute('src', #{@url});`
    `document.body.appendChild(#{@script});`
  end
  
  def got_response response
    puts 'got response! toot!'
    @block.call `JSONParserReformatter(response)`
  end
  
  def self.get(url, options, &block)
    new(url, options, block)
  end
end

# require 'json/parse'
# require 'json/reformatter'
