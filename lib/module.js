var Opal = $opal, self = Opal.top, nil = Opal.Qnil, $class = Opal.dc, $def = Opal.dm;$class(self, nil, "Module", function() {var self = this;  

  $def(self, "name", function() {var self = this;    
    return self['__classid__'];
  }, 0);  

  $def(self, "===", function(obj) {var self = this;    
    return self.m$obj()["m$kind_of?"](self);
  }, 0);  

  $def(self, "define_method", function(method_id) {var self = this;    
    if (block_given) {self.m$raise(rb_vm_cg(self, "LocalJumpError"), "no block given")};    
    rb_define_method(self, self.m$method_id().m$to_s(), block)    
    return nil;
  }, 0);  

  $def(self, "attr_accessor", function(attrs) {var self = this;attrs = [].slice.call(arguments, 0);    
    self.m$attr_reader();    
    return self.m$attr_writer();
  }, 0);  

  $def(self, "attr_reader", function(attrs) {var self = this;attrs = [].slice.call(arguments, 0);    
    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var method_id = attr.m$to_s();

      rb_define_method(self, method_id, 
            new Function('return rb_ivar_get(this, "@' + method_id + '");'));

    }

    return nil;
  }, 0);  

  $def(self, "attr_writer", function(attrs) {var self = this;attrs = [].slice.call(arguments, 0);    
    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var method_id = attr.m$to_s();

      rb_define_method(self, method_id + '=', 
        new Function('val', 'return rb_ivar_set(this, "@' + method_id + '", val);'));

    }

    return nil;
  }, 0);  

  $def(self, "alias_method", function(new_name, old_name) {var self = this, new_name, old_name;    
    new_name = new_name.m$to_s();    
    old_name = old_name.m$to_s();    
    rb_define_method(self, new_name, self.$method_table[old_name])    
    return self;
  }, 0);  

  $def(self, "to_s", function() {var self = this;    
    return self['__classid__'];
  }, 0);  

  $def(self, "const_set", function(id, value) {var self = this;    
    return rb_vm_cs(self, self.m$id().m$to_s(), value);
  }, 0);  

  $def(self, "class_eval", function(str) {var self = this;    


    if (block_given) {      
      block.call(self)
    } else {      
      return self.m$raise("need to compile str");
    }
  }, 0);  

  $def(self, "module_eval", function(str) {var self = this;    
    return (tmp = self, args = [self.m$str()], ($block.p = self.m$block()), ($block.f = tmp.m$class_eval).apply(tmp, args));
  }, 0);  

  $def(self, "private", function() {var self = this;    
    return self;
  }, 0);  

  $def(self, "public", function() {var self = this;    
    return self;
  }, 0);  

  $def(self, "protected", function() {var self = this;    
    return self;
  }, 0);  

  $def(self, "include", function(mod) {var self = this;    
    rb_include_module(self, mod)    
    return nil;
  }, 0);  

  $def(self, "extend", function(mod) {var self = this;    
    rb_extend_module(self, mod)    
    return nil;
  }, 0);
}, 0);