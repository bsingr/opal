// 
//  NSTableColumn.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSTableColumn.h"


@implementation NSTableColumn

- (id)initWithIdentifier:(id)identifier
{
  [self init];
  
  if (self) {
    [self setIdentifier:identifier];
    _headerCell = [[NSTableHeaderCell alloc] init];
    _dataCell = [[NSTextFieldCell alloc] init];
    [_dataCell setEditable:YES];
    [_dataCell setSelectable:YES];
  }
  
  return self;
}

- (id)initWithCoder:(NSCoder *)aCoder
{
  [super initWithCoder:aCoder];
  _identifier = [aCoder decodeObjectForKey:@"NSIdentifier"];
  _headerCell = [aCoder decodeObjectForKey:@"NSHeaderCell"];
  _dataCell = [aCoder decodeObjectForKey:@"NSDataCell"];
  _width = [aCoder decodeDoubleForKey:@"NSWidth"];
  _minWidth = [aCoder decodeDoubleForKey:@"NSMinWidth"];
  _maxWidth = [aCoder decodeDoubleForKey:@"NSMaxWidth"];
  
  return self;
}


- (void)setTableView:(NSTableView *)aTableView
{
  _tableView = aTableView;
}

- (NSTableView *)tableView
{
  return _tableView;
}

- (void)setWidth:(NSUInteger)newWidth
{
  // from nib, it might be a string
  _width = newWidth;  
}

- (NSUInteger)width
{
  return _width;
}

- (void)setHeaderCell:(NSCell *)aCell
{
  _headerCell = aCell;
}

- (id)headerCell
{
  return _headerCell;
}

- (void)setDataCell:(NSCell *)aCell
{
  _dataCell = aCell;
}

- (id)dataCell
{
  return _dataCell;
}

- (id)dataCellForRow:(NSInteger)row
{
  return _dataCell;
}

- (void)setIdentifier:(id)anObject
{
  _identifier = anObject;
}

- (id)identifier
{
  return _identifier;
}

- (void)setEditable:(BOOL)flag
{
  if (flag == 0)
    flag = NO;
  
  _editable = flag;
}

- (BOOL)isEditable
{
  return _editable;
}

- (BOOL)isHidden
{
  return _hidden;
}

- (void)setHidden:(BOOL)hidden
{
  _hidden = hidden;
}

@end

