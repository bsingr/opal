/* 
 * notification_center.js
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

include('foundation/notification');

// Singleton instance used for the application
var NSNotificationCenterDefault = null;


var NSNotificationCenter = NSObject.extend({
    
    _dispatchTable: null,
    
    init: function() {
        this._super();
        this._dispatchTable = [];
        return this;
    },
    
    addObserver: function(anObserver, notificationSelector, notificationName, notificationSender) {
        var theAttributes = NSDictionary.create();
        theAttributes.setObjectForKey(anObserver, "observer");
        theAttributes.setObjectForKey(notificationSelector, "selector");
        theAttributes.setObjectForKey(notificationName, "name");
        theAttributes.setObjectForKey(notificationSender, "sender");
        theAttributes.setObjectForKey(true, "working");
        this._dispatchTable.addObject(theAttributes);
    },
    
    /**
        Posts the notification called notificationName.
        @param userInfo - Dictionary, but can be null
    */
    postNotificationName: function(notificationName, notificationSender, userInfo) {
        for (var idx = 0; idx < this._dispatchTable.length; idx++) {
            var theObject = this._dispatchTable[idx];
            if (theObject.objectForKey("name") == notificationName)
                theObject.objectForKey("observer").perform(theObject.objectForKey("selector"), notificationSender, userInfo);
        }
    }
});

/**
    Returns the default notification center, aka, the instance that should be
    used within the application.
*/
NSNotificationCenter.defaultCenter = function() {
    
    if (!NSNotificationCenterDefault)
        NSNotificationCenterDefault = NSNotificationCenter.create();
    
    return NSNotificationCenterDefault;
};
