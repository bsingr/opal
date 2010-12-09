#include <fcntl.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

#include "opal.h"


// FIXME: mac specific..
#include <mach/task.h>
#include <mach/mach_init.h>
#include <mach-o/dyld.h> 
// end fixme..

#include <sys/stat.h>
#include <unistd.h>

#include <stdio.h>
#include <stdlib.h>
#include <libgen.h>

namespace opal {
	
	// full path to our bin/opal file
	static char *opal_exec_path;
	// full path to our opal dir (base of runtime, lib, bin, etc)
	static char *opal_home_path;
	// full path to lib dir, for all rubies etc
	static char *opal_lib_path;
	// all argv
	static char** opal_argv;
	// all argv
	static int opal_argc;

	int Main(int argc, char *argv[]) {
		v8::V8::SetFlagsFromCommandLine(&argc, argv, true);
		v8::HandleScope handle_scope;
		// Create a template for the global object
		v8::Handle<v8::ObjectTemplate> global = v8::ObjectTemplate::New();
		// Bind the global print function to the c++ Print callback
		JS_SET(global, "print", JS_FUNC(Print));		
		// bind global quit function
		JS_SET(global, "quit", JS_FUNC(Quit));
		// Create a new execution environment containing the build in functions
		v8::Handle<v8::Context> context = v8::Context::New(NULL, global);
		// Enter the newly created execution environment
		v8::Context::Scope context_scope(context);

		opal_argv = argv;
		opal_argc = argc;


		InitFile();
		InitIO();
	
		printf("all done initing\n");
    printf("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");
    system("pwd");
    system("cd /Users/adam && pwd");
    system("pwd");
    printf("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");
	
		size_t size = 1024;
		char path[size];
		// char *executable_path;//[1024];
	
		if (ExecutablePath(path, &size) != 0) {
			opal_exec_path = argv[0];
		} else {
			opal_exec_path = path;
		}
	
		LoadRuntime();
		RunShell(context);

		return 0;
	}

	// Load the runtime (opal.js) using the given exec path
	void LoadRuntime() {
		char *executable_path = opal_exec_path;
		
		opal_home_path = dirname(dirname(executable_path));
		char opal_js[1024];
	
		snprintf(opal_js, 1024, "%s/runtime/opal.js", opal_home_path);
		
		char opal_lib_path[1024];
		snprintf(opal_lib_path, 1024, "%s/lib", opal_home_path);
		
		// global Opal object etc for all runtime
		v8::Handle<v8::Object> opal_global = v8::Object::New();
		JS_SET(JS_GLOBAL, "Opal", opal_global);
		JS_SET(opal_global, "executable_path", JS_STR(executable_path));
		JS_SET(opal_global, "opal_lib_path", JS_STR(opal_lib_path));
		
		// argv
		v8::Handle<v8::Array> argv_array = v8::Array::New(opal_argc);
		
		for (int i = 0; i < opal_argc; i++) {
			// printf("argument: %s\n", opal_argv[i]);
			argv_array->Set(v8::Integer::New(i), JS_STR(opal_argv[i]));
		}
		
		JS_SET(opal_global, "argv", argv_array);
	
		printf("opal js is: %s\n", opal_js);
		v8::Handle<v8::String> opal_source = ReadFile(opal_js);

		ExecuteString(opal_source, JS_STR(opal_js), true, true);
		
		ExecuteString(JS_STR("Opal.main()"), JS_STR("(main)"), true, true);
	}

	// executable path of opal (follow symlinks etc)
	int ExecutablePath(char* buffer, size_t* size) {
		uint32_t usize = *size;
	
		int result = _NSGetExecutablePath(buffer, &usize);
		if (result) return result;
	
		char *path = realpath(buffer, NULL);
		if (path == NULL) return -1;
		strncpy(buffer, path, *size);
		*size = strlen(buffer);
		return 0;
	}

} /* opal */

int main (int argc, char *argv[]) {
	int result = opal::Main(argc, argv);
	v8::V8::Dispose();
	return result;
}

const char* ToCString(const v8::String::Utf8Value& value) {
	return *value ? *value : "<string conversion failed>";
}

void RunShell(v8::Handle<v8::Context> context) {
	printf("V8 Version %s\n", v8::V8::GetVersion());
	static const int kBufferSize = 256;
	while	(true) {
		char buffer[kBufferSize];
		printf("> ");
		char *str = fgets(buffer, kBufferSize, stdin);
		if (str == NULL) break;
		v8::HandleScope handle_scope;
		if (0) {
			// javascript
			ExecuteString(JS_STR(str), JS_STR("(shell)"), true, true);
		} else {
			// ruby
			char irb_str[1024];
			
			JS_SET(JS_GLOBAL, "IRBString", JS_STR(str));
			
			ExecuteString(JS_STR("OpalIRB()"), JS_STR("(shell)"), true, true);
		}
		
	}
	printf("\n");
}

v8::Handle<v8::String> ReadFile(const char* name) {
	FILE* file = fopen(name, "rb");
	if (file == NULL) return v8::Handle<v8::String>();

	fseek(file, 0, SEEK_END);
	int size = ftell(file);
	rewind(file);

	char* chars = new char[size + 1];
	chars[size] = '\0';
		for (int i = 0; i < size;) {
	   	int read = fread(&chars[i], 1, size - i, file);
	   	i += read;
	 	}
	 	fclose(file);
	 v8::Handle<v8::String> result = v8::String::New(chars, size);
	 delete[] chars;
	 return result;
}

	bool ExecuteString(v8::Handle<v8::String> source,
									 v8::Handle<v8::String> name,
									 bool print_result,
										 bool report_exceptions) {
	 v8::HandleScope handle_scope;
	v8::TryCatch try_catch;
	v8::Handle<v8::Script> script = v8::Script::Compile(source, name);
	if (script.IsEmpty()) {
		if (report_exceptions)
			ReportException(&try_catch);
		return false;
	} else {
		v8::Handle<v8::Value> result = script->Run();
		if (result.IsEmpty()) {
			if (report_exceptions)
				ReportException(&try_catch);
			return false;
		} else {
			if (print_result && !result->IsUndefined()) {
				v8::String::Utf8Value str(result);
				const char* cstr = ToCString(str);
				printf("%s\n", cstr);
			}
			return true;
		}
	}
	}

	v8::Handle<v8::Value> Print(const v8::Arguments& args) {
	bool first = true;
	for(int i = 0; i < args.Length(); i++) {
		v8::HandleScope handle_scope;
		if (first) {
			first = false;
		} else {
			printf(" ");
		}
		v8::String::Utf8Value str(args[i]);
		const char* cstr = ToCString(str);
		printf("%s", cstr);
	}
	printf("\n");
	fflush(stdout);
	return v8::Undefined();
	}

	v8::Handle<v8::Value> Quit(const v8::Arguments& args) {
	int exit_code = args[0]->Int32Value();
	exit(exit_code);
	return v8::Undefined();
	}

	void ReportException(v8::TryCatch* try_catch) {
	 v8::HandleScope handle_scope;
	 v8::String::Utf8Value exception(try_catch->Exception());
	 const char* exception_string = ToCString(exception);
	 v8::Handle<v8::Message> message = try_catch->Message();
	 if (message.IsEmpty()) {
	   // V8 didn't provide any extra information about this error; just
	   // print the exception.
	   printf("%s\n", exception_string);
	 } else {
	   // Print (filename):(line number): (message).
	   v8::String::Utf8Value filename(message->GetScriptResourceName());
	   const char* filename_string = ToCString(filename);
	   int linenum = message->GetLineNumber();
	   printf("%s:%i: %s\n", filename_string, linenum, exception_string);
	   // Print line of source code.
	   v8::String::Utf8Value sourceline(message->GetSourceLine());
	   const char* sourceline_string = ToCString(sourceline);
	   printf("%s\n", sourceline_string);
	   // Print wavy underline (GetUnderline is deprecated).
	   int start = message->GetStartColumn();
	   for (int i = 0; i < start; i++) {
	     printf(" ");
	   }
	   int end = message->GetEndColumn();
	   for (int i = start; i < end; i++) {
	     printf("^");
	   }
	   printf("\n");
	 }
}
