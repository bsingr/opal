/**
  IO
  ==
  
  
  Every IO instance (and file, and all other sunclasses) will have a .$fp
  property that holds the following information:
  
  * fd - file descriptor
  * pathv - path of file
*/
var rb_cIO;

var rb_eIOError;

var rb_eEOFError;

function rb_f_gets() {
	return "need to get some data";
}

/**
  File.open, IO.open
  
  With no block, this will just File.new or IO.new and return the instance. 
  File.new takes a filename, and IO.new takes a fd. If a block is given, then
  the file will be yielded to the block, and then the file will be closed so no
  futher IO can take place.
*/
function io_s_open(klass, mid) {
  USES_BLOCK
  
  var args = Array.prototype.slice.call(arguments);
  args[1] = "new";
  
  var io = rb_call.apply(null, args);
  
  if (BLOCK_GIVEN) {
    YIELD(io);
    io_close(io, "close");
  }
  
  return io;
}

/**
  IO.read(name)   # => string
  
  Opens the file named +name+, reads all its contents, then closes the file.
*/
function io_s_read(io, mid, name) {
  print("doing this read for " + name);
  // rb_raise(rb_eException, "IO.read not yet implemented");
  
  var fd = opal_file_open(name);
  
  // if file does not exist
  if (fd < 0) rb_raise(rb_eIOError, "No such file or directory - " + name);
  
  var str = opal_file_read(fd);
  opal_file_close(fd);
  return str;
}

/**
  IO#initialize(fd [, mode] [, opt]) # => io
  
  Given the numeric file descriptor (fd), initializes the IO object.
*/
function io_initialize(io, mid, fd) {
  var fp = {};
  
  io.$fp = fp;
  
  // file descriptor
  fp.fd = fd;
  
  
}

/**
  File#initialize(filename [, mode] [, perm] [, options]) # => file
  
  Open a file using the given filename
*/
function file_initialize(io, mid, filename, mode, perm, options) {
  var fp = {};
  io.$fp = fp;
  
  fp.pathv = filename;
  fp.fd = opal_file_open(filename);
  return io;
}

/**
  Reads at most +length+ bytes from the I/O stream, or to EOF if length is not
  given. Returns string
  
  @example
    
    f = File.new("some_file")
    f.read()    # => "Some file content"
  
  @todo For now, length is ignored and whole file is read
*/
function io_read(io, mid, length) {
  var fd = io.$fp.fd;
  return opal_file_read(fd);
}

/**
  Closes the IO instance. The stream is then closed, so any further attempts for
  IO on the file will raise an error. 
  
  @example
  
    f = File.new("some_file")
    f.close()   # => nil
*/
function io_close(io) {
  print("closing IO");
  return Qnil;
}

/**
  IO#inspect    # => string
  
  Returns string description of this IO instance
*/
function io_inspect(io, mid) {
  ARG_COUNT(0)
  
  var fp = io.$fp;
  
  var closed_p = (fp.fd < 0) ? " (closed)" : "";
  
  return "#<IO:" + fp.pathv + closed_p + ">";
}

/**
  IO#fileno   # => num
  
  Returns file number (descriptor)
*/
function io_fileno(io, mid) {
  ARG_COUNT(0)
  
  return io.$fp.fd;
}

/**
  Used to check if the IO is already closed. If it is, raises an error. This is
  used to check if a IO is still open before an operation takes place. This will
  automatically be called when needed (this is not a ruby method). A closed file
  will have a fd of -1.
*/
function io_check_closed(io) {
  if (io.$fd < 0)
    rb_raise(rb_eIOError, "closed stream");
}

function Init_IO() {
  
  rb_eIOError = rb_define_class("IOError", rb_eStandardError);
  
	rb_define_global_function("gets", rb_f_gets);
	
	rb_cIO = rb_define_class("IO", rb_cObject);
	
	rb_define_singleton_method(rb_cIO, "open", io_s_open);
	rb_define_singleton_method(rb_cIO, "read", io_s_read);
	
	rb_define_method(rb_cIO, "initialize", io_initialize);
	rb_define_method(rb_cIO, "read", io_read);
	rb_define_method(rb_cIO, "inspect", io_inspect);
	rb_define_method(rb_cIO, "fileno", io_fileno);
	
	Init_File();
	
	rb_define_method(rb_cFile, "initialize", file_initialize);
};
