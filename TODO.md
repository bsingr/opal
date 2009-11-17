Rewrtie ANDTEST/ORTEST
======================
rewrite to use native && / ||
Place an andtest around lhs/rhs respectively, to replace nil with false. If we dont use native
and/or, then the rhs will be exectured anyway which isnt the intention. rhs should only be 
exectuted repecteivly. fix this asap 