# 
# opal.rb
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

require File.join(File.dirname(__FILE__), 'base')

module Vienna
  
  module Builders
    
    class Opal < Base
      
      def build
        # puts "building opal to #{@build_item.build_path}"
        source_items = @build_item.source_items
        build_path = @build_item.build_path
        
        FileUtils.mkdir_p File.dirname(build_path)
        
        exec_sources = source_items.select do |item|
          item.ext == 'rb' || item.ext == 'js'
        end

        File.open(build_path, 'w') do |out|
          # opal definition and required attributes
          out.puts %Q|opal.register({|
          out.puts %Q|  "name": "#{@build_item.target.target_name}",|
          # executable sources
          out.puts %Q|  "files": {|
          exec_sources.each_with_index do |item, index|
            out.puts(",") if index > 0
            contents = File.read(item.stage!.staging_path)
            if item.ext == "rb"
              out.write %Q|    "#{item.filename}": #{contents}|
            else
              # must wrap javascript in function closure
              out.write %Q|    "#{item.filename}": function() {#{contents}}|
            end
          end
          out.puts "\n  }"
          
          
          # 
          out.puts "});"
        end
        
        # source_items.each do |item|
        #   staged_path = item.stage!.staging_path
        #   
        #   puts staged_path
        #   puts item.ext
        # end
      end
      
    end
  end
end