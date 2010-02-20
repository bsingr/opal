# 
# twitter.rb
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

module Twitter
  
  # Returns the timeline url for the given username to avoid hardcoding
  # 
  # Usage:
  #   Twitter.user_timeline_url('example')
  #   => "http://twitter.com/status/user_timeline/example.json"
  # 
  def self.user_timeline_url(username)
    "http://twitter.com/status/user_timeline/#{username}.json?count=10"
  end
  
  # Use JSONP to fetch a timeline for the given user. Returns an array of hashes
  # 
  # Usage:
  #   Twitter.timeline 'example', :count => 10 { |t| puts t }
  #   => [{..tweet info hash..}, {...}, ....]
  def self.timeline(name, options, &block)
    url = user_timeline_url(name)
    
    Ajax.get url, :data_type => 'jsonp'
  end
  
end
