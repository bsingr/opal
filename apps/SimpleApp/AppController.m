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
    self = [super init];
    
    if (self) {
	}
    
	return self;
}

@end

void dome(int (*ptr)(int, float))
{
    
}

void doSomething(void (^callback)(void))
{
    void *a = ^{printf("ten");};
    
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