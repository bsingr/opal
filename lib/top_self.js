var Opal = $opal, self = Opal.top, nil = Opal.Qnil, $class = Opal.dc, $def = Opal.dm;$def(self, "to_s", function() {var self = this;  
  return "main";
}, 1);

$def(self, "include", function(mod) {var self = this;  
  return rb_vm_cg(self, "Object").m$include(self.m$mod());
}, 1);