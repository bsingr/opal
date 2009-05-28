// 
//  NSMenuView.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSMenuView.h"
#import <AppKit/NSMenuItemCell.h>


@implementation NSMenuView

// MARK: Initializing a menu view
- (id)initWithMenu:(NSMenu *)aMenu
{
    [self initWithFrame:NSMakeRect(0, 0, 0, 0)];
    
    _menu = aMenu;
    _highlightedItemIndex = -1;
    
    [self setMenuItemCell:[[NSMenuItemCell alloc] init] forItemAtIndex:0];
    
    return self;
}

- (void)drawRect:(NSRect)aRect
{   
    if (_menu)
    {
        for (int i = 0; i < [[_menu itemArray] count]; i ++)
        {
            NSMenuItemCell *currentItemCell = [self menuItemCellForItemAtIndex:i];
            [currentItemCell setMenuItem:[[_menu itemArray] objectAtIndex:i]];
            [currentItemCell setMenuView:self];
            
            if (i == [self highlightedItemIndex])
                [currentItemCell setHighlighted:YES];
            else
                [currentItemCell setHighlighted:NO];
            
            [currentItemCell drawWithFrame:[self rectOfItemAtIndex:i] inView:self];
        }
    }
}

- (void)mouseDown:(NSEvent *)theEvent
{
    NSPoint aPoint = [self convertPoint:[theEvent locationInWindow] fromView:_superview];
    NSInteger *selectedIndex = [self indexOfItemAtPoint:aPoint];
    
    //[self setHighlightedItemIndex:selectedIndex];
    //[self setNeedsDisplay:YES];
    
    
    _eventBindingMenuArray = [NSMutableArray arrayWithCapacity:0];
    [_eventBindingMenuArray addObject:self];
    
    [self setHighlightedItemIndex:selectedIndex];
    [_eventBindingMenuArray addObject:[self attachSubmenuForItemAtIndex:selectedIndex]];
    [self setNeedsDisplay:YES];
    
    
    
    [[NSApplication sharedApplication] nextEventMatchingMask:(NSLeftMouseUpMask | NSMouseMovedMask) untilDate:nil inMode:nil dequeue:nil withTarget:self withSelector:@selector(_mouseDownMenuHandle:)];

    //[self _mouseDownMenuHandle:theEvent];
}

- (void)_mouseDownMenuHandle:(NSEvent *)theEvent
{    
    NSInteger visibleMenus = [_eventBindingMenuArray count];
    
    for (int i = (visibleMenus - 1); -1 < i; i--)
    {
        NSMenuView *menuToCheck = [_eventBindingMenuArray objectAtIndex:i];
        NSPoint pointInMenuView = [menuToCheck convertPoint:[theEvent locationInWindow] fromView:nil];
        
        if (NSPointInRect ([theEvent locationInBase], [[menuToCheck window] frame]))
        {            
            NSInteger theItemIndex = [menuToCheck indexOfItemAtPoint:pointInMenuView];
            
            if ([theEvent type] == NSLeftMouseUp)
            {
                NSMenuItem *theSelectedItem = [[menuToCheck menu] itemAtIndex:theItemIndex];
                
                if ([theSelectedItem isEnabled] && ![theSelectedItem hasSubmenu])
                {
                    [[NSApplication sharedApplication] sendAction:[theSelectedItem action] to:[theSelectedItem target] from:self];
                }
                
                [self detachSubmenu];
                _eventBindingMenuArray = nil;
                [self setHighlightedItemIndex:(-1)];
                [self setNeedsDisplay:YES];
                return;
            }
            
            else if ([theEvent type] == NSMouseMoved)
            {
                if (theItemIndex != [menuToCheck highlightedItemIndex])
                {
                    [_eventBindingMenuArray removeObject:[menuToCheck attachedMenuView]];
                    [menuToCheck detachSubmenu];
                    
                    [menuToCheck setHighlightedItemIndex:theItemIndex];
                    
                    if (theItemIndex != -1)
                    {
                        if ([[[menuToCheck menu] itemAtIndex:theItemIndex] hasSubmenu])
                        {
                            [_eventBindingMenuArray addObject:[menuToCheck attachSubmenuForItemAtIndex:theItemIndex]];
                        }
                    }
                    
                    [menuToCheck setNeedsDisplay:YES];
                }
                
                [[NSApplication sharedApplication] nextEventMatchingMask:(NSLeftMouseUpMask | NSMouseMovedMask) untilDate:nil inMode:nil dequeue:nil withTarget:self withSelector:@selector(_mouseDownMenuHandle:)];
                //return;
            }
            
            return;
        }
        else if ([theEvent type] == NSLeftMouseUp)
        {
            [self detachSubmenu];
            [self setHighlightedItemIndex:(-1)];
            [self setNeedsDisplay:YES];
        }
        //else 
    }
    if ([theEvent type] == NSMouseMoved)
    {
        [[NSApplication sharedApplication] nextEventMatchingMask:(NSLeftMouseUpMask | NSMouseMovedMask) untilDate:nil inMode:nil dequeue:nil withTarget:self withSelector:@selector(_mouseDownMenuHandle:)];
    }
    
}

// MARK: Managing menu view attributes
- (void)setMenu:(NSMenu *)menu
{
    _menu = menu;
}

- (NSMenu *)menu
{
    return _menu;
}

- (void)setHorizontal:(BOOL)flag
{
    _isHorizontal = flag;
}

- (BOOL)isHorizontal
{
    return _isHorizontal;
}

- (void)setFont:(NSFont *)font
{
}

- (NSFont *)font
{
}

- (void)setHighlightedItemIndex:(NSInteger)index
{
    _highlightedItemIndex = index;
    
}

- (NSInteger)highlightedItemIndex
{
    return _highlightedItemIndex;
}

- (void)setMenuItemCell:(NSMenuItemCell *)cell forItemAtIndex:(NSInteger)index
{
    _menuItemCell = cell;
    [cell setMenuView:self];
}

- (NSMenuItemCell *)menuItemCellForItemAtIndex:(NSInteger)index
{
    return _menuItemCell;
}

- (NSMenuView *)attachedMenuView
{
    return _attatchedMenuView;
}

- (NSMenu *)attachedMenu
{
    return _attatchedMenu;
}

- (BOOL)isAttached
{
}

- (BOOL)isTornOff
{
}

- (NSInteger)horizontalEdgePadding
{
}

- (void)setHorizontalEdgePadding:(NSInteger)pad
{}

// MARK: Responding to notifications
- (void)itemChanged:(NSNotification *)notification
{

}

- (void)itemAdded:(NSNotification *)notification
{
}

- (void)itemRemoved:(NSNotification *)notification
{
}

// MARK: Working with submenus
- (void)detachSubmenu
{
    if ([self attachedMenu])
    {
        [_attatchedMenuView detachSubmenu];
        [[_attatchedMenuView window] close];
        
        _attatchedMenu = nil;
        _attatchedMenuView = nil;
    }
}

- (NSMenuView *)attachSubmenuForItemAtIndex:(NSInteger)index
{
    NSMenuItem *theMenuItem = [[_menu itemArray] objectAtIndex:index];
    NSMenu *theSubmenu = [theMenuItem submenu];
    
    if (!theSubmenu)
        return;
    
    _attatchedMenu = theSubmenu;
    _attatchedMenuView = [[NSMenuView alloc] initWithMenu:_attatchedMenu];
    [_attatchedMenuView sizeToFit];
    
    
    NSRect screenRect = [[NSScreen mainScreen] frame];
    NSRect windowFrame = NSMakeRect ([self rectOfItemAtIndex:index].origin.x + 12, 
                                     screenRect.size.height - [_attatchedMenuView frame].size.height - [NSMenu menuBarHeight] + 1, 
                                     [_attatchedMenuView frame].size.width, 
                                     [_attatchedMenuView frame].size.height);
    
    //NSRect windowFrame = [_attatchedMenuView frame];
    
    NSWindow *_menuWindow = [[NSMenuWindow alloc] initWithContentRect:windowFrame styleMask:NSBorderlessWindowMask backing:nil defer:NO];
    [_menuWindow setLevel:NSMainMenuWindowLevel];
    [_menuWindow setContentView:_attatchedMenuView];
    return _attatchedMenuView;
}

// MARK: Calculating menu geometry
- (void)update
{
}

- (void)setNeedsSizing:(BOOL)flag
{
}

- (BOOL)needsSizing
{
}

- (void)sizeToFit
{
    NSRect boundsRect = NSMakeRect (0, 0, 0, 0);
    
    for (int i = 0; i < [[_menu itemArray] count]; i++)
    {
        NSRect currentMenuBounds = [self rectOfItemAtIndex:i];
        
        if ([self isHorizontal])
        {
            boundsRect.size.width = boundsRect.size.width + currentMenuBounds.size.width;
            boundsRect.size.height = [NSMenu menuBarHeight];
        }
        else
        {
            boundsRect.size.height = boundsRect.size.height + currentMenuBounds.size.height;
            boundsRect.size.width = 200;
        }
    }
    
    _innerRect = boundsRect;
    
    [self setFrame:NSMakeRect (12,1,_innerRect.size.width, _innerRect.size.height)];
    
    //[self setNeedsDisplay:YES];
}

- (NSInteger)stateImageOffset
{
}

- (NSInteger)stateImageWidth
{
}

- (NSInteger)imageAndTitleOffset
{
}

- (NSInteger)imageAndTitleWidth
{
}

- (NSInteger)keyEquivalentOffset
{
}

- (NSInteger)keyEquivalentWidth
{
}

- (NSRect)innerRect
{
    return _innerRect;
}

- (NSRect)rectOfItemAtIndex:(NSInteger)index
{
    NSRect itemRect;
    
    if ([self isHorizontal])
    {
        NSInteger yOffset = 0;
        NSInteger xOffset = index * 85;
        itemRect = NSMakeRect (xOffset, yOffset, 85, [NSMenu menuBarHeight]);
    }
    else
    {
        NSInteger totalHeight = [_menu numberOfItems] * 22;
        NSInteger yOffset = totalHeight - ((index + 1) * 22);
        NSInteger xOffset = 0;
        itemRect = NSMakeRect (xOffset, yOffset, 200, 22);
    }   
    
    return itemRect;
}

- (NSInteger)indexOfItemAtPoint:(NSPoint)point
{
    if ([self isHorizontal])
    {
        for (int i = 0; i < [[_menu itemArray] count]; i++)
        {
            if (NSPointInRect (point, [self rectOfItemAtIndex:i]))
                return i;
        }
        
        return -1;
    }
    else
    {
        for (int i = 0; i < [[_menu itemArray] count]; i++)
        {
            if (NSPointInRect (point, [self rectOfItemAtIndex:i]))
                return i;
        }
        
        return -1;
    }
}

- (void)setNeedsDisplayForItemAtIndex:(NSInteger)index
{
}

- (NSPoint)locationForSubmenu:(NSMenu *)aSubmenu
{
}

- (void)setWindowFrameForAttachingToRect:(NSRect)screenRect onScreen:(NSScreen *)screen preferredEdge:(void)edge popUpSelectedItem:(NSInteger)selectedItemIndex
{
}

// MARK: Handling events
- (void)performActionWithHighlightingForItemAtIndex:(NSInteger)index
{
}

- (BOOL)trackWithEvent:(NSEvent *)event
{
}


@end

