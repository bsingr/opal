Opalite
=======

Ruby build tools for opal. Runs on any ruby engine, but requires access to opal
compiler. It is used to build opal ready for web browsers, so all code is pre
processed into javascript etc from gem-specs in JSON format. 

It is THE build tool for deploying ruby to web browsers.

Opalite: impure opal. (impure ruby for the web).

How it works/What it does
=========================

Generally, uses the .gemspec file for each gem/opal project to build into the
gem_name.opal file. 
The gemspec is used to list which files are needed etc. Also, dependencies can
be used if they should be built in. Default is just to build stand alone opalite
file which does not include dependencies. "stand alone".

Also, smaller tasks can exist which allow building simple lib files (from the
main lib dir) for smaller scale builds. For example, this is how the opal core
libs are built ready.

Output
======

Each output file is located within the opal_name-1.0.0.opal/ directory (by default) from the base of the gem. The generated files include:

* opal_name-1.0.0.js - opalite with all code etc in JSON format (wrapped)
* opal_name-1.0.0-test.js - all test files (taken from gemspec)
* opal_name-1.0.0-resources.js - all resources (images) in w3c datauri format
* opal_name-1.0.0-resources-mhtml.js - all resources in mhtml (ie7) format

Minimisation is off by default for generated Javascript, so once minimised (an 
optional step), it is up to the developer to pass minimise flag as appropriate.
