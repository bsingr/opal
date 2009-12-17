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


    // function rb_iseq_t() {
    //   // iseq type
    //   this.type = 0;
    //   // iseq name
    //   this.name = "";
    //   // filename/info
    //   this.filename = "";
    //   // actual sequences
    //   this.iseq = [];
    //   
    //   this.insn_info_table = {
    //     position: 0, line_no: 0, sp: 0
    //   };
    //     
    //   // locals
    //   this.local_table = {};
    //   
    //   // Args.. see vm_core.h
    //   this.argc = 0;
    //   this.arg_simple = 0;
    //   this.arg_rest = 0;
    //   this.arg_block = 0;
    //   this.arg_opts = 0;
    //   this.arg_post_len = 0;
    //   this.arg_post_start = 0;
    //   
    //   this.arg_size = 0;
    //   
    //   this.arg_opt_table = [];
    //   
    //   // stack overflow checking
    //   this.stack_max = 0;
    // 
    //   // dynamics
    //   this.self = null;
    //   this.orig = null;
    //   
    //   this.cref_stack = null;
    //   this.klass = null;
    //   this.defined_method_id = null;
    // }


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
  // value stack
  this.stack = [];
  
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
}

function rb_control_frame() {
  // program counter
  this.pc = 0;
  // stack pointer - will start 1 above previous stack frames so that we add onto stack passed
  // end of previous frame's
  this.sp = 0;
  // base pointer - original stack pointer. when we pop stack, this is to know where we started,
  // so we can go back
  this.bp = null;
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
  
  this.insn_info_table = {
    position: 0, line_no: 0, sp: 0
  };
  
  
  
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
  val = vm_exec(vm);
  return val;
}

function vm_set_top_stack(vm, iseq) {
  if (iseq[3] != ISEQ_TYPE_TOP) {
    // rb_raise(rb_eTypeError, "Not a toplevel InstructionSequence");
    throw 'rb_eTypeError: ' + 'Not a top level InstructionSequence'
  }
  
  // vm_push_frame(vm, iseq, ISEQ_TYPE_TOP, vm.top_self, 0, 0, vm.cfp.sp, 0, iseq.local_size)
  // set top: no current frame: therefore no current stack pointer???? should top_self be a frame?
  vm_push_frame(vm, iseq, ISEQ_TYPE_TOP, vm.top_self, 0, 0, -1, 0, iseq[0][1])
}

function vm_exec(vm) {
  // console.log(vm);
  var sf = vm.cfp;
  // [7] are the actual opcodes
  // console.log(vm);
  var iseq = sf.iseq[7];
  // run opcodes
  for (; sf.pc < iseq.length; sf.pc++) {
    var op = iseq[sf.pc];
    
    // If we hit a number, its correcting the line number that the opcode is on
    if (typeof op === 'number') {
      sf.insn_info_table.line_no = op;
      continue;
    }
    
    switch (op[0]) {
      case iPUTNIL:
        vm.stack[sf.sp++] = nil;
        break;
      case iGETCONSTANT:
        var base = vm.stack[--sf.sp];
        if (base === nil) {
          // if current self is an insance, look in its class (meta)
          var k = rb_class_real((sf.self.flags & T_OBJECT) ? sf.self.klass : sf.self);
          vm.stack[sf.sp++] = rb_const_get(k, op[1]);
        }
        else {
          vm.stack[sf.sp++] = rb_const_get(base, op[1]);
        }
        break;
      case iSEND:
        var argc = op[2], mid = op[1];
        
        var recv = vm.stack[--sf.sp];
        
        // throw "calling " + mid + " with " + argc + " arguments."
        var a = rb_call(recv.klass, recv, mid, argc, []);
        break;
      case iLEAVE:
        console.log("leave/return");
        console.log(vm);
        break;
      default:
        console.log("unknown op code: " + op.join(","));
        break
    }
  }
}

/**
  For now, use vm instead of thread.
  @param {rb_thread} vm
  @param {rb_iseq} iseq
  @param VALUE type
  @param VALUE self
  @param VALUE specval
  @param VALUE pc
  @param VALUE sp
  @param VALUE lfp
  @param int local_size
*/
function vm_push_frame(vm, iseq, type, self, specval, pc, sp, lfp, local_size) {
  var cfp = new rb_control_frame();
  // push cfp onto stack, then increment sp??
  cfp.pc = pc;
  cfp.sp = sp + 1;
  cfp.bp = sp + 1;
  cfp.iseq = iseq;
  cfp.flag = type;
  cfp.self = self;
  cfp.lfp = lfp;
  cfp.dfp = sp;
  cfp.proc = 0;
  
  vm.cfp = cfp;
  vm.cfs.push(cfp);
  // vm.cfp = cfp;
  
  
  return cfp;
}

function rb_funcall(recv, mid, argc) {
  var argv = Array.prototype.slice.call(arguments, 3, argc + 3);
  
  return rb_call(recv.klass, recv, mid, argc, argv);
}

function rb_call(klass, recv, mid, argc, argv) {
  var body = rb_search_method(klass, mid);
  
  if (!body) {
    throw "need to call method missing"
  }
  
  return rb_vm_call(rb_top_vm, klass, recv, mid, mid, argc, argv, body, 0);
}
  
  
 // rb_funcall_stack.push(id);
 // if (!self.klass) {
 //   console.log('ERROR: rb_funcall');
 //   console.log(self);
 //   console.log(id);
 // }
 // 
 // var method = rb_search_method(self.klass, id);
 // 
 // if (!method) {
 //   // for (var i = 0; i < 20; i++) {
 //     // console.log(rb_funcall_stack.pop());
 //   // }
 //   console.log(self);
 //   throw 'RObject#call cannot find method: ' + id ;
 // } 
 // // console.log(Array.prototype.slice.call(arguments));
 // switch(arguments.length) {
 //   case 2: return method(self, id);
 //   case 3: return method(self, id, arguments[2]);
 //   case 4: return method(self, id, arguments[2], arguments[3]);
 //   case 5: return method(self, id, arguments[2], arguments[3], arguments[4]);
 // }
 // 
 // return method.apply(self, arguments);
// }

function rb_search_method(klass, id) {
 // console.log('checking ' + id);
 // console.log(this);
 var f, k = klass;
 // console.log(id);
 // console.log(klass);
 // return null ;
 while (!(f = k.m_tbl[id])) {
   k = k.sup;
   // console.log(this.$super.__classid__);
   if (!k) return undefined;
 }
 // console.log('returning true for ' + id);
 return f;
};

function rb_vm_call(vm, klass, recv, id, oid, argc, argv, body, nosuper) {
  if (typeof body === 'function') {
    // console.log(vm);
    // throw "here"
    // parent stack frame
    var pcf = vm.cfp;
    // (new) current frame pointer
    // var cfp = vm_push_frame(vm, 0, cfunc_type_number, recv, block_ptr?, 0, pcf.sp, 0, 1);
    
    // var val = call_cfunc(body, recv, body.rb_argc, argc, argv);
    
    // vm_pop_frame(vm);  
  }
  else {
    // object, i.e. opcode (array)
    throw "unknown body type"
  }
}

function call_cfunc(func, recv, len, argc, argv) {

  if (len >= 0 && argc != len) {
    // rb_raise(rb_eArgError, "wrong number of arguments(" + argc + " for " + len + ")");
    throw "rb_eArgError: wrong number of arguments(" + argc + " for " + len + ")"
  }
  
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
