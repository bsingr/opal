// 
//  CGHtmlElement.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CGHtmlElementRef CGHtmlElementGetRootElement(void);
// 
var CGHtmlElementGetRootElement = function()
{
    
}

// extern CGHtmlElementRef CGHtmlElementCreate(CFStringRef type);
// 
var CGHtmlElementCreate = function(type)
{
    return document.createElement(type);
}

// extern CGHtmlElementRef CGHtmlElementCreateWithAttributes(CFStringRef type, CFDictionaryRef attributes);
// 
var CGHtmlElementCreateWithAttributes = function(type, attributes)
{
    return document.createElement(type);
}

// extern void CGHtmlElementAppendChild(CGHtmlElementRef parent, CGHtmlElementRef child);
// 
var CGHtmlElementAppendChild = function(parent, child)
{
    parent.appendChild(child);
}

// extern void CGHtmlElementRemoveChild(CGHtmlElementRef parent, CGHtmlElementRef child);
// 
var CGHtmlElementRemoveChild = function(parent, child)
{
    parent.removeChild(child);
}

// extern void CGHtmlElementReplaceChild(CGHtmlElementRef parent, CGHtmlElementRef oldChild, CGHtmlElementRef newChild);
// 
var CGHtmlElementReplaceChild = function(parent, oldChild, newChild)
{
    parent.replaceChild(newChild, oldChild);
}

// extern CFStringRef CGHtmlElementGetAttribute(CGHtmlElementRef element, CFStringRef attribute);
// 
var CGHtmlElementGetAttribute = function(element, attribute)
{
    return element.getAttribute(attribute);
}

// extern bool CGHtmlElementHasAttribute(CGHtmlElementRef element, CFStringRef attribute);
// 
var CGHtmlElementHasAttribute = function(element, attribute)
{
    return element.hasAttribute(attribute);
}

// extern void CGHtmlElementRemoveAttribute(CGHtmlElementRef element, CFStringRef attribute);
// 
var CGHtmlElementRemoveAttribute = function(element, attribute)
{
    element.removeAttribute(attribute);
}

// extern void CGHtmlElementSetAttribute(CGHtmlElementRef element, CFStringRef name, CFStringRef value);
// 
var CGHtmlElementSetAttribute = function(element, name, value)
{
    element.setAttribute(name, value);
}
