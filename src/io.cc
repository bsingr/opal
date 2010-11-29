#include "opal.h"

#include <dirent.h>
#include <errno.h>
#include <fcntl.h>
#include <limits.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>

#include <unistd.h>
#include <utime.h>

namespace opal {
	
	v8::Handle<v8::Value> IO(const v8::Arguments& args) {
		return v8::Undefined();
	}
	
	void InitIO() {
		printf("init io!\n");
		
		v8::Handle<v8::Object> opal_io = v8::Object::New();
		JS_SET(JS_GLOBAL, "OpalIO", opal_io);
		
		JS_SET(opal_io, "IO", JS_FUNC(IO)->GetFunction());
	}
}
