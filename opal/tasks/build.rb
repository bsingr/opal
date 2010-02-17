require 'fileutils'

desc "Build charles"
task :build do
  
  build_dest = File.join(File.dirname(__FILE__), '..', 'build', 'charles.js')
  FileUtils.mkdir_p(File.dirname(build_dest))

  # should minify really...
  File.open(build_dest, "wb") do |f|
    sources = File.join(File.dirname(__FILE__), '..', 'lib', '**', '*.js')
    Dir.glob(sources).each { |s| open(s).each { |l| f.puts l } }
  end
end


