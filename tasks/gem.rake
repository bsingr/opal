# root directory to build gem to
GEM_ROOT = File.join Dir.getwd, 'tmp', 'gem'

# build all
task :gem => ["gem:init", "gem:copycore", "gem:gemspec"]

namespace :gem do
  desc "Setup the gem directory and clone repository"
  task :init do
    FileUtils.mkdir_p GEM_ROOT
  end
  
  desc "Copy gemspec into root directory"
  task :gemspec do
    gemspec = File.join GEM_ROOT, "opal.gemspec"
  end
  
  desc "Copy core files into target"
  task :copycore do
    core_dir = File.join Dir.getwd, 'ruby'
    core = `cd #{core_dir} && git ls-files`.split "\n"
    core.each do |file|
      dest = File.join GEM_ROOT, file
      FileUtils.mkdir_p File.dirname(dest)
      FileUtils.cp File.join(core_dir, file), dest
    end
  end
  
  desc "build runtime/opal.js into gem root"
  task "runtime/opal.js" do
    in_file = File.join Dir.getwd, 'js', 'gem', 'opal.js'
    out_file = File.join GEM_ROOT, 'runtime', 'opal.js'
    FileUtils.mkdir_p File.dirname(out_file)
    
    gcc in_file, out_file
  end
end
