// 
//  NSNib.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSNib.h"

@implementation NSNib

- (id)initWithNibNamed:(NSString *)nibName bundle:(NSBundle *)bundle
{
    NSString *fullPathURL = "Resources/" + nibName + @".xib";
    NSLog("Tryign to open: " + fullPathURL);
    _data = [[NSData alloc] initWithContentsOfFile:fullPathURL];
    return self;
}

- (BOOL)instantiateNibWithOwner:(id)owner topLevelObjects: (NSArray *)topLevelObjects
{
    NSMutableDictionary *nameTable = [NSMutableDictionary dictionaryWithCapacity:2];
    // [nameTable setObject:owner forKey:@"NSNibOwner"];
    // [nameTable setObject:topLevelObjects forKey:@"NSTopLevelObjects"];
    _topLevelObjects = topLevelObjects;
    return [self instantiateNibWithExternalNameTable:nameTable];
}

- (BOOL)instantiateNibWithExternalNameTable:(NSDictionary *)externalNameTable
{
    // NSKeyedUnarchiver *unarchiver = [[NSKeyedUnarchiver alloc] initForReadingWithData:_data];
    // _data = unarchiver.data;
    // 
    // _objects = [NSMutableDictionary dictionaryWithCapacity:0];
    // 
    // _topLevelObjects = [unarchiver decodeObjectForKey:@"IBDocument.RootObjects"];
    // _connections = [unarchiver decodeConnectionObjects];
    // 
    // for (int i = 0; i < [_connections count]; i++)
    // {
    //     [[_connections objectAtIndex:i] instantiateConnection];
    // }
    
    return YES;
}

@end

