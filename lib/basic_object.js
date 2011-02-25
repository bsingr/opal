var Opal = $opal, self = Opal.top, nil = Opal.Qnil, $class = Opal.dc, $def = Opal.dm;$class(self, nil, "BasicObject", function() {var self = this;  
  $def(self, "initialize", function() {var self = this;    return nil;

  }, 0);  

  $def(self, "==", function(other) {var self = this;    
    if (self == other) return Qtrue;
    return Qfalse;
  }, 0);  

  $def(self, "equal?", function(other) {var self = this;    
    return self["m$=="](self.m$other());
  }, 0);
}, 0);