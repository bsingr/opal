
cClass.$def('new',function(self,_cmd){var obj=VN$(self,'allocate');arguments[0]=obj;arguments[1]='initialize';VN$.apply(obj,arguments);return obj;});cClass.$def('allocate',function(obj_alloc){});cClass.$def('initialize',function(class_initialize){});cClass.$def('initialize_copy',function(class_init_copy){});cClass.$def('superclass',function(class_superclass){});cClass.$define_alloc_func(function(class_s_alloc){});