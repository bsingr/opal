/* 
 * load.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
/**
  Entry point 1.
  ==============
  
  This should be used for apps that do not require the vienna build tools. Simply
  pass it the root .rb file that you wish to use. simples.
  
  usage:
  
    vm_rb_main('my_file.rb');
      => app runs.
      
  All searches, for require() statements, look for .rb files, not bundles.
*/
function vm_rb_main(path) {
  rb_call_inits();
  rb_top_vm.search_style = ".rb";
  if (path.substr(path.length - 3) === ".rb") {
    path = path.substr(0, path.length - 3);
  }
  return rb_f_require(rb_top_self, path);
}

/**
  Entry point 2.
  ==============
  
  Used for the bundles appraoch, where all files are already pre-compiled, or
  vn-server is used to deploy files. This basically means no raw .rb files will
  need to be compiled, so all searches take place for .vngem files
  
  This loads the .rb file from the app bundle.
  
  This actually loads each vendor bundle and the app bundle from the server, and
  then, only when that is complete, does it actually load and run the given file.
  
  For now, synchronous callbacks: in future, this will be async to avoid blocking
  browser. Will need to make use of callbacks.
*/
function vm_bundle_main(filename) {
  if (!window.VN_VENDOR_PATH) VN_VENDOR_PATH = '/vendor';
  if (!window.VN_APPLICATION_PATH) VN_APPLICATION_PATH = '/';
  // VN_BOOTSTRAP_APPLICATION = "sample_controls";
  // VN_BOOTSTRAP_BUNDLES = ["vienna"];
  for (var i = 0; i < VN_BOOTSTRAP_BUNDLES.length; i++) {
    var fullpath = VN_VENDOR_PATH + '/' + VN_BOOTSTRAP_BUNDLES[i] + '.vngem';
    // console.log("Need to load: " + fullpath);
  }
  
  // app
  var fullpath = VN_BOOTSTRAP_APPLICATION + '.vngem';
  // console.log("need to load " + fullpath);
  var r = new XMLHttpRequest();
  r.open("GET", fullpath, false);
  r.send(null);
  // console.log(r.responseText);
  
  // load the root gem
  vn_gem_boot(VN_BOOTSTRAP_APPLICATION, "", r.responseText);
  
  // we can now start the VM
  rb_call_inits();
  
  
  
  // run the main file
  filename = '/' + filename + '.rb';
  // console.log(filename);
  // console.log(vn_fs_path_hash[filename]);
  rb_require_file(filename);
}

// /**
//   Main entry point (ish). At this point, only the core library exists, and all the
//   inits() have been called. In development mode, VN_MAIN_BNDLE_NAME will be used to
//   load the root .rb file. In production mode, it will load the root .vn file. which
//   is a bundle. for now, assume everything is a .vn file.
// */
// function rb_run_vm() {
//   vn_bundle_load_at_path(VN_MAIN_BUNDLE_NAME, function(bundle) {
//     var f = bundle.files['lib/' + VN_MAIN_BUNDLE_NAME + '.rb'];
//     // require_file...
//     var o = eval(f.source);
//     // o is our opcodes..
//     f.required = true;
//     
//     // run vm.
//     rb_iseq_eval(o);
//   });
// }

/**
  Actually do a require with the given filename.
  
  Already checked file exists, and we pass the raw filename which is already in
  the vn_fs_path_hash. This method marks the file as being already required and
  will then exectute the file, by putting it to the top of the vm.
*/
function rb_require_file(file_path) {
  rb_iseq_eval(eval(vn_fs_path_hash[file_path]));
}

/**
  Main entry point for a require statement. Basically, this will require the path
  given, unless it has already been required. The same file cannot be required
  twice. This is done by pausing the current thread, doing all the AJAX file
  retrieval, parsing/compiling if required, then executing it. Once the file has
  been dealt with, then a return value of true is pushed onto the stack, and the
  vm begins to run again, doing whatever steps are necessary. There are three
  types of possible files that can be included:
  
  === Ruby source (.rb)
  
  These are parsed as expected. Default search type.
  
  === Javascript source (.js)
  
  As expected. These are the equivalent of .c libraries for vanilla ruby
  
  === Compiled ruby (.vn) <- filename to be determined
  
  Already compiled into bytecode formats.
  
  == On success
  
  Put 'true' on top of stack, and return
  
  == On failure
  
  Throw an eLoadError.
*/
function rb_f_require(obj, path) {
  // pause vm
  vm_run_mode_sleep(rb_top_vm);
  var r = new XMLHttpRequest();
  r.open("GET", path + '.rb', false);
  r.onreadystatechange=function() {
    if (r.readyState==4) {
      var rt = r.responseText;
      // console.log(r);
      var a = new vn_parser(path + '.rb', rt);
      var res = a.parse(rt);
      rb_iseq_eval(res);
    }
  }
  r.send(null);
}

/**
  Load, parse, eval the given text
*/
function rb_eval_raw(str) {
  
}

function Init_load() {
  // require
  rb_define_method(rb_cBasicObject, "require", rb_f_require, 1);
}
