# 
# generate.rb
# opal
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

module Opal
  
  def self.generate!(gen_name, project_name)
    # for now, we only use "simple" generator
    abort "No generator for that name" if gen_name != :simple
    generate_simple(project_name)
  end
  
  def self.generate_simple(project_name)
    gen_root = File.expand_path(File.join(File.dirname(__FILE__), '..', '..', 'gen', 'simple'))
    project_root = File.join(Dir.getwd, project_name)
    
    FileUtils.mkdir_p project_root
    
    # index.html file
    File.open(File.join(project_root, 'index.html'), 'wb') do |f|
      open(File.join(gen_root, 'template', 'index.html')).each do |line|
        f.write line.gsub(/__PROJECT_NAME__/, project_name).gsub(/__PROJECT_TITLE__/, project_name)
      end
    end
    
    # opal.js - include all core library plus all browser library
    File.open(File.join(project_root, 'opal.js'), 'wb') do |f|
      t = ""
      # core sources
      core_sources = File.join(File.dirname(__FILE__), '..', '..', 'runtime', 'core', '**', '*.js')
      
      Dir.glob(core_sources).each { |s| open(s).each { |l| t << l } }
      
      # browser sources
      browser_sources = File.join(File.dirname(__FILE__), '..', '..', 'runtime', 'browser', '**', '*.js')
      
      Dir.glob(browser_sources).each { |s| open(s).each { |l| t << l } }
      
      # should really minify
      f.write t
    end
    
    # simple.rb file...
    File.open(File.join(project_root, "#{project_name}.rb"), 'wb') do |f|
      open(File.join(gen_root, 'template', 'simple.rb')).each do |line|
        f.write line
      end
    end
  end
  
end
