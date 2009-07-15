/* 
 * AppController.js
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

include('vienna/vienna');

var AppController = NSObject.extend({
     
    /**
        @type Integer
    */
    _testValue: 10,
   
    /**
        @outlet
        @type NSWindow
    */
    _window: IBOutlet(),
   
   /**
        @outlet
        @type NSArrayController
   */
   _arrayController: IBOutlet(),
   
    /**
        @outlet
        @type NSArray
    */
    _tableContent: IBOutlet(),
    
    _tempData: null,
    
    _tableSelections: null,
   
    init: function() {
        this._super();
       
        this._tempData = [
            { "name": "Adam", "age": 23, "band": "Led Zepplin" },
            { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
            { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" },
            { "name": "Adam", "age": 23, "band": "Led Zepplin" },
            { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
            { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" },
            { "name": "Adam", "age": 23, "band": "Led Zepplin" },
            { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
            { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" },
            { "name": "Adam", "age": 23, "band": "Led Zepplin" },
            { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
            { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" },
            { "name": "Adam", "age": 23, "band": "Led Zepplin" },
            { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
            { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" },
            { "name": "Adam", "age": 23, "band": "Led Zepplin" },
            { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
            { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" },
            { "name": "Adam", "age": 23, "band": "Led Zepplin" },
            { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
            { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" },
            { "name": "Adam", "age": 23, "band": "Led Zepplin" },
            { "name": "Benjamin", "age": 22, "band": "Rage Against the machine" },
            { "name": "Rebeccae", "age": 19, "band": "Lagy Gaga" }
        ];
       
       console.log('creating app controller');
       return this;
   },
   
   setTestValue: function(aValue) {
       this._testValue = aValue;
   }.property('testValue'),
   
   doSomething: function(sender) {
       
   },
   
   awakeFromNib: function(sender) {
       console.log("Awoken from nib");
   },
   
   applicationWillFinishLaunching: function() {
       console.log('Application will finish launching');
   },
   
   applicationDidFinishLaunching: function() {
       console.log("Application finished lauchiong");
   },

	/**
		Table view delegate
	*/
	numberOfRowsInTableView: function(tableView) {
		return this._tempData.length;
	},
	
	tableViewObjectValueForTableColumnRow: function(tableView, tableColumn, row) {
        // console.log(tableColumn);
	    return this._tempData[row][tableColumn.identifier()];
	}
});
