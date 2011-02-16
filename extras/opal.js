if (typeof Opal == 'undefined')
  Opal = {};

(function(global, exports, undefined) {
  var modules = {};

  var require = function(name) {
    if (require[name]) return require[name];
    var exports = {};
    modules[name](exports, modules[name]);
    require[name] = exports;
    return exports;
  };

  //global.modules = modules;
  //global.require = require;

modules["./array"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm(['==', 'raise', 'flatten', 'to_s', 'join']);
return ($class(self, nil, "Array", function(self) {
return ($def(self, "[]", function(self, objs) {
objs = Array.prototype.slice.call(arguments, 1);
return (objs);}, 1), $def(self, "allocate", function(self) {
return ([]);}, 1), $def(self, "initialize", function(self, objs) {
objs = Array.prototype.slice.call(arguments, 1);
for (var i = 0; i < objs.length; i++) {
      self.push(objs[i]);
    }

    return self;}, 0), $def(self, "inspect", function(self) {
var description = [];
  
    for (var i = 0; i < self.length; i++) {
      description.push(self[i].$m.inspect(self[i]));
    }
  
    return '[' + description.join(', ') + ']';}, 0), $def(self, "to_s", function(self) {
var description = [];

    for (var i = 0; i < self.length; i++) {
      description.push(self[i].$m.to_s(self[i]));
    }

    return description.join('');}, 0), $def(self, "<<", function(self, obj) {
return (self.push(obj), self);}, 0), $def(self, "length", function(self) {
return self.length;}, 0), $def(self, "size", function(self) {
return self.length;}, 0), $def(self, "each", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self.length; i++) {
      try {
        __block__(__block__.$self, self[i]);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e.$value;
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "each_with_index", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self.length; i++) {
      try {
        __block__(__block__.$self, self[i], i);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e.$value;
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "each_index", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self.length; i++) {
      try {
        __block__(__block__.$self, i);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e.$value;
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "push", function(self, objs) {
objs = Array.prototype.slice.call(arguments, 1);
for (var i = 0; i < objs.length; i++) {
      self.push(objs[i]);
    }

    return self;}, 0), $def(self, "index", function(self, obj) {
var __a;
for (var i = 0; i < self.length; i++) {
      if ((__a = self[i]).$m["=="](__a, obj).$r) {
        return i;
      }
    }

    return nil;}, 0), $def(self, "+", function(self, other) {
return self.concat(other);}, 0), $def(self, "-", function(self, other) {
return (self.$m.raise(self, ("Array" + "#" + "- not yet implemented")));}, 0), $def(self, "==", function(self, other) {
var __a;
if (self.$hash() == other.$hash()) return Qtrue;
    if (self.length != other.length) return Qfalse;

    for (var i = 0; i < self.length; i++) {
      if (!(__a = self[i]).$m["=="](__a, other[i]).$r) {
        return Qfalse;
      }
    }

    return Qtrue;}, 0), $def(self, "assoc", function(self, obj) {
var __a;
var arg;

    for (var i = 0; i < self.length; i++) {
      arg = self[i];

      if (arg.length && (__a = arg[0]).$m["=="](__a, obj).$r) {
        return arg;
      }
    }

    return nil;}, 0), $def(self, "at", function(self, idx) {
if (idx < 0) idx += self.length;

    if (idx < 0 || idx >= self.length) return nil;
    return self[idx];}, 0), $def(self, "clear", function(self) {
self.splice(0);
    return self;}, 0), $def(self, "select", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var result = [], arg;

    for (var i = 0; i < self.length; i++) {
      try {
        arg = self[i];
        if (__block__(__block__.$self, arg).$r) {
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

    return result;}, 0), $def(self, "collect", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var result = [];

    for (var i = 0; i < self.length; i++) {
      try {
        result.push(__block__(__block__.$self, self[i]));
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e.$value;
          default:
            throw e;
        }
      }
    }

    return result;}, 0), $def(self, "collect!", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self.length; i++) {
      try {
        self[i] = __block__(__block__.$self, self[i]);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e.$value;
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "dup", function(self) {
return self.slice(0);}, 0), $def(self, "compact", function(self) {
var result = [], length = self.length;

    for (var i = 0; i < length; i++) {
      if (self[i] != nil) {
        result.push(self[i]);
      }
    }

    return result;}, 0), $def(self, "compact!", function(self) {
var length = self.length;

    for (var i = 0; i < length; i++) {
      if (self[i] == nil) {
        self.splice(i, 1);
        i--;
      }
    }

    return length == self.length ? nil : self;}, 0), $def(self, "concat", function(self, other) {
var length = other.length;

    for (var i = 0; i < length; i++) {
      self.push(other[i]);
    }

    return self;}, 0), $def(self, "count", function(self, obj) {
var __a;
if (obj != undefined) {
      var total = 0;

      for (var i = 0; i < self.length; i++) {
        if ((__a = self[i]).$m["=="](__a, obj).$r) {
          total++;
        }
      }

      return total;
    } else {
      return self.length;
    }}, 0), $def(self, "delete", function(self, obj) {
var __a;
var length = self.length;

    for (var i = 0; i < self.length; i++) {
      if ((__a = self[i]).$m["=="](__a, obj).$r) {
        self.splice(i, 1);
        i--;
      }
    }

    return length == self.length ? nil : obj;}, 0), $def(self, "delete_at", function(self, idx) {
if (idx < 0) idx += self.length;
    if (idx < 0 || idx >= self.length) return nil;
    var res = self[idx];
    self.splice(idx, 1);
    return self;}, 0), $def(self, "delete_if", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self.length; i++) {
      try {
        if (__block__(__block__.$self, self[i]).$r) {
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

    return self;}, 0), $def(self, "drop", function(self, n) {
if (n > self.length) return [];
    return self.slice(n);}, 0), $def(self, "drop_while", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self.length; i++) {
      if (!__block__(__block__.$self, self[i]).$r) {
        return self.slice(i);
      }
    }

    return [];}, 0), $def(self, "empty?", function(self) {
return self.length == 0 ? Qtrue : Qfalse;}, 0), $def(self, "fetch", function(self, idx, defaults) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var original = idx;

    if (idx < 0) idx += self.length;
    if (idx < 0 || idx >= self.length) {
      if (defaults == undefined)
        return rb_raise("Index Error: Array#fetch");
      else if (__block__)
        return __block__(__block__.$self, original);
      else
        return defaults;
    }

    return self[idx];}, 0), $def(self, "first", function(self, count) {
if (count === undefined) count = nil;
if (count == nil) {
      if (self.length == 0) return nil;
      return self[0];
    }
    return self.slice(0, count);}, 0), $def(self, "flatten", function(self, level) {
var __a;
if (level === undefined) level = nil;
var result = [], item;

    for (var i = 0; i < self.length; i++) {
      item = self[i];

      if (item.hasOwnProperty('length')) {
        if (level == nil)
          result = result.concat((__a = item).$m.flatten(__a));
        else if (level == 0)
          result.push(item);
        else
          result = result.concat((__a = item).$m.flatten(__a, level - 1));
      } else {
        result.push(item);
      }
    }

    return result;}, 0), $def(self, "flatten!", function(self, level) {
var __a;
if (level === undefined) level = nil;
var length = self.length;
    var result = (__a = self).$m.flatten(__a, level);
    self.splice(0);
    
    for (var i = 0; i < result.length; i++) {
      self.push(result[i]);
    }
    
    if (self.length == length)
      return nil;
    
    return self;}, 0), $def(self, "include?", function(self, member) {
var __a;
for (var i = 0; i < self.length; i++) {
      if ((__a = self[i]).$m["=="](__a, member).$r) {
        return Qtrue;
      }
    }

    return Qfalse;}, 0), $def(self, "replace", function(self, other) {
self.splice(0);

    for (var i = 0; i < other.length; i++) {
      self.push(other[i]);
    }

    return self;}, 0), $def(self, "insert", function(self, idx, objs) {
objs = Array.prototype.slice.call(arguments, 2);
if (idx < 0) idx += self.length;
    
    if (idx < 0 || idx >= self.length)
      rb_raise("IndexError: out of range");

    self.splice.apply(self, [idx, 0].concat(objs));
    return self;}, 0), $def(self, "join", function(self, sep) {
var __a;
if (sep === undefined) sep = "";
var result = [];

    for (var i = 0; i < self.length; i++) {
      result.push((__a = self[i]).$m.to_s(__a));
    }

    return result.join(sep);}, 0), $def(self, "keep_if", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self.length; i++) {
      if (!__block__(__block__.$self, self[i]).$r) {
        self.splice(i, 1);
        i--;
      }
    }

    return self;}, 0), $def(self, "last", function(self, count) {
if (count === undefined) count = nil;
if (count == nil) {
      if (self.length == 0) return nil;
      return self[self.length - 1];
    } else {
      if (count > self.length) count = self.length;
      return self.slice(self.length - count, self.length);
    }}, 0), $def(self, "pop", function(self, count) {
if (count === undefined) count = nil;
if (count == nil) {
      if (self.length) return self.pop();
      return nil;
    } else {
      return self.splice(self.length - count, self.length);
    }}, 0), $def(self, "rassoc", function(self, obj) {
var __a;
var test;

    for (var i = 0; i < self.length; i++) {
      test = self[i];
      if (test.hasOwnProperty('length') && test[1] != undefined) {
        console.log("trying " + i);
        if ((__a = test[1]).$m["=="](__a, obj).$r) return test;
      }
    }

    return nil;}, 0), $def(self, "reject", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var result = [];

    for (var i = 0; i < self.length; i++) {
      if (!__block__(__block__.$self, self[i]).$r) {
        result.push(self[i]);
      }
    }

    return result;}, 0), $def(self, "reject!", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var length = self.length;

    for (var i = 0; i < self.length; i++) {
      if (__block__(__block__.$self, self[i]).$r) {
        self.splice(i, 1);
        i--;
      }
    }

    return self.length == length ? nil : self;}, 0), $def(self, "reverse", function(self) {
var result = [];

    for (var i = self.length - 1; i >= 0; i--) {
      result.push(self[i]);
    }

    return result;}, 0), $def(self, "reverse!", function(self) {
var length = self.length / 2, tmp;

    for (var i = 0; i < length; i++) {
      tmp = self[i];
      self[i] = self[self.length - (i + 1)];
      self[self.length - (i + 1)] = tmp;
    }

    return self;}, 0), $def(self, "reverse_each", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = self.length - 1; i >= 0; i--) {
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

    return self;}, 0), $def(self, "rindex", function(self, obj) {
var __a;
if (obj === undefined) obj = undefined;
if (obj != undefined) {
      for (var i = self.length - 1; i >=0; i--) {
        if ((__a = self[i]).$m["=="](__a, obj).$r) {
          return i;
        }
      }
    } else if (true || __block__) {
      rb_raise("array#rindex needs to do block action");
    }

    return nil;}, 0), $def(self, "select!", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var length = self.length;

    for (var i = 0; i < self.length; i++) {
      if (!__block__(__block__.$self, self[i]).$r) {
        self.splice(i, 1);
        i--;
      }
    }

    return self.length == length ? nil : self;}, 0), $def(self, "shift", function(self, count) {
if (count === undefined) count = nil;
if (count != nil)
      return self.splice(0, count);

    if (self.length) 
      return self.shift();

    return nil;}, 0), $def(self, "slice!", function(self, index, length) {
if (length === undefined) length = nil;
var size = self.length;

    if (index < 0) index += size;

    if (index >= size || index < 0) return nil;

    if (length != nil) {
      if (length <= 0 || length > self.length) return nil;
      return self.splice(index, index + length);
    } else {
      return self.splice(index, 1)[0];
    }}, 0), $def(self, "take", function(self, count) {
return self.slice(0, count);}, 0), $def(self, "take_while", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var result = [];

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

    return result;}, 0), $def(self, "to_a", function(self) {
return (self);}, 0), $def(self, "uniq", function(self) {
var result = [], seen = [];

    for (var i = 0; i < self.length; i++) {
      var test = self[i], hash = test.$hash();
      if (seen.indexOf(hash) == -1) {
        seen.push(hash);
        result.push(test);
      }
    }

    return result;}, 0), $def(self, "uniq!", function(self) {
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

    return self.length == length ? nil : self;}, 0), $def(self, "unshift", function(self, objs) {
objs = Array.prototype.slice.call(arguments, 1);
for (var i = objs.length - 1; i >= 0; i--) {
      self.unshift(objs[i]);
    }

    return self;}, 0), $def(self, "&", function(self, other) {
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

    return result;}, 0), $def(self, "*", function(self, arg) {
var __a;
if (typeof arg == 'string') {
      return (__a = self).$m.join(__a, arg);
    } else {
      var result = [];
      for (var i = 0; i < parseInt(arg); i++) {
        result = result.concat(self);
      }

      return result;
    }}, 0), $def(self, "[]", function(self, index, length) {
if (length === undefined) length = nil;
var size = self.length;

    if (index < 0) index += size;

    if (index >= size || index < 0) return nil;

    if (length != nil) {
      if (length <= 0) return [];
      return self.slice(index, index + length);
    } else {
      return self[index];
    }}, 0), $def(self, "[]=", function(self, index, value) {
return self[index] = value;}, 0));}, 0));})();
};
modules["./numeric"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm([]);
return ($class(self, nil, "Numeric", function(self) {
return ($def(self, "+@", function(self) {
return self;}, 0), $def(self, "-@", function(self) {
return -self;}, 0), $def(self, "%", function(self, other) {
return self % other;}, 0), $def(self, "modulo", function(self, other) {
return self % other;}, 0), $def(self, "&", function(self, num2) {
return self & num2;}, 0), $def(self, "*", function(self, other) {
return self * other;}, 0), $def(self, "**", function(self, other) {
return Math.pow(self, other);}, 0), $def(self, "+", function(self, other) {
return self + other;}, 0), $def(self, "-", function(self, other) {
return self - other;}, 0), $def(self, "", function(self, other) {
return self / other;}, 0), $def(self, "<", function(self, other) {
return self < other ? Qtrue : Qfalse;}, 0), $def(self, "<=", function(self, other) {
return self <= other ? Qtrue : Qfalse;}, 0), $def(self, ">", function(self, other) {
return self > other ? Qtrue : Qfalse;}, 0), $def(self, ">=", function(self, other) {
return self >= other ? Qtrue : Qfalse;}, 0), $def(self, "<<", function(self, count) {
return self << count;}, 0), $def(self, ">>", function(self, count) {
return self >> count;}, 0), $def(self, "<=>", function(self, other) {
if (typeof other != 'number') return nil;
    else if (self < other) return -1;
    else if (self > other) return 1;
    return 0;}, 0), $def(self, "==", function(self, other) {
return self.valueOf() === other.valueOf() ? Qtrue : Qfalse;}, 0), $def(self, "^", function(self, other) {
return self ^ other;}, 0), $def(self, "abs", function(self) {
return Math.abs(self);}, 0), $def(self, "magnitude", function(self) {
return Math.abs(self);}, 0), $def(self, "even?", function(self) {
return (self % 2 == 0) ? Qtrue : Qfalse;}, 0), $def(self, "odd?", function(self) {
return (self % 2 == 0) ? Qfalse : Qtrue;}, 0), $def(self, "succ", function(self) {
return self + 1;}, 0), $def(self, "next", function(self) {
return self + 1;}, 0), $def(self, "pred", function(self) {
return self - 1;}, 0), $def(self, "upto", function(self, finish) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = self; i <= finish; i++) {
      __block__(__block__.$self, i);
    }

    return self;}, 0), $def(self, "downto", function(self, finish) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = self; i >= finish; i--) {
      __block__(__block__.$self, i);
    }

    return self;}, 0), $def(self, "times", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self; i++) {
      __block__(__block__.$self, i);
    }

    return self;}, 0), $def(self, "|", function(self, other) {
return self | other;}, 0), $def(self, "zero?", function(self) {
return self == 0 ? Qtrue : Qfalse;}, 0), $def(self, "nonzero?", function(self) {
return self == 0 ? nil : self;}, 0), $def(self, "~", function(self) {
return ~self;}, 0), $def(self, "ceil", function(self) {
return Math.ceil(self);}, 0), $def(self, "floor", function(self) {
return Math.floor(self);}, 0), $def(self, "integer?", function(self) {
return self % 1 == 0 ? Qtrue : Qfalse;}, 0), $def(self, "inspect", function(self) {
return self.toString();}, 0), $def(self, "to_s", function(self) {
return self.toString();}, 0), $def(self, "to_i", function(self) {
return parseInt(self);}, 0));}, 0));})();
};
modules["./string"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm(['match']);
return ($class(self, nil, "String", function(self) {
return ($def(self, "new", function(self, str) {
if (str === undefined) str = "";
return new String(str);}, 1), $def(self, "*", function(self, count) {
var result = [];

    for (var i = 0; i < count; i++) {
      result.push(self);
    }

    return result.join('');}, 0), $def(self, "+", function(self, other) {
return self + other;}, 0), $def(self, "capitalize", function(self) {
return self.charAt(0).toUpperCase() + self.substr(1).toLowerCase();}, 0), $def(self, "downcase", function(self) {
return self.toLowerCase();}, 0), $def(self, "to_s", function(self) {
return (self);}, 0), $def(self, "inspect", function(self) {
return '"' + self + '"';}, 0), $def(self, "length", function(self) {
return self.length;}, 0), $def(self, "to_sym", function(self) {
return opalsym(self);}, 0), $def(self, "intern", function(self) {
return opalsym(self);}, 0), $def(self, "reverse", function(self) {
return self.split('').reverse().join('');}, 0), $def(self, "sub", function(self, pattern) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return self.replace(pattern, function(str) {
      return __block__(__block__.$self, str);
    });}, 0), $def(self, "gsub", function(self, pattern) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var r = pattern.toString();
    r = r.substr(1, r.lastIndexOf('/') - 1);
    r = new RegExp(r, 'g');
    return self.replace(pattern, function(str) {
      return __block__(__block__.$self, str);
    });}, 0), $def(self, "slice", function(self, start, finish) {
if (finish === undefined) finish = nil;
return self.substr(start, finish);}, 0), $def(self, "split", function(self, split) {
return self.split(split);}, 0), $def(self, "<=>", function(self, other) {
if (typeof other != 'string') return nil;
    else if (self > other) return 1;
    else if (self < other) return -1;
    return 0;}, 0), $def(self, "==", function(self, other) {
return self.valueOf() === other.valueOf() ? Qtrue : Qfalse;}, 0), $def(self, "=~", function(self, obj) {
var __a;
return ((__a = obj).$m.match(__a, self), nil);}, 0), $def(self, "casecmp", function(self, other) {
if (typeof other != 'string') return nil;
    var a = self.toLowerCase(), b = other.toLowerCase();
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;}, 0), $def(self, "empty?", function(self) {
return self.length == 0 ? Qtrue : Qfalse;}, 0), $def(self, "end_with?", function(self, suffix) {
if (self.lastIndexOf(suffix) == self.length - suffix.length) {
      return Qtrue;
    }

    return Qfalse;}, 0), $def(self, "eql?", function(self, other) {
return self == other ? Qtrue : Qfalse;}, 0), $def(self, "include?", function(self, other) {
return self.indexOf(other) == -1 ? Qfalse : Qtrue;}, 0), $def(self, "index", function(self, substr) {
var res = self.indexOf(substr);

    return res == -1 ? nil : res;}, 0), $def(self, "lstrip", function(self) {
return self.replace(/^\s*/, '');}, 0));}, 0));})();
};
modules["./symbol"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm([]);
return ($class(self, nil, "Symbol", function(self) {
return ($def(self, "inspect", function(self) {
return ':' + self;}, 0), $def(self, "to_s", function(self) {
return self;}, 0), $def(self, "to_sym", function(self) {
return (self);}, 0));}, 0));})();
};
modules["./hash"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm(['inspect', '==', 'flatten']);
return ($class(self, nil, "Hash", function(self) {
return ($def(self, "values", function(self) {
var result = [], length = self.$keys.length;

    for (var i = 0; i < length; i++) {
      result.push(self.$assocs[self.$keys[i].$hash()]);
    }

    return result;}, 0), $def(self, "inspect", function(self) {
var __a;
var description = [], key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      description.push((__a = key).$m.inspect(__a) + '=>' + (__a = value).$m.inspect(__a));
    }

    return '{' + description.join(', ') + '}';}, 0), $def(self, "to_s", function(self) {
var __a;
var description = [], key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      description.push((__a = key).$m.inspect(__a) + (__a = value).$m.inspect(__a));
    }

    return description.join('');}, 0), $def(self, "each", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var keys = self.$keys, values = self.$assocs, length = keys.length, key;

    for (var i = 0; i < length; i++) {
      try {
        key = keys[i];
        __block__(__block__.$self, key, values[key.$hash()]);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "assoc", function(self, obj) {
var __a;
var key, keys = self.$keys, length = keys.length;

    for (var i = 0; i < length; i++) {
      key = keys[i];
      if ((__a = key).$m["=="](__a, obj).$r) {
        return [key, self.$assocs[key.$hash()]];
      }
    }

    return nil;}, 0), $def(self, "==", function(self, other) {
var __a;
if (self === other) return Qtrue;
    if (!other.$keys || !other.$assocs) return Qfalse;
    if (self.$keys.length != other.$keys.length) return Qfalse;

    for (var i = 0; i < self.$keys.length; i++) {
      var key1 = self.$keys[i], assoc1 = key1.$hash();

      if (!other.$assocs.hasOwnProperty(assoc1))
        return Qfalse;

      var assoc2 = other.$assocs[assoc1];

      if (!(__a = self.$assocs[assoc1]).$m["=="](__a, assoc2).$r)
        return Qfalse;
    }

    return Qtrue;}, 0), $def(self, "[]", function(self, key) {
var assoc = key.$hash();

    if (self.$assocs.hasOwnProperty(assoc))
      return self.$assocs[assoc];

    return self.$default;}, 0), $def(self, "[]=", function(self, key, value) {
var assoc = key.$hash();

    if (!self.$assocs.hasOwnProperty(assoc))
      self.$keys.push(key);

    return self.$assocs[assoc] = value;}, 0), $def(self, "clear", function(self) {
self.$keys = [];
    self.$assocs = {};
    
    return self;}, 0), $def(self, "default", function(self) {
return self.$default;}, 0), $def(self, "default=", function(self, obj) {
return self.$default = obj;}, 0), $def(self, "delete", function(self, key) {
var assoc = key.$hash();

    if (self.$assocs.hasOwnProperty(assoc)) {
      var ret = self.$assocs[assoc];
      delete self.$assocs[assoc];
      self.$keys.splice(self.$keys.indexOf(key), 1);
      return ret;
    }

    return self.$default;}, 0), $def(self, "delete_if", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      try {
        key = self.$keys[i];
        value = self.$assocs[key.$hash()];

        if (__block__(__block__.$self, key, value).$r) {
          delete self.$assocs[key.$hash()];
          self.$keys.splice(i, 1);
          i--;
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

    return self;}, 0), $def(self, "each_key", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var key;

    for (var i = 0; i < self.$keys.length; i++) {
      try {
        key = self.$keys[i];
        __block__(__block__.$self, key);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "each_value", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var val;

    for (var i = 0; i < self.$keys.length; i++) {
      try {
        val = self.$assocs[self.$keys[i].$hash()];
        __block__(__block__.$self, val);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "empty?", function(self) {
return self.$keys.length == 0 ? Qtrue : Qfalse;}, 0), $def(self, "fetch", function(self, key, defaults) {
if (defaults === undefined) defaults = undefined;
var value = self.$assocs[key.$hash()];

    if (value != undefined)
      return value;
    else if (defaults == undefined)
      rb_raise('KeyError: key not found');
    else
      return defaults;}, 0), $def(self, "flatten", function(self, level) {
var __a;
if (level === undefined) level = 1;
var result = [], key, value;
    
    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      result.push(key);

      if (value instanceof Array) {
        if (level == 1) {
          result.push(value);
        } else {
          var tmp = (__a = value).$m.flatten(__a, level - 1);
          result = result.concat(tmp);
        }
      } else {
        result.push(value);
      }
    }

    return result;}, 0), $def(self, "has_key?", function(self, key) {
if (self.$assocs.hasOwnProperty(key.$hash()))
      return Qtrue;

    return Qfalse;}, 0), $def(self, "has_value?", function(self, value) {
var __a;
var key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      val = self.$assocs[key.$hash()];

      if ((__a = value).$m["=="](__a, val).$r)
        return Qtrue;
    }

    return Qfalse;}, 0), $def(self, "replace", function(self, other) {
self.$keys = []; self.$assocs = {};

    for (var i = 0; i < other.$keys.length; i++) {
      var key = other.$keys[i];
      var val = other.$assocs[key.$hash()];
      self.$keys.push(key);
      self.$assocs[key.$hash()] = val;
    }

    return self;}, 0), $def(self, "invert", function(self) {
return (nil);}, 0), $def(self, "key", function(self, value) {
var __a;
var key, val;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      val = self.$assocs[key.$hash()];

      if ((__a = value).$m["=="](__a, val).$r) {
        return key;
      }
    }

    return nil;}, 0), $def(self, "keys", function(self) {
return self.$keys.slice(0);}, 0), $def(self, "length", function(self) {
return self.$keys.length;}, 0), $def(self, "merge", function(self, other) {
var result = $opal.H() , key, val;
    
    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i], val = self.$assocs[key.$hash()];

      result.$keys.push(key);
      result.$assocs[key.$hash()] = val;
    }
  
    for (var i = 0; i < other.$keys.length; i++) {
      key = other.$keys[i], val = other.$assocs[key.$hash()];

      if (!result.$assocs.hasOwnProperty(key.$hash())) {
        result.$keys.push(key);
      }

      result.$assocs[key.$hash()] = val;
    }

    return result;}, 0), $def(self, "merge!", function(self, other) {
var key, val;

    for (var i = 0; i < other.$keys.length; i++) {
      key = other.$keys[i];
      val = other.$assocs[key.$hash()];

      if (!self.$assocs.hasOwnProperty(key.$hash())) {
        self.$keys.push(key);
      }

      self.$assocs[key.$hash()] = val;
    }

    return self;}, 0), $def(self, "rassoc", function(self, obj) {
var __a;
var key, val;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      val = self.$assocs[key.$hash()];

      if ((__a = val).$m["=="](__a, obj).$r)
        return [key, val];
    }

    return nil;}, 0), $def(self, "shift", function(self) {
var key, val;

    if (self.$keys.length > 0) {
      key = self.$keys[0];
      val = self.$assocs[key.$hash()];

      self.$keys.shift();
      delete self.$assocs[key.$hash()];
      return [key, val];
    }

    return self.$default;}, 0), $def(self, "to_a", function(self) {
var result = [], key, value;

    for (var i = 0; i < self.$keys.length; i++) {
      key = self.$keys[i];
      value = self.$assocs[key.$hash()];
      result.push([key, value]);
    }

    return result;}, 0), $def(self, "to_hash", function(self) {
return (self);}, 0));}, 0));})();
};
modules["./top_self"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm(['include']);
return ($def(self, "to_s", function(self) {
return ("main");}, 1), $def(self, "include", function(self, mod) {
var __a;
return ((__a = rb_vm_cg(self, "Object")).$m.include(__a, mod));}, 1));})();
};
modules["./nil_class"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm([]);
return ($class(self, nil, "NilClass", function(self) {
return ($def(self, "to_i", function(self) {
return (0);}, 0), $def(self, "to_f", function(self) {
return (0.0);}, 0), $def(self, "to_s", function(self) {
return ("");}, 0), $def(self, "to_a", function(self) {
return ([]);}, 0), $def(self, "inspect", function(self) {
return ("nil");}, 0), $def(self, "nil?", function(self) {
return (Qtrue);}, 0), $def(self, "&", function(self, other) {
return (Qfalse);}, 0), $def(self, "|", function(self, other) {
return other.$r ? Qtrue : Qfalse;}, 0), $def(self, "^", function(self, other) {
return other.$r ? Qtrue : Qfalse;}, 0));}, 0), rb_vm_cs(self, "NIL", nil));})();
};
modules["./true_class"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm([]);
return ($class(self, nil, "TrueClass", function(self) {
return ($def(self, "to_s", function(self) {
return ("true");}, 0), $def(self, "&", function(self, other) {
return other.$r ? Qtrue : Qfalse;}, 0), $def(self, "|", function(self, other) {
return (Qtrue);}, 0), $def(self, "^", function(self, other) {
return other.$r ? Qfalse : Qtrue;}, 0));}, 0), rb_vm_cs(self, "TRUE", Qtrue));})();
};
modules["./false_class"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm([]);
return ($class(self, nil, "FalseClass", function(self) {
return ($def(self, "to_s", function(self) {
return ("false");}, 0), $def(self, "&", function(self, other) {
return (Qfalse);}, 0), $def(self, "|", function(self, other) {
return other.$r ? Qtrue : Qfalse;}, 0), $def(self, "^", function(self, other) {
return other.$r ? Qtrue : Qfalse;}, 0));}, 0), rb_vm_cs(self, "FALSE", Qfalse));})();
};
modules["./kernel"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm(['raise', 'new', 'kind_of?', 'to_s', 'inspect', '==', '__send__']);
return ($class(self, nil, "Kernel", function(self) {
return ($def(self, "require", function(self, path) {
return $opal.require(path);}, 0), $def(self, "loop", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;while (true) {
      try {
        __block__(__block__.$self);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), $def(self, "proc", function(self) {
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((!((block !== nil ? Qtrue : Qfalse).$r) ? self.$m.raise(self, rb_vm_cg(self, "ArgumentError"), "block required"):nil), block);}, 0), $def(self, "lambda", function(self) {
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((!((block !== nil ? Qtrue : Qfalse).$r) ? self.$m.raise(self, rb_vm_cg(self, "ArgumentError"), "block required"):nil), block);}, 0), $def(self, "raise", function(self, exception, string) {
var __a;
if (string === undefined) string = nil;
var msg = nil, exc;

    if (typeof exception == 'string') {
      msg = exception;
      exc = (__a = rb_vm_cg(self, "RuntimeError")).$m.new(__a, msg);
    } else if ((__a = exception).$m["kind_of?"](__a, rb_vm_cg(self, "Exception")).$r) {
      exc = exception;
    } else {
      if (string != nil) msg = string;

      exc = (__a = exception).$m.new(__a, msg);
    }

    rb_vm_raise(exc);}, 0), $def(self, "fail", function(self, exception, string) {
if (string === undefined) string = nil;
return (self.$m.raise(self, exception, string));}, 0), $def(self, "instance_variable_defined?", function(self, name) {
var __a;
name = (__a = name).$m.to_s(__a);
    return self[name] == undefined ? Qfalse : Qtrue;}, 0), $def(self, "instance_variable_get", function(self, name) {
var __a;
name = (__a = name).$m.to_s(__a);
    return self[name] == undefined ? nil : self[name];}, 0), $def(self, "instance_variable_set", function(self, name, value) {
var __a;
name = (__a = name).$m.to_s(__a);
    return self[name] = value;}, 0), $def(self, "block_given?", function(self) {
return (Qfalse);}, 0), $def(self, "method_missing", function(self, sym, args) {
var __a, __b;
args = Array.prototype.slice.call(arguments, 2);
return (self.$m.raise(self, rb_vm_cg(self, "NoMethodError"), ("undefined method `" + (__a = sym, __a.$m.to_s(__a)) + "` for " + (__a = (__b = self).$m.inspect(__b), __a.$m.to_s(__a)))));}, 0), $def(self, "to_a", function(self) {
return ([self]);}, 0), $def(self, "tap", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((!((__block__ !== nil ? Qtrue : Qfalse).$r) ? self.$m.raise(self, rb_vm_cg(self, "LocalJumpError"), "no block given"):nil), __block__(__block__.$self, self), self);}, 0), $def(self, "kind_of?", function(self, klass) {
var search = self.$klass;

    while (search) {
      if (search == klass) {
        return Qtrue;
      }

      search = search.$super;
    }

    return Qfalse;}, 0), $def(self, "is_a?", function(self, klass) {
return (self.$m["kind_of?"](self, klass));}, 0), $def(self, "nil?", function(self) {
return (Qfalse);}, 0), $def(self, "respond_to?", function(self, method_id) {
var __a;
if (self.$m[(__a = method_id).$m.to_s(__a)]) {
      return Qtrue;
    }

    return Qfalse;}, 0), $def(self, "===", function(self, other) {
var __a;
return ((__a = self).$m["=="](__a, other));}, 0), $def(self, "__send__", function(self, method_id, args) {
var __a;
args = Array.prototype.slice.call(arguments, 2);
args.unshift(self);
    return self.$m[(__a = method_id).$m.to_s(__a)].apply(null, args);}, 0), $def(self, "send", function(self, method_id, args) {
args = Array.prototype.slice.call(arguments, 2);
return (self.$m.__send__.apply(nil, [selfmethod_id].concat(args)));}, 0), $def(self, "class", function(self) {
return rb_class_real(self.$klass);}, 0), $def(self, "rand", function(self, max) {
if (max === undefined) max = undefined;
if (max != undefined) 
        return Math.floor(Math.random() * max);
    else
      return Math.random();}, 0), $def(self, "__id__", function(self) {
return self.$hash();}, 0), $def(self, "object_id", function(self) {
return self.$hash();}, 0), $def(self, "to_s", function(self) {
var __a, __b;
return (("#" + "<" + (__a = (__b = rb_class_real(self.$klass)).$m.to_s(__b), __a.$m.to_s(__a)) + ":0x" + (__a = (self.$hash() * 4000487).toString(16), __a.$m.to_s(__a)) + ">"));}, 0), $def(self, "inspect", function(self) {
return (self.$m.to_s(self));}, 0), $def(self, "instance_eval", function(self) {
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((((block !== nil ? Qtrue : Qfalse).$r) ? block(self):nil), self);}, 0), $def(self, "const_set", function(self, name, value) {
return rb_const_set(rb_class_real(self.$klass), name, value);}, 0), $def(self, "const_defined?", function(self, name) {
return (Qfalse);}, 0));}, 2));})();
};
modules["./module"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm(['kind_of?', 'raise', 'to_s', 'attr_reader', 'attr_writer', 'class_eval']);
return ($class(self, nil, "Module", function(self) {
return ($def(self, "name", function(self) {
return self['__classid__'];}, 0), $def(self, "===", function(self, obj) {
var __a;
return ((__a = obj).$m["kind_of?"](__a, self));}, 0), $def(self, "define_method", function(self, method_id) {
var __a;
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((!((block !== nil ? Qtrue : Qfalse).$r) ? self.$m.raise(self, rb_vm_cg(self, "LocalJumpError"), "no block given"):nil), rb_define_method(self, (__a = method_id).$m.to_s(__a), block), nil);}, 0), $def(self, "attr_accessor", function(self, attrs) {
attrs = Array.prototype.slice.call(arguments, 1);
return (self.$m.attr_reader.apply(nil, [self].concat(attrs)), self.$m.attr_writer.apply(nil, [self].concat(attrs)));}, 0), $def(self, "attr_reader", function(self, attrs) {
var __a;
attrs = Array.prototype.slice.call(arguments, 1);
for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var method_id = (__a = attr).$m.to_s(__a);

      rb_define_method(self, method_id, 
            new Function('self', 'return rb_ivar_get(self, "@' + method_id + '");'));

    }

    return nil;}, 0), $def(self, "attr_writer", function(self, attrs) {
var __a;
attrs = Array.prototype.slice.call(arguments, 1);
for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var method_id = (__a = attr).$m.to_s(__a);

      rb_define_method(self, method_id + '=', 
        new Function('self', 'val', 'return rb_ivar_set(self, "@' + method_id + '", val);'));

    }

    return nil;}, 0), $def(self, "alias_method", function(self, new_name, old_name) {
var __a;
return (new_name = (__a = new_name).$m.to_s(__a), old_name = (__a = old_name).$m.to_s(__a), rb_define_method_raw(self, new_name, self.$m_tbl[old_name]), self);}, 0), $def(self, "to_s", function(self) {
return self['__classid__'];}, 0), $def(self, "const_set", function(self, id, value) {
var __a;
return rb_vm_cs(self, (__a = id).$m.to_s(__a), value);}, 0), $def(self, "class_eval", function(self, str) {
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return (((block !== nil ? Qtrue : Qfalse).$r ? (block(self)) : (self.$m.raise(self, "need to compile str"))));}, 0), $def(self, "module_eval", function(self, str) {
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return (($block.p = block, $block.f = self.$m.class_eval)(self, str));}, 0), $def(self, "private", function(self) {
return (self);}, 0), $def(self, "public", function(self) {
return (self);}, 0), $def(self, "protected", function(self) {
return (self);}, 0), $def(self, "include", function(self, mod) {
return (rb_include_module(self, mod), nil);}, 0), $def(self, "extend", function(self, mod) {
return (rb_extend_module(self, mod), nil);}, 0));}, 0));})();
};
modules["./proc"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm([]);
return ($class(self, nil, "Proc", function(self) {
return ($def(self, "to_proc", function(self) {
return (self);}, 0), $def(self, "call", function(self, args) {
args = Array.prototype.slice.call(arguments, 1);
args.unshift(self.$self);
    return self.apply(null, args);}, 0));}, 0));})();
};
modules["./runtime"] = function(exports) {
// our global $opal object that is also exported.
$opal = {};

// Core runtime classes and objects
var rb_cBasicObject,
    rb_cObject,
    rb_cModule,
    rb_cClass,
    rb_mKernel,
    rb_cNilClass,
    rb_cTrueClass,
    rb_cFalseClass,
    rb_cFile,
    rb_cProc,
    rb_cNumeric,
    rb_cArray,
    rb_cHash,
    rb_cString,
    rb_cSymbol,
    rb_top_self,
    Qnil,
    Qfalse,
    Qtrue;

// Core object types flags
var T_CLASS       = $opal.T_CLASS       = 1,
    T_MODULE      = $opal.T_MODULE      = 2,
    T_OBJECT      = $opal.T_OBJECT      = 4,
    T_BOOLEAN     = $opal.T_BOOLEAN     = 8,
    T_STRING      = $opal.T_STRING      = 16,
    T_ARRAY       = $opal.T_ARRAY       = 32,
    T_NUMBER      = $opal.T_NUMBER      = 64,
    T_PROC        = $opal.T_PROC        = 128,
    T_SYMBOL      = $opal.T_SYMBOL      = 256,
    T_HASH        = $opal.T_HASH        = 512,
    T_RANGE       = $opal.T_RANGE       = 1024,
    T_ICLASS      = $opal.T_ICLASS      = 2056,
    FL_SINGLETON  = $opal.FL_SINGLETON  = 4112;

// load paths - these will be reset in init(). If not set, then just use default.
// In node we set these to require.paths, and in the browser we use a temporary
// fake namespace.
//
// FIXME: node v.0.4 introduces the idea that require.paths will be depreceated.
// Should we start to look at an alternative solution?
var load_paths = [];

// setting mm methods
$opal.mm = function(method_ids) {
  var prototype = rb_cBasicObject.$m_prototype_tbl;
  for (var i = 0; i < method_ids.length; i++) {
    var method_id = method_ids[i];
    // only add if there isnt already a method there
    if (!prototype.hasOwnProperty(method_id)) {

        var func = (function(method_id) {
          return function(self) {
            //throw new Error("method_missing for: " + method_id);
            var args = [].slice.call(arguments, 1);
            args.unshift(method_id);
            args.unshift(self);
        //    console.log(self.$m.method_missing);
            return self.$m.method_missing.apply(null, args);
          };
        })(method_id);
      // mark as a method missing, to help repond_to? and send etc.
      func.$rbMM = true;
      prototype[method_id] = func;

    } else {
    }
  }
};

// defining methods
$opal.dm = function(base, method_id, body, singleton) {
  if (singleton) {
    rb_define_singleton_method(base, method_id, body);
  } else {
    // should this instead do a rb_singleton_method?? probably..
    if (base.$flags & T_OBJECT) {
      base = base.$klass;
    }

    rb_define_method(base, method_id, body);
  }

  return Qnil;
};

// defining classes and modules
$opal.dc = function(base, super_class, id, body, flag) {
  var klass;
  
  switch (flag) {
    // normal class
    case 0:
      // if we are dealing with an object, lets use its class instead.
      if (base.$flags & T_OBJECT) {
        base = rb_class_real(base.$klass);
      }
      // If no superclass specified, use Object.
      if (super_class == Qnil) {
        super_class = rb_cObject;
      }
      
      klass = rb_define_class_under(base, id, super_class);
      break;
    // class shift (<<)
    case 1:
      console.log("need to get singleton class");
      klass = rb_singleton_class(base);
      break;
    // module
    case 2:
      // if we are dealing with an object, lets use its class instead.
      if (base.$flags & T_OBJECT) {
        base = rb_class_real(base.$klass);
      } 
      klass = rb_define_module_under(base, id);
      break;
    // If default, something has gone wrong (in compiler).
    default:
      rb_raise(rb_eException, "define_class got a unknown flag " + flag);    
  }
  
  // evaluate and return class body using class as the self
  return body(klass);
};

// Return a new hash with given keys and values
$opal.H = function() {
  return new RHash(Array.prototype.slice.call(arguments));
};

// Returns a new symbol with the given ptr
//
// FIXME: make new symbols just javascript strings. If we use new String('sym name'),
// we can reset the .$m and $.isa and $.klass on the string directly. It makes a lot
// of the core library more efficient to save having to call obj.to_s constantly as
// we are unsure whether the receiver is a string or symbol, we can just use its
// literal value directly.
$opal.Y = function(str) {
  if (symbol_table.hasOwnProperty(str)) {
    return symbol_table[str];
  }

  var res = new String(str);

  res.$klass = rb_cSymbol;
  res.$m = rb_cSymbol.$m_tbl;
  symbol_table[str] = res;
  return res;
};

// Returns a new range
// G for ranGe ... yeah.
$opal.G = function(beg, end, exclude_end) {
  return new RRange(beg, end, exclude_end);
};

// break with the given value
$opal.B = function(value) {
  rb_vm_break_instance.$value = value;
  throw rb_vm_break_instance;
};

// return with given value
$opal.R = function(value, func) {
  rb_vm_return_instance.$value = value;
  rb_vm_return_instance.$func = func;
  throw rb_vm_return_instance;
};

// Block passing - by default we keep both values set to null/nil
$opal.P = {
  // function
  f: null,
  // block
  p: null,
  // yield error
  y: function() {
    throw new Error('LocalJumpError - $opal.P.y - no block given');
  }
};

// default loader - just use commonjs. browser overrides this
$opal.require = function(path) {
  require(path);
  return Qtrue;
};

// define a toll free bridged class
$opal.bridged_class = function(prototype, flags, id, super_klass) {
  return rb_define_toll_free_class(prototype, flags || T_OBJECT, id, super_klass);
};

// Set a constant `val` on the given `klass`.
var rb_const_set = function(klass, id, val) {
  klass.$c_prototype[id] = val;
  return val;
};

// Look for the given constant on the given klass.
var rb_const_get = function(klass, id) {

  if (klass.$c[id]) {
    return (klass.$c[id]);
  }

  var parent = klass.$parent;

  while (parent && parent != rb_cObject) {

    if (parent.$c[id]) {
      return parent.$c[id];
    }

    parent = parent.$parent;
  }

  rb_raise(rb_eNameError, 'uninitialized constant ' + id);
};

// is const defined
var rb_const_defined = function(klass, id) {
  if (klass.$c[id]) {
    return true;
  }
  
  return false;
};

// set ivar
// @global
rb_ivar_set = function(obj, id, val) {
  obj[id] = val;
  return val;
};

// @global
rb_ivar_get = function(obj, id) {
  return obj.hasOwnProperty(id) ? obj[id] : Qnil;
};

// @global
rb_ivar_defined = function(obj, id) {
  return obj.hasOwnProperty(id) ? true : false;
};

// global id table
// @local
// 
// @entries are mapped globalid => Object. Object contains the keys:
//  - name, value, getter, setter.
var rb_global_tbl = {};

// defined a hooked (global) variable
// 
// @local
// 
// @param [String] name the name of the global (e.g. '$:')
// @param [Function] getter the getter function to use for the variable
// @param [Function] setter the setter function to use for setting variable
// @returns null
// 
var rb_define_hooked_variable = function(name, getter, setter) {
  var entry = {
    "name": name,
    "value": Qnil,
    "getter": getter,
    "setter": setter
  };
  
  rb_global_tbl[name] = entry;
};

// A default read only getter for a global variable. This will simply throw a
// name error with the given id. This can be used for variables that should not
// be altered.
var rb_gvar_readonly_setter = function(id, value) {
  rb_raise(rb_eNameError, id + " is a read-only variable");
};

// Retrieve a global variable. This will use the assigned getter.
// 
// @local
var rb_gvar_get = function(id) {
  var entry = rb_global_tbl[id];
  if (!entry) { return Qnil; }
  return entry.getter(id);
};

// Set a global. If not already set, then we assign basic getters and setters
// 
// @local
var rb_gvar_set = function(id, value) {
  var entry = rb_global_tbl[id];
  if (entry)  { return entry.setter(id, value); }
  
  // make a new default..
  rb_define_hooked_variable(id, 
    // getter
    function(id) {
      return rb_global_tbl[id].value;
    },
    // setter
    function(id, value) {
      return (rb_global_tbl[id].value = value);
    }
  );
  
  return rb_gvar_set(id, value);
};



// Every object has a unique id. This count is used as the next id for the next
// created object. Therefore, first ruby object has id 0, next has 1 etc.
var opal_hash_yield = 0;

// Yield the next object id, updating the count, and returning it.
var opal_yield_hash = function() {
  return opal_hash_yield++;
};

// The root class. Every class in opal is an instance of RClass.
var RClass = $opal.RClass = function(klass, super_klass) {
  // Hash. immediately give the class a hash/object_id
  this.$id = opal_yield_hash();
  // SuperClass.
  this.$super = super_klass;
  // Method_table - all methods are stored here. This is prototype based so that
  // methods are inherited between subclasses etc.
  // 
  // m_tbl is the actual instance
  // m_prototype_tbl is the prototype, so add methods to that so that they get 
  // inherited
  if (super_klass) {
    // console.log("inheriting");
    var ctor = function() {};
    ctor.prototype = super_klass.$m_prototype_tbl;
    var m_ctor = function() {};
    m_ctor.prototype = new ctor();
    this.$m_tbl = new m_ctor();
    this.$m_prototype_tbl = m_ctor.prototype;
    
    // constants..
    var cctor = function() {};
    cctor.prototype = super_klass.$c_prototype;
    var c_ctor = function() {};
    c_ctor.prototype = new cctor();
    this.$c = new c_ctor();
    this.$c_prototype = c_ctor.prototype;
  }
  else {
    // console.log("making fresh");
    // root object behaviour..
    var m_ctor = function() {};
    this.$m_tbl = new m_ctor();
    this.$m_prototype_tbl = m_ctor.prototype;
    // constants..
    var c_ctor = function() {};
    this.$c = new c_ctor();
    this.$c_prototype = c_ctor.prototype;
  }
  // methods added to this actual class instance
  this.$method_table = {};
  return this;
};

// Flags. Every RClass instance is simply a T_CLASS, so mark as so.
RClass.prototype.$flags = T_CLASS;
// RTest/truthiness - every RClass instance is true.
RClass.prototype.$r = true;

// The root object. Every object in opal (apart from toll free bridged classes 
// like array, string etc) are an instance of RObject.
var RObject = $opal.RObject = function(klass) {
  // Hash. get out object_id
  this.$id = opal_yield_hash();
  // Ivars. no longer?
  // this.$i = {};
  // klass of the object becomes klass
  this.$klass = klass;
  // from the class, we set our local methods property (in sync with our class)
  this.$m = klass.$m_tbl;
  // return object.
  return this;
};

// Flags - every RObject instance is simply a T_OBJECT
RObject.prototype.$flags = T_OBJECT;
// RTest - every RObject instance is true.
RObject.prototype.$r = true;

RObject.prototype.$hash = RClass.prototype.$hash = function() {
  return this.$id;
};

// define method
rb_define_method = function(klass, name, body, file_name, line_number) {
  
  rb_define_method_raw(klass, name, body);

  if (!body.$rbName) {
    body.$rbName = name;
  }
  
  return Qnil;
};

// This can be removed, and functionality moved back to rb_define_method
//
// @TODO merge back into rb_define_method
rb_define_method_raw = function(klass, name, body) {
  // insert raw method into prototype chain
  klass.$m_prototype_tbl[name] = body;
  // insert method into singular method table (methods defined ON this class)
  klass.$method_table[name] = body;
  // if in module, apply method to all classes we are included in
  if (klass.$included_in) {
    for (var i = 0; i < klass.$included_in.length; i++) {
      // insert method into both prototype and singular chain.
      klass.$included_in[i].$m_prototype_tbl[name] = body;
			klass.$included_in[i].$method_table[name] = body;
    }
  }
};

rb_define_global_function = function(name, body) {
	rb_define_method(rb_mKernel, name, body);
	rb_define_singleton_method(rb_mKernel, name, body);
};

// singleton method
rb_define_singleton_method = function(klass, name, body) {
  rb_define_method(rb_singleton_class(klass), name, body);
};

var rb_define_alias = function(base, new_name, old_name) {
  rb_define_method(base, new_name, base.$m_tbl[old_name]);
  return Qnil;
};

// Class#new
var rb_class_new_instance = function(klass) {
  var result = rb_obj_alloc(klass);
  // call initialize
  return result;
};

// Class#allocate
// @global
rb_obj_alloc = function(klass) {
  var result = new RObject(klass, T_OBJECT);
  return result;
};

// raise exception class with our given string
// @global
rb_raise = function(exc, str) {
  if (str === undefined) {
    str = exc;
    exc = rb_eException;
  }
  //var exception = new RObject(exc, T_OBJECT);
  var exception = exc.$m.allocate(exc);
	// var exception = exc_new_instance(exc);
  rb_ivar_set(exception, '@message', str);
  rb_vm_raise(exception);
};

// raise an exception instance (DO NOT pass strings to this)
rb_vm_raise = function(exc) {
  // backtrace
  //rb_ivar_set(exc, '@backtrace', debug_stack.slice(0, debug_stack.length));
  throw exc;
};

/**
 * Throw an argument error when the wrong number of arguments were given to a 
 * method
 * 
 * @param [Number] given the number of arguments actually given
 * @param [Number] expected the number of arguments we expected to have
*/
function rb_arg_error(given, expected) {
  rb_raise(rb_eArgError,
    "wrong number of arguments(" + given + " for " + expected + ")");
}

// Run a function - this should be used as an entry point for anything that 
// calls ruby code or may throw an error.
// 
// This is only an entry point, so system events, ruby_init() etc should use
// this. Browser wraps every DOM event in this, for instance.
// 
// @global
$opal.rb_run = rb_run = function(func) {
  // always clear backtrace
  //debug_stack.length = 0;
  try {
    //debug_stack_push([rb_run], [rb_top_self]);
    return func();
  }
  catch(err) {
    if (err['@message']) {
      err.message = err['@message'];
    }

    // FIXME: this should uses prepareStackTrace only when needed. An
    // external library may also modify that function, so seeing as we know
    // when we are going to log the stack, we can just temporarily replace
    // that function with our own, then set it back to the original.
    //console.log('about to throw');
    //throw err;

    if (err.stack) {
      console.log(err.stack);
    } else {
      console.log(err);
    }
  }
};

// Stack trace support
rb_run.$rbName = "<main>";

exports.rb_run = rb_run;

/**
  Call a super method.
  
  callee is the function that actually called super(). We use this to find the
  right place in the tree to find the method that actually called super. This is
  actually done in rb_super_find, 
*/
$opal.S = function(callee, self, args) {
  var mid = callee.$rbName;
  // print("looking for super " + callee);
  var func = rb_super_find(self.$klass, callee, callee.$rbName);
  
  if (!func) {
    rb_raise(rb_eNoMethodError, "super: no superclass method for " + mid);
    rb_raise(rb_eNoMethodError, "super: no super class method `" + mid + "`" +
      " for " + self.$m.inspect(self));
  }
  // print("found the super!" + func);
  var args_to_send = [self, mid].concat(args);
  return func.apply(null, args_to_send);
};

/**
  Actually find super impl to call.  Returns null if cannot find it.
  This is the debug version!!!!!!!!!!!!!!!!!!!!. also need non debug version
*/
rb_super_find = function(klass, callee, mid) {
  var cur_method;
  // find current method
  while (klass) {
    if (klass.$method_table[mid]) {
      if (klass.$method_table[mid] == callee) {
        // cur_method = klass.$method_table[mid];
        break;
      }
    }
    klass = klass.$super;
  }
  
  if (!klass) { return null; }
  
  // find super() from klass up
  klass = klass.$super;
  
  while (klass) {
    if (klass.$method_table[mid]) {
      return klass.$method_table[mid];
    }
    
    klass = klass.$super;
  }
  
  return null;
};

// Get constant from base
// @global
rb_vm_cg = function(base, id) {
  if (base.$flags & T_OBJECT) {
    base = rb_class_real(base.$klass);
  }
  return rb_const_get(base, id);
};

// Set constant in base
// @global
rb_vm_cs = function(base, id, val) {
  if (base.$flags & T_OBJECT) {
    base = rb_class_real(base.$klass);
  }
  return rb_const_set(base, id, val);
};

// get global by id
// @global
rb_vm_gg = function(id) {
  return rb_gvar_get(id);
};

// set global by id
// @global
rb_vm_gs = function(id, value) {
  return rb_gvar_set(id, value);
};


// gets the load path
// @local
var load_path_getter = function(id) {
  return load_paths;
};

// gets laoded features
var loaded_feature_getter = function(id) {
  return loaded_features;
};

// make sure init/main are only called once.
var rb_opal_done_init = false;

// where we can save our global argv once calculated
var init_argv = [];

$opal.init = function(options) {
  if (rb_opal_done_init) { return; }
  rb_opal_done_init = true;

  if (!options) { options = {}; }

  var metaclass;

  $opal.BasicObject = rb_cBasicObject = boot_defrootclass('BasicObject');
  $opal.Object = rb_cObject = boot_defclass('Object', rb_cBasicObject);
  $opal.Module = rb_cModule = boot_defclass('Module', rb_cObject);
  $opal.Class = rb_cClass = boot_defclass('Class', rb_cModule);

  rb_const_set(rb_cObject, 'BasicObject', rb_cBasicObject);

  metaclass = rb_make_metaclass(rb_cBasicObject, rb_cClass);
  metaclass = rb_make_metaclass(rb_cObject, metaclass);
  metaclass = rb_make_metaclass(rb_cModule, metaclass);
  metaclass = rb_make_metaclass(rb_cClass, metaclass);

  boot_defmetametaclass(rb_cModule, metaclass);
  boot_defmetametaclass(rb_cObject, metaclass);
  boot_defmetametaclass(rb_cBasicObject, metaclass);

	rb_define_method(rb_cBasicObject, "!", obj_not);
	rb_define_method(rb_cBasicObject, "!=", obj_not_equal);

	rb_mKernel = rb_define_module('Kernel');

	rb_include_module(rb_cObject, rb_mKernel);

	rb_define_method(rb_cClass, "allocate", rb_obj_alloc);
	rb_define_method(rb_cClass, "new", class_new_instance);
	rb_define_method(rb_cClass, "initialize", class_initialize);
	rb_define_singleton_method(rb_cClass, "new", class_s_new);
	
  // good idea to keep puts here.. we probably need it nice and early.
	rb_define_method(rb_mKernel, "puts", obj_puts);

  // Top self
	global.rb_top_self = rb_top_self = rb_obj_alloc(rb_cObject);
  $opal.top = rb_top_self;

	// @class NilClass
	rb_cNilClass = rb_define_class('NilClass', rb_cObject);
	global.Qnil = $opal.Qnil = Qnil = rb_obj_alloc(rb_cNilClass);
	Qnil.$r = false;
	
	// @class TrueClass
	rb_cTrueClass = rb_define_class('TrueClass', rb_cObject);
	global.Qtrue = Qtrue = rb_obj_alloc(rb_cTrueClass);
	
	// @class FalseClass
	rb_cFalseClass = rb_define_class('FalseClass', rb_cObject);
	global.Qfalse = Qfalse = rb_obj_alloc(rb_cFalseClass);
	Qfalse.$r = false;

  require('./basic_object');
  require('./module');
  require('./class');
  require('./kernel');
  require('./top_self');
  require('./nil_class');
  require('./true_class');
  require('./false_class');

  // @class Array
  rb_cArray = rb_define_toll_free_class(Array.prototype,
      T_OBJECT | T_ARRAY, 'Array', rb_cObject);

  Array.prototype.$hash = function() {
    return (this.$id || (this.$id = opal_yield_hash()));
  };

  require('./array');

  // @class Numeric
  
  rb_cNumeric = rb_define_toll_free_class(Number.prototype,
      T_OBJECT | T_NUMBER, 'Numeric', rb_cObject);

  require('./numeric');

  // @class Hash

  rb_cHash = rb_define_toll_free_class(RHash.prototype,
      T_OBJECT | T_HASH, 'Hash', rb_cObject);

  RHash.prototype.$hash = function() {
    return (this.$id || (this.$id = opal_yield_hash()));
  };

  rb_define_singleton_method(rb_cHash, '[]', hash_s_create);
  
  require('./hash');

  // @class Regexp  
  
  rb_cRegexp = rb_define_toll_free_class(RegExp.prototype, T_OBJECT,
      'Regexp', rb_cObject);
  
  rb_define_method(rb_cRegexp, "inspect", reg_inspect);
  rb_define_method(rb_cRegexp, "==", reg_equal);
  rb_define_method(rb_cRegexp, "eql?", reg_equal);
  rb_define_method(rb_cRegexp, "match", reg_match);

  rb_cMatch = rb_define_class("MatchData", rb_cObject);
  rb_define_method(rb_cMatch, "to_a", match_to_a);
  rb_define_method(rb_cMatch, "inspect", match_inspect);
  rb_define_method(rb_cMatch, "aref", match_aref);

  // load
  
  if (options.load_paths) { load_paths = options.load_paths; }

  //load_paths.unshift(exports.opal_lib_path);
  rb_define_hooked_variable('$:', load_path_getter, rb_gvar_readonly_setter);
  rb_define_hooked_variable('$LOAD_PATH', load_path_getter, rb_gvar_readonly_setter);

  // @class Exception
  rb_eException = rb_define_toll_free_class(Error.prototype, T_OBJECT, 'Exception', rb_cObject);

  rb_eStandardError = rb_define_class("StandardError", rb_eException);
  rb_eRuntimeError = rb_define_class("RuntimeError", rb_eException);
  rb_eLocalJumpError = rb_define_class("LocalJumpError", rb_eStandardError);
  rb_eTypeError = rb_define_class("TypeError", rb_eStandardError);
  rb_eNameError = rb_define_class("NameError", rb_eStandardError);
  rb_eNoMethodError = rb_define_class('NoMethodError', rb_eNameError);
  rb_eArgError = rb_define_class('ArgumentError', rb_eStandardError);
  rb_eScriptError = rb_define_class('ScriptError', rb_eException);
  rb_eLoadError = rb_define_class('LoadError', rb_eScriptError);

  rb_eIndexError = rb_define_class("IndexError", rb_eStandardError);
  rb_eKeyError = rb_define_class("KeyError", rb_eIndexError);
  rb_eRangeError = rb_define_class("RangeError", rb_eStandardError);

  require('./error');

  // jump error literals. We keep a singular instance to avoid recreating each
  // error every time (expensive). 
  rb_vm_break_instance = new Error('unexpected break');
  rb_vm_break_instance.$klass = rb_eLocalJumpError;  
  rb_vm_break_instance.$keyword = 2;

  rb_vm_return_instance = new Error('unexpected return');
  rb_vm_return_instance.$klass = rb_eLocalJumpError;
  rb_vm_return_instance.$keyword = 1;

  rb_vm_next_instance = new Error('unexpected next');
  rb_vm_next_instance.$klass = rb_eLocalJumpError;
  rb_vm_next_instance.$keyword = 3;

  // @class String
  rb_cString = rb_define_toll_free_class(String.prototype,
      T_OBJECT | T_STRING, 'String', rb_cObject);

  require('./string');

  // @class Symbol
  rb_cSymbol = rb_define_class('Symbol', rb_cObject);
  require('./symbol');

  // @class Proc

  rb_cProc = rb_define_toll_free_class(Function.prototype,
      T_OBJECT | T_PROC, 'Proc', rb_cObject);

  Function.prototype.$hash = function() {
    return (this.$id || (this.$id = opal_yield_hash()));
  };

  require('./proc');

  // @class Range
  rb_cRange = rb_define_toll_free_class(RRange.prototype, T_OBJECT | T_RANGE,
      'Range', rb_cObject);

  RRange.prototype.$hash = function() {
    return (this.$id || (this.$id = opal_yield_hash()));
  };

  require('./range');

  rb_const_set(rb_cObject, 'RUBY_PLATFORM', 'opal');
};

// define a top level module with the given id
rb_define_module = function(id) {
  return rb_define_module_under(rb_cObject, id);
};

var rb_define_module_under = function(base, id) {
  var module;
  // if module already exists..
  if (rb_const_defined(base, id)) {
    // print("already defined");
    // make sure it is a module, otherwise error (trying to change class)
    module = rb_const_get(base, id);
    if (module.$flags & T_MODULE) {
      return module;
    }

    throw id + " is not a module.";
  }
  
  module = rb_define_module_id(id);
  rb_const_set(base, id, module);
  module.$parent = base;
  return module;
};

var rb_define_module_id = function(id) {
  var module = rb_define_class_id(id, rb_cModule);
  module.$flags = T_MODULE;
  rb_name_class(module, id);
  return module;
};

var rb_mod_create = function() {
  // return // rb_define_class_id()
  return rb_class_boot(rb_cModule);
};

rb_include_module = function(klass, module) {

  if (!klass.$included_modules) {
    klass.$included_modules = [];
  }

  if (klass.$included_modules.indexOf(module) != -1) {
    return;
  }
  klass.$included_modules.push(module);
  
  if (!module.$included_in) {
    module.$included_in = [];
  }
  
  module.$included_in.push(klass);

  for (var method in module.$method_table) {
    rb_define_method_raw(klass, method, module.$method_table[method]);
  }
};

rb_extend_module = function(klass, module) {
  if (!klass.$extended_modules) {
    klass.$extended_modules = [];
  }

  if (klass.$extended_modules.indexOf(module) != -1) {
    return;
  }
  klass.$extended_modules.push(module);
  
  if (!module.$extended_in) {
    module.$extended_in = [];
  }

  module.$extended_in.push(klass);
  
  for (var method in module.$method_table) {
    rb_define_method_raw(klass.$klass, method, module.$method_table[method]);
  }
};

// Boot a base class (only use for very core object classes)
var boot_defclass = function(id, super_klass) {
  var result = rb_class_boot(super_klass);
  rb_name_class(result, id);
  rb_const_set((rb_cObject || result), id, result);
  return result;
};

// Like boot_defclass, but for root object only (i.e. basicobject)
var boot_defrootclass = function(id) {
  var result = new RClass(null, null);
  // FIXME: set flags - do we need this. already done for us?
  result.$flags = T_CLASS;
  rb_name_class(result, id);
  rb_const_set((rb_cObject || result), id, result);
  return result;
};


// Create a new subclass of the given superclass. We do not name it yet.
var rb_class_boot = $opal.class_boot = function(super_class) {
  if (super_class) {
    var ctor = function() {};
    ctor.prototype = super_class.constructor.prototype;
    var result = function() {
       RClass.call(this, null, super_class); return this;
    };
    result.prototype = new ctor();
    var klass = new result();
    klass.$klass = rb_cClass;
    return klass;
  }
  else {
    var result = new RClass(null, null);
    return result;
  }
};

// @global
rb_class_real = function(klass) {
  while (klass.$flags & FL_SINGLETON) { klass = klass.$super; }
  return klass;
};

// Name the class with the given id.
var rb_name_class = function(klass, id) {
  klass.__classid__ = id;
};

// make metaclass for the given class
var rb_make_metaclass = function(klass, super_class) {
  // print("making metaclass for " + klass.__classid__);
  // if klass is a class, and it is a singleton..
  if ((klass.$flags & T_CLASS) && (klass.$flags & FL_SINGLETON)) {
    // console.log("ok");
    // throw "need to implement in rb_make_metaclass"
    return make_metametaclass(klass);
  }
  else {
    // our meta is a 'subclass' of the superclass
    var meta = rb_class_boot(super_class);
    // meta is now also a singleton (as well as class)
    meta.$flags |= FL_SINGLETON;
    // the class of a class is its meta
    klass.$klass = meta;
    // fix method table
    klass.$m = meta.$m_tbl;
    // fix const table
    meta.$c = klass.$c;
    // attach the meta to the klass (so we can refer to it later)
    rb_singleton_class_attached(meta, klass);
    
    return meta;
  }
};

var rb_singleton_class_attached = function(klass, obj) {
  // make sure klass is a singleton
  if (klass.$flags & FL_SINGLETON) {
    // console.log("setting attacjed..");
    rb_ivar_set(klass, '__attached__', obj);
  }
};

var make_metametaclass = function(metaclass) {
  var metametaclass, super_of_metaclass;
  
  if (metaclass.$klass == metaclass) {
    metametaclass = rb_class_boot(null);
    metametaclass.$klass = metametaclass;
  }
  else {
    metametaclass = rb_class_boot(null);
    metametaclass.$klass = metaclass.$klass.$klass == metaclass.$klass ? 
        make_metametaclass(metaclass.$klass) : 
        metaclass.$klass.$klass;
  }
  
  metametaclass.$flags |= FL_SINGLETON;
  
  rb_singleton_class_attached(metametaclass, metaclass);
  metaclass.$klass = metametaclass;
  metaclass.$m = metametaclass.$m_tbl;
  super_of_metaclass = metaclass.$super;
  
  // while (super_of_metaclass)
  
  metametaclass.$super = rb_ivar_get(super_of_metaclass.$klass, '__attached__') 
        == super_of_metaclass
        ? super_of_metaclass.$klass
        : make_metametaclass(super_of_metaclass);
  
  return metametaclass;
};

// 
var boot_defmetametaclass = function(klass, metametaclass) {
  klass.$klass.$klass = metametaclass;
};

// define toll free bridged class
// @local
var rb_define_toll_free_class = function(prototype, flags, id, super_klass) {
  var klass = rb_define_class(id, super_klass);
  
  prototype.$klass = klass;
  prototype.$m = klass.$m_tbl;
  prototype.$flags = flags;
  prototype.$r = true;
  prototype.$M = RClass.prototype.$M;
  prototype.$B = RClass.prototype.$B;

  // default hashing behaviour
  prototype.$hash = function() {
    // return '$$' + this + '$$';
    return flags + '_' + this;
  };
    
  return klass;
};

// define a new class (normal way), with the given id and superclass. Will be
// top level.
rb_define_class = function(id, super_klass) {
  return rb_define_class_under(rb_cObject, id, super_klass);
};

var rb_define_class_under = function(base, id, super_klass) {
  var klass;
  // if already defined, just ensure right type then return the existing class
  if (rb_const_defined(base, id)) {
    // check its a class?
    return rb_const_get(base, id);
  }
  
  // console.log(super_klass.constructor);
  klass = rb_define_class_id(id, super_klass);
  
  rb_name_class(klass, id);
  rb_const_set(base, id, klass);
  // if (klass !== rb_object)
  klass.$parent = base;
  // rb_class_inherited(super_klass, klass);
  return klass;
};

// Actually create class
var rb_define_class_id = function(id, super_klass) {
  var klass;
  
  if (!super_klass)
    super_klass = rb_cObject;
    // console.log("A");
  klass = rb_class_create(super_klass);
  rb_name_class(klass, id);
  // console.log("B " + id);
  rb_make_metaclass(klass, super_klass.$klass);
  return klass;
};

var rb_class_create = function(super_klass) {
  return rb_class_boot(super_klass);
};

// get singleton class of obj
var rb_singleton_class = function(obj) {
  var obj;
  console.log("rb_singleton_class:");
  console.log(obj);
  // print('finding singleton class for ' + obj.__classid__);
  // console.log("checking for id: " + obj.$h);
  if (obj == rb_cObject) {
    //console.log("right. cchecking rb_cObject");
  }
  // check if number, string etc.. and throw error?
  if ((obj.$klass.$flags & FL_SINGLETON)&& rb_ivar_get(obj.$klass, '__attached__') == obj) {
    console.log("returning on attacked");
    // print("returning on attached");
    // for (var prop in obj.$k) {print (prop); print(obj.$k[prop]);}
    klass = obj.$klass;
  }
  else {
    // OLD
    // making an object into a singleton object..
    //console.log("!!!!!!!!!!!!! getting this way");
    //var class_id = rb_ivar_get(obj.$klass, '__classid__');
    //klass = rb_make_metaclass(obj, obj.$klass);
 
    console.log("MAKING NEWWWWW");
   console.log(obj); 
    // NEW
    var orig_klass = obj.$klass;
    klass = rb_class_boot(orig_klass);

    klass.$flags = klass.$flags | FL_SINGLETON;
    obj.$klass = klass;
    klass.__attached__ = obj;

    // might be done in singleton_class_attached
    obj.$m = klass.$m_tbl;
    
    console.log(klass);
    // rb_singleton_class_attached(klass, obj);
    // meta of klass = meta of rb_class_real(orig_klass);
    
    klass.$klass = rb_class_real(orig_klass).$klass;
    klass.$m = klass.$klass.$m_tbl;
  }
  
  return klass;
};

// obj must be an obj
var make_singleton_class = function(obj) {

};

var RHash = function(args) {
  var k, v;
  this.$keys = [];
  this.$assocs = {};
  this.$default = Qnil;
  for (var i = 0; i < args.length; i++) {
    k = args[i];
    v = args[i+1];
    i++;
    this.$keys.push(k);
    this.$assocs[k.$hash()] = v;
  }
  return this;
};

// Symbol table
var symbol_table = { };

var rb_cRange;

/**
  Global VM method used for creating a range (from the VM)
  
  FIXME: This should be placed in vm.js
*/
global.rb_vm_range = function(beg, end, exclude_end) {
  return new RRange(beg, end, exclude_end);
};

/**
  Range ruby object
*/
function RRange(beg, end, exclude_end) {
  // begin - first item belonging to range
  this.$beg = beg;
  // end - last item belonging to range
  this.$end = end;
  // exclude end - whether last item is excluded or not
  this.$exc = exclude_end;
  return this;
}


var rb_cRegexp;

// @class MatchData
var rb_cMatch;

/**
  Produce a nicely formatted string-version of `self`.

  @example
    /^abc/.inspect
    # => "/^abc/"

  @return [String] string
*/
function reg_inspect(reg, mid) {
  return reg.toString();
}

/**
  Equality - Two regexps are equal if their patterns are identical, they have
  the same character set code, and their {#casefold?} values are the same.

  @example
    /abc/ == /abc/x     # => false
    /abc/ == /abc/i     # => false
    /abc/ == /abc/n     # => false
    /abc/u == /abc/n    # => false

  @param [Regexp] other_regexp another regexp to comapre
  @return [Boolean]
*/
function reg_equal(reg, mid, reg2) {
  ARG_COUNT(1)
  return reg.toString() === reg2.toString() ? Qtrue : Qfalse;
}

/**
  Returns a {MatchData} object describing the match, or `nil` if there was no
  match. This is equivalent to retrieving the value of the special variable
  $~ following a normal match. If the second parameter is present, it 
  specifies the position in the string to begin the search.

  @example
    /(.)(.)(.)/.match("abc")[2]
    # => "b"
    /(.)(.)/.match("abc")[2]
    # => "c"

  @todo Passing a block is not yet supported.

  @param [Sring] string to match against
  @return [MatchData, nil] result or nil
*/
function reg_match(reg, mid, str) {
  var test, match = Qnil;
	
	if (test = reg.exec(str)) {
		match = rb_obj_alloc(rb_cMatch);
		rb_ivar_set(match, '@data', []);
	}
	
	return match;
}

function match_to_a(match, mid) {
  return rb_ivar_get(match, "@data");
}

function match_inspect(match, mide) {
  return "#<MatchData \"\">";
}

function match_aref(match, mid, idx) {
  return Qnil;
}

// Exception classes
var rb_eException,
    rb_eStandardError,
    rb_eLocalJumpError,
    rb_eNameError,
    rb_eNoMethodError,
    rb_eArgError,
    rb_eScriptError,
    rb_eLoadError,
		rb_eRuntimeError,
		rb_eTypeError,
		rb_eIndexError,
		rb_eKeyError,
		rb_eRangeError;

// Standard jump exceptions to save re-creating them everytime they are needed
var rb_vm_return_instance,
		rb_vm_loop_return_instance,
		// disgard this? yes we can!
		rb_vm_block_return_instance,
		rb_vm_next_instance,
		rb_vm_break_instance;

Error.prepareStackTrace = function(error, stack) {
  var parts = [];
  // actual error
  //console.log("about to raise");
  if (error.$klass)
    parts.push(error.$klass.__classid__ + ': ' + error.message);
  else
    parts.push(error.toString());

  for (var i = 0; i < stack.length; i++) {
    var part = stack[i], func = part.getFunction();

    // we are only interested in ruby methods..
    if (func.$rbName || true) {
      parts.push('\tfrom ' + (part.getFileName() || '(irb)') + ':' + part.getLineNumber() + ':in `' + func.$rbName + '\'');
    }
  }

  return parts.join('\n');
};





// Returns a new string object containing a copy of `str`.
// 
// @param [String] str string to copy
// @return [String] result
function str_s_new(str, mid, text) {
	return new String(text || "");
};


/**
	Creates a new hash populated with the given objects. Equivalent to the 
	literal `{ key => value, ... }`. 

	@example
	  Hash["a", 100, "b", 200]
	  # => {"a" =>100, "b"=>200}

	@return [Hash]
*/
function hash_s_create(obj, mid) {
	return opalhash.apply(null, Array.prototype.slice.call(arguments, 2));
}

function class_s_new(clas, sup) {
	var klass = rb_define_class_id("AnonClass", sup || rb_cObject);              
	return klass;
};

function class_new_instance(cla) {

	var obj = cla.$m.allocate(cla, Qnil);
	var args = Array.prototype.slice.call(arguments);
	args[0] = obj;
	
	// if given a block, we need to reroute it to initialize
  // if (rb_block_func == arguments.callee) {
    // obj.$B.apply(obj, ['initialize', rb_block_proc].concat(
      // Array.prototype.slice.call(arguments, 1)));
  // } else {
    obj.$m.initialize.apply(null, args);
  // }
  return obj;
};

function class_initialize(cla, mid, sup) {
	// print("in Class.new initialize");
	var klass = rb_define_class_id('', sup || rb_cObject);
	return klass;
}


/**
	Prints each argument in turn to the browser console. Currently there is no
	use of `$stdout`, so it is hardcoded into this method to write to the 
	console directly.

	@param [Object] args objects to print using `inspect`
	@return [nil]
*/
function obj_puts(ob) {
	var args = Array.prototype.slice.call(arguments, 1);
	
	for (var i = 0; i < args.length; i++) {
		console.log((args[i].$m.to_s(args[i])).toString());
	}
	
	return Qnil;
}

/**
  @example
  
    !obj  # => true or false
*/
function obj_not(obj, mid) {
  return obj.$r ? Qfalse : Qtrue;
}

/**
  @example
  
    obj != obj2  # => true or false
*/
function obj_not_equal(obj1, mid, obj2) {
  var res = obj1.$m['=='](obj1, obj2);
  return res.$r ? Qfalse : Qtrue;
}

// exports become our runtime $opal object
//module.exports = $opal;
for (var prop in $opal) {
  exports[prop] = $opal[prop];
}


};
modules["./browser"] = function(exports) {
// Browser loader.

var init = function() {
  require('./runtime');
  $opal.init();
  $opal.require = do_require;
};

/* 
 * Module system
 * =============
 *
 * Opal runtime implementes a basic version of the commonjs loading module system.
 * This is the implementation of it. The core library uses a basic system, just
 * enough to get opal to init(). All user code will then be loaded by this
 * system.
 */

// All modules. Hash of names => { exports, implementation, id }; id and
// implementation are set on module definitoon, but exports will be undefined
// until the module is loaded; so we check whether a module is loaded by simply
// checking the exports property - never load a module more than once.
var modules = {};
// tmp for debugging
exports.modules = modules;

// Public way to define a module. Opal.module('some/module/name', function(){})
exports.module = function(module_id, module_body) {
  var module = {
    id: module_id,
    implementation: module_body
  };
  modules[module_id] = module;
};

// global require statement. Good way to 'run' a ruby file. E.g., opalspecs
// calls Opal.run('opalspec/autorun_browser') in the browser to start
// running all the specs.
exports.require = function(module_id) {
  $opal.rb_run(function() {
    return do_require(module_id);
  });
};

// the actual require statement. The public ones wraps itself in an error
// reporter closure
var do_require = function(module_id) {
  var module = modules[module_id];

  if (!module) {
    throw new Error("cannot find module '" + module_id + "'");
  }

  if (module.exports) {
    return module.exports;
  }

  var exports = {};
  module.exports = exports;

  module.implementation(exports, function(){}, module);
  return module.exports;
};

init();


};
modules["./basic_object"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm(['==']);
return ($class(self, nil, "BasicObject", function(self) {
return ($def(self, "initialize", function(self) {
return (nil);}, 0), $def(self, "==", function(self, other) {
if (self == other) return Qtrue;
    return Qfalse;}, 0), $def(self, "equal?", function(self, other) {
var __a;
return ((__a = self).$m["=="](__a, other));}, 0));}, 0));})();
};
modules["./class"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm([]);
return ($class(self, nil, "Class", function(self) {
return ($def(self, "superclass", function(self) {
var sup = self.$super;

    if (!sup) {
      if (self == $opal.BasicObject) return Qnil;
      throw new Error('RuntimeError: uninitialized class');
    }

    return sup;}, 0));}, 0));})();
};
modules["./error"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm([]);
return ($class(self, nil, "Exception", function(self) {
return ($def(self, "allocate", function(self) {
var err = new Error();
    err.$klass = self;
    return err;}, 1), $def(self, "initialize", function(self, message) {
if (message === undefined) message = "";
return self.message = message;}, 0), $def(self, "message", function(self) {
return self.message;}, 0), $def(self, "inspect", function(self) {
return "#<" + self.$klass.__classid__ + ": '" + self.message + "'>";}, 0), $def(self, "to_s", function(self) {
return self.message;}, 0));}, 0), $class(self, rb_vm_cg(self, "Exception"), "StandardError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "Exception"), "RuntimeError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "StandardError"), "LocalJumpError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "StandardError"), "TypeError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "StandardError"), "NameError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "NameError"), "NoMethodError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "StandardError"), "ArgumentError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "Exception"), "ScriptError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "ScriptError"), "LoadError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "StandardError"), "IndexError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "IndexError"), "KeyError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "StandardError"), "RangeError", function(self) {
return (nil);}, 0));})();
};
modules["./range"] = function(exports) {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm(['to_s', 'inspect']);
return ($class(self, nil, "Range", function(self) {
return ($def(self, "to_s", function(self) {
var __a;
var str = (__a = self.$beg).$m.to_s(__a);
    var str2 = (__a = self.$end).$m.to_s(__a);
    var join = self.$exc ? '...' : '..';
    return str + join + str2;}, 0), $def(self, "inspect", function(self) {
var __a;
var str = (__a = self.$beg).$m.inspect(__a);
    var str2 = (__a = self.$end).$m.inspect(__a);
    var join = self.$exc ? '...' : '..';
    return str + join + str2;}, 0));}, 0));})();
};
  var browser_exports = require('./browser');

  for (var prop in browser_exports) {
    Opal[prop] = browser_exports[prop];
  }
})(this, Opal);

