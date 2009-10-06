/* 
 * key_value_binding.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

Vienna.extend({
  
  MULTIPLE_VALUES_MARKER: 'VNMultipleValuesMarker',
  NO_SELECTION_MARKER: 'VNNoSelectionMarker',
  NOT_APPLICABLE_MARKER: 'VNNotApplicableMarker',
  
  Object: Vienna.Object.extend({
    
    bind: function(binding, obj, keyPath, options) {
      console.log('bid %@ to key path %@ for %@'.format(binding, keyPath, obj));
    },
    
    
  }),
  
  ALIGNMENT_BINDING: 'VNAlignmentBinding',
  ALTERNATE_IMAGE_BINDING: 'VNAlternateImageBinding',
  ALTERNATE_TITLE_BINDING: 'VNAlternateTitleBinding',
  ANIMATE_BINDING: 'VNAnimateBinding',
  ANIMATION_DELAY_BINDING: 'VNAnimationDelayBinding',
  ARGUMENT_BINDING: 'VNArgumentBinding',
  ATTRIBUTED_STRING_BINDING: 'VNAttributedStringBinding',
  CONTENT_ARRAY_BINDING: 'VNContentArrayBinding',
  CONTENT_ARRAY_FOR_MULTIPLE_SELECTION_BINDING: 'VNContentArrayForMultipleSelectionBinding',
  CONTENT_BINDING: 'VNContentBinding',
  CONTENT_DICTIONARY_BINDING: 'VNContentDictionaryBinding',
  CONTENT_HEIGHT_BINDING: 'VNContentHeightBinding',
  CONTENT_OBJECT_BINDING: 'VNContentObjectBinding',
  CONTENT_OBJECTS_BINDING: 'VNContentObjectsBinding',
  CONTENT_SET_BINDING: 'VNContentSetBinding',
  CONTENT_VALUES_BINDING: 'VNContentValuesBinding',
  CONTENT_WIDTH_BINDING: 'VNContentWidthBinding',
  CRITICAL_VALUE_BINDING: 'VNCriticalValueBinding',
  DATA_BINDING: 'VNDataBinding',
  DISPLAY_PATTERN_TITLE_BINDING: 'VNDisplayPatternTitleBinding',
  DISPLAY_PATTERN_VALUE_BINDING: 'VNDisplayPatternValueBinding',
  DOCUMENT_EDITED_BINDING: 'VNDocumentEditedBinding',
  DOUBLE_CLICK_ARGUMENT_BINDING: 'VNDoubleClickArgumentBinding',
  DOUBLE_CLICK_TARGET_BINDING: 'VNDoubleClickTargetBinding',
  EDITABLE_BINDING: 'VNEditableBinding',
  ENABLED_BINDING: 'VNEnabledBinding',
  EXCLUDED_KEYS_BINDING: 'VNExcludedKeysBinding',
  FILTER_PREDICATE_BINDING: 'VNFilterPredicateBinding',
  FONT_BINDING: 'VNFontBinding',
  FONT_BOLD_BINDING: 'VNFontBoldBinding',
  FONT_FAMILY_NAME_BINDING: 'VNFontFamilyNameBinding',
  FONT_ITALIC_BINDING: 'VNFontItalicBinding',
  FONT_NAME_BINDING: 'VNFontNameBinding',
  FONT_SIZE_BINDING: 'VNFontSizeBinding',
  HEADER_TITLE_BINDING: 'VNHeaderTitleBinding',
  HIDDEN_BINDING: 'VNHiddenBinding',
  IMAGE_BINDING: 'VNImageBinding',
  INCLUDED_KEYS_BINDING: 'VNIncludedKeysBinding',
  INITIAL_KEY_BINDING: 'VNInitialKeyBinding',
  INTIAL_VALUE_BINDING: 'VNInitialValueBinding',
  IS_INDETERMINATE_BINDING: 'VNIsIndeterminateBinding',
  LABEL_BINDING: 'VNLabelBinding',
  LOCALIZED_KEY_DICTIONARY_BINDING: 'VNLocalizedKeyDictionaryBinding',
  MANAGED_OBJECT_CONTEXT_BINDING: 'VNManagedObjectContextBinding',
  MAXIMUM_RECENTS_BINDING: 'VNMaximumRecentsBinding',
  MAX_VALUE_BINDING: 'VNMaxValueBinding',
  MAX_WIDTH_BINDING: 'VNMaxWidthBinding',
  MIN_VALUE_BINDING: 'VNMinValueBinding',
  MIN_WIDTH_BINDING: 'VNMinWidthBinding',
  MIXED_STATE_IMAGE_BINDING: 'VNMixedStateImageBinding',
  OFF_STATE_IMAGE_BINDING: 'VNOffStateImageBinding',
  ON_STATE_IMAGE_BINDING: 'VNOnStateImageBinding',
  PREDICATE_BINDING: 'VNPredicateBinding',
  RECENT_SEARCHES_BINDING: 'VNRecentSearchesBinding',
  REPRESENTED_FILENAME_BINDING: 'VNRepresentedFilenameBinding',
  ROW_HEIGHT_BINDING: 'VNRowHeightBinding',
  SELECTED_IDENTIFIER_BINDING: 'VNSelectedIdentifierBinding',
  SELECTED_INDEX_BINDING: 'VNSelectedIndexBinding',
  SELECTED_LABEL_BINDING: 'VNSelectedLabelBinding',
  SELECTED_OBJECT_BINDING: 'VNSelectedObjectBinding',
  SELECTED_OBJECTS_BINDING: 'VNSelectedObjectsBinding',
  SELECTED_TAG_BINDING: 'VNSelectedTagBinding',
  SELECTED_VALUE_BINDING: 'VNSelectedValueBinding',
  SELECTED_VALUES_BINDING: 'VNSelectedValuesBinding',
  SELECTION_INDEXES_BINDING: 'VNSelectionIndexesBinding',
  SELECTION_INDEX_PATHS_BINDING: 'VNSelectionIndexPathsBinding',
  SORT_DESCRIPTORS_BINDING: 'VNSortDescriptorsBinding',
  TAGRTE_BINDING: 'VNTargetBinding',
  TEXT_COLOR_BINDING: 'VNTextColorBinding',
  TITLE_BINDING: 'VNTitleBinding',
  TOOP_TIP_BINDING: 'VNToolTipBinding',
  TRANSPARENT_BINDING: 'VNTransparentBinding',
  VALUE_BINDING: 'VNValueBinding',
  VALUE_PATH_BINDING: 'VNValuePathBinding',
  VALUE_URL_BINDING: 'VNValueURLBinding',
  VISIBLE_BINDING: 'VNVisibleBinding',
  WARNING_VALUE_BINDING: 'VNWarningValueBinding',
  WIDTH_BINDING: 'VNWidthBinding',


  /**
    Options for bindings (used with info keys at top).
  */
  ALLOWS_EDITING_MULTIPLE_VALUES_SELECTION_BINDING_OPTION: 'VNAllowsEditingMultipleValuesSelectionBindingOption',
  ALLOWS_NULL_ARGUMENT_BINDING_OPTION: 'VNAllowsNullArgumentBindingOption',
  ALWAYS_PRESENTS_APPLICATION_MODAL_ALERTS_BINDING_OPTION: 'VNAlwaysPresentsApplicationModalAlertsBindingOption',
  CONDITIONALLY_SETS_EDITABLE_BINDING_OPTION: 'VNConditionallySetsEditableBindingOption',
  CONDITIONALLY_SETS_ENABLED_BINDING_OPTION: 'VNConditionallySetsEnabledBindingOption',
  CONDITIONALLY_SETS_HIDDEN_BINDING_OPTION: 'VNConditionallySetsHiddenBindingOption',
  CONTINUOUSLY_UPDATES_VALUE_BINDING_OPTION: 'VNContinuouslyUpdatesValueBindingOption',
  CREATES_SORT_DESCRIPTOR_BINDING_OPTION: 'VNCreatesSortDescriptorBindingOption',
  DELETES_OBJECTS_ON_REMOVE_BINDING_OPTION: 'VNDeletesObjectsOnRemoveBindingsOption',
  DISPLAY_NAME_BINDING_OTPTION: 'VNDisplayNameBindingOption',
  DISPLAY_PATTERN_BINDING_OPTION: 'VNDisplayPatternBindingOption',
  CONTENT_PLACEMENT_TAG_BINDING_OPTION: 'VNContentPlacementTagBindingOption',
  HANDLES_CONTENT_AS_COMPOUND_VALUE_BINDING_OPTION: 'VNHandlesContentAsCompoundValueBindingOption',
  INSERTS_NULL_PLACEHOLDER_BINDING_OPTION: 'VNInsertsNullPlaceholderBindingOption',
  INVOKES_SEPERATELY_WITH_ARRAY_OBJECTS_BINDING_OPTION: 'VNInvokesSeparatelyWithArrayObjectsBindingOption',
  MULTIPLE_VALUES_PLACEHOLDER_BINDING_OTPION: 'VNMultipleValuesPlaceholderBindingOption',
  NO_SELECTION_PLACEHOLDER_BINDING_OPTION: 'VNNoSelectionPlaceholderBindingOption',
  NOT_APPLICABLE_PLACEHOLDER_BINDING_OPTION: 'VNNotApplicablePlaceholderBindingOption',
  NULL_PLACEHOLDER_BINDING_OPTION: 'VNNullPlaceholderBindingOption',
  RAISES_FOR_NOT_APPLICABLE_KEYS_BINDING_OPTION: 'VNRaisesForNotApplicableKeysBindingOption',
  PREDICATE_FORMAT_BINDING_OPTION: 'VNPredicateFormatBindingOption',
  SELECTOR_NAME_BINDING_OPTION: 'VNSelectorNameBindingOption',
  SELECTS_ALL_WHEN_SETTING_CONTENT_BINDING_OPTION: 'VNSelectsAllWhenSettingContentBindingOption',
  VALIDATES_IMMEDIATELY_BINDING_OPTION: 'VNValidatesImmediatelyBindingOption',
  VALUE_TRANSFORMER_NAME_BINDING_OPTION: 'VNValueTransformerNameBindingOption',
  VALUE_TRANSFORMER_BINDING_OPTION: 'VNValueTransformerBindingOption'
});
