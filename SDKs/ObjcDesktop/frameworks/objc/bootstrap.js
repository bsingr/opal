// // 
// //  bootstrap.js
// //  vienna
// //  
// //  Created by Adam Beynon on 2009-06-05.
// //  Copyright 2009 Adam Beynon. All rights reserved.
// // 
// 
// // Bootstrap code has finished. this is used to identify when main() can be called
// var __bootstrap_completed = false;
// 
// // CFDictionaryRef for all the files that are downloaded (in cache).
// // If a file is not in this, then it needs to be downloaded..
// // keys => file path
// // values => CFDataRef of file
// var __bootstrap_files = null;
// 
// var __bootstrap_bundles = {};
// // Hash of class object(the class, not a string version.)
// var __bootstrap_bundles_for_class = {};
// // current bundle that objc is processing
// var __bootstrap_bundles_current = null;
// 
// // CFBundleRef for the main (application) bundle.
// var __bootstrap_main_bundle = null;
// 
// // CFArrayRef of files to load. main() will not be called until all these images are loaded.
// // Custom views etc can use this to ensure that images are "ready to go" when ready to draw.
// // 
// // Trying to draw images otherwise may cause application to hang until images are downloaded..
// // This also stores the main xib file for the application, so this needs to be ready as well.
// var __bootstrap_preload_files = [];
// 
// // extern void __bootstrap_main(void);
// // 
// function __bootstrap_main()
// {
//   __bootstrap_files = CFDictionaryCreateMutable();
//   __bootstrap_link();
// }
// 
// function __bootstrap_link()
// {
//  var the_framework = __bootstrap_frameworks.shift();
//                  
//  if (the_framework == null)
//  {
//    if (__bootstrap_completed)
//    {
//      var main_bundle_dictionary = CFBundleGetMainBundle()._infoDictionary;
//            
//      if (CFDictionaryContainsKey(main_bundle_dictionary, "NSMainNibFile"))
//      {
//        var nib_data = CFDataCreateFromURL("Resources/" + CFDictionaryGetValue(main_bundle_dictionary, "NSMainNibFile") + ".xib", function() {
//                 
//          __bootstrap_preload_finished(nib_data);
//        });
//        
//        CFArrayAppendValue(__bootstrap_preload_files, nib_data);
//      }       
//    }
//    else
//    {
//      var new_bundle = CFBundleCreate("Info.plist", function() {
//         // When plist is loaded....
//         __bootstrap_main_bundle = new_bundle;
//         
//         if(CFDictionaryContainsKey(new_bundle._infoDictionary, "CFBundleExecutable"))
//         {
//           __bootstrap_bundles_current = new_bundle;
//           dlopen(CFDictionaryGetValue(new_bundle._infoDictionary, "CFBundleExecutable") + ".js", 0, function() {
//             __bootstrap_completed = true;
//            __bootstrap_link();
//           });
//         }      
//      });
//    }
//  }
//  else
//  {
//    var new_bundle = CFBundleCreate("Frameworks/" + the_framework + "/Info.plist", function() {
//       // When plist is loaded....
//       if(CFDictionaryContainsKey(new_bundle._infoDictionary, "CFBundleExecutable"))
//       {
//         __bootstrap_bundles_current = new_bundle;
//         dlopen("Frameworks/" + the_framework + "/" + CFDictionaryGetValue(new_bundle._infoDictionary, "CFBundleExecutable") + ".js", 0, function() {
//          __bootstrap_link();
//         });
//       }      
//    });
//  }
// }
// 
// // We finished loading this item..
// function __bootstrap_preload_finished(item)
// {
//   NSLog(CFArrayGetCount(__bootstrap_preload_files));
//   CFArrayRemoveValueAtIndex(__bootstrap_preload_files, CFArrayGetFirstIndexOfValue(__bootstrap_preload_files, null, item));
//   
//   if((CFArrayGetCount(__bootstrap_preload_files) == 0) && __bootstrap_completed)
//   {
//     main(1, ["SimpleApp"]);
//   }
// }
// 

// Cached files (plists, xibs etc)
var __bootstrap_files = null;
// Simple Array of files (yet) to finished downloading... run main once complete
var __bootstrap_preload_files = [];
// All bundles
var __bootstrap_bundles = {};
// Hash of class object(the class, not a string version.)
var __bootstrap_bundles_for_class = {};
// current bundle that objc is processing
var __bootstrap_bundles_current = null;

// CFBundleRef for the main (application) bundle.
var __bootstrap_main_bundle = null;

// 
var __bootstrap_finished_linking_stage = false;

// Main bootstrap entry point (on window load)
function __bootstrap_main()
{
  __bootstrap_files = CFDictionaryCreateMutable();
  __bootstrap_link_next_bundle();
}

function __bootstrap_link_next_bundle()
{
  var the_framework = __bootstrap_frameworks.shift();
  
  if (the_framework)
  {
    var new_bundle = CFBundleCreate("Frameworks/" + the_framework + "/Info.plist", function() {
      printf("Finished loading plist for bundle: " +  CFDictionaryGetValue(__bootstrap_bundles_current._infoDictionary, "CFBundleName"));
      
      dlopen("Frameworks/" + the_framework + "/" + CFDictionaryGetValue(__bootstrap_bundles_current._infoDictionary, "CFBundleExecutable") + ".js", 0, function() {
        __bootstrap_link_next_bundle();
      });
    });
    __bootstrap_bundles_current = new_bundle;
  }
  else
  {
    printf("Now trying to load application");
    
    var new_bundle = CFBundleCreate("Info.plist", function() {
      printf("Finished loading plist for bundle: " +  CFDictionaryGetValue(__bootstrap_bundles_current._infoDictionary, "CFBundleName"));
      
      dlopen(CFDictionaryGetValue(__bootstrap_bundles_current._infoDictionary, "CFBundleExecutable") + ".js", 0, function() {
        // __bootstrap_link_next_bundle();
        printf("Finished loading application!");
        
        var nib_data = CFDataCreateFromURL("Resources/" + CFDictionaryGetValue(__bootstrap_main_bundle._infoDictionary, "NSMainNibFile") + ".xib", function()
        {
          __bootstrap_preload_item_finished(nib_data);
        });
               
        CFArrayAppendValue(__bootstrap_preload_files, nib_data);
        
        __bootstrap_finished_linking_stage = true;
        __bootstrap_check_application_state();
      });
    });
    __bootstrap_main_bundle = new_bundle
    __bootstrap_bundles_current = new_bundle;
  }
}

function __bootstrap_check_application_state()
{
  if(__bootstrap_finished_linking_stage && __bootstrap_preload_files.length == 0)
  {
    printf("Ready to run application");
    main(1, ["SimpleApp"]);
  }
}

function __bootstrap_preload_item_finished(item)
{
  printf("finished loading an item");
  CFArrayRemoveValueAtIndex(__bootstrap_preload_files, CFArrayGetFirstIndexOfValue(__bootstrap_preload_files, null, item));
  __bootstrap_check_application_state();
}

