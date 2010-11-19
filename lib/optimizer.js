// In charge of reading through an array of tokens, inserting optional syntax
// and rewriting some tokens to make them parse quicker/easier and to avoid 
// complicating the grammar.

// valid command starts (what is a valid first token for a command)
var VALID_CMD_BEGIN = ['IDENTIFIER', 'IDENTIFIER2', 'CONSTANT', 'STRING_BEGIN', 'XSTRING_BEGIN', 'SYMBEG', 'INTEGER', 'FLOAT', 'ARRAY_BEGIN', 'SELF', 'TRUE', 'FALSE', 'NIL', 'IVAR', 'LABEL', 'UMINUS', 'UPLUS', 'FILE', 'LINE', 'STAR', 'GVAR',
  // first argument may actually be a parenthesis
 'PAREN_BEGIN'];

// Things that MUST end a command
var VALID_CMD_END = [';', '\\n', ''];

// VALID cmd end unless prev was a commar
var VALID_CMD_END_COMMAR = ['DO', 'CURLY_BEGIN', 'FOR_MOD', 'IF_MOD', 'UNLESS_MOD', 'WHILE_MOD', 'UNTIL_MOD', 'CATCH_MOD'];

// when we get one of these, skip to the next new line - def: param names could appear to be commanf args
var CMD_SKIP_LINE = ['DEF'];

// @param {Array} tokens The tokens to work with
var Optimizer = exports.Optimizer = function(tokens) {
  this._tokens = tokens;
};

Optimizer.prototype.optimize = function() {
  // this.find_for_blocks();
  // this.close_arrays_and_indexes();
  // this.find_objj_calls();
  // console.log(this._tokens);
  // console.log('############################################');
  this.find_command_args();
  // console.log(this._tokens);
  // console.log('############################################');
  return this._tokens;
};

Optimizer.prototype.each = function(enumerator) {
  var idx = 0;
  while (true) {
    if (!this._tokens[idx]) {
      break;
    }
    idx += enumerator.apply(this, [this._tokens[idx - 1], this._tokens[idx], this._tokens[idx + 1], idx]);
  }
};

// ==========
// = New... =
// ==========
Optimizer.prototype.find_command_args = function() {
  // stack is used to keep a context, everytime we enter a call begin, param
  // begin, index begin etc etc, we push the token onto the stack so we know 
  // where we are. when we reach an equivalent end, we pop its counterpart off
  // the stack.
  var stack = [],
  // cmd stack we keep a list of indexes where our commands begin (the ones we 
  // need to insert)
  cmd_stack = [];
  
  this.each(function(last, token, next, idx) {
    // always check for def. if def skip until we get to a ; or \n
    if (token[0] === 'DEF') {
      // first, check if we find a singleton.. look through to see it idx + 2 is
      // a dot or colon, if so, mark it as a singleton_dot
      if (this._tokens[idx + 2][0] == "." || this._tokens[idx + 2][0] == "COLON2") {
        // print("SINGLETON!!" + this._tokens[idx + 1]);
        this._tokens[idx][0] = "SINGLETON_DEF";
      }
      
      var try_index = idx + 1, try_token = this._tokens[try_index];
      while (try_token) {
        if (try_token[0] === '\\n' || try_token[0] === ';') {
          // throw "returning on " + (try_index - idx)
          return try_index - idx;
        }
        try_index++;
        try_token = this._tokens[try_index];
      }
    }
    // we just push that we are in the given scope
    else if (['CALL_BEGIN', 'PAREN_BEGIN', 'STRING_DBEGIN', 'ARRAY_BEGIN', 'INDEX_BEGIN', 'CURLY_BEGIN', 'HASH_BEGIN'].indexOf(token[0]) !== -1) {
      stack.push(token[0]);
    }
    // Our parser expects params for return, next, break, super and yield to be
    // wrapped, so if they are not in the source, then we add a cmd_begin to our
    // stack and wrap them here
    else if (next && ['RETURN', 'NEXT', 'BREAK', 'SUPER', 'YIELD'].indexOf(token[0]) != -1) {
      if (VALID_CMD_BEGIN.indexOf(next[0]) !== -1) {
        cmd_stack.push(idx);
        stack.push('CMD_BEGIN');
      }
    }
    else if (next && token[0] == 'IDENTIFIER') {
      // if we next get an identifier and the next token is a candiate for the
      // first argument in a call, then we are good to go
      if (VALID_CMD_BEGIN.indexOf(next[0]) !== -1) {
        // if we do not have a receiver, then make identifier2 (again, to ease
        // parsing table later)
        if (!last || (last[0] !== '.' && last[0] !== 'COLON2')) {
          token[0] = 'IDENTIFIER2';
        }
        // push the current index as a candidate for our 'fake' CMD_BEGIN, and
        // also push CMD_BEGIN fake token onto our stack for reference.
        stack.push('CMD_BEGIN');
        cmd_stack.push(idx);
      }
      // if the next token is not a valid arg, then if it is a block arg and the
      // last token was a DOT, then we quickly insert a call_begin and call_end
      // here as we have no args, but are passing a block: a.b do..end. We should
      // probably only return 2 to see if our insertion propagates back into a
      // CMD_BEGIN state
      else if (next && (next[0] == 'DO' || next[0] == 'CURLY_BEGIN') && last && last[0] == '.') {
        this._tokens.splice(idx + 1, 0, ['CALL_END', ')', token[2]]);
        this._tokens.splice(idx + 1, 0, ['CALL_BEGIN', '(', token[2]]);
        return 2;
      }
      // same as above, but for if our last token was not a DOT or COLON2. This
      // is when an identifier is called with no args, but with a block, and has
      // no receiver. In this case we also rename our identifier to an 
      // identifier2 for easier parsing. return 2 to go back to 'DO' on next loop
      else if (next && (next[0] == 'DO' || next[0] == 'CURLY_BEGIN') && (!last || (last[0] !== '.' && last[0] !== 'COLON2'))) {
        token[0] = 'IDENTIFIER2';
        this._tokens.splice(idx + 1, 0, ['CALL_END', ')', token[2]]);
        this._tokens.splice(idx + 1, 0, ['CALL_BEGIN', '(', token[2]]);
        return 2;
      }
      
      // potential mlhs nodes - '|' check is quick hack to make sure we are not
      // in block args..
      else if (stack.length == 0 && (!last || (['|', '=', 'MRHS=', ','].indexOf(last[0]) == -1)) && next && next[0] == ',') {
        // print("MLHS potential " + token[1] + " .. " + token[2]);
        // print((last && last[1]) + ".........." + next[1]);
        stack.push('MLHS_BEGIN');
        this._tokens.splice(idx, 0, ['MLHS_BEGIN', 'MLHS_BEGIN', 0]);
        return 2;
      }
    }
    // if we reach a callend, parenend, string_dbeg_end, index_end, array_end or
    // anything else that may stop a command call, then if the top of our stack
    // is a cmd_begin, then we must end our fake command by inserting our call
    // begin and call end. If the top is not a cmd_begin, then maybe we should
    // carry on through, as this is not within a cmd_begin scope.return 2 to go 
    // back to 'DO' on next loop
    else if (['CALL_END', '}', 'ARRAY_END'].indexOf(token[0]) != -1 && stack[stack.length - 1] == 'CMD_BEGIN') {
      // console.log("oh god!!!!");
      this._tokens.splice(cmd_stack[cmd_stack.length - 1] + 1, 0, ['CALL_BEGIN', '(', 0]);
      this._tokens.splice(idx + 1, 0, ['CALL_END', ')', 0]);
      cmd_stack.pop();
      stack.pop();
      return 2;
      // console.log(stack[stack.length - 1]);
    }
    // if we reach a call end, we should mark it whether it is actually a call 
    // end, or whether it is a paren_end. If the stack top is call_end or paren
    // end, this makes it simple enough. If it is neiter, then we have hit a 
    // syntax error, in which case we do nothing... leave things to the parser
    // to deal with
    else if (token[0] == 'CALL_END') {
      // console.log("Call end should be for: " + stack[stack.length - 1]);
      if (stack[stack.length -1] == 'PAREN_BEGIN')
        token[0] = 'PAREN_END';
      // call end is already used, so we can skip call_begin action
      
      // always pop ourselves off the stack whether call_end or paren_end
      stack.pop();
    }
    // like above, but with array_begin and index_begin.. we need to mark whether
    // an incoming array_end is actually an array_end or an index_end
    else if (token[0] == 'ARRAY_END') {
      if (stack[stack.length - 1] == 'INDEX_BEGIN')
        token[0] = 'INDEX_END';
      
      // always pop ourselves off stack
      stack.pop();
    }
    // When we get to a } for hash end, curly end etc, we just pop it from the
    // stack. finishing interal commands is handled above. we only do this when
    // we are currently not inside a cmd_begin.
    else if (token[0] == '}') {
      stack.pop();
    }
    // Next we look for things that might end a command. So if the top of our 
    // stack is a cmd_begin, and our current token is a candidate for ending a
    // command then we end the command. Also, if the last was a commar, then we
    // skip. A commar implies that even though we could end here, we expect more
    // args. This will be a syntax error for some items (like DO and CURLY), but
    // the parser can pick these up.
    else if (stack[stack.length - 1] == 'CMD_BEGIN' && last[0] !== ',' && last[0] !== 'CALL_END' && VALID_CMD_END_COMMAR.indexOf(token[0]) !== -1) {      
      var cmd_begin = cmd_stack[cmd_stack.length - 1];
      this._tokens.splice(cmd_begin + 1, 0, ['CALL_BEGIN', '(']);
      this._tokens.splice(idx + 1, 0, ['CALL_END', ')']);
      cmd_stack.pop();
      stack.pop();
      return 2;
    }
    // If we hit a new line, and we are in command mode, then unless our last
    // statement was a commar, then we must end the command. A commar indiates 
    // that a next arg may be on this line
    else if (stack[stack.length - 1] == 'CMD_BEGIN' && token[0] == '\\n' && last && last[0] != ',') {
      var cmd_begin = cmd_stack[cmd_stack.length - 1];
      this._tokens.splice(cmd_begin + 1, 0, ['CALL_BEGIN', '(']);
      this._tokens.splice(idx + 1, 0, ['CALL_END', ')']);
      cmd_stack.pop();
      stack.pop();
      return 2;
    }
    // This is where we can force end commands. IF we get to a semi colon or the
    // EOF, then we must end the command (if one exists)
    else if (token[0] == ';') {
      if (stack[stack.length - 1] == 'CMD_BEGIN') {
        this._tokens.splice(cmd_stack[cmd_stack.length - 1] + 1, 0, ['CALL_BEGIN', '(', 0]);
        this._tokens.splice(idx + 1, 0, ['CALL_END', ')', 0]);
        cmd_stack.pop();
        stack.pop();
        return 2;
      }
    }
    // NEWLY ADDED - check for multiple RHS
    else if (token[0] == '=') {// && stack.length == 0) {
      if (stack.length == 0) {
        // console.log("= for " + next[0] + " on " + last[1]);
        token[0] = 'MRHS=';
        return 1;
      }
      else if (stack[stack.length - 1] == 'MLHS_BEGIN') {
        this._tokens.splice(idx, 0, ['MLHS_END', 'MLHS_END', 0]);
        stack.pop();
        token[0] = 'MRHS=';
        return 2;
      }
    }
    // EOF . end of file is a valid place for a cmd_begin to end
    else if(!next) {
      // console.log("EOF: " + stack[stack.length - 1]);
      if (stack[stack.length - 1] == 'CMD_BEGIN') {
        this._tokens.splice(cmd_stack[cmd_stack.length - 1] + 1, 0, ['CALL_BEGIN', '(', 0]);
        this._tokens.splice(idx + 1, 0, ['CALL_END', ')', 0]);
        cmd_stack.pop();
        stack.pop();
        return 2;
      }
    }
    return 1;
  });
};

// Find and mark all method calls where the call_begin token is missing
// Commands must use an identifier, return, new or super to mark the call, 
// where the identifier will be the method call.
Optimizer.prototype.find_command_args_old = function() {
  // stack of call_begin markers. when we find the closing match, we pop off stack
  // 0 = cmd_begin, 1 = call_begin, 2 = paran_begin, 3 = index_begin, array_begin, objj_begin
  // 4 = string_begin
  var stack = [];
  // stack of cmd start index where value is the identifier index
  var cmd_stack = [];
  this.each(function(last, token, next, idx) {
    if (token[0] === 'CALL_BEGIN') {
      stack.push(1);
    }
    else if (token[0] == 'PAREN_BEGIN') {
      stack.push(2);
    }
    else if (token[0] == 'STRING_DBEGIN') {
      stack.push(4);
    }
    else if (token[0] == '}' && stack[stack.length - 1] == 4) {
      stack.pop();
    }
    else if (token[0] === 'CALL_END') {
      if (stack[stack.length - 1] == 0) {
        // cmd on top, so pop that, and then pop the call_begin or paran_begin
        stack.pop();
        var cmd_begin = cmd_stack[cmd_stack.length - 1];
        this._tokens.splice(cmd_begin + 1, 0, ['CALL_BEGIN', '(']);
        this._tokens.splice(idx + 1, 0, ['CALL_END', ')']);
        cmd_stack.pop();
      }
      else if (stack[stack.length - 1] == 2) {
        stack.pop();
        token[0] = 'PAREN_END';
      }
      else {
        stack.pop();
      }
    }
    else if (token[0] === 'DEF') {
      var try_index = idx + 1, try_token = this._tokens[try_index];
      while (try_token) {
        if (try_token[0] === '\\n') {
          // throw "returning on " + (try_index - idx)
          return try_index - idx;
        }
        try_index++;
        try_token = this._tokens[try_index];
      }
    }
    else if (next && ['RETURN', 'NEXT', 'BREAK', 'SUPER', 'YIELD'].indexOf(token[0]) != -1) {
      if (VALID_CMD_BEGIN.indexOf(next[0]) !== -1) {
        cmd_stack.push(idx);
        stack.push(0);
      }
    }
    // command can start on ientifier, new, return, super
    else if (next && token[0] === 'IDENTIFIER') {
      if (stack[stack.length -1] !== 4) {
        // print("next is " + next.join(','));
        if (VALID_CMD_BEGIN.indexOf(next[0]) !== -1) {
          if (!last || (last[0] !== '.' && last[0] !== 'COLON2' && last[0] !== 'SYMBEG')) {
            token[0] = 'IDENTIFIER2';
          }
          // print("valid cmd arg: " + next.join(","));
          // next is valid as the first command argument
          cmd_stack.push(idx);
          stack.push(0);
        }
        else if (next && (next[0] == 'DO' || next[0] == 'CURLY_BEGIN') && last && last[0] !== '.' && last[0] !== 'COLON2' && last[0] !== 'SYMBEG') {
          token[0] = 'IDENTIFIER2';
          this._tokens.splice(idx + 1, 0, ['CALL_END', ')']);
          this._tokens.splice(idx + 1, 0, ['CALL_BEGIN', '(']);
          return 3;
        }
        else if (next && (next[0] == 'DO' || next[0] == 'CURLY_BEGIN') && last && last[0] == '.') {
          this._tokens.splice(idx + 1, 0, ['CALL_END', ')']);
          this._tokens.splice(idx + 1, 0, ['CALL_BEGIN', '(']);
          return 3;
        }
      }
      else {
        // console.log("was not 4!!");
        // console.log(stack);
      }
    }
    else if (cmd_stack.length > 0 && VALID_CMD_END.indexOf(token[0]) !== -1) {
      // print("in here at " + idx);
      var cmd_begin = cmd_stack[cmd_stack.length - 1];
      this._tokens.splice(cmd_begin + 1, 0, ['CALL_BEGIN', '(']);
      this._tokens.splice(idx + 1, 0, ['CALL_END', ')']);
      cmd_stack.pop();
      return 2;
    }
    else if (cmd_stack.length > 0 && last[0] !== ',' && VALID_CMD_END_COMMAR.indexOf(token[0]) !== -1) {
      var cmd_begin = cmd_stack[cmd_stack.length - 1];
      this._tokens.splice(cmd_begin + 1, 0, ['CALL_BEGIN', '(']);
      this._tokens.splice(idx + 1, 0, ['CALL_END', ')']);
      cmd_stack.pop();
      return 2;
    }
    else if(!next) {
      // EOF, which is a valid cmd end...
    }
    return 1;
  });
};



// marks blocks for special structures as being a special block.. need this
// for name do... and for name {
// Optimizer.prototype.find_for_blocks = function() {
//   var stack = [];
//   this.each(function(last, token, next, idx) {
//     // print(token[0] + idx);
//     if (token[0] === 'FOR' || token[0] === 'FOR_MOD') {
//       stack.push(1);
//     }
//     else if (token[0] === '\n' || token[1] === ';') {
//       stack.pop();
//     }
//     else if (token[0] === 'DO') {
//       if (stack[0] && stack[0] == 1) {
//         token[0] = 'FOR_DO';
//         stack.pop();
//       }
//     }
//     else if (token[0] === '{' || token[0] === 'LBRACE') {
//       if (stack[0] && stack[0] == 1) {
//         token[0] = 'FOR_LBRACE';
//         stack.pop();
//       }
//     }
//     return 1;
//   });
// };

// Find the ending to all the arrar_begin and index_begin with their relative
// array_end and index_end
// 
// This optimization could actually be done during lexing... keep a stack, and
// when get a ']' token, refer to the stack for the last paired item.
Optimizer.prototype.close_arrays_and_indexes = function() {
  // stack of begin/end brackets - 1 = ARRAY_BEGIN, 2 = INDEX_BEGIN
  var stack = [];
  this.each(function(last, token, next, idx) {
    if (token[0] === 'ARRAY_BEGIN') {
      stack.push(1);
    }
    else if (token[0] === 'INDEX_BEGIN') {
      stack.push(2);
    }
    else if (token[0] === ']') {
      if (stack[stack.length - 1] == 1) {
        stack.pop();
        token[0] = 'ARRAY_END';
      }
      else if (stack[stack.length - 1] == 2) {
        stack.pop();
        token[0] = 'INDEX_END';
      }
      else {
        // error occured... mismatched tokens.. leave to parser to gather
        stack[stack.length - 1] = undefined;
      }
    }
    return 1;
  });
  // print(stack.join(' .... '));
};
