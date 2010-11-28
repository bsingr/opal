
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
  system %{g++ -g -Ivendor/v8/include -Isrc -o bin/opal src/opal.cc src/file.cc tmp/libv8.a}
end
