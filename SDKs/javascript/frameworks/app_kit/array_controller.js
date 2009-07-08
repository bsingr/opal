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
        
    }
    
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
    
    
});

 /* Indicates whether the controller should nil out its filter predicate before inserting (or adding) new objects. When set to yes, this eliminates the problem of inserting a new object into the array that would otherwise immediately be filtered out of the array of arranged objects.
 */
 - (void)setClearsFilterPredicateOnInsertion:(BOOL)flag; // default: YES
 - (BOOL)clearsFilterPredicateOnInsertion;
 #endif

 - (NSArray *)arrangeObjects:(NSArray *)objects;    // returns objects to be arranged in the user interface for the content object array objects - method can be overridden to use a different kind of sort mechanism or to filter the display objects
 - (id)arrangedObjects;     // array of all displayed objects (after sorting and potentially filtering)

 - (void)setAvoidsEmptySelection:(BOOL)flag;    // default: YES
 - (BOOL)avoidsEmptySelection;
 - (void)setPreservesSelection:(BOOL)flag;    // default: YES
 - (BOOL)preservesSelection;
 - (void)setSelectsInsertedObjects:(BOOL)flag;    // default: YES
 - (BOOL)selectsInsertedObjects;

 #if MAC_OS_X_VERSION_MAX_ALLOWED >= MAC_OS_X_VERSION_10_4
 /* Indicates whether the controller should indicate all multiple selections through the NSMultipleValuesMarker, whether the selected values are equal or not (by default, the controller will only use the NSMultipleValuesMarker if the selected objects actually have different values) - this may act as a performance enhancement in certain applications.
 */
 - (void)setAlwaysUsesMultipleValuesMarker:(BOOL)flag;
 - (BOOL)alwaysUsesMultipleValuesMarker;
 #endif

 /* All selection modification methods returning a BOOL indicate through that flag whether changing the selection was successful (changing the selection might trigger an commitEditing call which fails and thus deny's the selection change).
 */
 - (BOOL)setSelectionIndexes:(NSIndexSet *)indexes;    // to deselect all: empty index set, to select all: index set with indexes [0...count - 1]
 - (NSIndexSet *)selectionIndexes;
 - (BOOL)setSelectionIndex:(NSUInteger)index;
 - (NSUInteger)selectionIndex;
 - (BOOL)addSelectionIndexes:(NSIndexSet *)indexes;
 - (BOOL)removeSelectionIndexes:(NSIndexSet *)indexes;

 - (BOOL)setSelectedObjects:(NSArray *)objects;
 - (NSArray *)selectedObjects;
 - (BOOL)addSelectedObjects:(NSArray *)objects;
 - (BOOL)removeSelectedObjects:(NSArray *)objects;

 - (void)add:(id)sender;    // overridden to add a new object to the content objects and to the arranged objects
 - (void)remove:(id)sender;    // overridden to remove the selected objects
 - (void)insert:(id)sender;
 - (BOOL)canInsert;    // can be used in bindings controlling the enabling of buttons, for example
 - (void)selectNext:(id)sender;
 - (void)selectPrevious:(id)sender;
 - (BOOL)canSelectNext;
 - (BOOL)canSelectPrevious;

 - (void)addObject:(id)object;    // overridden to add to the content objects and to the arranged objects if all filters currently applied are matched
 - (void)addObjects:(NSArray *)objects;
 - (void)insertObject:(id)object atArrangedObjectIndex:(NSUInteger)index;    // inserts into the content objects and the arranged objects (as specified by index in the arranged objects) - will raise an exception if the object does not match all filters currently applied
 - (void)insertObjects:(NSArray *)objects atArrangedObjectIndexes:(NSIndexSet *)indexes;
 - (void)removeObjectAtArrangedObjectIndex:(NSUInteger)index;    // removes from the content objects and the arranged objects (as specified by index in the arranged objects)
 - (void)removeObjectsAtArrangedObjectIndexes:(NSIndexSet *)indexes;
 - (void)removeObject:(id)object;    // removes from the content objects and the arranged objects (if currently contained)
 - (void)removeObjects:(NSArray *)objects;

 @end

 #endif
