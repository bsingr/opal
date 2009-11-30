/**
    rb_yield takes different parameters to vanilla ruby. The first parameter
    is the 'arguments object' from the calling method. rb_yield takes sole
    responsibility for checking an argument object is valid. i.e., it checks
    the last argument, verifies it, and then runs it if valid. Any other
    parameters will be the arguments for the block.
    
    function rb_obj_yield(self, _cmd, block) {
        rb_yield(arguments, arg1, arg2);
    }
*/
function rb_yield(args) {
    if (rb_block_given_p(args)) {
        // do block
        // console.log('in block: ' + arguments.length);
        // console.log(Array.prototype.slice.call(arguments));
        var a = Array.prototype.slice.call(arguments, 1);
        var b = args[args.length - 1];
        return b.apply(b, a);
    }
    throw 'yield: block not given exception.'
}

/**
    Operates as block_defined? from Kernel.
    
    Returns true or false if the given arguments contains a block. (This will
    be as the last argument in the obj.)
    
    Temporarily, block_defined? is actually a keyword in the vienna parser. This
    will change soon once this method has had a rewrite.
*/
function rb_block_given_p(args) {
    var b = args[args.length - 1];
    // fixme, check its a proc
    // if ((b.isa == rb_cProc) && (b.rb_is_block)) {
    if (b.rb_is_block) {
        return true;
    }
    return false;
}

/**
    puts:
    
    Simply uses CPLog (normal)
*/
function rb_f_puts(self, _cmd, s) {
    console.log(s);
}