/* 
 * menu.js
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

include ('foundation/object');
include('foundation/geometry');

var NSMenu = NSObject.extend({
    
    _superMenu: null,
    _title: null,
    _itemArray: null,
    _name: null,
    
    _menuView: null,
    
    highlightedItem: null,
        
    init: function() {
        this._super();
        this._title = "";
        this._itemArray = [];
        return this;
    },
    
    initWithTitle: function(aTitle) {
        this.init();
        this._title = aTitle;
        this._itemArray = [];
        return this;
    },
    
    initWithCoder: function(aCoder) {
        this._title = aCoder.decodeObjectForKey("NSTitle");
        this._name = aCoder.decodeObjectForKey("NSName");
        this._itemArray = aCoder.decodeObjectForKey("NSMenuItems");
        return this;
    },
    
    setMenuView: function(aView) {
        this._menuView = aView;
    },
    
    menuView: function() {
        return this._menuView;
    },
    
    setTitle: function(aString) {
        this._title = aString;
    },
    
    title: function() {
        return this._title;
    },
    
    supermenu: function() {
        return this._superMenu;
    },
    
    setSupermenu: function(supermenu) {
        this._superMenu = supermenu;
    },
    
    insertItem: function(newItem, atIndex) {
        
    },
    
    addItem: function(newItem) {
        
    },
    
    insertItemWithTitle: function(aString, aSelector, keyEquivalent, index) {
        
    },
    
    addItemWithTitle: function(aString, aSelector, keyEquivalent) {
        
    },
    
    removeItemAtIndex: function(index) {
        
    },
    
    removeItem: function(item) {
        
    },
    
    setSubmenuForItem: function(aMenu, anItem) {
        
    },
    
    itemArray: function() {
        return this._itemArray;
    },
    
    numberOfItems: function() {
        return this._itemArray.count();
    },
    
    itemAtIndex: function(index) {
        return this._itemArray[index];
    },
    
    indexOfItem: function(item) {
        return this._itemArray.indexOf(item);
    },
    
    indexOfItemWithTitle: function(aTitle) {
        
    },
    
    indexOfItemWithTag: function(aTag) {
        
    },
    
    indexOfItemWithRepresentedObject: function(anObject) {
        
    },
    
    indexOfItemWithSubmenu: function(submenu) {
        
    },
    
    indexOfItemWithTarget: function(target, andAction) {
        
    },
    
    itemWithTitle: function(aTitle) {
        
    },
    
    itemWithTag: function(aTag) {
        
    },
    
    setAutoEnablesItems: function(flag) {
        
    },
    
    autoEnablesItems: function() {
        
    },
    
    update: function() {
        
    },
    
    performKeyEquivalent: function(theEvent) {
        
    },
    
    itemChanged: function(item) {
        
    },
    
    performActionForItemAtIndex: function(index) {
        
    },
    
    setDelegate: function(anObject) {
        
    },
    
    delegate: function() {
        
    },
    
    cancelTracking: function() {
        
    },
    
    highlightedItem: function() {
        return this._highlightedItem;
    },
    
    setHighlightedItem: function(anItem) {
        this._highlightedItem = anItem;
    }
});

Object.extend(NSMenu, {
    
    menuBarHeight: function() {
        return 30.0;
    }
});
