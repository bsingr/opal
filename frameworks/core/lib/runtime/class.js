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
    // console.log(name);
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
  

});

Object.extend(Class.prototype, Object.VNCoreMethods);
