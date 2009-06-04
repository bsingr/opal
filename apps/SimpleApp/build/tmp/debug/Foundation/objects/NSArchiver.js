var NSInconsistentArchiveException = "NSInconsistentArchiveException";
var the_class = objc_allocateClassPair(NSCoder, "NSArchiver");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "initForWritingWithMutableData:", function(self, _cmd, mdata) {
with(self) {
}
}, "void");

class_addMethod(the_class, "archiverData", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeRootObject:", function(self, _cmd, rootObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeConditionalObject:", function(self, _cmd, object) {
with(self) {
}
}, "void");

class_addMethod(the_class, "encodeClassName:intoClassName:", function(self, _cmd, trueName, inArchiveName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "classNameEncodedForTrueClassName:", function(self, _cmd, trueName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceObject:withObject:", function(self, _cmd, object, newObject) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "archivedDataWithRootObject:", function(self, _cmd, rootObject) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "archiveRootObject:toFile:", function(self, _cmd, rootObject, path) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSCoder, "NSUnarchiver");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "initForReadingWithData:", function(self, _cmd, data) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isAtEnd", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "decodeClassName:asClassName:", function(self, _cmd, inArchiveName, trueName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "classNameDecodedForArchiveClassName:", function(self, _cmd, inArchiveName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceObject:withObject:", function(self, _cmd, object, newObject) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "unarchiveObjectWithData:", function(self, _cmd, data) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "unarchiveObjectWithFile:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "decodeClassName:asClassName:", function(self, _cmd, inArchiveName, trueName) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "classNameDecodedForArchiveClassName:", function(self, _cmd, inArchiveName) {
with(self) {
}
}, "void");

