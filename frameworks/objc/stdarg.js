// 
//  stdarg.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// void va_start(va_list ap, void *last); 
// 
function va_start(ap, last)
{
    var foundIndex;
	for (var i = 0; i < ap.all.length; i++)
	{
		if (ap.all[i] == last)
		{
			foundIndex = i;
			break;
		}
	}
	
	for (var j = foundIndex + 1; j < ap.all.length; j++)
		ap.trailing.push(ap.all[j]);
}

// void *va_arg(va_list ap, void *type); 
// 
function va_arg(ap, type)
{
	if (ap.trailing.length == 0)
		return false;

	return ap.trailing.shift();
}

// void va_end(va_list ap); 
// 
function va_end(ap)
{
    // Nothing really to do...
}

// void va_copy(va_list dest, va_list src);
// 
function va_copy(dest, src)
{
    // FIXME: Need to implemenet
}
