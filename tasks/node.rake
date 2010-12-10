# root directory to build node to
NODE_ROOT = File.join Dir.getwd, 'node'
NODE_SRC  = File.join Dir.getwd, 'js', 'node'
NODE_PKG  = File.join NODE_SRC, 'package'

# build all node (root is tmp/node_package)
task :node => %w[node:init node:runtime node:core]

# all build steps specific for building ready for node
namespace :node do
  desc "Setup the node directory and clone repository"
  task :init do
    FileUtils.mkdir_p NODE_ROOT
  end
  
  desc "build runtime/opal.js into node root"
  task :runtime do
    in_file = File.join Dir.getwd, 'js', 'node', 'opal.js'
    out_file = File.join NODE_ROOT, 'lib', 'runtime.js'
    FileUtils.mkdir_p File.dirname(out_file)
    
    gcc in_file, out_file
  end
  
  desc "Copy all core files into node root (bin/libs etc)"
  task :core do
    # ignore files not recognized by git (dont add .DS_Store etc)
    core = `cd #{NODE_PKG} && git ls-files *`.split "\n"
    core.each do |file|
      dest = File.join NODE_ROOT, file
      FileUtils.mkdir_p File.dirname(dest)
      FileUtils.cp File.join(NODE_PKG, file), dest
    end
  end
end
