// 
//  NSToolbar.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSToolbar.h"

@implementation NSToolbar

- (id)initWithIdentifier:(NSString *)identifier {
	[self init];
	
  if (self) {
  	_toolbarView = [[NSToolbarView alloc] initWithFrame:NSMakeRect(0,0,10,10)];
    
    _identifier = identifier;
    _visible = YES;
    _items = [[NSMutableArray alloc] initWithCapacity:0];
    _labels = [[NSMutableArray alloc] initWithCapacity:0];  
  }
	return self;
}

- (NSUInteger)height {
	return _height;
}

- (id)reloadToolbarItems {
	// start talking to delegate to get toolbar items etc
	// Should call toolbarAllowedItemIdentifiers: .. but for now, no custimization allowed
	
	if ([_delegate respondsToSelector:@selector(toolbarDefaultItemIdentifiers:)])
		_itemIdentifiers = [_delegate toolbarDefaultItemIdentifiers:self];
	else
		_itemIdentifiers = nil;
	
	NSUInteger totalItems = [_itemIdentifiers count];
	NSUInteger i;
	
	for (i = 0; i < totalItems; i++)
	{
		NSString *identifier = [_itemIdentifiers objectAtIndex:i];
		NSToolbarItem *item = [_delegate toolbar:self itemForItemIdentifier:identifier willBeInsertedIntoToolbar:YES];
		[item setDisplayMode:_displayMode];
		
		if (!item)
			NSLog(@"Returned item was nil");
		else
		{
			[_items addObject:item];
      [item setToolbar:self];
			[_DOMElement appendChild:[item DOMElement]];
		}
	}
}

- (NSToolbarDisplayMode)displayMode {
	return _displayMode;
}

- (void)setDisplayMode:(NSToolbarDisplayMode)displayMode {
	_displayMode = displayMode;
  _height = 56;
}

- (BOOL)showsBaselineSeparator {
  return _showsBaselineSeparator;
}

- (void)setShowsBaselineSeparator:(BOOL)flag {
	_showsBaselineSeparator = flag;
}

- (NSString *)identifier {
	return _identifier;
}

- (NSArray *)items {
	return _items;
}

- (NSArray *)visibleItems {
	return _items;
}

- (id)delegate {
	return _delegate;
}

- (void)setDelegate:(id)delegate {
	_delegate = delegate;
	[self reloadToolbarItems];
}

- (void)insertItemWithItemIdentifier:(NSString *)itemIdentifier atIndex:(NSInteger)index {
	
}

- (void)removeItemAtIndex:(NSInteger)index {
	
}

- (void)setSelectedItemIdentifier:(NSString *)itemIdentifier {
	
}

- (NSString *)selectedItemIdentifier {
	
}

- (BOOL)isVisible {
	return _visible;
}

- (void)setVisible:(BOOL)shown {
	_visible = shown;
}

- (NSView *)toolbarView {
  return _toolbarView;
}

@end

@interface NSToolbarView : NSView {
  NSString *name;
}

@end


@implementation NSToolbarView

- (id)initWithFrame:(NSRect)frameRect {
  [super initWithFrame:frameRect];
  if (self) {
    [self setFrameSize:NSMakeSize(300,56)];
  }
  return self;
}

- (void)drawRect:(NSRect)dirtyRect {
  
  NSBezierPath *bottomPath = [NSBezierPath bezierPath];
  [bottomPath setLineWidth:1];
  
  [[NSColor colorWithCalibratedRed:0.322 green:0.322 blue:0.322 alpha:1.0] set];
  [bottomPath moveToPoint:NSMakePoint(0,_frame.size.height)];
  [bottomPath lineToPoint:NSMakePoint(_frame.size.width, _frame.size.height)];
  [bottomPath stroke];
}

@end

