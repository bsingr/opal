#include "opal.h"

namespace opal {
	
	v8::Handle<v8::Value> Stat(const v8::Arguments& args) {
    v8::HandleScope handle_scope;
		return v8::Undefined();
	}
	
	v8::Handle<v8::Value> Cwd(const v8::Arguments& args) {
    v8::HandleScope handle_scope;
		return JS_TRUE;
	}
	
	void InitFile() {
		printf("init file!\n");
		
		v8::Handle<v8::Object> opal_file = v8::Object::New();
		JS_SET(JS_GLOBAL, "opal_file", opal_file);
		
		JS_SET(opal_file, "stat", JS_FUNC(Stat)->GetFunction());
		JS_SET(opal_file, "cwd", JS_FUNC(Cwd)->GetFunction());
	}
}
