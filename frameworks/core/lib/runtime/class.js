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

var Class = function() {
  return this.initialize.apply(this, arguments);
};

Object.extend(Class.prototype, {
  
  initialize: function(name, superklass, props) {
    console.log(name);
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
      this.initialize.apply(this, arguments);
    };
    
     // Copy all Class (this) methods into the new class
      for (var key in this) {
        klass[key] = this[key];
      }
    
    // If we do not pass in a superclass, set BasicObject as the super
    if (typeof superklass !== 'function') {
      props = superklass;
      superklass = BasicObject;
    }
    
    // Inherit from superclass
    klass.inherit(superklass);
    
    
   
    
    // Setup the constructor for the new class
    klass.klass = klass.constructor = this.klass ;
    
    // Add the given properties
    klass.extend(props);
    
    return klass;
  },
  
  /*
    One time call only - overrides prototype
  */
  inherit: function(klass) {
    // class methods
    for (var prop in klass) {
      this[prop] = klass[prop];
    }
    
    this.superklass = klass ;
    
    // Copy all super's methods without initialzing new object - prototype
    var bridge = function() { } ;
    bridge.prototype = klass.prototype;
    this.prototype = new bridge();
    this.prototype.klass = this.prototype.constructor = this;
  },
  
  // Include a module
  include: function() {
    
  },
  
  /**
    When defining/extending a class, the following lists, in catch order, how
    statements/names are intepreted by Vienna's class definition
    
    1. Constants
    ============
    Constants are any name where the first letter is a capital letter. Constants
    are added to the Class level scope, as well as the prototype level scope. 
    The unique use of a starting Capital letter, to match class definitons, will
    ensure that the name does not clash on either Class or instance levels.
    
    2. Class method
    ===============
    Start with $ for a class method (like self.name in ruby)
    
    3. Meta-programming hook
    ========================
    If not constant, then all non methods are metaProgramming hooks.
    
    4. KeyValueCoding 'set' methods
    ===============================
    Special kind of meta programming
    
    5. Everything else: Instance methods
    ====================================
    Everything else is a method .. cannot have 'default variables' in Vienna
    classes, for good reason. these should be setup on initialize.
    
     - Instance/class methods = $variableName.
    
  */
  extend: function(props) {
    var result;
    for (var prop in props) {    
      
      if (result = prop.match(/^[A-Z][a-zA-Z_]*/)) {
        // Constant name: starts with capital letter, followed by lower, supper, under
        this[prop] = props[prop];
        this.prototype[prop] = props[prop];
      }
      
      else if(result = prop.match(/^\$([A-Za-z_]*)/)) {
        // Class/self level function
        this[result[1]] = props[prop];
      }
      
      else if(typeof props[prop] != 'function') {
        // Meta-programming call
        console.log('Found meta: ' + prop);
        if (props[prop] instanceof Array) {
          this[prop].apply(this, props[prop]);
        }
        else {
          this[prop].call(this, props[prop]);
        }
      }
      
      else if (result = prop.match(/^set([A-Za-z_]*)/)) {
        // set attribute - KVO/KVC compliance catch
        this.addSetterMethod(result[1], result[0], props[prop]);
      }
      
      else {
        // Else: regular instance method
        this.prototype[prop] = props[prop];
      }
    }
  }
});