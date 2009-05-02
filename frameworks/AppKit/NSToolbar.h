// 
//  NSToolbar.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/Foundation.h>

@class NSArray, NSDictionary, NSMutableArray, NSNotification, NSString, NSToolbarItem, NSWindow;

enum {
    NSToolbarDisplayModeDefault,
    NSToolbarDisplayModeIconAndLabel,
    NSToolbarDisplayModeIconOnly,
    NSToolbarDisplayModeLabelOnly
};
typedef NSUInteger NSToolbarDisplayMode;

enum {
    NSToolbarSizeModeDefault,
    NSToolbarSizeModeRegular,
    NSToolbarSizeModeSmall
};
typedef NSUInteger NSToolbarSizeMode;

extern NSString *NSToolbarWillAddItemNotification;
extern NSString *NSToolbarDidRemoveItemNotification;

@interface NSToolbar : NSObject
{
}

- (id)initWithIdentifier:(NSString *)identifier;

- (void)insertItemWithItemIdentifier:(NSString *)itemIdentifier atIndex:(NSInteger)index;
- (void)removeItemAtIndex:(NSInteger)index;

- (void)setDelegate:(id)delegate;
- (id)delegate;

- (void)setVisible:(BOOL)shown;
- (BOOL)isVisible;

- (void)runCustomizationPalette:(id)sender;
- (BOOL)customizationPaletteIsRunning;


- (void)setDisplayMode:(NSToolbarDisplayMode)displayMode;
- (NSToolbarDisplayMode)displayMode;

- (void)setSelectedItemIdentifier:(NSString *)itemIdentifier;
- (NSString *)selectedItemIdentifier;

- (void)setSizeMode:(NSToolbarSizeMode)sizeMode;
- (NSToolbarSizeMode)sizeMode;

- (void)setShowsBaselineSeparator:(BOOL)flag;
- (BOOL)showsBaselineSeparator;

- (void)setAllowsUserCustomization:(BOOL)allowCustomization;
- (BOOL)allowsUserCustomization;

       
- (NSString *)identifier;
- (NSArray *)items;
- (NSArray *)visibleItems;


- (void)setAutosavesConfiguration:(BOOL)flag;
- (BOOL)autosavesConfiguration;

- (void)setConfigurationFromDictionary:(NSDictionary *)configDict;
- (NSDictionary *)configurationDictionary;


- (void)validateVisibleItems;


@end


@interface NSObject (NSToolbarDelegate)

- (NSToolbarItem *)toolbar:(NSToolbar *)toolbar itemForItemIdentifier:(NSString *)itemIdentifier willBeInsertedIntoToolbar:(BOOL)flag;    
- (NSArray *)toolbarDefaultItemIdentifiers:(NSToolbar*)toolbar;
- (NSArray *)toolbarAllowedItemIdentifiers:(NSToolbar*)toolbar;
- (NSArray *)toolbarSelectableItemIdentifiers:(NSToolbar *)toolbar;

@end


@interface NSObject (NSToolbarNotifications)

- (void)toolbarWillAddItem: (NSNotification *)notification;
- (void)toolbarDidRemoveItem: (NSNotification *)notification;

@end
