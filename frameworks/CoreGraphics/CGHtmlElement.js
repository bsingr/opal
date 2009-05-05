// 
//  CGHtmlElement.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CGHtmlElementRef CGHtmlElementGetRootElement(void);
// 
function CGHtmlElementGetRootElement()
{
    
}

// extern CGHtmlElementRef CGHtmlElementCreate(CFStringRef type);
// 
function CGHtmlElementCreate(type)
{
    return document.createElement(type);
}

// extern CGHtmlElementRef CGHtmlElementCreateWithAttributes(CFStringRef type, CFDictionaryRef attributes);
// 
function CGHtmlElementCreateWithAttributes(type, attributes)
{
    return document.createElement(type);
}

// extern void CGHtmlElementAppendChild(CGHtmlElementRef parent, CGHtmlElementRef child);
// 
function CGHtmlElementAppendChild(parent, child)
{
    parent.appendChild(child);
}

// extern void CGHtmlElementRemoveChild(CGHtmlElementRef parent, CGHtmlElementRef child);
// 
function CGHtmlElementRemoveChild(parent, child)
{
    parent.removeChild(child);
}

// extern void CGHtmlElementReplaceChild(CGHtmlElementRef parent, CGHtmlElementRef oldChild, CGHtmlElementRef newChild);
// 
function CGHtmlElementReplaceChild(parent, oldChild, newChild)
{
    parent.replaceChild(newChild, oldChild);
}

// extern CFStringRef CGHtmlElementGetAttribute(CGHtmlElementRef element, CFStringRef attribute);
// 
function CGHtmlElementGetAttribute(element, attribute)
{
    return element.getAttribute(attribute);
}

// extern bool CGHtmlElementHasAttribute(CGHtmlElementRef element, CFStringRef attribute);
// 
function CGHtmlElementHasAttribute(element, attribute)
{
    return element.hasAttribute(attribute);
}

// extern void CGHtmlElementRemoveAttribute(CGHtmlElementRef element, CFStringRef attribute);
// 
function CGHtmlElementRemoveAttribute(element, attribute)
{
    element.removeAttribute(attribute);
}

// extern void CGHtmlElementSetAttribute(CGHtmlElementRef element, CFStringRef name, CFStringRef value);
// 
function CGHtmlElementSetAttribute(element, name, value)
{
    element.setAttribute(name, value);
}
