// 
//  NSMenuBar.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSWindow.h>
#import <AppKit/NSMenu.h>

#import <AppKit/NSMenuView.h>
#import <AppKit/NSApplicationTitleView.h>
#import <AppKit/NSStatusBarView.h>


@class NSApplicationTitleView;

@interface NSMenuBar : NSWindow {
  NSMenuView      *_mainMenuView;
  NSView        *_statusBarView;
  NSString      *_applicationTitleName;
  NSView        *_applicationTitleView;
}

- (void)setMainMenuView:(NSMenuView *)aView;
- (NSMenuView *)mainMenuView;

- (void)setApplicationTitleName:(NSString *)aString;
- (NSString *)applicationTitleName;

// - (void)setStatusBarView:(NSStatusBarView *)aView;
// - (NSStatusBarView *)statusBarView;

@end
