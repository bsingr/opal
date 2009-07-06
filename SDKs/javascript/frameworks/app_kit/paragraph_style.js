/* 
 * paragraph_style.js
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

include('app_kit/text');

// NSTextTabType
var NSLeftTabStopType               = 0;
var NSRightTabStopType              = 1;
var NSCenterTabStopType             = 2;
var NSDecimalTabStopType            = 3;

// NSLineBreakMode
var NSLineBreakByWordWrapping       = 0;
var NSLineBreakByCharWrapping       = 1;
var NSLineBreakByClipping           = 2;
var NSLineBreakByTruncatingHead     = 3;
var NSLineBreakByTruncatingTail     = 4;
var NSLineBreakByTruncatingMiddle   = 5;

var NSParagraphStyle = NSObject.extend({
    
    _lineSpacing: null,
    _paragraphSpacing: null,
    _headIndent: null,
    _tailIndent: null,
    _firstLineHeadIndent: null,
    _minimumLineHeight: null,
    _maximumLineHeight: null,
    _tabStops: null,
    
    _alignment: null,
    _lineBreakMode: null,
    _isNaturalDirection: null,
    _rightToLeftDirection: null,
    
    _defaultTabInterval: null,
    
    init: function() {
        
        this._lineSpacing = 10;
        this._alignment = NSLeftTextAlignment;
        
        return this;
    },
    
    /**
        Distance between bottom of one line fragment and the top of the next one.
        This is included in the line fragement height by layoutmanager.
    */
    lineSpacing: function() {
        return this._lineSpacing;
    },
    
    setLineSpacing: function(aFloat) {
        
    },
    
    /**
        Distance between the bottom of this paragraph and the top of the next one
    */
    paragraphSpacing: function() {
        return this._paragraphSpacing;
    },
    
    setParagraphSpacing: function(aFloat) {
        
    },
    
    /**
        Text alignment from NSTextAlignment.
    */
    alignment: function() {
        return this._alignment;
    },
    
    setAlignment: function(alignment) {
        this._alignment = alignment;
    },
    
    /**
        Distance from margin to front side of the paragraph
    */
    headIndent: function() {
        return this._headIndent;
    },
    
    setHeadIndent: function(aFloat) {
        
    },
    
    /**
        Distance from margin to back edge of paragraph.
    */
    tailIndent: function() {
        return this._tailIndent;
    },
    
    setTailIndent: function(aFloat) {
        
    },
    
    /**
        Distance from margin to front side of first line
    */
    firstLineHeadIndent: function() {
        return this._firstLineHeadIndent;
    },
    
    /**
        Distance from left margin to tab stops
    */
    tabStops: function() {
        return this._tabStops;
    },
    
    /**
        Basic line fragment height excluding linespacing.
    */
    minimumLineHeight: function() {
        return this._minimumLineHeight;
    },
    
    setMinimumLineHeight: function(aFloat) {
        
    },
    
    /**
        Maximum line height. 0 means there is no maximum
    */
    maximumLineHeight: function() {
        return this._maximumLineHeight;
    },
    
    setMaximumLineHeight: function(aFloat) {
        
    },
    
    /**
        A value from NSLineBreakMode
    */
    lineBreakMode: function() {
        return this._lineBreakMode;
    },
    
    setLineBreakMode: function(mode) {
        this._lineBreakMode = mode;
    },
    
    /**
        Base writing direction.
    */
    baseWritingDirection: function() {
        return this._baseWritingDirection;
    },
    
    /**
        line height multiplied by this (although it is contained by min/max height)
    */
    lineHeightMultiple: function() {
        
    },
    
    paragraphSpacingBefore: function() {
        
    },
    
    defaultTabInterval: function() {
        
    },
    
    textBlocks: function() {
        
    },
    
    textLists: function() {
        
    },
    
    hyphenationFactor: function() {
        
    },
    
    tighteningFactorForTruncation: function() {
        
    },
    
    /**
        HTML header level. This might be redundant unless outputting html is a 
        large requirement.
    */
    headerLevel: function() {
        
    }

    // - (void)setLineSpacing:(CGFloat)aFloat;
    // - (void)setParagraphSpacing:(CGFloat)aFloat;
    // - (void)setAlignment:(NSTextAlignment)alignment;
    // - (void)setFirstLineHeadIndent:(CGFloat)aFloat;
    // - (void)setHeadIndent:(CGFloat)aFloat;
    // - (void)setTailIndent:(CGFloat)aFloat;
    // - (void)setLineBreakMode:(NSLineBreakMode)mode;
    // - (void)setMinimumLineHeight:(CGFloat)aFloat;
    // - (void)setMaximumLineHeight:(CGFloat)aFloat;
    // - (void)addTabStop:(NSTextTab *)anObject;
    // - (void)removeTabStop:(NSTextTab *)anObject;
    // - (void)setTabStops:(NSArray *)array;
    // - (void)setParagraphStyle:(NSParagraphStyle *)obj;
    // #if MAC_OS_X_VERSION_MAX_ALLOWED >= MAC_OS_X_VERSION_10_2
    // - (void)setBaseWritingDirection:(NSWritingDirection)writingDirection;
    // #endif
    // #if MAC_OS_X_VERSION_MAX_ALLOWED >= MAC_OS_X_VERSION_10_3
    // - (void)setLineHeightMultiple:(CGFloat)aFloat;
    // - (void)setParagraphSpacingBefore:(CGFloat)aFloat;
    // - (void)setDefaultTabInterval:(CGFloat)aFloat;
    // #endif
    // #if MAC_OS_X_VERSION_MAX_ALLOWED >= MAC_OS_X_VERSION_10_4
    // - (void)setTextBlocks:(NSArray *)array;
    // - (void)setTextLists:(NSArray *)array;
    // - (void)setHyphenationFactor:(float)aFactor;
    // - (void)setTighteningFactorForTruncation:(float)aFactor;
    // - (void)setHeaderLevel:(NSInteger)level;
    // #endif
    // @end
});

NSParagraphStyle.defaultParagraphStyle = function() {
    return NSParagraphStyle.create();
};

/**
    This also seems like it will be used very little.....
*/
NSParagraphStyle.defaultWritingDirectionForLanguage = function(languageName) {
    
};
