#import <Foundation/NSObject.h>
#import <Foundation/NSGeometry.h>
#import <AppKit/NSMenuItem.h>

@class NSEvent, NSView, NSFont, NSMutableArray, NSArray;

@interface NSMenu : NSObject <NSCopying, NSCoding>
{
}

+ (void)popUpContextMenu:(NSMenu*)menu withEvent:(NSEvent*)event forView:(NSView*)view;
+ (void)popUpContextMenu:(NSMenu*)menu withEvent:(NSEvent*)event forView:(NSView*)view withFont:(NSFont*)font;

+ (void)setMenuBarVisible:(BOOL)visible;
+ (BOOL)menuBarVisible;

- (id)initWithTitle:(NSString *)aTitle;

- (void)setTitle:(NSString *)aString;
- (NSString *)title;

- (void)setSupermenu:(NSMenu *)supermenu;
- (NSMenu *)supermenu;

- (void)insertItem:(NSMenuItem *)newItem atIndex:(NSInteger)index;
- (void)addItem:(NSMenuItem *)newItem;
- (NSMenuItem *)insertItemWithTitle:(NSString *)aString action:(SEL)aSelector keyEquivalent:(NSString *)charCode atIndex:(NSInteger)index;
- (NSMenuItem *)addItemWithTitle:(NSString *)aString action:(SEL)aSelector keyEquivalent:(NSString *)charCode;
- (void)removeItemAtIndex:(NSInteger)index;
- (void)removeItem:(NSMenuItem *)item;
- (void)setSubmenu:(NSMenu *)aMenu forItem:(NSMenuItem *)anItem;

- (NSArray *)itemArray;
- (NSInteger)numberOfItems;

- (NSInteger)indexOfItem:(NSMenuItem *)index;
- (NSInteger)indexOfItemWithTitle:(NSString *)aTitle;
- (NSInteger)indexOfItemWithTag:(NSInteger)aTag;
- (NSInteger)indexOfItemWithRepresentedObject:(id)object;
- (NSInteger)indexOfItemWithSubmenu:(NSMenu *)submenu;
- (NSInteger)indexOfItemWithTarget:(id)target andAction:(SEL)actionSelector;

- (NSMenuItem *)itemAtIndex:(NSInteger)index;
- (NSMenuItem *)itemWithTitle:(NSString *)aTitle;
- (NSMenuItem *)itemWithTag:(NSInteger)tag;

- (void)setAutoenablesItems:(BOOL)flag;
- (BOOL)autoenablesItems;

- (BOOL)performKeyEquivalent:(NSEvent *)theEvent;
- (void)update;

- (void)setMenuChangedMessagesEnabled:(BOOL)flag;
- (BOOL)menuChangedMessagesEnabled;

- (void)itemChanged:(NSMenuItem *)item;

- (void)helpRequested:(NSEvent *)eventPtr;

- (void)setMenuRepresentation:(id)menuRep;
- (id)menuRepresentation;

- (void)setContextMenuRepresentation:(id)menuRep;
- (id)contextMenuRepresentation;

- (void)setTearOffMenuRepresentation:(id)menuRep;
- (id)tearOffMenuRepresentation;

- (BOOL)isTornOff;

- (NSMenu *)attachedMenu;
- (BOOL)isAttached;
- (void)sizeToFit;
- (NSPoint)locationForSubmenu:(NSMenu *)aSubmenu;

- (void)performActionForItemAtIndex:(NSInteger)index;

- (void)setDelegate:(id)anObject;
- (id)delegate;

- (CGFloat)menuBarHeight;

- (void)cancelTracking;

- (NSMenuItem *)highlightedItem;

- (void)setShowsStateColumn:(BOOL)showsState;
- (BOOL)showsStateColumn;

@end


@interface NSMenu(NSSubmenuAction)

- (void)submenuAction:(id)sender;

@end


@interface NSObject(NSMenuValidation)

- (BOOL)validateMenuItem:(NSMenuItem *)menuItem;

@end


@interface NSObject(NSMenuDelegate)

- (void)menuNeedsUpdate:(NSMenu*)menu;
- (NSInteger)numberOfItemsInMenu:(NSMenu*)menu;
- (BOOL)menu:(NSMenu*)menu updateItem:(NSMenuItem*)item atIndex:(NSInteger)index shouldCancel:(BOOL)shouldCancel;
- (BOOL)menuHasKeyEquivalent:(NSMenu*)menu forEvent:(NSEvent*)event target:(id*)target action:(SEL*)action;

- (void)menuWillOpen:(NSMenu *)menu;
- (void)menuDidClose:(NSMenu *)menu;

- (void)menu:(NSMenu *)menu willHighlightItem:(NSMenuItem *)item;

@end


extern NSString *NSMenuWillSendActionNotification;
extern NSString *NSMenuDidSendActionNotification;

extern NSString *NSMenuDidAddItemNotification;
extern NSString *NSMenuDidRemoveItemNotification;
extern NSString *NSMenuDidChangeItemNotification;

extern NSString *NSMenuDidBeginTrackingNotification;
extern NSString *NSMenuDidEndTrackingNotification;
