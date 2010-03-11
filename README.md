vienna: Ruby compiler/runtime for the browser
=============================================

Opal is the runtime/standard lib for ruby in the browser.

Installing
-----------

    # Insall gem from gemcutter
    sudo gem install vienna

Opal Specs
----------

One of the libs contained in Opal is a port of RSpec. To view the bundled specs,
go [here](http://opalscript.org/opal_spec/opal_spec.html "here"). All specs will
be run within your current browser, and you notice all results are the same,
cross browser (ie6+). Some tests do fail, and these are planned to be fixed for
the next release.

Opal Documentation
------------------

Documentation will be updated and bulked up in the coming days. For current documentation: [go here](http://opalscript.org/opal_docs/index.html "go here")
	
Creating a project
------------------

    vienna generate my_app_name

This will create a directory with the given name and a template to get started.

Building
--------

    # In root directory of project
    rake build

Then open index.html
