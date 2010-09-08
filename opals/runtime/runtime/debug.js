//  DEBUG

// only do this if we want a stack trace
if (STACK_TRACE) {
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

      push: function(m_id, obj, body) {
        // console.log("calling " + m_id + " on " + obj.class_name);
        this.stack.push([m_id, obj, body.__opal_file__, body.__opal_line__]);
      },

      pop: function(m_id, obj) {
        this.stack.pop();
      },

      backtrace: function() {
        // console.log("stack is:");
        // console.log(this.stack);
       var trace,  i = this.stack.length;
       while (i--) {
         trace = this.stack[i];
         // print object + method name..
         // console.log(trace[2] + ':0:in ' + trace[1].class_name + (trace[1].info & T_OBJECT ? '#' : '.') + trace[0]);
         // print just method name (and file..)
         console.log(trace[2] + ':' + trace[3] + ':in `' + trace[0] + '`');
          // print just method name (and file..)
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
        // we want to print the error (or throw it) and then print the stack. We
        // must set a timeout to print the stack and all will be well.
        setTimeout(function() {
          stack_tracer.backtrace();
        }, 0);
        throw e;
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
        stack_tracer.push(mid, this, body);
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

    
  })();
};
