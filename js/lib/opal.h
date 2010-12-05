#define RETURN_ENUMERATOR(obj, mid)	\
	if (block == Qnil) \
		rb_raise(rb_eArgError, # mid + " needs to return an enumerator");

#define BLOCK_CALL(block, ...) \
	block(block.__self__, Qnil, ##__VA_ARGS__)
	
#define BLOCK_GIVEN(block) \
  (block != Qnil)

#define RB_CALL(recv, mid, ...) \
	recv.$m[#mid](recv, Qnil, ##__VA_ARGS__)

/**
	Ensure that the args given to a js function exactly equals the given count.
*/
#define ARG_COUNT(argc) \
	if ((arguments.length - 2) != argc) \
		rb_arg_error(arguments.length - 2, argc);

/**
	Ensure that the args given to a js function is atleast the given num
*/
#define ARG_MIN(argmin) \
	if ((arguments.length - 2) < argmin) \
		rb_arg_error(arguments.length - 2, argmin);
		
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
