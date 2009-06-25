
var initializing=false,fnTest=/xyz/.test(function(){xyz;})?/b_superb/:/.*/;this.Class=function(){};Class.extend=function(prop){var _super=this.prototype;initializing=true;var prototype=new this();initializing=false;for(var name in prop){prototype[name]=typeof prop[name]=="function"&&typeof _super[name]=="function"&&fnTest.test(prop[name])?(function(name,fn){return function(){var tmp=this._super;this._super=_super[name];var ret=fn.apply(this,arguments);this._super=tmp;return ret;};})(name,prop[name]):prop[name];}
function Class(){if(!initializing){if(arguments.length==0){this.init.apply(this,arguments);}
else{var args=[],idx=1;for(;idx<arguments.length;idx++){args.push(arguments[idx])}
this[arguments[0]].apply(this,args);}}}
Class.prototype=prototype;Class.constructor=Class;Class.extend=arguments.callee;return Class;};
var include=function include(){};var YES=true;var NO=false;if(typeof console==='undefined'){var console=console||window.console||{};console.log=console.info=console.warn=console.error=function(){};}
var NSObject=Class.extend({});
var NSCoder=NSObject.extend({});
var NSInconsistentArchiveException="NSInconsistentArchiveException";var NSArchiver=NSCoder.extend({initForWritingWithMutableData:function(mdata){},archiverData:function(){},encodeRootObject:function(rootObject){},encodeConditionalObject:function(object){},archivedDataWithRootObject:function(rootObject){},archiveRootObject:function(rootObject,path){}});var NSUnarchiver=NSCoder.extend({initForReadingWidthData:function(data){},isAtEnd:function(){},unarchiveObjectWithData:function(data){},unarchiveObjectWithFile:function(path){},replaceObject:function(object,newObject){}});
NSArray={};
NSBundle=NSObject.extend({});
var NSInvalidArchiveOperationException="NSInvalidArchiveOperationException";var NSInvalidUnarchiveOperationException="NSInvalidUnarchiveOperationException";var NSKeyedArchiver=NSCoder.extend({archivedDataWithRootObject:function(rootObject){},archiveRootObjectToFile:function(rootObject,path){},initForWritingWithMutableData:function(data){},setDelegate:function(delegate){},delegate:function(){},setOutputFormat:function(format){},outputFormat:function(){},finishEncoding:function(){},setClassNameForClass:function(codedName,cls){},classNameForClass:function(cls){},encodeObjectForKey:function(object,key){},encodeConditionalObjectForKey:function(object,key){},encodeBoolForKey:function(aBool,key){},encodeIntForKey:function(anInt,key){},encodeFloatForKey:function(aFloat,key){},encodeDoubleForKey:function(aDouble,key){}});var NSKeyedUnarchiver=NSCoder.extend({initForReadingWithData:function(data){this.init();this._data=data;this._rootDict=CFPropertyListFromData(this._data.bytes());this._contentStack=new NSArray();this._contentStack.addObject(this._rootDict);this._unarchivedObjects=new NSDictionary();return this;},setDelegate:function(delegate){},delegate:function(){},finishDecoding:function(){},containsValueForKey:function(key){var theContext=this._contextStack.lastObject();return NO;},decodeObjectForKey:function(key){var theContext=this._contextStack.lastObject();if(theContext.typeOf==NSArray){var a,array=new NSArray();for(a in theContext){this._contextStack.addObject(a);array.addObject(this._decodeObject(a));this._contextStack.removeLastObject();}
return array;}
var theObject=theContext.objectForKey(key);return this._decodeObject(theObject);},_decodeObject:function(theObject){if(!theObject)return null;var theClass=NSClassFromString(theObject.objectForKey("class"));if(!theClass){}
var newObject=new theClass();}});
var CGAffineTransformIdentity={};function CGAffineTransformMake(a,b,c,d,tx,ty)
{}
function CGAffineTransformMakeTranslation(tx,ty)
{}
function CGAffineTransformMakeScale(sx,sy)
{}
function CGAffineTransformMakeRotation(angle)
{}
function CGAffineTransformIsIdentity(t)
{}
function CGAffineTransformTranslate(t,tx,ty)
{}
function CGAffineTransformScale(t,sx,sy)
{}
function CGAffineTransformRotate(t,angle)
{}
function CGAffineTransformInvert(t)
{}
function CGAffineTransformConcat(t1,t2)
{}
function CGAffineTransformEqualToTransform(t1,t2)
{}
function CGPointApplyAffineTransform(point,t)
{}
function CGSizeApplyAffineTransform(size,t)
{}
function CGRectApplyAffineTransform(rect,t)
{}
function CTFontRef()
{};var kCTFontCopyrightNameKey="kCTFontCopyrightNameKey";var kCTFontFamilyNameKey="kCTFontFamilyNameKey";var kCTFontSubFamilyNameKey="kCTFontSubFamilyNameKey";var kCTFontStyleNameKey="kCTFontStyleNameKey";var kCTFontUniqueNameKey="kCTFontUniqueNameKey";var kCTFontFullNameKey="kCTFontFullNameKey";var kCTFontVersionNameKey="kCTFontVersionNameKey";var kCTFontPostScriptNameKey="kCTFontPostScriptNameKey";var kCTFontTrademarkNameKey="kCTFontTrademarkNameKey";var kCTFontManufacturerNameKey="kCTFontManufacturerNameKey";var kCTFontDesignerNameKey="kCTFontDesignerNameKey";var kCTFontDescriptionNameKey="kCTFontDescriptionNameKey";var kCTFontVendorURLNameKey="kCTFontVendorURLNameKey";var kCTFontDesignerURLNameKey="kCTFontDesignerURLNameKey";var kCTFontLicenseNameKey="kCTFontLicenseNameKey";var kCTFontLicenseURLNameKey="kCTFontLicenseURLNameKey";var kCTFontSampleTextNameKey="kCTFontSampleTextNameKey";var kCTFontPostScriptCIDNameKey="kCTFontPostScriptCIDNameKey";var kCTFontVariationAxisIdentifierKey="kCTFontVariationAxisIdentifierKey";var kCTFontVariationAxisMinimumValueKey="kCTFontVariationAxisMinimumValueKey";var kCTFontVariationAxisMaximumValueKey="kCTFontVariationAxisMaximumValueKey";var kCTFontVariationAxisDefaultValueKey="kCTFontVariationAxisDefaultValueKey";var kCTFontVariationAxisNameKey="kCTFontVariationAxisNameKey";var kCTFontFeatureTypeIdentifierKey="kCTFontFeatureTypeIdentifierKey";var kCTFontFeatureTypeNameKey="kCTFontFeatureTypeNameKey";var kCTFontFeatureTypeExclusiveKey="kCTFontFeatureTypeExclusiveKey";var kCTFontFeatureTypeSelectorsKey="kCTFontFeatureTypeSelectorsKey";var kCTFontFeatureSelectorIdentifierKey="kCTFontFeatureSelectorIdentifierKey";var kCTFontFeatureSelectorNameKey="kCTFontFeatureSelectorNameKey";var kCTFontFeatureSelectorDefaultKey="kCTFontFeatureSelectorDefaultKey";var kCTFontFeatureSelectorSettingKey="kCTFontFeatureSelectorSettingKey";var kCTFontOptionsDefault=0;var kCTFontOptionsPreventAutoActivation=1<<0;var kCTFontOptionsPreferSystemFont=1<<2;var kCTFontNoFontType=-1;var kCTFontUserFontType=0;var kCTFontUserFixedPitchFontType=1;var kCTFontSystemFontType=2;var kCTFontEmphasizedSystemFontType=3;var kCTFontSmallSystemFontType=4;var kCTFontSmallEmphasizedSystemFontType=5;var kCTFontMiniSystemFontType=6;var kCTFontMiniEmphasizedSystemFontType=7;var kCTFontViewsFontType=8;var kCTFontApplicationFontType=9;var kCTFontLabelFontType=10;var kCTFontMenuTitleFontType=11;var kCTFontMenuItemFontType=12;var kCTFontMenuItemMarkFontType=13;var kCTFontMenuItemCmdKeyFontType=14;var kCTFontWindowTitleFontType=15;var kCTFontPushButtonFontType=16;var kCTFontUtilityWindowTitleFontType=17;var kCTFontAlertHeaderFontType=18;var kCTFontSystemDetailFontType=19;var kCTFontEmphasizedSystemDetailFontType=20;var kCTFontToolbarFontType=21;var kCTFontSmallToolbarFontType=22;var kCTFontMessageFontType=23;var kCTFontPaletteFontType=24;var kCTFontToolTipFontType=25;var kCTFontControlContentFontType=26;function CTFontCreateWithName(name,size,matrix)
{}
function CTFontCreateWithFontDescriptor(descriptor,size,matrix)
{}
function CTFontCreateUIFontForLanguage(uiType,size,language){}
function CTFontCreateCopyWithAttributes(font,size,matrix,attributes){}
function CTFontCreateCopyWithSymbolicTraits(font,size,matrix,symTraitValue,symTraitMask){}
function CTFontCreateCopyWithFamily(font,size,matrix,family){}
function CTFontCreateForString(currentFont,string,range){}
function CTFontCopyFontDescriptor(font){}
function CTFontCopyAttribute(font,attribute){}
function CTFontGetSize(font){}
function CTFontGetMatrix(font){}
function CTFontGetSymbolicTraits(font){}
function CTFontCopyTraits(font){}
function CTFontCopyPostScriptName(font){}
function CTFontCopyFamilyName(font){}
function CTFontCopyFullName(font){}
function CTFontCopyDisplayName(font){}
function CTFontCopyName(font,nameKey){}
function CTFontCopyLocalizedName(font,nameKey,language){}
function CTFontCopyCharacterSet(font){}
function CTFontGetStringEncoding(font){}
function CTFontCopySupportedLanguages(font){}
function CTFontGetGlyphsForCharacters(font,characters,glyphs,count){}
function CTFontGetAscent(font){}
function CTFontGetDescent(font){}
function CTFontGetLeading(font){}
function CTFontGetUnitsPerEm(font){}
function CTFontGetGlyphCount(font){}
function CTFontGetBoundingBox(font){}
function CTFontGetUnderlinePosition(font){}
function CTFontGetUnderlineThickness(font){}
function CTFontGetSlantAngle(font){}
function CTFontGetCapHeight(font){}
function CTFontGetXHeight(font){}
function CTFontGetGlyphWithName(font,glyphName){}
function CTFontGetBoundingRectsForGlyphs(font,orientation,glyphs,boundingRects,count){}
function CTFontGetAdvancesForGlyphs(font,orientation,glyphs,advances,count){}
function CTFontGetVerticalTranslationsForGlyphs(font,glyphs,translations,count){}
function CTFontCreatePathForGlyph(font,glyph,transform){}
function CTFontCopyVariationAxes(font){}
function CTFontCopyVariation(font){}
function CTFontCopyFeatures(font){}
function CTFontCopyFeatureSettings(font){}
var CT={};
var NSResponder=NSObject.extend({});
var NSApplication=NSResponder.extend({_delegate:null,_windows:[],_currentEvent:null,_eventQueue:[],_eventBindingQueued:false,_eventBindingTarget:null,_eventBindingBlock:null,_eventBindingMask:null,_menuBar:null,init:function(){this._super();},sharedApplication:function(){},setDelegate:function(anObject){},delegate:function(){},context:function(){},windowWithWindowNumber:function(windowNum){},windowAtPoint:function(point){},mainWindow:function(){},keyWindow:function(){},isRunning:function(){},finishLaunching:function(){},run:function(){},postEvent:function(theEvent,atStart){},currentEvent:function(){},sendEvent:function(theEvent){},preventWindowOrdering:function(){},makeWindowsPerform:function(aSelector,inOrder){},windows:function(){},setWindowsNeedUpdate:function(needUpdate){},updateWindows:function(){},setMainMenu:function(aMenu){},mainMenu:function(){},setApplicationIconImage:function(image){},applicationIconImage:function(){},sendAction:function(theAction,theTarget,sender){},targetForAction:function(theAction,theTarget,theSender){},tryToPerform:function(anAction,anObject){}});function NSApplicationMain(argc,argv)
{return 1;}
var NSCell=NSObject.extend({});
var NSMomentaryLightButton=0;var NSPushOnPushOffButton=1;var NSToggleButton=2;var NSSwitchButton=3;var NSRadioButton=4;var NSMomentaryChangeButton=5;var NSOnOffButton=6;var NSMomentaryPushInButton=7;var NSRoundedBezelStyle=1;var NSRegularSquareBezelStyle=2;var NSThickSquareBezelStyle=3;var NSThickerSquareBezelStyle=4;var NSDisclosureBezelStyle=5;var NSShadowlessSquareBezelStyle=6;var NSCircularBezelStyle=7;var NSTexturedSquareBezelStyle=8
var NSHelpButtonBezelStyle=9;var NSSmallSquareBezelStyle=10;var NSTexturedRoundedBezelStyle=11;var NSRoundRectBezelStyle=12;var NSRecessedBezelStyle=13;var NSRoundedDisclosureBezelStyle=14;var NSGradientNone=0;var NSGradientConcaveWeak=1;var NSGradientConcaveStrong=2;var NSGradientConvexWeak=3;var NSGradientConvexStrong=4;var NSButtonCell=NSCell.extend({_alternateImage:null,_image:null,initWithCoder:function(aCoder){this._super(aCoder);var flags=aCoder.decodeIntForKey("NSButtonFlags");var flags2=aCoder.decodeIntForKey("NSButtonFlags2");this._isBordered=(flags&0x00800000)?true:false;this._bezelStyle=((flags2&0x7)|((flags2&0x20)>>2));this._alternateImage=aCoder.decodeObjectForKey("NSAlternateImage");if(this._alternateImage){this._image=this._alternateImage.normalImage();this._alternateImage=this._alternateImage.alternateImage();}
return this;},drawWithFrameInView:function(cellFrame,controlView){var c=NSGraphicsContext.currentContext().graphicsPort();CGContextClearRect(c,cellFrame);this.drawBezelWithFrameInView(cellFrame,controlView);this.drawInteriorWithFrame(cellFrame,controlView);this.drawTitleWithFrameInView(this._value,cellFrame,controlView);},drawInteriorWithFrameInView:function(cellFrame,controlView){if(this._image){if(this._state==NSOnState)
this.drawImageWithFrameInView(this._alternateImage,CGRectMake(1,1,17,17),controlView);else
this.drawImageWithFrameInView(this._image,CGRectMake(1,1,17,17),controlView);}},drawImageWithFrameInView:function(image,frame,controlView){var c=NSGraphicsContext.currentContext().graphicsPort();CGContextSaveGState(c);if(!this._isEnabled)
CGContextSetAlpha(c,0.8);CGContextDrawImage(c,frame,image);CGContextRestoreGState(c);},drawTitleWithFrameInView:function(title,rect,controlView){var c=NSGraphicsContext.currentContext().graphicsPort();CGContextSaveGState(c);if(this._isEnabled){}
else{}
CGContextRestoreGState(c);}});
var NSTickMarkBelow=0;var NSTickMarkAbove=1;var NSTickMarkLeft=1;var NSTickMarkRight=0;var NSLinearSlider=0;var NSCircularSlider=1;var NSSliderCell=NSCell.extend({_minValue:0,_maxValue:0,initWithCoder:function(aCoder){this._super(aCoder);this._minValue=aCoder.decodeDoubleForKey("NSMinValue");this._maxValue=aCoder.decodeDoubleForKey("NSMaxValue");this._value=aCoder.decodeDoubleForKey("NSValue");return this;},drawWithFrameInView:function(cellFrame,controlView){var SLIDER_PADDING=8.5;var KNOB_PADDING=2;var c=NSGraphicsContext.currentContext().graphicsPort();CGContextSaveGState(c);if(!this.isEnabled())CGContextSetAlpha(c,0.8);},startTrackingAtInView:function(startPoint,controlView){if(this.isEnabled()){var SLIDER_PADDING=8.5;var location=controlView.convertPointFromView(startPoint,null);this.setDoubleValue(((location.x-SLIDER_PADDING)/(controlView.bounds().size.width-(2*SLIDER_PADDING)))*(this._maxValue-this._minValue));this.drawFrameInView(controlView.bounds(),controlView);return true;}
return false;},setDoubleValue:function(aDouble){if(aDouble<this._minValue)this._value=this._minValue;else if(aDouble>this._maxValue)this._value=this._maxValue;else this._value=aDouble;},continueTrackingAtInView:function(lastPoint,currentPoint,controlView){var SLIDER_PADDING=8.5;var location=controlView.convertPointFromView(currentPoint,null);this.setDoubleValue(((location.x-SLIDER_PADDING)/(controlView.bounds().size.width-(2*SLIDER_PADDING)))*(this._maxValue-this._minValue));this.drawFrameInView(controlView.bounds(),controlView);return true;},stopTrackingInView:function(lastPoint,stopPoint,controlView,flag){},prefersTrackingUntilMouseUp:function(){},minValue:function(){return this._minValue;},setMinValue:function(aDouble){this._minValue=aDouble;},maxValue:function(){return this._maxValue;},setMaxValue:function(aDouble){this._maxValue=aDouble;}});
var VN={};
var AppController=NSObject.extend({init:function(){this._super();return this;},applicationDidFinishLaunching:function(){console.log("Application finished lauchiong");},awakeFromNib:function(sender){console.log("Awoken from nib");}});
var JSApp={CFBundleDevelopmentRegion:"English",CFBundleIconFile:"",CFBundleIdentifier:"com.yourcompany.JSApp",CFBundleName:"JSApp",CFBundlePackageType:"APPL",NSMainNibFile:"MainMenu",NSPrincipalClass:"NSApplication"};
function main(argc,argv)
{return NSApplicationMain(argc,argv);}