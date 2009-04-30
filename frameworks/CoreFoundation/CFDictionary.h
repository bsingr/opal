#import <CoreFoundation/CFBase.h>

typedef __CFDictionary *CFDictionaryRef;
typedef __CFDictionary *CFMutableDictionaryRef;

extern CFDictionaryRef CFDictionaryCreate(void **keys, void **values);
extern CFDictionaryRef CFDictionaryCreateCopy(CFDictionaryRef theDict);

extern CFMutableDictionaryRef CFDictionaryCreateMutable();
extern CFMutableDictionaryRef CFDictionaryCreateMutableCopy(CFDictionaryRef theDict);

extern CFIndex CFDictionaryGetCount(CFDictionaryRef theDict);
extern CFIndex CFDictionaryGetCountOfKey(CFDictionaryRef theDict, void *key);
extern CFIndex CFDictionaryGetCountOfValue(CFDictionaryRef theDict, void *value);


