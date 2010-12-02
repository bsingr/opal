# -*- encoding: utf-8 -*-

$LOAD_PATH.unshift File.expand_path("../lib", __FILE__)
require "vienna/version"

puts "vienna version is: #{Vienna::VERSION}"
 
Gem::Specification.new do |s|
  s.name        = "vienna"
  s.version     = "0.1.0"
  s.authors     = ["Adam Beynon"]
  s.email       = ["adam@adambeynon.com"]
  s.homepage    = "http://github.com/adambeynon/opal"
  s.summary     = "Vienna metagem"
  s.description = "Vienna metagem encapsulates all subprojects into one" 
end
