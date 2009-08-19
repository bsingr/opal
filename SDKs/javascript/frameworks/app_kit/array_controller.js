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

include('app_kit/object_controller');

/**
  @class VN.ArrayController
  @extend VN.ObjectController
*/
var NSArrayController = VN.ArrayController = VN.ObjectController.extend({
  
  /**
    @type NSInteger
  */
  _observedIndexHint: null,
  
  /**
    @type NSArray
  */
  _objects: null,
  
  /**
    @type NSIndexSet
  */
  _cachedSelectedIndexes: null,
  
  /**
    @type NSArray
  */
  _cachedSelectedObjects: null,
  
  /**
    @type Boolean
  */
  _isEditable: null,
  
  /**
    @type Boolean
  */
  _avoidsEmptySelection: null,
  
  /**
    @type Boolean
  */
  _preservesSelection: null,
  
  /** 
    @type NSArray
  */
  _declaredKeys: null,
  
  /**
    @param {NSCoder} aCoder
    @returns NSArrayController
  */
  initWithCoder: function(aCoder) {
    this._arrangedObjects = [];
    this._selectionIndexes = VN.IndexSet.indexSet();
		
    this._isEditable = aCoder.decodeBoolForKey('NSEditable');
    this._avoidsEmptySelection = aCoder.decodeBoolForKey('NSAvoidsEmptySelection');
    this._preservesSelection = aCoder.decodeBoolForKey('NSSelectsInsertedObjects');
    this._declaredKeys = aCoder.decodeObjectForKey('NSDeclaredKeys');
    return this;
  },
  
  /*
    Over-ridden from VN.ObjectController
    
    @param VN.Object content
  */
  setContent: function(content) {
    this._objects = content;
    // this.willChangeValueForKey('arrangedObjects');
    // this._arrangedObjects = this.arrangeObjects(this._objects);
    // this.didChangeValueForKey('arrangedObjects');
    this.setValueForKey(this.arrangeObjects(this._objects), 'arrangedObjects');
    this.setValueForKey(VN.IndexSet.indexSetWithIndex(0), 'selectionIndexes');
  },
  
  /**
    Instantiate a binding to the object. Placeholders and other information
    can be specified in the options dictionary.
    
    @param binding - NSString
    @param toObject - NSObject
    @param withKeyPath - NSString
    @param options - NSDictionary
  */
  bind: function(binding, toObject, withKeyPath, options) {
    if (binding == 'contentArray') {
      toObject.addObserverForKeyPath(this, withKeyPath, 0, VN.CONTENT_ARRAY_BINDING);
      
      var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
        [toObject, withKeyPath, options],
        [VN.OBSERVED_OBJECT_KEY, VN.OBSERVED_KEY_PATH_KEY, VN.OPTIONS_KEY]);

      this._kvb_info.setObjectForKey(bindingInfo, VN.CONTENT_ARRAY_BINDING);
      // if content is null...
      var theContent = toObject.valueForKeyPath(withKeyPath) || [];
      this.setContent(theContent);
    }
  },

   /**
 		@param {NSString} keyPath
 		@param {NSObject} ofObject
 		@param {NSDictionary} change
 		@param {Object} context
 	*/
   observeValueForKeyPath: function(keyPath, ofObject, change, context) {
     if (context == VN.CONTENT_ARRAY_BINDING) {
       this.setContent(ofObject.valueForKeyPath(keyPath));
     }
   },
  
  /**
    Rearranges objects ready for display. This might include sorting and
    filtering.
  */
  rearrangeObjects: function() {
    
  },
  
  /**
    Sets whether the controller rearranges objects. Default is false
    
    @param boolean flag
  */
  setAutomaticallyRearrangesObjects: function(flag) {
    
  },
  
  /**
    @return boolean
  */
  automaticallyRearrangesObjects: function() {
    
  },
  
  /**
    @return NSArray
  */
  automaticRearrangementKeyPaths: function() {
    
  },
  
  /**
    ..
  */
  didChangeArrangementCriteria: function() {
    
  },
  
  /**
    @param NSArray sortDescriptors
  */
  setSortDescriptors: function(sortDescriptors) {
    
  },
  
  /**
    @return NSArray
  */
  sortDescriptors: function() {
    
  },
  
  /**
    @param NSPredicate filterPredicate
  */
  setFilterPredicate: function(filterPredicate) {
    
  },
  
  /**
    @return NSPredicate
  */
  filterPredicate: function() {
    
  },
  
  /**
    If true, predicates are disabled after adding new objects. this avoids
    new objects not meeting criteria from being automatically hidden.
    
    This is true by default
    
    @param bool flag
  */
  setClearsFilterPredicateOnInsertion: function(flag) {
    
  },
  
  /**
    @return boolean
  */
  clearsFilterPredicateOnInsertion: function() {
    
  },
  
	/**
		@param NSArray objects
		@return NSArray
	*/
  arrangeObjects: function(objects) {
	  return objects;
	},
	
	/**
    @type {VN.Array}
  */
  _arrangedObjects: null,
	
	/**
		An array of all objects to be displayed (after filtering/sorting)
		@return {VN.Array}
	*/
	arrangedObjects: function() {
	  return this._arrangedObjects;
	},
	
	/**
		Default is true.
		
		@param bool flag
	*/
	setAvoidsEmptySelection: function(flag) {
		
	},
	
	/**
		@return bool
	*/
	avoidsEmptySelection: function() {
		
	},
	
	/**
		Default is true
		
		@param bool flag
	*/
	setPreservesSelection: function(flag) {
		
	},
	
	/**
		@return bool
	*/
	preservesSelection: function() {
		
	},
	
	/**
		Default is true
		
		@param bool flag
	*/
	setSelectsInsertedObjects: function(flag) {
		
	},
	
	/**
		@return bool
	*/
	selectsInsertedObjects: function() {
		
	},
	
	/**
		@param {Boolean} flag
	*/
	setAlwaysUsesMultipleValuesMarker: function(flag) {
		
	},
	
	/**
		@returns Boolean
	*/
	alwaysUsesMultipleValuesMarker: function() {
		
	},
	
	/**
    @type VN.IndexSet
  */
  _selectionIndexes: null,
	
	/**
	  This sets the selection indexes. This also needs to inform some keys
	  that they will change. The 'canRemove' depends upon the selection 
	  indexes containing atleast one index.
	
		@param {VN.IndexSet} indexes
		@returns Boolean
	*/
	setSelectionIndexes: function(indexes) {
	  this.willChangeValueForKey('canRemove');
		this._selectionIndexes = indexes;
		this.didChangeValueForKey('canRemove');
	},
	
	/**
    Current selection (single object)
    
    @return VN.Object
  */
  selection: function() {
    var firstObject = this.arrangedObjects()[this._selectionIndexes.firstIndex()];
  },
	
	/**
		@returns VN.IndexSet
	*/
	selectionIndexes: function() {
		return this._selectionIndexes;
	},
	
	/**
		@param {Integer} index
		@returns Boolean
	*/
	setSelectionIndex: function(index) {
		this.setSelectionIndexes(VN.IndexSet.indexSetWithIndex(index));
	},
	
	/**
		@returns Integer
	*/
	selectionIndex: function() {
		return this._selectionIndexes.firstIndex();
	},
	
	/**
		@param {VN.IndexSet} indexes
		@returns Boolean
	*/
	addSelectionIndexes: function(indexes) {
		
	},
	
	/**
		@param {VN.IndexSet} indexes
		@returns Boolean
	*/
	removeSelectionIndexes: function(indexes) {
		
	},
	
	/**
		@param {VN.Array} objects
		@returns Boolean
	*/
	setSelectionObjects: function(objects) {
		
	},
	
	/**
		@returns {VN.Array}
	*/
	selectedObjects: function() {
		
	},
	
	/**
		@param {VN.Array} objects
		@returns Boolean
	*/
	addSelectedObjects: function(objects) {
		
	},
	
	/**
		@param {VN.Array} objects
		@retuns Boolean
	*/
	removeSelectedObjects: function(objects) {
		
	},
	
	/**
		Adds new object to the content objects, but to the arranged objects as
		well.
		
		@param {NSObject} sender
	*/
	add: function(sender) {
		console.log('changing');
		this.willChangeValueForKey('canRemove');
		this._selectionIndexes = VN.IndexSet.indexSetWithIndex(3);
		this.didChangeValueForKey('canRemove');
	},
	
	/**
		Remove selected object(s)
	
		@param {NSObject} sender
	*/
	remove: function(sender) {
		
	},
	
	/**
		@param {NSObject} sender
	*/
	insert: function(sender) {
		
	},
	
	/**
		@return Boolean
	*/
	canInsert: function() {
		
	},
	
	/**
		@return Boolean
	*/
	canAdd: function() {
		return true;
	},
		
	/**
	  Property stating whether or not the array controller can remove an item.
	  This is basically reliant on the number of selection indexes. If there
	  is atleast one selection index, then that can be removed. No selection
	  indexes means that we cannot remove anything.
	  
		@return Boolean
	*/
	canRemove: function() {
		return (this._selectionIndexes.count() == 0) ? false : true;
	},
	
	/**
		@param {NSObject} sender
	*/
	selectNext: function(sender) {
		
	},
	
	/**
		@param {NSObject} sender
	*/
	selectPrevious: function(sender) {
		
	},
	
	/**
		@returns Boolean
	*/
	canSelectNext: function() {
		
	},
	
	/**
		@returns Boolean
	*/
	canSelectPrevious: function() {
		
	},
	
	/**
		@param {NSObject} object
	*/
	addObject: function(object) {
		
	},
	
	/**
		@param {NSArray} objects
	*/
	addObjects: function(objects) {
		
	},
	
	/**
		@param {NSObject} object
		@param {Integer} index
	*/
	insertObjectAtArrangedObjectIndex: function(object, index) {
		
	},
	
	/**
		@param {NSArray} objects
		@param {NSIndexSet} indexes
	*/
	insertObjectsAtArrangedObjectIndexes: function(objects, indexes) {
		
	},
	
	/**
		@param {Integer} index
	*/
	removeObjectAtArrangedObjectIndex: function(index) {
		
	},
	
	/**
		@param {NSIndexSet} indexes
	*/
	removeObjectsAtArrangedObjectIndexes: function(indexes) {
		
	},
	
	/**
		@param {NSObject} object
	*/
	removeObject: function(object) {
		
	},
	
	/**
		@param {NSArray} objects
	*/
	removeObjects: function(objects) {
		
	}
});
