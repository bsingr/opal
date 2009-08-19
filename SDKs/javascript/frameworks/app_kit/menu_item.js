/* 
 * menu_item.js
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

include('app_kit/view');

var NSMenuItem = NSObject.extend({
  
  _menu: null,
  _subMenu: null,
  _title: null,
  _keyEquivalent: null,
  _keyEquivalentModifierMask: null,
  _mnenomicLocation: null,
  _state: null,
  _onStateImage: null,
  _offStateImage: null,
  _target: null,
  _action: null,
  _tag: null,
  _extraData: null,
  
  _isEnabled: null,
  _isHidden: null,
  
  init: function() {
    this._super();
    this._title = "";
    return this;
  },
  
  initWithTitle: function(itemName, action, keyEquivalent) {
    this.init();
    this._title = itemName;
    this._action = anAction;
    this._keyEquivalent = keyEquivalent;
    
    this._isEnabled = true;
    this._isHidden = false;
    
    return this;
  },
  
  initWithCoder: function(aCoder) {
    this._title = aCoder.decodeObjectForKey("NSTitle");
    this._keyEquivalent = aCoder.decodeObjectForKey("NSKeyEquiv");
    this._keyEquivalentModifierMask = aCoder.decodeIntForKey("NSKeyEquivModMask");
    this._menu = aCoder.decodeObjectForKey("NSMenu");
    this._submenu = aCoder.decodeObjectForKey("NSSubmenu");
    this._isEnabled = true;
    this._isHidden = false;
    return this;
  },
  
  setMenu: function(aMenu) {
    this._menu = aMenu;
  },
  
  menu: function() {
    return this._menu;
  },
  
  hasSubmenu: function() {
    return this._submenu ? true : false;
  },
  
  setSubmenu: function(submenu) {
    this._submenu = submenu;
  },
  
  submenu: function() {
    return this._submenu;
  },
  
  setTitle: function(aString) {
    this._title = aString;
  },
  
  title: function() {
    return this._title;
  },
  
  setAttributedTitle: function(aString) {
    this._title = aString;
  },
  
  /**
    Returns an NSAttributedString ready for drawing for the title.
  */
  attributedTitle: function() {
    var attributes = NSDictionary.create();
		
		// font
		if (this._menu.menuView().font())
			attributes.setObjectForKey(this._menu.menuView().font(), NSFontAttributeName);
		
		// textColor
		if (this.isEnabled()) {
		  if (this.isHighlighted())
		    attributes.setObjectForKey(NSColor.selectedMenuItemTextColor(), NSForegroundColorAttributeName);
		  else
			  attributes.setObjectForKey(NSColor.colorWithCalibratedRGBA(0.916, 0.916, 0.916, 1.0), NSForegroundColorAttributeName);
		}
		else {
			attributes.setObjectForKey(NSColor.disabledControlTextColor(), NSForegroundColorAttributeName);
		}
		
		return NSAttributedString.create('initWithStringAndAttributes', this._title, attributes);
  },
  
  /**
    Added Vienna convenience method..
    
    Retuns an NSAttributedString ready for drawing key equiv
  */
  attributedKeyEquivalent: function() {
    var attributes = NSDictionary.create();
    
    // font
    if (this._menu.menuView().font())
      attributes.setObjectForKey(this._menu.menuView().font(), NSFontAttributeName);
    
    // textcolor
    if (this.isEnabled()) {
		  if (this.isHighlighted())
		    attributes.setObjectForKey(NSColor.selectedMenuItemTextColor(), NSForegroundColorAttributeName);
		  else
			  attributes.setObjectForKey(NSColor.colorWithCalibratedRGBA(0.8, 0.8, 0.8, 1.0), NSForegroundColorAttributeName);
		}
		else {
			attributes.setObjectForKey(NSColor.disabledControlTextColor(), NSForegroundColorAttributeName);
		}
		
    // mask
    var theKeyEquiv = "";
    var modMask = this.keyEquivalentModifierMask();
    if (modMask & NSShiftKeyMask)
		  theKeyEquiv = theKeyEquiv + "⇑";
		
		theKeyEquiv = theKeyEquiv + this._keyEquivalent.toUpperCase()
		
		return NSAttributedString.create('initWithStringAndAttributes', theKeyEquiv, attributes);
  },
  
  isSeparatorItem: function() {
    // this should return true if no title & no image?!?!?!?
    return this._title ? false : true;
  },
  
  setKeyEquivalent: function(keyEquivalent) {
    
  },
  
  keyEquivalent: function() {
    return this._keyEquivalent;
  },
  
  setKeyEquivalentModifierMask: function(mask) {
    
  },
  
  keyEquivalentModifierMask: function() {
    return this._keyEquivalentModifierMask;
  },
  
  userKeyEquivalent: function() {
    
  },
  
  setImage: function(menuImage) {
    
  },
  
  image: function() {
    
  },
  
  setState: function(state) {
    
  },
  
  state: function() {
    
  },
  
  setOnStateImage: function(image) {
    
  },
  
  onStateImage: function() {
    
  },
  
  setOffStateImage: function(image) {
    
  },
  
  offStateImage: function() {
    
  },
  
  setMixedStateImage: function(image) {
    
  },
  
  mixedStateImage: function() {
    
  },
  
  setEnabled: function(flag) {
    this._isEnabled = flag;
  },
  
  isEnabled: function() {
    return this._isEnabled;
  },
  
  setAlternate: function(isAlternate) {
    
  },
  
  isAlternate: function() {
    
  },
  
  setIndentationLevel: function(level) {
    
  },
  
  indentationLevel: function() {
    
  },
  
  setTarget: function(aTarget) {
    
  },
  
  target: function() {
    
  },
  
  setAction: function(anAction) {
    
  },
  
  action: function() {
    
  },
  
  setTag: function(anInt) {
    
  },
  
  tag: function() {
    
  },
  
  setRepresentedObject: function(anObject) {
    
  },
  
  representedObject: function() {
    
  },
  
  setView: function(aView) {
    
  },
  
  view: function() {
    
  },
  
  isHighlighted: function() {
    if (this._menu.highlightedItem() == this)
      return true;
    
    return false;
  },
  
  setHidden: function(hidden) {
    
  },
  
  isHidden: function() {
    
  },
  
  isHiddenOrHasHiddenAncestor: function() {
    
  },
  
  setToolTip: function(toolTip) {
    
  },
  
  toolTip: function() {
    
  }
});
