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
        NSWindow *myWindow = [[NSWindow alloc] initWithContentRect:NSMakeRect(100,100,100,100) styleMask:10 backing:nil defer:false];
    
		
		NSArray *myArray = [NSArray arrayWithObjects:20, 30];
	}
    
	return self;
}

@end