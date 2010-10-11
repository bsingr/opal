require 'rubygems'
require 'rake'
require 'yard'

begin
  require 'jeweler'
  Jeweler::Tasks.new do |gemspec|
    gemspec.name = "opal"
    gemspec.summary = "Ruby compiler and runtime for the browser"
    gemspec.description = "Ruby compiler and runtime for the browser."
    gemspec.email = "adam@adambeynon.com"
    gemspec.homepage = "http://opalscript.org"
    gemspec.authors = ["Adam Beynon"]
    gemspec.files.include 'opals/**/*'
  end
  Jeweler::GemcutterTasks.new
rescue LoadError
  puts "Jeweler not available. Install it with: sudo gem install jeweler"
end



desc "Simple task to require opal gem. Uses local, not installed."
task :opal_gem do
  require File.join(File.dirname(__FILE__), 'lib', 'opal')
end



desc "Rebuild ruby parser (using racc)"
task :ruby_parser do
  %x{racc -E lib/opal/builders/ruby/ruby_parser.rb.y -o lib/opal/builders/ruby/ruby_parser.rb}
end



namespace :doc do
  
  # rebuild demos
  desc "Rebuild demos"
  task :demos => :opal_gem do
    # every demo uses an index.html file inside of the demos folder
    base = File.join(File.dirname(__FILE__), 'demos')
    demos = File.join(base, '**', 'index.html')
    # we build all demos to vienna/doc/demos
    Dir.glob(demos).each do |demo|
      puts "building demo: #{demo}"
      # path will be (demos/)path(/index.html)
      path = /^#{Regexp.escape base}\/(.*)\/index\.html$/.match(demo)[1]
      
      build_root = File.join(File.dirname(__FILE__), 'doc', 'demos', path)
      
      puts build_root
      project = Vienna::Project.new File.dirname(demo),
        :build_root => build_root
      
      # FIXME: maybe only set options if no Opalfile... some of the CherryKit
      # apps may want to include some css etc etc, so dont overwrite them?
      project.options :lib_directories    => [""],
                      :javascripts_prefix => "",
                      :copy_html          => true
      project.build!
      project.clean!
      # puts project
    end
  end
  
  # opal/runtime docs
  YARD::Rake::YardocTask.new(:opal) do |t|
    t.files   = ['opals/opal/runtime/**/*.rb']
    t.files += ['opals/opal/opal/spec/core/**/*.rb']
    t.files += ['-', 'opals/opal/runtime/docs/**/*.md']
    t.files += ['-', 'opals/opal/opal/**/*.md']
    t.options = ['-o./doc/opal/']
    t.options += ['-r./opals/opal/runtime/README.md']
    t.options += ['-mmarkdown']
    t.options += ['--title', 'Opal Documentation']
  end
  
  # browser docs
  YARD::Rake::YardocTask.new(:browser) do |t|
    t.files   = ['opals/opalbrowser/**/*.rb']
    t.options = ['-o./doc/opalbrowser/']
    t.options += ['-r./opals/opalbrowser/README.md']
    t.options += ['-mmarkdown']
    t.options += ['--title', 'Browser Documentation']
  end
  
  # all specs
  namespace :spec do
    
    %w{opal browser}.each do |opal|
      desc "rebuild spec for #{opal}"
      task opal.to_sym => :opal_gem do
        opal_root = File.join(File.dirname(__FILE__), 'opals', 'opal', opal)
        build_root = File.join(File.dirname(__FILE__), 'doc', opal, 'spec')
        project = Vienna::Project.new opal_root, :build_root => build_root, :build_mode => :spec
        
        project.options :javascript_name    => "spec.js",
                        :stylesheet_name    => "spec.css",
                        :build_prefix       => ""
        
        project.build!
        project.clean!
        
        # spec html file
        from = File.join(File.dirname(__FILE__), 'opals', 'opal', 'spec', 'resources', 'index.html')
        
        FileUtils.copy from, File.join(build_root, 'index.html')
      end
    end
  end
end

desc "Rebuild opal.js for deployment"
task :opal => :opal_gem do
  opal_root = File.join(File.dirname(__FILE__), 'opals', 'opal', 'browser')
  build_root = File.join(File.dirname(__FILE__), 'doc')
  
  # debug build
  project = Vienna::Project.new opal_root, :build_mode => :debug, 
                                           :build_root => build_root
  
  project.options :javascripts_prefix => '',
                  :javascript_name    => 'opal.debug.js',
                  :bin_file           => nil
  project.build!
  project.clean!
  
  # release build
  project = Vienna::Project.new opal_root, :build_mode => :release, 
                                           :build_root => build_root
  
  project.options :javascripts_prefix => '',
                  :javascript_name    => 'opal.js',
                  :bin_file           => nil
  project.build!
  project.clean!
  
  # minify!
  %x{java -jar extras/compiler.jar --js=doc/opal.js --js_output_file=doc/opal.min.js}
  
  
  # Also place all three into gen directory
  %w{opal.min.js opal.debug.js}.each do |src|
    FileUtils.copy "doc/#{src}", "gen/browser/__PROJECT_NAME__/javascripts/#{src}"
  end
end

task :doc => ['doc:browser', 'doc:opal', 'doc:demos'] do
  # go through each set of generated docs, and replace the style.css file
  %w{browser opal}.each do |opal|
    from = File.join(File.dirname(__FILE__), 'yard', 'style.css')
    to = File.join(File.dirname(__FILE__), 'doc', opal, 'css', 'style.css')
    FileUtils.copy from, to
  end
  
  # copy our index.html and its necessary css files
  %w{index.html style.css}.each do |resource|
    from = File.join File.dirname(__FILE__), 'yard', resource
    to = File.join(File.dirname(__FILE__), 'doc')
    FileUtils.copy from, to
  end
end

desc "Closure compile opal.js and opal_dev.js (into same filenames)"
task :browser do
  require 'closure-compiler'
  %w{tmp/opal.js tmp/opal_dev.js}.each do |src|
    puts "Compressing #{src}..."
    code = Closure::Compiler.new.compress(File.read(src))
    File.open(src, 'w') { |out| out.write code }
  end
end

