/* 
 * controller.js
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

include('app_kit/key_value_binding');

var NSController = NSObject.extend({
    
    /*
        NSArray
    */
    _editors: null,
    
    /*
        NSArray
    */
    _declaredKeys: null,
    
    /*
        NSDictionary
    */
    _dependentKeyToModelKeyTable: null,
    
    /*
        NSDictionary
    */
    _modelKeyToDependentKeyTable: null,
    
    /*
        @param editor - NSObject
    */
    objectDidBeginEditing: function(editor) {
        
    },
    
    /*
        @param editor - NSObject
    */
    objectDidEndEditing: function(editor) {
        
    },
    
    discardEditing: function() {
        
    },
    
    /*
        @return boolean
    */
    commitEditing: function() {
        
    },
    
    commitEditingWithDelegate: function(delegate, didCommitAction, contextInfo) {
        
    },
    
    /*
        @return boolean
    */
    isEditing: function() {
        
    }
});
