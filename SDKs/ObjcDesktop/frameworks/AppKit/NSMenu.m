// 
//  NSMenu.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSMenu.h"


@implementation NSMenu

// MARK: Managing the menu bar
+ (BOOL)menuBarVisible{}
+ (void)setMenuBarVisible:(BOOL)visible{}
+ (NSInteger)menuBarHeight
{
    return 29;
}

// MARK: Creating an NSMenu object
- (id)init
{
    [super init];
    _title = @"";
    _itemArray = [NSMutableArray arrayWithCapacity:0];
    return self;
}

- (id)initWithTitle:(NSString *)aTitle
{
    [self init];
    _title = aTitle;
    return self;
}

- (id)initWithCoder:(NSCoder *)aCoder
{
    _title = [aCoder decodeObjectForKey:@"NSTitle"];
    _name = [aCoder decodeObjectForKey:@"NSName"];
    _itemArray = [aCoder decodeObjectForKey:@"NSMenuItems"];
    
    return self;
}

// MARK: Setting up menu commands
- (void)insertItem:(NSMenuItem *)newItem atIndex:(NSInteger)index
{
    [self addItem:newItem];
}

- (NSMenuItem *)insertItemWithTitle:(NSString *)aString action:(SEL)aSelector keyEquivalent:(NSString *)keyEquiv atIndex:(NSInteger)index
{
    [self addItemWithTitle:aString action:aSelector keyEquivalent:keyEquiv];
}

- (void)addItem:(NSMenuItem *)newItem
{
    [_itemArray addObject:newItem];
    [newItem setMenu:self];
}

- (NSMenuItem *)addItemWithTitle:(NSString *)aString action:(SEL)aSelector keyEquivalent:(NSString *)keyEquiv
{
    NSMenuItem *newItem = [[NSMenuItem alloc] initWithTitle:aString action:aSelector keyEquivalent:keyEquiv];
    [self addItem:newItem];
    return newItem;
}
- (void)removeItem:(NSMenuItem *)anItem{}
- (void)removeItemAtIndex:(NSInteger)index{}
- (void)itemChanged:(NSMenuItem *)anObject{}

// MARK: Finding menu items
- (NSMenuItem *)itemWithTag:(NSInteger)aTag{}
- (NSMenuItem *)itemWithTitle:(NSString *)aString{}

- (NSMenuItem *)itemAtIndex:(NSInteger)index
{
    return [_itemArray objectAtIndex:index];
}

- (NSInteger)numberOfItems
{
    return [_itemArray count];
}
- (NSArray *)itemArray
{
    return _itemArray;
}

// MARK: Finding indices of Menu items
- (NSInteger)indexOfItem:(NSMenuItem *)anObject{}
- (NSInteger)indexOfItemWithTitle:(NSString *)aTitle{}
- (NSInteger)indexOfItemWithTag:(NSInteger)aTag{}
- (NSInteger)indexOfItemWithTarget:(id)anObject andAction:(SEL)actionSelector{}
- (NSInteger)indexOfItemWithRepresentedObject:(id)anObject{}
- (NSInteger)indexOfItemWithSubmenu:(NSMenu *)anObject{}

// MARK: Managing submens
- (void)setSubmenu:(NSMenu *)aMenu forItem:(NSMenuItem *)anItem{}
- (void)submenuAction:(id)sender{}
- (NSMenu *)attachedMenu{}
- (BOOL)isAttached{}
- (NSPoint)locationForSubmenu:(NSMenu *)aSubmenu{}
- (NSMenu *)supermenu{}
- (void)setSupermenu:(NSMenu *)supermenu{}
- (BOOL)isTornOff{}

// MARK: Enabling and disabling menu items
- (BOOL)autoenablesItems{}
- (void)setAutoenablesItems:(BOOL)flag{}
- (void)update{}

// MARK: Handling keyboard equivalents
- (BOOL)performKeyEquivalent:(NSEvent *)theEvent{}

// MARK: Simulating mouse clicks
- (void)performActionForItemAtIndex:(NSInteger)index{}

// MARK: Managing the title
- (void)setTitle:(NSString *)aString{}
- (NSString *)title{}

// MARK: Updating menu layout
- (BOOL)menuChangedMessagesEnabled{}
- (void)setMenuChangedMessagesEnabled:(BOOL)flag{}
- (void)sizeToFit{}

// MARK: Displaying context sensitive help
+ (void)popUpContextMenu:(NSMenu *)menu withEvent:(NSEvent *)event forView:(NSView *)view{}
+ (void)popUpContextMenu:(NSMenu *)menu withEvent:(NSEvent *)event forView:(NSView *)view withFont:(NSFont *)font{}
- (void)helpRequested:(NSEvent *)event{}

// MARK: Managing display of the state column
- (void)setShowsStateColumn:(BOOL)showsState{}
- (BOOL)showsStateColumn{}

// MARK: Handling highlight
- (NSMenuItem *)highlightedItem{}

// MARK: Managing the delegate
- (void)setDelegate:(id)anObject{}
- (id)delegate{}

@end

