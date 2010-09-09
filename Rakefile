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
task :vienna_gem do
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
task :opal => :vienna_gem do
  raise "currently disabled. use simple_opal"
  opal = Vienna::Opal.new File.join(File.dirname(__FILE__),'frameworks', 'opal')
  opal.build! :build_dir => File.join(File.dirname(__FILE__), 'build')
end

desc "build simple_opal test opal purely for testing opal etc"
task :simple_opal => :vienna_gem do
  project = Vienna::Project.new(File.join(File.dirname(__FILE__), 'apps', 'simple_opal'), :build_mode => :debug)
   p project
   p project.targets
   project.build!
  # root = File.join(File.dirname(__FILE__), 'apps', 'simple_opal')
  # Vienna::Tools.new(root).build :simple_opal
end

desc "build simple_opal test opal purely for testing opal etc"
task :simple_opal_spec => :vienna_gem do
  project = Vienna::Project.new(File.join(File.dirname(__FILE__), 'apps', 'simple_opal'), :build_mode => :spec)
   p project
   p project.targets
   project.build!
  # root = File.join(File.dirname(__FILE__), 'apps', 'simple_opal')
  # V
end

desc "rebuild opal_spec package"
task :opal_spec => :vienna_gem do
  # opal framework root
  opal_root = File.join(File.dirname(__FILE__), 'frameworks', 'opal')
  # custom build root
  tmp_root = File.join(File.dirname(__FILE__), 'tmp', 'opal_spec')
  # our project
  project = Vienna::Project.new opal_root, :build_mode => :spec, 
                                           :build_root => tmp_root
  
  project.build!
end

desc "Browser Specs"
task :browser_spec => :vienna_gem do
  browser_root = File.join(File.dirname(__FILE__), 'frameworks', 'browser')
  
  tmp_root = File.join(File.dirname(__FILE__), 'tmp', 'browser_spec')
  
  project = Vienna::Project.new browser_root, :build_mode => :spec,
                                              :build_root => tmp_root
  
  project.build!
end

desc "Foundation Specs"
task :foundation_spec => :vienna_gem do
  browser_root = File.join(File.dirname(__FILE__), 'frameworks', 'foundation')
  
  tmp_root = File.join(File.dirname(__FILE__), 'tmp', 'foundation_spec')
  
  project = Vienna::Project.new browser_root, :build_mode => :spec,
                                              :build_root => tmp_root
  
  project.build!
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

namespace :doc do
  
  # rebuild demos
  desc "Rebuild demos"
  task :demos => :vienna_gem do
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
    t.files   = ['opals/runtime/**/*.rb']
    t.files += ['opals/opal/spec/**/*.rb']
    t.files += ['-', 'opals/runtime/docs/**/*.md']
    t.options = ['-o./doc/opal/']
    t.options += ['-r./opals/runtime/README.md']
    t.options += ['-mmarkdown']
    t.options += ['--title', 'Opal Documentation']
  end
  
  # browser docs
  YARD::Rake::YardocTask.new(:browser) do |t|
    t.files   = ['opals/browser/**/*.rb']
    t.options = ['-o./doc/browser/']
    t.options += ['-r./opals/browser/README.md']
    t.options += ['-mmarkdown']
    t.options += ['--title', 'Browser Documentation']
  end
  
  # all specs
  namespace :spec do
    
    %w{opal browser}.each do |opal|
      desc "rebuild spec for #{opal}"
      task opal.to_sym => :vienna_gem do
        opal_root = File.join(File.dirname(__FILE__), 'opals', opal)
        build_root = File.join(File.dirname(__FILE__), 'doc', opal, 'spec')
        project = Vienna::Project.new opal_root, :build_root => build_root, :build_mode => :spec
        
        project.options :javascript_name    => "spec.js",
                        :stylesheet_name    => "spec.css",
                        :build_prefix       => ""
        
        project.build!
        project.clean!
        
        # spec html file
        from = File.join(File.dirname(__FILE__), 'opals', 'spec', 'resources', 'index.html')
        
        FileUtils.copy from, File.join(build_root, 'index.html')
      end
    end
    
    # desc "rebuild opal_spec package"
    # task :opal_spec => :vienna_gem do
    #   # opal framework root
    #   opal_root = File.join(File.dirname(__FILE__), 'frameworks', 'opal')
    #   # custom build root
    #   tmp_root = File.join(File.dirname(__FILE__), 'tmp', 'opal_spec')
    #   # our project
    #   project = Vienna::Project.new opal_root, :build_mode => :spec, 
    #                                            :build_root => tmp_root
    # 
    #   project.build!
    # end
    
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
