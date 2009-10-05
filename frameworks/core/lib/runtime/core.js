// 
//  core.js
//  vienna
//  
//  Created by Adam Beynon on 2009-10-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

Object.VNCoreMethods = {
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
    this.prototype.superklass = this.superklass;
  },
  
  allocate: function() {
    var bridge = function() { } ;
    bridge.prototype = this.prototype;
    return new bridge();
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
        // this[prop] = props[prop];
        //         this.prototype[prop] = props[prop];
        this.setConst(prop, props[prop]);
      }
      
      else if(result = prop.match(/^\$([A-Za-z_]*)/)) {
        // Class/self level function
        this[result[1]] = props[prop];
      }
      
      else if(typeof props[prop] != 'function') {
        // Meta-programming call
        // console.log('Found meta: ' + prop);
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
        // this.prototype[prop] = props[prop];
        this.prototype[prop] = 
          (this.superklass && typeof this.superklass.prototype[prop] == 'function') ?
                                (function(name, func) {
                                  return function() {
                                    // console.log('Doing this ' + name);
                                    // console.log(func);
                                    // console.log(this);
                                    var tmp = this.callSuper;
                                    this.callSuper = this.superklass.prototype[name];
                                    var ret = func.apply(this, arguments);
                                    this.callSuper = tmp;
                                    return ret;
                                  };
                                })(prop, props[prop])
                                : props[prop];
      }
    }
    return this;
  },
  
  create: function() {
    // return this.allocate().initialize.apply(this, argu)
    // var obj = this allocate();
    var C = this;
    var obj = C.allocate();
    obj.initialize.apply(obj, arguments);
    return obj;
  },
  
  /*
    Sets a constant on both the class, and its prototype
  */
  setConst: function(name, val) {
    // If its a class/module, without a name, then we can use this name param to
    // set it (makes for smaller coding and repetitivve class namign)
    if (val.__classid__ != undefined && !val.__classid__) {
      // if (!val.__classid__) {
        // console.log(name);
        val.__classid__ = name
      // }
    }
    
    this[name] = val ;
    this.prototype[name] = val;
  },
  
  getConst: function(name) {
    return this[name];
  }
};
