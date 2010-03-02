/* 
 * ck_window.m
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

#import "cherry_kit_platform.h"

/*
  CherryKit::Window#_platform_initialize(frame)
*/
VALUE ck_win_platform_initialize(VALUE win, VALUE frame)
{
  NSLog(@"Initializing platform part of window");
  int flags = NSTitledWindowMask|NSClosableWindowMask;
  NSWindow *window = [[NSWindow alloc] initWithContentRect:NSMakeRect(100,100,800,700) styleMask:flags backing:NSBackingStoreBuffered defer:false];
  
  [window setHasShadow:YES];
  // [window ck_init_custom_drawing];
  //[window setContentBorderThickness:190 forEdge:NSMaxYEdge];
  [window setMovableByWindowBackground:NO];
  [window setTitle:@"My Window!"];
  //[window setBackgroundColor:[NSColor clearColor]];
  [window setOpaque:NO];
  [window makeKeyAndOrderFront:window];
  
  return win;
}

VALUE ck_win_platform_set_window_view(VALUE win, VALUE view)
{
  return Qnil;
}

VALUE ck_win_platform_set_content_view(VALUE win, VALUE view)
{
  return Qnil;
}

void Init_CKWindow(void)
{
  ck_cWindow = rb_const_get(mCK, rb_intern("Window"));
  
  rb_define_method(ck_cWindow, "_platform_initialize", ck_win_platform_initialize, 1);
  rb_define_method(ck_cWindow, "_platform_set_window_view", ck_win_platform_set_window_view, 1);
  rb_define_method(ck_cWindow, "_platform_set_content_view", ck_win_platform_set_content_view, 1);
}