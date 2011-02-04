Opal.module("opalspec/autorun", function() {
self.$M(['require', 'autorun']);
var nil = Qnil;
var __a;
return (self.$m.require(self, 'spec'), (__a = rb_vm_cg(rb_vm_cg(self, "Spec"), "Runner"), __a.$m.autorun)(__a));
});
Opal.module("opalspec/dsl", function() {
self.$M(['include']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "DSL", function(self) {
return (rb_vm_class(self, nil, "Main", function(self) {
return (rb_vm_defn(self, "describe", function(self, name) {
var nil = Qnil;
var block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return (rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExampleGroupFactory").$B("create_example_group", block, name));}, 0));}, 2));}, 2));}, 2), self.$m.include(self, rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "DSL"), "Main")));
});
Opal.module("opalspec/example/before_and_after_hooks", function() {
self.$M(['<<', 'before_parts', 'alias_method', '==', 'before_each_parts', 'before_all_parts', 'after_parts', 'after_each_parts', 'after_all_parts']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Example", function(self) {
return (rb_vm_class(self, nil, "BeforeAndAfterHooks", function(self) {
return (rb_vm_defn(self, "before", function(self, scope) {
var nil = Qnil;
var __a;
if (scope === undefined) scope = self.$Y("each");
var block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return ((__a = self.$m.before_parts(self, scope), __a.$m["<<"])(__a, block));}, 0), self.$m.alias_method(self, self.$Y("append_before"), self.$Y("before")), rb_vm_defn(self, "before_each_parts", function(self) {
var nil = Qnil;
if (self["@before_each_parts"] === undefined) self["@before_each_parts"] = nil;
var __a;
return (((__a = self["@before_each_parts"], __a.$r) ? __a : self["@before_each_parts"] = []));}, 0), rb_vm_defn(self, "before_all_parts", function(self) {
var nil = Qnil;
if (self["@before_all_parts"] === undefined) self["@before_all_parts"] = nil;
var __a;
return (((__a = self["@before_all_parts"], __a.$r) ? __a : self["@before_all_parts"] = []));}, 0), rb_vm_defn(self, "before_parts", function(self, scope) {
var nil = Qnil;
var __a;
return (((__a = scope, __a.$m["=="])(__a, self.$Y("each")).$r ? (self.$m.before_each_parts(self)) : ((__a = scope, __a.$m["=="])(__a, self.$Y("all")).$r ? (self.$m.before_all_parts(self)) : ([]))));}, 0), rb_vm_defn(self, "after", function(self, scope) {
var nil = Qnil;
var __a;
if (scope === undefined) scope = self.$Y("each");
var block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return ((__a = self.$m.after_parts(self, scope), __a.$m["<<"])(__a, block));}, 0), rb_vm_defn(self, "after_each_parts", function(self) {
var nil = Qnil;
if (self["@after_each_parts"] === undefined) self["@after_each_parts"] = nil;
var __a;
return (((__a = self["@after_each_parts"], __a.$r) ? __a : self["@after_each_parts"] = []));}, 0), rb_vm_defn(self, "after_all_parts", function(self) {
var nil = Qnil;
if (self["@after_all_parts"] === undefined) self["@after_all_parts"] = nil;
var __a;
return (((__a = self["@after_all_parts"], __a.$r) ? __a : self["@after_all_parts"] = []));}, 0), rb_vm_defn(self, "after_parts", function(self, scope) {
var nil = Qnil;
var __a;
return (((__a = scope, __a.$m["=="])(__a, self.$Y("each")).$r ? (self.$m.after_each_parts(self)) : ((__a = scope, __a.$m["=="])(__a, self.$Y("all")).$r ? (self.$m.after_all_parts(self)) : ([]))));}, 0));}, 2));}, 2));}, 2));
});
Opal.module("opalspec/example/errors", function() {
self.$M([]);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Example", function(self) {
return (rb_vm_class(self, rb_vm_cg(self, "StandardError"), "ExamplePendingError", function(self) {
return (nil);}, 0), rb_vm_class(self, rb_vm_cg(self, "ExamplePendingError"), "NotYetImplementedError", function(self) {
return (rb_vm_defn(self, "initialize", function(self) {
var nil = Qnil;
return (self["@message"] = "Not Yet Implemented");}, 0));}, 0));}, 2));}, 2));
});
Opal.module("opalspec/example/example_group", function() {
self.$M(['extend', 'include']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Example", function(self) {
return (rb_vm_class(self, nil, "ExampleGroup", function(self) {
return (self.$m.extend(self, rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExampleGroupMethods")), self.$m.include(self, rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExampleMethods")));}, 0));}, 2));}, 2));
});
Opal.module("opalspec/example/example_group_factory", function() {
self.$M(['add_example_group', 'options']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Example", function(self) {
return (rb_vm_class(self, nil, "ExampleGroupFactory", function(self) {
return (rb_vm_defn(self, "register_example_group", function(self, klass) {
var nil = Qnil;
var __a, __b;
return ((__a = (__b = rb_vm_cg(rb_vm_cg(self, "Spec"), "Runner"), __b.$m.options)(__b), __a.$m.add_example_group)(__a, klass));}, 1), rb_vm_defn(self, "create_example_group", function(self, group_name) {
var nil = Qnil;
var block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return (rb_vm_cg(self, "ExampleGroup").$B("describe", block, group_name));}, 1));}, 0));}, 2));}, 2));
});
Opal.module("opalspec/example/example_group_hierarchy", function() {
self.$M([]);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Example", function(self) {
return (rb_vm_class(self, nil, "ExampleGroupHierarchy", function(self) {
return (rb_vm_defn(self, "initialize", function(self, example_group_class) {
var nil = Qnil;
if (self["@example_group_class"] === undefined) self["@example_group_class"] = nil;
return (self["@example_group_class"]);}, 0), rb_vm_defn(self, "run_before_each", function(self, example) {
var nil = Qnil;
return (nil);}, 0));}, 0));}, 2));}, 2));
});
Opal.module("opalspec/example/example_group_methods", function() {
self.$M(['include', 'const_set', 'new', 'register_example_group', '<<', 'example_proxies', 'example_implementations', 'pending_implementation', 'alias_method', 'raise', 'puts', 'examples_to_run', 'notify', 'reporter', 'run_before_all', 'run_examples', 'run_after_all', 'execute', 'before_all_parts', 'call', 'after_all_parts', 'example_group_started']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Example", function(self) {
return (rb_vm_class(self, nil, "ExampleGroupMethods", function(self) {
return (self.$m.include(self, rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "BeforeAndAfterHooks")), rb_vm_defn(self, "describe", function(self, group_name) {
var nil = Qnil;
var group_block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return (self.$B("subclass", group_block, group_name));}, 0), rb_vm_defn(self, "subclass", function(self, group_name) {
var nil = Qnil;
if (self["@class_count"] === undefined) self["@class_count"] = nil;
var __a, klass;
var group_block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return (((__a = self["@class_count"], __a.$r) ? __a : self["@class_count"] = 0), klass = self.$m.const_set(self, ("Subclass" + (__a = self["@class_count"], __a.$m.to_s(__a))), (__a = rb_vm_cg(self, "Class"), __a.$m.new)(__a, self)), ((__a = klass), __a.$m["description="] || __a.$M("description="))(__a, group_name), (__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExampleGroupFactory"), __a.$m.register_example_group)(__a, klass), klass.$B("module_eval", group_block), klass);}, 0), rb_vm_defn(self, "example", function(self, example_name) {
var nil = Qnil;
var example_proxy, __a, __b;
var implementation = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return (example_proxy = (__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExampleProxy"), __a.$m.new)(__a, example_name), (__a = self.$m.example_proxies(self), __a.$m["<<"])(__a, example_proxy), (__a = self.$m.example_implementations(self), (__a.$m["[]="] || rb_vm_meth_m)(__a, example_proxy, ((__b = implementation, __b.$r) ? __b : self.$m.pending_implementation(self)))), example_proxy);}, 0), self.$m.alias_method(self, self.$Y("it"), self.$Y("example")), self.$m.alias_method(self, self.$Y("specify"), self.$Y("example")), rb_vm_defn(self, "description", function(self) {
var nil = Qnil;
if (self["@description"] === undefined) self["@description"] = nil;
var __a;
return (((__a = self["@description"], __a.$r) ? __a : self["@description"] = "PLACEHOLDER DESCRIPTION"));}, 0), rb_vm_defn(self, "description=", function(self, description) {
var nil = Qnil;
return (self["@description"] = description, self);}, 0), rb_vm_defn(self, "pending_implementation", function(self) {
var nil = Qnil;
var __a;
return (self.$B("proc", (__a = function(self) {
var nil = Qnil;
var __a;
return (self.$m.raise(self, (__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "NotYetImplementedError"), __a.$m.new)(__a)));}, __a.$self = self, __a)));}, 0), rb_vm_defn(self, "run", function(self, run_options) {
var nil = Qnil;
var examples, __a, success, before_all_instance_variables;
return (self.$m.puts(self, "aright, running"), examples = self.$m.examples_to_run(self, run_options), self.$m.puts(self, "notifying"), self.$m.notify(self, (__a = run_options, __a.$m.reporter)(__a)), success = Qtrue, before_all_instance_variables = nil, self.$m.run_before_all(self, run_options), self.$m.puts(self, "running"), self.$m.run_examples(self, success, before_all_instance_variables, examples, run_options), self.$m.puts(self, "finished run"), self.$m.run_after_all(self, run_options));}, 0), rb_vm_defn(self, "run_examples", function(self, success, instance_variables, examples, run_options) {
var nil = Qnil;
var __a;
return (self.$m.puts(self, "running examples"), examples.$B("each", (__a = function(self, example) {
var nil = Qnil;
var __a, example_group_instance;
return (self.$m.puts(self, self.$B("new", (__a = self.$m.example_implementations(self), __a.$m["[]"] || __a.$M("[]"))(__a, example), example)), example_group_instance = self.$B("new", (__a = self.$m.example_implementations(self), __a.$m["[]"] || __a.$M("[]"))(__a, example), example), (__a = example_group_instance, __a.$m.execute)(__a, run_options, instance_variables));}, __a.$self = self, __a)));}, 0), rb_vm_defn(self, "run_before_all", function(self, run_options) {
var nil = Qnil;
var __a;
return (self.$m.before_all_parts(self).$B("each", (__a = function(self, part) {
var nil = Qnil;
var __a;
return ((__a = part, __a.$m.call)(__a));}, __a.$self = self, __a)));}, 0), rb_vm_defn(self, "run_after_all", function(self, run_options) {
var nil = Qnil;
var __a;
return (self.$m.after_all_parts(self).$B("each", (__a = function(self, part) {
var nil = Qnil;
var __a;
return ((__a = part, __a.$m.call)(__a));}, __a.$self = self, __a)));}, 0), rb_vm_defn(self, "notify", function(self, reporter) {
var nil = Qnil;
var __a;
return ((__a = reporter, __a.$m.example_group_started)(__a, (__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExampleGroupProxy"), __a.$m.new)(__a, self)));}, 0), rb_vm_defn(self, "examples_to_run", function(self, run_options) {
var nil = Qnil;
return (self.$m.example_proxies(self));}, 0), rb_vm_defn(self, "example_proxies", function(self) {
var nil = Qnil;
if (self["@example_proxies"] === undefined) self["@example_proxies"] = nil;
var __a;
return (((__a = self["@example_proxies"], __a.$r) ? __a : self["@example_proxies"] = []));}, 0), rb_vm_defn(self, "example_implementations", function(self) {
var nil = Qnil;
if (self["@example_implementations"] === undefined) self["@example_implementations"] = nil;
var __a;
return (((__a = self["@example_implementations"], __a.$r) ? __a : self["@example_implementations"] = self.$H()), self["@example_implementations"]);}, 0), rb_vm_defn(self, "example_group_hierarchy", function(self) {
var nil = Qnil;
if (self["@example_group_hierarchy"] === undefined) self["@example_group_hierarchy"] = nil;
var __a, __b;
return (((__a = self["@example_group_hierarchy"], __a.$r) ? __a : self["@example_group_hierarchy"] = (__b = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExampleGroupHierarchy"), __b.$m.new)(__b, self)));}, 0));}, 2));}, 2));}, 2));
});
Opal.module("opalspec/example/example_group_proxy", function() {
self.$M(['attr_reader', 'description', 'example_proxies']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Example", function(self) {
return (rb_vm_class(self, nil, "ExampleGroupProxy", function(self) {
return (self.$m.attr_reader(self, self.$Y("description"), self.$Y("examples")), rb_vm_defn(self, "initialize", function(self, example_group) {
var nil = Qnil;
var __a;
return (self["@description"] = (__a = example_group, __a.$m.description)(__a), self["@examples"] = (__a = example_group, __a.$m.example_proxies)(__a));}, 0));}, 0));}, 2));}, 2));
});
Opal.module("opalspec/example/example_methods", function() {
self.$M(['run_before_each', 'example_group_hierarchy', 'class', 'description', 'example_started', 'reporter', 'puts', 'before_each_example', 'example_finished', 'update']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Example", function(self) {
return (rb_vm_class(self, nil, "ExampleMethods", function(self) {
return (rb_vm_defn(self, "initialize", function(self, example_proxy) {
var nil = Qnil;
var implementation = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return (self["@example_proxy"] = example_proxy, self["@implementation"] = implementation);}, 0), rb_vm_defn(self, "before_each_example", function(self) {
var nil = Qnil;
return (self.$m.run_before_each(self));}, 0), rb_vm_defn(self, "run_before_each", function(self) {
var nil = Qnil;
var __a;
return ((__a = self.$m.example_group_hierarchy(self), __a.$m.run_before_each)(__a, self));}, 0), rb_vm_defn(self, "example_group_hierarchy", function(self) {
var nil = Qnil;
var __a, __b;
return ((__a = (__b = self, __b.$m.class)(__b), __a.$m.example_group_hierarchy)(__a));}, 0), rb_vm_defn(self, "description", function(self) {
var nil = Qnil;
if (self["@example_proxy"] === undefined) self["@example_proxy"] = nil;
var __a;
return ((__a = self["@example_proxy"], __a.$m.description)(__a));}, 0), rb_vm_defn(self, "execute", function(self, run_options, instance_variables) {
var nil = Qnil;
if (self["@example_proxy"] === undefined) self["@example_proxy"] = nil;
if (self["@implementation"] === undefined) self["@implementation"] = nil;
var __a, __b, execution_error, e;
return ((__a = (__b = run_options, __b.$m.reporter)(__b), __a.$m.example_started)(__a, self["@example_proxy"]), execution_error = nil, self.$m.puts(self, "beginning"), (function(){try{return (self.$m.before_each_example(self), self.$B("instance_eval", self["@implementation"]), self.$m.puts(self, "done!"));}catch(__err__){if (!__err__.$klass){ __err__ = rb_vm_make_exception(__err__);}if (__err__){e = __err__;return (self.$m.puts(self, "error :("), execution_error = e);}throw __err__;}})(), self.$m.puts(self, "still got here"), (__a = (__b = run_options, __b.$m.reporter)(__b), __a.$m.example_finished)(__a, (__a = self["@example_proxy"], __a.$m.update)(__a, self.$m.description(self)), execution_error));}, 0));}, 2));}, 2));}, 2));
});
Opal.module("opalspec/example/example_proxy", function() {
self.$M(['attr_reader']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Example", function(self) {
return (rb_vm_class(self, nil, "ExampleProxy", function(self) {
return (self.$m.attr_reader(self, self.$Y("description")), rb_vm_defn(self, "initialize", function(self, description, options, location) {
var nil = Qnil;
return (self["@description"] = description);}, 0), rb_vm_defn(self, "update", function(self, description) {
var nil = Qnil;
return (self["@description"] = description, self);}, 0));}, 0));}, 2));}, 2));
});
Opal.module("opalspec/example", function() {
self.$M(['require']);
var nil = Qnil;
return (self.$m.require(self, 'opalspec/example/before_and_after_hooks'), self.$m.require(self, 'opalspec/example/example_group_proxy'), self.$m.require(self, 'opalspec/example/example_proxy'), self.$m.require(self, 'opalspec/example/example_group_methods'), self.$m.require(self, 'opalspec/example/example_group_factory'), self.$m.require(self, 'opalspec/example/example_group_hierarchy'), self.$m.require(self, 'opalspec/example/example_methods'), self.$m.require(self, 'opalspec/example/example_group'), self.$m.require(self, 'opalspec/example/errors'));
});
Opal.module("opalspec/expectations/errors", function() {
self.$M([]);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Expectations", function(self) {
return (rb_vm_class(self, rb_vm_cg(self, "StandardError"), "ExpectationNotMetError", function(self) {
return (nil);}, 0));}, 2));}, 2));
});
Opal.module("opalspec/expectations/fail_with", function() {
self.$M(['raise', 'new']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Expectations", function(self) {
return (rb_vm_defn(self, "fail_with", function(self, message, expected, target) {
var nil = Qnil;
var __a;
return (self.$m.raise(self, (__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Expectations"), "ExpectationNotMetError"), __a.$m.new)(__a, message)));}, 1));}, 2));}, 2));
});
Opal.module("opalspec/expectations/handler", function() {
self.$M(['nil?', 'new']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Expectations", function(self) {
return (rb_vm_class(self, nil, "PositiveExpectationHandler", function(self) {
return (rb_vm_defn(self, "handle_matcher", function(self, actual, matcher, message) {
var nil = Qnil;
var __a;
var block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;try {
var __vm_jump_function__ = arguments.callee;return (((__a = rb_vm_cg(rb_vm_cg(self, "Spec"), "Matchers")), __a.$m["last_should="] || __a.$M("last_should="))(__a, self.$Y("should")), ((__a = rb_vm_cg(rb_vm_cg(self, "Spec"), "Matchers")), __a.$m["last_matcher="] || __a.$M("last_matcher="))(__a, matcher), ((__a = matcher, __a.$m["nil?"])(__a).$r ? (rb_vm_block_return((__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Matchers"), "PositiveOperatorMatcher"), __a.$m.new)(__a, actual), __vm_jump_function__)) : nil));} catch(__err__) {
if (__err__.$keyword == 0 && __err__["@jump_function"] == __vm_jump_function__) {
return __err__['@exit_value'];
}throw __err__;}}, 1));}, 0), rb_vm_class(self, nil, "NegativeExpectationHandler", function(self) {
return (rb_vm_defn(self, "handle_matcher", function(self, actual, matcher, message) {
var nil = Qnil;
var __a;
var block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;try {
var __vm_jump_function__ = arguments.callee;return (((__a = rb_vm_cg(rb_vm_cg(self, "Spec"), "Matchers")), __a.$m["last_should="] || __a.$M("last_should="))(__a, self.$Y("should_not")), ((__a = rb_vm_cg(rb_vm_cg(self, "Spec"), "Matchers")), __a.$m["last_matcher="] || __a.$M("last_matcher="))(__a, matcher), ((__a = matcher, __a.$m["nil?"])(__a).$r ? (rb_vm_block_return((__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Matchers"), "NegativeOperatorMatcher"), __a.$m.new)(__a, actual), __vm_jump_function__)) : nil));} catch(__err__) {
if (__err__.$keyword == 0 && __err__["@jump_function"] == __vm_jump_function__) {
return __err__['@exit_value'];
}throw __err__;}}, 1));}, 0));}, 2));}, 2));
});
Opal.module("opalspec/expectations", function() {
self.$M(['require', 'handle_matcher']);
var nil = Qnil;
return (self.$m.require(self, 'opalspec/expectations/fail_with'), self.$m.require(self, 'opalspec/expectations/handler'), self.$m.require(self, 'opalspec/expectations/errors'), rb_vm_class(self, nil, "Kernel", function(self) {
return (rb_vm_defn(self, "should", function(self, matcher, message) {
var nil = Qnil;
var r, __a;
if (matcher === undefined) matcher = nil;
if (message === undefined) message = nil;
var block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return (r = (__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Expectations"), "PositiveExpectationHandler"), __a.$m.handle_matcher)(__a, self, matcher, message));}, 0), rb_vm_defn(self, "should_not", function(self, matcher, message) {
var nil = Qnil;
var __a;
if (matcher === undefined) matcher = nil;
if (message === undefined) message = nil;
var block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return ((__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Expectations"), "NegativeExpectationHandler"), __a.$m.handle_matcher)(__a, self, matcher, message));}, 0));}, 2));
});
Opal.module("opalspec/matchers/be", function() {
self.$M([]);
var nil = Qnil;
return (nil);
});
Opal.module("opalspec/matchers/generated_descriptions", function() {
self.$M([]);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Matchers", function(self) {
return (rb_vm_defn(self, "last_matcher", function(self) {
var nil = Qnil;
if (self["@last_matcher"] === undefined) self["@last_matcher"] = nil;
return (self["@last_matcher"]);}, 1), rb_vm_defn(self, "last_matcher=", function(self, last_matcher) {
var nil = Qnil;
return (self["@last_matcher"] = last_matcher);}, 1), rb_vm_defn(self, "last_should", function(self) {
var nil = Qnil;
if (self["@last_should"] === undefined) self["@last_should"] = nil;
return (self["@last_should"]);}, 1), rb_vm_defn(self, "last_should=", function(self, last_should) {
var nil = Qnil;
return (self["@last_should"] = last_should);}, 1));}, 2));}, 2));
});
Opal.module("opalspec/matchers/operator_matcher", function() {
self.$M(['eval_match', '__delegate_operator', 'fail_with', '__send__', 'fail_with_message', 'inspect']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Matchers", function(self) {
return (rb_vm_class(self, nil, "OperatorMatcher", function(self) {
return (rb_vm_defn(self, "initialize", function(self, actual) {
var nil = Qnil;
return (self["@actual"] = actual);}, 0), [self.$Y("=="), self.$Y("==="), self.$Y("=~"), self.$Y(">"), self.$Y("<"), self.$Y(">="), self.$Y("<=")].$B("each", (__a = function(self, op) {
var nil = Qnil;
var __a;
return (self.$B("define_method", (__a = function(self, exp) {
var nil = Qnil;
if (self["@actual"] === undefined) self["@actual"] = nil;
return (self.$m.eval_match(self, self["@actual"], op, exp));}, __a.$self = self, __a), op));}, __a.$self = self, __a)), rb_vm_defn(self, "eval_match", function(self, actual, operator, expected) {
var nil = Qnil;
return (self["@operator"] = operator, self["@expected"] = expected, self.$m.__delegate_operator(self, actual, operator, expected));}, 0), rb_vm_defn(self, "fail_with_message", function(self, message) {
var nil = Qnil;
if (self["@expected"] === undefined) self["@expected"] = nil;
if (self["@actual"] === undefined) self["@actual"] = nil;
var __a;
return ((__a = rb_vm_cg(rb_vm_cg(self, "Spec"), "Expectations"), __a.$m.fail_with)(__a, message, self["@expected"], self["@actual"]));}, 0));}, 0), rb_vm_class(self, rb_vm_cg(self, "OperatorMatcher"), "PositiveOperatorMatcher", function(self) {
return (rb_vm_defn(self, "__delegate_operator", function(self, actual, operator, expected) {
var nil = Qnil;
var __a, __b;
return (((__a = actual, __a.$m.__send__)(__a, operator, expected).$r ? (Qtrue) : (self.$m.fail_with_message(self, ("expected: " + (__a = (__b = expected, __b.$m.inspect)(__b), __a.$m.to_s(__a)) + ", but got: " + (__a = (__b = actual, __b.$m.inspect)(__b), __a.$m.to_s(__a)) + " (using " + (__a = operator, __a.$m.to_s(__a)) + ")")))));}, 0));}, 0), rb_vm_class(self, rb_vm_cg(self, "OperatorMatcher"), "NegativeOperatorMatcher", function(self) {
return (rb_vm_defn(self, "__delegate_operator", function(self, actual, operator, expected) {
var nil = Qnil;
var __a, __b;
return (((__a = actual, __a.$m.__send__)(__a, operator, expected).$r ? (self.$m.fail_with_message(self, ("expected not: " + (__a = (__b = expected, __b.$m.inspect)(__b), __a.$m.to_s(__a)) + ", and got: " + (__a = (__b = actual, __b.$m.inspect)(__b), __a.$m.to_s(__a)) + " (using " + (__a = operator, __a.$m.to_s(__a)) + ")"))) : (Qtrue)));}, 0));}, 0));}, 2));}, 2));
});
Opal.module("opalspec/matchers", function() {
self.$M(['require']);
var nil = Qnil;
return (self.$m.require(self, 'opalspec/matchers/operator_matcher'), self.$m.require(self, 'opalspec/matchers/be'), self.$m.require(self, 'opalspec/matchers/generated_descriptions'), rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Matchers", function(self) {
return (rb_vm_class(self, nil, "Matcher", function(self) {
return (rb_vm_defn(self, "initialize", function(self, name, expected) {
var nil = Qnil;
var declarations = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return (self["@name"] = name, self["@expected"] = expected, self.$B("instance_exec", declarations, expected));}, 0));}, 0));}, 2));}, 2));
});
Opal.module("opalspec/runner/example_group_runner", function() {
self.$M(['prepare', 'puts', 'example_groups', 'run', 'finish', 'reporter', 'start', 'number_of_examples']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Runner", function(self) {
return (rb_vm_class(self, nil, "ExampleGroupRunner", function(self) {
return (rb_vm_defn(self, "initialize", function(self, options) {
var nil = Qnil;
return (self["@options"] = options);}, 0), rb_vm_defn(self, "run", function(self) {
var nil = Qnil;
var __a;
return (self.$m.prepare(self), self.$m.puts(self, "RUNNING"), self.$m.example_groups(self).$B("each", (__a = function(self, group) {
var nil = Qnil;
if (self["@options"] === undefined) self["@options"] = nil;
var __a;
return (self.$m.puts(self, "running group!"), (__a = group, __a.$m.run)(__a, self["@options"]));}, __a.$self = self, __a)), self.$m.finish(self));}, 0), rb_vm_defn(self, "example_groups", function(self) {
var nil = Qnil;
if (self["@options"] === undefined) self["@options"] = nil;
var __a;
return ((__a = self["@options"], __a.$m.example_groups)(__a));}, 0), rb_vm_defn(self, "prepare", function(self) {
var nil = Qnil;
var rep, __a;
return (rep = self.$m.reporter(self), (__a = rep, __a.$m.start)(__a, self.$m.number_of_examples(self)));}, 0), rb_vm_defn(self, "finish", function(self) {
var nil = Qnil;
return (nil);}, 0), rb_vm_defn(self, "reporter", function(self) {
var nil = Qnil;
if (self["@options"] === undefined) self["@options"] = nil;
var __a;
return ((__a = self["@options"], __a.$m.reporter)(__a));}, 0), rb_vm_defn(self, "number_of_examples", function(self) {
var nil = Qnil;
return (0);}, 0));}, 0));}, 2));}, 2));
});
Opal.module("opalspec/runner/formatter/html_formatter", function() {
self.$M(['attr_reader', 'setup_page_dom', 'join', 'puts', 'now', 'from_native', 'div', 'results_output', 'dl', 'dt', 'description', 'example_group_number', 'dd', 'span', 'pre', 'message', 'exception']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Runner", function(self) {
return (rb_vm_class(self, nil, "Formatter", function(self) {
return (rb_vm_class(self, nil, "HtmlFormatter", function(self) {
return (self.$m.attr_reader(self, self.$Y("example_group"), self.$Y("example_group_number")), rb_vm_defn(self, "initialize", function(self, options) {
var nil = Qnil;
return (self["@options"] = options, self["@example_group_number"] = 0, self["@example_number"] = 0, self["@header_red"] = nil, self.$m.setup_page_dom(self));}, 0), rb_vm_defn(self, "setup_page_dom", function(self) {
var nil = Qnil;
var content, __a;
return (content = (__a = ['<div class="rspec-report">', '<div id="rspec-header">', '<div id="label">', '<h1>Rspec Code Examples</h1>', '<div>', '<div id="summary">', '<p id="totals">0</p>', '<p id="duration">0</p>', '</div>', '</div>', '<div id="results">', '</div>', '</div>'], __a.$m.join)(__a, ""), self.$m.puts(self, "content is: "), self.$m.puts(self, content));}, 0), rb_vm_defn(self, "start", function(self, number_of_examples) {
var nil = Qnil;
return (nil);}, 0), rb_vm_defn(self, "end", function(self) {
var nil = Qnil;
var __a;
return (self["@end_time"] = (__a = rb_vm_cg(self, "Time"), __a.$m.now)(__a));}, 0), rb_vm_defn(self, "results_output", function(self) {
var nil = Qnil;
if (self["@results_output"] === undefined) self["@results_output"] = nil;
var __a, __b;
return (((__a = self["@results_output"], __a.$r) ? __a : self["@results_output"] = (__b = rb_vm_cg(rb_vm_cg(self, "Browser"), "Element"), __b.$m.from_native)(__b, document.getElementById('results'))));}, 0), rb_vm_defn(self, "example_group_started", function(self, example_group) {
var nil = Qnil;
if (self["@example_group_div"] === undefined) self["@example_group_div"] = nil;
if (self["@example_group_dl"] === undefined) self["@example_group_dl"] = nil;
var __a;
return (self["@example_group"] = example_group, self["@example_group_red"] = Qfalse, self["@example_group_div"] = (__a = self.$m.results_output(self), __a.$m.div)(__a, opalhash(self.$Y("class_name"), "example_group")), self["@example_group_dl"] = (__a = self["@example_group_div"], __a.$m.dl)(__a), self["@example_group_dt"] = (__a = self["@example_group_dl"], __a.$m.dt)(__a, opalhash(self.$Y("content"), (__a = example_group, __a.$m.description)(__a), self.$Y("id"), ("example_group_" + (__a = self.$m.example_group_number(self), __a.$m.to_s(__a))))));}, 0), rb_vm_defn(self, "example_started", function(self, example) {
var nil = Qnil;
return (nil);}, 0), rb_vm_defn(self, "example_failed", function(self, example, counter, failure) {
var nil = Qnil;
if (self["@example_group_dl"] === undefined) self["@example_group_dl"] = nil;
var dd, __a, failure_div, __b;
return (self["@header_red"] = Qtrue, self["@example_group_red"] = Qtrue, dd = (__a = self["@example_group_dl"], __a.$m.dd)(__a, opalhash(self.$Y("class_name"), "spec failed")), (__a = dd, __a.$m.span)(__a, opalhash(self.$Y("content"), (__a = example, __a.$m.description)(__a), self.$Y("class_name"), "failed_spec_name")), failure_div = (__a = dd, __a.$m.div)(__a, opalhash(self.$Y("class_name"), "failure")), (__a = (__b = failure_div, __b.$m.div)(__b, opalhash(self.$Y("class_name"), "message")), __a.$m.pre)(__a, opalhash(self.$Y("content"), (__a = (__b = failure, __b.$m.exception)(__b), __a.$m.message)(__a))));}, 0), rb_vm_defn(self, "example_passed", function(self, example) {
var nil = Qnil;
if (self["@example_group_dl"] === undefined) self["@example_group_dl"] = nil;
var __a, __b;
return ((__a = (__b = self["@example_group_dl"], __b.$m.dd)(__b, opalhash(self.$Y("class_name"), "spec passed")), __a.$m.span)(__a, opalhash(self.$Y("content"), (__a = example, __a.$m.description)(__a), self.$Y("class_name"), "passed_spec_name")));}, 0), rb_vm_defn(self, "example_pending", function(self, example, message) {
var nil = Qnil;
if (self["@example_group_dl"] === undefined) self["@example_group_dl"] = nil;
var __a, __b;
return ((__a = (__b = self["@example_group_dl"], __b.$m.dd)(__b, opalhash(self.$Y("class_name"), "spec not_implemented")), __a.$m.span)(__a, opalhash(self.$Y("content"), ((__a = (__b = example, __b.$m.description)(__b), __a.$m.to_s(__a)) + " (PENDING: " + (__a = message, __a.$m.to_s(__a)) + ")"), self.$Y("class_name"), "not_implemented_spec_name")));}, 0));}, 0));}, 2));}, 2));}, 2));
});
Opal.module("opalspec/runner/formatter/terminal_formatter", function() {
self.$M(['attr_reader', '+', 'puts', 'description', 'message', 'exception']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Runner", function(self) {
return (rb_vm_class(self, nil, "Formatter", function(self) {
return (rb_vm_class(self, nil, "TerminalFormatter", function(self) {
return (self.$m.attr_reader(self, self.$Y("example_group"), self.$Y("example_group_number")), rb_vm_defn(self, "initialize", function(self, options) {
var nil = Qnil;
return (self["@options"] = options, self["@example_group_number"] = 0, self["@example_number"] = 0);}, 0), rb_vm_defn(self, "start", function(self, number_of_examples) {
var nil = Qnil;
return (nil);}, 0), rb_vm_defn(self, "end", function(self) {
var nil = Qnil;
return (nil);}, 0), rb_vm_defn(self, "example_group_started", function(self, example_group) {
var nil = Qnil;
return (self["@example_group"] = example_group);}, 0), rb_vm_defn(self, "example_started", function(self, example) {
var nil = Qnil;
if (self["@example_number"] === undefined) self["@example_number"] = nil;
var __a;
return (self["@example_number"] = (__a = self["@example_number"], __a.$m["+"])(__a, 1));}, 0), rb_vm_defn(self, "example_failed", function(self, example, counter, failure) {
var nil = Qnil;
if (self["@example_group"] === undefined) self["@example_group"] = nil;
var __a, __b, __c;
return (self.$m.puts(self, ("\033[0;31m" + (__a = (__b = self["@example_group"], __b.$m.description)(__b), __a.$m.to_s(__a)) + ": " + (__a = (__b = example, __b.$m.description)(__b), __a.$m.to_s(__a)) + "\033[m")), self.$m.puts(self, ""), self.$m.puts(self, ("  " + (__a = (__b = (__c = failure, __c.$m.exception)(__c), __b.$m.message)(__b), __a.$m.to_s(__a)))), self.$m.puts(self, ""));}, 0), rb_vm_defn(self, "example_passed", function(self, example) {
var nil = Qnil;
if (self["@example_group"] === undefined) self["@example_group"] = nil;
var __a, __b;
return (self.$m.puts(self, ("\033[0;32m" + (__a = (__b = self["@example_group"], __b.$m.description)(__b), __a.$m.to_s(__a)) + ": " + (__a = (__b = example, __b.$m.description)(__b), __a.$m.to_s(__a)) + "\033[m")));}, 0), rb_vm_defn(self, "example_pending", function(self, example, message) {
var nil = Qnil;
if (self["@example_group"] === undefined) self["@example_group"] = nil;
var __a, __b;
return (self.$m.puts(self, ("\033[0;33m" + (__a = (__b = self["@example_group"], __b.$m.description)(__b), __a.$m.to_s(__a)) + ": " + (__a = (__b = example, __b.$m.description)(__b), __a.$m.to_s(__a)) + "\033[m")));}, 0));}, 0));}, 2));}, 2));}, 2));
});
Opal.module("opalspec/runner/options", function() {
self.$M(['attr_accessor', 'attr_writer', 'new', 'run', '==', '<<']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Runner", function(self) {
return (rb_vm_class(self, nil, "Options", function(self) {
return (self.$m.attr_accessor(self, self.$Y("reporter"), self.$Y("example_groups")), self.$m.attr_writer(self, self.$Y("reporter")), rb_vm_defn(self, "initialize", function(self) {
var nil = Qnil;
var __a;
return (self["@example_groups"] = [], self["@reporter"] = (__a = rb_vm_cg(self, "Reporter"), __a.$m.new)(__a, self));}, 0), rb_vm_defn(self, "run_examples", function(self) {
var nil = Qnil;
var runner, __a;
return (runner = (__a = rb_vm_cg(self, "ExampleGroupRunner"), __a.$m.new)(__a, self), (__a = runner, __a.$m.run)(__a));}, 0), rb_vm_defn(self, "formatters", function(self) {
var nil = Qnil;
if (self["@formatters"] === undefined) self["@formatters"] = nil;
var __a, __b;
try {
var __vm_jump_function__ = arguments.callee;return (((self["@formatters"].$r) ? rb_vm_block_return(self["@formatters"], __vm_jump_function__):nil), ((__a = rb_vm_cg(self, "RUBY_PLATFORM"), __a.$m["=="])(__a, "browser").$r ? (((__a = self["@formatters"], __a.$r) ? __a : self["@formatters"] = [(__b = rb_vm_cg(rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Runner"), "Formatter"), "HtmlFormatter"), __b.$m.new)(__b, self)])) : (((__a = self["@formatters"], __a.$r) ? __a : self["@formatters"] = [(__b = rb_vm_cg(rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Runner"), "Formatter"), "TerminalFormatter"), __b.$m.new)(__b, self)]))));} catch(__err__) {
if (__err__.$keyword == 0 && __err__["@jump_function"] == __vm_jump_function__) {
return __err__['@exit_value'];
}throw __err__;}}, 0), rb_vm_defn(self, "add_example_group", function(self, example_group) {
var nil = Qnil;
if (self["@example_groups"] === undefined) self["@example_groups"] = nil;
var __a;
return ((__a = self["@example_groups"], __a.$m["<<"])(__a, example_group));}, 0));}, 0));}, 2));}, 2));
});
Opal.module("opalspec/runner/reporter", function() {
self.$M(['attr_reader', 'formatters', 'start', 'example_group_started', 'example_started', 'puts', 'nil?', 'example_passed', '===', 'example_pending', 'message', 'example_failed', 'new', 'description', '<<', 'length']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Runner", function(self) {
return (rb_vm_class(self, nil, "Reporter", function(self) {
return (self.$m.attr_reader(self, self.$Y("options")), rb_vm_defn(self, "initialize", function(self, options) {
var nil = Qnil;
if (self["@options"] === undefined) self["@options"] = nil;
var __a;
return (self["@options"] = options, ((__a = self["@options"]), __a.$m["reporter="] || __a.$M("reporter="))(__a, self), self["@failures"] = [], self["@pending_count"] = 0, self["@example_count"] = 0);}, 0), rb_vm_defn(self, "start", function(self, number_of_examples) {
var nil = Qnil;
var __a;
return (self["@start_time"] = 0, self.$m.formatters(self).$B("each", (__a = function(self, f) {
var nil = Qnil;
var __a;
return ((__a = f, __a.$m.start)(__a, number_of_examples));}, __a.$self = self, __a)));}, 0), rb_vm_defn(self, "formatters", function(self) {
var nil = Qnil;
if (self["@options"] === undefined) self["@options"] = nil;
var __a;
return ((__a = self["@options"], __a.$m.formatters)(__a));}, 0), rb_vm_defn(self, "example_group_started", function(self, example_group) {
var nil = Qnil;
var __a;
return (self["@example_group"] = example_group, self.$m.formatters(self).$B("each", (__a = function(self, f) {
var nil = Qnil;
var __a;
return ((__a = f, __a.$m.example_group_started)(__a, example_group));}, __a.$self = self, __a)));}, 0), rb_vm_defn(self, "example_started", function(self, example) {
var nil = Qnil;
var __a;
return (self.$m.formatters(self).$B("each", (__a = function(self, f) {
var nil = Qnil;
var __a;
return ((__a = f, __a.$m.example_started)(__a, example));}, __a.$self = self, __a)));}, 0), rb_vm_defn(self, "example_finished", function(self, example, error) {
var nil = Qnil;
var __a;
return (self.$m.puts(self, "== example finished"), ((__a = error, __a.$m["nil?"])(__a).$r ? (self.$m.example_passed(self, example)) : ((__a = rb_vm_cg(rb_vm_cg(rb_vm_cg(self, "Spec"), "Example"), "ExamplePendingError"), __a.$m["==="])(__a, error).$r ? (self.$m.example_pending(self, example, (__a = error, __a.$m.message)(__a))) : (self.$m.example_failed(self, example, error)))));}, 0), rb_vm_defn(self, "example_failed", function(self, example, error) {
var nil = Qnil;
if (self["@example_group"] === undefined) self["@example_group"] = nil;
if (self["@failures"] === undefined) self["@failures"] = nil;
var failure, __a;
return (failure = (__a = rb_vm_cg(self, "Failure"), __a.$m.new)(__a, (__a = self["@example_group"], __a.$m.description)(__a), (__a = example, __a.$m.description)(__a), error), (__a = self["@failures"], __a.$m["<<"])(__a, failure), self.$m.formatters(self).$B("each", (__a = function(self, f) {
var nil = Qnil;
if (self["@failures"] === undefined) self["@failures"] = nil;
var __a;
return ((__a = f, __a.$m.example_failed)(__a, example, (__a = self["@failures"], __a.$m.length)(__a), failure));}, __a.$self = self, __a)));}, 0), rb_vm_defn(self, "example_passed", function(self, example) {
var nil = Qnil;
var __a;
return (self.$m.formatters(self).$B("each", (__a = function(self, f) {
var nil = Qnil;
var __a;
return ((__a = f, __a.$m.example_passed)(__a, example));}, __a.$self = self, __a)));}, 0), rb_vm_defn(self, "example_pending", function(self, example, message) {
var nil = Qnil;
var __a;
return (self.$m.formatters(self).$B("each", (__a = function(self, f) {
var nil = Qnil;
var __a;
return ((__a = f, __a.$m.example_pending)(__a, example, message));}, __a.$self = self, __a)));}, 0));}, 0), rb_vm_class(self, nil, "Failure", function(self) {
return (self.$m.attr_reader(self, self.$Y("exception")), rb_vm_defn(self, "initialize", function(self, group_description, example_description, exception) {
var nil = Qnil;
var __a;
return (self["@example_name"] = ((__a = group_description, __a.$m.to_s(__a)) + " " + (__a = example_description, __a.$m.to_s(__a))), self["@exception"] = exception);}, 0));}, 0));}, 2));}, 2));
});
Opal.module("opalspec/runner", function() {
self.$M(['require', 'run_examples', 'options', 'new', '==', 'length', 'puts', 'exists?', 'expand_path', 'raise', 'run']);
var nil = Qnil;
return (self.$m.require(self, 'opalspec/runner/options'), self.$m.require(self, 'opalspec/runner/reporter'), self.$m.require(self, 'opalspec/runner/example_group_runner'), self.$m.require(self, 'opalspec/runner/formatter/html_formatter'), self.$m.require(self, 'opalspec/runner/formatter/terminal_formatter'), rb_vm_class(self, nil, "Spec", function(self) {
return (rb_vm_class(self, nil, "Runner", function(self) {
return (rb_vm_defn(self, "run", function(self) {
var nil = Qnil;
var __a;
return ((__a = self.$m.options(self), __a.$m.run_examples)(__a));}, 1), rb_vm_defn(self, "options", function(self) {
var nil = Qnil;
if (self["@options"] === undefined) self["@options"] = nil;
var __a, __b;
return (((__a = self["@options"], __a.$r) ? __a : self["@options"] = (__b = rb_vm_cg(self, "Options"), __b.$m.new)(__b)), self["@options"]);}, 1), rb_vm_defn(self, "autorun", function(self) {
var nil = Qnil;
var __a, __b;
try {
var __vm_jump_function__ = arguments.callee;return (((__a = (__b = rb_vm_cg(self, "ARGV"), __b.$m.length)(__b), __a.$m["=="])(__a, 0).$r ? (self.$m.puts(self, "Spec: no input files given"), rb_vm_block_return(nil, __vm_jump_function__)) : nil), rb_vm_cg(self, "ARGV").$B("each", (__a = function(self, spec) {
var nil = Qnil;
var __a;
return (((__a = rb_vm_cg(self, "File"), __a.$m["exists?"])(__a, spec).$r ? (self.$m.require(self, (__a = rb_vm_cg(self, "File"), __a.$m.expand_path)(__a, spec))) : (self.$m.raise(self, ("Bad spec to load (does not exist): " + (__a = spec, __a.$m.to_s(__a)))))));}, __a.$self = self, __a)), (__a = rb_vm_cg(rb_vm_cg(self, "Spec"), "Runner"), __a.$m.run)(__a));} catch(__err__) {
if (__err__.$keyword == 0 && __err__["@jump_function"] == __vm_jump_function__) {
return __err__['@exit_value'];
}throw __err__;}}, 1));}, 2));}, 2));
});
Opal.module("opalspec", function() {
self.$M(['require']);
var nil = Qnil;
return (self.$m.require(self, 'opalspec/matchers'), self.$m.require(self, 'opalspec/expectations'), self.$m.require(self, 'opalspec/example'), self.$m.require(self, 'opalspec/runner'), self.$m.require(self, 'opalspec/dsl'));
});
