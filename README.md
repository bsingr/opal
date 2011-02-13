Opal
====

Ruby implementation on commonjs

Currently works directly on node, and a custom browser implementation

Node
====

Installation
------------

Once opal reaches 0.1.0, it will be added to npm. For now just clone
from github and hack away.

    git clone git://github.com/adambeynon/opal.git

Usage
-----

For now, start up the REPL as following, and use as any regular ruby:

    node bin/opal

Browser
=======

For the browser demo, open index.html from extras/ and start playing with the ruby code in the script tags.

opal.js
-------
Opal runtime. This does not include any DOM interaction libraries.

opal_dev.js
-----------
Opal development tools; compiler, parser, generator etc. This is needed for evaluating ruby code in script tags.

rquery.js
----------
A ruby DOM library that wraps jquery.

opalspec.js
-----------
An RSpec clone for opal; currently used for testing core opal library and DOM interaction library in both node and in browser.

