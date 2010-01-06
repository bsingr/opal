/* 
 * gem.js
 * vienna
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
  Gem support: only for gems/bundles in the vngem format. Also provides some gem 
  methods and classes that are useful. The majority is not implemented however
  for usage patterns/reasons.
  
  name - gem name, e.g. 'vienna'
  path - bundles will be '/vendor' or similar, app will be '/' or ''
  content - string content of the vngem file. This will possibly be removed once
            the content has been parsed and the necessary files have been created.
  loaded - has this gem/bundle been required()? The content is not parsed or
            processed until it is required... which usually happens straight away.
            This property is useful to avoid loading a bundle twice.
*/
function vn_gem() {
  this.name = "";
  this.path = "";
  this.content = "";
  this.loaded = false;
}

// all gems/apps/bundles, name => gem object
var vn_gem_all = { };
