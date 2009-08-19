// 
//  NSWindowTemplate.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-08.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/Foundation.h>
#import <AppKit/NSView.h>

@interface NSWindowTemplate : NSObject
{
  NSSize    _maxSize;
  NSSize    _minSize;
  NSRect    _screenRect;
  
  id      _viewClass;
  NSUInteger  _wtFlags;
  NSUInteger  _windowBacking;
  NSString   *_windowClass;
  NSRect    _windowRect;
  
  NSString   *_windowTitle;
  NSView   *_windowView;
  
  int     _styleMask;
  NSString   *_windowAutosave;
}

@end
