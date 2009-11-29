/**
    Ruby object types. (not needed when sat on top of objj?)
*/
RB_CLASS   = 0;
RB_MODULE  = 1;
RB_OBJECT  = 2;
RB_ICLASS  = 3;
RB_STRING  = 4;
RB_ARRAY   = 5;
RB_NUMBER  = 6;
RB_PROC    = 7;
RB_SYMBOL  = 8;
RB_HASH    = 9;
RB_BOOLEAN = 10;

/**
    RTEST, ORTEST, NOTTEST, ANDTEST
    ===============================
    Truthy/falsy values in ruby are not the same as truthy/falsy values in javascript.
    This is an annoyance for logical && and || tests, as well as if/else if statements.
    For this reason, the prenamed functions are used to wrap conditionals to perform
    correct type checking. This becomes more tedious with logical and/or values that 
    must also return the right value.
    
    For clarification, the only falsy values in ruby are:
    
        false, nil
    
    The falsy values in javascript , that are truthy in ruby:
    
        "", 0, etc
    
    Vienna maintains the truthy relationship that ruby defines. ANSTEST/ORTEST should
    not execute their RHS if the logical outcome of the LHS dictates so. For this reason,
    all RHS and LHS expressions in && and || are wrapped in anonymous functions, and passed
    that way to avoid their contents being exectured until/if we need them to be.
*/

/**
    RTEST.
    
    Boolean test. Only return false if val == false, null or undefined (or nil, but in objj
    this is just null anyway)
    
    @param val - the expression to test.
*/
function RTEST(val) {
  return (val === null || val === undefined || val === nil || val === false) ? false : true;
};

/**
    ORTEST
    
    Performs an 'or op' with lhs and rhs
    
    @param lhs - function wrapping lhs expression
    @param rhs - function wrapping rhs expression
*/
function ORTEST(lhs, rhs) {
    var r;
    if (RTEST(r = lhs())) {
        return r;
    }
    // only evaluate rhs if lhs fails
    return rhs();
}

/**
    ANDTEST
    
    Performs an 'and op' with lhs and rhs
    
    @param lhs - function wrapping lhs expression
    @param rhs - function wrapping rhs expression
*/
function ANDTEST(lhs, rhs) {
    var r;
    if (!RTEST(r = lhs())) {
        return r;
    }
    // only evaluate rhs if lhs is also truthy
    return rhs();
}

function NOTTEST(expr) {
  if (expr === null || expr === undefined || expr === nil || expr === false) return true;
  return false;
};
