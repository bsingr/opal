#include <fcntl.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

#include "opal.h"

namespace opal {

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

		InitFile();
		
		printf("all done - now run shell\n");

		RunShell(context);

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
		ExecuteString(JS_STR(str), JS_STR("(shell)"), true, true);
	}
	printf("\n");
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
	printf("in try catch\n");
}
