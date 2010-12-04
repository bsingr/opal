require 'fileutils'


desc "Rebuild the javascript parser (ruby_parser)"
task :parser do
  system "./tools/racc2js/racc2js.rb ./js/lib/opal/dev/ruby_parser.y"
end

desc "Build V8 into tmp/"
task "tmp/libv8.a" do
  puts "building v8"
  system %{scons -C "/Users/adam/Development/opal/tmp" -Y "/Users/adam/Development/opal/vendor/v8" arch=x64}
end

desc "Build bin/opal"
task "bin/opal" do
  system %{g++ -g -Ivendor/v8/include -Isrc -o bin/opal src/opal.cc src/file.cc src/io.cc tmp/libv8.a}
end

desc "Rebuild opal.js"
task :runtime => "runtime/opal.js"

desc "Rebuild runtime/opal.js for VM etc. (opal v8 context)"
task "runtime/opal.js" do
  FileUtils.mkdir_p 'runtime'
  # core runtime files 
  sources = %w[platform_opal file class module]
  # core classes/objects/modules
  sources += %w[object error string numeric io array hash regexp]
  # extra runtime files
  sources += %w[variable ruby vm load init]
  # dev files which are included
  sources += %w[ruby_parser parser string_scanner generator]
  
  inner = sources.map do |source|
    File.read File.join(Dir.getwd, %w[js lib], source + '.js')
  end.join ''
  
  pre = "(function(global, exports) {"
  post = "})(this, Opal);"
  
  File.open('runtime/opal.js', 'w') do |out|
    out.puts pre, inner, post
  end
end

# all build steps specific for building ready for node
namespace :node do
  
end

# all build steps specific for building ready for narwhal/commonjs
namespace :narwhal do
  
end

# all build steps specific for building ready for browser deployment
namespace :browser do
  # build into tmp/browser
  desc "Build opal.js (runtime) and opal_dev.js (compiler) into tmp/browser"
  task :runtime do
    
  end
end
