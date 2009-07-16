/* 
 * media_timing_function.js
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
    @class CAMediaTimingFunction
    @extends NSObject
*/
var CAMediaTimingFunction = NSObject.extend({
    
    /**
        @param {Float} c1x
        @param {Float} c1y
        @param {Float} c2x
        @param {Float} c2y
        @returns CAMediaTimingFunction
    */
    initWithControlPoints: function(c1x, c1y, c2x, c2y) {

    }
});

/**
    'linear', 'easeIn', 'easeOut', 'easeInEaseOut', 'default'
    
    @param {NSString} name
    @returns CAMediaTimingFunction
*/
CAMediaTimingFunction.functionWithName = function(name) {
    
};

/**
    @param {Float} c1x
    @param {Float} c1y
    @param {Float} c2x
    @param {Float} c2y
    @returns CAMediaTimingFunction
*/
CAMediaTimingFunction.functionWithControlPoints = function(c1x, c1y, c2x, c2y) {
    
};

/**
    Media timing names
*/
var kCAMediaTimingFunctionLinear        = "linear";
var kCAMediaTimingFunctionEaseIn        = "easeIn";
var kCAMediaTimingFunctionEaseOut       = "easeOut";
var kCAMediaTimingFunctionEaseInEaseOut = "easeInEaseOut";
var kCAMediaTimingFunctionDefault       = "default";
