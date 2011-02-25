var Opal = $opal, self = Opal.top, nil = Opal.Qnil, $class = Opal.dc, $def = Opal.dm;$class(self, nil, "Kernel", function() {var self = this;  





  $def(self, "require", function(path) {var self = this;    
    return $opal.require(path);
  }, 0);  










  $def(self, "loop", function() {var self = this;    
    while (true) {
      try {
        __block__.call(__block__.$self);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;
  }, 0);  









  $def(self, "proc", function() {var self = this;    
    if (block_given) {self.m$raise(rb_vm_cg(self, "ArgumentError"), "block required")};    
    return self.m$block();
  }, 0);  

  $def(self, "lambda", function() {var self = this;    
    if (block_given) {self.m$raise(rb_vm_cg(self, "ArgumentError"), "block required")};    
    return self.m$block();
  }, 0);  




















  $def(self, "raise", function(exception, string) {var self = this;    
    var msg = nil, exc;

    if (typeof exception == 'string') {
      msg = exception;
      exc = rb_vm_cg(self, "RuntimeError").m$new(msg);
    } else if (exception["m$kind_of?"](rb_vm_cg(self, "Exception")).$r) {
      exc = exception;
    } else {
      if (string != nil) msg = string;
      exc = exception.m$new(msg);
    }
    rb_vm_raise(exc);
  }, 0);  

  $def(self, "fail", function(exception, string) {var self = this;    
    return self.m$raise(self.m$exception(), self.m$string());
  }, 0);  

  $def(self, "instance_variable_defined?", function(name) {var self = this;    
    name = self.m$name().m$to_s();
    return self[name] == undefined ? Qfalse : Qtrue;
  }, 0);  

  $def(self, "instance_variable_get", function(name) {var self = this;    
    name = self.m$name().m$to_s();
    return self[name] == undefined ? nil : self[name];
  }, 0);  

  $def(self, "instance_variable_set", function(name, value) {var self = this;    
    name = self.m$name().m$to_s();
    return self[name] = value;
  }, 0);  








  $def(self, "block_given?", function() {var self = this;    
    return Qfalse;
  }, 0);  

  $def(self, "method_missing", function(sym, args) {var self = this;args = [].slice.call(arguments, 1);    

    return self.m$raise(rb_vm_cg(self, "NoMethodError"), ("undefined method `" + self.m$sym().m$to_s() + "` for " + self.m$inspect().m$to_s()));
  }, 0);  

  $def(self, "to_a", function() {var self = this;    
    return [self];
  }, 0);  

  $def(self, "tap", function() {var self = this;    
    if (block_given) {self.m$raise(rb_vm_cg(self, "LocalJumpError"), "no block given")};    
    __block__.call(__block__.$self);    
    return self;
  }, 0);  

  $def(self, "kind_of?", function(klass) {var self = this;    
    var search = self.$klass;

    while (search) {
      if (search == klass) {
        return Qtrue;
      }

      search = search.$super;
    }

    return Qfalse;
  }, 0);  

  $def(self, "is_a?", function(klass) {var self = this;    
    return self["m$kind_of?"](self.m$klass());
  }, 0);  

  $def(self, "nil?", function() {var self = this;    
    return Qfalse;
  }, 0);  

  $def(self, "respond_to?", function(method_id) {var self = this;    
    if (self['m$' + method_id.m$to_s()]) {
      return Qtrue;
    }

    return Qfalse;
  }, 0);  

  $def(self, "===", function(other) {var self = this;    
    return self["m$=="](self.m$other());
  }, 0);  

  $def(self, "__send__", function(method_id, args) {var self = this;args = [].slice.call(arguments, 1);    

    return self['m$' + self.m$method_id().m$to_s()].apply(self, args);
  }, 0);  

  $def(self, "send", function(method_id, args) {var self = this;args = [].slice.call(arguments, 1);    
    return self.m$__send__(self.m$method_id());
  }, 0);  

  $def(self, "class", function() {var self = this;    
    return rb_class_real(self.$klass);
  }, 0);  













  $def(self, "rand", function(max) {var self = this;    
    if (max != undefined)
        return Math.floor(Math.random() * max);
    else
      return Math.random();
  }, 0);  

  $def(self, "__id__", function() {var self = this;    
    return self.$hash();
  }, 0);  

  $def(self, "object_id", function() {var self = this;    
    return self.$hash();
  }, 0);  






  $def(self, "to_s", function() {var self = this;    
    return ("#<" + rb_class_real(self.$klass).m$to_s() + ":0x" + (self.$hash() * 400487).toString(16).m$to_s() + ">");
  }, 0);  

  $def(self, "inspect", function() {var self = this;    
    return self.m$to_s();
  }, 0);  

  $def(self, "instance_eval", function() {var self = this;    
    if (block_given) {block.call(self)};    
    return self;
  }, 0);  

  $def(self, "const_set", function(name, value) {var self = this;    
    return rb_const_set(rb_class_real(self.$klass), name, value);
  }, 0);  

  $def(self, "const_defined?", function(name) {var self = this;    
    return Qfalse;
  }, 0);
}, 2);