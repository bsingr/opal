require 'foundation'
require 'app_kit'

# loads all vienna stuff
require 'vienna'
require 'app_controller'
require 'geometry'
# require 'ruby_testing'

# inline javascript/objective-j:
`
function main(args, named_args) {
  return CPApplicationMain(args, named_args);
}
`