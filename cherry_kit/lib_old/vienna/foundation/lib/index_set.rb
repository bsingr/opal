# 
# index_set.rb
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

module Vienna
  
  class IndexSet
    
    def initialize(obj)
      @count = 0
      @ranges = []
      # if we had an argument..
      # if obj
        # if obj.is_a?(Number)
        # add_index(obj)
      # end
    end
    
    def self.index_set
      self.new
    end
    
    def self.index_set_with_index(value)
      obj = self.new
      obj.add_index(value)
      obj
    end
    
    def self.index_set_with_indexes_in_range(range)
      obj = self.new
      obj.add_indexes_in_range(range)
      obj     
    end
    
    def equal_to_index_set?(index_set)
      false
    end
    
    def count
      @count
    end
    
    def ranges
      @ranges
    end
    
    def first_index
      # return NSNotFound (-1) if no ranges
      return -1 if (@ranges.length == 0)
      
      first_index = @ranges[0].first
      
      @ranges.length.times do |range|
        if @ranges[range].first < first_index
          first_index = @ranges[range].first
        end
      end
      
      first_index
    end
    
    def last_index
      return -1 if (@ranges.length == 0)
      # .last is the last one regarless, so take one from it
      last_index = @ranges[0].last - 1
      
      @ranges.length.times do |range|
        if (@ranges[range].last - 1) > last_index
          last_index = @ranges[range].last - 1
        end
      end
      
      last_index
    end
    
    def member?(index)
      include?(index)
    end
    
    def include?(index)
      result = false
      return result if @ranges.length == 0
      
      @ranges.length.times do |range|
        if (index >= @ranges[range].first) && (@ranges[range].last > index)
          result = true
        end
      end
      
      result      
    end
    
    def add_index(index)
      add_indexes_in_range(index..index+1)
    end
    
    def add_indexes_in_range(range)
      @ranges << range
    end
    
    def add_indexes(indexes)
      
    end
  end
end
