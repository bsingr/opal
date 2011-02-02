// @class Element
//
// Top level Element class
rb_cElement = null;

// Creates a new element of the specified type
//
// @example
//
//    a = Element.new :div
//    # => #<Element :div>
//
// @param [String, Symbol] type the tag name for the Element to have
// @param [Hash] options a set of options to {#set}
// @return [Element] returns the receiver
var element_initialize = function(elem, type, options) {
  type || (type = 'div');
  elem.$element = document.createElement(CALL(type, 'to_s'));
};

// Returns the tag name of the element as a string, in lower case.
//
// @example HTML
//
//    <div id = "my_div"></div>
//
// @example Ruby
//
//    Document[:my_div].tag
//    # => 'div'
//
// @return [String] tag name
var element_tag = function(elem) {
  return elem.$element.tagName.toLowerCase();
};

// Inspect the element
var element_inspect = function(elem) {
  var description = '#<Element ' + element_tag(elem);

  description += '>';
  return description;
};

var Init_Element = function() {
  rb_cElement = rb_define_class('Element', rb_cObject);

  rb_define_method(rb_cElement, 'initialize', element_initialize);
  rb_define_method(rb_cElement, 'inspect', element_inspect);
};

