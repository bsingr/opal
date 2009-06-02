// 
//  NSWindowController.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSWindowController.h"


@implementation NSWindowController

- (id)initWithWindowNibName:(NSString *)windowNibName
{
    return [[NSWindowController alloc] initWithWindowNibName:windowNibName owner:self];
}

- (id)initWithWindowNibName:(NSString *)windowNibName owner:(id)owner
{
    [self init];
    
    if (self){
        _owner = owner;
        [NSBundle loadNibNamed:windowNibName owner:owner];
    }
    return self;
}

// - (IBAction)showWindow:(id)sender
// {
// 
// }

- (NSWindow *)window
{
    return _window;
}

- (void)close
{
    if (_window)
        [_window close];
}
- (id)owner
{
    return _owner;
}

@end

