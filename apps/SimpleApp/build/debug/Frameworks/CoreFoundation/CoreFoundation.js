// 
//  CFArray.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CFArrayRef CFArrayCreate(void **values, numValues);
// 
function CFArrayCreate(values, numValues)
{
    return CFArrayCreateCopy(values);
}

// extern CFArrayRef CFArrayCreateCopy(CFArrayRef theArray);
// 
function CFArrayCreateCopy(theArray)
{
    var new_array = CFArrayCreateMutable(0);
    
    for(var i = 0; i < theArray.length; i++)
        CFArrayAppendValue(new_array, theArray[i]);
    
    return new_array;
}

// extern CFMutableArrayRef CFArrayCreateMutable(CFIndex capacity);
// 
function CFArrayCreateMutable(capacity)
{
    return new Array();
}

// extern CFMutableArrayRef CFArrayCreateMutableCopy(CFIndex capacity, CFArrayRef theArray);
// 
function CFArrayCreateMutableCopy(capacity, theArray)
{
    return CFArrayCreateCopy(theArray);
}

// extern CFIndex CFArrayGetCount(CFArrayRef theArray);
// 
function CFArrayGetCount(theArray)
{
    return theArray.length;
}

// extern CFIndex CFArrayGetCountOfValue(CFArrayRef theArray, CFRange range, void *value);
// 
function CFArrayGetCountOfValue(theArray, range, value)
{
    
}

// extern bool CFArrayContainsValue(CFArrayRef theArray, CFRange theRange, void *value);
// 
function CFArrayContainsValue(theArray, theRange, value)
{
    
}

// extern void *CFArrayGetValueAtIndex(CFArrayRef theArray, CFIndex idx);
// 
function CFArrayGetValueAtIndex(theArray, idx)
{
    return theArray[idx];
}

// extern void CFArrayGetValues(CFArrayRef theArray, CFRange range, void **values);
// 
function CFArrayGetValues(theArray, range, values)
{
    
}

// extern CFIndex CFArrayGetFirstIndexOfValue(CFArrayRef theArray, CFRange range, void *value);
// 
function CFArrayGetFirstIndexOfValue(theArray, range, value)
{
    return theArray.indexOf(value);
}

// extern CFIndex CFArrayGetLastIndexOfValue(CFArrayRef theArray, CFRange range, void *value);
// 
function CFArrayGetLastIndexOfValue(theArray, range, value)
{
    
}

// extern void CFArrayAppendValue(CFMutableArrayRef theArray, void *value);
// 
function CFArrayAppendValue(theArray, value)
{
    theArray.push(value);
}

// extern void CFArrayInsertValueAtIndex(CFMutableArrayRef theArray, CFIndex idx, void *value);
// 
function CFArrayInsertValueAtIndex(theArray, idx, value)
{

}

// extern void CFArraySetValueAtIndex(CFMutableArrayRef theArray, CFIndex idx, void *value);
// 
function CFArraySetValueAtIndex(theArray, idx, value)
{
    
}

// extern void CFArrayRemoveValueAtIndex(CFMutableArrayRef theArray, CFIndex idx);
// 
function CFArrayRemoveValueAtIndex(theArray, idx)
{
    theArray.splice(idx, 1);
}

// extern void CFArrayRemoveAllValues(CFMutableArrayRef theArray);
// 
function CFArrayRemoveAllValues(theArray)
{
    
}

// extern void CFArrayReplaceValues(CFMutableArrayRef theArray, CFRange range, void *newValues, CFIndex newCount);
// 
function CFArrayReplaceValues(theArray, range, newValues, newCount)
{
    
}

// extern void CFArrayExchangeValuesAtIndices(CFMutableArrayRef theArray, CFIndex idx1, CFIndex idx2);
// 
function CFArrayExchnageValuesAtIndices(theArray, idx1, idx2)
{
    
}

// extern void CFArrayAppendArray(CFMutableArrayRef theArray, CFArrayRef otherArray, CFRange otherRange);
// 
function CFArrayAppendArray(theArray, otherArray, otherRange)
{
    
}
// 
//  CFAttributedString.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CFAttributedStringRef CFAttributedStringCreate(CFStringRef str, CFDictionaryRef attributes);
// 
function CFAttributedStringCreate(str, attributes)
{
    
}

// extern CFAttributedStirngRef CFAttributedStringCreateWithSubstring(CFAttributedStringRef aStr, CFRange range);
// 
function CFAttributedStringCreateWithSubstring(aStr, range)
{
    
}

// extern CFAttributedStringRef CFAttributedStringCreateCopy(CFAttributedStringRef aStr);
// 
function CFAttributedStringCreateCopy(aStr)
{
    
}

// extern CFStringRef CFAttributedStringGetString(CFAttributedStringRef aStr);
// 
function CFAttributedStringGetString(aStr)
{
    
}

// extern CFIndex CFAttributedStringGetLength(CFAttributedStringRef aStr);
// 
function CFAttributedStringGetLength(aStr)
{
    
}

// extern CFDictionaryRef CFAttributedStringGetAttributes(CFAttributedStringRef aStr, CFIndex loc, CFRange *effectiveRange);
// 
function CFAttributedStringGetAttributes(aStr, loc, effectiveRange)
{
    
}

// extern CFTypeRef CFAttributedStringGetAttribute(CFAttributedStringRef aStr, CFIndex loc, CFStringRef attrName, CFRange *effectiveRange);
// 
function CFAttributedStringGetAttribute(aStr, loc, attrName, effectiveRange)
{
    
}

// extern CFDictionaryRef CFAttributedStringGetAttributesAndLongestEffectiveRange(CFAttributedStringRef aStr, CFIndex loc, CFRange inRange, CFRange *longestEffectiveRange);
// 
function CFAttributedStringGetAttributesAndLongestEffectiveRange(aStr, loc, inRange, longestEffectiveRange)
{
    
}

// extern CFTypeRef CFAttributedStringGetAttributeAndLongestEffectiveRange(CFAttributedStringRef aStr, CFIndex loc, CFStringRef attrName, CFRange inRange, CFRange *longestEffectiveRange);
// 
function CFAttributedStringGetAttributeAndLongestEffectiveRange(aStr, loc, attrName, inRange, longestEffectiveRange)
{
    
}

// extern CFMutableAttributedStringRef CFAttributedStringCreateMutableCopy(CFIndex maxLength, CFAttributedStringRef aStr);
// 
function CFAttributedStringCreateMutableCopy(maxLength, aStr)
{
    
}

// extern CFMutableAttributedStringRef CFAttributedStringCreateMutable(CFIndex maxLength);
// 
function CFAttributedStringCreateMutable(maxLength)
{
    
}

// extern void CFAttributedStringReplaceString(CFMutableAttributedStringRef aStr, CFRange range, CFStringRef replacement);
// 
function CFAttributedStringReplaceString(aStr, range, replacement)
{
    
}

// extern CFMutableStringRef CFAttributedStringGetMutableString(CFMutableAttributedStringRef aStr);
// 
function CFAttributedStringGetMutableString(aStr)
{
    
}

// extern void CFAttributedStringSetAttributes(CFMutableAttributedStringRef aStr, CFRange range, CFDictionaryRef replacement, Boolean clearOtherAttributes);
// 
function CFAttributedStringSetAttributes(aStr, range, replacement, clearOtherAttributes)
{
    
}

// extern void CFAttributedStringSetAttribute(CFMutableAttributedStringRef aStr, CFRange range, CFStringRef attrName, CFTypeRef value);
// 
function CFAttributedStringSetAttribute(aStr, range, attrName, value)
{
    
}

// extern void CFAttributedStringRemoveAttribute(CFMutableAttributedStringRef aStr, CFRange range, CFStringRef attrName);
// 
function CFAttributedStringRemoveAttribute(aStr, range, attrName)
{
    
}

// extern void CFAttributedStringReplaceAttributedString(CFMutableAttributedStringRef aStr, CFRange range, CFAttributedStringRef replacement);
// 
function CFAttributedStringReplaceAttributedString(aStr, range, replacement)
{
    
}

// extern void CFAttributedStringBeginEditing(CFMutableAttributedStringRef aStr);
// 
function CFAttributedStringBeginEditing(aStr)
{
    
}

// extern void CFAttributedStringEndEditing(CFMutableAttributedStringRef aStr);
// 
function CFAttributedStringEndEditing(aStr)
{
    
}
// 
//  CFBase.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function CFRangeMake (loc, len)
{
    var theRange = {
        location: loc,
        length: len
    }
    
    return theRange;
}// 
//  CFBundle.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-04.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

 
function CFBundleRef()
{
    this._path = "";
    this._infoDictionary = new CFDictionaryRef();
    return this;
}

var kCFBundleInfoDictionaryVersionKey = "";
var kCFBundleExecutableKey = "CFBundleExecutable";
var kCFBundleIdentifierKey = "";
var kCFBundleVersionKey = "";
var kCFBundleDevelopmentRegionKey = "";
var kCFBundleNameKey = "";
var kCFBundleLocalizationsKey = "";

// extern CFBundleRef CFBundleGetMainBundle(void);
function CFBundleGetMainBundle()
{
    return __bootstrap_main_bundle;
}

// extern CFBundleRef CFBundleGetBundleWithIdentifier(CFStringRef bundleID);
function CFBundleGetBundleWithIdentifier(bundleID)
{
    
}

// extern CFArrayRef CFBundleGetAllBundles(void);
function CFBundleGetAllBundles()
{
    
}

// extern CFBundleRef CFBundleCreate(CFStringRef bundleURL, void (^callback)(void));
function CFBundleCreate(bundleURL, callback)
{
    var the_bundle = new CFBundleRef();
    the_bundle._path = bundleURL;
    
    var request = CFHTTPRequestCreate("GET", bundleURL, true, function(evt) {
        switch (request.readyState)
        {
            case 4:
                the_bundle._infoDictionary = CFPropertyListCreateFromJSONData(request.responseText);
                callback();
                break;
        }
    });
    CFHTTPRequestSetMimeType(request, "text/javascript");
    CFHTTPRequestSend(request, null);
    
    return the_bundle;
}



// ========================
// = Vienna added methods =
// ========================

// extern CFBundleRef CFBundleGetBundleForClass(Class aClass);
function CFBundleGetBundleForClass(aClass)
{
    return __bootstrap_bundles_for_class[aClass.name];
}

// extern void CFBundleSetBundleForClass(CFBundleRef bundle, Class aClass);
function CFBundleSetBundleForClass(bundle, aClass)
{
    __bootstrap_bundles_for_class[aClass.name] = bundle;
}

// extern void CFBundlePreloadResource(CFBundleRef bundle, CFStringRef resourceName, CFStringRef resourceType, CFStringRef subDirName);
function CFBundlePreloadResource(bundle, resourceName, resourceType, subDirName)
{
    NSLog("Need to preload: " + resourceName + "." + resourceType);
    
    var theImage = new Image();
    theImage.src = "file:///Users/adam/Sites/lumpy.png";
    CFArrayAppendValue(__bootstrap_preload_files, theImage);
    
    theImage.onload =  function() {    	           
       __bootstrap_preload_finished(theImage);
    };
}
// 
//  CFData.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function CFDataRef()
{
    this._bytes = "";
    return this;
}

// extern CFDataRef CFDataCreateFromURL(CFStringRef path, void (^callback)(void));
function CFDataCreateFromURL(path, callback)
{
    if (CFDictionaryContainsKey(__bootstrap_files, path))
    {
        callback(CFDictionaryGetValue(__bootstrap_files, path));
        return CFDictionaryGetValue(__bootstrap_files, path);
    }

    // Do not already have file, so download..
    
    var the_data = new CFDataRef();
    CFDictionarySetValue(__bootstrap_files, path, the_data);
    
    var request = CFHTTPRequestCreate("GET", path, true, function(evt) {
        switch (request.readyState)
        {
            case 4:
                the_data._bytes = request.responseText;
                callback();
                break;
        }
    });
    CFHTTPRequestSetMimeType(request, "text/plain");
    CFHTTPRequestSend(request, null);
    
    return the_data;
}

// extern CFDataRef CFDataCreate(void *bytes, CFIndex length);
// 
function CFDataCreate(bytes, length)
{
    var the_data = new CFDataRef();
    the_data._bytes = bytes;
    return the_data;
}

// extern CFDataRef CFDataCreateCopy(CFDataRef theData);
// 
function CFDataCreateCopy(theData)
{
    
}

// extern CFMutableDataRef CFDataCreateMutable(CFIndex capacity);
// 
function CFDataCreateMutable(capacity)
{
    
}

// extern CFMutableDataRef CFDataCreateMutableCopy(CFIndex capacity, CFDataRef theData);
// 
function CFDataCreateMutableCopy(capacity, theData)
{
    
}

// extern CFIndex CFDataGetLength(CFDataRef theData);
// 
function CFDataGetLength(theData)
{
    
}

// extern void CFDataGetBytes(CFDataRef theData, CFRange range, void *buffer);
// 
function CFDataGetBytes(theData, range, buffer)
{
    
}

// extern void CFDataAppendBytes(CFMutableDataRef theData, void *bytes, CFIndex length);
// 
function CFDataAppendCytes(theData, bytes, length)
{
    
}

// extern void CFDataReplaceBytes(CFMutableDataRef theData, CFRange range, void *newBytes, CFIndex newLength);
// 
function CFDataReplaceBytes(theData, range, newBytes, newLength)
{
    
}

// extern void CFDataDeleteBytes(CFMutableDataRef theData, CFRange range);
// 
function CFDataDeleteBytes(theData, range)
{
    
}
// 
//  CFDate.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CFAbsoluteTime CFAbsoluteTimeGetCurrent(void);
// 
function CFAbsoluteTimeGetCurrent()
{
    return new Date().valueOf();
}

// typedef struct {
//     
// } CFDataRef;
function CFDateRef()
{
    return new Date();
}


// extern CFDateRef CFDateCreate(CFAbsoluteTime at);
// 
function CFDateCreate(at)
{
    return new Date(at);
}

// extern CFAbsoluteTime CFDateGetAbsoluteTime(CFDateRef theDate);
// 
function CFDateGetAbsoluteTime(theDate)
{
    return theDate.valueOf();
}

// extern CFTimeInterval CFDateGetTimeIntervalSinceDate(CFDateRef theDate, CFDateRef otherDate);
// 
function CFDateGetTimeIntervalSinceDate(theDate, otherDate)
{
    
}

// extern CFComparisonResult CFDateCompare(CFDateRef theDate, CFDateRef otherDate, void *context);
// 
function CFDateCompare(theDate, otherDate, context)
{
    
}

// typedef struct {
//     int     year;
//     int     month;
//     int     day;
//     int     hour;
//     int     minute;
//     double  second;
// } CFGregorianDate;
// 
// typedef struct {
//     int     years;
//     int     months;
//     int     days;
//     int     minutes;
//     double  seconds;
// } CFGregorianUnits;
// 
// enum {
//     kCFGregorianUnitsYears      = (1 << 0),
//     kCFGregorianUnitsMonths     = (1 << 1),
//     kCFGregorianUnitsDays       = (1 << 2),
//     kCFGregorianUnitsHours      = (1 << 3),
//     kCFGregorianUnitsMinutes    = (1 << 4),
//     kCFGregorianUnitsSeconds    = (1 << 5),
//     kCFGregorianAllUnits        = 0x00FFFFFF
// };
// typedef CFOptionFlags CFGregorianUnitFlags;

// extern bool CFGregorianDateIsValid(CFGregorianDate gdate, CFOptionFlags unitFlags);
// 
function CFGregorianDateIsValid(gdate, unitFlags)
{
    
}

// extern CFAbsoluteTime CFGregorianDateGetAbsoluteTime(CFGregorianDate gdate, CFTimeZoneRef tz);
// 
function CFGregorianDateGetAbsoluteTime(gdate, tz)
{
    
}

// extern CFGregorianDate CFAbsoluteTimeGetGregorianDate(CFAbsoluteTime at, CFTimeZoneRef tz);
// 
function CFAbsoluteTimeGetGregorianDate(at, tz)
{
    
}

// extern CFAbsoluteTime CFAbsoluteTimeAddGregorianUnits(CFAbsoluteTime at, CFTimeZoneRef tz, CFGregorianUnits units);
// 
function CFAbsoluteTimeAddGregorianUnits(at, tz, units)
{
    
}

// extern CFGregorianUnits CFAbsoluteTimeGetDifferenceAsGregorianUnits(CFAbsoluteTime at1, CFAbsoluteTime at2, CFTimeZoneRef tz, CFOptionFlags unitFlags);
// 
function CFAbsoluteTimeGetDifferenceAsGregorianUnits(at1, at2, tz, unitFlags)
{
    
}

// extern int CFAbsoluteTimeGetDayOfWeek(CFAbsoluteTime at, CFTimeZoneRef tz);
// 
function CFAbsoluteTimeGetDayOfWeek(at, tz)
{
    
}


// extern int CFAbsoluteTimeGetDayOfYear(CFAbsoluteTime at, CFTimeZoneRef tz);
// 
function CFAbsoluteTimeGetDayOfYear(at, tz)
{
    
}

// extern int CFAbsoluteTimeGetWeekOfYear(CFAbsoluteTime at, CFTimeZoneRef tz);
// 
function CFAbsoluteTimeGetWeekOfYear(at, tz)
{
    
}
// 
//  CFDictionary.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// typedef struct CFDictionaryRef {
//     CFArrayRef _keys;
//     CFArrayRef _values;
//     CFIndex _count;
// };
// 
function CFDictionaryRef()
{
    this._keys = [];
    this._values = {};
    this._count = 0;
    return this;
}

// typedef struct *CFMutableDictionaryRef {
//     CFArrayRef _keys;
//     CFArrayRef _values;
//     CFIndex _count;
// };
// 
function CFMutableDictionaryRef()
{
    this._keys = [];
    this._values = {};
    this._count = 0;
    return this;
}

// extern CFDictionaryRef CFDictionaryCreate(void **keys, void **values);
// 
function CFDictionaryCreate(keys, values)
{
    var theDictionary = new CFDictionaryRef();
    
    for(var i = 0; i < keys.length; i++)
        CFDictionarySetValue(theDictionary, keys[i]. values[i]);
    
    return theDictionary;
}

// extern CFDictionaryRef CFDictionaryCreateCopy(CFDictionaryRef theDict);
// 
function CFDictionaryCreateCopy(theDict)
{
    var newDictionary = new CFDictionaryRef();
    newDictionary._count = theDict._count;
    
    for (newKey in theDict._keys)
        newDictionary._keys.push(newKey);
    
    for (newValue in theDict._values)
        newDictionary._values.push(newKey);
    
    return newDictionary;
}

// extern CFMutableDictionaryRef CFDictionaryCreateMutable();
// 
function CFDictionaryCreateMutable()
{
    return new CFMutableDictionaryRef();
}

// extern CFMutableDictionaryRef CFDictionaryCreateMutableCopy(CFDictionaryRef theDict);
// 
function CFDictionaryCreateMutableCopy(theDict)
{
    var newDictionary = new CFMutableDictionaryRef();
    newDictionary._count = theDict._count;
    
    for (newKey in theDict._keys)
        newDictionary._keys.push(newKey);
    
    for (newValue in theDict._values)
        newDictionary._values.push(newKey);
    
    return newDictionary;    
}

// extern CFIndex CFDictionaryGetCount(CFDictionaryRef theDict);
// 
function CFDictionaryGetCount(theDict)
{
    return theDict._count;
}

// extern CFIndex CFDictionaryGetCountOfKey(CFDictionaryRef theDict, void *key);
// 
function CFDictionaryGetCountOfKey (theDict, key)
{
    
}

// extern CFIndex CFDictionaryGetCountOfValue(CFDictionaryRef theDict, void *value);
// 
function CFDictionaryGetCountOfValue(theDict, value)
{
    
}

// extern bool CFDictionaryContainsKey(CFDictionaryRef theDict, void *key);
// 
function CFDictionaryContainsKey(theDict, key)
{
    return (theDict._values[key]) != null;
}

// extern bool CFDictionaryContainsValue(CFDictionaryRef theDict, void *value);
// 
function CFDictionaryContainsValue(theDict, value)
{
    
}

// extern void *CFDictionaryGetValue(CFDictionaryRef theDict, void *key);
// 
function CFDictionaryGetValue(theDict, key)
{
    return theDict._values[key];
}

// extern bool CFDictionaryGetValueIfPresent(CFDictionaryRef theDict, void *key, void **value);
// 
function CFDictionaryGetValueIfPresent(theDict, key, value)
{
    
}

// extern void CFDictionaryGetKeysAndValues(CFDictionaryRef theDict, void **keys, void **values);
// 
function CFDictionaryGetKeysAndValues(theDict, keys, values)
{
    for(i in theDict._keys)
    {
        keys.push(theDict._keys[i]);
        values.push(CFDictionaryGetValue(theDict, theDict._keys[i]));
    }
    // keys = theDict._keys;
    // value = theDict._values;
}

// extern void CFDictionaryAddValue(CFMutableDictionaryRef theDict, void *key, void *value);
// 
function CFDictionaryAddValue(theDict, key, value)
{
    
}

// extern void CFDictionarySetValue(CFMutableFictionaryRef theDict, void *key, void *value);
// 
function CFDictionarySetValue(theDict, key, value)
{
    if (!CFDictionaryContainsKey(theDict, key))
    {
        theDict._keys.push(key);
        theDict._count ++;
    }

    theDict._values[key] = value;
}

// extern void CFDictionaryReplaceValue(CFMutableDitionaryRef theDict, void *key, void *value);
// 
function CFDictionaryReplaceValue(theDict, key, value)
{
    
}

// extern void CFDictionaryRemoveValue(CFMutableDictionaryRef theDict, void *key);
// 
function CFDictionaryRemoveValue(theDict, key)
{
    
}

// extern void CFDictionaryRemoveAllValues(CFMutableDictionaryRef theDict);
// 
function CFDictionaryRemoveAllValues(theDict)
{
    
}
// 
//  CFHTTPRequest.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-06.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function CFHTTPRequestCreate(method, address, async, callback)
{
    var req =  new XMLHttpRequest();
    req.open(method, address, async);
    req.onreadystatechange = callback;
    return req;
}

function CFHTTPRequestSetMimeType(request, mime)
{
    // request.overrideMimeType(mime);
}

function CFHTTPRequestSend(request, data)
{
    request.send(data);
}
// 
//  CFJSONParser.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// typedef struct {
//     CFDataRef jsonData;
// }CFJSONParserRef;
// 
function CFJSONParserRef(jsonData)
{
    this.jsonData = jsonData;
}

// extern CFJSONParserRef CFJSONParserCreate(CFDataRef jsonData);
// 
function CFJSONParserCreate(jsonData)
{
    return new CFJSONParserRef(jsonData);
}

// extern bool CFJSONParserParse(CFJSONParseRef parser);
// 
function CFJSONParserParse(parser)
{
    var at,
        ch,
        escapee = {
            '"':  '"',
            '\\': '\\',
            '/':  '/',
            b:    '\b',
            f:    '\f',
            n:    '\n',
            r:    '\r',
            t:    '\t'
        },
        text;
    
    var error = function(m)
    {
        console.log("message:" + m + "...... at:" + at +  " /////// text:");
        // throw {
        //             name:    'SyntaxError',
        //             message: m,
        //             at:      at,
        //             text:    text
        //         };
    };

    var next = function(c)
    {
        if (c && c !== ch) {
            error("Expected '" + c + "' instead of '" + ch + "'");
        }

        ch = text.charAt(at);
        at += 1;
        return ch;
    };

    var number = function()
    {
        var number,
            string = '';

        if (ch === '-') {
            string = '-';
            next('-');
        }
        while (ch >= '0' && ch <= '9') {
            string += ch;
            next();
        }
        if (ch === '.') {
            string += '.';
            while (next() && ch >= '0' && ch <= '9') {
                string += ch;
            }
        }
        if (ch === 'e' || ch === 'E') {
            string += ch;
            next();
            if (ch === '-' || ch === '+') {
                string += ch;
                next();
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
        }
        number = +string;
        if (isNaN(number)) {
            error("Bad number");
        } else {
            return number;
        }
    };

    var string = function()
    {

        var hex,
            i,
            string = '',
            uffff;
        if (ch === '"') {
            while (next()) {
                if (ch === '"') {
                    next();
                    return string;
                } else if (ch === '\\') {
                    next();
                    if (ch === 'u') {
                        uffff = 0;
                        for (i = 0; i < 4; i += 1) {
                            hex = parseInt(next(), 16);
                            if (!isFinite(hex)) {
                                break;
                            }
                            uffff = uffff * 16 + hex;
                        }
                        string += String.fromCharCode(uffff);
                    } else if (typeof escapee[ch] === 'string') {
                        string += escapee[ch];
                    } else {
                        break;
                    }
                } else {
                    string += ch;
                }
            }
        }
        error("Bad string");
    };

    var white = function()
    {
        while (ch && ch <= ' ') {
            next();
        }
    };

    var word = function ()
    {
        switch (ch) {
        case 't':
            next('t');
            next('r');
            next('u');
            next('e');
            return true;
        case 'f':
            next('f');
            next('a');
            next('l');
            next('s');
            next('e');
            return false;
        case 'n':
            next('n');
            next('u');
            next('l');
            next('l');
            return null;
        }
        error("Unexpected '" + ch + "'");
    };

    var value;

    var array = function()
    {
        var array = [];

        if (ch === '[') {
            next('[');
            white();
            if (ch === ']') {
                next(']');
                return array;   // empty array
            }
            while (ch) {
                array.push(value());
                white();
                if (ch === ']') {
                    next(']');
                    return array;
                }
                next(',');
                white();
            }
        }
        error("Bad array");
    };

    var dictionary = function()
    {
        var key;
        var newDict = new CFMutableDictionaryRef();

        if (ch === '{') {
            next('{');
            white();
            if (ch === '}') {
                next('}');
                return newDict;   // empty object
            }
            while (ch) {
                key = string();
                white();
                next(':');
                if (CFDictionaryContainsKey(newDict, key)) {
                    error('Duplicate key "' + key + '"');
                }
                CFDictionarySetValue(newDict, key, value());
                white();
                if (ch === '}') {
                    next('}');
                    return newDict;
                }
                next(',');
                white();
            }
        }
        error("Bad dictionary");
    };

    var value = function()
    {

        white();
        switch (ch) {
        case '{':
            return dictionary();
        case '[':
            return array();
        case '"':
            return string();
        case '-':
            return number();
        default:
            return ch >= '0' && ch <= '9' ? number() : word();
        }
    };

        var result;

        text = parser.jsonData;
        at = 0;
        ch = ' ';
        result = value();
        white();
        if (ch) {
            error("Syntax error");
        }

        return result;
}// 
//  CFPropertyList.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// enum {
//     kCFPropertyListImmutable = 0,
//     kCFPropertyListMutableContainers,
//     kCFPropertyListMutableContainersAndLeaves
// };

// extern CFPropertyListRef CFPropertyListCreateFromXMLData(CFDataRef xmlData, CFOptionFlags mutabilityOption, CFStringRef *errorString);
// 
function CFPropertyListCreateFromXMLData(xmlData, mutabilityOption, errorString)
{
    
}

// extern CFDataRef CFPropertyListCreateXMLData (CFPropertyListRef propertyList);
// 
function CFPropertyListCreateXMLData(propertyList)
{
    
}

// extern CFPropertyListRef CFPropertyListCreateFromJSONData(CFDataRef jsonData, CFOptionFlags mutabilityOption, CFStringRef *errorString);
// 
function CFPropertyListCreateFromJSONData(jsonData, mutabilityOption, errorString)
{
    var the_parser = CFJSONParserCreate(jsonData);
    var the_result = CFJSONParserParse(the_parser);
    
    if(CFDictionaryContainsKey(the_result, "plist"))
        the_result = CFDictionaryGetValue(CFDictionaryGetValue(the_result, "plist"), "dict");
    else if(CFDictionaryContainsKey(the_result, "archive"))
        the_result = CFDictionaryGetValue(CFDictionaryGetValue(the_result, "archive"), "data");
    
    _CFPropertyListReformatDictionary(the_result);
    
    return the_result;
}

function _CFPropertyListReformatDictionary(theDict)
{
    var keys = [];
    var values = [];
    CFDictionaryGetKeysAndValues(theDict, keys, values);
    
    for(var i = 0; i < CFDictionaryGetCount(theDict); i++)
    {
        if(CFDictionaryContainsKey(values[i], "string"))
            CFDictionarySetValue(theDict, keys[i], CFDictionaryGetValue(values[i], "string"));
        else if(CFDictionaryContainsKey(values[i], "int"))
                CFDictionarySetValue(theDict, keys[i], CFDictionaryGetValue(values[i], "int"));
    }
}


// extern CFDataRef CFPropertyListCreateJSONData (CFPropertyListRef propertyList);
// 
function CFPropertyListCreateJSONData(propertyList)
{
    
}

// extern CFPropertyListRef CFPropertyListCreateDeepCopy (CFPropertyListRef propertyList, CFOptionFlags mutabilityOption);
// 
function CFPropertyListCreateDeepCopy(propertyList, mutabilityOption)
{
    
}

// enum {
//     kCFPropertyListOpenStepFormat = 1,
//     kCFPropertyListXMLFormat_v1_0 = 100,
//     kCFPropertyListBinaryFormat_v1_0 = 200
// };

// extern bool CFPropertyListIsValid (CFPropertyListRef plist, CFPropertyListFormat format);
// 
function CFPropertyListIsValid(plist, format)
{
    
}// 
//  CFString.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// enum {   
//     kCFCompareCaseInsensitive       = 1, 
//     kCFCompareBackwards             = 4,
//     kCFCompareAnchored              = 8,
//     kCFCompareNonliteral            = 16,
//     kCFCompareLocalized             = 32,
//     kCFCompareNumerically           = 64,
//     kCFCompareDiacriticInsensitive  = 128,
//     kCFCompareWidthInsensitive      = 256,
//     kCFCompareForcedOrdering        = 512
// };
// typedef CFOptionFlags CFStringCompareFlags;


// extern CFStringRef CFStringCreateWithSubstring(CFStringRef str, CFRange range);
//
function CFStringCreateWithSubstring(str, range)
{
    
}

// extern CFStringRef CFStringCreateCopy(CFStringRef theString);
// 
function CFStringCreateCopy(theString)
{
    return new String(theString);
}

// extern CFStringRef CFStringCreateWithFormat (CFDictionaryRef formatOptions, CFStringRef format, ...);
// 
function CFStringCreateWithFormat(formatOptions, format, args)
{
    
}

// extern CFStringRef CFStringCreateWithFormatAndArguments(CFDictionaryRef formatOptions, CFStringRef format, void *arguments);
// 
function CFStringCreateWithFormatAndArguments(formatOptions, format, arguments)
{
    
}

// extern CFMutableStringRef CFStringCreateMutable(CFIndex maxLength);
// 
function CFStringCreateMutable(maxLength)
{
    return new String("");
}

// extern CFMutableStringRef CFStringCreateMutableCopy(CFIndex maxLength, CFStringRef theString);
// 
function CFStringCreateMutableCopy(maxLength, theString)
{
    return new String(theString);
}

// extern CFIndex CFStringGetLength(CFStringRef theString);
// 
function CFStringGetLength(theString)
{
    return theString.length;
}

// extern CFStringRef CFStringGetCharacterAtIndex(CFStringRef theString, CFIndex idx);
// 
function CFStringGetCharacterAtIndex(theString, idx)
{
    return theString.charAt(idx);
}

// extern void CFStringGetCharacters(CFStringRef theString, CFRange theRange, char *buffer);
// 
function CFStringGetCharacters(theString, theRange, buffer)
{
    
}

// extern CFStringRef CFStringCreateFromExternalRepresentation(CFDataRef theData)
// 
function CFStringCreateFromExternalRepresentation(theData)
{
    
}

// extern CFDataRef CFStringCreateExternalRepresentation(CFStringRef theString);
// 
function CFStringCreateExternalRepresentation(theString)
{
    
}

// extern CFComparisonResult CFStringCompareWithOptionsAndLocale(CFStringRef theString1, CFStringRef theString2, CFRange rangeToCompare, CFOptionFlags compareOptions, CFLocaleRef locale);
// 
function CFStringCompareWithOptionsAndLocale(theString1, theString2, rangeToCompare, compareOptions, locale)
{
    
}

// extern CFComparisonResult CFStringCompareWithOptions(CFStringRef theString1, CFStringRef theString2, CFRange rangeToCompare, CFOptionFlags compareOptions);
// 
function CFStringComapreWithOptions(theString1, theString2, rangeToComapre, compareOptions)
{
    
}

// extern CFComparisonResult CFStringCompare(CFStringRef theString1, CFStringRef theString2, CFOptionFlags compareOptions);
// 
function CFStringCompare(theString1, theString2, compareOptions)
{
    
}

// extern bool CFStringFindWithOptionsAndLocale(CFStringRef theString, CFStringRef stringToFind, CFRange rangeToSearch, CFOptionFlags searchOptions, CFLocaleRef locale, CFRange *result);
// 
function CFStringFindWithOptionsAndLocale(theString, stringToFind, rangeToSearch, searchOptions, locale, result)
{
    
}

// extern bool CFStringFindWithOptions(CFStringRef theString, CFStringRef stringToFind, CFRange rangeToSearch, CFOptionFlags searchOptions, CFRange *result);
// 
function CFStringFindWithOptions(theString, stringToFind, rangeToSearch, searchOptions, result)
{
    
}

// extern CFArrayRef CFStringCreateArrayWithFindResults(CFStringRef theString, CFStringRef stringToFind, CFRange rangeToSearch, CFOptionFlags compareOptions);
// 
function CFStringCreateArrayWithFindResults(theString, stringToFind, rangeToSearch, compareOptions)
{
    
}

// extern CFRange CFStringFind(CFStringRef theString, CFStringRef stringToFind, CFOptionFlags compareOptions);
// 
function CFStringFind(theString, stringToFind, compareOptions)
{
    
}

// extern bool CFStringHasPrefix(CFStringRef theString, CFStringRef prefix);
// 
function CFStringHasPrefix(theString, prefix)
{
    
}

// extern bool CFStringHasSuffix(CFStringRef theString, CFStringRef suffix);
// 
function CFStringHasSuffix(theString, suffix)
{
    
}

// extern CFStringRef CFStringCreateByCombiningStrings(CFArrayRef theArray, CFStringRef separatorString);
// 
function CFStringCreateByCombiningStrings(theArray, separatorString)
{
    
}

// extern CFArrayRef CFStringCreateArrayBySeparatingStrings(CFStringRef theString, CFStringRef separatorString);
// 
function CFStringCreateArrayBySeparatingStrings(theString, separatorString)
{
    
}

// extern int CFStringGetIntValue(CFStringRef str);
// 
function CFStringGetIntValue(str)
{
    
}

// extern double CFStringGetDoubleValue(CFStringRef str);
// 
function CFStringGetDoubleValue(str)
{
    
}

// extern void CFStringAppend(CFMutableStringRef theString, CFStringRef appendedString);
// 
function CFStringAppend(theString, appendedString)
{
    theString = theString + appendedString;
}

function CFStringByAppendingStrings(theFirst, theSecond)
{
    return theFirst + theSecond;
}

// extern void CFStringAppendFormat(CFMutableStringRef theString, CFDictionaryRef formatOptions, CFStringRef format, ...);
// 
function CFStringAppendFormat(theString, formatOptions, format, arguments)
{
    
}

// extern void CFStringAppendFormatAndArguments(CFMutableStringRef theString, CFDictionaryRef formatOptions, CFStringRef format, void *arguments);
// 
function CFStringAppendFormatAndArguments(theString, formatOptions, format, arguments)
{
    
}

// extern void CFStringInsert(CFMutableStringRef str, CFIndex idx, CFStringRef insertedStr);
// 
function CFStringInsert(str, idx, insertedString)
{
    
}

// extern void CFStringDelete(CFMutableStringRef theString, CFRange range);
// 
function CFStringDelete(theString, range)
{
    
}

// extern void CFStringReplace(CFMutableStringRef theString, CFRange range, CFStringRef replacement);
// 
function CFStringReplace(theString, range, replacement)
{
    
}

// extern void CFStringReplaceAll(CFMutableStringRef theString, CFStringRef replacement);
// 
function CFStringReplaceAll(theString, replacement)
{
    
}

// extern CFIndex CFStringFindAndReplace(CFMutableStringRef theString, CFStringRef stringToFind, CFStringRef replacementString, CFRange rangeToSearch, CFOptionFlags compareOptions);
// 
function CFStringFindAndReplace(theString, stringToFind, replacementString, rangeToSearch, compareOptions)
{
    
}

// extern void CFStringPad(CFMutableStringRef theString, CFStringRef padString, CFIndex length, CFIndex indexIntoPad);
// 
function CFStringPad(theString, padString, length, lengthIntoPad)
{
    
}

// extern void CFStringTrim(CFMutableStringRef theString, CFStringRef trimString);
// 
function CFStringTrim(theString, trimString)
{
    
}

// extern void CFStringTrimWhitespace(CFMutableStringRef theString);
// 
function CFStringTrimWhitespace(theString)
{
    
}

// extern void CFStringLowercase(CFMutableStringRef theString, CFLocaleRef locale);
// 
function CFStringLowecase(theString, locale)
{
    
}

// extern void CFStringUppercase(CFMutableStringRef theString, CFLocaleRef locale);
// 
function CFStringUppercase(theStirng, locale)
{
    
}

// extern void CFStringCapitalize(CFMutableStringRef theString, CFLocaleRef locale);
// 
function CFStringCapitalize(theString, locale)
{
    return theString.charAt(0).toUpperCase() + theString.substr(1);
}
