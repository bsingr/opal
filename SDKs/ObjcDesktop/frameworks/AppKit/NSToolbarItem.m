// 
//  NSToolbarItem.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSToolbarItem.h"

@implementation NSToolbarItem

- (id)initWithItemIdentifier:(NSString *)itemIdentifier
{	
	[self init];
  
  if (self) {
    _itemIdentifier = itemIdentifier;
    _minSize = NULL;
    _maxSize = NULL;
  }
  
	return self;
}

- (void)drawRect:(NSRect)dirtyRect
{
}

- (void)setNeedsDisplay:(BOOL)flag
{
  [self drawRect:nil];
}

- (void)setNeedsDisplayInRect:(NSRect)invalidRect
{
  [self setNeedsDisplay:YES];
}

- (void)setLeftOffset:(NSInteger)left
{
  // _leftOffset = left;
}

- (void)mouseDown:(NSEvent *)theEvent
{
	NSLog("[NSToolbarItem mouseDown]");
}

- (void)mouseUp:(NSEvent *)theEvent
{
  NSLog("[NSToolbarItem mouseDown]");
	//[NSApp sendAction:_action to:_target from:self];
}

- (NSToolbarDisplayMode)displayMode
{
	return _displayMode;
}

- (void)setDisplayMode:(NSToolbarDisplayMode)displayMode
{
	_displayMode = displayMode;
}

- (NSString *)itemIdentifier
{
	return _itemIdentifier;
}

- (NSToolbar *)toolbar
{
	return _toolBar;
}

- (void)setToolbar:(NSToolbar *)toolbar
{
  _toolBar = toolbar;
  [self setNeedsDisplay:YES];
}

- (NSString *)label
{
	return _label;
}

- (void)setLabel:(NSString *)label
{
	_label = label;
  [self setNeedsDisplay:YES];
}

- (NSString *)toolTip
{
	return _toolTip;
}

- (void)setToolTip:(NSString *)toolTip
{
	_toolTip = toolTip;
}

- (NSInteger)tag
{
	return _tag;
}

- (void)setTag:(NSInteger)tag
{
	_tag = tag;
}

- (id)target
{
	return _target;
}

- (void)setTarget:(id)target
{
	_target = target;
}

- (SEL)action
{
	return _action;
}

- (void)setAction:(SEL)action
{
	_action = action;
}

- (BOOL)isEnabled
{
	return _isEnabled;
}

- (void)setEnabled:(BOOL)enabled
{
	_isEnabled = enabled;
  [self setNeedsDisplay:YES];
}

- (NSImage *)image
{
	return _image;
}

- (void)setImage:(NSImage *)image
{
	_image = image;
	//[[_image actualImage] addClassName:@"NSToolbar_image"];
  [self setNeedsDisplay:YES];
}

- (NSView *)view
{
	return _view;
}

- (void)setView:(NSView *)view
{
	_view = view;
}

- (NSSize)minSize
{
	return _minSize;
}

- (void)setMinSize:(NSSize)size
{
	_minSize = size;
}

- (NSSize)maxSize
{
	return _maxSize;
}

- (void)setMaxSize:(NSSize)size
{
	_maxSize = size;
}

@end
