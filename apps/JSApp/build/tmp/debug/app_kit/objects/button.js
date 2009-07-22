/* 
 * button.js
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
 

/**
    @class VN.Button
    @extends VN.Control
*/
var NSButton = VN.Button = VN.Control.extend({
    
    /**
        @type VN.Image
    */
    _alternateImage: null,
    
    /**
        @type VN.Image
    */
    _image: null,
    
    /**
        @param {VN.Coder} aCoder
        @returns VN.Button
    */
    initWithCoder: function(aCoder) {
        this._super(aCoder);
        return this;
    },
    
    /**
        @param {Boolean} firstTime
        @param {NSRenderContext} context
    */
    // render: function(context, firstTime) { 
    //         if (firstTime) {
    //             context.setClass('ns-button');
    //             context.push('div', 'ns-button-left');
    //             context.push('div', 'ns-button-middle');
    //             context.push('div', 'ns-button-right');
    //             context.push('span', 'ns-button-title');
    //         }
    //             
    //         this.renderBezel(context, firstTime);
    //             // this.renderInteriorWithFrame(cellFrame, controlView, firstTime, context);
    //         this.renderTitle(this._value, this.titleRectForBounds(this.bounds()), context, firstTime);
    //     },
    
    
    
    renderTitle: function(title, titleRect, context, firstTime) {
        
    },
    
    drawWithFrame: function(cellFrame, controlView) {
        this.renderWithFrame(cellFrame, controlView, false, controlView._renderContext);
        return;
        
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextClearRect(c, cellFrame);
        
        this.drawBezelWithFrameInView(cellFrame, controlView);
        this.drawInteriorWithFrame(cellFrame, controlView);
        this.drawTitleWithFrameInView(this._value, this.titleRectForBounds(cellFrame), controlView);
    },
    
    drawInteriorWithFrame: function(cellFrame, controlView) {
        if (this._image) {
            if (this._state == NSOnState)
                this.drawImageWithFrameInView(this._alternateImage, this.imageRectForBounds(cellFrame), controlView);
            else
                this.drawImageWithFrameInView(this._image, this.imageRectForBounds(cellFrame), controlView);
        }
    },
    
    drawImageWithFrameInView: function(image, frame, controlView) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSaveGState(c);
        
        if (!this._isEnabled)
            CGContextSetAlpha(c, 0.8);
        
        // CGContextDrawImage(c, frame, image);
        image.drawInRect(frame);
        CGContextRestoreGState(c);
    },

    drawTitleWithFrameInView: function(title, rect, controlView) {
        // var c = NSGraphicsContext.currentContext().graphicsPort();
        this.attributedStringValue().drawWithRectAndOptions(rect, null);
        // CGContextFillRect(c, rect);
    },
    
    drawBezelWithFrameInView: function(frame, controlView) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextSaveGState(c);
        
        if (this._isEnabled && this._isBordered) {
            if (this._isHighlighted) {
                NSImage.imageNamed('NSButtonHighlightedLeft.png').drawInRect(CGRectMake(0, 0, 6, 24));
                NSImage.imageNamed('NSButtonHighlightedMiddle.png').drawInRect(CGRectMake(6, 0, frame.size.width - 12, 24));
                NSImage.imageNamed('NSButtonHighlightedRight.png').drawInRect(CGRectMake(frame.size.width - 6, 0, 6, 24));
            }
            else {
                NSImage.imageNamed('NSButtonNormalLeft.png').drawInRect(CGRectMake(0, 0, 6, 24));
                NSImage.imageNamed('NSButtonNormalMiddle.png').drawInRect(CGRectMake(6, 0, frame.size.width - 12, 24));
                NSImage.imageNamed('NSButtonNormalRight.png').drawInRect(CGRectMake(frame.size.width - 6, 0, 6, 24));
            }
        }
        else if (this._isBordered) {
            CGContextSetAlpha(c, 0.8);
            NSImage.imageNamed('NSButtonNormalLeft.png').drawInRect(CGRectMake(0, 0, 6, 24));
            NSImage.imageNamed('NSButtonNormalMiddle.png').drawInRect(CGRectMake(6, 0, frame.size.width - 12, 24));
            NSImage.imageNamed('NSButtonNormalRight.png').drawInRect(CGRectMake(frame.size.width - 6, 0, 6, 24));
        }
        
        CGContextRestoreGState(c);
    },
    
    cellClass: function() {
        return NSButtonCell;
    },
    
    title: function() {
        
    },
    
    setTitle: function(aString) {
        
    }
});
