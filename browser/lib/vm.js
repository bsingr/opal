/* 
 * vm.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
  Jarv - (Javascript/Just) another ruby vm
  Influenced by yarv, but opcodes are (slightly) different.
  Main difference are the stack frames and stacks themselves.
*/
 
// temp so we dont have to change code later;
var nil = null;
 
/**
  Instruction table (opcodes)
*/
var iNOP                    = 0,              iGETLOCAL               = 1,
    iSETLOCAL               = 2,              iGETSPECIAL             = 3,
    iSETSPECIAL             = 4,              iGETDYNAMIC             = 5,
    iSETDYNAMIC             = 6,              iGETINSTANCEVARIABLE    = 7,
    iSETINSTANCEVARIABLE    = 8,              iGETCLASSVARIABLE       = 9,
    iSETCLASSVARIABLE       = 10,             iGETCONSTANT            = 11,
    iSETCONSTANT            = 12,             iGETGLOBAL              = 13,
    iSETGLOBAL              = 14,             iPUTNIL                 = 15,
    iPUTSELF                = 16,             iPUTOBJECT              = 17,
    iPUTSTRING              = 18,             iCONCATSTRINGS          = 19,
    iTOSTRING               = 20,             iTOREGEXP               = 21,
    iNEWARRAY               = 22,             iDUPARRAY               = 23,
    iEXPANDARRAY            = 24,             iCONCATARRAY            = 25,
    iSPLATARRAY             = 26,             iCHECKINCLUDEARRAY      = 27,
    iNEWHASH                = 28,             iNEWRANGE               = 29,
    iPOP                    = 30,             iDUP                    = 31,
    iDUPN                   = 32,             iSWAP                   = 33,
    iREPUT                  = 34,             iTOPN                   = 35,
    iSETN                   = 36,             iADJUSTSTACK            = 37,
    iDEFINEMETHOD           = 38,             iALIAS                  = 39,
    iUNDEF                  = 40,             iDEFINED                = 41,
    iPOSTEXE                = 42,             iTRACE                  = 43,
    iDEFINECLASS            = 44,             iSEND                   = 45,
    iINVOKESUPER            = 46,             iINVOKEBLOCK            = 47,
    iLEAVE                  = 48,             iFINISH                 = 49,
    iTHROW                  = 50,             iJUMP                   = 51,
    iBRANCHIF               = 52,             iBRANCHUNLESS           = 53,
    iGETINLINECACHE         = 54,             iONCEINLINECACHE        = 55,
    iSETINLINECACHE         = 56,             iOPT_CASE_DISPATCH      = 57,
    iOPT_CHECKENV           = 58,             iOPT_PLUS               = 59,
    iOPT_MINUS              = 60,             iOPT_MULT               = 61,
    iOPT_DIV                = 62,             iOPT_MOD                = 63,
    iOPT_EQ                 = 64,             iOPT_NEQ                = 65,
    iOPT_LT                 = 66,             iOPT_LE                 = 67,
    iOPT_GT                 = 68,             iOPT_GE                 = 69,
    iOPT_LTLT               = 70,             iOPT_AREF               = 71,
    iOPT_ASET               = 72,             iOPT_LENGTH             = 73,
    iOPT_SUCC               = 74,             iOPT_NOT                = 75,
    iOPT_REGEXPMATCH1       = 76,             iOPT_REGEXPMATCH2       = 77,
    iOPT_CALL_C_FUNCTION    = 78,             iBITBLT                 = 79,
    iANSWER                 = 80;     

/**
  iseq types
*/
var ISEQ_TYPE_TOP    = 1,
    ISEQ_TYPE_METHOD = 2,
    ISEQ_TYPE_BLOCK  = 3,
    ISEQ_TYPE_CLASS  = 4,
    ISEQ_TYPE_RESCUE = 5,
    ISEQ_TYPE_ENSURE = 6,
    ISEQ_TYPE_EVAL   = 7,
    ISEQ_TYPE_MAIN   = 8;

/**
  DEFINECLASS types
*/
var DEFINECLASS_CLASS       = 0,
    DEFINECLASS_SINGLETON   = 1,
    DEFINECLASS_MODULE      = 2;

/**
  == Depreceated?
  

  call args
*/
var VM_CALL_ARGS_SPLAT_BIT    = 2,
    VM_CALL_ARGS_BLOCKARG_BIT = 4,
    VM_CALL_FCALL_BIT         = 8,
    VM_CALL_VCALL_BIT         = 16,
    VM_CALL_TAILCALL_BIT      = 32,
    VM_CALL_TAILRECURSION_BIT = 64,
    VM_CALL_SUPER_BIT         = 128,
    VM_CALL_SEND_BIT          = 256;


/**
  Handles some functionality found in thread until thread is added to main repo.
  At the moment, using threads makes to much of a performance impact, so they
  will be added if/when performance can be improved. (Need to determine how much
  performance impact is justified.). See 'threads' branch on vienna.adambeynon.com
  for threads code. Not currently in github branch (or branch for gem building.)
*/
function rb_vm() {
  this.self = null;
  
  this.running = 0;
  
  // current frame pointer - rb_control_frame
  this.cfp = null;
  // control frame stack
  this.cfs = []
  
  // for iterations
  this.passed_block = null;
  
  this.top_self = null;
  this.top_wrapper = null;
  
  // eval env
  this.base_block = null;
  
  // search style.. search for local .rb or .vm files
  this.search_style = ".rb";
}

function rb_control_frame() {
  // stack. every control frame manages its own stack
  this.stack = []
  // stack pointer
  this.sp = 0;
  // program counter
  this.pc = 0;
  // prev env
  this.prev = null;
  // instruction sequence (array we got from json, for now)
  this.iseq = null;
  // local self
  this.self = null;
  // local frame pointer
  this.lfp = null;
  // dynamic frame pointer
  this.dfp = null;
  // block instruction sequences..
  this.block_iseq = null;
  // proc - always 0/false for methods..
  this.proc = 0;
  
  // locals
  this.locals = null;
  
  // this.insn_info_table = {
  //   position: 0, line_no: 0, sp: 0
  // };
  this.line_no = 0;
  
  // 
  this.method_id = null;
  this.method_class = null;
}



// currently the only vm. thread support is currently disabled
var rb_top_vm = null;



// Seq is an array, [:misc, :name etc....]
function rb_iseq_eval(iseq) {
  var val, vm = rb_top_vm;
  vm_set_top_stack(vm, iseq);
  val = vm_run_mode_running(rb_top_vm);
  return val;
}

function vm_set_top_stack(vm, iseq) {
  if (iseq[4] != ISEQ_TYPE_TOP) {
    // rb_raise(rb_eTypeError, "Not a toplevel InstructionSequence");
    throw 'rb_eTypeError: ' + 'Not a top level InstructionSequence'
  }
  

  // vm_push_frame(vm, iseq, ISEQ_TYPE_TOP, vm.top_self, 0, 0, -1, 0, iseq[0][1])
  vm_push_frame(vm, iseq, vm.top_self);
}

function vm_run_mode_sleep(vm) {
  vm.running = 0;
}

function vm_run_mode_running(vm) {
  vm.running = 1;
  return vm_exec(vm);
}

/**
  Execute iseq, for current frame pointer, which will be a function.
*/
function vm_exec(vm) {
  var jumps = vm.cfp.iseq[7], iseq = vm.cfp.iseq[8], op, sf = vm.cfp;
  // console.log("executing iseq: " + iseq);
  for (; sf.pc < iseq.length; sf.pc++) {
    op = iseq[sf.pc];
    // console.log(sf.pc);
    
    if (typeof op === 'number') {
      // console.log("at line number " + op);
      continue;
    }
    
    switch (op[0]) {
      /**
        putobject
        
        put an object onto the stack
        
        == operands
        
        VALUE val
        
        == stack
        
        before:             after:
        
                            ----------
        ==========    =>     val
                            ----------
      */
      case iPUTOBJECT:
        // console.log("putobject" + sf.sp);
        sf.stack[sf.sp++] = op[1];
        break;
      
      /**
        getlocal
        
        get local from locals array, and put onto stack
        
        == operands
        
        idx
        
        == stack
        
        before:             after:
        
                            ----------
        ==========    =>     val
                            ----------
      */
      case iGETLOCAL:
        // console.log("getlocal" + sf.sp);
        sf.stack[sf.sp++] = sf.locals[op[1]];
        break;
        
        /**
          setlocal
          
          == operands

          idx - index of local. Args, then locals.
          
          == stack

          before:             after:

          ----------         
           val          =>   ==========
          ----------         

          == Discussion

          Sets local var value. Note, not local ivar.
        */
      case iSETLOCAL:
        // console.log("setlocal" + sf.sp);
        sf.locals[op[1]] = sf.stack[--sf.sp];
        // console.log("after: " + sf.sp);
        break;
      
      /**
        getdynamic
        
        == operands
        
        idx - idx in locals
        level - level to search, 0 = current frame
        
      */
      case iGETDYNAMIC:
      // cheat, only works for level [0] at the moment, i.e. local frame and use
      // the first index..basically, just so we can get things working.
        sf.stack[sf.sp++] = sf.locals[0];
        // throw ""
        break;
      
      /**
        setinstancevariable
        
        == operands
        
        id
      */
      case iSETINSTANCEVARIABLE:
        rb_ivar_set(sf.self, op[1], sf.stack[--sf.sp]);
        break;
      
      /**
        getinstancevariable
        
        == operands
        
        id
        
        == stack
        
        val put onto stack
      */
      case iGETINSTANCEVARIABLE:
        sf.stack[sf.sp++] = rb_ivar_get(sf.self, op[1]);
        break;
      
      /**
        getconstant
        
        == operands
        
        id - constant id
        
        == stack
        
        before:             after:
        
        ----------          ----------
         klass        =>     val
        ----------          ----------
        
        == discussion
        
        klass is the base klass to look on.
        val is the constant itself
      */
      case iGETCONSTANT:
        var const_klass = sf.stack[--sf.sp], const_id = op[1];
        
        if (const_klass == nil) {
          if (sf.self.flags & T_OBJECT) {
            const_klass = rb_class_real(sf.self.klass);
          }
          else {
            const_klass = sf.self;
          }
        }
        
        sf.stack[sf.sp++] = rb_const_get(const_klass, const_id);
        break;
      
      /**
        putnil
        
        == operands
        
        none
        
        == stack
        
        before:             after:
        
                            ----------
        ==========    =>     nil
                            ----------
      */
      case iPUTNIL:
        // console.log("nil" + sf.sp);
        sf.stack[sf.sp++] = nil;
        break;
      
        /**
          putnil

          == operands

          none

          == stack

          before:             after:

                              ----------
          ==========    =>     self
                              ----------
        */
      case iPUTSELF:
        sf.stack[sf.sp++] = sf.self;
        break;
      
      /**
        pop
        
        == operands
        
        none
        
        == stack
        
        before:             after:

        ----------         
         val          =>   ==========
        ----------
      */
      case iPOP:
        // console.log("pop" +  sf.sp);
        sf.sp--;
        break;
      
      /**
        branchunless
        
        == operands
        
        lbl - jump label to jump to if val is false or nil (RTEST)
        
        == stack
        
        before:             after:

        ----------         
         val          =>   ==========
        ----------
      */
      case iBRANCHUNLESS:
        var jmp_label = op[1], jmp_test = sf.stack[--sf.sp];
        if (jmp_test === nil || jmp_test === false) {
          // actually do jump
          // console.log(jumps[op[1]] + " ..branch unless jump: " + jmp_test);
          // the loop does pc++, so we go to one less than what we actually need
          sf.pc = jumps[op[1]] - 1;
        }
        else {
          // console.log("branch unless do not jump: " + jmp_test);
        }
        
        // if RTEST was okay, do nothing..
        break;
      
      /**
        jump
        
        == operands
        
        ==stack
        
      */
      case iJUMP:
        // pc ++ in loop makes us go to actual - 1
        sf.pc = jumps[op[1]] - 1;
        break;
      
      /**
        leave
        
        == discussion
        
        on iLEAVE, return the value on top of the stack
      */
      case iLEAVE:
        return sf.stack[--sf.sp];
        break;
      
      /**
        definemethod
        
        == operands
        
        method_id     - method id
        method_iseq   - body of method
        is_singleton  - whether the method is a singleton or not
        
        == stack
        
        before:             after:

        ----------         
         val          =>   ==========
        ----------
      */
      case iDEFINEMETHOD:
        var def_obj = sf.stack[--sf.sp];
        var method_id = op[1], method_iseq = op[2], is_singleton = op[3];
        
        if (def_obj === nil) {
          if (sf.self.flags & T_OBJECT)
            def_obj = rb_class_real(sf.self.klass);
          else
            def_obj = sf.self;
        }
        
        rb_define_method(def_obj, method_id, method_iseq, 0);
        // console.log(def_obj);
        // throw "dmethod"
        break;
      
      /**
        defineclass
        
        == operands
        
        class_id      - class name
        class_iseq    - class body/sequences
        define_type   - 0, 1 or 2.
        
        == stack
        
        before:             after:
        
        ----------
         super              ----------
        ----------    =>     val
         base               ----------
        ----------
        
        == discussion
        
        val, the return value, is the class object itself.
      */
      case iDEFINECLASS:
        var klass, class_id = op[1], class_iseq = op[2], define_type = op[3];
        
        var class_super = sf.stack[--sf.sp];
        var class_base = sf.stack[--sf.sp];
        
        switch (define_type) {
          case DEFINECLASS_CLASS:
            
            if (class_super == nil) {
              class_super = rb_cObject;
            }
            
            if (class_base == nil) {
              // this isn't right.
              class_base = sf.self;
              // if class_base is an object, then we need to get its klass.
              if (class_base.flags & T_OBJECT) {
                class_base = rb_class_real(class_base.klass);
              }
            }
            
            // find klass, if it already exists
            if (rb_const_defined_at(class_base, class_id)) {
              throw "defined"
            }
            else {
              // define new class
              klass = rb_define_class_id(class_id, class_super);
              rb_name_class(klass, class_id);
              // rb_class_set_path(klass, class_base, id)
              rb_const_set(class_base, class_id, klass);
              // rb_class_inherited(class_super, klass);
            }
            break;
          
          case DEFINECLASS_SINGLETON:
            // singleton reference class << self; end
            klass = rb_singleton_class(class_base);
            break;
          
          case DEFINECLASS_MODULE:
          
            if (class_base == nil) {
              class_base = sf.self;
              if (class_base.flags & T_OBJECT) {
                class_base = rb_class_real(class_base.klass);
              }
            }
            
            if (rb_const_defined_at(class_base, class_id)) {
              klass = rb_const_get_at(class_base, class_id);
              if (!(klass.flags & T_MODULE)) {
                throw class_id + " is not a module"
                // rb_raise
              }
            }
            else {
              // new module
              klass = rb_define_module_id(class_id);
              rb_name_class(klass, class_id);
              // rb_set_class_path(klass, class_base, class_id);
              rb_const_set(class_base, class_id, klass);
            }
            break;
          
          default:
            throw "error, unknown iDEFINECLASS definetype"
        }
        
        // do body..
        var pcf = vm.cfp;
        var cfp = vm_push_frame(vm, class_iseq, klass);
        cfp.block_iseq = nil;

        var val = vm_exec(vm);
        vm_pop_frame(vm);
        // return val;
        // puts val on stack
        sf.stack[sf.sp++] = val;
        break;
      
      /**
        send
        
        == operands
        
        == stack
        
      */
      case iSEND:
        // get off arguments first, then get off recv.
        var argc = op[2], mid = op[1];
        var argv = sf.stack.slice(sf.sp - argc, sf.sp);
        sf.sp -= argc;
        var recv = sf.stack[--sf.sp];
        
        // if this is set, then we did not give an explicit receiver, so assume
        // self (we can use this info for PRIVATE/PUBLIC calls)
        if (op[4] & VM_CALL_FCALL_BIT) {
          // console.log("changing receiver: " + argv.join(", "));
          recv = sf.self;
        }
        // console.log("recv is");
        // console.log(recv);
        // pop result of call onto stack
        sf.stack[sf.sp++] = rb_call(recv.klass, recv, mid, argc, argv, op[3]);

        break;
      
      /**
        opt_plus
        
        == operands
        
        none
        
        == stack
        
        before:             after:
        
        ----------
         obj                ----------
        ----------    =>     val
         recv               ----------
        ----------
        
        == discussion
        
        Optomised way to send '+' between numbers. If both are numbers, then
        we can just do a plus and pop value onto stack. If not, then we need to
        set up a normal iSEND.
      */
      case iOPT_PLUS:
        var opt_obj = sf.stack[--sf.sp];
        var opt_recv = sf.stack[--sf.sp];
        // if both numbers, do fast track, otherwise we need to send it, as per
        // normal
        if ((opt_obj.flags & T_NUMBER) && (opt_recv.flags & T_NUMBER)) {
          sf.stack[sf.sp++] = opt_obj + opt_recv;
        }
        else {
          throw "opt_plus: need to send as normal iSEND"
        }
        break;
      
      /**
        newarray
        
      */
      case iNEWARRAY:
        var argc = op[1];
        var ary = sf.stack.slice(sf.ap - argc, sf.sp);
        sf.sp -= argc;
        sf.stack[sf.sp++] = ary;
        break;
      
      default:
        throw "unknown opcode " + op.toString()
    }
  }
  return nil;
  // return iseq();
}


function vm_push_frame(vm, iseq, self) {
  var cfp = new rb_control_frame();
  cfp.iseq = iseq;
  cfp.self = self;
  cfp.pc = 0;
  cfp.stack = [];
  cfp.sp = 0;
  
  cfp.locals = new Array(iseq[0] + iseq[1]);
  
  vm.cfp = cfp;
  vm.cfs.push(cfp);
  return cfp;
}

function vm_pop_frame(vm) {
  // console.log(vm);
  // throw "."
  vm.cfs.pop();
  vm.cfp = vm.cfs[vm.cfs.length - 1];
}

function rb_funcall(recv, mid, argc) {
  var argv = Array.prototype.slice.call(arguments, 3, argc + 3);
  
  return rb_call(recv.klass, recv, mid, argc, argv, nil);
}

function rb_call(klass, recv, mid, argc, argv, blockptr) {
  var body = rb_search_method(klass, mid);
  if (!body) {
    console.log("calling method missing with: " + mid);
    console.log(recv);
    return rb_call(klass, recv, "method_missing", 2, [mid, argv], blockptr);
  }
  
  return rb_vm_call(rb_top_vm, klass, recv, mid, mid, argc, argv, body, 0, blockptr);
}

function rb_search_method(klass, id) {

 var f, k = klass;
 while (!(f = k.m_tbl[id])) {
   k = k.sup;
   if (!k) return undefined;
 }
 return f;
};

function rb_vm_call(vm, klass, recv, id, oid, argc, argv, body, nosuper, blockptr) {
  if (typeof body === 'function') {

    var pcf = vm.cfp;

    var cfp = vm_push_frame(vm, [0,0], recv);
    cfp.block_iseq = blockptr;
    var val = call_cfunc(body, recv, body.rb_argc, argc, argv);
    
    vm_pop_frame(vm);
    return val;
  }
  else {

    var pcf = vm.cfp;
    var cfp = vm_push_frame(vm, body, recv);
    cfp.block_iseq = blockptr;

    for (var i = 0; i < argc; i++) {
      cfp.locals[i] = argv[i];
    }
    
    var val = vm_exec(vm);
    vm_pop_frame(vm);
    return val;
  }
}

function call_cfunc(func, recv, len, argc, argv) {

  if (len >= 0 && argc != len) {
    // rb_raise(rb_eArgError, "wrong number of arguments(" + argc + " for " + len + ")");
    throw "rb_eArgError: wrong number of arguments(" + argc + " for " + len + ")"
  }
  
  // even though 15 is acceptable, we should determine a cut off point. 5 seems reasonable, then after
  // 5, we just push recv to start of argv, and apply().
  switch (len) {
    case -2:
      throw "call_cfunc: unimplemeneted: -2 arg length"
    case -1:
      return func(argc, argv, recv);
    case 0:
      return func(recv);
    case 1:
      return func(recv, argv[0]);
    case 2:
      return func(recv, argv[0], argv[1]);
    case 3:
      return func(recv, argv[0], argv[1], argv[2]);
    case 4:
      return func(recv, argv[0], argv[1], argv[2], argv[3]);
    case 5:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4]);
    case 6:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5]);
    case 7:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6]);
    case 8:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7]);
    case 9:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7], argv[8]);
    case 10:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7], argv[8], argv[9]);
    case 11:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7], argv[8], argv[9], argv[10]);
    case 12:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7], argv[8], argv[9], argv[10], argv[11]);
    case 13:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7], argv[8], argv[9], argv[10], argv[11], argv[12]);
    case 14:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7], argv[8], argv[9], argv[10], argv[11], argv[12], argv[13]);
    case 15:
      return func(recv, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6], argv[7], argv[8], argv[9], argv[10], argv[11], argv[12], argv[13], argv[14]);
    default:
      // rb_raise(rb_eArgError, "too many arguments(" + len + ")");
      throw "rb_eArgError: too many arguments(" + len + ")"
  }
  throw "should never be reached"
}

/**
  Is block given. This is used from c functions that check the current frame
  pointer to see if it has a block.
*/
function rb_block_given_p() {
  
}

/**
  Is block given. This method, accessible from ruby, checks the previous stack
  frame for a block. Calling this method pushes a new stack frame onto the stack,
  so the previous one must be checked.
*/
function rb_f_block_given_p(recv) {
  
}

function rb_yield(val) {
  if (val === nil) return rb_yield_0(0, []);
  return rb_yield_0(1, [val]);
}

function rb_yield_0(argc, argv) {
  var vm = rb_top_vm;
  if (vm.cfp.block_iseq !== nil) {
    var recv = 0; // FIXME: get the correct receiver..


    var pcf = vm.cfp;
    var cfp = vm_push_frame(vm, vm.cfp.block_iseq, recv);
    // cfp.block_iseq = blockptr;
    // var cfp = vm_push_frame(vm, body, 0, recv, null, 0, pcf.sp, 0, body[0][1]);
    for (var i = 0; i < argc; i++) {
      cfp.locals[i] = argv[i];
    }
    
    var val = vm_exec(vm);
    vm_pop_frame(vm);
    return val;
    
    
    
    
    
    
    
    
    // console.log("we have block, push then execute it");
    // return nil;
  }
  throw "rb_yield_0: no block given";
  // console.log("yielding with vm:");
  // console.log(vm.cfp.block_iseq);
  return nil;
}


// Initializie VM - this will run the main VM
function Init_VM() {
  rb_top_vm = new rb_vm();
  rb_top_vm.top_self = rb_top_self;
}

function main_to_s() {
  return "main";
}

rb_top_self = null;

function rb_vm_top_self() {
  return rb_top_vm.top_self;
}


// Initialize top self
function Init_top_self() {
  /**
    Hack. When we run this, our VM isnt actually running.... so we cant use methods.. hmmm
  */
  rb_top_self = new RObject();
  rb_top_self.klass = rb_cObject;
  FL_SET(rb_top_self, T_OBJECT);
  rb_define_singleton_method(rb_top_self, 'to_s', main_to_s, 0); 
}

function rb_method_missing(argc, argv, recv) {
  throw "method missing: " + argv.join(",")
}

function Init_vm_eval() {
  
    // rb_define_method(rb_mKernel, "eval", rb_f_eval, -1);
    // rb_define_method(rb_mKernel, "local_variables", rb_f_local_variables, 0);
    // rb_define_method(rb_mKernel, "iterator?", rb_f_block_given_p, 0);
    // rb_define_method(rb_mKernel, "block_given?", rb_f_block_given_p, 0);
    // 
    // rb_define_method(rb_mKernel, "catch", rb_f_catch, -1);
    // rb_define_method(rb_mKernel, "throw", rb_f_throw, -1);
    // 
    // rb_define_method(rb_mKernel, "loop", rb_f_loop, 0);
    // 
    // rb_define_method(rb_cBasicObject, "instance_eval", rb_obj_instance_eval, -1);
    // rb_define_method(rb_cBasicObject, "instance_exec", rb_obj_instance_exec, -1);
    rb_define_private_method(rb_cBasicObject, "method_missing", rb_method_missing, -1);

    // rb_define_method(rb_cBasicObject, "__send__", rb_f_send, -1);
    // rb_define_method(rb_mKernel, "send", rb_f_send, -1);
    // rb_define_method(rb_mKernel, "public_send", rb_f_public_send, -1);
    // 
    // rb_define_method(rb_cModule, "module_exec", rb_mod_module_exec, -1);
    // rb_define_method(rb_cModule, "class_exec", rb_mod_module_exec, -1);
    // rb_define_method(rb_cModule, "module_eval", rb_mod_module_eval, -1);
    // rb_define_method(rb_cModule, "class_eval", rb_mod_module_eval, -1);
    // 
    // rb_define_method(rb_mKernel, "caller", rb_f_caller, -1);
}
