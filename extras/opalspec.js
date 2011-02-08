Opal.module("opalspec/autorun", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['require', 'autorun']);
var __a;
return (self.$m.require(self, 'opalspec'), (__a = rb_vm_cg(rb_vm_cg(self, "Spec"), "Runner")).$m.autorun(__a));})();
});
Opal.module("opalspec/dsl", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['create_example_group', 'include']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "DSL", function(self) {
return ($class(self, nil, "Main", function(self) {
return ($def(self, "describe", function(self, name) {
var __a;
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExampleGroupFactory"), ($block.p = block), $block.f = __a.$m.create_example_group)(__a, name));}, 0));}, 2));}, 2));}, 2), self.$m.include(self, rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "DSL"), "Main")));})();
});
Opal.module("opalspec/example/before_and_after_hooks", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['<<', 'before_parts', 'alias_method', '==', 'before_each_parts', 'before_all_parts', 'after_parts', 'after_each_parts', 'after_all_parts']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Example", function(self) {
return ($class(self, nil, "BeforeAndAfterHooks", function(self) {
return ($def(self, "before", function(self, scope) {
var __a;
if (scope === undefined) scope = $symbol("each");
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((__a = self.$m.before_parts(self, scope)).$m["<<"](__a, block));}, 0), self.$m.alias_method(self, $symbol("append_before"), $symbol("before")), $def(self, "before_each_parts", function(self) {
if (self["@before_each_parts"] === undefined) self["@before_each_parts"] = nil;
var __a;
return (((__a = self["@before_each_parts"], __a.$r) ? __a : self["@before_each_parts"] = []));}, 0), $def(self, "before_all_parts", function(self) {
if (self["@before_all_parts"] === undefined) self["@before_all_parts"] = nil;
var __a;
return (((__a = self["@before_all_parts"], __a.$r) ? __a : self["@before_all_parts"] = []));}, 0), $def(self, "before_parts", function(self, scope) {
var __a;
return (((__a = scope).$m["=="](__a, $symbol("each")).$r ? (self.$m.before_each_parts(self)) : ((__a = scope).$m["=="](__a, $symbol("all")).$r ? (self.$m.before_all_parts(self)) : ([]))));}, 0), $def(self, "after", function(self, scope) {
var __a;
if (scope === undefined) scope = $symbol("each");
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((__a = self.$m.after_parts(self, scope)).$m["<<"](__a, block));}, 0), $def(self, "after_each_parts", function(self) {
if (self["@after_each_parts"] === undefined) self["@after_each_parts"] = nil;
var __a;
return (((__a = self["@after_each_parts"], __a.$r) ? __a : self["@after_each_parts"] = []));}, 0), $def(self, "after_all_parts", function(self) {
if (self["@after_all_parts"] === undefined) self["@after_all_parts"] = nil;
var __a;
return (((__a = self["@after_all_parts"], __a.$r) ? __a : self["@after_all_parts"] = []));}, 0), $def(self, "after_parts", function(self, scope) {
var __a;
return (((__a = scope).$m["=="](__a, $symbol("each")).$r ? (self.$m.after_each_parts(self)) : ((__a = scope).$m["=="](__a, $symbol("all")).$r ? (self.$m.after_all_parts(self)) : ([]))));}, 0));}, 2));}, 2));}, 2));})();
});
Opal.module("opalspec/example/errors", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm([]);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Example", function(self) {
return ($class(self, rb_vm_cg(self, "StandardError"), "ExamplePendingError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "ExamplePendingError"), "NotYetImplementedError", function(self) {
return ($def(self, "initialize", function(self) {
return (self["@message"] = "Not Yet Implemented");}, 0));}, 0));}, 2));}, 2));})();
});
Opal.module("opalspec/example/example_group", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['extend', 'include']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Example", function(self) {
return ($class(self, nil, "ExampleGroup", function(self) {
return (self.$m.extend(self, rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExampleGroupMethods")), self.$m.include(self, rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExampleMethods")));}, 0));}, 2));}, 2));})();
});
Opal.module("opalspec/example/example_group_factory", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['add_example_group', 'options', 'describe']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Example", function(self) {
return ($class(self, nil, "ExampleGroupFactory", function(self) {
return ($def(self, "register_example_group", function(self, klass) {
var __a, __b;
return ((__a = (__b = rb_vm_cg(rb_vm_cg(self, "Spec"), "Runner")).$m.options(__b)).$m.add_example_group(__a, klass));}, 1), $def(self, "create_example_group", function(self, group_name) {
var __a;
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((__a = rb_vm_cg(self, "ExampleGroup"), ($block.p = block), $block.f = __a.$m.describe)(__a, group_name));}, 1));}, 0));}, 2));}, 2));})();
});
Opal.module("opalspec/example/example_group_hierarchy", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm([]);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Example", function(self) {
return ($class(self, nil, "ExampleGroupHierarchy", function(self) {
return ($def(self, "initialize", function(self, example_group_class) {
if (self["@example_group_class"] === undefined) self["@example_group_class"] = nil;
return (self["@example_group_class"]);}, 0), $def(self, "run_before_each", function(self, example) {
return (nil);}, 0));}, 0));}, 2));}, 2));})();
});
Opal.module("opalspec/example/example_group_methods", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['include', 'subclass', 'const_set', 'new', 'register_example_group', 'module_eval', '<<', 'example_proxies', 'example_implementations', 'pending_implementation', 'alias_method', 'proc', 'raise', 'puts', 'examples_to_run', 'notify', 'reporter', 'run_before_all', 'run_examples', 'run_after_all', 'each', 'execute', 'before_all_parts', 'call', 'after_all_parts', 'example_group_started']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Example", function(self) {
return ($class(self, nil, "ExampleGroupMethods", function(self) {
return (self.$m.include(self, rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "BeforeAndAfterHooks")), $def(self, "describe", function(self, group_name) {
var group_block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return (($block.p = group_block, $block.f = self.$m.subclass)(self, group_name));}, 0), $def(self, "subclass", function(self, group_name) {
if (self["@class_count"] === undefined) self["@class_count"] = nil;
var __a, klass;
var group_block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return (((__a = self["@class_count"], __a.$r) ? __a : self["@class_count"] = 0), klass = self.$m.const_set(self, ("Subclass" + (__a = self["@class_count"], __a.$m.to_s(__a))), (__a = rb_vm_cg(self, "Class")).$m.new(__a, self)), ((__a = klass), __a.$m["description="] || __a.$M("description="))(__a, group_name), (__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExampleGroupFactory")).$m.register_example_group(__a, klass), (__a = klass, ($block.p = group_block), $block.f = __a.$m.module_eval)(__a), klass);}, 0), $def(self, "example", function(self, example_name) {
var example_proxy, __a, __b;
var implementation = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return (example_proxy = (__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExampleProxy")).$m.new(__a, example_name), (__a = self.$m.example_proxies(self)).$m["<<"](__a, example_proxy), (__a = self.$m.example_implementations(self), (__a.$m["[]="] || rb_vm_meth_m)(__a, example_proxy, ((__b = implementation, __b.$r) ? __b : self.$m.pending_implementation(self)))), example_proxy);}, 0), self.$m.alias_method(self, $symbol("it"), $symbol("example")), self.$m.alias_method(self, $symbol("specify"), $symbol("example")), $def(self, "description", function(self) {
if (self["@description"] === undefined) self["@description"] = nil;
var __a;
return (((__a = self["@description"], __a.$r) ? __a : self["@description"] = "PLACEHOLDER DESCRIPTION"));}, 0), $def(self, "description=", function(self, description) {
return (self["@description"] = description, self);}, 0), $def(self, "pending_implementation", function(self) {
return ((($block.p = function(self) {
var __a;
return (self.$m.raise(self, (__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "NotYetImplementedError")).$m.new(__a)));}).$self = self, $block.f = self.$m.proc)(self));}, 0), $def(self, "run", function(self, run_options) {
var examples, __a, success, before_all_instance_variables;
return (self.$m.puts(self, "aright, running"), examples = self.$m.examples_to_run(self, run_options), self.$m.puts(self, "notifying"), self.$m.notify(self, (__a = run_options).$m.reporter(__a)), success = Qtrue, before_all_instance_variables = nil, self.$m.run_before_all(self, run_options), self.$m.puts(self, "running"), self.$m.run_examples(self, success, before_all_instance_variables, examples, run_options), self.$m.puts(self, "finished run"), self.$m.run_after_all(self, run_options));}, 0), $def(self, "run_examples", function(self, success, instance_variables, examples, run_options) {
var __a;
return (self.$m.puts(self, "running examples"), (__a = examples, ($block.p = function(self, example) {
var __a, example_group_instance;
return (self.$m.puts(self, ($block.p = (__a = self.$m.example_implementations(self), __a.$m["[]"] || __a.$M("[]"))(__a, example), $block.f = self.$m.new)(self, example)), example_group_instance = ($block.p = (__a = self.$m.example_implementations(self), __a.$m["[]"] || __a.$M("[]"))(__a, example), $block.f = self.$m.new)(self, example), (__a = example_group_instance).$m.execute(__a, run_options, instance_variables));}).$self = self, $block.f = __a.$m.each)(__a));}, 0), $def(self, "run_before_all", function(self, run_options) {
var __a;
return ((__a = self.$m.before_all_parts(self), ($block.p = function(self, part) {
var __a;
return ((__a = part).$m.call(__a));}).$self = self, $block.f = __a.$m.each)(__a));}, 0), $def(self, "run_after_all", function(self, run_options) {
var __a;
return ((__a = self.$m.after_all_parts(self), ($block.p = function(self, part) {
var __a;
return ((__a = part).$m.call(__a));}).$self = self, $block.f = __a.$m.each)(__a));}, 0), $def(self, "notify", function(self, reporter) {
var __a;
return ((__a = reporter).$m.example_group_started(__a, (__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExampleGroupProxy")).$m.new(__a, self)));}, 0), $def(self, "examples_to_run", function(self, run_options) {
return (self.$m.example_proxies(self));}, 0), $def(self, "example_proxies", function(self) {
if (self["@example_proxies"] === undefined) self["@example_proxies"] = nil;
var __a;
return (((__a = self["@example_proxies"], __a.$r) ? __a : self["@example_proxies"] = []));}, 0), $def(self, "example_implementations", function(self) {
if (self["@example_implementations"] === undefined) self["@example_implementations"] = nil;
var __a;
return (((__a = self["@example_implementations"], __a.$r) ? __a : self["@example_implementations"] = self.$H()), self["@example_implementations"]);}, 0), $def(self, "example_group_hierarchy", function(self) {
if (self["@example_group_hierarchy"] === undefined) self["@example_group_hierarchy"] = nil;
var __a, __b;
return (((__a = self["@example_group_hierarchy"], __a.$r) ? __a : self["@example_group_hierarchy"] = (__b = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExampleGroupHierarchy")).$m.new(__b, self)));}, 0));}, 2));}, 2));}, 2));})();
});
Opal.module("opalspec/example/example_group_proxy", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['attr_reader', 'description', 'example_proxies']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Example", function(self) {
return ($class(self, nil, "ExampleGroupProxy", function(self) {
return (self.$m.attr_reader(self, $symbol("description"), $symbol("examples")), $def(self, "initialize", function(self, example_group) {
var __a;
return (self["@description"] = (__a = example_group).$m.description(__a), self["@examples"] = (__a = example_group).$m.example_proxies(__a));}, 0));}, 0));}, 2));}, 2));})();
});
Opal.module("opalspec/example/example_methods", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['run_before_each', 'example_group_hierarchy', 'class', 'description', 'example_started', 'reporter', 'puts', 'before_each_example', 'instance_eval', 'example_finished', 'update']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Example", function(self) {
return ($class(self, nil, "ExampleMethods", function(self) {
return ($def(self, "initialize", function(self, example_proxy) {
var implementation = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return (self["@example_proxy"] = example_proxy, self["@implementation"] = implementation);}, 0), $def(self, "before_each_example", function(self) {
return (self.$m.run_before_each(self));}, 0), $def(self, "run_before_each", function(self) {
var __a;
return ((__a = self.$m.example_group_hierarchy(self)).$m.run_before_each(__a, self));}, 0), $def(self, "example_group_hierarchy", function(self) {
var __a, __b;
return ((__a = (__b = self).$m.class(__b)).$m.example_group_hierarchy(__a));}, 0), $def(self, "description", function(self) {
if (self["@example_proxy"] === undefined) self["@example_proxy"] = nil;
var __a;
return ((__a = self["@example_proxy"]).$m.description(__a));}, 0), $def(self, "execute", function(self, run_options, instance_variables) {
if (self["@example_proxy"] === undefined) self["@example_proxy"] = nil;
if (self["@implementation"] === undefined) self["@implementation"] = nil;
var __a, __b, execution_error, e;
return ((__a = (__b = run_options).$m.reporter(__b)).$m.example_started(__a, self["@example_proxy"]), execution_error = nil, self.$m.puts(self, "beginning"), (function(){try{return (self.$m.before_each_example(self), ($block.p = self["@implementation"], $block.f = self.$m.instance_eval)(self), self.$m.puts(self, "done!"));}catch(__err__){if (!__err__.$klass){ __err__ = rb_vm_make_exception(__err__);}if (__err__){e = __err__;return (self.$m.puts(self, "error :("), execution_error = e);}throw __err__;}})(), self.$m.puts(self, "still got here"), (__a = (__b = run_options).$m.reporter(__b)).$m.example_finished(__a, (__a = self["@example_proxy"]).$m.update(__a, self.$m.description(self)), execution_error));}, 0));}, 2));}, 2));}, 2));})();
});
Opal.module("opalspec/example/example_proxy", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['attr_reader']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Example", function(self) {
return ($class(self, nil, "ExampleProxy", function(self) {
return (self.$m.attr_reader(self, $symbol("description")), $def(self, "initialize", function(self, description, options, location) {
return (self["@description"] = description);}, 0), $def(self, "update", function(self, description) {
return (self["@description"] = description, self);}, 0));}, 0));}, 2));}, 2));})();
});
Opal.module("opalspec/example", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['require']);
return (self.$m.require(self, 'opalspec/example/before_and_after_hooks'), self.$m.require(self, 'opalspec/example/example_group_proxy'), self.$m.require(self, 'opalspec/example/example_proxy'), self.$m.require(self, 'opalspec/example/example_group_methods'), self.$m.require(self, 'opalspec/example/example_group_factory'), self.$m.require(self, 'opalspec/example/example_group_hierarchy'), self.$m.require(self, 'opalspec/example/example_methods'), self.$m.require(self, 'opalspec/example/example_group'), self.$m.require(self, 'opalspec/example/errors'));})();
});
Opal.module("opalspec/expectations/errors", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm([]);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Expectations", function(self) {
return ($class(self, rb_vm_cg(self, "StandardError"), "ExpectationNotMetError", function(self) {
return (nil);}, 0));}, 2));}, 2));})();
});
Opal.module("opalspec/expectations/fail_with", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['raise', 'new']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Expectations", function(self) {
return ($def(self, "fail_with", function(self, message, expected, target) {
var __a;
return (self.$m.raise(self, (__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Expectations"), "ExpectationNotMetError")).$m.new(__a, message)));}, 1));}, 2));}, 2));})();
});
Opal.module("opalspec/expectations/handler", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['nil?', 'new']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Expectations", function(self) {
return ($class(self, nil, "PositiveExpectationHandler", function(self) {
return ($def(self, "handle_matcher", function(self, actual, matcher, message) {
var __a;
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;try {
var __vm_jump_function__ = arguments.callee;return (((__a = rb_vm_cg(rb_vm_cg(self, "Spec"), "Matchers")), __a.$m["last_should="] || __a.$M("last_should="))(__a, $symbol("should")), ((__a = rb_vm_cg(rb_vm_cg(self, "Spec"), "Matchers")), __a.$m["last_matcher="] || __a.$M("last_matcher="))(__a, matcher), ((__a = matcher).$m["nil?"](__a).$r ? (rb_vm_block_return((__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Matchers"), "PositiveOperatorMatcher")).$m.new(__a, actual), __vm_jump_function__)) : nil));} catch(__err__) {
if (__err__.$keyword == 0 && __err__["@jump_function"] == __vm_jump_function__) {
return __err__['@exit_value'];
}throw __err__;}}, 1));}, 0), $class(self, nil, "NegativeExpectationHandler", function(self) {
return ($def(self, "handle_matcher", function(self, actual, matcher, message) {
var __a;
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;try {
var __vm_jump_function__ = arguments.callee;return (((__a = rb_vm_cg(rb_vm_cg(self, "Spec"), "Matchers")), __a.$m["last_should="] || __a.$M("last_should="))(__a, $symbol("should_not")), ((__a = rb_vm_cg(rb_vm_cg(self, "Spec"), "Matchers")), __a.$m["last_matcher="] || __a.$M("last_matcher="))(__a, matcher), ((__a = matcher).$m["nil?"](__a).$r ? (rb_vm_block_return((__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Matchers"), "NegativeOperatorMatcher")).$m.new(__a, actual), __vm_jump_function__)) : nil));} catch(__err__) {
if (__err__.$keyword == 0 && __err__["@jump_function"] == __vm_jump_function__) {
return __err__['@exit_value'];
}throw __err__;}}, 1));}, 0));}, 2));}, 2));})();
});
Opal.module("opalspec/expectations", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['require', 'handle_matcher']);
return (self.$m.require(self, 'opalspec/expectations/fail_with'), self.$m.require(self, 'opalspec/expectations/handler'), self.$m.require(self, 'opalspec/expectations/errors'), $class(self, nil, "Kernel", function(self) {
return ($def(self, "should", function(self, matcher, message) {
var r, __a;
if (matcher === undefined) matcher = nil;
if (message === undefined) message = nil;
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return (r = (__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Expectations"), "PositiveExpectationHandler")).$m.handle_matcher(__a, self, matcher, message));}, 0), $def(self, "should_not", function(self, matcher, message) {
var __a;
if (matcher === undefined) matcher = nil;
if (message === undefined) message = nil;
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Expectations"), "NegativeExpectationHandler")).$m.handle_matcher(__a, self, matcher, message));}, 0));}, 2));})();
});
Opal.module("opalspec/matchers/be", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm([]);
return (nil);})();
});
Opal.module("opalspec/matchers/generated_descriptions", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm([]);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Matchers", function(self) {
return ($def(self, "last_matcher", function(self) {
if (self["@last_matcher"] === undefined) self["@last_matcher"] = nil;
return (self["@last_matcher"]);}, 1), $def(self, "last_matcher=", function(self, last_matcher) {
return (self["@last_matcher"] = last_matcher);}, 1), $def(self, "last_should", function(self) {
if (self["@last_should"] === undefined) self["@last_should"] = nil;
return (self["@last_should"]);}, 1), $def(self, "last_should=", function(self, last_should) {
return (self["@last_should"] = last_should);}, 1));}, 2));}, 2));})();
});
Opal.module("opalspec/matchers/operator_matcher", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['each', 'define_method', 'eval_match', '__delegate_operator', 'fail_with', '__send__', 'fail_with_message', 'inspect']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Matchers", function(self) {
return ($class(self, nil, "OperatorMatcher", function(self) {
return ($def(self, "initialize", function(self, actual) {
return (self["@actual"] = actual);}, 0), (__a = [$symbol("=="), $symbol("==="), $symbol("=~"), $symbol(">"), $symbol("<"), $symbol(">="), $symbol("<=")], ($block.p = function(self, op) {
return ((($block.p = function(self, exp) {
if (self["@actual"] === undefined) self["@actual"] = nil;
return (self.$m.eval_match(self, self["@actual"], op, exp));}).$self = self, $block.f = self.$m.define_method)(self, op));}).$self = self, $block.f = __a.$m.each)(__a), $def(self, "eval_match", function(self, actual, operator, expected) {
return (self["@operator"] = operator, self["@expected"] = expected, self.$m.__delegate_operator(self, actual, operator, expected));}, 0), $def(self, "fail_with_message", function(self, message) {
if (self["@expected"] === undefined) self["@expected"] = nil;
if (self["@actual"] === undefined) self["@actual"] = nil;
var __a;
return ((__a = rb_vm_cg(rb_vm_cg(self, "Spec"), "Expectations")).$m.fail_with(__a, message, self["@expected"], self["@actual"]));}, 0));}, 0), $class(self, rb_vm_cg(self, "OperatorMatcher"), "PositiveOperatorMatcher", function(self) {
return ($def(self, "__delegate_operator", function(self, actual, operator, expected) {
var __a, __b;
return (((__a = actual).$m.__send__(__a, operator, expected).$r ? (Qtrue) : (self.$m.fail_with_message(self, ("expected: " + (__a = (__b = expected).$m.inspect(__b), __a.$m.to_s(__a)) + ", but got: " + (__a = (__b = actual).$m.inspect(__b), __a.$m.to_s(__a)) + " (using " + (__a = operator, __a.$m.to_s(__a)) + ")")))));}, 0));}, 0), $class(self, rb_vm_cg(self, "OperatorMatcher"), "NegativeOperatorMatcher", function(self) {
return ($def(self, "__delegate_operator", function(self, actual, operator, expected) {
var __a, __b;
return (((__a = actual).$m.__send__(__a, operator, expected).$r ? (self.$m.fail_with_message(self, ("expected not: " + (__a = (__b = expected).$m.inspect(__b), __a.$m.to_s(__a)) + ", and got: " + (__a = (__b = actual).$m.inspect(__b), __a.$m.to_s(__a)) + " (using " + (__a = operator, __a.$m.to_s(__a)) + ")"))) : (Qtrue)));}, 0));}, 0));}, 2));}, 2));})();
});
Opal.module("opalspec/matchers", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['require', 'instance_exec']);
return (self.$m.require(self, 'opalspec/matchers/operator_matcher'), self.$m.require(self, 'opalspec/matchers/be'), self.$m.require(self, 'opalspec/matchers/generated_descriptions'), $class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Matchers", function(self) {
return ($class(self, nil, "Matcher", function(self) {
return ($def(self, "initialize", function(self, name, expected) {
var declarations = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return (self["@name"] = name, self["@expected"] = expected, ($block.p = declarations, $block.f = self.$m.instance_exec)(self, expected));}, 0));}, 0));}, 2));}, 2));})();
});
Opal.module("opalspec/runner/example_group_runner", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['prepare', 'puts', 'each', 'example_groups', 'run', 'finish', 'reporter', 'start', 'number_of_examples']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Runner", function(self) {
return ($class(self, nil, "ExampleGroupRunner", function(self) {
return ($def(self, "initialize", function(self, options) {
return (self["@options"] = options);}, 0), $def(self, "run", function(self) {
var __a;
return (self.$m.prepare(self), self.$m.puts(self, "RUNNING"), (__a = self.$m.example_groups(self), ($block.p = function(self, group) {
if (self["@options"] === undefined) self["@options"] = nil;
var __a;
return (self.$m.puts(self, "running group!"), (__a = group).$m.run(__a, self["@options"]));}).$self = self, $block.f = __a.$m.each)(__a), self.$m.finish(self));}, 0), $def(self, "example_groups", function(self) {
if (self["@options"] === undefined) self["@options"] = nil;
var __a;
return ((__a = self["@options"]).$m.example_groups(__a));}, 0), $def(self, "prepare", function(self) {
var rep, __a;
return (rep = self.$m.reporter(self), (__a = rep).$m.start(__a, self.$m.number_of_examples(self)));}, 0), $def(self, "finish", function(self) {
return (nil);}, 0), $def(self, "reporter", function(self) {
if (self["@options"] === undefined) self["@options"] = nil;
var __a;
return ((__a = self["@options"]).$m.reporter(__a));}, 0), $def(self, "number_of_examples", function(self) {
return (0);}, 0));}, 0));}, 2));}, 2));})();
});
Opal.module("opalspec/runner/formatter/html_formatter", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['attr_reader', 'setup_page_dom', 'join', 'puts', 'now', 'from_native', 'div', 'results_output', 'dl', 'dt', 'description', 'example_group_number', 'dd', 'span', 'pre', 'message', 'exception']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Runner", function(self) {
return ($class(self, nil, "Formatter", function(self) {
return ($class(self, nil, "HtmlFormatter", function(self) {
return (self.$m.attr_reader(self, $symbol("example_group"), $symbol("example_group_number")), $def(self, "initialize", function(self, options) {
return (self["@options"] = options, self["@example_group_number"] = 0, self["@example_number"] = 0, self["@header_red"] = nil, self.$m.setup_page_dom(self));}, 0), $def(self, "setup_page_dom", function(self) {
var content, __a;
return (content = (__a = ['<div class="rspec-report">', '<div id="rspec-header">', '<div id="label">', '<h1>Rspec Code Examples</h1>', '<div>', '<div id="summary">', '<p id="totals">0</p>', '<p id="duration">0</p>', '</div>', '</div>', '<div id="results">', '</div>', '</div>']).$m.join(__a, ""), self.$m.puts(self, "content is: "), self.$m.puts(self, content));}, 0), $def(self, "start", function(self, number_of_examples) {
return (nil);}, 0), $def(self, "end", function(self) {
var __a;
return (self["@end_time"] = (__a = rb_vm_cg(self, "Time")).$m.now(__a));}, 0), $def(self, "results_output", function(self) {
if (self["@results_output"] === undefined) self["@results_output"] = nil;
var __a, __b;
return (((__a = self["@results_output"], __a.$r) ? __a : self["@results_output"] = (__b = rb_vm_cg(rb_vm_cg(self, "Browser"), "Element")).$m.from_native(__b, document.getElementById('results'))));}, 0), $def(self, "example_group_started", function(self, example_group) {
if (self["@example_group_div"] === undefined) self["@example_group_div"] = nil;
if (self["@example_group_dl"] === undefined) self["@example_group_dl"] = nil;
var __a;
return (self["@example_group"] = example_group, self["@example_group_red"] = Qfalse, self["@example_group_div"] = (__a = self.$m.results_output(self)).$m.div(__a, opalhash($symbol("class_name"), "example_group")), self["@example_group_dl"] = (__a = self["@example_group_div"]).$m.dl(__a), self["@example_group_dt"] = (__a = self["@example_group_dl"]).$m.dt(__a, opalhash($symbol("content"), (__a = example_group).$m.description(__a), $symbol("id"), ("example_group_" + (__a = self.$m.example_group_number(self), __a.$m.to_s(__a))))));}, 0), $def(self, "example_started", function(self, example) {
return (nil);}, 0), $def(self, "example_failed", function(self, example, counter, failure) {
if (self["@example_group_dl"] === undefined) self["@example_group_dl"] = nil;
var dd, __a, failure_div, __b;
return (self["@header_red"] = Qtrue, self["@example_group_red"] = Qtrue, dd = (__a = self["@example_group_dl"]).$m.dd(__a, opalhash($symbol("class_name"), "spec failed")), (__a = dd).$m.span(__a, opalhash($symbol("content"), (__a = example).$m.description(__a), $symbol("class_name"), "failed_spec_name")), failure_div = (__a = dd).$m.div(__a, opalhash($symbol("class_name"), "failure")), (__a = (__b = failure_div).$m.div(__b, opalhash($symbol("class_name"), "message"))).$m.pre(__a, opalhash($symbol("content"), (__a = (__b = failure).$m.exception(__b)).$m.message(__a))));}, 0), $def(self, "example_passed", function(self, example) {
if (self["@example_group_dl"] === undefined) self["@example_group_dl"] = nil;
var __a, __b;
return ((__a = (__b = self["@example_group_dl"]).$m.dd(__b, opalhash($symbol("class_name"), "spec passed"))).$m.span(__a, opalhash($symbol("content"), (__a = example).$m.description(__a), $symbol("class_name"), "passed_spec_name")));}, 0), $def(self, "example_pending", function(self, example, message) {
if (self["@example_group_dl"] === undefined) self["@example_group_dl"] = nil;
var __a, __b;
return ((__a = (__b = self["@example_group_dl"]).$m.dd(__b, opalhash($symbol("class_name"), "spec not_implemented"))).$m.span(__a, opalhash($symbol("content"), ((__a = (__b = example).$m.description(__b), __a.$m.to_s(__a)) + " (PENDING: " + (__a = message, __a.$m.to_s(__a)) + ")"), $symbol("class_name"), "not_implemented_spec_name")));}, 0));}, 0));}, 2));}, 2));}, 2));})();
});
Opal.module("opalspec/runner/formatter/terminal_formatter", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['attr_reader', '+', 'puts', 'description', 'message', 'exception']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Runner", function(self) {
return ($class(self, nil, "Formatter", function(self) {
return ($class(self, nil, "TerminalFormatter", function(self) {
return (self.$m.attr_reader(self, $symbol("example_group"), $symbol("example_group_number")), $def(self, "initialize", function(self, options) {
return (self["@options"] = options, self["@example_group_number"] = 0, self["@example_number"] = 0);}, 0), $def(self, "start", function(self, number_of_examples) {
return (nil);}, 0), $def(self, "end", function(self) {
return (nil);}, 0), $def(self, "example_group_started", function(self, example_group) {
return (self["@example_group"] = example_group);}, 0), $def(self, "example_started", function(self, example) {
if (self["@example_number"] === undefined) self["@example_number"] = nil;
var __a;
return (self["@example_number"] = (__a = self["@example_number"]).$m["+"](__a, 1));}, 0), $def(self, "example_failed", function(self, example, counter, failure) {
if (self["@example_group"] === undefined) self["@example_group"] = nil;
var __a, __b, __c;
return (self.$m.puts(self, ("\033[0;31m" + (__a = (__b = self["@example_group"]).$m.description(__b), __a.$m.to_s(__a)) + ": " + (__a = (__b = example).$m.description(__b), __a.$m.to_s(__a)) + "\033[m")), self.$m.puts(self, ""), self.$m.puts(self, ("  " + (__a = (__b = (__c = failure).$m.exception(__c)).$m.message(__b), __a.$m.to_s(__a)))), self.$m.puts(self, ""));}, 0), $def(self, "example_passed", function(self, example) {
if (self["@example_group"] === undefined) self["@example_group"] = nil;
var __a, __b;
return (self.$m.puts(self, ("\033[0;32m" + (__a = (__b = self["@example_group"]).$m.description(__b), __a.$m.to_s(__a)) + ": " + (__a = (__b = example).$m.description(__b), __a.$m.to_s(__a)) + "\033[m")));}, 0), $def(self, "example_pending", function(self, example, message) {
if (self["@example_group"] === undefined) self["@example_group"] = nil;
var __a, __b;
return (self.$m.puts(self, ("\033[0;33m" + (__a = (__b = self["@example_group"]).$m.description(__b), __a.$m.to_s(__a)) + ": " + (__a = (__b = example).$m.description(__b), __a.$m.to_s(__a)) + "\033[m")));}, 0));}, 0));}, 2));}, 2));}, 2));})();
});
Opal.module("opalspec/runner/options", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['attr_accessor', 'attr_writer', 'new', 'run', '==', '<<']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Runner", function(self) {
return ($class(self, nil, "Options", function(self) {
return (self.$m.attr_accessor(self, $symbol("reporter"), $symbol("example_groups")), self.$m.attr_writer(self, $symbol("reporter")), $def(self, "initialize", function(self) {
var __a;
return (self["@example_groups"] = [], self["@reporter"] = (__a = rb_vm_cg(self, "Reporter")).$m.new(__a, self));}, 0), $def(self, "run_examples", function(self) {
var runner, __a;
return (runner = (__a = rb_vm_cg(self, "ExampleGroupRunner")).$m.new(__a, self), (__a = runner).$m.run(__a));}, 0), $def(self, "formatters", function(self) {
if (self["@formatters"] === undefined) self["@formatters"] = nil;
var __a, __b;
try {
var __vm_jump_function__ = arguments.callee;return (((self["@formatters"].$r) ? rb_vm_block_return(self["@formatters"], __vm_jump_function__):nil), ((__a = rb_vm_cg(self, "RUBY_PLATFORM")).$m["=="](__a, "browser").$r ? (((__a = self["@formatters"], __a.$r) ? __a : self["@formatters"] = [(__b = rb_vm_cg(rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Runner"), "Formatter"), "HtmlFormatter")).$m.new(__b, self)])) : (((__a = self["@formatters"], __a.$r) ? __a : self["@formatters"] = [(__b = rb_vm_cg(rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Runner"), "Formatter"), "TerminalFormatter")).$m.new(__b, self)]))));} catch(__err__) {
if (__err__.$keyword == 0 && __err__["@jump_function"] == __vm_jump_function__) {
return __err__['@exit_value'];
}throw __err__;}}, 0), $def(self, "add_example_group", function(self, example_group) {
if (self["@example_groups"] === undefined) self["@example_groups"] = nil;
var __a;
return ((__a = self["@example_groups"]).$m["<<"](__a, example_group));}, 0));}, 0));}, 2));}, 2));})();
});
Opal.module("opalspec/runner/reporter", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['attr_reader', 'each', 'formatters', 'start', 'example_group_started', 'example_started', 'puts', 'nil?', 'example_passed', '===', 'example_pending', 'message', 'example_failed', 'new', 'description', '<<', 'length']);
return ($class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Runner", function(self) {
return ($class(self, nil, "Reporter", function(self) {
return (self.$m.attr_reader(self, $symbol("options")), $def(self, "initialize", function(self, options) {
if (self["@options"] === undefined) self["@options"] = nil;
var __a;
return (self["@options"] = options, ((__a = self["@options"]), __a.$m["reporter="] || __a.$M("reporter="))(__a, self), self["@failures"] = [], self["@pending_count"] = 0, self["@example_count"] = 0);}, 0), $def(self, "start", function(self, number_of_examples) {
var __a;
return (self["@start_time"] = 0, (__a = self.$m.formatters(self), ($block.p = function(self, f) {
var __a;
return ((__a = f).$m.start(__a, number_of_examples));}).$self = self, $block.f = __a.$m.each)(__a));}, 0), $def(self, "formatters", function(self) {
if (self["@options"] === undefined) self["@options"] = nil;
var __a;
return ((__a = self["@options"]).$m.formatters(__a));}, 0), $def(self, "example_group_started", function(self, example_group) {
var __a;
return (self["@example_group"] = example_group, (__a = self.$m.formatters(self), ($block.p = function(self, f) {
var __a;
return ((__a = f).$m.example_group_started(__a, example_group));}).$self = self, $block.f = __a.$m.each)(__a));}, 0), $def(self, "example_started", function(self, example) {
var __a;
return ((__a = self.$m.formatters(self), ($block.p = function(self, f) {
var __a;
return ((__a = f).$m.example_started(__a, example));}).$self = self, $block.f = __a.$m.each)(__a));}, 0), $def(self, "example_finished", function(self, example, error) {
var __a;
return (self.$m.puts(self, "== example finished"), ((__a = error).$m["nil?"](__a).$r ? (self.$m.example_passed(self, example)) : ((__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExamplePendingError")).$m["==="](__a, error).$r ? (self.$m.example_pending(self, example, (__a = error).$m.message(__a))) : (self.$m.example_failed(self, example, error)))));}, 0), $def(self, "example_failed", function(self, example, error) {
if (self["@example_group"] === undefined) self["@example_group"] = nil;
if (self["@failures"] === undefined) self["@failures"] = nil;
var failure, __a;
return (failure = (__a = rb_vm_cg(self, "Failure")).$m.new(__a, (__a = self["@example_group"]).$m.description(__a), (__a = example).$m.description(__a), error), (__a = self["@failures"]).$m["<<"](__a, failure), (__a = self.$m.formatters(self), ($block.p = function(self, f) {
if (self["@failures"] === undefined) self["@failures"] = nil;
var __a;
return ((__a = f).$m.example_failed(__a, example, (__a = self["@failures"]).$m.length(__a), failure));}).$self = self, $block.f = __a.$m.each)(__a));}, 0), $def(self, "example_passed", function(self, example) {
var __a;
return ((__a = self.$m.formatters(self), ($block.p = function(self, f) {
var __a;
return ((__a = f).$m.example_passed(__a, example));}).$self = self, $block.f = __a.$m.each)(__a));}, 0), $def(self, "example_pending", function(self, example, message) {
var __a;
return ((__a = self.$m.formatters(self), ($block.p = function(self, f) {
var __a;
return ((__a = f).$m.example_pending(__a, example, message));}).$self = self, $block.f = __a.$m.each)(__a));}, 0));}, 0), $class(self, nil, "Failure", function(self) {
return (self.$m.attr_reader(self, $symbol("exception")), $def(self, "initialize", function(self, group_description, example_description, exception) {
var __a;
return (self["@example_name"] = ((__a = group_description, __a.$m.to_s(__a)) + " " + (__a = example_description, __a.$m.to_s(__a))), self["@exception"] = exception);}, 0));}, 0));}, 2));}, 2));})();
});
Opal.module("opalspec/runner", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['require', 'run_examples', 'options', 'new', '==', 'length', 'puts', 'each', 'exists?', 'expand_path', 'raise', 'run']);
return (self.$m.require(self, 'opalspec/runner/options'), self.$m.require(self, 'opalspec/runner/reporter'), self.$m.require(self, 'opalspec/runner/example_group_runner'), self.$m.require(self, 'opalspec/runner/formatter/html_formatter'), self.$m.require(self, 'opalspec/runner/formatter/terminal_formatter'), $class(self, nil, "Spec", function(self) {
return ($class(self, nil, "Runner", function(self) {
return ($def(self, "run", function(self) {
var __a;
return ((__a = self.$m.options(self)).$m.run_examples(__a));}, 1), $def(self, "options", function(self) {
if (self["@options"] === undefined) self["@options"] = nil;
var __a, __b;
return (((__a = self["@options"], __a.$r) ? __a : self["@options"] = (__b = rb_vm_cg(self, "Options")).$m.new(__b)), self["@options"]);}, 1), $def(self, "autorun", function(self) {
var __a, __b;
try {
var __vm_jump_function__ = arguments.callee;return (((__a = (__b = rb_vm_cg(self, "ARGV")).$m.length(__b)).$m["=="](__a, 0).$r ? (self.$m.puts(self, "Spec: no input files given"), rb_vm_block_return(nil, __vm_jump_function__)) : nil), (__a = rb_vm_cg(self, "ARGV"), ($block.p = function(self, spec) {
var __a;
return (((__a = rb_vm_cg(self, "File")).$m["exists?"](__a, spec).$r ? (self.$m.require(self, (__a = rb_vm_cg(self, "File")).$m.expand_path(__a, spec))) : (self.$m.raise(self, ("Bad spec to load (does not exist): " + (__a = spec, __a.$m.to_s(__a)))))));}).$self = self, $block.f = __a.$m.each)(__a), (__a = rb_vm_cg(rb_vm_cg(self, "Spec"), "Runner")).$m.run(__a));} catch(__err__) {
if (__err__.$keyword == 0 && __err__["@jump_function"] == __vm_jump_function__) {
return __err__['@exit_value'];
}throw __err__;}}, 1));}, 2));}, 2));})();
});
Opal.module("opalspec", function() {
(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['require']);
return (self.$m.require(self, 'opalspec/matchers'), self.$m.require(self, 'opalspec/expectations'), self.$m.require(self, 'opalspec/example'), self.$m.require(self, 'opalspec/runner'), self.$m.require(self, 'opalspec/dsl'));})();
});
