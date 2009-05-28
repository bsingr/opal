var the_class = objc_allocateClassPair(NSObjectController, "NSArrayController");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_objectClass", "NSString");
class_addIvar(the_class, "_content", "id");
class_addIvar(the_class, "_selection", "id");
class_addIvar(the_class, "_editable", "BOOL");
class_addIvar(the_class, "_automaticallyPreparesContent", "BOOL");
class_addIvar(the_class, "_selectionIndex", "NSUInteger");
class_addIvar(the_class, "_preservesSelection", "BOOL");

class_addMethod(the_class, "init", function(self, _cmd) {
if (Unhandled output_expression: [((), [=(=), self (IDENTIFIER), [M(), super (IDENTIFIER), init (IDENTIFIER)]], ])
{

}

return self;

}, "void");

class_addMethod(the_class, "prepareContent", function(self, _cmd) {
var anArray = objc_msgSend(objc_msgSend(NSMutableArray, "alloc"), "initWithCapacity:", 1);
objc_msgSend(anArray, "addObject:", objc_msgSend(self, "newObject"));
objc_msgSend(self, "setContent:", anArray);

}, "void");

class_addMethod(the_class, "arrangedObjects", function(self, _cmd) {
return _content;

}, "void");

class_addMethod(the_class, "add:", function(self, _cmd, sender) {
if (objc_msgSend(self, "canAdd"))
objc_msgSend(self, "insert:", sender);


}, "void");

class_addMethod(the_class, "preservesSelection", function(self, _cmd) {
return _preservesSelection;

}, "void");

class_addMethod(the_class, "setPreservesSelection:", function(self, _cmd, flag) {
_preservesSelection = flag;

}, "void");

class_addMethod(the_class, "selectionIndex", function(self, _cmd) {
return _selectionIndex;

}, "void");

class_addMethod(the_class, "setSelectionIndex:", function(self, _cmd, index) {
objc_msgSend(self, "setSelectionIndexes:", index);

}, "void");

class_addMethod(the_class, "setSelectionIndexes:", function(self, _cmd, indexes) {
_selectionIndex = indexes;
return YES;

}, "void");

class_addMethod(the_class, "selectionIndexes", function(self, _cmd) {
return _selectionIndex;

}, "void");

class_addMethod(the_class, "selectedObjects", function(self, _cmd) {
var theObjects = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
objc_msgSend(theObjects, "addObject:", objc_msgSend(_content, "objectAtIndex:", objc_msgSend(self, "selectionIndex")));
return theObjects;

}, "void");

class_addMethod(the_class, "selectNext:", function(self, _cmd, sender) {
var currentSelection = objc_msgSend(self, "selectionIndex");
if (objc_msgSend(self, "canSelectNext"))
objc_msgSend(self, "setSelectionIndex:", Unhandled output_expression: [((), [+(), currentSelection (IDENTIFIER), 1 (CONSTANT)], ]);


}, "void");

class_addMethod(the_class, "canSelectNext", function(self, _cmd) {
if (Unhandled output_expression: [AND_OP(), [((), [>(), [M(), _content (IDENTIFIER), count (IDENTIFIER)], 1 (CONSTANT)], ], [((), [<(), [M(), self (IDENTIFIER), selectionIndex (IDENTIFIER)], [((), [-(), [M(), _content (IDENTIFIER), count (IDENTIFIER)], 1 (CONSTANT)], ]], ]])
return YES;

return NO;

}, "void");

class_addMethod(the_class, "selectPrevious:", function(self, _cmd, sender) {
var currentSelection = objc_msgSend(self, "selectionIndex");
if (objc_msgSend(self, "canSelectPrevious"))
objc_msgSend(self, "setSelectionIndex:", Unhandled output_expression: [((), [-(), currentSelection (IDENTIFIER), 1 (CONSTANT)], ]);


}, "void");

class_addMethod(the_class, "canSelectPrevious", function(self, _cmd) {
return NO;

}, "void");

class_addMethod(the_class, "canInsert", function(self, _cmd) {
return objc_msgSend(self, "isEditable");

}, "void");

class_addMethod(the_class, "insert:", function(self, _cmd, sender) {
if (Unhandled output_expression: [,(), ! (!), [M(), self (IDENTIFIER), canInsert (IDENTIFIER)]])
return ;

objc_msgSend(self, "addObject:", objc_msgSend(self, "newObject"));

}, "void");

class_addMethod(the_class, "addObject:", function(self, _cmd, object) {
if (Unhandled output_expression: [,(), ! (!), [M(), self (IDENTIFIER), canAdd (IDENTIFIER)]])
return ;

objc_msgSend(_content, "addObject:", object);

}, "void");

class_addMethod(the_class, "addObjects:", function(self, _cmd, objects) {

}, "void");

class_addMethod(the_class, "removeObjectAtArrangedObjectIndex:", function(self, _cmd, index) {

}, "void");

class_addMethod(the_class, "removeObjectsAtArrangedObjectIndexes:", function(self, _cmd, indexes) {

}, "void");

class_addMethod(the_class, "remove:", function(self, _cmd, sender) {
NSLog("[NSArrayController remove] - Need to implement");
objc_msgSend(self, "removeObjectsAtArrangedObjectIndexes:", objc_msgSend(self, "selectionIndexes"));

}, "void");

class_addMethod(the_class, "removeObject:", function(self, _cmd, object) {
if (Unhandled output_expression: [,(), ! (!), [M(), self (IDENTIFIER), canRemove (IDENTIFIER)]])
return ;

objc_msgSend(_content, "removeObject:", object);

}, "void");

class_addMethod(the_class, "removeObjects:", function(self, _cmd, objects) {

}, "void");

