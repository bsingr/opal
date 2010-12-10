// Initialize ruby/opal. This should really get passed ARGV, but we will do this
// later.

// make sure init/main are only called once.
var rb_opal_done_init = false,
		rb_opal_done_main = false;
		
// where we can save our global argv once calculated
var init_argv = [];

exports.init = function() {
	if (rb_opal_done_init) return;
	rb_opal_done_init = true;
  Init_Debug_Mode();
	// core inits.
	InitObject();
	Init_Array();
	Init_Numeric();
	Init_Hash();
	Init_Regexp();
	InitLoad();
	Init_IO();
	Init_Dir();
	InitVM();
	Init_Exception();
	Init_String();
	Init_Proc();
	Init_Range();
	
#ifdef OPAL_BROWSER
  Init_Browser();
#endif
};

// main.. we might or might not call this.. more likely we will...
// init() just boots, where as main() will load a specific program
exports.main = function() {
	if (rb_opal_done_main) return;
	rb_opal_done_main = true;
	
	// make sure we are init()ed
	exports.init();
	
	// deal with argv. argv is from native, so includes program name at [0]
	var argv = exports.argv;
	// have we finished with flags ('-')
	var finished_flags = false;
	// all flags - ignore these for now
	var all_flags = [];
	// program name..
	var program_name = null;
	
	for (var i = 1; i < argv.length; i++) {
		if (argv[i][0] === '-' && !finished_flags) {
			all_flags.push(argv[i]);
		}
		else {
			// ensure we are done with flags..
			finished_flags = true;
			// it is porogram name unless already set
			if (program_name == null) {
				program_name = argv[i];
			}
			else {
				init_argv.push(argv[i]);
			}
		}
	}
		
	// if we have a program name, then lets run it. if not, print help
	if (program_name) {
		rb_run(function() {
			extensions['.rb'](program_name);
		});
	}
	else {
    exports.start_repl();
	}
};

exports.print_help = function() {
	var help = [
		"Usage: opal [switches] [programfile] [arguments]"
	];
	
	for (var i = 0; i < help.length; i++) {
		print(help[i]);
	}
};
