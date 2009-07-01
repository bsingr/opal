var the_class = objc_allocateClassPair(NSObject, "NSBundle");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "initWithPath:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(the_class, "load", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isLoaded", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "unload", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "preflightAndReturnError:", function(self, _cmd, error) {
with(self) {
}
}, "void");

class_addMethod(the_class, "loadAndReturnError:", function(self, _cmd, error) {
with(self) {
}
}, "void");

class_addMethod(the_class, "bundlePath", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "resourcePath", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "executablePath", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "privateFrameworksPath", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sharedFrameworksPath", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sharedSupportPath", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "builtInPlugInsPath", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "bundleIdentifier", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "classNamed:", function(self, _cmd, className) {
with(self) {
}
}, "void");

class_addMethod(the_class, "principalClass", function(self, _cmd) {
with(self) {
return NSApplication;
}
}, "void");

class_addMethod(the_class, "pathForResource:ofType:", function(self, _cmd, name, ext) {
with(self) {
}
}, "void");

class_addMethod(the_class, "pathForResource:ofType:inDirectory:", function(self, _cmd, name, ext, subpath) {
with(self) {
}
}, "void");

class_addMethod(the_class, "pathForResource:ofType:inDirectory:forLocalization:", function(self, _cmd, name, ext, subpath, localizationName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "pathsForResourcesOfType:inDirectory:", function(self, _cmd, ext, subpath) {
with(self) {
}
}, "void");

class_addMethod(the_class, "pathsForResourcesOfType:inDirectory:forLocalization:", function(self, _cmd, ext, subpath, localizationName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "localizedStringForKey:value:table:", function(self, _cmd, key, value, tableName) {
with(self) {
}
}, "void");

class_addMethod(the_class, "infoDictionary", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "localizedInfoDictionary", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "objectForInfoDictionaryKey:", function(self, _cmd, key) {
with(self) {
}
}, "void");

class_addMethod(the_class, "localizations", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "preferredLocalizations", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "developmentLocalization", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "mainBundle", function(self, _cmd) {
with(self) {
return objc_msgSend(objc_msgSend(NSBundle, "alloc"), "init");
}
}, "void");

class_addMethod(meta_class, "bundleWithPath:", function(self, _cmd, path) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "bundleForClass:", function(self, _cmd, aClass) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "bundleWithIdentifier:", function(self, _cmd, identifier) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "allBundles", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "allFrameworks", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "pathForResource:ofType:inDirectory:", function(self, _cmd, name, ext, bundlePath) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "pathsForResourcesOfType:inDirectory:", function(self, _cmd, ext, bundlePath) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "preferredLocalizationsFromArray:", function(self, _cmd, localizationsArray) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "preferredLocalizationsFromArray:forPreferences:", function(self, _cmd, localizationsArray, preferencesArray) {
with(self) {
}
}, "void");

