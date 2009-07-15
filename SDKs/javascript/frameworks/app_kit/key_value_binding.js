/* 
 * key_value_binding.js
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

var NSMultipleValuesMarker  = "NSMultipleValuesMarker";
var NSNoSelectionMarker     = "NSNoSelectionMarker";
var NSNotApplicableMarker   = "NSNotApplicableMarker";

/*
    @param object - NSObject
    @return boolean
*/
function NSIsControllerMarker(object)
{
    if (object == NSMultipleValuesMarker || object ==  NSNoSelectionMarker || object == NSNotApplicableMarker)
        return true;
    
    return false;
}

/*
    These keys are to be used in the retunred dictionary for the infoForBinding
    method.
*/
var NSObservedObjectKey     = "NSObservedObjectKey";
var NSObservedKeyPathKey    = "NSObservedKeyPathKey";
var NSOptionsKey            = "NSOptionsKey";

/*
    Bindings exposed here will then become available in the instance method
    exposedBindings();
    
    @param binding - NSString
*/
NSObject.exposeBinding = function(binding) {
    
};

/*
    @mixin NSKeyValueBindingCreation
*/
NSObject.mixin({
    
    /**
        A NSDictionary used for holding binding info. Each key is the binding 
        context name (see lower area of this file) and the value for each key
        is another dictionary holding information for the binding.
        
        @type NSDictionary
    */
    _kvb_info: NSDictionary.create(),
    
    
    /**
        @returns NSArray
    */
    exposedBindings: function() {
        
    },
    
    /**
        Optional method.
        
        @param binding - NSString
        @return Class
    */
    valueClassForBinding: function(binding) {
        
    },
    
    /**
        Instantiate a binding to the object. Placeholders and other information
        can be specified in the options dictionary.
        
        @param binding - NSString
        @param toObject - NSObject
        @param withKeyPath - NSString
        @param options - NSDictionary
    */
    bind: function(binding, toObject, withKeyPath, options) {
        console.log('bind ' + binding + " to key path " + withKeyPath + ' for ');
        console.log(this);
    },
    
    /**
        Remove the specified binding
        
        @param binding - NSString
    */
    unbind: function(binding) {
        
    },
    
    /**
        Information about the dictionary. Can be null if the binding is not
        bound. Contains these three items:
        
        NSObservedObjectKey   - the bound object
        NSObservedKeyPathKey  - the bound keypath
        NSOptionsKey          - specified options
        
        @param binding - NSString
        @return NSDictionary
    */
    infoForBinding: function(binding) {
        
    },
    
    /**
        Returns array of NSAttributeDescriptions for binding
        
        @param binding - NSString
        @return NSArray
    */
    optionDescriptionsForBinding: function(binding) {
        
    }
});

/**
    @mixin NSPlaceholders (meta class)
*/
Object.extend(NSObject, {
    
    /**
        Marker can be null, NSMultipleValuesMarker, NSNoSelectionMarker or
        NSNotApplicableMarker
        
        @param placeholder - NSObject
        @param marker - NSObject
        @param binding - NSString
    */
    setDefaultPlaceholderForMarker: function(placeholder, marker, binding) {
        
    },
    
    /**
        Marker can be null, NSMultipleValuesMarker, NSNoSelectionMarker or
        NSNotApplicableMarker
    
        @param marker - NSObject
        @param binding - NSString
    */
    defaultPlaceholderForMarker: function(marker, binding) {
        
    }
});

/**
    @mixin NSEditorRegistration
    
    These should be implemented by controllers etc.
*/
NSObject.mixin({
    
    /**
        @param editor - NSObject
    */
    objectDidBeginEditing: function(editor) {
        
    },
    
    /**
        @param editor - NSObject
    */
    objectDidEndEditing: function(editor) {
        
    }
});

/**
    @mixin NSEditor
    
    These should be implemented by controllers etc.
*/
NSObject.mixin({
    
    /**
        Reverts back to original value (end chnages).
    */
    discardEditing: function() {
        
    },
    
    /**
        Returns whether or not end editing was a success. It might not be if the
        value is invalid (e.g. an object requires a float value, but was given
        a string).
        
        @return boolean
    */
    commitEditing: function() {
        
    },
    
    /**
        @param delegate - NSObject
        @param didCommitAction - function pointer for delegate
        @param contextInfo - NSObject
    */
    commitEditingWithDelegate: function(delegate, didCommitAction, contextInfo) {
        
    }
});

/**
    Default constant names for bindings (AppKit defined)
*/
var NSAlignmentBinding                          = "NSAlignmentBinding";
var NSAlternateImageBinding	                    = "NSAlternateImageBinding";
var NSAlternateTitleBinding	                    = "NSAlternateTitleBinding";
var NSAnimateBinding                            = "NSAnimateBinding";
var NSAnimationDelayBinding	                    = "NSAnimationDelayBinding";
var NSArgumentBinding	                        = "NSArgumentBinding";
var NSAttributedStringBinding	                = "NSAttributedStringBinding";
var NSContentArrayBinding	                    = "NSContentArrayBinding";
var NSContentArrayForMultipleSelectionBinding	= "NSContentArrayForMultipleSelectionBinding";
var NSContentBinding	                        = "NSContentBinding";
var NSContentDictionaryBinding	                = "NSContentDictionaryBinding";
var NSContentHeightBinding	                    = "NSContentHeightBinding";
var NSContentObjectBinding	                    = "NSContentObjectBinding";
var NSContentObjectsBinding	                    = "NSContentObjectsBinding";
var NSContentSetBinding	                        = "NSContentSetBinding";
var NSContentValuesBinding                      = "NSContentValuesBinding";
var NSContentWidthBinding                       = "NSContentWidthBinding";
var NSCriticalValueBinding                      = "NSCriticalValueBinding";
var NSDataBinding                               = "NSDataBinding";
var NSDisplayPatternTitleBinding                = "NSDisplayPatternTitleBinding";
var NSDisplayPatternValueBinding                = "NSDisplayPatternValueBinding";
var NSDocumentEditedBinding                     = "NSDocumentEditedBinding";
var NSDoubleClickArgumentBinding                = "NSDoubleClickArgumentBinding";
var NSDoubleClickTargetBinding                  = "NSDoubleClickTargetBinding";
var NSEditableBinding                           = "NSEditableBinding";
var NSEnabledBinding                            = "NSEnabledBinding";
var NSExcludedKeysBinding                       = "NSExcludedKeysBinding";
var NSFilterPredicateBinding                    = "NSFilterPredicateBinding";
var NSFontBinding                               = "NSFontBinding";
var NSFontBoldBinding                           = "NSFontBoldBinding";
var NSFontFamilyNameBinding                     = "NSFontFamilyNameBinding";
var NSFontItalicBinding                         = "NSFontItalicBinding";
var NSFontNameBinding                           = "NSFontNameBinding";
var NSFontSizeBinding                           = "NSFontSizeBinding";
var NSHeaderTitleBinding                        = "NSHeaderTitleBinding";
var NSHiddenBinding                             = "NSHiddenBinding";
var NSImageBinding                              = "NSImageBinding";
var NSIncludedKeysBinding                       = "NSIncludedKeysBinding";
var NSInitialKeyBinding                         = "NSInitialKeyBinding";
var NSInitialValueBinding                       = "NSInitialValueBinding";
var NSIsIndeterminateBinding                    = "NSIsIndeterminateBinding";
var NSLabelBinding                              = "NSLabelBinding";
var NSLocalizedKeyDictionaryBinding             = "NSLocalizedKeyDictionaryBinding";
var NSManagedObjectContextBinding               = "NSManagedObjectContextBinding";
var NSMaximumRecentsBinding                     = "NSMaximumRecentsBinding";
var NSMaxValueBinding                           = "NSMaxValueBinding";
var NSMaxWidthBinding                           = "NSMaxWidthBinding";
var NSMinValueBinding                           = "NSMinValueBinding";
var NSMinWidthBinding                           = "NSMinWidthBinding";
var NSMixedStateImageBinding                    = "NSMixedStateImageBinding";
var NSOffStateImageBinding                      = "NSOffStateImageBinding";
var NSOnStateImageBinding                       = "NSOnStateImageBinding";
var NSPredicateBinding                          = "NSPredicateBinding";
var NSRecentSearchesBinding                     = "NSRecentSearchesBinding";
var NSRepresentedFilenameBinding                = "NSRepresentedFilenameBinding";
var NSRowHeightBinding                          = "NSRowHeightBinding";
var NSSelectedIdentifierBinding                 = "NSSelectedIdentifierBinding";
var NSSelectedIndexBinding                      = "NSSelectedIndexBinding";
var NSSelectedLabelBinding                      = "NSSelectedLabelBinding";
var NSSelectedObjectBinding                     = "NSSelectedObjectBinding";
var NSSelectedObjectsBinding                    = "NSSelectedObjectsBinding";
var NSSelectedTagBinding                        = "NSSelectedTagBinding";
var NSSelectedValueBinding                      = "NSSelectedValueBinding";
var NSSelectedValuesBinding                     = "NSSelectedValuesBinding";
var NSSelectionIndexesBinding                   = "NSSelectionIndexesBinding";
var NSSelectionIndexPathsBinding                = "NSSelectionIndexPathsBinding";
var NSSortDescriptorsBinding                    = "NSSortDescriptorsBinding";
var NSTargetBinding                             = "NSTargetBinding";
var NSTextColorBinding                          = "NSTextColorBinding";
var NSTitleBinding                              = "NSTitleBinding";
var NSToolTipBinding                            = "NSToolTipBinding";
var NSTransparentBinding                        = "NSTransparentBinding";
var NSValueBinding                              = "NSValueBinding";
var NSValuePathBinding                          = "NSValuePathBinding";
var NSValueURLBinding                           = "NSValueURLBinding";
var NSVisibleBinding                            = "NSVisibleBinding";
var NSWarningValueBinding                       = "NSWarningValueBinding";
var NSWidthBinding                              = "NSWidthBinding";


/**
    Options for bindings (used with info keys at top).
*/
var NSAllowsEditingMultipleValuesSelectionBindingOption = "NSAllowsEditingMultipleValuesSelectionBindingOption";
var NSAllowsNullArgumentBindingOption                   = "NSAllowsNullArgumentBindingOption";
var NSAlwaysPresentsApplicationModalAlertsBindingOption = "NSAlwaysPresentsApplicationModalAlertsBindingOption";
var NSConditionallySetsEditableBindingOption            = "NSConditionallySetsEditableBindingOption";
var NSConditionallySetsEnabledBindingOption             = "NSConditionallySetsEnabledBindingOption";
var NSConditionallySetsHiddenBindingOption              = "NSConditionallySetsHiddenBindingOption";
var NSContinuouslyUpdatesValueBindingOption             = "NSContinuouslyUpdatesValueBindingOption";
var NSCreatesSortDescriptorBindingOption                = "NSCreatesSortDescriptorBindingOption";
var NSDeletesObjectsOnRemoveBindingsOption              = "NSDeletesObjectsOnRemoveBindingsOption";
var NSDisplayNameBindingOption                          = "NSDisplayNameBindingOption";
var NSDisplayPatternBindingOption                       = "NSDisplayPatternBindingOption";
var NSContentPlacementTagBindingOption                  = "NSContentPlacementTagBindingOption";
var NSHandlesContentAsCompoundValueBindingOption        = "NSHandlesContentAsCompoundValueBindingOption";
var NSInsertsNullPlaceholderBindingOption               = "NSInsertsNullPlaceholderBindingOption";
var NSInvokesSeparatelyWithArrayObjectsBindingOption    = "NSInvokesSeparatelyWithArrayObjectsBindingOption";
var NSMultipleValuesPlaceholderBindingOption            = "NSMultipleValuesPlaceholderBindingOption";
var NSNoSelectionPlaceholderBindingOption               = "NSNoSelectionPlaceholderBindingOption";
var NSNotApplicablePlaceholderBindingOption             = "NSNotApplicablePlaceholderBindingOption";
var NSNullPlaceholderBindingOption                      = "NSNullPlaceholderBindingOption";
var NSRaisesForNotApplicableKeysBindingOption           = "NSRaisesForNotApplicableKeysBindingOption";
var NSPredicateFormatBindingOption                      = "NSPredicateFormatBindingOption";
var NSSelectorNameBindingOption                         = "NSSelectorNameBindingOption";
var NSSelectsAllWhenSettingContentBindingOption         = "NSSelectsAllWhenSettingContentBindingOption";
var NSValidatesImmediatelyBindingOption                 = "NSValidatesImmediatelyBindingOption";
var NSValueTransformerNameBindingOption                 = "NSValueTransformerNameBindingOption";
var NSValueTransformerBindingOption                     = "NSValueTransformerBindingOption";
