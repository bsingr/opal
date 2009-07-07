/* 
 * file.js
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


var __bootstrap_files = { };/* 
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

var Class = { };

/**
    Extends the object passed as the first parameter using the properties
    defined in the second argument.
*/
Object.extend = function() {

    var target = arguments[0] || { };
    var idx = 1;
    var len = arguments.length;
    var options;
    
    if (len == 1) {
        target = this;
        idx = 0;
    }
    
    for ( ; idx < len; idx++) {
        if (!(options = arguments[idx])) continue;
        for (var key in options) {
            target[key] = options[key];
        }
    }
    
    return target;
};

// var initializing = false,
// fnTest = /xyz/.test(function() {
//     xyz;
// }) ? /b_superb/: /.*/;
// // The base Class implementation (does nothing)
// this.Class = function() {};
// 
// // Create a new Class that inherits from this class
// Class.extend = function(prop) {
//     var _super = this.prototype;
// 
//     // Instantiate a base class (but only create the instance,
//     // don't run the init constructor)
//     initializing = true;
//     var prototype = new this();
//     initializing = false;
//     // Copy the properties over onto the new prototype
//     for (var name in prop) {
//         // Check if we're overwriting an existing function
//         prototype[name] = typeof prop[name] == "function" &&
//         typeof _super[name] == "function" && fnTest.test(prop[name]) ?
//         (function(name, fn) {
//             return function() {
//                 var tmp = this._super;
// 
//                 // Add a new ._super() method that is the same method
//                 // but on the super-class
//                 this._super = _super[name];
// 
// 
//                 // The method only need to be bound temporarily, so we
//                 // remove it when we're done executing
//                 var ret = fn.apply(this, arguments);
//                 this._super = tmp;
// 
//                 return ret;
//             };
//         })(name, prop[name]) :
//         prop[name];
//     }
// 
//     // The dummy class constructor
//     function Class() {
//         if (!initializing) {
//             if (arguments.length == 0) {
//                 this.init.apply(this, arguments);
//             }
//             else {
//                 var args = [],
//                 idx = 1;
//                 // first argument is the custom initializer, so from the 2nd
//                 // argument we want to apply to the initializer.
//                 for (; idx < arguments.length; idx++) {
//                     args.push(arguments[idx])
//                 }
//                 if (this[arguments[0]]) {
//                     this[arguments[0]].apply(this, args);
//                 }
//                 else {
//                     console.log(arguments[0] + " does not exist: " + arguments.length)
//                     console.log(args);
//                 }
//             }
//         }
//     }
// 
//     // Populate our constructed prototype object
//     Class.prototype = prototype;
// 
//     // Enforce the constructor to be what we expect
//     Class.constructor = Class;
// 
//     // And make this class extendable
//     Class.extend = arguments.callee;
// 
//     Class.create = function(args) {
//         return new this(args);
//     };
// 
//     return Class;
// };
// 
// 


// // Inspired by base2 and Prototype
//  (function() {
//     var initializing = false,
//     fnTest = /xyz/.test(function() {
//         xyz;
//     }) ? /b_superb/: /.*/;
//     // The base Class implementation (does nothing)
//     this.Class = function() {};
//
//     // Create a new Class that inherits from this class
//     Class.extend = function(prop) {
//         var _super = this.prototype;
//
//         // Instantiate a base class (but only create the instance,
//         // don't run the init constructor)
//         initializing = true;
//         var prototype = new this();
//         initializing = false;
//
//         // Copy the properties over onto the new prototype
//         for (var name in prop) {
//             // Check if we're overwriting an existing function
//             prototype[name] = typeof prop[name] == "function" &&
//             typeof _super[name] == "function" && fnTest.test(prop[name]) ?
//             (function(name, fn) {
//                 return function() {
//                     var tmp = this._super;
//
//                     // Add a new ._super() method that is the same method
//                     // but on the super-class
//                     this._super = _super[name];
//
//
//                     // The method only need to be bound temporarily, so we
//                     // remove it when we're done executing
//                     var ret = fn.apply(this, arguments);
//                     this._super = tmp;
//
//                     return ret;
//                 };
//             })(name, prop[name]) :
//             prop[name];
//         }
//
//         // The dummy class constructor
//         function Class() {
//             if (!initializing) {
//                 if (arguments.length == 0) {
//                     this.init.apply(this, arguments);
//                 }
//                 else {
//                     var args = [],
//                     idx = 1;
//                     // first argument is the custom initializer, so from the 2nd
//                     // argument we want to apply to the initializer.
//                     for (; idx < arguments.length; idx++) {
//                         args.push(arguments[idx])
//                     }
//                     this[arguments[0]].apply(this, args);
//                 }
//             }
//         }
//
//         // Populate our constructed prototype object
//         Class.prototype = prototype;
//
//         // Enforce the constructor to be what we expect
//         Class.constructor = Class;
//
//         // And make this class extendable
//         Class.extend = arguments.callee;
//
//         return Class;
//     };
// })();
/* 
 * resource.js
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
 
// an array of all bootstrap items. when length = 0, we can run main()
var __bootstrap_resources = [];

/**
    Used to specify a resource that needs to be loaded before the application is
    run. Only use this for essential resources: for example control images. The
    more resources required, the longer the application takes to load. If items
    are non essential, load them later as needed.
    
    Once all resources have been loaded, the main() function can then be called.
*/
function resource(aResource)
{
    var theImage = new Image();
    theImage.src = 'resources/' + aResource;
    theImage.onload = function() {
        __bootstrap_preloaded_resource(theImage);
    };
    __bootstrap_resources.push(theImage);
}

/**
    This is called when the given resource has finished loading. Essentially,
    when all resources are loaded, the application is ready to run. Therefore
    this function calls main(), and prefills the arguments as seen necessary.
*/
function __bootstrap_preloaded_resource(aResource)
{
    console.log('finished loading: ' + aResource.src);
    __bootstrap_resources.splice(__bootstrap_resources.indexOf(aResource), 1);
    
    if (__bootstrap_resources.length == 0) {
        main('', 0);
    }
}
/* 
 * runtime.js
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

var include = function include() { };

var YES = true;
var NO = false;

if (typeof console === 'undefined') {
    var console = console || window.console || { };
    console.log = console.info = console.warn = console.error = function() { };
}
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


/**
    Root object constructor
*/
var NSObject = function() {
    return this;
}

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
        return this[aName] ? true : false;
    },
    
    perform: function(aFunctionName, withObject, anotherObject) {
        this[aFunctionName](withObject, anotherObject);
    }
});
/* 
 * coder.js
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
 

var NSCoder = NSObject.extend({
    
});/* 
 * archiver.js
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


var NSInconsistentArchiveException = "NSInconsistentArchiveException";

var NSArchiver = NSCoder.extend({
   
    initForWritingWithMutableData: function(mdata) {
        
    },
    
    archiverData: function() {
        
    },
    
    encodeRootObject: function(rootObject) {
        
    },
    
    encodeConditionalObject: function(object) {
        
    },
    
    
    archivedDataWithRootObject:function(rootObject) {
        
    },
    
    archiveRootObject: function(rootObject, path) {
        
    }
});

var NSUnarchiver = NSCoder.extend({
    
   initForReadingWidthData: function(data) {
       
   },
   
   isAtEnd: function() {
       
   },
   
   unarchiveObjectWithData: function(data) {
       
   },
   
   unarchiveObjectWithFile: function(path) {
       
   },
   
   replaceObject: function(object, newObject) {
       
   }
});
/* 
 * array.js
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


var NSArray = {
    
    count: function() {
        return this.length;
    },
    
    objectAtIndex: function(index) {
        return this[index];
    },
    
    addObject: function(anObject) {
        this.push(anObject);
    },
    
    lastObject: function() {
        return this.objectAtIndex(this.length - 1);
    },
    
    removeLastObject: function() {
        this.pop();
    },
    
    initWithCoder: function(aCoder) {
        var newObjects = aCoder.decodeObjectForKey('NS.Objects');
        for (var idx = 0; idx < newObjects.length; idx++) {
            this.push(newObjects[idx]);
        }
        return this;
    },
    
    awakeAfterUsingCoder: function(aCoder) {
        return this;
    }
};

Object.extend(Array.prototype, NSArray);

NSArray.create = function() {
    return [];
}

var NSMutableArray = NSArray;
/* 
 * string.js
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


// NSString just mirrors native String object
var NSString = String;

Object.extend(NSString.prototype, {
	
	typeOf: function(aClass) {
		return aClass == NSString;
	},
	
	capitalizedString: function() {
        return this.charAt(0).toUpperCase() + this.substr(1);
	}
});
/* 
 * dictionary.js
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


var NSDictionary = NSObject.extend({
    
    _keys: null,
    
    _values: null,
    
    init: function() {
        this._keys = [];
        this._values = { };
        return this;
    },
    
    initWithCoder: function(aCoder) {
        
    },
    
    count: function() {
        return this._keys.length;
    },
    
    objectForKey: function(aKey) {
        return this._values[aKey];
    },
    
    keyEnumerator: function() {
        
    },
    
    allKeys: function() {
        
    },
    
    allKeysForObject: function(anObject) {
        
    },
    
    allValues: function() {
        
    },
    
    description: function() {
        
    },
    
    containsKey: function(aKey) {
        return this._values[aKey] ? true : false;
    },
    
    setObjectForKey: function(anObject, aKey) {
        
        if (!this._values[aKey]) {
            this._keys.push(aKey);
        }
        
        this._values[aKey] = anObject;
    }
});

/**
    @class NSMutableDictionary
    
    This is just for compatibility. NSDictionary and this are interchnageable
    in usage. This is not recomended for use.
*/
var NSMutableDictionary = NSDictionary;
/* 
 * attributed_string.js
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


var NSAttributedString = NSObject.extend({
   
	_string: null,
	_attributes: null,
	
    string: function() {
        return this._string;
    },
    
    attributesAtIndex: function(location, effectiveRange) {
        
    },
    
    length: function() {
        
    },
    
    attributeAtIndex: function(attrName, location, effectiveRange) {
        
    },
    
    attributedSubstringFromRange: function(string) {
        
    },
    
    isEqualToAttributedString: function(other) {
        
    },
    
    initWithString: function(aString) {
        this.init();
		this._string = new String(aString);
		this._attributes = NSDictionary.create();
		return this;
    },
    
    initWithStringAndAttributes: function(aString, attributes) {
        this.init();
        this._string = new String(aString);
        this._attributes = attributes;
        return this;
    },
    
    initWithAttributedString: function(attrString) {
        
    },
    
    replaceCharactersInRange: function(range, withString) {
        
    },
    
    setAttributes: function(attributes, range) {
        
    },
    
    addAttribute: function(name, value, range) {
        
    },
    
    removeAttribute: function(name, range) {
        
    },
    
    replaceCharactersInRangeWithAttributedString: function(range, attrString) {
        
    },
    
    insertAttributedString: function(attrString, atIndex) {
        
    },
    
    appendAttributedString: function(attrString) {
        
    },
    
    deleteCharactersInRange: function(range) {
        
    },
    
    setAttributedString: function(attrString) {
        
    },
    
    beginEditing: function() {
        
    },
    
    endEditing: function() {
        
    }
});
/* 
 * bundle.js
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


var NSBundleDidLoadNotification     = "NSBundleDidLoadNotification";
var NSLoadedClasses                 = "NSLoadedClasses";

var NSBundle = NSObject.extend({
    
    principalClass: function() {
		return NSApplication;
	}
});

Object.extend(NSBundle, {
    mainBundle: function() {
        console.log("Returning main bundle");
        console.log(NSBundle.create());
        return NSBundle.create();
    },
    
    bundleWithPath: function(path) {
        
    },
    
    bundleForClass: function(aClass) {
        
    },
    
    bundleWithIdentifier: function(identifier) {
        
    },
    
    allBundles: function() {
        
    },
    
    allFrameworks: function() {
        
    }
});
/* 
 * geometry.js
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


function NSMakePoint(x, y)
{   
    return { x: x, y: y };
}

function NSMakeSize(w, h)
{
    return { width: w, height: h };
}

function NSMakeRect(x, y, w, h)
{
    return { origin: NSMakePoint(x, y), size: NSMakeSize(w, h) };
}


function NSPointInRect(aPoint, aRect)
{
    return CGRectContainsPoint(aRect, aPoint);
}

function NSPointFromString(aString)
{
    if (!aString) return NSMakePoint(0, 0);
    return NSMakePoint(parseFloat(aString.substr(1, aString.indexOf(",") - 1)), parseFloat(aString.substr(aString.indexOf(",") + 1, aString.length - 1)));
}

function NSSizeFromString(aString)
{
    if (!aString) return NSMakeSize(0, 0);
    return NSMakeSize(parseFloat(aString.substr(1, aString.indexOf(",") - 1)), parseFloat(aString.substr(aString.indexOf(",") + 1, aString.length - 1)));
}

function NSRectFromString(aString)
{
    if (!aString) return NSMakeRect(0, 0, 0, 0);
	return { origin: NSPointFromString(aString.substr(1, aString.indexOf("},") - 1)), size: NSSizeFromString(aString.substr(aString.indexOf("},") + 3, aString.length - 3)) };
}
/* 
 * keyed_archiver.js
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


var NSInvalidArchiveOperationException = "NSInvalidArchiveOperationException";
var NSInvalidUnarchiveOperationException = "NSInvalidUnarchiveOperationException";

var NSKeyedArchiver = NSCoder.extend({
    
    archivedDataWithRootObject: function(rootObject) {
    
    },
    
    archiveRootObjectToFile: function(rootObject, path) {
        
    },
    
    initForWritingWithMutableData: function(data) {
        
    },
    
    setDelegate: function(delegate) {
        
    },
    
    delegate: function() {
        
    },
    
    setOutputFormat: function(format) {
        
    },
    
    outputFormat: function() {
        
    },
    
    finishEncoding: function() {
        
    },
    
    setClassNameForClass: function(codedName, cls) {
        
    },
    
    classNameForClass: function(cls) {
        
    },
    
    encodeObjectForKey: function(object, key) {
        
    },
    
    encodeConditionalObjectForKey: function(object, key) {
        
    },
    
    encodeBoolForKey: function(aBool, key) {
        
    },
    
    encodeIntForKey: function(anInt, key) {
        
    },
    
    encodeFloatForKey: function(aFloat, key) {
        
    },
    
    encodeDoubleForKey: function(aDouble, key) {
        
    }
});

var NSKeyedUnarchiver = NSCoder.extend({
    
    _delegate: null,
    _data: null,
    _rootDict: null,
    _contextStack: null,
    _unarchivedObjects: null,
    
    initForReadingWithData: function(data) {
        this.init();
        this._data = data.archive.data;
        this._rootDict = this._data; //CFPropertyListFromData(this._data.bytes());
        this._contextStack = [];
        this._contextStack.addObject(this._rootDict);
        this._unarchivedObjects = NSDictionary.create();
        return this;
    },

    setDelegate: function(delegate) {
        
    },
    
    delegate: function() {
        
    },
    
    finishDecoding: function() {
        // do nothing?
    },
    
    containsValueForKey: function(key) {
        var theContext = this._contextStack.lastObject();
        
        if (theContext[key])
            return true;
        
        return false;
    },
    
    decodeObjectForKey: function(key) {
        var theContext = this._contextStack.lastObject();
        // if the context is an array, then we need to decode this differently
        if(theContext['indexOf']) {
            var array = [];
            for (var idx = 0; idx < theContext.length; idx++) {
                this._contextStack.addObject(theContext[idx]);
                var newObject = this._decodeObject(theContext[idx]);
                array.push(newObject);
                this._contextStack.removeLastObject();
            }
            return array;
        }
        
        var theObject = theContext[key];
    
        return this._decodeObject(theObject);
    },
    
    /**
        @private
        
        Private method to decode an actual object at the head of the context
        array.
    */
    _decodeObject: function(theObject) {
        // no context, so return null... error?
        if (!theObject)
            return null;
        
        // object is a string, so just return it
        if (typeof theObject == 'string')
            return new String(theObject);
        
        var theClass = window[theObject["class"]];
        
        if (!theClass) {
            if (this._unarchivedObjects.containsKey(theObject['id']))
                return this._unarchivedObjects.objectForKey(theObject['id'])
            else {
                console.log('unable to decode ' + theObject['class']);
                return null;
            }
                
        }
        
        var newObject;
        
        //throws error if array...............
        if (theClass == NSArray || theClass == NSMutableArray) {
            newObject = [];
        }
        else {
            newObject = new theClass(); // basically just alloc's it.. does not init().
        }
        
        this._unarchivedObjects.setObjectForKey(newObject, theObject['id']);
        
        // if (theObject['class'] == "NSCustomObject") {
        //     newObject.init();
        // }
        // else {
            this._contextStack.addObject(theObject['objects']);
            newObject = newObject.initWithCoder(this);
            this._contextStack.removeLastObject();
        // }
        
        newObject = newObject.awakeAfterUsingCoder(this);
        this._unarchivedObjects.setObjectForKey(newObject, theObject['id']);
        
        return newObject;
    },
    
    decodeBoolForKey: function(key) {
        var theContext = this._contextStack.lastObject();
        var theObject = theContext[key];
        
        // return false if it does not exist, otherwise, return value
        return (!theObject) ? false : true;
    },
    
    decodeIntForKey: function(key) {
        var theContext = this._contextStack.lastObject();
        return parseInt(theContext[key]);
    },
    
    decodeInt32ForKey: function(key) {
        var theContext = this._contextStack.lastObject();
        return parseInt(theContext[key]);        
    },
    
    decodeInt64ForKey: function(key) {
        var theContext = this._contextStack.lastObject();
        return parseInt(theContext[key]);        
    },
    
    decodeFloatForKey: function(key) {
        var theContext = this._contextStack.lastObject();
        return parseFloat(theContext[key]);
    },
    
    decodeDoubleForKey: function(key) {
        var theContext = this._contextStack.lastObject();
        return parseFloat(theContext[key]);
    },
    
    decodePointForKey: function(key) {
        var thePoint = this.decodeObjectForKey(key);
        return NSPointFromString(thePoint);
    },
    
    decodeSizeForKey: function(key) {
        var theSize = this.decodeObjectForKey(key);
        return NSSizeFromString(theSize);
    },
    
    decodeRectForKey: function(key) {
        var theRect = this.decodeObjectForKey(key);
        return NSRectFromString(theRect);
    }    
});

NSObject.mixin({
    
    awakeAfterUsingCoder: function(aCoder) {
        return this;
    }
});
/* 
 * key_value_coding.js
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


var NSUndefinedKeyException                     = "NSUndefinedKeyException";
var NSAverageKeyValueOperator                   = "NSAverageKeyValueOperator";
var NSCountKeyValueOperator                     = "NSCountKeyValueOperator";
var NSDistinctUnionOfArraysKeyValueOperator     = "NSDistinctUnionOfArraysKeyValueOperator";
var NSDistinctUnionOfObjectsKeyValueOperator    = "NSDistinctUnionOfObjectsKeyValueOperator";
var NSDistinctUnionOfSetsKeyValueOperator       = "NSDistinctUnionOfSetsKeyValueOperator";
var NSMaximumKeyValueOperator                   = "NSMaximumKeyValueOperator";
var NSMinimumKeyValueOperator                   = "NSMinimumKeyValueOperator";
var NSSumKeyValueOperator                       = "NSSumKeyValueOperator";
var NSUnionOfArraysKeyValueOperator             = "NSUnionOfArraysKeyValueOperator";
var NSUnionOfObjectsKeyValueOperator            = "NSUnionOfObjectsKeyValueOperator";
var NSUnionOfSetsKeyValueOperator               = "NSUnionOfSetsKeyValueOperator";

NSObject.mixin({
    
    valueForKey: function(key) {
        // -get<Key>
        var accessorName = "get" + key.capitalizedString();
        if (this.respondsTo(accessorName))
            return this.perform(accessorName);

        // -<key>
        accessorName = key;
        if (this.respondsTo(accessorName))
            return this.perform(accessorName);
        
        // -is<Key>
        var accessorName = "is" + key.capitalizedString();
        if (this.respondsTo(accessorName))
            return this.perform(accessorName);
        
        if (this.accessInstanceVariabledDirectly()) {
            var theValue;
            
            // _<key>
            accessorName = "_" + key;
            if (theValue = this[accessorName])
                return theValue;
            
            // _is<Key>
            accessorName = "_is" + key.capitalizedString();
            if (theValue = this[accessorName])
                return theValue;
            
            // <key>
            accessorName = key;
            if (theValue = this[accessorName])
                return theValue;
            
            // is<Key>
            accessorName = "is" + key.capitalizedString();
            if (theValue = this[accessorName])
                return theValue;            
        }
        
        // if not found
        return this.valueForUndefinedKey(key);
    },
    
    setValueForKey: function(value, key) {
        // -set<Key>
        var accessorName = "set" + key.capitalizedString();
        if (this.respondsTo(accessorName))
            return this.perform(accessorName, value);
        
        return this.setValueForUndefinedKey(value, key);
    },
    
    validateValueForKey: function(aValue, aKey, error) {
        
    },
    
    mutableArrayValueForKey: function(key) {
        
    },
    
    valueForKeyPath: function(keyPath) {
        
    },
    
    setValueForKeyPath: function(value, keyPath) {
        
    },
    
    validateValueForKeyPath: function(value, keyPath, error) {
        
    },
    
    mutableArrayValueForKeyPath: function(keyPath) {
        
    },
    
    valueForUndefinedKey: function(key) {
        throw "Undefined key was requested from object. '" + key + "'";
    },
    
    setValueForUndefinedKey: function(value, key) {
        throw "Undefined key was requested from object for setting. '" + key + "'";
    },
    
    setNilValueForKey: function(key) {
        
    },
    
    dictionaryWithValuesForKeys: function(keys) {
        
    },
    
    setValuesForKeysWithDictionary: function(keyedValues) {
        
    },
    
    accessInstanceVariablesDirectly: function() {
        return true;
    }
});

Object.extend(Array.prototype, {
    
    valueForKey: function(key) {
        
    },
    
    setValueForKey: function(value, key) {
        
    }
});

NSDictionary.extend({
    
    valueForKey: function(key) {
        
    },
    
    setValueForKey: function(value, key) {
        
    }
});
/* 
 * notification.js
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


var NSNotification = NSObject.extend({
    
    _name: null,
    _object: null,
    _userInfo: null,
    
    name: function() {
        return this._name;
    },
    
    object: function() {
        return this._object;
    },
    
    _userInfo: function() {
        return this._userInfo;
    }
});

/**
    Main method of creating a notification. userInfo can be null, and in which
    case a default dictionary will be created.
*/
NSNotification.notificationWithName = function(aName, anObject, userInfo) {
    
    var theNotification = NSNotification.create();
    
    theNotification._name = aName;
    theNotification._object = anObject
    theNotification._userInfo = userInfo;
    
    return theNotification;
};
/* 
 * foundation.js
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


/* 
 * key_value_observing.js
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


// NSKeyValueObservingOptions
var NSKeyValueObservingOptionNew            = 0x01;
var NSKeyValueObservingOptionOld            = 0x02;
var NSKeyValueObservingOptionInitial        = 0x04;
var NSKeyValueObservingOptionPrior          = 0x08;
                                        
// NSKeyValueChange                     
var NSKeyValueChangeSetting                 = 1;
var NSKeyValueChangeInsertion               = 2;
var NSKeyValueChangeRemoval                 = 3;
var NSKeyValueChangeReplacement             = 4;

// NSKeyValueSetMutationKind
var NSKeyValueUnionSetMutation              = 1;
var NSKeyValueMinusSetMutation              = 2;
var NSKeyValueIntersectSetMutation          = 3;
var NSKeyValueSetSetMutation                = 4;

// keys for chnage dictionary
var NSKeyValueChangeKindKey                 = "NSKeyValueChangeKindKey"; 
var NSKeyValueChangeNewKey                  = "NSKeyValueChangeNewKey";
var NSKeyValueChangeOldKey                  = "NSKeyValueChangeOldKey";
var NSKeyValueChangeIndexesKey              = "NSKeyValueChangeIndexesKey" ;
var NSKeyValueChangeNotificationIsPriorKey  = "NSKeyValueChangeNotificationIsPriorKey";

NSObject.mixin({
    
    observeValueForKeyPath: function(keyPath, ofObject, change, context) {
        
    },
    
    addObserver: function(observer, forKeyPath, options, context) {
        
    },
    
    removeObserver: function(observer, forKeyPath) {
        
    }
});
/* 
 * notification_center.js
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


// Singleton instance used for the application
var NSNotificationCenterDefault = null;


var NSNotificationCenter = NSObject.extend({
    
    
});

/**
    Returns the default notification center, aka, the instance that should be
    used within the application.
*/
NSNotificationCenter.defaultCenter = function() {
    
    if (!NSNotificationCenterDefault)
        NSNotificationCenterDefault = NSNotificationCenter.create();
    
    return NSNotificationCenterDefault;
};
/* 
 * geometry.js
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

function CGPoint()
{
 this.x = 0;
 this.y = 0;
}

function CGSize()
{
 this.width = 0;
 this.height = 0;
}

function CGRect()
{
 this.origin = new CGPoint();
 this.size = new CGSize();
}

function CGPointMake(x, y)
{
    return { x: x, y: y };
}

function CGSizeMake(width, height)
{
    return { width: width, height: height };
}

function CGRectMake(x, y, width, height)
{
    return { size: CGSizeMake(width, height), origin: CGPointMake(x, y) };
}

function CGRectGetMinX(rect)
{
    return rect.origin.x;
}

function CGRectGetMidX(rect)
{
    return rect.origin.x + (rect.size.width / 2.0);
}

function CGRectGetMaxX(rect)
{
	return rect.origin.x + rect.size.width;
}

function CGRectGetMinY(rect)
{
	return rect.origin.y;
}

function CGRectGetMidY(rect)
{
	return rect.origin.y + (rect.size.height / 2.0);
}

function CGRectGetMaxY(rect)
{
	return rect.origin.y + rect.size.height;
}

function CGRectGetWidth(rect)
{
	return rect.size.width;
}

function CGRectGetHeight(rect)
{
	return rect.size.height;
}

function CGPointEqualToPoint(point1, point2)
{
	return (point1.x == point2.x) && (point1.y == point2.y);
}

function CGSizeEqualToSize(size1, size2)
{
	return (size1.width == size2.width) && (size1.height == size2.height);
}

function CGRectEqualToRect(rect1, rect2)
{
	return CGPointEqualToPoint(rect1.origin, rect2.origin) && CGSizeEqualToSize(rect1.size, rect2.size);
}

function CGRectStandardize(rect)
{
	var newRect = CGRectMake(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
	// fix width/x
	if(rect.size.width < 0)
	{
		newRect.size.width = rect.size.width * -1;
		newRect.origin.x = rect.origin.x - newRect.size.width;
	}
	// fix height/y
	if(rect.size.height < 0)
	{
		newRect.size.height = rect.size.height * -1;
		newRect.origin.y = rect.origin.y - newRect.size.height;
	}

	return newRect;
}

function CGRectIsEmpty(rect)
{
	if(CGRectIsNull(rect))
		return true;

	return ((rect.size.height == 0) || (rect.size.width == 0));
}

function CGRectIsNull(rect)
{
	if(!(rect.size && rect.origin))
		return false;

	if(!(rect.origin.x && rect.origin.y && rect.size.width && rect.size.height))
		return false

	return true;
}

// extern bool CGRectIsInfinite(CGRect rect);
function CGRectIsInfinite(rect)
{

}

function CGRectInset(rect, dx, dy)
{
	return CGRectMake(rect.origin.x + dx, rect.origin.y + dy, rect.size.width - (2 * dx), rect.size.height - (2 * dy));
}

function CGRectIntegral(rect)
{
	return CGRectMake(Math.floor(rect.origin.x), Math.floor(rect.origin.y), Math.ceil(rect.size.width), Math.ceil(rect.size.height));
}

// extern CGRect CGRectUnion(CGRect r1, CGRect r2);
function CGRectUnion(r1, r2)
{

}

// extern CGRect CGRectIntersection(CGRect r1, CGRect r2);
function CGRectIntersection(r1, r2)
{

}

// extern CGRect CGRectOffset(CGRect rect, CGFloat dx, CGFloat dy);
function CGRectOffset(rect, dx, dy)
{

}

// extern void CGRectDivide(CGRect rect, CGRect *slice, CGRect *remainder, CGFloat amount, CGRectEdge edge);
function CGRectDivide(rect, slice, remainder, amount, edge)
{

}

// extern bool CGRectContainsPoint(CGRect rect, CGPoint point);
function CGRectContainsPoint(rect, point)
{
	return point.x >= CGRectGetMinX(rect) && point.y >= CGRectGetMinY(rect) && point.x < CGRectGetMaxX(rect) && point.y < CGRectGetMaxY(rect);
}

// extern bool CGRectContainsRect(CGRect rect1, CGRect rect2);
function CGRectContainsRect(rect1, rect2)
{

}

// extern bool CGRectIntersectsRect(CGRect rect1, CGRect rect2);
function CGRectIntersectsRect(rect1, rect2)
{

}

// extern CFDictionaryRef CGPointCreateDictionaryRepresentation(CGPoint point);
function CGPointCreateDictionaryRepresentation(point)
{

}

// extern bool CGPointMakeWithDictionaryRepresentation(CFDictionaryRef dict, CGPoint *point);
function CGPointMakeWithDictionaryRepresentation(dict, point)
{

}

// extern CFDictionaryRef CGSizeCreateDictionaryRepresentation(CGSize size);
function CGSizeCreateDictionaryRepresentation(size)
{

}

// extern bool CGSizeMakeWithDictionaryRepresentation(CFDictionaryRef dict, CGSize *size);
function CGSizeMakeWithDictionaryRepresentation(dict, size)
{

}

// extern CFDictionaryRef CGRectCreateDictionaryRepresentation(CGRect rect);
function CGRectCreateDictionaryRepresentation(rect)
{

}

// extern bool CGRectMakeWithDictionaryRepresentation(CFDictionaryRef dict, CGRect *rect);
function CGRectMakeWithDictionaryRepresentation(dict, rect)
{

}

function CGRectFromString(aString)
{
	var thePoint = CGPointFromString(aString.substr(1, aString.indexOf("},") - 1));
	var theSize = CGSizeFromString(aString.substr(aString.indexOf("},") + 3, aString.length - 3));
	return {
		origin: thePoint,
		size: theSize
	};
}

function CGStringFromRect(aRect)
{
 return "{" + CGStringFromPoint(aRect.origin) + ", " + CGStringFromSize(aRect.size) + "}";
}

function CGStringFromPoint(aPoint)
{
 return "{" + aPoint.x + ", " + aPoint.y + "}";
}

function CGStringFromSize(aSize)
{
 return "{" + aSize.width + ", " + aSize.height + "}";
}

function CGPointFromString(aString)
{
	return CGPointMake(parseFloat(aString.substr(1, aString.indexOf(",") - 1)), parseFloat(aString.substr(aString.indexOf(",") + 1, aString.length - 1)));
}

function CGSizeFromString(aString)
{
	return CGSizeMake(parseFloat(aString.substr(1, aString.indexOf(",") - 1)), parseFloat(aString.substr(aString.indexOf(",") + 1, aString.length-  1)));
}
/* 
 * affine_transform.js
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


var CGAffineTransformIdentity = {};

function CGAffineTransformMake (a, b, c, d, tx, ty)
{
    
}

function CGAffineTransformMakeTranslation(tx, ty)
{
    
}

function CGAffineTransformMakeScale(sx, sy)
{
    
}

function CGAffineTransformMakeRotation(angle)
{
    
}

function CGAffineTransformIsIdentity(t)
{
    
}

function CGAffineTransformTranslate(t, tx, ty)
{
    
}

function CGAffineTransformScale(t, sx, sy)
{
    
}

function CGAffineTransformRotate(t, angle)
{
    
}

function CGAffineTransformInvert(t)
{
    
}

function CGAffineTransformConcat(t1, t2)
{
    
}

function CGAffineTransformEqualToTransform(t1, t2)
{
    
}

function CGPointApplyAffineTransform(point, t)
{
    
}

function CGSizeApplyAffineTransform(size, t)
{
    
}

function CGRectApplyAffineTransform(rect, t)
{
    
}
/* 
 * color.js
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

var kCGColorWhite = "kCGColorWhite";
var kCGColorBlack = "kCGColorBlack";
var kCGColorClear = "kCGColorClear";

function CGColorRef()
{
    this._red = 0;
    this._blue = 0;
    this._green = 0;
    this._alpha = 0;
}

function CGColorCreate(space, components)
{
    return { _red: components[0], _green: components[1], _blue: components[2], _alpha: components[3] };
}

function CGColorCreateGenericGray(gray, alpha)
{
    return { _red: gray, _blue: gray, _green: gray, _alpha: alpha };
}

function CGColorCreateGenericRGB(red, green, blue, alpha)
{
    return { _red: red, _blue: blue, _green: green, _alpha: alpha };
}

// CGColorRef CGColorCreateGenericCMYK(CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha)
// {
// 
// }
// 
// CGColorRef CGColorGetConstantColor(CFStringRef colorName)
// {
// 
// }
// 
// //CGColorRef CGColorCreateWithPattern(CGColorSpaceRef space, CGPatternRef pattern, CGFloat components[]);
// 
// CGColorRef CGColorCreateCopy(CGColorRef color)
// {
// 
// }
// 
// CGColorRef CGColorCreateCopyWithAlpha(CGColorRef color, CGFloat alpha)
// {
// 
// }
// 
// CGColorRef CGColorRetain(CGColorRef color)
// {
// 
// }
// 
// void CGColorRelease(CGColorRef color)
// {
// 
// }
// 
// bool CGColorEqualToColor(CGColorRef color1, CGColorRef color2)
// {
// 
// }
// 
// int CGColorGetNumberOfComponents(CGColorRef color)
// {
// 
// }
// 
// const CGFloat *CGColorGetComponents(CGColorRef color)
// {
// 
// }
// 
// CGFloat CGColorGetAlpha(CGColorRef color)
// {
// 
// }
// 
// CGColorSpaceRef CGColorGetColorSpace(CGColorRef color)
// {
// 
// }
/* 
 * font.js
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
 

function CGFontCreate(name, size, isBold)
{
    var theFont = { };
    theFont._name = name;
    theFont._size = size;
    theFont._isBold = isBold;
    return theFont;
}

function CGFontCreateWithFontName(name)
{
    var theFont = { };
    theFont._name = name;
    theFont._size = 12;         // default size
    theFont._isBold = NO;       // default to regular typeface
    return theFont;
}

function CGFontGetFontName(font)
{
    return font._name;
}

function CGFontGetFontSize(font)
{
    return font._size;
}

function CGFontGetIsBold(font)
{
    return font._isBold;
}

function CGFontGetStringRepresentation(font)
{
    return (font._isBold ? "bold " : "") + Math.round(font._size) + "px '" + font._name + "'"; 
}
/* 
 * context.js
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



// CGLineJoin
var kCGLineJoinMiter        = 0;
var kCGLineJoinRound        = 1;
var kCGLineJoinBevel        = 2;

// CGLineCap
var kCGLineCapButt          = 0;
var kCGLineCapRound         = 1;
var kCGLineCapSquare        = 2;

// CGPathDrawingMode
var kCGPathFill             = 0;
var kCGPathEOFill           = 1;
var kCGPathStroke           = 2;
var kCGPathFillStroke       = 3;
var kCGEOFillStroke         = 4;

// CGTextDrawingMode
var kCGTextFill             = 0;
var kCGTextStroke           = 1;
var kCGFillStroke           = 2;
var kCGTextInvisible        = 3;
var kCGTextFillClip         = 4;
var kCGTextStrokeClip       = 5;
var kCGTextFillStrokeClip   = 6;
var kCGTextClip             = 7;


var CGLineJoinCanvas = ["miter", "round", "bevel"];
var CGLineCapCanvas = ["butt", "round", "square"];


function CGContextSaveGState(c)
{
    c.save();
}

function CGContextRestoreGState(c)
{
    c.restore();
}

function CGContextScaleCTM(c, sx, sy)
{
    c.scale(sx, sy);
}

function CGContextTranslateCTM(c, tx, ty)
{
    c.translate(tx, ty);
}

function CGContextRotateCTM(c, angle)
{
    c.rotate(angle);
}

function CGContextConcatCTM(c, transform)
{
    
}

function CGContextGetCTM(c)
{
    
}

function CGContextSetLineWidth(c, width)
{
    c.lineWidth = width;
}

function CGContextSetLineCap(c, cap)
{
    c.lineCap = CGLineCapCanvas[cap];
}

function CGContextSetLineJoin(c, join)
{
    c.lineJoin = CGLineJoinCanvas[join];
}

function CGContextSetMiterLimit(c, limit)
{
    c.miterLimit = limit;
}

function CGContextSetLineDash(c, phase, lengths, count)
{
    
}

function CGContextSetFlatness(c, flatness)
{
    
}

function CGContextSetAlpha(c, alpha)
{
    c.globalAlpha = alpha;
}

function CGContextBeginPath(c)
{
    c.beginPath();
}

function CGContextMoveToPoint(c, x, y)
{
    c.moveTo(x, y);
}

function CGContextAddLineToPoint(c, x, y)
{
    c.lineTo(x, y);
}

function CGContextAddCurveToPoint(c, cp1x, cp1y, cp2x, cp2y, x, y)
{
    c.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
}

function CGContextAddQuadCurveToPoint(c, cpx, cpy, x, y)
{
    c.quadraticCurveTo(cpx, cpy, x, y);
}

function CGContextClosePath(c)
{
    c.closePath();
}

function CGContextAddRect(c, rect)
{
    c.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
}

function CGContextAddRects(c, rects, count)
{
    
}

function CGContextAddLines(c, points, count)
{
    
}

function CGContextAddEllipseInRect(context, rect)
{
    
}

function CGContextAddArc(c, x, y, radius, startAngle, endAngle, clockwise)
{
    c.arc(x, y, radius, startAngle, endAngle, clockwise);
}

function CGContextAddArcToPoint(c, x1, y1, x2, y2, radius)
{
    c.arcTo(x1, y1, x2, y2, radius);
}

// void CGContextAddPath(CGContextRef context, CGPathRef path)
// {
//     
// }
// 
// void CGContextReplacePathWithStrokedPath(CGContextRef c)
// {
//     
// }
// 
// bool CGContextIsPathEmpty(CGContextRef c)
// {
//     
// }
// 
// CGPoint CGContextGetPathCurrentPoint(CGContextRef c)
// {
//     
// }
// 
// CGRect CGContextGetPathBoundingBox(CGContextRef c)
// {
//     
// }
// 
// bool CGContextPathContainsPoint(CGContextRef context, CGPoint point, CGPathDrawingMode mode)
// {
//     
// }
// 
// void CGContextDrawPath(CGContextRef c, CGPathDrawingMode mode)
// {
//     
// }
// 
function CGContextFillPath(c)
{
    c.fill();
}
// 
// void CGContextEOFillPath(CGContextRef c)
// {
//     
// }
// 
function CGContextStrokePath(c)
{
    c.stroke();
}
// 
function CGContextFillRect(c, rect)
{
    c.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
}
// 
// void CGContextFillRects(CGContextRef c, const CGRect rects[], int count)
// {
//     
// }
// 
// void CGContextStrokeRect(CGContextRef c, CGRect rect)
// {
//     c.strokeRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
// }
// 
// void CGContextStrokeRectWithWidth(CGContextRef c, CGRect rect, CGFloat width)
// {
//     
// }
// 
// void CGContextClearRect(CGContextRef c, CGRect rect)
// {
//     
// }
// 
// void CGContextFillEllipseInRect(CGContextRef context, CGRect rect)
// {
//     
// }
// 
// void CGContextStrokeEllipseInRect(CGContextRef context, CGRect rect)
// {
//     
// }
// 
// void CGContextStrokeLineSegments(CGContextRef c, const CGPoint points[], int count)
// {
//     
// }
// 
// void CGContextClip(CGContextRef c)
// {
//     
// }
// 
// void CGContextEOClip(CGContextRef c)
// {
//     
// }
// 
// void CGContextClipToMask(CGContextRef c, CGRect rect, CGImageRef mask)
// {
//     
// }
// 
// CGRect CGContextGetClipBoundingBox(CGContextRef c)
// {
//     
// }
// 
// void CGContextClipToRect(CGContextRef c, CGRect rect)
// {
//     
// }
// 
// void CGContextClipToRects(CGContextRef c, const CGRect rects[], int count)
// {
//     
// }
// 
// void CGContextSetFillColorWithColor(CGContextRef c, CGColorRef color)
// {
//     
// }
// 
// void CGContextSetStrokeColorWithColor(CGContextRef c, CGColorRef color)
// {
//     
// }
// 
// void CGContextSetFillColorSpace(CGContextRef c, CGColorSpaceRef colorspace)
// {
//     
// }
// 
// void CGContextSetStrokeColorSpace(CGContextRef c, CGColorSpaceRef colorspace)
// {
//     
// }
// 
// void CGContextSetFillColor(CGContextRef c, const CGFloat components[])
// {
//     
// }
// 
// void CGContextSetStrokeColor(CGContextRef c, const CGFloat components[])
// {
//     
// }
// 
// //void CGContextSetFillPattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// //void CGContextSetStrokePattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// 
// void CGContextSetPatternPhase(CGContextRef c, CGSize phase)
// {
//     
// }
// 
// void CGContextSetGrayFillColor(CGContextRef c, CGFloat gray, CGFloat alpha)
// {
//     
// }
// 
// void CGContextSetGrayStrokeColor(CGContextRef c, CGFloat gray, CGFloat alpha)
// {
//     
// }
// 
// void CGContextSetRGBFillColor(CGContextRef c, CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha)
// {
//     
// }
// 
// void CGContextSetRGBStrokeColor(CGContextRef c, CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha)
// {
//     
// }
// 
// void CGContextSetCMYKFillColor(CGContextRef c, CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha)
// {
//     
// }
// 
// void CGContextSetCMYKStrokeColor(CGContextRef c, CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha)
// {
//     
// }
// 
// void CGContextSetRenderingIntent(CGContextRef c, CGColorRenderingIntent intent)
// {
//     
// }
// 
function CGContextDrawImage(c, rect, image)
{
    c.drawImage(image, rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
}
// 
// void CGContextDrawTiledImage(CGContextRef c, CGRect rect, CGImageRef image)
// {
//     
// }
// 
// //CGInterpolationQuality CGContextGetInterpolationQuality(CGContextRef c);
// //void CGContextSetInterpolationQuality(CGContextRef c, CGInterpolationQuality quality);
// 
function CGContextSetShadowWithColor(c, offset, blur, color)
{
    c.shadowOffsetX = offset.width;
    c.shadowOffsetY = offset.height;
    c.shadowBlur = blur;
    c.shadowColor = "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
}
// 
// void CGContextSetShadow(CGContextRef context, CGSize offset, CGFloat blur)
// {
//     c.shadowOffsetX = offset.width;
//     c.shadowOffsetY = offset.height;
//     c.shadowBlur = blur;
//     c.shadowColor = "rgba(1,1,1,1)";
// }
// 
// void CGContextDrawLinearGradient(CGContextRef context, CGGradientRef gradient, CGPoint startPoint, CGPoint endPoint, CGGradientDrawingOptions options)
// {
//     
// }
// 
// void CGContextDrawRadialGradient(CGContextRef context, CGGradientRef gradient, CGPoint startCenter, CGFloat startRadius, CGPoint endCenter, CGFloat endRadius, CGGradientDrawingOptions options)
// {
//     
// }
// 
// //void CGContextDrawShading(CGContextRef context, CGShadingRef shading);
// 
// void CGContextSetCharacterSpacing(CGContextRef c, CGFloat spacing)
// {
//     
// }
// 
// void CGContextSetTextPosition(CGContextRef c, CGFloat x, CGFloat y)
// {
//     
// }
// 
// CGPoint CGContextGetTextPosition(CGContextRef c)
// {
//     
// }
// 
// void CGContextSetTextMatrix(CGContextRef c, CGAffineTransform t)
// {
//     
// }
// 
// CGAffineTransform CGContextGetTextMatrix(CGContextRef c)
// {
//     
// }
// 
// void CGContextSetTextDrawingMode(CGContextRef c, CGTextDrawingMode mode)
// {
//     
// }
// 
function CGContextSetFont(c, font)
{
    c.font = CGFontGetStringRepresentation(font);
}
// 
// void CGContextSetFontSize(CGContextRef c, CGFloat size)
// {
//     
// }
// 
// //void CGContextSelectFont(CGContextRef c, const char *name, CGFloat size, CGTextEncoding textEncoding);
// //void CGContextShowGlyphsAtPositions(CGContextRef context, const CGGlyph glyphs[], const CGPoint positions[], int count);
// 
// void CGContextShowText(CGContextRef c, const char *string, int length)
// {
//     
// }
// 
function CGContextShowTextAtPoint(c, x, y, string, length)
{
    if (!window.opera)
        c.fillText(string, x, y);
}
// 
// //void CGContextShowGlyphs(CGContextRef c, const CGGlyph g[], int count);
// //void CGContextShowGlyphsAtPoint(CGContextRef c, CGFloat x, CGFloat y, const CGGlyph glyphs[], int count);
// //void CGContextShowGlyphsWithAdvances(CGContextRef c, const CGGlyph glyphs[], const CGSize advances[], int count);
// //void CGContextDrawPDFPage(CGContextRef c, CGPDFPageRef page);
// //void CGContextDrawPDFDocument(CGContextRef c, CGRect rect, CGPDFDocumentRef document, int page);
// //void CGContextBeginPage(CGContextRef c, const CGRect *mediaBox);
// void CGContextEndPage(CGContextRef c)
// {
//     
// }
// 
// CGContextRef CGContextRetain(CGContextRef c)
// {
//     
// }
// 
// void CGContextRelease(CGContextRef c)
// {
//     
// }
// 
// void CGContextFlush(CGContextRef c)
// {
//     
// }
// 
// void CGContextSynchronize(CGContextRef c)
// {
//     
// }
// 
// void CGContextSetShouldAntialias(CGContextRef c, bool shouldAntialias)
// {
//     
// }
// 
// void CGContextSetAllowsAntialiasing(CGContextRef context, bool allowsAntialiasing)
// {
//     
// }
// 
// void CGContextSetShouldSmoothFonts(CGContextRef c, bool shouldSmoothFonts)
// {
//     
// }
// 
// void CGContextBeginTransparencyLayer(CGContextRef context, CFDictionaryRef auxiliaryInfo)
// {
//     
// }
// 
// void CGContextBeginTransparencyLayerWithRect(CGContextRef context, CGRect rect, CFDictionaryRef auxiliaryInfo)
// {
//     
// }
// 
// void CGContextEndTransparencyLayer(CGContextRef context)
// {
//     
// }
// 
// CGAffineTransform CGContextGetUserSpaceToDeviceSpaceTransform(CGContextRef c)
// {
//     
// }
// 
// CGPoint CGContextConvertPointToDeviceSpace(CGContextRef c, CGPoint point)
// {
//     
// }
// 
// CGPoint CGContextConvertPointToUserSpace(CGContextRef c, CGPoint point)
// {
//     
// }
// 
// CGSize CGContextConvertSizeToDeviceSpace(CGContextRef c, CGSize size)
// {
//     
// }
// 
// CGSize CGContextConvertSizeToUserSpace(CGContextRef c, CGSize size)
// {
//     
// }
// 
// CGRect CGContextConvertRectToDeviceSpace(CGContextRef c, CGRect rect)
// {
//     
// }
// 
// CGRect CGContextConvertRectToUserSpace(CGContextRef c, CGRect rect)
// {
//     
// }
// 
// // =========================
// // = Vienna added methods: =
// // =========================
// 
function CGContextRGBAStringFromColor(color)
{
    return "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
}
// 
// 
// // {
// //     c.fillRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
// // }
// // 
// 
// // 
// // function CGContextStrokeRect(c, rect)
// // {
// //     c.strokeRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
// // }
// // 
// // //void CGContextStrokeRectWithWidth(CGContextRef c, CGRect rect, CGFloat width);
// // // 
// // function CGContextStrokeRectWithWidth(c, rect, width)
// // {
// //     
// // }
// // 
// // //void CGContextClearRect(CGContextRef c, CGRect rect);
// // // 
function CGContextClearRect(c, rect)
{
    c.clearRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
}
// // 
// // //void CGContextFillEllipseInRect(CGContextRef context, CGRect rect);
// // // 
// // function CGContextFillEllipseInRect(c, rect)
// // {
// //     
// // }
// // 
// // //void CGContextStrokeEllipseInRect(CGContextRef context, CGRect rect);
// // // 
// // function CGContextStrokeEllipseInRect(c, rect)
// // {
// //     
// // }
// // 
// // //void CGContextStrokeLineSegments(CGContextRef c, const CGPoint points[], int count);
// // // 
// // function CGContextStrokeLineSegments(c, points, count)
// // {
// //     
// // }
// // 
// // //void CGContextClip(CGContextRef c);
// // // 
// // function CGContextClip(c)
// // {
// //     
// // }
// // 
// // //void CGContextEOClip(CGContextRef c);
// // function CGContextEOClip (c)
// // {
// //     
// // }
// // 
// // //void CGContextClipToMask(CGContextRef c, CGRect rect, CGImageRef mask);
// // // 
// // function CGContextClipToMask(c, rect, mask)
// // {
// //     
// // }
// // 
// // //CGRect CGContextGetClipBoundingBox(CGContextRef c);
// // // 
// // function CGContextGetClipBoundingBox(c)
// // {
// //     
// // }
// // 
// // //void CGContextClipToRect(CGContextRef c, CGRect rect);
// // // 
// // function CGContextClipToRect(c, rect)
// // {
// //     
// // }
// // 
// // //void CGContextClipToRects(CGContextRef c, const CGRect rects[], int count);
// // // 
// // function CGContextClipToRects(c, rects, count)
// // {
// //     
// // }
// // 
function CGContextSetFillColorWithColor(c, color)
{
    c.fillStyle = "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
}
// // 
function CGContextSetStrokeColorWithColor(c, color)
{
    c.strokeStyle = "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
}
// // 
// // //void CGContextSetFillColorSpace(CGContextRef c, CGColorSpaceRef colorspace);
// // // 
// // function CGContextSetFillColorSpace(c, colorspace)
// // {
// //     
// // }
// // 
// // //void CGContextSetStrokeColorSpace(CGContextRef c, CGColorSpaceRef colorspace);
// // // 
// // function CGContextSetStrokeColorSpace(c, colorspace)
// // {
// //     
// // }
// // 
function CGContextSetFillColor(c, componenets)
{
    c.fillStyle = "rgba(" + parseInt(componenets[0] * 255) + ","  + parseInt(componenets[1] * 255) + ","  + parseInt(componenets[2] * 255) + ","  + componenets[3] + ")";
}
// // 
// // function CGContextSetStrokeColor(c, componenets)
// // {
// //     c.strokeStyle = "rgba(" + parseInt(componenets[0] * 255) + ","  + parseInt(componenets[1] * 255) + ","  + parseInt(componenets[2] * 255) + ","  + componenets[3] + ")";
// // }
// // 
// // //void CGContextSetFillPattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// // // 
// // function CGContextSetFillPattern(c, pattern, components)
// // {
// //     
// // }
// // 
// // //void CGContextSetStrokePattern(CGContextRef c, CGPatternRef pattern, const CGFloat components[]);
// // // 
// // function CGContextSetStrokePattern(c, pattern, components)
// // {
// //     
// // }
// // 
// // //void CGContextSetPatternPhase(CGContextRef c, CGSize phase);
// // // 
// // function CGContextSetPatternPhase(c, phase)
// // {
// //     
// // }
// //  
// // function CGContextSetGrayFillColor(c, gray, alpha)
// // {
// //  c.strokeStyle = "rgba(" + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + alpha + ")";
// // }
// // 
// // function CGContextSetGrayStrokeColor(c, gray, alpha)
// // {
// //     c.fillStyle = "rgba(" + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + alpha + ")";
// // }
// // 
// // function CGContextSetRGBFillColor(c, red, green, blue, alpha)
// // {
// //     c.fillStyle = "rgba(" + parseInt(red * 255) + ","  + parseInt(green * 255) + ","  + parseInt(blue * 255) + ","  + alpha + ")";    
// // }
// // 
// // function CGContextSetRGBStrokeColor(c, red, green, blue, alpha)
// // {
// //     c.strokeStyle = "rgba(" + parseInt(red * 255) + ","  + parseInt(green * 255) + ","  + parseInt(blue * 255) + ","  + alpha + ")"; 
// // }
/* 
 * dom_element.js
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


function CGDOMElementGetRootElement()
{
    return document.body;
}

function CGDOMElementCreate(type)
{
    var theElement = document.createElement(type);
    theElement.style.display = "block";
    theElement.style.position = "absolute";
    return theElement;
}

function CGDOMElementCreateWithAttributes(type, attributes)
{
    return document.createElement(type);
}

function CGDOMElementAppendChild(parent, child)
{
    parent.appendChild(child);
}

function CGDOMElementRemoveChild(parent, child)
{
    parent.removeChild(child);
}

function CGDOMElementReplaceChild(parent, oldChild, newChild)
{
    parent.replaceChild(newChild, oldChild);
}

function CGDOMElementGetAttribute(element, attribute)
{
    return element.getAttribute(attribute);
}

function CGDOMElementHasAttribute(element, attribute)
{
    return element.hasAttribute(attribute);
}

function CGDOMElementRemoveAttribute(element, attribute)
{
    element.removeAttribute(attribute);
}

function CGDOMElementSetAttribute(element, name, value)
{
    element.setAttribute(name, value);
}

function CGDOMElementSetFrame(element, frame)
{
    element.style.bottom = frame.origin.y + "px";
    element.style.left = frame.origin.x + "px";
    element.style.width = frame.size.width + "px";
    element.style.height = frame.size.height + "px";
    element.height = frame.size.height;
    element.width = frame.size.width;
}

function CGDOMElementSetFrameOrigin(element, origin)
{
    element.style.bottom = origin.y + "px";
    element.style.left = origin.x + "px";
}

function CGDOMElementSetFrameSize(element, size)
{
    
}

function CGDOMElementGetContext(element)
{
    return element.getContext("2d");
}
/* 
 * core_graphics.js
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

/* 
 * font.js
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
 

function CTFontRef()
{
    
};

var kCTFontCopyrightNameKey = "kCTFontCopyrightNameKey";
var kCTFontFamilyNameKey = "kCTFontFamilyNameKey";
var kCTFontSubFamilyNameKey = "kCTFontSubFamilyNameKey";
var kCTFontStyleNameKey = "kCTFontStyleNameKey";
var kCTFontUniqueNameKey = "kCTFontUniqueNameKey";
var kCTFontFullNameKey = "kCTFontFullNameKey";
var kCTFontVersionNameKey = "kCTFontVersionNameKey";
var kCTFontPostScriptNameKey = "kCTFontPostScriptNameKey";
var kCTFontTrademarkNameKey = "kCTFontTrademarkNameKey";
var kCTFontManufacturerNameKey = "kCTFontManufacturerNameKey";
var kCTFontDesignerNameKey = "kCTFontDesignerNameKey";
var kCTFontDescriptionNameKey = "kCTFontDescriptionNameKey";
var kCTFontVendorURLNameKey = "kCTFontVendorURLNameKey";
var kCTFontDesignerURLNameKey = "kCTFontDesignerURLNameKey";
var kCTFontLicenseNameKey = "kCTFontLicenseNameKey";
var kCTFontLicenseURLNameKey = "kCTFontLicenseURLNameKey";
var kCTFontSampleTextNameKey = "kCTFontSampleTextNameKey";
var kCTFontPostScriptCIDNameKey = "kCTFontPostScriptCIDNameKey";

var kCTFontVariationAxisIdentifierKey = "kCTFontVariationAxisIdentifierKey";
var kCTFontVariationAxisMinimumValueKey = "kCTFontVariationAxisMinimumValueKey";
var kCTFontVariationAxisMaximumValueKey = "kCTFontVariationAxisMaximumValueKey";
var kCTFontVariationAxisDefaultValueKey = "kCTFontVariationAxisDefaultValueKey";
var kCTFontVariationAxisNameKey = "kCTFontVariationAxisNameKey";

var kCTFontFeatureTypeIdentifierKey = "kCTFontFeatureTypeIdentifierKey";
var kCTFontFeatureTypeNameKey = "kCTFontFeatureTypeNameKey";
var kCTFontFeatureTypeExclusiveKey = "kCTFontFeatureTypeExclusiveKey";
var kCTFontFeatureTypeSelectorsKey = "kCTFontFeatureTypeSelectorsKey";
var kCTFontFeatureSelectorIdentifierKey = "kCTFontFeatureSelectorIdentifierKey";
var kCTFontFeatureSelectorNameKey = "kCTFontFeatureSelectorNameKey";
var kCTFontFeatureSelectorDefaultKey = "kCTFontFeatureSelectorDefaultKey";
var kCTFontFeatureSelectorSettingKey = "kCTFontFeatureSelectorSettingKey";

// CTFontOptions;	
var kCTFontOptionsDefault                       = 0;
var kCTFontOptionsPreventAutoActivation         = 1 << 0;
var kCTFontOptionsPreferSystemFont              = 1 << 2;

// CTFontUIFontType
var kCTFontNoFontType                           = -1;
var kCTFontUserFontType                         =  0;
var kCTFontUserFixedPitchFontType               =  1;
var kCTFontSystemFontType                       =  2;
var kCTFontEmphasizedSystemFontType             =  3;
var kCTFontSmallSystemFontType                  =  4;
var kCTFontSmallEmphasizedSystemFontType        =  5;
var kCTFontMiniSystemFontType                   =  6;
var kCTFontMiniEmphasizedSystemFontType         =  7;
var kCTFontViewsFontType                        =  8;
var kCTFontApplicationFontType                  =  9;
var kCTFontLabelFontType                        = 10;
var kCTFontMenuTitleFontType                    = 11;
var kCTFontMenuItemFontType                     = 12;
var kCTFontMenuItemMarkFontType                 = 13;
var kCTFontMenuItemCmdKeyFontType               = 14;
var kCTFontWindowTitleFontType                  = 15;
var kCTFontPushButtonFontType                   = 16;
var kCTFontUtilityWindowTitleFontType           = 17;
var kCTFontAlertHeaderFontType                  = 18;
var kCTFontSystemDetailFontType                 = 19;
var kCTFontEmphasizedSystemDetailFontType       = 20;
var kCTFontToolbarFontType                      = 21;
var kCTFontSmallToolbarFontType                 = 22;
var kCTFontMessageFontType                      = 23;
var kCTFontPaletteFontType                      = 24;
var kCTFontToolTipFontType                      = 25;
var kCTFontControlContentFontType               = 26;


function CTFontCreateWithName(name, size, matrix)
{
    
}

function CTFontCreateWithFontDescriptor(descriptor, size, matrix)
{
    
}

function CTFontCreateUIFontForLanguage(uiType, size, language){}

function CTFontCreateCopyWithAttributes(font, size, matrix, attributes){}

function CTFontCreateCopyWithSymbolicTraits(font, size, matrix, symTraitValue, symTraitMask){}

function CTFontCreateCopyWithFamily(font, size, matrix, family){}

function CTFontCreateForString(currentFont, string, range){}

function CTFontCopyFontDescriptor(font){}

function CTFontCopyAttribute(font, attribute){}

function CTFontGetSize(font){}

function CTFontGetMatrix(font){}

function CTFontGetSymbolicTraits(font){}

function CTFontCopyTraits(font){}

function CTFontCopyPostScriptName(font){}

function CTFontCopyFamilyName(font){}

function CTFontCopyFullName(font){}

function CTFontCopyDisplayName(font){}

function CTFontCopyName(font, nameKey){}

function CTFontCopyLocalizedName(font, nameKey, language){}

function CTFontCopyCharacterSet(font){}

function CTFontGetStringEncoding(font){}

function CTFontCopySupportedLanguages(font){}

function CTFontGetGlyphsForCharacters(font, characters, glyphs, count){}


function CTFontGetAscent(font){}

function CTFontGetDescent(font){}

function CTFontGetLeading(font){}

function CTFontGetUnitsPerEm(font){}

function CTFontGetGlyphCount(font){}

function CTFontGetBoundingBox(font){}

function CTFontGetUnderlinePosition(font){}

function CTFontGetUnderlineThickness(font){}

function CTFontGetSlantAngle(font){}

function CTFontGetCapHeight(font){}

function CTFontGetXHeight(font){}

function CTFontGetGlyphWithName(font, glyphName){}


function CTFontGetBoundingRectsForGlyphs(font, orientation, glyphs, boundingRects, count){}

function CTFontGetAdvancesForGlyphs(font, orientation, glyphs, advances, count){}

function CTFontGetVerticalTranslationsForGlyphs(font, glyphs, translations, count){}

function CTFontCreatePathForGlyph(font, glyph, transform){}


function CTFontCopyVariationAxes(font){}

function CTFontCopyVariation(font){}


function CTFontCopyFeatures(font){}

function CTFontCopyFeatureSettings(font){}

/* 
 * core_text.js
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

// Global CoreText namespace object
var CT = {};

/* 
 * action_connection.js
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
 

 /**
     The source is the receiver of the action. The destination sends the 
     action 'label' to the source when triggered.
 */
var IBActionConnection = NSObject.extend({
    
    _label: null,
    _source: null,
    _destination: null,
    
    initWithCoder: function(aCoder) {
        // replace @selector style name with js compatible identifier.
        this._label = aCoder.decodeObjectForKey("label").replace(/:/, "");
        this._source = aCoder.decodeObjectForKey("source");
        this._destination = aCoder.decodeObjectForKey("destination");
        return this;
    },
    
    awakeAfterUsingCoder: function(aCoder) {
        this._source.setAction(this._label);
        this._source.setTarget(this._destination);
        return this;
    }
});
/* 
 * event.js
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


// NSEventType
var NSLeftMouseDown             = 1;            
var NSLeftMouseUp               = 2;
var NSRightMouseDown            = 3;
var NSRightMouseUp              = 4;
var NSMouseMoved                = 5;
var NSLeftMouseDragged          = 6;
var NSRightMouseDragged         = 7;
var NSMouseEntered              = 8;
var NSMouseExited               = 9;
var NSKeyDown                   = 10;
var NSKeyUp                     = 11;
var NSFlagsChanged              = 12;
var NSAppKitDefined             = 13;
var NSSystemDefined             = 14;
var NSApplicationDefined        = 15;
var NSPeriodic                  = 16;
var NSCursorUpdate              = 17;
var NSScrollWheel               = 22;
var NSTabletPoint               = 23;
var NSTabletProximity           = 24;
var NSOtherMouseDown            = 25;
var NSOtherMouseUp              = 26;
var NSOtherMouseDragged         = 27;
var NSEventTypeGesture          = 29;
var NSEventTypeMagnify          = 30;
var NSEventTypeSwipe            = 31;
var NSEventTypeRotate           = 18;
var NSEventTypeBeginGesture     = 19;
var NSEventTypeEndGesture       = 20;

// NSEventMasks
var NSLeftMouseDownMask         = 1 << NSLeftMouseDown;
var NSLeftMouseUpMask           = 1 << NSLeftMouseUp;
var NSRightMouseDownMask        = 1 << NSRightMouseDown;
var NSRightMouseUpMask          = 1 << NSRightMouseUp;
var NSMouseMovedMask            = 1 << NSMouseMoved;
var NSLeftMouseDraggedMask      = 1 << NSLeftMouseDragged;
var NSRightMouseDraggedMask     = 1 << NSRightMouseDragged;
var NSMouseEnteredMask          = 1 << NSMouseEntered;
var NSMouseExitedMask           = 1 << NSMouseExited;
var NSKeyDownMask               = 1 << NSKeyDown;
var NSKeyUpMask                 = 1 << NSKeyUp;
var NSFlagsChangedMask          = 1 << NSFlagsChanged;
var NSAppKitDefinedMask         = 1 << NSAppKitDefined;
var NSSystemDefinedMask         = 1 << NSSystemDefined;
var NSApplicationDefinedMask    = 1 << NSApplicationDefined;
var NSPeriodicMask              = 1 << NSPeriodic;
var NSCursorUpdateMask          = 1 << NSCursorUpdate;
var NSScrollWheelMask           = 1 << NSScrollWheel;
var NSTabletPointMask           = 1 << NSTabletPoint;
var NSTabletProximityMask       = 1 << NSTabletProximity;
var NSOtherMouseDownMask        = 1 << NSOtherMouseDown;
var NSOtherMouseUpMask          = 1 << NSOtherMouseUp;
var NSOtherMouseDraggedMask     = 1 << NSOtherMouseDragged;
var NSEventMaskGesture          = 1 << NSEventTypeGesture;
var NSEventMaskMagnify          = 1 << NSEventTypeMagnify;
var NSEventMaskSwipe            = 1 << NSEventTypeSwipe;
var NSEventMaskRotate           = 1 << NSEventTypeRotate;
var NSEventMaskBeginGesture     = 1 << NSEventTypeBeginGesture;
var NSEventMaskEndGesture       = 1 << NSEventTypeEndGesture;

// NSevent modifier flags
var NSAlphaShiftKeyMask         = 1 << 16; // caps lock - not the same as shift
var NSShiftKeyMask              = 1 << 17;
var NSControlKeyMask            = 1 << 18;
var NSAlternateKeyMask          = 1 << 19;
var NSCommandKeyMask            = 1 << 20;
var NSNumericPadKeyMask         = 1 << 21;
var NSHelpKeyMask               = 1 << 22;
var NSFunctionKeyMask           = 1 << 23;

/**
    @class NSEvent
*/
var NSEvent = NSObject.extend({
    
    _type: null,
    _location: null,
    _locationInScreen: null,
    _modifierFlags: null,
    _timestamp: null,
    _windowNumber: null,
    _window: null,
    _context: null,
    
    _eventNumber: null,
    _clickCount: null,
    _pressure: null,
    
    _deltaX: null,
    _deltaY: null,
    
    _keys: null,
    _unmodKeys: null,
    _keyCode: null,
    _isARepeat: null,

// all events
    type: function() {
        return this._type;
    },
    
    modifierFlags: function() {
        return this._modifierFlags;
    },
    
    timestamp: function() {
        return this._timestamp;
    },
    
    window: function() {
        return this._window;
    },
    
    windowNumber: function() {
        return this._windowNumber;
    },
    
    content: function() {
        return this._context;
    },

// mouse down/up/drag events
    clickCount: function() {
        return this._clickCount;
    },
    
    buttonNumber: function() {
        return this._buttonNumber;
    },
    
    eventNumber: function() {
        return this._eventNumber;
    },
    
    locationInWindow: function() {
        return this._location;
    },
    
    locationInScreen: function() {
        return this._locationInScreen;
    },
    
// key up/down events
    characters: function() {
        return this._keys;
    },
    
    charactersIgnoringModifiers: function() {
        return this._unmodKeys;
    },
    
    isARepeat: function() {
        return this._isARepeat;
    },
    
    keyCode: function() {
        return this._keyCode;
    }
});

/**
    Main entrance point for events. This handles a raw JS event, and creates an
    NSEvent, and posts it off to NSApplication.
*/
function NSEventFromRawEvent(event)
{
    // event type
    var eventType;    
    switch (event.type) {
        case "mousedown":
            eventType = NSLeftMouseDown;
            break;
        case "mouseup":
            eventType = NSLeftMouseUp;
            break;
        case "mousemove":
            eventType = NSMouseMoved;
            break;
        default:
            console.log("unable to determine event type");
            return;
    }
    
    // modifier flags
    var modifierFlags = 1;
    if (event.metaKey)  modifierFlags = modifierFlags | NSCommandKeyMask;
    if (event.shiftKey) modifierFlags = modifierFlags | NSShiftKeyMask;
    if (event.altKey)   modifierFlags = modifierFlags | NSAlternateKeyMask;
    if (event.ctrlKey)  modifierFlags = modifierFlags | NSControlKeyMask;
    
    // event location
    var screenLocation = NSMakePoint(event.clientX, window.innerHeight - event.clientY);
    
    // timestamp
    var timestamp = new Date().getTime();
    
    // the window, windowNumber (might both be null....)
    var theWindow = NSApplication.sharedApplication().windowAtPoint(screenLocation);
    var windowLocation, windowNumber, theContext;
    if (theWindow) {
        windowLocation = theWindow.convertScreenToBase(screenLocation);
        windowNumber = theWindow.windowNumber();
        theContext = theWindow.graphicsContext();
    }
    
    var theEvent = NSEvent.mouseEventWithType(eventType, windowLocation, modifierFlags, timestamp, windowNumber, theContext, 0, 1, 1);
    theEvent._window = theWindow;
    theEvent._locationInScreen = screenLocation;
    NSApplication.sharedApplication().sendEvent(theEvent);
    
    // to stop event bubbling
    // return false;
}    

NSEvent.mouseEventWithType = function(type, location, modifierFlags, timestamp, windowNumber, context, eventNumber, clickCount, pressure)
{
    var theEvent = NSEvent.create();
    theEvent._type = type;
    theEvent._location = location;
    theEvent._modifierFlags = modifierFlags;
    theEvent._timestamp = timestamp;
    theEvent._windowNumber = windowNumber;
    theEvent._context = context;
    theEvent._eventNumber = eventNumber;
    theEvent._clickCount = clickCount;
    theEvent._pressure = pressure;
    return theEvent;
};

NSEvent.keyEventWithType = function(type, location, modifierFlags, timestamp, windowNumber, context, characters, charactersIgnoringModifiers, isARepeat, keyCode)
{
    
};

NSEvent.mouseLocation = function()
{
    
};

// reserved keycodes
var NSUpArrowFunctionKey        = 0xF700;
var NSDownArrowFunctionKey      = 0xF701;
var NSLeftArrowFunctionKey      = 0xF702;
var NSRightArrowFunctionKey     = 0xF703;
var NSF1FunctionKey             = 0xF704;
var NSF2FunctionKey             = 0xF705;
var NSF3FunctionKey             = 0xF706;
var NSF4FunctionKey             = 0xF707;
var NSF5FunctionKey             = 0xF708;
var NSF6FunctionKey             = 0xF709;
var NSF7FunctionKey             = 0xF70A;
var NSF8FunctionKey             = 0xF70B;
var NSF9FunctionKey             = 0xF70C;
var NSF10FunctionKey            = 0xF70D;
var NSF11FunctionKey            = 0xF70E;
var NSF12FunctionKey            = 0xF70F;
var NSInsertFunctionKey         = 0xF727;
var NSDeleteFunctionKey         = 0xF728;
var NSHomeFunctionKey           = 0xF729;
var NSBeginFunctionKey          = 0xF72A;
var NSEndFunctionKey            = 0xF72B;
var NSPageUpFunctionKey         = 0xF72C;
var NSPageDownFunctionKey       = 0xF72D;
var NSPrintScreenFunctionKey    = 0xF72E;
var NSScrollLockFunctionKey     = 0xF72F;
var NSPauseFunctionKey          = 0xF730;
var NSSysReqFunctionKey         = 0xF731;
var NSBreakFunctionKey          = 0xF732;
var NSResetFunctionKey          = 0xF733;
var NSStopFunctionKey           = 0xF734;
var NSMenuFunctionKey           = 0xF735;
var NSUserFunctionKey           = 0xF736;
var NSSystemFunctionKey         = 0xF737;
var NSPrintFunctionKey          = 0xF738;
var NSClearLineFunctionKey      = 0xF739;
var NSClearDisplayFunctionKey   = 0xF73A;
var NSInsertLineFunctionKey     = 0xF73B;
var NSDeleteLineFunctionKey     = 0xF73C;
var NSInsertCharFunctionKey     = 0xF73D;
var NSDeleteCharFunctionKey     = 0xF73E;
var NSPrevFunctionKey           = 0xF73F;
var NSNextFunctionKey           = 0xF740;
var NSSelectFunctionKey         = 0xF741;
var NSExecuteFunctionKey        = 0xF742;
var NSUndoFunctionKey           = 0xF743;
var NSRedoFunctionKey           = 0xF744;
var NSFindFunctionKey           = 0xF745;
var NSHelpFunctionKey           = 0xF746;
var NSModeSwitchFunctionKey     = 0xF747;
/* 
 * responder.js
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



var NSResponder = NSObject.extend({

    _nextResponder: null,
    
    nextResponder: function() {
        return this._nextResponder;
    },
    
    setNextResponder: function(aResponder) {
        this._nextResponder = aResponder;
    },
    
    tryToPerform: function(anAction, anObject) {
        
        if (this.respondsTo(anAction)) {
            this.perform(anAction, anObject);
            return true;
        }
        
        return this._nextResponder.tryToPerform(anAction, anObject);
    },
    
    performKeyEquivalent: function(theEvent) {
        return false;
    },
    
    mouseDown: function(theEvent) {
        console.log('sending mouse down to');
        console.log(this._nextResponder);
        this._nextResponder.mouseDown(theEvent);
    }

    // - (BOOL)performKeyEquivalent:(NSEvent *)theEvent
    // {
    //     return NO;
    // }
    // 
    // - (id)validRequestorForSendType:(NSString *)sendType returnType:(NSString *)returnType
    // {
    //     // TODO: Need to implement
    // }
    // 
    // - (void)mouseDown:(NSEvent *)theEvent
    // {
    //     [_nextResponder mouseDown:theEvent];
    // }
    // 
    // - (void)rightMouseDown:(NSEvent *)theEvent
    // {
    //     [_nextResponder rightMouseDown:theEvent];
    // }
    // 
    // - (void)otherMouseDown:(NSEvent *)theEvent
    // {
    //     [_nextResponder otherMouseDown:theEvent];
    // }
    // 
    // - (void)mouseUp:(NSEvent *)theEvent
    // {
    //     [_nextResponder mouseUp:theEvent];
    // }
    // 
    // - (void)rightMouseUp:(NSEvent *)theEvent
    // {
    //     [_nextResponder rightMouseUp:theEvent];
    // }
    // 
    // - (void)otherMouseUp:(NSEvent *)theEvent
    // {
    //     [_nextResponder otherMouseUp:theEvent];
    // }
    // 
    // - (void)mouseMoved:(NSEvent *)theEvent
    // {
    //     [_nextResponder mouseMoved:theEvent];
    // }
    // 
    // - (void)mouseDragged:(NSEvent *)theEvent
    // {
    //     [_nextResponder mouseDragged:theEvent];
    // }
    // 
    // - (void)scrollWheel:(NSEvent *)theEvent
    // {
    //     [_nextResponder scrollWheel:theEvent];
    // }
    // 
    // - (void)rightMouseDragged:(NSEvent *)theEvent
    // {
    //     [_nextResponder rightMouseDragged:theEvent];
    // }
    // 
    // - (void)otherMouseDragged:(NSEvent *)theEvent
    // {
    //     [_nextResponder otherMouseDragged:theEvent];
    // }
    // 
    // - (void)mouseEntered:(NSEvent *)theEvent
    // {
    //     [_nextResponder mouseEntered:theEvent];
    // }
    // 
    // - (void)mouseExited:(NSEvent *)theEvent
    // {
    //     [_nextResponder mouseExited:theEvent];
    // }
    // 
    // - (void)keyDown:(NSEvent *)theEvent
    // {
    //     [_nextResponder keyDown:theEvent];
    // }
    // 
    // - (void)keyUp:(NSEvent *)theEvent
    // {
    //     [_nextResponder keyUp:theEvent];
    // }
    // 
    // - (void)flagsChanged:(NSEvent *)theEvent
    // {
    //     // TODO: Need to implement
    // }
    // 
    // - (void)tabletPoint:(NSEvent *)theEvent
    // {
    //     // TODO: Need to implement
    // }
    // 
    // - (void)tabletProximity:(NSEvent *)theEvent
    // {
    //     // TODO: Need to implement
    // }
    // 
    // - (void)cursorUpdate:(NSEvent *)event
    // {
    //     // TODO: Need to implement
    // }
    // 
    // - (void)noResponderFor:(SEL)eventSelector
    // {
    //     if (eventSelector == @selector(keyDown:))
    //     {
    //         // TODO: Make a beeping sound
    //     }
    // }
    // 
    // - (BOOL)acceptsFirstResponder
    // {
    //     return NO;
    // }
    // 
    // - (BOOL)becomeFirstResponder
    // {
    //     return YES;
    // }
    // 
    // - (BOOL)resignFirstResponder
    // {
    //     return YES;
    // }
    // 
    // 
    // - (void)interpretKeyEvents:(NSArray *)eventArray
    // {
    //     NSInteger eventsCount = [eventArray count];
    //     for (int i = 0; i < eventsCount; i++)
    //     {
    //         // NSEvent *event = [eventArray objectAtIndex:i];
    //         //         NSString *eventString = [event charactersIgnoringModifiers];
    //         //         
    //         //         switch ([event keyCode]) {
    //         //             case NSBackspaceKey:
    //         //                 if ([self respondsToSelector:@selector(deleteBackward:)])
    //         //                     [self deleteBackward:event];
    //         //                 break;
    //         //             case NSTabKey:
    //         //                 if ([self respondsToSelector:@selector(insertTab:)])
    //         //                     [self insertTab:event];
    //         //                 break;
    //         //             default:
    //         //             NSLog(@"Does not respond to - interptretKeyEvents:");
    //         //         }
    //     }
    // }
    // 
    // - (void)flushBufferedKeyEvents
    // {
    //     // TODO: Need to implement
    // }
    // 
    // 
    // - (void)setMenu:(NSMenu *)menu
    // {
    //     // TODO: Need to implement
    // }
    // 
    // - (NSMenu *)menu
    // {
    //     // TODO: Need to implement
    // }
    // 
    // 
    // - (void)showContextHelp:(id)sender
    // {
    //     // TODO: Need to implement
    // }
    // 
    // 
    // - (void)helpRequested:(NSEvent *)eventPtr
    // {
    //     // TODO: Need to implement
    // }
    // 
    // 
    // - (BOOL)shouldBeTreatedAsInkEvent:(NSEvent *)theEvent
    // {
    //     // TODO: Need to implement
    // }
});
/* 
 * graphics_context.js
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


var NSGraphicsContextCurrent = null;

var NSGraphicsContext = NSObject.extend({
    
    // low level context: (2d context for canvas)
    _graphicsPort: null,
    
    // not flipped means origin is bottom left. A Flipped context has the origin
    // at the top left (opposite to what 2d canvas in browser has)
    _isFlipped: null,
    
    initWithGraphicsPort: function(graphicsPort, initialFlippedState) {
        this._graphicsPort = graphicsPort;
        this._isFlipped = initialFlippedState;
        return this;
    },
    
    graphicsPort: function() {
        return this._graphicsPort;
    },
    
    isFlipped: function() {
        return this._isFlipped;
    }
});

Object.extend(NSGraphicsContext, {
   
    graphicsContextWithGraphicsPort: function(graphicsPort, initialFlippedState) {
        return NSGraphicsContext.create('initWithGraphicsPort', graphicsPort, initialFlippedState);
    },
    
    currentContext: function() {
        return NSGraphicsContextCurrent;
    },
    
    setCurrentContext: function(context) {
        NSGraphicsContextCurrent = context;
    },
    
    saveGraphicsState: function() {
        var ctx = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSaveGState(ctx);
    },
    
    restoreGraphicsState: function() {
        var ctx = NSGraphicsContext.currentContext().graphicsPort();
        CGContextRestoreGState(ctx);     
    }
});
/* 
 * text.js
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

include ('app_kit/view');

// important character codes
var NSEnterCharacter                    = 0x0003;
var NSBackspaceCharacter                = 0x0008;
var NSTabCharacter                      = 0x0009;
var NSNewlineCharacter                  = 0x000a;
var NSFormFeedCharacter                 = 0x000c;
var NSCarriageReturnCharacter           = 0x000d;
var NSBackTabCharacter                  = 0x0019;
var NSDeleteCharacter                   = 0x007f;
var NSLineSeparatorCharacter            = 0x2028;
var NSParagraphSeparatorCharacter       = 0x2029;
                                    
// NSTextAlignment                  
var NSLeftTextAlignment		            = 0;
var NSRightTextAlignment	            = 1;
var NSCenterTextAlignment	            = 2;
var NSJustifiedTextAlignment	        = 3;
var NSNaturalTextAlignment	            = 4;
                                    
// NSWritingDirection               
var NSWritingDirectionNatural           = -1;
var NSWritingDirectionLeftToRight       = 0;
var NSWritingDirectionRightToLeft       = 1;
var NSTextWritingDirectionEmbedding     = (0 << 1);
var NSTextWritingDirectionOverride      = (1 << 1);
                                    
// Movement codes                   
var NSIllegalTextMovement		        = 0;
var NSReturnTextMovement		        = 0x10;
var NSTabTextMovement			        = 0x11;
var NSBacktabTextMovement		        = 0x12;
var NSLeftTextMovement			        = 0x13;
var NSRightTextMovement			        = 0x14;
var NSUpTextMovement			        = 0x15;
var NSDownTextMovement			        = 0x16;
var NSCancelTextMovement		        = 0x17;
var NSOtherTextMovement			        = 0;

// Notifications
var NSTextDidBeginEditingNotification   = "NSTextDidBeginEditingNotification";
var NSTextDidEndEditingNotification     = "NSTextDidEndEditingNotification";
var NSTextDidChangeNotification         = "NSTextDidChangeNotification";

/*
    @prototol NSTextDelegate
    
    Protocol defining the text delegate methods.
*/
var NSTextDelegate = {
    
    textShouldBeginEditing: function(textObject) {    
    },
    
    textShouldBeginEditing: function(textObject) {
    },
    
    textDidBeginEditing: function(aNotification) {
    },
    
    textDidEndEditing: function(aNotification) {
    },
    
    textDidChange: function(aNotification) {
    }
};
/* 
 * window.js
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


var NSBorderlessWindowMask              = 0;
var NSTitledWindowMask                  = 1 << 0;
var NSClosableWindowMask                = 1 << 1;
var NSMiniaturizableWindowMask          = 1 << 2;
var NSResizableWindowMask               = 1 << 3;
var NSTexturedBackgroundWindowMask      = 1 << 8;
var NSUnifiedTitleAndToolbarWindowMask  = 1 << 12;

var NSNormalWindowLevel                 = 10;
var NSFloatingWindowLevel               = 10;
var NSSubmenuWindowLevel                = 10;
var NSTornOffMenuWindowLevel            = 10;
var NSMainMenuWindowLevel               = 70;
var NSStatusWindowLevel                 = 10;
var NSModalPanelWindowLevel             = 10;
var NSPopUpMenuWindowLevel              = 60;
var NSScreenSaverWindowLevel            = 10;

var NSWindowCloseButton                 = 0;
var NSWindowMiniaturizeButton           = 1;
var NSWindowZoomButton                  = 2;
var NSWindowToolbarButton               = 3;
var NSWindowDocumentIconButton          = 4;

var NSWindowDidBecomeKeyNotification            = "NSWindowDidBecomeKeyNotification";
var NSWindowDidBecomeMainNotification           = "NSWindowDidBecomeMainNotification";
var NSWindowDidChangeScreenNotification         = "NSWindowDidChangeScreenNotification";
var NSWindowDidDeminiaturizeNotification        = "NSWindowDidDeminiaturizeNotification";
var NSWindowDidExposeNotification               = "NSWindowDidExposeNotification";
var NSWindowDidMiniaturizeNotification          = "NSWindowDidMiniaturizeNotification";
var NSWindowDidMoveNotification                 = "NSWindowDidMoveNotification";
var NSWindowDidResignKeyNotification            = "NSWindowDidResignKeyNotification";
var NSWindowDidResignMainNotification           = "NSWindowDidResignMainNotification";
var NSWindowDidResizeNotification               = "NSWindowDidResizeNotification";
var NSWindowDidUpdateNotification               = "NSWindowDidUpdateNotification";
var NSWindowWillCloseNotification               = "NSWindowWillCloseNotification";
var NSWindowWillMiniaturizeNotification         = "NSWindowWillMiniaturizeNotification";
var NSWindowWillMoveNotification                = "NSWindowWillMoveNotification";
var NSWindowWillBeginSheetNotification          = "NSWindowWillBeginSheetNotification";
var NSWindowDidEndSheetNotification             = "NSWindowDidEndSheetNotification";
var NSWindowDidChangeScreenProfileNotification  = "NSWindowDidChangeScreenProfileNotification";


var NSWindow = NSResponder.extend({
    
    _contentRectOrigin: null,
    _contentRectSize: null,

    _isVisible: false,

    _hasShadow: true,
    _hidesOnDeactivate: false,
    _releasedWhenClosed: true,
    _styleMask: 0,
    _title: "Window",
    _visibleAtLaunch: true,
    _resizable: true,

    _showNormalTitlebar: true,
    _unifiedTitleAndToolbar: false,

    _toolbar: null,

    _contentView: null,

    _delegate: null,
    _windowNumber: -1,

    _frame: null,
    _bounds: null,
    _visible: false,

    _level: 0,
    _keyWindow: false,
    _mainWindow: false,
    _firstResponder: null,

    _movableByWindowBackground: true,

    _eventBindingCurrent: null,

    _windowCloseButton: null,
    _fieldEditor: null,

    _maxSize: null,
    _minSize: null,
    _wtFlags: 0,
    _windowClass: null,


    _DOMContainer: null,         // Usually an "outer div" to hold the graphics context aswell as subviews' containers
    _DOMGraphicsContext: null,   // Rendering context: usually a canvas (exceptions for DOM rendering and VML)
    _graphicsContext: null,      // a cache of the actual graphics context (from canvas, or VML representation).
    
    DOMContainer: function() {
        return this._DOMContainer;
    },
    
    contentRectForFrameRect: function(frameRect) {
        return CGRectMake(0, 0, frameRect.size.width, frameRect.size.height);
    },
    
    frameRectForContentRect: function(contentRect) {
        return contentRect;
    },
    
    init: function() {
        this._super();
        return this;
    },
    
    initWithContentRectAndStyleMask: function(contentRect, aStyle) {
        this.init();
                
        // DOM etc
        this._DOMContainer = document.createElement('div');
        this._DOMGraphicsContext = document.createElement('canvas');
        this._DOMContainer.appendChild(this._DOMGraphicsContext);
        document.body.appendChild(this._DOMContainer);
        
        this._DOMContainer.style.display = "block";
        this._DOMContainer.style.position = "absolute";
        
        this._DOMGraphicsContext.style.display = "block";
        this._DOMGraphicsContext.style.position = "absolute";
        
        this._windowNumber = NSApplication.sharedApplication().addWindow(this);
        this._styleMask = aStyle;
        this._level = NSNormalWindowLevel;
        
        this._minSize = NSMakeSize(0.0, 0.0);
        this._maxSize = NSMakeSize(9999.0, 9999.0);
        this._frame = this.frameRectForContentRect(contentRect);
        this._firstResponder = this;
        
        this.setContentView(NSView.create('initWithFrame', contentRect));
        this.setNextResponder(NSApplication.sharedApplication());
        this.setFrame(this.frameRectForContentRect(contentRect), false);
        this.setNeedsDisplay(true);
        
        return this;
    },
    
    mouseDown: function(theEvent) {
        // this.makeMainWindow();     
        this._eventBindingCurrent = theEvent.locationInWindow();
        
        NSApplication.sharedApplication().bindEventsMatchingMask((NSLeftMouseUpMask | NSMouseMovedMask), this, function(theEvent) {
            
            if (theEvent.type() == NSLeftMouseUp) {
                NSApplication.sharedApplication().unbindEvents();
                return;
            }
            
            var location = theEvent.locationInWindow();
            
            // if we move the mouse too quickly, the mouse may jump outside the window, so that the location
            // in the window will be null. therefore, we need to get the location from the cursor's location
            // on screen, and adjust it into this window's co-ordinates. hack, but it works.
            if (!location) {
                location = this.convertScreenToBase(theEvent.locationInScreen());
            }
            
            var newOrigin = NSMakePoint(this._frame.origin.x + (location.x - this._eventBindingCurrent.x),
                                        this._frame.origin.y + (location.y - this._eventBindingCurrent.y));
            
            this.setFrameOrigin(newOrigin);
            
        });
    },

    title: function() {
        return this._title;
    },
    
    setTitle: function(aString) {
        this._title = aString;
        this.setNeedsDisplay(true);
    },
    
    setRepresentedURL: function(url) {
        
    },
    
    representedURL: function() {
        
    },
    
    representedFilename: function() {
        
    },
    
    setRepresentedFilename: function(aString) {
        
    },
    
    isExcludedFromWindowsMenu: function() {
        return false;
    },
    
    setContentView: function(aView) {
        if (this._contentView)
            this._contentView.removeFromSuperview();
    
        this._contentView = aView;
        
        aView.viewWillMoveToSuperview(null);
        aView.viewWillMoveToWindow(this);
        aView.setFrame(this.contentRectForFrameRect(this.frame()));
        aView.viewDidMoveToSuperview();
        aView.viewDidMoveToWindow();
        aView.setNextResponder(this);
        this._DOMContainer.appendChild(aView._DOMContainer);
    },
    
    contentView: function() {
        return this._contentView;
    },
    
    setDelegate: function(anObject) {
        this._delegate = anObject;
    },
    
    delegate: function() {
        return this._delegate;
    },
    
    windowNumber: function() {
        return this._windowNumber;
    },
    
    fieldEditorForObject: function(createFlag, anObject) {
        if (!this._fieldEditor) {
            this._fieldEditor = NSTextView.create('initWithFrame', NSMakeRect(0, 0, 0, 0));
            this._fieldEditor.viewWillMoveToWindow(this);
            return this._fieldEditor;
        }
        else {
            if (this._fieldEditor.resignFirstResponder())
                return this._fieldEditor;
            
            this._fieldEditor = NSTextView.create('initWithFrame', NSMakeRect(0, 0, 0, 0));        
            this._fieldEditor.viewWillMoveToWindow(this);
            return this._fieldEditor;
        }
    },
    
    endEditingFor: function(anObject) {
        this._fieldEditor.removeFromSuperview();
        this._fieldEditor.setString("");
    },
    
    setFrame: function(frameRect, flag, animate) {
        this._frame = frameRect;
        
        var actualFrameRect = this.frameRectForContentRect(this._frame);
        
        CGDOMElementSetFrame(this._DOMContainer, actualFrameRect);
        CGDOMElementSetFrame(this._DOMGraphicsContext, NSMakeRect(0, 0, actualFrameRect.size.width, actualFrameRect.size.height));
        
        this._contentView.setFrame(this.contentRectForFrameRect(this._frame));
        
        this.setNeedsDisplay(true);
    },
    
    setContentSize: function(aSize) {
        
    },
    
    setFrameOrigin: function(aPoint) {
        this._frame.origin = aPoint;
        CGDOMElementSetFrameOrigin(this._DOMContainer, this.frameRectForContentRect(this._frame).origin);
    },
    
    frame: function() {
        return this._frame;
    },
    
    bounds: function() {
        var frameRect = this.contentRectForFrameRect(this._frame);
        return frameRect;
        // return NSMakeRect(0, 0, this._frame.size.width, this._frame.size.height);
    },
    
    animationResizeTime: function(newFrame) {
        
    },

    setShowsResizeIndicator: function(show) {
        
    },
    
    showsResizeIndication: function() {
        
    },
    
    setResizeIncrements: function(increments) {
        
    },
    
    reszieIncrements: function() {
        
    },
    
    setAspectRatio: function(ratio) {
        
    },
    
    aspectRatio: function() {
        
    },
    
    useOptimizedDrawing: function(flag) {
        
    },
    
    setViewsNeedDisplay: function(flag) {
        
    },
    
    viewsNeedDisplay: function() {
        
    },
    
    displayIfNeeded: function() {
        
    },
    
    display: function() {
        
    },
    
    setAutodisplay: function(flag) {
        
    },
    
    isAutodisplay: function() {
        
    },
    
    preservesContentDuringLiveResize: function() {
        
    },
    
    setPreservesContentDuringLiveResize: function(flag) {
        
    },
    
    update: function() {
        
    },
    
    makeFirstResponder: function(aResponder) {
        
    },
    
    firstResponder: function() {
        
    },
    
    resizeFlags: function() {
        
    },
    
    keyDown: function(theEvent) {
        
    },
    
    close: function() {
        console.log('window needs to close');
        document.body.removeChild(this._DOMContainer);
    },
    
    setReleasedWhenClosed: function(flag) {
        
    },
    
    isReleasedWhenClosed: function() {
        
    },
    
    miniaturize: function(sender) {
        
    },
    
    deminiaturize: function(sender) {
        
    },
    
    isZoomed: function() {
        
    },
    
    zoom: function(sender) {
        
    },
    
    isMiniaturized: function() {
        
    },
    
    tryToPerform: function(anAction, anObject) {
        
    },
    
    setBackgroundColor: function(color) {
        
    },
    
    backgroundColor: function() {
        
    },
    
    setContentBorderThicknessForEdge: function(thicknedd, edge) {
        
    },
    
    contentBorderThickneddForEdge: function(edge) {
        
    },
    
    setMovableByWindowBackground: function(flag) {
        
    },
    
    isMovableByWindowBackground: function() {
        
    },
    
    setHidesOnDeactivate: function(flag) {
        
    },
    
    hidesOnDeactivate: function() {
        
    },
    
    center: function() {
        
    },
    
    makeKeyAndOrderFront: function(sender) {
        
    },
    
    orderFront: function(sender) {
        
    },
    
    orderBack: function(sender) {
        
    },
    
    orderOut: function(sender) {
        
    },
    
    orderWindowRelativeTo: function(place, otherWin) {
        
    },
    
    orderFrontRegardless: function() {
        
    },
    
    setMiniwindowImage: function(image) {
        
    },
    
    setMiniwindowTitle: function(title) {
        
    },
    
    miniwindowImage: function() {
        
    },
    
    miniwindowTitle: function() {
        
    },
    
    setDocumentEdited: function(flag) {
        
    },
    
    isDocumentEdited: function() {
        
    },
    
    isVisible: function() {
        
    },
    
    isKeyWindow: function() {
        
    },
    
    isMainWindow: function() {
        
    },
    
    canBecomeKeyWindow: function() {
        
    },
    
    canBecomeMainWindow: function() {
        
    },
    
    makeKeyWindow: function() {
        
    },
    
    makeMainWindow: function() {
        
    },
    
    becomeKeyWindow: function() {
        
    },
    
    becomeMainWindow: function() {
        
    },
    
    resignKeyWindow: function() {
        
    },
    
    resignMainWindow: function() {
        
    },
    
    worksWhenModal: function() {
        return false;
    },
    
    convertBaseToScreen: function(aPoint) {
        
    },
    
    convertScreenToBase: function(aPoint) {
        return {
            x: aPoint.x - this._frame.origin.x,
            y: aPoint.y - this._frame.origin.y
        };
    },
    
    performClose: function(sender) {
        
    },
    
    performMiniaturize: function(sender) {
        
    },
    
    performZoom: function(sender) {
        
    },
    
    setOneShot: function(flag) {
        
    },
    
    isOneShot: function() {
        
    },
    
    disableCursorRects: function() {
        
    },
    
    enableCursorRects: function() {
        
    },
    
    discardCursorRects: function() {
        
    },
    
    areCursorRectsEnabled: function() {
        
    },
    
    invalidateCursorRectsForView: function(aView) {
        
    },
    
    resetCursorRects: function() {
        
    },
    
    setLevel: function(newLevel) {
        this._DOMContainer.style.zIndex = newLevel;
        this._level = newLevel;
    },
    
    level: function() {
        return this._level;
    },
    
    screen: function() {
        
    },
    
    setHasShadow: function(hasShadow) {
        this._hasShadow = hasShadow;
    },
    
    hasShadow: function() {
        return this._hasShadow;
    },
    
    invalidateShadow: function() {
        
    },
    
    setAlphaValue: function(windowAlpha) {
        
    },
    
    alphaValue: function() {
        
    },
    
    setOpaque: function(isOpaque) {
        
    },
    
    isOpaque: function() {
        
    },
    
    cacheImageInRect: function(aRect) {
        
    },
    
    restoreCachedImage: function() {
        
    },
    
    discardCachedImage: function() {
    
    },
    
    minSize: function() {
        
    },
    
    maxSize: function() {
        
    },
    
    setMinSize: function(size) {
        
    },
    
    setMaxSize: function(size) {
        
    },
    
    postEvent: function(theEvent, flag) {
        
    },
    
    currentEvent: function() {
        
    },
    
    setAcceptsMouseMovedEvents: function(flag) {
        
    },
    
    acceptsMouseMovedEvents: function() {
        
    },
    
    setIgnoresMouseEvents: function(flag) {
        
    },
    
    ignoresMouseEvents: function() {
        
    },
    
    sendEvent: function(theEvent) {
        var hitTest, aPoint = theEvent.locationInWindow();
        
        switch (theEvent.type()) {
            case NSLeftMouseDown:
                hitTest = this._contentView.hitTest(aPoint);
                if (hitTest) {
                    hitTest.mouseDown(theEvent);
                    // console.log(hitTest);
                }
                else {
                    console.log('Sending mouse down to (else)');
                }
                break;
            case NSLeftMouseUp:
                console.log('mouse up;');
                break;
        }
    },
    
    mouseLocationOutsideOfEventStream: function() {
        
    },
    
    windowController: function() {
        
    },
    
    setWindowController: function(windowController) {
        
    },
    
    isSheet: function() {
        
    },
    
    attatchedSheet: function() {
        
    },
    
    addChildWindow: function(childWin, place) {
        
    },
    
    removeChildWindow: function(childWin) {
        
    },
    
    childWindows: function() {
        
    },
    
    parentWindow: function() {
        
    },
    
    setParentWindow: function(window) {
        
    },
    
    graphicsContext: function() {
        return this._DOMGraphicsContext.getContext('2d');
    },

    setInitialFirstResponder: function(view) {
        
    },
    
    initialFirstResponder: function() {
        
    },
    
    selectNextKeyView: function(sender) {
        
    },
    
    selectPreviousKeyView: function(sender) {
        
    },
    
    selectKeyViewFollowingView: function(aView) {
        
    },
    
    selectKeyViewPrecedingView: function(aView) {
        
    },
    
    keyViewSelectionDirection: function() {
        
    },
    
    setDefaultButtonCell: function(defButt) {
	
	},
	
	defautButtonCell: function() {
		
	},
	
	recalculateKeyViewLoop: function() {
		
	},
	
	setToolbar: function(toolbar) {
		
	},
	
	toolbar: function() {
		
	},
	
	toggleToolbarShown: function(sender) {
		
	},
	
	runToolbarCustomizationPalette: function(sender) {
		
	},
	
	setShowsToolbarButton: function(show) {
		
	},
	
	showsToolbarButton: function() {
		
	},
	
	dragImage: function(anImage, baseLocation, initialOffset, theEvent, pboard, sourceObj, slideFlag) {
		
	},
	
	registerForDraggedTypes: function(newTypes) {
		
	},
	
	unregisterDraggedTypes: function() {
		
	},
	
	canDraw: function() {
		
	},
	
	setNeedsDisplay: function(flag) {
        // if (flag) {
        //     var actualBounds = this.frameRectForContentRect(this._frame);
        //     actualBounds.origin.x = 0;
        //     actualBounds.origin.y = 0;
        //     this.setNeedsDisplayInRect(actualBounds);
        // }
        this.setNeedsDisplayInRect(this.bounds());
	},
	
	setNeedsDisplayInRect: function(invalidRect) {

		this.displayRect(invalidRect);
	},
	
	needsDisplay: function() {
		
	},
	
	lockFocus: function() {
		if (!this._graphicsContext)
			this._graphicsContext = NSGraphicsContext.graphicsContextWithGraphicsPort(this._DOMGraphicsContext.getContext('2d'), false);
		
		NSGraphicsContext.setCurrentContext(this._graphicsContext);
		CGContextSaveGState(this._graphicsContext.graphicsPort());
	},
	
	unlockFocus: function() {
		CGContextRestoreGState(this._graphicsContext.graphicsPort());
		NSGraphicsContext.setCurrentContext(null);
	},
	
	lockFocusIfCanDraw: function() {
		
	},
	
	lockFocusIfCanDrawInContext: function(context) {
		
	},
	
	display: function() {
		this.displayRect(this.bounds());
	},
	
	displayIfNeeded: function() {
		if (this.needsDisplay())
			this.displayRect(this.bounds());
	},
	
	displayIfNeededIgnoringOpacity: function() {
		
	},
	
	displayRect: function(rect) {
		this.displayRectIgnoringOpacityInContext(rect, null);
	},
	
	displayIfNeededInRect: function(rect) {
		if (this.needsDisplay())
			this.displayRect(this.bounds());
	},

    drawRect: function(rect) {
		var c = NSGraphicsContext.currentContext().graphicsPort();
		CGContextClearRect(c, rect);
		CGContextSaveGState(c);
		console.log('drawing window');
		CGContextSetFillColor(c, [0.944, 0.944, 0.944, 1.0]);
		CGContextFillRect(c, rect);
	},
	
	displayRectIgnoringOpacityInContext: function(aRect, context) {
		this.lockFocus();
		this.drawRect(aRect);
		this.unlockFocus();
	},

    bitmapImageRepForCachingDisplayInRect: function(aRect) {
	
	},
	
	cacheDisplayInRectToBitmapImageRep: function(aRect, bitmapImageRep) {
		
	}
});
/* 
 * application.js
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


var NSApp = null;

var NSModalPanelRunLoopMode                             = "NSModalPanelRunLoopMode";
var NSEventTrackingRunLoopMode                          = "NSEventTrackingRunLoopMode";

var NSApplicationDidBecomeActiveNotification            = "NSApplicationDidBecomeActiveNotification";
var NSApplicationDidHideNotification                    = "NSApplicationDidHideNotification";
var NSApplicationDidFinishLaunchingNotification         = "NSApplicationDidFinishLaunchingNotification";
var NSApplicationDidResignActiveNotification            = "NSApplicationDidResignActiveNotification";
var NSApplicationDidUnhideNotification                  = "NSApplicationDidUnhideNotification";
var NSApplicationDidUpdateNotification                  = "NSApplicationDidUpdateNotification";
var NSApplicationWillBecomeActiveNotification           = "NSApplicationWillBecomeActiveNotification";
var NSApplicationWillHideNotification                   = "NSApplicationWillHideNotification";
var NSApplicationWillFinishLaunchingNotification        = "NSApplicationWillFinishLaunchingNotification";
var NSApplicationWillResignActiveNotification           = "NSApplicationWillResignActiveNotification";
var NSApplicationWillUnhideNotification                 = "NSApplicationWillUnhideNotification";
var NSApplicationWillUpdateNotification                 = "NSApplicationWillUpdateNotification";
var NSApplicationWillTerminateNotification              = "NSApplicationWillTerminateNotification";
var NSApplicationDidChangeScreenParametersNotification  = "NSApplicationDidChangeScreenParametersNotification";


var NSApplication = NSResponder.extend({
    
    _delegate: null,
    
    _windows: [],
    
    _currentEvent: null,
    
    _eventQueue: [],
    
    _eventBindingQueued: false,
    
    _eventBindingTarget: null,
    
    _eventBindingBlock: null,
    
    _eventBindingMask: null,
    
    _menuBar: null,
    
    _mainMenu: null,
    
    init: function() {
        // this._super();
        return this;
    },
    
    /**
        Sets the delegate for the singleton instance of NSApplication. This will
        also register the delegate for any NSApp related notifications that it
        responds to. Any that it does not implement, will not be registered.
        
        @param anObject The delegate object (usually setup in MainMenu.nib)
    */
    setDelegate: function(anObject) {
        if (this._delegate == anObject)
            return;
        
        var nc = NSNotificationCenter.defaultCenter();
        
        if (this._delegate) {
            nc.removeObserver(this._delegate, NSApplicationWillFinishLaunchingNotification, this);
            nc.removeObserver(this._delegate, NSApplicationDidFinishLaunchingNotification, this);
        }
        
        this._delegate = anObject;
        
        if (this._delegate.respondsTo('applicationWillFinishLaunching'))
            nc.addObserver(this._delegate, 'applicationWillFinishLaunching', NSApplicationWillFinishLaunchingNotification, this);
        
        if (this._delegate.respondsTo('applicationDidFinishLaunching'))
            nc.addObserver(this._delegate, 'applicationDidFinishLaunching', NSApplicationDidFinishLaunchingNotification, this);
    },
    
    delegate: function() {
        return this._delegate;
    },
    
    context: function() {
        
    },
    
    windowWithWindowNumber: function(windowNum) {
        
    },
    
    addWindow: function(aWindow) {
        
        this._windows.push(aWindow);
        return this._windows.indexOf(aWindow);
    },
    
    windowAtPoint: function(point) {
        for (var i = 0; i < this._windows.length; i++) {
            if(NSPointInRect(point, this._windows[i].frame())) {
                return this._windows[i];
            }
        }

        return null;
    },
    
    mainWindow: function() {
        
    },
    
    keyWindow: function() {
        
    },
    
    isRunning: function() {
        
    },
    
    finishLaunching: function() {
        
    },
    
    /**
        Runs the application once all necessary parts are loaded. Event handlers
        are attatched here.
    */
    run: function() {
        document.onmousedown = NSEventFromRawEvent;
        document.onmouseup = NSEventFromRawEvent;
        document.onmousemove = NSEventFromRawEvent;
    },
   
    postEvent: function(theEvent, atStart) {
        
    },
    
    currentEvent: function() {
        return this._currentEvent;
    },
    
    sendEvent: function(theEvent) {
        this._currentEvent = theEvent;
        if (this._eventBindingQueued) {   
            if (((1 << theEvent.type()) & this._eventBindingMask) != 0) {
                this._eventBindingCallback.apply(this._eventBindingContext, [theEvent]);
            }
            else {
                console.log('dropping event, as not matching bind mask');
            }
            return;
        }
        
        if (theEvent.window())
            theEvent.window().sendEvent(theEvent);
        else // no window so drop event. dont drop if a key event?
            console.log('dropping event, as no window');
    },
    
    /**
        This will bind any event matching the mask, and pass the event onto the
        call back function specified. All other events that are not within this
        criteria will be dropped. 
        
        This is useful for tracking the mouse, e.g. in controls like a slider. 
        Requesting the mouse move and mouse up events will allow the control
        to acurately track the mouse as it moves a slider.
        
        It is cruicial that the unbindEvents method is called when the need
        for events is through (usually on the mouse up event).
        
        The callback will be of the form function(theEvent) { ... };
        
        The context will be the 'this' inside of the object. This is usually
        set to be the receiver, but can be any custom object. It is recomended
        to use the receiver, as this ensures that the function executes in the
        same context as it was created.
    */
    bindEventsMatchingMask: function(mask, context, withCallback) {
        this._eventBindingQueued = true;
        this._eventBindingCallback = withCallback;
        this._eventBindingMask = mask;
        this._eventBindingContext = context;
    },
    
    /**
        Unbinds the event request, so that normal event passing may resume. See
        bindEventsMatchingMask for more.
    */
    unbindEvents: function() {
        this._eventBindingQueued = false;
    },
    
    preventWindowOrdering: function() {
        
    },
    
    makeWindowsPerform: function(aSelector, inOrder) {
        
    },
    
    windows: function() {
        
    },
    
    setWindowsNeedUpdate: function(needUpdate) {
        
    },
    
    updateWindows: function() {
        
    },
    
    setMainMenu: function(aMenu) {
        this._mainMenu = aMenu;
        
        if (!this._menuBar) {
            this._menuBar = NSMainMenu.create('initWithMainMenu', this._mainMenu);
        }
        
        this._menuBar.setMainMenu(this._mainMenu);
    },
    
    mainMenu: function() {
        return this._mainMenu;
    },
    
    setApplicationIconImage: function(image) {
        
    },
    
    applicationIconImage: function() {
        
    },
    
    sendAction: function(theAction, theTarget, sender) {
        if (theAction && theTarget)
            theTarget[theAction](sender);
    },
    
    targetForAction: function(theAction, theTarget, theSender) {
        
    },

    tryToPerform: function (anAction, anObject) {
        
    }
});

Object.extend(NSApplication, {

    /**
        Returns the singleton instance of the NSApplication object that exists
        for the application. This creates NSApp if it does not already exist.
        
        It is pretty safe to just reference NSApp itself in code, as it will 
        already have been created before any user code is likely to run, 
        assuming that no user code exists in the global scope.
    */
    sharedApplication: function() {
        
        if (!NSApp) NSApp = NSApplication.create();
	    return NSApp;
    }
});

/**
    This function is called to initialize the application once all resources 
    have been loaded. It is called by default from within an app's main()
    function, and should not be called otherwise. Calling this more than 
    once will likely have undefined results, with, at minimum, a duplicate
    interface defined in the main nib file.
*/
function NSApplicationMain(argc, argv)
{
	var mainBundle = NSBundle.mainBundle();
	var principalClass = mainBundle.principalClass();
    var topLevel = NSBundle.loadNibNamed("MainMenu", principalClass.sharedApplication());
    
    for (var idx = 0; idx < topLevel.length; idx++) {
        if (topLevel[idx] && topLevel[idx]._title == "Main Menu") {
            principalClass.sharedApplication().setMainMenu(topLevel[idx]);
        }
    }
    
	principalClass.sharedApplication().run();
	return 0;
}
/* 
 * attributed_string.js
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


/**
    Attributes used for strings. If not present, then defaults will be used 
    instead.
*/
var NSFontAttributeName                 = "NSFontAttributeName";
var NSParagraphStyleAttributeName       = "NSParagraphStyleAttributeName";
var NSForegroundColorAttributeName      = "NSForegroundColorAttributeName";
var NSUnderlineStyleAttributeName       = "NSUnderlineStyleAttributeName";
var NSSuperscriptAttributeName          = "NSSuperscriptAttributeName";
var NSBackgroundColorAttributeName      = "NSBackgroundColorAttributeName";
var NSAttachmentAttributeName           = "NSAttachmentAttributeName";
var NSLigatureAttributeName             = "NSLigatureAttributeName";
var NSBaselineOffsetAttributeName       = "NSBaselineOffsetAttributeName";
var NSKernAttributeName                 = "NSKernAttributeName";
var NSLinkAttributeName                 = "NSLinkAttributeName";

var NSStrokeWidthAttributeName          = "NSStrokeWidthAttributeName";
var NSStrokeColorAttributeName          = "NSStrokeColorAttributeName";
var NSUnderlineColorAttributeName       = "NSUnderlineColorAttributeName";
var NSStrikethroughStyleAttributeName   = "NSStrikethroughStyleAttributeName";
var NSStrikethroughColorAttributeName   = "NSStrikethroughColorAttributeName";
var NSShadowAttributeName               = "NSShadowAttributeName";
var NSObliquenessAttributeName          = "NSObliquenessAttributeName";
var NSExpansionAttributeName            = "NSExpansionAttributeName";
var NSCursorAttributeName               = "NSCursorAttributeName";
var NSToolTipAttributeName              = "NSToolTipAttributeName";

// NSUnderlineStyleAttributeName and NSStrikethroughStyleAttributeName
var NSUnderlineStyleNone                = 0x00;
var NSUnderlineStyleSingle              = 0x01;
var NSUnderlineStyleThick               = 0x02;
var NSUnderlineStyleDouble              = 0x09;

var NSUnderlinePatternSolid             = 0x0000;
var NSUnderlinePatternDot               = 0x0100;
var NSUnderlinePatternDash              = 0x0200;
var NSUnderlinePatternDashDot           = 0x0300;
var NSUnderlinePatternDashDotDot        = 0x0400;

NSAttributedString.mixin({
	
	fontAttributesInRange: function(range) {
		
	},
	
	lineBreakBeforeIndex: function(location, withinRange) {
		
	},
	
	lineBreakByHyphenatingBeforeIndex: function(location, withinRange) {
		
	},
	
	doubleClickAtIndex: function(location) {
		
	},
	
	nextWordFromIndex: function(location, isForward) {
		
	},
	
	URLAtIndex: function(location, effectiveRange) {
		
	},
	
	rangeOfTextBlock: function(block, atIndex) {
		
	},
	
	rangeOfTextTable: function(table, atIndex) {
		
	},
	
	rangeOfTextList: function(list, atIndex) {
		
	},
	
	itemNumberInTextList: function(list, atIndex) {
		
	}
});
/* 
 * view.js
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
 
 
// 
var NSViewNotSizable    = 0;
var NSViewMinXMargin    = 1;
var NSViewWidthSizable  = 2;
var NSViewMaxXMargin    = 4;
var NSViewMinYMargin    = 8;
var NSViewHeightSizable = 16;
var NSViewMaxYMargin    = 32;

// NSBorderType
var NSNoBorder          = 0;
var NSLineBorder        = 1;
var NSBezelBorder       = 2;
var NSGrooveBorder      = 3;

var NSViewFrameDidChangeNotification            = "NSViewFrameDidChangeNotification";
var NSViewFocusDidChangeNotification            = "NSViewFocusDidChangeNotification";
var NSViewBoundsDidChangeNotification           = "NSViewBoundsDidChangeNotification";
var NSViewGlobalFrameDidChangeNotification      = "NSViewGlobalFrameDidChangeNotification";
var NSViewDidUpdateTrackingAreasNotification    = "NSViewDidUpdateTrackingAreasNotification";

var NSView = NSResponder.extend({
    
    _frame: null,
    _bounds: null,
    _window: null,
    _gState: null,
    
    _menu: null,
    _superview: null,
    _subviews: null,
    
    _nextKeyView: null,
    _previousKeyView: null,
    
    _isHidden: null,
    _postsNotificationOnFrameChange: null,
    _postsNotificationOnBoundsChange: null,
    _autoresizesSubviews: null,
    _inLiveResize: null,
    _autoresizingMask: null,
    
    _tag: null,
    _draggedTypes: null,
    _defaultToolTipTag: null,
    _toolTip: null,
    
    _invalidRect: null,
    
    _validTransforms: null,
    _transformFromWindow: null,
    _transformToWindow: null,
    _visibleRect: null,
    
    _DOMContainer: null,
    _DOMGraphicsContext : null,
    
    _graphicsContext: null,
    
    /**
        The containing DOM element for the view (usually a div)
    */
    DOMContainer: function() {
        
        return this._DOMContainer;
    },
    
    init: function() {
        this._DOMContainer = document.createElement('div');
        this._DOMGraphicsContext = document.createElement('canvas');
        this._DOMContainer.appendChild(this._DOMGraphicsContext);
        
        this._DOMContainer.style.display = "block";
        this._DOMContainer.style.position = "absolute";
        
        this._DOMGraphicsContext.style.display = "block";
        this._DOMGraphicsContext.style.position = "absolute";
        
        return this;
    },
    
    /**
        Initialize with the given frame
    */
    initWithFrame: function(frameRect) {
        
        // this.init();
        
        this._DOMContainer = document.createElement('div');
        this._DOMGraphicsContext = document.createElement('canvas');
        this._DOMContainer.appendChild(this._DOMGraphicsContext);
        
        this._DOMContainer.style.display = "block";
        this._DOMContainer.style.position = "absolute";
        
        this._DOMGraphicsContext.style.display = "block";
        this._DOMGraphicsContext.style.position = "absolute";
        
        this.setFrame(frameRect);
        return this;
    },
    
    /**
        Initialize with the given coder
    */
    initWithCoder: function(aCoder) {
        
        this._DOMContainer = document.createElement('div');
        this._DOMGraphicsContext = document.createElement('canvas');
        this._DOMContainer.appendChild(this._DOMGraphicsContext);
        
        this._DOMContainer.style.display = "block";
        this._DOMContainer.style.position = "absolute";
        
        this._DOMGraphicsContext.style.display = "block";
        this._DOMGraphicsContext.style.position = "absolute";
        
        this._frame = NSMakeRect(0, 0, 0, 0);
        this._bounds = NSMakeRect(0, 0, 0, 0);
        
        if (aCoder.containsValueForKey("NSFrame"))
            this._frame = aCoder.decodeRectForKey("NSFrame");
        else if (aCoder.containsValueForKey("NSFrameSize"))
            this._frame.size = aCoder.decodeSizeForKey("NSFrameSize");
        
        this.setFrame(this._frame);
        
        var subviews = aCoder.decodeObjectForKey("NSSubviews");
        this._superview = aCoder.decodeObjectForKey("NSSuperview");
        this._window = null;
        this._subviews = [];
        
        if (subviews) {
            for (var idx = 0; idx < subviews.length; idx++) {
                this.addSubview(subviews[idx]);
            }
        }
        
        this._bounds.origin = NSMakePoint(0, 0);
        this._bounds.size = this._frame.size;
        
        return this;
    },
    
    window: function() {
        return this._window;
    },
    
    superview: function() {
        return this._superview;
    },
    
    subviews: function() {
        return this._subviews;
    }, 
    
    isDescendantOf: function(aView) {
        
    },
    
    ancestorSharedWithView: function(aView) {
        
    },
    
    opaqueAncestor: function() {
        
    },
    
    setHidden: function(flag) {
        
    },
    
    isHidden: function() {
        
    },
    
    isHiddenOrHasHiddenAncestor: function() {
        
    },
    
    needsToDrawRect: function(aRect) {
        
    },
    
    wantsDefaultClipping: function() {
        
    },
    
    viewDidHide: function() {
        
    },
    
    viewDidUnhide: function() {
        
    },
    
    setSubviews: function(newSubviews) {
        
    },
    
    addSubview: function(aView) {
        aView.viewWillMoveToSuperview(this);
        aView.viewWillMoveToWindow(this._window);
        this._DOMContainer.appendChild(aView.DOMContainer());
        aView.viewDidMoveToSuperview();
        aView.viewDidMoveToWindow();
        this.didAddSubview(aView);
        this._subviews.addObject(aView);
    },
    
    addSubviewPositionedRelativeTo: function(aView, place,otherView) {
        
    },
    
    sortSubviewsUsingFunction: function(compare, context) {
        
    },
    
    viewWillMoveToWindow: function(newWindow) {
        
        // this._window = newWindow;
        
        // for (var i = 0; i < this._subviews.count(); i++) {
            // this._subviews.objectAtIndex(i).viewWillMoveToWindow(newWindow);
        // }
    },
    
    viewDidMoveToWindow: function() {
        
    },
    
    viewWillMoveToSuperview: function(newSuperview) {
        this._superview = newSuperview;
    },
    
    viewDidMoveToSuperview: function() {
        this.setNeedsDisplay(true);
    },
    
    didAddSubview: function(subview) {
        
    },
    
    willRemoveSubview: function(subview) {
        
    },
    
    removeFromSuperview: function() {
        
        var theParentElement;
        
        if (this._superview) {
            theParentElement = this._superview.DOMContainer();
            theParentElement.removeChild(this._DOMContainer);
        }
        else if (this._window) {
            theParentElement = this._window.DOMContainer();
            theParentElement.removeChild(this._DOMContainer);
        }
    },
    
    replaceSubview: function(oldView, newView) {
        
    },
    
    removeFromSuperviewWithoutNeedingDisplay: function() {
        
    },
    
    setPostsFrameChangedNotifications: function(flag) {
        
    },
    
    postsFrameChangedNotifications: function() {
        
    },
    
    resizeSubviewsWithOldSize: function(oldSize) {
        
    },
    
    resizeWithOldSuperviewSize: function(oldSize) {
        
    },
    
    setAutoresizesSubviews: function(flag) {
        
    },
    
    autoresizesSubviews: function() {
        
    },
    
    setAutoresizingMask: function(mask) {
        
    },
    
    autoresizingMask: function() {
        
    },
    
    setFrameOrigin: function(newOrigin) {
        
    },
    
    setFrameSize: function(newSize) {
        this._frame.size = newSize;
        CGDOMElementSetFrame(this._DOMContainer, this._frame);
        CGDOMElementSetFrame(this._DOMGraphicsContext, this.bounds());
        this.setNeedsDisplay(true);
    },
    
    setFrame: function(frameRect) {
        this._frame = frameRect;
        CGDOMElementSetFrame(this._DOMContainer, this._frame);
        CGDOMElementSetFrame(this._DOMGraphicsContext, this.bounds());
        this.setNeedsDisplay(true);
    },
    
    frame: function() {
        return this._frame;
    },
    
    setFrameRotation: function(angle) {
        
    },
    
    frameRotation: function() {
        
    },
    
    setFrameCenterRotation: function(angle) {
        
    },
    
    frameCenterRotation: function() {
        
    },
    
    setBoundsOrigin: function(newOrigin) {
        
    },
    
    setBoundsSize: function(newSize) {
        
    },
    
    setBoundsRotation: function(angle) {
        
    },
    
    boundsRotation: function() {
        
    },
    
    rotateByAnfle: function(angle) {
        
    },
    
    setBounds: function(aRect) {
        
    },
    
    bounds: function() {
        // if (this._bounds)
            // return this._bounds;
        
        return NSMakeRect(0, 0, this._frame.size.width, this._frame.size.height);
    },
    
    isFlipped: function() {
        
    },
    
    isRotatedFromBase: function() {
        
    },
    
    isRotatedOrScaledFromBase: function() {
        
    },
    
    isOpaque: function() {
        
    },
    
    convertPointFromView: function(aPoint, aView) {
        if (!aView)
            return this.convertPointFromBase(aPoint);
        
        return {
            x: aPoint.x - this._frame.origin.x,
            y: aPoint.y - this._frame.origin.y
        };
    },
    
    convertPointToView: function(aPoint, aView) {
        
    },
    
    convertSizeFromView: function(aSize, aView) {
        
    },
    
    convertSizeToView: function(aSize, aView) {
        
    },
    
    convertRectFromView: function(aRect, aView) {
        
    },
    
    convertRectToView: function(aRect, aView) {
        
    },
    
    centerScanRect: function(aRect) {
        
    },
    
    convertPointToBase: function(aPoint) {
        
    },
    
    convertPointFromBase: function(aPoint) {
        if (this._superview) {
            return this._superview.convertPointFromBase({ 
                x: aPoint.x - this._frame.origin.x,
                y: aPoint.y - this._frame.origin.y
            });
        }
        else if (this._window) {
            return {
                x: aPoint.x - this._window.frame().origin.x,
                y: aPoint.y - this._window.frame().origin.y
            };
        }
        else {
            return aPoint;
        }
    },
    
    convertSizeToBase: function(aSize) {
        
    },
    
    convertSizeFromBase: function(aSize) {
        
    },
    
    convertRectToBase: function(aRect) {
        
    },
    
    convertRectFromBase: function(aRect) {
        
    },
    
    canDraw: function() {
        
    },
    
    setNeedsDisplay: function(flag) {
        
        if (flag)
            this.setNeedsDisplayInRect(this.bounds());
    },
    
    setNeedsDisplayInRect: function(invalidRect) {
        
        this.displayRect(invalidRect);
    },
    
    needsDisplay: function() {
        
    },
    
    lockFocus: function() {
        
        if (!this._graphicsContext)
            this._graphicsContext = NSGraphicsContext.graphicsContextWithGraphicsPort(this._DOMGraphicsContext.getContext('2d'), false);
        
        NSGraphicsContext.setCurrentContext(this._graphicsContext);
        CGContextSaveGState(this._graphicsContext.graphicsPort());
        CGContextClearRect(this._graphicsContext.graphicsPort(), this.bounds());
    },
    
    unlockFocus: function() {
        
        CGContextRestoreGState(this._graphicsContext.graphicsPort());
        NSGraphicsContext.setCurrentContext(null);
    },
    
    lockFocusIfCanDraw: function() {
        
    },
    
    lockFocusIfCanDrawInContext: function(context) {
        
    },
    
    visibleRect: function() {
        
    },
    
    display: function() {
        
    },
    
    displayIfNeeded: function() {
        
    },
    
    displayIfNeededIgnoringOpacity: function() {
        
    },
    
    displayRect: function(rect) {
        
        this.viewWillDraw();
        this.displayRectIgnoringOpacityInContext(rect, null);
    },
    
    displayIfNeededInRect: function(rect) {
        
    },
    
    displayRectIgnoringOpacity: function(rect) {
        
    },
    
    displayIfNeededInRectIgnoringOpacity: function(rect) {
        
    },
    
    /**
        Draws the reciever in the given rect. This method is intended for rich
        web applications using HTML5's canvas feature, or VML for IE browsers
        that do not include canvas support. All drawing is carried out by the
        CoreGraphics library. This will not be called for applications using 
        render drawing, where drawing is carried out using DOM based routines.
    */
    drawRect: function(rect) {
        // Render using CoreGraphics.
    },
    
    /**
        Draws the receiver in the given rect. This method is intended for old
        browser routines using the DOM. No canvas/VML based drawing should be
        carried out in these routines. Drawing can use css etc as intended. 
        See wiki for examples and more information.
    */
    renderRect: function(rect) {
        // Render using DOM.
    },
    
    displayRectIgnoringOpacityInContext: function(aRect, context) {
        
        this.lockFocus();
        this.drawRect(aRect);
        this.unlockFocus();
    },
    
    bitmapImageRepForCachingDisplayInRect: function(rect) {
        
    },
    
    cacheDisplayInRectToBitmapImageRep: function(bitmapImageRep) {
        
    },
    
    viewWillDraw: function() {
        
    },
    
    graphicsContext: function() {
        return this._graphicsContext;
    },

    scrollPoint: function(aPoint) {
        
    },
    
    scrollRectToVisible: function(aRect) {
        
    },
    
    autoScroll: function(theEvent) {
        
    },
    
    adjustScroll: function(newVisible) {
        
    },
    
    scrollRectBy: function(aRect, delta) {
        
    },
    
    hitTest: function(aPoint) {
        aPoint = this.convertPointFromView(aPoint, this._superview);
        
        if (!NSPointInRect(aPoint, this.bounds())) {
            return null;
        }
        else {
            var count = this._subviews.count();

            for (var i = 0; i < count; i++) {
                var viewToCheck = this._subviews[i];
                var hitTest = viewToCheck.hitTest(aPoint);
                if (hitTest) return hitTest;
            }
            
            return this;
        }
    },
    
    mouseInRect: function(aPoint, aRect) {
        
    },
    
    viewWithTag: function(aTag) {
        
    },
    
    tag: function() {
        
    },
    
    performKeyEquivalent: function(theEvent) {
        
    },
    
    acceptsFirstMouse: function(theEvent) {
        
    },
    
    shouldDelayWindowOrderingForEvent: function(theEvent) {
        
    },
    
    needsPanelToBecomeKey: function() {
        
    },
    
    mouseDownCanMoveWindow: function() {
        
        return false;
    },
    
    addCursorRect: function(aRect, aCursor) {
        
    },
    
    removeCursorRect: function(aRect, aCursor) {
        
    },
    
    discardCursorRects: function() {
        
    },
    
    resetCursorRects: function() {
        
    },
    
    addTrackingRect: function(aRect, anObject, data, flag) {
        
    },
    
    removeTrackingRect: function(tag) {
        
    },
    
    setWantsLayer: function(flag) {
        
    },
    
    wantsLayer: function() {
        
    },
    
    setLayer: function(newLayer) {
        
    },
    
    layer: function() {
        
    },
    
    setAlphaValue: function(viewAlpha) {
        
    },
    
    alphaValue: function() {
        
    },
    
    setBackgroundFilters: function(filters) {
        
    },
    
    backgroundFilters: function() {
        
    },
    
    setCompositingFilter: function(filter) {
        
    },
    
    compositingFilter: function() {
        
    },
    
    setContentFilters: function(filters) {
        
    },
    
    contentFilters: function() {
        
    },
    
    setShadow: function(shadow) {
        
    },
    
    shadow: function() {
        
    },
    
    addTrackingArea: function(trackingArea) {
        
    },
    
    removeTrackingArea: function(trackingArea) {
        
    },
    
    trackingAreas: function() {
        
    },
    
    updateTrackingAreas: function() {
        
    },
    
    shouldDrawColor: function() {
        
    },
    
    setPostsBoundsChangedNotifications: function(flag) {
        
    },
    
    postsBoundsChangedNotifications: function() {
        
    },
    
    enclosingScrollView: function() {
        
    },
    
    menuForEvent: function(theEvent) {
        
    },
    
    setToolTip: function(string) {
        
    },
    
    toolTip: function() {
        
    },
    
    addToolTipRect: function(aRect, anObject, data) {
        
    },
    
    removeToolTip: function(tag) {
        
    },
    
    removeAllToolTips: function() {
        
    },
    
    viewWillStartLiveResize: function() {
        
    },
    
    viewDidEndLiveResize: function() {
        
    },
    
    inLiveResize: function() {
        
    },
    
    preservesContentDuringLiveResize: function() {
        
    },
    
    rectPreservedDuringLiveResize: function() {
        
    },
    
    getRectsExposedDuringLiveResize: function() {
        
    },
    
    performMnemonic: function(theString) {
        
    },
    
    selectNextKeyView: function(next) {
        
    },
    
    nextKeyView: function() {
        
    },
    
    previousKeyView: function() {
        
    },
    
    nextValidKeyView: function() {
        
    },
    
    previousValidKeyView: function() {
        
    },
    
    canBecomeKeyView: function() {
        
    },
    
    setKeyboardFocusRingNeedsDisplayInRect: function(rect) {
        
    },
    
    setFocusRingType: function(focusRingType) {
        
    },
    
    focusRingType: function() {
        
    },
    
    dragImage: function(anImage, viewLocation, initialOffset, theEvent, pboard, sourceObj, slideFlag) {
        
    },
    
    registeredDraggedTypes: function() {
        
    },
    
    registerForDraggedTypes: function(newTypes) {
        
    },
    
    unregisterDraggedTypes: function() {
        
    },
    
    dragFile: function(filename, fromRect, slideBack, theEvent) {
        
    }
});
/* 
 * cell.js
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



var NSAnyType				        = 0;
var NSIntType				        = 1;
var NSPositiveIntType			    = 2;
var NSFloatType				        = 3;
var NSPositiveFloatType			    = 4;
var NSDoubleType			        = 6;
var NSPositiveDoubleType		    = 7;

// NSCellType
var NSNullCellType			        = 0;
var NSTextCellType			        = 1;
var NSImageCellType			        = 2;

// NSCellAttribute
var NSCellDisabled			        = 0;
var NSCellState				        = 1;
var NSPushInCell			        = 2;
var NSCellEditable			        = 3;
var NSChangeGrayCell			    = 4;
var NSCellHighlighted			    = 5;
var NSCellLightsByContents		    = 6;
var NSCellLightsByGray			    = 7;
var NSChangeBackgroundCell		    = 8;
var NSCellLightsByBackground		= 9;
var NSCellIsBordered			    = 10;
var NSCellHasOverlappingImage		= 11;
var NSCellHasImageHorizontal		= 12;
var NSCellHasImageOnLeftOrBottom	= 13;
var NSCellChangesContents		    = 14;
var NSCellIsInsetButton			    = 15;
var NSCellAllowsMixedState		    = 16;

// NSCellImagePosition
var NSNoImage				        = 0;
var NSImageOnly				        = 1;
var NSImageLeft				        = 2;
var NSImageRight			        = 3;
var NSImageBelow			        = 4;
var NSImageAbove			        = 5;
var NSImageOverlaps			        = 6;


// NSImageScaling
var NSImageScaleProportionallyDown  = 0;
var NSImageScaleAxesIndependently   = 1;
var NSImageScaleNone                = 2;
var NSImageScaleProportionallyUpOrDown = 3;

// NSCellStateValue
var NSMixedState                    = -1;
var NSOffState                      = 0;
var NSOnState                       = 1;

var NSNoCellMask			        = 0;
var NSContentsCellMask			    = 1;
var NSPushInCellMask			    = 2;
var NSChangeGrayCellMask		    = 4;
var NSChangeBackgroundCellMask		= 8;

// NSControlTint
var NSDefaultControlTint            = 0;
var NSBlueControlTint               = 1;
var NSGraphiteControlTint           = 6;
var NSClearControlTint              = 7;

// NSControlSize
var NSRegularControlSize            = 0;
var NSSmallControlSize              = 1;
var NSMiniControlSize               = 2;

var NSCell = NSObject.extend({
    
    _value: null,
    _state: null,
    _isHighlighted: null,
    _isEnabled: null,
    _isEditable: null,
    _isBordered: null,
    _isBezeled: null,
    _isSelectable: null,
    _isScrollable: null,
    _alignment: null,
    _controlSize: null,
    
    _controlView: null,
    
    _target: null,
    _action: null,
    
    initTextCell: function(aString) {
        
    },
    
    initImageCell: function(image) {
        
    },
    
    initWithCoder: function(aCoder) {
        
        // this._super(aCoder);
        
        this._value = aCoder.decodeObjectForKey("NSContents");
        var flags = aCoder.decodeIntForKey("NSCellFlags");
        var flags2 = aCoder.decodeIntForKey("NSCellFlags2");
        
        this._state = (flags & 0x80000000) ? NSOnState : NSOffState;
        this._isHighlighted = (flags & 0x40000000) ? true : false;
        this._isEnabled = (flags & 0x20000000) ? false : true;

        this._isEditable = (flags & 0x10000000) ? true : false;
        this._isBordered = (flags & 0x00800000) ? true : false;
        this._isBezeled = (flags & 0x00400000) ? true : false;
        this._isSelectable = (flags & 0x00200000) ? true : false;
        this._isScrollable = (flags & 0x00100000) ? true : false;
        this._alignment = (flags2 & 0x1c000000) >> 26;
        this._controlSize = (flags2 & 0xE0000) >> 17;
        
        this._font = aCoder.decodeObjectForKey("NSSupport");
        
        return this;
    },
    
    controlView: function() {
        
        return this._controlView;
    },
    
    setControlView: function(view) {
        
        this._controlView = view;
    },
    
    cellClass: function() {
        return NSCell;
    },
    
    type: function() {
        
    },
    
    setType: function(aType) {
        
    },
    
    state: function() {
        
        return this._state;
    },
    
    setstate: function(value) {
        
        this._state = value;
    },
    
    target: function() {
        
        return this._target;
    },
    
    setTarget: function(anObject) {
        
        this._target = anObject;
    },
    
    action: function() {
        
        return this._action;
    },
    
    setAction: function(aSelector) {
        
        this._action = aSelector;
    },
    
    tag: function() {
        
        return this._tag;
    },
    
    setTag: function(anInt) {
        
        this._tag = anInt;
    },
    
    title: function() {
        
    },
    
    setTitle: function(aString) {
        
    },
    
    isOpaque: function() {
        
    },
    
    isEnabled: function() {
        
        return this._isEnabled;
    },
    
    setEnabled: function(flag) {
        
        this._isEnabled = flag;
    },
    
    sendActionOn: function(mask) {
        
    },
    
    isContinuous: function() {
        
    },
    
    setContinuous: function(flag) {
        
    },
    
    isEditable: function() {
        
    },
    
    setEditable: function(flag) {
        
    },
    
    isSelectable: function() {
        
        return this._isSelectable;
    },
    
    setSelectable: function(flag) {
        
        this._isSelectable = flag;
    },
    
    isBordered: function() {
        
    },
    
    setBordered: function(flag) {
        
    },
    
    isBezeled: function() {
        
    },
    
    setBezeled: function(flag) {
        
    },
    
    isScrollable: function() {
        
    },
    
    setScrollable: function(flag) {
        
    },
    
    isHighlighted: function() {
        return this._isHighlighted;
    },
    
    setHighlighted: function(flag) {
        this._isHighlighted = flag;
    },
    
    alignment: function() {
        
    },
    
    setAlignment: function(mode) {
        
    },
    
    wraps: function() {
        
    },
    
    setWraps: function(flag) {
        
    },
    
    font: function() {
        return this._font;
    },
    
    setFont: function(fontObj) {
        this._font = fontObj;
    },
    
    entryType: function() {
        
    },
    
    setEntryType: function(aType) {
        
    },
    
    isEntryAcceptable: function(aString) {
        
    },
    
    keyEquivalent: function() {
        
    },
    
    setFormatter: function(newFormatter) {
        
    },
    
    formatter: function() {
        
    },
    
    objectValue: function() {
        
    },
    
    setObjectValue: function(obj) {
        
    },
    
    hasValidObjectValue: function() {
        
    },
    
    stringValue: function() {
        
    },
    
    setStringValue: function(aString) {
        
    },
    
    compare: function(otherCell) {
        
    },
    
    intValue: function() {
        
    },
    
    setIntValue: function(anInt) {
        
    },
    
    floatValue: function() {
        
    },
    
    setFloatValue: function(aFloat) {
        
    },
    
    doubleValue: function() {
        return this._value;
    },
    
    setDoubleValue: function(aDouble) {
        this._value = aDouble;
    },
    
    takeIntValueFrom: function(sender) {
        
    },
    
    takeFloatValueFrom: function(sender) {
        
    },
    
    takeDoubleValueFrom: function(sender) {
        this.setDoubleValue(sender.doubleValue());
    },
    
    takeStringValueFrom: function(sender) {
        
    },
    
    takeObjectValueFrom: function(sender) {
        
    },
    
    image: function() {
        
    },
    
    setImage: function(image) {
        
    },
    
    setControlTint: function(controlTint) {
        
    },
    
    controlTint: function() {
        
    },
    
    setControlSize: function(size) {
        
    },
    
    controlSize: function() {
        
    },
    
    representedObject: function() {
        
    },
    
    setRepresentedObject: function(anObject) {
        
    },
    
    imageRectForBounds: function(theRect) {
        
    },
    
    titleRectForBounds: function(theRect) {
        return theRect;
    },
    
    drawingRectForBounds: function(theRect) {
        
    },
    
    cellSize: function() {
        
    },
    
    cellSizeForBounds: function(aRect) {
        
    },
    
    highlightColorWithFrame: function(cellFrame, controlView) {
        
    },
    
    calcDrawInfo: function(aRect) {
        
    },
    
    setupFieldEditorAttribiutes: function(textObj) {
        
        textObj.setAlignment(this.alignment());
        textObj.setString(this.stringValue());
        textObj.setSelectable(this.isSelectable());
        textObj.setEditable(this.isEditable());
        
        if (this.respondsTo('drawsBackground'))
            textObj.setDrawsBackground(this.drawsBackground());
        
        if (this.respondsTo('backgroundColor'))
            textObj.setBackgroundColor(this.backgroundColor());
        
        return textObj;
    },

    drawInteriorWithFrame: function(cellFrame, controlView) {
        
    },
    
    drawWithFrame: function(cellFrame, controlView) {
        this.drawInteriorWithFrame(cellFrame, controlView);
    },
    
    highlightInView: function(flag, cellFrame, controlView) {
        
        if (this.isHighlighted() != flag) {
            this.setHighlighted(flag);
            this.drawWithFrame(cellFrame, controlView);
        }
    },
    
    mouseDownFlags: function() {
        
    },
    
    getPeriodicDelay: function(delay, interval) {
        
    },
    
    startTrackingInView: function(startPoint, controlView) {
        
        return this.isEnabled() ? true : false;
    },
    
    continueTrackingInView: function(lastPoint, currentPoint, controlView) {
        
        return true;
    },
    
    stopTrackingInView: function(lastPoint, stopPoint, controlView, mouseUp) {
        
        // empty implementation
    },
    
    trackMouseInView: function(theEvent, cellFrame, controlView, untilMouseUp) {
        
        controlView.lockFocus();
        
        var location = controlView.convertPointFromView(theEvent.locationInWindow(), null);
        
        if (!(this.startTrackingInView(theEvent.locationInWindow, controlView))) {
            this.drawWithFrame(cellFrame, controlView);
            controlView.unlockFocus();
            return false;
        }
        
        this.highlightInView(true, controlView.bounds(), controlView);
        controlView.unlockFocus();
        
        // for each further event...
        NSApplication.sharedApplication().bindEventsMatchingMask((NSLeftMouseUpMask | NSMouseMovedMask), this, function(theEvent) {
            controlView.lockFocus();
            var location = controlView.convertPointFromView(theEvent.locationInWindow(), null);
            
            if (untilMouseUp) {
                if (theEvent.type() == NSLeftMouseUp) {
                    this.stopTrackingInView(theEvent.locationInWindow(), theEvent.locationInWindow(), controlView, true);
                    NSApplication.sharedApplication().unbindEvents();
                    
                    if (this.state() == NSOffState)
                        this._state = NSOnState;
                    else
                        this._state = NSOffState;
                    
                    this.setHighlighted(false);
                }
                else {
                    if (NSPointInRect(location, cellFrame))
                        this.setHighlighted(true);
                    else
                        this.setHighlighted(false);
                    
                    if (!(this.continueTrackingInView(theEvent.locationInWindow(), theEvent.locationInWindow(), controlView)))
                        NSApplication.sharedApplication().unbindEvents();
                }
            }
            else if (NSPointInRect(location, cellFrame)) {
                NSLog("Got here, in frame");
            }
            else {
                NSLog("moved out of frame");
                this.stopTrackingInView(theEvent.locationInWindow(), theEvent.locationInWindow(), controlView, false);
                NSApplication.sharedApplication().unbindEvents();
            }
            
            this.drawWithFrame(cellFrame, controlView);
            controlView.unlockFocus();
            
            NSApplication.sharedApplication().sendAction(this._action, this._target, this);
        });
    },
    
    editWithFrame: function(aRect, controlView, textObj, anObject, theEvent) {
        
        if (!this.isEditable() && !this.isSelectable()) return;
        
        NSLog("WowzA");
        textObj.setFrame(this.titleRectForBounds(aRect));
        controlView.addSubview(textObj);
        controlView.window().makeFirstResponder(textObj);
        textObj.setDelegate(anObject);
        textObj.mouseDown(theEvent);
    },
    
    selectWithFrameInView: function(aRect, controlView, textObj, anObject, selStart, selLength) {
        
        if (!this.isEditable() && !this.isSelectable()) return;
        
        textObj.setFrame(this.titleRectForBounds(aRect));
        controlView.addSubview(textObj);
        controlView.window().makeFirstResponder(textObj);
        textObj.setDelegate(anObject);
        textObj.setSelectedRange(null);
    },
    
    endEditing: function(textObj) {
        
        this.setStringValue(textObj.string());
    },
    
    resetCursorRectInView: function(cellFrame, controlView) {
        
    },
    
    setMenu: function(aMenu) {
        
    },
    
    menu: function() {
        
    },
    
    menuForEvent: function(theEvent, cellFrame, view) {
        
    },
    
    setSendsActionOnEndEditing: function(flag) {
        
    },
    
    sendsActionOnEndEditing: function() {
        
    },
    
    baseWritingDirection: function() {
        
    },
    
    setBaseWritingDirection: function(writingDirection) {
        
    },
    
    setLineBreakMode: function(mode) {
        
    },
    
    lineBreakMode: function() {
        
    },
    
    setAllowsUndo: function(flag) {
        
    },
    
    allowsUndo: function() {
        
    },
    
    setIntegerValue: function(anInteger) {
        
    },
    
    integerValue: function() {
        
    },
    
    trunacatesLastVisibleLine: function() {
        
    },
    
    setTrunacatesLastVisibleLine: function(flag) {
        
    }
});     
/* 
 * control.js
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


var NSControlTextDidBeginEditingNotification    = "NSControlTextDidBeginEditingNotification";
var NSControlTextDidEndEditingNotification      = "NSControlTextDidEndEditingNotification";
var NSControlTextDidChangeNotification          = "NSControlTextDidChangeNotification";

var NSControl = NSView.extend({
   
    _tag: null,
    
    _cell: null,
    
    _currentEditor: null,
    
    _isEnabled: null,
    
    _value: null,
    
    initWithFrame: function(frameRect) {
        
        this._super(frameRect);
        this.setCell(this.cellClass().create());
        return this;
    },
    
    initWithCoder: function(aCoder) {
        
        this._super(aCoder);
        this._cell = aCoder.decodeObjectForKey("NSCell");
        this.setFrame(this._frame);
        return this;
    },
    
    sizeToFit: function() {
        
    },
    
    calcSize: function() {
        
    },
    
    cell: function() {
        
        return this._cell;
    },
    
    setCell: function(aCell) {
        
        this._cell = aCell;
        this._cell.setControlView(this);
        this.setNeedsDisplay(true);
    },
    
    selectedCell: function() {
        
    },
    
    target: function() {
        
        return this._cell.target();
    },
    
    setTarget: function(anObject) {
        
        this._cell.setTarget(anObject);
    },
    
    action: function() {
        
        return this._cell.action();
    },
    
    setAction: function(anAction) {
        this._cell.setAction(anAction);
    },
    
    tag: function() {
        
    },
    
    setTag: function(anInt) {
        
    },
    
    selectedTag: function() {
        
    },
    
    setIgnoresMultiClick: function(flag) {
        
    },
    
    ignoresMultiClick: function() {
        
    },
    
    sendActionOn: function(mask) {
        
    },
    
    isContinuous: function() {
        
    },
    
    setContinuous: function(flag) {
        
    },
    
    isEnabled: function() {
        
        return this._cell.isEnabled();
    },
    
    setEnabled: function(flag) {
        
        this._cell.setEnabled(flag);
    },
    
    alignment: function() {
        
        return this._cell.alignment();
    },
    
    setAlignment: function(mode) {
        
        this._cell.setAlignment(mode);
        this.setNeedsDisplay(true);
    },
    
    font: function() {
        
    },
    
    setFont: function(fontObj) {
        
    },
    
    setFormatter: function(newFormatter) {
        
    },
    
    formatter: function() {
        
    },
    
    setObjectValue: function(obj) {
        
        this._cell.setObjectValue(obj);
    },
    
    setStringValue: function(aString) {
        
        this._cell.setStringValue(aString);
    },
    
    setIntValue: function(anInt) {
        
        this._cell.setIntValue(anInt);
    },
    
    setFloatValue: function(aFloat) {
        
        this._cell.setFloatValue(aFloat);
    },
    
    setDoubleValue: function(aDouble) {
        
        this._cell.setDoubleValue(aDouble);
    },
    
    objectValue: function() {
        
        return this._cell.objectValue();
    },
    
    stringValue: function() {
        
        return this._cell.stringValue();
    },
    
    intValue: function() {
        
        return this._cell.intValue();
    },
    
    floatValue: function() {
        
        return this._cell.floatValue();
    },
    
    doubleValue: function() {
        
        return this._cell.doubleValue();
    },
    
    updateCell: function(aCell) {
        
    },
    
    updateCellInside: function(aCell) {
        
    },
    
    drawCellInside: function(aCell) {
        
    },
    
    drawCell: function(aCell) {
        
    },
    
    selectCell: function(aCell) {
        
    },
    
    /**
        Core graphics (canvas & vml) based rendering
    */
    drawRect: function(rect) {
        if (this._cell)
            this._cell.drawWithFrame(this.bounds(), this);
    },
    
    /**
        DOM based rendering.
    */
    renderRect: function(rect) {
        if (this._cell)
            this._cell.renderWithFrame(this.bounds(), this);
    },
    
    sendActionTo: function(theAction, theTarget) {
        
        if (theAction && theTarget) {
            NSApplication.sharedApplication().sendActionTo(theAction, theTarget, this);
            return true;
        }
        
        return false;
    },
    
    takeIntValueFrom: function(sender) {
        
    },
    
    takeFloatValueFrom: function(sender) {
        
    },
    
    takeDoubleValueFrom: function(sender) {
        this._cell.takeDoubleValueFrom(sender);
        this.setNeedsDisplay(true);
    },
    
    takeStringValueFrom: function(sender) {
        
    },

    takeObjectValueFrom: function(sender) {
        
    },
    
    currentEditor: function() {
        
    },
    
    abortEditing: function() {
        
        if (this._currentEditor) {
            this.window().endEditingFor(this);
            this._currentEditor = null;
            return true;
        }
        
        return false;
    },
    
    validateEditing: function() {
        
    },
    
    mouseDown: function(theEvent) {
        
        this._cell.trackMouseInView(theEvent, this.bounds(), this, true);
    },
    
    baseWritingDirection: function() {
        
    },
    
    setBaseWritingDirection: function(writingDirection) {
        
    },
    
    integerValue: function() {
        
    },
    
    setIntegerValue: function(anInteger) {
        
    },
    
    takeIntegerValueFrom: function(sender) {
        
    }
});/* 
 * button_cell.js
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


// NSButton normal
resource('NSButtonNormalLeft.png');
resource('NSButtonNormalMiddle.png');
resource('NSButtonNormalRight.png');
// NSButton highlighted
resource('NSButtonHighlightedLeft.png');
resource('NSButtonHighlightedMiddle.png');
resource('NSButtonHighlightedRight.png');
// NSSwitch
resource('NSSwitchNormal.png');
resource('NSSwitchAlternate.png');
// NSRadioButton
resource('NSRadioButtonNormal.png');
resource('NSRadioButtonAlternate.png');

// NSButtonType
var NSMomentaryLightButton		    = 0;
var NSPushOnPushOffButton		    = 1;
var NSToggleButton			        = 2;
var NSSwitchButton			        = 3;
var NSRadioButton			        = 4;
var NSMomentaryChangeButton		    = 5;
var NSOnOffButton			        = 6;
var NSMomentaryPushInButton		    = 7;

// NSBezelStyle
var NSRoundedBezelStyle             = 1;
var NSRegularSquareBezelStyle       = 2;
var NSThickSquareBezelStyle         = 3;
var NSThickerSquareBezelStyle       = 4;
var NSDisclosureBezelStyle          = 5;
var NSShadowlessSquareBezelStyle    = 6;
var NSCircularBezelStyle            = 7;
var NSTexturedSquareBezelStyle      = 8
var NSHelpButtonBezelStyle          = 9;
var NSSmallSquareBezelStyle         = 10;
var NSTexturedRoundedBezelStyle     = 11;
var NSRoundRectBezelStyle           = 12;
var NSRecessedBezelStyle            = 13;
var NSRoundedDisclosureBezelStyle   = 14;    


// NSGradientType
var NSGradientNone                  = 0;
var NSGradientConcaveWeak           = 1;
var NSGradientConcaveStrong         = 2;
var NSGradientConvexWeak            = 3;
var NSGradientConvexStrong          = 4;

var NSButtonCell = NSCell.extend({
    
    _alternateImage: null,
    
    _image: null,
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        var flags = aCoder.decodeIntForKey("NSButtonFlags");
        var flags2 = aCoder.decodeIntForKey("NSButtonFlags2");
        this._isBordered = (flags & 0x00800000) ? true : false;
        this._bezelStyle = ((flags2 & 0x7) | ((flags2 & 0x20) >> 2));
        
        this._alternateImage = aCoder.decodeObjectForKey("NSAlternateImage");
        if (this._alternateImage) {
            this._image = this._alternateImage.normalImage();
            this._alternateImage = this._alternateImage.alternateImage();
        }
        
        return this;
    },
    
    drawWithFrame: function(cellFrame, controlView) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextClearRect(c, cellFrame);
        
        this.drawBezelWithFrameInView(cellFrame, controlView);
        this.drawInteriorWithFrame(cellFrame, controlView);
        this.drawTitleWithFrameInView(this._value, this.titleRectForBounds(cellFrame), controlView);
    },
    
    drawInteriorWithFrame: function(cellFrame, controlView) {
        if (this._image) {
            if (this._state == NSOnState)
                this.drawImageWithFrameInView(this._alternateImage, CGRectMake(1, 1, 17, 17), controlView);
            else
                this.drawImageWithFrameInView(this._image, CGRectMake(1, 1, 17, 17), controlView);
        }
    },
    
    drawImageWithFrameInView: function(image, frame, controlView) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSaveGState(c);
        
        if (!this._isEnabled)
            CGContextSetAlpha(c, 0.8);
        
        CGContextDrawImage(c, frame, image);
        CGContextRestoreGState(c);
    },

    drawTitleWithFrameInView: function(title, rect, controlView) {
        this.attributedStringValue().drawWithRectAndOptions(rect, null);
    },
    
    drawBezelWithFrameInView: function(frame, controlView) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSaveGState(c);
        
        if (this._isEnabled && this._isBordered) {
            if (this._isHighlighted) {
                NSImage.imageNamed('NSButtonHighlightedLeft.png').drawInRect(CGRectMake(0, 0, 6, 24));
                NSImage.imageNamed('NSButtonHighlightedMiddle.png').drawInRect(CGRectMake(6, 0, frame.size.width - 12, 24));
                NSImage.imageNamed('NSButtonHighlightedRight.png').drawInRect(CGRectMake(frame.size.width - 6, 0, 6, 24));
            }
            else {
                NSImage.imageNamed('NSButtonNormalLeft.png').drawInRect(CGRectMake(0, 0, 6, 24));
                NSImage.imageNamed('NSButtonNormalMiddle.png').drawInRect(CGRectMake(6, 0, frame.size.width - 12, 24));
                NSImage.imageNamed('NSButtonNormalRight.png').drawInRect(CGRectMake(frame.size.width - 6, 0, 6, 24));
            }
        }
        else if (this._isBordered) {
            CGContextSetAlpha(c, 0.8);
            NSImage.imageNamed('NSButtonNormalLeft.png').drawInRect(CGRectMake(0, 0, 6, 24));
            NSImage.imageNamed('NSButtonNormalMiddle.png').drawInRect(CGRectMake(6, 0, frame.size.width - 12, 24));
            NSImage.imageNamed('NSButtonNormalRight.png').drawInRect(CGRectMake(frame.size.width - 6, 0, 6, 24));
        }
        
        CGContextRestoreGState(c);
    },
    
    titleRectForBounds: function(theRect) {
        var textSize = this.attributedStringValue().size();
        return NSMakeRect(theRect.origin.x + ((theRect.size.width - textSize.width) / 2),
                            theRect.origin.y - ((theRect.size.height - textSize.height) / 2) + 2,
                            textSize.width,
                            textSize.height);
    },
    
    attributedStringValue: function() {
		if (this._value.typeOf(NSAttributedString)) {
			return this._value;
		}
		
		var attributes = NSDictionary.create();
		
		// font
		if (this.font())
			attributes.setObjectForKey(this.font(), NSFontAttributeName);
		
		// textColor
		var textColor;
		if (this.isEnabled())
		    textColor = this.isHighlighted() ? NSColor.selectedControlTextColor() : NSColor.controlTextColor();
		else
		    textColor = NSColor.disabledControlTextColor();
		
		attributes.setObjectForKey(textColor, NSForegroundColorAttributeName);
		
		return NSAttributedString.create('initWithStringAndAttributes', this._value, attributes);
	},
});/* 
 * button.js
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
 

var NSButton = NSControl.extend({
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        return this;
    },
    
    cellClass: function() {
        return NSButtonCell;
    },
    
    title: function() {
        
    },
    
    setTitle: function(aString) {
        
    }
});
/* 
 * image.js
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

/**
    NSImage adds very important methods to Image. Not only does it extend useful
    fnctionality into the default object, but it also extends the functionality
    to include caching of images, so that drawing controls constantly does not
    require re-downloading. Also, it supports sprites, such that images combined
    into a single resource can be referenced and dealt with as a single image.
    
    Drawing these images actually references the sprites, but user code sees it
    as a regular image. Spriting images dramatically improves performance and
    saves heavily on bandwidth.
*/
var NSImage = { };

NSImage.imageNamed = function(anImage) {
    var newImage = new Image();
    newImage.src = 'resources/' + anImage;
    return newImage;
};

Image.prototype.drawInRect = function(theRect) {
    var c = NSGraphicsContext.currentContext().graphicsPort();
    CGContextDrawImage(c, theRect, this);
};
/* 
 * button_image_source.js
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


var NSButtonImageSource = NSObject.extend({
   
   _imageName: null,
   
   initWithCoder: function(aCoder) {
       this._imageName = aCoder.decodeObjectForKey("NSImageName");
       return this;
   },
   
   normalImage: function() {
       return NSImage.imageNamed(this._imageName + 'Normal.png');
   },
   
   alternateImage: function() {
       return NSImage.imageNamed(this._imageName + 'Alternate.png');
   }
});
/* 
 * clip_view.js
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

var NSClipView = NSView.extend({
    
    _docView: null,
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        this._docView = aCoder.decodeObjectForKey("NSDocView");
        return this;
    }
});
/* 
 * color.js
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


var NSColor = NSObject.extend({
    
    _red: null,
    _green: null,
    _blue: null,
    _alpha: null,
    
    initWithCoder: function(aCoder) {
        var theColorSpace = aCoder.decodeIntForKey("NSColorSpace");
        var theColor;
        
        switch (theColorSpace) {
            case 6:
                var catalogName = aCoder.decodeObjectForKey("NSCatalogName");
                var colorName = aCoder.decodeObjectForKey("NSColorName");
                theColor = NSColor[colorName]();
                break;
        }
        
        return theColor;
    },
	
	highlightWithLevel: function(val) {
		
	},
	
	shadowWithLevel: function(val) {
		
	},
	
	set: function() {
		
	},
	
	setFill: function() {
		
	},
	
	setStroke: function() {
		
	},
	
	blendedColorWithFraction: function(fraction, ofColor) {
		
	},
	
	colorWithAlphaComponent: function(alpha) {
		
	},
	
	redComponent: function() {
		
	},
	
	greenComponent: function() {
		
	},
	
	blueComponent: function() {
		
	},
	
	hueComponent: function() {
		
	},
	
	saturationComponent: function() {
		
	},
	
	brightnessComponent: function() {
		
	},
	
	whiteComponent: function() {
		
	},
	
	cyanComponent: function() {
		
	},
	
	magentaComponent: function() {
		
	},
	
	yellowComponent: function() {
		
	},
	
	blackComponent: function() {
		
	},
	
	alphaComponent: function() {
		
	}
});

Object.extend(NSColor, {
	
	colorWithCalibratedWhite: function(white, alpha) {
		
	},
	
	colorWithCalibratedHSBA: function(hue, saturation, brightness, alpha) {
		
	},
	
	colorWithCalibratedRGBA: function(red, green, blue, alpha) {
		var theColor =  NSColor.create();
		theColor._red = red;
		theColor._green = green;
		theColor._blue = blue;
		theColor._alpha = alpha;
		return theColor;
	},
	
	blackColor: function() {
		return NSColor.colorWithCalibratedWhite(0.0, 1.0);
	},
	
	darkGrayColor: function() {
		return NSColor.colorWithCalibratedWhite(0.333, 1.0);
	},
	
	lightGrayColor: function() {
		return NSColor.colorWithCalibratedWhite(0.667, 1.0);
	},
	
	whiteColor: function() {
		return NSColor.colorWithCalibratedWhite(1.0, 1.0);
	},
	
	grayColor: function() {
		return NSColor.colorWithCalibratedWhite(0.5, 1.0);
	},
	
	redColor: function() {
		return NSColor.colorWithCalibratedRGBA(1.0, 0.0, 0.0, 1.0);
	},
	
	greenColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.0, 1.0, 0.0, 1.0);
	},
	
	blueColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.0, 0.0, 1.0, 1.0);
	},
	
	cyanColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.0, 1.0, 1.0, 1.0);
	},
	
	yellowColor: function() {
		return NSColor.colorWithCalibratedRGBA(1.0, 1.0, 0.0, 1.0);
	},
	
	magentaColor: function() {
		return NSColor.colorWithCalibratedRGBA(1.0, 0.0, 1.0, 1.0);
	},
	
	orangeColor: function() {
		return NSColor.colorWithCalibratedRGBA(1.0, 0.5, 0.0, 1.0);
	},
	
	purpleColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.0, 0.5, 1.0);
	},
	
	brownColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.6, 0.4, 0.2, 1.0);
	},
	
	clearColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.0, 0.0, 0.0, 0.0);
	},
	
	
	controlShadowColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	controlDarkShadowColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	controlColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	controlHighlightColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	controlTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.204, 0.204, 0.204, 1.0);
	},
	
	controlBackgroundColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	selectedControlColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	secondarySelectedControlColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	selectedControlTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.16, 0.16, 0.16, 1.0);
	},
	
	disabledControlTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.574, 0.574, 0.574, 1.0);
	},
	
	textColor: function() {
		return NSColor.colorWithCalibratedRGBA(0, 0, 0, 1.0);
	},
	
	textBackgroundColor: function() {
		return NSColor.colorWithCalibratedRGBA(1.0, 1.0, 1.0, 1.0);
	},
	
	selectedTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	selectedTextBackgroundColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	windowBackgroundColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	scrollBarColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	knobColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	selectedKnobColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	windowFrameColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	windowFrameTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	selectedMenuItemColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.21, 0.40, 0.86, 1.0);
	},
	
	selectedMenuItemTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(1, 1, 1, 1.0);
	},
	
	highlightColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	shadowColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	headerColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	headerTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	alternateSelectedControlColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	alternateSelectedControlTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	controlAlternatingRowBackgroundColors: function() {
		return [NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0), 
				NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0)];
	},
	
	colorForControlTint: function(controlTint) {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	currentControlTint: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	}
});
/* 
 * connection_record.js
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

var IBConnectionRecord = NSObject.extend({
    
    _connection: null,
    
    _connectionID: null,
    
    initWithCoder: function(aCoder) {
        this._connection = aCoder.decodeObjectForKey("connection");
        this._connectionID = aCoder.decodeIntForKey("connectionID");
        return this;
    }
});
/* 
 * custom_object.js
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


var NSCustomObject = NSObject.extend({
    
    initWithCoder: function(aCoder) {
        var className = aCoder.decodeObjectForKey("NSClassName");
        
        if (className == "NSApplication")
            return NSApplication.sharedApplication();
        else if (className == "FirstResponder")
            return NSApplication.sharedApplication();
        else if (className == "NSFontManager")
            return NSApplication.sharedApplication();
        
        return window[className].create();
    }
});
/* 
 * custom_resource.js
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

/* 
 * custom_view.js
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

var NSCustomView = NSView.extend({
    
});
/* 
 * font.js
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


var NSFont = NSObject.extend({
    
    _name: null,
    
    _size: null,
    
    initWithCoder: function(aCoder) {
        var name = "Arial";
        var size = aCoder.decodeIntForKey("NSSize");
        return NSFont.fontWithNameAndSize(name, size);
    },
    
    fontName: function() {
        return this._name;
    },
    
    fontSize: function() {
        return this._size;
    }
});

Object.extend(NSFont, {
    
    fontWithNameAndSize: function(fontName, fontSize) {
        var font = NSFont.create();
        font._name = fontName;
        font._size = fontSize;
        return font;
    },
    
    fontWithFontDescriptorAndSize: function(fontDescriptor, fontSize) {
        
    },
    
    userFontOfSize: function(fontSize) {
        
    },
    
    setUserFont: function(aFont) {
        
    },
    
    systemFontOfSize: function(fontSize) {
        
    },
    
    boldSystemFontOfSize: function(fontSize) {
        
    },
    
    labelFontOfSize: function(fontSize) {
        
    },
    
    titleBarFontOfSize: function(fontSize) {
        
    },
    
    menuFontOfSize: function(fontSize) {
        return NSFont.fontWithNameAndSize("Arial", fontSize);
    },
    
    menuBarFontOfSize: function(fontSize) {
        var theFont = NSFont.fontWithNameAndSize("Arial", fontSize);
        // theFont._isBold = true;
        return theFont;
    },
    
    messageFontOfSize: function(fontSize) {
        
    },
    
    paletteFontOfSize: function(fontSize) {
        
    },
    
    toolTipsFontOfSize: function(fontSize) {
        
    },
    
    controlContentFontOfSize: function(fontSize) {
        
    },
    
    systemFontSize: function() {
        
    },
    
    smallSystemFontSize: function() {
        
    },
    
    labelFontSize: function() {
        
    },
    
    systemFontSizeForControlSize: function(controlSize) {
        
    }
});
/* 
 * layout_manager.js
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

var NSLayoutManager = NSObject.extend({
    
    _textStorage: null,
    _typesetter: null,
    
    _delegate: null,
    
    _textContainers: null,
    
    initWithCoder: function(aCoder) {
        this._textStorage = aCoder.decodeObjectForKey("NSTextStorage");
        this._typesetter = NSTypesetter.create();
        this._delegate = aCoder.decodeObjectForKey("NSDelegate");
        
        this._textContainers = [];
        var textContainers = aCoder.decodeObjectForKey("NSTextContainers");
        for (var idx = 0; idx < textContainers.length; idx++) {
            this._textContainers.push(textContainers[idx]);
        }
        
        return this;
    },
    
    textStorage: function() {
        return this._textStorage;
    },
    
    setTextStorage: function(textStorage) {
        this._textStorage = textStorage;
    },
    
    typesetter: function() {
        return this._typesetter;
    },
    
    delegate: function() {
        return this._delegate;
    },
    
    textContainers: function() {
        return this._textContainers;
    }
});
/* 
 * main_menu.js
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


/**
    MainMenu. This holds the main menu itself, a title (app title) and the status
    bar for the application. This window does not have a content view, and instead
    holds three views. one for each of the previously outlined responsibilities.
    
    Due to the massive internal chnages that the window undertakes, a lot of the
    functionality is removed abnd over-ridden.
*/
var NSMainMenu = NSWindow.extend({
    
    _mainMenu: null,
    _mainMenuView: null,
    
    _hasGradient: null,
    
    initWithMainMenu: function(aMenu) {
        this._DOMContainer = document.createElement('div');
        this._DOMGraphicsContext = document.createElement('canvas');
        this._DOMContainer.appendChild(this._DOMGraphicsContext);
        document.body.appendChild(this._DOMContainer);
        
        this._DOMContainer.style.display = "block";
        this._DOMContainer.style.position = "absolute";
        
        this._DOMGraphicsContext.style.display = "block";
        this._DOMGraphicsContext.style.position = "absolute";
        
        this._backgroundColor = NSColor.colorWithCalibratedRGBA(0.33, 0.33, 0.33, 1);
        this._hasGradient = true;
        
        this._windowNumber = NSApplication.sharedApplication().addWindow(this);
        
        this._minSize = NSMakeSize(0.0, 0.0);
        this._maxSize = NSMakeSize(9999.0, 9999.0);
        this._frame = this.frameRectForContentRect(NSMakeRect(100,100,100,100));
        this._firstResponder = this;
        
        this._mainMenu = aMenu;
        
        // menu view
        this._mainMenuView = NSMenuView.create('initWithMenu', this._mainMenu);
        this._mainMenuView.setHorizontal(true);
        this._mainMenuView.update();
        this._DOMContainer.appendChild(this._mainMenuView.DOMContainer());
        
        this.setNextResponder(NSApplication.sharedApplication());
        
        this.setLevel(NSMainMenuWindowLevel);
        
        this.tile();
        
        return this;
    },
    
    setMainMenu: function(aMenu) {
        this._mainMenu = aMenu;
    },
    
    mainMenu: function() {
        return this._mainMenu;
    },
    
    setHasGradient: function(flag) {
        this._hasGradient = flag;
    },
    
    hasGradient: function() {
        return this._hasGradient;
    },
    
    sendEvent: function(theEvent) {
        var hitTest, aPoint = theEvent.locationInWindow();
        
        switch (theEvent.type()) {
            case NSLeftMouseDown:
                hitTest = this._mainMenuView.hitTest(aPoint);
                if (hitTest) {
                    hitTest.mouseDown(theEvent);
                    // console.log('hitTest in mainMenu');
                }
                else {
                    console.log('Sending mouse down to (else)');
                }
                break;
            case NSLeftMouseUp:
                console.log('mouse up;');
                break;
        }
    },
    
    /**
        Calculates the size and position of the window, and moves it into place using setFrame
    */
    tile: function() {
        this.setFrame(NSMakeRect(0, window.innerHeight - NSMenu.menuBarHeight(), window.innerWidth, NSMenu.menuBarHeight()));
    },
    
    setFrame: function(frameRect) {
        this._frame = frameRect;
        CGDOMElementSetFrame(this._DOMContainer, this._frame);
        CGDOMElementSetFrame(this._DOMGraphicsContext, this.bounds());
        this.setNeedsDisplay(true);
    },
    
    drawRect: function(rect) {
		var c = NSGraphicsContext.currentContext().graphicsPort();
		CGContextClearRect(c, rect);
		CGContextSaveGState(c);
		CGContextSetFillColorWithColor(c, this._backgroundColor);
		CGContextFillRect(c, rect);
		
		if (this.hasGradient()) {
		    var lingrad = c.createLinearGradient(0,0,0,rect.size.height);
            lingrad.addColorStop(0, CGContextRGBAStringFromColor(NSColor.colorWithCalibratedRGBA(0.604, 0.604, 0.604, 0.504)));
            lingrad.addColorStop(1, CGContextRGBAStringFromColor(NSColor.colorWithCalibratedRGBA(0.264, 0.264, 0.264, 0.504)));
            
            c.fillStyle = lingrad;
            c.fillRect(0,0,rect.size.width,rect.size.height);
		}
		
		c.strokeStyle = "black";
		c.beginPath();
		c.moveTo(0, rect.size.height - 0.5);
		c.lineTo(rect.size.width, rect.size.height - 0.5)
		c.stroke();
		
		CGContextRestoreGState(c);
	}
});
/* 
 * main_menu_view.js
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


var NSMainMenuView = NSView.extend({
    
    drawRect: function(rect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextFillRect(c, rect);
    }
});
/* 
 * menu.js
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

include ('foundation/object');

var NSMenu = NSObject.extend({
    
    _superMenu: null,
    _title: null,
    _itemArray: null,
    _name: null,
    
    _menuView: null,
    
    highlightedItem: null,
        
    init: function() {
        this._super();
        this._title = "";
        this._itemArray = [];
        return this;
    },
    
    initWithTitle: function(aTitle) {
        this.init();
        this._title = aTitle;
        this._itemArray = [];
        return this;
    },
    
    initWithCoder: function(aCoder) {
        this._title = aCoder.decodeObjectForKey("NSTitle");
        this._name = aCoder.decodeObjectForKey("NSName");
        this._itemArray = aCoder.decodeObjectForKey("NSMenuItems");
        return this;
    },
    
    setMenuView: function(aView) {
        this._menuView = aView;
    },
    
    menuView: function() {
        return this._menuView;
    },
    
    setTitle: function(aString) {
        this._title = aString;
    },
    
    title: function() {
        return this._title;
    },
    
    supermenu: function() {
        return this._superMenu;
    },
    
    setSupermenu: function(supermenu) {
        this._superMenu = supermenu;
    },
    
    insertItem: function(newItem, atIndex) {
        
    },
    
    addItem: function(newItem) {
        
    },
    
    insertItemWithTitle: function(aString, aSelector, keyEquivalent, index) {
        
    },
    
    addItemWithTitle: function(aString, aSelector, keyEquivalent) {
        
    },
    
    removeItemAtIndex: function(index) {
        
    },
    
    removeItem: function(item) {
        
    },
    
    setSubmenuForItem: function(aMenu, anItem) {
        
    },
    
    itemArray: function() {
        return this._itemArray;
    },
    
    numberOfItems: function() {
        return this._itemArray.count();
    },
    
    itemAtIndex: function(index) {
        return this._itemArray[index];
    },
    
    indexOfItem: function(item) {
        return this._itemArray.indexOf(item);
    },
    
    indexOfItemWithTitle: function(aTitle) {
        
    },
    
    indexOfItemWithTag: function(aTag) {
        
    },
    
    indexOfItemWithRepresentedObject: function(anObject) {
        
    },
    
    indexOfItemWithSubmenu: function(submenu) {
        
    },
    
    indexOfItemWithTarget: function(target, andAction) {
        
    },
    
    itemWithTitle: function(aTitle) {
        
    },
    
    itemWithTag: function(aTag) {
        
    },
    
    setAutoEnablesItems: function(flag) {
        
    },
    
    autoEnablesItems: function() {
        
    },
    
    update: function() {
        
    },
    
    performKeyEquivalent: function(theEvent) {
        
    },
    
    itemChanged: function(item) {
        
    },
    
    performActionForItemAtIndex: function(index) {
        
    },
    
    setDelegate: function(anObject) {
        
    },
    
    delegate: function() {
        
    },
    
    cancelTracking: function() {
        
    },
    
    highlightedItem: function() {
        return this._highlightedItem;
    },
    
    setHighlightedItem: function(anItem) {
        this._highlightedItem = anItem;
    }
});

Object.extend(NSMenu, {
    
    menuBarHeight: function() {
        return 30.0;
    }
});
/* 
 * menu_item.js
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


var NSMenuItem = NSObject.extend({
    
    _menu: null,
    _subMenu: null,
    _title: null,
    _keyEquivalent: null,
    _keyEquivalentModifierMask: null,
    _mnenomicLocation: null,
    _state: null,
    _onStateImage: null,
    _offStateImage: null,
    _target: null,
    _action: null,
    _tag: null,
    _extraData: null,
    
    _isEnabled: null,
    _isHidden: null,
    
    init: function() {
        this._super();
        this._title = "";
        return this;
    },
    
    initWithTitle: function(itemName, action, keyEquivalent) {
        this.init();
        this._title = itemName;
        this._action = anAction;
        this._keyEquivalent = keyEquivalent;
        
        this._isEnabled = true;
        this._isHidden = false;
        
        return this;
    },
    
    initWithCoder: function(aCoder) {
        this._title = aCoder.decodeObjectForKey("NSTitle");
        this._keyEquivalent = aCoder.decodeObjectForKey("NSKeyEquiv");
        this._keyEquivalentModifierMask = aCoder.decodeIntForKey("NSKeyEquivModMask");
        this._menu = aCoder.decodeObjectForKey("NSMenu");
        this._submenu = aCoder.decodeObjectForKey("NSSubmenu");
        this._isEnabled = true;
        this._isHidden = false;
        return this;
    },
    
    setMenu: function(aMenu) {
        this._menu = aMenu;
    },
    
    menu: function() {
        return this._menu;
    },
    
    hasSubmenu: function() {
        return this._submenu ? true : false;
    },
    
    setSubmenu: function(submenu) {
        this._submenu = submenu;
    },
    
    submenu: function() {
        return this._submenu;
    },
    
    setTitle: function(aString) {
        this._title = aString;
    },
    
    title: function() {
        return this._title;
    },
    
    setAttributedTitle: function(aString) {
        this._title = aString;
    },
    
    /**
        Returns an NSAttributedString ready for drawing for the title.
    */
    attributedTitle: function() {
        var attributes = NSDictionary.create();
		
		// font
		if (this._menu.menuView().font())
			attributes.setObjectForKey(this._menu.menuView().font(), NSFontAttributeName);
		
		// textColor
		if (this.isEnabled()) {
		    if (this.isHighlighted())
		        attributes.setObjectForKey(NSColor.selectedMenuItemTextColor(), NSForegroundColorAttributeName);
		    else
			    attributes.setObjectForKey(NSColor.colorWithCalibratedRGBA(0.8, 0.8, 0.8, 1.0), NSForegroundColorAttributeName);
		}
		else {
			attributes.setObjectForKey(NSColor.disabledControlTextColor(), NSForegroundColorAttributeName);
		}
		
		return NSAttributedString.create('initWithStringAndAttributes', this._title, attributes);
    },
    
    /**
        Added Vienna convenience method..
        
        Retuns an NSAttributedString ready for drawing key equiv
    */
    attributedKeyEquivalent: function() {
        var attributes = NSDictionary.create();
        
        // font
        if (this._menu.menuView().font())
            attributes.setObjectForKey(this._menu.menuView().font(), NSFontAttributeName);
        
        // textcolor
        if (this.isEnabled()) {
		    if (this.isHighlighted())
		        attributes.setObjectForKey(NSColor.selectedMenuItemTextColor(), NSForegroundColorAttributeName);
		    else
			    attributes.setObjectForKey(NSColor.colorWithCalibratedRGBA(0.8, 0.8, 0.8, 1.0), NSForegroundColorAttributeName);
		}
		else {
			attributes.setObjectForKey(NSColor.disabledControlTextColor(), NSForegroundColorAttributeName);
		}
		
		return NSAttributedString.create('initWithStringAndAttributes', this._keyEquivalent.toUpperCase(), attributes);
    },
    
    isSeparatorItem: function() {
        // this should return true if no title & no image?!?!?!?
        return this._title ? false : true;
    },
    
    setKeyEquivalent: function(keyEquivalent) {
        
    },
    
    keyEquivalent: function() {
        return this._keyEquivalent;
    },
    
    setKeyEquivalentModifierMask: function(mask) {
        
    },
    
    keyEquivalentModifierMask: function() {
        return this._keyEquivalentModifierMask;
    },
    
    userKeyEquivalent: function() {
        
    },
    
    setImage: function(menuImage) {
        
    },
    
    image: function() {
        
    },
    
    setState: function(state) {
        
    },
    
    state: function() {
        
    },
    
    setOnStateImage: function(image) {
        
    },
    
    onStateImage: function() {
        
    },
    
    setOffStateImage: function(image) {
        
    },
    
    offStateImage: function() {
        
    },
    
    setMixedStateImage: function(image) {
        
    },
    
    mixedStateImage: function() {
        
    },
    
    setEnabled: function(flag) {
        this._isEnabled = flag;
    },
    
    isEnabled: function() {
        return this._isEnabled;
    },
    
    setAlternate: function(isAlternate) {
        
    },
    
    isAlternate: function() {
        
    },
    
    setIndentationLevel: function(level) {
        
    },
    
    indentationLevel: function() {
        
    },
    
    setTarget: function(aTarget) {
        
    },
    
    target: function() {
        
    },
    
    setAction: function(anAction) {
        
    },
    
    action: function() {
        
    },
    
    setTag: function(anInt) {
        
    },
    
    tag: function() {
        
    },
    
    setRepresentedObject: function(anObject) {
        
    },
    
    representedObject: function() {
        
    },
    
    setView: function(aView) {
        
    },
    
    view: function() {
        
    },
    
    isHighlighted: function() {
        if (this._menu.highlightedItem() == this)
            return true;
        
        return false;
    },
    
    setHidden: function(hidden) {
        
    },
    
    isHidden: function() {
        
    },
    
    isHiddenOrHasHiddenAncestor: function() {
        
    },
    
    setToolTip: function(toolTip) {
        
    },
    
    toolTip: function() {
        
    }
});
/* 
 * menu_item_cell.js
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
 

var NSMenuItemCell = NSCell.extend({
    
    _menuItem: null,
    
    _menuView: null,
    
    _needsSizing: null,
    
    setMenuItem: function(item) {
        this._menuItem = item;
    },
    
    menuItem: function() {
        return this._menuItem;
    },
    
    setMenuView: function(menuView) {
        this._menuView = menuView;
    },
    
    menuView: function() {
        return this._menuView;
    },
    
    setNeedsSizing: function(flag) {
        this._needsSizing = flag;
    },
    
    needsSizing: function() {
        return this._needsSizing;
    },
    
    calcSize: function() {
        
    },
    
    /**
        Returns the minimum size needed for this menu item. Note: this DOES NOT
        take into account padding etc that the menuview adds itself. This is
        purely for the cell's internal drawing. Padding may be added if necessary.
    */
    cellSize: function() {
        
        if (this._menuItem.isSeparatorItem())
            return NSMakeSize(0, 10);
            
        var theTitle = this._menuItem.attributedTitle();
        var titleSize = theTitle.size();
        
        if (this._menuView.isHorizontal()) {
            // if horizontal, just consider the title. nothing else is drawn for 
            // horizontal cells
            return titleSize;
        }
        
        titleSize.height += 6; // basic room on top and bottom
        titleSize.width += 60; // until we fix others/
        
        return titleSize;
    },
    
    setNeedsDisplay: function(flag) {
        
    },
    
    needsDisplay: function() {
        
    },
    
    stateImageWidth: function() {
        
    },
    
    imageWidth: function() {
        
    },
    
    titleWidth: function() {
        return this._menuItem.attributedTitle().size().width;
    },
    
    keyEquivalentWidth: function() {
        if (this._menuItem.keyEquivalent()) {
            
        }
        
        // no key equiv? return 0;
        return 0;
    },
    
    stateImageRectForBounds: function(cellFrame) {
        
    },
    
    titleRectForBounds: function(theRect) {
        var textSize = this._menuItem.attributedTitle().size();
        return NSMakeRect(theRect.origin.x + this._menuView.horizontalEdgePadding(),
                            theRect.origin.y + ((theRect.size.height - textSize.height) / 2),
                            theRect.size.width - 30,
                            textSize.height);
    },
    
    keyEquivalentRectForBounds: function(cellFrame) {
        var titleRect = this.titleRectForBounds(cellFrame);
        return NSMakeRect(titleRect.origin.x + titleRect.size.width, titleRect.origin.y, titleRect.size.width, titleRect.size.height);
    },
    
    tag: function() {
        
    },
    
    drawWithFrame: function(cellFrame, controlView) {
        
        if (this._menuItem.isSeparatorItem()) {
            this.drawSeparatorItemWithFrameInView(cellFrame, controlView);
            return;
        }
        
        this.drawBorderAndBackgroundWithFrameInView(cellFrame, controlView);
        this.drawTitleWithFrameInView(this.titleRectForBounds(cellFrame), controlView);
        if (this._menuItem.keyEquivalent()) {
            this.drawKeyEquivalentWithFrameInView(this.keyEquivalentRectForBounds(cellFrame), controlView);
        }
        
        // this.drawTitleWithFrameInView(cellFrame, controlView);
    },
    
    drawSeparatorItemWithFrameInView: function(cellFrame, controlView) {
        // should draw line bezel thing
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSetStrokeColorWithColor(c, NSColor.selectedMenuItemColor());
        CGContextBeginPath(c);
        CGContextMoveToPoint(c, cellFrame.origin.x + this._menuView.horizontalEdgePadding(), cellFrame.origin.y + (cellFrame.size.height / 2));
        CGContextAddLineToPoint(c, cellFrame.origin.x + cellFrame.size.width - (2 * this._menuView.horizontalEdgePadding(), cellFrame.origin.y + (cellFrame.size.height / 2)));
        CGContextClosePath(c);
        
        CGContextStrokePath(c);
    },
    
    drawStateImageWithFrameInView: function(cellFrame, controlView) {
        
    },
    
    drawImageWithFrameInView: function(cellFrame, controlView) {
        
    },
    
    drawTitleWithFrameInView: function(cellFrame, controlView) {
        this._menuItem.attributedTitle().drawWithRectAndOptions(cellFrame, null);
    },
    
    drawKeyEquivalentWithFrameInView: function(cellFrame, controlView) {
        this._menuItem.attributedKeyEquivalent().drawWithRectAndOptions(cellFrame, null);
    },
    
    drawBorderAndBackgroundWithFrameInView: function(cellFrame, controlView) {
        if (this._menuItem.isHighlighted()) {
            var c = NSGraphicsContext.currentContext().graphicsPort();
            CGContextSaveGState(c);
            CGContextSetFillColorWithColor(c, NSColor.selectedMenuItemColor());
            CGContextFillRect(c, cellFrame);
            
            // gradient
		    var lingrad = c.createLinearGradient(cellFrame.origin.x, cellFrame.origin.y, cellFrame.origin.x, cellFrame.origin.y + cellFrame.size.height);
            lingrad.addColorStop(0, CGContextRGBAStringFromColor(NSColor.colorWithCalibratedRGBA(1, 1, 1, 0.504)));
            lingrad.addColorStop(1, CGContextRGBAStringFromColor(NSColor.colorWithCalibratedRGBA(0.404, 0.404, 0.404, 0.304)));
            c.fillStyle = lingrad;
            c.fillRect(cellFrame.origin.x, cellFrame.origin.y, cellFrame.size.width, cellFrame.size.height);
            
            CGContextRestoreGState(c);
        }
    }
});
/* 
 * menu_view.js
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


var NSMenuView = NSView.extend({
    
    _isHorizontal: null,
    
    _menu: null,
    
    _needsSizing: null,
    
    _horizontalEdgePadding: null,
    
    _font: null,
    
    // used to hold the minimum rect required bu a menu item (and its cell) to draw
    // itself. when a view is updated, it needs to be recalculated.
    // the index of the item, is its index in the array.
    _cachedMenuItemRects: null,
    
    _menuItemCell: [],
    
    // used to hold a submenu for the view
    _submenu: null,
    
    initWithMenu: function(aMenu) {
        
        this._subviews = [];
        
        this._menu = aMenu;
        this._needsSizing = true;
        
        this._horizontalEdgePadding = 11;
        
        this._cachedMenuItemRects = [];
        this._menuItemCell = NSMenuItemCell.create();
        this._menuItemCell.setMenuView(this);
        
        this._menu.setMenuView(this);
        
        this.initWithFrame(NSMakeRect(0, 0, 100, 38));
        // this.update();
        return this;
    },
    
    mouseDown: function(theEvent) {
        this.trackWithEvent(theEvent);
    },
    
    isHorizontal: function() {
        return this._isHorizontal;
    },
    
    setHorizontal: function(flag) {
        this._isHorizontal = flag;
    },
    
    setMenu: function(aMenu) {
        this._menu = aMenu;
    },
    
    menu: function() {
        return this._menu;
    },
    
    itemChanged: function(aNotification) {
        
    },
    
    itemAdded: function(aNotification) {
        
    },
    
    itemRemoved: function(aNotification) {
        
    },
    
    update: function() {
        if (!this.needsSizing())
            return;
        
        this.sizeToFit();
    },
    
    setFont: function(aFont) {
        
    },
    
    font: function() {
        return this.isHorizontal() ? NSFont.menuBarFontOfSize(12) : NSFont.menuFontOfSize(12);
    },
    
    innerRect: function() {
        return this._frame;
    },
    
    /**
        Calculates the rect of each item at the specified index. This basically
        has two main considerations. Horizontal menus only display their title,
        and their height is just restricted to the height of the main menubar.
        
        Vertical menus might have views inside their cells, so their height 
        cannot be assumed to be a fixed value.
    */
    rectOfItemAtIndex: function(index) {
        var currentOffset = NSMakePoint(0, 0);
        for (var idx = 0; idx < index; idx++) {
            if (this.isHorizontal()) {
                currentOffset.x += (this._cachedMenuItemRects[idx].width + (2 * this.horizontalEdgePadding()));
            }
            else {
                currentOffset.y += (this._cachedMenuItemRects[idx].height)
            }
        }
        
        if (this.isHorizontal()) {
            return NSMakeRect(currentOffset.x+ this.horizontalEdgePadding(), currentOffset.y, this._cachedMenuItemRects[index].width + (2 * this.horizontalEdgePadding()), NSMenu.menuBarHeight())
        }
        else {
            // nned to fix this
            return NSMakeRect(currentOffset.x,
                                currentOffset.y + this.horizontalEdgePadding(), // the top item has this padding, so knock on the effect..
                                this._frame.size.width, // the rect is the width of the menu... every item is as wide as the menu, even if it doesnt need to be
                                this._cachedMenuItemRects[index].height);
        }
        
    },
    
    indexOfItemAtPoint: function(aPoint) {
        for (var idx = 0; idx < this._menu.numberOfItems(); idx++) {
            if (NSPointInRect(aPoint, this.rectOfItemAtIndex(idx))) {
                return idx;
            }
        }
        
        return -1;
    },
    
    setNeedsDisplayForItemAtIndex: function(index) {
        
    },
    
    setHighlightedItemIndex: function(index) {
        
    },
    
    highlightedItemIndex: function() {
        
    },
    
    stateImageOffset: function() {
        
    },
    
    stateImageWidth: function() {
        
    },
    
    imageAndTitleOffset: function() {
        
    },
    
    imageAndTitleWidth: function() {
        
    },
    
    keyEquivalentOffset: function() {
        
    },
    
    keyEquivalentWidth: function() {
        
    },

    setMenuItemCellForItemAtIndex: function(cell, forIndex) {
        
    },
    
    menuItemCellForItemAtIndex: function(index) {
        return this._menuItemCell;
    },
    
    attatchedMenuView: function() {
        
    },
    
    setNeedsSizing: function(flag) {
        this._needsSizing = flag;
    },
    
    needsSizing: function() {
        return this._needsSizing;
    },
    
    sizeToFit: function() {
        
        NSGraphicsContext.setCurrentContext(this.graphicsContext());
        
        var theItem, theCell = this._menuItemCell;
        var requiredWidth = 0;
        var requiredHeight = 0;
        var theMinWidth = 0;
        
        for (var idx = 0; idx < this._menu.numberOfItems(); idx++) {
            theItem = this._menu.itemAtIndex(idx);
            this._menuItemCell.setMenuItem(theItem);
            this._cachedMenuItemRects[idx] = this._menuItemCell.cellSize();
            
            if (this.isHorizontal()) {
                // each item has the padding to left and right, and first item has this padding from the left
                requiredWidth += this._cachedMenuItemRects[idx].width + (3 * this.horizontalEdgePadding());
            }
            else {
                requiredHeight += this._cachedMenuItemRects[idx].height;
                
                if (theMinWidth < this._cachedMenuItemRects[idx].width) {
                    theMinWidth = this._cachedMenuItemRects[idx].width;
                }
            }
        }
        
        if (this.isHorizontal()) {
            requiredHeight = NSMenu.menuBarHeight();
        }
        else {
            // the padding: above top item, and below bottom item.
            requiredHeight += (2 * this.horizontalEdgePadding())
            requiredWidth = theMinWidth;
        }
        
        this.setFrameSize(NSMakeSize(requiredWidth, requiredHeight));
        
        NSGraphicsContext.setCurrentContext(null);
    },
    
    drawRect: function(rect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        
        if (this._cachedMenuItemRects.length < 1)
            return;
        
        var theItem, theCell = this._menuItemCell;
        
        for (var idx = 0; idx < this._menu.numberOfItems(); idx++) {
            theItem = this._menu.itemAtIndex(idx);
            theCell.setMenuItem(theItem);
            theCell.drawWithFrame(this.rectOfItemAtIndex(idx), this);
        }
    },
    
    attatchedMenu: function() {
        
    },
    
    isAttatched: function() {
        
    },
    
    isTornOff: function() {
        
    },
    
    locationForSubmenu: function(aSubmenu) {
        
    },
    
    setWindowFrameForAttachingToRect: function(screenRect, preferredEdge, selectedItemIndex) {
        
    },
    
    detachSubmenu: function() {
        console.log('detatch submenu');
        this._submenu.menuView().window().close();
    },
    
    attachSubmenuForItemAtIndex: function(index) {
        console.log('attatch submenu for index: ' + index);
        var theMenuItem = this._menu.itemAtIndex(index);
        this._submenu = theMenuItem.submenu();
        var theWindow = NSMenuWindow.create('initWithMenu', this._submenu);
        
        var currentItemRect = this.rectOfItemAtIndex(index);
        
        theWindow.setFrameOrigin(NSMakePoint(currentItemRect.origin.x, window.innerHeight - (23 + theWindow.frame().size.height)));
    },
    
    performActionWithHighlightingForItemAtIndex: function(index) {
        
    },
    
    /**
        Tracks menu selection from an event. Whichever menu view is initially
        clicked becomes in charge of orchastrating event ownership until an item
        is clicked, or the menu is dismissed. Therefore, a stack of menus and 
        their respective views is held by the menu view in charge, and events 
        are passed down as appropriate. This can be for the menubar, but also
        popup menus might instantiate menu handling.
    */
    trackWithEvent: function(theEvent) {
        
        var location = this.convertPointFromView(theEvent.locationInWindow(), null);
        
        var theIndex = this.indexOfItemAtPoint(location);
        
        this._menu.setHighlightedItem(this._menu.itemAtIndex(theIndex));
        this.setNeedsDisplay(true);
        
        this.attachSubmenuForItemAtIndex(theIndex);
                
        NSApplication.sharedApplication().bindEventsMatchingMask((NSLeftMouseUpMask | NSMouseMovedMask), this, function(theEvent) {
            
            var location = this.convertPointFromView(theEvent.locationInWindow(), null);

            var theIndex = this.indexOfItemAtPoint(location);
            
            if (theEvent.type() == NSLeftMouseUp) {
                NSApplication.sharedApplication().unbindEvents();
                this._menu.setHighlightedItem(null);
                this.setNeedsDisplay(true);
                
                if (this._submenu)
                    this.detachSubmenu();
                    
                return;
            }
            
            var theMenuItem = this._menu.itemAtIndex(theIndex);
            
            if (this._menu.highlightedItem() != theMenuItem) {
                this._menu.setHighlightedItem(this._menu.itemAtIndex(theIndex));
                this.setNeedsDisplay(true);
                
                if (theMenuItem.hasSubmenu()) {
                    if (this._submenu)
                        this.detachSubmenu();

                    this.attachSubmenuForItemAtIndex(theIndex);
                    // var theWindow = NSMenuWindow.create('initWithMenu', theMenuItem.submenu());
                }
            }  
        });
    },
    
    horizontalEdgePadding: function() {
        return this._horizontalEdgePadding;
    },
    
    setHorizontalEdgePadding: function(pad) {
        this._horizontalEdgePadding = pad;
    }
});
/* 
 * menu_window.js
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


var NSMenuWindow = NSWindow.extend({
    
    _menu: null,
    
    initWithMenu: function(aMenu) {
        this._DOMContainer = document.createElement('div');
        this._DOMGraphicsContext = document.createElement('canvas');
        this._DOMContainer.appendChild(this._DOMGraphicsContext);
        document.body.appendChild(this._DOMContainer);
        
        this._DOMContainer.style.display = "block";
        this._DOMContainer.style.position = "absolute";
        
        this._DOMGraphicsContext.style.display = "block";
        this._DOMGraphicsContext.style.position = "absolute";
        
        this._backgroundColor = NSColor.colorWithCalibratedRGBA(0.904, 0.904, 0.904, 1);
        this._hasShadow = true;
        
        this._windowNumber = NSApplication.sharedApplication().addWindow(this);
        
        this._minSize = NSMakeSize(0.0, 0.0);
        this._maxSize = NSMakeSize(9999.0, 9999.0);
        this._frame = this.frameRectForContentRect(NSMakeRect(100,100,100,100));
        this._firstResponder = this;
        
        this._menu = aMenu;
        
        // menu view
        this._contentView = NSMenuView.create('initWithMenu', this._menu);
        this._contentView.setHorizontal(false);
        this._contentView.update();
        this._contentView._window = this;
        this.setFrame(this._contentView.frame());
        this._DOMContainer.appendChild(this._contentView.DOMContainer());
        
        this.setNextResponder(NSApplication.sharedApplication());
        
        this.setLevel(NSPopUpMenuWindowLevel);
        
        return this;
    },
    
    drawRect: function(aRect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        
        CGContextSetFillColorWithColor(c, NSColor.colorWithCalibratedRGBA(0.1, 0.1, 0.1, 0.604));
        CGContextBeginPath(c);
        CGContextMoveToPoint(c, aRect.origin.x + 6, aRect.origin.y);
        
        CGContextAddArcToPoint(c, aRect.origin.x + aRect.size.width, aRect.origin.y,
                                aRect.origin.x + aRect.size.width, aRect.origin.y + 6,
                                6);
        
        CGContextAddArcToPoint(c, aRect.origin.x + aRect.size.width, aRect.origin.y + aRect.size.height,
                                aRect.origin.x + aRect.size.width - 6, aRect.origin.y + aRect.size.height,
                                6);
        
        CGContextAddArcToPoint(c, aRect.origin.x, aRect.origin.y + aRect.size.height,
                                aRect.origin.x, aRect.origin.y + aRect.size.height - 6,
                                6);
        
        CGContextAddArcToPoint(c, aRect.origin.x, aRect.origin.y,
                                aRect.origin.x + 6, aRect.origin.y,
                                6);

        CGContextClosePath(c);
        
        // shadow
        CGContextSetShadowWithColor(c, NSMakeSize(0, 5), 10, NSColor.colorWithCalibratedRGBA(0.0, 0.0, 0.0, 0.694));
        
        CGContextFillPath(c);
    },
    
    /**
        Used to work out the actual framerect for the winow based on the provided
        content rect. This window basically needs to consider that the menu will 
        have a shadow, and thus provide room for it.
    */
    frameRectForContentRect: function(contentRect) {
        return NSMakeRect(contentRect.origin.x - 20, // 20px shadow room
                        contentRect.origin.y - 20, // 20px shadow room
                        contentRect.size.width + 40, // 20px shadow on either side
                        contentRect.size.height + 40); // 20px shadow on bottom and top
    },
    
    contentRectForFrameRect: function(frameRect) {
        return NSMakeRect(frameRect.origin.x + 20,
                        frameRect.origin.y + 20,
                        frameRect.size.width,
                        frameRect.size.height);
    }
});
/* 
 * nib.js
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


var NSNib = NSObject.extend({

    _data: null, 
    _connections: null,
    _hierarchy: null,
    _objects: null,
    _topLevelObjects: null,
    
    initWithContentsOfURL: function(nibFileURL) {
        
    },
    
    initWithNibNamed: function(nibName, bundle) {
       this._data = __bootstrap_files[nibName + '.json'];
       return this;
    },
    
    instantiateNibWithOwner: function(owner, topLevelObjects) {
        var nameTable = NSDictionary.create();
        this._topLevelObjects = topLevelObjects;
        return this.instantiateNibWithExternalNameTable(nameTable);
    },
    
    instantiateNibWithExternalNameTable: function(externalNameTable) {
        var unarchiver = NSKeyedUnarchiver.create('initForReadingWithData', this._data);
        this._topLevelObjects = unarchiver.decodeObjectForKey("IBDocument.RootObjects");
        this._connections = unarchiver.decodeObjectForKey("IBDocument.Objects");
        // console.log(this._topLevelObjects);
        return this._topLevelObjects;
    }
});/* 
 * nib_loading.js
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


NSBundle.loadNibFile = function(fileName, context) {
	
};

NSBundle.loadNibNamed = function(nibName, owner) {
	console.log('loading nib: ' + nibName);
	var theBundle = NSBundle.mainBundle();
	var theNib = NSNib.create('initWithNibNamed', nibName, theBundle);
	var topLevelObjects = [];
	topLevelObjects = theNib.instantiateNibWithOwner(owner, topLevelObjects);
	return topLevelObjects;
};
/* 
 * object_container.js
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

var IBObjectContainer = NSObject.extend({
    
    _connectionRecords: null,
    
    initWithCoder: function(aCoder) {
        console.log('decoding objects container');
        
        this._connectionRecords = aCoder.decodeObjectForKey("connectionRecords");
        
        return this;
    }
});
/* 
 * outlet_connection.js
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


var IBOutletConnection = NSObject.extend({

    _label: null,
    _source: null,
    _destination: null,

    initWithCoder: function(aCoder) {
        this._label = aCoder.decodeObjectForKey("label")
        this._source = aCoder.decodeObjectForKey("source");
        this._destination = aCoder.decodeObjectForKey("destination");
        return this;
    },

    /**
        Instantiate the connection. The source is the object with the outlet, and
        the destination is the target object. The label is the KVC compliant key
        name to set, so we use KVC to set the outlet correctly.
    */
    awakeAfterUsingCoder: function(aCoder) {
        this._source.setValueForKey(this._destination, this._label);
        return this;
    }
});
/* 
 * panel.js
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


var NSPanel = NSWindow.extend({
    
    drawRect: function(aRect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        
        // bottom
        CGContextSetFillColorWithColor(c, NSColor.colorWithCalibratedRGBA(0.1, 0.1, 0.1, 0.6));
        CGContextBeginPath(c);
        CGContextMoveToPoint(c, aRect.origin.x, aRect.origin.y + 19);
        CGContextAddLineToPoint(c, aRect.origin.x + aRect.size.width, aRect.origin.y + 19);
        CGContextAddArcToPoint(c, aRect.origin.x + aRect.size.width, aRect.origin.y + aRect.size.height,
                                aRect.origin.x + aRect.size.width - 6, aRect.origin.y + aRect.size.height,
                                6);
        
        CGContextAddArcToPoint(c, aRect.origin.x, aRect.origin.y + aRect.size.height,
                                aRect.origin.x, aRect.origin.y + aRect.size.height - 6,
                                6)

        CGContextClosePath(c);
        CGContextFillPath(c);
        
        // top
        CGContextSetFillColorWithColor(c, NSColor.colorWithCalibratedRGBA(0.25, 0.25, 0.25, 0.6));
        // CGContextFillRect(c, NSMakeRect(aRect.origin.x, aRect.origin.y, aRect.size.width, 19));
        CGContextBeginPath(c);
        CGContextBeginPath(c);
        CGContextMoveToPoint(c, aRect.origin.x, aRect.origin.y + 19);
        CGContextAddArcToPoint(c, aRect.origin.x, aRect.origin.y, aRect.origin.x + 6, aRect.origin.y, 6);
        CGContextAddArcToPoint(c, aRect.origin.x + aRect.size.width, aRect.origin.y, aRect.origin.x + aRect.size.width, aRect.origin.y + 6, 6);
        CGContextAddLineToPoint(c, aRect.origin.x + aRect.size.width, aRect.origin.y + 19);
        CGContextClosePath(c);
        CGContextFillPath(c);
    }
});
/* 
 * paragraph_style.js
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


// NSTextTabType
var NSLeftTabStopType               = 0;
var NSRightTabStopType              = 1;
var NSCenterTabStopType             = 2;
var NSDecimalTabStopType            = 3;

// NSLineBreakMode
var NSLineBreakByWordWrapping       = 0;
var NSLineBreakByCharWrapping       = 1;
var NSLineBreakByClipping           = 2;
var NSLineBreakByTruncatingHead     = 3;
var NSLineBreakByTruncatingTail     = 4;
var NSLineBreakByTruncatingMiddle   = 5;

var NSParagraphStyle = NSObject.extend({
    
    _lineSpacing: null,
    _paragraphSpacing: null,
    _headIndent: null,
    _tailIndent: null,
    _firstLineHeadIndent: null,
    _minimumLineHeight: null,
    _maximumLineHeight: null,
    _tabStops: null,
    
    _alignment: null,
    _lineBreakMode: null,
    _isNaturalDirection: null,
    _rightToLeftDirection: null,
    
    _defaultTabInterval: null,
    
    /**
        Distance between bottom of one line fragment and the top of the next one.
        This is included in the line fragement height by layoutmanager.
    */
    lineSpacing: function() {
        return this._lineSpacing;
    },
    
    setLineSpacing: function(aFloat) {
        
    },
    
    /**
        Distance between the bottom of this paragraph and the top of the next one
    */
    paragraphSpacing: function() {
        return this._paragraphSpacing;
    },
    
    setParagraphSpacing: function(aFloat) {
        
    },
    
    /**
        Text alignment from NSTextAlignment.
    */
    alignment: function() {
        return this._alignment;
    },
    
    setAlignment: function(alignment) {
        
    },
    
    /**
        Distance from margin to front side of the paragraph
    */
    headIndent: function() {
        return this._headIndent;
    },
    
    setHeadIndent: function(aFloat) {
        
    },
    
    /**
        Distance from margin to back edge of paragraph.
    */
    tailIndent: function() {
        return this._tailIndent;
    },
    
    setTailIndent: function(aFloat) {
        
    },
    
    /**
        Distance from margin to front side of first line
    */
    firstLineHeadIndent: function() {
        return this._firstLineHeadIndent;
    },
    
    /**
        Distance from left margin to tab stops
    */
    tabStops: function() {
        return this._tabStops;
    },
    
    /**
        Basic line fragment height excluding linespacing.
    */
    minimumLineHeight: function() {
        return this._minimumLineHeight;
    },
    
    setMinimumLineHeight: function(aFloat) {
        
    },
    
    /**
        Maximum line height. 0 means there is no maximum
    */
    maximumLineHeight: function() {
        return this._maximumLineHeight;
    },
    
    setMaximumLineHeight: function(aFloat) {
        
    },
    
    /**
        A value from NSLineBreakMode
    */
    lineBreakMode: function() {
        return this._lineBreakMode;
    },
    
    setLineBreakMode: function(mode) {
        
    },
    
    /**
        Base writing direction.
    */
    baseWritingDirection: function() {
        return this._baseWritingDirection;
    },
    
    /**
        line height multiplied by this (although it is contained by min/max height)
    */
    lineHeightMultiple: function() {
        
    },
    
    paragraphSpacingBefore: function() {
        
    },
    
    defaultTabInterval: function() {
        
    },
    
    textBlocks: function() {
        
    },
    
    textLists: function() {
        
    },
    
    hyphenationFactor: function() {
        
    },
    
    tighteningFactorForTruncation: function() {
        
    },
    
    /**
        HTML header level. This might be redundant unless outputting html is a 
        large requirement.
    */
    headerLevel: function() {
        
    }

    // - (void)setLineSpacing:(CGFloat)aFloat;
    // - (void)setParagraphSpacing:(CGFloat)aFloat;
    // - (void)setAlignment:(NSTextAlignment)alignment;
    // - (void)setFirstLineHeadIndent:(CGFloat)aFloat;
    // - (void)setHeadIndent:(CGFloat)aFloat;
    // - (void)setTailIndent:(CGFloat)aFloat;
    // - (void)setLineBreakMode:(NSLineBreakMode)mode;
    // - (void)setMinimumLineHeight:(CGFloat)aFloat;
    // - (void)setMaximumLineHeight:(CGFloat)aFloat;
    // - (void)addTabStop:(NSTextTab *)anObject;
    // - (void)removeTabStop:(NSTextTab *)anObject;
    // - (void)setTabStops:(NSArray *)array;
    // - (void)setParagraphStyle:(NSParagraphStyle *)obj;
    // #if MAC_OS_X_VERSION_MAX_ALLOWED >= MAC_OS_X_VERSION_10_2
    // - (void)setBaseWritingDirection:(NSWritingDirection)writingDirection;
    // #endif
    // #if MAC_OS_X_VERSION_MAX_ALLOWED >= MAC_OS_X_VERSION_10_3
    // - (void)setLineHeightMultiple:(CGFloat)aFloat;
    // - (void)setParagraphSpacingBefore:(CGFloat)aFloat;
    // - (void)setDefaultTabInterval:(CGFloat)aFloat;
    // #endif
    // #if MAC_OS_X_VERSION_MAX_ALLOWED >= MAC_OS_X_VERSION_10_4
    // - (void)setTextBlocks:(NSArray *)array;
    // - (void)setTextLists:(NSArray *)array;
    // - (void)setHyphenationFactor:(float)aFactor;
    // - (void)setTighteningFactorForTruncation:(float)aFactor;
    // - (void)setHeaderLevel:(NSInteger)level;
    // #endif
    // @end
});

NSParagraphStyle.defaultParagraphStyle = function() {
    return NSParagraphStyle.create();
};

/**
    This also seems like it will be used very little.....
*/
NSParagraphStyle.defaultWritingDirectionForLanguage = function(languageName) {
    
};
/* 
 * scroll_view.js
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

var NSScrollView = NSView.extend({
   
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        var flags = aCoder.decodeIntForKey("NSsFlags");
        
        this._hasVerticalScroller = (flags & 0x10) ? true : false;
        this._hasHorizontalScroller = (flags & 0x20) ? true : false;
        this._borderType = flags & 0x303;

        this._verticalScroller = aCoder.decodeObjectForKey("NSVScroller");
        this._horizontalScroller = aCoder.decodeObjectForKey("NSHScroller");
        this._clipView = aCoder.decodeObjectForKey("NSContentView");
        this._headerClipView = aCoder.decodeObjectForKey("NSHeaderClipView");
        this._cornerView = aCoder.decodeObjectForKey("NSCornerView");
        
        if (!this._hasVerticalScroller)
            this._verticalScroller.removeFromSuperview();
        
        if (!this._hasHorizontalScroller)
            this._horizontalScroller.removeFromSuperview();
        
        this.tile();
        return this;
    },
    
    tile: function() {
        
    },
    
    hitTest: function() {
        return null;
    }
});
/* 
 * scroller.js
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

var NSScroller = NSView.extend({
    
});
/* 
 * shadow.js
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


var NSShadow = NSObject.extend({
    
    _shadowOffset: null,
    _shadowBlurRadius: null,
    _shadowColor: null,
    
    init: function() {
        this._shadowOffset = NSMakeSize(0, 0);
        this._shadowBlurRadius = 0.0;
        this._shadowColor = NSColor.colorWithCalibratedRGBA(0.0, 0.0, 0.0, 0.333);
        return this;
    },
    
    shadowOffset: function() {
        return this._shadowOffset;
    },
    
    setShadowOffset: function(offset) {
        this._shadowOffset = offset;
    },
    
    shadowBlurRadius: function() {
        return this._shadowBlurRadius;
    },
    
    setShadowBlurRadius: function(val) {
        this._shadowBlurRadius = val;
    },
    
    shadowColor: function() {
        return this.shadowColor;
    },
    
    setShadowColor: function(aColor) {
        this._shadowColor = aColor;
    },
    
    set: function() {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSetShadowWithColor(c, this.__shadowOffset, this._shadowBlurRadius, this._shadowColor);
    }
});
/* 
 * slider_cell.js
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


resource('NSSliderHorizontalLeft.png');
resource('NSSliderHorizontalMiddle.png');
resource('NSSliderHorizontalRight.png');
resource('NSSliderHorizontalKnobNormal.png');

// NSTickMarkPosition
var NSTickMarkBelow = 0;
var NSTickMarkAbove = 1;
var NSTickMarkLeft  = 1;
var NSTickMarkRight = 0;

// NSSliderType
var NSLinearSlider   = 0;
var NSCircularSlider = 1;

/**
    @class NSSliderCell
    
    Cell used for the drawing parts of the NSSlider control. A min and max value
    can be set to constrain drawing. Both normal sliders (vertical as well as
    horizontal) and round knobs can be used.
*/
var NSSliderCell = NSCell.extend({
   
   _minValue: 0,
   
   _maxValue: 0,
   
   initWithCoder: function(aCoder) {
       this._super(aCoder);
       this._minValue = aCoder.decodeDoubleForKey("NSMinValue");
       this._maxValue = aCoder.decodeDoubleForKey("NSMaxValue");
       this._value = aCoder.decodeDoubleForKey("NSValue");
       return this;
   },
   
   drawWithFrame: function(cellFrame, controlView) {
       var SLIDER_PADDING = 8.5;
       var KNOB_PADDING = 2;
       
       var c = NSGraphicsContext.currentContext().graphicsPort();
       CGContextSaveGState(c);
       if (!this.isEnabled()) CGContextSetAlpha(c, 0.8);
       
       // draw the bar
       NSImage.imageNamed('NSSliderHorizontalLeft.png').drawInRect(CGRectMake(KNOB_PADDING, 8, 5, 5));
       NSImage.imageNamed('NSSliderHorizontalMiddle.png').drawInRect(CGRectMake(5 + KNOB_PADDING, 8, (cellFrame.size.width - 10) - (2 * KNOB_PADDING), 5));
       NSImage.imageNamed('NSSliderHorizontalRight.png').drawInRect(CGRectMake((cellFrame.size.width-5) - KNOB_PADDING, 8 ,5 ,5));
       
       // draw the knob
       var knobPosition = (((this._value / (this._maxValue - this._minValue)) * ((cellFrame.size.width - (2 * SLIDER_PADDING)))));
       NSImage.imageNamed('NSSliderHorizontalKnobNormal.png').drawInRect(CGRectMake(knobPosition,2,17,17));
       
       CGContextRestoreGState(c);
   },
   
   startTrackingAtInView: function(startPoint, controlView) {
       if (this.isEnabled()) {
           var SLIDER_PADDING = 8.5;
           var location = controlView.convertPointFromView(startPoint, null);
           this.setDoubleValue(((location.x - SLIDER_PADDING) / (controlView.bounds().size.width - (2 * SLIDER_PADDING))) * (this._maxValue - this._minValue));
           this.drawFrameInView(controlView.bounds(), controlView);
           return true;
       }
       return false;
   },

    /**
        Sets the double value for the slider. If the value is below the minValue,
        then the value is adjusted to be the minValue. Similarly, if the value
        is greater than the maxValue, it is also adjusted acordingly.
    */
    setDoubleValue: function(aDouble) {
       if (aDouble < this._minValue) this._value = this._minValue;
       else if (aDouble > this._maxValue) this._value = this._maxValue;
       else this._value = aDouble;
   },
   
   continueTrackingInView: function(lastPoint, currentPoint, controlView) {
       var SLIDER_PADDING = 8.5;
       var location = controlView.convertPointFromView(currentPoint, null);
       this.setDoubleValue(((location.x - SLIDER_PADDING) / (controlView.bounds().size.width - (2 * SLIDER_PADDING))) * (this._maxValue - this._minValue));
       this.drawWithFrame(controlView.bounds(), controlView);
       return true;
   },
   
   /**
        @param flag - If the mouseIsUp
   */
   stopTrackingInView: function(lastPoint, stopPoint, controlView, flag) {
       
   },
   
   prefersTrackingUntilMouseUp: function() {
       
   },
   
   minValue: function() {
       return this._minValue;
   },
   
   setMinValue: function(aDouble) {
       this._minValue = aDouble;
   },
   
   maxValue: function() {
       return this._maxValue;
   },

   setMaxValue: function(aDouble) {
       this._maxValue = aDouble;
   }
});
/* 
 * slider.js
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


var NSSlider = NSControl.extend({
    
});/* 
 * string_drawing.js
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


// NSStringDrawingOptions
var NSStringDrawingTruncatesLastVisibleLine         = (1 << 5);
var NSStringDrawingUsesLineFragmentOrigin           = (1 << 0);
var NSStringDrawingUsesFontLeading                  = (1 << 1);
var NSStringDrawingDisableScreenFontSubstitution    = (1 << 2);
var NSStringDrawingUsesDeviceMetrics                = (1 << 3);
var NSStringDrawingOneShot                          = (1 << 4);

Object.extend(String.prototype, {
    
    sizeWithAttributes: function(attrs) {
        
    },
    
    drawAtPoint: function(aPoint, attrs) {
        
    },
    
    drawInRect: function(aRect, attrs) {
        
    }
});

NSAttributedString.mixin({
    
    size: function() {
	    var c = NSGraphicsContext.currentContext().graphicsPort();
	    CGContextSaveGState(c);
	    
	    var theFont = this._attributes.objectForKey(NSFontAttributeName);
		CGContextSetFont(c, theFont);
		
	    var theSize = NSMakeSize(c.measureText(this._string).width, this._attributes.objectForKey(NSFontAttributeName).fontSize());
	    CGContextRestoreGState(c);
	    return theSize;
	},
    
    drawAtPoint: function(aPoint) {
        
    },
    
    drawInRect: function(aRect) {
        
    }
});

Object.extend(String.prototype, {
    
    drawWithRectAndOptions: function(aRect, options, attributes) {
        
    },
    
    boundingRectWithSize: function(aSize, options, attributes) {
        
    }
});

NSAttributedString.mixin({
    
    drawWithRectAndOptions: function(aRect, options) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
		
        // font
		var theFont = this._attributes.objectForKey(NSFontAttributeName);
		CGContextSetFont(c, theFont);
		
        // text color
		var theColor = this._attributes.objectForKey(NSForegroundColorAttributeName);
		CGContextSetFillColorWithColor(c, theColor);
		
        // text shadow, if any
        if (this._attributes.containsKey(NSShadowAttributeName)) {
            // CGContextSetShadowWithColor(c, NSMakeSize(1, 1), 1, NSColor.)
        }
		
		CGContextShowTextAtPoint(c, aRect.origin.x, aRect.size.height + aRect.origin.y, this._string);
    },
    
    boundingRectWithSize: function(aSize, options) {
        
    }
});
/* 
 * text_container.js
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

var NSTextContainer = NSObject.extend({
   
    _size: null,
    _textView: null,
    _layoutManager: null,
    _lineFragmentPadding: null,
    _widthTracksTextView: null,
    _heightTracksTextView: null,
    
    initWithCoder: function(aCoder) {
        this._size = NSMakeSize(aCoder.decodeFloatForKey("NSWidth"), 0);
        this._textView = aCoder.decodeObjectForKey("NSTextView");
        this._layoutManager = aCoder.decodeObjectForKey("NSLayoutManager");
                console.log(this._textView.frame());
        this._size.height = this._textView.frame().size.height;
        this._lineFragmentPadding = 0;
        this._widthTracksTextView = true;
        this._heightTracksTextView = true;
        return this;
    },
    
    containerSize: function() {
        return this._size;
    },
    
    textView: function() {
        return this._textView;
    },
    
    lineFragmentPadding: function() {
        return this._lineFragmentPadding;
    },
    
    setContainerSize: function(aSize) {
        this._size = aSize;
        this._layoutManager.textContainerChangedGeometry(this);
    },
    
    setTextView: function(aTextView) {
        this._textView = aTextView;
        this._textView.setTextContainer(this);
    },
    
    widthTracksTextView: function() {
        return this._widthTracksTextView;
    },
    
    setWidthTracksTextView: function(flag) {
        this._widthTracksTextView = flag;
    },
    
    heightTracksTextView: function() {
        return this._heightTracksTextView;
    },
    
    setHeightTracksTextView: function(flag) {
        this._heightTracksTextView = flag;
    },
    
    layoutManager: function() {
        return this._layoutManager;
    },
    
    setLayoutManager: function(layoutManager) {
        this._layoutManager = layoutManager;
    },
    
    setLineFragmentPadding: function(padding) {
        this._lineFragmentPadding = padding;
    }
});
/* 
 * text_field.js
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


var NSTextField = NSControl.extend({
    
});
/* 
 * text_field_cell.js
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


resource('NSTextFieldBezelTopLeft.png');
resource('NSTextFieldBezelTopMiddle.png');
resource('NSTextFieldBezelTopRight.png');
resource('NSTextFieldBezelSides.png');
resource('NSTextFieldBezelBottom.png');

var NSTextFieldCell = NSCell.extend({
    
    _backgroundColor: null,
    
    init: function() {
        this._super();
        return this;
    },
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        
        this._drawsBackground = aCoder.decodeBoolForKey("NSDrawsBackground");
        this._backgroundColor = aCoder.decodeObjectForKey("NSBackgroundColor");
        this._textColor = aCoder.decodeObjectForKey("NSTextColor");
        
        return this;
    },
    
    drawInteriorWithFrame: function(cellFrame, controlView) {
		this.attributedStringValue().drawWithRectAndOptions(cellFrame, null);
    },
    
    drawWithFrame: function(cellFrame, controlView) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        
        if (this.drawsBackground()) {
            CGContextSetFillColorWithColor(c, this._backgroundColor);
            CGContextFillRect(c, cellFrame);
        }
        
        if (this.isBezeled()) {
            NSImage.imageNamed('NSTextFieldBezelTopLeft.png').drawInRect(CGRectMake(0 ,0, 2, 2));
            NSImage.imageNamed('NSTextFieldBezelTopMiddle.png').drawInRect(CGRectMake(2,0,cellFrame.size.width - 4,2));
            NSImage.imageNamed('NSTextFieldBezelTopRight.png').drawInRect(CGRectMake(cellFrame.size.width-2,0,2,2));
            NSImage.imageNamed('NSTextFieldBezelSides.png').drawInRect(CGRectMake(0, 2, 1, cellFrame.size.height - 2));
            NSImage.imageNamed('NSTextFieldBezelSides.png').drawInRect(CGRectMake(cellFrame.size.width - 1, 2, 1, cellFrame.size.height - 2));
            NSImage.imageNamed('NSTextFieldBezelBottom.png').drawInRect(CGRectMake(1, cellFrame.size.height - 1, cellFrame.size.width - 2, 1));
        }
        
        this.drawInteriorWithFrame(cellFrame, controlView);
    },
    
    drawsBackground: function() {
        return this._drawsBackground;
    },
    
    setDrawsBackground: function(flag) {
        this._drawsBackground = flag;
    },
    
    backgroundColor: function() {
        return this._backgroundColor;
    },
    
    setBackgroundColor: function(aColor) {
        this._backgroundColor = aColor;
    },
    
    setBezeled: function(flag) {
        this._isBezeled = flag;
    },
    
    isBezeled: function() {
        return this._isBezeled;
    },
    
    setBezelStyle: function(style) {
        this._bezelStyle = style;
    },
    
    bezelStyle: function() {
        return this._bezelStyle;
    },
    
    setTextColor: function(aColor) {
        this._textColor = aColor;
    },
    
    textColor: function(aColor) {
        return this._textColor;
    },
    
    titleRectForBounds: function(theRect) {
        if (this.isEditable()) {
            return NSMakeRect(theRect.origin.x + 4, theRect.origin.y + 4, theRect.size.width - 8, theRect.size.height - 8);
        }
        
        return theRect;
    },

	attributedStringValue: function() {
        // if (this._value.typeOf(NSAttributedString)) {
            // return this._value;
        // }
		
		var attributes = NSDictionary.create();
		
		// font
		if (this.font())
			attributes.setObjectForKey(this.font(), NSFontAttributeName);
		
		// textColor
		if (this.isEnabled()) {
			if (this.textColor())
				attributes.setObjectForKey(this.textColor(), NSForegroundColorAttributeName);
		}
		else {
			attributes.setObjectForKey(NSColor.disabledControlTextColor(), NSForegroundColorAttributeName);
		}
		
		return NSAttributedString.create('initWithStringAndAttributes', this._value, attributes);
	},
    
    setupFieldEditorAttributes: function(textObj) {
        return textObj;
    },
    
    setPlaceholderString: function(aString) {
        
    },
    
    placeholderString: function() {
        
    },
    
    setPlaceholderAttributedString: function(aString) {
        
    },
    
    placeholderAttributedString: function() {
        
    },
    
    setWantsNotificationForMarkedText: function(flag) {
        
    }
});
/* 
 * text_storage.js
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

var NSTextStorage = NSObject.extend({

    _delegate: null,
    
    _layoutManagers: null,
    _changeInLength: null,
    _editedMask: null,
    _editedRange: null,
    _beginEditing: null,
    
    initWithCoder: function(aCoder) {
        this._layoutManagers = [];
        return this;
    },
    
    layoutManagers: function() {
        return this._layoutManagers;
    },
    
    addLayoutManager: function(layoutManager) {
        this._layoutManagers.push(layoutManager);
        layoutManager.setTextStorage(this);
    }
});
/* 
 * text_view.js
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

/**
    The interface for the text system. NSTextView relies on other classes to
    calculate and hold display information. In most cases:
    
    NSTextView      - presents view
        ^
    NSTextContainer - geometry of layout area
        ^
    NSLayoutManager - controller to keep models and views in sync
        ^
    NSTextStorage   - a model of the text data
    
    Other classes are involved, such as NSTypesetter. Users usually only have
    to deal with NSTextView, as this provides the recomended interface and 
    class views of the text system. Subclassing the other objects is heavly
    non recomended.
*/
var NSTextView = NSView.extend({

    _textStorage: null,
    _textContainer: null,
    // _textContainerInset: null,
    // _ownsTextStorage: null,
    _typingAttributes: null,

    _delegate: null,
    _isEditable: null,
    _isSelectable: null,
    _isRichText: null,
    _backgroundColor: null,
    _drawsBackground: null,
    _font: null,
    _textColor: null,
    _textAlignment: null,
   
    _insertionPointColor: null,
    _insertionPointRect: null,
    _insertionPointOn: null,
    _insertionPointTimer: null,
   
    _isFieldEditor: null,
    _maxSize: null,
    _isHorizontallyResizable: null,
    _isVerticallyResizable: null,
    _usesRuler: null,
    _rulerVisible: null,
    _allowsUndo: null,
   
    _selectedRange: null,
    _selectionAffinity: null,
    _selectionGranularity: null,
    _selectedTextAttributes: null,
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        var flags = aCoder.decodeIntForKey("NSTVFlags");
        var sharedData = aCoder.decodeObjectForKey("NSSharedData");
        
        this._textContainer = aCoder.decodeObjectForKey("NSTextContainer");
        this._textStorage = this._textContainer.layoutManager().textStorage();
        this._textStorage.addLayoutManager(this._textContainer.layoutManager());
        
        this._typingAttributes = NSDictionary.create();
        this._delegate = aCoder.decodeObjectForKey("NSDelegate");
        
        this._isEditable = sharedData.isEditable();
        this._isSelectable = sharedData.isSelectable();
        this._isRichText = sharedData.isRichText();
        this._backgroundColor = sharedData.backgroundColor();
        this._drawsBackground = true;
        this._font = null;
        this._textColor = null;
        
        // this._textAlignment = sharedData.defaultParagraphStyle().alignment();
        this._insertionPointColor = sharedData.insertionColor();
        
        this._isFieldEditor = false;
        
        
        // this._textStorage.addAttribute(NSFontAttributeName, this._font, NSMakeRange(0, this._textStorage.length()));
        // this._textStorage.addAttribute(NSForegroundColorAttributeName, this._textColor, NSMakeRange(0, this._textStorage.length()));
        
        return this;
    },
    
    textContainer: function() {
        return this._textContainer;
    },
    
    layoutManager: function() {
        return this._layoutManager;
    },
    
    textStorage: function() {
        return this._textStorage;
    },
    
    typingAttributes: function() {
        return this._typingAttributes;
    },
    
    selectedTextAttributes: function() {
        return this._selectedTextAttributes;
    },
    
    selectionRangeForProposedRange: function(range, granularity) {
        return range;
    },
    
    setSelectedRange: function(range, affinity, stillSelecting) {
        
    },
    
    rangeForUserCompletion: function() {
        
    },
    
    completionsForPartialWordRange: function(range, indexOfSelectedItem) {
        
    },
    
    insertCompletion: function(string, forPartialWordRange, movement, isFinal) {
        
    },
    
    writablePasteboardTypes: function() {
        
    },
    
    writeSelectionToPasteboard: function(pasteboard, types) {
        
    },
    
    rangeForUserTextChange: function() {
        
    },
    
    rangeForUserCharacterAttributeChange: function() {
        
    },
    
    rangeForUserParagraphAttributeChange: function() {
        
    },
    
    shouldChangeTextInRange: function(range, replacementString) {
        
    },
    
    didChangeText: function() {
        
    },
    
    shouldDrawInsertionPoint: function() {
        if (!this._isEditable) 
            return false;
        
        return true;
    },
    
    drawInsertionPointInRect: function(aRect, color, turnedOn) {
        
    },
    
    undo: function(sender) {
        
    },
    
    redo: function(sender) {
        
    },
    
    cut: function(sender) {
        
    },
    
    copy: function(sender) {
        
    },
    
    paste: function(sender) {
        
    },
    
    selectAll: function(sender) {
        
    },
    
    insertTab: function(sender) {
        
    },
    
    insertTabIgnoringFieldEditor: function(sender) {
        
    },
    
    performClick: function(sender) {
        
    },
    
    insertNewLine: function(sender) {
        
    },
    
    insertNewLineIgnoringFieldEditor: function(sender) {
        
    },
    
    cancel: function(sender) {
        
    },
    
    moveForward: function(sender) {
        
    },
    
    moveForwardAndModifySelection: function(sender) {
        
    },
    
    moveWordForward: function(sender) {
        
    },
    
    moveWordForwardAndModifySelection: function(sender) {
        
    },
    
    moveDown: function(sender) {
        
    },
    
    moveDownAndModifySelection: function(sender) {
        
    },
    
    moveUp: function(sender) {
        
    },
    
    moveUpAndModifySelection: function(sender) {
        
    },
    
    moveLeft: function(sender) {
        
    },
    
    moveRight: function(sender) {
        
    },
    
    moveBackward: function(sender) {
        
    },
    
    moveBackwardAndModifySelection: function(sender) {
        
    },
    
    moveWordBackward: function(sender) {
        
    },
    
    moveWordBackwardAndModifySelection: function(sender) {
        
    },
    
    moveToBeginningOfDocument: function(sender) {
        
    },
    
    moveToBeginningOfDocumentAndModifySelection: function(sender) {
        
    },
    
    moveToEndOfDocument: function(sender) {
        
    },
    
    moveToEndOfDocumentAndModifySelection: function(sender) {
        
    },
    
    scrollToBeginningOfDocument: function(sender) {
        
    },
    
    scrollToEndOfDocument: function(sender) {
        
    },
    
    deleteForward: function(sender) {
        
    },
    
    deleteBackward: function(sender) {
        
    },
    
    deleteToBeginningOfLine: function(sender) {
        
    },
    
    deleteToEndOfLine: function(sender) {
        
    },
    
    deleteToBeginningOfParagraph: function(sender) {
        
    },
    
    deleteToEndOfParagraph: function(sender) {
        
    },
    
    deleteWordBackward: function(sender) {
        
    },
    
    deleteWordForward: function(sender) {
        
    },
    
    clear: function(sender) {
        
    },
    
    moveToBeginningOfLine: function(sender) {
        
    },
    
    moveToBeginningOfLineAndModifySelection: function(sender) {
        
    },
    
    moveToEndOfLine: function(sender) {
        
    },
    
    moveToEndOfLineAndModifySelection: function(sender) {
        
    },
    
    moveToBeginningOfParagraph: function(sender) {
        
    },
    
    moveParagraphBackwardAndModifySelection: function(sender) {
        
    },
    
    moveToEndOfParagraph: function(sender) {
        
    },
    
    moveParagraphForwardAndModifySelection: function(sender) {
        
    },
    
    scrollPageUp: function(sender) {
        
    },
    
    pageUp: function(sender) {
        
    },
    
    pageUpAndModifySelection: function(sender) {
        
    },
    
    scrollPageDown: function(sender) {
        
    },
    
    pageDown: function(sender) {
        
    },
    
    pageDownAndModifySelection: function(sender) {
        
    },
    
    transpose: function(sender) {
        
    },
    
    yank: function(sender) {
        
    },
    
    transposeWords: function(sender) {
        
    },
    
    complete: function(sender) {
        
    },
    
    endUserCompletion: function(sender) {
        
    },
    
    delegate: function() {
        return this._delegate;
    },
    
    setDelegate: function(anObject) {
        
    },
    
    string: function() {
        return this._textStorage.string();
    },
    
    setString: function(aString) {
        this.replaceCharactersInRange(NSMakeRange(0, this._textStorage.length(), aString));
    },
    
    replaceCharactersInRange: function(range, withString) {
        this._textStorage.replaceCharactersInRange(range, withString);
        this._textStorage.setAttributes(null, NSMakeRange(range.location, withString.length));
        this.setSelectedRange(NSMakeRange(range.location + withString.length, 0));
    },
    
    isEditable: function() {
        return this._isEditable;
    },
    
    setEditable: function(flag) {
        this._isEditable = flag;
    },
    
    isSelectable: function() {
        return this._isSelectable;
    },
    
    setSelectable: function(flag) {
        this._isSelectable = flag;
    },
    
    isRichText: function() {
        return this._isRichText;
    },
    
    setRichText: function(flag) {
        this._isRichText = flag;
    },
    
    isFieldEditor: function() {
        return this._isFieldEditor;
    },
    
    setFieldEditor: function(flag) {
        this._isFieldEditor = flag;
    },
    
    font: function() {
        return this._font;
    },
    
    setFont: function(font) {
        this._font = font;
    },
    
    alignment: function() {
        return this._alignment;
    },
    
    setAlignment: function(alignment) {
        this._alignment = alignment;
    },
    
    textColor: function() {
        return this._textColor;
    },
    
    setTextColor: function(aColor) {
        this._textColor = aColor;
    },
    
    drawsBackground: function() {
        return this._drawsBackground;
    },
    
    setDrawsBackground: function(flag) {
        this._drawsBackground = flag;
    },
    
    setBackgroundColor: function(aColor) {
        this._backgroundColor = aColor;
    },
    
    backgroundColor: function() {
        return this._backgroundColor;
    },
    
    isHorizontallyResizable: function() {
        return this._isHorizontallyResizable;
    },
    
    setHorizontallyResizable: function(flag) {
        this._isHorizontallyResizable = flag;
    },
    
    isVerticallyResizable: function() {
        return this._isVerticallyResizable;
    },
    
    setVerticallyResizable: function(flag) {
        this_isVerticallyResizable = flag;
    },
    
    maxSize: function() {
        return this._maxSize;
    },
    
    setMaxSize: function(aSize) {
        this._maxSize = aSize;
    },
    
    minSize: function() {
        return this._minSize;
    },
    
    setMinSize: function(aSize) {
        this._minSize = aSize;
    },
    
    selectedRange: function() {
        return this._selectedRange;
    },
    
    setSelectedRange: function(range) {
        // this.setSelectedRange(range, null, false);
    },
    
    sizeToFit: function() {
        
    },
    
    drawRect: function(theRect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        console.log('drawing');
        CGContextFillRect(c, theRect);
    }
});
/* 
 * text_view_shared_data.js
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

var NSTextViewSharedData = NSObject.extend({

    _backgroundColor: null,
    _defaultParagraphStyle: null,
    _flags: null,
    _insertionColor: null,
    _linkAttributes: null,
    _markedAttributes: null,
    _selectedAttributes: null,
    
    _isEditable: null,
    _isSelectable: null,
    _isRichText: null,
    
    initWithCoder: function(aCoder) {
        var flags = aCoder.decodeIntForKey("NSFlags");
        
        this._isEditable = (flags & 0x00000002) ? true : false;
        this._isSelectable = (flags & 0x00000001) ? true : false;
        this._isRichText = (flags & 0x00000004) ? true : false;
        
        this._backgroundColor = aCoder.decodeObjectForKey("NSBackgroundColor");
        this._defaultParagraphStyle = aCoder.decodeObjectForKey("NSDefaultParagraphStyle");
        
        this._insertionColor = aCoder.decodeObjectForKey("NSInsertionColor");
        // this._linkAttributes = aCoder.decodeObjectForKey("NSLinkAttributes");
        this._markedAttributes = aCoder.decodeObjectForKey("NSMarkedAttributes");
        // this._selectedAttributed = aCoder.decodeObjectForKey("NSSelectedAttributes");
        
        return this;
    },
    
    backgroundColor: function() {
        return this._backgroundColor;
    },
    
    insertionColor: function() {
        return this._insertionColor;
    },
    
    defaultParagraphStyle: function() {
        return this._defaultParagraphStyle;
    },
    
    isEditable: function() {
        return this._isEditable;
    },
    
    isSelectable: function() {
        return this._isSelectable;
    },
    
    isRichText: function() {
        return this._isRichText;
    }
});
/* 
 * type_setter.js
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

var NSTypesetter = NSObject.extend({
    _behavior: null,
    _hyphenationFactor: null,
    _lineFragmentPadding: null,
    _usesFontLeading: null,
    _bidiProcessingEnabled: null,
    
    _layoutManager: null,
    _textContainers: null,
    _attributedString: null,
    _string: null,
    
    _currentTextContainer: null,
    _currentParagraphStyle: null,
    
    
});
/* 
 * window_template.js
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


var NSWindowTemplate = NSObject.extend({
    
    _maxSize: null,
    _minSize: null,
    _screenRect: null,
    
    _viewClass: null,
    _wtFlags: null,
    _windowBacking: null,
    _windowClass: null,
    _windowRect: null,
    
    _windowTitle: null,
    _windowView: null,
    
    _styleMask: null,
    _windowAutosave: null,
    
    initWithCoder: function(aCoder) {
        this._maxSize = aCoder.decodeSizeForKey("NSMaxSize");
        this._minSize = aCoder.decodeSizeForKey("NSMinSize");
        this._screenRect = aCoder.decodeRectForKey("NSScreenRect");

        this._viewClass = aCoder.decodeObjectForKey("NSViewClass");
        this._wtFlags = aCoder.decodeIntForKey("NSWTFlags");
        this._windowBacking = aCoder.decodeIntForKey("NSWindowBacking");
        this._windowClass = aCoder.decodeObjectForKey("NSWindowClass");
        this._windowRect = aCoder.decodeRectForKey("NSWindowRect");

        this._windowTitle = aCoder.decodeObjectForKey("NSWindowTitle");
        this._windowView = aCoder.decodeObjectForKey("NSWindowView");

        this._styleMask = aCoder.decodeIntForKey("NSWindowStyleMask");
        this._windowAutosave = aCoder.decodeObjectForKey("NSFrameAutosaveName");

        return this;
    },
    
    awakeAfterUsingCoder: function(aCoder) {
        var theClass = window[this._windowClass];
        var theWindow = theClass.create('initWithContentRectAndStyleMask', this._windowRect, this._styleMask);
        theWindow.setContentView(this._windowView);
        return theWindow;
    }
});
/* 
 * flash_view.js
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

/* 
 * vienna.js
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

// Global Vienna namespace object
var VN = { };


/* 
 * main.js
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


function main(argc, argv)
{
    return NSApplicationMain(argc, argv);
}
__bootstrap_files["MainMenu.json"] = {"archive":{"data":{"IBDocument.SystemTarget": 1060,"IBDocument.SystemVersion": "10A394","IBDocument.InterfaceBuilderVersion": "731","IBDocument.AppKitVersion": "1027.1","IBDocument.HIToolboxVersion": "430.00","IBDocument.PluginVersions": {"class": "NSMutableDictionary","id": "", "objects":{"NS.key.0": "com.apple.InterfaceBuilder.CocoaPlugin","NS.object.0": "731"}},"IBDocument.EditedObjectIDs": {"class": "NSMutableArray","id": "", "objects":[29,367]},"IBDocument.PluginDependencies": {"class": "NSArray","id": "", "objects":["com.apple.InterfaceBuilder.CocoaPlugin"]},"IBDocument.Metadata": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"class": "NSArray","id": "0", "objects":[]},"dict.values": {"class": "NSMutableArray","id": "", "objects":[]}}},"IBDocument.RootObjects": {"class": "NSMutableArray","id": "1048", "objects":[{"class": "NSCustomObject","id": "1021", "objects":{"NSClassName": "NSApplication"}},{"class": "NSCustomObject","id": "1014", "objects":{"NSClassName": "FirstResponder"}},{"class": "NSCustomObject","id": "1050", "objects":{"NSClassName": "NSApplication"}},{"class": "NSCustomObject","id": "163992474", "objects":{"NSClassName": "NSFontManager"}},{"class": "NSMenu","id": "649796088", "objects":{"NSTitle": "Main Menu","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "694149608", "objects":{"NSMenu": {"id":"649796088"},"NSTitle": "NewApplication","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"class": "NSCustomResource","id": "353210768", "objects":{"NSClassName": "NSImage","NSResourceName": "NSMenuCheckmark"}},"NSMixedImage": {"class": "NSCustomResource","id": "549394948", "objects":{"NSClassName": "NSImage","NSResourceName": "NSMenuMixedState"}},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "110575045", "objects":{"NSTitle": "NewApplication","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "238522557", "objects":{"NSMenu": {"id":"110575045"},"NSTitle": "About NewApplication","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "304266470", "objects":{"NSMenu": {"id":"110575045"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "609285721", "objects":{"NSMenu": {"id":"110575045"},"NSTitle": "Preferences…","NSKeyEquiv": ",","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "481834944", "objects":{"NSMenu": {"id":"110575045"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "1046388886", "objects":{"NSMenu": {"id":"110575045"},"NSTitle": "Services","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "752062318", "objects":{"NSTitle": "Services","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[]},"NSName": "_NSServicesMenu"}}}},{"class": "NSMenuItem","id": "646227648", "objects":{"NSMenu": {"id":"110575045"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "755159360", "objects":{"NSMenu": {"id":"110575045"},"NSTitle": "Hide NewApplication","NSKeyEquiv": "h","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "342932134", "objects":{"NSMenu": {"id":"110575045"},"NSTitle": "Hide Others","NSKeyEquiv": "h","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "908899353", "objects":{"NSMenu": {"id":"110575045"},"NSTitle": "Show All","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "1056857174", "objects":{"NSMenu": {"id":"110575045"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "632727374", "objects":{"NSMenu": {"id":"110575045"},"NSTitle": "Quit NewApplication","NSKeyEquiv": "q","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]},"NSName": "_NSAppleMenu"}}}},{"class": "NSMenuItem","id": "379814623", "objects":{"NSMenu": {"id":"649796088"},"NSTitle": "File","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "720053764", "objects":{"NSTitle": "File","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "705341025", "objects":{"NSMenu": {"id":"720053764"},"NSTitle": "New","NSKeyEquiv": "n","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "722745758", "objects":{"NSMenu": {"id":"720053764"},"NSTitle": "Open…","NSKeyEquiv": "o","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "1025936716", "objects":{"NSMenu": {"id":"720053764"},"NSTitle": "Open Recent","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "1065607017", "objects":{"NSTitle": "Open Recent","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "759406840", "objects":{"NSMenu": {"id":"1065607017"},"NSTitle": "Clear Menu","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]},"NSName": "_NSRecentDocumentsMenu"}}}},{"class": "NSMenuItem","id": "425164168", "objects":{"NSMenu": {"id":"720053764"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "776162233", "objects":{"NSMenu": {"id":"720053764"},"NSTitle": "Close","NSKeyEquiv": "w","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "1023925487", "objects":{"NSMenu": {"id":"720053764"},"NSTitle": "Save","NSKeyEquiv": "s","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "117038363", "objects":{"NSMenu": {"id":"720053764"},"NSTitle": "Save As…","NSKeyEquiv": "S","NSKeyEquivModMask": 1179648,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "579971712", "objects":{"NSMenu": {"id":"720053764"},"NSTitle": "Revert to Saved","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "1010469920", "objects":{"NSMenu": {"id":"720053764"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "294629803", "objects":{"NSMenu": {"id":"720053764"},"NSTitle": "Page Setup...","NSKeyEquiv": "P","NSKeyEquivModMask": 1179648,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSToolTip": ""}},{"class": "NSMenuItem","id": "49223823", "objects":{"NSMenu": {"id":"720053764"},"NSTitle": "Print…","NSKeyEquiv": "p","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]}}}}},{"class": "NSMenuItem","id": "725688984", "objects":{"NSMenu": {"id":"649796088"},"NSTitle": "Edit","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "701759256", "objects":{"NSTitle": "Edit","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "521487141", "objects":{"NSMenu": {"id":"701759256"},"NSTitle": "Undo","NSKeyEquiv": "z","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "668936019", "objects":{"NSMenu": {"id":"701759256"},"NSTitle": "Redo","NSKeyEquiv": "Z","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "383018193", "objects":{"NSMenu": {"id":"701759256"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "984623395", "objects":{"NSMenu": {"id":"701759256"},"NSTitle": "Cut","NSKeyEquiv": "x","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "656529582", "objects":{"NSMenu": {"id":"701759256"},"NSTitle": "Copy","NSKeyEquiv": "c","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "1032676691", "objects":{"NSMenu": {"id":"701759256"},"NSTitle": "Paste","NSKeyEquiv": "v","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "808171693", "objects":{"NSMenu": {"id":"701759256"},"NSTitle": "Paste and Match Style","NSKeyEquiv": "V","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "919614590", "objects":{"NSMenu": {"id":"701759256"},"NSTitle": "Delete","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "538907583", "objects":{"NSMenu": {"id":"701759256"},"NSTitle": "Select All","NSKeyEquiv": "a","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "189573236", "objects":{"NSMenu": {"id":"701759256"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "345821971", "objects":{"NSMenu": {"id":"701759256"},"NSTitle": "Find","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "907032324", "objects":{"NSTitle": "Find","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "500637754", "objects":{"NSMenu": {"id":"907032324"},"NSTitle": "Find…","NSKeyEquiv": "f","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSTag": 1}},{"class": "NSMenuItem","id": "710145723", "objects":{"NSMenu": {"id":"907032324"},"NSTitle": "Find Next","NSKeyEquiv": "g","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSTag": 2}},{"class": "NSMenuItem","id": "226219456", "objects":{"NSMenu": {"id":"907032324"},"NSTitle": "Find Previous","NSKeyEquiv": "G","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSTag": 3}},{"class": "NSMenuItem","id": "56753965", "objects":{"NSMenu": {"id":"907032324"},"NSTitle": "Use Selection for Find","NSKeyEquiv": "e","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSTag": 7}},{"class": "NSMenuItem","id": "712516604", "objects":{"NSMenu": {"id":"907032324"},"NSTitle": "Jump to Selection","NSKeyEquiv": "j","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]}}}}},{"class": "NSMenuItem","id": "904504334", "objects":{"NSMenu": {"id":"701759256"},"NSTitle": "Spelling and Grammar","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "752506228", "objects":{"NSTitle": "Spelling","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "184017712", "objects":{"NSMenu": {"id":"752506228"},"NSTitle": "Show Spelling and Grammar","NSKeyEquiv": ":","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "21600483", "objects":{"NSMenu": {"id":"752506228"},"NSTitle": "Check Document Now","NSKeyEquiv": ";","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "601403410", "objects":{"NSMenu": {"id":"752506228"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "553169338", "objects":{"NSMenu": {"id":"752506228"},"NSTitle": "Check Spelling While Typing","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "544362921", "objects":{"NSMenu": {"id":"752506228"},"NSTitle": "Check Grammar With Spelling","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "801119463", "objects":{"NSMenu": {"id":"752506228"},"NSTitle": "Correct Spelling Automatically","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]}}}}},{"class": "NSMenuItem","id": "733935158", "objects":{"NSMenu": {"id":"701759256"},"NSTitle": "Substitutions","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "598912068", "objects":{"NSTitle": "Substitutions","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "48614235", "objects":{"NSMenu": {"id":"598912068"},"NSTitle": "Show Substitutions","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "671306806", "objects":{"NSMenu": {"id":"598912068"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "486300146", "objects":{"NSMenu": {"id":"598912068"},"NSTitle": "Smart Copy/Paste","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "209508969", "objects":{"NSMenu": {"id":"598912068"},"NSTitle": "Smart Quotes","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "744245411", "objects":{"NSMenu": {"id":"598912068"},"NSTitle": "Smart Dashes","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "297725902", "objects":{"NSMenu": {"id":"598912068"},"NSTitle": "Smart Links","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "693876809", "objects":{"NSMenu": {"id":"598912068"},"NSTitle": "Data Detectors","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "166923016", "objects":{"NSMenu": {"id":"598912068"},"NSTitle": "Text Replacement","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]}}}}},{"class": "NSMenuItem","id": "146086820", "objects":{"NSMenu": {"id":"701759256"},"NSTitle": "Transformations","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "139936407", "objects":{"NSTitle": "Transformations","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "765834084", "objects":{"NSMenu": {"id":"139936407"},"NSTitle": "Make Upper Case","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "287915663", "objects":{"NSMenu": {"id":"139936407"},"NSTitle": "Make Lower Case","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "473368487", "objects":{"NSMenu": {"id":"139936407"},"NSTitle": "Capitalize","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]}}}}},{"class": "NSMenuItem","id": "14778224", "objects":{"NSMenu": {"id":"701759256"},"NSTitle": "Speech","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "667491561", "objects":{"NSTitle": "Speech","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "874008672", "objects":{"NSMenu": {"id":"667491561"},"NSTitle": "Start Speaking","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "464437401", "objects":{"NSMenu": {"id":"667491561"},"NSTitle": "Stop Speaking","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]}}}}}]}}}}},{"class": "NSMenuItem","id": "781891986", "objects":{"NSMenu": {"id":"649796088"},"NSTitle": "Format","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "1015803365", "objects":{"NSTitle": "Format","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "247370491", "objects":{"NSMenu": {"id":"1015803365"},"NSTitle": "Font","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "165189968", "objects":{"NSTitle": "Font","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "976032852", "objects":{"NSMenu": {"id":"165189968"},"NSTitle": "Show Fonts","NSKeyEquiv": "t","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "130421458", "objects":{"NSMenu": {"id":"165189968"},"NSTitle": "Bold","NSKeyEquiv": "b","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSTag": 2}},{"class": "NSMenuItem","id": "1034982764", "objects":{"NSMenu": {"id":"165189968"},"NSTitle": "Italic","NSKeyEquiv": "i","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSTag": 1}},{"class": "NSMenuItem","id": "410191250", "objects":{"NSMenu": {"id":"165189968"},"NSTitle": "Underline","NSKeyEquiv": "u","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "208609432", "objects":{"NSMenu": {"id":"165189968"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "926861345", "objects":{"NSMenu": {"id":"165189968"},"NSTitle": "Bigger","NSKeyEquiv": "+","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSTag": 3}},{"class": "NSMenuItem","id": "70851867", "objects":{"NSMenu": {"id":"165189968"},"NSTitle": "Smaller","NSKeyEquiv": "-","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSTag": 4}},{"class": "NSMenuItem","id": "6870069", "objects":{"NSMenu": {"id":"165189968"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "814601473", "objects":{"NSMenu": {"id":"165189968"},"NSTitle": "Kern","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "281415442", "objects":{"NSTitle": "Kern","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "163285378", "objects":{"NSMenu": {"id":"281415442"},"NSTitle": "Use Default","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "99033700", "objects":{"NSMenu": {"id":"281415442"},"NSTitle": "Use None","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "252389237", "objects":{"NSMenu": {"id":"281415442"},"NSTitle": "Tighten","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "394403650", "objects":{"NSMenu": {"id":"281415442"},"NSTitle": "Loosen","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]}}}}},{"class": "NSMenuItem","id": "61728953", "objects":{"NSMenu": {"id":"165189968"},"NSTitle": "Ligature","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "396844641", "objects":{"NSTitle": "Ligature","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "2477936", "objects":{"NSMenu": {"id":"396844641"},"NSTitle": "Use Default","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "1057656020", "objects":{"NSMenu": {"id":"396844641"},"NSTitle": "Use None","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "897063006", "objects":{"NSMenu": {"id":"396844641"},"NSTitle": "Use All","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]}}}}},{"class": "NSMenuItem","id": "518868038", "objects":{"NSMenu": {"id":"165189968"},"NSTitle": "Baseline","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "74357254", "objects":{"NSTitle": "Baseline","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "912968273", "objects":{"NSMenu": {"id":"74357254"},"NSTitle": "Use Default","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "124058341", "objects":{"NSMenu": {"id":"74357254"},"NSTitle": "Superscript","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "608632550", "objects":{"NSMenu": {"id":"74357254"},"NSTitle": "Subscript","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "511998969", "objects":{"NSMenu": {"id":"74357254"},"NSTitle": "Raise","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "769412564", "objects":{"NSMenu": {"id":"74357254"},"NSTitle": "Lower","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]}}}}},{"class": "NSMenuItem","id": "510270214", "objects":{"NSMenu": {"id":"165189968"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "534067315", "objects":{"NSMenu": {"id":"165189968"},"NSTitle": "Show Colors","NSKeyEquiv": "C","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "98556326", "objects":{"NSMenu": {"id":"165189968"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "36828373", "objects":{"NSMenu": {"id":"165189968"},"NSTitle": "Copy Style","NSKeyEquiv": "c","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "30025740", "objects":{"NSMenu": {"id":"165189968"},"NSTitle": "Paste Style","NSKeyEquiv": "v","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]},"NSName": "_NSFontMenu"}}}},{"class": "NSMenuItem","id": "1009760027", "objects":{"NSMenu": {"id":"1015803365"},"NSTitle": "Text","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "51834583", "objects":{"NSTitle": "Text","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "358734960", "objects":{"NSMenu": {"id":"51834583"},"NSTitle": "Align Left","NSKeyEquiv": "{","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "676513999", "objects":{"NSMenu": {"id":"51834583"},"NSTitle": "Center","NSKeyEquiv": "|","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "442988802", "objects":{"NSMenu": {"id":"51834583"},"NSTitle": "Justify","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "173014236", "objects":{"NSMenu": {"id":"51834583"},"NSTitle": "Align Right","NSKeyEquiv": "}","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "912312444", "objects":{"NSMenu": {"id":"51834583"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "33153243", "objects":{"NSMenu": {"id":"51834583"},"NSTitle": "Writing Direction","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "567534941", "objects":{"NSTitle": "Writing Direction","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "656229200", "objects":{"NSMenu": {"id":"567534941"},"NSIsDisabled": true,"NSTitle": "Paragraph","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "961428743", "objects":{"NSMenu": {"id":"567534941"},"NSTitle": "CURlZmF1bHQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "8729794", "objects":{"NSMenu": {"id":"567534941"},"NSTitle": "CUxlZnQgdG8gUmlnaHQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "849793043", "objects":{"NSMenu": {"id":"567534941"},"NSTitle": "CVJpZ2h0IHRvIExlZnQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "135978321", "objects":{"NSMenu": {"id":"567534941"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "108064627", "objects":{"NSMenu": {"id":"567534941"},"NSIsDisabled": true,"NSTitle": "Selection","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "64914340", "objects":{"NSMenu": {"id":"567534941"},"NSTitle": "CURlZmF1bHQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "564889422", "objects":{"NSMenu": {"id":"567534941"},"NSTitle": "CUxlZnQgdG8gUmlnaHQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "3001327", "objects":{"NSMenu": {"id":"567534941"},"NSTitle": "CVJpZ2h0IHRvIExlZnQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]}}}}},{"class": "NSMenuItem","id": "635731648", "objects":{"NSMenu": {"id":"51834583"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "385048345", "objects":{"NSMenu": {"id":"51834583"},"NSTitle": "Show Ruler","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "7825268", "objects":{"NSMenu": {"id":"51834583"},"NSTitle": "Copy Ruler","NSKeyEquiv": "c","NSKeyEquivModMask": 1310720,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "957928442", "objects":{"NSMenu": {"id":"51834583"},"NSTitle": "Paste Ruler","NSKeyEquiv": "v","NSKeyEquivModMask": 1310720,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]}}}}}]}}}}},{"class": "NSMenuItem","id": "586577488", "objects":{"NSMenu": {"id":"649796088"},"NSTitle": "View","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "466310130", "objects":{"NSTitle": "View","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "102151532", "objects":{"NSMenu": {"id":"466310130"},"NSTitle": "Show Toolbar","NSKeyEquiv": "t","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "237841660", "objects":{"NSMenu": {"id":"466310130"},"NSTitle": "Customize Toolbar…","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]}}}}},{"class": "NSMenuItem","id": "713487014", "objects":{"NSMenu": {"id":"649796088"},"NSTitle": "Window","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "835318025", "objects":{"NSTitle": "Window","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "1011231497", "objects":{"NSMenu": {"id":"835318025"},"NSTitle": "Minimize","NSKeyEquiv": "m","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "575023229", "objects":{"NSMenu": {"id":"835318025"},"NSTitle": "Zoom","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "299356726", "objects":{"NSMenu": {"id":"835318025"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}},{"class": "NSMenuItem","id": "625202149", "objects":{"NSMenu": {"id":"835318025"},"NSTitle": "Bring All to Front","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]},"NSName": "_NSWindowsMenu"}}}},{"class": "NSMenuItem","id": "391199113", "objects":{"NSMenu": {"id":"649796088"},"NSTitle": "Help","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "374024848", "objects":{"NSTitle": "Help","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "238773614", "objects":{"NSMenu": {"id":"374024848"},"NSTitle": "NewApplication Help","NSKeyEquiv": "?","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"353210768"},"NSMixedImage": {"id":"549394948"}}}]},"NSName": "_NSHelpMenu"}}}}]},"NSName": "_NSMainMenu"}},{"class": "NSWindowTemplate","id": "513744381", "objects":{"NSWindowStyleMask": 15,"NSWindowBacking": 2,"NSWindowRect": "{{196, 240}, {480, 270}}","NSWTFlags": 611844096,"NSWindowTitle": "Window","NSWindowClass": "NSWindow","NSViewClass": {"nil":""},"NSWindowContentMaxSize": "{1.79769e+308, 1.79769e+308}","NSWindowView": {"class": "NSView","id": "414427165", "objects":{"NSNextResponder": {"id":""},"NSvFlags": 256,"NSFrameSize": "{480, 270}","NSSuperview": {"id":""}}},"NSScreenRect": "{{0, 0}, {1680, 1028}}","NSMaxSize": "{1.79769e+308, 1.79769e+308}"}}]},"IBDocument.Objects": {"class": "IBObjectContainer","id": "", "objects":{"connectionRecords": {"class": "NSMutableArray","id": "", "objects":[{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "performMiniaturize:","source": {"id":"1014"},"destination": {"id":"1011231497"}}},"connectionID": 37}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "arrangeInFront:","source": {"id":"1014"},"destination": {"id":"625202149"}}},"connectionID": 39}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "print:","source": {"id":"1014"},"destination": {"id":"49223823"}}},"connectionID": 86}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "runPageLayout:","source": {"id":"1014"},"destination": {"id":"294629803"}}},"connectionID": 87}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "clearRecentDocuments:","source": {"id":"1014"},"destination": {"id":"759406840"}}},"connectionID": 127}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "orderFrontStandardAboutPanel:","source": {"id":"1021"},"destination": {"id":"238522557"}}},"connectionID": 142}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "performClose:","source": {"id":"1014"},"destination": {"id":"776162233"}}},"connectionID": 193}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "performZoom:","source": {"id":"1014"},"destination": {"id":"575023229"}}},"connectionID": 240}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "showHelp:","source": {"id":"1014"},"destination": {"id":"238773614"}}},"connectionID": 360}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "saveDocument:","source": {"id":"1014"},"destination": {"id":"1023925487"}}},"connectionID": 362}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "saveDocumentAs:","source": {"id":"1014"},"destination": {"id":"117038363"}}},"connectionID": 363}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "revertDocumentToSaved:","source": {"id":"1014"},"destination": {"id":"579971712"}}},"connectionID": 364}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "runToolbarCustomizationPalette:","source": {"id":"1014"},"destination": {"id":"237841660"}}},"connectionID": 365}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "toggleToolbarShown:","source": {"id":"1014"},"destination": {"id":"102151532"}}},"connectionID": 366}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "hide:","source": {"id":"1014"},"destination": {"id":"755159360"}}},"connectionID": 369}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "hideOtherApplications:","source": {"id":"1014"},"destination": {"id":"342932134"}}},"connectionID": 370}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "unhideAllApplications:","source": {"id":"1014"},"destination": {"id":"908899353"}}},"connectionID": 372}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "addFontTrait:","source": {"id":"163992474"},"destination": {"id":"130421458"}}},"connectionID": 420}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "addFontTrait:","source": {"id":"163992474"},"destination": {"id":"1034982764"}}},"connectionID": 421}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "modifyFont:","source": {"id":"163992474"},"destination": {"id":"70851867"}}},"connectionID": 422}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "orderFrontFontPanel:","source": {"id":"163992474"},"destination": {"id":"976032852"}}},"connectionID": 423}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "modifyFont:","source": {"id":"163992474"},"destination": {"id":"926861345"}}},"connectionID": 424}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "raiseBaseline:","source": {"id":"1014"},"destination": {"id":"511998969"}}},"connectionID": 425}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "lowerBaseline:","source": {"id":"1014"},"destination": {"id":"769412564"}}},"connectionID": 426}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "copyFont:","source": {"id":"1014"},"destination": {"id":"36828373"}}},"connectionID": 427}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "subscript:","source": {"id":"1014"},"destination": {"id":"608632550"}}},"connectionID": 428}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "superscript:","source": {"id":"1014"},"destination": {"id":"124058341"}}},"connectionID": 429}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "tightenKerning:","source": {"id":"1014"},"destination": {"id":"252389237"}}},"connectionID": 430}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "underline:","source": {"id":"1014"},"destination": {"id":"410191250"}}},"connectionID": 431}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "orderFrontColorPanel:","source": {"id":"1014"},"destination": {"id":"534067315"}}},"connectionID": 432}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "useAllLigatures:","source": {"id":"1014"},"destination": {"id":"897063006"}}},"connectionID": 433}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "loosenKerning:","source": {"id":"1014"},"destination": {"id":"394403650"}}},"connectionID": 434}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "pasteFont:","source": {"id":"1014"},"destination": {"id":"30025740"}}},"connectionID": 435}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "unscript:","source": {"id":"1014"},"destination": {"id":"912968273"}}},"connectionID": 436}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "useStandardKerning:","source": {"id":"1014"},"destination": {"id":"163285378"}}},"connectionID": 437}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "useStandardLigatures:","source": {"id":"1014"},"destination": {"id":"2477936"}}},"connectionID": 438}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "turnOffLigatures:","source": {"id":"1014"},"destination": {"id":"1057656020"}}},"connectionID": 439}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "turnOffKerning:","source": {"id":"1014"},"destination": {"id":"99033700"}}},"connectionID": 440}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "alignLeft:","source": {"id":"1014"},"destination": {"id":"358734960"}}},"connectionID": 441}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "alignJustified:","source": {"id":"1014"},"destination": {"id":"442988802"}}},"connectionID": 442}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "copyRuler:","source": {"id":"1014"},"destination": {"id":"7825268"}}},"connectionID": 443}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "alignCenter:","source": {"id":"1014"},"destination": {"id":"676513999"}}},"connectionID": 444}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "toggleRuler:","source": {"id":"1014"},"destination": {"id":"385048345"}}},"connectionID": 445}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "alignRight:","source": {"id":"1014"},"destination": {"id":"173014236"}}},"connectionID": 446}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "pasteRuler:","source": {"id":"1014"},"destination": {"id":"957928442"}}},"connectionID": 447}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "terminate:","source": {"id":"1021"},"destination": {"id":"632727374"}}},"connectionID": 448}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "capitalizeWord:","source": {"id":"1014"},"destination": {"id":"473368487"}}},"connectionID": 767}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "cut:","source": {"id":"1014"},"destination": {"id":"984623395"}}},"connectionID": 768}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "paste:","source": {"id":"1014"},"destination": {"id":"1032676691"}}},"connectionID": 769}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "toggleSmartInsertDelete:","source": {"id":"1014"},"destination": {"id":"486300146"}}},"connectionID": 770}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "toggleAutomaticQuoteSubstitution:","source": {"id":"1014"},"destination": {"id":"209508969"}}},"connectionID": 771}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "redo:","source": {"id":"1014"},"destination": {"id":"668936019"}}},"connectionID": 772}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "toggleAutomaticDashSubstitution:","source": {"id":"1014"},"destination": {"id":"744245411"}}},"connectionID": 773}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "toggleContinuousSpellChecking:","source": {"id":"1014"},"destination": {"id":"553169338"}}},"connectionID": 774}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "toggleAutomaticDataDetection:","source": {"id":"1014"},"destination": {"id":"693876809"}}},"connectionID": 775}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "undo:","source": {"id":"1014"},"destination": {"id":"521487141"}}},"connectionID": 776}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "toggleGrammarChecking:","source": {"id":"1014"},"destination": {"id":"544362921"}}},"connectionID": 777}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "startSpeaking:","source": {"id":"1014"},"destination": {"id":"874008672"}}},"connectionID": 778}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "showGuessPanel:","source": {"id":"1014"},"destination": {"id":"184017712"}}},"connectionID": 779}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "checkSpelling:","source": {"id":"1014"},"destination": {"id":"21600483"}}},"connectionID": 780}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "pasteAsPlainText:","source": {"id":"1014"},"destination": {"id":"808171693"}}},"connectionID": 781}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "copy:","source": {"id":"1014"},"destination": {"id":"656529582"}}},"connectionID": 782}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "delete:","source": {"id":"1014"},"destination": {"id":"919614590"}}},"connectionID": 783}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "lowercaseWord:","source": {"id":"1014"},"destination": {"id":"287915663"}}},"connectionID": 784}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "selectAll:","source": {"id":"1014"},"destination": {"id":"538907583"}}},"connectionID": 785}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "stopSpeaking:","source": {"id":"1014"},"destination": {"id":"464437401"}}},"connectionID": 786}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "orderFrontSubstitutionsPanel:","source": {"id":"1014"},"destination": {"id":"48614235"}}},"connectionID": 787}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "toggleAutomaticTextReplacement:","source": {"id":"1014"},"destination": {"id":"166923016"}}},"connectionID": 788}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "toggleAutomaticLinkDetection:","source": {"id":"1014"},"destination": {"id":"297725902"}}},"connectionID": 789}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "toggleAutomaticSpellingCorrection:","source": {"id":"1014"},"destination": {"id":"801119463"}}},"connectionID": 790}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "uppercaseWord:","source": {"id":"1014"},"destination": {"id":"765834084"}}},"connectionID": 791}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "performFindPanelAction:","source": {"id":"1014"},"destination": {"id":"226219456"}}},"connectionID": 798}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "performFindPanelAction:","source": {"id":"1014"},"destination": {"id":"500637754"}}},"connectionID": 799}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "performFindPanelAction:","source": {"id":"1014"},"destination": {"id":"56753965"}}},"connectionID": 800}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "centerSelectionInVisibleArea:","source": {"id":"1014"},"destination": {"id":"712516604"}}},"connectionID": 801}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "performFindPanelAction:","source": {"id":"1014"},"destination": {"id":"710145723"}}},"connectionID": 802}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "makeBaseWritingDirectionLeftToRight:","source": {"id":"1014"},"destination": {"id":"8729794"}}},"connectionID": 815}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "makeBaseWritingDirectionNatural:","source": {"id":"1014"},"destination": {"id":"961428743"}}},"connectionID": 816}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "makeBaseWritingDirectionRightToLeft:","source": {"id":"1014"},"destination": {"id":"849793043"}}},"connectionID": 817}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "makeTextWritingDirectionLeftToRight:","source": {"id":"1014"},"destination": {"id":"564889422"}}},"connectionID": 818}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "makeTextWritingDirectionNatural:","source": {"id":"1014"},"destination": {"id":"64914340"}}},"connectionID": 819}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "makeTextWritingDirectionRightToLeft:","source": {"id":"1014"},"destination": {"id":"3001327"}}},"connectionID": 820}}]},"objectRecords": {"class": "IBMutableOrderedSet","id": "", "objects":{"orderedObjects": {"class": "NSArray","id": "", "objects":[{"class": "IBObjectRecord","id": "", "objects":{"objectID": 0,"object": {"id":"0"},"children": {"id":"1048"},"parent": {"nil":""}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": -2,"object": {"id":"1021"},"parent": {"id":"0"},"objectName": "File's Owner"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": -1,"object": {"id":"1014"},"parent": {"id":"0"},"objectName": "First Responder"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": -3,"object": {"id":"1050"},"parent": {"id":"0"},"objectName": "Application"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 29,"object": {"id":"649796088"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"713487014"},{"id":"694149608"},{"id":"391199113"},{"id":"379814623"},{"id":"586577488"},{"id":"781891986"},{"id":"725688984"}]},"parent": {"id":"0"},"objectName": "Main Menu"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 19,"object": {"id":"713487014"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"835318025"}]},"parent": {"id":"649796088"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 56,"object": {"id":"694149608"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"110575045"}]},"parent": {"id":"649796088"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 103,"object": {"id":"391199113"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"374024848"}]},"parent": {"id":"649796088"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 83,"object": {"id":"379814623"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"720053764"}]},"parent": {"id":"649796088"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 81,"object": {"id":"720053764"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"1023925487"},{"id":"117038363"},{"id":"49223823"},{"id":"722745758"},{"id":"705341025"},{"id":"1025936716"},{"id":"294629803"},{"id":"776162233"},{"id":"425164168"},{"id":"579971712"},{"id":"1010469920"}]},"parent": {"id":"379814623"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 75,"object": {"id":"1023925487"},"parent": {"id":"720053764"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 80,"object": {"id":"117038363"},"parent": {"id":"720053764"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 78,"object": {"id":"49223823"},"parent": {"id":"720053764"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 72,"object": {"id":"722745758"},"parent": {"id":"720053764"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 82,"object": {"id":"705341025"},"parent": {"id":"720053764"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 124,"object": {"id":"1025936716"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"1065607017"}]},"parent": {"id":"720053764"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 77,"object": {"id":"294629803"},"parent": {"id":"720053764"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 73,"object": {"id":"776162233"},"parent": {"id":"720053764"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 79,"object": {"id":"425164168"},"parent": {"id":"720053764"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 112,"object": {"id":"579971712"},"parent": {"id":"720053764"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 74,"object": {"id":"1010469920"},"parent": {"id":"720053764"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 125,"object": {"id":"1065607017"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"759406840"}]},"parent": {"id":"1025936716"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 126,"object": {"id":"759406840"},"parent": {"id":"1065607017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 106,"object": {"id":"374024848"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"238773614"}]},"parent": {"id":"391199113"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 111,"object": {"id":"238773614"},"parent": {"id":"374024848"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 57,"object": {"id":"110575045"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"238522557"},{"id":"755159360"},{"id":"908899353"},{"id":"632727374"},{"id":"646227648"},{"id":"609285721"},{"id":"481834944"},{"id":"304266470"},{"id":"1046388886"},{"id":"1056857174"},{"id":"342932134"}]},"parent": {"id":"694149608"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 58,"object": {"id":"238522557"},"parent": {"id":"110575045"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 134,"object": {"id":"755159360"},"parent": {"id":"110575045"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 150,"object": {"id":"908899353"},"parent": {"id":"110575045"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 136,"object": {"id":"632727374"},"parent": {"id":"110575045"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 144,"object": {"id":"646227648"},"parent": {"id":"110575045"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 129,"object": {"id":"609285721"},"parent": {"id":"110575045"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 143,"object": {"id":"481834944"},"parent": {"id":"110575045"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 236,"object": {"id":"304266470"},"parent": {"id":"110575045"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 131,"object": {"id":"1046388886"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"752062318"}]},"parent": {"id":"110575045"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 149,"object": {"id":"1056857174"},"parent": {"id":"110575045"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 145,"object": {"id":"342932134"},"parent": {"id":"110575045"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 130,"object": {"id":"752062318"},"parent": {"id":"1046388886"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 24,"object": {"id":"835318025"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"299356726"},{"id":"625202149"},{"id":"575023229"},{"id":"1011231497"}]},"parent": {"id":"713487014"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 92,"object": {"id":"299356726"},"parent": {"id":"835318025"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 5,"object": {"id":"625202149"},"parent": {"id":"835318025"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 239,"object": {"id":"575023229"},"parent": {"id":"835318025"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 23,"object": {"id":"1011231497"},"parent": {"id":"835318025"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 295,"object": {"id":"586577488"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"466310130"}]},"parent": {"id":"649796088"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 296,"object": {"id":"466310130"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"102151532"},{"id":"237841660"}]},"parent": {"id":"586577488"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 297,"object": {"id":"102151532"},"parent": {"id":"466310130"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 298,"object": {"id":"237841660"},"parent": {"id":"466310130"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 367,"object": {"id":"513744381"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"414427165"}]},"parent": {"id":"0"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 368,"object": {"id":"414427165"},"parent": {"id":"513744381"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 373,"object": {"id":"163992474"},"parent": {"id":"0"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 375,"object": {"id":"781891986"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"1015803365"}]},"parent": {"id":"649796088"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 376,"object": {"id":"1015803365"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"247370491"},{"id":"1009760027"}]},"parent": {"id":"781891986"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 377,"object": {"id":"247370491"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"165189968"}]},"parent": {"id":"1015803365"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 378,"object": {"id":"1009760027"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"51834583"}]},"parent": {"id":"1015803365"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 379,"object": {"id":"51834583"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"358734960"},{"id":"676513999"},{"id":"442988802"},{"id":"173014236"},{"id":"912312444"},{"id":"385048345"},{"id":"7825268"},{"id":"957928442"},{"id":"635731648"},{"id":"33153243"}]},"parent": {"id":"1009760027"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 380,"object": {"id":"358734960"},"parent": {"id":"51834583"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 381,"object": {"id":"676513999"},"parent": {"id":"51834583"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 382,"object": {"id":"442988802"},"parent": {"id":"51834583"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 383,"object": {"id":"173014236"},"parent": {"id":"51834583"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 384,"object": {"id":"912312444"},"parent": {"id":"51834583"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 385,"object": {"id":"385048345"},"parent": {"id":"51834583"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 386,"object": {"id":"7825268"},"parent": {"id":"51834583"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 387,"object": {"id":"957928442"},"parent": {"id":"51834583"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 388,"object": {"id":"165189968"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"976032852"},{"id":"130421458"},{"id":"1034982764"},{"id":"410191250"},{"id":"208609432"},{"id":"926861345"},{"id":"70851867"},{"id":"6870069"},{"id":"814601473"},{"id":"61728953"},{"id":"518868038"},{"id":"510270214"},{"id":"534067315"},{"id":"98556326"},{"id":"36828373"},{"id":"30025740"}]},"parent": {"id":"247370491"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 389,"object": {"id":"976032852"},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 390,"object": {"id":"130421458"},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 391,"object": {"id":"1034982764"},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 392,"object": {"id":"410191250"},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 393,"object": {"id":"208609432"},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 394,"object": {"id":"926861345"},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 395,"object": {"id":"70851867"},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 396,"object": {"id":"6870069"},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 397,"object": {"id":"814601473"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"281415442"}]},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 398,"object": {"id":"61728953"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"396844641"}]},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 399,"object": {"id":"518868038"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"74357254"}]},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 400,"object": {"id":"510270214"},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 401,"object": {"id":"534067315"},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 402,"object": {"id":"98556326"},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 403,"object": {"id":"36828373"},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 404,"object": {"id":"30025740"},"parent": {"id":"165189968"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 405,"object": {"id":"74357254"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"912968273"},{"id":"124058341"},{"id":"608632550"},{"id":"511998969"},{"id":"769412564"}]},"parent": {"id":"518868038"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 406,"object": {"id":"912968273"},"parent": {"id":"74357254"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 407,"object": {"id":"124058341"},"parent": {"id":"74357254"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 408,"object": {"id":"608632550"},"parent": {"id":"74357254"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 409,"object": {"id":"511998969"},"parent": {"id":"74357254"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 410,"object": {"id":"769412564"},"parent": {"id":"74357254"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 411,"object": {"id":"396844641"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"2477936"},{"id":"1057656020"},{"id":"897063006"}]},"parent": {"id":"61728953"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 412,"object": {"id":"2477936"},"parent": {"id":"396844641"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 413,"object": {"id":"1057656020"},"parent": {"id":"396844641"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 414,"object": {"id":"897063006"},"parent": {"id":"396844641"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 415,"object": {"id":"281415442"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"163285378"},{"id":"99033700"},{"id":"252389237"},{"id":"394403650"}]},"parent": {"id":"814601473"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 416,"object": {"id":"163285378"},"parent": {"id":"281415442"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 417,"object": {"id":"99033700"},"parent": {"id":"281415442"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 418,"object": {"id":"252389237"},"parent": {"id":"281415442"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 419,"object": {"id":"394403650"},"parent": {"id":"281415442"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 711,"object": {"id":"725688984"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"701759256"}]},"parent": {"id":"649796088"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 712,"object": {"id":"701759256"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"521487141"},{"id":"668936019"},{"id":"383018193"},{"id":"984623395"},{"id":"656529582"},{"id":"1032676691"},{"id":"808171693"},{"id":"919614590"},{"id":"538907583"},{"id":"189573236"},{"id":"345821971"},{"id":"904504334"},{"id":"733935158"},{"id":"146086820"},{"id":"14778224"}]},"parent": {"id":"725688984"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 713,"object": {"id":"521487141"},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 714,"object": {"id":"668936019"},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 715,"object": {"id":"383018193"},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 716,"object": {"id":"984623395"},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 717,"object": {"id":"656529582"},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 718,"object": {"id":"1032676691"},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 719,"object": {"id":"808171693"},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 720,"object": {"id":"919614590"},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 721,"object": {"id":"538907583"},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 722,"object": {"id":"189573236"},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 723,"object": {"id":"345821971"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"907032324"}]},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 724,"object": {"id":"904504334"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"752506228"}]},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 725,"object": {"id":"733935158"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"598912068"}]},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 726,"object": {"id":"146086820"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"139936407"}]},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 727,"object": {"id":"14778224"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"667491561"}]},"parent": {"id":"701759256"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 738,"object": {"id":"667491561"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"874008672"},{"id":"464437401"}]},"parent": {"id":"14778224"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 739,"object": {"id":"874008672"},"parent": {"id":"667491561"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 740,"object": {"id":"464437401"},"parent": {"id":"667491561"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 741,"object": {"id":"139936407"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"765834084"},{"id":"287915663"},{"id":"473368487"}]},"parent": {"id":"146086820"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 742,"object": {"id":"765834084"},"parent": {"id":"139936407"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 743,"object": {"id":"287915663"},"parent": {"id":"139936407"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 744,"object": {"id":"473368487"},"parent": {"id":"139936407"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 745,"object": {"id":"598912068"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"48614235"},{"id":"671306806"},{"id":"486300146"},{"id":"209508969"},{"id":"744245411"},{"id":"297725902"},{"id":"693876809"},{"id":"166923016"}]},"parent": {"id":"733935158"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 746,"object": {"id":"48614235"},"parent": {"id":"598912068"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 747,"object": {"id":"671306806"},"parent": {"id":"598912068"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 748,"object": {"id":"486300146"},"parent": {"id":"598912068"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 749,"object": {"id":"209508969"},"parent": {"id":"598912068"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 750,"object": {"id":"744245411"},"parent": {"id":"598912068"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 751,"object": {"id":"297725902"},"parent": {"id":"598912068"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 752,"object": {"id":"693876809"},"parent": {"id":"598912068"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 753,"object": {"id":"166923016"},"parent": {"id":"598912068"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 754,"object": {"id":"752506228"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"184017712"},{"id":"21600483"},{"id":"601403410"},{"id":"553169338"},{"id":"544362921"},{"id":"801119463"}]},"parent": {"id":"904504334"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 755,"object": {"id":"184017712"},"parent": {"id":"752506228"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 756,"object": {"id":"21600483"},"parent": {"id":"752506228"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 757,"object": {"id":"601403410"},"parent": {"id":"752506228"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 758,"object": {"id":"553169338"},"parent": {"id":"752506228"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 759,"object": {"id":"544362921"},"parent": {"id":"752506228"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 760,"object": {"id":"801119463"},"parent": {"id":"752506228"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 761,"object": {"id":"907032324"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"500637754"},{"id":"710145723"},{"id":"226219456"},{"id":"56753965"},{"id":"712516604"}]},"parent": {"id":"345821971"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 762,"object": {"id":"500637754"},"parent": {"id":"907032324"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 763,"object": {"id":"710145723"},"parent": {"id":"907032324"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 764,"object": {"id":"226219456"},"parent": {"id":"907032324"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 765,"object": {"id":"56753965"},"parent": {"id":"907032324"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 766,"object": {"id":"712516604"},"parent": {"id":"907032324"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 803,"object": {"id":"635731648"},"parent": {"id":"51834583"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 804,"object": {"id":"33153243"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"567534941"}]},"parent": {"id":"51834583"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 805,"object": {"id":"567534941"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"656229200"},{"id":"961428743"},{"id":"8729794"},{"id":"849793043"},{"id":"108064627"},{"id":"135978321"},{"id":"64914340"},{"id":"564889422"},{"id":"3001327"}]},"parent": {"id":"33153243"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 806,"object": {"id":"656229200"},"parent": {"id":"567534941"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 807,"object": {"id":"961428743"},"parent": {"id":"567534941"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 808,"object": {"id":"8729794"},"parent": {"id":"567534941"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 809,"object": {"id":"849793043"},"parent": {"id":"567534941"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 810,"object": {"id":"108064627"},"parent": {"id":"567534941"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 811,"object": {"id":"135978321"},"parent": {"id":"567534941"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 812,"object": {"id":"64914340"},"parent": {"id":"567534941"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 813,"object": {"id":"564889422"},"parent": {"id":"567534941"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 814,"object": {"id":"3001327"},"parent": {"id":"567534941"}}}]}}},"flattenedProperties": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"class": "NSArray","id": "", "objects":["-3.IBPluginDependency","103.IBPluginDependency","103.ImportedFromIB2","106.IBEditorWindowLastContentRect","106.IBPluginDependency","106.ImportedFromIB2","106.editorWindowContentRectSynchronizationRect","111.IBPluginDependency","111.ImportedFromIB2","112.IBPluginDependency","112.ImportedFromIB2","124.IBPluginDependency","124.ImportedFromIB2","125.IBEditorWindowLastContentRect","125.IBPluginDependency","125.ImportedFromIB2","125.editorWindowContentRectSynchronizationRect","126.IBPluginDependency","126.ImportedFromIB2","129.IBPluginDependency","129.ImportedFromIB2","130.IBEditorWindowLastContentRect","130.IBPluginDependency","130.ImportedFromIB2","130.editorWindowContentRectSynchronizationRect","131.IBPluginDependency","131.ImportedFromIB2","134.IBPluginDependency","134.ImportedFromIB2","136.IBPluginDependency","136.ImportedFromIB2","143.IBPluginDependency","143.ImportedFromIB2","144.IBPluginDependency","144.ImportedFromIB2","145.IBPluginDependency","145.ImportedFromIB2","149.IBPluginDependency","149.ImportedFromIB2","150.IBPluginDependency","150.ImportedFromIB2","19.IBPluginDependency","19.ImportedFromIB2","23.IBPluginDependency","23.ImportedFromIB2","236.IBPluginDependency","236.ImportedFromIB2","239.IBPluginDependency","239.ImportedFromIB2","24.IBEditorWindowLastContentRect","24.IBPluginDependency","24.ImportedFromIB2","24.editorWindowContentRectSynchronizationRect","29.IBEditorWindowLastContentRect","29.IBPluginDependency","29.ImportedFromIB2","29.WindowOrigin","29.editorWindowContentRectSynchronizationRect","295.IBPluginDependency","296.IBEditorWindowLastContentRect","296.IBPluginDependency","296.editorWindowContentRectSynchronizationRect","297.IBPluginDependency","298.IBPluginDependency","367.IBEditorWindowLastContentRect","367.IBPluginDependency","367.IBWindowTemplateEditedContentRect","367.NSWindowTemplate.visibleAtLaunch","367.editorWindowContentRectSynchronizationRect","367.windowTemplate.maxSize","368.IBPluginDependency","375.IBPluginDependency","376.IBEditorWindowLastContentRect","376.IBPluginDependency","377.IBPluginDependency","378.IBPluginDependency","379.IBEditorWindowLastContentRect","379.IBPluginDependency","380.IBPluginDependency","381.IBPluginDependency","382.IBPluginDependency","383.IBPluginDependency","384.IBPluginDependency","385.IBPluginDependency","386.IBPluginDependency","387.IBPluginDependency","388.IBPluginDependency","389.IBPluginDependency","390.IBPluginDependency","391.IBPluginDependency","392.IBPluginDependency","393.IBPluginDependency","394.IBPluginDependency","395.IBPluginDependency","396.IBPluginDependency","397.IBPluginDependency","398.IBPluginDependency","399.IBPluginDependency","400.IBPluginDependency","401.IBPluginDependency","402.IBPluginDependency","403.IBPluginDependency","404.IBPluginDependency","405.IBPluginDependency","406.IBPluginDependency","407.IBPluginDependency","408.IBPluginDependency","409.IBPluginDependency","410.IBPluginDependency","411.IBPluginDependency","412.IBPluginDependency","413.IBPluginDependency","414.IBPluginDependency","415.IBPluginDependency","416.IBPluginDependency","417.IBPluginDependency","418.IBPluginDependency","419.IBPluginDependency","5.IBPluginDependency","5.ImportedFromIB2","56.IBPluginDependency","56.ImportedFromIB2","57.IBEditorWindowLastContentRect","57.IBPluginDependency","57.ImportedFromIB2","57.editorWindowContentRectSynchronizationRect","58.IBPluginDependency","58.ImportedFromIB2","711.IBPluginDependency","712.IBEditorWindowLastContentRect","712.IBPluginDependency","713.IBPluginDependency","714.IBPluginDependency","715.IBPluginDependency","716.IBPluginDependency","717.IBPluginDependency","718.IBPluginDependency","719.IBPluginDependency","72.IBPluginDependency","72.ImportedFromIB2","720.IBPluginDependency","721.IBPluginDependency","722.IBPluginDependency","723.IBPluginDependency","724.IBPluginDependency","725.IBPluginDependency","726.IBPluginDependency","727.IBPluginDependency","73.IBPluginDependency","73.ImportedFromIB2","738.IBPluginDependency","739.IBPluginDependency","74.IBPluginDependency","74.ImportedFromIB2","740.IBPluginDependency","741.IBEditorWindowLastContentRect","741.IBPluginDependency","742.IBPluginDependency","743.IBPluginDependency","744.IBPluginDependency","745.IBEditorWindowLastContentRect","745.IBPluginDependency","746.IBPluginDependency","747.IBPluginDependency","748.IBPluginDependency","749.IBPluginDependency","75.IBPluginDependency","75.ImportedFromIB2","750.IBPluginDependency","751.IBPluginDependency","752.IBPluginDependency","753.IBPluginDependency","754.IBPluginDependency","755.IBPluginDependency","756.IBPluginDependency","757.IBPluginDependency","758.IBPluginDependency","759.IBPluginDependency","760.IBPluginDependency","761.IBPluginDependency","762.IBPluginDependency","763.IBPluginDependency","764.IBPluginDependency","765.IBPluginDependency","766.IBPluginDependency","77.IBPluginDependency","77.ImportedFromIB2","78.IBPluginDependency","78.ImportedFromIB2","79.IBPluginDependency","79.ImportedFromIB2","80.IBPluginDependency","80.ImportedFromIB2","803.IBPluginDependency","804.IBPluginDependency","805.IBEditorWindowLastContentRect","805.IBPluginDependency","806.IBPluginDependency","807.IBPluginDependency","808.IBPluginDependency","809.IBPluginDependency","81.IBEditorWindowLastContentRect","81.IBPluginDependency","81.ImportedFromIB2","81.editorWindowContentRectSynchronizationRect","810.IBPluginDependency","811.IBPluginDependency","812.IBPluginDependency","813.IBPluginDependency","814.IBPluginDependency","82.IBPluginDependency","82.ImportedFromIB2","83.IBPluginDependency","83.ImportedFromIB2","92.IBPluginDependency","92.ImportedFromIB2"]},"dict.values": {"class": "NSMutableArray","id": "", "objects":["com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{739, 722}, {213, 23}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{596, 852}, {216, 23}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"{{617, 609}, {132, 23}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{522, 812}, {146, 23}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"{{531, 606}, {64, 6}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{436, 809}, {64, 6}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"{{447, 673}, {197, 73}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{525, 802}, {197, 73}}","{{309, 1136}, {478, 20}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{74, 862}","{{11, 977}, {478, 20}}","com.apple.InterfaceBuilder.CocoaPlugin","{{397, 703}, {234, 43}}","com.apple.InterfaceBuilder.CocoaPlugin","{{475, 832}, {234, 43}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{307, 836}, {480, 270}}","com.apple.InterfaceBuilder.CocoaPlugin","{{307, 836}, {480, 270}}",1,"{{11, 666}, {480, 270}}","{3.40282e+38, 3.40282e+38}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{552, 702}, {83, 43}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{635, 542}, {204, 183}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"{{334, 562}, {242, 183}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{23, 794}, {245, 183}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin","{{508, 462}, {254, 283}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin","{{762, 442}, {170, 63}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{762, 372}, {182, 153}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{839, 462}, {164, 173}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{466, 542}, {196, 203}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{323, 672}, {199, 203}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1]}}},"unlocalizedProperties": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"id":"0"},"dict.values": {"class": "NSMutableArray","id": "", "objects":[]}}},"activeLocalization": {"nil":""},"localizations": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"id":"0"},"dict.values": {"class": "NSMutableArray","id": "", "objects":[]}}},"sourceID": {"nil":""},"maxID": 820}},"IBDocument.Classes": {"class": "IBClassDescriber","id": "", "objects":{}},"IBDocument.localizationMode": 0,"IBDocument.PluginDeclaredDevelopmentDependencies": {"class": "NSMutableDictionary","id": "", "objects":{"NS.key.0": "com.apple.InterfaceBuilder.CocoaPlugin.InterfaceBuilder3","NS.object.0": 3000}},"IBDocument.PluginDeclaredDependenciesTrackSystemTargetVersion": true,"IBDocument.LastKnownRelativeProjectPath": {"nil":""},"IBDocument.defaultPropertyAccessControl": 3}}};