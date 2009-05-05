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

// extern id objc_msgSend(id self, SEL op, ...);
// 
function objc_msgSend(self, op)
{
    var theMethodImp = class_getMethodImplementation(self.isa, op);
    return theMethodImp.apply(self, arguments);
}

// extern id objc_msgSendSuper(struct objc_super *super, SEL op, ...);
// 
function objc_msgSendSuper(superCls, op, arguments)
{
    
}
