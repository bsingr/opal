/* 
 * control.js
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

include('foundation/foundation');
include('app_kit/view');
include('app_kit/cell');
include('app_kit/text');
include('app_kit/application');

/**
  @constants image_position
  @class VN.Control
*/
VN.NO_IMAGE = 'text_only';
VN.IMAGE_ONLY = 'image_only';
VN.IMAGE_LEFT = 'left';
VN.IMAGE_RIGHT = 'right';
VN.IMAGE_BELOW = 'below';
VN.IMAGE_ABOVE = 'above';
VN.IMAGE_OVERLAPS = 'overlaps';

/**
  @constants state
  @class VN.Control
*/
VN.MIXED_STATE = 'mixed';
VN.OFF_STATE = 'off';
VN.ON_STATE = 'on';

/**
  @constants control_size
  @class VN.Control
*/
VN.REGULAR_CONTROL_SIZE = 'regular';
VN.SMALL_CONTROL_SIZE = 'small';
VN.MINI_CONTROL_SIZE = 'mini';

/**
  VN.Control notifications
*/
VN.CONTROL_TEXT_DID_BEGIN_EDITING_NOTIFICATION = "VNControlTextDidBeginEditingNotification";
VN.CONTROL_TEXT_DID_END_EDITING_NOTIFICATION = "VNControlTextDidEndEditingNotification";
VN.CONTROL_TEXT_DID_CHANGE_NOTIFICATION = "VNControlTextDidChangeNotification";

/**
  @class VN.Control
  @extends VN.View
*/
VN.Control = VN.View.extend({
  
  defaultOptions: { image_position: 'left', state: 'off', control_size: 'regular',
                    enabled: true, selected: false },
  
  displayProperties: ['enabled', 'selected', 'state'],
  
  
  
  /**
    @param {VN.Rect} frameRect
    @returns VN.Control
  */
  initWithFrame: function(frameRect) {
    this._super(frameRect);
    this.setCell(this.cellClass().create());
    return this;    
  },
  
  initWithOptions: function(options) {
    this._super(options);
    this.enabled = options.remove('enabled');
    this.selected = options.remove('selected');
    this.control_size = options.remove('control_size');
    
    return this;
  },
  
  /**
    @param {VN.Coder} aCoder
    @returns VN.Control
  */
  initWithCoder: function(aCoder) {  
    this._super(aCoder);
    this.cell = aCoder.decodeObjectForKey("NSCell");
    if (this.cell) this.cell.setValueForKey(this, 'controlView');
    this.setFrame(this.frame);
    return this;
  },
  
  /**
    Sizes the reciever so that it fits its contents
  */
  sizeToFit: function() {
    
  },
  
  /**
    Calculates the necessary size for the controls contents
  */
  calcSize: function() {
    
  },
  
  /**
    Draws the receiver in the given rect. This method is intended for old
    browser routines using the DOM. No canvas/VML based drawing should be
    carried out in these routines. Drawing can use css etc as intended. 
    See wiki for examples and more information.
    
    @param {Boolean} firstTime
    @param {NSRenderContext} context
  */
  render: function(context, firstTime) {
    if (this.cell) {
      this.cell.renderWithFrameInView(this.bounds, this, context, firstTime);
    }
    else {
      // no cell available before drawing..
      context.setFirstTime(true);
    }
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
    if (binding == 'enabled') {
      toObject.addObserverForKeyPath(this, withKeyPath, 0, VN.ENABLED_BINDING);
      
      var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
        [toObject, withKeyPath, options],
        [VN.OBSERVED_OBJECT_KEY, VN.OBSERVED_KEY_PATH_KEY, VN.OPTIONS_KEY]);
      
      this._kvb_info.setObjectForKey(bindingInfo, VN.ENABLED_BINDING);
      this.setEnabled(toObject.valueForKeyPath(withKeyPath));
    }
  },
  
  /**
		@param {NSString} keyPath
		@param {NSObject} ofObject
		@param {NSDictionary} change
		@param {Object} context
	*/
  observeValueForKeyPath: function(keyPath, ofObject, change, context) {
    if (context == VN.ENABLED_BINDING) {
      this.setEnabled(ofObject.valueForKeyPath(keyPath));
    }
  },
  
  /**
    @type Object
  */
  value: null,
  
  /**
    @type VN.Object
  */
  target: null,
  
  /**
    @type Selector
  */
  action: null,
  
  /**
    @type Integer
  */
  tag: null,
  
  /**
    @type Boolean
  */
  continuous: null,
  
  /**
    @type Boolean
  */
  enabled: null,
  
  /**
    @type VN.TextAlignment
  */
  alignment: null,
  
  /**
    @type VN.Font
  */
  font: null,
  
  /**
    @type VN.Formatter
  */
  formatter: null,
  
  /**
    @param {selector} action
    @param {VN.Object} target
    @returns Boolean
  */
  sendAction: function(action, target) {
    if (action && target) {
      VN.App.sendActionTo(action, target, this);
      return true;
    }
    
    return false;
  },
  
  /**
    @param {VN.Object} sender
  */
  takeValueFrom: function(sender) {
    this.set('value', sender.get('value'));
  },
  
  /**
    @returns Boolean
  */
  abortEditing: function() {
    return true;
  },
  
  /**
    Validate the editing
  */
  validateEditing: function() {
    // do something
  },
  
  /**
    @param {VN.Event} theEvent
  */
  mouseDown: function(theEvent) {
    this.cell.trackMouseInView(theEvent, this.bounds, this, true);
  }
});


/**
  @returns Class
*/
VN.Control.cellClass = function() {
  return VN.Cell;
};


/**
  @mixin VN.KeyboardUI
  @class VN.Control
*/
VN.Control.mixin({
  
  /**
    @param {VN.Object} sender
  */
  performClick: function(sender) {
    this._cell.performClick(sender);
  },
  
  /**
    @param {Boolean} flag
  */
  setRefusesFirstResponder: function(flag) {
    this._cell.setRefusesFirstResponder(flag);
  },
  
  /**
    @returns Boolean
  */
  refusesFirstResponder: function() {
    this._cell.refusesFirstResponder();
  }
});


/**
  @protocol VN.ControlSubclassNotifications
*/
VN.ControlSunclassNotifications = VN.protocol({
  
  /**
    @param {VN.Notification} obj
  */
  controlTextDidBeginEditing: function(obj) {
  },
  
  /**
    @param {VN.Notification} obj
  */
  controlTextDidEndEditing: function(obj) {
  },
  
  /**
    @param {VN.Notification} obj
  */
  controlTextDidChange: function(obj) {
  },
});


/**
  @protocol VN.ControlTextEditingDelegate
*/
VN.ControlTextEditingDelegate = VN.protocol({
  
  /**
    @optional
    
    @param {VN.Control} control
    @param {VN.Text} fieldEditor
    @returns Boolean
  */
  controlTextShouldBeginEditing: function(control, fieldEditor) {
  },
  
  /**
    @optional
    
    @param {VN.Control} control
    @param {VN.Text} fieldEditor
    @returns Boolean
  */
  controlTextShouldEndEditing: function(control, fieldEditor) {
  },
  
  /**
    @optional
    
    @param {VN.Control} control
    @param {VN.String} string
    @param {VN.String} error
    @returns Boolean
  */
  controlDidFailToFormatString: function(control, string, error) {
  },
  
  /**
    @optional
    
    @param {VN.Control} control
    @param {VN.String} string
    @param {VN.String} error
  */
  controlDidFailToValidatePartialString: function(control, string, error) {
  },
  
  /**
    @optional
    
    @param {VN.Control} control
    @param {VN.Object} obj
    @returns Boolean
  */
  controlIsValidObject: function(control, obj) {
  },
  
  /**
    @optional
    
    @param {VN.Control} control
    @param {VN.TextView} textView
    @param {Selector} commandSelector
    @returns Boolean
  */
  controlTextViewDoCommandBySelector: function(control, textView, commandSelector) {
  },
  
  /**
    @optional
    
    @param {VN.Control} control
    @param {VN.TextView} textView
    @param {VN.Array} words
    @param {VN.Range} charRange
    @param {Integer} index
    @returns VN.Array
  */
  controlTextViewCompletionsForPartialWordRange: function(control, textView, words, charRange, index) {
  },
});


/**
  @mixin VN.ControlAttributedStringMethods
  @class VN.Control
*/
VN.Cell.mixin({
  
  /**
    @returns VN.AttributedString
  */
  attributedStringValue: function() {
    return this._cell.attributedStringValue();
  },
  
  /**
    @param {VN.AttributedString} obj
  */
  setAttributedStringValue: function(obj) {
    this._cell.setAttributedStringValue(obj);
  }
});
