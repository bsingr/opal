/* 
 * key_value_observing.js
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

include('foundation/object');
include('foundation/key_value_coding');
include('foundation/array');
include('foundation/set');

// NSKeyValueObservingOptions
var NSKeyValueObservingOptionNew            = 0x01;
var NSKeyValueObservingOptionOld            = 0x02;
var NSKeyValueObservingOptionInitial        = 0x04;
var NSKeyValueObservingOptionPrior          = 0x08;
                                        
// NSKeyValueChange                     
var NSKeyValueChangeSetting                 = 1;
var NSKeyValueChangeInsertion               = 2;
var NSKeyValueChangeRemoval                 = 3;
var NSKeyValueChangeReplacement             = 4;

// NSKeyValueSetMutationKind
var NSKeyValueUnionSetMutation              = 1;
var NSKeyValueMinusSetMutation              = 2;
var NSKeyValueIntersectSetMutation          = 3;
var NSKeyValueSetSetMutation                = 4;

// keys for chnage dictionary
var NSKeyValueChangeKindKey                 = "NSKeyValueChangeKindKey"; 
var NSKeyValueChangeNewKey                  = "NSKeyValueChangeNewKey";
var NSKeyValueChangeOldKey                  = "NSKeyValueChangeOldKey";
var NSKeyValueChangeIndexesKey              = "NSKeyValueChangeIndexesKey" ;
var NSKeyValueChangeNotificationIsPriorKey  = "NSKeyValueChangeNotificationIsPriorKey";

NSObject.mixin({
    
    observeValueForKeyPath: function(keyPath, ofObject, change, context) {
        
    },
    
    addObserver: function(observer, forKeyPath, options, context) {
        
    },
    
    removeObserver: function(observer, forKeyPath) {
        
    }
});
