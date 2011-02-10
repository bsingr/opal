(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, Qtrue = Opal.Qtrue, Qfalse = Opal.Qfalse, $range = Opal.G, $block = Opal.P, $cg = Opal.cg;
return ($class(self, nil, "Array", function() {
var self = this;return ($def(self, "[]", function(objs) {
var self = this;
objs = Array.prototype.slice.call(arguments, 1);
return (objs);}, 1), $def(self, "allocate", function() {
var self = this;
return ([]);}, 1), $def(self, "initialize", function(objs) {
var self = this;
objs = Array.prototype.slice.call(arguments, 1);
for (var i = 0; i < objs.length; i++) {
      self.push(objs[i]);
    }

    return self;}, 0), $def(self, "inspect", function() {
var self = this;
var description = [];
  
    for (var i = 0; i < self.length; i++) {
      description.push(self[i].$m.inspect(self[i]));
    }
  
    return '[' + description.join(', ') + ']';}, 0), $def(self, "to_s", function() {
var self = this;
var description = [];

    for (var i = 0; i < self.length; i++) {
      description.push(self[i].$m.to_s(self[i]));
    }

    return description.join('');}, 0), $def(self, "<<", function(obj) {
var self = this;
return (self.push(obj), self);}, 0), $def(self, "length", function() {
var self = this;
return self.length;}, 0), $def(self, "size", function() {
var self = this;
return self.length;}, 0), $def(self, "each", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self.length; i++) {
      try {
        __block__.call(__block__.$self, self[i]);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e.$value;
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "each_with_index", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self.length; i++) {
      try {
        __block__.call(__block__.$self, self[i], i);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e.$value;
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "each_index", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self.length; i++) {
      try {
        __block__.call(__block__.$self, i);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e.$value;
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "push", function(objs) {
var self = this;
objs = Array.prototype.slice.call(arguments, 1);
for (var i = 0; i < objs.length; i++) {
      self.push(objs[i]);
    }

    return self;}, 0), $def(self, "index", function(obj) {
var self = this;
for (var i = 0; i < self.length; i++) {
      if (self[i]["m$=="](obj).$r) {
        return i;
      }
    }

    return nil;}, 0), $def(self, "+", function(other) {
var self = this;
return self.concat(other);}, 0), $def(self, "-", function(other) {
var self = this;
return (self.m$raise(("Array" + "#" + "- not yet implemented")));}, 0), $def(self, "==", function(other) {
var self = this;
if (self.$hash() == other.$hash()) return Qtrue;
    if (self.length != other.length) return Qfalse;

    for (var i = 0; i < self.length; i++) {
      if (!self[i]["m$=="](other[i]).$r) {
        return Qfalse;
      }
    }

    return Qtrue;}, 0), $def(self, "assoc", function(obj) {
var self = this;
var arg;

    for (var i = 0; i < self.length; i++) {
      arg = self[i];

      if (arg.length && arg[0]["m$=="](obj).$r) {
        return arg;
      }
    }

    return nil;}, 0), $def(self, "at", function(idx) {
var self = this;
if (idx < 0) idx += self.length;

    if (idx < 0 || idx >= self.length) return nil;
    return self[idx];}, 0), $def(self, "clear", function() {
var self = this;
self.splice(0);
    return self;}, 0), $def(self, "select", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var result = [], arg;

    for (var i = 0; i < self.length; i++) {
      try {
        arg = self[i];
        if (__block__.call(__block__.$self, arg).$r) {
          result.push(arg);
        }
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e.$value;
          default:
            throw e;
        }
      }
    }

    return result;}, 0), $def(self, "collect", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var result = [];

    for (var i = 0; i < self.length; i++) {
      try {
        result.push(__block__.call(__block__.$self, self[i]));
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e.$value;
          default:
            throw e;
        }
      }
    }

    return result;}, 0), $def(self, "collect!", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self.length; i++) {
      try {
        self[i] = __block__.call(__block__.$self, self[i]);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e.$value;
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "dup", function() {
var self = this;
return self.slice(0);}, 0), $def(self, "compact", function() {
var self = this;
var result = [], length = self.length;

    for (var i = 0; i < length; i++) {
      if (self[i] != nil) {
        result.push(self[i]);
      }
    }

    return result;}, 0), $def(self, "compact!", function() {
var self = this;
var length = self.length;

    for (var i = 0; i < length; i++) {
      if (self[i] == nil) {
        self.splice(i, 1);
        i--;
      }
    }

    return length == self.length ? nil : self;}, 0), $def(self, "concat", function(other) {
var self = this;
var length = other.length;

    for (var i = 0; i < length; i++) {
      self.push(other[i]);
    }

    return self;}, 0), $def(self, "count", function(obj) {
var self = this;
if (obj != undefined) {
      var total = 0;

      for (var i = 0; i < self.length; i++) {
        if (self[i]["m$=="](obj).$r) {
          total++;
        }
      }

      return total;
    } else {
      return self.length;
    }}, 0), $def(self, "delete", function(obj) {
var self = this;
var length = self.length;

    for (var i = 0; i < self.length; i++) {
      if (self[i]["m$=="](obj).$r) {
        self.splice(i, 1);
        i--;
      }
    }

    return length == self.length ? nil : obj;}, 0), $def(self, "delete_at", function(idx) {
var self = this;
if (idx < 0) idx += self.length;
    if (idx < 0 || idx >= self.length) return nil;
    var res = self[idx];
    self.splice(idx, 1);
    return self;}, 0), $def(self, "delete_if", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self.length; i++) {
      try {
        if (__block__.call(__block__.$self, self[i]).$r) {
          self.splice(i, 1);
          i--;
        }
      } catch (e) {
        switch(e.$keyword) {
          case 2:
            return e.$value;
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "drop", function(n) {
var self = this;
if (n > self.length) return [];
    return self.slice(n);}, 0), $def(self, "drop_while", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self.length; i++) {
      if (!__block__.call(__block__.$self, self[i]).$r) {
        return self.slice(i);
      }
    }

    return [];}, 0), $def(self, "empty?", function() {
var self = this;
return self.length == 0 ? Qtrue : Qfalse;}, 0), $def(self, "fetch", function(idx, defaults) {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var original = idx;

    if (idx < 0) idx += self.length;
    if (idx < 0 || idx >= self.length) {
      if (defaults == undefined)
        return rb_raise("Index Error: Array#fetch");
      else if (__block__)
        return __block__.call(__block__.$self, original);
      else
        return defaults;
    }

    return self[idx];}, 0), $def(self, "first", function(count) {
var self = this;
if (count === undefined) count = nil;
if (count == nil) {
      if (self.length == 0) return nil;
      return self[0];
    }
    return self.slice(0, count);}, 0), $def(self, "flatten", function(level) {
var self = this;
if (level === undefined) level = nil;
var result = [], item;

    for (var i = 0; i < self.length; i++) {
      item = self[i];

      if (item.hasOwnProperty('length')) {
        if (level == nil)
          result = result.concat(item.m$flatten());
        else if (level == 0)
          result.push(item);
        else
          result = result.concat(item.m$flatten(level - 1));
      } else {
        result.push(item);
      }
    }

    return result;}, 0), $def(self, "flatten!", function(level) {
var self = this;
if (level === undefined) level = nil;
var length = self.length;
    var result = self.m$flatten(level);
    self.splice(0);
    
    for (var i = 0; i < result.length; i++) {
      self.push(result[i]);
    }
    
    if (self.length == length)
      return nil;
    
    return self;}, 0), $def(self, "include?", function(member) {
var self = this;
for (var i = 0; i < self.length; i++) {
      if (self[i]["m$=="](member).$r) {
        return Qtrue;
      }
    }

    return Qfalse;}, 0), $def(self, "replace", function(other) {
var self = this;
self.splice(0);

    for (var i = 0; i < other.length; i++) {
      self.push(other[i]);
    }

    return self;}, 0), $def(self, "insert", function(idx, objs) {
var self = this;
objs = Array.prototype.slice.call(arguments, 2);
if (idx < 0) idx += self.length;
    
    if (idx < 0 || idx >= self.length)
      rb_raise("IndexError: out of range");

    self.splice.apply(self, [idx, 0].concat(objs));
    return self;}, 0), $def(self, "join", function(sep) {
var self = this;
if (sep === undefined) sep = "";
var result = [];

    for (var i = 0; i < self.length; i++) {
      result.push(self[i].m$to_s());
    }

    return result.join(sep);}, 0), $def(self, "keep_if", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self.length; i++) {
      if (!__block__.call(__block__.$self, self[i]).$r) {
        self.splice(i, 1);
        i--;
      }
    }

    return self;}, 0), $def(self, "last", function(count) {
var self = this;
if (count === undefined) count = nil;
if (count == nil) {
      if (self.length == 0) return nil;
      return self[self.length - 1];
    } else {
      if (count > self.length) count = self.length;
      return self.slice(self.length - count, self.length);
    }}, 0), $def(self, "pop", function(count) {
var self = this;
if (count === undefined) count = nil;
if (count == nil) {
      if (self.length) return self.pop();
      return nil;
    } else {
      return self.splice(self.length - count, self.length);
    }}, 0), $def(self, "rassoc", function(obj) {
var self = this;
var test;

    for (var i = 0; i < self.length; i++) {
      test = self[i];
      if (test.hasOwnProperty('length') && test[1] != undefined) {
        console.log("trying " + i);
        if (test[1]["m$=="](obj).$r) return test;
      }
    }

    return nil;}, 0), $def(self, "reject", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var result = [];

    for (var i = 0; i < self.length; i++) {
      if (!__block__.call(__block__.$self, self[i]).$r) {
        result.push(self[i]);
      }
    }

    return result;}, 0), $def(self, "reject!", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var length = self.length;

    for (var i = 0; i < self.length; i++) {
      if (__block__.call(__block__.$self, self[i]).$r) {
        self.splice(i, 1);
        i--;
      }
    }

    return self.length == length ? nil : self;}, 0), $def(self, "reverse", function() {
var self = this;
var result = [];

    for (var i = self.length - 1; i >= 0; i--) {
      result.push(self[i]);
    }

    return result;}, 0), $def(self, "reverse!", function() {
var self = this;
var length = self.length / 2, tmp;

    for (var i = 0; i < length; i++) {
      tmp = self[i];
      self[i] = self[self.length - (i + 1)];
      self[self.length - (i + 1)] = tmp;
    }

    return self;}, 0), $def(self, "reverse_each", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = self.length - 1; i >= 0; i--) {
      try {
        __block__.call(__block__.$self, self[i]);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "rindex", function(obj) {
var self = this;
if (obj === undefined) obj = undefined;
if (obj != undefined) {
      for (var i = self.length - 1; i >=0; i--) {
        if (self[i]["m$=="](obj).$r) {
          return i;
        }
      }
    } else if (true || __block__) {
      rb_raise("array#rindex needs to do block action");
    }

    return nil;}, 0), $def(self, "select!", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var length = self.length;

    for (var i = 0; i < self.length; i++) {
      if (!__block__.call(__block__.$self, self[i]).$r) {
        self.splice(i, 1);
        i--;
      }
    }

    return self.length == length ? nil : self;}, 0), $def(self, "shift", function(count) {
var self = this;
if (count === undefined) count = nil;
if (count != nil)
      return self.splice(0, count);

    if (self.length) 
      return self.shift();

    return nil;}, 0), $def(self, "slice!", function(index, length) {
var self = this;
if (length === undefined) length = nil;
var size = self.length;

    if (index < 0) index += size;

    if (index >= size || index < 0) return nil;

    if (length != nil) {
      if (length <= 0 || length > self.length) return nil;
      return self.splice(index, index + length);
    } else {
      return self.splice(index, 1)[0];
    }}, 0), $def(self, "take", function(count) {
var self = this;
return self.slice(0, count);}, 0), $def(self, "take_while", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var result = [];

    for (var i = 0; i < self.length; i++) {
      try {
        if (__block__.call(__block__.$self, self[i]).$r) {
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

    return result;}, 0), $def(self, "to_a", function() {
var self = this;
return (self);}, 0), $def(self, "uniq", function() {
var self = this;
var result = [], seen = [];

    for (var i = 0; i < self.length; i++) {
      var test = self[i], hash = test.$hash();
      if (seen.indexOf(hash) == -1) {
        seen.push(hash);
        result.push(test);
      }
    }

    return result;}, 0), $def(self, "uniq!", function() {
var self = this;
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

    return self.length == length ? nil : self;}, 0), $def(self, "unshift", function(objs) {
var self = this;
objs = Array.prototype.slice.call(arguments, 1);
for (var i = objs.length - 1; i >= 0; i--) {
      self.unshift(objs[i]);
    }

    return self;}, 0), $def(self, "&", function(other) {
var self = this;
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

    return result;}, 0), $def(self, "*", function(arg) {
var self = this;
if (typeof arg == 'string') {
      return self.m$join(arg);
    } else {
      var result = [];
      for (var i = 0; i < parseInt(arg); i++) {
        result = result.concat(self);
      }

      return result;
    }}, 0), $def(self, "[]", function(index, length) {
var self = this;
if (length === undefined) length = nil;
var size = self.length;

    if (index < 0) index += size;

    if (index >= size || index < 0) return nil;

    if (length != nil) {
      if (length <= 0) return [];
      return self.slice(index, index + length);
    } else {
      return self[index];
    }}, 0), $def(self, "[]=", function(index, value) {
var self = this;
return self[index] = value;}, 0));}, 0));})();