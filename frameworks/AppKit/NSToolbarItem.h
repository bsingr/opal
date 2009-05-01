#import <AppKit/NSText.h>
#import <AppKit/NSToolbar.h>
#import <Foundation/Foundation.h>

@class NSToolbarItemViewer, NSMenuItem, NSView, NSImage;

enum {
   NSToolbarItemVisibilityPriorityStandard  = 0,
   NSToolbarItemVisibilityPriorityLow       = -1000,
   NSToolbarItemVisibilityPriorityHigh      = 1000,
   NSToolbarItemVisibilityPriorityUser      = 2000
};

extern NSString *NSToolbarSeparatorItemIdentifier;
extern NSString *NSToolbarSpaceItemIdentifier;
extern NSString *NSToolbarFlexibleSpaceItemIdentifier;

extern NSString *NSToolbarShowColorsItemIdentifier;
extern NSString *NSToolbarShowFontsItemIdentifier;
extern NSString *NSToolbarCustomizeToolbarItemIdentifier;
extern NSString *NSToolbarPrintItemIdentifier;

@interface NSToolbarItem : NSObject
{
}

- (id)initWithItemIdentifier:(NSString *)itemIdentifier;

- (NSString *)itemIdentifier;
- (NSToolbar *)toolbar;

- (void)setLabel:(NSString *)label;
- (NSString *)label;

- (void)setPaletteLabel:(NSString *)paletteLabel;
- (NSString *)paletteLabel;

- (void)setToolTip:(NSString*)toolTip;
- (NSString *)toolTip;

- (void)setMenuFormRepresentation:(NSMenuItem *)menuItem;
- (NSMenuItem *)menuFormRepresentation;

- (void)setTag:(NSInteger)tag;  
- (NSInteger)tag;

- (void)setTarget:(id)target;
- (id)target;

- (void)setAction:(SEL)action;
- (SEL)action;

- (void)setEnabled:(BOOL)enabled;
- (BOOL)isEnabled;

- (void)setImage:(NSImage*)image;
- (NSImage *)image;

- (void)setView:(NSView *)view;
- (NSView *)view;

- (void)setMinSize:(NSSize)size;
- (NSSize)minSize;

- (void)setMaxSize:(NSSize)size;
- (NSSize)maxSize;


- (void)setVisibilityPriority:(NSInteger)visibilityPriority;
- (NSInteger)visibilityPriority;

- (void)validate;


- (void)setAutovalidates:(BOOL)resistance;
- (BOOL)autovalidates;


- (BOOL)allowsDuplicatesInToolbar;

@end


@interface NSObject (NSToolbarItemValidation)

- (BOOL)validateToolbarItem:(NSToolbarItem *)theItem;

@end
