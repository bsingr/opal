// credit jashkenas/coffee-script

var LONG_FLAG  = /^(--\w[\w\-]+)/;
var SHORT_FLAG = /^(-\w)/;
var MULTI_FLAG = /^-(\w{2,})/;
var OPTIONAL   = /\[(\w+(\*?))\]/;


var OptionParser = function(rules, banner) {
  this.rules = this.buildRules(rules);
  this.banner = banner;
}

OptionParser.prototype.buildRules = function(rules) {
  var result = [];
  for (var i = 0; i < rules.length; i++) {
    if (rules[i].length < 3) rules[i].unshift(null);
    result.push(this.buildRule.apply(this, rules[i]));
  }
  return result;
};

OptionParser.prototype.buildRule = function(shortflag, longflag, description, options) {
  if (!options) options = {};
  var match = longflag.match(OPTIONAL);
  var longflag = longflag.match(LONG_FLAG)[1];
  return {
    name: longflag.substr(2),
    shortflag: shortflag,
    longflag: longflag,
    description: description,
    hasargument: !!(match && match[1]),
    islist: !!(match && match[2])
  };
};

OptionParser.prototype.parse = function(args) {
  var options = { arguments: [] };
  args = this.normalizeArgs(args);
  
  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    var matchedRule = false;
    var isOption = !!(arg.match(LONG_FLAG) || arg.match(SHORT_FLAG));
    for (var j = 0; j < this.rules.length; j++) {
      var rule = this.rules[j];
      if (rule.shortflag == arg || rule.longflag == arg) {
        var value = rule.hasargument ? args[i += 1] : true;
        options[rule.name] = rule.islist ? (options[rule.name] || []).concat(value) : value;
        matchedRule = true;
        break;
      }
    }
    if (isOption && !matchedRule) {
      throw new Error("unrecognized option: " + arg);
    }
    if (!isOption) {
      options.arguments = args.slice(i);
      break;
    }
  }
  return options;
};

OptionParser.prototype.normalizeArgs = function(args) {
  args = args.slice(0);
  var result = [], match;
  for (var i = 0; i < args.length; i++) {
    if (match = args[i].match(MULTI_FLAG)) {
      var parts = match[1].split('');
      for (var j = 0; j < parts.length; j++) {
        result.push('-' + parts[j]);
      }
    } else {
      result.push(args[i]);
    }
  }
  return result;
};

exports.OptionParser = OptionParser;

