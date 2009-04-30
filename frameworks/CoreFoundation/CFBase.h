typedef unsigned long CFTypeID;
typedef unsigned long CFOptionsFlags;
typedef unsigned long CFHashCode;
typedef signed long CFIndex;

typedef const void *CFTypeRef;

typedef __CFString *CFStringRef;
typedef __CFString *CFMutableStringRef;

typedef CFTypeRef CFPropertyListRef;

enum {
    kCFCompareLessThan = -1,
    kCFCompareEqualTo = 0,
    kCFCompareGreaterThan = 1
};
typedef CFIndex CFComparisonResult;

typedef struct {
    CFIndex location;
    CFIndex length;
} CFRange;

extern CFRange CFRangeMake(CFIndex loc, CFIndex len);