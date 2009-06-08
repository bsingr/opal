// 
//  NSEnumerator.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-07.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSEnumerator.h"

@implementation NSEnumerator

- (id)initWithArray:(NSArray *)array
{
    _array = array;
    _currentIndex = 0;
    return self;
}

- (id)nextObject
{
    _currentIndex += 1;
    return [_array objectAtIndex:_currentIndex - 1];
}

@end


@implementation NSEnumerator (NSExtendedEnumerator)

- (NSArray *)allObjects
{
    return _array;
}

@end

