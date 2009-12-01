require 'foundation'
require 'app_kit'
# 
# # loads all vienna stuff
require 'vienna'
# # actual vn module (will be inside vienna module once we add support for framework compiling)
require 'vn/vienna'
# 
require 'app_controller'

# inline javascript/objective-j:
`
function main(args, named_args) {
  return CPApplicationMain(args, named_args);
}
`


# custom do
#   10
# end
