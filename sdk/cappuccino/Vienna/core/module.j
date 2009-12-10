// rb_define_singleton_method(rb_cModule, 'attrAccessor:', function(self, _cmd) {
//     var i = 0, a = Array.prototype.slice.call(arguments, 2);
//     for (i = 0; i < a.length; i++) {
//         rb_funcall(self, 'attrReader:', a[i]);
//         rb_funcall(self, 'attrWriter:', a[i]);
//     }
//    return self;
// });
// 
// rb_define_singleton_method(rb_cModule, 'attrReader:', function(self, _cmd) {
//     var i = 0, a = Array.prototype.slice.call(arguments, 2);
//     for (i = 0; i < a.length; i++) {
//         rb_define_method(self, a[i], new Function('self', '_cmd', 'return self.' + a[i] + ';'))
//     }
//    return self;
// });
// 
// rb_define_singleton_method(rb_cModule, 'attrWriter:', function(self, _cmd) {
//      var i = 0, a = Array.prototype.slice.call(arguments, 2);
//      for (i = 0; i < a.length; i++) {
//          var k = a[i];
//          
//          rb_define_method(self, 'set' + k.charAt(0).toUpperCase() + k.substr(1) + ':', new Function('self', '_cmd', 'v', 'return self.' + a[i] + ' = v;'))
//      }
//     return self;
// });
// 
// /**
//     FIXME: This should be on module..
// */
// rb_define_method(rb_cObject, 'puts:', function(self, _cmd, str) {
//     console.log(str);
// });