// 
//  NSNibConnector.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>

@interface NSNibConnector : NSObject
{
  id      _source;
  id      _destination;
  NSString   *_label;
}

- (id)source;
- (void)setSource:(id)source;
- (id)destination;
- (void)setDestination:(id)destination;
- (NSString *)label;
- (void)setLabel:(NSString *)label;
- (void)replaceObject:(id)oldObject withObject:(id)newObject;
- (void)establishConnection;

@end