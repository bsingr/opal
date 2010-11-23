
# simply just require vienna (local, not system)
task :vienna do
  require File.join(File.dirname(__FILE__), 'lib', 'vienna')
end

desc "Rebuild both opal.js and opal_dev.js in tmp/"
task :browser => [:opal, :opal_dev]

desc "Rebuild opal.js runtime in tmp/ for use in browser"
task :opal => :vienna do
  puts "rebuilding opal.js"
end

desc "Rebuild opal_dev.js in tmp/ for use in browser"
task :opal_dev => :vienna do
  pre = "(function(global, exports, print) {\n"
  post = "\n})(this, Opal, Opal.log);\n"
  sources = %w{ruby_parser generator lexer optimizer parser string_scanner opal}
  dest = File.join File.dirname(__FILE__), 'tmp', 'opal_dev.js'
  result = []
  
  result << pre
  
  # source.each
  sources.each do |src|
    input = File.join File.dirname(__FILE__), 'commonjs', "#{src}.js"
    result << File.read(input)
  end
  
  result << post
  
  File.open dest, 'w' do |out|
    out.puts result.join ''  
  end
  
  # File.open "#{dest}.compiled", 'w' do |out|
  #   require 'closure-compiler'
  #   out.puts Closure::Compiler.new.compile(result.join '')
  # end
end

desc "Rebuild the javascript parser (ruby_parser)"
task :parser do
  exec './tools/racc2js/racc2js.rb ./lib_js/opal/dev/ruby_parser.y'
end
