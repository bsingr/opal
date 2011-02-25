var Opal = $opal, self = Opal.top, nil = Opal.Qnil, $class = Opal.dc, $def = Opal.dm;$class(self, nil, "Regexp", function() {var self = this;  
  $def(self, "inspect", function() {var self = this;    
    return self.toString();
  }, 0);  

  $def(self, "==", function(other) {var self = this;    
    return self.toString() === other.toString() ? Qtrue : Qfalse;
  }, 0);  

  $def(self, "eql?", function(other) {var self = this;    
    return self["m$=="](self.m$other());
  }, 0);  

  $def(self, "match", function(pattern) {var self = this;    
    return nil;
  }, 0);
}, 0);