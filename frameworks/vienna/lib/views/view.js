/* 
 * view.js
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


Vienna.extend({
  View: new Class('View', Vienna.Responder, {
    
    $displayProperties: function() {
      // set class constant DISPLAY_PROPERTIES to this, plus, check if superklass
      // has any, and append this klass' onto those (inherit display props)
      // console.log(arguments);
    },
    
    /**
      Class method to add the default options to the class, so that they can be
      accessed in initWithOptions
    */
    $defaultOptions: function(options) {
      
    },
    
    $build: function(options, block) {
      var obj = this.allocate();
      
      // here we need to add options into the this.DEFAULT_OPTIONS constant
      obj.initWithOptions(options);
      // call block with the view as the param
      if (typeof block != 'undefined') {
        block.call(obj, obj);
      }
      return obj;
    },
    
    initialize: function(frame) {
      // frame = frame.toRect(); // catch array being passed as framesize
      console.log('init frame');
    },
    
    initWithOptions: function(options) {
      return this.initialize(options.remove('frame'));
    }
  })
});

// We must do this after, as we cannot guarantee the class method is created before this is called
Vienna.View.extend({
  // properties causing the view to re-display
  displayProperties: ['frame', 'frameOrigin', 'frameSize'],
  
  // default options for initilisation
  defaultOptions: { 
    frame: new VN.Rect(0, 0, 0, 0),
    toolTip: 'Vienna.View',
    hidden: false,
    flipped: false
  },
});

require('controls/control');

