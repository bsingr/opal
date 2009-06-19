/* 
 * archiver.js
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

include('foundation/coder');

var NSInconsistentArchiveException = "NSInconsistentArchiveException";

NS.Archiver = NS.Coder.extend({
   
    initForWritingWithMutableData: function(mdata) {
        
    },
    
    archiverData: function() {
        
    },
    
    encodeRootObject: function(rootObject) {
        
    },
    
    encodeConditionalObject: function(object) {
        
    },
    
    
    archivedDataWithRootObject:function(rootObject) {
        
    },
    
    archiveRootObject: function(rootObject, path) {
        
    }
});

NS.Unarchiver = VN.Coder.extend({
    
   initForReadingWidthData: function(data) {
       
   },
   
   isAtEnd: function() {
       
   },
   
   unarchiveObjectWithData: function(data) {
       
   },
   
   unarchiveObjectWithFile: function(path) {
       
   },
   
   replaceObject: function(object, newObject) {
       
   }
});
