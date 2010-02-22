
# Implementation (small subset) of rspec for opal for testing on client side 
# browser.

Dir[File.join(File.dirname(__FILE__),'spec','**/*.rb')].each { |rb| require rb }
