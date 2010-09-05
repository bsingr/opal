# 
# index_set.rb
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

module CherryKit
  
  # Set of ranges (ruby ranges) to express multiple index values (1..3 and 7..8)
  # 
  class IndexSet
    
    attr_reader :length
    
    def initialize(index)
      `if (#{index} == undefined) {
        #{index} = #{nil};
      }`
      
      @length = 0
      @ranges = []
      
      if index.is_a? Number
        add_index index
      elsif index.is_a? Range
        add_range index
      end
    end
    
    def add_index(index)
      puts "adding index #{index}"
      add_range Range.new index, index + 1, true
    end
    
    def add_range(range)
      # puts "adding range with length #{range.length}"
      if @length == 0
        @length = range.length
        @ranges = [range]
      else
        @length = @length + range.length
        @ranges << range
      end
    end
    
    # Returns true or false whether the index set includes the given index, 
    # range or index set
    # 
    # @param {Number|Range|IndexSet} index
    # @returns {true|false}
    # 
    def include?(index)
      if index.is_a? Number
        include_index? index
      elsif index.is_a? Range
        include_range? index
      else
        raise "Bad index given to Range#include? #{index}"
      end
    end
    
    def include_index?(index)
      found_index = false
      @ranges.each do |range|
        if range.include? index
          found_index = true
        end
      end
      
      found_index
    end
    
    def dup
      self
    end
  end
end
