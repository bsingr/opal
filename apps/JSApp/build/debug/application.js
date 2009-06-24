
var AppController=NSObject.extend({init:function(){this._super();return this;},applicationDidFinishLaunching:function(){console.log("Application finished lauchiong");},awakeFromNib:function(sender){console.log("Awoken from nib");}});
var JSApp={CFBundleDevelopmentRegion:"English",CFBundleIconFile:"",CFBundleIdentifier:"com.yourcompany.JSApp",CFBundleName:"JSApp",CFBundlePackageType:"APPL",NSMainNibFile:"MainMenu",NSPrincipalClass:"NSApplication"};
function main(argc,argv)
{return NSApplicationMain(argc,argv);}