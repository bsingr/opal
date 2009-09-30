/* 
 * class.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
 // Object
Object.extend = function(target, props) {
 for (var key in props) {
   target[key] = props[key];
 }
 return target;
};

/*
  Basic Object
*/
var BasicObject = function() {
  return this ;
};

BasicObject.prototype.initialize = function() {
  console.log('Initializing basic object');
  return this;
};

BasicObject.prototype.klass = BasicObject;
BasicObject.prototype.superklass = BasicObject;

/**
  var Animal = new Class('Animal', superKlass, { ... });
  
*/
var Class = function() {
  return this.initialize.apply(this, arguments);
};

Object.extend(Class.prototype, {
  
  initialize: function(name, superklass, props) {

    // If we pass in a name, use it. otherwise move other args to suit.
    if (typeof name === 'string') {
      this.__classid__ = this.displayName = name ;
    }
    else {
      this.__classid__ = this.displayName = '' ;
      props = superklass;
      superklass = name;
    }

    var klass = function() {
      return this.initialize.apply(this, arguments);
    };
    
    // Copy all Class (this) methods into the new class
    for (var key in this) {
      klass[key] = this[key];
    }
    
    // Setup the constructor for the new class
    klass.klass = klass.constructor = this.klass ;

    // If we do not pass in a superclass, set BasicObject as the super
    if (typeof superklass !== 'function') {
      props = superklass;
      superklass = BasicObject;
    }
    
    // Inherit from superclass
    klass.inherit(superklass);
    // Add the given properties
    klass.extend(props);
    
    return klass;
  },
  
  /*
    One time call only - overrides prototype
  */
  inherit: function(klass) {
    this.superklass = klass ;
    
    // Copy all super's methods without initialzing new object
    var bridge = function() { } ;
    bridge.prototype = klass.prototype;
    this.prototype = new bridge();
    this.prototype.klass = this.prototype.constructor = this;
  },
  
  // Include a module
  include: function() {
    
  },
  
  /**
    Extend usign an object that holds class, prototype and special meta methods
    
    Properties
    ==========

    Properties should be added, with some special cases:

    1. Constants
    ------------
    Any prop starting with a capital letter should be seen as a constant: a value,
    module, or class. Therefore they should be added to the prototype, as well as
    the class, so both meta and instance methods can reference the values by the
    this.Constant syntax.

    2. Class methods
    ----------------
    Class methods are defined within the 'self' property, which itself contains an
    object of class method names to the relevant functions. These should each be 
    added to the class, and not the prototype.

    3. attrReader, attrWriter, attrAccessor
    ---------------------------------------
    Each of these takes a string, or array of property names that should have
    their relevanr methods automatically generated.

    4. setKeyName
    -------------
    Any method of this name should have the actual function redefined in the form
    $setKeyName. the setKeyName method will be custom defined to call this method,
    but also to call this.didChangeValueForKey() to allow for automatic KVO calls.

    5. Instance variables
    ---------------------
    All instance varibales should be anmed starting with a '$' to avoid name clashes
    with getter functions, for example : 

      - Ivar name:  this.$bob
      - Getter:     this.bob()
      - Setter:     this.setBob(val);

    6. Include
    ----------
    Includes a module into the Class.
  */
  extend: function(props) {
    // Catch any class methods
    if (props.hasOwnProperty('self')) {
      console.log('Class methods!');
      delete props.self;
    }
    
    console.log('instance methods:');
    
    for (var prop in props) {
      var result;
      
      // Constant name: starts with capital letter, followed by lower, supper, under
      if (result = prop.match(/^[A-Z][a-zA-Z_]*/)) {
        console.log('Found constant: ' + result[0]);
        this[prop] = props[prop];
        this.prototype[prop] = props[prop];
      }
      
      // Meta-programming call
      if (result = prop.match(/^\$([A-Za-z_]*)/)) {
        console.log('Found meta: ' + result[1]);
        // here we need to call the class method (result[1]) using the value in
        // props[prop] as the parameter (could be an array, string, number, func)
        // ... doesnt really matter. just apply/call it to the class method.
      }
      
      // set attribute
      if (result = prop.match(/^set([A-Za-z_]*)/)) {
        console.log('Found set statement: ' + result[1]);
        // Here we must use our own setter method to call original. E.g. mathcing
        // 'setWidth', we output:
        // 
        //   setWidth: function(val) {
        //      this.willChangeValueForKey(width);
        //      this._$setWidth(val);
        //      this.didChangeValueForKey(width);
        //   };
        // 
        //   _$setWidth: function(val) {
        //      .. original implementation goes here..
        //   };
        // This forms the basis of automatic KVO/KVC compliancy
        
        // TODO: Should this be made into a custom class method???? We might
        // want different uses: for example, Views might need to also call
        // setNeedsDisplay() for some setter methods....
        // Also, non 'vienna' classes will not have/need KVO, so we shouldnt
        // really call (will/did)ChnageValueForKey
        // 
        // Class.addSetterMethod(key, setter)
        // 
        var methodBody = 'this.willChangeValueForKey("' + result[1] + '");';
        methodBody += 'this._$' + result[0] + '(val);';
        methodBody += 'this.didChangeValueForKey("' + result[1] + '");';
        this.prototype[prop] = new Function('val', methodBody);
        // 'private hidden method of actual content
        this.prototype['_$' + result[0]] = props[prop];
      }
      
      // otherwise: we have a regular instance method
      // this.prototype[prop] = props[prop];
      // console.log(prop.substr(0, 3));
    }
  }
});




/*
  Testing
  
*/


var Adam = new Class('Adam', {
    
  self: {
    version: function() {
      return 1.0;
    },
  },
    
  $attrAccessor: ['width', 'height'],
  
  BOB: 10,
    
	initialize: function() {
		console.log(10);
		return this;
	},
	
	log: function() {
	  console.log(10);
	},
	
	setAge: function(age) {
	  console.log(293);
	},
});

var Ben = new Class('Ben', Adam, {});
