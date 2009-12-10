/**
    throws/jumps etc.
*/
function rb_break(args) {
    throw { type:"break", args:args, toString:function() { return "LocalJumpError: unexpected break" } }
}

function rb_return(args) {
    throw { type:"return", args:args, toString:function() { return "LocalJumpError: unexpected return" } }
}

function rb_next(args) {
    throw { type:"next", args:args, toString:function() { return "LocalJumpError: unexpected next" } }
}

function rb_next(args) {
    throw { type:"next", args:args, toString:function() { return "LocalJumpError: unexpected next" } }
}


function rb_if_stmt(f) {
    try {
        return f();
    }
    catch (e) {
        if (e.type === "return") return e.args;
        throw e
    }
}

/**
    b == block (might be undefined), rest of args are actual args
*/
function rb_yield(b) {
    // console.log('in here..');
    // console.log(Array.prototype.slice.call(arguments));
    if (rb_block_given_p(b)) {
        // console.log(Array.prototype.slice.call(b));
        var a = Array.prototype.slice.call(arguments, 1);
        try {
            return b.apply(b, a);
        }
        catch (e) {
            // catch "next" exception .. move onto next iteration
            if (e.type === "next") return e.args;
            throw e
        }
    }
    throw 'LocalJumpError: no block given'
}

function rb_block_given_p(b) {
    return typeof b !== 'undefined';
}

/**
    puts:
    
    Simply uses CPLog (normal)
*/
function rb_f_puts(self, _cmd, s) {
    console.log(s);
}