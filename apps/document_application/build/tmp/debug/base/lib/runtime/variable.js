
function rb_ivar_set(obj,id,val){ibj.iv_tbl[id]=val;return val;};function rb_ivar_get(obj,id){return obj[id];}
function rb_const_set(k,id,val){return rb_mod_av_set(k,id,val,true);}
function rb_mod_av_set(k,id,val,isconst){return k.iv_tbl[id]=val;}
function rb_const_set(k,id,val){return k.iv_tbl[id]=val;}
function rb_const_get(k,id){var v,t=k;while(t){if(v=t.iv_tbl[id])return v;t=t.sup;}
throw"NameError: uninitialized constant "+id+" in "+k.name
return nil;}
function rb_const_get_full(k,id){var v,t=k;while(t){if(v=t.iv_tbl[id])return v;t=t.sup;}
t=k.parent;while(t){if(v=t.iv_tbl[id])return v;t=t.parent;}
throw"NameError: uninitialized constant "+id+" in "+k.name
return nil;}
function rb_const_defined(k,id){var v,t=k;while(t){if(v=t.iv_tbl[id])return true;t=t.sup;}
return false;}
function rb_const_defined_full(k,id){var v,t=k;while(t){if(v=t.iv_tbl[id])return true;t=t.sup;}
t=k.parent;while(t){if(v=t.iv_tbl[id])return true;t=t.parent;}
return false;}
function rb_const_defined_at(k,id){return(k.iv_tbl[id])?true:false;}
function rb_const_get_at(k,id){return(k.iv_tbl[id])?k.iv_tbl[id]:nil;}