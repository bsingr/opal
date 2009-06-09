var NSControlTintDidChangeNotification = "NSControlTintDidChangeNotification";
var the_class = objc_allocateClassPair(NSObject, "NSCell");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_value", "id");
class_addIvar(the_class, "_state", "NSCellStateValue");
class_addIvar(the_class, "_isHighlighted", "BOOL");
class_addIvar(the_class, "_isEnabled", "BOOL");
class_addIvar(the_class, "_isEditable", "BOOL");
class_addIvar(the_class, "_isBordered", "BOOL");
class_addIvar(the_class, "_isBezeled", "BOOL");
class_addIvar(the_class, "_isSelectable", "BOOL");
class_addIvar(the_class, "_isScrollable", "BOOL");
class_addIvar(the_class, "_alignment", "NSUInteger");
class_addIvar(the_class, "_controlSize", "NSSize");
class_addIvar(the_class, "_controlView", "NSView");
class_addIvar(the_class, "_target", "id");
class_addIvar(the_class, "_action", "SEL");

class_addMethod(the_class, "initTextCell:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initImageCell:", function(self, _cmd, image) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
objc_msgSendSuper({super_class:NSObject, receiver:self}, "initWithCoder:", aCoder);
_value = objc_msgSend(aCoder, "decodeObjectForKey:", "NSContents");
var _flags = objc_msgSend(aCoder, "decodeIntForKey:", "NSCellFlags");
var _flags2 = objc_msgSend(aCoder, "decodeIntForKey:", "NSCellFlags2");
_state = (flags & 0x80000000) ? 1 : 0;
_isHighlighted = (flags & 0x40000000) ? YES : NO;
_isEnabled = (flags & 0x20000000) ? NO : YES;
_isEditable = (flags & 0x10000000) ? YES : NO;
_isBordered = (flags & 0x00800000) ? YES : NO;
_isBezeled = (flags & 0x00400000) ? YES : NO;
_isSelectable = (flags & 0x00200000) ? YES : NO;
_isScrollable = (flags & 0x00100000) ? YES : NO;
_alignment = (flags2 & 0x1c000000) >> 26;
_controlSize = (flags2 & 0xE0000) >> 17;
return self;
}
}, "void");

class_addMethod(the_class, "controlView", function(self, _cmd) {
with(self) {
return _controlView;
}
}, "void");

class_addMethod(the_class, "setControlView:", function(self, _cmd, view) {
with(self) {
_controlView = view;
}
}, "void");

class_addMethod(the_class, "type", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setType:", function(self, _cmd, aType) {
with(self) {
}
}, "void");

class_addMethod(the_class, "state", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setState:", function(self, _cmd, value) {
with(self) {
}
}, "void");

class_addMethod(the_class, "target", function(self, _cmd) {
with(self) {
return _target;
}
}, "void");

class_addMethod(the_class, "setTarget:", function(self, _cmd, anObject) {
with(self) {
_target = anObject;
}
}, "void");

class_addMethod(the_class, "action", function(self, _cmd) {
with(self) {
return _action;
}
}, "void");

class_addMethod(the_class, "setAction:", function(self, _cmd, aSelector) {
with(self) {
_action = aSelector;
}
}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTag:", function(self, _cmd, anInt) {
with(self) {
}
}, "void");

class_addMethod(the_class, "title", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTitle:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isOpaque", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isEnabled", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setEnabled:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sendActionOn:", function(self, _cmd, mask) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isContinuous", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setContinuous:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isEditable", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setEditable:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isSelectable", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setSelectable:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isBordered", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setBordered:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isBezeled", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setBezeled:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isScrollable", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setScrollable:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isHighlighted", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setHighlighted:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "alignment", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAlignment:", function(self, _cmd, mode) {
with(self) {
}
}, "void");

class_addMethod(the_class, "wraps", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setWraps:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "font", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setFont:", function(self, _cmd, fontObj) {
with(self) {
}
}, "void");

class_addMethod(the_class, "entryType", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setEntryType:", function(self, _cmd, aType) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isEntryAcceptable:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setFloatingPointFormat:left:right:", function(self, _cmd, autoRange, leftDigits, rightDigits) {
with(self) {
}
}, "void");

class_addMethod(the_class, "keyEquivalent", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setFormatter:", function(self, _cmd, newFormatter) {
with(self) {
}
}, "void");

class_addMethod(the_class, "formatter", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "objectValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setObjectValue:", function(self, _cmd, obj) {
with(self) {
}
}, "void");

class_addMethod(the_class, "hasValidObjectValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stringValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setStringValue:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "compare:", function(self, _cmd, otherCell) {
with(self) {
}
}, "void");

class_addMethod(the_class, "intValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setIntValue:", function(self, _cmd, anInt) {
with(self) {
}
}, "void");

class_addMethod(the_class, "floatValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setFloatValue:", function(self, _cmd, aFloat) {
with(self) {
}
}, "void");

class_addMethod(the_class, "doubleValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setDoubleValue:", function(self, _cmd, aDouble) {
with(self) {
}
}, "void");

class_addMethod(the_class, "takeIntValueFrom:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "takeFloatValueFrom:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "takeDoubleValueFrom:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "takeStringValueFrom:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "takeObjectValueFrom:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "image", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setImage:", function(self, _cmd, image) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setControlTint:", function(self, _cmd, controlTint) {
with(self) {
}
}, "void");

class_addMethod(the_class, "controlTint", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setControlSize:", function(self, _cmd, size) {
with(self) {
}
}, "void");

class_addMethod(the_class, "controlSize", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "representedObject", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setRepresentedObject:", function(self, _cmd, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "cellAttribute:", function(self, _cmd, aParameter) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setCellAttribute:to:", function(self, _cmd, aParameter, value) {
with(self) {
}
}, "void");

class_addMethod(the_class, "imageRectForBounds:", function(self, _cmd, theRect) {
with(self) {
}
}, "void");

class_addMethod(the_class, "titleRectForBounds:", function(self, _cmd, theRect) {
with(self) {
return theRect;
}
}, "void");

class_addMethod(the_class, "drawingRectForBounds:", function(self, _cmd, theRect) {
with(self) {
}
}, "void");

class_addMethod(the_class, "cellSize", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "cellSizeForBounds:", function(self, _cmd, aRect) {
with(self) {
}
}, "void");

class_addMethod(the_class, "highlightColorWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
}
}, "void");

class_addMethod(the_class, "calcDrawInfo:", function(self, _cmd, aRect) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setUpFieldEditorAttributes:", function(self, _cmd, textObj) {
with(self) {
objc_msgSend(textObj, "setAlignment:", objc_msgSend(self, "alignment"));
objc_msgSend(textObj, "setString:", objc_msgSend(self, "stringValue"));
objc_msgSend(textObj, "setSelectable:", objc_msgSend(self, "isSelectable"));
objc_msgSend(self, "setEditable:", objc_msgSend(self, "isEditable"));
if (objc_msgSend(self, "respondsToSelector:", "selector:"))
objc_msgSend(textObj, "setDrawsBackground:", objc_msgSend(self, "drawsBackground"));

if (objc_msgSend(self, "respondsToSelector:", "selector:"))
objc_msgSend(textObj, "setBackgroundColor:", objc_msgSend(self, "backgroundColor"));

return textObj;
}
}, "void");

class_addMethod(the_class, "drawInteriorWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
objc_msgSend(self, "drawInteriorWithFrame:inView:", cellFrame, controlView);
}
}, "void");

class_addMethod(the_class, "highlight:withFrame:inView:", function(self, _cmd, flag, cellFrame, controlView) {
with(self) {
if (objc_msgSend(self, "isHighlighted") != flag)
{
objc_msgSend(self, "setHighlighted:", flag);
objc_msgSend(self, "drawWithFrame:inView:", cellFrame, controlView);

}

}
}, "void");

class_addMethod(the_class, "mouseDownFlags", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getPeriodicDelay:interval:", function(self, _cmd, delay, interval) {
with(self) {
}
}, "void");

class_addMethod(the_class, "startTrackingAt:inView:", function(self, _cmd, startPoint, controlView) {
with(self) {
}
}, "void");

class_addMethod(the_class, "continueTracking:at:inView:", function(self, _cmd, lastPoint, currentPoint, controlView) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stopTracking:at:inView:mouseIsUp:", function(self, _cmd, lastPoint, stopPoint, controlView, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "trackMouse:inRect:ofView:untilMouseUp:", function(self, _cmd, theEvent, cellFrame, controlView, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "editWithFrame:inView:editor:delegate:event:", function(self, _cmd, aRect, controlView, textObj, anObject, theEvent) {
with(self) {
if (!_isEditable && !_isSelectable)
return ;

objc_msgSend(textObj, "setFrame:", objc_msgSend(self, "titleRectForBounds:", aRect));
objc_msgSend(controlView, "addSubview:", textObj);
objc_msgSend(objc_msgSend(controlView, "window"), "makeFirstResponder:", textObj);
objc_msgSend(textObj, "setDelegate:", anObject);
objc_msgSend(textObj, "mouseDown:", theEvent);
}
}, "void");

class_addMethod(the_class, "selectWithFrame:inView:editor:delegate:start:length:", function(self, _cmd, aRect, controlView, textObj, anObject, selStart, selLength) {
with(self) {
if (!_isEditable && !_isSelectable)
return ;

objc_msgSend(textObj, "setFrame:", objc_msgSend(self, "titleRectForBounds:", aRect));
objc_msgSend(controlView, "addSubview:", textObj);
objc_msgSend(objc_msgSend(controlView, "window"), "makeFirstResponder:", textObj);
objc_msgSend(textObj, "setDelegate:", anObject);
objc_msgSend(textObj, "setSelectedRange:", null);
}
}, "void");

class_addMethod(the_class, "endEditing:", function(self, _cmd, textObj) {
with(self) {
objc_msgSend(self, "setStringValue:", objc_msgSend(textObj, "string"));
}
}, "void");

class_addMethod(the_class, "resetCursorRect:inView:", function(self, _cmd, cellFrame, controlView) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setMenu:", function(self, _cmd, aMenu) {
with(self) {
}
}, "void");

class_addMethod(the_class, "menu", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "menuForEvent:inRect:ofView:", function(self, _cmd, event, cellFrame, view) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setSendsActionOnEndEditing:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sendsActionOnEndEditing", function(self, _cmd) {
with(self) {
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

class_addMethod(the_class, "setLineBreakMode:", function(self, _cmd, mode) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lineBreakMode", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAllowsUndo:", function(self, _cmd, allowsUndo) {
with(self) {
}
}, "void");

class_addMethod(the_class, "allowsUndo", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "integerValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setIntegerValue:", function(self, _cmd, anInteger) {
with(self) {
}
}, "void");

class_addMethod(the_class, "takeIntegerValueFrom:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "truncatesLastVisibleLine", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTruncatesLastVisibleLine:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "prefersTrackingUntilMouseUp", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "defaultMenu", function(self, _cmd) {
with(self) {
}
}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "setRefusesFirstResponder:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "refusesFirstResponder", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "acceptsFirstResponder", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setShowsFirstResponder:", function(self, _cmd, showFR) {
with(self) {
}
}, "void");

class_addMethod(the_class, "showsFirstResponder", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setMnemonicLocation:", function(self, _cmd, location) {
with(self) {
}
}, "void");

class_addMethod(the_class, "mnemonicLocation", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "mnemonic", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTitleWithMnemonic:", function(self, _cmd, stringWithAmpersand) {
with(self) {
}
}, "void");

class_addMethod(the_class, "performClick:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setFocusRingType:", function(self, _cmd, focusRingType) {
with(self) {
}
}, "void");

class_addMethod(the_class, "focusRingType", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "wantsNotificationForMarkedText", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "defaultFocusRingType", function(self, _cmd) {
with(self) {
}
}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "attributedStringValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAttributedStringValue:", function(self, _cmd, obj) {
with(self) {
}
}, "void");

class_addMethod(the_class, "allowsEditingTextAttributes", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAllowsEditingTextAttributes:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "importsGraphics", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setImportsGraphics:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "setAllowsMixedState:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "allowsMixedState", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "nextState", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setNextState", function(self, _cmd) {
with(self) {
}
}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "hitTestForEvent:inRect:ofView:", function(self, _cmd, event, cellFrame, controlView) {
with(self) {
}
}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "expansionFrameWithFrame:inView:", function(self, _cmd, cellFrame, view) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawWithExpansionFrame:inView:", function(self, _cmd, cellFrame, view) {
with(self) {
}
}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "backgroundStyle", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setBackgroundStyle:", function(self, _cmd, style) {
with(self) {
}
}, "void");

class_addMethod(the_class, "interiorBackgroundStyle", function(self, _cmd) {
with(self) {
}
}, "void");

