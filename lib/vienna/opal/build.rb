# 
# build.rb
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

require 'optparse'
require 'fileutils'

module Opal
  
  def self.build!(args = nil)
    args ||= ARGV
    
    options = {}
    
    option_parser = OptionParser.new do |opt|
      opt.banner = <<END
Usage:
  opal build [source] [destination] [options]
  opal build --runtime [FILE]

Example

1) Building a ruby source
  opal build lib/ruby_file.rb js/ruby_file.js
  
2) Updating the runtime opal.js file (from local or system sources)
  opal build --runtime

Description:
  Build the given ruby files to javascript

Options:
END

      opt.separator ""
      
      opt.on('-w', '--watch', 'watch the given files for changes.',
             'Any changes will trigger a rebuild.') do
        options[:watch] = true
      end
      
      opt.on('--files FILES', Array, 'files to build.', 
             'This can be one, or many, globs or direct paths.') do |files|
        options[:files] = files
      end
      
      opt.on('--out OUT', 'output destination for build') do |file|
        options[:out] = file
      end
      
      opt.on('--runtime [DEST]', 'rebuild opal runtime.', 
             'Defaults to javascripts/opal.js') do |file|
        options[:runtime] = file || "javascripts/opal.js"
      end
      
      opt.on_tail('-h', '--help', 'show usage') do
        puts option_parser
        exit
      end
      
    end
    
    option_parser.parse!(args) rescue abort(option_parser.to_s)

    if options[:runtime]
      Builder.rebuild_opal(options[:runtime])
      exit
    elsif options[:files] && options[:files].length > 0
      Builder.new(options).build! 
    else
      puts option_parser
      exit
    end      
  end
  
  # Build some raw opal files into javascript, without the project system.
  class Builder
    
    # Rebuild our root opal (runtime with browser) to the filename.
    def self.rebuild_opal(filename)
      filename = File.expand_path(filename)

      opal_root = File.join(Vienna::PATH, 'opals', 'opal')
      build_root = File.dirname(filename)
      js_name = File.basename(filename)
      # debug build
      project = Vienna::Project.new opal_root, :build_mode => :debug, 
                                               :build_root => build_root

      project.options :javascripts_prefix => '',
                      :javascript_name    => js_name,
                      :bin_file           => nil
      project.build!
      project.clean!
    end
    
    # 
    # 
    # @param [Hash] options
    def initialize(options)
      @project_root = Dir.getwd
      @project_name = File.basename(@project_root)
      
      files = options[:files]
      @out = options[:out] || File.join('javascripts', @project_name + '.js')
      @files = []
      Dir.glob(files).each { |file| @files << file }
      @watch = options[:watch]
      FileUtils.mkdir_p(File.dirname(@out))
    end
    
    def build!
      rebuild!
      if @watch
        puts "Watching for changes..."
        loop do
          @files.each do |file|
            if File.stat(file).mtime > File.stat(@out).mtime
              puts "[#{Time.now}] rebuild - change detected in #{file}"
              rebuild!
            end
          end
          
          begin
            sleep 1
          rescue Interrupt
            exit 0
          end
        end
      end
    end
    
    def rebuild!
      File.open(@out, 'w') do |out|
        out.puts "opal.register({"
        out.puts "  'name': '#{@project_name}',"
        out.puts "  'files': {"
        @files.each_with_index do |file, index|
          out.puts ", " unless index == 0
          out.puts "'#{file}': #{build_file(file)}"
        end
        out.puts "}"
        out.puts "});"
        out.puts "opal.run('#{@project_name}', '#{@project_name}');"
      end
    end
    
    def build_file(source)
      # puts "need to build #{source} to #{destination}"
      parser = Vienna::RubyParser.new source, File.read(source)
      parser.build!
    end
  end
end
