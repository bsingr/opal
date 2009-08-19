/* 
 * nib.js
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


var NSNib = VN.Nib = VN.Object.extend({

  _data: null, 
  _connections: null,
  _hierarchy: null,
  _objects: null,
  _topLevelObjects: null,
  
  initWithContentsOfURL: function(nibFileURL) {
    
  },
  
  initWithNibNamed: function(nibName, bundle) {
     this._data = __bootstrap_files[nibName + '.json'];
     return this;
  },
  
  instantiateNibWithOwner: function(owner, topLevelObjects) {
    var nameTable = NSDictionary.create();
    nameTable.setValueForKey(owner, 'NSFileOwner');
    this._topLevelObjects = topLevelObjects;
    return this.instantiateNibWithExternalNameTable(nameTable);
  },
  
  instantiateNibWithExternalNameTable: function(externalNameTable) {
    var unarchiver = NSKeyedUnarchiver.create('initForReadingWithData', this._data);
    unarchiver.setValueForKey(externalNameTable, 'nameTable');
    this._topLevelObjects = unarchiver.decodeObjectForKey("IBDocument.RootObjects");
    this._connections = unarchiver.decodeObjectForKey("IBDocument.Objects");
    // console.log(this._topLevelObjects);
    return this._topLevelObjects;
  }
});