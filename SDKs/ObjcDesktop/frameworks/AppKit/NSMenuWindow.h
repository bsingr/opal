// 
//  NSMenuWindow.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSWindow.h>
#import <AppKit/NSMenu.h>


@interface NSMenuWindow : NSWindow {

}

- (id)initWithMenu:(NSMenu *)aMenu;

@end

