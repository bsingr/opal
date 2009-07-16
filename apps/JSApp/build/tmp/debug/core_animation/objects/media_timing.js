/* 
 * media_timing.js
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
    @protocol CAMediaTiming
*/
var CAMediaTiming = NSObject.protocol({
    
    /**
        Defaults to 0.0
        
        @type {Float}
    */
    _beginTime: null,
    
    /**
        @param {Float} time
    */
    setBeginTime: function(time) {
        this._beginTime = time;
    },
    
    /**
        @returns Float
    */
    beginTime: function() {
        return this._beginTime;
    },
    
    /**
        Defaults to 0.0
        
        @type {Float}
    */
    _duration: null,
    
    /**
        @param {Float} time
    */
    setDuration: function(duration) {
        this._duration = duration;
    },
    
    /**
        @returns Float
    */
    duration: function() {
        return this._duaration;
    },
    
    /**
        Defaults to 1.0
        
        @type {Float}
    */
    _speed: null,
    
    /**
        @param {Float} time
    */
    setSpeed: function(speed) {
        this._speed = speed;
    },
    
    /**
        @returns Float
    */
    speed: function() {
        return this._speed;
    },
    
    /**
        Defaults to false
        
        @type {Boolean}
    */
    _autoreverses: null,
    
    /**
        @param {Boolean} flag
    */
    setAutoreverses: function(flag) {
        this._autoreverses = flag;
    },
    
    /**
        @returns Boolean
    */
    autoreverses: function() {
        return this._autoreverses;
    }
});