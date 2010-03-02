/* 
 * view.js
 * cherry_kit
 * 
 * Created by Adam Beynon.
 * Copyright 2010 Adam Beynon.
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

/**
  Represents a DOM view
*/
function CKDOMView() {
  // root element - will be a DIV
  this.root = document.createElement('div');
  this.root.className = 'ck-view';
  // support for DOM Tracking areas
  this.tracking_areas = document.createElement('div');
  this.tracking_areas.className = 'ck-tracking-areas';
  this.root.appendChild(this.tracking_areas);
  // graphics context - canvas or vml - this is where all drawing takes place.
  // CKGraphicsContext correctly returns canvas or vml context, Note: that a
  // dom element is returned, not the 2dcontext itself. (use getContext(''))
  // this.graphics_context = new CKGraphicsContext();
  // this.root.appendChild(this.graphics_context);
  // additional context - support for additional rendering. This is where we can
  // store additonal rendering capabilities. For example, Opera canvas cannot
  // yet render text, so text drawing commands should instead render <span>s in
  // to this context instead. Also, textfields: native textfields are used to
  // support faster type rendering, spelling correction etc, so this will also
  // be stored here (see textfield.js for more info).
  this.text_context = document.createElement('div');
  this.text_context.className = 'ck-text-context';
  this.root.appendChild(this.text_context);
  
  // all subviews go in here.
  this.subviews = document.createElement('div');
  this.subviews.className = 'ck-subviews';
  this.root.appendChild(this.subviews);
  
  return this;
};

function ck_view_platform_initialize(view, frame) {
  var native = new CKDOMView();
  rb_ivar_set(view, "@native_view", native);
  return view;
};

function ck_view_platform_add_subview(view, subview) {
  var pview = rb_ivar_get(view, "@native_view");
  var sview = rb_ivar_get(subview, "@native_view");
  pview.subviews.appendChild(sview.root);
  return subview;
};

function Init_CKView() {
  ck_cView = rb_const_get(mCK, "View");
  
    rb_define_method(ck_cView, "_platform_initialize", ck_view_platform_initialize, 1);
  rb_define_method(ck_cView, "_platform_add_subview", ck_view_platform_add_subview, 1);
};
