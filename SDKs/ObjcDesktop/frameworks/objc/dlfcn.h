// 
//  dlfcn.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-06.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

typedef struct {
    const char  *dli_fname;
    void        *dli_fbase;
    const char  *dli_sname;
    void        *dli_saddr;
} Dl_info;

// typedef void (*CFArrayReleaseCallBack)(int allocator, const void *value);

extern int dladdr(const void *, Dl_info *);

extern int dlclose(void *module);
extern char *dlerror(void);
extern void *dlopen(const char *path, int mode, void (^callback)(void));
extern void *dlsym(void *module, const char *symbol);
