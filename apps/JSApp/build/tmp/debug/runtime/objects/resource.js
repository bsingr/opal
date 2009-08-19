/* 
 * resource.js
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
 
// an array of all bootstrap items. when length = 0, we can run main()
var __bootstrap_resources = [];

/**
  Used to specify a resource that needs to be loaded before the application is
  run. Only use this for essential resources: for example control images. The
  more resources required, the longer the application takes to load. If items
  are non essential, load them later as needed.
  
  Once all resources have been loaded, the main() function can then be called.
*/
function resource(aResource)
{
  var theImage = new Image();
  theImage.src = 'resources/' + aResource;
  theImage.onload = function() {
    __bootstrap_preloaded_resource(theImage);
  };
  __bootstrap_resources.push(theImage);
}

/**
  This is called when the given resource has finished loading. Essentially,
  when all resources are loaded, the application is ready to run. Therefore
  this function calls main(), and prefills the arguments as seen necessary.
*/
function __bootstrap_preloaded_resource(aResource)
{
  console.log('finished loading: ' + aResource.src);
  __bootstrap_resources.splice(__bootstrap_resources.indexOf(aResource), 1);
  
  if (__bootstrap_resources.length == 0) {
    main('', 0);
  }
}
