require 'opalspec/matchers'
require 'opalspec/expectations'
require 'opalspec/example'
require 'opalspec/runner'
require 'opalspec/dsl'

Dir.glob(File.join(Dir.getwd, 'opals/opalruby/spec/**/array_spec.rb')).each do |rb|
  # `console.log("requiring: " + rb)`
  puts "requiring #{rb}"
  require rb
end

Spec::Runner.run