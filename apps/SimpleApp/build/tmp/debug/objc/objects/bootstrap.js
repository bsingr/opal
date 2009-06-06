// 
//  bootstrap.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// Bootstrap code has finished. this is used to identify when main() can be called
var __bootstrap_completed = false;

// a cache of any files that have been downloaded. Filename as key, and data as value
// When a file is realeased, it is removed from the cache. So if it is not listed, then
// it will need downloading.
// 
// Note: files are stored as data: i.e. a big string with all the contents of the file.
var __bootstrap_files = {};


var __bootstrap_bundles = {};
var __bootstrap_bundles_for_class = {};

// extern void __bootstrap_main(void);
// 
function __bootstrap_main()
{
    __bootstrap_link();
}


// Path to the bundle. for example:
// 
// - "Info.plist" - this will load the main bundle (main application)
// - "Frameworks/AppKit/Info.plist" - this will load the AppKit bundle
// - "" - this is the same as "Info.plist"
// - "Frameworks/AppKit" - this is the sane as "Frameworks/AppKit/Info.plist"
// 
// Info.plist (or json equivalent is loaded before the code for the bundle), as
// the plist instructs as to the name of the executable. Also, objc can then 
// maintain a list of the classes belonging to respective bundles etc.
// 
function __bootstrap_link_bundle(bundle_url)
{
    
}

function __bootstrap_link()
{
	// slice array and add each framework to page, with onload to trigger this function again
	// when all frameworks are done, add application, then call main() (after app loads)
	var the_framework = __bootstrap_frameworks.shift();
									
	if (the_framework == null)
	{
		if (__bootstrap_completed)
		{
			// all frameworks and app have loaded, so call main
			// 
			// By default, 1 argument, which is the app name (compatible c?!?!?!?!)
			main(1, ['SimpleApp']);
		}
		else
		{
			var e = document.createElement("script");
			e.src = __bootstrap_application + ".js";
			e.type = "text/javascript";
			e.onload = function() { console.log(__bootstrap_application + " loaded"); __bootstrap_link(); };
			__bootstrap_completed = true;
			document.getElementsByTagName("head")[0].appendChild(e);
		}
	}
	else
	{
		var e = document.createElement("script");
		e.src = "Frameworks/" + the_framework + "/" + the_framework + ".js";
		e.type = "text/javascript";
		e.onload = function() { console.log(the_framework + " loaded"); __bootstrap_link(); };
		document.getElementsByTagName("head")[0].appendChild(e);
	}
}
