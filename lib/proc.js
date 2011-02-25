var Opal = $opal, self = Opal.top, nil = Opal.Qnil, $class = Opal.dc, $def = Opal.dm;$class(self, nil, "Proc", function() {var self = this;  

  $def(self, "to_proc", function() {var self = this;    
    return self;
  }, 0);  

  $def(self, "call", function(args) {var self = this;args = [].slice.call(arguments, 0);    

    return self.apply(self.$self, args);
  }, 0);
}, 0);