# 
# browser_runtime.rb
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
  
  # Browser runtime is a simple bundle for quickly building the core browser runtime
  # bundle. It includes the core(base) lib, as well as the browser lib
  class BrowserRuntime
    
    def initialize(project)
      @project = project
    end
    
    def build_dir
      File.join(@project.project_root, 'build/tmp')
    end
    
    def build!(output_destination)
      @output_destination = output_destination
      FileUtils.mkdir_p(build_dir)
      base_path = build_js_file(File.join(PATH, 'sdk', 'vienna', 'base', 'lib', 'base.js'))
      o = File.open(output_destination, 'w')
      c = Vienna::Builder::Combine.new(base_path, o, self)
      o.close
    end
    
    def build_js_file(path)
      re = path.match(/^#{File.join(PATH, 'sdk', 'vienna')}\/(.*)\/lib\/(.*)/)
      bundle_name = re[1]
      src_file = re[2]
      build_name = File.join(bundle_name, src_file)
      FileUtils.mkdir_p(File.dirname(File.join(build_dir, build_name)))
      b = Vienna::Builder::Javascript.new(path, File.join(build_dir, build_name), self)
      b.build!
      File.join(build_dir, build_name)
    end
    
    def build_ruby_file(path)
      # build_dir = File.join(project_root, build_prefix)
      # # build_name = File.basename(path, File.extname(path))
      # build_name = /^#{bundle_root}\/lib\/(.*)#{File.extname(path)}/.match(path)[1]
      # build_name = build_name.split('/').map { |e| e.vn_capitalize }
      # # abort build_name
      # d = File.join(build_dir, build_name) + '.j'
      # FileUtils.mkdir_p(File.dirname(d))
      # p = ObjjRuby.new(path, d, self)
      # p.build!
    end
    
    def build_file(a_file)
      unless File.exist?(a_file)
        abort "#{a_file}: file does not exist"
      end
      
      case File.extname(a_file)
      when '.js'
        build_js_file(a_file)
      when '.rb'
        build_rb_file(a_file)
      end
    end
    
    # when a file, file_path, has a require statement for 'require_path'
    def file_requires_file(file_path, require_path)
      # local js file (relative)
      t = File.join(File.dirname(file_path), require_path) + '.js'
      return build_js_file(t) if File.exist? t
      # local rb file (relative)
      t = File.join(File.dirname(file_path), require_path) + '.rb'
      return build_rb_file(t) if File.exist? t

      # for now, assume nil
      puts "Cannot locate requirements: ['#{file_path}', '#{require_path}']"
      return nil
    end
    
  end
end
