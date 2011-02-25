var Opal = $opal, self = Opal.top, nil = Opal.Qnil, $class = Opal.dc, $def = Opal.dm;$class(self, nil, "Exception", function() {var self = this;  


  $def(self, "allocate", function() {var self = this;    
    var err = new Error();
    err.$klass = self;
    return err;
  }, 1);  

  $def(self, "initialize", function(message) {var self = this;    
    return self.message = message;
  }, 0);  

  $def(self, "message", function() {var self = this;    
    return self.message;
  }, 0);  

  $def(self, "inspect", function() {var self = this;    
    return "#<" + self.$klass.__classid__ + ": '" + self.message + "'>";
  }, 0);  

  $def(self, "to_s", function() {var self = this;    
    return self.message;
  }, 0);
}, 0);

$class(self, rb_vm_cg(self, "Exception"), "StandardError", function() {var self = this;}, 0);
$class(self, rb_vm_cg(self, "Exception"), "RuntimeError", function() {var self = this;}, 0);
$class(self, rb_vm_cg(self, "StandardError"), "LocalJumpError", function() {var self = this;}, 0);
$class(self, rb_vm_cg(self, "StandardError"), "TypeError", function() {var self = this;}, 0);

$class(self, rb_vm_cg(self, "StandardError"), "NameError", function() {var self = this;}, 0);
$class(self, rb_vm_cg(self, "NameError"), "NoMethodError", function() {var self = this;}, 0);
$class(self, rb_vm_cg(self, "StandardError"), "ArgumentError", function() {var self = this;}, 0);

$class(self, rb_vm_cg(self, "Exception"), "ScriptError", function() {var self = this;}, 0);
$class(self, rb_vm_cg(self, "ScriptError"), "LoadError", function() {var self = this;}, 0);

$class(self, rb_vm_cg(self, "StandardError"), "IndexError", function() {var self = this;}, 0);
$class(self, rb_vm_cg(self, "IndexError"), "KeyError", function() {var self = this;}, 0);
$class(self, rb_vm_cg(self, "StandardError"), "RangeError", function() {var self = this;}, 0);