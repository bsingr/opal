# RQuery is a DOM interaction library for opal (ruby) built on top of jquery.
# JQuery (1.5) is bundled as part of RQuery, so the only external dependencies
# are opal.js, and opal_dev.js for in browser ruby evaluation (if required).
# 
# In the browser environment there is no need to require 'rquery' as it self
# loads to ensure its functionalities are immediately available. Trying to
# require it again will have no effect (so its safe to do).

require 'rquery/jquery'
require 'rquery/document'
require 'rquery/element'
require 'rquery/css'
require 'rquery/event'
require 'rquery/request'
require 'rquery/response'
require 'rquery/json'

