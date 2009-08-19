// 
//  objc-exception.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function objc_exception()
{
  this._name = "";
  this._reason = ""
  this._userInfo = new CFDictionaryRef();
  return this;
}

objc_exception.prototype.toString = function()
{
  return this._name + ": " + this._reason;
}

function objc_exception_create()
{
  return new objc_exception();
}

// extern void objc_exception_throw(id exception);
// 
function objc_exception_throw(exception)
{
  throw exception;
}

// extern void objc_exception_try_enter(void *localExceptionData);
// 
function objc_exception_try_enter(localExcdptionData)
{
  
}

// extern void objc_exception_try_exit(void *localExceptionData);
// 
function objc_exception_try_exit(localExceptionData)
{
  
}

// extern id objc_exception_extract(void *localExceptionData);
// 
function objc_exception_extract(localExceptionData)
{
  
}

// extern int objc_exception_match(Class exceptionClass, id exception);
// 
function objc_exception_match(exceptionClass, exception)
{
  
}
