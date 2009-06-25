/* 
 * application.js
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
include('app_kit/responder');
include('app_kit/graphics_context');
include('app_kit/window');

var NSApplication = NSResponder.extend({
    
    _delegate: null,
    
    _windows: [],
    
    _currentEvent: null,
    
    _eventQueue: [],
    
    _eventBindingQueued: false,
    
    _eventBindingTarget: null,
    
    _eventBindingBlock: null,
    
    _eventBindingMask: null,
    
    _menuBar: null,
    
    init: function() {
        this._super();
    },
    
    sharedApplication: function() {
        
    },
    
    setDelegate: function(anObject) {
        
    },
    
    delegate: function() {
        
    },
    
    context: function() {
        
    },
    
    windowWithWindowNumber: function(windowNum) {
        
    },
    
    windowAtPoint: function(point) {
        
    },
    
    mainWindow: function() {
        
    },
    
    keyWindow: function() {
        
    },
    
    isRunning: function() {
        
    },
    
    finishLaunching: function() {
        
    },
    
    run: function() {
        
    },
   
    postEvent: function(theEvent, atStart) {
        
    },
    
    currentEvent: function() {
        
    },
    
    sendEvent: function(theEvent) {
        
    },
    
    preventWindowOrdering: function() {
        
    },
    
    makeWindowsPerform: function(aSelector, inOrder) {
        
    },
    
    windows: function() {
        
    },
    
    setWindowsNeedUpdate: function(needUpdate) {
        
    },
    
    updateWindows: function() {
        
    },
    
    setMainMenu: function(aMenu) {
        
    },
    
    mainMenu: function() {
        
    },
    
    setApplicationIconImage: function(image) {
        
    },
    
    applicationIconImage: function() {
        
    },
    
    sendAction: function(theAction, theTarget, sender) {
        
    },
    
    targetForAction: function(theAction, theTarget, theSender) {
        
    },

    tryToPerform: function (anAction, anObject) {
        
    }
});

function NSApplicationMain(argc, argv)
{
    return 1;
}