/* 
 * dom_element.js
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

include('core_graphics/context');

function CGDOMElementGetRootElement()
{
  return document.body;
}

function CGDOMElementCreate(type)
{
  var theElement = document.createElement(type);
  theElement.style.display = "block";
  theElement.style.position = "absolute";
  return theElement;
}

function CGDOMElementCreateWithAttributes(type, attributes)
{
  return document.createElement(type);
}

function CGDOMElementAppendChild(parent, child)
{
  parent.appendChild(child);
}

function CGDOMElementRemoveChild(parent, child)
{
  parent.removeChild(child);
}

function CGDOMElementReplaceChild(parent, oldChild, newChild)
{
  parent.replaceChild(newChild, oldChild);
}

function CGDOMElementGetAttribute(element, attribute)
{
  return element.getAttribute(attribute);
}

function CGDOMElementHasAttribute(element, attribute)
{
  return element.hasAttribute(attribute);
}

function CGDOMElementRemoveAttribute(element, attribute)
{
  element.removeAttribute(attribute);
}

function CGDOMElementSetAttribute(element, name, value)
{
  element.setAttribute(name, value);
}

function CGDOMElementSetFrame(element, frame)
{
  element.style.bottom = frame.origin.y + "px";
  element.style.left = frame.origin.x + "px";
  element.style.width = frame.size.width + "px";
  element.style.height = frame.size.height + "px";
  element.height = frame.size.height;
  element.width = frame.size.width;
}

function CGDOMElementSetFrameOrigin(element, origin)
{
  element.style.bottom = origin.y + "px";
  element.style.left = origin.x + "px";
}

function CGDOMElementSetFrameSize(element, size)
{
  
}

function CGDOMElementGetContext(element)
{
  return element.getContext("2d");
}
