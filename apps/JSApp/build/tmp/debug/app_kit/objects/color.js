/* 
 * color.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


var NSColor = NSObject.extend({
    
    _red: null,
    _green: null,
    _blue: null,
    _alpha: null,
    
    initWithCoder: function(aCoder) {
        var theColorSpace = aCoder.decodeIntForKey("NSColorSpace");
        var theColor;
        
        switch (theColorSpace) {
            case 6:
                var catalogName = aCoder.decodeObjectForKey("NSCatalogName");
                var colorName = aCoder.decodeObjectForKey("NSColorName");
                theColor = NSColor[colorName]();
                break;
        }
        
        return theColor;
    },
	
	highlightWithLevel: function(val) {
		
	},
	
	shadowWithLevel: function(val) {
		
	},
	
	set: function() {
		
	},
	
	setFill: function() {
		
	},
	
	setStroke: function() {
		
	},
	
	blendedColorWithFraction: function(fraction, ofColor) {
		
	},
	
	colorWithAlphaComponent: function(alpha) {
		
	},
	
	redComponent: function() {
		
	},
	
	greenComponent: function() {
		
	},
	
	blueComponent: function() {
		
	},
	
	hueComponent: function() {
		
	},
	
	saturationComponent: function() {
		
	},
	
	brightnessComponent: function() {
		
	},
	
	whiteComponent: function() {
		
	},
	
	cyanComponent: function() {
		
	},
	
	magentaComponent: function() {
		
	},
	
	yellowComponent: function() {
		
	},
	
	blackComponent: function() {
		
	},
	
	alphaComponent: function() {
		
	}
});

Object.extend(NSColor, {
	
	colorWithCalibratedWhite: function(white, alpha) {
		var theColor =  NSColor.create();
		theColor._red = white;
		theColor._green = white;
		theColor._blue = white;
		theColor._alpha = alpha;
		return theColor;
	},
	
	colorWithCalibratedHSBA: function(hue, saturation, brightness, alpha) {
		
	},
	
	colorWithCalibratedRGBA: function(red, green, blue, alpha) {
		var theColor =  NSColor.create();
		theColor._red = red;
		theColor._green = green;
		theColor._blue = blue;
		theColor._alpha = alpha;
		return theColor;
	},
	
	blackColor: function() {
		return NSColor.colorWithCalibratedWhite(0.0, 1.0);
	},
	
	darkGrayColor: function() {
		return NSColor.colorWithCalibratedWhite(0.333, 1.0);
	},
	
	lightGrayColor: function() {
		return NSColor.colorWithCalibratedWhite(0.667, 1.0);
	},
	
	whiteColor: function() {
		return NSColor.colorWithCalibratedWhite(1.0, 1.0);
	},
	
	grayColor: function() {
		return NSColor.colorWithCalibratedWhite(0.5, 1.0);
	},
	
	redColor: function() {
		return NSColor.colorWithCalibratedRGBA(1.0, 0.0, 0.0, 1.0);
	},
	
	greenColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.0, 1.0, 0.0, 1.0);
	},
	
	blueColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.0, 0.0, 1.0, 1.0);
	},
	
	cyanColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.0, 1.0, 1.0, 1.0);
	},
	
	yellowColor: function() {
		return NSColor.colorWithCalibratedRGBA(1.0, 1.0, 0.0, 1.0);
	},
	
	magentaColor: function() {
		return NSColor.colorWithCalibratedRGBA(1.0, 0.0, 1.0, 1.0);
	},
	
	orangeColor: function() {
		return NSColor.colorWithCalibratedRGBA(1.0, 0.5, 0.0, 1.0);
	},
	
	purpleColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.0, 0.5, 1.0);
	},
	
	brownColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.6, 0.4, 0.2, 1.0);
	},
	
	clearColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.0, 0.0, 0.0, 0.0);
	},
	
	gridColor: function() {
	    return NSColor.colorWithCalibratedRGBA(0.902, 0.902, 0.902, 1.0);
	},
	
	controlShadowColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	controlDarkShadowColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	controlColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	controlHighlightColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	controlTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.204, 0.204, 0.204, 1.0);
	},
	
	controlBackgroundColor: function() {
		return NSColor.controlTextColor();
	},
	
	selectedControlColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	secondarySelectedControlColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	selectedControlTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.16, 0.16, 0.16, 1.0);
	},
	
	disabledControlTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.574, 0.574, 0.574, 1.0);
	},
	
	textColor: function() {
		return NSColor.colorWithCalibratedRGBA(0, 0, 0, 1.0);
	},
	
	textBackgroundColor: function() {
		return NSColor.colorWithCalibratedRGBA(1.0, 1.0, 1.0, 1.0);
	},
	
	selectedTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.8, 0.8, 0.8, 1.0);
	},
	
	selectedTextBackgroundColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.710, 0.835, 1.0, 1.0);
	},
	
	windowBackgroundColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	scrollBarColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	knobColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	selectedKnobColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	windowFrameColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	windowFrameTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	selectedMenuItemColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.21, 0.40, 0.86, 1.0);
	},
	
	selectedMenuItemTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(1, 1, 1, 1.0);
	},
	
	highlightColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	shadowColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	headerColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	headerTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	alternateSelectedControlColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	alternateSelectedControlTextColor: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	controlAlternatingRowBackgroundColors: function() {
		return [NSColor.colorWithCalibratedRGBA(0.953, 0.953, 0.953, 1.0), 
				NSColor.whiteColor()];
	},
	
	colorForControlTint: function(controlTint) {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	},
	
	currentControlTint: function() {
		return NSColor.colorWithCalibratedRGBA(0.5, 0.5, 0.5, 1.0);
	}
});
