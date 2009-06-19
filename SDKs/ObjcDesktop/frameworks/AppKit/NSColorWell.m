// 
//  NSColorWell.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSColorWell.h"


@implementation NSColorWell

- (id)initWithCoder:(NSCoder *)aCoder
{
    _value = [NSColor colorWithCalibratedRed:0 green:0.3 blue:0.8 alpha:1.0];
    [super initWithCoder:aCoder];
    
    return self;
}

- (void)mouseDown:(id)sender
{
    NSLog(@"NSColorWell - orderFront color picker");
}

- (void)mouseUp:(id)sender
{
    
}

- (void) drawRect:(NSRect)bounds
{
    [[NSColor colorWithCalibratedRed:0.851 green:0.851 blue:0.851 alpha:1.0] set];
    [NSBezierPath strokeRect:NSMakeRect (bounds.origin.x + 0.5, bounds.origin.y + 0.5, bounds.origin.x + bounds.size.width - 1, bounds.origin.y + bounds.size.height - 1)];
    
    [[NSColor colorWithCalibratedRed:0.996 green:0.996 blue:0.996 alpha:1.0] set];
    [NSBezierPath fillRect:NSMakeRect (bounds.origin.x + 1, bounds.origin.y + 1, bounds.origin.x + bounds.size.width -2, bounds.origin.y + bounds.size.height - 2)];
    
    [_value set];
    [NSBezierPath fillRect:NSMakeRect (bounds.origin.x + 4, bounds.origin.y + 4, bounds.origin.x + bounds.size.width - 8, bounds.origin.y + bounds.size.height - 8)];
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
    if (context == @"value")
    {
        _value = [object valueForKey:keyPath];
        [self setNeedsDisplay:YES];
    }
    else if (context == @"hidden")
    {
        [_cell setHidden:[object valueForKey:keyPath]];
        [self setNeedsDisplay:YES];
    }
    else if (context == @"enabled")
    {
        [_cell setEnabled:[object valueForKey:keyPath]];
        [self setNeedsDisplay:YES];
    }
    else
    {
        [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
    }
}

@end
