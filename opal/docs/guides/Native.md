Opal Interactions with native objects
=====================================
This document describes how opal is implemented in terms of mapping above the
native objects/classes/elements in the browser. Mapping to native objects is a 
key target of Opal where possible. Mapping to native objects increases the
efficiency in which Opal can run. By layering a ruby runtime on top of 
Javascript, which is already a virtual environment, creates an efficiency
problem. Using native javascript features helps reduce this overhead.

Objects, Classes and Modules
----------------------------
Core objects in "real ruby" are implemented using C structs. Vanilla objects in
ruby help to mimic these structures, and are indeed used to hold object info at
runtime. The basis of these three core structs are RObject and RClass; where 
the latter is used for the last two. Classes and Modules are, at their core,
identical from Opals perspective: the only difference is a flag value set on
a Module differs from that of a Class.

    function RObject(klass) {
      this.klass = klass;
      this.flags = T_OBJECT;
      this.m_tbl = { };
      this.iv_tbl = { };
      return this;
    };

RClass

    function RClass() {
      this.klass ...
      this.sup ...
      this.m_tbl ...
      this.iv_tbl ...
      this.flags = T_CLASS ... T_SINGLETON
    }