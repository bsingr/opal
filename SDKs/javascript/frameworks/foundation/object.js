/* 
 * object.js
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

include('runtime/runtime');

/**
    Root object constructor
*/
var NSObject = function() {
    return this;
};

Function.prototype.property = function(key) {
    this._kvc_property = key;
    return this;
};

Object.extend(NSObject, {
    
    superclass: null,
   
    /**
        For creating subclasses of any class that inherits from the root object
        (NSObject). 
    */
    extend: function(props) {

        var _super = this.prototype;

        // constructor
        var ret = function() {
            return this;
        };

        // class methods
        for (var prop in this) {
            ret[prop] = this[prop];
        }
        
        // superclass
        ret.superclass = this;
        
        // firstly inherit ALL superclass' prototpe
        var base = (ret.prototype = new this());
        
        // copy in new props (might over-ride existing ones)
        for (var prop in props) {
            if(props[prop] && props[prop] instanceof Function) {
                if (props[prop]._kvc_property) {
                    console.log('_kvc_property:' + props[prop]._kvc_property);
                }
            }
            // if (props[prop].age) {
                // console.log('yesh');
            // }
            // throw "something";
            base[prop] = (typeof props[prop] == "function" && 
                typeof _super[prop] == "function") ? 
                (function(name, func) {
                    return function() {
                        var tmp = this._super;
                        this._super = _super[name];
                        var ret = func.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                    
                })(prop, props[prop])
                : props[prop];
        }
            
        base.constructor = ret;
        
        return ret;
    },
   
    /**
        Creates a new instance of the class (like new myObj())
    */
    create: function() {
        var C = this;
        return new C()._init(arguments);
    },
    
    /**
        Adds the given properties/functions to the prototype of the object. Use
        Class.extend(theClass, { ... }) for extending Class methods
    */
    mixin: function(props) {
        Object.extend(this.prototype, props);
    },

	/*
		A "nice" way to define protocols. Doesnt do anything but return the 
		class. Nothing is added to the class. The methods defined for the
		protocol should have empty implementations as they are only used as
		reference within the code. For example:
		
		{{{
			var NSTableDelegate = NSObject.protocol({
				numberOfRowsInTable: function(...) {	
				},
				...
			});
		}}}
		
		If you want default implementations, NSObject.mixin is better suited,
		which can then be overridden as desired.
	*/
	protocol: function(props) {
		return this;
	}
});

/**
    Base class instance methods/properties. Create with:
    
    {{{
        NSObject.create();
    }}}
*/
NSObject.mixin({
    
    /**
        This is invoked when the object instance is created. This basically
        calls init() on the class unless a custom initializer is specified
        when .create() is called. For example, the initWithCoder() function
        is called, with aCoder as a parameter, in the following snipppet.
        
        {{{
            NSObject.create('initWithCoder', aCoder);
        }}}
        
        The custom initializer name MUST always be as a string, as the names
        may not be registered as global variables. To create an object using
        the regular init() function, use:
        
        {{{
            NSObject.create();
        }}}
        
        ... esentially, just use no arguments.
    */
    _init: function() {
        
        var args = [];
        
        for (var idx = 0; idx < arguments[0].length; idx++) {
            args.push(arguments[0][idx]);
        }
        
        if (args.length == 0) {
            return this.init.apply(this, args);
        } 
        else {
            if (typeof this[args[0]] == "function") {
                return this[args[0]].apply(this, args.slice(1));
            }
            else {
                console.log("Undefined initializer: " +  arguments[0]);
                return this.init.apply(this, arguments);
            }
        }
    },
    
    init: function() {
        return this;
    },
    
    /**
        Returns true if aName is a callable method name. This is similar to
        respondsToSelector:
    */
    respondsTo: function(aName) {
        return (this[aName] && (typeof this[aName] == 'function')) ? true : false;
    },
    
    perform: function(aFunctionName, withObject, anotherObject) {
        if (this.respondsTo(aFunctionName))
            return this[aFunctionName](withObject, anotherObject);
        else
            return null;
    }
});
