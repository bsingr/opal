var Opal = $opal, self = Opal.top, nil = Opal.Qnil, $class = Opal.dc, $def = Opal.dm;$class(self, nil, "FalseClass", function() {var self = this;  

  $def(self, "to_s", function() {var self = this;    
    return "false";
  }, 0);  

  $def(self, "&", function(other) {var self = this;    
    return Qfalse;
  }, 0);  

  $def(self, "|", function(other) {var self = this;    
    return other.$r ? Qtrue : Qfalse;
  }, 0);  

  $def(self, "^", function(other) {var self = this;    
    return other.$r ? Qtrue : Qfalse;
  }, 0);
}, 0);

rb_vm_cs(self, "FALSE", Qfalse);