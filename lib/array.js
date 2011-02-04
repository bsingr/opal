(function(self) {self.$M(['==', 'raise', 'flatten', 'to_s', 'join']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Array", function(self) {
return (rb_vm_defn(self, "inspect", function(self) {
var nil = Qnil;
var description = [];
  
    for (var i = 0; i < self.length; i++) {
      description.push(self[i].$m.inspect(self[i]));
    }
  
    return '[' + description.join(', ') + ']';}, 0), rb_vm_defn(self, "to_s", function(self) {
var nil = Qnil;
var description = [];

    for (var i = 0; i < self.length; i++) {
      description.push(self[i].$m.to_s(self[i]));
    }

    return description.join('');}, 0), rb_vm_defn(self, "<<", function(self, obj) {
var nil = Qnil;
return (self.push(obj), self);}, 0), rb_vm_defn(self, "length", function(self) {
var nil = Qnil;
return self.length;}, 0), rb_vm_defn(self, "size", function(self) {
var nil = Qnil;
return self.length;}, 0), rb_vm_defn(self, "each", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;for (var i = 0; i < self.length; i++) {
      try {
        __block__(__block__.$self, self[i]);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), rb_vm_defn(self, "each_with_index", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;for (var i = 0; i < self.length; i++) {
      try {
        __block__(__block__.$self, self[i], i);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), rb_vm_defn(self, "each_index", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;for (var i = 0; i < self.length; i++) {
      try {
        __block__(__block__.$self, i);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), rb_vm_defn(self, "push", function(self, objs) {
var nil = Qnil;
objs = Array.prototype.slice.call(arguments, 1);
for (var i = 0; i < objs.length; i++) {
      self.push(objs[i]);
    }

    return self;}, 0), rb_vm_defn(self, "index", function(self, obj) {
var nil = Qnil;
var __a;
for (var i = 0; i < self.length; i++) {
      if ((__a = self[i], __a.$m["=="])(__a, obj).$r) {
        return i;
      }
    }

    return nil;}, 0), rb_vm_defn(self, "+", function(self, other) {
var nil = Qnil;
return self.concat(other);}, 0), rb_vm_defn(self, "-", function(self, other) {
var nil = Qnil;
return (self.$m.raise(self, ("Array" + "#" + "- not yet implemented")));}, 0), rb_vm_defn(self, "==", function(self, other) {
var nil = Qnil;
var __a;
if (self.$hash() == other.$hash()) return Qtrue;
    if (self.length != other.length) return Qfalse;

    for (var i = 0; i < self.length; i++) {
      if (!(__a = self[i], __a.$m["=="])(__a, other[i]).$r) {
        return Qfalse;
      }
    }

    return Qtrue;}, 0), rb_vm_defn(self, "assoc", function(self, obj) {
var nil = Qnil;
var __a;
var arg;

    for (var i = 0; i < self.length; i++) {
      arg = self[i];

      if (arg.length && (__a = arg[0], __a.$m["=="])(__a, obj).$r) {
        return arg;
      }
    }

    return nil;}, 0), rb_vm_defn(self, "at", function(self, idx) {
var nil = Qnil;
if (idx < 0) idx += self.length;

    if (idx < 0 || idx >= self.length) return nil;
    return self[idx];}, 0), rb_vm_defn(self, "clear", function(self) {
var nil = Qnil;
self.splice(0);
    return self;}, 0), rb_vm_defn(self, "select", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;var result = [], arg;

    for (var i = 0; i < self.length; i++) {
      try {
        arg = self[i];
        if (__block__(__block__.$self, arg).$r) {
          result.push(arg);
        }
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return result;}, 0), rb_vm_defn(self, "collect", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;var result = [];

    for (var i = 0; i < self.length; i++) {
      try {
        result.push(__block__(__block__.$self, self[i]));
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return result;}, 0), rb_vm_defn(self, "collect!", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;for (var i = 0; i < self.length; i++) {
      try {
        self[i] = __block__(__block__.$self, self[i]);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), rb_vm_defn(self, "dup", function(self) {
var nil = Qnil;
return self.slice(0);}, 0), rb_vm_defn(self, "compact", function(self) {
var nil = Qnil;
var result = [], length = self.length;

    for (var i = 0; i < length; i++) {
      if (self[i] != nil) {
        result.push(self[i]);
      }
    }

    return result;}, 0), rb_vm_defn(self, "compact!", function(self) {
var nil = Qnil;
var length = self.length;

    for (var i = 0; i < length; i++) {
      if (self[i] == nil) {
        self.splice(i, 1);
        i--;
      }
    }

    return length == self.length ? nil : self;}, 0), rb_vm_defn(self, "concat", function(self, other) {
var nil = Qnil;
var length = other.length;

    for (var i = 0; i < length; i++) {
      self.push(other[i]);
    }

    return self;}, 0), rb_vm_defn(self, "count", function(self, obj) {
var nil = Qnil;
var __a;
if (obj != undefined) {
      var total = 0;

      for (var i = 0; i < self.length; i++) {
        if ((__a = self[i], __a.$m["=="])(__a, obj).$r) {
          total++;
        }
      }

      return total;
    } else {
      return self.length;
    }}, 0), rb_vm_defn(self, "delete", function(self, obj) {
var nil = Qnil;
var __a;
var length = self.length;

    for (var i = 0; i < self.length; i++) {
      if ((__a = self[i], __a.$m["=="])(__a, obj).$r) {
        self.splice(i, 1);
        i--;
      }
    }

    return length == self.length ? nil : obj;}, 0), rb_vm_defn(self, "delete_at", function(self, idx) {
var nil = Qnil;
if (idx < 0) idx += self.length;
    if (idx < 0 || idx >= self.length) return nil;
    var res = self[idx];
    self.splice(idx, 1);
    return self;}, 0), rb_vm_defn(self, "delete_if", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;for (var i = 0; i < self.length; i++) {
      try {
        if (__block__(__block__.$self, self[i]).$r) {
          self.splice(i, 1);
          i--;
        }
      } catch (e) {
        switch(e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), rb_vm_defn(self, "drop", function(self, n) {
var nil = Qnil;
if (n > self.length) return [];
    return self.slice(n);}, 0), rb_vm_defn(self, "drop_while", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;for (var i = 0; i < self.length; i++) {
      if (!__block__(__block__.$self, self[i]).$r) {
        return self.slice(i);
      }
    }

    return [];}, 0), rb_vm_defn(self, "empty?", function(self) {
var nil = Qnil;
return self.length == 0 ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, "fetch", function(self, idx, defaults) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;var original = idx;

    if (idx < 0) idx += self.length;
    if (idx < 0 || idx >= self.length) {
      if (defaults == undefined)
        return rb_raise("Index Error: Array#fetch");
      else if (__block__)
        return __block__(__block__.$self, original);
      else
        return defaults;
    }

    return self[idx];}, 0), rb_vm_defn(self, "first", function(self, count) {
var nil = Qnil;
if (count === undefined) count = nil;
if (count == nil) {
      if (self.length == 0) return nil;
      return self[0];
    }
    return self.slice(0, count);}, 0), rb_vm_defn(self, "flatten", function(self, level) {
var nil = Qnil;
var __a;
if (level === undefined) level = nil;
var result = [], item;

    for (var i = 0; i < self.length; i++) {
      item = self[i];

      if (item.hasOwnProperty('length')) {
        if (level == nil)
          result = result.concat((__a = item, __a.$m.flatten)(__a));
        else if (level == 0)
          result.push(item);
        else
          result = result.concat((__a = item, __a.$m.flatten)(__a, level - 1));
      } else {
        result.push(item);
      }
    }

    return result;}, 0), rb_vm_defn(self, "flatten!", function(self, level) {
var nil = Qnil;
var __a;
if (level === undefined) level = nil;
var length = self.length;
    var result = (__a = self, __a.$m.flatten)(__a, level);
    self.splice(0);
    
    for (var i = 0; i < result.length; i++) {
      self.push(result[i]);
    }
    
    if (self.length == length)
      return nil;
    
    return self;}, 0), rb_vm_defn(self, "include?", function(self, member) {
var nil = Qnil;
var __a;
for (var i = 0; i < self.length; i++) {
      if ((__a = self[i], __a.$m["=="])(__a, member).$r) {
        return Qtrue;
      }
    }

    return Qfalse;}, 0), rb_vm_defn(self, "replace", function(self, other) {
var nil = Qnil;
self.splice(0);

    for (var i = 0; i < other.length; i++) {
      self.push(other[i]);
    }

    return self;}, 0), rb_vm_defn(self, "insert", function(self, idx, objs) {
var nil = Qnil;
objs = Array.prototype.slice.call(arguments, 2);
if (idx < 0) idx += self.length;
    
    if (idx < 0 || idx >= self.length)
      rb_raise("IndexError: out of range");

    self.splice.apply(self, [idx, 0].concat(objs));
    return self;}, 0), rb_vm_defn(self, "join", function(self, sep) {
var nil = Qnil;
var __a;
if (sep === undefined) sep = "";
var result = [];

    for (var i = 0; i < self.length; i++) {
      result.push((__a = self[i], __a.$m.to_s)(__a));
    }

    return result.join(sep);}, 0), rb_vm_defn(self, "keep_if", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;for (var i = 0; i < self.length; i++) {
      if (!__block__(__block__.$self, self[i]).$r) {
        self.splice(i, 1);
        i--;
      }
    }

    return self;}, 0), rb_vm_defn(self, "last", function(self, count) {
var nil = Qnil;
if (count === undefined) count = nil;
if (count == nil) {
      if (self.length == 0) return nil;
      return self[self.length - 1];
    } else {
      if (count > self.length) count = self.length;
      return self.slice(self.length - count, self.length);
    }}, 0), rb_vm_defn(self, "pop", function(self, count) {
var nil = Qnil;
if (count === undefined) count = nil;
if (count == nil) {
      if (self.length) return self.pop();
      return nil;
    } else {
      return self.splice(self.length - count, self.length);
    }}, 0), rb_vm_defn(self, "rassoc", function(self, obj) {
var nil = Qnil;
var __a;
var test;

    for (var i = 0; i < self.length; i++) {
      test = self[i];
      if (test.hasOwnProperty('length') && test[1] != undefined) {
        console.log("trying " + i);
        if ((__a = test[1], __a.$m["=="])(__a, obj).$r) return test;
      }
    }

    return nil;}, 0), rb_vm_defn(self, "reject", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;var result = [];

    for (var i = 0; i < self.length; i++) {
      if (!__block__(__block__.$self, self[i]).$r) {
        result.push(self[i]);
      }
    }

    return result;}, 0), rb_vm_defn(self, "reject!", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;var length = self.length;

    for (var i = 0; i < self.length; i++) {
      if (__block__(__block__.$self, self[i]).$r) {
        self.splice(i, 1);
        i--;
      }
    }

    return self.length == length ? nil : self;}, 0), rb_vm_defn(self, "reverse", function(self) {
var nil = Qnil;
var result = [];

    for (var i = self.length - 1; i >= 0; i--) {
      result.push(self[i]);
    }

    return result;}, 0), rb_vm_defn(self, "reverse!", function(self) {
var nil = Qnil;
var length = self.length / 2, tmp;

    for (var i = 0; i < length; i++) {
      tmp = self[i];
      self[i] = self[self.length - (i + 1)];
      self[self.length - (i + 1)] = tmp;
    }

    return self;}, 0), rb_vm_defn(self, "reverse_each", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;for (var i = self.length - 1; i >= 0; i--) {
      try {
        __block__(__block__.$self, self[i]);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), rb_vm_defn(self, "rindex", function(self, obj) {
var nil = Qnil;
var __a;
if (obj === undefined) obj = undefined;
if (obj != undefined) {
      for (var i = self.length - 1; i >=0; i--) {
        if ((__a = self[i], __a.$m["=="])(__a, obj).$r) {
          return i;
        }
      }
    } else if (true || __block__) {
      rb_raise("array#rindex needs to do block action");
    }

    return nil;}, 0), rb_vm_defn(self, "select!", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;var length = self.length;

    for (var i = 0; i < self.length; i++) {
      if (!__block__(__block__.$self, self[i]).$r) {
        self.splice(i, 1);
        i--;
      }
    }

    return self.length == length ? nil : self;}, 0), rb_vm_defn(self, "shift", function(self, count) {
var nil = Qnil;
if (count === undefined) count = nil;
if (count != nil)
      return self.splice(0, count);

    if (self.length) 
      return self.shift();

    return nil;}, 0), rb_vm_defn(self, "slice!", function(self, index, length) {
var nil = Qnil;
if (length === undefined) length = nil;
var size = self.length;

    if (index < 0) index += size;

    if (index >= size || index < 0) return nil;

    if (length != nil) {
      if (length <= 0 || length > self.length) return nil;
      return self.splice(index, index + length);
    } else {
      return self.splice(index, 1)[0];
    }}, 0), rb_vm_defn(self, "take", function(self, count) {
var nil = Qnil;
return self.slice(0, count);}, 0), rb_vm_defn(self, "take_while", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;var result = [];

    for (var i = 0; i < self.length; i++) {
      try {
        if (__block__(__block__.$self, self[i]).$r) {
          result.push(self[i]);
        } else {
          break;
        }
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];

          default:
            throw e;
        }
      }
    }

    return result;}, 0), rb_vm_defn(self, "to_a", function(self) {
var nil = Qnil;
return (self);}, 0), rb_vm_defn(self, "uniq", function(self) {
var nil = Qnil;
var result = [], seen = [];

    for (var i = 0; i < self.length; i++) {
      var test = self[i], hash = test.$hash();
      if (seen.indexOf(hash) == -1) {
        seen.push(hash);
        result.push(test);
      }
    }

    return result;}, 0), rb_vm_defn(self, "uniq!", function(self) {
var nil = Qnil;
var seen = [], length = self.length;

    for (var i = 0; i < self.length; i++) {
      var test = self[i], hash = test.$hash();
      if (seen.indexOf(hash) == -1) {
        seen.push(hash);
      } else {
        self.splice(i, 1);
        i--;
      }
    }

    return self.length == length ? nil : self;}, 0), rb_vm_defn(self, "unshift", function(self, objs) {
var nil = Qnil;
objs = Array.prototype.slice.call(arguments, 1);
for (var i = objs.length - 1; i >= 0; i--) {
      self.unshift(objs[i]);
    }

    return self;}, 0), rb_vm_defn(self, "&", function(self, other) {
var nil = Qnil;
var result = [], seen = [];

    for (var i = 0; i < self.length; i++) {
      var test = self[i], hash = test.$hash();

      if (seen.indexOf(hash) == -1) {
        for (var j = 0; j < other.length; j++) {
          var test_b = other[j], hash_b = test_b.$hash();

          if ((hash == hash_b) && seen.indexOf(hash) == -1) {
            seen.push(hash);
            result.push(test);
          }
        }
      }
    }

    return result;}, 0), rb_vm_defn(self, "*", function(self, arg) {
var nil = Qnil;
var __a;
if (typeof arg == 'string') {
      return (__a = self, __a.$m.join)(__a, arg);
    } else {
      var result = [];
      for (var i = 0; i < parseInt(arg); i++) {
        result = result.concat(self);
      }

      return result;
    }}, 0), rb_vm_defn(self, "[]", function(self, index, length) {
var nil = Qnil;
if (length === undefined) length = nil;
var size = self.length;

    if (index < 0) index += size;

    if (index >= size || index < 0) return nil;

    if (length != nil) {
      if (length <= 0) return [];
      return self.slice(index, index + length);
    } else {
      return self[index];
    }}, 0), rb_vm_defn(self, "[]=", function(self, index, value) {
var nil = Qnil;
return self[index] = value;}, 0));}, 0));})(rb_top_self);