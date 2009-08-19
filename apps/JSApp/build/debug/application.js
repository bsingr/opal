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

if (typeof console === 'undefined') {
  var console = console || window.console || { };
  console.log = console.info = console.warn = console.error = function() { };
}

var VN = { };
/* 
 * default_options.js
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


VN.OptionsHash = function() {
  
  this.values = { };
  
  /**
    Removes all the key-value pairs from the dictionary
  */
  this.clear = function() {
    this.values = { };
  };
  
  /**
    Merges the passed object into this one
    
    @param {Object} obj
    @returns VN.defaultOptions this
  */
  this.merge = function(obj) {
    for (prop in obj)
      this.values[prop] = obj[prop];
    
    return this;
  };
  
  /**
    Removes the key/value pair from the hash and returns the value, should it
    be needed
    
    @param {VN.String} key
    @returns Object
  */
  this.remove = function(key) {
    if (this.values[key]) {
      var theProp = this.values[key];
      delete this.values[key];
      return theProp;
    }
    return null;
  };
  
  /**
    Enumerates every key/value pair so that it returns them for use as a 
    function, e.g.
    
    {{{
      myHash.each(function(key, value) {
        console.log(key + ' value is ' + value);
      });
    }}}
  */
  this.each = function(closure) {
    for (prop in this.values) {
      closure(prop, this.values[prop]);
    }
  };
  
  /**
    Same as each, but only the key is passed in the closure
    
    {{{
      myHash.eachKey(function(key) {
        console.log(key + ' value is ' + myHash.get(key);
      });
    }}}
  */
  this.eachKey = function(closure) {
    for (prop in this.values) {
      closure(prop);
    }
  };
  
  /**
    Same as eachKey, but enumerate values
    
    {{{
      myHash.eachValue(function(values) {
        console.log(value);
      });
    }}}
  */
  this.eachValue = function(closure) {
    for (prop in this.values) {
      closure(this.values[prop]);
    }
  };
  
  this.isEmpty = function() {
    
  };
  
  this.fetch = function(key) {
    return this.get(key);
  };
  
  this.hasKey = function(key) {
    return true;
  };
  
  this.replace = function(otherHash) {
    this.values = otherHash;
  };
  
  this.store = function(key, value) {
    this.set(key, value);
  };
  
  this.toString = function() {
    var result = '';
    for (prop in this.values) {
      result += "'" + prop + "': ";
      result += this.values[prop].toString();
    }
    
    return result;
  };
};
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
var VNGraphicsContextDrawDisplayMode  = 1;

VN._currentGuid = 0;

VN.CreateGuid = function() {
  return VN._currentGuid++;
};

VN.$ = function(theElement) {
  return document.getElementById(theElement)
};
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


/**
  Extends the object passed as the first parameter using the properties
  defined in the second argument.
*/
VN.extend = function() {

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


VN.Object = function() {
  return this;
};

VN.protocol = function(props) {
  return this;
};


VN.extend(VN.Object, {
  
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
    VN.extend(this.prototype, props);
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
VN.Object.mixin({
  
  /**
    Default options used in initWithOptions()
  */
  default_options: { },
  
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
    
    this.guid = VN.CreateGuid();
    
    var args = [];
    
    for (var idx = 0; idx < arguments[0].length; idx++) {
      args.push(arguments[0][idx]);
    }
    
    // normal initializer: call init()
    if (args.length == 0) {
      return this.init.apply(this, args);
    } 
    // call initWithOptions()
    else if (typeof args[0] == 'object') {
      var options = new VN.OptionsHash().merge(this.defaultOptions).merge(args[0]);
      var ret = this.initWithOptions(options);
      // need to check if we have been passed a function closure, and if so we
      // need to apply it to this object. TODO: do this.
      return ret;
    }
    // custom initializer: call the first argument, then pass rest as params
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
  
  init_with_options: function(options) {
    console.log('I am initing with some options');
    console.log(options);
    return this;
  },
  
  guid: null,
  
  /**
    Returns true if aName is a callable method name. This is similar to
    respondsToSelector:
  */
  responds_to: function(aName) {
    return (this[aName] && (typeof this[aName] == 'function')) ? true : false;
  },
  
  perform: function(aFunctionName, withObject, anotherObject) {
    if (this.respondsTo(aFunctionName))
      return this[aFunctionName](withObject, anotherObject);
    else
      return null;
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
 

/*
	Exception string used for throwing when an invalid object is used for
	archiving.
*/
VN.INVALID_ARCHIVE_OPERATION_EXCEPTION = "VNInvalidArchiveOperationException";

/*
	Exception thrown when an object cannot be unarchived
*/
VN.INVALID_UNARCHIVE_OPERATION_EXCEPTION ="VNInvalidUnarchiveOperationException";

/*
	@class VN.Coder
	@extend VN.Object
*/
var NSCoder = VN.Coder = VN.Object.extend({
  
});
/* 
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


VN.Array = {
  
  each: function(array) {
    for (var idx = 0; idx < this.length; idx++) {
      array(this[idx]);
    }
  },
  
  map: function(array) {
    var result = [];
    for (var idx = 0; idx < this.length; idx++) {
      result[idx] = array(this[idx]);
    }
    
    return result;
  },
  
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

VN.extend(Array.prototype, VN.Array);

VN.Array.create = function() {
  return [];
};

VN.Array.mixin = function(props) {
  VN.extend(this.prototype, props);
};

var NSMutableArray = NSArray = VN.Array;
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


/*
  @enum NSStringCompareOptions
*/
var NSCaseInsensitiveSearch     = 1;
var NSLiteralSearch         = 2;
var NSBackwardsSearch         = 4;
var NSAnchoredSearch        = 8;
var NSNumericSearch         = 64;
var NSDiacriticInsensitiveSearch  = 128;
var NSWidthInsensitiveSearch    = 256;
var NSForcedOrderingSearch      = 512;

// NSString just mirrors native String object
var NSString = String;

NSString.create = function() {
  return "";
};

NSString.mixin = function(props) {
  VN.extend(this.prototype, props);
};

/*
  @mixin NSString
  @class NSString
*/
NSString.mixin({
  
  capitalize: function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
  },
  
  /*
    @returns Integer
  */
  length: function() {
    return this.length;
  },
  
  /*
    @param {Integer} index
    @returns {NSString}
  */
  characterAtIndex: function(index) {
    
  }
});

NSString.mixin({
 
 typeOf: function(aClass) {
   return aClass == NSString;
 },
 
 capitalizedString: function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
 }
});

/*
  @mixin NSStringExtensionMethods
  @class NSString
*/
NSString.mixin({
  
  /*
    @param {Integer} from
    @returns NSString
  */
  substringFromIndex: function(from) {
    
  },
  
  /*
    @param {Integer} to
    @returns NSString
  */
  substringToIndex: function(to) {
    
  },
  
  /*
    @param {NSRange} range
    @returns NSString
  */
  substringWithRange: function(range) {
    
  },
  
  /*
    @param {NSString} string
    @param {NSStringCompareOptions} mask
    @returns NSComparisonResult
  */
  compareWithOptions: function(string, mask) {
    
  },
  
  /*
    @param {NSString} string
    @param {NSStringCompareOptions} mask
    @param {NSRange} compareRange
    @returns NSComparisonResult
  */
  compareWithOptionsInRange: function(string, mask, compareRange) {
    
  },
  
  /*
    @param {NSString} aString
    @returns Boolean
  */
  isEqualToString: function(aString) {
    
  },
  
  /*
    @param {NSString} aString
    @returns Boolean
  */
  hasPrefix: function(aString) {
    
  },
  
  /*
    @param {NSString} aString
    @returns Boolean
  */
  hasSuffix: function(aString) {
    
  },
  
  
  
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


var NSDictionary = VN.Dictionary = VN.Object.extend({
  
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

VN.Dictionary.create = function(values) {
  var dict = new VN.Dictionary().init();
  for (key in values)
    dict.setObjectForKey(values[key], key);
    
  return dict;
};

/*
  
*/
VN.extend(NSDictionary, {
  
  /*
    @return NSDictionary
  */
  dictionary: function() {
    return this.create();
  },

  /*
    @param {id} anObject
    @param {key} aKey
    @return NSDictionary
  */
  dictionaryWithObjectForKey: function(anObject, aKey) {
    var theDict = this.create();
    theDict.setObjectForKey(anObject, aKey);
    return theDict;
  },
  
  /*
    @param {id} firstObject
    @param ... variable arguments
    @return NSDictionary
  */
  dictionaryWithObjectsAndKeys: function(firstObject) {
    
  },

  /*
    @param {NSDictionary) dict
    @return NSDictionary
  */
  dictionaryWithDictionary: function(dict) {
    
  },
  
  /*
    @param {NSArray} objects
    @param {NSArray} keys
    @return NSDictionary
  */
  dictionaryWithObjectsForKeys: function(objects, keys) {
    var theDict = this.create();
    
    for (var idx = 0; idx < objects.length; idx++)
      theDict.setObjectForKey(objects[idx], keys[idx]);
    
    return theDict;
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
  @class VN.AttributedString
  
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
var NSAttributedString = VN.AttributedString = VN.Object.extend({
   
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


var NSBundleDidLoadNotification   = "NSBundleDidLoadNotification";
var NSLoadedClasses         = "NSLoadedClasses";

var NSBundle = VN.Bundle = NSObject.extend({
  
  principalClass: function() {
		return NSApplication;
	}
});

VN.extend(NSBundle, {
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
  _fileOwner: null,
  
  /**
    @type VN.Dictionary
  */
  nameTable: null,
  
  initForReadingWithData: function(data) {
    this.init();
    this._data = data.archive.data;
    this._rootDict = this._data; //CFPropertyListFromData(this._data.bytes());
    this._contextStack = [];
    this._contextStack.addObject(this._rootDict);
    this._unarchivedObjects = NSDictionary.create();
    this._fileOwner = this.getFileOwner();
    return this;
  },
  
  /**
    Returns the ID for the File's owner. must be a better way to do this...
    
    not in nib's, but carina will have a better system (top level).
    
    @returns {VN.String}
  */
  getFileOwner: function() {
    var rootObjects = this._data['IBDocument.Objects'].objects.objectRecords.objects.orderedObjects.objects;
    for (var idx = 0; idx < rootObjects.length; idx++) {
      if (rootObjects[idx]['objects']['objectName'] == "File's Owner") {
        return rootObjects[idx].objects.object.id;
      }
    }
  },
  
  fileOwner: function() {
    return this._unarchivedObjects.objectForKey(this._fileOwner);
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

    // catch the file owner, and just return it (should already have been)
    if (theObject['class'] == "NSCustomObject" && theObject['id'] == this._fileOwner) {
      var fileOwner = this.nameTable.valueForKey('NSFileOwner')
      this._unarchivedObjects.setObjectForKey(fileOwner, theObject['id']);
      // alert(this.nameTable.valueForKey('NSFileOwner'));
      return fileOwner;
    }
    
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
 * set.js
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
  @class NSSet
  @extends NSObject
*/
var NSSet = NSObject.extend({
  
  /*
    @returns Integer
  */
  count: function() {
    
  },
  
  /*
    @param {id} object
    @returns id
  */
  member: function(object) {
    
  },
  
  /*
    @returns NSEnumerator
  */
  objectEnumerator: function() {
    
  }
});

/*
  @mixin NSExtendedSet
  @class NSSet
*/
NSSet.mixin({
  
  /*
    @returns NSArray
  */
  allObjects: function() {
    
  },
  
  /*
    @returns id
  */
  anyObject: function() {
    
  },
  
  /*
    @param {id} anObject
    @returns Boolean
  */
  containsObject: function(anObject) {
    
  },
  
  /*
    @returns NSString
  */
  description: function() {
    
  },
  
  /*
    @param {id} locale
    @returns NSString
  */
  descriptionWithLocale: function(locale) {
    
  },
  
  /*
    @param {NSSet} otherSet
    @returns Boolean
  */
  intersectsSet: function(otherSet) {
    
  },
  
  /*
    @param {NSSet} otherSet
    @returns Boolean
  */
  isEqualToSet: function(otherSet) {
    
  },
  
  /*
    @param {NSSet} otherSet
    @returns Boolean
  */
  isSubsetOfSet: function(otherSet) {
    
  },
  
  /*
    argument is optional
    
    @param {NSString} aSelector
    @param {id} argument
  */
  makeObjectsPerformSelector: function(aSelector, argument) {
    
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


VN.UNDEFINED_KEY_EXCEPTION = "NSUndefinedKeyException";
VN.AVERAGE_KEY_VALUE_OPERATOR = "NSAverageKeyValueOperator";
VN.COUNT_KEY_VALUE_OPERATOR = "NSCountKeyValueOperator";
VN.DISTINCT_UNION_OF_ARRAYS_KEY_VALUE_OPERATOR = "NSDistinctUnionOfArraysKeyValueOperator";
VN.DISTINT_UNION_OF_OBJECTS_KEY_VALUE_OPERATOR = "NSDistinctUnionOfObjectsKeyValueOperator";
VN.DISTINCT_UNION_OF_SETS_KEY_VALUE_OPERATOR = "NSDistinctUnionOfSetsKeyValueOperator";
VN.MAXIMUM_KEY_VALUE_OPERATOR = "NSMaximumKeyValueOperator";
VN.MINIMUM_KEY_VALUE_OPERATOR = "NSMinimumKeyValueOperator";
VN.SUM_KEY_VALUE_OPERATOR = "NSSumKeyValueOperator";
VN.UNION_OF_ARRAYS_KEY_VALUE_OPERATOR = "NSUnionOfArraysKeyValueOperator";
VN.UNION_OF_OBJECTS_KEY_VALUE_OPERATOR = "NSUnionOfObjectsKeyValueOperator";
VN.UNION_OF_SETS_KEY_VALUE_OPERATOR = "NSUnionOfSetsKeyValueOperator";

/**
  @mixin VN.KeyValueCoding
  @class VN.Object
*/
VN.Object.mixin({
  
  /**
    @param {VN.String} key
    @returns VN.Object
  */
  value_for_key: function(key) {

    // -get<Key>
    var accessor = 'get' + key.capitalize();
    if (this.responds_to(accessor))
      return this.perform(accessor);

    // -<key>
    accessor = key;
    if (this.respons_to(accessor))
      return this.perform(accessor);

    // -is<Key>
    var accessor = 'is' + key.capitalize();
    if (this.responds_to(accessor))
      return this.perform(accessor);

    if (this.access_instance_variables_directly) {
      var theValue;

      // _<key>
      accessor = '_' + key;
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function'))
        return this[accessor];

      // _is<Key>
      accessor = '_is' + key.capitalize();
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function'))
        return this[accessor];

      // <key>
      accessor = key;
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function'))
        return this[accessor];
      
      accessor = 'is' + key.capitalize();
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function'))
        return this[accessor];    
    }
    // if not found
    return this.value_for_undefined_key(key);
  },
  
  get: function(key) {
    return this.value_for_key_path(key);
  },
  
  set: function(key, value) {
    return this.set_value_for_key_path(value, key);
  },
  
  /**
    Sends observer notifications if setting a key was successful. Currently,
    custom setters will not call observer notifications unless they are
    triggered through this custom method. This is a planned feature for the
    v0.1 release once performance measures have been determined.
  
    @param {id} value
    @param {NSString} key
  */
  set_value_for_key: function(value, key) {
    // -set<Key>
    var accessor = 'set' + key.capitalize();
    if (this.responds_to(accessor)) {
      this.will_chnage_value_for_key(key);
      this.perform(accessor, value);
      this.did_change_value_for_key(key);
      return;
    }
    
    if (this.access_instance_variables_directly) {

      // _<key>
      accessor = '_' + key;
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function')) {
        this.will_chnage_value_for_key(key);
        this[accessor] = value;
        this.did_chnage_value_for_key(key);
        return;
      }

      // _is<Key>
      accessorName = '_is' + key.capitalize();
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function')) {
        this.will_chnage_value_for_key(key);
        this[accessor] = value;
        this.did_chnage_value_for_key(key);
        return;
      }

      // <key>
      accessorName = key;
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function')) {
        this.will_chnage_value_for_key(key);
        this[accessor] = value;
        this.did_chnage_value_for_key(key);
        return;
      }
      
      // is<Key>
      accessorName = 'is' + key.capitalize();
      if ((typeof this[accessor] != 'undefined') && (typeof this[accessor] != 'function')) {
        this.will_chnage_value_for_key(key);
        this[accessor] = value;
        this.did_chnage_value_for_key(key);
        return;
      }
    }

    this.set_value_for_undefined_key(value, key);
  },
  
  
  validate_value_for_key: function(value, key, error) {
    
  },
  
  mutable_array_value_for_key: function(key) {
    
  },
  
  /**
    Takes the key path and splits the string into seperate keys. The keys
    are then used to recursively fetcha  value using valueForKey() for the
    returned object at each point. The final value is then returned from
    this function.
    
    @param {NSString} keyPath
    @returns id
  */
  value_for_key_path: function(key_path) {
    var keys = key_path.split('.'), parent = this;
    
    for (var idx = 0; idx < keys.length; idx++) {
      // check if VN.Object, otherwise treet as if Javascript Object
      if (parent['value_for_key_path'] && parent['set_value_for_key_path'])
        parent = parent.value_for_key(keys[idx]);
      else
        parent = parent[keys[idx]];
    }
    
    return parent;
  },
  
  /**
    Splits the key path into keys and recusively does through the chain to 
    set the final destination value to the provided value
    
    @param {id} value
    @param {NSString} keyPath
  */
  set_value_for_key_path: function(value, key_path) {
    var keys = key_path.split('.'), parent = this;
    
    for (var idx = 0; idx < (keys.length - 1); idx++)
      parent = parent.value_for_key(keys[idx]);
    
    console.log(key_path);
    
    parent.set_value_for_key(value, keys[idx++]);
  },
  
  validate_value_for_key_path: function(value, key_path, error) {
    
  },
  
  mutable_array_value_for_key_path: function(key_path) {
    
  },
  
  value_for_undefined_key: function(key) {
    throw "Undefined key was requested from object. '" + key + "'";
  },
  
  set_value_for_undefined_key: function(value, key) {
    console.log(this);
    throw "Undefined key was requested from object for setting. '" + key + "'";
  },
  
  set_nil_value_for_key: function(key) {
    
  },
  
  dictionary_with_values_for_keys: function(keys) {
    
  },
  
  set_values_for_keys_with_dictionary: function(keyed_values) {
    
  },
  
  access_instance_variables_directly: true
});

/**
  @mixin NSKeyValueCoding
  @class NSArray
*/
VN.Array.mixin({
  
  /**
    Returns an array of the result of requesting -valueForKey from each object
    
    @param {VN.String} key
    @returns VN.Array
  */
  value_for_key: function(key) {
    var result = [];
    for (var idx = 0; idx < this.length; idx++)
      result.push(this[idx].value_for_key(key));
    
    return result;
  },
  
  set_value_for_key: function(value, key) {
    
  }
});

/**
  @mixin NSKeyValueCoding
  @class NSDictionary
*/
VN.Dictionary.mixin({
  
  value_for_key: function(key) {
    return this.object_for_key(key);
  },
  
  set_value_for_key: function(value, key) {
    this.set_object_for_key(value, key);
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
 * index_set.js
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
  @class NSIndexSet
  @extends NSObject
*/
var NSIndexSet = VN.IndexSet = VN.Object.extend({
  
  /**
    @type Integer
  */
  _count: null,
  
  /**
    @type NSArray
  */
  _ranges: null,
  
  /**
    @returns NSIndexSet
  */
  init: function() {
    this._super();
    this._count = 0;
    this._ranges = [];
    return this;
  },
  
  /**
    @param {Integer} value
    @returns NSIndexSet
  */
  initWithIndex: function(value) {
    this.init();
    this._count = 1;
    this._ranges.push(NSMakeRange(value, 1));
    return this;
  },
  
  /**
    @param {NSRange} range
    @returns NSIndexSet
  */
  initWithIndexesInRange: function(range) {
    this.init();
    this._count = range.length;
    this._ranges.push(range);
    return this;
  },
  
  /**
    @param {NSIndexSet} indexSet
    @returns NSIndexSet
  */
  initWithIndexSet: function(indexSet) {
    this.init();
    this._count = indexSet.count();
    
    for (var idx = 0; idx < indexSet._ranges.length; idx++)
      this._ranges.push(indexSet._ranges[idx]);
    
    return this;
  },
  
  /**
    @param {NSIndexSet} indexSet
    @returns Boolean
  */
  isEqualToIndexSet: function(indexSet) {
    
  },
  
  /**
    @returns Integer
  */
  count: function() {
    return this._count;
  },
  
  /**
    @returns Integer
  */
  firstIndex: function() {
    var firstIndex = this._ranges[0].location;
    for (var idx = 1; idx < this._ranges.length; idx++) {
      if (this._ranges[idx].location < firstIndex)
        firstIndex = this._ranges[idx].location;
    }
    
    return firstIndex;
  },
  
  /**
    @returns Integer
  */
  lastIndex: function() {
    var lastIndex = this._ranges[0].location + this._ranges[0].length;
    for (var idx = 0; idx < this._ranges.length; idx++) {
      if (this._ranges[idx].location + this._ranges[idx].length > lastIndex)
        lastIndex = this._ranges[idx].location + this._ranges[idx].length;
    }
    
    return lastIndex;
  },
  
  /**
    @param {Integer} value
    @returns Integer
  */
  indexGreaterThanIndex: function(value) {
    
  },
  
  /**
    @param {Integer} value
    @returns Integer
  */
  indexLessThanIndex: function(value) {
    
  },
  
  /**
    @param {Integer} value
    @returns Integer
  */
  indexGreaterThanOrEqualToIndex: function(value) {
    
  },
  
  /**
    @param {Integer} value
    @returns Integer
  */
  indexLessThanOrEqualToIndex: function(value) {
    
  },
  
  /**
    @param {Integer} value
    @returns Boolean
  */
  containsIndex: function(value) {
    return this.containsIndexesInRange(NSMakeRange(value, 1));
  },
  
  /**
    @param {NSRange} range
    @returns Boolean
  */
  containsIndexesInRange: function(range) {
    
    for (var idx = 0; idx < this._ranges.length; idx++) {
      if (this._ranges[idx].location <= range.location && (this._ranges[idx].location + this._ranges[idx].length) >= (range.location + range.length)) {
        return true;
      }
    }
    
    return false;
  },
  
  /**
    @param {NSIndexSet} indexSet
    @returns Boolean
  */
  containsIndexes: function(indexSet) {
    
  },
  
  /**
    @param {NSRange} range
    @returns Boolean
  */
  intersectsIndexesInRange: function(range) {
    
  },
  
  /**
    @param {NSIndexSet} indexSet
  */
  addIndexes: function(indexSet) {
    for (var idx = 0; idx < indexSet._ranges.length; idx++) {
      this.addIndexesInRange(NSMakeRange(indexSet._ranges[idx].location, indexSet._ranges[idx].length));
    }
  },
  
  /**
    @param {NSIndexSet} indexSet
  */
  removeIndexes: function(indexSet) {
    
  },
  
  /**
    
  */
  removeAllIndexes: function() {
    
  },
  
  /**
    @param {Integer} index
  */
  addIndex: function(index) {
    this.addIndexesInRange(NSMakeRange(index, 1));
  },
  
  /**
    @param {Integer} index
  */
  removeIndex: function(index) {
    this.removeIndexesInRange(NSMakeRange(index, 1));
  },
  
  /**
    @param {NSRange} range
  */
  addIndexesInRange: function(range) {
    this._ranges.push(range);
  },
  
  /**
    @param {NSRange} range
  */
  removeIndexesInRange: function(range) {
    
  }
});

/**
  @returns NSIndexSet
*/
VN.IndexSet.indexSet = function() {
  return this.create();
};

/**
  @param {Integer} value
  @returns NSIndexSet
*/
VN.IndexSet.indexSetWithIndex = function(value) {
  return this.create('initWithIndex', value);
};

/**
  @param {NSRange} range
  @returns NSIndexSet
*/
VN.IndexSet.indexSetWithIndexesInRange = function(range) {
  return this.create('initWithIndexesInRange', range);
};
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


/**
  VN.KeyValueObservingOptions
*/

/**
  The new value will be passed in the info dictionary with this key
*/
VN.KEY_VALUE_OBSERVING_OPTION_NEW = 'new';

/**
  The old value will be passed in the info dictionary
*/
VN.KEY_VALUE_OBSERVING_OPTION_OLD = 'old';

/**
  The initial key
*/
VN.KEY_VALUE_OBSERVING_OPTION_INITIAL = 'initial';

/**
  The prior key
*/
VN.KEY_VALUE_OBSERVING_OPTION_PRIOR = 'prior';
                    
// NSKeyValueChange           
var NSKeyValueChangeSetting         = 1;
var NSKeyValueChangeInsertion         = 2;
var NSKeyValueChangeRemoval         = 3;
var NSKeyValueChangeReplacement       = 4;

// NSKeyValueSetMutationKind
var NSKeyValueUnionSetMutation        = 1;
var NSKeyValueMinusSetMutation        = 2;
var NSKeyValueIntersectSetMutation      = 3;
var NSKeyValueSetSetMutation        = 4;

// keys for chnage dictionary
var NSKeyValueChangeKindKey         = "NSKeyValueChangeKindKey"; 
var NSKeyValueChangeNewKey          = "NSKeyValueChangeNewKey";
var NSKeyValueChangeOldKey          = "NSKeyValueChangeOldKey";
var NSKeyValueChangeIndexesKey        = "NSKeyValueChangeIndexesKey";
var NSKeyValueChangeNotificationIsPriorKey  = "NSKeyValueChangeNotificationIsPriorKey";

/**
	@mixin VN.KeyValueObserving
	@class VN.Object
*/
VN.Object.mixin({
  
  /**
    This is used to store a list of observers that are observing this object
    for changes to key values. When a chnage takes place, the observers need
    to be notified.
    
    @type NSArray
  */
  _kvo_observers: NSArray.create(),
  
  /**
    This dictionary maintains a list of "old values" for keys that request 
    to have their old values sent in the info dictionary for observers.
    
    @type VN.Dictionary
  */
  _kvo_oldValues: NSDictionary.create(),
  
	/**
		@param {VN.String} keyPath
		@param {VN.Object} ofObject
		@param {VN.Dictionary} change
		@param {VN.Object} context
	*/
  observeValueForKeyPath: function(keyPath, ofObject, change, context) {
    console.log('observer notification for:' + keyPath);
    console.log(this);
  }
});

/**
	@mixin NSKeyValueObserverRegistration
	@class NSObject
*/
NSObject.mixin({
  
	/**
		@param {NSObject} observer
		@param {NSString} keyPath
		@param {NSKeyValueObservingOptions} options
		@param {Object} context
	*/
  addObserverForKeyPath: function(observer, keyPath, options, context) {
    if (!observer || !keyPath)
      return;
    
    var kvcDict = NSDictionary.dictionaryWithObjectsForKeys(
      [observer, keyPath, options, context],
      ['NSObserver', 'NSKeyPath', 'NSOptions', 'NSContext']);
      
    this._kvo_observers.push(kvcDict);
  },
  
	/**
		@param {NSObject} observer
		@param {NSString} keyPath
	*/
  removeObserverForKeyPath: function(observer, keyPath) {
    
  }
});

/**
	@mixin NSKeyValueObserverRegistration
	@class NSArray
*/
NSArray.mixin({
	
	/**
		@param {NSObject} observer
		@param {NSIndexSet} indexes
		@param {NSString} keyPath
		@param {NSKeyValueObservingOptions} options
		@param {Object} context
	*/
	addObserverToObjectsAtIndexes: function(observer, indexes, keyPath, options, context) {
		
	},
	
	/**
		@param {NSObject} observer
		@param {NSIndexSet} indexes
		@param {NSString} keyPath
	*/
	removeObserverFromObjectsAtIndexes: function(observer, indexes, keyPath) {
		
	},
	
	/**
		Arrays are not observable, so this method just throws an error.
	
		@param {NSObject} observer
		@param {NSString} keyPath
		@param {NSKeyValueObservingOptions} options
		@param {Object} context
	*/
  addObserverForKeyPath: function(observer, keyPath, options, context) {
    throw "NSArray.addObserverForKeyPath: arrays cannot be observed. keyPath: " + keyPath;
  },
  
	/**
		Arrays are not observable, so this method just throws an error.
		
		@param {NSObject} observer
		@param {NSString} keyPath
	*/
  removeObserverForKeyPath: function(observer, keyPath) {
    throw "NSArray.removeObserverForKeyPath: arrays cannot be observed. keyPath: " + keyPath;
  }
});

/**
	@mixin NSKeyValueObserverRegistration
	@class NSSet
*/
NSSet.mixin({

	/**
		Sets are not observable, so this method just throws an error.
	
		@param {NSObject} observer
		@param {NSString} keyPath
		@param {NSKeyValueObservingOptions} options
		@param {Object} context
	*/
  addObserverForKeyPath: function(observer, keyPath, options, context) {
    throw "NSSet.addObserverForKeyPath: arrays cannot be observed. keyPath: " + keyPath;
  },
  
	/**
		Sets are not observable, so this method just throws an error.
		
		@param {NSObject} observer
		@param {NSString} keyPath
	*/
  removeObserverForKeyPath: function(observer, keyPath) {
    throw "NSSet.removeObserverForKeyPath: arrays cannot be observed. keyPath: " + keyPath;
  }
});


/**
	@mixin NSKeyValueObserverNotification
	@class NSObject
*/
NSObject.mixin({
	
	/**
	  This should be called before a value is set, assuming the value is
	  required to be observable. This notes the current value of the 
	  specified key so that it can be returned in the info dictionary
	  to the observer if required. The order of using this function is:
	  
	  {{{
	    this.willChangeValueForKey('theKey');
	    theKey = newValue;
	    this.didChangeValueForKey('theKey');
	  }}}
	  
	  To avoid this coding repetition, these should be placed inside
	  KVO compliant functions, so the following simipler call will
	  handle the complexity:
	  
	  {{{
	    this.setTheKey(newValue);
      // or...
      this.setValueForKey(newValue, 'theKey');
	  }}}
	
		@param {NSString} key
	*/
	willChangeValueForKey: function(key) {
	  this._kvo_oldValues.setObjectForKey(this.valueForKey(key), key);
	},
	
	/**
		@param {NSString} key
	*/
	didChangeValueForKey: function(key) {
		for (var idx = 0; idx < this._kvo_observers.length; idx++) {
		  var current = this._kvo_observers[idx];
		  if (current.objectForKey('NSKeyPath') == key) {
		    var theObserver = current.objectForKey('NSObserver');
		    var changeDict = NSDictionary.dictionaryWithObjectsForKeys(
          [this._kvo_oldValues.objectForKey(key), this.valueForKey(key)],
          [NSKeyValueChangeOldKey, NSKeyValueChangeNewKey]);
        theObserver.observeValueForKeyPath(key, this, changeDict, current.valueForKey('NSContext'));
		  }
		}
	},
	
	/**
		@param {NSKeyValueChange} changeKind
		@param {NSIndexSet} indexes
		@param {NSString} key
	*/
	willChangeValuesAtIndexesForKey: function(changeKind, indexes, key) {
		
	},
	
	/**
		@param {NSKeyValueChange} changeKind
		@param {NSIndexSet} indexes
		@param {NSString} key
	*/
	didChangeValuesAtIndexesForKey: function(changeKind, indexes, key) {
		
	},
	
	/**
		@param {NSString} key
		@param {NSKeyValueSetMutationKind} mutationKind
		@param {NSSet} objects
	*/
	willChangeValueForKeyWithSetMutationUsingObjects: function(key, mutationKind, objects) {
		
	},
	
	/**
		@param {NSString} key
		@param {NSKeyValueSetMutationKind} mutationKind
		@param {NSSet} objects
	*/
	didChangeValueForKeyWithSetMutationUsingObjects: function(key, mutationKind, objects) {
		
	}
});

/**
	@mixin NSKeyValueObservingCustomization
	@class NSObject
*/
NSObject.mixin({
	
	/**
		@param {NSString} key
		@returns {NSSet}
	*/
	keyPathsForValuesAffectingValueForKey: function(key) {
		
	},
	
	/**
	   @param {NSString} key
	   @returns Boolean
	*/
	automaticallyNotifiesObserversForKey: function(key) {
	  
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
 * timer.js
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
  @class NSTimer
  @extends NSObject
*/
var NSTimer = NSObject.extend({
  
  /**
    Native browser timer.
  */
  _rawTimer: null,
  
  _timeInterval: null,
  
  _target: null,
  
  _selector: null,
  
  _userInfo: null,
  
  _repeats: null,
  
  initWithTimeInterval: function(timeInterval, aTarget, aSelector, userInfo, repeats) {
    this.init();
    this._timeInterval = timeInterval;
    this._target = aTarget;
    this._selector = aSelector;
    this._userInfo = userInfo;
    this._repeats = repeats;
    return this;
  },
  
  fire: function() {
    if (this._repeats)
      this._rawTimer = setInterval(this._timerDidFire, this._timeInterval);
    else
      this._rawTimer = setTimeout(this._timerDidFire, this._timeInterval);
  },
  
  _timerDidFire: function() {
    console.log('timer did fire');
  },
  
  timeInterval: function() {
    return this._timeInterval;
  },
  
  invalidate: function() {
    clearTimeout(this._rawTimer);
  },
  
  isValid: function() {
    return true;
  },
  
  userInfo: function() {
    return this._userInfo;
  }
});

NSTimer.timerWithTimeInterval = function(timeInterval, aTarget, aSelector, userInfo, repeats) {
  return this.create('initWithTimeInterval', timeInterval, aTarget, aSelector, userInfo, repeats);
};
/* 
 * url_connection.js
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
  @class VN.URLConnection
  @extends VN.Object
*/
VN.URLConnection = VN.Object.extend({
  
  /**
    @param {VN.URLRequest} request
    @param {VN.Object} delegate
    @param {Boolean} startImmediately
    @returns {VN.URLConnection}
  */
  initWithRequest: function(request, delegate, startImmediately) {
    this.request = request;
    this.delegate = delegate;
    if (startImmediately) this.start() ;
    return this;
  },
  
  /**
    @type VN.URLRequest
  */
  request: null,
  
  /**
    @type VN.Object
  */
  delegate: null,
  
  /**
    @type XMLHttpRequest or MS* equivalent
  */
  rawHttpRequest: null,
  
  /**
    Start the request
  */
  start: function() {
    if (!this.rawHttpRequest) {
      var theRequest = this.rawHttpRequest = new XMLHttpRequest() ;
      theRequest.open(this.request.valueForKey('HTTPMethod'),
                              this.request.valueForKey('URL'),
                              true) ;
      
      theRequest.onreadystatechange = function(event) {
        console.log(theRequest.readyState) ;
        if (theRequest.readyState == 4) {
          if (theRequest.status == 200)
            console.log('success: ' + theRequest.responseText) ;
          else
            console.log('error! ' + theRequest.status + ' ' + theRequest.responseText) ;
        }
      };
                              
      this.rawHttpRequest.send(null);
    }
  },
  
  /**
    Cancel the request
  */
  cancel: function() {
    
  }
});

VN.URLConnection.connectionWithRequest = function(request, delegate, startImmediately) {
  return this.create('initWithRequest', request, delegate, startImmediately) ;
}


/**
  @protocol VN.URLConnectionDelegate
*/
VN.URLConnectionDelegate = VN.protocol({
  
  /**
    @optional
    @param {VN.URLConnection} connection
    @param {VN.URLResponse} response
  */
  connectionDidReceiveResponse: function(connection, response) {
  },
  
  /**
    @optional
    @param {VN.URLConnection} connection
    @param {VN.String} data
  */
  connectionDidReceiveData: function(connection, data) {
  },
  
  /**
    @optional
    @param {VN.URLConnection} connection
  */
  connectionDidFinishLoading: function(connection) {
  },
  
  /**
    @optional
    @param {VN.URLConnection} connection
    @param {VN.Error} error
  */
  connectionDidFailWithError: function(connection, error) {
  }
});
/* 
 * url_request.js
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
  @class VN.URLRequest
  @extends VN.Object
*/
VN.URLRequest = VN.Object.extend({
  
  /**
    @param {VN.URL} URL
    @returns {VN.URLRequest}
  */
  initWithURL: function(URL) {
    this.URL = URL;
    return this;
  },
  
  /**
    @type VN.URL
  */
  URL: null,
  
  /**
    @type {VN.String}
  */
  HTTPMethod: 'GET',
  
  /**
    @type {VN.Dictionary}
  */
  allHTTPHeaderFields: null,
  
  /**
    @param {VN.String} field
    @returns {VN.String}
  */
  valueForHTTPHeaderField: function(field) {
    return this.allHTTPHeaderFields.valueForKey(field);
  },
  
  /**
    @param {VN.String} value
    @param {VN.String} field
  */
  setValueForHTTPHeaderField: function(value, field) {
    this.allHTTPHeaderFields.setValueForKey(value, field);
  },
  
  /**
    @param {VN.String} value
    @param {VN.String} field
  */
  addValueForHTTPHeaderField: function(value, field) {
    this.allHTTPHeaderFields.setValueForKey(value, field);
  },
  
  /**
    @type VN.String
  */
  HTTPBody: null
});

/**
  @param {VN.URL} URL
  @returns {VN.URLRequest}
*/
VN.URLRequest.requestWithURL = function(URL) {
  return this.create('initWithURL', URL);
};
/* 
 * url_response.js
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
  @class VN.URLResponse
  @extends VN.Object
*/
VN.URLResponse = VN.Object.extend({
  
  /**
    @param {VN.URL} URL
    @returns {VN.URLResponse}
  */
  initWithURL: function(URL) {
    this.URL = URL;
    return this;
  },
  
  /**
    @type VN.URL
  */
  URL: null,
  
  /**
    @type Integer
  */
  statusCode: null,
  
  /**
    @type VN.Dictionary
  */
  allHeaderFields: null
});
/* 
 * user_defaults.js
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


var NSGlobalDomain      = "NSGlobalDomain";
var NSArgumentDomain    = "NSArgumentDomain";
var NSRegistrationDomain  = "NSRegistrationDomain";

var NSUserDefaultsDidChangeNotification = "NSUserDefaultsDidChangeNotification";

/*
  @class NSUserDefaults
*/
var NSUserDefaults = NSObject.extend({
  
  init: function() {
    this._super();
    return this;
  },
  
  /*
    @param {NSString} defaultName
    @returns id
  */
  objectForKey: function(defaultName) {
    
  },
  
  /*
    @param {id} value
    @param {NSString} defaultName
  */
  setObjectForKey: function(value, defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
  */
  removeObjectForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns {NSString}
  */
  stringForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns NSArray
  */
  arrayForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns NSDictionary
  */
  dictionaryForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns NSData
  */
  dataForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns NSArray
  */
  stringArrayForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns Integer
  */
  integerForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns Float
  */
  floatForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns Double
  */
  doubleForKey: function(defaultName) {
    
  },
  
  /*
    @param {NSString} defaultName
    @returns Boolean
  */
  boolForKey: function(defaultName) {
    
  },
  
});

/*
  @returns NSUserDefaults
*/
NSUserDefaults.standardUserDefaults = function() {
  return this.create();
};

/*
  Reset
*/
NSUserDefaults.resetUserDefaults = function() {
  // do something
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
  theFont._size = 12;     // default size
  theFont._isBold = NO;     // default to regular typeface
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
var kCGLineJoinMiter    = 0;
var kCGLineJoinRound    = 1;
var kCGLineJoinBevel    = 2;

// CGLineCap
var kCGLineCapButt      = 0;
var kCGLineCapRound     = 1;
var kCGLineCapSquare    = 2;

// CGPathDrawingMode
var kCGPathFill       = 0;
var kCGPathEOFill       = 1;
var kCGPathStroke       = 2;
var kCGPathFillStroke     = 3;
var kCGEOFillStroke     = 4;

// CGTextDrawingMode
var kCGTextFill       = 0;
var kCGTextStroke       = 1;
var kCGFillStroke       = 2;
var kCGTextInvisible    = 3;
var kCGTextFillClip     = 4;
var kCGTextStrokeClip     = 5;
var kCGTextFillStrokeClip   = 6;
var kCGTextClip       = 7;


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
//   c.strokeRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
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
//   c.shadowOffsetX = offset.width;
//   c.shadowOffsetY = offset.height;
//   c.shadowBlur = blur;
//   c.shadowColor = "rgba(1,1,1,1)";
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
// //   c.fillRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
// // }
// // 
// 
// // 
// // function CGContextStrokeRect(c, rect)
// // {
// //   c.strokeRect(rect.origin.x, c.canvas.height - rect.origin.y - rect.size.height, rect.size.width, rect.size.height);
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
// //   c.strokeStyle = "rgba(" + parseInt(componenets[0] * 255) + ","  + parseInt(componenets[1] * 255) + ","  + parseInt(componenets[2] * 255) + ","  + componenets[3] + ")";
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
// //   c.fillStyle = "rgba(" + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + parseInt(gray * 255) + ","  + alpha + ")";
// // }
// // 
// // function CGContextSetRGBFillColor(c, red, green, blue, alpha)
// // {
// //   c.fillStyle = "rgba(" + parseInt(red * 255) + ","  + parseInt(green * 255) + ","  + parseInt(blue * 255) + ","  + alpha + ")";  
// // }
// // 
// // function CGContextSetRGBStrokeColor(c, red, green, blue, alpha)
// // {
// //   c.strokeStyle = "rgba(" + parseInt(red * 255) + ","  + parseInt(green * 255) + ","  + parseInt(blue * 255) + ","  + alpha + ")"; 
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
 * animation.js
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
  @class CAAnimation
  @extends NSObject
*/
var CAAnimation = NSObject.extend({
  
  /**
    @type CAMediaTimingFunction
  */
  _timingFunction: null,
  
  /**
    @type NSObject
  */
  _delegate: null,
  
  /**
    @type Booleans
  */
  _removedOnCompletion: null,
  
  /**
    @param {CAMediaTimingFunction} timingFunction
  */
  setTimingFunction: function(timingFunction) {
    this._timingFunction = timingFunction;
  },
  
  /**
    @returns CAMediaTimingFunction
  */
  timingFunction: function() {
    return this._timingFunction;
  },
  
  /**
    @param {NSObject} delegate
  */
  setDelegate: function(delegate) {
    
  },
  
  /**
    @returns NSObject
  */
  delegate: function() {
    return this._delegate;
  },
  
  /**
    @param {Boolean} flag
  */
  setRemovedOnCompletion: function(flag) {
    this._removedOnCompletion = flag;
  },
  
  /**
    @returns Boolean
  */
  isRemovedOnCompletion: function() {
    return this._removedOnCompletion;
  }
});

/**
  @returns CAAnimation
*/
CAAnimation.animation = function() {
  
};

/**
  @param {NSString} key
  @returns CAAnimation
*/
CAAnimation.defaultValueForKey = function(key) {
  
};

/**
  @protocol CAAnimationDelegate
*/
var CAAnimationDelegate = NSObject.protocol({
  
  /**
    @param {CAAnimation} animation
  */
  animationDidStart: function(animation) {
  },
  
  /**
    @param {CAAnimation} animation
    @param {Boolean} flag
  */
  animationDidStopFinished: function(animation, flag) {
  }
});


/**
  @class CAPropertyAnimation
  @extends CAAnimation
*/
var CAPropertyAnimation = CAAnimation.extend({
  
  /**
    @type NSString
  */
  _keyPath: null,
  
  /**
    @param {NSString} keyPath
  */
  setKeyPath: function(keyPath) {
    this._keyPath = keyPath;
  },
  
  /**
    @returns NSString
  */
  keyPath: function() {
    return this._keyPath;
  },
  
  /**
    @type Boolean
  */
  _additive: null,
  
  /**
    @param {Boolean} additive
  */
  setAdditive: function(additive) {
    this._additive = additive;
  },
  
  /**
    @returns {Boolean}
  */
  isAdditive: function() {
    return this._additive;
  },
  
  /**
    @type Boolean
  */
  _cumulative: null,
  
  /**
    @param {Boolean} cumulative
  */
  setCumulative: function(cumulative) {
    this._cumulative = cumulative;
  },
  
  /**
    @returns {Boolean}
  */
  isCumulative: function() {
    return this._cumulative;
  }
});


/**
  @class CABasicAnimation
  @extends CAPropertyAnimation
*/
var CABasicAnimation = CAPropertyAnimation.extend({
  
  /**
    @type id
  */
  _byValue: null,
  
  /**
    @param {id} value
  */
  setByValue: function(value) {
    this._byValue = value;
  },
  
  /**
    @returns id
  */
  byValue: function() {
    return this._byValue;
  },
  
  /**
    @type id
  */
  _toValue: null,
  
  /**
    @param {id} value
  */
  setToValue: function(value) {
    this._toValue = value;
  },
  
  /**
    @returns id
  */
  toValue: function() {
    return this._toValue;
  },
  
  /**
    @type id
  */
  _fromValue: null,
  
  /**
    @param {id} value
  */
  setFromValue: function(value) {
    this._fromValue = value;
  },
  
  /**
    @returns id
  */
  fromValue: function() {
    return this._fromValue;
  },
});


/**
  @class CAKeyframeAnimation
  @extends CAPropertyAnimation
*/
var CAKeyFrameAnimation = CAPropertyAnimation.extend({
  
  /**
    @type NSArray
  */
  _values: null,
  
  setValues: function(values) {
    this._values = values;
  },
  
  values: function() {
    return this._values;
  },
  
  /**
    @type CGPathRef
  */
  _path: null,
  
  setPath: function(path) {
    this._path = path;
  },
  
  path: function() {
    return this._path;
  },
  
  /**
    @type NSArray
  */
  _keyTimes: null,
  
  setKeyTimes: function(times) {
    this._keyTimes = times;
  },
  
  keyTimes: function() {
    return this._keyTimes;
  },
  
  /**
    @type NSArray
  */
  _timingFunctions: null,
  
  setTimingFunctions: function(functions) {
    this._timingFunctions = functions;
  },
  
  timingFunctions: function() {
    return this._timingFunctions;
  },
  
  /**
    @type NSString
  */
  _calculationMode: null,
  
  setCalculationMode: function(mode) {
    this._calculationMode = mode;
  },
  
  calculationMode: function() {
    return this._calculationMode;
  },
  
  /**
    @type rotationMode
  */
  _rotationMode: null,
  
  setRotationMode: function(mode) {
    this._rotationMode = mode;
  },
  
  rotationMode: function() {
    return this._rotationMode;
  }
});


/**
  Calculation mode..
*/
var kCAAnimationLinear        = "kCAAnimationLinear";
var kCAAnimationDiscrete      = "kCAAnimationDiscrete";
var kCAAnimationPaced         = "kCAAnimationPaced";

/**
  Rotation mode
*/
var kCAAnimationRotateAuto      = "kCAAnimationRotateAuto";
var kCAAnimationRotateAutoReverse   = "kCAAnimationRotateAutoReverse";


/**
  @class CATransition
  @extends CAAnimation
*/
var CATransition = CAAnimation.extend({
  
  /**
    @type NSString
  */
  _type: null,
  
  setType: function(aType) {
    this._type = aType;
  },
  
  type: function() {
    return this._type;
  },
  
  /**
    @type NSString
  */
  _subType: null,
  
  setSubType: function(aType) {
    this._subType = aType;
  },
  
  subType: function() {
    return this._subType;
  },
  
  /**
    @type Float
  */
  _startProgress: null,
  
  setStartProgress: function(progress) {
    this._startProgress = progress;
  },
  
  startProgress: function() {
    return this._startProgress;
  },
  
  /**
    @type Float
  */
  _endProgress: null,
  
  setEndProgress: function(progress) {
    this._endProgress = progress;
  },
  
  endProgress: function() {
    return this._endProgress;
  },
  
  /**
    @type id
  */
  _filter: null,
  
  setFilter: function(filter) {
    this._filter = filter;
  },
  
  filter: function() {
    return this._filter;
  }
});

/**
  Transition types..
*/
var kCATransitionFade     = "kCATransitionFade";
var kCATransitionMoveIn   = "kCATransitionMoveIn";
var kCATransitionPush     = "kCATransitionPush";
var kCATransitionReveal   = "kCATransitionReveal";

var kCATransitionFromRight  = "kCATransitionFromRight";
var kCATransitionFromLeft   = "kCATransitionFromLeft";
var kCATransitionFromTop  = "kCATransitionFromTop";
var kCATransitionFromBottom = "kCATransitionFromBottom";


/**
  @class CAAnimationGroup
  @extends CAAnimation
*/
var CAAnimationGroup = CAAnimation.extend({
  
  /**
    @type NSArray
  */
  _animations: null,
  
  /**
    @param {NSArray} animations
  */
  setAnimations: function(animations) {
    this._animations = animations;
  },
  
  /**
    @returns NSArray
  */
  animations: function() {
    return this._animations;
  }
});
/* 
 * media_timing.js
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
  @protocol CAMediaTiming
*/
var CAMediaTiming = NSObject.protocol({
  
  /**
    Defaults to 0.0
    
    @type {Float}
  */
  _beginTime: null,
  
  /**
    @param {Float} time
  */
  setBeginTime: function(time) {
    this._beginTime = time;
  },
  
  /**
    @returns Float
  */
  beginTime: function() {
    return this._beginTime;
  },
  
  /**
    Defaults to 0.0
    
    @type {Float}
  */
  _duration: null,
  
  /**
    @param {Float} time
  */
  setDuration: function(duration) {
    this._duration = duration;
  },
  
  /**
    @returns Float
  */
  duration: function() {
    return this._duaration;
  },
  
  /**
    Defaults to 1.0
    
    @type {Float}
  */
  _speed: null,
  
  /**
    @param {Float} time
  */
  setSpeed: function(speed) {
    this._speed = speed;
  },
  
  /**
    @returns Float
  */
  speed: function() {
    return this._speed;
  },
  
  /**
    Defaults to false
    
    @type {Boolean}
  */
  _autoreverses: null,
  
  /**
    @param {Boolean} flag
  */
  setAutoreverses: function(flag) {
    this._autoreverses = flag;
  },
  
  /**
    @returns Boolean
  */
  autoreverses: function() {
    return this._autoreverses;
  }
});/* 
 * media_timing_function.js
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
  @class CAMediaTimingFunction
  @extends NSObject
*/
var CAMediaTimingFunction = NSObject.extend({
  
  /**
    @param {Float} c1x
    @param {Float} c1y
    @param {Float} c2x
    @param {Float} c2y
    @returns CAMediaTimingFunction
  */
  initWithControlPoints: function(c1x, c1y, c2x, c2y) {

  }
});

/**
  'linear', 'easeIn', 'easeOut', 'easeInEaseOut', 'default'
  
  @param {NSString} name
  @returns CAMediaTimingFunction
*/
CAMediaTimingFunction.functionWithName = function(name) {
  
};

/**
  @param {Float} c1x
  @param {Float} c1y
  @param {Float} c2x
  @param {Float} c2y
  @returns CAMediaTimingFunction
*/
CAMediaTimingFunction.functionWithControlPoints = function(c1x, c1y, c2x, c2y) {
  
};

/**
  Media timing names
*/
var kCAMediaTimingFunctionLinear    = "linear";
var kCAMediaTimingFunctionEaseIn    = "easeIn";
var kCAMediaTimingFunctionEaseOut     = "easeOut";
var kCAMediaTimingFunctionEaseInEaseOut = "easeInEaseOut";
var kCAMediaTimingFunctionDefault     = "default";
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
var kCTFontOptionsDefault             = 0;
var kCTFontOptionsPreventAutoActivation     = 1 << 0;
var kCTFontOptionsPreferSystemFont        = 1 << 2;

// CTFontUIFontType
var kCTFontNoFontType               = -1;
var kCTFontUserFontType             =  0;
var kCTFontUserFixedPitchFontType         =  1;
var kCTFontSystemFontType             =  2;
var kCTFontEmphasizedSystemFontType       =  3;
var kCTFontSmallSystemFontType          =  4;
var kCTFontSmallEmphasizedSystemFontType    =  5;
var kCTFontMiniSystemFontType           =  6;
var kCTFontMiniEmphasizedSystemFontType     =  7;
var kCTFontViewsFontType            =  8;
var kCTFontApplicationFontType          =  9;
var kCTFontLabelFontType            = 10;
var kCTFontMenuTitleFontType          = 11;
var kCTFontMenuItemFontType           = 12;
var kCTFontMenuItemMarkFontType         = 13;
var kCTFontMenuItemCmdKeyFontType         = 14;
var kCTFontWindowTitleFontType          = 15;
var kCTFontPushButtonFontType           = 16;
var kCTFontUtilityWindowTitleFontType       = 17;
var kCTFontAlertHeaderFontType          = 18;
var kCTFontSystemDetailFontType         = 19;
var kCTFontEmphasizedSystemDetailFontType     = 20;
var kCTFontToolbarFontType            = 21;
var kCTFontSmallToolbarFontType         = 22;
var kCTFontMessageFontType            = 23;
var kCTFontPaletteFontType            = 24;
var kCTFontToolTipFontType            = 25;
var kCTFontControlContentFontType         = 26;


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
    this._destination.setAction(this._label);
    this._destination.setTarget(this._source);
    return this;
  }
});
/* 
 * animation.js
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
  @enum NSAnimationCurve
*/
var NSAnimationEaseInOut    = 0; // default
var NSAnimationEaseIn       = 1;
var NSAnimationEaseOut      = 2;
var NSAnimationLinear       = 3;


var NSAnimationProgressMarkNotification = "NSAnimationProgressMarkNotification";
var NSAnimationProgressMark       = "NSAnimationProgressMark";

/**
  @class NSAnimation
  @extends NSObject
*/
var NSAnimation = NSObject.extend({
  
  /**
    @type Float time interval
  */
  _duration: null,
  
  /**
    @type Float the progress
  */
  _currentProgress: null,
  
  /**
    @type Float
  */
  _framesPerSecond: null,
  
  /**
    @type NSObject
  */
  _delegate: null,
  
  /**
    @type NSTimer
  */
  _timer: null,
  
  /**
    @type Float time interval
  */
  _startTime: null,
  
  /**
    @type NSArray
  */
  _progressMarks: null,
  
  /**
    @type NSAnimation
  */
  _startAnimation: null,
  
  /**
    @type NSAnimation
  */
  _stopAnimation: null,
  
  /**
    @type Integer
  */
  _nextProgressMark: null,
  
  /**
    @param {Float} duration
    @param {NSAnimationCurve} animationCurve
    @returns NSAnimation
  */
  initWithDurationAnimationCurve: function(duration, animationCurve) {
    
  },
  
  /**
    Starts the animation
  */
  startAnimation: function() {
    
  },
  
  /**
    Stops the animation
  */
  stopAnimation: function() {
    
  },
  
  /**
    @returns Boolean
  */
  isAnimating: function() {
    
  },
  
  /**
    @returns Float
  */
  currentProgress: function() {
    
  },
  
  /**
    @param {Float} progress
  */
  setCurrentProgress: function() {
    
  },
  
  /**
    @param {Float} duration
  */
  setDuration: function(duration) {
    
  },
  
  /**
    @returns Float
  */
  duration: function() {
    
  },
  
  /**
    @param {NSAnimationCurve} curve
  */
  setAnimationCurve: function(curve) {
    
  },
  
  /**
    @returns NSAnimationCurve
  */
  animationCurve: function() {
    
  },
  
  /**
    @returns Float
  */
  currentValue: function() {
    
  },
  
  /**
    @param {NSObject} <NSAnimationDelegate> delegate
  */
  setDelegate: function(delegate) {
    
  },
  
  /**
    @returns NSObject <NSAnimationDelegate>
  */
  delegate: function() {
    return this._delegate;
  },
  
  /**
    @returns NSArray
  */
  progressMarks: function() {
    
  },
  
  /**
    @param {NSArray} progressMarks
  */
  setProgressMarks: function(progressMarks) {
    
  },
  
  /**
    @param {Float} progressMark
  */
  addProgressMark: function(progressMark) {
    
  },
  
  /**
    @param {Float} progressMark
  */
  removeProgressMark: function(progressMark) {
    
  },
  
  /**
    @param {NSAnimation} animation
    @param {Float} startProgress
  */
  startWhenAnimationReachesProgress: function(animation, startProgress) {
    
  },
  
  /**
    @param {NSAnimation} animation
    @param {Float} stopProgress
  */
  stopWhenAnimationReachesProgress: function(animation, stopProgress) {
    
  },
  
  /**
    Clear animation
  */
  clearStartAnimation: function() {
    
  },
  
  
  /**
    Clear animation
  */
  clearStopAnimation: function() {
    
  }
});

/**
  @protocol NSAnimationDelegate
*/
var NSAnimationDelegate = NSObject.protocol({
  
  /**
    @optional
    
    @param {NSAnimation} animation
    @returns Boolean
  */
  animationShouldStart: function(animation) {
  },
  
  /**
    @optional
    
    @param {NSAnimation} animation
  */
  animationDidStop: function(animation) {
  },
  
  /**
    @optional
    
    @param {NSAnimation} animation
  */
  animationDidEnd: function(animation) {
  },
  
  /**
    @optional
    
    @param {NSAnimation} animation
    @param {Float} progress
    @returns Float
  */
  animationValueForProgress: function(animation, progress) {
  },
  
  /**
    @optional
    
    @param {NSAnimation} animation
    @param {Float} progress
  */
  animationDidReachProgressMark: function(animation, progress) {
  }
});


/**
  Animation info keys
*/
var NSViewAnimationTargetKey    = "NSViewAnimationTargetKey";     // @required an NSWindow or NSView
var NSViewAnimationStartFrameKey  = "NSViewAnimationStartFrameKey";   // @optional NSRect
var NSViewAnimationEndFrameKey    = "NSViewAnimationEndFrameKey";   // @optional NSRect
var NSViewAnimationEffectKey    = "NSViewAnimationEffectKey";     // @optional NSString
var NSViewAnimationFadeInEffect   = "NSViewAnimationFadeInEffect";
var NSViewAnimationFadeOutEffect  = "NSViewAnimationFadeOutEffect";


/**
  @class NSViewAnimation
  @extends NSAnimation
*/
var NSViewAnimation = NSAnimation.extend({
  
  /**
    @type NSArray
  */
  _viewAnimations: null,
  
  /**
    @type NSDictionary
  */
  _viewAnimationInfo: null,
  
  /**
    @type NSDictionary
  */
  _windowAnimationInfo: null,
  
  /**
    @param {NSArray} viewAnimations
    @returns NSViewAnimation
  */
  initWithViewAnimations: function(viewAnimations) {
    
  },
  
  /**
    @returns NSArray
  */
  viewAnimations: function() {
    return this._viewAnimations;
  },
  
  /**
    @param {NSArray} viewAnimations
  */
  setViewAnimations: function(viewAnimations) {
    
  }
});


/**
  @protocol NSAnimatablePropertyContainer
*/
var NSAnimatablePropertyContainer = NSObject.protocol({
  
  /**
    @returns
  */
  animator: function() {
  },
  
  /**
    @returns NSDictionary
  */
  animations: function() {
  },
  
  /**
    @param {NSDictionary} animations
  */
  setAnimations: function(animations) {
  },
  
  /**
    @param {NSString} key
    @returns 
  */
  animationForKey: function(key) {
  },
  
  /**
    @class-method
    @param {NSString} key
    @returns 
  */
  defaultAnimationForKey: function(key) {
  }
});
/* 
 * animation_context.js
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
  @class NSAnimationContext
  @extends NSObject
*/
var NSAnimationContext = NSObject.extend({
  
  /**
    @type Float
  */
  _duration: null,
  
  /**
    @param {Float} duration
  */
  setDuration: function(duration) {
    
  },
  
  /**
    @returns Float
  */
  duration: function() {
    
  }
});


/**
  Begin grouping
*/
NSAnimationContext.beginGrouping = function() {
  
};

/**
  End grouping
*/
NSAnimationContext.endGrouping = function() {
  
};

/**
  @returns NSAnimationContext
*/
NSAnimationContext.currentContext = function() {
  
};
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


// VN.EventType
var NSLeftMouseDown       = VN.LEFT_MOUSE_DOWN = 1;      
var NSLeftMouseUp         = VN.LEFT_MOUSE_UP = 2;
var NSRightMouseDown      = VN.RIGHT_MOUSE_DOWN = 3;
var NSRightMouseUp        = VN.RIGHT_MOUSE_UP = 4;
var NSMouseMoved        = VN.MOUSE_MOVED = 5;
var NSLeftMouseDragged      = VN.LEFT_MOUSE_DRAGGED = 6;
var NSRightMouseDragged     = VN.RIGHT_MOUSE_DRAGGED = 7;
var NSMouseEntered        = VN.MOUSE_ENTERED = 8;
var NSMouseExited         = VN.MOUSE_EXITED = 9;
var NSKeyDown           = VN.KEY_DOWN = 10;
var NSKeyUp           = VN.KEY_UP = 11;
var NSFlagsChanged        = VN.FLAGS_CHNAGED = 12;
var NSCursorUpdate        = VN.CURSOR_UPDATE = 17;
var NSScrollWheel         = VN.SCROLL_WHEEL = 22;

// VN.EventMasks
var NSLeftMouseDownMask     = 1 << NSLeftMouseDown;
var NSLeftMouseUpMask       = 1 << NSLeftMouseUp;
var NSRightMouseDownMask    = 1 << NSRightMouseDown;
var NSRightMouseUpMask      = 1 << NSRightMouseUp;
var NSMouseMovedMask      = 1 << NSMouseMoved;
var NSLeftMouseDraggedMask    = 1 << NSLeftMouseDragged;
var NSRightMouseDraggedMask   = 1 << NSRightMouseDragged;
var NSMouseEnteredMask      = 1 << NSMouseEntered;
var NSMouseExitedMask       = 1 << NSMouseExited;
var NSKeyDownMask         = 1 << NSKeyDown;
var NSKeyUpMask         = 1 << NSKeyUp;
var NSFlagsChangedMask      = 1 << NSFlagsChanged;
var NSCursorUpdateMask      = 1 << NSCursorUpdate;
var NSScrollWheelMask       = 1 << NSScrollWheel;

// NSevent modifier flags
var NSAlphaShiftKeyMask     = 1 << 16; // caps lock - not the same as shift
var NSShiftKeyMask        = 1 << 17;
var NSControlKeyMask      = 1 << 18;
var NSAlternateKeyMask      = 1 << 19;
var NSCommandKeyMask      = 1 << 20;
var NSNumericPadKeyMask     = 1 << 21;
var NSHelpKeyMask         = 1 << 22;
var NSFunctionKeyMask       = 1 << 23;

/**
  @class VN.Event
*/
VN.Event = function(theEvent) {
  
  this._event = theEvent;
  
  // eventType
  switch (theEvent.type) {
    case 'mousedown': this._type = VN.LEFT_MOUSE_DOWN; break;
    case 'mouseup': this._type = VN.LEFT_MOUSE_UP; break;
    case 'mousemove': this._type = VN.MOUSE_MOVED; break;
    case 'keypress': this._type = VN.KEY_DOWN; break;
    case 'keydown': this._type = VN.KEY_DOWN; break;
    default: console.log('unable to determine event type'); return;
  }
  
  // modifierFlags
  var modifierFlags = 1;
  if (theEvent.metaKey) { modifierFlags = modifierFlags | NSCommandKeyMask; theEvent._allowsBrowserControl = true; }
  if (theEvent.shiftKey) modifierFlags = modifierFlags | NSShiftKeyMask;
  if (theEvent.altKey) modifierFlags = modifierFlags | NSAlternateKeyMask;
  if (theEvent.ctrlKey) modifierFlags = modifierFlags | NSControlKeyMask;
  this._modifierFlags = modifierFlags;
  
  // screenLocation
  this._screenLocation = NSMakePoint(theEvent.clientX, window.innerHeight - theEvent.clientY);
  
  // timeStamp
  this._timeStamp = theEvent.timeStamp || new Date().getTime();
  
  // window etc
  this._window = VN.Application.sharedApplication().windowAtPoint(this._screenLocation);
  if (!this._window) this._window = VN.App.keyWindow();
  
  if (this._window) {
    this._windowLocation = this._window.convertScreenToBase(this._screenLocation);
    this._windowNumber = this._window.windowNumber();
  }
  
  // characters
  this._keyCode = theEvent.charCode || theEvent.keyCode;
  this._characters = String.fromCharCode(this._keyCode);
  
  return this;
};

VN.Event.create = function(event) {
  VN.Application.sharedApplication().sendEvent(new VN.Event(event));
  return event._allowBrowserControl ? true : false;
};

VN.Event.mixin = function(props) {
  VN.extend(this.prototype, props);
};

VN.Event.mixin({
  
  type: function() {
    return this._type;
  },
  
  locationInWindow: function() {
    return this._windowLocation;
  },
  
  window: function() {
    return this._window;
  },
  
  modifierFlags: function() {
    return this._modifierFlags;
  },
  
  keyCode: function() {
    return this._keyCode;
  }
});

var NSEvent = VN.Event;


// reserved keycodes
var NSUpArrowFunctionKey    = 38;
var NSDownArrowFunctionKey    = 40;
var NSLeftArrowFunctionKey    = 37;
var NSRightArrowFunctionKey   = 39;
var NSDeleteForwardFunctionKey  = 46;
var NSDeleteBackwardFunctionKey = 8;
var NSReturnFunctionKey     = 13;
var NSEscapeFunctionKey     = 27;
var NSTabFunctionKey      = 9;
var NSPageUpFunctionKey     = 33;
var NSPageDownFunctionKey     = 34;
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


/**
  @class VN.Responder
  @extend VN.Object
*/
var NSResponder = VN.Responder = VN.Object.extend({

  /**
    @type VN.Responder
  */
  _nextResponder: null,
  
  /**
    @type VN.Menu
  */
  _menu: null,
  
  /**
    @param {VN.Coder} aCoder
    @returns VN.Responder
  */
  initWithCoder: function(aCoder) {
    this._nextResponder = aCoder.decodeObjectForKey("NSNextResponder");
    return this;
  },
  
  /**
    @returns NSResponder
  */
  nextResponder: function() {
    return this._nextResponder;
  },
  
  /**
    @param {NSResponder} aResponder
  */
  setNextResponder: function(aResponder) {
    this._nextResponder = aResponder;
  },
  
  /**
    @param {Selector} anAction
    @param {NSObject} anObject
    @returns Boolean
  */
  tryToPerform: function(anAction, anObject) {
    
    if (this.respondsTo(anAction)) {
      this.perform(anAction, anObject);
      return true;
    }
    
    return this._nextResponder.tryToPerform(anAction, anObject);
  },
  
  /**
    @param {NSEvent} theEvent
    @returns Boolean
  */
  performKeyEquivalent: function(theEvent) {
    return false;
  },
  
  /**
    @param {NSEvent} theEvent
  */
  mouseDown: function(theEvent) {
    this._nextResponder.mouseDown(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  rightMouseDown: function(theEvent) {
    this._nextResponder.rightMouseDown(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  otherMouseDown: function(theEvent) {
    this._nextResponder.otherMouseDown(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  mouseUp: function(theEvent) {
    this._nextResponder.mouseUp(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  rightMouseUp: function(theEvent) {
    this._nextResponder.rightMouseUp(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  otherMouseUp: function(theEvent) {
    this._nextResponder.otherMouseUp(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  mouseMoved: function(theEvent) {
    this._nextResponder.mouseMoved(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  mouseDragged: function(theEvent) {
    this._nextResponder.mouseDragged(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  scrollWheel: function(theEvent) {
    this._nextResponder.scrollWheel(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  rightMouseDragged: function(theEvent) {
    this._nextResponder.rightMouseDragged(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  otherMouseDragged: function(theEvent) {
    this._nextResponder.otherMouseDragged(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  mouseEntered: function(theEvent) {
    this._nextResponder.mouseEntered(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  mouseExited: function(theEvent) {
    this._nextResponder.mouseExited(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  keyDown: function(theEvent) {
    // console.log('seidng event to');
    // console.log(this._nextResponder);
    this._nextResponder.keyDown(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  keyUp: function(theEvent) {
    this._nextResponder.keyUp(theEvent);
  },
  
  /**
    @param {NSEvent} theEvent
  */
  flagsChanged: function(theEvent) {
    
  },
  
  /**
    @param {NSEvent} theEvent
  */
  cursorUpdate: function(theEvent) {
    
  },
  
  /**
    @param {Selector} eventSelector
  */
  noResponderFor: function(eventSelector) {
    
  },
  
  /**
    @returns Boolean
  */
  acceptsFirstResponder: function() {
    return false;
  },
  
  /**
    @returns Boolean
  */
  becomeFirstResponder: function() {
    return true;
  },
  
  /**
    @returns Boolean
  */
  resignFirstResponder: function() {
    return true;
  },
  
  /**
    @param {NSArray} eventArray
  */
  interpretKeyEvents: function(eventArray) {
    for (var idx = 0; idx < eventArray.length; idx++) {
      var theEvent = eventArray[idx];
      
      switch (theEvent.keyCode()) {
        case NSUpArrowFunctionKey:
          this.doCommandBySelector('moveUp');
          break;
        case NSDownArrowFunctionKey:
          this.doCommandBySelector('moveDown');
          break;
        case NSLeftArrowFunctionKey:
          this.doCommandBySelector('moveLeft');
          break;
        case NSRightArrowFunctionKey:
          this.doCommandBySelector('moveRight');
          break;
        case NSDeleteForwardFunctionKey:
          this.doCommandBySelector('deleteForward');
          break;
        case NSDeleteBackwardFunctionKey:
          this.doCommandBySelector('deleteBackward');
          break;
        case NSReturnFunctionKey:
          this.doCommandBySelector('insertLineBreak');
          break;
        case NSEscapeFunctionKey:
          this.doCommandBySelector('cancel');
          break;
        case NSTabFunctionKey:
          this.doCommandBySelector('insertTab');
          break;
        case NSPageUpFunctionKey:
          this.doCommandBySelector('pageUp');
          break;
        case NSPageDownFunctionKey:
          this.doCommandBySelector('pageDown');
          break;
        default:
          if (this.respondsTo('insertText'))
            this.insertText(theEvent.characters());
          break;
      }
    }
  },
  
  /**
    @param {NSMenu} menu
  */
  setMenu: function(menu) {
    this._menu = menu;
  },
  
  /**
    @returns NSMenu
  */
  menu: function() {
    return this._menu;
  },
  
  /**
    @param {NSOject} sender
  */
  showContextHelp: function(sender) {
    
  },
  
  /**
    @param {NSEvent} theEvent
  */
  helpRequested: function(theEvent) {
    
  },
  
  /**
    @param {Selector} aSelector
  */
  doCommandBySelector: function(aSelector) {
    if (this.respondsTo(aSelector))
      this.perform(aSelector, this);
    // else // we could just drop the event...
    //   this._nextResponder.doCommandBySelector(aSelector);
  },
});

/**
  @protocol NSStandardKeyBindingMethods
  @class NSResponder
  
  None of these are implemented, but if they are implemented by a subclass,
  then that responder will recieve the relevant key bindings.
*/
var NSStandardKeyBindingMethods = NSResponder.protocol({
  
  /**
    @param {NSString} insertString
  */
  insertText: function(insertString) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveForward: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveRight: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveBackward: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveLeft: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveUp: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveDown: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveWordForward: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveWordBackward: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveToBeginningOfLine: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveToEndOfLine: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveToBeginningOfParagraph: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveToEndOfParagraph: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveToBeginningOfDocument: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveToEndOfDocument: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  pageDown: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  pageUp: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  centerSelectionInVisibleArea: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveBackwardAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveForwardAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveWordForwardAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveWordBackwardAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveUpAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveDownAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveToBeginningOfLineAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveToEndOfLineAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveToBeginningOfParagraphAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveToEndOfParagraphAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveToEndOfDocumentAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveToBeginningOfDocumentAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  pageDownAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  pageUpAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveParagraphForwardAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveParagraphBackwardAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveWordRight: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveWordLeft: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveRightAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveLeftAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveWordRightAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  moveWordLeftAndModifySelection: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  scrollPageUp: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  scrollPageDown: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  scrollLineUp: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  scrollLineDown: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  scrollToBeginningOfDocument: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  scrollToEndOfDocument: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  transpose: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  transposeWords: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  selectAll: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  selectParagraph: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  selectLine: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  selectWord: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  indent: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  insertTab: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  insertBacktab: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  insertNewline: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  insertParagraphSeparator: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  insertNewlineIgnoringFieldEditor: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  insertTabIgnoringFieldEditor: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  insertLineBreak: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  insertContainerBreak: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  insertSingleQuoteIgnoringSubstitution: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  insertDoubleQuoteIgnoringSubstitution: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  changeCaseOfLetter: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  uppercaseWord: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  lowercaseWord: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  capitalizeWord: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  deleteForward: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  deleteBackward: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  deleteBackwardByDecomposingPreviousCharacter: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  deleteWordForward: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  deleteWordBackward: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  deleteToBeginningOfLine: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  deleteToEndOfLine: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  deleteToBeginningOfParagraph: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  deleteToEndOfParagraph: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  yank: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  complete: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  setMark: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  deleteToMark: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  selectToMark: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  swapWithMark: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  cancelOperation: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  makeBaseWritingDirectionNatural: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  makeBaseWritingDirectionLeftToRight: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  makeBaseWritingDirectionRightToLeft: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  makeTextWritingDirectionNatural: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  makeTextWritingDirectionLeftToRight: function(sender) {
  },
  
  /**
    @param {NSObject} sender
  */
  makeTextWritingDirectionRightToLeft: function(sender) {
  } 
});


/**
  @mixin NSUndoSupport
  @class NSResponder
*/
NSResponder.mixin({
  
  /**
    @returns NSUndoManager
  */
  undoManager: function() {
    
  }
});


/**
  @mixin NSErrorPresentation
  @class NSResponder
*/
NSResponder.mixin({
  
  /**
    @param {NSError} error
    @param {NSWindow} window
    @param {NSObject} delegate
    @param {Selector} didPresentSelector
    @param {Object} contextInfo
  */
  presentErrorModalForWindowDelegateDidPresentSelectorContextInfo: function(error, window, delegate, didPresentSelector, contextInfo) {
    
  },
  
  /**
    @param {NSError} error
    @returns {Boolean}
  */
  presentError: function(error) {
    
  },
  
  /**
    @param {NSError} error
    @returns NSError
  */
  willPresentError: function(error) {
    
  }
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

VN.extend(NSGraphicsContext, {
   
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

// Important character codes
VN.ENTER_CHARACTER = 0x0003;
VN.BACKSPACE_CHARACTER = 0x0008;
VN.TAB_CHARACTER = 0x0009;
VN.NEWLINE_CHARACTER = 0x000a;
VN.FORM_FEED_CHARACTER = 0x000c;
VN.CARRIAGE_RETURN_CHARACTER = 0x000d;
VN.BACK_TAB_CHARACTER = 0x0019;
VN.DELETE_CHARACTER = 0x007f;
VN.LINE_SEPARATOR_CHARACTER = 0x2028;
VN.PARAGRAPH_SEPARATOR_CHARACTER = 0x2029;
                  
// VN.TextAlignment          
VN.LEFT_TEXT_ALIGNMENT = 0;
VN.RIGHT_TEXT_ALIGNMENT = 1;
VN.CENTER_TEXT_ALIGNMENT = 2;
VN.JUSTIFIED_TEXT_ALIGNMENT = 3;
VN.NATURAL_TEXT_ALIGNMENT = 4;
                  
// VN.WritingDirection         
VN.WRITING_DIRECTION_NATURAL = -1;
VN.WRITING_DIRECTION_LEFT_TO_RIGHT = 0;
VN.WRITING_DIRECTION_RIGHT_TO_LEFT = 1;
VN.WRITING_DIRECTION_EMBEDDING = (0 << 1);
VN.WRITING_DIRECTION_OVERRIDE = (1 << 1);
                  
// Movement codes
VN.ILLEGAL_TEXT_MOVEMENT = 0;
VN.RETURN_TEXT_MOVEMENT = 0x10;
VN.TAB_TEXT_MOVEMENT = 0x11;
VN.BACKTAB_TEXT_MOVEMENT = 0x12;
VN.LEFT_TEXT_MOVEMENT = 0x13;
VN.RIGHT_TEXT_MOVEMENT = 0x14;
VN.UP_TEXT_MOVEMENT = 0x15;
VN.DOWN_TEXT_MOVEMENT = 0x16;
VN.CANCEL_TEXT_MOVEMENT = 0x17;
VN.OTHER_TEXT_MOVEMENT = 0;

// Notifications
VN.TEXT_DID_BEGIN_EDITING_NOTIFICATION = "NSTextDidBeginEditingNotification";
VN.TEXT_DID_END_EDITING_NOTIFICATION = "NSTextDidEndEditingNotification";
VN.TEXT_DID_CHANGE_NOTIFICATION = "NSTextDidChangeNotification";

/**
  @prototol VN.TextDelegate
  
  Protocol defining the text delegate methods.
*/
VN.TextDelegate = VN.protocol({
  
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
});
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


/**
  Valid window styles for setting the appearance of VN.Windows.
*/
VN.WINDOW_STYLES = {
  borderless: 0, titled: 1 << 0, closable: 1 << 1, miniaturizable: 1 << 2,
  resizable: 1 << 3, textured: 1 << 8, unified: 1 << 12
};

/**
  Window levels array for the specified type of window. Setting a window to
  main/key might also append 5 to that window to ensure it lays above other
  windows of the same level
*/
VN.WINDOW_LEVELS = {
  normal: 10, floating: 10, submenu: 10, torn_off_menu: 10, main_menu: 70,
  status: 10, modal_panel: 10, pop_up_menu: 60
};

/**
  Notifications sent by the window for various events/
*/
VN.WINDOW_NOTIFICATIONS = [
  'didBecomeKey', 'didBecomeMain', 'didDeminiaturize', 'didExpose', 'didMiniaturize',
  'didMove', 'didResignKey', 'didResignMain', 'didResize', 'didUpdate', 'willClose',
  'willMiniaturize', 'willMove', 'willBeginSheet', 'didEndSheet'
];

/**
  @class VN.Window
  @extends VN.Responder
*/
VN.Window = VN.Responder.extend({
  
  /**
    VN.Window defaultOptions for initialisation
  */
  defaultOptions: { style: ['titled', 'closable', 'miniaturizable', 'resizable'],
                    show: true,
                    view: 'layout',
                    defaultLayout: { }
  },
  
  /**
    @param {Object} options
    @returns VN.Window
  */
  initWithOptions: function(options) {  
    if (!options.hasKey('frame')) {
      var size = options.remove('size') || [450, 400];
      var origin = options.remove('origin') || [200, 200];
      var x = origin[0], y = origin[1], width = size[0], height = size[1];
      options.store('frame', [x, y, width, height]);
    }
    
    this.initWithContentRect(options.remove('frame'), options.remove('style'));
    return this;
  },
  
  /**
    @type VN.Array holds the style array from the options available at the top
    of this document
  */
  style: null,
  
  /**
    @type Boolean
  */
  hasShadow: null,
  
  /**
    @type Integer
  */
  level: null,
  
  /**
    @type VN.Array
  */
  minSize: null,
  
  /**
    @type VN.Array
  */
  maxSize: null,
  
  /**
    @type VN.Responder
  */
  firstResponder: null,
  
  /**
    @type VN.Responder
  */
  nextResponder: null,
  
  /**
    @param {VN.Array} rect array of the form [x, y, width, height]
    @param {VN.Array} style array containing the relevant display properties
    @returns VN.Window
  */
  initWithContentRect: function(rect, style) {

    this.setupRenderContext();    
    this.windowNumber = VN.App.addWindow(this);
    this.style = style;

    this.hasShadow = (style.indexOf('borderless') > -1) ? false : true; 
    this.minSize = [0.0, 0.0];
    this.maxSize = [9999.0, 9999.0];
  
    this.firstResponder = this;
    this.nextResponder = VN.App;
    
    this.set('level', VN.WINDOW_LEVELS['normal']); 
    this.set('contentView', VN.View.create({ frame: [0, 0, 0, 0] }));
    this.set('frame', rect);
    this.setNeedsDisplay(true);
        
    return this;
  },
  
  /**
    Whether or not the view needs display.
    @type Boolean
  */
  needsDisplay: null,
  
  /**
    @type VN.RenderContext
  */
  renderContext: null,
  
  /**
    @type Element
  */
  renderElement: null,
  
  /**
    @type VN.String
  */
  renderTagName: 'div',
  
  /**
    @type VN.String
  */
  renderClassName: 'vn-window',
  
  /**
    Sets up the rendering context and elements required for the window
  */
  setupRenderContext: function() {
    this.renderElement = document.createElement(this.renderTagName);
    this.renderElement.className = this.renderClassName;
    this.renderElement.id = 'guid_' + this.get('guid');
    this.renderContext = VN.RenderContext.renderContextWithElement(this.renderElement);
    document.body.appendChild(this.renderElement);
  },

  /**
    @param {VN.Array} frameRect
    @returns VN.Array
  */
  contentRectForFrameRect: function(frameRect) {
    var xOffset = 0, yOffset = 0, wOffset = 0, hOffset = 0;
    if (this.valueForKey('shadow')) { }
    return [0 + xOffset, 0 + yOffset, frameRect[2], frameRect[3]];
  },
  
  /**
    @param {VN.Array} contentRect
    @returns VN.Array
  */
  frameRectForContentRect: function(contentRect) {
    var xOffset = 0, yOffset = 0, wOffset = 0, hOffset = 0;
    if (this.valueForKey('shadow')) { }
    return [contentRect[0] + xOffset, contentRect[1] + yOffset, contentRect[2] + wOffset, contentRect[3] + hOffset];
  },
  
  /**
    @type VN.Array
    The Point that the event is referring to
  */
  eventBindingCurrent: null,
  
  /**
    @param {VN.Event} theEvent
  */
  mouseDown: function(theEvent) {
    if (this.get('zoomed')) return ;
  
    this.eventBindingCurrent = theEvent.locationInWindow();
    
    VN.App.bindEvents(['mouseup', 'mousemoved'], this, function(event) {
      if (event.type == 'mouseup') return VN.App.unbindEvents() ;
      
      var location = event.locationInWindow();
      if (!location) location = this.convertScreenToBase(event.locationInScreen());
      
      var newOrigin = [this.frame[0] + (location[0] - this.eventBindingCurrent[0]),
                      this.frame[1] + (location[1] - this.eventBindingCurrent[1])];
      
      this.set('frameOrigin', newOrigin);
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
  didChangeScreenParameters: function(notification) {
    if (this.valueForKey('isZoomed'))
      this.setValueForKey([0, 0, window.innerWidth, window.innerHeight], 'frame');
  },
  
  /**
    @type VN.String
  */
  title: null,
  
  /**
    @type VN.String
  */
  representedURL: null,
  
  /**
    @type VN.String
  */
  representedFilename: null,
  
  /**
    If the window should be considered for display in the windows menu
    @returns Boolean
  */
  isExcludedFromWindowsMenu: function() {
    return false;
  },
  
  /**
    @type VN.View
  */
  contentView: null,
  
  /**
    @param {VN.View} view
  */
  setContentView: function(view) {
    if (this.contentView)
      this.contentView.removeFromSuperview();
  
    this.contentView = view;
    
    view.viewWillMoveToSuperview(null);
    view.viewWillMoveToWindow(this);
    view.setFrame(this.contentRectForFrameRect(this.valueForKey('frame')));
    view.viewDidMoveToSuperview();
    view.viewDidMoveToWindow();
    view.setNextResponder(this);
    this.renderElement.appendChild(aView.renderElement);
  },
  
  /**
    Adds the given view(s) to the contentview for the window. If the passed
    object is an array, then each element in the array is added in turn
  */
  push: function(view) {
    this.contentView.push(view);
  },
  
  /**
    @type VN.Object
  */
  delegate: null,
  
  /**
    @param {VN.Object} object
  */
  setDelegate: function(object) {
    this.delegate = object;
  },
  
  /**
    @type VN.Array
  */
  frame: null,
  
  /**
    @param {VN.Array} frame
  */
  setFrame: function(frame) {
    this.frame = frame;
    
    var actualFrameRect = this.frameRectForContentRect(this._frame);
    CGDOMElementSetFrame(this.renderElement, actualFrameRect);
    
    this.contentView.setValueForKey(this.contentRectForFrameRect(this._frame), 'frame');
    
    this.setNeedsDisplay(true);
  },
  
  /**
    @param {VN.Array} origin
  */
  setFrameOrigin: function(origin) {
    this.frame[0] = origin[0], this.frame[1] = origin[1];
    CGDOMElementSetFrame(this.renderElement, this.frameRectForContentRect(this.frame));
  },
  
  /**
    @type VN.Array
  */
  bounds: null,

  /**
    @type VN.Responder
  */
  firstResponder: null,
  
  /**
    @param {VN.Responder} responder
  */
  makeFirstResponder: function(responder) {
    if (this.firstResponder == responder) return true ;
    
    if (!this.firstResponder.resignFirstResponder()) return false ;

    if (!responder || !responder.acceptsFirstResponder() || !responder.becomeFirstResponder())
      return false;
      
    this.firstResponder = aResponder;
    return true;
  },
  
  /**
    @param {VN.Event} event
  */
  keyDown: function(event) {
    console.log('key down in window');
    console.log(this.firstResponder());
    
    if (!this.performKeyEquivalent(event))
      this.interpretKeyEvents([event]); // pass in an array?
  },
  
  /**
    Closes the window
  */
  close: function() {
    console.log('window needs to close');
    document.body.removeChild(this.renderElement);
  },
 
  /**
    @type Boolean
  */
  isZoomed: null,
  
  /**
    @param {VN.Object} sender
  */
  zoom: function(sender) {
    console.log('zoom window');
  },
  
  /**
    @param {VN.Object} sender
  */
  makeKeyAndOrderFront: function(sender) {
    this.makeKeyWindow();
    this.makeMainWindow();
    this.orderFront();
  },
  
  /**
    @param {VN.Object} sender
  */
  orderFront: function(sender) {
    
  },
  
  /**
    @param {VN.Object} sender
  */
  orderBack: function(sender) {
    
  },
  
  /**
    @param {VN.Object} sender
  */
  orderOut: function(sender) {
    
  },
 
  /**
    @type Boolean
  */
  isVisible: null,
  
  /**
    @param {Boolean} flag
  */
  setVisible: function(flag) {
    this.renderElement.style.visibility = flag ? 'visible' : 'hidden';
  },
  
  /**
    @type Boolean
  */
  keyWindow: null,
  
  /**
    @type Boolean
  */
  mainWindow: null,
  
  /**
    @returns Boolean
  */
  canBecomeKeyWindow: function() {
    return true;
  },
  
  /**
    @returns Boolean
  */
  canBecomeMainWindow: function() {
    return true;
  },
  
  /**
    Makes the receiver the key window
  */
  makeKeyWindow: function() {
    if (this.canBecomeKeyWindow())
      this.becomeKeyWindow();
  },
  
  /**
    Makes the receiver the main window
  */
  makeMainWindow: function() {
    if (this.canBecomeMainWindow())
      this.becomeMainWindow();
  },
  
  becomeKeyWindow: function() {
    if (VN.App.valueForKey('keyWindow'))
      VN.App.valueForKey('keyWindow').resignKeyWindow();
    
    this.keyWindow = true;
    this.setValueForKey(VN.WINDOW_LEVELS['normal'] + 5, 'level');      
  },
  
  becomeMainWindow: function() {
    if (VN.App.valueForKey('mainWindow'))
      VN.App.valueForKey('mainWindow').resignKeyWindow();
    
    this.mainWindow = true;
    this.setValueForKey(VN.WINDOW_LEVELS['normal'] + 5, 'level');
  },
  
  resignKeyWindow: function() {
    this.keyWindow = false;
    this.setValueForKey(VN.WINDOW_LEVELS['normal'], 'level');
  },
  
  resignMainWindow: function() {
    this.mainWindow = false;
    this.setValueForKey(VN.WINDOW_LEVELS['normal'], 'level');
  },
  
  worksWhenModal: function() {
    return false;
  },
  
  convertBaseToScreen: function(aPoint) {
    
  },
  
  /**
    @param {VN.Array} point
    @returns VN.Array
  */
  convertScreenToBase: function(point) {
    return [point[0] - this.frame[0], point[1] - this.frame[1]];
  },
  
  performClose: function(sender) {
    console.log('close window');
    // borrowed.. nice effect from webkit.
    var duration = 0.5;
    this.renderElement.style.webkitTransition = '-webkit-transform ' + duration + 's ease-in, opacity ' + duration + 's ease-in';
    this.renderElement.offsetTop;
    this.renderElement.style.webkitTransformOrigin = "0 0";
    this.renderElement.style.webkitTransform = 'skew(30deg, 0deg) scale(0)';
    this.renderElement.style.opacity = '0';
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
    this.renderElement.style.zIndex = newLevel;
    this.level = newLevel;
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
          if (hitTest != this._firstResponder && hitTest.acceptsFirstResponder()) {
            this.makeFirstResponder(hitTest);
          }
          
          hitTest.mouseDown(theEvent);
        }
        else {
          console.log('Sending mouse down to (else)');
        }
        break;
      case NSLeftMouseUp:
        // console.log('mouse up;');
        break;
      case NSKeyDown:
        if (this._firstResponder) {
          // console.log('sending keydown to firstresponder');
          // console.log(this._firstResponder);
          this._firstResponder.keyDown(theEvent);
        }
        else {
          console.log('No Key Responder');
        }
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
    //   var actualBounds = this.frameRectForContentRect(this._frame);
    //   actualBounds.origin.x = 0;
    //   actualBounds.origin.y = 0;
    //   this.setNeedsDisplayInRect(actualBounds);
    // }
    this.setNeedsDisplayInRect(this.bounds());
	},
	
	setNeedsDisplayInRect: function(invalidRect) {

		this.displayRect(invalidRect);
	},
	
	needsDisplay: function() {
		
	},
	
	lockFocus: function() {
	  return;
	  
	  NSApplication.sharedApplication().setFocusView(this);
	  
		if (!this._graphicsContext)
			this._graphicsContext = NSGraphicsContext.graphicsContextWithGraphicsPort(this._DOMGraphicsContext.getContext('2d'), false);
		
		NSGraphicsContext.setCurrentContext(this._graphicsContext);
		CGContextSaveGState(this._graphicsContext.graphicsPort());
		CGContextClearRect(this._graphicsContext.graphicsPort(), NSMakeRect(0, 0, this._DOMGraphicsContext.width, this._DOMGraphicsContext.height));
	},
	
	unlockFocus: function() {
	  return;
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
	
	/**
    Draws the receiver in the given rect. This method is intended for old
    browser routines using the DOM. No canvas/VML based drawing should be
    carried out in these routines. Drawing can use css etc as intended. 
    See wiki for examples and more information.
    
    @param {NSRect} aRect
    @param {Boolean} firstTime
    @param {NSRenderContext} context
  */
  renderRect: function(aRect, firstTime, context) {
    if (firstTime) {
      context.setClass('ns-window');
      context.addClass('shadow');
      context.addClass('rounded');
    }
  },
	
	displayRectIgnoringOpacityInContext: function(aRect, context) {
		this.lockFocus();
    // this.drawRect(aRect);
    this.renderRect(aRect, this._renderContext.firstTime(), this._renderContext);
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


/**
  Run loop mode when using a modal panel
*/
VN.MODAL_PANEL_RUN_LOOP_MODE = "VNModalPanelRunLoopMode";

/**
  Run loop mode for tracking. Use the trackEventsForKeyMask method of 
  VN.Application
*/
VN.EVENT_TRACKING_RUN_LOOP_MODE = "VNEventTrackingRunLoopMode";

// VN.Application notification constants
VN.APPLICATION_DID_BECOME_ACTIVE_NOTIFICATION = "VNApplicationDidBecomeActiveNotification";
VN.APPLICATION_DID_HIDE_NOTIFICATION = "VNApplicationDidHideNotification";
VN.APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION = "VNApplicationDidFinishLaunchingNotification";
VN.APPLICATION_DID_RESIGN_ACTIVE_NOTIFICATION = "VNApplicationDidResignActiveNotification";
VN.APPLICATION_DID_UNHIDE_NOTIFICATION = "VNApplicationDidUnhideNotification";
VN.APPLICATION_DID_UPDATE_NOTIFICATION          = "VNApplicationDidUpdateNotification";
VN.APPLICATION_WILL_BECOME_ACTIVE_NOTIFICATION      = "VNApplicationWillBecomeActiveNotification";
VN.APPLICATION_WILL_HIDE_NOTIFICATION           = "VNApplicationWillHideNotification";
VN.APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION     = "VNApplicationWillFinishLaunchingNotification";
VN.APPLICATION_WILL_RESIGN_ACTIVE_NOTIFICATION      = "VNApplicationWillResignActiveNotification";
VN.APPLICATION_WILL_UNHIDE_NOTIFICATION           = "VNApplicationWillUnhideNotification";
VN.APPLICATION_WILL_UPDATE_NOTIFICATION           = "VNApplicationWillUpdateNotification";
VN.APPLICATION_WILL_TERMINATE_NOTIFICATION        = "VNApplicationWillTerminateNotification";
VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION  = "VNApplicationDidChangeScreenParametersNotification";


/**
  @class VN.Application
  @extends VN.Responder
*/
VN.Application = VN.Responder.extend({
  
  /**
    @type VN.Array all windows
  */
  windows: null,
  
  /**
    @type VN.Array queue of events needing processing
  */
  event_queue: null,
  
  /**
    Designated initializer
  */
  init: function() {  
    this.windows = [];
    this.event_queue = [];
    this.views_needing_display = [];
    
    return this;
  },
  
  /**
    @type VN.Array
  */
  views_needing_display: null,
  
  /**
    Marks the view as needing display if flag is true
    
    @param {VN.View} view
    @param {Boolean} flag
  */
  mark_view_for_display: function(view, flag) {
    if (this.views_needing_display.indexOf(view) == -1)
      this.views_needing_display.push(view);
  },
  
  /**
    Every view requiring rendering will be drawn by calling this
    function. This is called after every event is recieved by the
    system. Non user intiiated events, such as mouse/key events will
    also trigger this redraw. These events include timers/json requests
    etc.
  */
  display_required_views: function() {
    var the_view;
    while (the_view = this.views_needing_display.pop()) {
      var first_time = the_view.render_context.first_time();
      the_view.render_context.set('first_time', false);
      the_view.render(the_view.render_context, first_time);
    };
  },
  
  /**
    @type VN.Object
  */
  delegate: null,
  
  /**
    Sets the delegate for the singleton instance of NSApplication. This will
    also register the delegate for any NSApp related notifications that it
    responds to. Any that it does not implement, will not be registered.
    
    @param an_pbject The delegate object (usually setup in MainMenu.nib)
  */
  set_delegate: function(an_object) {
    if (this.delegate == an_object) return ;
    
    var nc = NSNotificationCenter.default_center();
    
    if (this.delegate) {
      nc.remove_observer(this.delegate, VN.APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION, this);
      nc.remove_observer(this.delegate, VN.APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION, this);
      nc.remove_observer(this.delegate, VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION, this);
    }
    
    this.delegate = anObject;
    
    if (this.delegate.responds_to('will_finish_launching'))
      nc.add_observer(this.delegate, 'will_finish_launching', VN.APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION, this);
    
    if (this.delegate.responds_to('did_finish_launching'))
      nc.add_observer(this.delegate, 'did_finish_launching', VN.APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION, this);
      
    if (this.delegate.respondsTo('did_change_screen_parameters'))
      nc.add_observer(this.delegate, 'did_change_screen_parameters', VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION, this);
  },
   
  add_window: function(a_window) {
    // Register for screen chnages (if it wants them)
    var default_center = NSNotificationCenter.default_center();
    default_center.add_observer(a_window, 'did_change_screen_parameters', VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION, this);
    
    this.windows.push(a_window);
    return this.windows.indexOf(a_window);
  },
  
  window_at_point: function(point) {
    for (var i = 0; i < this.windows.length; i++) {
      if(NSPointInRect(point, this.windows[i].frame())) {
        return this.windows[i];
      }
    }

    return null;
  },
  
  /**
    Gets the main window of the application by asking each window in turn
    if it is registered as the main window.
    
    @returns VN.Window
  */
  main_window: function() {
    for (var idx = 0; idx < this.windows.length; idx++) {
      if (this.windows[idx].is_main_window()) {
        return this.windows[idx];
      }
    }
    
    return null;
  },
  
  key_window: function() {
    for (var idx = 0; idx < this.windows.length; idx++) {
      if (this.windows[idx].is_key_window()) {
        return this.windows[idx];
      }
    }
    
    return null;
  },
  
  is_running: function() {
    
  },
  
  finish_launching: function() {
    var default_center = NSNotificationCenter.default_center();
    default_center.post_notification(VN.APPLICATION_WILL_FINISH_LAUNCHING_NOTIFICATION, this);
    default_center.post_notification(VN.APPLICATION_DID_FINISH_LAUNCHING_NOTIFICATION, this);
    this.display_required_views();
  },
  
  /**
    Runs the application once all necessary parts are loaded. Event handlers
    are attatched here.
  */
  run: function(closure) {
    closure(this);
    document.onmousedown = VN.Event.create;
    document.onmouseup = VN.Event.create;
    document.onmousemove = VN.Event.create;
    document.onkeypress = VN.Event.create;
    // match special keys that will not be caugh by onkeypress. It is important
    // to stop the event here for those key events, but we must allow other keys
    // to pass (by not returning false)
    document.onkeydown = function(theEvent) {
      switch (theEvent.keyCode) {
        case NSUpArrowFunctionKey:
        case NSDownArrowFunctionKey:
        case NSLeftArrowFunctionKey:
        case NSRightArrowFunctionKey:
        case NSDeleteForwardFunctionKey:
        case NSDeleteBackwardFunctionKey:
        case NSReturnFunctionKey:
        case NSEscapeFunctionKey:
        case NSTabFunctionKey:
        case NSPageUpFunctionKey:
        case NSPageDownFunctionKey:
          VN.Event.create(theEvent);
          break;
      };
    };
    
    // On resize, post notification (for app delegate, also windows listen and handle accordingly)
    window.onresize = function() {
      var defaultCenter = NSNotificationCenter.default_center();
      default_center.post_notification(VN.APPLICATION_DID_CHANGE_SCREEN_PARAMETERS_NOTIFICATION, this);
    };
    
    this.finish_launching();
  },
   
  post_event: function(event, at_start) {
    this.send_event(event);
  },
  
  current_event: null,
  
  send_event: function(event) {
    this.current_event = event;
    if (this.event_binding_queued) {   
      if (((1 << event.type()) & this.event_binding_mask) != 0) {
        this.event_binding_callback.apply(this.event_binding_context, [event]);
      }
      else {
        console.log('dropping event, as not matching bind mask');
      }
      return;
    }
    
    if (event.window())
      event.window().send_event(event);
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
    return this.windows;
  },
  
  setWindowsNeedUpdate: function(needUpdate) {
    
  },
  
  updateWindows: function() {
    
  },
  
  /**
    @param {NSMenu} aMenu
  */
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

/**
  Returns the singleton instance of the NSApplication object that exists
  for the application. This creates NSApp if it does not already exist.
    
  It is pretty safe to just reference NSApp itself in code, as it will 
  already have been created before any user code is likely to run, 
  assuming that no user code exists in the global scope.
*/
VN.Application.sharedApplication = function() {
  if (!VN.App) {
    VN.App = VN.Application.create();
  }
  
  return VN.App;
};



/**
  @protocol VN.ApplicationDelegate
*/
VN.ApplicationDelegate = VN.protocol({
  
  /**
    @optional
    
    @param {NSApplication} sender
    @returns NSApplicationTerminateReply
  */
  shouldTerminate: function(sender) {
  },
  
  /**
    @optional
    
    @param {NSApplication} sender
    @param {NSString} filename
    @returns Boolean
  */
  openFile: function(sender, filename) {
  },
  
  /**
    @optional
    
    @param {NSApplication} sender
    @returns Boolean
  */
  shouldOpenUntitledFile: function(sender) {
  },
  
  /**
    @optional
    
    @param {NSApplication} application
    @param {NSError} error
    @returns NSError
  */
  willPresentError: function(application, error) {
  },
  
  /**
    @optional
    
    @notification NSApplicationWillFinishLaunchingNotification
    @param {NSNotification} notification
  */
  
  willFinishLaunching: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  didFinishLaunching: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  willHide: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  didHide: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  wullUnhide: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  didUnhide: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  willBecomeActive: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  didBecomeActive: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  willResignActive: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  willUpdate: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  willTerminate: function(notification) {
  },
  
  /**
    @optional
    
    @notification applicationDidFinishLaunching
    @param {NSNotification} notification
  */
  
  didChangeScreenParameters: function(notification) {
  }
});

/**
  @type VN.Application the global VN.Application singleton
*/
VN.App = VN.Application.create();
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
 

VN.VIEW_AUTO_RESIZE = [
  'none', 'minX', 'width', 'maxX', 'minY', 'height', 'maxY'
];

VN.VIEW_BORDER_TYPES = [
  'none', 'line', 'bezel', 'groove'
];

VN.VIEW_NOTIFICATIONS = [
  'frameDidChange', 'focusDidChange', 'boundsDidChange', 'globalFrameDidChange',
  'didUpdateTrackingAreas'
];

/**
  @class VN.View
  @extend VN.Responder
*/
VN.View = VN.Responder.extend({
  
  default_options: { frame: [0, 0, 0, 0] },
  
	/**
		Default initializer
		
		@returns VN.View
	*/
	init: function(options) {
    this.setupGraphicsContextDisplay();   
    this.frame = NSMakeRect (0, 0, 0, 0);
    return this;
  },
  
  init_with_options: function(options) {
    return this.init_with_frame(options.remove('frame'));
  },
  
  /**
    Initialize with the given frame

		@param {VN.Rect} frameRect
		@returns VN.View
  */
  init_with_frame: function(frame) {
    this.frame = frame;
    this.bounds = [0, 0, frame[2], frame[3]];
    this.subviews = [];
    
    this.setup_render_context();
    this.set('frame', frame);

    return this;
  },
  
  /**
    Initialize with the given coder
    
    @param {VN.Coder} aCoder
    @returns VN.View
  */
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    this.setupRenderContext();
    
    this.frame = NSMakeRect(0, 0, 0, 0);
    this.bounds = NSMakeRect(0, 0, 0, 0);
    
    if (aCoder.containsValueForKey("NSFrame"))
      this.frame = aCoder.decodeRectForKey("NSFrame");
    else if (aCoder.containsValueForKey("NSFrameSize"))
      this.frame.size = aCoder.decodeSizeForKey("NSFrameSize");
    
    this.setFrame(this.frame);
    
    var theSubviews = aCoder.decodeObjectForKey("NSSubviews");
    this.superview = aCoder.decodeObjectForKey("NSSuperview");
    this.window = null;
    this.subviews = [];
    
    if (theSubviews) {
      for (var idx = 0; idx < theSubviews.length; idx++) {
        this.addSubview(theSubviews[idx]);
      }
    }
    
    // this.bounds.origin = NSMakePoint(0, 0);
    // this.bounds.size = this.frame.size;
    
    var vFlags = aCoder.decodeIntForKey("NSvFlags");
    this.autoResizesSubviews = true;
    this.autoResizeMask = vFlags & 0x3F;
    
    return this;
  },

	/*
		@type VN.Rect
	*/
	frame: null,
	
	/*
		@param {VN.Rect} frameRect
	*/
	set_frame: function(frame) {
    var old = this.bounds;    
    this.frame = frame;
    CGDOMElementSetFrame(this.render_element, this.frame);
    
    if (this.auto_resizes_subviews)
      this.resize_subviews_with_old_size(old.size);
    
    this.bounds.size = this.frame.size;
    this.set_needs_display(true);
  },
	
	/*
		@param {VN.Point} newOrigin
	*/
	setFrameOrigin: function(newOrigin) {
    this.frame.origin = newOrigin;
    CGDOMElementSetFrame(this.renderElement, this.frame);
  },
  
	/*
		@param {VN.Size} newSize
	*/
  setFrameSize: function(newSize) {
    var oldBounds = this.bounds;
    this.frame.size = newSize;
    CGDOMElementSetFrame(this.renderElement, this.frame);
    
    if (this._autoResizesSubviews)
      this.resizeSubviewsWithOldSize(oldBounds.size);
    
    this.bounds.size = this.frame.size;
    this.setNeedsDisplay(true);
  },
  
	/*
		@type VN.Rect
	*/
  bounds: null,

  _window: null,
  _gState: null,
  
  _menu: null,
  superview: null,
  subviews: null,
  
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
    Whether or not the view needs display.
    @type Boolean
  */
  needsDisplay: null,
  
  /**
    @type VN.RenderContext
  */
  renderContext: null,
  
  /**
    @type Element
  */
  renderElement: null,
  
  /**
    @type VN.String
  */
  renderTagName: 'div',
  
  /**
    @type VN.String
  */
  renderClassName: 'vn-view',
  
  /**
    Sets up the render context so that it is ready to be rendered. This
    will be called before the elements can be rendered.
  */  
  setupRenderContext: function() {
    this.renderElement = document.createElement(this.renderTagName);
    this.renderElement.className = this.renderClassName;
    this.renderElement.id = 'guid_' + this.guid();
    this.renderContext = VN.RenderContext.renderContextWithElement(this.renderElement);
  },
   
  /*
  	Returns true if this view is in the hierarchy of aView

		@param {VN.View} aView
		@returns Boolean
  */
  isDescendantOf: function(aView) {
    return true;
  },
  
  ancestorSharedWithView: function(aView) {
    
  },
  
  opaqueAncestor: function() {
    
  },

	/*
		@type Boolean
	*/
	isHidden: null,
	
  /*
  	@param {Boolean} flag
  */
  setHidden: function(flag) {
    this.isHidden = flag;
    // just sets style parameter directly
		this.renderElement.style.visibility = flag ? 'hidden' : 'visible';
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
    this.renderElement.appendChild(aView.renderElement);
    aView.viewDidMoveToSuperview();
    aView.viewDidMoveToWindow();
    this.didAddSubview(aView);
    this.subviews.addObject(aView);
  },
  
  addSubviewPositionedRelativeTo: function(aView, place,otherView) {
    
  },
  
  sortSubviewsUsingFunction: function(compare, context) {
    
  },
  
	/*
		@param {VN.Window} newWindow
	*/
  viewWillMoveToWindow: function(newWindow) {
    this.window = newWindow;
    
    for (var idx = 0; idx < this.subviews.length; idx++) {
      this.subviews[idx].viewWillMoveToWindow(newWindow);
    }
  },
  
  viewDidMoveToWindow: function() {
    
  },
  
  viewWillMoveToSuperview: function(newSuperview) {
    this.superview = newSuperview;
    this._nextResponder = newSuperview;
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
    
    if (this.superview) {
      theParentElement = this.superview.renderElement;
      theParentElement.removeChild(this.renderElement);
      this.superview.subviews.splice(this.superview.subviews.indexOf(this), 1);
    }
    else if (this._window) {
      theParentElement = this._window.DOMContainer();
      theParentElement.removeChild(this.renderElement);
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
    for (var idx = 0; idx < this.subviews.length; idx++)
      this.subviews[idx].resizeWithOldSuperviewSize(oldSize);
  },

  resizeWithOldSuperviewSize: function(oldSize) {
    var superFrame = this.superview.frame;
    var thisFrame = this.frame;
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
      x: aPoint.x - this.frame.origin.x,
      y: aPoint.y - this.frame.origin.y
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
  
  /**
    @param {NSRect} aRect
    @param {NSView} aView
    @returns NSRect
  */
  convertRectToView: function(aRect, aView) {
    if (!aView) return this.convertRectFromBase(aRect);
    
    return {
			size: { width: aRect.size.width,
				  height: aRect.size.height },
      origin: { x: aRect.origin.x - aView.frame.origin.x,
        	  y: aRect.origin.y - aView.frame.origin.y }
    };
  },
  
  centerScanRect: function(aRect) {
    
  },
  
  convertPointToBase: function(aPoint) {
    
  },
  
  convertPointFromBase: function(aPoint) {
    if (this.superview) {
      return this.superview.convertPointFromBase({ 
        x: aPoint.x - this.frame.origin.x,
        y: aPoint.y - this.frame.origin.y
      });
    }
    // else if (this._window) {
    //   return {
    //     x: aPoint.x - this._window.frame().origin.x,
    //     y: aPoint.y - this._window.frame().origin.y
    //   };
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
    this.needsDisplay = flag;
    VN.Application.sharedApplication().markViewForDisplay(this, flag);
  },
  
  setNeedsDisplayInRect: function(invalidRect) {
    this.displayRect(invalidRect);
  },
  
  lockFocus: function() {  
    return;
    
    if (!this._graphicsContext)
      this._graphicsContext = NSGraphicsContext.graphicsContextWithGraphicsPort(this._DOMGraphicsContext.getContext('2d'), false);
    
    
    NSGraphicsContext.setCurrentContext(this._graphicsContext);
    CGContextSaveGState(this._graphicsContext.graphicsPort());
    CGContextClearRect(this._graphicsContext.graphicsPort(), this.bounds);
  },
  
  unlockFocus: function() {
    return;
         
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
    
    @param {Boolean} firstTime
    @param {NSRenderContext} context
  */
  render: function(context, firstTime) {
    // Render using DOM.
  },
  
  displayRectIgnoringOpacityInContext: function(aRect, context) {
    this.lockFocus();
    // this.drawRect(aRect);
    var firstTime = this.renderContext.firstTime();
    this.renderContext.setFirstTime(false);
    this.render(this.renderContext, firstTime);
    
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
    console.log(this.bounds);
    aPoint = this.convertPointFromView(aPoint, this.superview);
    if (!NSPointInRect(aPoint, this.bounds)) {
      return null;
    }
    else {
      var count = this.subviews.count();

      for (var i = 0; i < count; i++) {
        var viewToCheck = this.subviews[i];
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

/**
  Create a view with the given frame, and then set each of the given properties
  on the newly created view.
  
  @param {VN.Rect} frameRect
  @param {Object} properties optional
  @returns {VN.View} new view
*/
VN.View.createWithFrame = function(frameRect, props) {
  var ret = this.create('initWithFrame', frameRect);
  if (props) {
    for (key in args[0])
      ret[key] = args[0][key];
  }
  return ret;
};
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
    //    attributes.setObjectForKey(this.textColor(), NSForegroundColorAttributeName);
    // }
    // else {
			attributes.setObjectForKey(NSColor.colorWithCalibratedRGBA(0.8, 0.8, 0.8, 1.0), NSForegroundColorAttributeName);
    // }

		return NSAttributedString.create('initWithStringAndAttributes', this._appTitle, attributes);
  },
  
  drawRect: function(aRect) {
    // var c = NSGraphicsContext.currentContext().graphicsPort();
    // CGContextSetShadowWithColor(c, NSMakeSize(1, 1), 0, NSColor.colorWithCalibratedRGBA(0.204, 0.204, 0.204, 0.8));
    // this.attributedTitle().drawWithRectAndOptions(aRect, null);
  }
});
/* 
 * key_value_binding.js
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


VN.MULTIPLE_VALUES_MARKER = "VNMultipleValuesMarker";
VN.NO_SELECTION_MARKER = "VNNoSelectionMarker";
VN.NOT_APPLICABLE_MARKER = "VNNotApplicableMarker";

/**
  Useful method for determining whether objects are used as markers in binding
  dicitonary arrays.
  
  @param {VN.Object} object
  @return Boolean
*/
VN.IsControllerMarker = function(object) {
  if (object == VN.MULTIPLE_VALUES_MARKER || object ==  VN.NO_SELECTION_MARKER || object == VN.NOT_APPLICABLE_MARKER)
    return true;
  
  return false;
}

/**
  For the infoForBinding dictionary: the actual object being observed
*/
VN.OBSERVED_OBJECT_KEY = "VNObservedObjectKey";

/**
  For the infoForBinding dictionary: the keyPath used for observing
*/
VN.OBSERVED_KEY_PATH_KEY = "VNObservedKeyPathKey";

/**
  For the infoForBinding dictionary: any options for the binding
*/
VN.OPTIONS_KEY = "VNOptionsKey";

/**
  Bindings exposed here will then become available in the instance method
  exposedBindings();
  
  @param {VN.String} binding
*/
VN.Object.exposeBinding = function(binding) {
  // should expose the binding in Interface Builder
};

/**
  @mixin VNKeyValueBindingCreation
  @class VN.Object
*/
VN.Object.mixin({
  
  /**
    A VN.Dictionary used for holding binding info. Each key is the binding 
    context name (see lower area of this file) and the value for each key
    is another dictionary holding information for the binding.
    
    @type VN.Dictionary
  */
  _kvb_info: VN.Dictionary.create(),
  
  
  /**
    @returns VN.Array
  */
  exposedBindings: function() {
    
  },
  
  /**
    Optional method.
    
    @param binding - NSString
    @return Class
  */
  valueClassForBinding: function(binding) {
    
  },
  
  /**
    Instantiate a binding to the object. Placeholders and other information
    can be specified in the options dictionary.
    
    @param binding - NSString
    @param toObject - NSObject
    @param withKeyPath - NSString
    @param options - NSDictionary
  */
  bind: function(binding, toObject, withKeyPath, options) {
    console.log('bind ' + binding + " to key path " + withKeyPath + ' for ');
    console.log(this);
  },
  
  /**
    Remove the specified binding
    
    @param binding - NSString
  */
  unbind: function(binding) {
    
  },
  
  /**
    Information about the dictionary. Can be null if the binding is not
    bound. Contains these three items:
    
    NSObservedObjectKey   - the bound object
    NSObservedKeyPathKey  - the bound keypath
    NSOptionsKey      - specified options
    
    @param binding - NSString
    @return NSDictionary
  */
  infoForBinding: function(binding) {
    
  },
  
  /**
    Returns array of NSAttributeDescriptions for binding
    
    @param binding - NSString
    @return NSArray
  */
  optionDescriptionsForBinding: function(binding) {
    
  }
});

/**
  @mixin NSPlaceholders (meta class)
*/
VN.extend(NSObject, {
  
  /**
    Marker can be null, NSMultipleValuesMarker, NSNoSelectionMarker or
    NSNotApplicableMarker
    
    @param placeholder - NSObject
    @param marker - NSObject
    @param binding - NSString
  */
  setDefaultPlaceholderForMarker: function(placeholder, marker, binding) {
    
  },
  
  /**
    Marker can be null, NSMultipleValuesMarker, NSNoSelectionMarker or
    NSNotApplicableMarker
  
    @param marker - NSObject
    @param binding - NSString
  */
  defaultPlaceholderForMarker: function(marker, binding) {
    
  }
});

/**
  @mixin NSEditorRegistration
  
  These should be implemented by controllers etc.
*/
VN.Object.mixin({
  
  /**
    @param editor - NSObject
  */
  objectDidBeginEditing: function(editor) {
    
  },
  
  /**
    @param editor - NSObject
  */
  objectDidEndEditing: function(editor) {
    
  }
});

/**
  @mixin NSEditor
  
  These should be implemented by controllers etc.
*/
VN.Object.mixin({
  
  /**
    Reverts back to original value (end chnages).
  */
  discardEditing: function() {
    
  },
  
  /**
    Returns whether or not end editing was a success. It might not be if the
    value is invalid (e.g. an object requires a float value, but was given
    a string).
    
    @return boolean
  */
  commitEditing: function() {
    
  },
  
  /**
    @param delegate - NSObject
    @param didCommitAction - function pointer for delegate
    @param contextInfo - NSObject
  */
  commitEditingWithDelegate: function(delegate, didCommitAction, contextInfo) {
    
  }
});

/**
  Default constant names for bindings (AppKit defined)
*/
VN.ALIGNMENT_BINDING = "VNAlignmentBinding";
VN.ALTERNATE_IMAGE_BINDING = "VNAlternateImageBinding";
VN.ALTERNATE_TITLE_BINDING = "VNAlternateTitleBinding";
VN.ANIMATE_BINDING = "VNAnimateBinding";
VN.ANIMATION_DELAY_BINDING = "VNAnimationDelayBinding";
VN.ARGUMENT_BINDING = "VNArgumentBinding";
VN.ATTRIBUTED_STRING_BINDING = "VNAttributedStringBinding";
VN.CONTENT_ARRAY_BINDING = "VNContentArrayBinding";
VN.CONTENT_ARRAY_FOR_MULTIPLE_SELECTION_BINDING = "VNContentArrayForMultipleSelectionBinding";
VN.CONTENT_BINDING = "VNContentBinding";
VN.CONTENT_DICTIONARY_BINDING = "VNContentDictionaryBinding";
VN.CONTENT_HEIGHT_BINDING = "VNContentHeightBinding";
VN.CONTENT_OBJECT_BINDING = "VNContentObjectBinding";
VN.CONTENT_OBJECTS_BINDING = "VNContentObjectsBinding";
VN.CONTENT_SET_BINDING = "VNContentSetBinding";
VN.CONTENT_VALUES_BINDING = "VNContentValuesBinding";
VN.CONTENT_WIDTH_BINDING = "VNContentWidthBinding";
VN.CRITICAL_VALUE_BINDING = "VNCriticalValueBinding";
VN.DATA_BINDING = "VNDataBinding";
VN.DISPLAY_PATTERN_TITLE_BINDING = "VNDisplayPatternTitleBinding";
VN.DISPLAY_PATTERN_VALUE_BINDING = "VNDisplayPatternValueBinding";
VN.DOCUMENT_EDITED_BINDING = "VNDocumentEditedBinding";
VN.DOUBLE_CLICK_ARGUMENT_BINDING = "VNDoubleClickArgumentBinding";
VN.DOUBLE_CLICK_TARGET_BINDING = "VNDoubleClickTargetBinding";
VN.EDITABLE_BINDING = "VNEditableBinding";
VN.ENABLED_BINDING = "VNEnabledBinding";
VN.EXCLUDED_KEYS_BINDING = "VNExcludedKeysBinding";
VN.FILTER_PREDICATE_BINDING = "VNFilterPredicateBinding";
VN.FONT_BINDING = "VNFontBinding";
VN.FONT_BOLD_BINDING = "VNFontBoldBinding";
VN.FONT_FAMILY_NAME_BINDING = "VNFontFamilyNameBinding";
VN.FONT_ITALIC_BINDING = "VNFontItalicBinding";
VN.FONT_NAME_BINDING = "VNFontNameBinding";
VN.FONT_SIZE_BINDING = "VNFontSizeBinding";
VN.HEADER_TITLE_BINDING = "VNHeaderTitleBinding";
VN.HIDDEN_BINDING = "VNHiddenBinding";
VN.IMAGE_BINDING = "VNImageBinding";
VN.INCLUDED_KEYS_BINDING = "VNIncludedKeysBinding";
VN.INITIAL_KEY_BINDING = "VNInitialKeyBinding";
VN.INTIAL_VALUE_BINDING = "VNInitialValueBinding";
VN.IS_INDETERMINATE_BINDING = "VNIsIndeterminateBinding";
VN.LABEL_BINDING = "VNLabelBinding";
VN.LOCALIZED_KEY_DICTIONARY_BINDING = "VNLocalizedKeyDictionaryBinding";
VN.MANAGED_OBJECT_CONTEXT_BINDING = "VNManagedObjectContextBinding";
VN.MAXIMUM_RECENTS_BINDING = "VNMaximumRecentsBinding";
VN.MAX_VALUE_BINDING = "VNMaxValueBinding";
VN.MAX_WIDTH_BINDING = "VNMaxWidthBinding";
VN.MIN_VALUE_BINDING = "VNMinValueBinding";
VN.MIN_WIDTH_BINDING = "VNMinWidthBinding";
VN.MIXED_STATE_IMAGE_BINDING = "VNMixedStateImageBinding";
VN.OFF_STATE_IMAGE_BINDING = "VNOffStateImageBinding";
VN.ON_STATE_IMAGE_BINDING = "VNOnStateImageBinding";
VN.PREDICATE_BINDING = "VNPredicateBinding";
VN.RECENT_SEARCHES_BINDING = "VNRecentSearchesBinding";
VN.REPRESENTED_FILENAME_BINDING = "VNRepresentedFilenameBinding";
VN.ROW_HEIGHT_BINDING = "VNRowHeightBinding";
VN.SELECTED_IDENTIFIER_BINDING = "VNSelectedIdentifierBinding";
VN.SELECTED_INDEX_BINDING = "VNSelectedIndexBinding";
VN.SELECTED_LABEL_BINDING = "VNSelectedLabelBinding";
VN.SELECTED_OBJECT_BINDING = "VNSelectedObjectBinding";
VN.SELECTED_OBJECTS_BINDING = "VNSelectedObjectsBinding";
VN.SELECTED_TAG_BINDING = "VNSelectedTagBinding";
VN.SELECTED_VALUE_BINDING = "VNSelectedValueBinding";
VN.SELECTED_VALUES_BINDING = "VNSelectedValuesBinding";
VN.SELECTION_INDEXES_BINDING = "VNSelectionIndexesBinding";
VN.SELECTION_INDEX_PATHS_BINDING = "VNSelectionIndexPathsBinding";
VN.SORT_DESCRIPTORS_BINDING = "VNSortDescriptorsBinding";
VN.TAGRTE_BINDING = "VNTargetBinding";
VN.TEXT_COLOR_BINDING = "VNTextColorBinding";
VN.TITLE_BINDING = "VNTitleBinding";
VN.TOOP_TIP_BINDING = "VNToolTipBinding";
VN.TRANSPARENT_BINDING = "VNTransparentBinding";
VN.VALUE_BINDING = "VNValueBinding";
VN.VALUE_PATH_BINDING = "VNValuePathBinding";
VN.VALUE_URL_BINDING = "VNValueURLBinding";
VN.VISIBLE_BINDING = "VNVisibleBinding";
VN.WARNING_VALUE_BINDING = "VNWarningValueBinding";
VN.WIDTH_BINDING = "VNWidthBinding";


/**
  Options for bindings (used with info keys at top).
*/
VN.ALLOWS_EDITING_MULTIPLE_VALUES_SELECTION_BINDING_OPTION = "VNAllowsEditingMultipleValuesSelectionBindingOption";
VN.ALLOWS_NULL_ARGUMENT_BINDING_OPTION = "VNAllowsNullArgumentBindingOption";
VN.ALWAYS_PRESENTS_APPLICATION_MODAL_ALERTS_BINDING_OPTION = "VNAlwaysPresentsApplicationModalAlertsBindingOption";
VN.CONDITIONALLY_SETS_EDITABLE_BINDING_OPTION = "VNConditionallySetsEditableBindingOption";
VN.CONDITIONALLY_SETS_ENABLED_BINDING_OPTION = "VNConditionallySetsEnabledBindingOption";
VN.CONDITIONALLY_SETS_HIDDEN_BINDING_OPTION = "VNConditionallySetsHiddenBindingOption";
VN.CONTINUOUSLY_UPDATES_VALUE_BINDING_OPTION = "VNContinuouslyUpdatesValueBindingOption";
VN.CREATES_SORT_DESCRIPTOR_BINDING_OPTION = "VNCreatesSortDescriptorBindingOption";
VN.DELETES_OBJECTS_ON_REMOVE_BINDING_OPTION = "VNDeletesObjectsOnRemoveBindingsOption";
VN.DISPLAY_NAME_BINDING_OTPTION = "VNDisplayNameBindingOption";
VN.DISPLAY_PATTERN_BINDING_OPTION = "VNDisplayPatternBindingOption";
VN.CONTENT_PLACEMENT_TAG_BINDING_OPTION = "VNContentPlacementTagBindingOption";
VN.HANDLES_CONTENT_AS_COMPOUND_VALUE_BINDING_OPTION = "VNHandlesContentAsCompoundValueBindingOption";
VN.INSERTS_NULL_PLACEHOLDER_BINDING_OPTION = "VNInsertsNullPlaceholderBindingOption";
VN.INVOKES_SEPERATELY_WITH_ARRAY_OBJECTS_BINDING_OPTION = "VNInvokesSeparatelyWithArrayObjectsBindingOption";
VN.MULTIPLE_VALUES_PLACEHOLDER_BINDING_OTPION = "VNMultipleValuesPlaceholderBindingOption";
VN.NO_SELECTION_PLACEHOLDER_BINDING_OPTION = "VNNoSelectionPlaceholderBindingOption";
VN.NOT_APPLICABLE_PLACEHOLDER_BINDING_OPTION = "VNNotApplicablePlaceholderBindingOption";
VN.NULL_PLACEHOLDER_BINDING_OPTION = "VNNullPlaceholderBindingOption";
VN.RAISES_FOR_NOT_APPLICABLE_KEYS_BINDING_OPTION = "VNRaisesForNotApplicableKeysBindingOption";
VN.PREDICATE_FORMAT_BINDING_OPTION = "VNPredicateFormatBindingOption";
VN.SELECTOR_NAME_BINDING_OPTION = "VNSelectorNameBindingOption";
VN.SELECTS_ALL_WHEN_SETTING_CONTENT_BINDING_OPTION = "VNSelectsAllWhenSettingContentBindingOption";
VN.VALIDATES_IMMEDIATELY_BINDING_OPTION = "VNValidatesImmediatelyBindingOption";
VN.VALUE_TRANSFORMER_NAME_BINDING_OPTION = "VNValueTransformerNameBindingOption";
VN.VALUE_TRANSFORMER_BINDING_OPTION = "VNValueTransformerBindingOption";
/* 
 * controller.js
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


var NSController = NSObject.extend({
  
  /*
    NSArray
  */
  _editors: null,
  
  /*
    NSArray
  */
  _declaredKeys: null,
  
  /*
    NSDictionary
  */
  _dependentKeyToModelKeyTable: null,
  
  /*
    NSDictionary
  */
  _modelKeyToDependentKeyTable: null,
  
  /*
    @param editor - NSObject
  */
  objectDidBeginEditing: function(editor) {
    
  },
  
  /*
    @param editor - NSObject
  */
  objectDidEndEditing: function(editor) {
    
  },
  
  discardEditing: function() {
    
  },
  
  /*
    @return boolean
  */
  commitEditing: function() {
    
  },
  
  commitEditingWithDelegate: function(delegate, didCommitAction, contextInfo) {
    
  },
  
  /*
    @return boolean
  */
  isEditing: function() {
    
  }
});
/* 
 * object_controller.js
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
  @class NSObjectController
  @extends NSController
*/
var NSObjectController = VN.ObjectController = NSController.extend({
  
  /**
    @type NSString
  */
  _objectClassName: null,
  
  /**
    @type Class
  */
  _objectClass: null,
  
  /**
    @type NSArray
  */
  _contentObjectArray: null,
  
  /**
    @type NSObject
  */
  _content: null,
  
  /**
    @type NSObject
  */
  _objectHandler: null,
  
  /**
    @param {NSCoder} aCoder
    @returns NSObjectController
  */
  initWithCoder: function(aCoder) {
    this._objectClassName = aCoder.decodeObjectForKey("NSObjectClassName");
    this._editable = aCoder.decodeBoolForKey("NSEditable");
    this._automaticallyPreparesContent = aCoder.decodeBoolForKey("NSAutomaticallyPreparesContent");
    return this;
  },
  
  /**
    Override observers binding for certain keys. Observing properties of 
    changing attributes, e.g. in content arrays requires custom behaviour.
    
    A lot of bindable properties do not actually exist in arrays, for 
    instance.
    
		@param {NSString} keyPath
		@param {NSObject} ofObject
		@param {NSDictionary} change
		@param {Object} context
	*/
  observeValueForKeyPath: function(keyPath, ofObject, change, context) {
    console.log('observer notification for:' + keyPath + ' in objectcontroller');
  },
  
  /*
    @param NSObject content
    @return NSObjectController
  */
  initWithContent: function(content) {
    
  },
  
  /*
    @param NSObject content
  */
  setContent: function(content) {
    
  },
  
  /**
    @return NSObject
  */
  content: function() {
    
  },
  
  /**
    Returns the object being used to access the content
    
    @return NSObject
  */
  selection: function() {
    
  },
  
  /**
    Returns an array of all the content objects
    
    @return NSArray
  */
  selectedObjects: function() {
    
  },
  
  /**
    When loaded from xib files, prepareContent will be called (if true).
    
    @param boolean flag
  */
  setAutomaticallyPreparesContent: function(flag) {
    
  },
  
  /**
    @return boolean
  */
  automaticallyPreparesContent: function() {
    
  },
  
  /*
    Sets the content. Default just creates a new object, of the required
    type, and sets it as the content. (based on _objectClass ivar)
  */
  prepareContent: function() {
    
  },
  
  /*
    The object class to use when creating new objects
    
    @param Class objectClass
  */
  setObjectClass: function(objectClass) {
    
  },
  
  /*
    @return Class
  */
  objectClass: function() {
    
  },
  
  /*
    Creates a new object, _objectClass, when adding/inserting objects. Uses
    the default init() method of the object.
    
    @return NSObject (or subclass of)
  */
  newObject: function() {
    
  },
  
  /*
    Sets the content object for the controller.
    
    @param NSObject object
  */
  addObject: function(object) {
    
  },
  
  /*
    Removes the object if current content
    
    @param NSObject object
  */
  removeObject: function(object) {
    
  },
  
  /*
    Sets whether the controller can add/remove objects
    
    @param boolean flag
  */
  setEditable: function(flag) {
    
  },
  
  /*
    @return boolean
  */
  isEditable: function() {
    
  },
  
  /*
    Creates a new object with newObject() and then adds it using addObject()
    
    @param NSObject sender - object that requested a new object to be added
  */
  add: function(sender) {
    
  },
  
  /*
    Returns whether or not new objects can be added.
    
    @return boolean
  */
  canAdd: function() {
    
  },
  
  /*
    Removes content object through removeObject()
    
    @param NSObject sender - object that requested removal
  */
  remove: function(sender) {
    
  },
  
  /*
    Returns whether or not an item can be removed (false if there
    are no items in content, for example)
    
    @return boolean
  */
  canRemove: function() {
    
  }
});
/*
 * array_controller.js
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
  @class VN.ArrayController
  @extend VN.ObjectController
*/
var NSArrayController = VN.ArrayController = VN.ObjectController.extend({
  
  /**
    @type NSInteger
  */
  _observedIndexHint: null,
  
  /**
    @type NSArray
  */
  _objects: null,
  
  /**
    @type NSIndexSet
  */
  _cachedSelectedIndexes: null,
  
  /**
    @type NSArray
  */
  _cachedSelectedObjects: null,
  
  /**
    @type Boolean
  */
  _isEditable: null,
  
  /**
    @type Boolean
  */
  _avoidsEmptySelection: null,
  
  /**
    @type Boolean
  */
  _preservesSelection: null,
  
  /** 
    @type NSArray
  */
  _declaredKeys: null,
  
  /**
    @param {NSCoder} aCoder
    @returns NSArrayController
  */
  initWithCoder: function(aCoder) {
    this._arrangedObjects = [];
    this._selectionIndexes = VN.IndexSet.indexSet();
		
    this._isEditable = aCoder.decodeBoolForKey('NSEditable');
    this._avoidsEmptySelection = aCoder.decodeBoolForKey('NSAvoidsEmptySelection');
    this._preservesSelection = aCoder.decodeBoolForKey('NSSelectsInsertedObjects');
    this._declaredKeys = aCoder.decodeObjectForKey('NSDeclaredKeys');
    return this;
  },
  
  /*
    Over-ridden from VN.ObjectController
    
    @param VN.Object content
  */
  setContent: function(content) {
    this._objects = content;
    // this.willChangeValueForKey('arrangedObjects');
    // this._arrangedObjects = this.arrangeObjects(this._objects);
    // this.didChangeValueForKey('arrangedObjects');
    this.setValueForKey(this.arrangeObjects(this._objects), 'arrangedObjects');
    this.setValueForKey(VN.IndexSet.indexSetWithIndex(0), 'selectionIndexes');
  },
  
  /**
    Instantiate a binding to the object. Placeholders and other information
    can be specified in the options dictionary.
    
    @param binding - NSString
    @param toObject - NSObject
    @param withKeyPath - NSString
    @param options - NSDictionary
  */
  bind: function(binding, toObject, withKeyPath, options) {
    if (binding == 'contentArray') {
      toObject.addObserverForKeyPath(this, withKeyPath, 0, VN.CONTENT_ARRAY_BINDING);
      
      var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
        [toObject, withKeyPath, options],
        [VN.OBSERVED_OBJECT_KEY, VN.OBSERVED_KEY_PATH_KEY, VN.OPTIONS_KEY]);

      this._kvb_info.setObjectForKey(bindingInfo, VN.CONTENT_ARRAY_BINDING);
      // if content is null...
      var theContent = toObject.valueForKeyPath(withKeyPath) || [];
      this.setContent(theContent);
    }
  },

   /**
 		@param {NSString} keyPath
 		@param {NSObject} ofObject
 		@param {NSDictionary} change
 		@param {Object} context
 	*/
   observeValueForKeyPath: function(keyPath, ofObject, change, context) {
     if (context == VN.CONTENT_ARRAY_BINDING) {
       this.setContent(ofObject.valueForKeyPath(keyPath));
     }
   },
  
  /**
    Rearranges objects ready for display. This might include sorting and
    filtering.
  */
  rearrangeObjects: function() {
    
  },
  
  /**
    Sets whether the controller rearranges objects. Default is false
    
    @param boolean flag
  */
  setAutomaticallyRearrangesObjects: function(flag) {
    
  },
  
  /**
    @return boolean
  */
  automaticallyRearrangesObjects: function() {
    
  },
  
  /**
    @return NSArray
  */
  automaticRearrangementKeyPaths: function() {
    
  },
  
  /**
    ..
  */
  didChangeArrangementCriteria: function() {
    
  },
  
  /**
    @param NSArray sortDescriptors
  */
  setSortDescriptors: function(sortDescriptors) {
    
  },
  
  /**
    @return NSArray
  */
  sortDescriptors: function() {
    
  },
  
  /**
    @param NSPredicate filterPredicate
  */
  setFilterPredicate: function(filterPredicate) {
    
  },
  
  /**
    @return NSPredicate
  */
  filterPredicate: function() {
    
  },
  
  /**
    If true, predicates are disabled after adding new objects. this avoids
    new objects not meeting criteria from being automatically hidden.
    
    This is true by default
    
    @param bool flag
  */
  setClearsFilterPredicateOnInsertion: function(flag) {
    
  },
  
  /**
    @return boolean
  */
  clearsFilterPredicateOnInsertion: function() {
    
  },
  
	/**
		@param NSArray objects
		@return NSArray
	*/
  arrangeObjects: function(objects) {
	  return objects;
	},
	
	/**
    @type {VN.Array}
  */
  _arrangedObjects: null,
	
	/**
		An array of all objects to be displayed (after filtering/sorting)
		@return {VN.Array}
	*/
	arrangedObjects: function() {
	  return this._arrangedObjects;
	},
	
	/**
		Default is true.
		
		@param bool flag
	*/
	setAvoidsEmptySelection: function(flag) {
		
	},
	
	/**
		@return bool
	*/
	avoidsEmptySelection: function() {
		
	},
	
	/**
		Default is true
		
		@param bool flag
	*/
	setPreservesSelection: function(flag) {
		
	},
	
	/**
		@return bool
	*/
	preservesSelection: function() {
		
	},
	
	/**
		Default is true
		
		@param bool flag
	*/
	setSelectsInsertedObjects: function(flag) {
		
	},
	
	/**
		@return bool
	*/
	selectsInsertedObjects: function() {
		
	},
	
	/**
		@param {Boolean} flag
	*/
	setAlwaysUsesMultipleValuesMarker: function(flag) {
		
	},
	
	/**
		@returns Boolean
	*/
	alwaysUsesMultipleValuesMarker: function() {
		
	},
	
	/**
    @type VN.IndexSet
  */
  _selectionIndexes: null,
	
	/**
	  This sets the selection indexes. This also needs to inform some keys
	  that they will change. The 'canRemove' depends upon the selection 
	  indexes containing atleast one index.
	
		@param {VN.IndexSet} indexes
		@returns Boolean
	*/
	setSelectionIndexes: function(indexes) {
	  this.willChangeValueForKey('canRemove');
		this._selectionIndexes = indexes;
		this.didChangeValueForKey('canRemove');
	},
	
	/**
    Current selection (single object)
    
    @return VN.Object
  */
  selection: function() {
    var firstObject = this.arrangedObjects()[this._selectionIndexes.firstIndex()];
  },
	
	/**
		@returns VN.IndexSet
	*/
	selectionIndexes: function() {
		return this._selectionIndexes;
	},
	
	/**
		@param {Integer} index
		@returns Boolean
	*/
	setSelectionIndex: function(index) {
		this.setSelectionIndexes(VN.IndexSet.indexSetWithIndex(index));
	},
	
	/**
		@returns Integer
	*/
	selectionIndex: function() {
		return this._selectionIndexes.firstIndex();
	},
	
	/**
		@param {VN.IndexSet} indexes
		@returns Boolean
	*/
	addSelectionIndexes: function(indexes) {
		
	},
	
	/**
		@param {VN.IndexSet} indexes
		@returns Boolean
	*/
	removeSelectionIndexes: function(indexes) {
		
	},
	
	/**
		@param {VN.Array} objects
		@returns Boolean
	*/
	setSelectionObjects: function(objects) {
		
	},
	
	/**
		@returns {VN.Array}
	*/
	selectedObjects: function() {
		
	},
	
	/**
		@param {VN.Array} objects
		@returns Boolean
	*/
	addSelectedObjects: function(objects) {
		
	},
	
	/**
		@param {VN.Array} objects
		@retuns Boolean
	*/
	removeSelectedObjects: function(objects) {
		
	},
	
	/**
		Adds new object to the content objects, but to the arranged objects as
		well.
		
		@param {NSObject} sender
	*/
	add: function(sender) {
		console.log('changing');
		this.willChangeValueForKey('canRemove');
		this._selectionIndexes = VN.IndexSet.indexSetWithIndex(3);
		this.didChangeValueForKey('canRemove');
	},
	
	/**
		Remove selected object(s)
	
		@param {NSObject} sender
	*/
	remove: function(sender) {
		
	},
	
	/**
		@param {NSObject} sender
	*/
	insert: function(sender) {
		
	},
	
	/**
		@return Boolean
	*/
	canInsert: function() {
		
	},
	
	/**
		@return Boolean
	*/
	canAdd: function() {
		return true;
	},
		
	/**
	  Property stating whether or not the array controller can remove an item.
	  This is basically reliant on the number of selection indexes. If there
	  is atleast one selection index, then that can be removed. No selection
	  indexes means that we cannot remove anything.
	  
		@return Boolean
	*/
	canRemove: function() {
		return (this._selectionIndexes.count() == 0) ? false : true;
	},
	
	/**
		@param {NSObject} sender
	*/
	selectNext: function(sender) {
		
	},
	
	/**
		@param {NSObject} sender
	*/
	selectPrevious: function(sender) {
		
	},
	
	/**
		@returns Boolean
	*/
	canSelectNext: function() {
		
	},
	
	/**
		@returns Boolean
	*/
	canSelectPrevious: function() {
		
	},
	
	/**
		@param {NSObject} object
	*/
	addObject: function(object) {
		
	},
	
	/**
		@param {NSArray} objects
	*/
	addObjects: function(objects) {
		
	},
	
	/**
		@param {NSObject} object
		@param {Integer} index
	*/
	insertObjectAtArrangedObjectIndex: function(object, index) {
		
	},
	
	/**
		@param {NSArray} objects
		@param {NSIndexSet} indexes
	*/
	insertObjectsAtArrangedObjectIndexes: function(objects, indexes) {
		
	},
	
	/**
		@param {Integer} index
	*/
	removeObjectAtArrangedObjectIndex: function(index) {
		
	},
	
	/**
		@param {NSIndexSet} indexes
	*/
	removeObjectsAtArrangedObjectIndexes: function(indexes) {
		
	},
	
	/**
		@param {NSObject} object
	*/
	removeObject: function(object) {
		
	},
	
	/**
		@param {NSArray} objects
	*/
	removeObjects: function(objects) {
		
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
var NSFontAttributeName         = "NSFontAttributeName";
var NSParagraphStyleAttributeName     = "NSParagraphStyleAttributeName";
var NSForegroundColorAttributeName    = "NSForegroundColorAttributeName";
var NSUnderlineStyleAttributeName     = "NSUnderlineStyleAttributeName";
var NSSuperscriptAttributeName      = "NSSuperscriptAttributeName";
var NSBackgroundColorAttributeName    = "NSBackgroundColorAttributeName";
var NSAttachmentAttributeName       = "NSAttachmentAttributeName";
var NSLigatureAttributeName       = "NSLigatureAttributeName";
var NSBaselineOffsetAttributeName     = "NSBaselineOffsetAttributeName";
var NSKernAttributeName         = "NSKernAttributeName";
var NSLinkAttributeName         = "NSLinkAttributeName";

var NSStrokeWidthAttributeName      = "NSStrokeWidthAttributeName";
var NSStrokeColorAttributeName      = "NSStrokeColorAttributeName";
var NSUnderlineColorAttributeName     = "NSUnderlineColorAttributeName";
var NSStrikethroughStyleAttributeName   = "NSStrikethroughStyleAttributeName";
var NSStrikethroughColorAttributeName   = "NSStrikethroughColorAttributeName";
var NSShadowAttributeName         = "NSShadowAttributeName";
var NSObliquenessAttributeName      = "NSObliquenessAttributeName";
var NSExpansionAttributeName      = "NSExpansionAttributeName";
var NSCursorAttributeName         = "NSCursorAttributeName";
var NSToolTipAttributeName        = "NSToolTipAttributeName";

// NSUnderlineStyleAttributeName and NSStrikethroughStyleAttributeName
var NSUnderlineStyleNone        = 0x00;
var NSUnderlineStyleSingle        = 0x01;
var NSUnderlineStyleThick         = 0x02;
var NSUnderlineStyleDouble        = 0x09;

var NSUnderlinePatternSolid       = 0x0000;
var NSUnderlinePatternDot         = 0x0100;
var NSUnderlinePatternDash        = 0x0200;
var NSUnderlinePatternDashDot       = 0x0300;
var NSUnderlinePatternDashDotDot    = 0x0400;

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
 * binding_connection.js
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


var IBBindingConnection = NSObject.extend({
  
  _connector: null,
  
  _source: null,
  
  _destination: null,
  
  initWithCoder: function(aCoder) {
    // this._connector = aCoder.decodeObjectForKey('connector');
    this._connector = aCoder.decodeObjectForKey('connector');
    this._source = aCoder.decodeObjectForKey("source");
    this._destination = aCoder.decodeObjectForKey("destination");
    // replace @selector style name with js compatible identifier.
    return this;
  },
  
  awakeAfterUsingCoder: function(aCoder) {
    return this;
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




/**
  @class VN.Cell
  @extends VN.Object
*/
var NSCell = VN.Cell = VN.Object.extend({
  
  /**
    @param {VN.Coder} aCoder
    @returns VN.Cell
  */
  initWithCoder: function(aCoder) {
    this.value = aCoder.decodeObjectForKey("NSContents");
    var flags = aCoder.decodeIntForKey("NSCellFlags");
    var flags2 = aCoder.decodeIntForKey("NSCellFlags2");
    this.state = (flags & 0x80000000) ? VN.ON_STATE : VN.OFF_STATE;
    this.isHighlighted = (flags & 0x40000000) ? true : false;
    this.isEnabled = (flags & 0x20000000) ? false : true;

    this.isEditable = (flags & 0x10000000) ? true : false;
    this.isBordered = (flags & 0x00800000) ? true : false;
    this.isBezeled = (flags & 0x00400000) ? true : false;
    this.isSelectable = (flags & 0x00200000) ? true : false;
    this.isScrollable = (flags & 0x00100000) ? true : false;
    this.alignment = (flags2 & 0x1c000000) >> 26;
    this.controlSize = (flags2 & 0xE0000) >> 17;
    this.isContinuous = (flags & 0x00080100) ? true : false;
    
    this.lineBreakMode = (flags & 0x00007000) >> 12;
    this.wraps = (flags & 0x40) ? false : true;
    this.font = aCoder.decodeObjectForKey("NSSupport");
    return this;
  },
  
  /**
    @param {VN.String} aString
    @returns VN.Cell
  */
  initTextCell: function(aString) {
    
  },
  
  /**
    @param {VN.Image} image
    @returns VN.Cell
  */
  initImageCell: function(image) {
    
  },
  
  /**
    @type VN.Control
  */
  controlView: null,
  
  /**
    @type VN.CellType
  */
  cellType: null,
  
  /**
    @type Integer
  */
  state: null,
  
  /**
    @type VN.Object
  */
  target: null,
  
  /**
    @type Selector
  */
  action: null,
  
  /**
    @type Integer
  */
  tag: null,
  
  /**
    @param {VN.String} aString
  */
  setTitle: function(aString) {
    this._value = aString;
  },
  
  /**
    @returns VN.String
  */
  title: function() {
    return this._title;
  },
  
  /**
    @returns Boolean
  */
  isOpaque: function() {
    return false;
  },
  
  /**
    @type Boolean
  */
  isEnabled: null,
  
  /**
    @type Boolean
  */
  isContinuous: null,
  
  /**
    @type Boolean
  */
  isEditable: null,

  /**
    @type Boolean
  */
  isSelectable: null,
  
  /**
    @type Boolean
  */
  isBordered: null,
  
  /**
    @type Boolean
  */
  isBezeled: null,
  
  /**
    @type Boolean
  */
  isScrollable: null,
 
  /**
		Enabling scrolling means that the cell cannot wrap. Override scrollable
		to set wraps to false if scrollable is true.
		
    @param {Boolean} flag
  */
  setScrollable: function(flag) {
    this.isScrollable = flag;
    if (flag) this.setValueForKey(false, 'wraps');
  },
  
  /**
    @type Boolean
  */
  isHighlighted: null,

  /**
    @type VN.TextAlignment
  */
  alignment: null,
  
  /**
    @type Boolean
  */
  wraps: null,
  
  /**
    @param {Boolean} flag
  */
  setWraps: function(flag) {
    this._wraps = flag;
    if (flag) this.setValueForKey('false', 'isScrollable');
  },
  
  /**
    @type VN.Font
  */
  font: null,
  
  /**
    @param {VN.String} aString
    @returns Boolean
  */
  isEntryAcceptable: function(aString) {
    return true;
  },
  
  /**
    @returns VN.String
  */
  keyEquivalent: function() {
    return "";
  },
  
  /**
    @type VN.Formatter
  */
  formatter: null,
  
  /**
    @type Object
  */
  value: null,
  
  /**
    @returns Object
  */
  objectValue: function() {
    return this.value;
  },
  
  /**
    @param {Object} obj
  */
  setObjectValue: function(obj) {
    this.value = obj;
  },
  
  /**
    @returns Boolean
  */
  hasValidObjectValue: function() {
    return true;
  },
  
  /**
    @returns VN.String
  */
  stringValue: function() {
    return this.value;
  },
  
  /**
    @param {VN.String} aString
  */
  setStringValue: function(aString) {
    this.value = aString;
  },
  
  /**
    @param {VN.Cell} otherCell
    @returns VN.ComparisonResult
  */
  compare: function(otherCell) {
    return 0;
  },
  
  /**
    @returns Integer
  */
  intValue: function() {
    return this.value;
  },
  
  /**
    @param {Integer} anInt
  */
  setIntValue: function(anInt) {
    this.value = anInt;
  },
  
  /**
    @retuns Float
  */
  floatValue: function() {
    return this.value;
  },
  
  /**
    @param {Float} aFloat
  */
  setFloatValue: function(aFloat) {
    this.value = aFloat;
  },
  
  /**
    @retuns Float
  */
  doubleValue: function() {
    return this.value;
  },
  
  /**
    @param {Float} aFloat
  */
  setDoubleValue: function(aFloat) {
    this.value = aFloat;
  },
  
  /**
    @param {VN.Object} sender
  */
  takeIntValueFrom: function(sender) {
    this.setIntValue(sender.intValue());
  },
  
  /**
    @param {VN.Object} sender
  */
  takeFloatValueFrom: function(sender) {
    this.setFloatValue(sender.floatValue());
  },
  
  /**
    @param {VN.Object} sender
  */
  takeDoubleValueFrom: function(sender) {
    this.setDoubleValue(sender.doubleValue());
  },
  
  /**
    @param {VN.Object} sender
  */
  takeStringValueFrom: function(sender) {
    this.setStringValue(sender.stringValue());
  },
  
  /**
    @param {VN.Object} sender
  */
  takeObjectValueFrom: function(sender) {
    this.setObjectValue(sender.objectValue());
  },
  
  /**
    @type VN.Image
  */
  image: null,
  
  /**
    @type VN.ControlTint
  */
  controlTint: null,
  
  /**
    @type VN.ControlSize
  */
  controlSize: null,
   
  /**
    @type VN.Object
  */
  representedObject: null,
  
  /**
    @param {VN.Rect} theRect
    @returns VN.Rect
  */
  imageRectForBounds: function(theRect) {
    return theRect;
  },
  
  /**
    @param {VN.Rect} theRect
    @returns VN.Rect
  */
  titleRectForBounds: function(theRect) {
    return theRect;
  },
  
  /**
    @param {VN.Rect} theRect
    @returns VN.Rect
  */
  drawingRectForBounds: function(theRect) {
    return theRect;
  },
  
  /**
    @returns VN.Size
  */
  cellSize: function() {
    return VN.MakeSize(0, 0);
  },
  
  /**
    @param {VN.Rect} theRect
    @returns VN.Size
  */
  cellSizeForBounds: function(theRect) {
    return theRect.size;
  },
  
  /**
    @param {VN.Rect} theRect
  */
  calcDrawInfo: function(theRect) {
    // calculate bounds etc
  },
  
  /**
    @param {VN.Text} textObj
    @returns VN.Text
  */
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
  
  /**
    @param {VN.Rect} cellFrame
    @param {VN.View} controlView
    @param {VN.RenderContext} renderContext
    @param {Boolean} firstTime
  */
  renderInteriorWithFrameInView: function(cellFrame, controlView, renderContext, firstTime) {
    // render interior: images etc
  },

  /**
    @param {VN.Rect} cellFrame
    @param {VN.View} controlView
    @param {VN.RenderContext} renderContext
    @param {Boolean} firstTime
  */  
  renderWithFrameInView: function(cellFrame, controlView, renderContext, firstTime) {
    // main rendering control
  },
  
  /**
    @param {Boolean} flag
    @param {VN.Rect} cellFrame
    @param {VN.View} controlView
    @param {VN.RenderContext} renderContext
    @param {Boolean} firstTime
  */
  highlightWithFrameInView: function(flag, cellFrame, controlView, renderContext, firstTime) {
    this.setValueForKey(flag, 'highlighted');
    this.renderWithFrameInView(cellFrame, controlView, renderContext, firstTime);
  },
  
  /**
    @returns Integer
  */
  mouseDownFlags: function() {
    // return previously used mouse down flags
  },
  
  /**
    @param {VN.Point} startPoint
    @param {VN.View} controlView
    @returns Boolean
  */
  startTrackingInView: function(startPoint, controlView) {
    return this.isEnabled;
  },
  
  /**
    @param {VN.Point} lastPoint
    @param {VN.Point} currentPoint
    @param {VN.View} controlView
    @returns Boolean
  */
  continueTrackingInView: function(lastPoint, currentPoint, controlView) {
    return true;
  },
  
  /**
    @param {VN.Point} lastPoint
    @param {VN.Point} stopPoint
    @param {VN.View} controlView
    @param {Boolean} mouseIsUp
  */
  stopTrackingInView: function(lastPoint, stopPoint, controlView, mouseIsUp) {
    // informed that tracking has finished
  },
  
  /**
    @param {VN.Event} theEvent
    @param {VN.Rect} cellFrame
    @param {VN.View} controlView
    @param {Boolean} untilMouseIsUp
    @returns Boolean
  */
  trackMouseInView: function(theEvent, cellFrame, controlView, untilMouseIsUp) {
    var location = controlView.convertPointFromView(theEvent.locationInWindow(), null);
    if (!(this.startTrackingInView(theEvent.locationInWindow(), controlView)))
      return false;
    
    this.highlightWithFrameInView(true, cellFrame, controlView, controlView.renderContext, false);
    if (this.isContinuous)
      NSApplication.sharedApplication().sendAction(this._action, this._target, this);
    
    // for every further event
    NSApplication.sharedApplication().bindEventsMatchingMask((NSLeftMouseUpMask | NSMouseMovedMask), this, function(theEvent) {
      var location = controlView.convertPointFromView(theEvent.locationInWindow(), null);
      
      if (untilMouseIsUp) {
        if (theEvent.type() == VN.LEFT_MOUSE_UP) {
          this.stopTrackingInView(theEvent.locationInWindow(), theEvent.locationInWindow(), controlView, true);
          NSApplication.sharedApplication().unbindEvents();
          
          this.state = (this.state == VN.OFF_STATE) ? VN.ON_STATE : VN.OFF_STATE;
          // this.setHighlighted(false);
          
          if (NSPointInRect(location, cellFrame))
            NSApplication.sharedApplication().sendAction(this.action, this.target, this.controlView);
          
          this.highlightWithFrameInView(false, cellFrame, controlView, controlView.renderContext, false);
          return;
        }
        else {
          if (!(this.continueTrackingInView(theEvent.locationInWindow(), theEvent.locationInWindow(), controlView))) {
            NSApplication.sharedApplication().unbindEvents();
          }
          
          this.highlightWithFrameInView(NSPointInRect(location, cellFrame) ? true : false, cellFrame, controlView, controlView.renderContext, false);
        }
      }
      else if (NSPointInRect(location, cellFrame)) {
        console.log('Got here in frame');
      }
      else {
        console.log('moved out fo frame');
        this.stopTracking(theEvent.locationInWindow(), theEvent.locationInWindow(), false);
        NSApplication.sharedApplication().unbindEvents();
      }
      
      // draw frame
      
      if (this.isContinuous) {
         NSApplication.sharedApplication().sendAction(this.action, this.target, this);
      }
    });
  },
  
  /**
    @param {VN.Rect} aRect
    @param {VN.View} controlView
    @param {VN.Text} textObj
    @param {VN.Object} aDelegate
    @param {VN.Event} theEvent
  */
  editWithFrameInView: function(aRect, controlView, textObj, aDelegate, theEvent) {
    if (!this.isEditable() && !this.isSelectable())
      return;

    textObj.setFrame(this.titleRectForBounds(aRect));
    controlView.addSubview(textObj);
    controlView.window().makeFirstResponder(textObj);
    textObj.setDelegate(anObject);
    textObj.mouseDown(theEvent);
  },
  
  /**
    @param {VN.Rect} aRect
    @param {VN.View} controlView
    @param {VN.Text} textObj
    @param {VN.Object} aDelegate
    @param {Integer} start
    @param {Integer} length
  */
  selectWithFrameInView: function(aRect, controlView, textObj, aDelegate, start, length) {
    if (!this.isEditable() && !this.isSelectable()) return;

    textObj.setFrame(this.titleRectForBounds(aRect));
    controlView.addSubview(textObj);
    controlView.window().makeFirstResponder(textObj);
    textObj.setDelegate(anObject);
    textObj.setSelectedRange(null);
  },
  
  /**
    @param {VN.Text} textObj
  */
  endEditing: function(textObj) {
    this.setStringValue(textObj.string());
  },
  
  /**
    @type VN.Menu
  */
  menu: null,
  
  /**
    @type Boolean
  */
  sendsActionOnEndEditing: null,
  
  /**
    @type VN.LineBreakMode
  */
  lineBreakMode: null,
  
  /**
    @type Boolean
  */
  allowsUndo: null,
});


/**
  @mixin VN.KeyboardUI
  @class VN.Cell
*/
VN.Cell.mixin({
  
  /**
    @type Boolean
  */
  refusesFirstResponder: null,
  
  /**
    @returns Boolean
  */
  acceptsFirstResponder: function() {
    return !this.valueForKey('refusesFirstResponder');
  },
  
  /**
    @type Boolean
  */
  showsFirstResponder: null,
  
  /**
    @param {VN.Object} sender
  */
  performClick: function(sender) {
    // send action. on space bar
  } 
});


/**
  @mixin VN.CellAttributedStringMethods
  @class VN.Cell
*/
VN.Cell.mixin({
  
  /**
    @returns VN.AttributedString
  */
  attributedStringValue: function() {
    return this._value;
  },
  
  /**
    @param {VN.AttributedString} obj
  */
  setAttributedStringValue: function(obj) {
    this._value = obj;
  },
  
  /**
    @type Boolean
  */
  allowsEditingTextAttributes: null,
  
  /**
    @param {Boolean} flag
  */
  setAllowsEditingTextAttributes: function(flag) {
    this.allowsEditingTextAttributes = flag;
    if (!flag) this.setValueForKey(false, 'importsGraphics');
  },
  
  /**
    @type Boolean
  */
  importsGraphics: null,
  
  /**
    @param {Boolean} flag
  */
  setImportsGraphics: function(flag) {
    this._importsGraphics = flag;
    if (flag) this.setImportsGraphics(true);
  }
});


/**
  @mixin VN.CellMixedState
  @class VN.Cell
*/
VN.Cell.mixin({
  
  /**
    @type Boolean
  */
  allowsMixedState: null,
  
  /**
    @retuns Integer
  */
  nextState: function() {
    return VN.ON_STATE
  },
  
  /**
    Gets the next state and sets it on the cell
  */
  setNextState: function() {
    this.setValueForKey(this.nextState(), 'state');
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


/**
  @constants image_position
  @class VN.Control
*/
VN.NO_IMAGE = 'text_only';
VN.IMAGE_ONLY = 'image_only';
VN.IMAGE_LEFT = 'left';
VN.IMAGE_RIGHT = 'right';
VN.IMAGE_BELOW = 'below';
VN.IMAGE_ABOVE = 'above';
VN.IMAGE_OVERLAPS = 'overlaps';

/**
  @constants state
  @class VN.Control
*/
VN.MIXED_STATE = 'mixed';
VN.OFF_STATE = 'off';
VN.ON_STATE = 'on';

/**
  @constants control_size
  @class VN.Control
*/
VN.REGULAR_CONTROL_SIZE = 'regular';
VN.SMALL_CONTROL_SIZE = 'small';
VN.MINI_CONTROL_SIZE = 'mini';

/**
  VN.Control notifications
*/
VN.CONTROL_TEXT_DID_BEGIN_EDITING_NOTIFICATION = "VNControlTextDidBeginEditingNotification";
VN.CONTROL_TEXT_DID_END_EDITING_NOTIFICATION = "VNControlTextDidEndEditingNotification";
VN.CONTROL_TEXT_DID_CHANGE_NOTIFICATION = "VNControlTextDidChangeNotification";

/**
  @class VN.Control
  @extends VN.View
*/
VN.Control = VN.View.extend({
  
  defaultOptions: { image_position: 'left', state: 'off', control_size: 'regular',
                    enabled: true, selected: false },
  
  displayProperties: ['enabled', 'selected', 'state'],
  
  
  
  /**
    @param {VN.Rect} frameRect
    @returns VN.Control
  */
  initWithFrame: function(frameRect) {
    this._super(frameRect);
    this.setCell(this.cellClass().create());
    return this;    
  },
  
  initWithOptions: function(options) {
    this._super(options);
    this.enabled = options.remove('enabled');
    this.selected = options.remove('selected');
    this.control_size = options.remove('control_size');
    
    return this;
  },
  
  /**
    @param {VN.Coder} aCoder
    @returns VN.Control
  */
  initWithCoder: function(aCoder) {  
    this._super(aCoder);
    this.cell = aCoder.decodeObjectForKey("NSCell");
    if (this.cell) this.cell.setValueForKey(this, 'controlView');
    this.setFrame(this.frame);
    return this;
  },
  
  /**
    Sizes the reciever so that it fits its contents
  */
  sizeToFit: function() {
    
  },
  
  /**
    Calculates the necessary size for the controls contents
  */
  calcSize: function() {
    
  },
  
  /**
    Draws the receiver in the given rect. This method is intended for old
    browser routines using the DOM. No canvas/VML based drawing should be
    carried out in these routines. Drawing can use css etc as intended. 
    See wiki for examples and more information.
    
    @param {Boolean} firstTime
    @param {NSRenderContext} context
  */
  render: function(context, firstTime) {
    if (this.cell) {
      this.cell.renderWithFrameInView(this.bounds, this, context, firstTime);
    }
    else {
      // no cell available before drawing..
      context.setFirstTime(true);
    }
  },
  
  /**
    Instantiate a binding to the object. Placeholders and other information
    can be specified in the options dictionary.
    
    @param binding - NSString
    @param toObject - NSObject
    @param withKeyPath - NSString
    @param options - NSDictionary
  */
  bind: function(binding, toObject, withKeyPath, options) {
    if (binding == 'enabled') {
      toObject.addObserverForKeyPath(this, withKeyPath, 0, VN.ENABLED_BINDING);
      
      var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
        [toObject, withKeyPath, options],
        [VN.OBSERVED_OBJECT_KEY, VN.OBSERVED_KEY_PATH_KEY, VN.OPTIONS_KEY]);
      
      this._kvb_info.setObjectForKey(bindingInfo, VN.ENABLED_BINDING);
      this.setEnabled(toObject.valueForKeyPath(withKeyPath));
    }
  },
  
  /**
		@param {NSString} keyPath
		@param {NSObject} ofObject
		@param {NSDictionary} change
		@param {Object} context
	*/
  observeValueForKeyPath: function(keyPath, ofObject, change, context) {
    if (context == VN.ENABLED_BINDING) {
      this.setEnabled(ofObject.valueForKeyPath(keyPath));
    }
  },
  
  /**
    @type Object
  */
  value: null,
  
  /**
    @type VN.Object
  */
  target: null,
  
  /**
    @type Selector
  */
  action: null,
  
  /**
    @type Integer
  */
  tag: null,
  
  /**
    @type Boolean
  */
  continuous: null,
  
  /**
    @type Boolean
  */
  enabled: null,
  
  /**
    @type VN.TextAlignment
  */
  alignment: null,
  
  /**
    @type VN.Font
  */
  font: null,
  
  /**
    @type VN.Formatter
  */
  formatter: null,
  
  /**
    @param {selector} action
    @param {VN.Object} target
    @returns Boolean
  */
  sendAction: function(action, target) {
    if (action && target) {
      VN.App.sendActionTo(action, target, this);
      return true;
    }
    
    return false;
  },
  
  /**
    @param {VN.Object} sender
  */
  takeValueFrom: function(sender) {
    this.set('value', sender.get('value'));
  },
  
  /**
    @returns Boolean
  */
  abortEditing: function() {
    return true;
  },
  
  /**
    Validate the editing
  */
  validateEditing: function() {
    // do something
  },
  
  /**
    @param {VN.Event} theEvent
  */
  mouseDown: function(theEvent) {
    this.cell.trackMouseInView(theEvent, this.bounds, this, true);
  }
});


/**
  @returns Class
*/
VN.Control.cellClass = function() {
  return VN.Cell;
};


/**
  @mixin VN.KeyboardUI
  @class VN.Control
*/
VN.Control.mixin({
  
  /**
    @param {VN.Object} sender
  */
  performClick: function(sender) {
    this._cell.performClick(sender);
  },
  
  /**
    @param {Boolean} flag
  */
  setRefusesFirstResponder: function(flag) {
    this._cell.setRefusesFirstResponder(flag);
  },
  
  /**
    @returns Boolean
  */
  refusesFirstResponder: function() {
    this._cell.refusesFirstResponder();
  }
});


/**
  @protocol VN.ControlSubclassNotifications
*/
VN.ControlSunclassNotifications = VN.protocol({
  
  /**
    @param {VN.Notification} obj
  */
  controlTextDidBeginEditing: function(obj) {
  },
  
  /**
    @param {VN.Notification} obj
  */
  controlTextDidEndEditing: function(obj) {
  },
  
  /**
    @param {VN.Notification} obj
  */
  controlTextDidChange: function(obj) {
  },
});


/**
  @protocol VN.ControlTextEditingDelegate
*/
VN.ControlTextEditingDelegate = VN.protocol({
  
  /**
    @optional
    
    @param {VN.Control} control
    @param {VN.Text} fieldEditor
    @returns Boolean
  */
  controlTextShouldBeginEditing: function(control, fieldEditor) {
  },
  
  /**
    @optional
    
    @param {VN.Control} control
    @param {VN.Text} fieldEditor
    @returns Boolean
  */
  controlTextShouldEndEditing: function(control, fieldEditor) {
  },
  
  /**
    @optional
    
    @param {VN.Control} control
    @param {VN.String} string
    @param {VN.String} error
    @returns Boolean
  */
  controlDidFailToFormatString: function(control, string, error) {
  },
  
  /**
    @optional
    
    @param {VN.Control} control
    @param {VN.String} string
    @param {VN.String} error
  */
  controlDidFailToValidatePartialString: function(control, string, error) {
  },
  
  /**
    @optional
    
    @param {VN.Control} control
    @param {VN.Object} obj
    @returns Boolean
  */
  controlIsValidObject: function(control, obj) {
  },
  
  /**
    @optional
    
    @param {VN.Control} control
    @param {VN.TextView} textView
    @param {Selector} commandSelector
    @returns Boolean
  */
  controlTextViewDoCommandBySelector: function(control, textView, commandSelector) {
  },
  
  /**
    @optional
    
    @param {VN.Control} control
    @param {VN.TextView} textView
    @param {VN.Array} words
    @param {VN.Range} charRange
    @param {Integer} index
    @returns VN.Array
  */
  controlTextViewCompletionsForPartialWordRange: function(control, textView, words, charRange, index) {
  },
});


/**
  @mixin VN.ControlAttributedStringMethods
  @class VN.Control
*/
VN.Cell.mixin({
  
  /**
    @returns VN.AttributedString
  */
  attributedStringValue: function() {
    return this._cell.attributedStringValue();
  },
  
  /**
    @param {VN.AttributedString} obj
  */
  setAttributedStringValue: function(obj) {
    this._cell.setAttributedStringValue(obj);
  }
});
/* 
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


/**
  VN.ButtonType
*/
VN.MOMENTARY_LIGHT_BUTTON = 0;
VN.PUSH_ON_PUSH_OFF_BUTTON = 1;
VN.TOGGLE_BUTTON = 2;
VN.SWITCH_BUTTON = 3;
VN.RADIO_BUTTON = 4;
VN.MOMENTARY_CHANGE_BUTTON = 5;
VN.ON_OFF_BUTTON = 6;
VN.MOMENTARY_PUSH_IN_BUTTON = 7;

/**
  VN.BezelStyle
*/
VN.ROUNDED_BEZEL_STYLE = 1;
VN.REGULAR_SQUARE_BEZEL_STYLE = 2;
VN.THICK_SQUARE_BEZEL_STYLE = 3;
VN.THICKER_SQUARE_BEZEL_STLYE = 4;
VN.DISCLOSURE_BEZEL_STYLE = 5;
VN.SHADOWLESS_SQUARE_BEZEL_STLYE = 6;
VN.CIRCULAR_BEZEL_STYLE = 7;
VN.TEXTURED_SQUARE_BEZEL_STYLE = 8
VN.HELP_BUTTON_BEZEL_STYLE = 9;
VN.SMALL_SQUARE_BEZEL_STYLE = 10;
VN.TEXTURED_ROUNDED_BEZEL_STYLE = 11;
VN.ROUNDED_RECT_BEZEL_STYLE = 12;
VN.RECESSED_BEZEL_STYLE = 13;
VN.ROUNDED_DISCLOSURE_BEZEL_STYLE = 14;

/**
  The CSS classes used for referencing NS* style bezel attributes
*/
VN.BEZEL_STYLE_CLASS_NAMES = ['empty', 'rounded', 'regular-square', 'thick-square',
  'thicker-square', 'disclosure', 'shadowless-square', 'circular', 'textured',
  'help-button', 'small-square', 'textured-rounded', 'rounded-rect', 'recessed',
  'rounded-disclosure'];

/**
  VN.GradientType
*/
VN.GRADIENT_NONE = 0;
VN.GRADIENT_CONCAVE_WEAK = 1;
VN.GRADIENT_CONCAVE_STRONG = 2;
VN.GRADIENT_CONVEX_WEAK = 3;
VN.GRADIENT_CONVEX_STRONG = 4;

/**
  @class VN.ButtonCell
  @class VN.Cell
*/
var NSButtonCell = VN.ButtonCell = NSCell.extend({
    
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    var flags = aCoder.decodeIntForKey("NSButtonFlags");
    var flags2 = aCoder.decodeIntForKey("NSButtonFlags2");
    this.isBordered = (flags & 0x00800000) ? true : false;
    this._bezelStyle = ((flags2 & 0x7) | ((flags2 & 0x20) >> 2));
    
    // this._alternateImage = aCoder.decodeObjectForKey("NSAlternateImage");
    // if (this._alternateImage) {
      // this._image = this._alternateImage.normalImage();
      // this._alternateImage = this._alternateImage.alternateImage();
    // }
    // else {
      // this._image = aCoder.decodeObjectForKey('NSNormalImage');
    // }
    
    return this;
  },
  
  /**
    @param {VN.Rect} cellFrame
    @param {VN.View} controlView
    @param {VN.RenderContext} renderContext
    @param {Boolean} firstTime
  */  
  renderWithFrameInView: function(cellFrame, controlView, renderContext, firstTime) {
    if (firstTime) {
      renderContext.setClass('vn-button');
      renderContext.push('div', 'vn-button-left');
      renderContext.push('div', 'vn-button-middle');
      renderContext.push('div', 'vn-button-right');
      renderContext.push('img', 'vn-button-image');
      renderContext.push('span', 'vn-button-title');
    }
      
    this.renderBezelWithFrameInView(cellFrame, controlView, renderContext, firstTime);
    this.renderInteriorWithFrameInView(cellFrame, controlView, renderContext, firstTime);
    this.renderTitleWithFrameInView(this._value, this.titleRectForBounds(cellFrame), renderContext, firstTime);
  },
  
  /**
    @param {VN.Rect} cellFrame
    @param {VN.View} controlView
    @param {VN.RenderContext} renderContext
    @param {Boolean} firstTime
  */
  renderBezelWithFrameInView: function(cellFrame, controlView, renderContext, firstTime) {
    if (this.isEnabled)
      renderContext.removeClass('disabled');
    else
      renderContext.addClass('disabled');
      
    if (this.isBordered) {
      renderContext.addClass('bordered');
      renderContext.addClass(VN.BEZEL_STYLE_CLASS_NAMES[this._bezelStyle]);
    }
    else
      renderContext.removeClass('bordered');
    
    if (this.isHighlighted)
      renderContext.addClass('highlighted');
    else
      renderContext.removeClass('highlighted');
  },
  
  /**
    @param {VN.Rect} cellFrame
    @param {VN.View} controlView
    @param {VN.RenderContext} renderContext
    @param {Boolean} firstTime
  */
  renderInteriorWithFrameInView: function(cellFrame, controlView, renderContext, firstTime) {
    if (this._image) {
      renderContext.$('vn-button-image').setFrame(this.imageRectForBounds(cellFrame));
      renderContext.$('vn-button-image').element().src = this._image._image.src;
    }
  },
  
  /**
    @param {VN.Rect} cellFrame
    @param {VN.View} controlView
    @param {VN.RenderContext} renderContext
    @param {Boolean} firstTime
  */
  renderTitleWithFrameInView: function(title, titleRect, renderContext, firstTime) {
    renderContext.$('vn-button-title').setFrame(titleRect);
    renderContext.$('vn-button-title').renderAttributedString(this.attributedStringValue());
  },
  
  /**
    @param {VN.Rect} theRect
    @returns VN.Rect
  */
  titleRectForBounds: function(theRect) {
    
    var xImageOffset = theRect.origin.x + 2;
    
    if (this._image) {
      xImageOffset += this._image.size().width + 3;
    }
    
    
    return NSMakeRect(xImageOffset,
              theRect.origin.y + 2,
              theRect.size.width - 4,
              theRect.size.height - 4);
  },
  
  /**
    @param {VN.Rect} theRect
    @returns VN.Rect
  */
  imageRectForBounds: function(theRect) {
    var theHeight = 0, theWidth = 0;
    
    if (this._image) {
      return NSMakeRect(2, (theRect.size.height - this._image.size().height) / 2, this._image.size().width, this._image.size().height);
    }
    
    return NSMakeRect(0, 0, 0, 0);
  },
  
  /**
    @returns VN.AttributedString
  */
  attributedStringValue: function() {
		
		if (!this.value) {
		  this.value = "";
		}
		
		if (this.value.typeOf(NSAttributedString)) {
			return this.value;
		}
		
		var attributes = NSDictionary.create();
		
		
		// font
		if (!this.font) {
		  this.setValueForKey(NSFont.controlContentFontOfSize(12), 'font');
		}
		
		attributes.setObjectForKey(this.font, NSFontAttributeName);
		
		// textColor
		var textColor;
		if (this.isEnabled)
		  textColor = this.isHighlighted ? NSColor.selectedControlTextColor() : NSColor.controlTextColor();
		else
		  textColor = NSColor.disabledControlTextColor();
		
		attributes.setObjectForKey(textColor, NSForegroundColorAttributeName);
		
    // paragraph style
    var paragraphStyle = NSParagraphStyle.defaultParagraphStyle();
    paragraphStyle.setAlignment(this.alignment);
    
    attributes.setObjectForKey(paragraphStyle, NSParagraphStyleAttributeName);
		
		return NSAttributedString.create('initWithStringAndAttributes', this.value, attributes);
	},
});
/* 
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
 

/**
  VN.BezelStyle
*/
VN.ROUNDED_BEZEL = 'rounded';
VN.REGULAR_SQUARE_BEZEL = 'regular_square';
VN.THICK_SQUARE_BEZEL = 'thick_square';
VN.THICKER_SQUARE_BEZEL = 'thicker_square';
VN.DISCLOSURE_BEZEL = 'disclosure';
VN.SHADOWLESS_SQUARE_BEZEL = 'shadowless_square';
VN.CIRCULAR_BEZEL = 'circular_bezel';
VN.TEXTURED_SQUARE_BEZEL = 'textured_square';
VN.HELP_BUTTON_BEZEL = 'help_button';
VN.SMALL_SQUARE_BEZEL = 'small_square';
VN.TEXTURED_ROUNDED_BEZEL = 'textured_rounded';
VN.ROUNDED_RECT_BEZEL = 'rounded_rect';
VN.RECESSED_BEZEL = 'recessed';
VN.ROUNDED_DISCLOSURE_BEZEL = 'rounded_disclosure';

/**
  VN.ButtonType
*/
VN.MOMENTARY_LIGHT_BUTTON = 0;
VN.PUSH_ON_PUSH_OFF_BUTTON = 1;
VN.TOGGLE_BUTTON = 2;
VN.SWITCH_BUTTON = 3;
VN.RADIO_BUTTON = 4;
VN.MOMENTARY_CHANGE_BUTTON = 5;
VN.ON_OFF_BUTTON = 6;
VN.MOMENTARY_PUSH_IN_BUTTON = 7;

/**
  @class VN.Button
  @extends VN.Control
*/
VN.Button = VN.Control.extend({
  
  /**
    VN.Button default options
  */
  defaultOptions: { bezel: 'rounded', frame: [0, 0, 0, 0], layout: { } },
  
  /**
    @type VN.Image
  */
  alternateImage: null,
  
  /**
    @type VN.Image
  */
  image: null,
  
  /**
    @param {VN.Coder} aCoder
    @returns VN.Button
  */
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    return this;
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


/**
  @class NSClipView
  @extends NSView
*/
var NSClipView = NSView.extend({
  
  /**
    @type NSColor
  */
  _backgroundColor: null,
  
  /**
    @type NSView
  */
  _docView: null,
  
  /**
    @type NSRect
  */
  _docRect: null,
  
  /**
    @type NSRect
  */
  _oldDocFrame: null,
  
  /**
    @type Boolean
  */
  _drawsBackground: null,
  
  /**
    @type VN.String
  */
  renderClassName: 'vn-clip-view',
  
  /**
    @param {NSCoder} aCoder
    @returns NSClipView
  */
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    this._docView = aCoder.decodeObjectForKey("NSDocView");
    return this;
  },
  
  /**
    @param {NSColor} color
  */
  setBackgroundColor: function(color) {
    this._backgroundColor = color;
  },
  
  /**
    @returns NSColor
  */
  backgroundColor: function() {
    return this._backgroundColor;
  },
  
  /**
    @param {Boolean} flag
  */
  setDrawsBackground: function(flag) {
    this._drawsBackground = flag;
  },
  
  /**
    @returns Boolean
  */
  drawsBackground: function() {
    return this._drawsBackground;
  },
  
  /**
    @param {NSView} aView
  */
  setDocumentView: function(aView) {
    this._docView = aView;
  },
  
  /**
    @returns NSView
  */
  documentView: function() {
    return this._docView;
  },
  
  /**
    The rect of the document's frame. This is used along with the bounds
    of the clip view for the scrollview to calculate knob positions.
  
    @returns NSRect
  */
  documentRect: function() {
    this._docRect = this._docView.frame();
    return this._docRect;
  },
  
  /**
    @param {NSCursor} aCursor
  */
  setDocumentCursor: function(aCursor) {
    
  },
  
  /**
    @returns NSCursor
  */
  documentCursor: function() {
    
  },
  
  /**
    The rect of the visible area of the document's frame.
  
    @returns NSRect
  */
  documentVisibleRect: function() {
    return this.convertRectToView(this.bounds(), this._docView);
  },
  
  /**
    @param {NSNotification} aNotification
  */
  viewFrameChanged: function(aNotification) {
    
  },
  
  /**
    @param {NSNotification} aNotification
  */
  viewBoundsChanged: function(aNotification) {
    
  },
  
  /**
    @param {Boolean} flag
  */
  setCopiesOnScroll: function(flag) {
    
  },
  
  /**
    @returns Boolean
  */
  copiesOnScroll: function() {
    
  },
  
  /**
    @param {NSEvent} theEvent
    @returns Boolean
  */
  autoscroll: function(theEvent) {
    
  },
  
  /**
    @param {NSPoint} newOrigin
    @returns NSPoint
  */
  constrainScrollPoint: function(newOrigin) {
    var docRect = this.documentRect();
    var bounds = this.bounds();
    return NSMakePoint(0, newOrigin.y - (docRect.size.height - bounds.size.height));
  },
  
  /**
    @param {NSPoint} newOrigin
  */
  scrollToPoint: function(newOrigin) {
    this._docView.setFrameOrigin(this.constrainScrollPoint(newOrigin));
  }
});

/**
  @mixin NSClipViewSuperview
  @class NSView
*/
NSView.mixin({
  
  /**
    @param {NSClipView} aClipView
  */
  reflectScrolledClipView: function(aClipView) {
    
  },
  
  /**
    @param {NSClipView} aClipView
    @param {NSPoint} aPoint
  */
  scrollClipViewToPoint: function(aClipView, aPoint) {
    
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
      default:
        theColor = NSColor.create();
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
		
	},
	
	rgbString: function() {
	  return "rgb(" + parseInt(this._red * 255) + ","  + parseInt(this._green * 255) + ","  + parseInt(this._blue * 255) + ")";
	}
});

VN.extend(NSColor, {
	
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
		return NSColor.colorWithCalibratedRGBA(0.220, 0.475, 0.851, 1.0);
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
	},
	
	_sourceListBackgroundColor: function() {
	  return NSColor.colorWithCalibratedRGBA(0.839, 0.867, 0.898, 1.0);
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

var NSCustomResource = VN.CustomResource = VN.Object.extend({
  
  resourceClassName: null,
  
  resourceName: null,
  
  initWithCoder: function(aCoder) {
    this.resourceClassName = aCoder.decodeObjectForKey('NSClassName');
    this.resourceName = aCoder.decodeObjectForKey('NSResourceName');
    
    if (this.resourceClassName == 'NSImage') {
      return NSImage.imageNamed(this.resourceName + '.png');
    }
    
    return this;
  }
})/* 
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
    
    var theFrame = NSMakeRect(0, 0, 0, 0);
    if (aCoder.containsValueForKey("NSFrame"))
      theFrame = aCoder.decodeRectForKey("NSFrame");
    else if (aCoder.containsValueForKey("NSFrameSize"))
      theFrame.size = aCoder.decodeSizeForKey("NSFrameSize");
    
    var theClassName = aCoder.decodeObjectForKey("NSClassName");
    console.log(theClassName);
    var theView = window[theClassName].create('initWithFrame', theFrame);
    
    var subviews = aCoder.decodeObjectForKey("NSSubviews");
    theView.superview = aCoder.decodeObjectForKey("NSSuperview");
    theView.window = null;
    theView.subviews = [];
    
    if (subviews) {
      for (var idx = 0; idx < subviews.length; idx++) {
        theView.addSubview(subviews[idx]);
      }
    }
    theView._bounds = NSMakeRect(0, 0, 0, 0);
    theView.setFrame(theFrame);
    
    theView._bounds.origin = NSMakePoint(0, 0);
    theView._bounds.size = this.frame.size;
    
    var vFlags = aCoder.decodeIntForKey("NSvFlags");
    theView.autoResizesSubviews = true;
    theView.autoResizeMask = vFlags & 0x3F;
    
    return theView;
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
  },
  
  renderingRepresentation: function() {
    return (this._isBold ? "bold " : "") + Math.round(this._size) + "px '" + this._name + "'"; 
  }
});

VN.extend(NSFont, {
  
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
    var theFont = NSFont.fontWithNameAndSize("Arial", fontSize);
    theFont._isBold = true;
    return theFont;
  },
  
  menuBarFontOfSize: function(fontSize) {
    var theFont = NSFont.fontWithNameAndSize("Arial", fontSize);
    theFont._isBold = true;
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
    var theFont = NSFont.fontWithNameAndSize("Arial", fontSize);
    return theFont;
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
VN.MainMenu= VN.Window.extend({
  
  _mainMenu: null,
  _mainMenuView: null,
  
  _applicationTitleView: null,
  
  _hasGradient: null,
  
  initWithMainMenu: function(aMenu) {
    this.setupGraphicsContextDisplay();
    
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
    this._DOMContainer.appendChild(this._mainMenuView.renderElement);
    
    // menu title
    this._applicationTitleView = NSApplicationTitleView.create('initWithFrame', NSMakeRect(0, 0, 0, 0));
    this._DOMContainer.appendChild(this._applicationTitleView.renderElement);
    
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
	},
	
	renderRect: function(aRect, firstTime, context) {
	  this._super(aRect, firstTime, context);
	  if (firstTime) {
	    context.removeClass('shadow');
	    context.removeClass('rounded');
	    context.addClass('ns-window-main-menu');
	  }
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

VN.extend(NSMenu, {
  
  menuBarHeight: function() {
    return 35.0;
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
			  attributes.setObjectForKey(NSColor.colorWithCalibratedRGBA(0.916, 0.916, 0.916, 1.0), NSForegroundColorAttributeName);
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
    // var c = NSGraphicsContext.currentContext().graphicsPort();
    //     
    //     if (this._cachedMenuItemRects.length < 1)
    //       return;
    //     
    //     var theItem, theCell = this._menuItemCell;
    //     
    //     for (var idx = 0; idx < this._menu.numberOfItems(); idx++) {
    //       theItem = this._menu.itemAtIndex(idx);
    //       theCell.setMenuItem(theItem);
    //       theCell.drawWithFrame(this.rectOfItemAtIndex(idx), this);
    //     }
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


VN.WindowMenu = VN.Window.extend({
  
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
    // this._DOMContainer.appendChild(this._contentView.renderElement);
    
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


var NSNib = VN.Nib = VN.Object.extend({

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
    nameTable.setValueForKey(owner, 'NSFileOwner');
    this._topLevelObjects = topLevelObjects;
    return this.instantiateNibWithExternalNameTable(nameTable);
  },
  
  instantiateNibWithExternalNameTable: function(externalNameTable) {
    var unarchiver = NSKeyedUnarchiver.create('initForReadingWithData', this._data);
    unarchiver.setValueForKey(externalNameTable, 'nameTable');
    this._topLevelObjects = unarchiver.decodeObjectForKey("IBDocument.RootObjects");
    this._connections = unarchiver.decodeObjectForKey("IBDocument.Objects");
    // console.log(this._topLevelObjects);
    return this._topLevelObjects;
  }
});/* 
 * nib_binding_connector.js
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


var NSNibBindingConnector = NSObject.extend({

  _label: null,
  _source: null,
  _destination: null,
  
  _binding: null,
  
  _keyPath: null,

 initWithCoder: function(aCoder) {
   this._label = aCoder.decodeObjectForKey("NSLabel");
   this._source = aCoder.decodeObjectForKey("NSSource");
   this._destination = aCoder.decodeObjectForKey("NSDestination");
   this._binding = aCoder.decodeObjectForKey("NSBinding");
   this._keyPath = aCoder.decodeObjectForKey("NSKeyPath");
   return this;
 },

 awakeAfterUsingCoder: function(aCoder) {
   this._source.bind(this._binding, this._destination, this._keyPath, this._options);
   return this;
 }
});
/* 
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
    console.log(this);
    this._source.setValueForKey(this._destination, this._label);
    return this;
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


// VN.TableViewColumnAutoresizingStyle
VN.TABLE_VIEW_NO_COLUMN_AUTORESIZING = 0;
VN.TABLE_VIEW_UNIFORM_COLUMN_AUTORESIZING_STYLE = 1;
VN.TABLE_VIEW_SEQUENTIAL_COLUMN_AUTORESIZING_STYLE = 2;
VN.TABLE_VIEW_REVERSE_SEQUENTIAL_COLUMN_AUTORESIZING_STYLE = 3;
VN.TABLE_VIEW_LAST_COLUMN_ONLY_AUTORESIZING_STYLE = 4;
VN.TABLE_VIEW_FIRST_COLUMN_ONLY_AUTORESIZING_STYLE = 5;

// gridstylemask
VN.TABLE_VIEW_GRID_NONE = 0;
VN.TABLE_VIEW_SOLID_VERTICAL_GRID_LINE_MASK = 1 << 0;
VN.TABLE_VIEW_SOLID_HORIZONTAL_GRID_LINE_MASK = 1 << 1;

// VN.TableViewSelectionHighlightStyle
VN.TABLE_VIEW_SELECTION_HIGHLIGHT_STLYE_REGULAR = 0;
VN.TABLE_VIEW_SELECTION_HIGHLIGHT_STLYE_SOURCE_LIST = 1;

// Tableview delegate notifications
VN.TABLE_VIEW_SELECTION_DID_CHANGE_NOTIFICATION = "VN.TableViewSelectionDidChangeNotification";
VN.TABLE_VIEW_COLUMN_DID_MOVE_NOTIFICATION = "VN.TableViewColumnDidMoveNotification";
VN.TABLE_VIEW_COLUMN_DID_RESIZE_NOTIFICATION = "VN.TableViewColumnDidResizeNotification";
VN.TABLE_VIEW_SELECTION_IS_CHANGING_NOTIFICATION = "VN.TableViewSelectionIsChangingNotification";


/**
  @class VN.TableView
  @extends VN.View
*/
var NSTableView = VN.TableView = VN.Control.extend({
  
  /**
    @type Boolean
  */
  _drawsGrid: null,
  
  /**
    @@type Boolean
  */
  _alternatingRowBackground: null,
  
  /**
    @type NSTableHeaderView
  */
  _headerView: null,
  
  /**
    @type NSView
  */
  _cornerView: null,
  
  /**
    @type NSArray
  */
  _tableColumns: null,
  
  /**
    @type Integer
  */
  _numberOfRows: null,
  
  /**
    @type Integer
  */
  _numberOfColumns: null,
  
  /**
    @type NSColor
  */
  _backgroundColor: null,
  
  /**
    @type NSObject
  */
  _delegate: null,
  
  /**
    @type NSObject
  */
  _dataSource: null,
  
  /**
    @type NSSize
  */
  _intercellSpacing: null,
  
  /**
    @type Float
  */
  _rowHeight: null,
  
  /**
    @type Integer
  */
  _lastSelectedColumn: null,
  
  /**
    @type Integer
  */
  _lastSelectedRow: null,
  
  /**
    @type 
  */
  _editingRow: null,
  
  /**
    @type
  */
  _editingColumn: null,
  
  /**
    A set of all selected Columns
    
    @type NSIndexSet
  */
  _selectedColumns: null,
  
  /**
    A set of all selected Rows
  
    @type NSIndexSet
  */
  _selectedRows: null,
  
  /**
    Array of all the rows in the table view (elements)
    
    @type NSArray
  */
  _reusableRenderContext: null,
  
  /**
    @type VN.String
  */
  renderTagName: 'div',
  
  /**
    @type VN.String
  */
  renderClassName: 'vn-table-view',
  
  /**
    This is used for binding against a controller, usually an Array
    Controller for managing the content of the tableview. If set, all
    other possible data sources are ignored, but some delegate methods
    might still be used if appropriate.
    
    @type VN.Array
  */
  _content: null,
  
  /**
    @param {NSCoder} aCoder
    @returns NSTableView
  */
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    
    var flags = aCoder.decodeIntForKey("NSTvFlags");
    
    this._drawsGrid = (flags & 0x20000000) ? true : false;
    this._alternatingRowBackground = (flags & 0x00800000) ? true : false;
    
    this._gridColor = aCoder.decodeObjectForKey("NSGridColor");
    
    this._backgroundColor = aCoder.decodeObjectForKey("NSBackgroundColor");
    
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
    
    this._selectedRows = NSIndexSet.indexSet();
    this._selectedColumns = NSIndexSet.indexSet();
    
    return this;
  },
  
  /**
    Sets the datasource, conforming to NSTableViewDataSource.
    
    @param {NSObject} <NSTableViewDataSource> aSource
  */
  setDataSource: function(aSource) {
    this._dataSource = aSource;
		this.reloadData();
  },
  
  /**
    @returns NSObject <NSTableViewDataSource>
  */
  dataSource: function() {
    return this._dataSource;
  },
  
  /**
    Sets the delegate conforming to NSTableViewDelegate.
    
    @param {NSObject} <NSTableViewDelegate> delegate
  */
  setDelegate: function(delegate) {
    if (this._delegate == delegate)
      return;
    
    var nc = NSNotificationCenter.defaultCenter();
    
    if (this._delegate) {
      nc.removeObserver(this._delegate, NSTableViewSelectionDidChangeNotification, this);
      nc.removeObserver(this._delegate, NSTableViewColumnDidMoveNotification, this);
      nc.removeObserver(this._delegate, NSTableViewColumnDidResizeNotification, this);
      nc.removeObserver(this._delegate, NSTableViewSelectionIsChangingNotification, this);
    }
    
    this._delegate = delegate;
    
    if (this._delegate.respondsTo('tableViewSelectionDidChange'))
      nc.addObserver(this._delegate, 'tableViewSelectionDidChange', NSTableViewSelectionDidChangeNotification, this);
    
    if (this._delegate.respondsTo('tableViewColumnDidMove'))
      nc.addObserver(this._delegate, 'tableViewColumnDidMove', NSTableViewColumnDidMoveNotification, this);
      
    if (this._delegate.respondsTo('tableViewColumnDidResize'))
      nc.addObserver(this._delegate, 'tableViewColumnDidResize', NSTableViewColumnDidResizeNotification, this);
    
    if (this._delegate.respondsTo('tableViewSelectionIsChanging'))
      nc.addObserver(this._delegate, 'tableViewSelectionIsChanging', NSTableViewSelectionIsChangingNotification, this);
  },
  
  /**
    @returns NSObject <NSTableViewDelegate>
  */
  delegate: function() {
    return this._delegate;
  },
  
  /**
    @param {NSTableHeaderView} headerView
  */
  setHeaderView: function(headerView) {
    this._headerView = headerView;
    this._headerView.setTableView(this);
    this.enclosingScrollView().tile();
  },
  
  /**
    @returns NSTableHeaderView
  */
  headerView: function() {
    return this._headerView;
  },
  
  /**
    @param {NSView} cornerView
  */
  setCornerView: function(cornerView) {
    this._cornerview = cornerView;
    this.enclosingScrollView().tile();
  },
  
  /**
    @returns NSView
  */
  cornerView: function() {
    return this._cornerView;
  },
  
  /**
    @param {Boolean} flag
  */
  setAllowsColumnReordering: function(flag) {
    this._allowsColumnReordering = flag;
  },
  
  /**
    @returns Boolean
  */
  allowsColumnReordering: function() {
    return this._allowsColumnReordering;
  },
  
  /**
    @param {Boolean} flag
  */
  setAllowsColumnResizing: function(flag) {
    this._allowsColumnResizing = flag;
  },
  
  /**
    @returns Boolean
  */
  allowsColumnResizing: function() {
    return this._allowsColumnResizing;
  },

  setColumnAutoresizingStyle: function(style) {
    
  },
  
  columnAutoresizingStyle: function() {
    
  },
  
  /**
    A value from gridstylemask above.
    
    @param {Integer} gridType
  */
  setGridStyleMask: function(gridType) {
    this._gridStyleMask = gridType;
  },
  
  /**
    @returns Integer
  */
  gridStyleMask: function() {
    return this._gridStyleMask;
  },
  
  /**
    @param {NSSize} aSize
  */
  setIntercellSpacing: function(aSize) {
    this._intercellSpacing = aSize;
  },
  
  /**
    @returns NSSize
  */
  intercellSpacing: function() {
    return this._intercellSpacing;
  },
  
  /**
    @param {Boolean} flag
  */
  setUsesAlternatingRowBackgroundColors: function(flag) {
    this._alternatingRowBackground = flag;
  },
  
  /**
    @returns Boolean
  */
  usesAlternatingRowBackgroundColors: function() {
    return this._alternatingRowBackground;
  },
  
  /**
    @param {NSColor} aColor
  */
  setBackgroundColor: function(aColor) {
    this._backgroundColor = aColor;
  },
  
  /**
    @returns NSColor
  */
  backgroundColor: function() {
    return this._backgroundColor;
  },
  
  /**
    @param {NSColor} aColor
  */
  setGridColor: function(aColor) {
    this._gridColor = aColor;
  },
  
  /**
    @returns NSColor
  */
  gridColor: function() {
    return this._gridColor;
  },
  
  /**
    @param {Float} rowHeight
  */
  setRowHeight: function(rowHeight) {
    this._rowHeight = rowHeight;
  },
  
  /**
    @returns Float
  */
  rowHeight: function() {
    return this._rowHeight;
  },
  
  /**
    @param {NSIndexSet} indexSet
  */
  noteHeightOfRowsWithIndexesChanged: function(indexSet) {
    
  },
  
  /**
    @returns NSArray
  */
  tableColumns: function() {
    return this._tableColumns;
  },
  
  /**
    @returns Integer
  */
  numberOfColumns: function() {
    return this._numberOfColumns;
  },
  
  /**
    @returns Integer
  */
  numberOfRows: function() {  
    if (this._numberOfRows < 0) {
      if (this._kvb_info.objectForKey(VN.CONTENT_BINDING)) {
        this._numberOfRows = this._content.length;
      }
			else if (this._dataSource) {
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
  
  /**
    @param {NSTableColumn} tableColumn
  */
  addTableColumn: function(tableColumn) {
    this._tableColumns.push(tableColumn);
    tableColumn.setTableView(this);
    this.realodData();
    this._headerView.setNeedsDisplay(true);
  },
  
  /**
    @param {NSTableColumn} tableColumn
  */
  removeTableColumn: function(tableColumn) {
    
  },
  
  /**
    @param {Integer} oldIndex
    @param {Integer} newIndex
  */
  moveColumn: function(oldIndex, newIndex) {
    
  },
  
  /**
    @param {NSString} identifier
    @returns Integer
  */
  columnWithIdentifier: function(identifier) {
    for (var idx = 0; idx < this._tableColumns.length; idx++) {
      if (this._tableColumns[idx].identifier() == identifier)
        return idx;
    }
    
    return -1;
  },
  
  /**
    @param {NSString} identifier
    @returns NSTableColumn
  */
  tableColumnWithIdentifier: function(identifier) {
    for (var idx = 0; idx < this._tableColumns.length; idx++) {
      if (this._tableColumns[idx].identifier() == identifier)
        return this._tableColumns[idx];
    }
    
    return null;
  },
  
  /**
    Tiles the table view, and the header view. Also ensures the vertical
    scroller for the scroll view has a line scroll of the rowheight plus
    cell spacing height
  */
  tile: function() {
    
  },
  
  /**
    Sizes the tableView to take the smallest room required.
  */
  sizeToFit: function() {
    
  },
  
  /**
    Expands the last column to take up any remaining room left in the table
    view.
  */
  sizeLastColumnToFit: function() {
    
  },
  
  /**
    @param {Integer} row
  */
  scrollRowToVisible: function(row) {
    
  },
  
  /**
    @param {Integer} row
  */
  scrollColumnToVisible: function(column) {
    
  },
  
  /**
    Reloads the data from the datasource and then sets itself for needing
    display. This recalculates the number of rows from the source.
  */
  reloadData: function() {    
    this.noteNumberOfRowsChanged();
    this.setNeedsDisplay(true);
    this._headerView.setNeedsDisplay(true);
  },
  
  noteNumberOfRowsChanged: function() {
    var frameSize = this.frame.size;
    
    this._numberOfRows = -1;
    var numberOfRows = this.numberOfRows();
    
    var children = this.renderElement.childNodes.length;
    
    console.log('got children');
    console.log(children);
    console.log(numberOfRows);
    
    // add rows/cells if current number is fewer than that is required
    if (children < numberOfRows) {
      for (var i = 0; i < (numberOfRows - children); i++) {
        console.log('creating new row');
        this.renderContext.push('div', 'vn-table-view-row', this.guidForRow(children + i));
        var rowContext = VN.RenderContext.renderContextWithElement(this.renderElement.childNodes[children + i]);
        
        for (var j = 0; j < this._tableColumns.length; j++) {
          console.log('creating required cell');
          console.log(this.guidForRowInColumn(children + i, j));
          rowContext.push('div', 'vn-view', this.guidForRowInColumn(children + i, j));
        }
      }    
    }
    // otherwise, if number is more, remove the excess rows
    else if (children > numberOfRows) {
      for (var i = 0; i < (children - numberOfRows); i++) {
        this.renderContext.element().removeChild(VN.$(this.guidForRow(numberOfRows + i)));
      }
    }
    console.log('right, here now');
    if (numberOfRows > 0)
      frameSize.width = this.rectOfRow(0).size.width;
    
    if (this._tableColumns.length > 0)
      frameSize.height = this.rectOfColumn(0).size.height;
    
    console.log('hmmm');
    this.frame.size = frameSize;
    CGDOMElementSetFrame(this.renderElement, this.frame);
    this.bounds.size = frameSize;
    console.log('done this bit');
  },
  
  /**
    Returns the guid for the row number 'row'. This returns the string that
    is the id of the DOM element representing that row
    
    @param {Integer} row
    @returns {VN.String}
  */
  guidForRow: function(row) {
    return 'guid_' + this.guid() + '_r_' + row;
  },
  
  guidForRowInColumn: function(row, column) {
    return this.guidForRow(row) + '_c_' + column;
  },
  
  /**
    The column to be editied.
  
    @returns Integer
  */
  editedColumn: function() {
    return this._editedColumn;
  },
  
  /**
    The row to be edited
    
    @returns Integer
  */
  editedRow: function() {
    return this._editedRow;
  },
  
  /**
    The column that was clicked
    
    @returns Integer
  */
  clickedColumn: function() {
    return this._clickedColumn;
  },
  
  /**
    The row that was clicked
    
    @returns Integer
  */
  clickedRow: function() {
    return this._clickedRow;
  },
  
  /**
    @param {Selector} anAction
  */
  setDoubleAction: function(anAction) {
    this._doubleAction = anAction;
  },
  
  /**
    @returns Selector
  */
  doubleAction: function() {
    return this._doubleAction;
  },
  
  /**
    @param {NSArray}
  */
  setSortDescriptors: function(array) {
    if (this._sortDescriptors != array)
      this._sortDescriptors = array;
  },
  
  /**
    @returns NSArray
  */
  sortDescriptors: function() {
    return this._sortDescriptors;
  },
  
  /**
    @param {NSImage} anImage
    @param {NSTableColumn} tableColumn
  */
  setIndicatorImageInTableColumn: function(anImage, tableColumn) {
    
  },
  
  /**
    @param {NSTableColumn} tableColumn
    @returns NSImage
  */
  indicatorImageInTableColumn: function(tableColumn) {
    
  },
  
  /**
    @param {NSTableColumn} tableColumn
  */
  setHighlightedTableColumn: function(tableColumn) {
    
  },
  
  /**
    @returns NSTableColumn
  */
  highlightedTableColumn: function() {
    
  },
  
  /**
    @param {Boolean} flag
  */
  setVerticalMotionCanBeginDrag: function(flag) {
    
  },
  
  /**
    @returns Boolean
  */
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
  
  /**
    Selects the passed indexes. If extendSelection is true, then the passed
    indexes are appended to the selected set. 
    
    @param {NSIndexSet} indexes
    @param {Boolean} extendSelection
  */
  selectRowIndexes: function(indexes, extendSelection) {    
    if (extendSelection) {
      // add select clas to the extended rows
      this._oldSelectionRows = null;
      this._selectedRows.addIndexes(indexes);
    }  
    else {
      // remove selection from current selection, then select
      // the new selection indexes
      this._oldSelectionRows = this._selectedRows;
      this._selectedRows = indexes;
    }      
  },
  
  selectedColumnIndexes: function() {
    
  },
  
  /**
    @retuns {NSIndexSet}
  */
  selectedRowIndexes: function() {
    return this._selectedRows;
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
  
  /**
    @param {Integer} row
    @returns Boolean
  */
  isRowSelected: function(row) {
    return this._selectedRows.containsIndex(row);
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
		
		theRect.origin.y = this.bounds.origin.y + ((this._rowHeight + this._intercellSpacing.height) * row);
		theRect.size.height = this._rowHeight + this._intercellSpacing.height;
		theRect.origin.x = this.bounds.origin.x;
		
		return theRect;
  },
  
  columnIndexesInRect: function(rect) {
    return NSMakeRange(0, this.numberOfColumns());
  },
  
  /*
    @param {NSRect} rect
    @returns NSRange
  */
  rowsInRect: function(rect) {
    // return NSMakeRange(0, this.numberOfRows());
    var numberOfRows = this.numberOfRows(), range = NSMakeRange(0, 0);
    var idx = 0; height = 0.0;
    
    for (idx = 0; idx < numberOfRows; idx++) {
      if (height + this._rowHeight + this._intercellSpacing.height > rect.origin.y)
        break;
      else
        height += this._rowHeight + this._intercellSpacing.height;
    }
    if (idx < numberOfRows) {
      range.location = idx;
      
      for ( ; idx < numberOfRows; idx++) {
        if (height > rect.origin.y + rect.size.height)
          break;
        else
          height += this._rowHeight + this._intercellSpacing.height;
      }
      if (idx < numberOfRows)
        range.length = idx - range.location + 1;
      else
        range.length = numberOfRows - range.location;
    }
    
    return range;
  },
  
  columnAtPoint: function(point) {
    
  },
  
  /*
    @param {NSPoint} point
    @returns Integer
  */
  rowAtPoint: function(point) {
    var range = this.rowsInRect(NSMakeRect(point.x, point.y, 0.0, 0.0));
    
    if (range.length > 0)
      return range.location;
    
    // no row, returns NSNotFound
    return -1;
  },
  
  frameOfCellAtColumnRow: function(column, row) {
    var theRect = NSMakeRect(0, 0, 0, 0);
    
    if (column < 0 || column > this.numberOfColumns())
      return theRect;
    
    if (row < 0 || row > this.numberOfRows())
      return theRect;
    
    for (var idx = 0; idx < column; idx++)
      theRect.origin.x += this._tableColumns[idx].width() + this._intercellSpacing.width;
    
    // y origin is 0 (in relation to row)
    // for (var idx = 0; idx < row; idx++)
      // theRect.origin.y += this._rowHeight + this._intercellSpacing.height;
    
    theRect.size.width = this._tableColumns[column].width() + this._intercellSpacing.width;
    theRect.size.height += this._rowHeight + this._intercellSpacing.height;
    
    return theRect;
  },
  
  /**
    @param {Integer} column
    @param {Integer} row
    @returns VN.Cell
  */
  preparedCellAtColumnRow: function(column, row) {
    var dataCell = this._tableColumns[column].dataCellForRow(row);
    
    if (this._kvb_info.objectForKey(VN.CONTENT_BINDING)) {
      // use content binding
      dataCell.setObjectValue(this.contentBindingObjectValueForColumnRow(this._tableColumns[column], row))
    }
    else {
      // use datasource
      dataCell.setObjectValue(this.dataSourceObjectValueForColumnRow(this._tableColumns[column], row));
    }
    
    
    return dataCell;    
  },
  
  /**
    @param {VN.TableColumn} column
    @param {Integer} row
    @returns {VN.Object}
  */
  contentBindingObjectValueForColumnRow: function(column, row) {
    return this._content[row][column.identifier()];
  },
  
  /**
    @param {VN.TableColumn} column
    @param {Integer} row
    @returns {VN.Object}
  */
  dataSourceObjectValueForColumnRow: function(column, row) {
    if (this._dataSource && this._dataSource.respondsTo('tableViewObjectValueForTableColumnRow'))
      return this._dataSource.tableViewObjectValueForTableColumnRow(this, column, row);
    
    console.log('Tableview data source does not respond to tableViewObjectValueForTableColumnRow');
    return null;
  },

  /**
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
  
  /**
    @param {NSRect} clipRect
  */
  drawRect: function(clipRect) {
    // draw background
    this.drawBackgroundInClipRect(clipRect);

    // draw grid
    this.drawGridInClipRect(clipRect);
    
    // draw highlighted row backgrounds (each row is drawn on top of this)
    this.highlightSelectionInClipRect(clipRect);

    // draw each row
    if (this.numberOfRows() > 0) {
      var visibleRows = this.rowsInRect(clipRect);
      if (visibleRows.length > 0) {
        for (var idx = visibleRows.location; idx < visibleRows.location + visibleRows.length; idx++) {
          this.drawRowInClipRect(idx, clipRect);
        }
      }
    }
  },
  
  /**
    NSTableView handles rendering slightly differently, in the sense that
    firstTime is seen in a different context. firstTime is used to flag
    whenever the data is reloaded, in that whenever all the data from
    a datasource needs to be recalculated, then firsTime is used to 
    indicate this.
    
    @param {NSRect} aRect
    @param {Boolean} firstTime
    @param {NSRenderContext} context
  */
  renderRect: function(aRect, firstTime, context) {
    this.render(context, firstTime);
  },
  
  render: function(context, firstTime) {
    var aRect = NSMakeRect(100,100,100,100);
    console.log('first step');
    this.renderBackgroundInClipRect(aRect, firstTime, context);
    console.log('second step');
    this.renderSelectionInClipRect(aRect, firstTime, context);
    
    // if (firstTime) {
      if (this.numberOfRows() > 0) {
        if (!this._reusableRenderContext)
          this._reusableRenderContext = VN.RenderContext.renderContextWithElement(context.element().childNodes[0])
        // var visibleRows = this.rowsInRect(aRect);
        // if (visibleRows.length > 0) {
          // for (var idx = visibleRows.location; idx < visibleRows.location + visibleRows.length; idx++) {
          console.log('rendering rows');
          for (var idx = 0; idx < this.numberOfRows(); idx++) {
            console.log('rendering' + idx);
            console.log(context.element().childNodes[idx]);
            this._reusableRenderContext.setElement(context.element().childNodes[idx]);
            this.renderRowInContext(idx, this._reusableRenderContext);
          }
        // }
      }
    // }
  },
  
  renderRowInContext: function(row, context) {
    var visibleColumns = this.columnIndexesInRect(this.bounds);
    // context.set(row % 2 ? 'rgb(243, 243, 243)' : 'white', 'background');
    console.log('setting frame');
    context.setFrame(this.rectOfRow(row));
    console.log('done frame');
    for (var idx = visibleColumns.location; idx < visibleColumns.location + visibleColumns.length; idx++) {
      var dataCell = this.preparedCellAtColumnRow(idx, row);
      var cellRect = this.frameOfCellAtColumnRow(idx, row);
      var columnContext = this._tableColumns[idx].renderContext;
      columnContext.setElement(VN.$(this.guidForRowInColumn(row, idx)));
      console.log('wow ' + row + ' ' + idx);
      console.log(columnContext.element());
      columnContext.setFrame(cellRect);
      dataCell.renderWithFrameInView(cellRect, this, columnContext, true)
    }
  },
  
  renderSelectionInClipRect: function(aRect, firstTime, context) {
    if (!this._tableColumns)
      return;
    
    for (var idx = 0; idx < this._selectedRows._ranges.length; idx++) {
      var currentRange = this._selectedRows._ranges[idx]
      for (var j = currentRange.location; j < currentRange.location + currentRange.length; j++) {
        context.addClassForChildAtIndex('selected', j);
      }
    }
    
    if (this._oldSelectionRows) {
      for (var idx = 0; idx < this._oldSelectionRows._ranges.length; idx++) {
        var currentRange = this._oldSelectionRows._ranges[idx]
        for (var j = currentRange.location; j < currentRange.location + currentRange.length; j++) {
          context.removeClassForChildAtIndex('selected', j);
        }
      }
    }
    
    
    // var numberOfRows = this.numberOfRows();
    //     
    //     for (var row = 0; row <  numberOfRows; row++) {
    //       if (this.isRowSelected(row)) {
    //         context.addClassForChildAtIndex('selected', row);
    //       }
    //       else {
    //         context.removeClassForChildAtIndex('selected', row);
    //       }
    //     }
  },
  
  renderBackgroundInClipRect: function(aRect, firstTime, context) {
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
  },
  
  /**
    @param {NSRect} clipRect
  */
  highlightSelectionInClipRect: function(clipRect) {
    if (!this._tableColumns)
      return;
    
    var c = NSGraphicsContext.currentContext().graphicsPort();
    var row = 0, column = 0, numberOfRows = this.numberOfRows();
    
    for (column = 0; column < this._tableColumns.length; column++) {
      for (row = 0; row < numberOfRows; row++) {
        if (this.isColumnSelected(column) || this.isRowSelected(row)) {
          CGContextSetFillColorWithColor(c, NSColor.selectedControlColor());
          CGContextFillRect(c, this.frameOfCellAtColumnRow(column, row));
        }
      }
    }
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
  },
  
  mouseDown: function(theEvent) {
    var location = this.convertPointFromView(theEvent.locationInWindow(), null);
    console.log(location.y);
    location.y = this.bounds.size.height - location.y;
    console.log(location.y + '  ' + this.rowAtPoint(location));
    var extendSelection = (theEvent.modifierFlags() & NSCommandKeyMask) ? true : false;
    this.selectRowIndexes(NSIndexSet.indexSetWithIndex(this.rowAtPoint(location)), extendSelection);
    // this.setNeedsDisplay(true);
    this.renderSelectionInClipRect(null, false, this.renderContext);
    
    // var bindingInfo = this._kvb_info.valueForKey(VN.SELECTION_INDEXES_BINDING);
    // if (bindingInfo) {
      // bindingInfo.valueForKey(VN.OBSERVED_OBJECT_KEY).setValueForKeyPath(this._selectedRows, bindingInfo.valueForKey(VN.OBSERVED_KEY_PATH_KEY));
    // }
  },
  
  /**
    TableView can now receive (interpreted) keys
    
    @param {NSEvent} theEvent
  */
  keyDown: function(theEvent) {
    this.interpretKeyEvents([theEvent]);
  },
  
  /**
    @param {NSObject} sender
  */
  moveUp: function(sender) {
    if (this._selectedRows.firstIndex() < 1)
      return;
    
    var newIndex = this._selectedRows.firstIndex() - 1;
    this.selectRowIndexes(NSIndexSet.indexSetWithIndex(newIndex), false);
    this.setNeedsDisplay(true);
  },
  
  /**
    @param {NSObject} sender
  */
  moveDown: function(sender) {
    if (this.numberOfRows() < this._selectedRows.firstIndex() + 2)
      return;

    var newIndex = this._selectedRows.firstIndex() + 1;
    this.selectRowIndexes(NSIndexSet.indexSetWithIndex(newIndex), false);
    this.setNeedsDisplay(true);
  },
  
  /**
    TableView can become a first responder in all cases
    
    @returns Boolean
  */
  acceptsFirstResponder: function() {
    return true;
  },
  
  /**
    Instantiate a binding to the object. Placeholders and other information
    can be specified in the options dictionary.
    
    @param binding - NSString
    @param toObject - NSObject
    @param withKeyPath - NSString
    @param options - NSDictionary
  */
  bind: function(binding, toObject, withKeyPath, options) {
    // value binding - NSValueBinding
    if (binding == 'selectionIndexes') {
      toObject.addObserverForKeyPath(this, withKeyPath, 0, VN.SELECTION_INDEXES_BINDING);
      
      var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
        [toObject, withKeyPath, options],
        [VN.OBSERVED_OBJECT_KEY, VN.OBSERVED_KEY_PATH_KEY, VN.OPTIONS_KEY]);
      
      this._kvb_info.setObjectForKey(bindingInfo, VN.SELECTION_INDEXES_BINDING);
    }
    else if (binding == 'content') {
      toObject.addObserverForKeyPath(this, withKeyPath, 0, VN.CONTENT_BINDING);
      
      var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
        [toObject, withKeyPath, options],
        [VN.OBSERVED_OBJECT_KEY, VN.OBSERVED_KEY_PATH_KEY, VN.OPTIONS_KEY]);
      
      this._kvb_info.setObjectForKey(bindingInfo, VN.CONTENT_BINDING);
      
      this._content = toObject.valueForKeyPath(withKeyPath);
      this.reloadData();
    }
  },
  
  /**
		@param {NSString} keyPath
		@param {NSObject} ofObject
		@param {NSDictionary} change
		@param {Object} context
	*/
  observeValueForKeyPath: function(keyPath, ofObject, change, context) {
    // binding for selection indexes. select new indexes, and display.
    if (context == VN.SELECTION_INDEXES_BINDING) {
      var newValue = ofObject.valueForKeyPath(keyPath);
      this.selectRowIndexes(newValue, false);
      this.renderSelectionInClipRect(null, false, this.renderContext);
    }
    else if (context == VN.CONTENT_BINDING) {
      this._content = ofObject.valueForKeyPath(keyPath);
      this.reloadData();
    }
  }
});

/**
  @protocol VN.TableViewDelegate
  @conforms VN.ControlTextEditingDelegate
*/
VN.TableViewDelegate = VN.protocol({
  
  /**
    @optional
    
    Futher setup the provided cell with custom attributes. No drawing to be
    carried out, only setting up cell state. For example, setting some cells
    to appear disabled, italic font etc.
    
    @param {NSTableView} tableView
    @param {NSCell} cell
    @param {NSTableColumn} tableColumn
    @param {Integer} row
  */
  tableViewWillDisplayCellForTableColumnRow: function(tableView, cell, tableColumn, row) {
  },
  
  /**
    @optional
    
    Return true if the specified column/row can be editable by the user. A
    textfieldcell for example will allow the user to edit text, a slider
    cell will allow the user to change value. Returning false will deny the
    cell from being editable.
    
    @param {NSTableView} tableView
    @param {NSTableColumn} tableColumn
    @param {Integer} row
    @returns Boolean
  */
  tableViewShouldEditTableColumnRow: function(tableView, tableColumn, row) {
  },
  
  /**
    @optional
    
    @param {NSTableView} tableView
    @returns Boolean
  */
  selectionShouldChangeInTableView: function(tableView) {
  },
  
  /**
    @optional
    
    Return true if the row should be selected, false otherwise. For more
    control, tableViewSelectionIndexesForProposedSelection() is a better
    option.
    
    @param {NSTableView} tableView
    @param {Integer} row
    @returns Boolean
  */
  tableViewShouldSelectRow: function(tableView, row) {
  },
  
  /**
    @optional
    
    Returns the set of indexes to select when the user manually changes
    selection.
    
    @param {NSTableView} tableview
    @param {NSIndexSet} proposedIndexes
    @returns {NSIndexSet}
  */
  tableViewSelectionIndexesForProposedSelection: function(tableView, proposedIndexes) {
  },
  
  /**
    @optional
    
    @param {NSTableView} tableView
    @param {NSTableColumn} tableColumn
    @returns Boolean
  */
  tableViewShouldSelectTableColumn: function(tableView, tableColumn) {
  },
  
  /**
    @optional
    
    @param {NSTableView} tableView
    @param {NSTableColumn} tableColumn
  */
  tableViewMouseDownInHeaderOfTableColumn: function(tableview, tableColumn) {
  },
  
  /**
    @optional
    
    @param {NSTableView} tableView
    @param {NSTableColumn} tableColumn
  */
  tableViewDidClickTableColumn: function(tableview, tableColumn) {
  },
  
  /**
    @optional
    
    @param {NSTableView} tableView
    @param {NSTableColumn} tableColumn
  */
  tableViewDidDragTableColumn: function(tableview, tablecolumn) {
  },
  
  /**
    @optional
    
    The returned string is used as a tooltip when the mouse hovers over the
    relevant column/row.
    
    @param {NSTableView} tableView
    @param {NSCell} cell
    @param {NSRect} rect
    @param {NSTableColumn} tableColumn
    @param {Integer} row
    @param {NSPoint} mouseLocation
    @returns NSString
  */
  tableViewToolTipForCell: function(tableview, cell, rect, tableColumn, row, mouseLocation) {
  },
  
  /**
    @optional
    
    Used for specifying variable row heights. If not implemented, then the
    default row height for the table will be used.
    
    @param {NSTableView} tableView
    @param {Integer} row
    @returns Float
  */
  tableViewHeightOfRow: function(tableView, row) {
  },
  
  /**
    @optional
    
    @param {NSTableView} tableView
    @param {NSTableColumn} tableColumn
    @param {Integer} row
    @returns NSString
  */
  tableViewTypeSelectStringForTableColumnRow: function(tableview, tableColumn, row) {
  },
  
  /**
    @optional
    
    @param {NSTableView} tableView
    @param {Integer} startRow
    @param {Integer} endRow
    @param {NSString} searchString
    @returns Integer
  */
  tableViewNextTypeSelectMatchFromRowToRowForString: function(tableview, startRow, endRow, searchString) {
  },
  
  /**
    @optional
    
    @param {NSTableView} tableView
    @param {NSEvent} theEvent
    @param {NSString} searchString
    @returns Boolean
  */
  tableViewShouldTypeSelectForEventWithCurrentSearchString: function(tableView, theEvent, searchString) {
  },
  
  /**
    @optional
    
    @param {NSTableView} tableView
    @param {NSTableColumn} tableColumn
    @param {Integer} row
    @returns Boolean
  */
  tableViewShouldShowCellExpansionForTableColumnRow: function(tableView, tableColumn, row) {
  },
  
  /**
    @optional
    
    @param {NSTableView} tableView
    @param {NSCell} cell
    @param {NSTableColumn} tableColumn
    @param {Integer} row
    @returns Boolean
  */
  tableViewShouldTrackCellForTableColumnRow: function(tableView, cell, tableColumn, row) {
  },
  
  /**
    @optional
    
    @param {NSTableView} tableView
    @param {NSTableColumn} tableColumn
    @param {Integer} row
    @returns NSCell
  */
  tableViewDataCellForTableColumnRow: function(tableView, tableColumn, row) {
  },
  
  /**
    @optional
    
    @param {NSTableView} tableView
    @param {Integer} row
    @returns Boolean
  */
  tableViewIsGroupRow: function(tableView, row) {
  },
  
  /**
    @optional
    
    For responding to table's notifications
    
    @notification NSTableViewSelectionDidChangeNotification
    @param {NSNotification} aNotification
  */
  tableViewSelectionDidChange: function(aNotification) {
  },
  
  /**
    @optional
    
    For responding to table's notifications
    
    @notification NSTableViewColumnDidMoveNotification
    @param {NSNotification} aNotification
  */
  tableViewColumnDidMove: function(aNotification) {
  },
  
  /**
    @optional
    
    For responding to table's notifications
    
    @notification NSTableViewColumnDidResizeNotification
    @param {NSNotification} aNotification
  */
  tableViewColumnDidResize: function(aNotification) {
  },
  
  /**
    @optional
    
    For responding to table's notifications
    
    @notification NSTableViewSelectionIsChangingNotification
    @param {NSNotification} aNotification
  */
  tableViewSelectionIsChanging: function(aNotification) {
  }
});

/**
  @protocol VN.TableViewDataSource
*/
VN.TableViewDataSource = NSObject.protocol({
  
  /**
    @required
    
    Returns the number of rows in the table
    
    @param {NSTableView} tableView
    @returns Integer
  */
  numberOfRowsInTableView: function(tableView) {
  },
  
  /**
    @required
    
    Object value for the column/row to be passed to the cell for display.
    
    @param {NSTableView} tableView
    @param {NSTableColumn} tableColumn
    @param {Integer} row
    @returns NSObject
  */
  tableViewObjectValueForTableColumnRow: function(tableView, tableColumn, row) {
  },
  
  /**
    @optional
    
    Support for editing. When a value is edited, the data source is given
    the new value, objectValue for storing.
    
    @param {NSTableView} tableView
    @param {NSObject} objectValue
    @param {NSTableColumn} tableColumn
    @param {Integer} row
  */
  tableViewSetObjectValueForTableColumnRow: function(tableView, objectValue, tableColumn, row) {
  },
  
  /**
    @optional
    
    @param {NSTableView} tableView
    @param {NSArray} oldDescriptors
  */
  tableViewSortDescriptorsDidChange: function(tableView, oldDescriptors) {
  },
  
  /**
    @optional
    
    @param {NSTableView} tableView
    @param {NSIndexSet} rowIndexes
    @param {NSPasteboard} pboard
    @returns Boolean
  */
  tableViewWriteRowsWithIndexesToPasteboard: function(tableView, rowIndexes, pboard) {
  } 
});
/* 
 * outline_view.js
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
  @class NSOutlineView
  @extend NSTableView
*/
var NSOutlineView = NSTableView.extend({
  
  /**
    @type Integer
  */
  _numberOfRows: null,
  
  /**
    @param {NSCoder} aCoder
    @returns NSOutlineView
  */
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    return this;
  },
  
  /**
    @param {NSObject} <NSOutlineViewDelegate> anObject
  */
  setDelegate: function(anObject) {
    
  },
  
  /**
    @returns NSObject <NSOutlineViewDelegate>
  */
  delegate: function() {
    
  },
  
  /**
    @param {NSObject} <NSOutlineViewDataSource> aSource
  */
  setDataSource: function(aSource) {
    
  },
  
  /**
    @returns NSObject <NSOutlineViewDataSource>
  */
  dataSource: function() {
    
  },
  
  /**
    @param {NSTableColumn} outlineTableColumn
  */
  setOutlineTableColumn: function(outlineTableColumn) {
    
  },
  
  /**
    @retuns NSTableColumn
  */
  outlineTableColumn: function() {
    
  },
  
  /**
    @param {NSObject} item
    @returns Boolean
  */
  isExpandable: function(item) {
    
  },
  
  /**
    Expands the passed item, as well as all it's children if the flag is
    true. Passing null for item will cause all root itrms to expand.
    
    @param {NSObject} item
    @param {Boolean} expandChildren - optional, default false.
  */
  expandItem: function(item, expandChildren) {
    
  },
  
  /**
    @param {NSObject} item
    @param {Boolean} collapseChildren - optional, default false
  */
  collapseItem: function(item, collapseChildren) {
    
  },
  
  /**
    @param {NSObject} item
    @param {Boolean} reloadChildren - optional, defailt false
  */
  reloadItem: function(item, reloadChildren) {
    
  },
  
  /**
    @param {NSObject} item
    @returns NSObject
  */
  parentForItem: function(item) {
    
  },
  
  /**
    @param {Integer} row
    @returns NSObject
  */
  itemAtRow: function(row) {
    
  },
  
  /**
    @param {NSObject} item
    @returns Integer
  */
  rowForItem: function(item) {
    
  },
  
  /**
    @param {NSObject} item
    @returns Integer
  */
  levelForItem: function(item) {
    
  },
  
  /**
    @param {Integer} row
    @returns Integer
  */
  levelForRow: function(row) {
    
  },
  
  /**
    @param {NSObject} item
    @returns Boolean
  */
  isItemExpanded: function(item) {
    
  },
  
  /**
    Sets the indentation per level. Default is 16.0
    
    @param {Float} indentationPerLevel
  */
  setIndentationPerLevel: function(indentationPerLevel) {
    
  },
  
  /**
    @returns Float
  */
  indentationPerLevel: function() {
    
  },
  
  /**
    @param {Boolean} drawInCell
  */
  setIndentationMarkerFollowsCell: function(drawInCell) {
    
  },
  
  /**
    @returns Boolean
  */
  indentationMarkerFollowsCell: function() {
    
  },
  
  /**
    @param {Boolean} resize
  */
  setAutoresizesOutlineColumn: function(resize) {
    
  },
  
  /**
    @returns Boolean
  */
  autoresizesOutlineColumn: function() {
    
  },
  
  /**
    @param {Integer} row
    @returns NSRect
  */
  frameOfOutlineCellAtRow: function(row) {
    
  },
  
  /**
    @param {NSObject} item
    @param {Integer} index
  */
  setDropItemDropChildIndex: function(item, index) {
    
  },
  
  /**
    @param {Boolean} depositied
    @returns {Boolean}
  */
  shouldCollapseAutoExpandedItemsForDeposited: function(deposited) {
    
  },
  
  /**
    @returns Boolean
  */
  autosaveExpandedItems: function() {
    
  },
  
  /**
    @param {Boolean} save
  */
  setAutosaveExpandedItems: function(save) {
    
  }
});

/**
  @protocol NSOutlineViewDataSource
*/
var NSOutlineViewDataSource = NSObject.protocol({
  
  /**
    @required
    
    @param {NSOutlineView} outlineView
    @param {Integer} index
    @param {NSObject} item
    @returns NSObject
  */
  outlineViewChildOfItem: function(outlineView, index, item) {
  },
  
  /**
    @required
    
    @param {NSOutlineview} outlineView
    @param {NSObject} item
    @returns Boolean
  */
  outlineViewIsItemExpandable: function(outlineView, item) {
  },
  
  /**
    @required
    
    @param {NSOutlineview} outlineView
    @param {NSObject} item
    @returns Integer
  */
  outlineViewNumberOfChildrenOfItem: function(outlineview, item) {
  },
  
  /**
    @required
    
    @param {NSOutlineview} outlineView
    @param {NSTableColumn} tableColumn
    @param {NSObject} item
    @returns NSObject
  */
  outlineViewObjectValueForTableColumnByItem: function(outlineView, tableColumn, item) {
  },
  
  /**
    @optional
    
    @param {NSOutlineView} outlineview
    @param {NSObject} object
    @param {NSTableColumn} tableColumn
    @param {NSObject} item
  */
  outlineViewSetObjectValueForTableColumnByItem: function(outlineView, object, tableColumn, item) {
  },
  
  /**
    @optional
    
    @param {NSOutlineView} outlineView
    @param {NSObject} object
    @returns NSObject
  */
  outlineViewItemForPersistentObject: function(outlineView, object) {
  },
  
  /**
    @optional
    
    @param {NSOutlineView} outlineView
    @param {NSObject} item
    @returns NSObject
  */
  outlineViewPersistentObjectForItem: function(outlineView, item) {
  },
  
  /**
    @optional
    
    This states that sorting needs to take place. It is expected that the 
    data source will sort, then reload and adjust selections
    
    @param {NSOutlineView} outlineView
    @param {NSArray} oldDescriptors
  */
  outlineViewSortDescriptorsDidChange: function(outlineView, oldDescriptors) {
  },
  
  /**
    @optional
    
    This is called after the drag has been decided, but before any action
    takes place. Returning false will refuse the drag. true will intiate
    the drag action.
    
    @param {NSOutlineView} outlineView
    @param {NSArray} items
    @param {NSPasteboard} pasteboard
    @returns Boolean
  */
  outlineViewWriteItemsToPasteboard: function(outlineView, items, pasteboard) {
  },
  
  /**
    @optional
    
    @param {NSOutlineView} outlineView
    @param {NSObject} <NSDraggingInfo> info
    @param {NSObject} proposedItem
    @param {Integer} index
    @returns NSDragOperation
  */
  outlineViewValidateDropProposedItemProposedChildIndex: function(outlineView, info, item, index) {
  },
  
  /**
    @optional
    
    @param {NSOutlineView} outlineView
    @param {NSObject} <NSDraggingInfo> info
    @param {NSObject} item
    @param {Integer} index
    @returns Boolean
  */
  outlineViewAcceptDropItemIndex: function(outlineView, info, item, index) {
  },
  
  /**
    @optional
    
    @param {NSOutlineView} outlineView
    @param {NSURL} dropDestination
    @param {NSArray} items
  */
  outlineViewNamesOfPromisedFilesDroppedAtDestinationForDraggedItems: function(outlineView, dropDestination, items) {
  }
});


/**
  @protocol NSOutlineViewDelegate
  @conforms NSControlTextEditingDelegate
*/
var NSOutlineViewDelegate = NSObject.protocol({
  
  /**
    @param {NSOutlineview} outlineView
    @paeam {NSCell} cell
    @param {NSTableColumn} tableColumn
    @param {NSObject} item
  */
  outlineViewWillDisplayCellForTablueColumnItem: function(outlineView, cell, tableColumn, item) {
  },
  
  /**
    @param {NSOutlineView} outlineView
    @param {NSTableColumn} tableColumn
    @param {NSObject} item
    @returns Boolean
  */
  outlineViewShouldEditTableColumnItem: function(outlineView, tableColumn, item) {
  },
  
  /**
    @param {NSOutlineView} outlineView
    @returns Boolean
  */
  selectionShouldChangeInOutlineView: function(outlineView) {
  },
  
  /**
    @optional
    
    Return true so the item should select, and false otherwise.
    
    @param {NSOutlineView} outlineView
    @param {NSObject} item
    @returns Boolean
  */
  outlineViewShouldSelectItem: function(outlineView, item) {
  },
  
  // rest to follow...
});

/**
  Notification constants
*/
var NSOutlineViewSelectionDidChangeNotification   = "NSOutlineViewSelectionDidChangeNotification";
var NSOutlineViewColumnDidMoveNotification      = "NSOutlineViewColumnDidMoveNotification";
var NSOutlineViewColumnDidResizeNotification    = "NSOutlineViewColumnDidResizeNotification";
var NSOutlineViewSelectionIsChangingNotification  = "NSOutlineViewSelectionIsChangingNotification";
var NSOutlineViewItemWillExpandNotification     = "NSOutlineViewItemWillExpandNotification";
var NSOutlineViewItemDidExpandNotification      = "NSOutlineViewItemDidExpandNotification";
var NSOutlineViewItemWillCollapseNotification     = "NSOutlineViewItemWillCollapseNotification";
var NSOutlineViewItemDidCollapseNotification    = "NSOutlineViewItemDidCollapseNotification";

/**
  @protocol NSOutlineViewNotifications
*/
var NSOutlineViewNotifications = NSObject.protocol({
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewSelectionDidChange: function(aNotification) {
  },
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewColumnDidMove: function(aNotification) {
  },
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewColumnDidResize: function(aNotification) {
  },
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewSelectionIsChanging: function(aNotification) {
  },
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewItemWillExpand: function(aNotification) {
  },
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewItemDidExpand: function(aNotification) {
  },
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewItemWillCollapse: function(aNotification) {
  },
  
  /**
    @param {NSNotification} aNotification
  */
  outlineViewItemDidCollapse: function(aNotification) {
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


VN.Panel = VN.Window.extend({
  
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
var NSLeftTabStopType         = 0;
var NSRightTabStopType        = 1;
var NSCenterTabStopType       = 2;
var NSDecimalTabStopType      = 3;

// NSLineBreakMode
var NSLineBreakByWordWrapping     = 0;
var NSLineBreakByCharWrapping     = 1;
var NSLineBreakByClipping       = 2;
var NSLineBreakByTruncatingHead   = 3;
var NSLineBreakByTruncatingTail   = 4;
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
    this._alignment = VN.LEFT_TEXT_ALIGNMENT;
    
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
 * render_context.js
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
  @class NSRenderContext
  @extends NSObject
*/
var NSRenderContext = VN.RenderContext = VN.Object.extend({
  
  /**
    @type Boolean
  */
  _firstTime: null,
  
  /**
    @type Element
  */
  _element: null,
  
  /**
    @returns Element
  */
  element: function() {
    return this._element;
  },
  
  initWithElement: function(element) {
    this._element = element;
    this._firstTime = true;
    return this;
  },
  
  firstTime: function() {
    return this._firstTime;
  },
  
  setFirstTime: function(flag) {
    this._firstTime = flag;
  },
  
  /**
    @param {Element} anElement
  */
  setElement: function(anElement) {
    this._element = anElement;
  },
  
  /**
    Uses the path, after splitting it, to get the dom element. Path should
    be a dot-seperated string, where each path element can be a class-name
    of the selector. For example $('inner.title') might be used to return
    the title span in:
    
    {{{
      <div class='the-view'>
        <div class="inner">
          <span class = "title">
            hey
          </span>
        </div>
      </div>
    }}}
    
    The first retireved class will be used. i.e. if the dom has two elements
    of the relevant class, then the first is always returned.
    
    @param {NSString} path
    @returns NSRenderContext
  */
  $: function(path) {
    return NSRenderContext.renderContextWithElement(this._element.getElementsByClassName(path)[0]);
  },
  
  set: function(value, key) {
    console.log(value + ' ' + key);
    this._element.style[key] = value;
  },
  
  /**
    Pushes a new 'element' with class 'className' into the _element's 
    context.
    
    @param {NSString} element
    @param {NSString} className
    @param {NSString} id - the dom id for the element
  */
  push: function(element, className, id) {
    var theElement = document.createElement(element);
    theElement.className = className;
    theElement.id = id;
    this._element.appendChild(theElement);
  },
  
  setClass: function(className) {
    this._element.className = className;
  },
  
  addClassForElement: function(className, element) {
    var classes = element.className.split(' '), index = classes.indexOf(className);
    if (index > -1) return; // already has class
    
    element.className = element.className + " " + className;
  },
  
  removeClassForElement: function(className, element) {
    var classes = element.className.split(' '), index = classes.indexOf(className);
    if (index > -1) {
      classes.splice(index, 1);
      element.className = classes.join(' ');
    }
  },
  
  addClass: function(className) {
    this.addClassForElement(className, this._element);
  },
  
  removeClass: function(className) {
    this.removeClassForElement(className, this._element);
  },
  
  addClassForChildAtIndex: function(className, index) {
    this.addClassForElement(className, this._element.childNodes[index]);
  },
  
  removeClassForChildAtIndex: function(className, index) {
    this.removeClassForElement(className, this._element.childNodes[index]);
  },
  
  setFrame: function(frameRect) {
    this.set(frameRect.origin.x + 'px', 'left');
    this.set(frameRect.origin.y + 'px', 'top');
    this.set(frameRect.size.width + 'px', 'width');
    this.set(frameRect.size.height + 'px', 'height');
  },
  
  renderAttributedString: function(attributedString) {
    if (this._element.tagName == 'INPUT') {
      this._element.value = attributedString._string;
    }
    else {
      this._element.innerHTML = attributedString._string;
    }
    
    
    // the font
    var theFont = attributedString._attributes.objectForKey(NSFontAttributeName);
    this.set(theFont.renderingRepresentation(), 'font');
    
    // text color
		var theColor = attributedString._attributes.objectForKey(NSForegroundColorAttributeName);
		this.set(theColor.rgbString(), 'color');
		
		if (attributedString._attributes.containsKey(NSParagraphStyleAttributeName)) {
      var paragraphStyle = attributedString._attributes.objectForKey(NSParagraphStyleAttributeName);
      switch (paragraphStyle.alignment()) {
        case VN.LEFT_TEXT_ALIGNMENT:
          this.set('left', 'textAlign');
          break;
        case VN.RIGHT_TEXT_ALIGNMENT:
          this.set('right', 'textAlign');
          break;
        case VN.CENTER_TEXT_ALIGNMENT:
          // position text in middle...
          this.set('center', 'textAlign');
          break;
        case VN.JUSTIFIED_TEXT_ALIGNMENT:
          break;
      }
      
      // console.log('line break mode: ' + paragraphStyle.lineBreakMode());
    }
  }
});

NSRenderContext.renderContextWithElement = function(element) {
  return this.create('initWithElement', element);
};/* 
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

/**
  @class NSScrollView
  @extends NSView
*/
var NSScrollView = NSView.extend({
  
  /**
    @type Boolean
  */
  _hasVerticalScroller: null,
  
  /**
    @type Boolean
  */
  _hasHorizontalScroller: null,
  
  /**
    @type Integer
  */
  _borderType: null,
  
  /**
    @type NSScroller
  */
  _verticalScroller: null,
  
  /**
    @type NSScroller
  */
  _horizontalScroller: null,
  
  /**
    @type NSClipView
  */
  _clipView: null,
  
  /**
    @type NSClipView
  */
  _headerClipView: null,
  
  /**
    @type NSView
  */
  _cornerView: null,
  
  /**
    @param {NSCoder} aCoder
    @returns NSScrollView
  */
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
  
  /**
    Tiles the scrollview and all of its contents
  */
  tile: function() {
    var frame;
    
    // headerClipView
    if (this._headerClipView) {
      frame = NSMakeRect(0, this.bounds.size.height - this._headerClipView.bounds.size.height, this.bounds.size.width, this._headerClipView.bounds.size.height);
      this._headerClipView.setFrame(frame);
    }
    
    // clipView
    if (this._clipView) {
      var heightOffset = (this._headerClipView) ? this._headerClipView.bounds.size.height : 0;
      frame = NSMakeRect(0, 0, this.bounds.size.width, this.bounds.size.height - heightOffset);
      this._clipView.setFrame(frame);
    }
  },
  
  documentVisibleRect: function() {
    
  },
  
  contentSize: function() {
    
  },
  
  setDocumentView: function(aView) {
    
  },
  
  /**
    @returns NSClipView
  */
  documentView: function() {
    return this._clipView;
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
  
  /**
    @returns Boolean
  */
  autohidesScrollers: function() {
    
  },
  
  /**
    @param {Boolean} flag
  */
  setAutohidesScrollers: function(flag) {
    
  },
  
  /**
    @param {Float} value
  */
  setHorizontalLineScroll: function(value) {
    
  },
  
  /**
    @returns Float
  */
  horizontalLineScroll: function() {
    
  },
  
  /**
    @param {Float} value
  */
  setVerticalLineScroll: function(value) {
    
  },
  
  /**
    @returns Float
  */
  verticalLineScroll: function() {
    
  },
  
  /**
    @param {Float} value
  */
  setLineScroll: function(value) {
    
  },
  
  /**
    @returns Float
  */
  lineScroll: function() {
    
  },
  
  /**
    @param {Float} value
  */
  setHorizontalPageScroll: function(value) {
    
  },
  
  /**
    @returns Float
  */
  horizontalPageScroll: function() {
    
  },
  
  /**
    @param {Float} value
  */
  setVerticalPageScroll: function(value) {
    
  },
  
  /**
    @returns Float
  */
  verticalPageScroll: function() {
    
  },
  
  /**
    @param {Float} value
  */
  setPageScroll: function(value) {
    
  },
  
  /**
    @returns Float
  */
  pageScroll: function() {
    
  },
  
  /**
    @param {Boolean} flag
  */
  setScrollsDynamically: function(flag) {
    
  },
  
  /**
    @returns Boolean
  */
  scrollsDynamically: function() {
    
  },
  
  /**
    @param {NSClipView} aView
  */
  reflectScrolledClipView: function(aView) {
    
  },
  
  /**
    @param {NSEvent} theEvent
  */
  scrollWheel: function(theEvent) {
    
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
 

// NSScroller Vertical
// resource('NSScrollerBottomArrowNormal.png');  // 15 x 18
// resource('NSScrollerTopArrowNormal.png');     // 15 x 30
// resource('NSScrollerTopSlotNormal.png');    // 15 x 18
// resource('NSScrollerVBackgroundNormal.png');  // 15 x 6
// 
// resource('NSScrollerTopKnobNormal.png');    // 15 x 10
// resource('NSScrollerBottomKnobNormal.png');   // 15 x 10
// resource('NSScrollerVerticalKnobNormal.png');   // 15 x 1
// 
// // NSScroller Horizontal
// resource('NSScrollerRightArrowNormal.png');   // 18 x 15
// resource('NSScrollerLeftArrowNormal.png');    // 30 x 15
// resource('NSScrollerLeftSlotNormal.png');     // 18 x 15
// resource('NSScrollerHBackgroundNormal.png');  // 6 x 15
// 
// resource('NSScrollerLeftKnobNormal.png');     // 10 x 15
// resource('NSScrollerRightSlotNormal.png');    // 10 x 15
resource('NSScrollerHorizontalKnobNormal.png'); // 1 x 15

// NSScrollArrowPosition
var NSScrollerArrowsDefaultSetting	= 0;
var NSScrollerArrowsNone	     	= 2;

// NSUsableScrollerParts
var NSNoScrollerParts			  = 0;
var NSOnlyScrollerArrows		  = 1;
var NSAllScrollerParts			  = 2;

// NSScrollerPart
var NSScrollerNoPart			  = 0;
var NSScrollerDecrementPage		  = 1;
var NSScrollerKnob			    = 2;
var NSScrollerIncrementPage		  = 3;
var NSScrollerDecrementLine  	  = 4;
var NSScrollerIncrementLine	 	  = 5;
var NSScrollerKnobSlot			  = 6;

// NSScrollerArrow
var NSScrollerIncrementArrow    = 0;
var NSScrollerDecrementArrow	  = 1;

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
  
  /**
    @type VN.String
  */
  renderTagName: 'div',
  
  /**
    @type VN.String
  */
  renderClassName: 'vn-scroller',
  
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    
    this._isVertical = (this.bounds.size.width < this.bounds.size.height) ? true : false;
    
    this._value = aCoder.decodeDoubleForKey("NSCurValue");
    if (!this._value)
      this._value = 1;
      
    this._knobProportion = aCoder.decodeDoubleForKey("NSPercent");
    if (!this._knobProportion)
      this._knobProportion = 1;
    
          
    return this;
  },
  
  renderRect: function(aRect, firstTime, context) {
    if (firstTime) {
      context.push('div', 'vn-scroller-top');
      context.push('div', 'vn-scroller-knob');
      context.push('div', 'vn-scroller-middle');
      context.push('div', 'vn-scroller-up');
      context.push('div', 'vn-scroller-down');
    }
      
    // this.renderBezel(aRect, firstTime, context);
      // this.renderInteriorWithFrame(cellFrame, controlView, firstTime, context);
    // this.renderTitle(this._value, this.titleRectForBounds(aRect), firstTime, context);
  },
  
  drawRect: function(aRect) {
    var c = NSGraphicsContext.currentContext().graphicsPort();
    
    if (this._isVertical) {
      this.drawKnobSlotInRect(this.rectForPart(NSScrollerKnobSlot), false);
      NSImage.imageNamed('NSScrollerTopSlotNormal.png').drawInRect(NSMakeRect(0, 0, 15, 18));
      
      this.drawArrow(NSScrollerIncrementArrow, false);
      this.drawArrow(NSScrollerDecrementArrow, false);
       
      this.drawKnob();
    }
    else {
      this.drawKnobSlotInRect(this.rectForPart(NSScrollerKnobSlot), false);
      NSImage.imageNamed('NSScrollerLeftSlotNormal.png').drawInRect(NSMakeRect(0, 0, 18, 15));

      this.drawArrow(NSScrollerIncrementArrow, false);
      this.drawArrow(NSScrollerDecrementArrow, false);

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
          return NSMakeRect(0, 8, 15, this.bounds.size.height - 45);
          break;
        case NSScrollerIncrementLine:
          // bottom arrow (facing down)
          return NSMakeRect(0, this.bounds.size.height - 18, 15, 18);
          break;
        case NSScrollerDecrementLine:
          // top arrow
          return NSMakeRect(0, this.bounds.size.height - (18 + 30), 15, 30);
          break;
        case NSScrollerNoPart:
          // returns the area between slot and top arrow
          return NSMakeRect(0, 18, 15, this.bounds.size.height - (18 + 30 + 18));
          break;
        
        case NSScrollerKnob:
          var slotRect = this.rectForPart(NSScrollerKnobSlot);
          var scrollerHeight = this._knobProportion * slotRect.size.height;
          var yOffset = (slotRect.size.height - scrollerHeight) * this._value;
          return NSMakeRect(0, yOffset + slotRect.origin.y, 15, scrollerHeight);
          break;
      }
    }
    else {
      switch (partCode) {
        case NSScrollerKnobSlot:
          return NSMakeRect(8, 0, this.bounds.size.width - 45, 15);
          break;
        case NSScrollerIncrementLine:
          // bottom arrow (facing down)
          return NSMakeRect(this.bounds.size.width - 18, 0, 18, 15);
          break;
        case NSScrollerDecrementLine:
          // top arrow
          return NSMakeRect(this.bounds.size.width - (18 + 30), 0, 30, 15);
          break;
        case NSScrollerNoPart:
          // returns the area between slot and top arrow
          return NSMakeRect(18, 0, this.bounds.size.width - (18 + 30 + 18), 15);
          break;
        
        case NSScrollerKnob:
          var slotRect = this.rectForPart(NSScrollerKnobSlot);
          var scrollerWidth = this._knobProportion * slotRect.size.width;
          var xOffset = (slotRect.size.width - scrollerWidth) * this._value;
          return NSMakeRect(xOffset + slotRect.origin.x, 0, scrollerWidth, 15);
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
      if (this._isVertical)
        NSImage.imageNamed('NSScrollerBottomArrowNormal.png').drawInRect(theRect);
      else
        NSImage.imageNamed('NSScrollerRightArrowNormal.png').drawInRect(theRect);
    }
    else if (anArrow == NSScrollerDecrementArrow) {
      var theRect = this.rectForPart(NSScrollerDecrementLine);
      if (this._isVertical)
        NSImage.imageNamed('NSScrollerTopArrowNormal.png').drawInRect(theRect);
      else
        NSImage.imageNamed('NSScrollerLeftArrowNormal.png').drawInRect(theRect);
    }
    
  },
  
  drawKnob: function() {
    var knobRect = this.rectForPart(NSScrollerKnob);
    if (this._isVertical) {
      NSImage.imageNamed('NSScrollerTopKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x, knobRect.origin.y, 15, 10));
      NSImage.imageNamed('NSScrollerVerticalKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x, knobRect.origin.y + 10, 15, knobRect.size.height - 20));
      NSImage.imageNamed('NSScrollerBottomKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x, knobRect.origin.y + 10 + (knobRect.size.height - 20), 15, 10));
    }
    else {
      // NSImage.imageNamed('NSScrollerLeftKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x, knobRect.origin.y, 10, 15));
      // NSImage.imageNamed('NSScrollerHorizontalKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x + 10, knobRect.origin.y, knobRect.size.width - 20, 15));
      // NSImage.imageNamed('NSScrollerRightKnobNormal.png').drawInRect(NSMakeRect(knobRect.origin.x + 10 + (knobRect.size.width - 20), knobRect.origin.y, 10, 15));
    }
  },
  
  /*
    @param slotRect - NSRect
    @param highlight - Boolean
  */
  drawKnobSlotInRect: function(slotRect, highlight) {
    if (this._isVertical)
      NSImage.imageNamed('NSScrollerVBackgroundNormal.png').drawInRect(slotRect);
    else
      NSImage.imageNamed('NSScrollerHBackgroundNormal.png').drawInRect(slotRect);
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
    location.y = this.bounds.size.height - location.y;
    this._knobTrackStartPoint = location;
    
    NSApplication.sharedApplication().bindEventsMatchingMask((NSLeftMouseUpMask | NSMouseMovedMask), this, function(theEvent) {
      
      if (theEvent.type() == NSLeftMouseUp) {
        NSApplication.sharedApplication().unbindEvents();
        return;
      }
      
      var location = this.convertPointFromView(theEvent.locationInWindow(), null);
      // Temp fix for inverted co-ord (cocoa origin bottom left)
      location.y = this.bounds.size.height - location.y;
      
      var knobRect = this.rectForPart(NSScrollerKnob);
      var slotRect = this.rectForPart(NSScrollerKnobSlot);
      // var change = (location.y - this._knobTrackStartPoint.y) * knobRect.size.height;
      var offsetY = (location.y - this._knobTrackStartPoint.y) / (slotRect.size.height - knobRect.size.height);// - knobRect.origin.y;
      // var newValue = offsetY / (slotRect.size.height - knobRect.size.height);
      this.setDoubleValue(offsetY + 0.5);
      // this.setNeedsDisplay(true);
      // console.log(offsetY + '(' + this._value + ')');
    });
  },
  
  setDoubleValue: function(aDouble) {
    if (aDouble < 0)
      this._value = 0;
    else if (aDouble > 1)
      this._value = 1;
    else
      this._value = aDouble;
    
    this.setNeedsDisplay(true);
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
    location.y = this.bounds.size.height - location.y;
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


/**
  VN.TextFieldBezelStyle
*/
VN.TEXT_FIELD_SQUARE_BEZEL = 0;
VN.TEXT_FIELD_ROUNDED_BEZEL = 1;

/**
  @class VN.TextField
  @extends VN.Control
*/
var NSTextField = VN.TextField = VN.Control.extend({
  
  _drawsBackground: null,
  _backgroundColor: null,
  _textColor: null,
  
  /**
    @type VN.String
  */
  renderTagName: 'div',
  
  /**
    @type VN.String
  */
  renderClassName: 'vn-text-field',
  
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    // this._drawsBackground = this._cell._drawsBackground;
    // this._backgroundColor = this._cell._backgroundColor;
    // this._textColor = this._cell._textColor;
    return this;
  },
  
  
  renderRect: function(aRect, firstTime, context) {  
    if (firstTime) {
      context.setClass('vn-text-field');
      context.push('span', 'vn-text-field-title');
    }
    else {
      if (this._drawsBackground) {
        context.addClass('bezeled');
      }
      
      this.renderInterior(aRect, firstTime, context);
    }
  },
  
  renderInterior: function(aRect, firstTime, context) {
    var titleRect = this.titleRectForBounds(aRect);
    context.$('vn-text-field-title').setFrame(titleRect);
    context.$('vn-text-field-title').renderAttributedString(this.attributedStringValue());
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
  
  /**
    If appropriate, setup a field editor to allow editing of the textfield
    and it's contents using the window's field editor.
    
    @param {VN.Event} theEvent
  */
  mouseDown: function(theEvent) {
    if (!this.isEnabled())
      return;
    
    if (this.isSelectable() || this.isEditable()) {
      this.renderElement.onmousedown = function(event) {
        event._allowBrowserControl = true;
      };
      this.renderElement.onkeypress = function(event) {
        event._allowBrowserControl = true;
      };
      this.renderElement.onkeydown = function(event) {
        switch (theEvent.keyCode) {
          case NSUpArrowFunctionKey:
          case NSDownArrowFunctionKey:
          case NSLeftArrowFunctionKey:
          case NSRightArrowFunctionKey:
          case NSDeleteForwardFunctionKey:
          case NSDeleteBackwardFunctionKey:
            event._allowBrowserControl = true;
            break;
          case NSReturnFunctionKey:
          case NSEscapeFunctionKey:
          case NSTabFunctionKey:
          case NSPageUpFunctionKey:
          case NSPageDownFunctionKey:
            event._allowBrowserControl = false;
            break;
        };
      };
      this.renderContext.$('vn-text-field-title').element().focus();
      // if (!this._currentEditor) {
        // this._currentEditor = this.window().fieldEditor(true, this);
        // this._currentEditor = this.setUpFieldEditorAttributes(this._currentEditor);
      // }
      
      // this.setHighlighted(true);
      // this.editWithFrame(this._bounds, this, this._currentEditor, this, theEvent);
    }
  },
  
  /**
    Instantiate a binding to the object. Placeholders and other information
    can be specified in the options dictionary.
    
    @param binding - NSString
    @param toObject - NSObject
    @param withKeyPath - NSString
    @param options - NSDictionary
  */
  bind: function(binding, toObject, withKeyPath, options) {
    // value binding - NSValueBinding
    if (binding == "value") {
      toObject.addObserverForKeyPath(this, withKeyPath, 0, VN.VALUE_BINDING);
      
      var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
        [toObject, withKeyPath, options],
        [VN.OBSERVED_OBJECT_KEY, VN.OBSERVED_KEY_PATH_KEY, VN.OPTIONS_KEY]);
      
      this._kvb_info.setObjectForKey(bindingInfo, VN.VALUE_BINDING);
    }
  },
  
  /**
		@param {NSString} keyPath
		@param {NSObject} ofObject
		@param {NSDictionary} change
		@param {Object} context
	*/
  observeValueForKeyPath: function(keyPath, ofObject, change, context) {
    if (context == VN.VALUE_BINDING) {
      var newValue = ofObject.valueForKeyPath(keyPath);
      this.setObjectValue(newValue);
    }
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
  
  isSelectable: function() {
    return this.cell.valueForKey('selectable');
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
  
  textColor: function() {
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
			else
			  attributes.setObjectForKey(NSColor.controlTextColor(), NSForegroundColorAttributeName);
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
  //   return textObj;
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
 * search_field.js
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


var NSSearchField = VN.SearchField = VN.TextField.extend({
  
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    return this;
  },
  
  /**
    @type VN.Array
  */
  recentSearches: null,
  
  /**
    @type VN.String
  */
  recentsAutosaveName: null
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


/**
  @class NSTextFieldCell
  @extends NSCell
*/
var NSTextFieldCell = VN.TextFieldCell = NSCell.extend({
  
  _backgroundColor: null,
  
  init: function() {
    this._super();
    return this;
  },
  
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    
    this.drawsBackground = aCoder.decodeBoolForKey("NSDrawsBackground");
    this.backgroundColor = aCoder.decodeObjectForKey("NSBackgroundColor");
    this.textColor = aCoder.decodeObjectForKey("NSTextColor");
    
    return this;
  },
  
  renderWithFrameInView: function(cellFrame, controlView, renderContext, firstTime) {  
    if (firstTime) {
      renderContext.setClass('vn-text-field');
      if (this.isEditable) {
        renderContext.push('input', 'vn-text-field-title');
        // renderContext.$('vn-text-field-title')
      }
      else {
        renderContext.push('span', 'vn-text-field-title');
      }
    }
    if (this.drawsBackground) {
      renderContext.addClass('bezeled');
    }
    if (this.isEditable) {
      renderContext.addClass('editable');
      // renderContext.$('vn-text-field-title').element().contentEditable = 'true';
      // renderContext.$('vn-text-field-title').element().spellcheck = 'true';
    }
      this.renderInteriorWithFrameInView(cellFrame, controlView, renderContext, firstTime);
    
    
  },
  
  /**
    Interior should only be rendered for label views: textfield is rendered by native
    browser input element
  */
  renderInteriorWithFrameInView: function(cellFrame, controlView, renderContext, firstTime) {
    var titleRect = this.titleRectForBounds(cellFrame);
    renderContext.$('vn-text-field-title').setFrame(titleRect);
    // if (!this.isEditable) {
      renderContext.$('vn-text-field-title').renderAttributedString(this.attributedStringValue());
    // }
  },
  
  attributedStringValue: function() {
    // if (this._value.typeOf(NSAttributedString)) {
      // return this._value;
    // }
		
		var attributes = NSDictionary.create();
		
		// font
		if (this.font)
			attributes.setObjectForKey(this.font, NSFontAttributeName);
		
		// textColor
		if (this.isEnabled) {
			if (this.textColor)
				attributes.setObjectForKey(this.textColor, NSForegroundColorAttributeName);
			else
			  attributes.setObjectForKey(NSColor.controlTextColor(), NSForegroundColorAttributeName);
		}
		else {
			attributes.setObjectForKey(NSColor.disabledControlTextColor(), NSForegroundColorAttributeName);
		}
		
		// paragraph style
    var paragraphStyle = NSParagraphStyle.defaultParagraphStyle();
    paragraphStyle.setAlignment(this.alignment);
    paragraphStyle.setLineBreakMode(this.lineBreakMode);
    
    attributes.setObjectForKey(paragraphStyle, NSParagraphStyleAttributeName);
		
		return NSAttributedString.create('initWithStringAndAttributes', this.value, attributes);
	},
	
  
  setDrawsBackground: function(flag) {
    this._drawsBackground = flag;
  },
  
  setBackgroundColor: function(aColor) {
    this._backgroundColor = aColor;
  },
  
  setBezeled: function(flag) {
    this._isBezeled = flag;
  },
  
  
  setBezelStyle: function(style) {
    this._bezelStyle = style;
  },
  
 
  
  setTextColor: function(aColor) {
    this._textColor = aColor;
  },
  
  
  titleRectForBounds: function(theRect) {
    if (this.isEditable) {
      return NSMakeRect(2, 3, theRect.size.width - 4, theRect.size.height - 5);
    }
    
    return theRect;
  }
});
/* 
 * search_field_cell.js
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


var NSSearchFieldCell = VN.SearchFieldCell = VN.TextFieldCell.extend({
  
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    this.searchButtonCell = aCoder.decodeObjectForKey('NSSearchButtonCell');
    this.cancelButtonCell = aCoder.decodeObjectForKey('NSCancelButtonCell');
    return this;
  },
  
  titleRectForBounds: function(theRect) {
    if (this.isEditable) {
      return NSMakeRect(18, 3, theRect.size.width - 36, theRect.size.height - 5);
    }
    
    return theRect;
  },
  
  /**
    @type VN.ButtonCell
  */
  searchButtonCell: null,
  
  /**
    @type VN.ButtonCell
  */
  cancelButtonCell: null,
  
  /**
    @param {VN.Rect} rect
    @returns VN.Rect
  */
  searchTextRectForBounds: function(rect) {
    return rect;
  },
  
  /**
    @param {VN.Rect} rect
    @returns VN.Rect
  */
  searchButtonRectForBounds: function(rect) {
    return rect;
  },
  
  /**
    @param {VN.Rect} rect
    @returns VN.Rect
  */
  cancelButtonRectForBounds: function(rect) {
    return rect;
  }
});
var NSSegmentedCell = VN.SegmentedCell = VN.Cell.extend({
  
});

var NSSegmentItem = VN.SegmentItem = VN.Object.extend({
  
});
/* 
 * segmented_control.js
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


VN.SEGMENT_STYLE_AUTOMATIC = 0;
VN.SEGMENT_STYLE_ROUNDED = 1;
VN.SEGMENT_STYLE_TEXTURED_ROUNDED = 2;
VN.SEGMENT_STYLE_ROUND_RECT = 3;
VN.SEGMENT_STYLE_TEXTURED_SQUARE = 4;
VN.SEGMENT_STYLE_CAPSULE = 5;
VN.SEGMENT_STYLE_SMALL_SQUARE = 6;

var NSSegmentedControl = VN.SegmentedControl = VN.Control.extend({
  
  /**
    @type Integer
  */
  segmentCount: null,
  
  /**
    @type Integer
  */
  selectedSegment: null,
  
  /**
    @type VN.Array
  */
  segmentWidths: null,
  
  /**
    @param {Float} width
    @param {Integer} segment
  */
  setWidthForSegment: function(width, segment) {
    
  },
  
  /**
    @param {Integer} segment
    @returns Float
  */
  widthForSegment: function(segment) {
    
  },
  
  /**
    @type VN.Array
  */
  segmentImages: null,
  
  
});/* 
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


/**
  @class VN.SliderCell
  @extends VN.Cell
*/
var NSSliderCell = VN.SliderCell = VN.Cell.extend({

  /**
    Padding of the track from the bounds. The track should not go all the
    way to the bounds so that the knob slighty overlaps it when the knob
    is positioned at the min or max values.
  */
  TRACK_PADDING: 2.0,
  
  /**
    Padding of the slider knob. This is basically half the width of the 
    slider. This allows for a more accurate positoning value for the
    slider knob
  */
  KNOB_PADDING: 9.5,
  
  /**
    Same as the knob padding, but for a 'mini' slider control. The track
    padding remains the same for both control sizes
  */
  KNOB_PADDING_MINI: 6.5,
   
  /**
    @param {VN.Coder} aCoder
    @returns VN.SliderCell
  */
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    this._minValue = aCoder.decodeDoubleForKey("NSMinValue");
    this._maxValue = aCoder.decodeDoubleForKey("NSMaxValue");
    this._value = aCoder.decodeDoubleForKey("NSValue");
    return this;
  },
  
  /**
    @param {NSRect} cellFrame
    @param {NSView} controlView
    @param {NSRenderContext} renderContext
    @param {Boolean} firstTime
  */
  renderWithFrameInView: function(cellFrame, controlView, renderContext, firstTime)  {
    if (firstTime) {
      renderContext.setClass('vn-slider');
      renderContext.push('div', 'vn-slider-track-left');
      renderContext.push('div', 'vn-slider-track');
      renderContext.push('div', 'vn-slider-track-right');
      renderContext.push('div', 'vn-slider-knob');
    }
    else {
      // set knob position
      var knobPosition = Math.round(((this._value / (this._maxValue - this._minValue)) * ((cellFrame.size.width - (2 * this.KNOB_PADDING)))));
      renderContext.$('vn-slider-knob').set(knobPosition + 'px', 'left');

      // enabled/disabled
      if (this._isEnabled)
        renderContext.removeClass('disabled');
      else
        renderContext.addClass('disabled');
    }
  },
  
  /**
    @returns Boolean
  */
  prefersTrackingUntilMouseUp: function() {
    return true;
  },
  
  /**
    @type Double
  */
  _minValue: null,
  
  /**
    @returns Double
  */
  minValue: function() {
    return this._minValue;
  },
  
  /**
    @param {Double} aDouble
  */
  setMinValue: function(aDouble) {
    this._minValue = aDouble;
  },
  
  /**
    @type Double
  */
  _maxValue: null,
  
  /**
    @returns Double
  */
  maxValue: function() {
    return this._maxValue;
  },
  
  /**
    @param {Double} aDouble
  */
  setMaxValue: function(aDouble) {
    this._maxValue = aDouble;
  },
  
  /**
    @param {Double} aDouble
  */
  setDoubleValue: function(aDouble) {
    this._value = Math.max(Math.min(aDouble, this._maxValue), this._minValue);
  },
  
  /**
    @param {Float} aFloat
  */
  setFloatValue: function(aFloat) {
    this._value = Math.max(Math.min(aFloat, this._maxValue), this._minValue);
  },
  
  /**
    @param {Integer} anInt
  */
  setIntValue: function(anInt) {
    this._value = Math.max(Math.min(anInt, this._maxValue), this._minValue);
  },

  /**
    @param {VN.Point} startPoint
    @param {VN.View} controlView
    @returns Boolean
  */
  startTrackingInView: function(startPoint, controlView) {
    if (this.isEnabled()) {
      var location = controlView.convertPointFromView(startPoint, null);
      this.setDoubleValue(((location.x - this.KNOB_PADDING) / (controlView.bounds().size.width - (2 * this.KNOB_PADDING))) * (this._maxValue - this._minValue));
      
      if (controlView._kvb_info.containsKey(VN.VALUE_BINDING)) {
        var bindingInfo = controlView._kvb_info.valueForKey(VN.VALUE_BINDING);
        bindingInfo.valueForKey(VN.OBSERVED_OBJECT_KEY).setValueForKeyPath(this._value, bindingInfo.valueForKey(VN.OBSERVED_KEY_PATH_KEY));
      }
      
      return true;
    }
    return false;
  },

  /**
    @param {VN.Point} lastPoint
    @param {VN.Point} currentPoint
    @param {VN.View} controlView
    @returns Boolean 
  */
  continueTrackingInView: function(lastPoint, currentPoint, controlView) {
    var location = controlView.convertPointFromView(currentPoint, null);
    this.setDoubleValue(((location.x - this.KNOB_PADDING) / (controlView.bounds().size.width - (2 * this.KNOB_PADDING))) * (this._maxValue - this._minValue));
    
    if (controlView._kvb_info.containsKey(VN.VALUE_BINDING)) {
      var bindingInfo = controlView._kvb_info.valueForKey(VN.VALUE_BINDING);
      bindingInfo.valueForKey(VN.OBSERVED_OBJECT_KEY).setValueForKeyPath(this._value, bindingInfo.valueForKey(VN.OBSERVED_KEY_PATH_KEY));
    }
    return true;
  },

  /**
     @param flag - If the mouseIsUp
  */
  stopTracking: function(lastPoint, stopPoint, flag) {

  },
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


/**
  VN.TickMarkPosition
*/
VN.TICK_MARK_BELOW  = 0;
VN.TICK_MARK_ABOVE  = 1;
VN.TICK_MARK_LEFT   = 1;
VN.TICK_MARK_RIGHT  = 0;


/**
  @enum VN.SliderType A regular slider (vertical or horizontal)
*/
VN.LINEAR_SLIDER = 0;

/**
  @enum VN.SliderType A circular slider that the user can move around.
*/
VN.CIRCULAR_SLIDER = 1;


/**
  @class VN.Slider
  @extends VN.Control
*/
var NSSlider = VN.Slider = VN.Control.extend({
    
  /**
    @param {VN.Coder} aCoder
    @returns VN.Slider
  */
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    this._minValue = this._cell._minValue;
    this._maxValue = this._cell._maxValue;
    this._value = this._cell._value;
    return this;
  },
  
  /**
    Instantiate a binding to the object. Placeholders and other information
    can be specified in the options dictionary.
    
    @param {VN.String} binding
    @param {VN.Object} toObject
    @param {VN.String} withKeyPath
    @param {VN.Dictionary} options
  */
  bind: function(binding, toObject, withKeyPath, options) {
    // value binding - VN.VALUE_BINDING
    if (binding == "value") {
      toObject.addObserverForKeyPath(this, withKeyPath, 0, VN.VALUE_BINDING);
      
      var bindingInfo = VN.Dictionary.dictionaryWithObjectsForKeys(
        [toObject, withKeyPath, options],
        [VN.OBSERVED_OBJECT_KEY, VN.OBSERVED_KEY_PATH_KEY, VN.OPTIONS_KEY]);
      
      this._kvb_info.setObjectForKey(bindingInfo, VN.VALUE_BINDING);
    }
  },
  
  /**
		@param {NSString} keyPath
		@param {NSObject} ofObject
		@param {NSDictionary} change
		@param {Object} context
	*/
  observeValueForKeyPath: function(keyPath, ofObject, change, context) {
    if (context == VN.VALUE_BINDING) {
      var newValue = ofObject.valueForKeyPath(keyPath);
      this.setDoubleValue(newValue);
    }
  },

  /**
    @returns Boolean
  */
  prefersTrackingUntilMouseUp: function() {
    return this._cell.prefersTrackingUntilMouseUp();
  },
  
  /**
    @returns Double
  */
  minValue: function() {
    return this._cell.minValue();
  },
  
  /**
    @param {Double} aDouble
  */
  setMinValue: function(aDouble) {
    this._cell.setMinValue(aDouble);
  },
  
  /**
    @returns Double
  */
  maxValue: function() {
    return this._cell.maxValue();
  },
  
  /**
    @param {Double} aDouble
  */
  setMaxValue: function(aDouble) {
    this._cell.setMaxValue(aDouble);
  }
});
/* 
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
var NSStringDrawingTruncatesLastVisibleLine     = (1 << 5);
var NSStringDrawingUsesLineFragmentOrigin       = (1 << 0);
var NSStringDrawingUsesFontLeading          = (1 << 1);
var NSStringDrawingDisableScreenFontSubstitution  = (1 << 2);
var NSStringDrawingUsesDeviceMetrics        = (1 << 3);
var NSStringDrawingOneShot              = (1 << 4);

// Used for measuring text in render mode
var NSAttributedStringMeasureElement = null;

VN.extend(String.prototype, {
  
  sizeWithAttributes: function(attrs) {
    
  },
  
  drawAtPoint: function(aPoint, attrs) {
    
  },
  
  drawInRect: function(aRect, attrs) {
    
  }
});

NSAttributedString.mixin({
  
  size: function() {
    if (!NSAttributedStringMeasureElement) {
      NSAttributedStringMeasureElement = document.createElement('span');
      NSAttributedStringMeasureElement.style.left = '-10000px';
      NSAttributedStringMeasureElement.style.top = '-10000px';
      NSAttributedStringMeasureElement.style.position = 'absolute';
      NSAttributedStringMeasureElement.style.display = 'block';
      document.body.appendChild(NSAttributedStringMeasureElement);
    }
    
    var theFont = this._attributes.objectForKey(NSFontAttributeName);
    NSAttributedStringMeasureElement.style.font = theFont.renderingRepresentation();
    
    return NSMakeSize(NSAttributedStringMeasureElement.clientWidth, NSAttributedStringMeasureElement.clientHeight);
    
    
    return NSMakeSize(0, 0);
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

VN.extend(String.prototype, {
  
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
var NSTableColumnNoResizing     = 0;
var NSTableColumnAutoresizingMask   = ( 1 << 0 );
var NSTableColumnUserResizingMask   = ( 1 << 1 );

var NSTableColumn = VN.TableColumn = VN.Object.extend({

  /**
    Every column maintains its own renderContext for rendering each cell in
    that table column. The data cell is used with the renderContext, so that
    the element for the context is set between cell draws.
    
    @type VN.RenderContext
  */
  renderContext: null,
  
  
  _value: null,
  
  /**
    @param {VN.Coder} aCoder
    @returns VN.TableColumn
  */
  initWithCoder: function(aCoder) {
    // this._super(aCoder);
    // render context
    this.renderContext = VN.RenderContext.create();
    
    this._identifier = aCoder.decodeObjectForKey("NSIdentifier");
    this._headerCell = aCoder.decodeObjectForKey("NSHeaderCell");
    this._dataCell = aCoder.decodeObjectForKey("NSDataCell");
    this._width = aCoder.decodeIntForKey("NSWidth");
    this._minWidth = aCoder.decodeIntForKey("NSMinWidth");
    this._maxWidth = aCoder.decodeIntForKey("NSMaxWidth");
    this._tableView = aCoder.decodeObjectForKey("NSTableView");
    
    return this;
  },
  
  /*
    Instantiate a binding to the object. Placeholders and other information
    can be specified in the options dictionary.
    
    @param binding - NSString
    @param toObject - NSObject
    @param withKeyPath - NSString
    @param options - NSDictionary
  */
  bind: function(binding, toObject, withKeyPath, options) {
    if (binding == "value") {
      toObject.addObserverForKeyPath(this, withKeyPath, 0, NSValueBinding);
      
      var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
        [toObject, withKeyPath, options],
        [NSObservedObjectKey, NSObservedKeyPathKey, NSOptionsKey]);

      this._kvb_info.setObjectForKey(bindingInfo, NSValueBinding);
    }
  },

  /*
    @param {NSString} keyPath
 		@param {NSObject} ofObject
 		@param {NSDictionary} change
 		@param {Object} context
 	*/
  observeValueForKeyPath: function(keyPath, ofObject, change, context) {
    if (context == NSValueBinding) {
      var newValue = ofObject.valueForKeyPath(keyPath);
      // this.setObjectValue(newValue);
      console.log('table column, new value = ');
      console.log(newValue);
     }
  },
  
  /**
    @type VN.TableView
  */
  _tableView: null,
  
  /**
    @param {VN.TableView} aTableView
  */
  setTableView: function(aTableView) {
    this._tableView = aTableView;
  },
  
  /**
    @returns VN.TableView
  */
  tableView: function() {
    return this._tableView;
  },

  /**
    @type VN.String
  */
  _identifier: null,
  
  /**
    @param {VN.String} identifier
  */
  setIdentifier: function(identifier) {
    this._identifier = identifier;
  },
  
  /**
    @returns VN.String
  */
  identifier: function() {
    return this._identifier;
  },
  
  /**
    @type Float
  */
  _width: null,
  
  setWidth: function(width) {
    this._width = width;
  },
  
  width: function() {
    return this._width;
  },
  
  /**
    @type Float
  */
  _minWidth: null,
  
  setMinWidth: function(minWidth) {
    this._minWidth = minWidth;
  },
  
  minWidth: function() {
    return this._minWidth;
  },
  
  /**
    @type Float
  */
  _maxWidth: null,
  
  setMaxWidth: function(maxWidth) {
    this._maxWidth = maxWidth;
  },
  
  maxWidth: function() {
    return this._maxWidth;
  },
  
  /**
    @type VN.Cell
  */
  _headerCell: null,
  
  setHeaderCell: function(cell) {
    this._headerCell = cell;
  },
  
  headerCell: function() {
    return this._headerCell;
  },
  
  /**
    @type VN.Cell
  */
  _dataCell: null,
  
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


var NSTableHeaderCell = NSCell.extend({
  
  initWithCoder: function(aCoder) {
    this._super(aCoder);
    return this;
    // this._value = aCoder.decodeObjectForKey("NSContents");
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
  
  renderClassName: 'vn-table-view-header',
  
  
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
    // var c = NSGraphicsContext.currentContext().graphicsPort();
    // var tableColumns = this._tableView.tableColumns();
    // var columnRect = this.bounds(), spacing = this._tableView._intercellSpacing;
    // 
    // for (var idx = 0; idx < tableColumns.length; idx++) {
    //   var theColumn = tableColumns[idx];
    //   columnRect.size.width = theColumn.width() + spacing.width;
    //   theColumn.headerCell.drawWithFrame(columnRect, this);
    //   columnRect.origin.x = theColumn.width() + spacing.width;
    // }
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
  
  NSTextView    - presents view
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
var NSTextView = VN.TextView = VN.View.extend({
  
  _string: null,
  
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
    
    // this._textStorage = NSTextStorage.create();
    // this._textContainer = NSTextContainer.create('initWithContainerSize', frameRect.size);
    // var theLayoutManager = NSLayoutManager.create();
    
    // this._textStorage.addLayoutManager(theLayoutManager);
    // theLayoutManager.addTextContainer(this._textContainer);
    
    // this._textContainer.setTextView(this);
    
    this._textContainerInset = NSMakeSize(0, 0);
    
    this._isEditable = true;
    this._isSelectable = true;
    this._isRichText = true;
    
    this._backgroundColor = NSColor.whiteColor();
    this._drawsBackground = true;
    
    this._textColor = NSColor.textColor();
    this._font = NSFont.userFontOfSize(10);
    this._textAlignment = VN.LEFT_TEXT_ALIGNMENT;
    this._insertionPointColor = NSColor.blackColor();
    
    this._isFieldEditor = false;
    this._maxSize = this.bounds().size;
    this._isHorizontallyResizable = false;
    this._isVerticallyResizable = true;
    this._selectedRange = NSMakeRange(0, 0);
    
    return this;
  },
  
  setupGraphicsContextDisplay: function() {
    this._DOMContainer = document.createElement('input');
    this._DOMGraphicsContext = document.createElement('div');
    
    this._DOMContainer.style.display = "block";
    this._DOMContainer.style.position = "absolute";
    this._DOMContainer.style.overflowX = "hidden";
    this._DOMContainer.style.overflowY = "hidden";
    
    this._DOMContainer.onkeypress = function(event) {
      event._allowBrowserControl = true;
    };
    
    this._DOMContainer.onmousedown = function(event) {
      event._allowBrowserControl = true;
    };
    
    this._DOMContainer.onmousemove = function(event) {
      event._allowBrowserControl = true;
    };
    
    this._DOMContainer.onmouseup = function(event) {
      event._allowBrowserControl = true;
    };
    
    this._renderContext = NSRenderContext.renderContextWithElement(this._DOMContainer);
  },
  
  renderRect: function(aRect, firstTime, context) {
    if (firstTime) {
      context.setClass('vn-text-view');
    }
    
    this._DOMContainer.value = this._string;
  },
  
  mouseDown: function(theEvent) {
    console.log('mouse down in text view');
    this._DOMContainer.focus();
  },
  
  acceptsFirstResponder: function() {
    return true;
  },
  
  keyDown: function(theEvent) {
    this.interpretKeyEvents([theEvent]);
  },
  
  insertText: function(theCharacters) {
    console.log(theCharacters);
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
    this._string = aString;
    // console.log('setting string to ' + aString);
    // this.replaceCharactersInRange(NSMakeRange(0, this._textStorage.length()), aString);
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
 * view_controller.js
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
  @class VN.ViewController
  @extends VN.Responder
*/
var NSViewController = VN.ViewController = VN.Responder.extend({
  
  /**
    The top level objects created from the Nib file.
    @type VN.Array
  */
  _topLevelObjects: null,
  
  /**
    @param {VN.String} nibName
    @returns VN.ViewController
  */
  initWithNibName: function(nibName) {
    this._nibName = nibName;
    return this;
  },
  
  /**
    @type VN.Object
  */
  _representedObject: null,
  
  /**
    @param {VN.Object} representedObject
  */
  setRepresentedObject: function(representedObject) {
    this._representedObject = representedObject;
  },
  
  /**
    @returns VN.Object
  */
  represnetedObject: function() {
    return this._representedObject;
  },
  
  /**
    @type VN.String
  */
  _title: null,
  
  /**
    @param {VN.String} title
  */
  setTitle: function(title) {
    this._title = title;
  },
  
  /**
    @returns VN.String
  */
  title: function() {
    return this._title;
  },
  
  /**
    @outlet
    @type VN.View
  */
  _view: null,
  
  /**
    @param {VN.View} view
  */
  setView: function(view) {
    this._view = view;
  },
  
  /**
    @returns VN.View
  */
  view: function() {
    return this._view;
  },
  
  /**
    Loads the view using VN.Nib class
  */
  loadView: function() {
    NSBundle.loadNibNamed(this._nibName, this);
  },
  
  /**
    @type VN.String
  */
  _nibName: null,
  
  /**
    @returns VN.String
  */
  nibName: function() {
    return this._nibName;
  } 
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
    theWindow.makeKeyAndOrderFront(this);
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
   
  /**
    @type Integer
  */
  _testValue: 10,
   
  /**
    @outlet
    @type NSWindow
  */
  _window: null,
   
   /**
    @outlet
    @type NSArrayController
   */
   _arrayController: null,
   
  /**
    @outlet
    @type NSArray
  */
  _tableContent: null,
  
  _tempData: null,
  
  _tableSelections: null,
   
  init: function() {
    this._super();
     
    this._tempData = [
      { "name": "Adam", "age": 23, "band": "Led Zepplin" },
      { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
      { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" },
      { "name": "Adam", "age": 23, "band": "Led Zepplin" },
      { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
      { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" },
      { "name": "Adam", "age": 23, "band": "Led Zepplin" },
      { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
      { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" },
      { "name": "Adam", "age": 23, "band": "Led Zepplin" },
      { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
      { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" },
      { "name": "Adam", "age": 23, "band": "Led Zepplin" },
      { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
      { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" },
      { "name": "Adam", "age": 23, "band": "Led Zepplin" },
      { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
      { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" },
      { "name": "Adam", "age": 23, "band": "Led Zepplin" },
      { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
      { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" },
      { "name": "Adam", "age": 23, "band": "Led Zepplin" },
      { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
      { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" }
    ];
     
     console.log('creating app controller');
     return this;
   },
   
   setTestValue: function(aValue) {
     this._testValue = aValue;
   },
   
   doSomething: function(sender) {
     
   },
   
   awakeFromNib: function(sender) {
     console.log("Awoken from nib");
   },
   
   applicationWillFinishLaunching: function() {
     this._window.performZoom(this);
   },
   
   applicationDidFinishLaunching: function() {
     console.log("Application finished lauchiong");
   },

	/**
		Table view delegate
	*/
	numberOfRowsInTableView: function(tableView) {
		return this._tempData.length;
	},
	
	tableViewObjectValueForTableColumnRow: function(tableView, tableColumn, row) {
	  return this._tempData[row][tableColumn.identifier()];
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


JSApp = VN.Object.create({
  
  // store: VN.Store.create({
  //   
  //   categories: { as: 'places', requirements: { permalink: 'places' }},
  //   galleries: { as: 'gallery' },    
  //   
  //   login: { controller: 'admin', action: 'new' },
  //   logout: { controller: 'admin', action: 'destroy' },
  //   admin: { controller: 'admin', action: 'index' },
  // })
});
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
  VN.App.run(function(app) {
    var win = VN.Window.create({ title: 'Hey thwre!', frame: [100, 100, 300, 300] }, function(win) {
      win.push(VN.Button.create({ title: 'Click me!', style: 'rounded', layout: { align: 'center' } }));
    });
    
    // app.push(win); window adds itself to app
    app.set('delegate', JSApp);
  });
  
  // options.store('frame', [0, 0, 120, 120]);
  // if (options.hasKey('frame'))
  //   console.log(options.fetch('frame'))
  
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
__bootstrap_files["MainMenu.json"] = {"archive":{"data":{"IBDocument.SystemTarget": 1050,"IBDocument.SystemVersion": "10A411","IBDocument.InterfaceBuilderVersion": "731","IBDocument.AppKitVersion": "1033","IBDocument.HIToolboxVersion": "435.00","IBDocument.PluginVersions": {"class": "NSMutableDictionary","id": "", "objects":{"NS.key.0": "com.apple.InterfaceBuilder.CocoaPlugin","NS.object.0": "731"}},"IBDocument.EditedObjectIDs": {"class": "NSMutableArray","id": "", "objects":[368]},"IBDocument.PluginDependencies": {"class": "NSArray","id": "", "objects":["com.apple.InterfaceBuilder.CocoaPlugin"]},"IBDocument.Metadata": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"class": "NSArray","id": "0", "objects":[]},"dict.values": {"class": "NSMutableArray","id": "", "objects":[]}}},"IBDocument.RootObjects": {"class": "NSMutableArray","id": "1048", "objects":[{"class": "NSCustomObject","id": "1021", "objects":{"NSClassName": "NSApplication"}},{"class": "NSCustomObject","id": "1014", "objects":{"NSClassName": "FirstResponder"}},{"class": "NSCustomObject","id": "1050", "objects":{"NSClassName": "NSApplication"}},{"class": "NSCustomObject","id": "163992474", "objects":{"NSClassName": "NSFontManager"}},{"class": "NSWindowTemplate","id": "513744381", "objects":{"NSWindowStyleMask": 15,"NSWindowBacking": 2,"NSWindowRect": "{{133, 47}, {946, 613}}","NSWTFlags": 603979776,"NSWindowTitle": "Window","NSWindowClass": "NSWindow","NSViewClass": {"nil":""},"NSWindowContentMaxSize": "{1.79769e+308, 1.79769e+308}","NSWindowView": {"class": "NSView","id": "414427165", "objects":{"NSNextResponder": {"id":""},"NSvFlags": 256,"NSSubviews": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSButton","id": "807627904", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{554, 422}, {118, 25}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "281914322", "objects":{"NSCellFlags": -2080244224,"NSCellFlags2": 134217728,"NSContents": "Round Textured","NSSupport": {"class": "NSFont","id": "798430573", "objects":{"NSName": "LucidaGrande","NSSize": 13,"NSfFlags": 1044}},"NSControlView": {"id":"807627904"},"NSButtonFlags": -2038152961,"NSButtonFlags2": 163,"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 400,"NSPeriodicInterval": 75}}}},{"class": "NSButton","id": "947043007", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{554, 391}, {118, 25}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "775301662", "objects":{"NSCellFlags": -1543373312,"NSCellFlags2": 134217728,"NSContents": "This is disabled","NSSupport": {"id":"798430573"},"NSControlView": {"id":"947043007"},"NSButtonFlags": -2038152961,"NSButtonFlags2": 163,"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 400,"NSPeriodicInterval": 75}}}},{"class": "NSSlider","id": "481053202", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{552, 455}, {122, 21}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSSliderCell","id": "228939928", "objects":{"NSCellFlags": -1543373312,"NSCellFlags2": 0,"NSContents": "","NSSupport": {"class": "NSFont","id": "672854075", "objects":{"NSName": "Helvetica","NSSize": 12,"NSfFlags": 16}},"NSControlView": {"id":"481053202"},"NSMaxValue": 100,"NSMinValue": 0.0,"NSValue": 50,"NSAltIncValue": 0.0,"NSNumberOfTickMarks": 0,"NSTickMarkPosition": 1,"NSAllowsTickMarkValuesOnly": false,"NSVertical": false}}}},{"class": "NSSlider","id": "257328319", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{552, 478}, {122, 21}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSSliderCell","id": "829387278", "objects":{"NSCellFlags": -2079981824,"NSCellFlags2": 0,"NSContents": "","NSSupport": {"id":"672854075"},"NSControlView": {"id":"257328319"},"NSMaxValue": 100,"NSMinValue": 0.0,"NSValue": 50,"NSAltIncValue": 0.0,"NSNumberOfTickMarks": 0,"NSTickMarkPosition": 1,"NSAllowsTickMarkValuesOnly": false,"NSVertical": false}}}},{"class": "NSButton","id": "780169108", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{62, 488}, {109, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "146314554", "objects":{"NSCellFlags": 67239424,"NSCellFlags2": 0,"NSContents": "Normal radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"780169108"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"class": "NSCustomResource","id": "904276281", "objects":{"NSClassName": "NSImage","NSResourceName": "NSRadioButton"}},"NSAlternateImage": {"class": "NSButtonImageSource","id": "813970489", "objects":{"NSImageName": "NSRadioButton"}},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "511023663", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{62, 433}, {156, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "388353698", "objects":{"NSCellFlags": -1543373312,"NSCellFlags2": 0,"NSContents": "Disabled Check radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"511023663"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"id":"904276281"},"NSAlternateImage": {"id":"813970489"},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "142462336", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{62, 462}, {177, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "100568012", "objects":{"NSCellFlags": -2080244224,"NSCellFlags2": 0,"NSContents": "Normal unchecked radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"142462336"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"id":"904276281"},"NSAlternateImage": {"id":"813970489"},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "577562334", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{285, 488}, {109, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "671756545", "objects":{"NSCellFlags": -2080244224,"NSCellFlags2": 0,"NSContents": "Normal radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"577562334"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"class": "NSCustomResource","id": "1020590486", "objects":{"NSClassName": "NSImage","NSResourceName": "NSSwitch"}},"NSAlternateImage": {"class": "NSButtonImageSource","id": "849298367", "objects":{"NSImageName": "NSSwitch"}},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "790695465", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{285, 433}, {156, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "561385561", "objects":{"NSCellFlags": -1543373312,"NSCellFlags2": 0,"NSContents": "Disabled Check radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"790695465"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"id":"1020590486"},"NSAlternateImage": {"id":"849298367"},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "561516135", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 268,"NSFrame": "{{285, 462}, {177, 18}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "79065924", "objects":{"NSCellFlags": 67239424,"NSCellFlags2": 0,"NSContents": "Normal unchecked radio","NSSupport": {"id":"798430573"},"NSControlView": {"id":"561516135"},"NSButtonFlags": 1211912703,"NSButtonFlags2": 130,"NSNormalImage": {"id":"1020590486"},"NSAlternateImage": {"id":"849298367"},"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 200,"NSPeriodicInterval": 25}}}},{"class": "NSButton","id": "479961390", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 292,"NSFrame": "{{29, 57}, {73, 25}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "1059063770", "objects":{"NSCellFlags": -2080244224,"NSCellFlags2": 134217728,"NSContents": "Add","NSSupport": {"id":"798430573"},"NSControlView": {"id":"479961390"},"NSButtonFlags": -2038152961,"NSButtonFlags2": 163,"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 400,"NSPeriodicInterval": 75}}}},{"class": "NSButton","id": "780600689", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 292,"NSFrame": "{{110, 57}, {80, 25}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSButtonCell","id": "577933790", "objects":{"NSCellFlags": -2080244224,"NSCellFlags2": 134217728,"NSContents": "Remove","NSSupport": {"id":"798430573"},"NSControlView": {"id":"780600689"},"NSButtonFlags": -2038152961,"NSButtonFlags2": 163,"NSAlternateContents": "","NSKeyEquivalent": "","NSPeriodicDelay": 400,"NSPeriodicInterval": 75}}}},{"class": "NSTextField","id": "331488204", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 265,"NSFrame": "{{728, 475}, {96, 22}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSTextFieldCell","id": "24273261", "objects":{"NSCellFlags": -1804468671,"NSCellFlags2": 272630784,"NSContents": "Hey there","NSSupport": {"id":"798430573"},"NSControlView": {"id":"331488204"},"NSDrawsBackground": true,"NSBackgroundColor": {"class": "NSColor","id": "", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "textBackgroundColor","NSColor": {"class": "NSColor","id": "5431023", "objects":{"NSColorSpace": 3,"NSWhite": "MQA"}}}},"NSTextColor": {"class": "NSColor","id": "", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "textColor","NSColor": {"class": "NSColor","id": "106532192", "objects":{"NSColorSpace": 3,"NSWhite": "MAA"}}}}}}}},{"class": "NSScrollView","id": "235183413", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 274,"NSSubviews": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSClipView","id": "71816236", "objects":{"NSNextResponder": {"id":"235183413"},"NSvFlags": 2304,"NSSubviews": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSTableView","id": "872300910", "objects":{"NSNextResponder": {"id":"71816236"},"NSvFlags": 256,"NSFrameSize": "{786, 242}","NSSuperview": {"id":"71816236"},"NSEnabled": true,"NSHeaderView": {"class": "NSTableHeaderView","id": "865045174", "objects":{"NSNextResponder": {"id":"659597974"},"NSvFlags": 256,"NSFrameSize": "{786, 17}","NSSuperview": {"id":"659597974"},"NSTableView": {"id":"872300910"}}},"NSCornerView": {"class": "_NSCornerView","id": "763852672", "objects":{"NSNextResponder": {"id":"235183413"},"NSvFlags": -2147483392,"NSFrame": "{{224, 0}, {16, 17}}","NSSuperview": {"id":"235183413"}}},"NSTableColumns": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSTableColumn","id": "1001633043", "objects":{"NSIdentifier": "name","NSWidth": 101,"NSMinWidth": 40,"NSMaxWidth": 1000,"NSHeaderCell": {"class": "NSTableHeaderCell","id": "", "objects":{"NSCellFlags": 75628096,"NSCellFlags2": 2048,"NSContents": "Name","NSSupport": {"class": "NSFont","id": "26", "objects":{"NSName": "LucidaGrande","NSSize": 11,"NSfFlags": 3100}},"NSBackgroundColor": {"class": "NSColor","id": "1023251827", "objects":{"NSColorSpace": 3,"NSWhite": "MC4zMzMzMzI5ODU2AA"}},"NSTextColor": {"class": "NSColor","id": "384823602", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "headerTextColor","NSColor": {"id":"106532192"}}}}},"NSDataCell": {"class": "NSTextFieldCell","id": "187550853", "objects":{"NSCellFlags": 337772096,"NSCellFlags2": 2048,"NSContents": "Text Cell","NSSupport": {"id":"798430573"},"NSControlView": {"id":"872300910"},"NSBackgroundColor": {"class": "NSColor","id": "955461975", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "controlBackgroundColor","NSColor": {"class": "NSColor","id": "415934132", "objects":{"NSColorSpace": 3,"NSWhite": "MC42NjY2NjY2NjY3AA"}}}},"NSTextColor": {"class": "NSColor","id": "163054175", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "controlTextColor","NSColor": {"id":"106532192"}}}}},"NSResizingMask": 3,"NSIsResizeable": true,"NSIsEditable": true,"NSTableView": {"id":"872300910"}}},{"class": "NSTableColumn","id": "728296547", "objects":{"NSIdentifier": "age","NSWidth": 100,"NSMinWidth": 40,"NSMaxWidth": 1000,"NSHeaderCell": {"class": "NSTableHeaderCell","id": "", "objects":{"NSCellFlags": 75628096,"NSCellFlags2": 2048,"NSContents": "Age","NSSupport": {"id":"26"},"NSBackgroundColor": {"id":"1023251827"},"NSTextColor": {"id":"384823602"}}},"NSDataCell": {"class": "NSTextFieldCell","id": "1061270957", "objects":{"NSCellFlags": 337772096,"NSCellFlags2": 2048,"NSContents": "Text Cell","NSSupport": {"id":"798430573"},"NSControlView": {"id":"872300910"},"NSBackgroundColor": {"id":"955461975"},"NSTextColor": {"id":"163054175"}}},"NSResizingMask": 3,"NSIsResizeable": true,"NSIsEditable": true,"NSTableView": {"id":"872300910"}}},{"class": "NSTableColumn","id": "678915572", "objects":{"NSIdentifier": "band","NSWidth": 560,"NSMinWidth": 10,"NSMaxWidth": 3.4028234663852886e+38,"NSHeaderCell": {"class": "NSTableHeaderCell","id": "", "objects":{"NSCellFlags": 75628096,"NSCellFlags2": 2048,"NSContents": "Favouriate Band","NSSupport": {"id":"26"},"NSBackgroundColor": {"class": "NSColor","id": "", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "headerColor","NSColor": {"id":"5431023"}}},"NSTextColor": {"id":"384823602"}}},"NSDataCell": {"class": "NSTextFieldCell","id": "349884370", "objects":{"NSCellFlags": 337772096,"NSCellFlags2": 2048,"NSContents": "Text Cell","NSSupport": {"id":"798430573"},"NSControlView": {"id":"872300910"},"NSBackgroundColor": {"id":"955461975"},"NSTextColor": {"id":"163054175"}}},"NSResizingMask": 3,"NSIsResizeable": true,"NSIsEditable": true,"NSTableView": {"id":"872300910"}}}]},"NSIntercellSpacingWidth": 3,"NSIntercellSpacingHeight": 2,"NSBackgroundColor": {"id":"5431023"},"NSGridColor": {"class": "NSColor","id": "", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "gridColor","NSColor": {"class": "NSColor","id": "", "objects":{"NSColorSpace": 3,"NSWhite": "MC41AA"}}}},"NSRowHeight": 17,"NSTvFlags": -700448768,"NSDelegate": {"id":""},"NSDataSource": {"id":""},"NSColumnAutoresizingStyle": 4,"NSDraggingSourceMaskForLocal": 15,"NSDraggingSourceMaskForNonLocal": 0,"NSAllowsTypeSelect": true,"NSTableViewDraggingDestinationStyle": 0}}]},"NSFrame": "{{1, 17}, {786, 242}}","NSSuperview": {"id":"235183413"},"NSNextKeyView": {"id":"872300910"},"NSDocView": {"id":"872300910"},"NSBGColor": {"id":"955461975"},"NScvFlags": 4}},{"class": "NSScroller","id": "1070394976", "objects":{"NSNextResponder": {"id":"235183413"},"NSvFlags": -2147483392,"NSFrame": "{{224, 17}, {15, 102}}","NSSuperview": {"id":"235183413"},"NSTarget": {"id":"235183413"},"NSAction": "_doScroller:","NSPercent": 0.93801652892561982}},{"class": "NSScroller","id": "22466635", "objects":{"NSNextResponder": {"id":"235183413"},"NSvFlags": -2147483392,"NSFrame": "{{1, 72}, {135, 15}}","NSSuperview": {"id":"235183413"},"NSEnabled": true,"NSsFlags": 1,"NSTarget": {"id":"235183413"},"NSAction": "_doScroller:","NSPercent": 0.99872935196950441}},{"class": "NSClipView","id": "659597974", "objects":{"NSNextResponder": {"id":"235183413"},"NSvFlags": 2304,"NSSubviews": {"class": "NSMutableArray","id": "", "objects":[{"id":"865045174"}]},"NSFrame": "{{1, 0}, {786, 17}}","NSSuperview": {"id":"235183413"},"NSNextKeyView": {"id":"865045174"},"NSDocView": {"id":"865045174"},"NSBGColor": {"id":"955461975"},"NScvFlags": 4}},{"id":"763852672"}]},"NSFrame": "{{64, 105}, {788, 260}}","NSSuperview": {"id":"414427165"},"NSNextKeyView": {"id":"71816236"},"NSsFlags": 690,"NSVScroller": {"id":"1070394976"},"NSHScroller": {"id":"22466635"},"NSContentView": {"id":"71816236"},"NSHeaderClipView": {"id":"659597974"},"NSCornerView": {"id":"763852672"},"NSScrollAmts": "QSAAAEEgAABBmAAAQZgAAA"}},{"class": "NSTextField","id": "132414463", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 265,"NSFrame": "{{725, 441}, {38, 17}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSTextFieldCell","id": "321119217", "objects":{"NSCellFlags": 68288064,"NSCellFlags2": 272630784,"NSContents": "Label","NSSupport": {"id":"798430573"},"NSControlView": {"id":"132414463"},"NSDrawsBackground": true,"NSBackgroundColor": {"class": "NSColor","id": "223854096", "objects":{"NSColorSpace": 6,"NSCatalogName": "System","NSColorName": "controlColor","NSColor": {"id":"415934132"}}},"NSTextColor": {"id":"163054175"}}}}},{"class": "NSTextField","id": "403455936", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 289,"NSFrame": "{{239, 64}, {174, 17}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSTextFieldCell","id": "14706080", "objects":{"NSCellFlags": 68288064,"NSCellFlags2": 272630784,"NSContents": "Label","NSSupport": {"id":"798430573"},"NSControlView": {"id":"403455936"},"NSBackgroundColor": {"id":"223854096"},"NSTextColor": {"id":"163054175"}}}}},{"class": "NSTextField","id": "423348810", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 289,"NSFrame": "{{440, 64}, {174, 17}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSTextFieldCell","id": "556176014", "objects":{"NSCellFlags": 68288064,"NSCellFlags2": 272630784,"NSContents": "Label","NSSupport": {"id":"798430573"},"NSControlView": {"id":"423348810"},"NSBackgroundColor": {"id":"223854096"},"NSTextColor": {"id":"163054175"}}}}},{"class": "NSTextField","id": "344089922", "objects":{"NSNextResponder": {"id":"414427165"},"NSvFlags": 289,"NSFrame": "{{662, 61}, {174, 17}}","NSSuperview": {"id":"414427165"},"NSEnabled": true,"NSCell": {"class": "NSTextFieldCell","id": "681369576", "objects":{"NSCellFlags": 68288064,"NSCellFlags2": 272630784,"NSContents": "Label","NSSupport": {"id":"798430573"},"NSControlView": {"id":"344089922"},"NSBackgroundColor": {"id":"223854096"},"NSTextColor": {"id":"163054175"}}}}}]},"NSFrameSize": "{946, 613}","NSSuperview": {"id":""}}},"NSScreenRect": "{{0, 0}, {1920, 1178}}","NSMaxSize": "{1.79769e+308, 1.79769e+308}"}},{"class": "NSMenu","id": "396145598", "objects":{"NSTitle": "Main Menu","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "502041852", "objects":{"NSMenu": {"id":"396145598"},"NSTitle": "JSApp","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"class": "NSCustomResource","id": "277861762", "objects":{"NSClassName": "NSImage","NSResourceName": "NSMenuCheckmark"}},"NSMixedImage": {"class": "NSCustomResource","id": "420132161", "objects":{"NSClassName": "NSImage","NSResourceName": "NSMenuMixedState"}},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "929908017", "objects":{"NSTitle": "JSApp","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "719413741", "objects":{"NSMenu": {"id":"929908017"},"NSTitle": "About JSApp","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "147013270", "objects":{"NSMenu": {"id":"929908017"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "544446554", "objects":{"NSMenu": {"id":"929908017"},"NSTitle": "Preferences…","NSKeyEquiv": ",","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "455124416", "objects":{"NSMenu": {"id":"929908017"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "493734341", "objects":{"NSMenu": {"id":"929908017"},"NSTitle": "Services","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "218525171", "objects":{"NSTitle": "Services","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[]},"NSName": "_NSServicesMenu"}}}},{"class": "NSMenuItem","id": "646933026", "objects":{"NSMenu": {"id":"929908017"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "843796999", "objects":{"NSMenu": {"id":"929908017"},"NSTitle": "Hide JSApp","NSKeyEquiv": "h","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "61754815", "objects":{"NSMenu": {"id":"929908017"},"NSTitle": "Hide Others","NSKeyEquiv": "h","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "727120825", "objects":{"NSMenu": {"id":"929908017"},"NSTitle": "Show All","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "428803447", "objects":{"NSMenu": {"id":"929908017"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "491412195", "objects":{"NSMenu": {"id":"929908017"},"NSTitle": "Quit JSApp","NSKeyEquiv": "q","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]},"NSName": "_NSAppleMenu"}}}},{"class": "NSMenuItem","id": "475354134", "objects":{"NSMenu": {"id":"396145598"},"NSTitle": "File","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "140258427", "objects":{"NSTitle": "File","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "684393965", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "New","NSKeyEquiv": "n","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "118789126", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Open…","NSKeyEquiv": "o","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "711009244", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Open Recent","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "85259455", "objects":{"NSTitle": "Open Recent","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "620121511", "objects":{"NSMenu": {"id":"85259455"},"NSTitle": "Clear Menu","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]},"NSName": "_NSRecentDocumentsMenu"}}}},{"class": "NSMenuItem","id": "875068603", "objects":{"NSMenu": {"id":"140258427"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "313874609", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Close","NSKeyEquiv": "w","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "594142260", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Save","NSKeyEquiv": "s","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "323858156", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Save As…","NSKeyEquiv": "S","NSKeyEquivModMask": 1179648,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "402382860", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Revert to Saved","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "481018735", "objects":{"NSMenu": {"id":"140258427"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "499319061", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Page Setup...","NSKeyEquiv": "P","NSKeyEquivModMask": 1179648,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSToolTip": ""}},{"class": "NSMenuItem","id": "494801925", "objects":{"NSMenu": {"id":"140258427"},"NSTitle": "Print…","NSKeyEquiv": "p","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "693213887", "objects":{"NSMenu": {"id":"396145598"},"NSTitle": "Edit","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "26323967", "objects":{"NSTitle": "Edit","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "1062491368", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Undo","NSKeyEquiv": "z","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "766653658", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Redo","NSKeyEquiv": "Z","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "894470039", "objects":{"NSMenu": {"id":"26323967"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "882289911", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Cut","NSKeyEquiv": "x","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "108407587", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Copy","NSKeyEquiv": "c","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "987153865", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Paste","NSKeyEquiv": "v","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "238136692", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Paste and Match Style","NSKeyEquiv": "V","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "567593746", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Delete","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "212764814", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Select All","NSKeyEquiv": "a","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "419879483", "objects":{"NSMenu": {"id":"26323967"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "573155596", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Find","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "50713213", "objects":{"NSTitle": "Find","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "547150631", "objects":{"NSMenu": {"id":"50713213"},"NSTitle": "Find…","NSKeyEquiv": "f","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 1}},{"class": "NSMenuItem","id": "710177711", "objects":{"NSMenu": {"id":"50713213"},"NSTitle": "Find Next","NSKeyEquiv": "g","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 2}},{"class": "NSMenuItem","id": "840494879", "objects":{"NSMenu": {"id":"50713213"},"NSTitle": "Find Previous","NSKeyEquiv": "G","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 3}},{"class": "NSMenuItem","id": "748324225", "objects":{"NSMenu": {"id":"50713213"},"NSTitle": "Use Selection for Find","NSKeyEquiv": "e","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 7}},{"class": "NSMenuItem","id": "1017125445", "objects":{"NSMenu": {"id":"50713213"},"NSTitle": "Jump to Selection","NSKeyEquiv": "j","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "32515025", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Spelling and Grammar","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "499920755", "objects":{"NSTitle": "Spelling","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "882984624", "objects":{"NSMenu": {"id":"499920755"},"NSTitle": "Show Spelling and Grammar","NSKeyEquiv": ":","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "664256261", "objects":{"NSMenu": {"id":"499920755"},"NSTitle": "Check Document Now","NSKeyEquiv": ";","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "277876898", "objects":{"NSMenu": {"id":"499920755"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "707578430", "objects":{"NSMenu": {"id":"499920755"},"NSTitle": "Check Spelling While Typing","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "428750252", "objects":{"NSMenu": {"id":"499920755"},"NSTitle": "Check Grammar With Spelling","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "363312713", "objects":{"NSMenu": {"id":"499920755"},"NSTitle": "Correct Spelling Automatically","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "925479430", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Substitutions","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "36288778", "objects":{"NSTitle": "Substitutions","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "882086962", "objects":{"NSMenu": {"id":"36288778"},"NSTitle": "Show Substitutions","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "491421895", "objects":{"NSMenu": {"id":"36288778"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "189206921", "objects":{"NSMenu": {"id":"36288778"},"NSTitle": "Smart Copy/Paste","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "1030351354", "objects":{"NSMenu": {"id":"36288778"},"NSTitle": "Smart Quotes","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "491645350", "objects":{"NSMenu": {"id":"36288778"},"NSTitle": "Smart Dashes","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "218154558", "objects":{"NSMenu": {"id":"36288778"},"NSTitle": "Smart Links","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "1062365657", "objects":{"NSMenu": {"id":"36288778"},"NSTitle": "Data Detectors","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "354238611", "objects":{"NSMenu": {"id":"36288778"},"NSTitle": "Text Replacement","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "1073520368", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Transformations","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "182677269", "objects":{"NSTitle": "Transformations","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "228222622", "objects":{"NSMenu": {"id":"182677269"},"NSTitle": "Make Upper Case","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "1064576491", "objects":{"NSMenu": {"id":"182677269"},"NSTitle": "Make Lower Case","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "221720946", "objects":{"NSMenu": {"id":"182677269"},"NSTitle": "Capitalize","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "1044796185", "objects":{"NSMenu": {"id":"26323967"},"NSTitle": "Speech","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "196866971", "objects":{"NSTitle": "Speech","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "558426415", "objects":{"NSMenu": {"id":"196866971"},"NSTitle": "Start Speaking","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "434484761", "objects":{"NSMenu": {"id":"196866971"},"NSTitle": "Stop Speaking","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}}]}}}}},{"class": "NSMenuItem","id": "857536504", "objects":{"NSMenu": {"id":"396145598"},"NSTitle": "Format","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "228002546", "objects":{"NSTitle": "Format","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "609792061", "objects":{"NSMenu": {"id":"228002546"},"NSTitle": "Font","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "565148168", "objects":{"NSTitle": "Font","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "643620124", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Show Fonts","NSKeyEquiv": "t","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "61046026", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Bold","NSKeyEquiv": "b","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 2}},{"class": "NSMenuItem","id": "233505564", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Italic","NSKeyEquiv": "i","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 1}},{"class": "NSMenuItem","id": "162604386", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Underline","NSKeyEquiv": "u","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "161800526", "objects":{"NSMenu": {"id":"565148168"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "14981393", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Bigger","NSKeyEquiv": "+","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 3}},{"class": "NSMenuItem","id": "516934468", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Smaller","NSKeyEquiv": "-","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSTag": 4}},{"class": "NSMenuItem","id": "391747350", "objects":{"NSMenu": {"id":"565148168"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "361602393", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Kern","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "129191325", "objects":{"NSTitle": "Kern","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "61462663", "objects":{"NSMenu": {"id":"129191325"},"NSTitle": "Use Default","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "957493733", "objects":{"NSMenu": {"id":"129191325"},"NSTitle": "Use None","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "936113629", "objects":{"NSMenu": {"id":"129191325"},"NSTitle": "Tighten","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "635885426", "objects":{"NSMenu": {"id":"129191325"},"NSTitle": "Loosen","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "25523273", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Ligature","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "835348817", "objects":{"NSTitle": "Ligature","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "180250789", "objects":{"NSMenu": {"id":"835348817"},"NSTitle": "Use Default","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "568143876", "objects":{"NSMenu": {"id":"835348817"},"NSTitle": "Use None","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "573379050", "objects":{"NSMenu": {"id":"835348817"},"NSTitle": "Use All","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "818558147", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Baseline","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "183858689", "objects":{"NSTitle": "Baseline","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "644154219", "objects":{"NSMenu": {"id":"183858689"},"NSTitle": "Use Default","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "614557663", "objects":{"NSMenu": {"id":"183858689"},"NSTitle": "Superscript","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "774392049", "objects":{"NSMenu": {"id":"183858689"},"NSTitle": "Subscript","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "892001032", "objects":{"NSMenu": {"id":"183858689"},"NSTitle": "Raise","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "1068179975", "objects":{"NSMenu": {"id":"183858689"},"NSTitle": "Lower","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "890899662", "objects":{"NSMenu": {"id":"565148168"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "644140682", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Show Colors","NSKeyEquiv": "C","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "671545876", "objects":{"NSMenu": {"id":"565148168"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "397166321", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Copy Style","NSKeyEquiv": "c","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "215340233", "objects":{"NSMenu": {"id":"565148168"},"NSTitle": "Paste Style","NSKeyEquiv": "v","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]},"NSName": "_NSFontMenu"}}}},{"class": "NSMenuItem","id": "43690407", "objects":{"NSMenu": {"id":"228002546"},"NSTitle": "Text","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "975825102", "objects":{"NSTitle": "Text","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "792316364", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Align Left","NSKeyEquiv": "{","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "596561657", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Center","NSKeyEquiv": "|","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "872570229", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Justify","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "766796088", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Align Right","NSKeyEquiv": "}","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "851747333", "objects":{"NSMenu": {"id":"975825102"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "981059996", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Writing Direction","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "906599697", "objects":{"NSTitle": "Writing Direction","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "1041729520", "objects":{"NSMenu": {"id":"906599697"},"NSIsDisabled": true,"NSTitle": "Paragraph","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "137407739", "objects":{"NSMenu": {"id":"906599697"},"NSTitle": "CURlZmF1bHQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "408911759", "objects":{"NSMenu": {"id":"906599697"},"NSTitle": "CUxlZnQgdG8gUmlnaHQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "398110396", "objects":{"NSMenu": {"id":"906599697"},"NSTitle": "CVJpZ2h0IHRvIExlZnQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "175409192", "objects":{"NSMenu": {"id":"906599697"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "76364711", "objects":{"NSMenu": {"id":"906599697"},"NSIsDisabled": true,"NSTitle": "Selection","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "235507009", "objects":{"NSMenu": {"id":"906599697"},"NSTitle": "CURlZmF1bHQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "988306009", "objects":{"NSMenu": {"id":"906599697"},"NSTitle": "CUxlZnQgdG8gUmlnaHQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "160428799", "objects":{"NSMenu": {"id":"906599697"},"NSTitle": "CVJpZ2h0IHRvIExlZnQ","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "658247071", "objects":{"NSMenu": {"id":"975825102"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "1055412392", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Show Ruler","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "122656406", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Copy Ruler","NSKeyEquiv": "c","NSKeyEquivModMask": 1310720,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "180202457", "objects":{"NSMenu": {"id":"975825102"},"NSTitle": "Paste Ruler","NSKeyEquiv": "v","NSKeyEquivModMask": 1310720,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}}]}}}}},{"class": "NSMenuItem","id": "713206015", "objects":{"NSMenu": {"id":"396145598"},"NSTitle": "View","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "96939199", "objects":{"NSTitle": "View","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "206668947", "objects":{"NSMenu": {"id":"96939199"},"NSTitle": "Show Toolbar","NSKeyEquiv": "t","NSKeyEquivModMask": 1572864,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "825897010", "objects":{"NSMenu": {"id":"96939199"},"NSTitle": "Customize Toolbar…","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]}}}}},{"class": "NSMenuItem","id": "686270510", "objects":{"NSMenu": {"id":"396145598"},"NSTitle": "Window","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "909684463", "objects":{"NSTitle": "Window","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "497312719", "objects":{"NSMenu": {"id":"909684463"},"NSTitle": "Minimize","NSKeyEquiv": "m","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "857636876", "objects":{"NSMenu": {"id":"909684463"},"NSTitle": "Zoom","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "353476913", "objects":{"NSMenu": {"id":"909684463"},"NSIsDisabled": true,"NSIsSeparator": true,"NSTitle": "","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}},{"class": "NSMenuItem","id": "8672285", "objects":{"NSMenu": {"id":"909684463"},"NSTitle": "Bring All to Front","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]},"NSName": "_NSWindowsMenu"}}}},{"class": "NSMenuItem","id": "125320586", "objects":{"NSMenu": {"id":"396145598"},"NSTitle": "Help","NSKeyEquiv": "","NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"},"NSAction": "submenuAction:","NSSubmenu": {"class": "NSMenu","id": "370522354", "objects":{"NSTitle": "Help","NSMenuItems": {"class": "NSMutableArray","id": "", "objects":[{"class": "NSMenuItem","id": "972987324", "objects":{"NSMenu": {"id":"370522354"},"NSTitle": "JSApp Help","NSKeyEquiv": "?","NSKeyEquivModMask": 1048576,"NSMnemonicLoc": 2147483647,"NSOnImage": {"id":"277861762"},"NSMixedImage": {"id":"420132161"}}}]},"NSName": "_NSHelpMenu"}}}}]},"NSName": "_NSMainMenu"}},{"class": "NSCustomObject","id": "864649339", "objects":{"NSClassName": "AppController"}},{"class": "NSArrayController","id": "618999728", "objects":{"NSDeclaredKeys": {"class": "NSMutableArray","id": "", "objects":["name","age","band"]},"NSEditable": true,"_NSManagedProxy": {"class": "_NSManagedProxy","id": "", "objects":{}},"NSAvoidsEmptySelection": true,"NSPreservesSelection": true,"NSSelectsInsertedObjects": true,"NSFilterRestrictsInsertion": true,"NSClearsFilterPredicateOnInsertion": true}}]},"IBDocument.Objects": {"class": "IBObjectContainer","id": "", "objects":{"connectionRecords": {"class": "NSMutableArray","id": "", "objects":[{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBOutletConnection","id": "", "objects":{"label": "delegate","source": {"id":"1050"},"destination": {"id":"864649339"}}},"connectionID": 691}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBOutletConnection","id": "", "objects":{"label": "_window","source": {"id":"864649339"},"destination": {"id":"513744381"}}},"connectionID": 715}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBBindingConnection","id": "", "objects":{"label": "value: testValue","source": {"id":"257328319"},"destination": {"id":"864649339"},"connector": {"class": "NSNibBindingConnector","id": "", "objects":{"NSSource": {"id":"257328319"},"NSDestination": {"id":"864649339"},"NSLabel": "value: testValue","NSBinding": "value","NSKeyPath": "testValue","NSNibBindingConnectorVersion": 2}}}},"connectionID": 736}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "performClose:","source": {"id":"513744381"},"destination": {"id":"807627904"}}},"connectionID": 760}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBOutletConnection","id": "", "objects":{"label": "dataSource","source": {"id":"872300910"},"destination": {"id":"864649339"}}},"connectionID": 784}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBBindingConnection","id": "", "objects":{"label": "value: testValue","source": {"id":"331488204"},"destination": {"id":"864649339"},"connector": {"class": "NSNibBindingConnector","id": "", "objects":{"NSSource": {"id":"331488204"},"NSDestination": {"id":"864649339"},"NSLabel": "value: testValue","NSBinding": "value","NSKeyPath": "testValue","NSNibBindingConnectorVersion": 2}}}},"connectionID": 790}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBOutletConnection","id": "", "objects":{"label": "_arrayController","source": {"id":"864649339"},"destination": {"id":"618999728"}}},"connectionID": 792}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBBindingConnection","id": "", "objects":{"label": "content: arrangedObjects","source": {"id":"872300910"},"destination": {"id":"618999728"},"connector": {"class": "NSNibBindingConnector","id": "202995972", "objects":{"NSSource": {"id":"872300910"},"NSDestination": {"id":"618999728"},"NSLabel": "content: arrangedObjects","NSBinding": "content","NSKeyPath": "arrangedObjects","NSNibBindingConnectorVersion": 2}}}},"connectionID": 793}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBActionConnection","id": "", "objects":{"label": "add:","source": {"id":"618999728"},"destination": {"id":"479961390"}}},"connectionID": 797}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBBindingConnection","id": "", "objects":{"label": "enabled: canAdd","source": {"id":"479961390"},"destination": {"id":"618999728"},"connector": {"class": "NSNibBindingConnector","id": "", "objects":{"NSSource": {"id":"479961390"},"NSDestination": {"id":"618999728"},"NSLabel": "enabled: canAdd","NSBinding": "enabled","NSKeyPath": "canAdd","NSNibBindingConnectorVersion": 2}}}},"connectionID": 799}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBBindingConnection","id": "", "objects":{"label": "enabled: canRemove","source": {"id":"780600689"},"destination": {"id":"618999728"},"connector": {"class": "NSNibBindingConnector","id": "", "objects":{"NSSource": {"id":"780600689"},"NSDestination": {"id":"618999728"},"NSLabel": "enabled: canRemove","NSBinding": "enabled","NSKeyPath": "canRemove","NSNibBindingConnectorVersion": 2}}}},"connectionID": 801}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBBindingConnection","id": "", "objects":{"label": "contentArray: tempData","source": {"id":"618999728"},"destination": {"id":"864649339"},"connector": {"class": "NSNibBindingConnector","id": "", "objects":{"NSSource": {"id":"618999728"},"NSDestination": {"id":"864649339"},"NSLabel": "contentArray: tempData","NSBinding": "contentArray","NSKeyPath": "tempData","NSNibBindingConnectorVersion": 2}}}},"connectionID": 803}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBBindingConnection","id": "", "objects":{"label": "selectionIndexes: selectionIndexes","source": {"id":"872300910"},"destination": {"id":"618999728"},"connector": {"class": "NSNibBindingConnector","id": "", "objects":{"NSSource": {"id":"872300910"},"NSDestination": {"id":"618999728"},"NSLabel": "selectionIndexes: selectionIndexes","NSBinding": "selectionIndexes","NSKeyPath": "selectionIndexes","NSPreviousConnector": {"id":"202995972"},"NSNibBindingConnectorVersion": 2}}}},"connectionID": 805}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBBindingConnection","id": "", "objects":{"label": "value: selection.name","source": {"id":"403455936"},"destination": {"id":"618999728"},"connector": {"class": "NSNibBindingConnector","id": "", "objects":{"NSSource": {"id":"403455936"},"NSDestination": {"id":"618999728"},"NSLabel": "value: selection.name","NSBinding": "value","NSKeyPath": "selection.name","NSNibBindingConnectorVersion": 2}}}},"connectionID": 813}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBBindingConnection","id": "", "objects":{"label": "value: selection.age","source": {"id":"423348810"},"destination": {"id":"618999728"},"connector": {"class": "NSNibBindingConnector","id": "", "objects":{"NSSource": {"id":"423348810"},"NSDestination": {"id":"618999728"},"NSLabel": "value: selection.age","NSBinding": "value","NSKeyPath": "selection.age","NSNibBindingConnectorVersion": 2}}}},"connectionID": 815}},{"class": "IBConnectionRecord","id": "", "objects":{"connection": {"class": "IBBindingConnection","id": "", "objects":{"label": "value: selection.band","source": {"id":"344089922"},"destination": {"id":"618999728"},"connector": {"class": "NSNibBindingConnector","id": "", "objects":{"NSSource": {"id":"344089922"},"NSDestination": {"id":"618999728"},"NSLabel": "value: selection.band","NSBinding": "value","NSKeyPath": "selection.band","NSNibBindingConnectorVersion": 2}}}},"connectionID": 817}}]},"objectRecords": {"class": "IBMutableOrderedSet","id": "", "objects":{"orderedObjects": {"class": "NSArray","id": "", "objects":[{"class": "IBObjectRecord","id": "", "objects":{"objectID": 0,"object": {"id":"0"},"children": {"id":"1048"},"parent": {"nil":""}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": -2,"object": {"id":"1021"},"parent": {"id":"0"},"objectName": "File's Owner"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": -1,"object": {"id":"1014"},"parent": {"id":"0"},"objectName": "First Responder"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": -3,"object": {"id":"1050"},"parent": {"id":"0"},"objectName": "Application"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 367,"object": {"id":"513744381"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"414427165"}]},"parent": {"id":"0"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 368,"object": {"id":"414427165"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"511023663"},{"id":"142462336"},{"id":"780169108"},{"id":"807627904"},{"id":"947043007"},{"id":"481053202"},{"id":"257328319"},{"id":"577562334"},{"id":"561516135"},{"id":"790695465"},{"id":"780600689"},{"id":"479961390"},{"id":"331488204"},{"id":"132414463"},{"id":"235183413"},{"id":"403455936"},{"id":"423348810"},{"id":"344089922"}]},"parent": {"id":"513744381"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 373,"object": {"id":"163992474"},"parent": {"id":"0"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 451,"object": {"id":"807627904"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"281914322"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 452,"object": {"id":"281914322"},"parent": {"id":"807627904"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 453,"object": {"id":"947043007"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"775301662"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 454,"object": {"id":"775301662"},"parent": {"id":"947043007"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 455,"object": {"id":"481053202"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"228939928"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 456,"object": {"id":"228939928"},"parent": {"id":"481053202"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 457,"object": {"id":"257328319"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"829387278"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 458,"object": {"id":"829387278"},"parent": {"id":"257328319"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 463,"object": {"id":"780169108"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"146314554"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 464,"object": {"id":"146314554"},"parent": {"id":"780169108"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 467,"object": {"id":"511023663"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"388353698"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 468,"object": {"id":"388353698"},"parent": {"id":"511023663"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 471,"object": {"id":"142462336"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"100568012"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 472,"object": {"id":"100568012"},"parent": {"id":"142462336"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 473,"object": {"id":"577562334"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"671756545"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 474,"object": {"id":"790695465"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"561385561"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 476,"object": {"id":"561516135"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"79065924"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 477,"object": {"id":"79065924"},"parent": {"id":"561516135"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 479,"object": {"id":"561385561"},"parent": {"id":"790695465"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 480,"object": {"id":"671756545"},"parent": {"id":"577562334"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 541,"object": {"id":"396145598"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"693213887"},{"id":"857536504"},{"id":"713206015"},{"id":"475354134"},{"id":"125320586"},{"id":"502041852"},{"id":"686270510"}]},"parent": {"id":"0"},"objectName": "Main Menu"}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 542,"object": {"id":"693213887"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"26323967"}]},"parent": {"id":"396145598"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 543,"object": {"id":"857536504"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"228002546"}]},"parent": {"id":"396145598"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 544,"object": {"id":"713206015"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"96939199"}]},"parent": {"id":"396145598"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 545,"object": {"id":"475354134"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"140258427"}]},"parent": {"id":"396145598"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 546,"object": {"id":"125320586"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"370522354"}]},"parent": {"id":"396145598"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 547,"object": {"id":"502041852"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"929908017"}]},"parent": {"id":"396145598"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 548,"object": {"id":"686270510"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"909684463"}]},"parent": {"id":"396145598"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 549,"object": {"id":"909684463"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"497312719"},{"id":"857636876"},{"id":"8672285"},{"id":"353476913"}]},"parent": {"id":"686270510"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 550,"object": {"id":"497312719"},"parent": {"id":"909684463"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 551,"object": {"id":"857636876"},"parent": {"id":"909684463"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 552,"object": {"id":"8672285"},"parent": {"id":"909684463"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 553,"object": {"id":"353476913"},"parent": {"id":"909684463"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 554,"object": {"id":"929908017"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"61754815"},{"id":"428803447"},{"id":"493734341"},{"id":"147013270"},{"id":"455124416"},{"id":"544446554"},{"id":"646933026"},{"id":"491412195"},{"id":"727120825"},{"id":"843796999"},{"id":"719413741"}]},"parent": {"id":"502041852"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 555,"object": {"id":"61754815"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 556,"object": {"id":"428803447"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 557,"object": {"id":"493734341"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"218525171"}]},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 558,"object": {"id":"147013270"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 559,"object": {"id":"455124416"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 560,"object": {"id":"544446554"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 561,"object": {"id":"646933026"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 562,"object": {"id":"491412195"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 563,"object": {"id":"727120825"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 564,"object": {"id":"843796999"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 565,"object": {"id":"719413741"},"parent": {"id":"929908017"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 566,"object": {"id":"218525171"},"parent": {"id":"493734341"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 567,"object": {"id":"370522354"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"972987324"}]},"parent": {"id":"125320586"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 568,"object": {"id":"972987324"},"parent": {"id":"370522354"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 569,"object": {"id":"140258427"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"481018735"},{"id":"402382860"},{"id":"875068603"},{"id":"313874609"},{"id":"499319061"},{"id":"711009244"},{"id":"684393965"},{"id":"118789126"},{"id":"494801925"},{"id":"323858156"},{"id":"594142260"}]},"parent": {"id":"475354134"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 570,"object": {"id":"481018735"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 571,"object": {"id":"402382860"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 572,"object": {"id":"875068603"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 573,"object": {"id":"313874609"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 574,"object": {"id":"499319061"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 575,"object": {"id":"711009244"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"85259455"}]},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 576,"object": {"id":"684393965"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 577,"object": {"id":"118789126"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 578,"object": {"id":"494801925"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 579,"object": {"id":"323858156"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 580,"object": {"id":"594142260"},"parent": {"id":"140258427"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 581,"object": {"id":"85259455"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"620121511"}]},"parent": {"id":"711009244"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 582,"object": {"id":"620121511"},"parent": {"id":"85259455"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 583,"object": {"id":"96939199"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"825897010"},{"id":"206668947"}]},"parent": {"id":"713206015"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 584,"object": {"id":"825897010"},"parent": {"id":"96939199"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 585,"object": {"id":"206668947"},"parent": {"id":"96939199"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 586,"object": {"id":"228002546"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"43690407"},{"id":"609792061"}]},"parent": {"id":"857536504"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 587,"object": {"id":"43690407"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"975825102"}]},"parent": {"id":"228002546"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 588,"object": {"id":"609792061"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"565148168"}]},"parent": {"id":"228002546"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 589,"object": {"id":"565148168"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"215340233"},{"id":"397166321"},{"id":"671545876"},{"id":"644140682"},{"id":"890899662"},{"id":"818558147"},{"id":"25523273"},{"id":"361602393"},{"id":"391747350"},{"id":"516934468"},{"id":"14981393"},{"id":"161800526"},{"id":"162604386"},{"id":"233505564"},{"id":"61046026"},{"id":"643620124"}]},"parent": {"id":"609792061"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 590,"object": {"id":"215340233"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 591,"object": {"id":"397166321"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 592,"object": {"id":"671545876"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 593,"object": {"id":"644140682"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 594,"object": {"id":"890899662"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 595,"object": {"id":"818558147"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"183858689"}]},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 596,"object": {"id":"25523273"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"835348817"}]},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 597,"object": {"id":"361602393"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"129191325"}]},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 598,"object": {"id":"391747350"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 599,"object": {"id":"516934468"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 600,"object": {"id":"14981393"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 601,"object": {"id":"161800526"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 602,"object": {"id":"162604386"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 603,"object": {"id":"233505564"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 604,"object": {"id":"61046026"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 605,"object": {"id":"643620124"},"parent": {"id":"565148168"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 606,"object": {"id":"129191325"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"635885426"},{"id":"936113629"},{"id":"957493733"},{"id":"61462663"}]},"parent": {"id":"361602393"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 607,"object": {"id":"635885426"},"parent": {"id":"129191325"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 608,"object": {"id":"936113629"},"parent": {"id":"129191325"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 609,"object": {"id":"957493733"},"parent": {"id":"129191325"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 610,"object": {"id":"61462663"},"parent": {"id":"129191325"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 611,"object": {"id":"835348817"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"573379050"},{"id":"568143876"},{"id":"180250789"}]},"parent": {"id":"25523273"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 612,"object": {"id":"573379050"},"parent": {"id":"835348817"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 613,"object": {"id":"568143876"},"parent": {"id":"835348817"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 614,"object": {"id":"180250789"},"parent": {"id":"835348817"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 615,"object": {"id":"183858689"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"1068179975"},{"id":"892001032"},{"id":"774392049"},{"id":"614557663"},{"id":"644154219"}]},"parent": {"id":"818558147"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 616,"object": {"id":"1068179975"},"parent": {"id":"183858689"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 617,"object": {"id":"892001032"},"parent": {"id":"183858689"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 618,"object": {"id":"774392049"},"parent": {"id":"183858689"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 619,"object": {"id":"614557663"},"parent": {"id":"183858689"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 620,"object": {"id":"644154219"},"parent": {"id":"183858689"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 621,"object": {"id":"975825102"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"981059996"},{"id":"658247071"},{"id":"180202457"},{"id":"122656406"},{"id":"1055412392"},{"id":"851747333"},{"id":"766796088"},{"id":"872570229"},{"id":"596561657"},{"id":"792316364"}]},"parent": {"id":"43690407"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 622,"object": {"id":"981059996"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"906599697"}]},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 623,"object": {"id":"658247071"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 624,"object": {"id":"180202457"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 625,"object": {"id":"122656406"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 626,"object": {"id":"1055412392"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 627,"object": {"id":"851747333"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 628,"object": {"id":"766796088"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 629,"object": {"id":"872570229"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 630,"object": {"id":"596561657"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 631,"object": {"id":"792316364"},"parent": {"id":"975825102"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 632,"object": {"id":"906599697"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"160428799"},{"id":"988306009"},{"id":"235507009"},{"id":"175409192"},{"id":"76364711"},{"id":"398110396"},{"id":"408911759"},{"id":"137407739"},{"id":"1041729520"}]},"parent": {"id":"981059996"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 633,"object": {"id":"160428799"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 634,"object": {"id":"988306009"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 635,"object": {"id":"235507009"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 636,"object": {"id":"175409192"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 637,"object": {"id":"76364711"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 638,"object": {"id":"398110396"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 639,"object": {"id":"408911759"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 640,"object": {"id":"137407739"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 641,"object": {"id":"1041729520"},"parent": {"id":"906599697"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 642,"object": {"id":"26323967"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"1044796185"},{"id":"1073520368"},{"id":"925479430"},{"id":"32515025"},{"id":"573155596"},{"id":"419879483"},{"id":"212764814"},{"id":"567593746"},{"id":"238136692"},{"id":"987153865"},{"id":"108407587"},{"id":"882289911"},{"id":"894470039"},{"id":"766653658"},{"id":"1062491368"}]},"parent": {"id":"693213887"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 643,"object": {"id":"1044796185"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"196866971"}]},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 644,"object": {"id":"1073520368"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"182677269"}]},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 645,"object": {"id":"925479430"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"36288778"}]},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 646,"object": {"id":"32515025"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"499920755"}]},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 647,"object": {"id":"573155596"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"50713213"}]},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 648,"object": {"id":"419879483"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 649,"object": {"id":"212764814"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 650,"object": {"id":"567593746"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 651,"object": {"id":"238136692"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 652,"object": {"id":"987153865"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 653,"object": {"id":"108407587"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 654,"object": {"id":"882289911"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 655,"object": {"id":"894470039"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 656,"object": {"id":"766653658"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 657,"object": {"id":"1062491368"},"parent": {"id":"26323967"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 658,"object": {"id":"50713213"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"1017125445"},{"id":"748324225"},{"id":"840494879"},{"id":"710177711"},{"id":"547150631"}]},"parent": {"id":"573155596"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 659,"object": {"id":"1017125445"},"parent": {"id":"50713213"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 660,"object": {"id":"748324225"},"parent": {"id":"50713213"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 661,"object": {"id":"840494879"},"parent": {"id":"50713213"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 662,"object": {"id":"710177711"},"parent": {"id":"50713213"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 663,"object": {"id":"547150631"},"parent": {"id":"50713213"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 664,"object": {"id":"499920755"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"363312713"},{"id":"428750252"},{"id":"707578430"},{"id":"277876898"},{"id":"664256261"},{"id":"882984624"}]},"parent": {"id":"32515025"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 665,"object": {"id":"363312713"},"parent": {"id":"499920755"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 666,"object": {"id":"428750252"},"parent": {"id":"499920755"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 667,"object": {"id":"707578430"},"parent": {"id":"499920755"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 668,"object": {"id":"277876898"},"parent": {"id":"499920755"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 669,"object": {"id":"664256261"},"parent": {"id":"499920755"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 670,"object": {"id":"882984624"},"parent": {"id":"499920755"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 671,"object": {"id":"36288778"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"354238611"},{"id":"1062365657"},{"id":"218154558"},{"id":"491645350"},{"id":"1030351354"},{"id":"189206921"},{"id":"491421895"},{"id":"882086962"}]},"parent": {"id":"925479430"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 672,"object": {"id":"354238611"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 673,"object": {"id":"1062365657"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 674,"object": {"id":"218154558"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 675,"object": {"id":"491645350"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 676,"object": {"id":"1030351354"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 677,"object": {"id":"189206921"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 678,"object": {"id":"491421895"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 679,"object": {"id":"882086962"},"parent": {"id":"36288778"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 680,"object": {"id":"182677269"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"221720946"},{"id":"1064576491"},{"id":"228222622"}]},"parent": {"id":"1073520368"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 681,"object": {"id":"221720946"},"parent": {"id":"182677269"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 682,"object": {"id":"1064576491"},"parent": {"id":"182677269"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 683,"object": {"id":"228222622"},"parent": {"id":"182677269"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 684,"object": {"id":"196866971"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"434484761"},{"id":"558426415"}]},"parent": {"id":"1044796185"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 685,"object": {"id":"434484761"},"parent": {"id":"196866971"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 686,"object": {"id":"558426415"},"parent": {"id":"196866971"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 690,"object": {"id":"864649339"},"parent": {"id":"0"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 716,"object": {"id":"479961390"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"1059063770"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 717,"object": {"id":"1059063770"},"parent": {"id":"479961390"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 718,"object": {"id":"780600689"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"577933790"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 719,"object": {"id":"577933790"},"parent": {"id":"780600689"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 771,"object": {"id":"331488204"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"24273261"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 772,"object": {"id":"24273261"},"parent": {"id":"331488204"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 775,"object": {"id":"235183413"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"1070394976"},{"id":"22466635"},{"id":"872300910"},{"id":"865045174"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 776,"object": {"id":"1070394976"},"parent": {"id":"235183413"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 777,"object": {"id":"22466635"},"parent": {"id":"235183413"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 778,"object": {"id":"872300910"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"1001633043"},{"id":"728296547"},{"id":"678915572"}]},"parent": {"id":"235183413"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 779,"object": {"id":"865045174"},"parent": {"id":"235183413"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 780,"object": {"id":"1001633043"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"187550853"}]},"parent": {"id":"872300910"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 781,"object": {"id":"728296547"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"1061270957"}]},"parent": {"id":"872300910"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 782,"object": {"id":"1061270957"},"parent": {"id":"728296547"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 783,"object": {"id":"187550853"},"parent": {"id":"1001633043"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 785,"object": {"id":"132414463"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"321119217"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 786,"object": {"id":"321119217"},"parent": {"id":"132414463"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 787,"object": {"id":"678915572"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"349884370"}]},"parent": {"id":"872300910"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 788,"object": {"id":"349884370"},"parent": {"id":"678915572"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 791,"object": {"id":"618999728"},"parent": {"id":"0"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 806,"object": {"id":"403455936"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"14706080"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 807,"object": {"id":"14706080"},"parent": {"id":"403455936"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 808,"object": {"id":"423348810"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"556176014"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 809,"object": {"id":"556176014"},"parent": {"id":"423348810"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 810,"object": {"id":"344089922"},"children": {"class": "NSMutableArray","id": "", "objects":[{"id":"681369576"}]},"parent": {"id":"414427165"}}},{"class": "IBObjectRecord","id": "", "objects":{"objectID": 811,"object": {"id":"681369576"},"parent": {"id":"344089922"}}}]}}},"flattenedProperties": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"class": "NSArray","id": "", "objects":["-3.IBPluginDependency","367.IBEditorWindowLastContentRect","367.IBPluginDependency","367.IBWindowTemplateEditedContentRect","367.NSWindowTemplate.visibleAtLaunch","367.editorWindowContentRectSynchronizationRect","368.IBPluginDependency","451.IBPluginDependency","452.IBPluginDependency","453.IBPluginDependency","454.IBPluginDependency","455.IBPluginDependency","456.IBPluginDependency","457.IBPluginDependency","458.IBPluginDependency","463.IBPluginDependency","464.IBPluginDependency","467.IBPluginDependency","468.IBPluginDependency","471.IBPluginDependency","472.IBPluginDependency","473.IBPluginDependency","474.IBPluginDependency","476.IBPluginDependency","477.IBPluginDependency","479.IBPluginDependency","480.IBPluginDependency","541.IBEditorWindowLastContentRect","541.IBPluginDependency","541.ImportedFromIB2","541.WindowOrigin","541.editorWindowContentRectSynchronizationRect","542.IBPluginDependency","543.IBPluginDependency","544.IBPluginDependency","545.IBPluginDependency","545.ImportedFromIB2","546.IBPluginDependency","546.ImportedFromIB2","547.IBPluginDependency","547.ImportedFromIB2","548.IBPluginDependency","548.ImportedFromIB2","549.IBEditorWindowLastContentRect","549.IBPluginDependency","549.ImportedFromIB2","549.editorWindowContentRectSynchronizationRect","550.IBPluginDependency","550.ImportedFromIB2","551.IBPluginDependency","551.ImportedFromIB2","552.IBPluginDependency","552.ImportedFromIB2","553.IBPluginDependency","553.ImportedFromIB2","554.IBEditorWindowLastContentRect","554.IBPluginDependency","554.ImportedFromIB2","554.editorWindowContentRectSynchronizationRect","555.IBPluginDependency","555.ImportedFromIB2","556.IBPluginDependency","556.ImportedFromIB2","557.IBPluginDependency","557.ImportedFromIB2","558.IBPluginDependency","558.ImportedFromIB2","559.IBPluginDependency","559.ImportedFromIB2","560.IBPluginDependency","560.ImportedFromIB2","561.IBPluginDependency","561.ImportedFromIB2","562.IBPluginDependency","562.ImportedFromIB2","563.IBPluginDependency","563.ImportedFromIB2","564.IBPluginDependency","564.ImportedFromIB2","565.IBPluginDependency","565.ImportedFromIB2","566.IBEditorWindowLastContentRect","566.IBPluginDependency","566.ImportedFromIB2","566.editorWindowContentRectSynchronizationRect","567.IBEditorWindowLastContentRect","567.IBPluginDependency","567.ImportedFromIB2","567.editorWindowContentRectSynchronizationRect","568.IBPluginDependency","568.ImportedFromIB2","569.IBEditorWindowLastContentRect","569.IBPluginDependency","569.ImportedFromIB2","569.editorWindowContentRectSynchronizationRect","570.IBPluginDependency","570.ImportedFromIB2","571.IBPluginDependency","571.ImportedFromIB2","572.IBPluginDependency","572.ImportedFromIB2","573.IBPluginDependency","573.ImportedFromIB2","574.IBPluginDependency","574.ImportedFromIB2","575.IBPluginDependency","575.ImportedFromIB2","576.IBPluginDependency","576.ImportedFromIB2","577.IBPluginDependency","577.ImportedFromIB2","578.IBPluginDependency","578.ImportedFromIB2","579.IBPluginDependency","579.ImportedFromIB2","580.IBPluginDependency","580.ImportedFromIB2","581.IBEditorWindowLastContentRect","581.IBPluginDependency","581.ImportedFromIB2","581.editorWindowContentRectSynchronizationRect","582.IBPluginDependency","582.ImportedFromIB2","583.IBEditorWindowLastContentRect","583.IBPluginDependency","583.editorWindowContentRectSynchronizationRect","584.IBPluginDependency","585.IBPluginDependency","586.IBEditorWindowLastContentRect","586.IBPluginDependency","587.IBPluginDependency","588.IBPluginDependency","589.IBPluginDependency","590.IBPluginDependency","591.IBPluginDependency","592.IBPluginDependency","593.IBPluginDependency","594.IBPluginDependency","595.IBPluginDependency","596.IBPluginDependency","597.IBPluginDependency","598.IBPluginDependency","599.IBPluginDependency","600.IBPluginDependency","601.IBPluginDependency","602.IBPluginDependency","603.IBPluginDependency","604.IBPluginDependency","605.IBPluginDependency","606.IBPluginDependency","607.IBPluginDependency","608.IBPluginDependency","609.IBPluginDependency","610.IBPluginDependency","611.IBPluginDependency","612.IBPluginDependency","613.IBPluginDependency","614.IBPluginDependency","615.IBPluginDependency","616.IBPluginDependency","617.IBPluginDependency","618.IBPluginDependency","619.IBPluginDependency","620.IBPluginDependency","621.IBEditorWindowLastContentRect","621.IBPluginDependency","622.IBPluginDependency","623.IBPluginDependency","624.IBPluginDependency","625.IBPluginDependency","626.IBPluginDependency","627.IBPluginDependency","628.IBPluginDependency","629.IBPluginDependency","630.IBPluginDependency","631.IBPluginDependency","632.IBEditorWindowLastContentRect","632.IBPluginDependency","633.IBPluginDependency","634.IBPluginDependency","635.IBPluginDependency","636.IBPluginDependency","637.IBPluginDependency","638.IBPluginDependency","639.IBPluginDependency","640.IBPluginDependency","641.IBPluginDependency","642.IBEditorWindowLastContentRect","642.IBPluginDependency","643.IBPluginDependency","644.IBPluginDependency","645.IBPluginDependency","646.IBPluginDependency","647.IBPluginDependency","648.IBPluginDependency","649.IBPluginDependency","650.IBPluginDependency","651.IBPluginDependency","652.IBPluginDependency","653.IBPluginDependency","654.IBPluginDependency","655.IBPluginDependency","656.IBPluginDependency","657.IBPluginDependency","658.IBPluginDependency","659.IBPluginDependency","660.IBPluginDependency","661.IBPluginDependency","662.IBPluginDependency","663.IBPluginDependency","664.IBPluginDependency","665.IBPluginDependency","666.IBPluginDependency","667.IBPluginDependency","668.IBPluginDependency","669.IBPluginDependency","670.IBPluginDependency","671.IBEditorWindowLastContentRect","671.IBPluginDependency","672.IBPluginDependency","673.IBPluginDependency","674.IBPluginDependency","675.IBPluginDependency","676.IBPluginDependency","677.IBPluginDependency","678.IBPluginDependency","679.IBPluginDependency","680.IBEditorWindowLastContentRect","680.IBPluginDependency","681.IBPluginDependency","682.IBPluginDependency","683.IBPluginDependency","684.IBPluginDependency","685.IBPluginDependency","686.IBPluginDependency","690.IBAttributePlaceholdersKey","716.IBPluginDependency","717.IBPluginDependency","718.IBPluginDependency","719.IBPluginDependency","771.IBPluginDependency","772.IBPluginDependency","775.IBPluginDependency","776.IBPluginDependency","777.IBPluginDependency","778.IBPluginDependency","779.IBPluginDependency","780.IBPluginDependency","781.IBPluginDependency","782.IBPluginDependency","783.IBPluginDependency","785.IBPluginDependency","786.IBPluginDependency","791.IBPluginDependency","806.IBPluginDependency","807.IBPluginDependency","808.IBPluginDependency","809.IBPluginDependency","810.IBPluginDependency","811.IBPluginDependency"]},"dict.values": {"class": "NSMutableArray","id": "", "objects":["com.apple.InterfaceBuilder.CocoaPlugin","{{67, 532}, {946, 613}}","com.apple.InterfaceBuilder.CocoaPlugin","{{67, 532}, {946, 613}}",1,"{{11, 666}, {480, 270}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{309, 1136}, {478, 20}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{74, 862}","{{11, 977}, {478, 20}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"{{447, 673}, {197, 73}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{525, 802}, {197, 73}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"{{334, 562}, {242, 183}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{23, 794}, {245, 183}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"{{531, 606}, {64, 6}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{436, 809}, {64, 6}}","{{739, 722}, {213, 23}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{596, 852}, {216, 23}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{466, 542}, {196, 203}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{323, 672}, {199, 203}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"com.apple.InterfaceBuilder.CocoaPlugin",1,"{{617, 609}, {132, 23}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{522, 812}, {146, 23}}","com.apple.InterfaceBuilder.CocoaPlugin",1,"{{397, 703}, {234, 43}}","com.apple.InterfaceBuilder.CocoaPlugin","{{475, 832}, {234, 43}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{552, 702}, {83, 43}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{635, 542}, {204, 183}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{839, 462}, {164, 173}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{508, 462}, {254, 283}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{762, 372}, {182, 153}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","{{762, 442}, {170, 63}}","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin",{"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"id":"0"},"dict.values": {"class": "NSMutableArray","id": "", "objects":[]}}},"com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin","com.apple.InterfaceBuilder.CocoaPlugin"]}}},"unlocalizedProperties": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"id":"0"},"dict.values": {"class": "NSMutableArray","id": "", "objects":[]}}},"activeLocalization": {"nil":""},"localizations": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"id":"0"},"dict.values": {"class": "NSMutableArray","id": "", "objects":[]}}},"sourceID": {"nil":""},"maxID": 817}},"IBDocument.Classes": {"class": "IBClassDescriber","id": "", "objects":{"referencedPartialClassDescriptions": {"class": "NSMutableArray","id": "", "objects":[{"class": "IBPartialClassDescription","id": "", "objects":{"className": "AppController","outlets": {"class": "NSMutableDictionary","id": "", "objects":{"EncodedWithXMLCoder": true,"dict.sortedKeys": {"class": "NSArray","id": "", "objects":["_arrayController","_window"]},"dict.values": {"class": "NSMutableArray","id": "", "objects":["id","id"]}}},"sourceIdentifier": {"class": "IBClassDescriptionSource","id": "", "objects":{"majorKey": "IBUserSource","minorKey": ""}}}}]}}},"IBDocument.localizationMode": 0,"IBDocument.PluginDeclaredDependencies": {"class": "NSMutableDictionary","id": "", "objects":{"NS.key.0": "com.apple.InterfaceBuilder.CocoaPlugin.macosx","NS.object.0": 1050}},"IBDocument.PluginDeclaredDevelopmentDependencies": {"class": "NSMutableDictionary","id": "", "objects":{"NS.key.0": "com.apple.InterfaceBuilder.CocoaPlugin.InterfaceBuilder3","NS.object.0": 3000}},"IBDocument.PluginDeclaredDependenciesTrackSystemTargetVersion": true,"IBDocument.LastKnownRelativeProjectPath": {"nil":""},"IBDocument.defaultPropertyAccessControl": 3}}};