// 
//  CGDOMElement.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreGraphics/CGBase.h>

extern CGDOMElementRef CGDOMElementGetRootElement(void);

extern CGDOMElementRef CGDOMElementCreate(CFStringRef type);
extern CGDOMElementRef CGDOMElementCreateWithAttributes(CFStringRef type, CFDictionaryRef attributes);

extern void CGDOMElementAppendChild(CGDOMElementRef parent, CGDOMElementRef child);
extern void CGDOMElementRemoveChild(CGDOMElementRef parent, CGDOMElementRef child);
extern void CGDOMElementReplaceChild(CGDOMElementRef parent, CGDOMElementRef oldChild, CGDOMElementRef newChild);

extern CFStringRef CGDOMElementGetAttribute(CGDOMElementRef element, CFStringRef attribute);
extern bool CGDOMElementHasAttribute(CGDOMElementRef element, CFStringRef attribute);
extern void CGDOMElementRemoveAttribute(CGDOMElementRef element, CFStringRef attribute);
extern void CGDOMElementSetAttribute(CGDOMElementRef element, CFStringRef name, CFStringRef value);

extern CGContextRef CGDOMElementGetContext(CGDOMElementRef element);
