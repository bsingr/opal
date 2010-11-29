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
	
	v8::Handle<v8::Value> Stat(const v8::Arguments& args) {
    v8::HandleScope handle_scope;
		return v8::Undefined();
	}
	
	v8::Handle<v8::Value> Exists(const v8::Arguments& args) {
		v8::String::Utf8Value path(args[0]->ToString());
		
		struct stat stat_info;
		int res = stat(*path, &stat_info);
		return (res != -1) ? JS_TRUE : JS_FALSE;
	}
	
	v8::Handle<v8::Value> Cwd(const v8::Arguments& args) {
    v8::HandleScope handle_scope;

		char *res = getcwd(NULL, 0);
		
		if (!res) {
			printf("could not find cwd\n");
		}
		
		v8::Handle<v8::String> cwd = JS_STR(res);
		
		free(res);
		
		return cwd;
	}
	
	v8::Handle<v8::Value> Open(const v8::Arguments& args) {
		v8::String::Utf8Value path(args[0]->ToString());
		
		int fd = open(*path, 0, 0777);
		
		if (fd < 0) {
			printf("bad file path: does not exist: %d\n", fd);
		}
		// printf("need to open %s\n", *path);
		return v8::Integer::New(fd);
	}
	
	v8::Handle<v8::Value> Close(const v8::Arguments& args) {
		int fd = args[0]->Int32Value();
		
		if (fd >= 0) close(fd);
		
		return v8::Undefined();
	}
	
	v8::Handle<v8::Value> Read(const v8::Arguments& args) {
		
		size_t buffer_size = 4048;
		size_t buffer_used = 0;
		
		int fd = args[0]->Int32Value();
		size_t len = args[2]->Int32Value();
		char *buf = (char *)malloc(buffer_size);
		size_t res;
		
		while (true) {
			
			if (buffer_used >= buffer_size) {
				// printf("buffer may not be bis enough!!\n");
				buffer_size += 4048;
				
				buf = (char *)realloc(buf, buffer_size);
			}
			
			res = read(fd, buf + buffer_used, len);
			// printf("read:\n%s\n", buf);
			// printf("res length: %d\n", (int)res);
			
			if (res <= 0) {
				// printf("done reading.\n");
				break;
			}
			else {
				// printf("read %d on this loop\n", (int)res);
				buffer_used += res;
			}
		}
		
		// printf("buffer: %s\n", buf);
		// res = read(fd, buf, len);
		
		if (res < 0)
			printf("exception to be raised in Read (< 0)\n");
		
		// return JS_STR(buf);
		v8::Handle<v8::String> result = v8::String::New(buf, buffer_used);
		free(buf);
		return result;
		
		// printf("%d - %d: %s\n",fd, (int)res, buf);
		// printf("%d\n", errno);
		// return JS_STR("wow");
	}
	
	void InitFile() {
		printf("init file!\n");
		
		v8::Handle<v8::Object> opal_file = v8::Object::New();
		JS_SET(JS_GLOBAL, "OpalFile", opal_file);
		
		JS_SET(opal_file, "stat", JS_FUNC(Stat)->GetFunction());
		JS_SET(opal_file, "cwd", JS_FUNC(Cwd)->GetFunction());
		JS_SET(opal_file, "open", JS_FUNC(Open)->GetFunction());
		JS_SET(opal_file, "read", JS_FUNC(Read)->GetFunction());
		JS_SET(opal_file, "close", JS_FUNC(Close)->GetFunction());
		JS_SET(opal_file, "exists", JS_FUNC(Exists)->GetFunction());
	}
}
