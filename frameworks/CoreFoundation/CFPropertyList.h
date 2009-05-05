// 
//  CFPropertyList.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreFoundation/CFBase.h>
#import <CoreFoundation/CFData.h>
#import <CoreFoundation/CFString.h>

enum {
    kCFPropertyListImmutable = 0,
    kCFPropertyListMutableContainers,
    kCFPropertyListMutableContainersAndLeaves
};
typedef CFOptionFlags CFPropertyListMutabilityOptions;

extern CFPropertyListRef CFPropertyListCreateFromXMLData(CFDataRef xmlData, CFOptionFlags mutabilityOption, CFStringRef *errorString);
extern CFDataRef CFPropertyListCreateXMLData (CFPropertyListRef propertyList);

extern CFPropertyListRef CFPropertyListCreateFromJSONData(CFDataRef jsonData, CFOptionFlags mutabilityOption, CFStringRef *errorString);
extern CFDataRef CFPropertyListCreateJSONData (CFPropertyListRef propertyList);

extern CFPropertyListRef CFPropertyListCreateDeepCopy (CFPropertyListRef propertyList, CFOptionFlags mutabilityOption);

enum {
    kCFPropertyListOpenStepFormat = 1,
    kCFPropertyListXMLFormat_v1_0 = 100,
    kCFPropertyListBinaryFormat_v1_0 = 200
};
typedef CFIndex CFPropertyListFormat;

extern bool CFPropertyListIsValid (CFPropertyListRef plist, CFPropertyListFormat format);
