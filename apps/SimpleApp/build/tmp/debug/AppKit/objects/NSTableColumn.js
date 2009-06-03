var the_class = objc_allocateClassPair(NSObject, "NSTableColumn");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_identifier", "NSString");
class_addIvar(the_class, "_tableView", "NSTableView");
class_addIvar(the_class, "_width", "NSUInteger");
class_addIvar(the_class, "_minWidth", "NSUInteger");
class_addIvar(the_class, "_maxWidth", "NSUInteger");
class_addIvar(the_class, "_headerCell", "NSCell");
class_addIvar(the_class, "_dataCell", "NSCell");
class_addIvar(the_class, "_editable", "BOOL");
class_addIvar(the_class, "_hidden", "BOOL");

class_addMethod(the_class, "initWithIdentifier:", function(self, _cmd, identifier) {
objc_msgSend(self, "init");
if (self)
{
objc_msgSend(self, "setIdentifier:", identifier);
_headerCell = objc_msgSend(objc_msgSend(NSTableHeaderCell, "alloc"), "init");
_dataCell = objc_msgSend(objc_msgSend(NSTextFieldCell, "alloc"), "init");
objc_msgSend(_dataCell, "setEditable:", YES);
objc_msgSend(_dataCell, "setSelectable:", YES);

}

return self;

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSObject, receiver:self}, "initWithCoder:", aCoder);
_identifier = objc_msgSend(aCoder, "decodeStringForKey:", "NSIdentifier");
_headerCell = objc_msgSend(aCoder, "decodeObjectForKey:", "NSHeaderCell");
_dataCell = objc_msgSend(aCoder, "decodeObjectForKey:", "NSDataCell");
_width = objc_msgSend(aCoder, "decodeIntForKey:", "NSWidth");
_minWidth = objc_msgSend(aCoder, "decodeIntForKey:", "NSMinWidth");
_maxWidth = objc_msgSend(aCoder, "decodeIntForKey:", "NSMaxWidth");
NSLog(_width);
return self;

}, "void");

class_addMethod(the_class, "setTableView:", function(self, _cmd, aTableView) {
_tableView = aTableView;

}, "void");

class_addMethod(the_class, "tableView", function(self, _cmd) {
return _tableView;

}, "void");

class_addMethod(the_class, "setWidth:", function(self, _cmd, newWidth) {
_width = newWidth;

}, "void");

class_addMethod(the_class, "width", function(self, _cmd) {
return _width;

}, "void");

class_addMethod(the_class, "setHeaderCell:", function(self, _cmd, aCell) {
_headerCell = aCell;

}, "void");

class_addMethod(the_class, "headerCell", function(self, _cmd) {
return _headerCell;

}, "void");

class_addMethod(the_class, "setDataCell:", function(self, _cmd, aCell) {
_dataCell = aCell;

}, "void");

class_addMethod(the_class, "dataCell", function(self, _cmd) {
return _dataCell;

}, "void");

class_addMethod(the_class, "dataCellForRow:", function(self, _cmd, row) {
return _dataCell;

}, "void");

class_addMethod(the_class, "setIdentifier:", function(self, _cmd, anObject) {
_identifier = anObject;

}, "void");

class_addMethod(the_class, "identifier", function(self, _cmd) {
return _identifier;

}, "void");

class_addMethod(the_class, "setEditable:", function(self, _cmd, flag) {
if (flag == 0)
flag = NO;

_editable = flag;

}, "void");

class_addMethod(the_class, "isEditable", function(self, _cmd) {
return _editable;

}, "void");

class_addMethod(the_class, "isHidden", function(self, _cmd) {
return _hidden;

}, "void");

class_addMethod(the_class, "setHidden:", function(self, _cmd, hidden) {
_hidden = hidden;

}, "void");

