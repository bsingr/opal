// 
//  message.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-04.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// struct objc_super {
//     id receiver;
//     Class super_class;
// };
// 
function objc_super()
{
    this.receiver = null;
    this.super_class = null;
}

// extern id objc_msgSend(id self, SEL op, ...);
// 
function objc_msgSend(self, op)
{
    if(!self)
        printf("[... " + op + "]");
    var theMethodImp = class_getMethodImplementation(self.isa, op);
    return theMethodImp.apply(self, arguments);
}

// extern id objc_msgSendSuper(struct objc_super *super, SEL op, ...);
// 
function objc_msgSendSuper(superCls, op)
{
    var theMethodImp = class_getMethodImplementation(superCls.super_class, op);
    // We need to set args[0] to be 'self' and set it here to apply self to be function context
    return theMethodImp.apply(arguments[0] = superCls.receiver, arguments);
}
