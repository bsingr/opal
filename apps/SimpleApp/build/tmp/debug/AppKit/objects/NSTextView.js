var NSTextViewWillChangeNotifyingTextViewNotification = "NSTextViewWillChangeNotifyingTextViewNotification";
var NSTextViewDidChangeSelectionNotification = "NSTextViewDidChangeSelectionNotification";
var NSTextViewDidChangeTypingAttributesNotification = "NSTextViewDidChangeTypingAttributesNotification";
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

class_addMethod(the_class, "initWithFrame:textContainer:", function(self, _cmd, frameRect, container) {
with(self) {
self = objc_msgSendSuper({super_class:NSText, receiver:self}, "initWithFrame:", frameRect);
_textStorage = objc_msgSend(objc_msgSend(container, "layoutManager"), "textStorage");
_textContainer = container;
objc_msgSend(_textContainer, "setTextView:", self);
_isEditable = YES;
_isSelectable = YES;
_isRichText = YES;
_drawsBackground = YES;
_textAlignment = 0;
_selectedRange = NSMakeRange(0,0);
return self;
}
}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
with(self) {
var storage = objc_msgSend(objc_msgSend(NSTextStorage, "alloc"), "init");
var layout = objc_msgSend(objc_msgSend(NSLayoutManager, "alloc"), "init");
var container = objc_msgSend(objc_msgSend(NSTextContainer, "alloc"), "initWithContainerSize:", frameRect.size);
objc_msgSend(storage, "addLayoutManager:", layout);
objc_msgSend(layout, "addTextContainer:", container);
self = objc_msgSend(self, "initWithFrame:textContainer:", frameRect, container);
return self;
}
}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
with(self) {
}
}, "void");

class_addMethod(the_class, "textContainer", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTextContainer:", function(self, _cmd, container) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceTextContainer:", function(self, _cmd, newContainer) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTextContainerInset:", function(self, _cmd, inset) {
with(self) {
}
}, "void");

class_addMethod(the_class, "textContainerInset", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "textContainerOrigin", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "invalidateTextContainerOrigin", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "layoutManager", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "textStorage", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "insertText:", function(self, _cmd, insertString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setConstrainedFrameSize:", function(self, _cmd, desiredSize) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAlignment:range:", function(self, _cmd, alignment, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setBaseWritingDirection:range:", function(self, _cmd, writingDirection, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "turnOffKerning:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "tightenKerning:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "loosenKerning:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "useStandardKerning:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "turnOffLigatures:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "useStandardLigatures:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "useAllLigatures:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "raiseBaseline:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lowerBaseline:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "toggleTraditionalCharacterShape:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "outline:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "performFindPanelAction:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "alignJustified:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "changeColor:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "changeAttributes:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "changeDocumentBackgroundColor:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "toggleBaseWritingDirection:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "orderFrontSpacingPanel:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "orderFrontLinkPanel:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "orderFrontListPanel:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "orderFrontTablePanel:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rulerView:didMoveMarker:", function(self, _cmd, ruler, marker) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rulerView:didRemoveMarker:", function(self, _cmd, ruler, marker) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rulerView:didAddMarker:", function(self, _cmd, ruler, marker) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rulerView:shouldMoveMarker:", function(self, _cmd, ruler, marker) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rulerView:shouldAddMarker:", function(self, _cmd, ruler, marker) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rulerView:willMoveMarker:toLocation:", function(self, _cmd, ruler, marker, location) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rulerView:shouldRemoveMarker:", function(self, _cmd, ruler, marker) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rulerView:willAddMarker:atLocation:", function(self, _cmd, ruler, marker, location) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rulerView:handleMouseDown:", function(self, _cmd, ruler, event) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setNeedsDisplayInRect:avoidAdditionalLayout:", function(self, _cmd, rect, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "shouldDrawInsertionPoint", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawInsertionPointInRect:color:turnedOn:", function(self, _cmd, rect, color, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawViewBackgroundInRect:", function(self, _cmd, rect) {
with(self) {
}
}, "void");

class_addMethod(the_class, "updateRuler", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "updateFontPanel", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "updateDragTypeRegistration", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "selectionRangeForProposedRange:granularity:", function(self, _cmd, proposedCharRange, granularity) {
with(self) {
}
}, "void");

class_addMethod(the_class, "clickedOnLink:atIndex:", function(self, _cmd, link, charIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "characterIndexForInsertionAtPoint:", function(self, _cmd, point) {
with(self) {
}
}, "void");

