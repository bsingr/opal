require 'fileutils'

##
# GCC preprocess core files with given input and specified output
#
class Object
  def gcc(input, output)
    system "gcc -E -x c -P -C #{input} -o #{output}"
  end
end

desc "Rebuild the javascript parser (ruby_parser)"
task :parser do
  system "./tools/racc2js/racc2js.rb ./js/ruby_parser.y"
end

# root directory to build node to
NODE_ROOT = File.join Dir.getwd
NODE_SRC  = File.join Dir.getwd, 'src', 'node'
NODE_PKG  = File.join NODE_SRC, 'package'

desc "build runtime/opal.js into node root"
task :node do
  in_file = File.join NODE_SRC, '..', 'dev.js'
  out_file = File.join NODE_ROOT, 'lib', 'dev.js'
  FileUtils.mkdir_p File.dirname(out_file)
    
  gcc in_file, out_file
end
 
# build into tmp/browser
desc "Build opal.js (runtime) and opal_dev.js (compiler) into tmp/browser"
task :browser do
    
  build_manifests = {
    'src/browser/opal.js'      => 'extras/opal.js',
    'src/browser/opal_dev.js'  => 'extras/opal_dev.js'
  }
    
  build_manifests.each do |source, target|
    #system "gcc -E -x c -P -C #{source} -o #{target}"
    gcc source, target
  end
end

desc 'Build opalite dom library to extras/opalite.js'
task :opalite do
  in_file = 'src/opalite/opalite.js'
  out_file = 'extras/opalite.js'
  gcc in_file, out_file
end

