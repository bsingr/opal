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

include('foundation/array');
include('foundation/dictionary');
include('foundation/coder');
include('foundation/geometry');
include('foundation/property_list');

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
    
    initForReadingWithData: function(data) {
        this.init();
        this._data = data;
        this._rootDict = CFPropertyListFromData(this._data.bytes());
        this._contentStack = new NSArray();
        this._contentStack.addObject(this._rootDict);
        this._unarchivedObjects = new NSDictionary();
        return this;
    },

    setDelegate: function(delegate) {
        
    },
    
    delegate: function() {
        
    },
    
    finishDecoding: function() {
        
    },
    
    containsValueForKey: function(key) {
        var theContext = this._contextStack.lastObject();
        
        return NO;
    },
    
    decodeObjectForKey: function(key) {
        var theContext = this._contextStack.lastObject();
        
        if(theContext.typeOf == NSArray) {
            var a, array = new NSArray();
            for (a in theContext) {
                this._contextStack.addObject(a);
                array.addObject(this._decodeObject(a));
                this._contextStack.removeLastObject();
            }
            return array;
        }
        
        var theObject = theContext.objectForKey(key);
        return this._decodeObject(theObject);
    },
    
    _decodeObject: function(theObject) {
        if (!theObject) return null; // no context
        var theClass = NSClassFromString(theObject.objectForKey("class"));
        if (!theClass) {
            
        }
        var newObject = new theClass();
        
    }

- (id)_decodeObject:(id)theObject
{
    // if no context...
    if(!theObject)
        return nil;
    
    // If decodign a stirng, then just return it...
    if(CFDictionaryContainsKey(theObject, @"string"))
        return [theObject objectForKey:@"string"];
    
    // Check for nil key... return nil object
    if(CFDictionaryContainsKey(theObject, @"nil"))
        return nil;
        
    
    Class theClass = NSClassFromString([theObject objectForKey:@"class"]);

    if(!theClass)
    {
        if(CFDictionaryContainsKey(_unarchivedObjects, [theObject objectForKey:@"id"]))
            return [_unarchivedObjects objectForKey:[theObject objectForKey:@"id"]];
        else
            return nil;
    }

    id newObject = [theClass alloc];
    [_unarchivedObjects setObject:newObject forKey:[theObject objectForKey:@"id"]];
    
    if([theObject objectForKey:@"class"] == @"NSCustomObject")
    {
        [newObject init];
    }
    else
    {
        [_contextStack addObject:[theObject objectForKey:@"objects"]];
        [newObject initWithCoder:self];
        [_contextStack removeLastObject];
    }
    
    newObject = [newObject awakeAfterUsingCoder:self];
    
    [_unarchivedObjects setObject:newObject forKey:[theObject objectForKey:@"id"]];
    return newObject;
}

- (BOOL)decodeBoolForKey:(NSString *)key
{
    id theContext = [_contextStack lastObject];
    id theObject = [theContext objectForKey:key];
    
    if(!theObject)
        return NO;
    
    return ([theObject objectForKey:@"bool"] == "YES") ? YES : NO;
}

- (int)decodeIntForKey:(NSString *)key
{
    id theContext = [_contextStack lastObject];
    id theObject = [theContext objectForKey:key];
    return parseInt([theObject objectForKey:@"int"]);
}

- (int)decodeInt32ForKey:(NSString *)key
{
    
}

- (int)decodeInt64ForKey:(NSString *)key
{
    
}

- (float)decodeFloatForKey:(NSString *)key
{
    id theContext = [_contextStack lastObject];
    id theObject = [theContext objectForKey:key];
    return parseFloat([theObject objectForKey:@"float"]);    
}

- (double)decodeDoubleForKey:(NSString *)key
{
    id theContext = [_contextStack lastObject];
    id theObject = [theContext objectForKey:key];
    return parseFloat([theObject objectForKey:@"double"]);    
}

- (const int *)decodeBytesForKey:(NSString *)key returnedLength:(NSUInteger *)lengthp
{
    
}

@end


@implementation NSCoder (NSGeometryKeyedCoding)

- (void)encodePoint:(NSPoint)point forKey:(NSString *)key
{
    
}

- (void)encodeSize:(NSSize)size forKey:(NSString *)key
{
    
}

- (void)encodeRect:(NSRect)rect forKey:(NSString *)key
{
    
}

- (NSPoint)decodePointForKey:(NSString *)key
{
    NSString *thePoint = [self decodeObjectForKey:key];
    return NSPointFromString(thePoint);
}

- (NSSize)decodeSizeForKey:(NSString *)key
{
    NSString *theSize = [self decodeObjectForKey:key];
    return NSSizeFromString(theSize);
}

- (NSRect)decodeRectForKey:(NSString *)key
{
    NSString *theRect = [self decodeObjectForKey:key];
    return NSRectFromString(theRect);
}

@end

@implementation NSObject (AwakeAfterUsingCoder)

- (id)awakeAfterUsingCoder:(NSCoder *)aCoder
{
    return self;
}

@end

