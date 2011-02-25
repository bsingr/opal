var Opal = $opal, self = Opal.top, nil = Opal.Qnil, $class = Opal.dc, $def = Opal.dm;$class(self, nil, "NilClass", function() {var self = this;  

  $def(self, "to_i", function() {var self = this;    
    return 0;
  }, 0);  

  $def(self, "to_f", function() {var self = this;    
    return 0.0;
  }, 0);  

  $def(self, "to_s", function() {var self = this;    
    return "";
  }, 0);  

  $def(self, "to_a", function() {var self = this;    
    return [];
  }, 0);  

  $def(self, "inspect", function() {var self = this;    
    return "nil";
  }, 0);  

  $def(self, "nil?", function() {var self = this;    
    return Qtrue;
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

rb_vm_cs(self, "NIL", nil);