Opal
====

Ruby implementation on commonjs

Currently works directly on node, and a custom browser implementation

Node
====

Installation
------------

Opal can be installed from npm:

    npm install opal

Usage
-----

For now, start up the REPL as following, and use as any regular ruby:

    opal

Browser
=======

For the browser demo, open index.html from extras/ and start playing with the ruby code in the script tags.

opal.js
-------
Opal runtime. This does not include any DOM interaction libraries.

opal_dev.js
-----------
Opal development tools; compiler, parser, generator etc. This is needed for evaluating ruby code in script tags.

opalite.js
----------
The default opal DOM interaction library

opalspec.js
-----------
An RSpec clone for opal; currently used for testing core opal library and DOM interaction library in both node and in browser.

