# 
# gen.rb
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

require 'fileutils'

module Opal
  
  def self.gen
    ARGV.shift
    unless ARGV.length > 0
      print_usage
      abort
    end 
    path = ARGV.first
    name = path
    # abort "not yet implemented"
    
    base = File.expand_path(File.join(Vienna::PATH, 'gen', 'browser'))
   
    FileUtils.mkdir_p name

    Dir.glob(File.join(base, '**/*')).each do |file|
      local = /^#{Regexp.escape base}\/(.*)$/.match(file)[1]
      local.gsub!(/__PROJECT_NAME__/, name)
      # puts local
      if File.directory? file
        FileUtils.mkdir_p local
      else
        File.open(local, 'w') do |out|
          input = File.read file
          input.gsub!(/__PROJECT_NAME__/, name)
          out.write input
        end
      end

    end

  end
end
