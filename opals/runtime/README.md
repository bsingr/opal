# Opal

Opal comprises of the actual ruby runtime, as well as all the core libraries that are default in ruby. This includes the usual {Array}, {String}, {Proc}, {Hash} classes etc. 

## Spec

Opal also has some (of the many!) specs from RSpec in it's `spec/` directory. Opal attempts to be as sytactially compatible with ruby as possible, so uses the very same specs as vanilla ruby does so completeness can be determined. The specs are accessible from this documentation at [spec/index.html](spec/index.html). This is not the result of the specs, as instead the specs are run in the browser on demand. What you will see is the ruby specs being run within the browser itself, and the results output directly. This also helps determine any errors that happen to be browser specific.

## Debugging

Opal, when built in debug mode, contains some useful tools for debugging applications including stack traces and method missing errors.
See {file:docs/debugging.md debugging documentation} for more.