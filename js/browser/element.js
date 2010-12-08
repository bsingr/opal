/**
  Represents a DOM element in the browser.

  ## Implementation Details

  Native Elements are not extended due to cross browser issues. Instead, 
  instances of this class will have an instance variable '@element' which
  is the native javascript element. Extensions to this class should access
  the element in this way for modification etc. In future, this class will
  cache some information on the element, such as class name etc in an aim to
  speed up performance by reducing hits to the DOM.
*/
var rb_cElement;

/**
  Return an instance with the passed native element as the instance's own
  element. This is used to return the body element, for instance

    Element.from_native(..some native element pointer..)
    # => element

  @note The given element MUST be a Javascript element, not an Opal one.

  @param [NativeElement] element
  @return [Element]
*/
function elem_from_native(native_element) {
  var elm = rb_obj_alloc(rb_cElement);
  elm.$element = native_element;
  return elm;
}

/**
  Creates a new element of the specified type.

  @param [Symbol, String] type the tag name for the +Element+ to have
  @param [Hash] options a set of options given to {#set}
  @return [Element] returns the new element
*/
function elem_initialize(self, mid, type, options) {
  if (type) {
    TO_STRING(type)
  } else {
    type = "div";
  }
  self.$element = document.createElement(type);
  // need to deal with options
}

function elem_inspect(elem, mid) {
  ARG_COUNT(0)
  
  var description = ["#<Element " + rb_call(elem, "tag") + ">"];
  // class
  // id
  return description.join("");
}

/**
  Returns the tag name of the Element as a symbol, in lower case.

  @example HTML
      <div id="my_div"></div>

  @example Ruby
      Document[:my_div].tag
      # => :div

  @return [Symbol] tag name of the element
*/
function elem_tag(elem, mid) {
  ARG_COUNT(0)
  return elem.$element.tagName.toLowerCase();
}

/**
  Sets the innerHTML of the receiver.

  @example HTML
      <div id="foo"></foo>

  @example Ruby
      Document[:foo].html = "<div></div>"

  @example Result
      <div id="foo">
        <div></div>
      </div>

  @param [String] html the html string to set
  @return [Elements] returns the receiver
*/
function elem_html_e(elem, mid, html) {
  ARG_COUNT(1)
  TO_STRING(html)
  elem.$element.innerHTML = html;
  return elem;
}

function Init_Element() {
  rb_cElement = rb_define_class("Element", rb_cObject);
  rb_define_method(rb_cElement, "initialize", elem_initialize);
  rb_define_method(rb_cElement, "inspect", elem_inspect);
  rb_define_method(rb_cElement, "tag", elem_tag);
  
  rb_define_method(rb_cElement, "html=", elem_html_e);
}
