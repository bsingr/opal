// 
//  NSScrollView.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSView.h>
#import <AppKit/NSScroller.h>

@interface NSScrollView : NSView {
  
  NSView    *_verticalScroller;
  NSView    *_horizontalScroller;
  NSView    *_clipView;
  NSView    *_headerClipView;
  NSView    *_cornerView;
  
  BOOL     _hasVerticalScroller;
  BOOL     _hasHorizontalScroller;
  
  NSInteger  _borderType;
  
  NSView    *_contentView;
}

- (void)tile;

@end
