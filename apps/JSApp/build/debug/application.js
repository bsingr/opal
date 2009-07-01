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
        
        if (theObject['class'] == "NSCustomObject") {
            newObject.init();
        }
        else {
            this._contextStack.addObject(theObject['objects']);
            console.log('initing ' + theObject['class']);
            newObject.initWithCoder(this);
            this._contextStack.removeLastObject();
        }
        
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

NSObject.extend({
    
    valueForKey: function(key) {
        
    },
    
    setValueForKey: function(value, key) {
        
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
        
    },
    
    setValueForUndefinedKey: function(value, key) {
        
    },
    
    setNilValueForKey: function(key) {
        
    },
    
    dictionaryWithValuesForKeys: function(keys) {
        
    },
    
    setValuesForKeysWithDictionary: function(keyedValues) {
        
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
// void CGContextFillPath(CGContextRef c)
// {
//     
// }
// 
// void CGContextEOFillPath(CGContextRef c)
// {
//     
// }
// 
// void CGContextStrokePath(CGContextRef c)
// {
//     
// }
// 
function CGContextFillRect(c, rect)
{
    c.fillRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
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
function CGContextSetShadowWithColor(context, offset, blur, color)
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
// void CGContextRGBAStringFromColor(CGColorRef color)
// {
//     return "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
// }
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
// // function CGContextSetStrokeColorWithColor(c, color)
// // {
// //     c.strokeStyle = "rgba(" + parseInt(color._red * 255) + ","  + parseInt(color._green * 255) + ","  + parseInt(color._blue * 255) + ","  + color._alpha + ")";
// // }
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
    return false;
}    

NSEvent.mouseEventWithType = function(type, location, modifierFlags, timestamp, windowNumber, context, eventNumber, clickCount, pressure)
{
    var theEvent = NSEvent.create();
    theEvent._type = type;
    theEvent._location = location;
    theEvent._modifierFlags = modifierFlags;
    theEvent_timestamp = timestamp;
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
    
    initWithGraphicsPort: function(graphicsPort, initialFlippedState) {
        this._graphicsPort = graphicsPort;
        return this;
    },
    
    graphicsPort: function() {
        return this._graphicsPort;
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
    }
});


// + (NSGraphicsContext *)currentContext
// {
//     return NSGraphicsContextCurrent;
// }
// 
// + (void)setCurrentContext:(NSGraphicsContext *)context
// {
//     NSGraphicsContextCurrent = context;
// }
// 
// + (void)saveGraphicsState {
//     CGContextRef ctx = [[NSGraphicsContext currentContext] graphicsPort];
//  CGContextSaveGState(ctx);
// }
// 
// + (void)restoreGraphicsState {
//     CGContextRef ctx = [[NSGraphicsContext currentContext] graphicsPort];
//     CGContextRestoreGState(ctx);
// }
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
var NSMainMenuWindowLevel               = 10;
var NSStatusWindowLevel                 = 10;
var NSModalPanelWindowLevel             = 10;
var NSPopUpMenuWindowLevel              = 10;
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

    _eventBindingCurrentX: null,
    _eventBindingCurrentY: null,

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
        this.makeMainWindow();
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
        CGDOMElementSetFrame(this._DOMContainer, this._frame);
        CGDOMElementSetFrame(this._DOMGraphicsContext, this.bounds());
        this.setNeedsDisplay(true);
    },
    
    setContentSize: function(aSize) {
        
    },
    
    setFrameOrigin: function(aPoint) {
        
    },
    
    frame: function() {
        return this._frame;
    },
    
    bounds: function() {
        return NSMakeRect(0, 0, this._frame.size.width, this._frame.size.height);
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
        
    },
    
    level: function() {
        
    },
    
    screen: function() {
        
    },
    
    setHasShadow: function(hasShadow) {
        
    },
    
    hasShadow: function() {
        
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
    
    init: function() {
        // this._super();
        return this;
    },
    
    setDelegate: function(anObject) {
        
    },
    
    delegate: function() {
        
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
    },
   
    postEvent: function(theEvent, atStart) {
        
    },
    
    currentEvent: function() {
        return this._currentEvent;
    },
    
    sendEvent: function(theEvent) {
        this._currentEvent = theEvent;
        
        if (theEvent.window())
            theEvent.window().sendEvent(theEvent);
        else
            console.log('dropping event, as no window');
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
        
    },
    
    mainMenu: function() {
        
    },
    
    setApplicationIconImage: function(image) {
        
    },
    
    applicationIconImage: function() {
        
    },
    
    sendAction: function(theAction, theTarget, sender) {
        
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
    NSBundle.loadNibNamed("MainMenu", principalClass.sharedApplication());
	AppController.create();
	principalClass.sharedApplication().run();
	return 0;
}
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
        
    },
    
    setFont: function(fontObj) {
        
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
        
    },
    
    setDoubleValue: function(aDouble) {
        
        this._value = aDouble;
    },
    
    takeIntValueFrom: function(sender) {
        
    },
    
    takeFloatValueFrom: function(sender) {
        
    },
    
    takeDoubleValueFrom: function(sender) {
        
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

    drawInteriorWithFrameInView: function(cellFrame, controlView) {
        
    },
    
    drawWithFrameInView: function(cellFrame, controlView) {
        
        this.drawInteriorWithFrameInView(cellFrame, controlView);
    },
    
    highlightInView: function(flag, cellFrame, controlView) {
        
        if (this.isHighlighted() != flag) {
            this.setHighlighted(flag);
            this.drawWithFrameInView(cellFrame, controlView);
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
            this.drawWithFrameInView(cellFrame, controlView);
            controlView.unlockFocus();
            return false;
        }
        
        this.highlightInView(true, controlView.bounds(), controlView);
        controlView.unlockFocus();
        
        // for each further event...
        NSApplication.sharedApplication().nextEventMatchingMask((NSLeftMouseUpMask | NSMouseMovedMask), function(object, theEvent) {
            controlView.lockFocus();
            
            var location = controlView.convertPointFromView(theEvent.locationInWindow(), null);
            
            if (flag) {
                if (theEvent.type() == NSLeftMouseUp) {
                    this.stopTrackingInView(theEvent.locationInWindow(), theEvent.locationInWindow(), controlView, true);
                    NSApplication.sharedApplication().discardEventsMatchingMaskRequest();
                    
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
                        NSApplication.sharedApplication().discardEventsMatchingMaskRequest();
                }
            }
            else if (NSPointInRect(location, cellFrame)) {
                NSLog("Got here, in frame");
            }
            else {
                NSLog("moved out of frame");
                this.stopTrackingInView(theEvent.locationInWindow(), theEvent.locationInWindow(), controlView, false);
                NSApplication.sharedApplication().discardEventsMatchingMaskRequest();
            }
            
            this.drawWithFrameInView(cellFrame, controlView);
            controlView.unlockFocus();
        });
    },
    
    editWithFrameInView: function(aRect, controlView, textObj, anObject, theEvent) {
        
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
    
    setAction: function(aSelector) {
        
        this._cell.setAction(aSelector);
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
            this._cell.drawWithFrameInView(this.bounds(), this);
    },
    
    /**
        DOM based rendering.
    */
    renderRect: function(rect) {
        if (this._cell)
            this._cell.renderWithFrameInView(this.bounds(), this);
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
    
    drawWithFrameInView: function(cellFrame, controlView) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextClearRect(c, cellFrame);
        
        this.drawBezelWithFrameInView(cellFrame, controlView);
        this.drawInteriorWithFrameInView(cellFrame, controlView);
        this.drawTitleWithFrameInView(this._value, cellFrame, controlView);
    },
    
    drawInteriorWithFrameInView: function(cellFrame, controlView) {
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
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSaveGState(c);
        
        if (this._isEnabled) {
            CGContextSetFillColor(c, [0.204, 0.204, 0.204, 1.0]);

            // CGContextSetShadowWithColor(c, CGSizeMake(1,1), 1, CGColorCreateGenericRGB(1,1,1,1));

            var theFont = CGFontCreate("Arial", 12, false);
            CGContextSetFont(c, theFont);
            CGContextShowTextAtPoint(c, 20, ((rect.size.height + 12) / 2) - 1, title, 14);
        }
        else {
            CGContextSetFillColor(c, [0.704, 0.704, 0.704, 1.0]);
            // CGContextSetShadowWithColor(c, CGSizeMake(1,1), 1, CGColorCreateGenericRGB(1,1,1,1));

            var theFont = CGFontCreate("Arial", 12, NO);
            CGContextSetFont(c, theFont);
            // 12 being the size of the text, although this could change
            CGContextShowTextAtPoint(c, 20, ((rect.size.height + 12) / 2) - 1, title, 14);
        }
        
        CGContextRestoreGState(c);
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
    }
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
        // console.log(this._topLevelObjects);
        return true;
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
	return theNib.instantiateNibWithOwner(owner, []);
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
        return self;
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
   
   drawWithFrameInView: function(cellFrame, controlView) {
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
   
   continueTrackingAtInView: function(lastPoint, currentPoint, controlView) {
       var SLIDER_PADDING = 8.5;
       var location = controlView.convertPointFromView(currentPoint, null);
       this.setDoubleValue(((location.x - SLIDER_PADDING) / (controlView.bounds().size.width - (2 * SLIDER_PADDING))) * (this._maxValue - this._minValue));
       this.drawFrameInView(controlView.bounds(), controlView);
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

var NSTextFieldCell = NSCell.extend({
    
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
 * AppController.js
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


var AppController = NSObject.extend({
   
   init: function() {
       this._super();
       return this;
   },
   
   doSomething: function(sender) {
       
   },
   
   awakeFromNib: function(sender) {
       console.log("Awoken from nib");
   },
   
   applicationWillFinishLaunching: function() {
       console.log('Application will finish launching');
   },
   
   applicationDidFinishLaunching: function() {
       console.log("Application finished lauchiong");
   }
});
/* 
 * JSApp.js
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


var JSApp = {
    
    CFBundleDevelopmentRegion: "English",
    CFBundleIconFile: "",
    CFBundleIdentifier: "com.yourcompany.JSApp",
    CFBundleName: "JSApp",
    CFBundlePackageType: "APPL",
    NSMainNibFile: "MainMenu",
    NSPrincipalClass: "NSApplication"
};
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
__bootstrap_files["MainMenu.json"] = {"archive":{"data":{"IBDocument.SystemTarget": 1050,"IBDocument.SystemVersion": "10A394","IBDocument.InterfaceBuilderVersion": "731","IBDocument.AppKitVersion": "1027.1","IBDocument.HIToolboxVersion": "430.00","IBDocument.PluginVersions": {"class": "NSMutableDictionary","id": "", "objects":{"NS.key.0": "com.apple.InterfaceBuilder.CocoaPlugin","NS.object.0": "731"}},"IBDocument.EditedObjectIDs": {"class": "NSMutableArray","id": "", "objects":[367]},"IBDocument.PluginDependencies": {"class": "NSArray","id": "", "objects":["com.apple.InterfaceBuilder.CocoaPlugin"]},"IBDocument.Metadata": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"class": "NSArray","id": "0", "objects":[]},"dict.values": {"class": "NSMutableArray","id": "", "objects":[]}}},"IBDocument.RootObjects": {"class": "NSMutableArray","id": "1048", "objects":[{"class": "NSCustomObject","id": "1021", "objects":{"NSClassName": "NSApplication"}},{"class": "NSCustomObject","id": "1014", "objects":{"NSClassName": "FirstResponder"}},{"class": "NSCustomObject","id": "1050", "objects":{"NSClassName": "NSApplication"}},{"class": "NSCustomObject","id": "163992474", "objects":{"NSClassName": "NSFontManager"}},{"class": "NSWindowTemplate","id": "513744381", "objects":{"NSWindowStyleMask": 15,"NSWindowBacking": 2,"NSWindowRect": "{{133, 47}, {946, 613}}","NSWTFlags": 603979776,"NSWindowTitle": "Window","NSWindowClass": "NSWindow","NSViewClass": {"nil":""},"NSWindowContentMaxSize": "{1.79769e+308, 1.79769e+308}","NSWindowView": {"class": "NSView","id": "414427165", "objects":{"NSNextResponder": {"id":""},"NSvFlags": 256,"NSSubviews": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSButton","id": "807627904", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{554, 422}, {118, 25}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "281914322", "objects":{"NSCellFlags": -2080244224,"NSCellFlags2": 134217728,"NSContents": "Round Textured","NSSupport": {"class": "NSFont","id": "798430573", "objects":{"NSName": "LucidaGrande","NSSize": 13,"NSfFlags": 1044}},"NSControlView": {"id":"807627904"},"NSButtonFlags": -2038152961,"NSButtonFlags2": 163,"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 400,"NSPeriodicInterval": 75}}}},{"class": "NSButton","id": "947043007", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{554, 391}, {118, 25}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "775301662", "objects":{"NSCellFlags": -1543373312,"NSCellFlags2": 134217728,"NSContents": "This is disabled","NSSupport": {"id":"798430573"},"NSControlView": {"id":"947043007"},"NSButtonFlags": -2038152961,"NSButtonFlags2": 163,"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 400,"NSPeriodicInterval": 75}}}},{"class": "NSSlider","id": "481053202", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{552, 455}, {122, 21}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSSliderCell","id": "228939928", "objects":{"NSCellFlags": -1543373312,"NSCellFlags2": 0,"NSContents": "","NSSupport": {"class": "NSFont","id": "672854075", "objects":{"NSName": "Helvetica","NSSize": 12,"NSfFlags": 16}},"NSControlView": {"id":"481053202"},"NSMaxValue": 100,"NSMinValue": 0.0,"NSValue": 50,"NSAltIncValue": 0.0,"NSNumberOfTickMarks": 0,"NSTickMarkPosition": 1,"NSAllowsTickMarkValuesOnly": false,"NSVertical": false}}}},{"class": "NSSlider","id": "257328319", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{552, 478}, {122, 21}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSSliderCell","id": "829387278", "objects":{"NSCellFlags": -2080244224,"NSCellFlags2": 0,"NSContents": "","NSSupport": {"id":"672854075"},"NSControlView": {"id":"257328319"},"NSMaxValue": 100,"NSMinValue": 0.0,"NSValue": 50,"NSAltIncValue": 0.0,"NSNumberOfTickMarks": 0,"NSTickMarkPosition": 1,"NSAllowsTickMarkValuesOnly": false,"NSVertical": false}}}},{"class": "NSButton","id": "780169108", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{62, 488}, {109, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "146314554", "objects":{"NSCellFlags": 67239424,"NSCellFlags2": 0,"NSContents": "Normal radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"780169108"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"class": "NSCustomResource","id": "904276281", "objects":{"NSClassName": "NSImage","NSResourceName": "NSRadioButton"}},"NSAlternateImage": {"class": "NSButtonImageSource","id": "813970489", "objects":{"NSImageName": "NSRadioButton"}},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "511023663", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{62, 433}, {156, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "388353698", "objects":{"NSCellFlags": -1543373312,"NSCellFlags2": 0,"NSContents": "Disabled Check radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"511023663"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"id":"904276281"},"NSAlternateImage": {"id":"813970489"},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "142462336", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{62, 462}, {177, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "100568012", "objects":{"NSCellFlags": -2080244224,"NSCellFlags2": 0,"NSContents": "Normal unchecked radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"142462336"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"id":"904276281"},"NSAlternateImage": {"id":"813970489"},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "577562334", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{285, 488}, {109, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "671756545", "objects":{"NSCellFlags": -2080244224,"NSCellFlags2": 0,"NSContents": "Normal radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"577562334"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"class": "NSCustomResource","id": "1020590486", "objects":{"NSClassName": "NSImage","NSResourceName": "NSSwitch"}},"NSAlternateImage": {"class": "NSButtonImageSource","id": "849298367", "objects":{"NSImageName": "NSSwitch"}},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "790695465", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{285, 433}, {156, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "561385561", "objects":{"NSCellFlags": -1543373312,"NSCellFlags2": 0,"NSContents": "Disabled Check radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"790695465"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"id":"1020590486"},"NSAlternateImage": {"id":"849298367"},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "561516135", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{285, 462}, {177, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "79065924", "objects":{"NSCellFlags": 67239424,"NSCellFlags2": 0,"NSContents": "Normal unchecked radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"561516135"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"id":"1020590486"},"NSAlternateImage": {"id":"849298367"},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSTextField","id": "744995210", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{708, 478}, {106, 22}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSTextFieldCell","id": "160495813", "objects":{"NSCellFlags": -1804468671,"NSCellFlags2": 272630784,"NSContents": "Textfield","NSSupport": {"id":"798430573"},"NSControlView": {"id":"744995210"},"NSDrawsBackground": true,"NSBackgroundColor": {"class": "NSColor","id": "875495060", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "textBackgroundColor","NSColor": {"class": "NSColor","id": "105080477", "objects":{"NSColorSpace": 3,"NSWhite": "MQA"}}}},"NSTextColor": {"class": "NSColor","id": "91711647", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "textColor","NSColor": {"class": "NSColor","id": "106532192", "objects":{"NSColorSpace": 3,"NSWhite": "MAA"}}}}}}}},{"class": "NSTextField","id": "1037334765", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{708, 446}, {106, 22}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSTextFieldCell","id": "685186056", "objects":{"NSCellFlags": -1267597759,"NSCellFlags2": 272630784,"NSContents": "Disabled","NSSupport": {"id":"798430573"},"NSControlView": {"id":"1037334765"},"NSDrawsBackground": true,"NSBackgroundColor": {"id":"875495060"},"NSTextColor": {"id":"91711647"}}}}},{"class": "NSTextField","id": "669360788", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{713, 421}, {77, 17}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSTextFieldCell","id": "859234033", "objects":{"NSCellFlags": 68288064,"NSCellFlags2": 272630784,"NSContents": "Label","NSSupport": {"id":"798430573"},"NSControlView": {"id":"669360788"},"NSBackgroundColor": {"class": "NSColor","id": "", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "controlColor","NSColor": {"class": "NSColor","id": "516890748", "objects":{"NSColorSpace": 3,"NSWhite": "MC42NjY2NjY2NjY3AA"}}}},"NSTextColor": {"class": "NSColor","id": "", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "controlTextColor","NSColor": {"id":"106532192"}}}}}}},{"class": "NSScrollView","id": "109747700", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 256,"NSSubviews": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSClipView","id": "299732995", "objects":{"NSNextResponder": {"id":"109747700"},"NSvFlags": 2304,"NSSubviews": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSTextView","id": "180873027", "objects":{"NSNextResponder": {"id":"299732995"},"NSvFlags": 2322,"NSDragTypes": {"class": "NSMutableSet","id": "", "objects":{"EncodedWithXMLCoder": true,"set.sortedObjects": {"class": "NSArray","id": "", "objects":["Apple HTML pasteboard type","Apple PDF pasteboard type","Apple PICT pasteboard type","Apple PNG pasteboard type","Apple URL pasteboard type","CorePasteboardFlavorType 0x6D6F6F76","NSColor pasteboard type","NSFilenamesPboardType","NSStringPboardType","NeXT Encapsulated PostScript v1.2 pasteboard type","NeXT RTFD pasteboard type","NeXT Rich Text Format v1.0 pasteboard type","NeXT TIFF v4.0 pasteboard type","NeXT font pasteboard type","NeXT ruler pasteboard type","WebURLsWithTitlesPboardType","public.url"]}}},"NSFrameSize": "{548, 14}","NSSuperview": {"id":"299732995"},"NSTextContainer": {"class": "NSTextContainer","id": "451707708", "objects":{"NSLayoutManager": {"class": "NSLayoutManager","id": "", "objects":{"NSTextStorage": {"class": "NSTextStorage","id": "", "objects":{"NSString": {"class": "NSMutableString","id": "", "objects":{}},"NSDelegate": {"nil":""}}},"NSTextContainers": {"class": "NSMutableArray","id": "", "objects":[{"id":"451707708"}]},"NSLMFlags": 134,"NSDelegate": {"nil":""}}},"NSTextView": {"id":"180873027"},"NSWidth": 548,"NSTCFlags": 1}},"NSSharedData": {"class": "NSTextViewSharedData","id": "", "objects":{"NSFlags": 12263,"NSTextCheckingTypes": 0,"NSMarkedAttributes": {"nil":""},"NSBackgroundColor": {"id":"105080477"},"NSSelectedAttributes": {"class": "NSDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"class": "NSArray","id": "", "objects":["NSBackgroundColor","NSColor"]},"dict.values": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSColor","id": "", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "selectedTextBackgroundColor","NSColor": {"id":"516890748"}}},{"class": "NSColor","id": "", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "selectedTextColor","NSColor": {"id":"106532192"}}}]}}},"NSInsertionColor": {"id":"106532192"},"NSLinkAttributes": {"class": "NSDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"class": "NSArray","id": "", "objects":["NSColor","NSCursor","NSUnderline"]},"dict.values": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSColor","id": "", "objects":{"NSColorSpace": 1,"NSRGB": "MCAwIDEAA"}},{"class": "NSCursor","id": "", "objects":{"NSHotSpot": "{8, -8}","NSCursorType": 13}},1]}}},"NSDefaultParagraphStyle": {"nil":""}}},"NSTVFlags": 6,"NSMaxSize": "{1113, 1e+07}","NSMinize": "{223, 0}","NSDelegate": {"nil":""}}}]},"NSFrame": "{{1, 1}, {548, 264}}","NSSuperview": {"id":"109747700"},"NSNextKeyView": {"id":"180873027"},"NSDocView": {"id":"180873027"},"NSBGColor": {"id":"105080477"},"NSCursor": {"class": "NSCursor","id": "", "objects":{"NSHotSpot": "{4, -5}","NSCursorType": 1}},"NScvFlags": 4}},{"class": "NSScroller","id": "641293589", "objects":{"NSNextResponder": {"id":"109747700"},"NSvFlags": 256,"NSFrame": "{{549, 1}, {15, 264}}","NSSuperview": {"id":"109747700"},"NSTarget": {"id":"109747700"},"NSAction": "_doScroller:","NSCurValue": 1,"NSPercent": 0.85256409645080566}},{"class": "NSScroller","id": "609011989", "objects":{"NSNextResponder": {"id":"109747700"},"NSvFlags": -2147483392,"NSFrame": "{{-100, -100}, {87, 18}}","NSSuperview": {"id":"109747700"},"NSsFlags": 1,"NSTarget": {"id":"109747700"},"NSAction": "_doScroller:","NSCurValue": 1,"NSPercent": 0.94565218687057495}}]},"NSFrame": "{{193, 105}, {565, 266}}","NSSuperview": {"id":"414427165"},"NSNextKeyView": {"id":"299732995"},"NSsFlags": 18,"NSVScroller": {"id":"641293589"},"NSHScroller": {"id":"609011989"},"NSContentView": {"id":"299732995"}}}]},"NSFrameSize": "{946, 613}","NSSuperview": {"id":""}}},"NSScreenRect": "{{0, 0}, {1920, 1178}}","NSMaxSize": "{1.79769e+308, 1.79769e+308}"}}]},"IBDocument.Objects": {"class": "IBObjectContainer","id": "", "objects":{"connectionRecords": {"class": "NSMutableArray","id": "", "objects":[]},"objectRecords": {"class": "IBMutableOrderedSet","id": "", "objects":{"orderedObjects": {"class": "NSArray","id": "", "objects":[{"class": "IBObjectRecord","id": "", "objects":{"objectID": 0,"object": {"id":"0"},"children": {"id":"1048"},"parent": {"nil":""}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": -2,"object": {"id":"1021"},"parent": {"id":"0"},"objectName": "File's Owner"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": -1,"object": {"id":"1014"},"parent": {"id":"0"},"objectName": "First Responder"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": -3,"object": {"id":"1050"},"parent": {"id":"0"},"objectName": "Application"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 367,"object": {"id":"513744381"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"414427165"}]},"parent": {"id":"0"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 368,"object": {"id":"414427165"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"511023663"},{"id":"142462336"},{"id":"780169108"},{"id":"807627904"},{"id":"947043007"},{"id":"481053202"},{"id":"257328319"},{"id":"577562334"},{"id":"561516135"},{"id":"790695465"},{"id":"744995210"},{"id":"1037334765"},{"id":"669360788"},{"id":"109747700"}]},"parent": {"id":"513744381"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 373,"object": {"id":"163992474"},"parent": {"id":"0"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 451,"object": {"id":"807627904"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"281914322"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 452,"object": {"id":"281914322"},"parent": {"id":"807627904"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 453,"object": {"id":"947043007"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"775301662"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 454,"object": {"id":"775301662"},"parent": {"id":"947043007"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 455,"object": {"id":"481053202"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"228939928"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 456,"object": {"id":"228939928"},"parent": {"id":"481053202"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 457,"object": {"id":"257328319"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"829387278"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 458,"object": {"id":"829387278"},"parent": {"id":"257328319"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 463,"object": {"id":"780169108"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"146314554"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 464,"object": {"id":"146314554"},"parent": {"id":"780169108"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 467,"object": {"id":"511023663"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"388353698"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 468,"object": {"id":"388353698"},"parent": {"id":"511023663"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 471,"object": {"id":"142462336"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"100568012"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 472,"object": {"id":"100568012"},"parent": {"id":"142462336"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 473,"object": {"id":"577562334"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"671756545"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 474,"object": {"id":"790695465"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"561385561"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 476,"object": {"id":"561516135"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"79065924"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 477,"object": {"id":"79065924"},"parent": {"id":"561516135"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 479,"object": {"id":"561385561"},"parent": {"id":"790695465"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 480,"object": {"id":"671756545"},"parent": {"id":"577562334"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 501,"object": {"id":"744995210"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"160495813"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 502,"object": {"id":"160495813"},"parent": {"id":"744995210"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 503,"object": {"id":"1037334765"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"685186056"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 504,"object": {"id":"685186056"},"parent": {"id":"1037334765"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 509,"object": {"id":"669360788"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"859234033"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 510,"object": {"id":"859234033"},"parent": {"id":"669360788"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 533,"object": {"id":"109747700"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"641293589"},{"id":"609011989"},{"id":"180873027"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 534,"object": {"id":"641293589"},"parent": {"id":"109747700"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 535,"object": {"id":"609011989"},"parent": {"id":"109747700"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 536,"object": {"id":"180873027"},"parent": {"id":"109747700"}}}]}}},"flattenedProperties": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"class": "NSArray","id": "", "objects":["-1.IBPluginDependency","-2.IBPluginDependency","-3.IBPluginDependency","367.IBEditorWindowLastContentRect","367.IBWindowTemplateEditedContentRect","367.NSWindowTemplate.visibleAtLaunch","367.editorWindowContentRectSynchronizationRect","368.IBPluginDependency","373.IBPluginDependency","451.IBPluginDependency","452.IBPluginDependency","453.IBPluginDependency","454.IBPluginDependency","455.IBPluginDependency","456.IBPluginDependency","457.IBPluginDependency","458.IBPluginDependency","463.IBPluginDependency","464.IBPluginDependency","467.IBPluginDependency","468.IBPluginDependency","471.IBPluginDependency","472.IBPluginDependency","473.IBPluginDependency","474.IBPluginDependency","476.IBPluginDependency","477.IBPluginDependency","479.IBPluginDependency","480.IBPluginDependency","501.IBPluginDependency","502.IBPluginDependency","503.IBPluginDependency","504.IBPluginDependency","509.IBPluginDependency","510.IBPluginDependency","533.IBPluginDependency","534.IBPluginDependency","535.IBPluginDependency","536.IBPluginDependency"]},"dict.values": {"class": "NSMutableArray","id": "", "objects":["com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{133, 47}, {946, 613}}","{{133, 47}, {946, 613}}",1,"{{11, 666}, {480, 270}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin"]}}},"unlocalizedProperties": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"id":"0"},"dict.values": {"class": "NSMutableArray","id": "", "objects":[]}}},"activeLocalization": {"nil":""},"localizations": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"id":"0"},"dict.values": {"class": "NSMutableArray","id": "", "objects":[]}}},"sourceID": {"nil":""},"maxID": 536}},"IBDocument.Classes": {"class": "IBClassDescriber","id": "", "objects":{}},"IBDocument.localizationMode": 0,"IBDocument.PluginDeclaredDependencies": {"class": "NSMutableDictionary","id": "", "objects":{"NS.key.0": "com.apple.InterfaceBuilder.CocoaPlugin.macosx","NS.object.0": 1050}},"IBDocument.PluginDeclaredDevelopmentDependencies": {"class": "NSMutableDictionary","id": "", "objects":{"NS.key.0": "com.apple.InterfaceBuilder.CocoaPlugin.InterfaceBuilder3","NS.object.0": 3000}},"IBDocument.PluginDeclaredDependenciesTrackSystemTargetVersion": true,"IBDocument.LastKnownRelativeProjectPath": {"nil":""},"IBDocument.defaultPropertyAccessControl": 3}}};