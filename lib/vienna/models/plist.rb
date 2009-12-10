# 
# plist.rb
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

class Array
  # break an array up into <size> chunks
  def chunk(size=1)
    return self if self.empty?
    raise ArgumentError if !size.kind_of? Integer

    y = self.length.divmod(size)
    rows = (y[1] > 0) ? y[0] + 1 : y[0]
    arr = Array.new(rows)
    (0...rows).each do |i|
      arr[i] = self.slice(size*i, size)
    end

    (arr.last.length...size).each { |i| arr.last[i] = nil } if
arr.last.length < size
    arr
  end
end

module Vienna
  
  class Plist
  
    def self.load_file(file_path)
      file = File.new file_path
      doc = REXML::Document.new file
      tree = process_element doc.root
    end
    
    def self.process_element(e)
      case e.name
      when "plist"
        e.each_element { |s| return process_element(s) }
      when "dict"
        r = { }
        a = e.elements.to_a.chunk(2)
        a.each do |s|
          r[process_element(s[0])] = process_element(s[1])
        end
        r
      when "key"
        e.text
      when "string"
        e.text
      end
    end
  end
end
