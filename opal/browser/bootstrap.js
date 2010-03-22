// 
//  bootstrap.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-17.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 


/*
  Define a ruby file (compiled) by the name, 'name', with the file embedded in a
  string, 'body'.
*/
function opal_define_file(name, body) {
  vn_fs_define_file(name, body);
};



/**
  Define the given "file" as needing to be loaded upon Init (allows core libs
  to be written in ruby).
  
  File will be a function which takes top_self as a param
*/
function opal_boot_file(file, body) {
  // console.log(file);
  opal_boot_files.push(vn_fs_define_file(file, body));
};

/*
  Main entry point. Rube the given file.
*/
function opal_browser_main(name) {
  ruby_init();
  // init all browser bits and pieces
  opal_browser_init();
  ruby_script("embedded");
  ruby_init_loadpath();
  ruby_incpush("");
  ruby_incpush("vendor/");
  for (var i = 0; i < opal_boot_files.length; i++) {
    // (opal_boot_files[i])(opal_top_self);
    rb_require_file(opal_boot_files[i].path);
  }
  rb_loadpath(name);
};

/**
  Main entry point for client side eval. The given ruby file will be loaded with
  Ajax and then run. Purely for experimenting, i.e. not very efficient
*/
function opal_require_main(file_name) {
  // temporarily use unique number to force refresh from server
  file_name = file_name + "?" + Math.floor(Math.random() * 1000);
  ruby_init();
  opal_browser_init();
  ruby_script("embedded");
  ruby_init_loadpath();
  ruby_incpush("");
  var http = opal_http_request_new();
  http.open("GET", file_name, true);
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      // console.log(http.responseText);
      rb_vm_eval_str(opal_top_self, http.responseText);
    }
  };
  http.send(null);
  // rb_loadpath(file_name);
};

/**
  Run by looking for all script tags with type "text/ruby"
*/
function opal_run_tags() {
  ruby_init();
  opal_browser_init();
  ruby_script("embedded");
  ruby_init_loadpath();
  ruby_incpush("");
  // filepaths to actual file content
  var src_contents = {};
  // ordered array of filenames
  var src_filenames = [];
  // register method to run on window load
  opal_document_ready_q(opal_oDocument, nil, function() {
    var tags = document.getElementsByTagName("script");
    for (var i = 0; i < tags.length; i++) {
      if (tags[i].type === "text/ruby") {
        // if we have a src then we need to Ajax-get it, else, just run the text
        if (tags[i].src) {
          console.log(tags[i].src + " text");
          console.log(tags[i].innerText);
          src_filenames.push(tags[i].src);
          var http = opal_http_request_new();
          http.open("GET", tags[i].src, false);
          http.onreadystatechange = function () {
            if (http.readyState == 4) {
              src_contents[tags[i].src] = http.responseText;
            }
          };
          http.send(null);
        }
        else {
          var filename = "inline_" + src_filesnames.length;
          src_filesnames.push(filename);
          src_contents[filename] = tags[i].text;
        }
        // console.log(tags[i]);
        // console.log(tags[i].src);
      }
    }
  });
};

function opal_browser_init() {
  
  // function to call on window.load
  
  // var win_on_load = function() {
  //   opal_oDocument.iv_tbl.is_ready = true;
  //   var a = opal_oDocument.iv_tbl.ready_blocks;
  //   for (var i = 0; i < a.length; i++) {
  //     vm_yield(a[i], []);
  //     // a[i]();
  //   }
  // };
  // 
  // if (window.addEventListener) {
  //   window.addEventListener('load', win_on_load, false);
  // }
  // else {
  //   window.attachEvent('onload', win_on_load);
  // }
  
  
  Init_Ajax();
};

/**
  called from inline javascript sources
  
  Check if .rb, then init, require, run
  
  if .js, init, add scripttag to load .js file
*/
function opal_require(path) {
  opal_require_main(path);
};

// /**
//   Capture window onload etc
// */
// (function() {
//   var tags = document.getElementsByTagName("script");
//   for (var i = 0; i < tags.length; i++) {
//     if (tags[i].src && tags[i].text !== "") {
//       if (window.execScript) {
//         window.execScript(tags[i].text);
//       }
//       else {
//         with (window) {
//           return eval(tags[i].text);
//         }
//       }
//     }
//   }
// })();
