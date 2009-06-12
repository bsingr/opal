var the_class = objc_allocateClassPair(NSText, "NSTextView");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");
class_addIvar(the_class, "_frame", "NSRect");
class_addIvar(the_class, "_bounds", "NSRect");
class_addIvar(the_class, "_window", "NSWindow");
class_addIvar(the_class, "_gState", "id");
class_addIvar(the_class, "_menu", "NSMenu");
class_addIvar(the_class, "_superview", "NSView");
class_addIvar(the_class, "_subviews", "NSMutableArray");
class_addIvar(the_class, "_nextKeyView", "NSView");
class_addIvar(the_class, "_previousKeyView", "NSView");
class_addIvar(the_class, "_isHidden", "BOOL");
class_addIvar(the_class, "_postsNotificationOnFrameChange", "BOOL");
class_addIvar(the_class, "_postsNotificationOnBoundsChange", "BOOL");
class_addIvar(the_class, "_autoresizesSubviews", "BOOL");
class_addIvar(the_class, "_inLiveResize", "BOOL");
class_addIvar(the_class, "_autoresizingMask", "int");
class_addIvar(the_class, "_tag", "int");
class_addIvar(the_class, "_draggedTypes", "NSArray");
class_addIvar(the_class, "_defaultToolTipTag", "NSToolTipTag");
class_addIvar(the_class, "_toolTip", "NSString");
class_addIvar(the_class, "_invalidRect", "NSRect");
class_addIvar(the_class, "_validTransforms", "BOOL");
class_addIvar(the_class, "_transformFromWindow", "CGAffineTransform");
class_addIvar(the_class, "_transformToWindow", "CGAffineTransform");
class_addIvar(the_class, "_visibleRect", "NSRect");
class_addIvar(the_class, "_DOMContainer", "CGDOMElementRef");
class_addIvar(the_class, "_DOMGraphicsContext", "CGDOMElementRef");
class_addIvar(the_class, "_graphicsContext", "CGContextRef");
class_addIvar(the_class, "_string", "NSString");
class_addIvar(the_class, "_backgroundColor", "NSColor");
class_addIvar(the_class, "_drawsBackground", "BOOL");
class_addIvar(the_class, "_isEditable", "BOOL");
class_addIvar(the_class, "_isSelectable", "BOOL");
class_addIvar(the_class, "_isFieldEditor", "BOOL");
class_addIvar(the_class, "_isRichText", "BOOL");
class_addIvar(the_class, "_importsGraphics", "BOOL");
class_addIvar(the_class, "_usesFontPanel", "BOOL");
class_addIvar(the_class, "_selectedRange", "NSRange");
class_addIvar(the_class, "_font", "NSFont");
class_addIvar(the_class, "_textAlignment", "NSTextAlignment");
class_addIvar(the_class, "_textColor", "NSColor");
class_addIvar(the_class, "_maxSize", "NSSize");
class_addIvar(the_class, "_minSize", "NSSize");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_gCanvas", "CGContextRef");

class_addMethod(the_class, "init", function(self, _cmd) {
with(self) {
objc_msgSendSuper({super_class:NSText, receiver:self}, "init");
_selectedRange = NSMakeRange(0,0);
}
}, "void");

class_addMethod(the_class, "insertText:", function(self, _cmd, aString) {
with(self) {
objc_msgSend(self, "replaceCharactersInRange:withString:", objc_msgSend(self, "selectedRange"), aString);
objc_msgSend(self, "setSelectedRange:", NSMakeRange(_selectedRange.location + 1,0));
}
}, "void");

class_addMethod(the_class, "deleteBackward:", function(self, _cmd, sender) {
with(self) {
objc_msgSend(self, "replaceCharactersInRange:withString:", NSMakeRange(objc_msgSend(self, "selectedRange").location - 1,1), "");
objc_msgSend(self, "setSelectedRange:", NSMakeRange(_selectedRange.location - 1,0));
objc_msgSend(self, "postTextDidChangeNotification");
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "moveLeft:", function(self, _cmd, sender) {
with(self) {
if (_selectedRange.location == 0)
return ;

objc_msgSend(self, "setSelectedRange:", NSMakeRange(_selectedRange.location - 1,0));
}
}, "void");

class_addMethod(the_class, "moveRight:", function(self, _cmd, sender) {
with(self) {
if (_selectedRange.location == _string.length)
return ;

objc_msgSend(self, "setSelectedRange:", NSMakeRange(_selectedRange.location + _selectedRange.length + 1,0));
}
}, "void");

class_addMethod(the_class, "scrollPageDown:", function(self, _cmd, sender) {
with(self) {
objc_msgSend(self, "setSelectedRange:", NSMakeRange(_string.length,0));
}
}, "void");

class_addMethod(the_class, "scrollPageUp:", function(self, _cmd, sender) {
with(self) {
objc_msgSend(self, "setSelectedRange:", NSMakeRange(0,0));
}
}, "void");

class_addMethod(the_class, "insertTab:", function(self, _cmd, sender) {
with(self) {
objc_msgSend(objc_msgSend(self, "window"), "makeFirstResponder:", objc_msgSend(self, "window"));
}
}, "void");

class_addMethod(the_class, "keyDown:", function(self, _cmd, theEvent) {
with(self) {
objc_msgSend(self, "interpretKeyEvents:", objc_msgSend(NSArray, "arrayWithObject:", theEvent));
}
}, "void");

class_addMethod(the_class, "resignFirstResponder", function(self, _cmd) {
with(self) {
if (_isEditable)
{
if (objc_msgSend(_delegate, "respondsToSelector:", "selector:"))
{
if (objc_msgSend(_delegate, "textShouldEndEditing:", self) == NO)
return NO;


}


}

return YES;
}
}, "void");

class_addMethod(the_class, "acceptsFirstResponder", function(self, _cmd) {
with(self) {
return YES;
}
}, "void");

class_addMethod(the_class, "glyphIndexForPoint:", function(self, _cmd, point) {
with(self) {
objc_msgSend(self, "lockFocus");
for(var i = 0;
i < _string.length;
i++){
var theGlyphLength = objc_msgSend(stringToCheck, "sizeWithAttributes:", null);
var nextGlyphLength = objc_msgSend(nextStringToCheck, "sizeWithAttributes:", null);
if ((theGlyphLength.width <= point.x) && (point.x <= nextGlyphLength.width))
{
return i;

}


}
objc_msgSend(self, "unlockFocus");
return _string.length;
}
}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
with(self) {
var location = objc_msgSend(self, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), null);
var theRange = NSMakeRange(objc_msgSend(self, "glyphIndexForPoint:", location),0);
objc_msgSend(self, "setSelectedRange:", theRange);
}
}, "void");

class_addMethod(the_class, "mouseUp:", function(self, _cmd, theEvent) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {
with(self) {
if (_drawsBackground)
{
rect = NSMakeRect(rect.origin.x + 3,rect.origin.y + 3,rect.size.width - 6,rect.size.height - 6);
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 1), "set");
objc_msgSend(NSBezierPath, "fillRect:", rect);

}

objc_msgSend(objc_msgSend(NSColor, "textColor"), "set");
objc_msgSend(objc_msgSend(NSFont, "systemFontOfSize:", objc_msgSend(NSFont, "systemFontSize")), "set");
var textRect = NSMakeRect(rect.origin.x,rect.origin.y + 1,0,0);
objc_msgSend(_string, "drawWithRect:options:attributes:", textRect, null, null);
var fullStringWidth = objc_msgSend(_string, "sizeWithAttributes:", null);
if (_selectedRange.length == 0)
{
var stringBeforeWidth = objc_msgSend(stringBeforeLocation, "sizeWithAttributes:", null);
objc_msgSend(objc_msgSend(NSColor, "textColor"), "set");
var blinkingCursor = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(blinkingCursor, "moveToPoint:", NSMakePoint(rect.origin.x + stringBeforeWidth.width + 0.5,rect.origin.y - 1));
objc_msgSend(blinkingCursor, "lineToPoint:", NSMakePoint(rect.origin.x + stringBeforeWidth.width + 0.5,rect.origin.y + rect.size.height));
objc_msgSend(blinkingCursor, "stroke");

}

}
}, "void");

class_addMethod(the_class, "string", function(self, _cmd) {
with(self) {
return _string;
}
}, "void");

class_addMethod(the_class, "setBackgroundColor:", function(self, _cmd, aColor) {
with(self) {
_backgroundColor = aColor;
}
}, "void");

class_addMethod(the_class, "backgroundColor", function(self, _cmd) {
with(self) {
return _backgroundColor;
}
}, "void");

class_addMethod(the_class, "setDrawsBackground:", function(self, _cmd, flag) {
with(self) {
_drawsBackground = flag;
}
}, "void");

class_addMethod(the_class, "drawsBackground", function(self, _cmd) {
with(self) {
return _drawsBackground;
}
}, "void");

class_addMethod(the_class, "setEditable:", function(self, _cmd, flag) {
with(self) {
_isEditable = flag;
}
}, "void");

class_addMethod(the_class, "isEditable", function(self, _cmd) {
with(self) {
return _isEditable;
}
}, "void");

class_addMethod(the_class, "setSelectable:", function(self, _cmd, flag) {
with(self) {
_isSelectable = flag;
}
}, "void");

class_addMethod(the_class, "isSelectable", function(self, _cmd) {
with(self) {
return _isSelectable;
}
}, "void");

class_addMethod(the_class, "setFieldEditor:", function(self, _cmd, flag) {
with(self) {
_isFieldEditor = flag;
}
}, "void");

class_addMethod(the_class, "isFieldEditor", function(self, _cmd) {
with(self) {
return _isFieldEditor;
}
}, "void");

class_addMethod(the_class, "setRichText:", function(self, _cmd, flag) {
with(self) {
_isRichText = flag;
}
}, "void");

class_addMethod(the_class, "isRichText", function(self, _cmd) {
with(self) {
return _isRichText;
}
}, "void");

class_addMethod(the_class, "setImportsGraphics:", function(self, _cmd, flag) {
with(self) {
_importsGraphics = flag;
}
}, "void");

class_addMethod(the_class, "importsGraphics", function(self, _cmd) {
with(self) {
return _importsGraphics;
}
}, "void");

class_addMethod(the_class, "setUsesFontPanel:", function(self, _cmd, flag) {
with(self) {
_usesFontPanel = flag;
}
}, "void");

class_addMethod(the_class, "usesFontPanel", function(self, _cmd) {
with(self) {
return _usesFontPanel;
}
}, "void");

class_addMethod(the_class, "toggleRuler:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isRulerVisible", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setSelectedRange:", function(self, _cmd, aRange) {
with(self) {
_selectedRange = aRange;
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "selectedRange", function(self, _cmd) {
with(self) {
return _selectedRange;
}
}, "void");

class_addMethod(the_class, "replaceCharactersInRange:withRTF:", function(self, _cmd, aRange, rtfData) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceCharactersInRange:withRTFD:", function(self, _cmd, aRange, rtfdData) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceCharactersInRange:withString:", function(self, _cmd, aRange, aString) {
with(self) {
objc_msgSend(self, "postTextDidChangeNotification");
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "setString:", function(self, _cmd, aString) {
with(self) {
_string = aString;
}
}, "void");

class_addMethod(the_class, "selectAll:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "copy:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "cut:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "paste:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "copyFont:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "pasteFont:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "copyRuler:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "pasteRuler:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "changeFont:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setFont:", function(self, _cmd, aFont) {
with(self) {
_font = aFont;
}
}, "void");

class_addMethod(the_class, "setFont:range:", function(self, _cmd, aFont, aRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "font", function(self, _cmd) {
with(self) {
return _font;
}
}, "void");

class_addMethod(the_class, "setAlignment:", function(self, _cmd, mode) {
with(self) {
_textAlignment = mode;
}
}, "void");

class_addMethod(the_class, "alignCenter:", function(self, _cmd, sender) {
with(self) {
objc_msgSend(self, "setAlignment:", 2);
}
}, "void");

class_addMethod(the_class, "alignLeft:", function(self, _cmd, sender) {
with(self) {
objc_msgSend(self, "setAlignment:", 0);
}
}, "void");

class_addMethod(the_class, "alignRight:", function(self, _cmd, sender) {
with(self) {
objc_msgSend(self, "setAlignment:", 1);
}
}, "void");

class_addMethod(the_class, "alignment", function(self, _cmd) {
with(self) {
return _textAlignment;
}
}, "void");

class_addMethod(the_class, "setTextColor:", function(self, _cmd, aColor) {
with(self) {
_textColor = aColor;
}
}, "void");

class_addMethod(the_class, "setTextColor:range:", function(self, _cmd, aColor, aRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "textColor", function(self, _cmd) {
with(self) {
return _textColor;
}
}, "void");

class_addMethod(the_class, "baseWritingDirection", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setBaseWritingDirection:", function(self, _cmd, writingDirection) {
with(self) {
}
}, "void");

class_addMethod(the_class, "superscript:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "subscript:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "unscript:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "underline:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setMaxSize:", function(self, _cmd, aSize) {
with(self) {
_maxSize = aSize;
}
}, "void");

class_addMethod(the_class, "maxSize", function(self, _cmd) {
with(self) {
return _maxSize;
}
}, "void");

class_addMethod(the_class, "setMinSize:", function(self, _cmd, aSize) {
with(self) {
_minSize = aSize;
}
}, "void");

class_addMethod(the_class, "minSize", function(self, _cmd) {
with(self) {
return _minSize;
}
}, "void");

class_addMethod(the_class, "setVerticallyResizable:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isVerticallyResizable", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setHorizontallyResizable:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isHorizontallyResizable", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sizeToFit", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "scrollRangeToVisible:", function(self, _cmd, aRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {
with(self) {
return _delegate;
}
}, "void");

class_addMethod(the_class, "postTextDidChangeNotification", function(self, _cmd) {
with(self) {
}
}, "void");

