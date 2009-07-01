# Look in the tasks/setup.rb file for the various options that can be
# configured in this Rakefile. The .rake files in the tasks directory
# are where the options are used.

begin
  require 'bones'
  Bones.setup
rescue LoadError
  begin
    load 'tasks/setup.rb'
  rescue LoadError
    raise RuntimeError, '### please install the "bones" gem ###'
  end
end

ensure_in_path 'lib'
require 'vienna'

task :default => 'spec:run'

PROJ.name = 'vienna'
PROJ.authors = 'Adam Beynon'
PROJ.email = 'adam@adambeynon.com'
PROJ.url = 'http://www.adambeynon.com'
PROJ.version = Vienna::VERSION
PROJ.rubyforge.name = 'vienna'

PROJ.spec.opts << '--color'

PROJ.ignore_file = '.gitignore'

# EOF
