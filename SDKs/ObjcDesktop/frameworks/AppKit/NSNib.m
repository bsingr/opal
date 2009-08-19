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
  
  [NSData dataWithContentsOfURL:fullPathURL didLoadBlock:^(NSData *data) {
    // data object is passed as parameter. Set here as return value is
    // not set of NSData function until callback block is finished.
    _data = data;
  }];
  
  return self;
}

- (BOOL)instantiateNibWithOwner:(id)owner topLevelObjects: (NSArray *)topLevelObjects
{
  NSMutableDictionary *nameTable = [NSMutableDictionary dictionaryWithObjectsAndKeys:owner, @"NSNibOwner", topLevelObjects, @"NSTopLevelObjects", nil];
  _topLevelObjects = topLevelObjects;
  return [self instantiateNibWithExternalNameTable:nameTable];
}

- (BOOL)instantiateNibWithExternalNameTable:(NSDictionary *)externalNameTable
{
  NSKeyedUnarchiver *unarchiver = [NSKeyedUnarchiver unarchiveObjectWithData:_data];
  
  _topLevelObjects = [unarchiver decodeObjectForKey:@"IBDocument.RootObjects"];
  NSLog(_topLevelObjects);
  
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
  //   [[_connections objectAtIndex:i] instantiateConnection];
  // }
  
  return YES;
}

@end

