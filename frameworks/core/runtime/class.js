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
  
  -
  
  
*/
var Class = function() {
  return this.initialize.apply(this, arguments);
};

Object.extend(Class.prototype, {
  
  initialize: function(name, superKlass, props) {

    // If we pass in a name, use it. otherwise move other args to suit.
    if (typeof name === 'string') {
      this.__classid__ = this.displayName = name ;
    }
    else {
      this.__classid__ = this.displayName = '' ;
      props = superKlass;
      superKlass = name;
    }

    var klass = function() {
      return this.initialize.apply(this, arguments);
    };
    // extend `this` into klass
    Object.extend(klass, this);


    klass.klass = klass.constructor = this.klass ;

    // If we do not pass in a superclass, set BasicObject as the super
    if (!typeof superKlass === 'function') {
      props = superKlass;
      superKlass = BasicObject;
    }
    
    klass.inherit(parent);
    // klass.include(methods, false);
    console.log(props);
    console.log(superKlass);
    Object.extend(klass.prototype, props);
    
    // klass.resolve();
    
    return klass;
  },
  
  inherit: function(klass) {
    
  },
  
  include: function() {
    
  }
});


