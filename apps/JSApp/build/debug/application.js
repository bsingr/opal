/* 
 * display_mode.js
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

var VNGraphicsContextRenderDisplayMode  = 0;
var VNGraphicsContextDrawDisplayMode    = 1;/* 
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
        if (this.respondsTo(aFunctionName))
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

// Fix for IE not having indexOf property.
if (!Array.prototype.indexOf) Array.prototype.indexOf = function(item, i)
{
    i || (i = 0);
    var length = this.length;
    if (i < 0) i = length + i;
    for (; i < length; i++)
        if (this[i] === item) return i;
            return -1;
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


/**
    @class NSAttributedString
    
    NSAttributedString manages a string with associated attributes that apply to
    individual characters, or ranges within the string. This base class provides
    the necessary basics for constructing and manipulating attributes within the
    string. AppKit adds more functionality, including the ability to draw these
    strings with their attributes. For advanced drawing and handling, a subclass
    NSTextStorage is introduced in AppKit that provides the means for the NSText
    drawing system within Vienna.
    
    Attributes are contained within NSDictionary classes that apply to the
    relevant ranges defined. NSAttributedString === NSMutableAttributedString.
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
        return this._string.length;
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
        // this._string = this._string.slice(0, range.location) + withString + this._string.slice(range.location + range.length, )
        this._string = this._string.slice(0, range.location) + withString + this._string.slice(range.location + range.length);
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
        // do nothing....
    },
    
    endEditing: function() {
        // do ntohing/....
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


function NSMakeRange(location, length)
{
    return { location: location, length: length };
}

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
    
    _dispatchTable: null,
    
    init: function() {
        this._super();
        this._dispatchTable = [];
        return this;
    },
    
    addObserver: function(anObserver, notificationSelector, notificationName, notificationSender) {
        var theAttributes = NSDictionary.create();
        theAttributes.setObjectForKey(anObserver, "observer");
        theAttributes.setObjectForKey(notificationSelector, "selector");
        theAttributes.setObjectForKey(notificationName, "name");
        theAttributes.setObjectForKey(notificationSender, "sender");
        theAttributes.setObjectForKey(true, "working");
        this._dispatchTable.addObject(theAttributes);
    },
    
    /**
        Posts the notification called notificationName.
        @param userInfo - Dictionary, but can be null
    */
    postNotificationName: function(notificationName, notificationSender, userInfo) {
        for (var idx = 0; idx < this._dispatchTable.length; idx++) {
            var theObject = this._dispatchTable[idx];
            if (theObject.objectForKey("name") == notificationName)
                theObject.objectForKey("observer").perform(theObject.objectForKey("selector"), notificationSender, userInfo);
        }
    }
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
        console.log(this._destination);
        this._destination.setAction(this._label);
        this._destination.setTarget(this._source);
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
    
    _isZoomed: false,

    _maxSize: null,
    _minSize: null,
    _wtFlags: 0,
    _windowClass: null,


    _DOMContainer: null,         // Usually an "outer div" to hold the graphics context aswell as subviews' containers
    _DOMGraphicsContext: null,   // Rendering context: usually a canvas (exceptions for DOM rendering and VML)
    _graphicsContext: null,      // a cache of the actual graphics context (from canvas, or VML representation).
    
    // used to hold the old frame size for when a window is "unZoomed"
    _oldZoomFrame: null,
    
    DOMContainer: function() {
        return this._DOMContainer;
    },
    
    contentRectForFrameRect: function(frameRect) {
        
        var xOffset = 0, yOffset = 0, wOffset = 0, hOffset = 0;
        
        if (this.hasShadow()) {
            xOffset += 20;
            yOffset += 20;
        }
              
        return NSMakeRect(0 + xOffset, 0 + yOffset, frameRect.size.width, frameRect.size.height);
    },
    
    frameRectForContentRect: function(contentRect) {
        
        var xOffset = 0, yOffset = 0, wOffset = 0, hOffset = 0;
        
        if (this.hasShadow()) {
            xOffset -= 20;
            yOffset -= 20;
            wOffset += 40;
            hOffset += 40;
        }
        
        return NSMakeRect(contentRect.origin.x + xOffset, contentRect.origin.y + yOffset, contentRect.size.width + wOffset, contentRect.size.height + hOffset);
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
        
        this._hasShadow = (aStyle == NSBorderlessWindowMask) ? false : true;
        
        this._level = NSNormalWindowLevel;
        
        this._minSize = NSMakeSize(0.0, 0.0);
        this._maxSize = NSMakeSize(9999.0, 9999.0);
        this._frame = this.frameRectForContentRect(contentRect);
        this._firstResponder = this;
        
        this.setContentView(NSView.create('initWithFrame', NSMakeRect(0, 0, 0, 0)));
        this.setNextResponder(NSApplication.sharedApplication());
        this.setFrame(contentRect, false);
        this.setNeedsDisplay(true);
        
        return this;
    },
    
    mouseDown: function(theEvent) {
        
        if (this.isZoomed())
            return;
        
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
    
    /**
        Receieved from the application when the browser window chnages its
        co-ordinates: likely to result from the user adjusting the window
        size manually. For standard windows, the current default action to
        take is to adjust the window only if the window is currently zoomed.
        
        By being zoomed, the window wants to take up the entire available
        space. Non zoomed windows will not do anything.
        
        In future, it might be a consideration to move non-zoomed windows
        to ensure they stay visible if the window is resized such to hide
        them entirely or perhaps partially.
    */
    applicationDidChangeScreenParameters: function(aNotification) {
        // console.log('main menu got new screen co-ordinates');
        if (this._isZoomed) {
            this.setFrame(NSMakeRect(0, 0, window.innerWidth, window.innerHeight - NSMenu.menuBarHeight()));
        }
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
    
    fieldEditor: function(createFlag, anObject) {
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
        return this._isZoomed;
    },
    
    zoom: function(sender) {
        console.log('zoom window');
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
        this._isZoomed = true;
        this.setFrame(NSMakeRect(0, 0, window.innerWidth, window.innerHeight - NSMenu.menuBarHeight()));
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
	    NSApplication.sharedApplication().setFocusView(this);
	    
		if (!this._graphicsContext)
			this._graphicsContext = NSGraphicsContext.graphicsContextWithGraphicsPort(this._DOMGraphicsContext.getContext('2d'), false);
		
		NSGraphicsContext.setCurrentContext(this._graphicsContext);
		CGContextSaveGState(this._graphicsContext.graphicsPort());
		CGContextClearRect(this._graphicsContext.graphicsPort(), NSMakeRect(0, 0, this._DOMGraphicsContext.width, this._DOMGraphicsContext.height));
	},
	
	unlockFocus: function() {
	    NSApplication.sharedApplication().setFocusView(null);
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
		
		if (this.hasShadow()) {
		    CGContextSetShadowWithColor(c, NSMakeSize(0, 5), 10, NSColor.colorWithCalibratedRGBA(0.0, 0.0, 0.0, 0.694));
		}
		
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
    
    _focusView: null,
    
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
            nc.removeObserver(this._delegate, NSApplicationDidChangeScreenParametersNotification, this);
        }
        
        this._delegate = anObject;
        
        if (this._delegate.respondsTo('applicationWillFinishLaunching'))
            nc.addObserver(this._delegate, 'applicationWillFinishLaunching', NSApplicationWillFinishLaunchingNotification, this);
        
        if (this._delegate.respondsTo('applicationDidFinishLaunching'))
            nc.addObserver(this._delegate, 'applicationDidFinishLaunching', NSApplicationDidFinishLaunchingNotification, this);
            
        if (this._delegate.respondsTo('applicationDidChangeScreenParameters'))
            nc.addObserver(this._delegate, 'applicationDidChangeScreenParameters', NSApplicationDidChangeScreenParametersNotification, this);
    },
    
    delegate: function() {
        return this._delegate;
    },
    
    context: function() {
        
    },
    
    windowWithWindowNumber: function(windowNum) {
        
    },
    
    addWindow: function(aWindow) {
        // Register for screen chnages (if it wants them)
        var defaultCenter = NSNotificationCenter.defaultCenter();
        defaultCenter.addObserver(aWindow, 'applicationDidChangeScreenParameters', NSApplicationDidChangeScreenParametersNotification, this);
        
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
    
    setFocusView: function(aView) {
        this._focusView = aView;
    },
    
    focusView: function() {
        return this._focusView;
    },
    
    mainWindow: function() {
        
    },
    
    keyWindow: function() {
        
    },
    
    isRunning: function() {
        
    },
    
    finishLaunching: function() {
        var defaultCenter = NSNotificationCenter.defaultCenter();
        defaultCenter.postNotificationName(NSApplicationWillFinishLaunchingNotification, this);
        defaultCenter.postNotificationName(NSApplicationDidFinishLaunchingNotification, this);
    },
    
    /**
        Runs the application once all necessary parts are loaded. Event handlers
        are attatched here.
    */
    run: function() {
        document.onmousedown = NSEventFromRawEvent;
        document.onmouseup = NSEventFromRawEvent;
        document.onmousemove = NSEventFromRawEvent;
        
        // On resize, post notification (for app delegate, also windows listen and handle accordingly)
        window.onresize = function() {
            var defaultCenter = NSNotificationCenter.defaultCenter();
            defaultCenter.postNotificationName(NSApplicationDidChangeScreenParametersNotification, this);
        };
        
        this.finishLaunching();
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
        if (!NSApp)
            NSApp = NSApplication.create();
	    
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
        
    setupGraphicsContextDisplay: function() {
        this._DOMContainer = document.createElement('div');
        this._DOMGraphicsContext = document.createElement('canvas');
        
        
        this._DOMContainer.appendChild(this._DOMGraphicsContext);
        
        this._DOMContainer.style.display = "block";
        this._DOMContainer.style.position = "absolute";
        
        this._DOMGraphicsContext.style.display = "block";
        this._DOMGraphicsContext.style.position = "absolute";
    },
    
    /**
        The containing DOM element for the view (usually a div)
    */
    DOMContainer: function() {
        return this._DOMContainer;
    },
    
    init: function() {
        this.setupGraphicsContextDisplay();     
        this._frame = NSMakeRect (0, 0, 0, 0);
        
        return this;
    },
    
    /**
        Initialize with the given frame
    */
    initWithFrame: function(frameRect) {
        
        // this.init();
        
        this._frame = NSMakeRect (0, 0, 0, 0);
        this.setupGraphicsContextDisplay();
        this._subviews = [];
        
        this.setFrame(frameRect);
        return this;
    },
    
    /**
        Initialize with the given coder
    */
    initWithCoder: function(aCoder) {
        
        this.setupGraphicsContextDisplay();
        
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
        
        var vFlags = aCoder.decodeIntForKey("NSvFlags");
        this._autoResizesSubviews = true;
        this._autoResizeMask = vFlags & 0x3F;
        
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
        
        this._window = newWindow;
        
        for (var i = 0; i < this._subviews.length; i++) {
            this._subviews[i].viewWillMoveToWindow(newWindow);
        }
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
        for (var idx = 0; idx < this._subviews.length; idx++)
            this._subviews[idx].resizeWithOldSuperviewSize(oldSize);
    },

    resizeWithOldSuperviewSize: function(oldSize) {
        var superFrame = this._superview.frame();
        var thisFrame = this.frame();
        var originChanged = false, sizeChanged = false;
        
        // x dimensions first
        if (this._autoResizeMask & NSViewMinXMargin) {
            if (this._autoResizeMask & NSViewWidthSizable) {
                if (this._autoResizeMask & NSViewMinXMargin) {
                    thisFrame.origin.x = thisFrame.origin.x + ((superFrame.size.width - oldSize.width) / 3);
                    thisFrame.size.width = thisFrame.size.width + ((superFrame.size.width - oldSize.width) / 3);
                }
                else {
                    thisFrame.origin.x = thisFrame.origin.x + ((superFrame.size.width - oldSize.width) / 3);
                    thisFrame.size.width = thisFrame.size.width + ((superFrame.size.width - oldSize.width) / 3);
                }
                sizeChanged = true;
                originChanged = true;
            }
            else if (this._autoResizeMask & NSViewMaxXMargin) {
                thisFrame.origin.x = thisFrame.origin.x + ((superFrame.size.width - oldSize.width) / 2);
                originChanged = true;
            }
            else {
                thisFrame.origin.x = thisFrame.origin.x + (superFrame.size.width - oldSize.width);
                originChanged = true;
            }
        }
        else if (this._autoResizeMask & NSViewWidthSizable) {
            if (this._autoResizeMask & NSViewMaxXMargin) {
                thisFrame.size.width = thisFrame.size.width + ((superFrame.size.width - oldSize.width) / 2);
            }
            else {
                thisFrame.size.width = thisFrame.size.width + (superFrame.size.width - oldSize.width);
            }
            
            sizeChanged = true;
        }
        
        // now do y dimensions
        if (this._autoResizeMask & NSViewMinYMargin) {
            if (this._autoResizeMask & NSViewHeightSizable) {
                if (this._autoResizeMask & NSViewMinYMargin) {
                    thisFrame.origin.y = thisFrame.origin.y + ((superFrame.size.height - oldSize.height) / 3);
                    thisFrame.size.height = thisFrame.size.height + ((superFrame.size.height - oldSize.height) / 3);
                }
                else {
                    thisFrame.origin.y = thisFrame.origin.y + ((superFrame.size.height - oldSize.height) / 3);
                    thisFrame.size.height = thisFrame.size.height + ((superFrame.size.height - oldSize.height) / 3);
                }
                sizeChanged = true;
                originChanged = true;
            }
            else if (this._autoResizeMask & NSViewMaxYMargin) {
                thisFrame.origin.y = thisFrame.origin.y + ((superFrame.size.height - oldSize.height) / 2);
                originChanged = true;
            }
            else {
                thisFrame.origin.y = thisFrame.origin.y + (superFrame.size.height - oldSize.height);
                originChanged = true;
            }
        }
        else if (this._autoResizeMask & NSViewHeightSizable) {
            if (this._autoResizeMask & NSViewMaxYMargin) {
                thisFrame.size.height = thisFrame.size.height + ((superFrame.size.height - oldSize.height) / 2);
            }
            else {
                thisFrame.size.height = thisFrame.size.height + (superFrame.size.height - oldSize.height);
            }
            
            sizeChanged = true;
        }
        
        if (sizeChanged || originChanged)
            this.setFrame(thisFrame);        
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
        var oldBounds = this.bounds();
        
        this._frame.size = newSize;
        CGDOMElementSetFrame(this._DOMContainer, this._frame);
        CGDOMElementSetFrame(this._DOMGraphicsContext, this.bounds());
        
        if (this._autoResizesSubviews)
            this.resizeSubviewsWithOldSize(oldBounds.size);
            
        this.setNeedsDisplay(true);
    },
    
    setFrame: function(frameRect) {
        var oldBounds = this.bounds();
        
        this._frame = frameRect;
        CGDOMElementSetFrame(this._DOMContainer, this._frame);
        CGDOMElementSetFrame(this._DOMGraphicsContext, this.bounds());
        
        if (this._autoResizesSubviews)
            this.resizeSubviewsWithOldSize(oldBounds.size);
                
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
        // else if (this._window) {
        //     return {
        //         x: aPoint.x - this._window.frame().origin.x,
        //         y: aPoint.y - this._window.frame().origin.y
        //     };
        // }
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
 * application_title_view.js
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


var NSApplicationTitleView = NSView.extend({
    
    _appTitle: null,
    
    initWithFrame: function(frameRect) {
        this._super(frameRect);
        this._appTitle = "Application";
        return this;
    },
    
    requiredSize: function() {
        return NSMakeSize(100, NSMenu.menuBarHeight());
    },
    
    attributedTitle: function() {
        if (!this._appTitle)
            this._appTitle = "";
        
        var attributes = NSDictionary.create();

		// font
            attributes.setObjectForKey(NSFont.applicationTitleFontOfSize(14), NSFontAttributeName);

		// textColor
        // if (this.isEnabled()) {
        //  if (this.textColor())
        //      attributes.setObjectForKey(this.textColor(), NSForegroundColorAttributeName);
        // }
        // else {
			attributes.setObjectForKey(NSColor.colorWithCalibratedRGBA(0.8, 0.8, 0.8, 1.0), NSForegroundColorAttributeName);
        // }

		return NSAttributedString.create('initWithStringAndAttributes', this._appTitle, attributes);
    },
    
    drawRect: function(aRect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSetShadowWithColor(c, NSMakeSize(1, 1), 0, NSColor.colorWithCalibratedRGBA(0.204, 0.204, 0.204, 0.8));
        this.attributedTitle().drawWithRectAndOptions(aRect, null);
    }
});
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
    
    _lineBreakMode: null,
    _wraps: null,
    
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
        
        this._lineBreakMode = (flags & 0x00007000) >> 12;
        this._wraps = (flags & 0x40) ? false : true;
        
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
        return this._alignment;
    },
    
    setAlignment: function(mode) {
        this._alignment = mode;
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
        this._value = obj;
    },
    
    hasValidObjectValue: function() {
        
    },
    
    stringValue: function() {
        return this._value;
    },
    
    setStringValue: function(aString) {
        this._value = aString;
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
    
    setUpFieldEditorAttributes: function(textObj) {
        textObj.setAlignment(this.alignment());
        textObj.setString(this.stringValue());
        textObj.setSelectable(this.isSelectable());
        textObj.setEditable(this.isEditable());
        textObj.setFont(this.font());
        
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
    
    renderWithFrame: function(cellFrame, controlView) {
        this.renderInteriorWithFrame(cellFrame, controlView);
    },
    
    renderInteriorWithFrame: function(cellFrame, controlView) {
        
    },
    
    displayWithFrame: function(cellFrame, controlView) {
        
    },
    
    displayInteriorWithFrame: function(cellFrame, controlView) {
        
    },
    
    highlightInView: function(flag, cellFrame, controlView) {
        
        if (this.isHighlighted() != flag) {
            this.setHighlighted(flag);
            this.displayWithFrame(cellFrame, controlView);
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
        
        if (!(this.startTrackingInView(theEvent.locationInWindow(), controlView))) {
            this.drawWithFrame(cellFrame, controlView);
            controlView.unlockFocus();
            return false;
        }
        
        this.highlightInView(true, controlView.bounds(), controlView);
        controlView.unlockFocus();
        NSApplication.sharedApplication().sendAction(this._action, this._target, this);
        
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
                console.log("Got here, in frame");
            }
            else {
                console.log("moved out of frame");
                this.stopTrackingInView(theEvent.locationInWindow(), theEvent.locationInWindow(), controlView, false);
                NSApplication.sharedApplication().unbindEvents();
            }
            
            this.drawWithFrame(cellFrame, controlView);
            controlView.unlockFocus();
            
            NSApplication.sharedApplication().sendAction(this._action, this._target, this);
        });
    },
    
    editWithFrame: function(aRect, controlView, textObj, anObject, theEvent) {
        
        if (!this.isEditable() && !this.isSelectable())
            return;
        
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
        this._lineBreakMode = mode;
    },
    
    lineBreakMode: function() {
        return this._lineBreakMode;
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
                this.drawImageWithFrameInView(this._alternateImage, this.imageRectForBounds(cellFrame), controlView);
            else
                this.drawImageWithFrameInView(this._image, this.imageRectForBounds(cellFrame), controlView);
        }
    },
    
    drawImageWithFrameInView: function(image, frame, controlView) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSaveGState(c);
        
        if (!this._isEnabled)
            CGContextSetAlpha(c, 0.8);
        
        // CGContextDrawImage(c, frame, image);
        image.drawInRect(frame);
        CGContextRestoreGState(c);
    },

    drawTitleWithFrameInView: function(title, rect, controlView) {
        // var c = NSGraphicsContext.currentContext().graphicsPort();
        this.attributedStringValue().drawWithRectAndOptions(rect, null);
        // CGContextFillRect(c, rect);
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
        
        var xImageOffset = theRect.origin.x + 2;
        
        if (this._image) {
            xImageOffset += this._image.width + 3;
        }
        
        
        return NSMakeRect(xImageOffset,
                            theRect.origin.y + 2,
                            theRect.size.width - 4,
                            theRect.size.height - 4);
    },
    
    imageRectForBounds: function(theRect) {
        var theHeight = 0, theWidth = 0;
        
        if (this._image) {
            return NSMakeRect(2, (theRect.size.height - this._image.height) / 2, this._image.width, this._image.height);
        }
        
        return NSMakeRect(0, 0, 0, 0);
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
		
        // paragraph style
        var paragraphStyle = NSParagraphStyle.defaultParagraphStyle();
        paragraphStyle.setAlignment(this.alignment());
        
        attributes.setObjectForKey(paragraphStyle, NSParagraphStyleAttributeName);
		
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
var NSImage = NSObject.extend({
    
    _image: null,
    
    initByReferencingFile: function(fileName) {
        this._image = new Image();
        this._image.src = fileName;
        return this;
    },
    
    drawInRect: function(theRect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextDrawImage(c, theRect, this._image);
    },
    
    size: function() {
        return NSMakeSize(this._image.width, this._image.height);
    }
});

NSImage.imageNamed = function(anImage) {
    return NSImage.create('initByReferencingFile', 'resources/' + anImage);
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
		var theColor =  NSColor.create();
		theColor._red = white;
		theColor._green = white;
		theColor._blue = white;
		theColor._alpha = alpha;
		return theColor;
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
	
	gridColor: function() {
	    return NSColor.colorWithCalibratedRGBA(0.902, 0.902, 0.902, 1.0);
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
		return NSColor.controlTextColor();
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
		return NSColor.colorWithCalibratedRGBA(0.8, 0.8, 0.8, 1.0);
	},
	
	selectedTextBackgroundColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.710, 0.835, 1.0, 1.0);
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
		return [NSColor.colorWithCalibratedRGBA(0.953, 0.953, 0.953, 1.0), 
				NSColor.whiteColor()];
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
 * corner_view.js
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


var _NSCornerView = NSView.extend({
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
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
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        return this;
    }
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
    
    applicationTitleFontOfSize: function(fontSize) {
        var theFont = NSFont.fontWithNameAndSize("Arial", fontSize);
        theFont._isBold = true;
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
    
    init: function() {
        this._textContainers = [];
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
    },
    
    addTextContainer: function(aContainer) {
        this._textContainers.push(aContainer);
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
    
    _applicationTitleView: null,
    
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
        
        // menu title
        this._applicationTitleView = NSApplicationTitleView.create('initWithFrame', NSMakeRect(0, 0, 0, 0));
        this._DOMContainer.appendChild(this._applicationTitleView.DOMContainer());
        
        this.setNextResponder(NSApplication.sharedApplication());
        
        this.setLevel(NSMainMenuWindowLevel);
        
        this.tile();
        
        return this;
    },
    
    applicationDidChangeScreenParameters: function(aNotification) {
        // console.log('main menu got new screen co-ordinates');
        this.tile();
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
    
    contentRectForFrameRect: function(frameRect) {
        return NSMakeRect(0, 0, frameRect.size.width, frameRect.size.height);
    },
    
    frameRectForContentRect: function(contentRect) {
        return NSMakeRect(contentRect.origin.x, contentRect.origin.y, contentRect.size.width, contentRect.size.height);
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
        
        // application title view
        this._applicationTitleView.setFrame(NSMakeRect(frameRect.size.width / 2, 0, 100, 38));
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
		
        // mask
        var theKeyEquiv = "";
        var modMask = this.keyEquivalentModifierMask();
        if (modMask & NSShiftKeyMask)
		    theKeyEquiv = theKeyEquiv + "⇑";
		
		theKeyEquiv = theKeyEquiv + this._keyEquivalent.toUpperCase()
		
		return NSAttributedString.create('initWithStringAndAttributes', theKeyEquiv, attributes);
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
                            theRect.origin.y + ((theRect.size.height - textSize.height) / 2) + 2,
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
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSaveGState(c)
        if (this._menuView.isHorizontal() && !this._menuItem.isHighlighted()) {
            CGContextSetShadowWithColor(c, NSMakeSize(1, 1), 0, NSColor.colorWithCalibratedRGBA(0.204, 0.204, 0.204, 0.8));
        }
        
        this._menuItem.attributedTitle().drawWithRectAndOptions(cellFrame, null);
        CGContextRestoreGState(c);
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
        CGContextSetFillColorWithColor(c, NSColor.colorWithCalibratedRGBA(0.1, 0.1, 0.1, 0.9));
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
        CGContextSetFillColorWithColor(c, NSColor.colorWithCalibratedRGBA(0.25, 0.25, 0.25, 0.9));
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
    
    init: function() {
        
        this._lineSpacing = 10;
        this._alignment = NSLeftTextAlignment;
        
        return this;
    },
    
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
        this._alignment = alignment;
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
        this._lineBreakMode = mode;
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
    
    // hitTest: function() {
        // return null;
    // },
    
    documentVisibleRect: function() {
        
    },
    
    contentSize: function() {
        
    },
    
    setDocumentView: function(aView) {
        
    },
    
    documentView: function() {
        
    },
    
    setContentView: function(contentView) {
        
    },
    
    contentView: function() {
        
    },
    
    setDocumentCursor: function(aCursor) {
        
    },
    
    documentCursor: function() {
        
    },
    
    setBorderType: function(aType) {
        
    },
    
    borderType: function() {
        
    },
    
    setBackgroundColor: function(aColor) {
        
    },
    
    backgroundColor: function() {
        
    },
    
    setDrawsBackground: function(flag) {
        
    },
    
    drawsBackground: function() {
        
    },
    
    setHasVerticalScroller: function(flag) {
        
    },
    
    hasVerticalScroller: function() {
        
    },
    
    setVericalScroller: function(aScroller) {
        
    },
    
    verticalScroller: function() {
        
    },
    
    setHasHorizontalSroller: function(flag) {
        
    },
    
    hasHorizontalScroller: function() {
        
    },
    
    setHorizontalScroller: function(aScroller) {
        
    },
    
    horizontalScroller: function() {
        
    },
    
    autohidesScrollers: function() {
        
    },
    
    setAutohidesScrollers: function(flag) {
        
    },
    
    
    // #if MAC_OS_X_VERSION_MAX_ALLOWED >= MAC_OS_X_VERSION_10_3
    //  - (BOOL)autohidesScrollers;
    //  - (void)setAutohidesScrollers:(BOOL)flag;
    //  #endif
    //  - (void)setHorizontalLineScroll:(CGFloat)value;
    //  - (void)setVerticalLineScroll:(CGFloat)value;
    //  - (void)setLineScroll:(CGFloat)value;
    //  - (CGFloat)horizontalLineScroll;
    //  - (CGFloat)verticalLineScroll;
    //  - (CGFloat)lineScroll;
    //  - (void)setHorizontalPageScroll:(CGFloat)value;
    //  - (void)setVerticalPageScroll:(CGFloat)value;
    //  - (void)setPageScroll:(CGFloat)value;
    //  - (CGFloat)horizontalPageScroll;
    //  - (CGFloat)verticalPageScroll;
    //  - (CGFloat)pageScroll;
    //  - (void)setScrollsDynamically:(BOOL)flag;
    //  - (BOOL)scrollsDynamically;
    //  - (void)tile;
    //  - (void)reflectScrolledClipView:(NSClipView *)cView;
    //  - (void)scrollWheel:(NSEvent *)theEvent;
    //  @end
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
 

// NSScroller Vertical
resource('NSScrollerBottomArrowNormal.png');    // 15 x 18
resource('NSScrollerTopArrowNormal.png');       // 15 x 30
resource('NSScrollerTopSlotNormal.png');        // 15 x 18
resource('NSScrollerVBackgroundNormal.png');    // 15 x 6

resource('NSScrollerTopKnobNormal.png');        // 15 x 10
resource('NSScrollerBottomKnobNormal.png');     // 15 x 10
resource('NSScrollerVerticalKnobNormal.png');   // 15 x 1

// NSScrollArrowPosition
var NSScrollerArrowsDefaultSetting	= 0;
var NSScrollerArrowsNone	       	= 2;

// NSUsableScrollerParts
var NSNoScrollerParts			    = 0;
var NSOnlyScrollerArrows		    = 1;
var NSAllScrollerParts			    = 2;

// NSScrollerPart
var NSScrollerNoPart			    = 0;
var NSScrollerDecrementPage		    = 1;
var NSScrollerKnob			        = 2;
var NSScrollerIncrementPage		    = 3;
var NSScrollerDecrementLine    	    = 4;
var NSScrollerIncrementLine	 	    = 5;
var NSScrollerKnobSlot			    = 6;

// NSScrollerArrow
var NSScrollerIncrementArrow        = 0;
var NSScrollerDecrementArrow	    = 1;

var NSScroller = NSView.extend({
    
    _isVertical: null,
    
    /**
        Proportion of the available area that the knob takes up
        
        0.0 being the min - this does not mean a size of 0.0. If below a min size
        (say 20px for example), then the knob should remian a min size, to ensure
        it is still visible and still scrollable
        
        1.0 being the max - it fills the slot 100%.
    */
    _knobProportion: null,
    
    /**
        value , between 0,0 and 1.0. the position depends upon the size of the
        knob. 
    */
    _value: null,
    
    /*
        @ivar _knobTrackStartPoint - NSPoint
        Used to maintain the start point that the mouse was pressed when tracking.
        It is important to know at what point the mouse was pressed so that the
        position within the knob can be calculated.
    */
    _knobTrackStartPoint: null,
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        
        this._isVertical = (this._bounds.size.width < this._bounds.size.height) ? true : false;
        
        this._value = aCoder.decodeDoubleForKey("NSCurValue");
        if (!this._value)
            this._value = 1;
        
        this._knobProportion = aCoder.decodeDoubleForKey("NSPercent");
        if (!this._knobProportion)
            this._knobProportion = 1;
                    
        return this;
    },
    
    drawRect: function(aRect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        
        if (this._isVertical) {
            // var slotRect = this.rectForPart(NSScrollerKnobSlot);
            this.drawKnobSlotInRect(this.rectForPart(NSScrollerKnobSlot), false);
            NSImage.imageNamed('NSScrollerTopSlotNormal.png').drawInRect(NSMakeRect(0, 0, 15, 18));
            
            this.drawArrow(NSScrollerIncrementArrow, false);
            this.drawArrow(NSScrollerDecrementArrow, false);
            
            // draw the non part (background)
            // NSImage.imageNamed('NSScrollerVBackgroundNormal.png').drawInRect(this.rectForPart(NSScrollerNoPart));
            
            this.drawKnob();
        }
        
    },
    
    drawParts: function() {
        
    },
    
    /**
        One value from NSScrollerPart
    */
    rectForPart: function(partCode) {
        if (this._isVertical) {
            switch (partCode) {
                case NSScrollerKnobSlot:
                    return NSMakeRect(0, 8, 15, this._bounds.size.height - 45);
                    break;
                case NSScrollerIncrementLine:
                    // bottom arrow (facing down)
                    return NSMakeRect(0, this._bounds.size.height - 18, 15, 18);
                    break;
                case NSScrollerDecrementLine:
                    // top arrow
                    return NSMakeRect(0, this._bounds.size.height - (18 + 30), 15, 30);
                    break;
                case NSScrollerNoPart:
                    // returns the area between slot and top arrow
                    return NSMakeRect(0, 18, 15, this._bounds.size.height - (18 + 30 + 18));
                    break;
                
                case NSScrollerKnob:
                console.log(this._value + ' ...... ' + this._knobProportion);
                    var slotRect = this.rectForPart(NSScrollerKnobSlot);
                    var scrollerHeight = this._knobProportion * slotRect.size.height;
                    var yOffset = ((slotRect.size.height - scrollerHeight) * this._value); // ((this._value * scrollerHeight) / 2);
                    return NSMakeRect(0, yOffset + slotRect.origin.y, 15, scrollerHeight);
                    break;
            }
        }
        return NSMakeRect(0, 0, 0, 0);
    },
    
    checkSpaceForParts: function() {
        
    },
    
    /*
        One from NSUsableScrollerParts
    */
    usableParts: function() {
        
    },
    
    /*
        One from NSScrollArrowPosition
    */
    setArrowsPosition: function(position) {
        
    },
    
    arrowsPosition: function() {
        
    },
    
    /*
        @param anArrow - NSScrollArrow
        @param highlight - Boolean
    */
    drawArrow: function(anArrow, highlight) {
        if (anArrow == NSScrollerIncrementArrow) {
            var theRect = this.rectForPart(NSScrollerIncrementLine);
            NSImage.imageNamed('NSScrollerBottomArrowNormal.png').drawInRect(theRect);
        }
        else if (anArrow == NSScrollerDecrementArrow) {
            var theRect = this.rectForPart(NSScrollerDecrementLine);
            NSImage.imageNamed('NSScrollerTopArrowNormal.png').drawInRect(theRect);
        }
        
    },
    
    drawKnob: function() {
        var knobRect = this.rectForPart(NSScrollerKnob);
        NSImage.imageNamed('NSScrollerTopKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x, knobRect.origin.y, 15, 10));
        NSImage.imageNamed('NSScrollerVerticalKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x, knobRect.origin.y + 10, 15, knobRect.size.height - 20));
        NSImage.imageNamed('NSScrollerBottomKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x, knobRect.origin.y + 10 + (knobRect.size.height - 20), 15, 10));
    },
    
    /*
        @param slotRect - NSRect
        @param highlight - Boolean
    */
    drawKnobSlotInRect: function(slotRect, highlight) {
        NSImage.imageNamed('NSScrollerVBackgroundNormal.png').drawInRect(slotRect);
    },
    
    /*
        @param highlight - Boolean
    */
    highlight: function(flag) {
        
    },
    
    /*
        @param thePoint - NSPoint
        @return NSScrollerPart
    */
    testPart: function(thePoint) {
        if (NSPointInRect(thePoint, this.rectForPart(NSScrollerKnob)))
            return NSScrollerKnob;        
        return -1;
    },
    
    /*
        @param theEvent - NSEvent
    */
    trackKnob: function(theEvent) {
        var location = this.convertPointFromView(theEvent.locationInWindow(), null);
        // Temp fix for inverted co-ord (cocoa origin bottom left)
        location.y = this._bounds.size.height - location.y;
        this._knobTrackStartPoint = location;
        
        NSApplication.sharedApplication().bindEventsMatchingMask((NSLeftMouseUpMask | NSMouseMovedMask), this, function(theEvent) {
            
            if (theEvent.type() == NSLeftMouseUp) {
                NSApplication.sharedApplication().unbindEvents();
                return;
            }
            
            var location = this.convertPointFromView(theEvent.locationInWindow(), null);
            // Temp fix for inverted co-ord (cocoa origin bottom left)
            location.y = this._bounds.size.height - location.y;
            
            console.log(location.y - this._knobTrackStartPoint.y);
        });
    },
    
    /*
        @param theEvent - NSEvent
    */
    trackScrollButtons: function(theEvent) {
        
    },
    
    /*
        @return NSScrollerPart
    */
    hitPart: function() {
        
    },
    
    /*
        @return CGFloat
    */
    knobProportion: function() {
        return this._knobProportion;
    },
    
    /*
        @param knobProportion - CGFloat
    */
    setKnobProportion: function(knobProportion) {
        this._knobProportion = knobProportion;
        this.setNeedsDisplay(true);
    },
    
    /*
        @param theEvent - NSEvent
    */
    mouseDown: function(theEvent) {
        var location = this.convertPointFromView(theEvent.locationInWindow(), null);
        // Temp fix for inverted co-ord (cocoa origin bottom left)
        location.y = this._bounds.size.height - location.y;
        var theTarget = this.testPart(location);
        
        switch (theTarget) {
            case NSScrollerKnob:
                this.trackKnob(theEvent);
                break;
            default:
                break;
        }
    }
});

/*
    Scroller width. To keep in with Interface builder, scrollers are 15px
    wide (or height if horizontal scroller).
*/
NSScroller.scrollerWidth = function() {
    return 15;
};
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
   
   startTrackingInView: function(startPoint, controlView) {
       if (this.isEnabled()) {
           console.log('here..');
           var SLIDER_PADDING = 8.5;
           var location = controlView.convertPointFromView(startPoint, null);
           this.setDoubleValue(((location.x - SLIDER_PADDING) / (controlView.bounds().size.width - (2 * SLIDER_PADDING))) * (this._maxValue - this._minValue));
           this.drawWithFrame(controlView.bounds(), controlView);
           
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
		var fontSize = this.size();
		
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
        
        var alignmentOrigin = 0;
        // paragraph style
        if (this._attributes.containsKey(NSParagraphStyleAttributeName)) {
            var paragraphStyle = this._attributes.objectForKey(NSParagraphStyleAttributeName);
            switch (paragraphStyle.alignment()) {
                case NSLeftTextAlignment:
                    break;
                case NSRightTextAlignment:
                    break;
                case NSCenterTextAlignment:
                    // position text in middle...
                    alignmentOrigin = (aRect.size.width - fontSize.width) / 2;
                    break;
                case NSJustifiedTextAlignment:
                    // "easiest" way is to work out how far short the line is, and then to split
                    // the string, and insert an equal amount of space between each word, so that
                    // each word has a gap between it. this wont put gaps between letters within
                    // a word, but this might take a LOT more of processing? or will it?
                    break;
            }
            
            // console.log('line break mode: ' + paragraphStyle.lineBreakMode());
        }
		
		CGContextShowTextAtPoint(c, aRect.origin.x + alignmentOrigin, (aRect.size.height * 0.75) + aRect.origin.y, this._string);
    },
    
    boundingRectWithSize: function(aSize, options) {
        
    }
});
/* 
 * table_column.js
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


// NSTablecolumn resizing
var NSTableColumnNoResizing         = 0;
var NSTableColumnAutoresizingMask   = ( 1 << 0 );
var NSTableColumnUserResizingMask   = ( 1 << 1 );

var NSTableColumn = NSObject.extend({
    
    _identifier: null,
    _headerCell: null,
    _dataCell: null,
    _width: null,
    _minWidth: null,
    _maxWidth: null,
    
    _tableView: null,
    
    initWithCoder: function(aCoder) {
        // this._super(aCoder);
        
        this._identifier = aCoder.decodeObjectForKey("NSIdentifier");
        // this._headerCell = aCoder.decodeObjectForKey("NSHeaderCell");
        this._dataCell = aCoder.decodeObjectForKey("NSDataCell");
        this._width = aCoder.decodeIntForKey("NSWidth");
        this._minWidth = aCoder.decodeIntForKey("NSMinWidth");
        this._maxWidth = aCoder.decodeIntForKey("NSMaxWidth");
        this._tableView = aCoder.decodeObjectForKey("NSTableView");
        
        return this;
    },
    
    setTableView: function(aTableView) {
        this._tableView = aTableView;
    },
    
    tableView: function() {
        return this._tableView;
    },
    
    setIdentifier: function(identifier) {
        this._identifier = identifier;
    },
    
    identifier: function() {
        return this._identifier;
    },
    
    setWidth: function(width) {
        this._width = width;
    },
    
    width: function() {
        return this._width;
    },
    
    setMinWidth: function(minWidth) {
        this._minWidth = minWidth;
    },
    
    minWidth: function() {
        return this._minWidth;
    },
    
    setMaxWidth: function(maxWidth) {
        this._maxWidth = maxWidth;
    },
    
    maxWidth: function() {
        return this._maxWidth;
    },
    
    setHeaderCell: function(cell) {
        this._headerCell = cell;
    },
    
    headerCell: function() {
        return this._headerCell;
    },
    
    setDataCell: function(cell) {
        this._dataCell = cell;
    },
    
    dataCell: function() {
        return this._dataCell;
    },
    
    dataCellForRow: function() {
        return this._dataCell;
    },
    
    setEditable: function(flag) {
        this._isEditable = flag;
    },
    
    isEditable: function() {
        return this._isEditable;
    },
    
    sizeToFit: function() {
        
    },
    
    setSortDescriptorPrototype: function(sortDescriptor) {
        this._sortDescriptorPrototype = sortDescriptor;
    },
    
    sortDescriptorPrototype: function() {
        return this._sortDescriptorPrototype;
    },
    
    setResizingMask: function(resizingMask) {
        this._resizingMask = resizingMask;
    },
    
    resizingMask: function() {
        return this._resizingMask;
    },
    
    setHeaderToolTip: function(aString) {
        this._headerToolTip = aString;
    },
    
    headerToolTip: function() {
        return this._headerToolTip;
    },
    
    isHidden: function() {
        return this._isHidden;
    },
    
    setHidden: function(flag) {
        this._isHidden = flag;
    }    
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
		this.attributedStringValue().drawWithRectAndOptions(this.titleRectForBounds(cellFrame), null);
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
            return NSMakeRect(theRect.origin.x + 2, theRect.origin.y + 3, theRect.size.width - 4, theRect.size.height - 5);
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
		
		// paragraph style
        var paragraphStyle = NSParagraphStyle.defaultParagraphStyle();
        paragraphStyle.setAlignment(this.alignment());
        paragraphStyle.setLineBreakMode(this.lineBreakMode());
        
        attributes.setObjectForKey(paragraphStyle, NSParagraphStyleAttributeName);
		
		return NSAttributedString.create('initWithStringAndAttributes', this._value, attributes);
	},
    
    // setUpFieldEditorAttributes: function(textObj) {
    //     return textObj;
    // },
    
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
 * table_header_cell.js
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


var NSTableHeaderCell = NSTextFieldCell.extend({
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        // this._value = aCoder.decodeObjectForKey("NSContents");
        return this;
    }
});
/* 
 * table_header_view.js
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


var NSTableHeaderView = NSView.extend({
    
    _tableView: null,
    _resizedColumn: null,
    _draggedColumn: null,
    _pressedColumn: null,
    _headerDragImage: null,
    _draggedDistance: null,
    _isColumnResizing: null,
    _showHandCursorFired: null,
    _toolTipRectsDirty: null,
    _alignTitleWithDataCell: null,
    _skipDrawingSeparator: null,
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        this._tableView = aCoder.decodeObjectForKey("NSTableView");
        return this;
    },
    
    setTableView: function(aTableView) {
        this._tableView = aTableView;
    },
    
    tableView: function() {
        return this._tableView;
    },
    
    drawRect: function(dirtyRect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextFillRect(c, dirtyRect);
    },
    
    draggedColumn: function() {
        
    },
    
    draggedDistance: function() {
        
    },
    
    resizedColumn: function() {
        
    },
    
    headerRectOfColumn: function(column) {
        
    },
    
    columnAtPoint: function(point) {
        
    }
});
/* 
 * table_view.js
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


// NSTableViewColumnAutoresizingStyle
var NSTableViewNoColumnAutoresizing                         = 0;
var NSTableViewUniformColumnAutoresizingStyle               = 1;
var NSTableViewSequentialColumnAutoresizingStyle            = 2;
var NSTableViewReverseSequentialColumnAutoresizingStyle     = 3;
var NSTableViewLastColumnOnlyAutoresizingStyle              = 4;
var NSTableViewFirstColumnOnlyAutoresizingStyle             = 5;

// gridstylemask
var NSTableViewGridNone                                     = 0;
var NSTableViewSolidVerticalGridLineMask                    = 1 << 0;
var NSTableViewSolidHorizontalGridLineMask                  = 1 << 1;

// NSTableViewSelectionHighlightStyle
var NSTableViewSelectionHighlightStyleRegular               = 0;
var NSTableViewSelectionHighlightStyleSourceList            = 1;


/*
 * Tableview delegate notifications
 */
var NSTableViewSelectionDidChangeNotification               = "NSTableViewSelectionDidChangeNotification";
var NSTableViewColumnDidMoveNotification                    = "NSTableViewColumnDidMoveNotification";
var NSTableViewColumnDidResizeNotification                  = "NSTableViewColumnDidResizeNotification";
var NSTableViewSelectionIsChangingNotification              = "NSTableViewSelectionIsChangingNotification";



var NSTableView = NSView.extend({
    
    _drawsGrid: null,
    
    _alternatingRowBackground: null,
    
    _headerView: null,
    
    _cornerView: null,
    
    _tableColumns: null,
    
    _numberOfRows: null,
    
    _numberOfColumns: null,
    
    _backgroundColor: null,
    
    _delegate: null,
    
    _dataSource: null,
    
    _intercellSpacing: null,
    
    _rowHeight: null,
    
    _lastSelectedColumn: null,
    
    _lastSelectedRow: null,
    
    _editingRow: null,
    
    _editingColumn: null,
    
    _selectedColumns: null,
    
    _selectedRows: null,
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        
        var flags = aCoder.decodeIntForKey("NSTvFlags");
        
        this._drawsGrid = (flags & 0x20000000) ? true : false;
        this._alternatingRowBackground = (flags & 0x00800000) ? true : false;
        
        this._gridColor = aCoder.decodeObjectForKey("NSGridColor");
        
        this._backgroundColor = NSColor.whiteColor();
        
        this._rowHeight = aCoder.decodeDoubleForKey("NSRowHeight");
        
        this._headerView = aCoder.decodeObjectForKey("NSHeaderView");
        
        if (this._headerView)
            this._headerView.setTableView(this);
        
        this._cornerView = aCoder.decodeObjectForKey("NSCornerView");
        this._tableColumns = aCoder.decodeObjectForKey("NSTableColumns");
        
        this._numberOfRows = -1;
        this._numberOfColumns = this._tableColumns.length;
        
        this._intercellSpacing = NSMakeSize(2, 2);
        
        for (var idx = 0; idx < this._numberOfColumns; idx++) {
            // do we need this?
            this._tableColumns[idx].setTableView(this);
        }
        
        return this;
    },
    
    /**
        Sets the datasource, conforming to NSTableViewDataSource.
    */
    setDataSource: function(aSource) {
        this._dataSource = aSource;
		this.reloadData();
    },
    
    dataSource: function() {
        return this._dataSource;
    },
    
    /*
        Sets the delegate conforming to NSTableViewDelegate.
    */
    setDelegate: function(delegate) {
        this._delegate = delegate;
    },
    
    delegate: function() {
        return this._delegate;
    },
    
    setHeaderView: function(headerView) {
        this._headerView = headerView;
    },
    
    headerView: function() {
        return this._headerView;
    },
    
    setCornerView: function(cornerView) {
        this._cornerview = cornerView;
    },
    
    cornerView: function() {
        return this._cornerView;
    },
    
    setAllowsColumnReordering: function(flag) {
        
    },
    
    allowsColumnReordering: function() {
        
    },
    
    setAllowsColumnResizing: function(flag) {
        
    },
    
    allowsColumnResizing: function() {
        
    },

    setColumnAutoresizingStyle: function(style) {
        
    },
    
    columnAutoresizingStyle: function() {
        
    },
    
    setGridStyleMask: function(gridType) {
        
    },
    
    gridStyleMask: function() {
        
    },
    
    setIntercellSpacing: function(aSize) {
        this._intercellSpacing = aSize;
    },
    
    intercellSpacing: function() {
        return this._intercellSpacing;
    },
    
    setUsesAlternatingRowBackgroundColors: function(flag) {
        
    },
    
    usesAlternatingRowBackgroundColors: function() {
        
    },
    
    setBackgroundColor: function(aColor) {
        
    },
    
    backgroundColor: function() {
        
    },
    
    setGridColor: function(aColor) {
        
    },
    
    gridColor: function() {
        
    },
    
    setRowHeight: function(rowHeight) {
        
    },
    
    rowHeight: function() {
        
    },
    
    noteHeightOfRowsWithIndexesChanged: function(indexSet) {
        
    },
    
    tableColumns: function() {
        return this._tableColumns;
    },
    
    numberOfColumns: function() {
        return this._numberOfColumns;
    },
    
    numberOfRows: function() {
        if (this._numberOfRows < 0) {
			if (this._dataSource) {
				if (this._dataSource.respondsTo('numberOfRowsInTableView')) {
					this._numberOfRows = this._dataSource.numberOfRowsInTableView(this);   
				}
				else {
					console.log("TableView's datasource does not respond to numberOfRowsInTableView")
					this._numberOfRows = 0;
				}
			}
			else {
				this._numberOfRows = 0;
			}
		}
		
		return this._numberOfRows;
    },
    
    addTableColumn: function(tableColumn) {
        
    },
    
    removeTableColumn: function(tableColumn) {
        
    },
    
    moveColumn: function(oldIndex, newIndex) {
        
    },
    
    columnWithIdentifier: function(identifier) {
        
    },
    
    tableColumnWithIdentifier: function(identifier) {
        
    },
    
    tile: function() {
        
    },
    
    sizeToFit: function() {
        
    },
    
    sizeLastColumnToFit: function() {
        
    },
    
    scrollRowToVisible: function(row) {
        
    },
    
    scrollColumnToVisible: function(column) {
        
    },
    
    reloadData: function() {
        this._numberOfRows = -1;
		this.noteNumberOfRowsChanged();
		this.setNeedsDisplay(true);
		this._headerView.setNeedsDisplay(true);
    },
    
    noteNumberOfRowsChanged: function() {
        
    },
    
    editedColumn: function() {
        
    },
    
    editedRow: function() {
        
    },
    
    clickedColumn: function() {
        
    },
    
    clickedRow: function() {
        
    },
    
    setDoubleAction: function(anAction) {
        
    },
    
    doubleAction: function() {
        
    },
    
    setSortDescriptors: function(array) {
        
    },
    
    sortDescriptors: function() {
        
    },
    
    setIndicatorImageInTableColumn: function(anImage, tableColumn) {
        
    },
    
    indicatorImageInTableColumn: function(tableColumn) {
        
    },
    
    setHighlightedTableColumn: function(tableColumn) {
        
    },
    
    highlightedTableColumn: function() {
        
    },
    
    /*
        Drag an drop
    */
    setVerticalMotionCanBeginDrag: function(flag) {
        
    },
    
    verticalMotionCanBeginDrag: function() {
        
    },
    
    canDragRowsWithIndexes: function(rowIndexes, mouseDownPoint) {
        
    },
    
    dragImageForRowsWithIndexes: function(dragRows, tableColumns, theEvent, dragImageOffset) {
        
    },
    
    setDraggingSourceOperationMask: function(mask, isLocal) {
        
    },
    
    setDropRow: function(row, dropOperation) {
        
    },
    
    /*
        Selection
    */
    setAllowsMultipleSelection: function(flag) {
        
    },
    
    allowsMultipleSelection: function() {
        
    },
    
    setAllowsEmptySelection: function(flag) {
        
    },
    
    allowsEmptySelection: function() {
        
    },
    
    setAllowsColumnSelection: function(flag) {
        
    },
    
    allowsColumnSelection: function() {
        
    },
    
    selectAll: function(sender) {
        
    },
    
    deselectAll: function(sender) {
        
    },
    
    selectColumnIndexes: function(indexes, extendSelection) {
        
    },
    
    selectRowIndexes: function(indexes, extendSelection) {
        
    },
    
    selectedColumnIndexes: function() {
        
    },
    
    selectedRowIndexes: function() {
        
    },
    
    deselectColumn: function(column) {
        
    },
    
    deselectRow: function(row) {
        
    },
    
    selectedColumn: function() {
        
    },
    
    selectedRow: function() {
        
    },
    
    isColumnSelected: function(column) {
        
    },
    
    isRowSelected: function(row) {
        
    },
    
    numberOfSelectedColumns: function() {
        
    },
    
    numberOfSelectedRows: function() {
        
    },
    
    allowsTypeSelect: function() {
        
    },
    
    setAllowsTypeSelect: function(flag) {
        
    },
    
    selectionHighlightStyle: function() {
        
    },
    
    setSelectionHighlightStyle: function(selectionHighlightStyle) {
        
    },
    
    rectOfColumn: function(column) {
        var theRect = NSMakeRect(0, 0, 0, 0);
        
        if (column < 0 || column > this._tableColumns.length)
            throw "NSTableView -rectOfColumn invalidIndex: " + column;
        
        for (var idx = 0; idx < column; idx++)
            theRect.origin.x += this._tableColumns[idx].width() + this._intercellSpacing.width;
        
        for (var idx = 0; idx < this.numberOfRows(); idx++)
            theRect.size.height += this._rowHeight + this._intercellSpacing.height;
        
        theRect.origin.y = 0.0;
        theRect.size.width = this._tableColumns[column].width() + this._intercellSpacing.width;
        
        return theRect;
    },
    
    rectOfRow: function(row) {
		var theRect = NSMakeRect(0, 0, 0, 0);
	
		// if index outside valid range, return zero rect
        if (row < 0 || row > this.numberOfRows())
			return theRect;
		
		for (var idx = 0; idx < this._tableColumns.length; idx ++)
			theRect.size.width += this._tableColumns[idx].width() + this._intercellSpacing.width;
		
		theRect.origin.y = this.bounds().origin.y + ((this._rowHeight + this._intercellSpacing.height) * row);
		theRect.size.height = this._rowHeight + this._intercellSpacing.height;
		theRect.origin.x = this.bounds().origin.x;
		
		return theRect;
    },
    
    columnIndexesInRect: function(rect) {
        return NSMakeRange(0, 2);
    },
    
    rowsInRect: function(rect) {
        return NSMakeRange(0, 5);
    },
    
    columnAtPoint: function(point) {
        
    },
    
    rowAtPoint: function(point) {
        
    },
    
    frameOfCellAtColumnRow: function(column, row) {
        var theRect = NSMakeRect(0, 0, 0, 0);
        
        if (column < 0 || column > this.numberOfColumns())
            return theRect;
        
        if (row < 0 || row > this.numberOfRows())
            return theRect;
        
        for (var idx = 0; idx < column; idx++)
            theRect.origin.x += this._tableColumns[idx].width() + this._intercellSpacing.width;
        
        for (var idx = 0; idx < row; idx++)
            theRect.origin.y += this._rowHeight + this._intercellSpacing.height;
        
        theRect.size.width = this._tableColumns[column].width() + this._intercellSpacing.width;
        theRect.size.height += this._rowHeight + this._intercellSpacing.height;
        
        return theRect;
    },
    
    preparedCellAtColumnRow: function(column, row) {
        var dataCell = this._tableColumns[column].dataCellForRow(row);
        dataCell.setObjectValue(this.dataSourceObjectValueForColumnRow(column, row));
        return dataCell;        
    },
    
    dataSourceObjectValueForColumnRow: function(column, row) {
        if (this._dataSource && this._dataSource.respondsTo('tableViewObjectValueForTableColumnRow'))
            return this._dataSource.tableViewObjectValueForTableColumnRow(this, column, row);
        
        console.log('Tableview data source does not respond to tableViewObjectValueForTableColumnRow');
        return null;
    },

    /*
        Text delegate methods
    */
    textShouldBeginEditing: function(textObject) {
        
    },
    
    textShouldEndEditing: function(textObject) {
        
    },
    
    textDidBeginEditing: function(aNotification) {
        
    },
    
    textDidEndEditing: function(aNotification) {
        
    },
    
    textDidChange: function(aNotification) {
        
    },
    
    // 
    
    setAutosaveName: function(name) {
        
    },
    
    autosaveName: function() {
        
    },
    
    setAutosaveTableColumns: function(flag) {
        
    },
    
    autosaveTableColumns: function() {
        
    },
    
    focusedColumn: function() {
        
    },
    
    // 
    editColumnRow: function(column, row, theEvent, select) {
        
    },
    
    drawRect: function(clipRect) {
        // draw background
        this.drawBackgroundInClipRect(clipRect);
        // draw grid
        this.drawGridInClipRect(clipRect);
        
        // draw highlighted row backgrounds (each row is drawn on top of this)
        
        // draw each row
        if (this.numberOfRows() > 0) {
            var visibleRows = this.rowsInRect(clipRect);
            console.log(visibleRows);
            if (visibleRows.length > 0) {
                for (var idx = visibleRows.location; idx < visibleRows.location + visibleRows.length; idx++) {
                    this.drawRowInClipRect(idx, clipRect);
                }
            }
        }
    },
    
    drawRowInClipRect: function(row, clipRect) {
        var visibleColumns = this.columnIndexesInRect(clipRect);
        
        if (row < 0 || row >= this.numberOfRows()) {
            console.log('Invalid row number in table. ' + row);
            return;
        }
        
        for (var idx = visibleColumns.location; idx < visibleColumns.location + visibleColumns.length; idx++) {
            var dataCell = this.preparedCellAtColumnRow(idx, row);
            var cellRect = this.frameOfCellAtColumnRow(idx, row);
            
            if (this._delegate && this._delegate.respondsTo('tableViewWillDisplayCell')) {
                this._delegate.tableViewWillDisplayCell(this, dataCell, this._tableColumns[idx], row);
            }
                
            dataCell.drawWithFrame(cellRect, this);
        }
        
        // draw only visible columns.
        // NSRange visibleColumns = [self columnsInRect:clipRect];
        //         int drawThisColumn = visibleColumns.location;
        //         NSInteger numberOfRows=[self numberOfRows];
        // 
        //         if (row < 0 || row >= numberOfRows)
        //             [NSException raise:NSInvalidArgumentException
        //                         format:@"invalid row in drawRow:clipRect:"];
        // 
        //         while (drawThisColumn < NSMaxRange(visibleColumns)) {
        //            if (!(row == _editedRow && drawThisColumn == _editedColumn)) {
        //               NSCell *dataCell=[self preparedCellAtColumn:drawThisColumn row:row];
        //               NSTableColumn *column = [_tableColumns objectAtIndex:drawThisColumn];
        //               NSRect cellRect = [self _adjustedFrame:[self frameOfCellAtColumn:drawThisColumn row:row] forCell:dataCell];
        //               if ([_delegate respondsToSelector:@selector(tableView:willDisplayCell:forTableColumn:row:)])
        //                  [_delegate tableView:self willDisplayCell:dataCell forTableColumn:column row:row];
        // 
        //               [dataCell drawWithFrame:cellRect inView:self];
        //            }
        //            drawThisColumn++;
        //         }
                
    },
    
    highlightSelectionInClipRect: function(clipRect) {
        
    },
    
    drawGridInClipRect: function(clipRect) {
        
        if (this._drawsGrid) {
            var c = NSGraphicsContext.currentContext().graphicsPort();
            CGContextBeginPath(c);
            CGContextSetStrokeColorWithColor(c, this._gridColor);
            
            var columnsToDraw = this.columnIndexesInRect(clipRect);
            for (var idx = columnsToDraw.location; idx < columnsToDraw.location + columnsToDraw.length; idx++) {
                var theRect = this.rectOfColumn(idx);
                var columnX = theRect.origin.x + theRect.size.width - 0.5; // draw not in line center (draws 1px instead of 2px)
                
                CGContextMoveToPoint(c, NSMakePoint(columnX, clipRect.origin.y));
                CGContextAddLineToPoint(c, NSMakePoint(columnX, clipRect.origin.y + clipRect.size.height));            
            }   
            CGContextStrokePath(c);
        }
    },
    
    drawBackgroundInClipRect: function(clipRect) {
        if (this._backgroundColor) {
            var c = NSGraphicsContext.currentContext().graphicsPort();
            
            if (!this._alternatingRowBackground) {
                CGContextSetFillColorWithColor(c, this._backgroundColor);
                CGContextFillRect(c, clipRect);
            }
            else {
                var altColors = NSColor.controlAlternatingRowBackgroundColors();
                var rowsInRect = this.rowsInRect(clipRect);
                
                for (var idx = rowsInRect.location; idx < rowsInRect.location + rowsInRect.length; idx++) {
                    CGContextSetFillColorWithColor(c, altColors[idx % altColors.length]);
                    CGContextFillRect(c, this.rectOfRow(idx));
                }
            }
        }
    }
});

var NSTableViewDelegate = {
    
    tableViewWillDisplayCell: function(tableView, cell, tableColumn, row) {
    },
    
    tableViewShouldEditTableColumn: function(tableView, tableColumn, row) {
    },
    
    selectionShouldChangeInTableView: function(tableView) {
    },
    
    tableViewShouldSelectRow: function(tableView, row) {
    },
    
    tableViewSelectionIndexesForProposedSelection: function(tableView, proposedIndexes) {
    },
    
    tableViewShouldSelectTableColumn: function(tableView, tableColumn) {
    },
    
    tableViewMouseDownInHeaderOfTableColumn: function(tableview, tableColumn) {
    },
    
    tableViewDidClickTableColumn: function(tableview, tableColumn) {
    },
    
    tableViewDidDragTableColumn: function(tableview, tablecolumn) {
    },
    
    tableViewToolTipForCell: function(tableview, cell, rect, tableColumn, row, mouseLocation) {
    },
    
    tableViewHeightOfRow: function(tableview, row) {
    },
    
    tableViewTypeSelectStringForTableColumn: function(tableview, tableColumn, row) {
    },
    
    tableviewNextTypeSelectMatchFromRow: function(tableview, startRow, endRow, searchString) {
    },
    
    tableViewShouldTypeSelectForEvent: function(tableView, theEvent, searchString) {
    },
    
    tableViewShouldShowCellExpansionForTableColumn: function(tableView, tableColumn, row) {
    },
    
    tableViewShouldTrackCell: function(tableView, cell, tableColumn, row) {
    },
    
    tableViewDataCellForTableColumn: function(tableView, tableColumn, row) {
    },
    
    tableViewIsGroupRow: function(tableView, row) {
    },
    
    /**
        Notification
    */
    tableViewSelectionDidChange: function(aNotification) {
    },
    
    tableViewColumnDidMove: function(aNotification) {
    },
    
    tableViewColumnDidResize: function(aNotification) {
    },
    
    tableViewSelectionIsChanging: function(aNotification) {
    }
};


var NSTableViewDataSource = {
    
    /*
        Required.
    */
    numberOfRowsInTableView: function(tableView) {
    },
    
    /*
        Required.
    */
    tableViewObjectValueForTableColumnRow: function(tableView, tableColumn, row) {
    },
    
    tableViewSetObjectValueFor: function(tableView, objectValue, tableColumn, row) {
    },
    
    tableViewSortDescriptorsDidChange: function(tableView, oldDescriptors) {
    },
    
    tableViewWriteRowsWithIndexesToPasteboard: function(tableView, rowIndexes, pboard) {
    },
    
    tableViewValidateDrop: function(tableView, info, row, dropOperation) {
    },
    
    tableViewAcceptDrop: function(tableView, info, row, dropOperation) {
    }  
};
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
    
    mouseDown: function(theEvent) {
        if (!this._cell.isEnabled())
            return;
        
        if (this._cell.isSelectable() || this._cell.isEditable()) {
            if (!this._currentEditor) {
                this._currentEditor = this.window().fieldEditor(true, this);
                this._currentEditor = this._cell.setUpFieldEditorAttributes(this._currentEditor);
            }
            
            this._cell.setHighlighted(true);
            this._cell.editWithFrame(this._bounds, this, this._currentEditor, this, theEvent);
        }
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

var NSTextStorage = NSAttributedString.extend({

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
    
    init: function() {
        this._layoutManagers = [];
        this._string = "";
        this._attributed = [];
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
    _textContainerInset: null,
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
    
    initWithFrame: function(frameRect) {
        this._super(frameRect);
        
        this._textStorage = NSTextStorage.create();
        this._textContainer = NSTextContainer.create('initWithContainerSize', frameRect.size);
        var theLayoutManager = NSLayoutManager.create();
        
        this._textStorage.addLayoutManager(theLayoutManager);
        theLayoutManager.addTextContainer(this._textContainer);
        
        this._textContainer.setTextView(this);
        
        this._textContainerInset = NSMakeSize(0, 0);
        
        this._isEditable = true;
        this._isSelectable = true;
        this._isRichText = true;
        
        this._backgroundColor = NSColor.whiteColor();
        this._drawsBackground = true;
        
        this._textColor = NSColor.textColor();
        this._font = NSFont.userFontOfSize(10);
        this._textAlignment = NSLeftTextAlignment;
        this._insertionPointColor = NSColor.blackColor();
        
        this._isFieldEditor = false;
        this._maxSize = this.bounds().size;
        this._isHorizontallyResizable = false;
        this._isVerticallyResizable = true;
        this._selectedRange = NSMakeRange(0, 0);
        
        return this;
    },
    
    mouseDown: function(theEvent) {
        console.log('mouse down in text view');
    },
    
    textContainer: function() {
        return this._textContainer;
    },
    
    setTextContainer: function(aContainer) {
        this._textContainer = aContainer;
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
        // console.log('setting string to ' + aString);
        this.replaceCharactersInRange(NSMakeRange(0, this._textStorage.length()), aString);
        // console.log(this._textStorage);
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
        
        if (this._backgroundColor) {
            CGContextSetFillColorWithColor(c, this._backgroundColor);
            CGContextFillRect(c, theRect);
        }
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
   
   _theWindow: null,
   
   init: function() {
       this._super();
       
       console.log('creating app controller');
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
   },

	/*
		Table view delegate
	*/
	numberOfRowsInTableView: function(tableView) {
		return 6;
	},
	
	tableViewObjectValueForTableColumnRow: function(tableView, tableColumn, row) {
	    return "Hi there " + row;
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

var JSScrollView = NSView.extend({
    
    drawRect: function(aRect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextFillRect(c, aRect);
    }
});
__bootstrap_files["MainMenu.json"] = {"archive":{"data":{"IBDocument.SystemTarget": 1050,"IBDocument.SystemVersion": "10A394","IBDocument.InterfaceBuilderVersion": "731","IBDocument.AppKitVersion": "1027.1","IBDocument.HIToolboxVersion": "430.00","IBDocument.PluginVersions": {"class": "NSMutableDictionary","id": "", "objects":{"NS.key.0": "com.apple.InterfaceBuilder.CocoaPlugin","NS.object.0": "731"}},"IBDocument.EditedObjectIDs": {"class": "NSMutableArray","id": "", "objects":[710,687]},"IBDocument.PluginDependencies": {"class": "NSArray","id": "", "objects":["com.apple.InterfaceBuilder.CocoaPlugin"]},"IBDocument.Metadata": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"class": "NSArray","id": "0", "objects":[]},"dict.values": {"class": "NSMutableArray","id": "", "objects":[]}}},"IBDocument.RootObjects": {"class": "NSMutableArray","id": "1048", "objects":[{"class": "NSCustomObject","id": "1021", "objects":{"NSClassName": "NSApplication"}},{"class": "NSCustomObject","id": "1014", "objects":{"NSClassName": "FirstResponder"}},{"class": "NSCustomObject","id": "1050", "objects":{"NSClassName": "NSApplication"}},{"class": "NSCustomObject","id": "163992474", "objects":{"NSClassName": "NSFontManager"}},{"class": "NSWindowTemplate","id": "513744381", "objects":{"NSWindowStyleMask": 15,"NSWindowBacking": 2,"NSWindowRect": "{{133, 47}, {946, 613}}","NSWTFlags": 603979776,"NSWindowTitle": "Window","NSWindowClass": "NSWindow","NSViewClass": {"nil":""},"NSWindowContentMaxSize": "{1.79769e+308, 1.79769e+308}","NSWindowView": {"class": "NSView","id": "414427165", "objects":{"NSNextResponder": {"id":""},"NSvFlags": 256,"NSSubviews": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSButton","id": "807627904", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{554, 422}, {118, 25}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "281914322", "objects":{"NSCellFlags": -2080244224,"NSCellFlags2": 134217728,"NSContents": "Round Textured","NSSupport": {"class": "NSFont","id": "798430573", "objects":{"NSName": "LucidaGrande","NSSize": 13,"NSfFlags": 1044}},"NSControlView": {"id":"807627904"},"NSButtonFlags": -2038152961,"NSButtonFlags2": 163,"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 400,"NSPeriodicInterval": 75}}}},{"class": "NSButton","id": "947043007", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{554, 391}, {118, 25}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "775301662", "objects":{"NSCellFlags": -1543373312,"NSCellFlags2": 134217728,"NSContents": "This is disabled","NSSupport": {"id":"798430573"},"NSControlView": {"id":"947043007"},"NSButtonFlags": -2038152961,"NSButtonFlags2": 163,"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 400,"NSPeriodicInterval": 75}}}},{"class": "NSSlider","id": "481053202", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{552, 455}, {122, 21}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSSliderCell","id": "228939928", "objects":{"NSCellFlags": -1543373312,"NSCellFlags2": 0,"NSContents": "","NSSupport": {"class": "NSFont","id": "672854075", "objects":{"NSName": "Helvetica","NSSize": 12,"NSfFlags": 16}},"NSControlView": {"id":"481053202"},"NSMaxValue": 100,"NSMinValue": 0.0,"NSValue": 50,"NSAltIncValue": 0.0,"NSNumberOfTickMarks": 0,"NSTickMarkPosition": 1,"NSAllowsTickMarkValuesOnly": false,"NSVertical": false}}}},{"class": "NSSlider","id": "257328319", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{552, 478}, {122, 21}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSSliderCell","id": "829387278", "objects":{"NSCellFlags": -2080244224,"NSCellFlags2": 0,"NSContents": "","NSSupport": {"id":"672854075"},"NSControlView": {"id":"257328319"},"NSMaxValue": 100,"NSMinValue": 0.0,"NSValue": 50,"NSAltIncValue": 0.0,"NSNumberOfTickMarks": 0,"NSTickMarkPosition": 1,"NSAllowsTickMarkValuesOnly": false,"NSVertical": false}}}},{"class": "NSButton","id": "780169108", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{62, 488}, {109, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "146314554", "objects":{"NSCellFlags": 67239424,"NSCellFlags2": 0,"NSContents": "Normal radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"780169108"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"class": "NSCustomResource","id": "904276281", "objects":{"NSClassName": "NSImage","NSResourceName": "NSRadioButton"}},"NSAlternateImage": {"class": "NSButtonImageSource","id": "813970489", "objects":{"NSImageName": "NSRadioButton"}},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "511023663", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{62, 433}, {156, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "388353698", "objects":{"NSCellFlags": -1543373312,"NSCellFlags2": 0,"NSContents": "Disabled Check radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"511023663"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"id":"904276281"},"NSAlternateImage": {"id":"813970489"},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "142462336", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{62, 462}, {177, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "100568012", "objects":{"NSCellFlags": -2080244224,"NSCellFlags2": 0,"NSContents": "Normal unchecked radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"142462336"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"id":"904276281"},"NSAlternateImage": {"id":"813970489"},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "577562334", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{285, 488}, {109, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "671756545", "objects":{"NSCellFlags": -2080244224,"NSCellFlags2": 0,"NSContents": "Normal radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"577562334"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"class": "NSCustomResource","id": "1020590486", "objects":{"NSClassName": "NSImage","NSResourceName": "NSSwitch"}},"NSAlternateImage": {"class": "NSButtonImageSource","id": "849298367", "objects":{"NSImageName": "NSSwitch"}},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "790695465", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{285, 433}, {156, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "561385561", "objects":{"NSCellFlags": -1543373312,"NSCellFlags2": 0,"NSContents": "Disabled Check radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"790695465"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"id":"1020590486"},"NSAlternateImage": {"id":"849298367"},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "561516135", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{285, 462}, {177, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "79065924", "objects":{"NSCellFlags": 67239424,"NSCellFlags2": 0,"NSContents": "Normal unchecked radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"561516135"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"id":"1020590486"},"NSAlternateImage": {"id":"849298367"},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSTextField","id": "744995210", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 267,"NSFrame": "{{708, 478}, {106, 22}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSTextFieldCell","id": "160495813", "objects":{"NSCellFlags": -1804468671,"NSCellFlags2": 272630784,"NSContents": "Textfieldy","NSSupport": {"id":"798430573"},"NSControlView": {"id":"744995210"},"NSDrawsBackground": true,"NSBackgroundColor": {"class": "NSColor","id": "875495060", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "textBackgroundColor","NSColor": {"class": "NSColor","id": "5431023", "objects":{"NSColorSpace": 3,"NSWhite": "MQA"}}}},"NSTextColor": {"class": "NSColor","id": "91711647", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "textColor","NSColor": {"class": "NSColor","id": "106532192", "objects":{"NSColorSpace": 3,"NSWhite": "MAA"}}}}}}}},{"class": "NSTextField","id": "1037334765", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 267,"NSFrame": "{{708, 446}, {106, 22}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSTextFieldCell","id": "685186056", "objects":{"NSCellFlags": -1267597759,"NSCellFlags2": 272630784,"NSContents": "Disabled","NSSupport": {"id":"798430573"},"NSControlView": {"id":"1037334765"},"NSDrawsBackground": true,"NSBackgroundColor": {"id":"875495060"},"NSTextColor": {"id":"91711647"}}}}},{"class": "NSTextField","id": "669360788", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{713, 421}, {77, 17}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSTextFieldCell","id": "859234033", "objects":{"NSCellFlags": 68288064,"NSCellFlags2": 272630784,"NSContents": "Label","NSSupport": {"id":"798430573"},"NSControlView": {"id":"669360788"},"NSBackgroundColor": {"class": "NSColor","id": "805445725", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "controlColor","NSColor": {"class": "NSColor","id": "415934132", "objects":{"NSColorSpace": 3,"NSWhite": "MC42NjY2NjY2NjY3AA"}}}},"NSTextColor": {"class": "NSColor","id": "163054175", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "controlTextColor","NSColor": {"id":"106532192"}}}}}}},{"class": "NSScrollView","id": "26314878", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 306,"NSSubviews": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSClipView","id": "996176323", "objects":{"NSNextResponder": {"id":"26314878"},"NSvFlags": 2304,"NSSubviews": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSTableView","id": "1005146759", "objects":{"NSNextResponder": {"id":"996176323"},"NSvFlags": 256,"NSFrameSize": "{407, 257}","NSSuperview": {"id":"996176323"},"NSEnabled": true,"NSHeaderView": {"class": "NSTableHeaderView","id": "690404805", "objects":{"NSNextResponder": {"id":"786373528"},"NSvFlags": 256,"NSFrameSize": "{407, 17}","NSSuperview": {"id":"786373528"},"NSTableView": {"id":"1005146759"}}},"NSCornerView": {"class": "_NSCornerView","id": "618415584", "objects":{"NSNextResponder": {"id":"26314878"},"NSvFlags": -2147483392,"NSFrame": "{{224, 0}, {16, 17}}","NSSuperview": {"id":"26314878"}}},"NSTableColumns": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSTableColumn","id": "363505399", "objects":{"NSWidth": 101,"NSMinWidth": 40,"NSMaxWidth": 1000,"NSHeaderCell": {"class": "NSTableHeaderCell","id": "", "objects":{"NSCellFlags": 75628096,"NSCellFlags2": 2048,"NSContents": "","NSSupport": {"class": "NSFont","id": "26", "objects":{"NSName": "LucidaGrande","NSSize": 11,"NSfFlags": 3100}},"NSBackgroundColor": {"class": "NSColor","id": "872419421", "objects":{"NSColorSpace": 3,"NSWhite": "MC4zMzMzMzI5ODU2AA"}},"NSTextColor": {"class": "NSColor","id": "384823602", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "headerTextColor","NSColor": {"id":"106532192"}}}}},"NSDataCell": {"class": "NSTextFieldCell","id": "551760288", "objects":{"NSCellFlags": 337772096,"NSCellFlags2": 2048,"NSContents": "Text Cell","NSSupport": {"id":"798430573"},"NSControlView": {"id":"1005146759"},"NSBackgroundColor": {"class": "NSColor","id": "955461975", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "controlBackgroundColor","NSColor": {"id":"415934132"}}},"NSTextColor": {"id":"163054175"}}},"NSResizingMask": 3,"NSIsResizeable": true,"NSIsEditable": true,"NSTableView": {"id":"1005146759"}}},{"class": "NSTableColumn","id": "460047902", "objects":{"NSWidth": 300,"NSMinWidth": 40,"NSMaxWidth": 1000,"NSHeaderCell": {"class": "NSTableHeaderCell","id": "", "objects":{"NSCellFlags": 75628096,"NSCellFlags2": 2048,"NSContents": "","NSSupport": {"id":"26"},"NSBackgroundColor": {"id":"872419421"},"NSTextColor": {"id":"384823602"}}},"NSDataCell": {"class": "NSTextFieldCell","id": "331608437", "objects":{"NSCellFlags": 337772096,"NSCellFlags2": 2048,"NSContents": "Text Cell","NSSupport": {"id":"798430573"},"NSControlView": {"id":"1005146759"},"NSBackgroundColor": {"id":"955461975"},"NSTextColor": {"id":"163054175"}}},"NSResizingMask": 3,"NSIsResizeable": true,"NSIsEditable": true,"NSTableView": {"id":"1005146759"}}}]},"NSIntercellSpacingWidth": 3,"NSIntercellSpacingHeight": 2,"NSBackgroundColor": {"id":"5431023"},"NSGridColor": {"class": "NSColor","id": "", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "gridColor","NSColor": {"class": "NSColor","id": "", "objects":{"NSColorSpace": 3,"NSWhite": "MC41AA"}}}},"NSRowHeight": 17,"NSTvFlags": -692060160,"NSDelegate": {"id":""},"NSDataSource": {"id":""},"NSColumnAutoresizingStyle": 4,"NSDraggingSourceMaskForLocal": 15,"NSDraggingSourceMaskForNonLocal": 0,"NSAllowsTypeSelect": true,"NSTableViewDraggingDestinationStyle": 0}}]},"NSFrame": "{{1, 17}, {407, 257}}","NSSuperview": {"id":"26314878"},"NSNextKeyView": {"id":"1005146759"},"NSDocView": {"id":"1005146759"},"NSBGColor": {"id":"955461975"},"NScvFlags": 4}},{"class": "NSScroller","id": "531044569", "objects":{"NSNextResponder": {"id":"26314878"},"NSvFlags": -2147483392,"NSFrame": "{{224, 17}, {15, 102}}","NSSuperview": {"id":"26314878"},"NSTarget": {"id":"26314878"},"NSAction": "_doScroller:","NSCurValue": 37,"NSPercent": 0.19473679999999999}},{"class": "NSScroller","id": "194213946", "objects":{"NSNextResponder": {"id":"26314878"},"NSvFlags": -2147483392,"NSFrame": "{{1, 119}, {223, 15}}","NSSuperview": {"id":"26314878"},"NSsFlags": 1,"NSTarget": {"id":"26314878"},"NSAction": "_doScroller:","NSPercent": 0.57142859999999995}},{"class": "NSClipView","id": "786373528", "objects":{"NSNextResponder": {"id":"26314878"},"NSvFlags": 2304,"NSSubviews": {"class": "NSMutableArray","id": "", "objects":[{"id":"690404805"}]},"NSFrame": "{{1, 0}, {407, 17}}","NSSuperview": {"id":"26314878"},"NSNextKeyView": {"id":"690404805"},"NSDocView": {"id":"690404805"},"NSBGColor": {"id":"955461975"},"NScvFlags": 4}},{"id":"618415584"}]},"NSFrame": "{{20, 48}, {409, 275}}","NSSuperview": {"id":"414427165"},"NSNextKeyView": {"id":"996176323"},"NSsFlags": 562,"NSVScroller": {"id":"531044569"},"NSHScroller": {"id":"194213946"},"NSContentView": {"id":"996176323"},"NSHeaderClipView": {"id":"786373528"},"NSCornerView": {"id":"618415584"},"NSScrollAmts": "QSAAAEEgAABBmAAAQZgAAA"}},{"class": "NSScrollView","id": "504503506", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSSubviews": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSClipView","id": "53200817", "objects":{"NSNextResponder": {"id":"504503506"},"NSvFlags": 2304,"NSSubviews": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSCustomView","id": "873484780", "objects":{"NSNextResponder": {"id":"53200817"},"NSvFlags": 274,"NSFrameSize": "{696, 400}","NSSuperview": {"id":"53200817"},"NSClassName": "JSScrollView"}}]},"NSFrame": "{{1, 1}, {462, 258}}","NSBounds": "{{0, 57}, {462, 258}}","NSSuperview": {"id":"504503506"},"NSNextKeyView": {"id":"873484780"},"NSDocView": {"id":"873484780"},"NSBGColor": {"id":"805445725"},"NScvFlags": 4}},{"class": "NSScroller","id": "938838352", "objects":{"NSNextResponder": {"id":"504503506"},"NSvFlags": 256,"NSFrame": "{{463, 1}, {15, 258}}","NSSuperview": {"id":"504503506"},"NSEnabled": true,"NSTarget": {"id":"504503506"},"NSAction": "_doScroller:","NSCurValue": 0.59999999999999998,"NSPercent": 0.64500000000000002}},{"class": "NSScroller","id": "1023033300", "objects":{"NSNextResponder": {"id":"504503506"},"NSvFlags": 256,"NSFrame": "{{1, 259}, {462, 15}}","NSSuperview": {"id":"504503506"},"NSEnabled": true,"NSsFlags": 1,"NSTarget": {"id":"504503506"},"NSAction": "_doScroller:","NSPercent": 0.66379310344827591}}]},"NSFrame": "{{447, 48}, {479, 275}}","NSSuperview": {"id":"414427165"},"NSNextKeyView": {"id":"53200817"},"NSsFlags": 242,"NSVScroller": {"id":"938838352"},"NSHScroller": {"id":"1023033300"},"NSContentView": {"id":"53200817"}}}]},"NSFrameSize": "{946, 613}","NSSuperview": {"id":""}}},"NSScreenRect": "{{0, 0}, {1920, 1178}}","NSMaxSize": "{1.79769e+308, 1.79769e+308}"}},{"class": "NSMenu","id": "396145598", "objects":{"NSTitle": "Main Menu","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "502041852", "objects":{"NSMenu": {"id":"396145598"},"NSTitle": "JSApp","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"class": "NSCustomResource","id": "277861762", "objects":{"NSClassName": "NSImage","NSResourceName": "NSMenuCheckmark"}},"NSMixedImage": {"class": "NSCustomResource","id": "420132161", "objects":{"NSClassName": "NSImage","NSResourceName": "NSMenuMixedState"}},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "929908017", "objects":{"NSTitle": "JSApp","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "719413741", "objects":{"NSMenu": {"id":"929908017"},"NSTitle": "About JSApp","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "147013270", "objects":{"NSMenu": {"id":"929908017"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "544446554", "objects":{"NSMenu": {"id":"929908017"},"NSTitle": "Preferences…","NSKeyEquiv": ",","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "455124416", "objects":{"NSMenu": {"id":"929908017"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "493734341", "objects":{"NSMenu": {"id":"929908017"},"NSTitle": "Services","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "218525171", "objects":{"NSTitle": "Services","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[]},"NSName": "_NSServicesMenu"}}}},{"class": "NSMenuItem","id": "646933026", "objects":{"NSMenu": {"id":"929908017"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "843796999", "objects":{"NSMenu": {"id":"929908017"},"NSTitle": "Hide JSApp","NSKeyEquiv": "h","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "61754815", "objects":{"NSMenu": {"id":"929908017"},"NSTitle": "Hide Others","NSKeyEquiv": "h","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "727120825", "objects":{"NSMenu": {"id":"929908017"},"NSTitle": "Show All","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "428803447", "objects":{"NSMenu": {"id":"929908017"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "491412195", "objects":{"NSMenu": {"id":"929908017"},"NSTitle": "Quit JSApp","NSKeyEquiv": "q","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]},"NSName": "_NSAppleMenu"}}}},{"class": "NSMenuItem","id": "475354134", "objects":{"NSMenu": {"id":"396145598"},"NSTitle": "File","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "140258427", "objects":{"NSTitle": "File","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "684393965", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "New","NSKeyEquiv": "n","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "118789126", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Open…","NSKeyEquiv": "o","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "711009244", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Open Recent","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "85259455", "objects":{"NSTitle": "Open Recent","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "620121511", "objects":{"NSMenu": {"id":"85259455"},"NSTitle": "Clear Menu","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]},"NSName": "_NSRecentDocumentsMenu"}}}},{"class": "NSMenuItem","id": "875068603", "objects":{"NSMenu": {"id":"140258427"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "313874609", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Close","NSKeyEquiv": "w","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "594142260", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Save","NSKeyEquiv": "s","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "323858156", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Save As…","NSKeyEquiv": "S","NSKeyEquivModMask": 1179648,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "402382860", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Revert to Saved","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "481018735", "objects":{"NSMenu": {"id":"140258427"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "499319061", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Page Setup...","NSKeyEquiv": "P","NSKeyEquivModMask": 1179648,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSToolTip": ""}},{"class": "NSMenuItem","id": "494801925", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Print…","NSKeyEquiv": "p","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "693213887", "objects":{"NSMenu": {"id":"396145598"},"NSTitle": "Edit","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "26323967", "objects":{"NSTitle": "Edit","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "1062491368", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Undo","NSKeyEquiv": "z","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "766653658", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Redo","NSKeyEquiv": "Z","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "894470039", "objects":{"NSMenu": {"id":"26323967"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "882289911", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Cut","NSKeyEquiv": "x","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "108407587", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Copy","NSKeyEquiv": "c","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "987153865", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Paste","NSKeyEquiv": "v","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "238136692", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Paste and Match Style","NSKeyEquiv": "V","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "567593746", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Delete","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "212764814", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Select All","NSKeyEquiv": "a","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "419879483", "objects":{"NSMenu": {"id":"26323967"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "573155596", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Find","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "50713213", "objects":{"NSTitle": "Find","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "547150631", "objects":{"NSMenu": {"id":"50713213"},"NSTitle": "Find…","NSKeyEquiv": "f","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 1}},{"class": "NSMenuItem","id": "710177711", "objects":{"NSMenu": {"id":"50713213"},"NSTitle": "Find Next","NSKeyEquiv": "g","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 2}},{"class": "NSMenuItem","id": "840494879", "objects":{"NSMenu": {"id":"50713213"},"NSTitle": "Find Previous","NSKeyEquiv": "G","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 3}},{"class": "NSMenuItem","id": "748324225", "objects":{"NSMenu": {"id":"50713213"},"NSTitle": "Use Selection for Find","NSKeyEquiv": "e","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 7}},{"class": "NSMenuItem","id": "1017125445", "objects":{"NSMenu": {"id":"50713213"},"NSTitle": "Jump to Selection","NSKeyEquiv": "j","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "32515025", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Spelling and Grammar","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "499920755", "objects":{"NSTitle": "Spelling","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "882984624", "objects":{"NSMenu": {"id":"499920755"},"NSTitle": "Show Spelling and Grammar","NSKeyEquiv": ":","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "664256261", "objects":{"NSMenu": {"id":"499920755"},"NSTitle": "Check Document Now","NSKeyEquiv": ";","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "277876898", "objects":{"NSMenu": {"id":"499920755"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "707578430", "objects":{"NSMenu": {"id":"499920755"},"NSTitle": "Check Spelling While Typing","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "428750252", "objects":{"NSMenu": {"id":"499920755"},"NSTitle": "Check Grammar With Spelling","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "363312713", "objects":{"NSMenu": {"id":"499920755"},"NSTitle": "Correct Spelling Automatically","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "925479430", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Substitutions","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "36288778", "objects":{"NSTitle": "Substitutions","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "882086962", "objects":{"NSMenu": {"id":"36288778"},"NSTitle": "Show Substitutions","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "491421895", "objects":{"NSMenu": {"id":"36288778"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "189206921", "objects":{"NSMenu": {"id":"36288778"},"NSTitle": "Smart Copy/Paste","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "1030351354", "objects":{"NSMenu": {"id":"36288778"},"NSTitle": "Smart Quotes","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "491645350", "objects":{"NSMenu": {"id":"36288778"},"NSTitle": "Smart Dashes","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "218154558", "objects":{"NSMenu": {"id":"36288778"},"NSTitle": "Smart Links","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "1062365657", "objects":{"NSMenu": {"id":"36288778"},"NSTitle": "Data Detectors","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "354238611", "objects":{"NSMenu": {"id":"36288778"},"NSTitle": "Text Replacement","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "1073520368", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Transformations","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "182677269", "objects":{"NSTitle": "Transformations","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "228222622", "objects":{"NSMenu": {"id":"182677269"},"NSTitle": "Make Upper Case","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "1064576491", "objects":{"NSMenu": {"id":"182677269"},"NSTitle": "Make Lower Case","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "221720946", "objects":{"NSMenu": {"id":"182677269"},"NSTitle": "Capitalize","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "1044796185", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Speech","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "196866971", "objects":{"NSTitle": "Speech","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "558426415", "objects":{"NSMenu": {"id":"196866971"},"NSTitle": "Start Speaking","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "434484761", "objects":{"NSMenu": {"id":"196866971"},"NSTitle": "Stop Speaking","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}}]}}}}},{"class": "NSMenuItem","id": "857536504", "objects":{"NSMenu": {"id":"396145598"},"NSTitle": "Format","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "228002546", "objects":{"NSTitle": "Format","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "609792061", "objects":{"NSMenu": {"id":"228002546"},"NSTitle": "Font","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "565148168", "objects":{"NSTitle": "Font","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "643620124", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Show Fonts","NSKeyEquiv": "t","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "61046026", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Bold","NSKeyEquiv": "b","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 2}},{"class": "NSMenuItem","id": "233505564", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Italic","NSKeyEquiv": "i","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 1}},{"class": "NSMenuItem","id": "162604386", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Underline","NSKeyEquiv": "u","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "161800526", "objects":{"NSMenu": {"id":"565148168"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "14981393", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Bigger","NSKeyEquiv": "+","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 3}},{"class": "NSMenuItem","id": "516934468", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Smaller","NSKeyEquiv": "-","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 4}},{"class": "NSMenuItem","id": "391747350", "objects":{"NSMenu": {"id":"565148168"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "361602393", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Kern","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "129191325", "objects":{"NSTitle": "Kern","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "61462663", "objects":{"NSMenu": {"id":"129191325"},"NSTitle": "Use Default","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "957493733", "objects":{"NSMenu": {"id":"129191325"},"NSTitle": "Use None","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "936113629", "objects":{"NSMenu": {"id":"129191325"},"NSTitle": "Tighten","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "635885426", "objects":{"NSMenu": {"id":"129191325"},"NSTitle": "Loosen","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "25523273", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Ligature","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "835348817", "objects":{"NSTitle": "Ligature","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "180250789", "objects":{"NSMenu": {"id":"835348817"},"NSTitle": "Use Default","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "568143876", "objects":{"NSMenu": {"id":"835348817"},"NSTitle": "Use None","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "573379050", "objects":{"NSMenu": {"id":"835348817"},"NSTitle": "Use All","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "818558147", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Baseline","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "183858689", "objects":{"NSTitle": "Baseline","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "644154219", "objects":{"NSMenu": {"id":"183858689"},"NSTitle": "Use Default","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "614557663", "objects":{"NSMenu": {"id":"183858689"},"NSTitle": "Superscript","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "774392049", "objects":{"NSMenu": {"id":"183858689"},"NSTitle": "Subscript","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "892001032", "objects":{"NSMenu": {"id":"183858689"},"NSTitle": "Raise","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "1068179975", "objects":{"NSMenu": {"id":"183858689"},"NSTitle": "Lower","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "890899662", "objects":{"NSMenu": {"id":"565148168"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "644140682", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Show Colors","NSKeyEquiv": "C","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "671545876", "objects":{"NSMenu": {"id":"565148168"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "397166321", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Copy Style","NSKeyEquiv": "c","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "215340233", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Paste Style","NSKeyEquiv": "v","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]},"NSName": "_NSFontMenu"}}}},{"class": "NSMenuItem","id": "43690407", "objects":{"NSMenu": {"id":"228002546"},"NSTitle": "Text","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "975825102", "objects":{"NSTitle": "Text","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "792316364", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Align Left","NSKeyEquiv": "{","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "596561657", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Center","NSKeyEquiv": "|","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "872570229", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Justify","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "766796088", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Align Right","NSKeyEquiv": "}","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "851747333", "objects":{"NSMenu": {"id":"975825102"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "981059996", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Writing Direction","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "906599697", "objects":{"NSTitle": "Writing Direction","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "1041729520", "objects":{"NSMenu": {"id":"906599697"},"NSIsDisabled": true,"NSTitle": "Paragraph","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "137407739", "objects":{"NSMenu": {"id":"906599697"},"NSTitle": "CURlZmF1bHQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "408911759", "objects":{"NSMenu": {"id":"906599697"},"NSTitle": "CUxlZnQgdG8gUmlnaHQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "398110396", "objects":{"NSMenu": {"id":"906599697"},"NSTitle": "CVJpZ2h0IHRvIExlZnQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "175409192", "objects":{"NSMenu": {"id":"906599697"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "76364711", "objects":{"NSMenu": {"id":"906599697"},"NSIsDisabled": true,"NSTitle": "Selection","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "235507009", "objects":{"NSMenu": {"id":"906599697"},"NSTitle": "CURlZmF1bHQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "988306009", "objects":{"NSMenu": {"id":"906599697"},"NSTitle": "CUxlZnQgdG8gUmlnaHQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "160428799", "objects":{"NSMenu": {"id":"906599697"},"NSTitle": "CVJpZ2h0IHRvIExlZnQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "658247071", "objects":{"NSMenu": {"id":"975825102"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "1055412392", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Show Ruler","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "122656406", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Copy Ruler","NSKeyEquiv": "c","NSKeyEquivModMask": 1310720,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "180202457", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Paste Ruler","NSKeyEquiv": "v","NSKeyEquivModMask": 1310720,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}}]}}}}},{"class": "NSMenuItem","id": "713206015", "objects":{"NSMenu": {"id":"396145598"},"NSTitle": "View","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "96939199", "objects":{"NSTitle": "View","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "206668947", "objects":{"NSMenu": {"id":"96939199"},"NSTitle": "Show Toolbar","NSKeyEquiv": "t","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "825897010", "objects":{"NSMenu": {"id":"96939199"},"NSTitle": "Customize Toolbar…","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "686270510", "objects":{"NSMenu": {"id":"396145598"},"NSTitle": "Window","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "909684463", "objects":{"NSTitle": "Window","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "497312719", "objects":{"NSMenu": {"id":"909684463"},"NSTitle": "Minimize","NSKeyEquiv": "m","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "857636876", "objects":{"NSMenu": {"id":"909684463"},"NSTitle": "Zoom","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "353476913", "objects":{"NSMenu": {"id":"909684463"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "8672285", "objects":{"NSMenu": {"id":"909684463"},"NSTitle": "Bring All to Front","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]},"NSName": "_NSWindowsMenu"}}}},{"class": "NSMenuItem","id": "125320586", "objects":{"NSMenu": {"id":"396145598"},"NSTitle": "Help","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "370522354", "objects":{"NSTitle": "Help","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "972987324", "objects":{"NSMenu": {"id":"370522354"},"NSTitle": "JSApp Help","NSKeyEquiv": "?","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]},"NSName": "_NSHelpMenu"}}}}]},"NSName": "_NSMainMenu"}},{"class": "NSWindowTemplate","id": "678565615", "objects":{"NSWindowStyleMask": 8223,"NSWindowBacking": 2,"NSWindowRect": "{{297, 513}, {480, 270}}","NSWTFlags": 611844096,"NSWindowTitle": "Window","NSWindowClass": "NSPanel","NSViewClass": {"nil":""},"NSWindowContentMaxSize": "{1.79769e+308, 1.79769e+308}","NSWindowView": {"class": "NSView","id": "816702526", "objects":{"NSNextResponder": {"id":""},"NSvFlags": 256,"NSFrameSize": "{480, 270}","NSSuperview": {"id":""}}},"NSScreenRect": "{{0, 0}, {1920, 1178}}","NSMaxSize": "{1.79769e+308, 1.79769e+308}"}},{"class": "NSCustomObject","id": "864649339", "objects":{"NSClassName": "AppController"}}]},"IBDocument.Objects": {"class": "IBObjectContainer","id": "", "objects":{"connectionRecords": {"class": "NSMutableArray","id": "", "objects":[{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "takeDoubleValueFrom:","source": {"id":"257328319"},"destination": {"id":"744995210"}}},"connectionID": 689}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBOutletConnection","id": "", "objects":{"label": "delegate","source": {"id":"1050"},"destination": {"id":"864649339"}}},"connectionID": 691}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "performZoom:","source": {"id":"513744381"},"destination": {"id":"807627904"}}},"connectionID": 696}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBOutletConnection","id": "", "objects":{"label": "delegate","source": {"id":"1005146759"},"destination": {"id":"864649339"}}},"connectionID": 707}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBOutletConnection","id": "", "objects":{"label": "dataSource","source": {"id":"1005146759"},"destination": {"id":"864649339"}}},"connectionID": 708}}]},"objectRecords": {"class": "IBMutableOrderedSet","id": "", "objects":{"orderedObjects": {"class": "NSArray","id": "", "objects":[{"class": "IBObjectRecord","id": "", "objects":{"objectID": 0,"object": {"id":"0"},"children": {"id":"1048"},"parent": {"nil":""}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": -2,"object": {"id":"1021"},"parent": {"id":"0"},"objectName": "File's Owner"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": -1,"object": {"id":"1014"},"parent": {"id":"0"},"objectName": "First Responder"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": -3,"object": {"id":"1050"},"parent": {"id":"0"},"objectName": "Application"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 367,"object": {"id":"513744381"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"414427165"}]},"parent": {"id":"0"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 368,"object": {"id":"414427165"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"511023663"},{"id":"142462336"},{"id":"780169108"},{"id":"807627904"},{"id":"947043007"},{"id":"481053202"},{"id":"257328319"},{"id":"577562334"},{"id":"561516135"},{"id":"790695465"},{"id":"744995210"},{"id":"1037334765"},{"id":"669360788"},{"id":"26314878"},{"id":"504503506"}]},"parent": {"id":"513744381"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 373,"object": {"id":"163992474"},"parent": {"id":"0"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 451,"object": {"id":"807627904"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"281914322"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 452,"object": {"id":"281914322"},"parent": {"id":"807627904"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 453,"object": {"id":"947043007"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"775301662"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 454,"object": {"id":"775301662"},"parent": {"id":"947043007"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 455,"object": {"id":"481053202"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"228939928"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 456,"object": {"id":"228939928"},"parent": {"id":"481053202"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 457,"object": {"id":"257328319"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"829387278"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 458,"object": {"id":"829387278"},"parent": {"id":"257328319"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 463,"object": {"id":"780169108"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"146314554"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 464,"object": {"id":"146314554"},"parent": {"id":"780169108"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 467,"object": {"id":"511023663"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"388353698"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 468,"object": {"id":"388353698"},"parent": {"id":"511023663"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 471,"object": {"id":"142462336"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"100568012"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 472,"object": {"id":"100568012"},"parent": {"id":"142462336"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 473,"object": {"id":"577562334"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"671756545"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 474,"object": {"id":"790695465"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"561385561"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 476,"object": {"id":"561516135"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"79065924"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 477,"object": {"id":"79065924"},"parent": {"id":"561516135"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 479,"object": {"id":"561385561"},"parent": {"id":"790695465"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 480,"object": {"id":"671756545"},"parent": {"id":"577562334"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 501,"object": {"id":"744995210"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"160495813"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 502,"object": {"id":"160495813"},"parent": {"id":"744995210"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 503,"object": {"id":"1037334765"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"685186056"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 504,"object": {"id":"685186056"},"parent": {"id":"1037334765"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 509,"object": {"id":"669360788"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"859234033"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 510,"object": {"id":"859234033"},"parent": {"id":"669360788"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 541,"object": {"id":"396145598"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"693213887"},{"id":"857536504"},{"id":"713206015"},{"id":"475354134"},{"id":"125320586"},{"id":"502041852"},{"id":"686270510"}]},"parent": {"id":"0"},"objectName": "Main Menu"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 542,"object": {"id":"693213887"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"26323967"}]},"parent": {"id":"396145598"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 543,"object": {"id":"857536504"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"228002546"}]},"parent": {"id":"396145598"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 544,"object": {"id":"713206015"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"96939199"}]},"parent": {"id":"396145598"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 545,"object": {"id":"475354134"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"140258427"}]},"parent": {"id":"396145598"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 546,"object": {"id":"125320586"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"370522354"}]},"parent": {"id":"396145598"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 547,"object": {"id":"502041852"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"929908017"}]},"parent": {"id":"396145598"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 548,"object": {"id":"686270510"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"909684463"}]},"parent": {"id":"396145598"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 549,"object": {"id":"909684463"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"497312719"},{"id":"857636876"},{"id":"8672285"},{"id":"353476913"}]},"parent": {"id":"686270510"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 550,"object": {"id":"497312719"},"parent": {"id":"909684463"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 551,"object": {"id":"857636876"},"parent": {"id":"909684463"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 552,"object": {"id":"8672285"},"parent": {"id":"909684463"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 553,"object": {"id":"353476913"},"parent": {"id":"909684463"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 554,"object": {"id":"929908017"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"61754815"},{"id":"428803447"},{"id":"493734341"},{"id":"147013270"},{"id":"455124416"},{"id":"544446554"},{"id":"646933026"},{"id":"491412195"},{"id":"727120825"},{"id":"843796999"},{"id":"719413741"}]},"parent": {"id":"502041852"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 555,"object": {"id":"61754815"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 556,"object": {"id":"428803447"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 557,"object": {"id":"493734341"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"218525171"}]},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 558,"object": {"id":"147013270"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 559,"object": {"id":"455124416"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 560,"object": {"id":"544446554"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 561,"object": {"id":"646933026"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 562,"object": {"id":"491412195"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 563,"object": {"id":"727120825"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 564,"object": {"id":"843796999"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 565,"object": {"id":"719413741"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 566,"object": {"id":"218525171"},"parent": {"id":"493734341"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 567,"object": {"id":"370522354"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"972987324"}]},"parent": {"id":"125320586"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 568,"object": {"id":"972987324"},"parent": {"id":"370522354"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 569,"object": {"id":"140258427"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"481018735"},{"id":"402382860"},{"id":"875068603"},{"id":"313874609"},{"id":"499319061"},{"id":"711009244"},{"id":"684393965"},{"id":"118789126"},{"id":"494801925"},{"id":"323858156"},{"id":"594142260"}]},"parent": {"id":"475354134"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 570,"object": {"id":"481018735"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 571,"object": {"id":"402382860"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 572,"object": {"id":"875068603"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 573,"object": {"id":"313874609"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 574,"object": {"id":"499319061"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 575,"object": {"id":"711009244"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"85259455"}]},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 576,"object": {"id":"684393965"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 577,"object": {"id":"118789126"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 578,"object": {"id":"494801925"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 579,"object": {"id":"323858156"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 580,"object": {"id":"594142260"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 581,"object": {"id":"85259455"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"620121511"}]},"parent": {"id":"711009244"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 582,"object": {"id":"620121511"},"parent": {"id":"85259455"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 583,"object": {"id":"96939199"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"825897010"},{"id":"206668947"}]},"parent": {"id":"713206015"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 584,"object": {"id":"825897010"},"parent": {"id":"96939199"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 585,"object": {"id":"206668947"},"parent": {"id":"96939199"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 586,"object": {"id":"228002546"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"43690407"},{"id":"609792061"}]},"parent": {"id":"857536504"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 587,"object": {"id":"43690407"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"975825102"}]},"parent": {"id":"228002546"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 588,"object": {"id":"609792061"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"565148168"}]},"parent": {"id":"228002546"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 589,"object": {"id":"565148168"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"215340233"},{"id":"397166321"},{"id":"671545876"},{"id":"644140682"},{"id":"890899662"},{"id":"818558147"},{"id":"25523273"},{"id":"361602393"},{"id":"391747350"},{"id":"516934468"},{"id":"14981393"},{"id":"161800526"},{"id":"162604386"},{"id":"233505564"},{"id":"61046026"},{"id":"643620124"}]},"parent": {"id":"609792061"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 590,"object": {"id":"215340233"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 591,"object": {"id":"397166321"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 592,"object": {"id":"671545876"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 593,"object": {"id":"644140682"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 594,"object": {"id":"890899662"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 595,"object": {"id":"818558147"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"183858689"}]},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 596,"object": {"id":"25523273"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"835348817"}]},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 597,"object": {"id":"361602393"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"129191325"}]},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 598,"object": {"id":"391747350"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 599,"object": {"id":"516934468"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 600,"object": {"id":"14981393"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 601,"object": {"id":"161800526"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 602,"object": {"id":"162604386"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 603,"object": {"id":"233505564"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 604,"object": {"id":"61046026"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 605,"object": {"id":"643620124"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 606,"object": {"id":"129191325"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"635885426"},{"id":"936113629"},{"id":"957493733"},{"id":"61462663"}]},"parent": {"id":"361602393"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 607,"object": {"id":"635885426"},"parent": {"id":"129191325"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 608,"object": {"id":"936113629"},"parent": {"id":"129191325"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 609,"object": {"id":"957493733"},"parent": {"id":"129191325"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 610,"object": {"id":"61462663"},"parent": {"id":"129191325"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 611,"object": {"id":"835348817"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"573379050"},{"id":"568143876"},{"id":"180250789"}]},"parent": {"id":"25523273"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 612,"object": {"id":"573379050"},"parent": {"id":"835348817"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 613,"object": {"id":"568143876"},"parent": {"id":"835348817"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 614,"object": {"id":"180250789"},"parent": {"id":"835348817"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 615,"object": {"id":"183858689"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"1068179975"},{"id":"892001032"},{"id":"774392049"},{"id":"614557663"},{"id":"644154219"}]},"parent": {"id":"818558147"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 616,"object": {"id":"1068179975"},"parent": {"id":"183858689"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 617,"object": {"id":"892001032"},"parent": {"id":"183858689"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 618,"object": {"id":"774392049"},"parent": {"id":"183858689"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 619,"object": {"id":"614557663"},"parent": {"id":"183858689"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 620,"object": {"id":"644154219"},"parent": {"id":"183858689"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 621,"object": {"id":"975825102"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"981059996"},{"id":"658247071"},{"id":"180202457"},{"id":"122656406"},{"id":"1055412392"},{"id":"851747333"},{"id":"766796088"},{"id":"872570229"},{"id":"596561657"},{"id":"792316364"}]},"parent": {"id":"43690407"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 622,"object": {"id":"981059996"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"906599697"}]},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 623,"object": {"id":"658247071"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 624,"object": {"id":"180202457"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 625,"object": {"id":"122656406"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 626,"object": {"id":"1055412392"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 627,"object": {"id":"851747333"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 628,"object": {"id":"766796088"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 629,"object": {"id":"872570229"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 630,"object": {"id":"596561657"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 631,"object": {"id":"792316364"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 632,"object": {"id":"906599697"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"160428799"},{"id":"988306009"},{"id":"235507009"},{"id":"175409192"},{"id":"76364711"},{"id":"398110396"},{"id":"408911759"},{"id":"137407739"},{"id":"1041729520"}]},"parent": {"id":"981059996"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 633,"object": {"id":"160428799"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 634,"object": {"id":"988306009"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 635,"object": {"id":"235507009"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 636,"object": {"id":"175409192"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 637,"object": {"id":"76364711"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 638,"object": {"id":"398110396"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 639,"object": {"id":"408911759"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 640,"object": {"id":"137407739"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 641,"object": {"id":"1041729520"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 642,"object": {"id":"26323967"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"1044796185"},{"id":"1073520368"},{"id":"925479430"},{"id":"32515025"},{"id":"573155596"},{"id":"419879483"},{"id":"212764814"},{"id":"567593746"},{"id":"238136692"},{"id":"987153865"},{"id":"108407587"},{"id":"882289911"},{"id":"894470039"},{"id":"766653658"},{"id":"1062491368"}]},"parent": {"id":"693213887"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 643,"object": {"id":"1044796185"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"196866971"}]},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 644,"object": {"id":"1073520368"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"182677269"}]},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 645,"object": {"id":"925479430"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"36288778"}]},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 646,"object": {"id":"32515025"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"499920755"}]},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 647,"object": {"id":"573155596"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"50713213"}]},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 648,"object": {"id":"419879483"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 649,"object": {"id":"212764814"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 650,"object": {"id":"567593746"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 651,"object": {"id":"238136692"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 652,"object": {"id":"987153865"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 653,"object": {"id":"108407587"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 654,"object": {"id":"882289911"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 655,"object": {"id":"894470039"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 656,"object": {"id":"766653658"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 657,"object": {"id":"1062491368"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 658,"object": {"id":"50713213"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"1017125445"},{"id":"748324225"},{"id":"840494879"},{"id":"710177711"},{"id":"547150631"}]},"parent": {"id":"573155596"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 659,"object": {"id":"1017125445"},"parent": {"id":"50713213"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 660,"object": {"id":"748324225"},"parent": {"id":"50713213"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 661,"object": {"id":"840494879"},"parent": {"id":"50713213"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 662,"object": {"id":"710177711"},"parent": {"id":"50713213"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 663,"object": {"id":"547150631"},"parent": {"id":"50713213"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 664,"object": {"id":"499920755"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"363312713"},{"id":"428750252"},{"id":"707578430"},{"id":"277876898"},{"id":"664256261"},{"id":"882984624"}]},"parent": {"id":"32515025"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 665,"object": {"id":"363312713"},"parent": {"id":"499920755"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 666,"object": {"id":"428750252"},"parent": {"id":"499920755"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 667,"object": {"id":"707578430"},"parent": {"id":"499920755"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 668,"object": {"id":"277876898"},"parent": {"id":"499920755"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 669,"object": {"id":"664256261"},"parent": {"id":"499920755"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 670,"object": {"id":"882984624"},"parent": {"id":"499920755"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 671,"object": {"id":"36288778"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"354238611"},{"id":"1062365657"},{"id":"218154558"},{"id":"491645350"},{"id":"1030351354"},{"id":"189206921"},{"id":"491421895"},{"id":"882086962"}]},"parent": {"id":"925479430"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 672,"object": {"id":"354238611"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 673,"object": {"id":"1062365657"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 674,"object": {"id":"218154558"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 675,"object": {"id":"491645350"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 676,"object": {"id":"1030351354"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 677,"object": {"id":"189206921"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 678,"object": {"id":"491421895"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 679,"object": {"id":"882086962"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 680,"object": {"id":"182677269"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"221720946"},{"id":"1064576491"},{"id":"228222622"}]},"parent": {"id":"1073520368"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 681,"object": {"id":"221720946"},"parent": {"id":"182677269"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 682,"object": {"id":"1064576491"},"parent": {"id":"182677269"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 683,"object": {"id":"228222622"},"parent": {"id":"182677269"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 684,"object": {"id":"196866971"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"434484761"},{"id":"558426415"}]},"parent": {"id":"1044796185"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 685,"object": {"id":"434484761"},"parent": {"id":"196866971"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 686,"object": {"id":"558426415"},"parent": {"id":"196866971"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 687,"object": {"id":"678565615"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"816702526"}]},"parent": {"id":"0"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 688,"object": {"id":"816702526"},"parent": {"id":"678565615"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 690,"object": {"id":"864649339"},"parent": {"id":"0"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 697,"object": {"id":"26314878"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"531044569"},{"id":"194213946"},{"id":"1005146759"},{"id":"690404805"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 698,"object": {"id":"531044569"},"parent": {"id":"26314878"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 699,"object": {"id":"194213946"},"parent": {"id":"26314878"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 700,"object": {"id":"1005146759"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"363505399"},{"id":"460047902"}]},"parent": {"id":"26314878"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 701,"object": {"id":"690404805"},"parent": {"id":"26314878"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 702,"object": {"id":"363505399"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"551760288"}]},"parent": {"id":"1005146759"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 703,"object": {"id":"460047902"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"331608437"}]},"parent": {"id":"1005146759"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 704,"object": {"id":"331608437"},"parent": {"id":"460047902"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 705,"object": {"id":"551760288"},"parent": {"id":"363505399"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 709,"object": {"id":"504503506"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"938838352"},{"id":"1023033300"},{"id":"873484780"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 710,"object": {"id":"938838352"},"parent": {"id":"504503506"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 711,"object": {"id":"1023033300"},"parent": {"id":"504503506"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 712,"object": {"id":"873484780"},"parent": {"id":"504503506"}}}]}}},"flattenedProperties": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"class": "NSArray","id": "", "objects":["-3.IBPluginDependency","367.IBEditorWindowLastContentRect","367.IBPluginDependency","367.IBWindowTemplateEditedContentRect","367.NSWindowTemplate.visibleAtLaunch","367.editorWindowContentRectSynchronizationRect","368.IBPluginDependency","451.IBPluginDependency","452.IBPluginDependency","453.IBPluginDependency","454.IBPluginDependency","455.IBPluginDependency","456.IBPluginDependency","457.IBPluginDependency","458.IBPluginDependency","463.IBPluginDependency","464.IBPluginDependency","467.IBPluginDependency","468.IBPluginDependency","471.IBPluginDependency","472.IBPluginDependency","473.IBPluginDependency","474.IBPluginDependency","476.IBPluginDependency","477.IBPluginDependency","479.IBPluginDependency","480.IBPluginDependency","501.IBPluginDependency","502.IBPluginDependency","503.IBPluginDependency","504.IBPluginDependency","509.IBPluginDependency","510.IBPluginDependency","541.IBEditorWindowLastContentRect","541.IBPluginDependency","541.ImportedFromIB2","541.WindowOrigin","541.editorWindowContentRectSynchronizationRect","542.IBPluginDependency","543.IBPluginDependency","544.IBPluginDependency","545.IBPluginDependency","545.ImportedFromIB2","546.IBPluginDependency","546.ImportedFromIB2","547.IBPluginDependency","547.ImportedFromIB2","548.IBPluginDependency","548.ImportedFromIB2","549.IBEditorWindowLastContentRect","549.IBPluginDependency","549.ImportedFromIB2","549.editorWindowContentRectSynchronizationRect","550.IBPluginDependency","550.ImportedFromIB2","551.IBPluginDependency","551.ImportedFromIB2","552.IBPluginDependency","552.ImportedFromIB2","553.IBPluginDependency","553.ImportedFromIB2","554.IBEditorWindowLastContentRect","554.IBPluginDependency","554.ImportedFromIB2","554.editorWindowContentRectSynchronizationRect","555.IBPluginDependency","555.ImportedFromIB2","556.IBPluginDependency","556.ImportedFromIB2","557.IBPluginDependency","557.ImportedFromIB2","558.IBPluginDependency","558.ImportedFromIB2","559.IBPluginDependency","559.ImportedFromIB2","560.IBPluginDependency","560.ImportedFromIB2","561.IBPluginDependency","561.ImportedFromIB2","562.IBPluginDependency","562.ImportedFromIB2","563.IBPluginDependency","563.ImportedFromIB2","564.IBPluginDependency","564.ImportedFromIB2","565.IBPluginDependency","565.ImportedFromIB2","566.IBEditorWindowLastContentRect","566.IBPluginDependency","566.ImportedFromIB2","566.editorWindowContentRectSynchronizationRect","567.IBEditorWindowLastContentRect","567.IBPluginDependency","567.ImportedFromIB2","567.editorWindowContentRectSynchronizationRect","568.IBPluginDependency","568.ImportedFromIB2","569.IBEditorWindowLastContentRect","569.IBPluginDependency","569.ImportedFromIB2","569.editorWindowContentRectSynchronizationRect","570.IBPluginDependency","570.ImportedFromIB2","571.IBPluginDependency","571.ImportedFromIB2","572.IBPluginDependency","572.ImportedFromIB2","573.IBPluginDependency","573.ImportedFromIB2","574.IBPluginDependency","574.ImportedFromIB2","575.IBPluginDependency","575.ImportedFromIB2","576.IBPluginDependency","576.ImportedFromIB2","577.IBPluginDependency","577.ImportedFromIB2","578.IBPluginDependency","578.ImportedFromIB2","579.IBPluginDependency","579.ImportedFromIB2","580.IBPluginDependency","580.ImportedFromIB2","581.IBEditorWindowLastContentRect","581.IBPluginDependency","581.ImportedFromIB2","581.editorWindowContentRectSynchronizationRect","582.IBPluginDependency","582.ImportedFromIB2","583.IBEditorWindowLastContentRect","583.IBPluginDependency","583.editorWindowContentRectSynchronizationRect","584.IBPluginDependency","585.IBPluginDependency","586.IBEditorWindowLastContentRect","586.IBPluginDependency","587.IBPluginDependency","588.IBPluginDependency","589.IBPluginDependency","590.IBPluginDependency","591.IBPluginDependency","592.IBPluginDependency","593.IBPluginDependency","594.IBPluginDependency","595.IBPluginDependency","596.IBPluginDependency","597.IBPluginDependency","598.IBPluginDependency","599.IBPluginDependency","600.IBPluginDependency","601.IBPluginDependency","602.IBPluginDependency","603.IBPluginDependency","604.IBPluginDependency","605.IBPluginDependency","606.IBPluginDependency","607.IBPluginDependency","608.IBPluginDependency","609.IBPluginDependency","610.IBPluginDependency","611.IBPluginDependency","612.IBPluginDependency","613.IBPluginDependency","614.IBPluginDependency","615.IBPluginDependency","616.IBPluginDependency","617.IBPluginDependency","618.IBPluginDependency","619.IBPluginDependency","620.IBPluginDependency","621.IBEditorWindowLastContentRect","621.IBPluginDependency","622.IBPluginDependency","623.IBPluginDependency","624.IBPluginDependency","625.IBPluginDependency","626.IBPluginDependency","627.IBPluginDependency","628.IBPluginDependency","629.IBPluginDependency","630.IBPluginDependency","631.IBPluginDependency","632.IBEditorWindowLastContentRect","632.IBPluginDependency","633.IBPluginDependency","634.IBPluginDependency","635.IBPluginDependency","636.IBPluginDependency","637.IBPluginDependency","638.IBPluginDependency","639.IBPluginDependency","640.IBPluginDependency","641.IBPluginDependency","642.IBEditorWindowLastContentRect","642.IBPluginDependency","643.IBPluginDependency","644.IBPluginDependency","645.IBPluginDependency","646.IBPluginDependency","647.IBPluginDependency","648.IBPluginDependency","649.IBPluginDependency","650.IBPluginDependency","651.IBPluginDependency","652.IBPluginDependency","653.IBPluginDependency","654.IBPluginDependency","655.IBPluginDependency","656.IBPluginDependency","657.IBPluginDependency","658.IBPluginDependency","659.IBPluginDependency","660.IBPluginDependency","661.IBPluginDependency","662.IBPluginDependency","663.IBPluginDependency","664.IBPluginDependency","665.IBPluginDependency","666.IBPluginDependency","667.IBPluginDependency","668.IBPluginDependency","669.IBPluginDependency","670.IBPluginDependency","671.IBEditorWindowLastContentRect","671.IBPluginDependency","672.IBPluginDependency","673.IBPluginDependency","674.IBPluginDependency","675.IBPluginDependency","676.IBPluginDependency","677.IBPluginDependency","678.IBPluginDependency","679.IBPluginDependency","680.IBEditorWindowLastContentRect","680.IBPluginDependency","681.IBPluginDependency","682.IBPluginDependency","683.IBPluginDependency","684.IBPluginDependency","685.IBPluginDependency","686.IBPluginDependency","687.IBEditorWindowLastContentRect","687.IBPluginDependency","687.IBWindowTemplateEditedContentRect","687.NSWindowTemplate.visibleAtLaunch","688.IBPluginDependency","697.IBPluginDependency","698.IBPluginDependency","699.IBPluginDependency","700.IBPluginDependency","701.IBPluginDependency","702.IBPluginDependency","703.IBPluginDependency","704.IBPluginDependency","705.IBPluginDependency","709.IBPluginDependency","710.IBPluginDependency","711.IBPluginDependency","712.IBPluginDependency"]},"dict.values": {"class": "NSMutableArray","id": "", "objects":["com.apple.InterfaceBuilder.CocoaPlugin","{{37, 138}, {946, 613}}","com.apple.InterfaceBuilder.CocoaPlugin","{{37, 138}, {946, 613}}",1,"{{11, 666}, {480, 270}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{309, 1136}, {478, 20}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{74, 862}","{{11, 977}, {478, 20}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"{{447, 673}, {197, 73}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{525, 802}, {197, 73}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"{{334, 562}, {242, 183}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{23, 794}, {245, 183}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"{{531, 606}, {64, 6}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{436, 809}, {64, 6}}","{{739, 722}, {213, 23}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{596, 852}, {216, 23}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{466, 542}, {196, 203}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{323, 672}, {199, 203}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"{{617, 609}, {132, 23}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{522, 812}, {146, 23}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{397, 703}, {234, 43}}","com.apple.InterfaceBuilder.CocoaPlugin","{{475, 832}, {234, 43}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{552, 702}, {83, 43}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{635, 542}, {204, 183}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{839, 462}, {164, 173}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{508, 462}, {254, 283}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{762, 372}, {182, 153}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{762, 442}, {170, 63}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{297, 489}, {480, 270}}","com.apple.InterfaceBuilder.CocoaPlugin","{{297, 489}, {480, 270}}",,"com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin"]}}},"unlocalizedProperties": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"id":"0"},"dict.values": {"class": "NSMutableArray","id": "", "objects":[]}}},"activeLocalization": {"nil":""},"localizations": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"id":"0"},"dict.values": {"class": "NSMutableArray","id": "", "objects":[]}}},"sourceID": {"nil":""},"maxID": 712}},"IBDocument.Classes": {"class": "IBClassDescriber","id": "", "objects":{}},"IBDocument.localizationMode": 0,"IBDocument.PluginDeclaredDependencies": {"class": "NSMutableDictionary","id": "", "objects":{"NS.key.0": "com.apple.InterfaceBuilder.CocoaPlugin.macosx","NS.object.0": 1050}},"IBDocument.PluginDeclaredDevelopmentDependencies": {"class": "NSMutableDictionary","id": "", "objects":{"NS.key.0": "com.apple.InterfaceBuilder.CocoaPlugin.InterfaceBuilder3","NS.object.0": 3000}},"IBDocument.PluginDeclaredDependenciesTrackSystemTargetVersion": true,"IBDocument.LastKnownRelativeProjectPath": {"nil":""},"IBDocument.defaultPropertyAccessControl": 3}}};