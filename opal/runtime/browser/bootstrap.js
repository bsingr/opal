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
  ruby_script("embedded");
  ruby_init_loadpath();
  ruby_incpush("");
  rb_loadpath(name);
};
