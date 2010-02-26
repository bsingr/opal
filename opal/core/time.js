// 
//  time.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-25.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var rb_cTime;

function rb_time_init(time) {
  time.native = new Date();
};

function rb_time_to_s(time) {
  return time.native.toString();
};

function rb_time_minus(a, id, _, b) {
  return a.native - b.native;
};

function Init_Time() {
  rb_cTime = rb_define_class("Time", rb_cObject);
  rb_include_module(rb_cTime, rb_mComparable);
  
  // rb_define_alloc_func(rb_cTime, rb_time_s_alloc);
  rb_define_singleton_method(rb_cTime, "now", rb_class_new_instance, -1);
  // rb_define_singleton_method(rb_cTime, "at", rb_time_s_at, -1);
  // rb_define_singleton_method(rb_cTime, "utc", rb_time_s_mkutc, -1);
  // rb_define_singleton_method(rb_cTime, "gm", rb_time_s_mkutc, -1);
  // rb_define_singleton_method(rb_cTime, "local", rb_time_s_mktime, -1);
  // rb_define_singleton_method(rb_cTime, "mktime", rb_time_s_mktime, -1);
  // 
  // rb_define_method(rb_cTime, "to_i", rb_time_to_i, 0);
  // rb_define_method(rb_cTime, "to_f", rb_time_to_f, 0);
  // rb_define_method(rb_cTime, "<=>", rb_time_cmp, 1);
  // rb_define_method(rb_cTime, "eql?", rb_time_eql, 1);
  // rb_define_method(rb_cTime, "hash", rb_time_hash, 0);
  rb_define_method(rb_cTime, "initialize", rb_time_init, 0);
  // rb_define_method(rb_cTime, "initialize_copy", rb_time_init_copy, 1);
  // 
  // rb_define_method(rb_cTime, "localtime", rb_time_localtime, 0);
  // rb_define_method(rb_cTime, "gmtime", rb_time_gmtime, 0);
  // rb_define_method(rb_cTime, "utc", rb_time_gmtime, 0);
  // rb_define_method(rb_cTime, "getlocal", rb_time_getlocaltime, 0);
  // rb_define_method(rb_cTime, "getgm", rb_time_getgmtime, 0);
  // rb_define_method(rb_cTime, "getutc", rb_time_getgmtime, 0);
  // 
  // rb_define_method(rb_cTime, "ctime", rb_time_asctime, 0);
  // rb_define_method(rb_cTime, "asctime", rb_time_asctime, 0);
  rb_define_method(rb_cTime, "to_s", rb_time_to_s, 0);
  rb_define_method(rb_cTime, "inspect", rb_time_to_s, 0);
  // rb_define_method(rb_cTime, "to_a", rb_time_to_a, 0);
  // 
  // rb_define_method(rb_cTime, "+", rb_time_plus, 1);
  rb_define_method(rb_cTime, "-", rb_time_minus, 1);
  // 
  // rb_define_method(rb_cTime, "succ", rb_time_succ, 0);
  // rb_define_method(rb_cTime, "sec", rb_time_sec, 0);
  // rb_define_method(rb_cTime, "min", rb_time_min, 0);
  // rb_define_method(rb_cTime, "hour", rb_time_hour, 0);
  // rb_define_method(rb_cTime, "mday", rb_time_mday, 0);
  // rb_define_method(rb_cTime, "day", rb_time_mday, 0);
  // rb_define_method(rb_cTime, "mon", rb_time_mon, 0);
  // rb_define_method(rb_cTime, "month", rb_time_mon, 0);
  // rb_define_method(rb_cTime, "year", rb_time_year, 0);
  // rb_define_method(rb_cTime, "wday", rb_time_wday, 0);
  // rb_define_method(rb_cTime, "yday", rb_time_yday, 0);
  // rb_define_method(rb_cTime, "isdst", rb_time_isdst, 0);
  // rb_define_method(rb_cTime, "dst?", rb_time_isdst, 0);
  // rb_define_method(rb_cTime, "zone", rb_time_zone, 0);
  // rb_define_method(rb_cTime, "gmtoff", rb_time_utc_offset, 0);
  // rb_define_method(rb_cTime, "gmt_offset", rb_time_utc_offset, 0);
  // rb_define_method(rb_cTime, "utc_offset", rb_time_utc_offset, 0);
  // 
  // rb_define_method(rb_cTime, "utc?", rb_time_utc_p, 0);
  // rb_define_method(rb_cTime, "gmt?", rb_time_utc_p, 0);
  // 
  // rb_define_method(rb_cTime, "sunday?", rb_time_sunday, 0);
  // rb_define_method(rb_cTime, "monday?", rb_time_monday, 0);
  // rb_define_method(rb_cTime, "tuesday?", rb_time_tuesday, 0);
  // rb_define_method(rb_cTime, "wednesday?", rb_time_wednesday, 0);
  // rb_define_method(rb_cTime, "thursday?", rb_time_thursday, 0);
  // rb_define_method(rb_cTime, "friday?", rb_time_friday, 0);
  // rb_define_method(rb_cTime, "saturday?", rb_time_saturday, 0);
  // 
  // rb_define_method(rb_cTime, "tv_sec", rb_time_to_i, 0);
  // rb_define_method(rb_cTime, "tv_usec", rb_time_usec, 0);
  // rb_define_method(rb_cTime, "usec", rb_time_usec, 0);
  // rb_define_method(rb_cTime, "tv_nsec", rb_time_nsec, 0);
  // rb_define_method(rb_cTime, "nsec", rb_time_nsec, 0);
  // 
  // rb_define_method(rb_cTime, "strftime", rb_time_strftime, 1);
  // 
  // rb_define_method(rb_cTime, "_dump", rb_time_dump, -1);
  // rb_define_singleton_method(rb_cTime, "_load", rb_time_load, 1);
};
