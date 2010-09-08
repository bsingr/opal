vienna: Ruby compiler/runtime for the browser
=============================================

Opal is the runtime/standard lib for ruby in the browser.

Installing
-----------

    # Insall gem from gemcutter/rubygems
    sudo gem install vienna

Trying out
----------
To make a test project, use the following command where project_name is the name of the project to use.

    # make the project
    vn-gen project_name
    # jump into the project
    cd project_name

If you look at the generated project, the html file includes a non existant javascript file. This will be where your project is built to. Also, in the lib folder there is a .rb file with the same name as your project with a simple puts command. Build the project:

    vn-build
    
The javascript file is now there, with all the opal runtime, core libraries and browser libs built in. Opal the file with a web browser and check the console:

    "running project_name"
    
Next steps
----------

Opal has many of the libraries built. Check out the documentation (more coming soon), ask me questions on freenode (adambeynon): usually in #ruby, #ruby-lang, #javascript etc, or email me: adam.beynon@me.com.

