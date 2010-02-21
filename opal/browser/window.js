// 
//  window.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-17.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var opal_oWindow;

/*
  Window.title
*/
function opal_win_title() {
  return "placeholder win title";
};

/*
  Window.title=(a_title)
*/
function opal_win_title_m(win, title) {
  return window.title = title;
};


function Init_Window() {
  opal_oWindow = new RObject();
  opal_oWindow.klass = rb_cObject;
  FL_SET(opal_oWindow, T_OBJECT);
  
  rb_define_singleton_method(opal_oWindow, "title", opal_win_title, 0);
  rb_define_singleton_method(opal_oWindow, "title=", opal_win_title_m, 0);
};