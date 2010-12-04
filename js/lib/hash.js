// @class Hash
var rb_cHash;
// @object ENV
var envtbl;

var RHash = function(args) {
  var k, v;
  this.$h = opal_yield_hash();
  this['@keys'] = [];
  this['@assocs'] = {};
  this['@default'] = Qnil;
  for (var i = 0; i < args.length; i++) {
    k = args[i], v = args[i+1];
    i++;
    this['@keys'].push(k);
    this['@assocs'][k.$hash()] = v;
  }
  return this;
};

// hash
// @global
opalhash = function() {
  return new RHash(Array.prototype.slice.call(arguments));
};

var rb_cHash_store = function(self, block, key, val) {
	var hash = key.$hash();
	
	if (!self['@assocs'].hasOwnProperty(hash))
		self['@keys'].push(key);
	
	return self['@assocs'][hash] = val;
};

var rb_cHash_fetch = function(self, block, key) {
	var hash = key.$hash();
	
	if (self['@assocs'].hasOwnProperty(hash))
		return self['@assocs'][hash];
	
	return self['@default'];
};

var rb_cHash_delete = function(self, block, key) {
	var hash = key.$hash();
  
  if (self['@assocs'].hasOwnProperty(hash)) {
    var ret = self['@assocs'][hash];
    delete self['@assocs'][hash];
    self['@keys'].splice(self['@keys'].indexOf(key), 1);
    return ret;
  }
  
  return self['@default'];
};

function env_to_s(env) {
	return "ENV";
}

function env_inspect(env) {
	return "ENV";
}

function env_aref(env, block, key) {
	return Qnil;
}

var Init_Hash = function() {
	rb_cHash = rb_define_toll_free_class(RHash.prototype, T_OBJECT | T_HASH,
																			'Hash', rb_cObject);
																			
	RHash.prototype.$hash = function() {
	  if (this.$id) return this.$id;

	  return this.$id = opal_yield_hash();
	};
																			
	rb_define_method(rb_cHash, '__store__', rb_cHash_store);
	rb_define_method(rb_cHash, '__fetch__', rb_cHash_fetch);
	rb_define_method(rb_cHash, '__delete__', rb_cHash_delete);
	
	envtbl = rb_obj_alloc(rb_cObject);
	
	rb_const_set(rb_cObject, "ENV", envtbl);
	rb_define_singleton_method(envtbl, "[]", env_aref);
	rb_define_singleton_method(envtbl, "to_s", env_to_s);
	rb_define_singleton_method(envtbl, "inspect", env_inspect);
};

