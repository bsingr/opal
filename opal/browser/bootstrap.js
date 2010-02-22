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
  rb_loadpath(name);
};

function opal_browser_init() {
  
  // function to call on window.load
  var win_on_load = function() {
    opal_oDocument.iv_tbl.is_ready = true;
    var a = opal_oDocument.iv_tbl.ready_blocks;
    for (var i = 0; i < a.length; i++) {
      vm_yield(a[i], []);
      // a[i]();
    }
  };
  
  if (window.addEventListener) {
    window.addEventListener('load', win_on_load, false);
  }
  else {
    window.attachEvent('onload', win_on_load);
  }
  
  Init_Browser_Element();
  Init_Browser_Document();
  Init_Browser_Json();
  Init_Ajax();
};
