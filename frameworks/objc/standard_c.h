// 
//  standard_c.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-03.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

extern void printf(char *format, ...);


// ==========================================================
// = Variable arguments: va_list, va_args, va_start, va_end =
// ==========================================================

// Example Usage: (In C/Objective-C)
// ==================================
// 
// - (void) appendObjects:(id) firstObject, ...
// {
//     id eachObject;
//     va_list argumentList;
//     if (firstObject)
//     {
//         NSLog(@"%@", firstObject);
//         va_start(argumentList, firstObject);
//         while (eachObject = va_arg(argumentList, id))
//             NSLog(@"%@", eachObject);            
//         va_end(argumentList);
//     }
// }

// Example Usage: (In javascript)
// ===============================
// 
// This function will print a list of all arguments after firstObject (and
// including firstObject).
// 
// function appendObject(self, op, firstObject)
// {
//  var eachObject;
//  var argumentList = {all: arguments, trailing: []};
//  if (firstObject)
//  {
//      console.log(firstObject);
//      va_start(argumentList, firstObject);
//      while(eachObject = va_arg(argumentList, true))
//          console.log(eachObject);
//      va_end(argumentList);
//  }
// }

// struct defining argument list. arguments are all the arguments that are sent to
// a function, and trailing are the aguments created after va_start. You should not
// really need to ever deal with this struct, just the functions outlined below
struct {
    void *arguments[];
    void *trailing[];
} va_list;

void va_start(va_list ap, void *last); 
void *va_arg(va_list ap, void *type); 
void va_end(va_list ap); 
void va_copy(va_list dest, va_list src);