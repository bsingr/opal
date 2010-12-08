# -*- encoding: utf-8 -*-
 
Gem::Specification.new do |s|
  s.name          = "browser"
  s.version       = "0.1.0"
  s.authors       = ["Adam Beynon"]
  s.email         = ["adam@adambeynon.com"]
  s.homepage      = "http://github.com/adambeynon/opal"
  s.summary       = "Browser gem"
  s.description   = "Browser lib for DOM manipulations for opal environment" 
  
  s.files         = Dir['lib/**/*.*']
  s.test_files    = Dir['spec/**/*.rb']
  s.require_path  = 'lib'
  s.executables   = []
end
