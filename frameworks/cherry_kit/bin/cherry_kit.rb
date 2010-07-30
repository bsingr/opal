puts "running in bin!"

require 'cherry_kit'

require File.join(Dir.getwd, 'lib', 'app_controller')

# Run the application! Make the App object, create an instance of the user's
# application controller and set it as the delegate, and then "run baby run!"
app = CherryKit::Application.new
app.delegate = AppController.new
app.run
