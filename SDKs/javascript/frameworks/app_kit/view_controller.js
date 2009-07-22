/* 
 * view_controller.js
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

include('app_kit/responder');

/**
    @class VN.ViewController
    @extends VN.Responder
*/
var NSViewController = VN.ViewController = VN.Responder.extend({
    
    /**
        The top level objects created from the Nib file.
        @type VN.Array
    */
    _topLevelObjects: null,
    
    /**
        @param {VN.String} nibName
        @returns VN.ViewController
    */
    initWithNibName: function(nibName) {
        this._nibName = nibName;
        return this;
    },
    
    /**
        @type VN.Object
    */
    _representedObject: null,
    
    /**
        @param {VN.Object} representedObject
    */
    setRepresentedObject: function(representedObject) {
        this._representedObject = representedObject;
    },
    
    /**
        @returns VN.Object
    */
    represnetedObject: function() {
        return this._representedObject;
    },
    
    /**
        @type VN.String
    */
    _title: null,
    
    /**
        @param {VN.String} title
    */
    setTitle: function(title) {
        this._title = title;
    },
    
    /**
        @returns VN.String
    */
    title: function() {
        return this._title;
    },
    
    /**
        @outlet
        @type VN.View
    */
    _view: null,
    
    /**
        @param {VN.View} view
    */
    setView: function(view) {
        this._view = view;
    },
    
    /**
        @returns VN.View
    */
    view: function() {
        return this._view;
    },
    
    /**
        Loads the view using VN.Nib class
    */
    loadView: function() {
        NSBundle.loadNibNamed(this._nibName, this);
    },
    
    /**
        @type VN.String
    */
    _nibName: null,
    
    /**
        @returns VN.String
    */
    nibName: function() {
        return this._nibName;
    } 
});
