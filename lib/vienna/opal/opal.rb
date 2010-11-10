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

# Opal is the ruby runtime available from the command line. 
module Vienna
  
  # main entry point into Opal. If no args, files, etc, then simply just run the
  # REPL? for now, always run the repl
  def self.run
    command = ARGV.first
    case command
    when 'new'
      gen
    when 'repl', 'console'
      # puts "need to start REPL session"
      ARGV.clear
      Vienna::Environment.new(ARGV).repl!
    when 'spec'
      puts "sytarting specs.."
      ARGV.clear
      Vienna::Environment.new(ARGV).spec!
    when 'build'
      ARGV.shift
      # when building, if we have an Opalfile, build using a project, otherwise
      # we simply want to build the given ruby file to its respective js file
      if File.exist? 'Opalfile'
        p = Vienna::Project.new Dir.getwd, {}
        p.build!
      else
        # puts "need to build singular files"
        build!
      end
    when 'server'
      # puts "need to do server"
      p = Vienna::Project.new Dir.getwd, {}
      s = Vienna::AppServer.new p
    else
      print_usage
    end
    # puts "runnign repl"
    # puts ARGV
    # we must remove all args from argv before running repl to stop args being
    # passed on as ruby code to execute (into js)
    # ARGV.clear
    
    # make a new environment
    # Opal::Environment.new args
  end
  
  def self.print_usage
    puts %Q{
Usage:
  opal new PROJECT_PATH
}
  end
end
