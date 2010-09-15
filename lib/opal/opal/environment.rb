# 
# env.rb
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

module Opal
  
  # Env is an opal environment. An instance of the ruby "virtual machine" that
  # holds the context for running ruby (through javascript). An ENV loads the
  # correct context, boots the runtime, and ties everything together conecting
  # the opal runtime and ruby classes that provide a layer for communicating
  # back and forth between the two. Any time opal is used to run ruby code
  # "server side", it will be through an instance of this class.
  class Environment
    
    # Path to system opals
    OPALS_PATH = File.join Vienna::PATH, 'opals'
    
    def initialize(args)
      
      begin
        require 'rubygems'
        require 'v8'
      rescue Exception
        abort "therubyracer not available. Install it with: sudo gem install therubyracer"
      end
      
      # puts "making new environment"
      @context = V8::Context.new
      load_runtime
      
      # puts "args are: #{args.inspect}"
      
      if args.length == 1
        file = args[0]
        # puts "need to run #{file}"
        # puts File.read(file)
        if File.exist? file
          load_required_file file
          args.clear
        else
          abort "Cannot find opal file #{args[0]}"
        end
      else
        start
      end
    end
    
    
    def load_runtime
      @context['console'] = Opal::Environment::Console.new self
      @context['__opal_fs_access'] = Opal::Environment::FS.new self
      
      runtime_files = %w(pre_opal opal server_side debug post_opal)
      js_str = []
      
      runtime_files.each do |file|
        str= File.read File.join(OPALS_PATH, 'runtime', 'runtime', "#{file}.js")
        js_str << str
      end
      
      js_eval js_str.join
      
      # need to load libs (kernel, module first, then all others)
      rb_sources = Dir.glob(File.join(OPALS_PATH, 'runtime', 'lib', '**', '*.rb'))
      # we want kernel first, then module
      %w(kernel module).reverse.each do |order|
        rb_sources.unshift rb_sources.select { |item|
          /#{Regexp.escape order}\.rb$/.match item
        }.first
      end
      
      rb_sources.uniq!
      
      rb_sources.each do |src|
        # puts src
        res = Vienna::RubyParser.new(src, File.read(src)).build!
        eval_str = "opal.load_raw_file('#{src}', #{res});"
        js_eval eval_str
        # break
      end
    end
    
    # Start accepting user input and compiling it
    def start
      while true
        '>> '.display
        gets.each do |e|
          puts("=> " + ruby_eval(e.to_s))
        end
      end
    end
    
    # Evaluate the given javascript normally in context
    def js_eval(str)
      @context.eval(str).to_s
    end
    
    def load_required_file(path)
      # puts "loading require file! #{path}"
      parser = Vienna::RubyParser.new(path, File.read(path))
      res = parser.build!
      # puts "a"
      # puts res
      @context.eval("opal.entry_point((function() {return (#{res}).apply(opal.top_self, ['#{path}'])}));").to_s
      # puts "b"
      true
    end
    
    # Evaluate the given string in the context
    def ruby_eval(str)
      parser = Vienna::RubyParser.new("(opal)", str, :iseq_type => :main)
      res = parser.build!
      @context.eval("opal.entry_point((function() {return (#{res}).apply(opal.top_self, ['(opal)']).$inspect()}));").to_s
    end
    
  end
end
