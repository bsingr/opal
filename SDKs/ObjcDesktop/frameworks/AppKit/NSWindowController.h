// 
//  NSWindowController.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/Foundation.h>
#import <AppKit/NSResponder.h>
#import <AppKit/NSNibDeclarations.h>

@class NSArray, NSDocument, NSWindow;

@interface NSWindowController : NSResponder <NSCoding>
{
  NSWindow  *_window;
  id      *_owner;
}

- (id)initWithWindow:(NSWindow *)window;

- (id)initWithWindowNibName:(NSString *)windowNibName;
- (id)initWithWindowNibName:(NSString *)windowNibName owner:(id)owner;
- (id)initWithWindowNibPath:(NSString *)windowNibPath owner:(id)owner;

- (NSString *)windowNibName;
- (NSString *)windowNibPath;  
- (id)owner;

- (void)setWindowFrameAutosaveName:(NSString *)name;
- (NSString *)windowFrameAutosaveName;

- (void)setShouldCascadeWindows:(BOOL)flag;
- (BOOL)shouldCascadeWindows;
  
- (id)document;
  
- (void)setDocument:(NSDocument *)document;

- (void)setDocumentEdited:(BOOL)dirtyFlag;

- (void)setShouldCloseDocument:(BOOL)flag;
- (BOOL)shouldCloseDocument;

- (void)setWindow:(NSWindow *)window;
  
- (NSWindow *)window;

- (void)synchronizeWindowTitleWithDocumentName;

- (NSString *)windowTitleForDocumentDisplayName:(NSString *)displayName;

- (void)close;
  
// - (IBAction)showWindow:(id)sender;


- (BOOL)isWindowLoaded;
- (void)windowWillLoad;
- (void)windowDidLoad;

- (void)loadWindow;

@end
