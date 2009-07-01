// 
//  _NSCornerView.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSView.h>

@interface _NSCornerView : NSView {

}

@end


@implementation _NSCornerView
{

}

- (id)initWithCoder:(NSCoder *)aCoder
{
    [super initWithCoder:aCoder];
    return self;	
}

- (id)initWithFrame:(NSRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code here.
    }
    return self;
}

- (void)drawRect:(NSRect)rect {
    // Drawing code here
}

@end