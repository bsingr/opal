/* 
 * AppController.m
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2010 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#import "AppController.h"

@implementation AppController
- (id)init
{
  if((self = [super init]))
  { 
    NSLog(@"yeap");
    
  }
  return self;
}

- (void)applicationWillFinishLaunching:(NSNotification *)note
{
  ruby_init(); 
  ruby_script("embedded"); 
  ruby_init_loadpath();
  Init_CKBootstrap();
  // add app path to load path
  ruby_incpush("/Users/adam/development/vienna/cherry_kit/lib");
  ruby_incpush("/Users/adam/development/vienna/cherry_kit/demos/sample_controls");
  rb_eval_string("require 'config/environment'");
}

-(void)applicationDidFinishLaunching:(NSNotification *)note
{
  // NSWindow *window = [[NSWindow alloc] initWithContentRect:NSMakeRect(100.0,100.0,800.0,700.0) styleMask:NSTitledWindowMask|NSClosableWindowMask backing:NSBackingStoreBuffered defer:false];
  // [window setHasShadow:YES];
  // // [window ck_init_custom_drawing];
  // //[window setContentBorderThickness:190 forEdge:NSMaxYEdge];
  // [window setMovableByWindowBackground:NO];
  // [window setTitle:@"My Window!"];
  // //[window setBackgroundColor:[NSColor clearColor]];
  // [window setOpaque:NO];
  // [window makeKeyAndOrderFront:window];
  // [window makeMainWindow];
}

@end