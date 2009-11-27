window.RB_CLASS   = 0;//,
    // RB_MODULE  = 1,
    // RB_OBJECT  = 2,
    // RB_ICLASS  = 3,
    // RB_STRING  = 4,
    // RB_ARRAY   = 5,
    // RB_NUMBER  = 6,
    // RB_PROC    = 7,
    // RB_SYMBOL  = 8,
    // RB_HASH    = 9,
    // RB_BOOLEAN = 10;

// temp..
// var nil = null;

// Boolean test. false if null, undefined, nil, or false
var RTEST = function RTEST(val) {
  return (val != null && val != undefined && val != nil && val != false) ? true : false;
};

/**
  Performs an 'or op' with lhs and rhs
*/
var ORTEST = function ORTEST(lhs, rhs) {
  if (lhs == null || lhs == undefined) lhs = nil;
  if (rhs == null || rhs == undefined) rhs = nil;
  
  if (lhs == nil || lhs == false) {
    return rhs;
  }
  return lhs;
};

/**
  Performs an 'and op' with lhs and rhs
*/
var ANDTEST = function ANDTEST(lhs, rhs) {
  if (lhs == null || lhs == undefined) lhs = nil;
  if (rhs == null || rhs == undefined) rhs = nil;
  
  if (lhs == nil || lhs == false) {
    return nil;
  }
  return rhs;
};

var NOTTEST = function NOTTEST(expr) {
  if (expr == null || expr == undefined || expr == nil || expr == false) return true;
  return false;
};
