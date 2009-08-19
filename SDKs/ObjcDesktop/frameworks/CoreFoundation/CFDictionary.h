// 
//  CFDictionary.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreFoundation/CFBase.h>

typedef struct {
  CFStringRef _keys[];
  void *_values[];
  CFIndex _count;
} CFDictionaryRef;

typedef struct {
  CFStringRef _keys[];
  void *_values[];
  CFIndex _count;
} CFMutableDictionaryRef;

extern CFDictionaryRef CFDictionaryCreate(void **keys, void **values);
extern CFDictionaryRef CFDictionaryCreateCopy(CFDictionaryRef theDict);

extern CFMutableDictionaryRef CFDictionaryCreateMutable();
extern CFMutableDictionaryRef CFDictionaryCreateMutableCopy(CFDictionaryRef theDict);

extern CFIndex CFDictionaryGetCount(CFDictionaryRef theDict);
extern CFIndex CFDictionaryGetCountOfKey(CFDictionaryRef theDict, void *key);
extern CFIndex CFDictionaryGetCountOfValue(CFDictionaryRef theDict, void *value);

extern bool CFDictionaryContainsKey(CFDictionaryRef theDict, void *key);
extern bool CFDictionaryContainsValue(CFDictionaryRef theDict, void *value);
extern void *CFDictionaryGetValue(CFDictionaryRef theDict, void *key);

extern bool CFDictionaryGetValueIfPresent(CFDictionaryRef theDict, void *key, void **value);
extern void CFDictionaryGetKeysAndValues(CFDictionaryRef theDict, void **keys, void **values);

extern void CFDictionaryAddValue(CFMutableDictionaryRef theDict, void *key, void *value);
extern void CFDictionarySetValue(CFMutableDictionaryRef theDict, void *key, void *value);

extern void CFDictionaryReplaceValue(CFMutableDictionaryRef theDict, void *key, void *value);
extern void CFDictionaryRemoveValue(CFMutableDictionaryRef theDict, void *key);
extern void CFDictionaryRemoveAllValues(CFMutableDictionaryRef theDict);
