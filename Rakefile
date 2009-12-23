require 'rubygems'
require 'rake'

require 'ftools'

begin
  require 'jeweler'
  Jeweler::Tasks.new do |gemspec|
    gemspec.name = "vienna"
    gemspec.summary = "Ruby compiler and runtime for the browser"
    gemspec.description = "Ruby compiler and runtime for the browser"
    gemspec.email = "adam@adambeynon.com"
    gemspec.homepage = "http://github.com/adambeynon/vienna"
    gemspec.authors = ["Adam Beynon"]
  end
  Jeweler::GemcutterTasks.new
rescue LoadError
  puts "Jeweler not available. Install it with: sudo gem install jeweler"
end

desc "Generate and update all docs. Default location used if no param. Dir layout: each SDK is treated independantly."
task :doc do
  output_dir = File.expand_path((ARGV.length > 1) ? ARGV[1] : "../vienna.adambeynon.com/public/")
  sdks = {
    # cappuccino sdk
    # 'cappuccino' => 'cappuccino',
    # vienna sdk
    # 'vienna' => 'vienna',
    # browser sdk. actually part of vienna, but make a seperate group of docs
    'vienna/base' => 'browser'
  }
  sdks.each do |sdk, path|
    puts "Generating documentation for #{sdk}"
    `rdoc sdk/#{sdk} --format=darkfish --main sdk/#{sdk}/README.rdoc -o ~/Development/vienna.adambeynon.com/public/docs/#{path}`
    # need to replace css for each to our custom one..
    File.copy(File.join(File.dirname(__FILE__), 'resources', 'rdoc.css'), File.expand_path("~/Development/vienna.adambeynon.com/public/docs/#{path}/"))
  end
  
  # need to copy new css and all images to the base public/docs. routing means that if we go to /browser instead of /browser/index.html,
  # then the browser will not be able to look for the right images etc. pfft.
end

desc "Generate single vienna.js file that can be used without installing vienna"
task :vienna_js do
  output_file = File.expand_path(File.join(((ARGV.length > 1) ? ARGV[1] : "../vienna.adambeynon.com/public/"), 'vienna.js'))
  sources = File.join(File.dirname(__FILE__), "sdk", 'vienna', 'base', 'lib', "**", "*.{js}")
  output = File.new(output_file, 'w')
  t = ""
  Dir.glob(sources).each do |source|
    File.readlines(source).map do |l|
      t << l
    end
  end
  output.write %q{/* 
 * vienna.js
 * vienna.adambeynon.com
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */}
  # output.write JSMin.minify(t)
  output.write t
  output.close
end

#--
# jsmin.rb - Ruby implementation of Douglas Crockford's JSMin.
#
# This is a port of jsmin.c, and is distributed under the same terms, which are
# as follows:
#
# Copyright (c) 2002 Douglas Crockford  (www.crockford.com)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# The Software shall be used for Good, not Evil.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#++
 
require 'strscan'
 
# = JSMin
#
# Ruby implementation of Douglas Crockford's JavaScript minifier, JSMin.
#
# *Author*::  Ryan Grove (mailto:ryan@wonko.com)
# *Version*::   1.0.1 (2008-11-10)
# *Copyright*:: Copyright (c) 2008 Ryan Grove. All rights reserved.
# *Website*::   http://github.com/rgrove/jsmin
#
# == Example
#
#   require 'rubygems'
#   require 'jsmin'
#
#   File.open('example.js', 'r') {|file| puts JSMin.minify(file) }
#
module JSMin
  CHR_APOS     = "'".freeze
  CHR_ASTERISK   = '*'.freeze
  CHR_BACKSLASH  = '\\'.freeze
  CHR_CR     = "\r".freeze
  CHR_FRONTSLASH = '/'.freeze
  CHR_LF     = "\n".freeze
  CHR_QUOTE    = '"'.freeze
  CHR_SPACE    = ' '.freeze
 
  if RUBY_VERSION >= '1.9'
  ORD_LF  = "\n".freeze
  ORD_SPACE = ' '.freeze
  ORD_TILDE = '~'.freeze
  else
  ORD_LF  = "\n"[0].freeze
  ORD_SPACE = ' '[0].freeze
  ORD_TILDE = '~'[0].freeze
  end
 
  class << self
 
  # Reads JavaScript from _input_ (which can be a String or an IO object) and
  # returns a String containing minified JS.
  def minify(input)
    @js = StringScanner.new(input.is_a?(IO) ? input.read : input.to_s)
 
    @a     = "\n"
    @b     = nil
    @lookahead = nil
    @output  = ''
 
    action_get
 
    while !@a.nil? do
    case @a
    when CHR_SPACE
      if alphanum?(@b)
      action_output
      else
      action_copy
      end
 
    when CHR_LF
      if @b == CHR_SPACE
      action_get
      elsif @b =~ /[{\[\(+-]/
      action_output
      else
      if alphanum?(@b)
        action_output
      else
        action_copy
      end
      end
 
    else
      if @b == CHR_SPACE
      if alphanum?(@a)
        action_output
      else
        action_get
      end
      elsif @b == CHR_LF
      if @a =~ /[}\]\)\\"+-]/
        action_output
      else
        if alphanum?(@a)
        action_output
        else
        action_get
        end
      end
      else
      action_output
      end
    end
    end
 
    @output
  end
 
  private
 
  # Corresponds to action(1) in jsmin.c.
  def action_output
    @output << @a
    action_copy
  end
 
  # Corresponds to action(2) in jsmin.c.
  def action_copy
    @a = @b
 
    if @a == CHR_APOS || @a == CHR_QUOTE
    loop do
      @output << @a
      @a = get
 
      break if @a == @b
 
      if @a[0] <= ORD_LF
      raise "JSMin parse error: unterminated string literal: #{@a}"
      end
 
      if @a == CHR_BACKSLASH
      @output << @a
      @a = get
 
      if @a[0] <= ORD_LF
        raise "JSMin parse error: unterminated string literal: #{@a}"
      end
      end
    end
    end
 
    action_get
  end
 
  # Corresponds to action(3) in jsmin.c.
  def action_get
    @b = nextchar
 
    if @b == CHR_FRONTSLASH && (@a == CHR_LF || @a =~ /[\(,=:\[!&|?{};]/)
    @output << @a
    @output << @b
 
    loop do
      @a = get
 
      if @a == CHR_FRONTSLASH
      break
      elsif @a == CHR_BACKSLASH
      @output << @a
      @a = get
      elsif @a[0] <= ORD_LF
      raise "JSMin parse error: unterminated regular expression " +
        "literal: #{@a}"
      end
 
      @output << @a
    end
 
    @b = nextchar
    end
  end
 
  # Returns true if +c+ is a letter, digit, underscore, dollar sign,
  # backslash, or non-ASCII character.
  def alphanum?(c)
    c.is_a?(String) && !c.empty? && (c[0] > ORD_TILDE || c =~ /[0-9a-z_$\\]/i)
  end
 
  # Returns the next character from the input. If the character is a control
  # character, it will be translated to a space or linefeed.
  def get
    c = @lookahead.nil? ? @js.getch : @lookahead
    @lookahead = nil
 
    return c if c.nil? || c == CHR_LF || c[0] >= ORD_SPACE
    return "\n" if c == CHR_CR
    return ' '
  end
 
  # Gets the next character, excluding comments.
  def nextchar
    c = get
    return c unless c == CHR_FRONTSLASH
 
    case peek
    when CHR_FRONTSLASH
    loop do
      c = get
      return c if c[0] <= ORD_LF
    end
 
    when CHR_ASTERISK
    get
    loop do
      case get
      when CHR_ASTERISK
      if peek == CHR_FRONTSLASH
        get
        return ' '
      end
 
      when nil
      raise 'JSMin parse error: unterminated comment'
      end
    end
 
    else
    return c
    end
  end
 
  # Gets the next character without getting it.
  def peek
    @lookahead = get
  end
  end
end
