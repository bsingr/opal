
// Cheap and cheerful. These need to be replaced. rb_cObject is fine, but
// class and module need rethinking to be compatible, yet offer ruby goodness.
window.rb_cObject = CPObject;
window.rb_cClass = CPObject.isa;
window.rb_cModule = CPObject.isa;

// rb_define_method(rb_cClass, 'attrAccessor:', function(self, _cmd, accessor) {
//     console.log("accessor for! " + accessor);
// });