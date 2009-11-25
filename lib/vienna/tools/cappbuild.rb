# 
# cappbuild.rb
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
  
  class Tools
  
    def self.cappbuild
      
      p = CappuccinoProject.new Dir.getwd
      p.prepare!
      p.build!
      
      # puts 'doing cappbuild'
      # p = Project.new Dir.getwd
      # p = Vienna::NewProject.new Dir.getwd
      # # puts "preparing: #{p.project_root}"
      # p.prepare!
      # # puts "building: #{p.project_name}"
      # p.build!
      # # puts "root file: #{p.root_file}"
      # # puts "library path: #{p.system_lib_root}"
      # 
      # # puts "all frameworks used:"
      # # puts p.all_frameworks
    end
  end  
end
