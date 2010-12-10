var rb_cRange;

/**
  Global VM method used for creating a range (from the VM)
  
  FIXME: This should be placed in vm.js
*/
global.rb_vm_range = function(beg, end, exclude_end) {
  return new RRange(beg, end, exclude_end)
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

function range_to_s(range, mid) {
  var str = CALL(range.$beg, "to_s");
  var str2 = CALL(range.$end, "to_s");
  var join = range.$exc ? "..." : "..";
  return str + join + str2;
}

function range_inspect(range, mid) {
  var str = CALL(range.$beg, "inspect");
  var str2 = CALL(range.$end, "inspect");
  var join = range.$exc ? "..." : "..";
  return str + join + str2;
}

function Init_Range() {
  rb_cRange = rb_define_toll_free_class(RRange.prototype, T_OBJECT | T_RANGE,
	  "Range", rb_cObject);
																			
	RRange.prototype.$hash = function() {
	  if (this.$id) return this.$id;

	  return this.$id = opal_yield_hash();
	};
	
	rb_define_method(rb_cRange, "to_s", range_to_s);
	rb_define_method(rb_cRange, "inspect", range_inspect);
}
