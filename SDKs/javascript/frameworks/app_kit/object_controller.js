/* 
 * object_controller.js
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

include('app_kit/controller');

/*
    @class NSObjectController
    @extend NSController
*/
var NSObjectController = NSController.extend({
    
    /*
        NSString
    */
    _objectClassName: null,
    
    /*
        Class
    */
    _objectClass: null,
    
    /*
        NSArray
    */
    _contentObjectArray: null,
    
    /*
        NSObject
    */
    _content: null,
    
    /*
        NSObject
    */
    _objectHandler: null,
    
    /*
        @param NSObject content
        @return NSObjectController
    */
    initWithContent: function(content) {
        
    },
    
    /*
        @param NSObject content
    */
    setContent: function(content) {
        
    },
    
    /*
        @return NSObject
    */
    content: function() {
        
    },
    
    /*
        Returns the object being used to access the content
        
        @return NSObject
    */
    selection: function() {
        
    },
    
    /*
        Returns an array of all the content objects
        
        @return NSArray
    */
    selectedObjects: function() {
        
    },
    
    /*
        When loaded from xib files, prepareContent will be called (if true).
        
        @param boolean flag
    */
    setAutomaticallyPreparesContent: function(flag) {
        
    },
    
    /*
        @return boolean
    */
    automaticallyPreparesContent: function() {
        
    },
    
    /*
        Sets the content. Default just creates a new object, of the required
        type, and sets it as the content. (based on _objectClass ivar)
    */
    prepareContent: function() {
        
    },
    
    /*
        The object class to use when creating new objects
        
        @param Class objectClass
    */
    setObjectClass: function(objectClass) {
        
    },
    
    /*
        @return Class
    */
    objectClass: function() {
        
    },
    
    /*
        Creates a new object, _objectClass, when adding/inserting objects. Uses
        the default init() method of the object.
        
        @return NSObject (or subclass of)
    */
    newObject: function() {
        
    },
    
    /*
        Sets the content object for the controller.
        
        @param NSObject object
    */
    addObject: function(object) {
        
    },
    
    /*
        Removes the object if current content
        
        @param NSObject object
    */
    removeObject: function(object) {
        
    },
    
    /*
        Sets whether the controller can add/remove objects
        
        @param boolean flag
    */
    setEditable: function(flag) {
        
    },
    
    /*
        @return boolean
    */
    isEditable: function() {
        
    },
    
    /*
        Creates a new object with newObject() and then adds it using addObject()
        
        @param NSObject sender - object that requested a new object to be added
    */
    add: function(sender) {
        
    },
    
    /*
        Returns whether or not new objects can be added.
        
        @return boolean
    */
    canAdd: function() {
        
    },
    
    /*
        Removes content object through removeObject()
        
        @param NSObject sender - object that requested removal
    */
    remove: function(sender) {
        
    },
    
    /*
        Returns whether or not an item can be removed (false if there
        are no items in content, for example)
        
        @return boolean
    */
    canRemove: function() {
        
    }
});
