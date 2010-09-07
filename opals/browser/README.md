# Browser

## Getting Started

To build/run a browser project, you only require two files: the html file used to load the ruby, and a ruby source file with your application code. By default the build tools will look in a `lib/` directory for your sources, so for simplicity sakes we will use that directory for our code. Also, by default the base-name for the directory is used for loading the main ruby file.

### Project Directory Structure

Create the following files/directories for our "browser_test" project:

    !!!plain
    browser_test/
      index.html
      lib/
        browser_test.rb

With the new fresh project, the build tools need to be run in the project root, so jump into the browser_test directory.

    !!!plain
    cd path/to/browser_test

### HTML file

Out html file simply needs to require the resulting javascript file from our build tools, which (by default) has the same name as our project, so edit index.html to contain the following simple HTML5 document.
    
    !!!plain
    <!DOCTYPE html>
    <html>
      <head>
        <script src="javascripts/browser_test.js"></script>
      </head>
    </html>

### Hello, World!

For a very simple program, "Hello world" seems appropriate. Change the contents of the browser_test.rb file to the following:

    puts "Hello, World!"
    
This, of course, is very simple ruby. We now need to use the build tools to build the project. This is simply done by running the following command in our root directory:

    !!!plain
    vn-build

The build tool will then generate our `javascripts/browser_test.js` file, which is loaded by our HTML document in the browser. Our generated javascript file also contains the runtime needed (which includes the ruby implementation, the core library, and the browser opal).

In any browser with a console (Firefox, Chrome, Safari, IE8 etc), open the HTML document and you will see the message in the console output:

    "Hello, World!"
    
## Browser API

### Document

The `Document` module represents the common `document` object in javascript. Its functionality is extended beyond the javascript offering to add common features found in javascript frameworks.

#### Document.ready?

Ruby code in opal begins running as soon as the source file downloads. This may mean that the document is not yet ready to be manipulated. This method takes a block (or many blocks) that will be executed when the document is ready. Placing code in here ensures that it will not be run before the document can be manipulated, which is sure to yield errors. Place the following code in the browser_test.rb file.

    puts "this should run first"
    
    Document.ready? do
      puts "this should run third"
    end
    
    puts "this should run second"

Rebuild the project (`vn-build`) and refresh the html page in your browser. You should observe the console results in the following order:

    "this should run first"
    "this should run second"
    "this should run third"
    
The puts statement in the block runs third because it is only then that the document is ready. Placing DOM manipulation code, or event handlers inside this `ready?` statement is recommended.

`Document#ready?` can also be called without a block, which simply returns a boolean whether the document is now ready or not.

    Document.ready?   # => false
    
    Document.ready? do
      Document.ready? # => true
    end
    
    Document.ready?   # => false
    
#### Document.[]

This method is used for searching for selectors in the DOM. Every {Element} instance has a `[]` method, which uses itself as the context. For the document, the document itself is the context. This method takes either a string or symbol. In the case of a symbol, the document is searched for an element whose id matches the symbol name, or `nil` if an element with that id cannot be found.
    
    !!!plain
    <div id="foo"></div>
    <div id="bar"></div>
    
The above example would produce the following results:

    Document[:foo]
    # => #<Element div, id="foo">
    
    Document [:baz]
    # => nil

The returned element is an instance of the {Element} class.

## Implementation

This section discusses the low level implementation details for dealing with the opal runtime. Every class in the browser opal uses pure opal class instances and object instances. No native objects (elements, xmlhttprequests) are accessible from the ruby. Due to cross browser differences, relying on adding opal methods to these natives causes issues, so all references to object's native counterparts are stored purely as an instance variable on the ruby object, so that no addition properties can affect different browser implementations.

### Document

The {Document} module has a private instance variable called `__element__` which points to the javascript `document` object.

### Window

The {Window} module also has a private instance variable called `__element__` which point to the native `window` object.

### Element

Every {Element} instance has a private instance variable called `__element__` which points to the native javascript element that this ruby object represents. To create an {Element} instance with a native element, the class method {Element.from_native} is used, and the native element is passed as a parameter. The result is an instance, with the element set as the private `__element__` variable.

### Event

Every {Event} instance wraps a native event with a private variable `__event__`. To create an Opal event from a native event, the {Event.from_native} method should be used, which returns a new instance of the {Event} class.

