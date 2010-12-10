require 'fileutils'

Dir.glob("tasks/*.rake").each { |rake| import rake }

desc "Rebuild the javascript parser (ruby_parser)"
task :parser do
  system "./tools/racc2js/racc2js.rb ./js/ruby_parser.y"
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

  in_file = "js/opal/opal.js"
  out_file = "runtime/opal.js"
  
  system "gcc -E -x c -P -C #{in_file} -o #{out_file}"
end

# all build steps specific for building ready for narwhal/commonjs
namespace :narwhal do
  
end

# all build steps specific for building ready for browser deployment
namespace :browser do
  # build into tmp/browser
  desc "Build opal.js (runtime) and opal_dev.js (compiler) into tmp/browser"
  task :runtime do
    FileUtils.mkdir_p 'tmp/browser'
    
    build_manifests = {
      'js/browser/opal.js'      => 'tmp/browser/opal.js',
      'js/browser/opal_dev.js'  => 'tmp/browser/opal_dev.js'
    }
    
    build_manifests.each do |source, target|
      system "gcc -E -x c -P -C #{source} -o #{target}"
    end
  end
end
