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
		
		JS_SET(args.This(), "_input", v8::Integer::New(-1));
		JS_SET(args.This(), "_output", v8::Integer::New(-1));
		return args.This();
	}
	
	v8::Handle<v8::Value> IOWrite(const v8::Arguments& args) {
		// printf("need to write some data\n");
		
		int fd = args[0]->Int32Value();
		size_t len = args[2]->Int32Value();
		v8::String::Utf8Value buffer(args[1]->ToString());
		
		// printf("need to print %s to %d\n", *buffer, fd);
		write(fd, *buffer, len);
		return v8::Undefined();
	}
	
	void InitIO() {
		printf("init io!\n");
		
		v8::Handle<v8::FunctionTemplate> io_constructor = JS_FUNC(IO);
		v8::Handle<v8::ObjectTemplate> io_prototype = io_constructor->InstanceTemplate();
		
		JS_SET(JS_GLOBAL, "OpalIO", io_constructor->GetFunction());
		
		JS_SET(io_prototype, "write", JS_FUNC(IOWrite));
		
		// JS_SET(opal_io, "write", JS_FUNC(IOWrite)->GetFunction());
	}
}
