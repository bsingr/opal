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
        NSWindow *myWindow = [[NSWindow alloc] initWithContentRect:NSMakeRect(100,100,500,400) styleMask:(NSTexturedBackgroundWindowMask | NSMiniaturizableWindowMask) backing:nil defer:false];
	}
    
	return self;
}

@end

void dome(int (*ptr)(int, float))
{
    
}

void doSomething(void (^callback)(void))
{
    void a = ^(void){printf("ten");};
    
    doThis(^(int age, int height){
        printf(age, height);
    });
    
    [array each:^(id obj) {
        NSLog(obj);
    }];
}
typedef void (*CFArrayApplierFunction)(const void *value, void *context);


// void eatIt(CFArrayApplierFunction bob)
// {
//     bob();
// }