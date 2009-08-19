// 
//  NSTableColumn.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>
#import <Foundation/NSGeometry.h>
#import <AppKit/NSTableHeaderCell.h>

@class NSTableView;
@class NSCell;
@class NSImage;
@class NSSortDescriptor;

enum {
  NSTableColumnNoResizing     = 0,
  NSTableColumnAutoresizingMask   = ( 1 << 0 ),
  NSTableColumnUserResizingMask   = ( 1 << 1 )
};

@interface NSTableColumn : NSObject <NSCoding>
{
  NSString    *_identifier;
  NSTableView   *_tableView;
  
  NSUInteger     _width;
  NSUInteger     _minWidth;
  NSUInteger     _maxWidth;
  
  NSCell      *_headerCell;
  NSCell      *_dataCell;
  BOOL       _editable;
  BOOL       _hidden;
}

- (id)initWithIdentifier:(id)identifier;

- (void)setIdentifier:(id)identifier;
- (id)identifier;
- (void)setTableView:(NSTableView *)tableView;
- (NSTableView *)tableView;
- (void)setWidth:(CGFloat)width;
- (CGFloat)width;
- (void)setMinWidth:(CGFloat)minWidth;
- (CGFloat)minWidth;
- (void)setMaxWidth:(CGFloat)maxWidth;
- (CGFloat)maxWidth;

- (void)setHeaderCell:(NSCell *)cell;
- (id)headerCell;

- (void)setDataCell:(NSCell *)cell;
- (id)dataCell;
- (id)dataCellForRow:(NSInteger)row;
  
- (void)setEditable:(BOOL)flag;
- (BOOL)isEditable;
- (void)sizeToFit;


- (void)setSortDescriptorPrototype:(NSSortDescriptor *)sortDescriptor;
- (NSSortDescriptor *)sortDescriptorPrototype;

- (void)setResizingMask:(NSUInteger)resizingMask;
- (NSUInteger)resizingMask;


- (void)setHeaderToolTip:(NSString *)string;
- (NSString *)headerToolTip;

- (BOOL)isHidden;
- (void)setHidden:(BOOL)hidden;

@end
