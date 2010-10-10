//  DEBUG
if (false) {
// only do this if we want a stack trace
  (function() {
    // Our stack trace class - js prototpye based class
    var StackTracer = function() {
      this.stack = [];
      this.file_stack = [];
      return this;
    };

    StackTracer.prototype = {
      
      reset: function() {
        this.stack = [];
        this.file_stack = [];
        return this;
      },

      start_file: function(filename) {
        this.file_stack.push(filename);
      },

      end_file: function() {
        this.file_stack.pop();
      },

      current_file: function() {
        return this.file_stack[this.file_stack.length - 1];
      },

      push: function(frame) {
        // console.log("calling " + m_id + " on " + obj.class_name);
        this.stack.push(frame);
      },

      pop: function(m_id, obj) {
        this.stack.pop();
      },

      backtrace: function() {
        
        // did we find null or undefined (mark as warning)
        var found_warning = false;
        
        // call $inspect on recv, but catches errors.. when we get an error we
        // return <undefined> or <null> to indicate we probably have null (or 
          // undefined where it should not be
        var inspect = function(recv) {
          try {
            return recv.$inspect();
          } catch (e) {
            found_warning = true;
            if (recv === undefined) 
              return "<undefined>";
            else if (recv === null)
              return "<null>";
            else
              return "<error>";
          }
        };
        // console.log("stack is:");
        // console.log(this.stack);
       var frame, str,  i = this.stack.length;
       while (i--) {
         // reset warning
         found_warning = false
         
         frame = this.stack[i];
         // console.log(frame);
         var args = frame.args;
         
         var str = '  from ' + frame.body.__opal_file__ + ':' + frame.body.__opal_line__ + ':in ' + inspect(frame.recv) + '.' + frame.mid;
         
         // console.log(frame.recv.$inspect());
         
         if (args.length > 0) {
           str += '(';
           for (var j = 0; j < args.length; j++) {
             if (j > 0) str += ', ';
             str += inspect(args[j]);
           }
           str += ')';
         } else {
           str += '()';
         }
         
         
         found_warning ? console.warn(str) : console.log(str);
       } 
      }
    };
    
    // our global stack tracking object
    var stack_tracer = exports.stack_trace = new StackTracer();
    
    // When loading raw files (used for core library), set the right filename
    var old_load_raw_file = exports.load_raw_file;
    exports.load_raw_file = function(filename, implementation) {
      stack_tracer.start_file(filename);
      var result = old_load_raw_file.apply(this, arguments);
      stack_tracer.end_file();
      return result;
    };
    
    // Replace the file_require_path method to make calls to stack_tracer
    var old_file_require_path = file_require_path;
    file_require_path = function(path) {
      stack_tracer.start_file(path);
      var result = old_file_require_path.apply(this, arguments);
      stack_tracer.end_file();
      return result;
    };
    
    
    // Our entry point must be modified to actually capture these potential
    // errors and then log the backtrace. Also, every time we begin an entry 
    // point, we must reset the stack tracer (it should be reset automatically 
    // by the right number of methods popping themselves off, but lets make sure
    // anyway)
    exports.entry_point = function(func) {
      stack_tracer.reset();
      try {
        return func();
      }
      catch (e) {
        console.error(e.toString());
        stack_tracer.backtrace();
      }
    };
    
    // Replace the define method function. The new implementation replaces the
    // given body with a custom body that marks when the method is called, and
    // then when it leaves. This is pushed/popped to the stack so we can keep
    // track of the call chain. The generatr actually gives us our line number
    // for each egneerated method, so in debug mode lets actuqllly use it
    var old_dm = __boot_base_class.prototype.dm;
    // wrap the given function so we can log traces
    var wrap = function(mid, body, singleton, line_number) {
      // keep track of what was defined where
      body.__opal_file__  = stack_tracer.current_file();
      body.__opal_line__ = line_number;
      // new implementation
      return function() {
        // console.log("calling " + mid);
        // stack_tracer.push(mid, this, body);
        stack_tracer.push({
          mid: mid,
          recv: this,
          body: body,
          args: Array.prototype.slice.call(arguments)
        });
        var result = body.apply(this, arguments);
        stack_tracer.pop();
        // console.log("finished calling " + mid);
        return result;
      };
    };

    __boot_base_class.prototype.dm = function(m_id, body, singleton, line) {
      // console.log("adding " + m_id);
      body = wrap(m_id, body, singleton, line);
      return old_dm.apply(this, [m_id, body, singleton]);
    };
    
    
    // In debug mode we support method_missing. This is ONLY FOR DEBUG mode.
    // This is not to be used for metaprgramming. Basically method_missing 
    // allows us to have nicer output from our method missing calls instead of
    // "this.ig("@adam").$do_something(....etc....)" we get normal ruby
    // formatted message. (ms = message_send)
    __boot_base_class.prototype.ms = function(mid) {
      // args are all the args after initial mid
      var args = Array.prototype.slice.call(arguments);
      // we could really do all the stack tracing in here..?
      
      //FIXME: incompletet
    };
    
  })();
}
