/* 
 * image.js
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
    NSImage adds very important methods to Image. Not only does it extend useful
    fnctionality into the default object, but it also extends the functionality
    to include caching of images, so that drawing controls constantly does not
    require re-downloading. Also, it supports sprites, such that images combined
    into a single resource can be referenced and dealt with as a single image.
    
    Drawing these images actually references the sprites, but user code sees it
    as a regular image. Spriting images dramatically improves performance and
    saves heavily on bandwidth.
*/
var NSImage = NSObject.extend({
    
    _image: null,
    
    initByReferencingFile: function(fileName) {
        this._image = new Image();
        this._image.src = fileName;
        return this;
    },
    
    drawInRect: function(theRect) {
        var c = NSGraphicsContext.currentContext().graphicsPort();
        CGContextDrawImage(c, theRect, this._image);
    },
    
    size: function() {
        return NSMakeSize(this._image.width, this._image.height);
    }
});

NSImage.imageNamed = function(anImage) {
    return NSImage.create('initByReferencingFile', 'resources/' + anImage);
};
