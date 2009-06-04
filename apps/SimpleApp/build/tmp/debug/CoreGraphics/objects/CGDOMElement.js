// 
//  CGDOMElement.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CGDOMElementRef CGDOMElementGetRootElement(void);
// 
function CGDOMElementGetRootElement()
{
    return document.body;
}

// extern CGDOMElementRef CGDOMElementCreate(CFStringRef type);
// 
function CGDOMElementCreate(type)
{
    return document.createElement(type);
}

// extern CGDOMElementRef CGDOMElementCreateWithAttributes(CFStringRef type, CFDictionaryRef attributes);
// 
function CGDOMElementCreateWithAttributes(type, attributes)
{
    return document.createElement(type);
}

// extern void CGDOMElementAppendChild(CGDOMElementRef parent, CGDOMElementRef child);
// 
function CGDOMElementAppendChild(parent, child)
{
    parent.appendChild(child);
}

// extern void CGDOMElementRemoveChild(CGDOMElementRef parent, CGDOMElementRef child);
// 
function CGDOMElementRemoveChild(parent, child)
{
    parent.removeChild(child);
}

// extern void CGDOMElementReplaceChild(CGDOMElementRef parent, CGDOMElementRef oldChild, CGDOMElementRef newChild);
// 
function CGDOMElementReplaceChild(parent, oldChild, newChild)
{
    parent.replaceChild(newChild, oldChild);
}

// extern CFStringRef CGDOMElementGetAttribute(CGDOMElementRef element, CFStringRef attribute);
// 
function CGDOMElementGetAttribute(element, attribute)
{
    return element.getAttribute(attribute);
}

// extern bool CGDOMElementHasAttribute(CGDOMElementRef element, CFStringRef attribute);
// 
function CGDOMElementHasAttribute(element, attribute)
{
    return element.hasAttribute(attribute);
}

// extern void CGDOMElementRemoveAttribute(CGDOMElementRef element, CFStringRef attribute);
// 
function CGDOMElementRemoveAttribute(element, attribute)
{
    element.removeAttribute(attribute);
}

// extern void CGDOMElementSetAttribute(CGDOMElementRef element, CFStringRef name, CFStringRef value);
// 
function CGDOMElementSetAttribute(element, name, value)
{
    element.setAttribute(name, value);
}

// extern void CGDOMElementSetFrame(CGDOMElementRef element, CGRect frame);
// 
function CGDOMElementSetFrame(element, frame)
{
    element.bottom = frame.origin.x;
    element.left = frame.origin.y;
    element.height = frame.size.height;
    element.width = frame.size.width;
}

// extern void CGDOMElementSetFrameOrigin(CGDOMElementRef element, CGPoint origin);
function CGDOMElementSetFrameOrigin(element, origin)
{
    
}

// extern void CGDOMElementSetFrameSize(CGDOMElementRef element, CGSize size);
// 
function CGDOMElementSetFrameSize(element, size)
{
    
}

// extern CGContextRef CGDOMElementGetContext(CGDOMElementRef element);
// 
function CGDOMElementGetContext(element)
{
    return element.getContext("2d");
}
