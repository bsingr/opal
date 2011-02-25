var Opal = $opal, self = Opal.top, nil = Opal.Qnil, $class = Opal.dc, $def = Opal.dm;$class(self, nil, "Range", function() {var self = this;  

  $def(self, "to_s", function() {var self = this;    
    var str = self.$beg.m$to_s();
    var str2 = self.$end.m$to_s();
    var join = self.$exc ? '...' : '..';
    return str + join + str2;
  }, 0);  

  $def(self, "inspect", function() {var self = this;    
    var str = self.$beg.m$inspect();
    var str2 = self.$end.m$inspect();
    var join = self.$exc ? '...' : '..';
    return str + join + str2;
  }, 0);
}, 0);