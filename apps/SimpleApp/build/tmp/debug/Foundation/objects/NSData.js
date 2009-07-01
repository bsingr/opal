var the_class = objc_allocateClassPair(NSObject, "NSData");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "length", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "bytes", function(self, _cmd) {
with(self) {
return _bytes;
}
}, "void");

CFDataRef.prototype.isa = NSData;
var the_class = NSData;
var meta_class = the_class.isa;

class_addMethod(the_class, "description", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getBytes:", function(self, _cmd, buffer) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getBytes:length:", function(self, _cmd, buffer, length) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getBytes:range:", function(self, _cmd, buffer, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isEqualToData:", function(self, _cmd, other) {
with(self) {
}
}, "void");

class_addMethod(the_class, "subdataWithRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToFile:atomically:", function(self, _cmd, path, useAuxiliaryFile) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToURL:atomically:", function(self, _cmd, url, atomically) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToFile:options:error:", function(self, _cmd, path, writeOptionsMask, errorPtr) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToURL:options:error:", function(self, _cmd, url, writeOptionsMask, errorPtr) {
with(self) {
}
}, "void");

var the_class = NSData;
var meta_class = the_class.isa;

class_addMethod(the_class, "initWithBytes:length:", function(self, _cmd, bytes, length) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithBytesNoCopy:length:", function(self, _cmd, bytes, length) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithBytesNoCopy:length:freeWhenDone:", function(self, _cmd, bytes, length, b) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfFile:options:error:", function(self, _cmd, path, readOptionsMask, errorPtr) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfURL:options:error:", function(self, _cmd, url, readOptionsMask, errorPtr) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfURL:", function(self, _cmd, url) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfURL:didLoadBlock:", function(self, _cmd, url, block) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfMappedFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithData:", function(self, _cmd, data) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "data", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithBytes:length:", function(self, _cmd, bytes, length) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithBytesNoCopy:length:", function(self, _cmd, bytes, length) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithBytesNoCopy:length:freeWhenDone:", function(self, _cmd, bytes, length, b) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithContentsOfFile:options:error:", function(self, _cmd, path, readOptionsMask, errorPtr) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithContentsOfURL:options:error:", function(self, _cmd, url, readOptionsMask, errorPtr) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithContentsOfFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithContentsOfURL:", function(self, _cmd, url) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithContentsOfURL:didLoadBlock:", function(self, _cmd, url, block) {
with(self) {
return CFDataCreateFromURL(url,block);
}
}, "void");

class_addMethod(meta_class, "dataWithContentsOfMappedFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithData:", function(self, _cmd, data) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSData, "NSMutableData");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "mutableBytes", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setLength:", function(self, _cmd, length) {
with(self) {
}
}, "void");

var the_class = NSMutableData;
var meta_class = the_class.isa;

class_addMethod(the_class, "appendBytes:length:", function(self, _cmd, bytes, length) {
with(self) {
}
}, "void");

class_addMethod(the_class, "appendData:", function(self, _cmd, other) {
with(self) {
}
}, "void");

class_addMethod(the_class, "increaseLengthBy:", function(self, _cmd, extraLength) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceBytesInRange:withBytes:", function(self, _cmd, range, bytes) {
with(self) {
}
}, "void");

class_addMethod(the_class, "resetBytesInRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setData:", function(self, _cmd, data) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceBytesInRange:withBytes:length:", function(self, _cmd, range, replacementBytes, replacementLength) {
with(self) {
}
}, "void");

var the_class = NSMutableData;
var meta_class = the_class.isa;

class_addMethod(the_class, "initWithCapacity:", function(self, _cmd, capacity) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithLength:", function(self, _cmd, length) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithCapacity:", function(self, _cmd, aNumItems) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "dataWithLength:", function(self, _cmd, length) {
with(self) {
}
}, "void");

