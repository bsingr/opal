var the_class = objc_allocateClassPair(NSObject, "NSAttributedString");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "string", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "attributesAtIndex:effectiveRange:", function(self, _cmd, location, range) {
with(self) {
}
}, "void");

var the_class = NSAttributedString;
var meta_class = the_class.isa;

class_addMethod(the_class, "length", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "attribute:atIndex:effectiveRange:", function(self, _cmd, attrName, location, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "attributedSubstringFromRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "attributesAtIndex:longestEffectiveRange:inRange:", function(self, _cmd, location, range, rangeLimit) {
with(self) {
}
}, "void");

class_addMethod(the_class, "attribute:atIndex:longestEffectiveRange:inRange:", function(self, _cmd, attrName, location, range, rangeLimit) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isEqualToAttributedString:", function(self, _cmd, other) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithString:", function(self, _cmd, str) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithString:attributes:", function(self, _cmd, str, attrs) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithAttributedString:", function(self, _cmd, attrStr) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSAttributedString, "NSMutableAttributedString");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "replaceCharactersInRange:withString:", function(self, _cmd, range, str) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAttributes:range:", function(self, _cmd, attrs, range) {
with(self) {
}
}, "void");

var the_class = NSMutableAttributedString;
var meta_class = the_class.isa;

class_addMethod(the_class, "mutableString", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "addAttribute:value:range:", function(self, _cmd, name, value, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "addAttributes:range:", function(self, _cmd, attrs, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeAttribute:range:", function(self, _cmd, name, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceCharactersInRange:withAttributedString:", function(self, _cmd, range, attrString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "insertAttributedString:atIndex:", function(self, _cmd, attrString, loc) {
with(self) {
}
}, "void");

class_addMethod(the_class, "appendAttributedString:", function(self, _cmd, attrString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "deleteCharactersInRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAttributedString:", function(self, _cmd, attrString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "beginEditing", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "endEditing", function(self, _cmd) {
with(self) {
}
}, "void");

