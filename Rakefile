require 'rubygems'
require 'rake'
# require 'spec/rake/spectask'
# require 'ftools'
require 'yard'
# 
# Dir[File.join(File.dirname(__FILE__), 'tasks', '**', '*.rb')].each do |t|
#   require t
# end

begin
  require 'jeweler'
  Jeweler::Tasks.new do |gemspec|
    gemspec.name = "vienna"
    gemspec.summary = "Ruby compiler and runtime for the browser"
    gemspec.description = "Ruby compiler and runtime for the browser."
    gemspec.email = "adam@adambeynon.com"
    gemspec.homepage = "http://github.com/adambeynon/vienna"
    gemspec.authors = ["Adam Beynon"]
  end
  Jeweler::GemcutterTasks.new
rescue LoadError
  puts "Jeweler not available. Install it with: sudo gem install jeweler"
end

desc "Simple task to require vienna framework. Uses local, not installed."
task :vienna do
  require File.join(File.dirname(__FILE__), 'lib', 'vienna')
end

# desc "Run all specs"
# Spec::Rake::SpecTask.new('spec') do |t|
#   t.spec_files = FileList['spec/**/*.rb']
# end


desc "Rebuild ruby parser (using racc)"
task :ruby_parser do
  %x{racc -E lib/vienna/builders/ruby/ruby_parser.rb.y -o lib/vienna/builders/ruby/ruby_parser.rb}
end


# desc "Rebuild vienna.js runtime file"
# task :vienna do
#   File.open('build/vienna.js', 'w') do |out|
#     # pre
#     out.puts "var vienna = { };"
#     out.puts "(function(global, exports) {"
#     
#     # runtime
#     out.puts File.read('runtime/vienna.js')
#     
#     # post
#     out.puts "})(window, vienna);"
#     
#     # Core library - use all rb files in core dir, but ensure kerenl.rb and     
#     # module.rb are first in line as most other things rely on them
#     ['core/kernel.rb', 'core/module.rb'].concat(Dir.glob('core/**/*.rb')).uniq!.each do |rb|
#       builder = Vienna::CherryKit::RubyBuilder.new(rb, nil, nil)
#       out.puts "// #{rb}"
#       out.puts "#{builder.build!}.apply(vienna.top_self);"
#     end
#   end
#   # puts "need to rebuild vienna.js"
# end

desc "build opal"
task :opal => :vienna do
  opal = Vienna::Framework.new File.join(File.dirname(__FILE__), 'frameworks', 'opal')
  opal.build! :build_dir => File.join(File.dirname(__FILE__), 'build')
end

YARD::Rake::YardocTask.new do |t|
  YARD::Templates::Engine.register_template_path(File.join(Dir.getwd, 'yard_templates'))
  t.files   = ['core/**/*.rb']               # optional
  # t.options = ['--any', '--extra', '--opts'] # optional
  t.options = ['-o./doc/vienna', '-tvienna']
  t.options += ['--title', 'Vienna Documentation']
end

# YARD::Rake::YardocTask.new(:cherry_kit) do |t|
#   t.files   = ['lib/**/*.rb', OTHER_PATHS]   # optional
#   t.options = ['--any', '--extra', '--opts'] # optional
# end

desc "Testing compiler etc"
task :test => :vienna do
  test = Vienna::CherryKit::RubyBuilder.new('test/test_vienna.rb', nil, nil)
  puts test.build!
end
