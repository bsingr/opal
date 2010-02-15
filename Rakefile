require 'rubygems'
require 'rake'
require 'spec/rake/spectask'

require 'ftools'

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


desc "Run all specs"
Spec::Rake::SpecTask.new('spec') do |t|
  t.spec_files = FileList['spec/**/*.rb']
end


desc "Rebuild ruby parser (using racc)"
task :ruby_parser do
  %x{racc -E lib/vienna/builders/ruby/ruby_parser.rb.y -o lib/vienna/builders/ruby/ruby_parser.rb}
end
