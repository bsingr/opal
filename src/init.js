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
  //Init_Debug_Mode();
	// core inits.
	Init_Object();
  require('./module');
  require('./kernel');
  require('./top_self');
  require('./nil_class');
  require('./true_class');
  require('./false_class');
	Init_Array();
  require('./array');
	Init_Numeric();
  require('./numeric');
	Init_Hash();
  require('./hash');
	//Init_Regexp();
	Init_Load();
	//Init_IO();
	//Init_Dir();
	Init_VM();
	Init_Exception();
	Init_String();
  require('./string');
  require('./symbol');
	Init_Proc();
	//Init_Range();

  // Instead of init_browser, each platform will have its own Init_Platform
  // method; node uses this to init FS module etc, and all the File and Dir
  // methods; while browser uses this to Init Browser, Element, Document etc.
  Init_Platform();
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
    // print(argv);
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
		  if (opal_file_exists(program_name))
			  extensions['.rb'](program_name);
			else
			  rb_raise(rb_eLoadError, "Cannot find bin file: " + program_name);
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
