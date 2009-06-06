// 
//  bootstrap.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-04.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// These are for the compiler only. extern interfaces to objects defined outside
// any framework, and in the index.html file(s) created for an application. These
// objects provide a low level interface to the browser, that should only be used
// by objc framework and perhaps CoreFoundation

extern void *__bootstrap_bundles;

// Main entry point for every application. Once the objc framework has loaded, this
// function is called which initiates the bootstrap process, which carries out the
// following in order:
// 
// 1. Links all frameworks from index.html in the order listed by loading their 
// Info.plist file, storing it, and then loadinf the referenced application code.
// 
// 2. Links the main bundle, again as listed in index.html
// 
// 3. Sets environment arguments, such as locale etc.
// 
// 4. Calls main() which should ne defined within the user's application
extern void __bootstrap_main(void);
