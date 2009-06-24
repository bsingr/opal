/* 
 * button_cell.js
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

include('app_kit/cell');

// NSButtonType
var NSMomentaryLightButton		    = 0;
var NSPushOnPushOffButton		    = 1;
var NSToggleButton			        = 2;
var NSSwitchButton			        = 3;
var NSRadioButton			        = 4;
var NSMomentaryChangeButton		    = 5;
var NSOnOffButton			        = 6;
var NSMomentaryPushInButton		    = 7;

// NSBezelStyle
var NSRoundedBezelStyle             = 1;
var NSRegularSquareBezelStyle       = 2;
var NSThickSquareBezelStyle         = 3;
var NSThickerSquareBezelStyle       = 4;
var NSDisclosureBezelStyle          = 5;
var NSShadowlessSquareBezelStyle    = 6;
var NSCircularBezelStyle            = 7;
var NSTexturedSquareBezelStyle      = 8
var NSHelpButtonBezelStyle          = 9;
var NSSmallSquareBezelStyle         = 10;
var NSTexturedRoundedBezelStyle     = 11;
var NSRoundRectBezelStyle           = 12;
var NSRecessedBezelStyle            = 13;
var NSRoundedDisclosureBezelStyle   = 14;    


// NSGradientType
var NSGradientNone                  = 0;
var NSGradientConcaveWeak           = 1;
var NSGradientConcaveStrong         = 2;
var NSGradientConvexWeak            = 3;
var NSGradientConvexStrong          = 4;

var NSButtonCell = NSCell.extend({
    
    _alternateImage: null,
    
    _image: null,
    
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        var flags = aCoder.decodeIntForKey("NSButtonFlags");
        var flags2 = aCoder.decodeIntForKey("NSButtonFlags2");
        this._isBordered = (flags & 0x00800000) ? true : false;
        this._bezelStyle = ((flags2 & 0x7) | ((flags2 & 0x20) >> 2));
        
        this._alternateImage = aCoder.decodeObjectForKey("NSAlternateImage");
        if (this._alternateImage) {
            this._image = this._alternateImage.normalImage();
            this._alternateImage = this._alternateImage.alternateImage();
        }
        
        return this;
    },
    
    drawWithFrameInView: function(cellFrame, controlView) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextClearRect(c, cellFrame);
        
        this.drawBezelWithFrameInView(cellFrame, controlView);
        this.drawInteriorWithFrame(cellFrame, controlView);
        this.drawTitleWithFrameInView(this._value, cellFrame, controlView);
    },
    
    drawInteriorWithFrameInView: function(cellFrame, controlView) {
        if (this._image) {
            if (this._state == NSOnState)
                this.drawImageWithFrameInView(this._alternateImage, CGRectMake(1, 1, 17, 17), controlView);
            else
                this.drawImageWithFrameInView(this._image, CGRectMake(1, 1, 17, 17), controlView);
        }
    },
    
    drawImageWithFrameInView: function(image, frame, controlView) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSaveGState(c);
        
        if (!this._isEnabled)
            CGContextSetAlpha(c, 0.8);
        
        CGContextDrawImage(c, frame, image);
        CGContextRestoreGState(c);
    },

    drawTitleWithFrameInView: function(title, rect, controlView) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSaveGState(c);
        
        if (this._isEnabled) {
            
        }
        else {
            
        }
        
        CGContextRestoreGState(c);
    },

    - (NSRect)drawTitle:(NSAttributedString*)title withFrame:(NSRect)rect inView:(NSView*)controlView
    {
        CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
        CGContextSaveGState(c);

        // background

        // text
        if(_isEnabled)
        {
            CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(0.204, 0.204, 0.204, 1.0));

            CGContextSetShadowWithColor(c, CGSizeMake(1,1), 1, CGColorCreateGenericRGB(1,1,1,1));

            CGFontRef theFont = CGFontCreate(@"Arial", 12, NO);
            CGContextSetFont(c, theFont);
            CGContextShowTextAtPoint(c, 20, ((rect.size.height + 12) / 2) - 1, title, 14);
        }
        else
        {
            CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(0.704, 0.704, 0.704, 1.0));

            CGContextSetShadowWithColor(c, CGSizeMake(1,1), 1, CGColorCreateGenericRGB(1,1,1,1));

            CGFontRef theFont = CGFontCreate(@"Arial", 12, NO);
            CGContextSetFont(c, theFont);
            // 12 being the size of the text, although this could change
            CGContextShowTextAtPoint(c, 20, ((rect.size.height + 12) / 2) - 1, title, 14);
        }


        CGContextRestoreGState(c);
    }

    - (void)drawBezelWithFrame:(NSRect)frame inView:(NSView*)controlView
    {
        CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
        CGContextSaveGState(c);

        if(_isEnabled && _isBordered)
        {
            if(_isHighlighted)
            {
                CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonHighlightedLeft.png");
                CGContextDrawImage(c, CGRectMake(0,0,6,24), theImage);
                CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonHighlightedMiddle.png");
                CGContextDrawImage(c, CGRectMake(6,0,frame.size.width - 12,24), theImage);
                CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonHighlightedRight.png");
                CGContextDrawImage(c, CGRectMake(frame.size.width-6,0,6,24), theImage);
            }
            else
            {
                CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonNormalLeft.png");
                CGContextDrawImage(c, CGRectMake(0,0,6,24), theImage);
                CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonNormalMiddle.png");
                CGContextDrawImage(c, CGRectMake(6,0,frame.size.width - 12,24), theImage);
                CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonNormalRight.png");
                CGContextDrawImage(c, CGRectMake(frame.size.width-6,0,6,24), theImage);
            }
        }
        else if(_isBordered)
        {
            CGContextSaveGState(c);
            CGContextSetAlpha(c, 0.8);

            CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonNormalLeft.png");
            CGContextDrawImage(c, CGRectMake(0,0,6,24), theImage);
            CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonNormalMiddle.png");
            CGContextDrawImage(c, CGRectMake(6,0,frame.size.width - 12,24), theImage);
            CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonNormalRight.png");
            CGContextDrawImage(c, CGRectMake(frame.size.width-6,0,6,24), theImage);
            CGContextRestoreGState(c);
        }

        CGContextRestoreGState(c);
    }

    @end


    @implementation NSButtonCell(NSKeyboardUI)

    - (void)setTitleWithMnemonic:(NSString *)stringWithAmpersand
    {

    }

    - (void)setAlternateTitleWithMnemonic:(NSString *)stringWithAmpersand
    {

    }

    - (void)setAlternateMnemonicLocation:(NSUInteger)location
    {

    }

    - (NSUInteger)alternateMnemonicLocation
    {

    }

    - (NSString *)alternateMnemonic
    {

    }

    @end



    @implementation NSButtonCell (NSButtonCellExtensions)

    - (NSGradientType)gradientType
    {

    }

    - (void)setGradientType:(NSGradientType)type
    {

    }


    - (void)setImageDimsWhenDisabled:(BOOL)flag
    {

    }

    - (BOOL)imageDimsWhenDisabled
    {

    }

    - (void) setShowsBorderOnlyWhileMouseInside:(BOOL)show
    {

    }

    - (BOOL) showsBorderOnlyWhileMouseInside
    {

    }


    - (void) mouseEntered:(NSEvent*)event
    {

    }

    - (void) mouseExited:(NSEvent*)event
    {

    }


    - (NSColor *)backgroundColor
    {

    }

    - (void)setBackgroundColor:(NSColor*)color
    {

    }


    @end

    @implementation NSButtonCell (NSButtonCellAttributedStringMethods)

    - (NSAttributedString *)attributedTitle
    {

    }

    - (void)setAttributedTitle:(NSAttributedString *)obj
    {

    }

    - (NSAttributedString *)attributedAlternateTitle
    {

    }

    - (void)setAttributedAlternateTitle:(NSAttributedString *)obj
    {

    }

    @end

    @implementation NSButtonCell (NSButtonCellBezelStyles)

    - (void) setBezelStyle:(NSBezelStyle)bezelStyle
    {

    }

    - (NSBezelStyle)bezelStyle
    {

    }

    @end
})