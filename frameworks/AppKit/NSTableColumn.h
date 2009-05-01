#import <Foundation/NSObject.h>
#import <Foundation/NSGeometry.h>

@class NSTableView, NSCell, NSImage, NSSortDescriptor;

enum {
    NSTableColumnNoResizing         = 0,
    NSTableColumnAutoresizingMask   = ( 1 << 0 ),
    NSTableColumnUserResizingMask   = ( 1 << 1 ),
};

@interface NSTableColumn : NSObject <NSCoding>
{
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
