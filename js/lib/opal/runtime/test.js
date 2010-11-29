var self = rb_top_self;
var nil = rb_nil;
return (rb_vm_class(self, nil, "EqualElementMatcher",
function(self) {
    return (rb_vm_defn(self, "initialize",
    function(self, __block__, element, attributes, content, options) {
        var nil = rb_nil;
        if (attributes === undefined) attributes = nil;
        if (content === undefined) content = nil;
        if (options === undefined) options = opalhash();
        return (self["@element"] = element, self["@attributes"] = attributes, self["@content"] = content, self["@options"] = options);
    },
    0), rb_vm_defn(self, "matches?",
    function(self, __block__, actual) {
        var nil = rb_nil;
        if (self["@options"] === undefined) self["@options"] = nil;
        if (self["@element"] === undefined) self["@element"] = nil;
        if (self["@content"] === undefined) self["@content"] = nil;
        if (self["@attributes"] === undefined) self["@attributes"] = nil;
        var matched,
        __a,
        __b,
        __c,
        __d;
        return (self["@actual"] = actual, matched = rb_true, ((__a = self["@options"], __a.$m["$[]"] || rb_vm_meth_m("[]"))(__a, nil, opalsym("not_closed")).$r ? (((__a = matched, __a.$r) ? matched = (__b = actual, __b.$m["$=~"] || rb_vm_meth_m("=~"))(__b, nil, (new RegExp(('^' + (__b = (__c = rb_vm_cg(self, "Regexp"), __c.$m.$quote || rb_vm_meth_m("quote"))(__c, nil, (__c = "<", __c.$m["$+"] || rb_vm_meth_m("+"))(__c, nil, self["@element"])), __b.$m.$to_s(__b)) + '.*' + (__b = (__c = rb_vm_cg(self, "Regexp"), __c.$m.$quote || rb_vm_meth_m("quote"))(__c, nil, (__c = ">", __c.$m["$+"] || rb_vm_meth_m("+"))(__c, nil, (((__c = self["@content"], __c.$r) ? __c: "")))), __b.$m.$to_s(__b)) + '$'), ""))) : __a)) : (((__a = matched, __a.$r) ? matched = (__b = actual, __b.$m["$=~"] || rb_vm_meth_m("=~"))(__b, nil, (new RegExp(('^' + (__b = (__c = rb_vm_cg(self, "Regexp"), __c.$m.$quote || rb_vm_meth_m("quote"))(__c, nil, (__c = "<", __c.$m["$+"] || rb_vm_meth_m("+"))(__c, nil, self["@element"])), __b.$m.$to_s(__b))), ""))) : __a), ((__a = matched, __a.$r) ? matched = (__b = actual, __b.$m["$=~"] || rb_vm_meth_m("=~"))(__b, nil, (new RegExp(((__b = (__c = rb_vm_cg(self, "Regexp"), __c.$m.$quote || rb_vm_meth_m("quote"))(__c, nil, (__c = (__d = "</", __d.$m["$+"] || rb_vm_meth_m("+"))(__d, nil, self["@element"]), __c.$m["$+"] || rb_vm_meth_m("+"))(__c, nil, ">")), __b.$m.$to_s(__b)) + '$'), ""))) : __a), (self["@content"].$r ? ((__a = matched, __a.$r) ? matched = (__b = actual, __b.$m["$=~"] || rb_vm_meth_m("=~"))(__b, nil, (new RegExp((__b = (__c = rb_vm_cg(self, "Regexp"), __c.$m.$quote || rb_vm_meth_m("quote"))(__c, nil, (__c = (__d = ">", __d.$m["$+"] || rb_vm_meth_m("+"))(__d, nil, self["@content"]), __c.$m["$+"] || rb_vm_meth_m("+"))(__c, nil, "</")), __b.$m.$to_s(__b)), ""))) : __a) : nil))), (self["@attributes"].$r ? (((__a = self["@attributes"], __a.$m["$empty?"] || rb_vm_meth_m("empty?"))(__a, nil).$r ? (((__a = matched, __a.$r) ? matched = (__b = (__c = (__d = actual, __d.$m.$scan || rb_vm_meth_m("scan"))(__d, nil, (new RegExp(('\w+' + '\=' + '\\"(.*)' + '\\"'), ""))), __c.$m.$size || rb_vm_meth_m("size"))(__c, nil), __b.$m["$=="] || rb_vm_meth_m("=="))(__b, nil, 0) : __a)) : ((__a = self["@attributes"], __a.$m.$each || rb_vm_meth_m("each"))(__a, (__a = function(self, __block__, key, value) {
            var nil = rb_nil;
            var __a,
            __b,
            __c,
            __d,
            __e;
            return (((__a = value, __a.$m["$=="] || rb_vm_meth_m("=="))(__a, nil, rb_true).$r ? (((__a = matched, __a.$r) ? matched = ((__b = (__c = (__d = actual, __d.$m.$scan || rb_vm_meth_m("scan"))(__d, nil, (new RegExp(((__d = (__e = rb_vm_cg(self, "Regexp"), __e.$m.$quote || rb_vm_meth_m("quote"))(__e, nil, key), __d.$m.$to_s(__d)) + '(' + '\s|>)'), ""))), __c.$m.$size || rb_vm_meth_m("size"))(__c, nil), __b.$m["$=="] || rb_vm_meth_m("=="))(__b, nil, 1)) : __a)) : (((__a = matched, __a.$r) ? matched = ((__b = (__c = (__d = actual, __d.$m.$scan || rb_vm_meth_m("scan"))(__d, nil, (" " + (__d = key, __d.$m.$to_s(__d)) + "="" + (__d = value, __d.$m.$to_s(__d)) + """)), __c.$m.$size || rb_vm_meth_m("size"))(__c, nil), __b.$m["$=="] || rb_vm_meth_m("=="))(__b, nil, 1)) : __a))));
        },
        __a.__self__ = self, __a))))) : nil), (__a = (__b = matched, __b.$m["$!"] || rb_vm_meth_m("!"))(__b, nil), __a.$m["$!"] || rb_vm_meth_m("!"))(__a, nil));
    },
    0), rb_vm_defn(self, "failure_message",
    function(self, __block__) {
        var nil = rb_nil;
        if (self["@actual"] === undefined) self["@actual"] = nil;
        if (self["@element"] === undefined) self["@element"] = nil;
        var __a,
        __b;
        return ([("Expected " + (__a = (__b = self["@actual"], __b.$m.$pretty_inspect || rb_vm_meth_m("pretty_inspect"))(__b, nil), __a.$m.$to_s(__a))), ("to be a '" + (__a = self["@element"], __a.$m.$to_s(__a)) + "' element with " + (__a = (self.$m.$attributes_for_failure_message || rb_vm_meth_m("attributes_for_failure_message"))(self, nil), __a.$m.$to_s(__a)) + " and " + (__a = (self.$m.$content_for_failure_message || rb_vm_meth_m("content_for_failure_message"))(self, nil), __a.$m.$to_s(__a)))]);
    },
    0), rb_vm_defn(self, "negative_failure_message",
    function(self, __block__) {
        var nil = rb_nil;
        if (self["@actual"] === undefined) self["@actual"] = nil;
        if (self["@element"] === undefined) self["@element"] = nil;
        var __a,
        __b;
        return ([("Expected " + (__a = (__b = self["@actual"], __b.$m.$pretty_inspect || rb_vm_meth_m("pretty_inspect"))(__b, nil), __a.$m.$to_s(__a))), ("not to be a '" + (__a = self["@element"], __a.$m.$to_s(__a)) + "' element with " + (__a = (self.$m.$attributes_for_failure_message || rb_vm_meth_m("attributes_for_failure_message"))(self, nil), __a.$m.$to_s(__a)) + " and " + (__a = (self.$m.$content_for_failure_message || rb_vm_meth_m("content_for_failure_message"))(self, nil), __a.$m.$to_s(__a)))]);
    },
    0), rb_vm_defn(self, "attributes_for_failure_message",
    function(self, __block__) {
        var nil = rb_nil;
        if (self["@attributes"] === undefined) self["@attributes"] = nil;
        var __a,
        __b;
        return ((self["@attributes"].$r ? (((__a = self["@attributes"], __a.$m["$empty?"] || rb_vm_meth_m("empty?"))(__a, nil).$r ? ("no attributes") : ((__a = (__b = self["@attributes"], __b.$m.$inject || rb_vm_meth_m("inject"))(__b, (__b = function(self, __block__, memo, n) {
            var nil = rb_nil;
            var __a,
            __b;
            return ((__a = memo, __a.$m["$<<"] || rb_vm_meth_m("<<"))(__a, nil, ((__a = (__b = n, __b.$m["$[]"] || rb_vm_meth_m("[]"))(__b, nil, 0), __a.$m.$to_s(__a)) + "="" + (__a = (__b = n, __b.$m["$[]"] || rb_vm_meth_m(" []"))(__b, nil, 1), __a.$m.$to_s(__a)) + """)));
        },
        __b.__self__ = self, __b), []), __a.$m.$join || rb_vm_meth_m("join"))(__a, nil, " ")))) : ("any attributes")));
    },
    0), rb_vm_defn(self, "content_for_failure_message",
    function(self, __block__) {
        var nil = rb_nil;
        if (self["@content"] === undefined) self["@content"] = nil;
        var __a,
        __b;
        return ((self["@content"].$r ? (((__a = self["@content"], __a.$m["$empty?"] || rb_vm_meth_m("empty?"))(__a, nil).$r ? ("no content") : (((__a = (__b = self["@content"], __b.$m.$inspect || rb_vm_meth_m("inspect"))(__b, nil), __a.$m.$to_s(__a)) + " as content")))) : ("any content")));
    },
    0));
},
0), rb_vm_class(self, nil, "Object",
function(self) {
    return (rb_vm_defn(self, "equal_element",
    function(self, __block__, args) {
        var nil = rb_nil;
        var __a;
        args = Array.prototype.slice.call(arguments, 2);
        return ((__a = rb_vm_cg(self, "EqualElementMatcher"), __a.$m.$new || rb_vm_meth_m("new")).apply(nil, [__a, nil].concat(args)));
    },
    0));
},
0));
