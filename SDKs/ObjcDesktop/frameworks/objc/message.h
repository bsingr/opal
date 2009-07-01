// 
//  message.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-04.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <objc/objc.h>
#import <objc/runtime.h>


struct objc_super {
    id receiver;
    Class super_class;
};

extern id objc_msgSend(id self, SEL op, ...);
extern id objc_msgSendSuper(struct objc_super *super, SEL op, ...);
