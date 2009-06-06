// 
//  AppController.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-18.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "AppController.h"

@implementation AppController

- (id)init
{
    [super init];
    
    if (self) {
        NSWindow *myWindow = [[NSWindow alloc] initWithContentRect:NSMakeRect(100,100,100,100) styleMask:(NSTexturedBackgroundWindowMask | NSMiniaturizableWindowMask) backing:nil defer:false];
	}
    
	return self;
}

@end