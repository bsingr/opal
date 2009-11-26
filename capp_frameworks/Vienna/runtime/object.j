
function rb_search_method(self, id) {
    var method = self.isa.method_dtable[id];
    // try window scope...for now.
    if (!method) {
        return window[id];
    }
    else {
        return method.method_imp;
    }
}

function rb_funcall(self, id) {
 
  // var method = self.isa.method_dtable[id];
  var method = rb_search_method(self, id);
  
  if (!method) {
      console.log('ERROR: rb_funcall, no method found ' + id);
      throw '.'
  }
  
  // var imp = method.method_imp;
  
  switch (arguments.length) {
      case 2: return method(self, id);
      case 3: return method(self, id, arguments[2]);
      case 4: return method(self, id, arguments[2], arguments[3]);
      case 5: return method(self, id, arguments[2], arguments[3], arguments[4]);
  }
  
  return method.apply(self, arguments);
}

function rb_funcall_block(args, block) {
    var method = args[0].isa.method_dtable[args[1]];
    
    if (!method) {
        console.log('ERROR: rb_funcall_block, no method found ' + args[1]);
    }
    
    var imp = method.method_imp;
    
    // identify proc as a block
    block.rb_is_block = true;
    
    // we need to add block to args
    return imp.apply(args[0], args);
    
    // stop proc from being a block (we shouldnt need this, it will almost certainly go out of scope)
    delete block.rb_is_block
}

function rb_ivar_set(obj, id, val) {
    obj[id] = val;
    return val;
}

function rb_ivar_get(obj, id) {
    return obj[id];
}

function rb_const_get(obj, id) {
    return window[id];
}

function rb_const_set(obj, id, val) {
    obj[id] = val;
    // if obj doesnt have it, go up through chain, finally checking in global namespace
}

function rb_const_get_full(obj, id) {
    return window[id];
}

var rb_cObject = CPObject;