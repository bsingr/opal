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
    'vienna/browser' => 'browser'
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

