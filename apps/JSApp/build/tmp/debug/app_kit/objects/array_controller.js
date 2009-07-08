/* 
 * array_controller.js
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


/*
    @class NSArrayController
    @extend NSObjectController
*/
var NSArrayController = NSObjectController.extend({
    
    /*
        NSInteger
    */
    _observedIndexHint: null,
    
    /*
        NSIndexSet
    */
    _selectionIndexes: null,
    
    /*
        NSArray
    */
    _objects: null,
    
    /*
        NSIndexSet
    */
    _cachedSelectedIndexes: null,
    
    /*
        NSArray
    */
    _cachedSelectedObjects: null,
    
    /*
        NSArray
    */
    _arrangedObjects: null,
    
    /*
        Rearranges objects ready for display. This might include sorting and
        filtering.
    */
    rearrangeObjects: function() {
        
    },
    
    /*
        Sets whether the controller rearranges objects. Default is false
        
        @param boolean flag
    */
    setAutomaticallyRearrangesObjects: function(flag) {
        
    },
    
    /*
        @return boolean
    */
    automaticallyRearrangesObjects: function() {
        
    },
    
    /*
        @return NSArray
    */
    automaticRearrangementKeyPaths: function() {
        
    },
    
    /*
        ..
    */
    didChangeArrangementCriteria: function() {
        
    },
    
    /*
        @param NSArray sortDescriptors
    */
    setSortDescriptors: function(sortDescriptors) {
        
    },
    
    /*
        @return NSArray
    */
    sortDescriptors: function() {
        
    },
    
    /*
        @param NSPredicate filterPredicate
    */
    setFilterPredicate: function(filterPredicate) {
        
    },
    
    /*
        @return NSPredicate
    */
    filterPredicate: function() {
        
    },
    
    /*
        If true, predicates are disabled after adding new objects. this avoids
        new objects not meeting criteria from being automatically hidden.
        
        This is true by default
        
        @param bool flag
    */
    setClearsFilterPredicateOnInsertion: function(flag) {
        
    },
    
    /*
        @return boolean
    */
    clearsFilterPredicateOnInsertion: function() {
        
    },
    
	/*
		@param NSArray objects
		@return NSArray
	*/
    arrangeObjects: function(objects) {
	
	},
	
	/*
		An array of all objects to be displayed (after filtering/sorting)
		@return NSArray
	*/
	arrangedObjects: function() {
		
	},
	
	/*
		Default is true.
		
		@param bool flag
	*/
	setAvoidsEmptySelection: function(flag) {
		
	},
	
	/*
		@return bool
	*/
	avoidsEmptySelection: function() {
		
	},
	
	/*
		Default is true
		
		@param bool flag
	*/
	setPreservesSelection: function(flag) {
		
	},
	
	/*
		@return bool
	*/
	preservesSelection: function() {
		
	},
	
	/*
		Default is true
		
		@param bool flag
	*/
	setSelectsInsertedObjects: function(flag) {
		
	},
	
	/*
		@return bool
	*/
	selectsInsertedObjects: function() {
		
	},
	
	/*
		@param {Boolean} flag
	*/
	setAlwaysUsesMultipleValuesMarker: function(flag) {
		
	},
	
	/*
		@returns Boolean
	*/
	alwaysUsesMultipleValuesMarker: function() {
		
	},
	
	/*
		@param {NSIndexSet} indexes
		@returns Boolean
	*/
	setSelectionIndexes: function(indexes) {
		
	},
	
	/*
		@returns NSIndexSet
	*/
	selectionIndexes: function() {
		
	},
	
	/*
		@param {Integer} index
		@returns Boolean
	*/
	setSelectionIndex: function() {
		
	},
	
	/*
		@returns Integer
	*/
	selectionIndex: function() {
		
	},
	
	/*
		@param {NSIndexSet} indexes
		@returns Boolean
	*/
	addSelectionIndexes: function(indexes) {
		
	},
	
	/*
		@param {NSIndexSet} indexes
		@returns Boolean
	*/
	removeSelectionIndexes: function(indexes) {
		
	},
	
	/*
		@param {NSArray} objects
		@returns Boolean
	*/
	setSelectionObjects: function(objects) {
		
	},
	
	/*
		@returns {NSIndexSet}
	*/
	selectedObjects: function() {
		
	},
	
	/*
		@param {NSArray} objects
		@returns Boolean
	*/
	addSelectedObjects: function(objects) {
		
	},
	
	/*
		@param {NSArray} objects
		@retuns Boolean
	*/
	removeSelectedObjects: function(objects) {
		
	},
	
	/*
		Adds new object to the content objects, but to the arranged objects as
		well.
		
		@param {NSObject} sender
	*/
	add: function(sender) {
		
	},
	
	/*
		Remove selected object(s)
	
		@param {NSObject} sender
	*/
	remove: function(sender) {
		
	},
	
	/*
		@param {NSObject} sender
	*/
	insert: function(sender) {
		
	},
	
	/*
		@return Boolean
	*/
	canInsert: function() {
		
	},
	
	/*
		@param {NSObject} sender
	*/
	selectNext: function(sender) {
		
	},
	
	/*
		@param {NSObject} sender
	*/
	selectPrevious: function(sender) {
		
	},
	
	/*
		@returns Boolean
	*/
	canSelectNext: function() {
		
	},
	
	/*
		@returns Boolean
	*/
	canSelectPrevious: function() {
		
	},
	
	/*
		@param {NSObject} object
	*/
	addObject: function(object) {
		
	},
	
	/*
		@param {NSArray} objects
	*/
	addObjects: function(objects) {
		
	},
	
	/*
		@param {NSObject} object
		@param {Integer} index
	*/
	insertObjectAtArrangedObjectIndex: function(object, index) {
		
	},
	
	/*
		@param {NSArray} objects
		@param {NSIndexSet} indexes
	*/
	insertObjectsAtArrangedObjectIndexes: function(objects, indexes) {
		
	},
	
	/*
		@param {Integer} index
	*/
	removeObjectAtArrangedObjectIndex: function(index) {
		
	},
	
	/*
		@param {NSIndexSet} indexes
	*/
	removeObjectsAtArrangedObjectIndexes: function(indexes) {
		
	},
	
	/*
		@param {NSObject} object
	*/
	removeObject: function(object) {
		
	},
	
	/*
		@param {NSArray} objects
	*/
	removeObjects: function(objects) {
		
	}
});
