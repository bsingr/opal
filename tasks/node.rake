# root directory to build node to
NODE_ROOT = File.join Dir.getwd, 'tmp', 'node'

# build all node (root is tmp/node_package)
task :node => ["node:init"]

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
end
