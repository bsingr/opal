var the_class = objc_allocateClassPair(NSObject, "NSString");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "length", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "characterAtIndex:", function(self, _cmd, index) {
with(self) {
}
}, "void");

String.prototype.isa = NSString;
var the_class = NSString;
var meta_class = the_class.isa;

class_addMethod(the_class, "getCharacters:", function(self, _cmd, buffer) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getCharacters:range:", function(self, _cmd, buffer, aRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "substringFromIndex:", function(self, _cmd, from) {
with(self) {
}
}, "void");

class_addMethod(the_class, "substringToIndex:", function(self, _cmd, to) {
with(self) {
}
}, "void");

class_addMethod(the_class, "substringWithRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "compare:", function(self, _cmd, string) {
with(self) {
}
}, "void");

class_addMethod(the_class, "compare:options:", function(self, _cmd, string, mask) {
with(self) {
}
}, "void");

class_addMethod(the_class, "compare:options:range:", function(self, _cmd, string, mask, compareRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "compare:options:range:locale:", function(self, _cmd, string, mask, compareRange, locale) {
with(self) {
}
}, "void");

class_addMethod(the_class, "caseInsensitiveCompare:", function(self, _cmd, string) {
with(self) {
}
}, "void");

class_addMethod(the_class, "localizedCompare:", function(self, _cmd, string) {
with(self) {
}
}, "void");

class_addMethod(the_class, "localizedCaseInsensitiveCompare:", function(self, _cmd, string) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isEqualToString:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "hasPrefix:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "hasSuffix:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfString:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfString:options:", function(self, _cmd, aString, mask) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfString:options:range:", function(self, _cmd, aString, mask, searchRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfString:options:range:locale:", function(self, _cmd, aString, mask, searchRange, locale) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfCharacterFromSet:", function(self, _cmd, aSet) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfCharacterFromSet:options:", function(self, _cmd, aSet, mask) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfCharacterFromSet:options:range:", function(self, _cmd, aSet, mask, searchRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfComposedCharacterSequenceAtIndex:", function(self, _cmd, index) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfComposedCharacterSequencesForRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stringByAppendingString:", function(self, _cmd, aString) {
with(self) {
return CFStringByAppendingStrings(self,aString);
}
}, "void");

class_addMethod(the_class, "stringByAppendingFormat:", function(self, _cmd, format) {
with(self) {
}
}, "void");

class_addMethod(the_class, "doubleValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "floatValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "intValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "integerValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "longLongValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "boolValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "componentsSeparatedByString:", function(self, _cmd, separator) {
with(self) {
}
}, "void");

class_addMethod(the_class, "componentsSeparatedByCharactersInSet:", function(self, _cmd, separator) {
with(self) {
}
}, "void");

class_addMethod(the_class, "commonPrefixWithString:options:", function(self, _cmd, aString, mask) {
with(self) {
}
}, "void");

class_addMethod(the_class, "uppercaseString", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lowercaseString", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "capitalizedString", function(self, _cmd) {
with(self) {
return CFStringCapitalize(self,null);
}
}, "void");

class_addMethod(the_class, "stringByTrimmingCharactersInSet:", function(self, _cmd, set) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stringByPaddingToLength:withString:startingAtIndex:", function(self, _cmd, newLength, padString, padIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getLineStart:end:contentsEnd:forRange:", function(self, _cmd, startPtr, lineEndPtr, contentsEndPtr, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lineRangeForRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getParagraphStart:end:contentsEnd:forRange:", function(self, _cmd, startPtr, parEndPtr, contentsEndPtr, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "paragraphRangeForRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "description", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "hash", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "fastestEncoding", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "smallestEncoding", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "dataUsingEncoding:allowLossyConversion:", function(self, _cmd, encoding, lossy) {
with(self) {
}
}, "void");

class_addMethod(the_class, "dataUsingEncoding:", function(self, _cmd, encoding) {
with(self) {
}
}, "void");

class_addMethod(the_class, "canBeConvertedToEncoding:", function(self, _cmd, encoding) {
with(self) {
}
}, "void");

class_addMethod(the_class, "cStringUsingEncoding:", function(self, _cmd, encoding) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getCString:maxLength:encoding:", function(self, _cmd, buffer, maxBufferCount, encoding) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getBytes:maxLength:usedLength:encoding:options:range:remainingRange:", function(self, _cmd, buffer, maxBufferCount, usedBufferCount, encoding, options, range, leftover) {
with(self) {
}
}, "void");

class_addMethod(the_class, "maximumLengthOfBytesUsingEncoding:", function(self, _cmd, enc) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lengthOfBytesUsingEncoding:", function(self, _cmd, enc) {
with(self) {
}
}, "void");

class_addMethod(the_class, "decomposedStringWithCanonicalMapping", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "precomposedStringWithCanonicalMapping", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "decomposedStringWithCompatibilityMapping", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "precomposedStringWithCompatibilityMapping", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stringByFoldingWithOptions:locale:", function(self, _cmd, options, locale) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stringByReplacingOccurrencesOfString:withString:options:range:", function(self, _cmd, target, replacement, options, searchRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stringByReplacingOccurrencesOfString:withString:", function(self, _cmd, target, replacement) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stringByReplacingCharactersInRange:withString:", function(self, _cmd, range, replacement) {
with(self) {
}
}, "void");

class_addMethod(the_class, "UTF8String", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "init", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithCharactersNoCopy:length:freeWhenDone:", function(self, _cmd, characters, length, freeBuffer) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithCharacters:length:", function(self, _cmd, characters, length) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithUTF8String:", function(self, _cmd, nullTerminatedCString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithString:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithFormat:", function(self, _cmd, format) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithFormat:arguments:", function(self, _cmd, format, argList) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithFormat:locale:", function(self, _cmd, format, locale) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithFormat:locale:arguments:", function(self, _cmd, format, locale, argList) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithData:encoding:", function(self, _cmd, data, encoding) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithBytes:length:encoding:", function(self, _cmd, bytes, len, encoding) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithBytesNoCopy:length:encoding:freeWhenDone:", function(self, _cmd, bytes, len, encoding, freeBuffer) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithCString:encoding:", function(self, _cmd, nullTerminatedCString, encoding) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfURL:encoding:error:", function(self, _cmd, url, enc, error) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfFile:encoding:error:", function(self, _cmd, path, enc, error) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfURL:usedEncoding:error:", function(self, _cmd, url, enc, error) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithContentsOfFile:usedEncoding:error:", function(self, _cmd, path, enc, error) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToURL:atomically:encoding:error:", function(self, _cmd, url, useAuxiliaryFile, enc, error) {
with(self) {
}
}, "void");

class_addMethod(the_class, "writeToFile:atomically:encoding:error:", function(self, _cmd, path, useAuxiliaryFile, enc, error) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "defaultCStringEncoding", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "availableStringEncodings", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "localizedNameOfStringEncoding:", function(self, _cmd, encoding) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "string", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithString:", function(self, _cmd, string) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithCharacters:length:", function(self, _cmd, characters, length) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithUTF8String:", function(self, _cmd, nullTerminatedCString) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithFormat:", function(self, _cmd, format) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "localizedStringWithFormat:", function(self, _cmd, format) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithCString:encoding:", function(self, _cmd, cString, enc) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithContentsOfURL:encoding:error:", function(self, _cmd, url, enc, error) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithContentsOfFile:encoding:error:", function(self, _cmd, path, enc, error) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithContentsOfURL:usedEncoding:error:", function(self, _cmd, url, enc, error) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithContentsOfFile:usedEncoding:error:", function(self, _cmd, path, enc, error) {
with(self) {
}
}, "void");

var the_class = objc_allocateClassPair(NSString, "NSMutableString");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "replaceCharactersInRange:withString:", function(self, _cmd, range, aString) {
with(self) {
}
}, "void");

var the_class = NSMutableString;
var meta_class = the_class.isa;

class_addMethod(the_class, "insertString:atIndex:", function(self, _cmd, aString, loc) {
with(self) {
}
}, "void");

class_addMethod(the_class, "deleteCharactersInRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "appendString:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "appendFormat:", function(self, _cmd, format) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setString:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithCapacity:", function(self, _cmd, capacity) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceOccurrencesOfString:withString:options:range:", function(self, _cmd, target, replacement, options, searchRange) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "stringWithCapacity:", function(self, _cmd, capacity) {
with(self) {
}
}, "void");

var the_class = NSString;
var meta_class = the_class.isa;

class_addMethod(the_class, "propertyList", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "propertyListFromStringsFileFormat", function(self, _cmd) {
with(self) {
}
}, "void");

