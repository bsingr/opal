# 
# combine.js
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
  
  module Builder
    
    # Combines javascript files into a single script. This is done by searching
    # each relevant javascript file for require('blah/blah') statements, and 
    # then replacing these with the necessary file in its place. A project must
    # be set, so that the combiner can ensure that a file is not included more
    # than once (could be part of an infinite loop to add files)
    # 
    # Note: require() might not work as a good inserter, as other JS methods
    # might accidentally be picked up... converting 'require' to something like
    # VN.require('x') might be better suited. This will therefore need to be
    # done at the JS compilation stage, as well as ruby compilation.
    # 
    class Combine
      
      # js_file - path to a js file to combine
      # to_file - an already open file, ready to be written to
      def initialize(js_file, to_file, project)
        # puts "Combining #{js_file}"
        File.readlines(js_file).map do |l|
          # to_file.write l
          if match = l.match(/^VN\.require\(\'(.*)\'\)/)
            # to_file.write file_for_require_relative_to(File.join(project.project_root, js_file), match[1])
            # Vienna::Builder::Combine.new file_for_require_relative_to(File.join(project.project_root, js_file), match[1]), to_file, project
            Vienna::Builder::Combine.new(match[1], to_file, project)
            # to_file.write "wopwopwow"
          else
            to_file.write l
          end
        end
      end
      
      def file_for_require_relative_to(file, require_path) 
        # first try local files...
        file_dir = File.dirname(file)
        # try .js first
        try_path = File.join(file_dir, require_path) + '.js'
        if File.exists? try_path
          return try_path
        end
      end
      
    end
  end
end