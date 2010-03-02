/* 
 * window.js
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
  Represents a DOM Window
*/
function CKDOMWindow() {
  this.element = document.createElement('div');
  this.element.className = 'ck-window';
  document.body.appendChild(this.element);
  return this;
};

CKDOMWindow.prototype = {
  
};
 
function ck_window_platform_initialize(win, frame) {
  var native = new CKDOMWindow();
  rb_ivar_set(win, "@native_window", native);
  return win;
};

function ck_window_set_content_view(win, view) {
  var pwin= rb_ivar_get(win, "@native_window");
  var pview = rb_ivar_get(view, "@native_view");
  pwin.element.appendChild(pview.root);
  return win;
};


function Init_CKWindow() {
  ck_cWindow = rb_const_get(mCK, "Window");
  
  rb_define_method(ck_cWindow, "_platform_initialize", ck_window_platform_initialize, 1);
  
  rb_define_method(ck_cWindow, "_platform_set_content_view", ck_window_set_content_view, 1);
};
