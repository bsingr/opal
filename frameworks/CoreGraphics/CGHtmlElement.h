// 
//  CGHtmlElement.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreGraphics/CGBase.h>

extern CGHtmlElementRef CGHtmlElementGetRootElement(void);

extern CGHtmlElementRef CGHtmlElementCreate(CFStringRef type);
extern CGHtmlElementRef CGHtmlElementCreateWithAttributes(CFStringRef type, CFDictionaryRef attributes);

extern void CGHtmlElementAppendChild(CGHtmlElementRef parent, CGHtmlElementRef child);
extern void CGHtmlElementRemoveChild(CGHtmlElementRef parent, CGHtmlElementRef child);
extern void CGHtmlElementReplaceChild(CGHtmlElementRef parent, CGHtmlElementRef oldChild, CGHtmlElementRef newChild);

extern CFStringRef CGHtmlElementGetAttribute(CGHtmlElementRef element, CFStringRef attribute);
extern bool CGHtmlElementHasAttribute(CGHtmlElementRef element, CFStringRef attribute);
extern void CGHtmlElementRemoveAttribute(CGHtmlElementRef element, CFStringRef attribute);
extern void CGHtmlElementSetAttribute(CGHtmlElementRef element, CFStringRef name, CFStringRef value);
