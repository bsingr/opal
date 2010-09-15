Opal: Ruby compiler/runtime for the browser
=============================================

### NOTE: opal has been renamed from vienna. Any reference to vienna in any part of the documentation should be ignored (fixing references soon).

Opal is the runtime/standard lib for ruby in the browser.

Installing
-----------

    # Insall gem from gemcutter/rubygems
    sudo gem install opal

Trying out
----------
To make a test project, use the following command where project_name is the name of the project to use.

    # make the project
    opal new project_name
    # jump into the project
    cd project_name

If you look at the generated project, the html file includes a non existant javascript file. This will be where your project is built to. Also, in the lib folder there is a .rb file with the same name as your project with a simple puts command. Build the project:

    opal build
    
The javascript file is now there, with all the opal runtime, core libraries and browser libs built in. Opal the file with a web browser and check the console:

    "running project_name"

To avoid the need to rebuild every time, opal comes with a server command that wraps your project and rebuilds every time index.html is reloaded (i.e. every time you reload the page). To run with a server, use the following:

    opal server
    
And open your browser to `127.0.0.1:3030`.

Next steps
----------

Opal has many of the libraries built. Check out the documentation (more coming soon), ask me questions on freenode (adambeynon): usually in #ruby, #ruby-lang, #javascript etc, or email me: adam.beynon@me.com.

Command line tools / v8
-----------------------

I am playing with experimental support for therubyracer. Essentially, this gem allows you to embed the v8 javascript engine into ruby applications. Vienna has support for this allowing, firstly, a REPL system for trying out commands, but more importantly/interestingly, can run an entire opal application through the engine. The compilation step is not necessary as ruby files are compiled as they are required. For now, all specs are by default run through this system. Node, *nix (unix/linux) only, no windows support for opal command line.
