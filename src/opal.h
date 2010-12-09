#ifndef __OPAL_H__
#define __OPAL_H__

#include "v8.h"

namespace opal {
  
  int ExecutablePath(char* buffer, size_t* size);
  void LoadRuntime(void);
  
  void InitFile();
  void InitIO();
}

void RunShell(v8::Handle<v8::Context> context);
v8::Handle<v8::String> ReadFile(const char* name);
bool ExecuteString(v8::Handle<v8::String> source,
									 v8::Handle<v8::String> name,
									 bool print_result,
 									 bool report_exceptions);

v8::Handle<v8::Value> Print(const v8::Arguments& args);
v8::Handle<v8::Value> Quit(const v8::Arguments& args);

void ReportException(v8::TryCatch* handler);

#define JS_STR(str)             v8::String::New(str)
#define JS_FUNC(func)           v8::FunctionTemplate::New(func)
#define JS_INT(num)             v8::Integer::New(num)

#define JS_TRUE                 v8::Boolean::New(1)
#define JS_FALSE                v8::Boolean::New(0)

#define JS_GLOBAL               v8::Context::GetCurrent()->Global()


#define JS_SET(obj,str,val)     obj->Set(JS_STR(str), val)

#endif
