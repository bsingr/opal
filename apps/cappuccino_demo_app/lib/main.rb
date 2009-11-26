require 'foundation'
require 'app_kit'

# loads all vienna stuff
require 'vienna'
require 'app_controller'

# inline javascript/objective-j:
`
function main(args, named_args) {
  return CPApplicationMain(args, named_args);
}
`