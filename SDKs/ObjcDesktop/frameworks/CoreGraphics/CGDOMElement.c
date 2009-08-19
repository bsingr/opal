/* 
 * CGDOMElement.c
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
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

#include "CGDOMElement.h"

CGDOMElementRef CGDOMElementGetRootElement(void)
{
  return document.body;
}

CGDOMElementRef CGDOMElementCreate(CFStringRef type)
{
  CGDOMElementRef theElement = document.createElement(type);
  theElement.style.display = "block";
  theElement.style.position = "absolute";
  return theElement;
}

CGDOMElementRef CGDOMElementCreateWithAttributes(CFStringRef type, CFDictionaryRef attributes)
{
  return document.createElement(type);
}

void CGDOMElementAppendChild(CGDOMElementRef parent, CGDOMElementRef child)
{
  parent.appendChild(child);
}

void CGDOMElementRemoveChild(CGDOMElementRef parent, CGDOMElementRef child)
{
  parent.removeChild(child);
}

void CGDOMElementReplaceChild(CGDOMElementRef parent, CGDOMElementRef oldChild, CGDOMElementRef newChild)
{
  parent.replaceChild(newChild, oldChild);
}

CFStringRef CGDOMElementGetAttribute(CGDOMElementRef element, CFStringRef attribute)
{
  return element.getAttribute(attribute);
}

bool CGDOMElementHasAttribute(CGDOMElementRef element, CFStringRef attribute)
{
  return element.hasAttribute(attribute);
}

void CGDOMElementRemoveAttribute(CGDOMElementRef element, CFStringRef attribute)
{
  element.removeAttribute(attribute);
}

void CGDOMElementSetAttribute(CGDOMElementRef element, CFStringRef name, CFStringRef value)
{
  element.setAttribute(name, value);
}

void CGDOMElementSetFrame(CGDOMElementRef element, CGRect frame)
{
  element.style.bottom = frame.origin.y + "px";
  element.style.left = frame.origin.x + "px";
  element.style.width = frame.size.width + "px";
  element.style.height = frame.size.height + "px";
  element.height = frame.size.height;
  element.width = frame.size.width;
}

void CGDOMElementSetFrameOrigin(CGDOMElementRef element, CGPoint origin)
{
  element.style.bottom = origin.y + "px";
  element.style.left = origin.x + "px";
}

void CGDOMElementSetFrameSize(CGDOMElementRef element, CGSize size)
{
  
}

CGContextRef CGDOMElementGetContext(CGDOMElementRef element)
{
  return element.getContext("2d");
}
