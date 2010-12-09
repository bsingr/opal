var rb_cDir;

function dir_s_getwd(klass, mid) {
  return opal_getwd();
}

function dir_s_glob(klass, mid, glob) {
 return file_glob(glob); 
}

function Init_Dir() {
  // @class Dir
	rb_cDir = rb_define_class('Dir', rb_cObject);
	
	// VM methods for Dir access
	rb_define_singleton_method(rb_cDir, "getwd", dir_s_getwd);
	rb_define_singleton_method(rb_cDir, "glob", dir_s_glob);
	rb_define_singleton_method(rb_cDir, "[]", dir_s_glob);
}
