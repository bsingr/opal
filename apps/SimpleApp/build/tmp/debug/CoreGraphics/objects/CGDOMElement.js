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
function CGDOMElementCreateWithAttributes(type,attributes)
{
return document.createElement(type);
}
function CGDOMElementAppendChild(parent,child)
{
parent.appendChild(child);
}
function CGDOMElementRemoveChild(parent,child)
{
parent.removeChild(child);
}
function CGDOMElementReplaceChild(parent,oldChild,newChild)
{
parent.replaceChild(newChild,oldChild);
}
function CGDOMElementGetAttribute(element,attribute)
{
return element.getAttribute(attribute);
}
function CGDOMElementHasAttribute(element,attribute)
{
return element.hasAttribute(attribute);
}
function CGDOMElementRemoveAttribute(element,attribute)
{
element.removeAttribute(attribute);
}
function CGDOMElementSetAttribute(element,name,value)
{
element.setAttribute(name,value);
}
function CGDOMElementSetFrame(element,frame)
{
element.style.bottom = frame.origin.y + "px";
element.style.left = frame.origin.x + "px";
element.style.width = frame.size.width + "px";
element.style.height = frame.size.height + "px";
element.height = frame.size.height;
element.width = frame.size.width;
}
function CGDOMElementSetFrameOrigin(element,origin)
{
element.style.bottom = origin.y + "px";
element.style.left = origin.x + "px";
}
function CGDOMElementSetFrameSize(element,size)
{
}
function CGDOMElementGetContext(element)
{
return element.getContext("2d");
}
