/*
  Set a local variable __block__ to either Qnil or the block. Here basically we
  check if the block was intended for us, and then set it to Qnil regardless.
*/
#define USES_BLOCK \
  var __block__ = (rb_block_func == arguments.callee) ? rb_block_proc : Qnil; \
  rb_block_func = rb_block_proc = Qnil;
    

/*
  If no block was given, return an enumerator. This automatically calls 
  USES_BLOCK, so manually calling that is not neceessary.
*/
#define RETURN_ENUMERATOR(obj, mid)	\
  USES_BLOCK \
	if (__block__ == Qnil) \
		rb_raise(rb_eArgError, # mid + " needs to return an enumerator");

/*
  Yields the block. This assumes the block is stored locally as __block__, as it
  will be set using USES_BLOCK
*/
#define YIELD(...) \
  __block__(__block__.__self__, ##__VA_ARGS__)

/*
  Like above, but yield using the given self:
*/
#define YIELD_USING(self, ...) \
 __block__(self, ##__VA_ARGS__) 

/*
  Evaluates to true or false whether a block was given or not. again, relies on
  a variable named __block__ which is given by USES_BLOCK
*/
#define BLOCK_GIVEN \
  (__block__ != Qnil)

/*
  Simply call a method on the receiver. Method MUST exist
*/
#define CALL(recv, mid, ...) \
	recv.$m["$" + mid](recv, ##__VA_ARGS__)

/**
	Ensure that the args given to a js function exactly equals the given count.
*/
#define ARG_COUNT(argc) \
	if ((arguments.length - 1) != argc) {\
    print(arguments.callee);\
		rb_arg_error(arguments.length - 1, argc); }

/**
	Ensure that the args given to a js function is atleast the given num
*/
#define ARG_MIN(argmin) \
	if ((arguments.length - 1) < argmin)  {\
    print(arguments.callee);\
		rb_arg_error(arguments.length - 1, argmin); }
		
#define PRE_LOOP \
	try {

#define POST_LOOP \
	} catch(e) { \
		switch (e.$keyword) { \
			default: \
				throw e; \
		} \
	}
	
#define RTEST(value) (value).$r

#define T_CLASS 			1
#define T_MODULE			2
#define	T_OBJECT			4
#define T_BOOLEAN			8
#define T_STRING			16
#define T_ARRAY				32
#define T_NUMBER  		64
#define T_PROC				128
#define T_SYMBOL			256
#define T_HASH				512
#define T_RANGE				1024
#define T_ICLASS			2056
#define FL_SINGLETON	4112

#define IS_CLASS(value)		(value.$flags & T_CLASS)

#define IS_NUMBER(value)  (value.$flags & T_NUMBER)
#define IS_ARRAY(value)   (value.$flags & T_ARRAY)
#define IS_STRING(value)  (value.$flags & T_STRING)


#define TO_NUMBER(value) \
  if (!IS_NUMBER(value)) { \
    value = to_num(value); \
  }

#define TO_ARRAY(value) \
  if (!IS_ARRAY(value)) { \
    value = to_ary(value); \
  }

#define TO_STRING(value) \
  if (!IS_STRING(value)) { \
    value = to_str(value); \
  }
