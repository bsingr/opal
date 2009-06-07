// 
//  NSApplication.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSApplication.h"

NSString *NSModalPanelRunLoopMode = @"NSModalPanelRunLoopMode";
NSString *NSEventTrackingRunLoopMode = @"NSEventTrackingRunLoopMode";

id NSApp = nil;

@class AppController;

@implementation NSApplication

- (id)init
{   
    self = [super init];
    if (self) {
        _windows = [NSMutableArray arrayWithCapacity:0];
        
        _eventQueue = [NSMutableArray arrayWithCapacity:0];
        _eventBindingQueued = NO;
        
        NSBundle *mainBundle = [NSBundle mainBundle];
        NSString *productName = [mainBundle objectForInfoDictionaryKey:@"CFBundleName"];        
    }
    return self;
}

+ (NSApplication *)sharedApplication
{
    if (!NSApp)
    	NSApp = [[NSApplication alloc] init];
        
    return NSApp;
}

- (void)setDelegate:(id)anObject
{
    if (_delegate == anObject)
        return;
    
    NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
    
    // if (_delegate) {
    //     [nc removeObserver:_delegate name:NSApplicationWillFinishLaunchingNotification object:self];
    //     [nc removeObserver:_delegate name:NSApplicationDidFinishLaunchingNotification object:self];
    // }
    
    _delegate = anObject;
    
    // if ([_delegate respondsToSelector:@selector(applicationWillFinishLaunching:)])
    //     [nc addObserver:_delegate selector:@selector(applicationWillFinishLaunching:) name:NSApplicationWillFinishLaunchingNotification object:self];
    //     
    // if ([_delegate respondsToSelector:@selector(applicationDidFinishLaunching:)])
    //     [nc addObserver:_delegate selector:@selector(applicationDidFinishLaunching:) name:NSApplicationDidFinishLaunchingNotification object:self];
    // 
}

- (id)delegate
{
    return _delegate;
}

- (NSGraphicsContext*)context
{
    // TODO: Need to implement
}

- (NSWindow *)windowWithWindowNumber:(NSInteger)windowNum
{
    return [_windows objectAtIndex:windowNum];
}

- (NSWindow *)mainWindow
{
    for (int i = 0; i < [_windows count]; i++)
        if ([[_windows objectAtIndex:i] isMainWindow])
        return [_windows objectAtIndex:i];
    
    return nil;
}

- (NSWindow *)keyWindow
{
    for (int i = 0; i < [_windows count]; i++)
        if ([[_windows objectAtIndex:i] isKeyWindow])
        return [_windows objectAtIndex:i];
    
    return nil;
}

- (void)addWindow:(NSWindow *)aWindow
{
    [_windows addObject:aWindow];
            return [_windows count] - 1;
}

- (BOOL)isRunning
{
    // TODO: Need to implement
}

- (void)finishLaunching
{
    NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
    // [nc postNotificationName:NSApplicationWillFinishLaunchingNotification object:self];
    // [nc postNotificationName:NSApplicationDidFinishLaunchingNotification object:self];
}

- (void)run
{
    [[NSApplication sharedApplication] finishLaunching];
}

// Method changed from -(NSEvent)nextEventMatchingMask:untilDate:inMode:dequeue:
// to -(void)nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:
// See documentation for more
- (void)nextEventMatchingMask:(NSUInteger)mask untilDate:(NSDate *)expiration inMode:(NSString *)mode dequeue:(BOOL)deqFlag withTarget:(id)aTarget withSelector:(SEL)aSelector
{
    _eventBindingQueued = YES;
    _eventBindingTarget = aTarget;
    _eventBindingSelector = aSelector;
    _eventBindingMask = mask;
}

- (void)discardEventsMatchingMask:(NSUInteger)mask beforeEvent:(NSEvent *)lastEvent
{
    // TODO: Need to implement
}

- (void)postEvent:(NSEvent *)event atStart:(BOOL)flag
{
    [self sendEvent:event];
}

- (NSEvent *)currentEvent
{
    return _currentEvent;
}


- (void)sendEvent:(NSEvent *)theEvent
{
    _currentEvent = theEvent;
    
    if (_eventBindingQueued) {
        if (((1 << [theEvent type]) & _eventBindingMask) != 0) {
            _eventBindingQueued = NO;
            [_eventBindingTarget performSelector:_eventBindingSelector withObject:theEvent];
        }
        else {
            // FIXME: Need to implement
        }
        
        return;
    }
    
    if ([theEvent type] == NSLeftMouseDown)
        [[theEvent window] makeKeyAndOrderFront:self];
    else if (([theEvent type] == NSKeyDown) || ([theEvent type] == NSKeyUp))
        [[self keyWindow] sendEvent:theEvent];
    else
        [[theEvent window] sendEvent:theEvent];
}

- (void)preventWindowOrdering
{
    // TODO: Need to implement
}

- (NSWindow *)makeWindowsPerform:(SEL)aSelector inOrder:(BOOL)flag
{
    // TODO: Need to implement
}

- (NSArray *)windows
{
    // TODO: Need to implement
}

- (void)setWindowsNeedUpdate:(BOOL)needUpdate
{
    // TODO: Need to implement
}

- (void)updateWindows
{
    // TODO: Need to implement
}


- (void)setMainMenu:(NSMenu *)aMenu
{
    // TODO: Need to implement
}

- (NSMenu *)mainMenu
{
    // TODO: Need to implement
}


- (void)setApplicationIconImage:(NSImage *)image
{
    // TODO: Need to implement
}

- (NSImage *)applicationIconImage
{
    // TODO: Need to implement
}


- (BOOL)sendAction:(SEL)theAction to:(id)theTarget from:(id)sender
{
    // TODO: Need to implement
}

- (id)targetForAction:(SEL)theAction
{
    // TODO: Need to implement
}

- (id)targetForAction:(SEL)theAction to:(id)theTarget from:(id)sender
{
    // TODO: Need to implement
}

- (BOOL)tryToPerform:(SEL)anAction with:(id)anObject
{
    // TODO: Need to implement
}

- (id)validRequestorForSendType:(NSString *)sendType returnType:(NSString *)returnType
{
    // TODO: Need to implement
}


- (void)reportException:(NSException *)theException
{
    // TODO: Need to implement
}

+ (void)detachDrawingThread:(SEL)selector toTarget:(id)target withObject:(id)argument
{
    // TODO: Need to implement
}

@end

@implementation NSApplication (NSWindowsMenu)

- (void)setWindowsMenu:(NSMenu *)aMenu
{
    // TODO: Need to implement
}

- (NSMenu *)windowsMenu
{
    // TODO: Need to implement
}

- (void)arrangeInFront:(id)sender
{
    // TODO: Need to implement
}

- (void)removeWindowsItem:(NSWindow *)win
{
    // TODO: Need to implement
}

- (void)addWindowsItem:(NSWindow *)win title:(NSString *)aString filename:(BOOL)isFilename
{
    // TODO: Need to implement
}

- (void)changeWindowsItem:(NSWindow *)win title:(NSString *)aString filename:(BOOL)isFilename
{
    // TODO: Need to implement
}

- (void)updateWindowsItem:(NSWindow *)win
{
    // TODO: Need to implement
}

- (void)miniaturizeAll:(id)sender
{
    // TODO: Need to implement
}

@end


@implementation NSApplication (NSStandardAboutPanel)

- (void)orderFrontStandardAboutPanel:(id)sender
{
    // TODO: Need to implement
}

- (void)orderFrontStandardAboutPanelWithOptions:(NSDictionary *)optionsDictionary
{
    // TODO: Need to implement
}

@end

int NSApplicationMain(int argc, const char *argv[])
{
	// id theAppController = [[AppController alloc] init];
	//     NSApplication *theApp = [NSApplication sharedApplication];
	//     [theApp setDelegate:theAppController];
	
    NSBundle *mainBundle = [NSBundle mainBundle];
    Class principalClass = [mainBundle principalClass];
    
    [NSBundle loadNibNamed:@"MainMenu" owner:[principalClass sharedApplication]];
    [[AppController alloc] init];
    
    [[principalClass sharedApplication] run];
    
    return 0;
}

NSString *NSApplicationDidBecomeActiveNotification = @"NSApplicationDidBecomeActiveNotification";
NSString *NSApplicationDidHideNotification = @"NSApplicationDidHideNotification";
NSString *NSApplicationDidFinishLaunchingNotification = @"NSApplicationDidFinishLaunchingNotification";
NSString *NSApplicationDidResignActiveNotification = @"NSApplicationDidResignActiveNotification";
NSString *NSApplicationDidUnhideNotification = @"NSApplicationDidUnhideNotification";
NSString *NSApplicationDidUpdateNotification = @"NSApplicationDidUpdateNotification";
NSString *NSApplicationWillBecomeActiveNotification = @"NSApplicationWillBecomeActiveNotification";
NSString *NSApplicationWillHideNotification = @"NSApplicationWillHideNotification";
NSString *NSApplicationWillFinishLaunchingNotification = @"NSApplicationWillFinishLaunchingNotification";
NSString *NSApplicationWillResignActiveNotification = @"NSApplicationWillResignActiveNotification";
NSString *NSApplicationWillUnhideNotification = @"NSApplicationWillUnhideNotification";
NSString *NSApplicationWillUpdateNotification = @"NSApplicationWillUpdateNotification";
NSString *NSApplicationWillTerminateNotification = @"NSApplicationWillTerminateNotification";
NSString *NSApplicationDidChangeScreenParametersNotification = @"NSApplicationDidChangeScreenParametersNotification";

