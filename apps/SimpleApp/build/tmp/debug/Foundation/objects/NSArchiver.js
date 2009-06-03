[d(), NSString (TYPE_NAME), [=(), [*(), * (*), NSInconsistentArchiveException (IDENTIFIER)], @"NSInconsistentArchiveException" (AT_STRING_LITERAL)]]var the_class = objc_allocateClassPair(NSCoder, "NSArchiver");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "initForWritingWithMutableData:", function(self, _cmd, mdata) {
}, "void");

class_addMethod(the_class, "archiverData", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "encodeRootObject:", function(self, _cmd, rootObject) {
}, "void");

class_addMethod(the_class, "encodeConditionalObject:", function(self, _cmd, object) {
}, "void");

class_addMethod(the_class, "encodeClassName:intoClassName:", function(self, _cmd, trueName, inArchiveName) {
}, "void");

class_addMethod(the_class, "classNameEncodedForTrueClassName:", function(self, _cmd, trueName) {
}, "void");

class_addMethod(the_class, "replaceObject:withObject:", function(self, _cmd, object, newObject) {
}, "void");

class_addMethod(meta_class, "archivedDataWithRootObject:", function(self, _cmd, rootObject) {
}, "void");

class_addMethod(meta_class, "archiveRootObject:toFile:", function(self, _cmd, rootObject, path) {
}, "void");

var the_class = objc_allocateClassPair(NSCoder, "NSUnarchiver");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "initForReadingWithData:", function(self, _cmd, data) {
}, "void");

class_addMethod(the_class, "isAtEnd", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "decodeClassName:asClassName:", function(self, _cmd, inArchiveName, trueName) {
}, "void");

class_addMethod(the_class, "classNameDecodedForArchiveClassName:", function(self, _cmd, inArchiveName) {
}, "void");

class_addMethod(the_class, "replaceObject:withObject:", function(self, _cmd, object, newObject) {
}, "void");

class_addMethod(meta_class, "unarchiveObjectWithData:", function(self, _cmd, data) {
}, "void");

class_addMethod(meta_class, "unarchiveObjectWithFile:", function(self, _cmd, path) {
}, "void");

class_addMethod(meta_class, "decodeClassName:asClassName:", function(self, _cmd, inArchiveName, trueName) {
}, "void");

class_addMethod(meta_class, "classNameDecodedForArchiveClassName:", function(self, _cmd, inArchiveName) {
}, "void");

