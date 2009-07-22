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

VN.MULTIPLE_VALUES_MARKER = "VNMultipleValuesMarker";
VN.NO_SELECTION_MARKER = "VNNoSelectionMarker";
VN.NOT_APPLICABLE_MARKER = "VNNotApplicableMarker";

/**
    Useful method for determining whether objects are used as markers in binding
    dicitonary arrays.
    
    @param {VN.Object} object
    @return Boolean
*/
VN.IsControllerMarker = function(object) {
    if (object == VN.MULTIPLE_VALUES_MARKER || object ==  VN.NO_SELECTION_MARKER || object == VN.NOT_APPLICABLE_MARKER)
        return true;
    
    return false;
}

/**
    For the infoForBinding dictionary: the actual object being observed
*/
VN.OBSERVED_OBJECT_KEY = "VNObservedObjectKey";

/**
    For the infoForBinding dictionary: the keyPath used for observing
*/
VN.OBSERVED_KEY_PATH_KEY = "VNObservedKeyPathKey";

/**
    For the infoForBinding dictionary: any options for the binding
*/
VN.OPTIONS_KEY = "VNOptionsKey";

/**
    Bindings exposed here will then become available in the instance method
    exposedBindings();
    
    @param {VN.String} binding
*/
VN.Object.exposeBinding = function(binding) {
    // should expose the binding in Interface Builder
};

/**
    @mixin VNKeyValueBindingCreation
    @class VN.Object
*/
VN.Object.mixin({
    
    /**
        A VN.Dictionary used for holding binding info. Each key is the binding 
        context name (see lower area of this file) and the value for each key
        is another dictionary holding information for the binding.
        
        @type VN.Dictionary
    */
    _kvb_info: VN.Dictionary.create(),
    
    
    /**
        @returns VN.Array
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
VN.extend(NSObject, {
    
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
VN.Object.mixin({
    
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
VN.Object.mixin({
    
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
VN.ALIGNMENT_BINDING = "VNAlignmentBinding";
VN.ALTERNATE_IMAGE_BINDING = "VNAlternateImageBinding";
VN.ALTERNATE_TITLE_BINDING = "VNAlternateTitleBinding";
VN.ANIMATE_BINDING = "VNAnimateBinding";
VN.ANIMATION_DELAY_BINDING = "VNAnimationDelayBinding";
VN.ARGUMENT_BINDING = "VNArgumentBinding";
VN.ATTRIBUTED_STRING_BINDING = "VNAttributedStringBinding";
VN.CONTENT_ARRAY_BINDING = "VNContentArrayBinding";
VN.CONTENT_ARRAY_FOR_MULTIPLE_SELECTION_BINDING = "VNContentArrayForMultipleSelectionBinding";
VN.CONTENT_BINDING = "VNContentBinding";
VN.CONTENT_DICTIONARY_BINDING = "VNContentDictionaryBinding";
VN.CONTENT_HEIGHT_BINDING = "VNContentHeightBinding";
VN.CONTENT_OBJECT_BINDING = "VNContentObjectBinding";
VN.CONTENT_OBJECTS_BINDING = "VNContentObjectsBinding";
VN.CONTENT_SET_BINDING = "VNContentSetBinding";
VN.CONTENT_VALUES_BINDING = "VNContentValuesBinding";
VN.CONTENT_WIDTH_BINDING = "VNContentWidthBinding";
VN.CRITICAL_VALUE_BINDING = "VNCriticalValueBinding";
VN.DATA_BINDING = "VNDataBinding";
VN.DISPLAY_PATTERN_TITLE_BINDING = "VNDisplayPatternTitleBinding";
VN.DISPLAY_PATTERN_VALUE_BINDING = "VNDisplayPatternValueBinding";
VN.DOCUMENT_EDITED_BINDING = "VNDocumentEditedBinding";
VN.DOUBLE_CLICK_ARGUMENT_BINDING = "VNDoubleClickArgumentBinding";
VN.DOUBLE_CLICK_TARGET_BINDING = "VNDoubleClickTargetBinding";
VN.EDITABLE_BINDING = "VNEditableBinding";
VN.ENABLED_BINDING = "VNEnabledBinding";
VN.EXCLUDED_KEYS_BINDING = "VNExcludedKeysBinding";
VN.FILTER_PREDICATE_BINDING = "VNFilterPredicateBinding";
VN.FONT_BINDING = "VNFontBinding";
VN.FONT_BOLD_BINDING = "VNFontBoldBinding";
VN.FONT_FAMILY_NAME_BINDING = "VNFontFamilyNameBinding";
VN.FONT_ITALIC_BINDING = "VNFontItalicBinding";
VN.FONT_NAME_BINDING = "VNFontNameBinding";
VN.FONT_SIZE_BINDING = "VNFontSizeBinding";
VN.HEADER_TITLE_BINDING = "VNHeaderTitleBinding";
VN.HIDDEN_BINDING = "VNHiddenBinding";
VN.IMAGE_BINDING = "VNImageBinding";
VN.INCLUDED_KEYS_BINDING = "VNIncludedKeysBinding";
VN.INITIAL_KEY_BINDING = "VNInitialKeyBinding";
VN.INTIAL_VALUE_BINDING = "VNInitialValueBinding";
VN.IS_INDETERMINATE_BINDING = "VNIsIndeterminateBinding";
VN.LABEL_BINDING = "VNLabelBinding";
VN.LOCALIZED_KEY_DICTIONARY_BINDING = "VNLocalizedKeyDictionaryBinding";
VN.MANAGED_OBJECT_CONTEXT_BINDING = "VNManagedObjectContextBinding";
VN.MAXIMUM_RECENTS_BINDING = "VNMaximumRecentsBinding";
VN.MAX_VALUE_BINDING = "VNMaxValueBinding";
VN.MAX_WIDTH_BINDING = "VNMaxWidthBinding";
VN.MIN_VALUE_BINDING = "VNMinValueBinding";
VN.MIN_WIDTH_BINDING = "VNMinWidthBinding";
VN.MIXED_STATE_IMAGE_BINDING = "VNMixedStateImageBinding";
VN.OFF_STATE_IMAGE_BINDING = "VNOffStateImageBinding";
VN.ON_STATE_IMAGE_BINDING = "VNOnStateImageBinding";
VN.PREDICATE_BINDING = "VNPredicateBinding";
VN.RECENT_SEARCHES_BINDING = "VNRecentSearchesBinding";
VN.REPRESENTED_FILENAME_BINDING = "VNRepresentedFilenameBinding";
VN.ROW_HEIGHT_BINDING = "VNRowHeightBinding";
VN.SELECTED_IDENTIFIER_BINDING = "VNSelectedIdentifierBinding";
VN.SELECTED_INDEX_BINDING = "VNSelectedIndexBinding";
VN.SELECTED_LABEL_BINDING = "VNSelectedLabelBinding";
VN.SELECTED_OBJECT_BINDING = "VNSelectedObjectBinding";
VN.SELECTED_OBJECTS_BINDING = "VNSelectedObjectsBinding";
VN.SELECTED_TAG_BINDING = "VNSelectedTagBinding";
VN.SELECTED_VALUE_BINDING = "VNSelectedValueBinding";
VN.SELECTED_VALUES_BINDING = "VNSelectedValuesBinding";
VN.SELECTION_INDEXES_BINDING = "VNSelectionIndexesBinding";
VN.SELECTION_INDEX_PATHS_BINDING = "VNSelectionIndexPathsBinding";
VN.SORT_DESCRIPTORS_BINDING = "VNSortDescriptorsBinding";
VN.TAGRTE_BINDING = "VNTargetBinding";
VN.TEXT_COLOR_BINDING = "VNTextColorBinding";
VN.TITLE_BINDING = "VNTitleBinding";
VN.TOOP_TIP_BINDING = "VNToolTipBinding";
VN.TRANSPARENT_BINDING = "VNTransparentBinding";
VN.VALUE_BINDING = "VNValueBinding";
VN.VALUE_PATH_BINDING = "VNValuePathBinding";
VN.VALUE_URL_BINDING = "VNValueURLBinding";
VN.VISIBLE_BINDING = "VNVisibleBinding";
VN.WARNING_VALUE_BINDING = "VNWarningValueBinding";
VN.WIDTH_BINDING = "VNWidthBinding";


/**
    Options for bindings (used with info keys at top).
*/
VN.ALLOWS_EDITING_MULTIPLE_VALUES_SELECTION_BINDING_OPTION = "VNAllowsEditingMultipleValuesSelectionBindingOption";
VN.ALLOWS_NULL_ARGUMENT_BINDING_OPTION = "VNAllowsNullArgumentBindingOption";
VN.ALWAYS_PRESENTS_APPLICATION_MODAL_ALERTS_BINDING_OPTION = "VNAlwaysPresentsApplicationModalAlertsBindingOption";
VN.CONDITIONALLY_SETS_EDITABLE_BINDING_OPTION = "VNConditionallySetsEditableBindingOption";
VN.CONDITIONALLY_SETS_ENABLED_BINDING_OPTION = "VNConditionallySetsEnabledBindingOption";
VN.CONDITIONALLY_SETS_HIDDEN_BINDING_OPTION = "VNConditionallySetsHiddenBindingOption";
VN.CONTINUOUSLY_UPDATES_VALUE_BINDING_OPTION = "VNContinuouslyUpdatesValueBindingOption";
VN.CREATES_SORT_DESCRIPTOR_BINDING_OPTION = "VNCreatesSortDescriptorBindingOption";
VN.DELETES_OBJECTS_ON_REMOVE_BINDING_OPTION = "VNDeletesObjectsOnRemoveBindingsOption";
VN.DISPLAY_NAME_BINDING_OTPTION = "VNDisplayNameBindingOption";
VN.DISPLAY_PATTERN_BINDING_OPTION = "VNDisplayPatternBindingOption";
VN.CONTENT_PLACEMENT_TAG_BINDING_OPTION = "VNContentPlacementTagBindingOption";
VN.HANDLES_CONTENT_AS_COMPOUND_VALUE_BINDING_OPTION = "VNHandlesContentAsCompoundValueBindingOption";
VN.INSERTS_NULL_PLACEHOLDER_BINDING_OPTION = "VNInsertsNullPlaceholderBindingOption";
VN.INVOKES_SEPERATELY_WITH_ARRAY_OBJECTS_BINDING_OPTION = "VNInvokesSeparatelyWithArrayObjectsBindingOption";
VN.MULTIPLE_VALUES_PLACEHOLDER_BINDING_OTPION = "VNMultipleValuesPlaceholderBindingOption";
VN.NO_SELECTION_PLACEHOLDER_BINDING_OPTION = "VNNoSelectionPlaceholderBindingOption";
VN.NOT_APPLICABLE_PLACEHOLDER_BINDING_OPTION = "VNNotApplicablePlaceholderBindingOption";
VN.NULL_PLACEHOLDER_BINDING_OPTION = "VNNullPlaceholderBindingOption";
VN.RAISES_FOR_NOT_APPLICABLE_KEYS_BINDING_OPTION = "VNRaisesForNotApplicableKeysBindingOption";
VN.PREDICATE_FORMAT_BINDING_OPTION = "VNPredicateFormatBindingOption";
VN.SELECTOR_NAME_BINDING_OPTION = "VNSelectorNameBindingOption";
VN.SELECTS_ALL_WHEN_SETTING_CONTENT_BINDING_OPTION = "VNSelectsAllWhenSettingContentBindingOption";
VN.VALIDATES_IMMEDIATELY_BINDING_OPTION = "VNValidatesImmediatelyBindingOption";
VN.VALUE_TRANSFORMER_NAME_BINDING_OPTION = "VNValueTransformerNameBindingOption";
VN.VALUE_TRANSFORMER_BINDING_OPTION = "VNValueTransformerBindingOption";
