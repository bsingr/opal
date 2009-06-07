// 
//  bootstrap.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// Bootstrap code has finished. this is used to identify when main() can be called
var __bootstrap_completed = false;

// CFDictionaryRef for all the files that are downloaded (in cache).
// If a file is not in this, then it needs to be downloaded..
// keys => file path
// values => CFDataRef of file
var __bootstrap_files = null;

var __bootstrap_bundles = {};
var __bootstrap_bundles_for_class = {};

// CFBundleRef for the main (application) bundle.
var __bootstrap_main_bundle = null;

// extern void __bootstrap_main(void);
// 
function __bootstrap_main()
{
    __bootstrap_files = CFDictionaryCreateMutable();
    __bootstrap_link();
}

function __bootstrap_link()
{
	var the_framework = __bootstrap_frameworks.shift();
									
	if (the_framework == null)
	{
		if (__bootstrap_completed)
		{
		    var main_bundle_dictionary = CFBundleGetMainBundle()._infoDictionary;
		    		    
		    if (CFDictionaryContainsKey(main_bundle_dictionary, "NSMainNibFile"))
		    {
		        var nib_data = CFDataCreateFromURL("Resources/" + CFDictionaryGetValue(main_bundle_dictionary, "NSMainNibFile") + ".xib", function() {
		            	           
                   // Once the main nib has loaded, we can now call main.
                   // This avoids us calling main and then having to wait for the main nib file to load.
                   // main(1, ['SimpleApp']);
                   var new_data = CFDataCreateFromURL("Resources/" + CFDictionaryGetValue(main_bundle_dictionary, "NSMainNibFile") + ".xib", function() {

                      // Once the main nib has loaded, we can now call main.
                      // This avoids us calling main and then having to wait for the main nib file to load.
                      // main(1, ['SimpleApp']);
   		        });
		        });
		    }			
		}
		else
		{
		    var new_bundle = CFBundleCreate("Info.plist", function() {
                // When plist is loaded....
                __bootstrap_main_bundle = new_bundle;
                
                if(CFDictionaryContainsKey(new_bundle._infoDictionary, "CFBundleExecutable"))
                {
                    dlopen(CFDictionaryGetValue(new_bundle._infoDictionary, "CFBundleExecutable") + ".js", 0, function() {
                        __bootstrap_completed = true;
        		        __bootstrap_link();
                    });
                }	        
		    });
		}
	}
	else
	{
	    var new_bundle = CFBundleCreate("Frameworks/" + the_framework + "/Info.plist", function() {
            // When plist is loaded....
            if(CFDictionaryContainsKey(new_bundle._infoDictionary, "CFBundleExecutable"))
            {
                dlopen("Frameworks/" + the_framework + "/" + CFDictionaryGetValue(new_bundle._infoDictionary, "CFBundleExecutable") + ".js", 0, function() {
    		        __bootstrap_link();
                });
            }	        
	    });
	}
}
