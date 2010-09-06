vienna: Ruby compiler/runtime for the browser
=============================================

Opal is the runtime/standard lib for ruby in the browser.

Installing
-----------

    # Insall gem from gemcutter/rubygems
    sudo gem install vienna

Trying out
----------
Vienna uses Opalfiles (similar to Rakefiles) to control building of "projects". For simple applications, these are not needed. Simply create a project dir like
as follows:

    # our project will be called browser_test
    mkdir browser_test
    cd browser_test

By default, all ruby files should then be placed within a lib folder inside our project root. Also, the default file to load will be named the same as the project. All these defaults can be customised using an Opalfile for configuration. The directory structure should look like the following:

    browser_test/
      index.html
      lib/
        browser_test.rb

To try out a simple example, add the following line to browser_test.rb:
  
    # print out a simple message to the console (safari, ff, chrome ie8 etc)
    puts "running ruby in the browser!"

To build the "project", simply invoke vn-build in the terminal, in the root of
your project. Again, the default action is to build the results to a javascripts directory with a file of the same name as the project. This will therefore generate a javascripts/browser_test.js file which you should add to your index.html file, to look like the following:
    
    <!DOCTYPE html>
    <html>
      <head>
        <script src="javascripts/browser_test.js"></script>
      </head>
    </html>
    
Open the index.html file in your browser, and check the console.

Look through demos/ and doc/ for more examples. More documentation coming soon.
