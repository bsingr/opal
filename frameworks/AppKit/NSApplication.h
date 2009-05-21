// 
//  NSApplication.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/Foundation.h>
#import <AppKit/NSResponder.h>
#import <AppKit/NSGraphicsContext.h>

@class NSEvent, NSMenu, NSImage, NSException, NSPasteboard;

extern NSString *NSModalPanelRunLoopMode;
extern NSString *NSEventTrackingRunLoopMode;

enum {
    NSRunStoppedResponse            = (-1000),
    NSRunAbortedResponse            = (-1001),
    NSRunContinuesResponse          = (-1002)
};

enum {
    NSUpdateWindowsRunLoopOrdering  = 500000
};

extern id NSApp;

@interface NSApplication : NSResponder
{
    id               _delegate;
    NSMutableArray  *_windows;
    
    NSEvent         *_currentEvent;
    
    // Event bindings
    BOOL             _eventBindingQueued;
    id               _eventBindingTarget;
    SEL              _eventBindingSelector;
    NSUInteger       _eventBindingMask;
}

+ (NSApplication *)sharedApplication;
- (void)setDelegate:(id)anObject;
- (id)delegate;
- (NSGraphicsContext*)context;
- (NSWindow *)windowWithWindowNumber:(NSInteger)windowNum;
- (NSWindow *)mainWindow;
- (NSWindow *)keyWindow;
- (BOOL)isRunning;
- (void)finishLaunching;
- (void)run;
// Method changed from -(NSEvent)nextEventMatchingMask:untilDate:inMode:dequeue:
// to -(void)nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:
// See documentation for more
- (void)nextEventMatchingMask:(NSUInteger)mask untilDate:(NSDate *)expiration inMode:(NSString *)mode dequeue:(BOOL)deqFlag withTarget:(id)aTarget withSelector:(SEL)aSelector;
- (void)discardEventsMatchingMask:(NSUInteger)mask beforeEvent:(NSEvent *)lastEvent;
- (void)postEvent:(NSEvent *)event atStart:(BOOL)flag;
- (NSEvent *)currentEvent;

- (void)sendEvent:(NSEvent *)theEvent;
- (void)preventWindowOrdering;
- (NSWindow *)makeWindowsPerform:(SEL)aSelector inOrder:(BOOL)flag;
- (NSArray *)windows;
- (void)setWindowsNeedUpdate:(BOOL)needUpdate;
- (void)updateWindows;

- (void)setMainMenu:(NSMenu *)aMenu;
- (NSMenu *)mainMenu;

- (void)setApplicationIconImage:(NSImage *)image;
- (NSImage *)applicationIconImage;

- (BOOL)sendAction:(SEL)theAction to:(id)theTarget from:(id)sender;
- (id)targetForAction:(SEL)theAction;
- (id)targetForAction:(SEL)theAction to:(id)theTarget from:(id)sender;
- (BOOL)tryToPerform:(SEL)anAction with:(id)anObject;
- (id)validRequestorForSendType:(NSString *)sendType returnType:(NSString *)returnType;

- (void)reportException:(NSException *)theException;
+ (void)detachDrawingThread:(SEL)selector toTarget:(id)target withObject:(id)argument;

@end

@interface NSApplication (NSWindowsMenu)

- (void)setWindowsMenu:(NSMenu *)aMenu;
- (NSMenu *)windowsMenu;
- (void)arrangeInFront:(id)sender;
- (void)removeWindowsItem:(NSWindow *)win;
- (void)addWindowsItem:(NSWindow *)win title:(NSString *)aString filename:(BOOL)isFilename;
- (void)changeWindowsItem:(NSWindow *)win title:(NSString *)aString filename:(BOOL)isFilename;
- (void)updateWindowsItem:(NSWindow *)win;
- (void)miniaturizeAll:(id)sender;

@end


@interface NSObject (NSApplicationNotifications)

- (void)applicationWillFinishLaunching:(NSNotification *)notification;
- (void)applicationDidFinishLaunching:(NSNotification *)notification;
- (void)applicationWillHide:(NSNotification *)notification;
- (void)applicationDidHide:(NSNotification *)notification;
- (void)applicationWillUnhide:(NSNotification *)notification;
- (void)applicationDidUnhide:(NSNotification *)notification;
- (void)applicationWillBecomeActive:(NSNotification *)notification;
- (void)applicationDidBecomeActive:(NSNotification *)notification;
- (void)applicationWillResignActive:(NSNotification *)notification;
- (void)applicationDidResignActive:(NSNotification *)notification;
- (void)applicationWillUpdate:(NSNotification *)notification;
- (void)applicationDidUpdate:(NSNotification *)notification;
- (void)applicationWillTerminate:(NSNotification *)notification;
- (void)applicationDidChangeScreenParameters:(NSNotification *)notification;

@end


@interface NSObject(NSApplicationDelegate)

- (BOOL)application:(NSApplication *)sender openFile:(NSString *)filename;
- (void)application:(NSApplication *)sender openFiles:(NSArray *)filenames;
- (BOOL)application:(NSApplication *)sender openTempFile:(NSString *)filename;
- (BOOL)applicationShouldOpenUntitledFile:(NSApplication *)sender;
- (BOOL)applicationOpenUntitledFile:(NSApplication *)sender;
- (BOOL)application:(id)sender openFileWithoutUI:(NSString *)filename;

@end


@interface NSObject (NSServicesRequests)

- (BOOL)writeSelectionToPasteboard:(NSPasteboard *)pboard types:(NSArray *)types;
- (BOOL)readSelectionFromPasteboard:(NSPasteboard *)pboard;

@end


@interface NSApplication (NSStandardAboutPanel)

- (void)orderFrontStandardAboutPanel:(id)sender;
- (void)orderFrontStandardAboutPanelWithOptions:(NSDictionary *)optionsDictionary;

@end

extern int NSApplicationMain(int argc, const char *argv[]);

extern NSString *NSApplicationDidBecomeActiveNotification = @"NSApplicationDidBecomeActiveNotification";
extern NSString *NSApplicationDidHideNotification = @"NSApplicationDidHideNotification";
extern NSString *NSApplicationDidFinishLaunchingNotification = @"NSApplicationDidFinishLaunchingNotification";
extern NSString *NSApplicationDidResignActiveNotification = @"NSApplicationDidResignActiveNotification";
extern NSString *NSApplicationDidUnhideNotification = @"NSApplicationDidUnhideNotification";
extern NSString *NSApplicationDidUpdateNotification = @"NSApplicationDidUpdateNotification";
extern NSString *NSApplicationWillBecomeActiveNotification = @"NSApplicationWillBecomeActiveNotification";
extern NSString *NSApplicationWillHideNotification = @"NSApplicationWillHideNotification";
extern NSString *NSApplicationWillFinishLaunchingNotification = @"NSApplicationWillFinishLaunchingNotification";
extern NSString *NSApplicationWillResignActiveNotification = @"NSApplicationWillResignActiveNotification";
extern NSString *NSApplicationWillUnhideNotification = @"NSApplicationWillUnhideNotification";
extern NSString *NSApplicationWillUpdateNotification = @"NSApplicationWillUpdateNotification";
extern NSString *NSApplicationWillTerminateNotification = @"NSApplicationWillTerminateNotification";
extern NSString *NSApplicationDidChangeScreenParametersNotification = @"NSApplicationDidChangeScreenParametersNotification";