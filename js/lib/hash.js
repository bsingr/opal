
var rb_cHash;

var RHash = function(args) {
  var k, v;
  this.$h = opal_yield_hash();
  this['@keys'] = [];
  this['@assocs'] = {};
  this['@default'] = rb_nil;
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


var Init_Hash = function() {
	rb_cHash = rb_define_toll_free_class(RHash.prototype, T_OBJECT | T_HASH,
																			'Hash', rb_cObject);
																			
	rb_define_method(rb_cHash, '__store__', rb_cHash_store);
	rb_define_method(rb_cHash, '__fetch__', rb_cHash_fetch);
	rb_define_method(rb_cHash, '__delete__', rb_cHash_delete);
};

