// 
//  dlfcn.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-06.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// typedef struct {
//     const char  *dli_fname;
//     void        *dli_fbase;
//     const char  *dli_sname;
//     void        *dli_saddr;
// } Dl_info;
 
// extern int dladdr(const void *, Dl_info *);
function dladdr()
{
    
}
 
// extern int dlclose(void *module);
function dlclose(module)
{
    
}

// extern char *dlerror(void);
function dlerror()
{
    
}

// extern void *dlopen(const char *path, int mode, void *callback);
function dlopen(path, mode, callback)
{
    var e = document.createElement("script");
   	e.src = path + "?" + new Date().getTime();
   	e.type = "text/javascript";
   	e.onload = callback;
   	e.onreadystatechange = function() {
   	    if (this.readyState == 'loaded' && !window.opera)
   	    {
   	        callback();
   	    }
   	};
   	document.getElementsByTagName("head")[0].appendChild(e);
}

// extern void *dlsym(void *module, const char *symbol);
function dlsym(module, symbol)
{
    
} 
