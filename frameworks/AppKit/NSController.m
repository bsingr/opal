// 
//  NSController.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 


#import "NSController.h"

@implementation NSController

- (void)objectDidBeginEditing:(id)editor
{
}

- (void)objectDidEndEditing:(id)editor
{
}

- (BOOL)commitEditing
{
	return NO;
}

- (void)commitEditingWithDelegate:(id)delegate didCommitSelector:(SEL)didCommitSelector contentInfo:(void *)contextInfo
{
	// Not implmented at this point
}

- (void)discardEditing
{
}

- (BOOL)isEditing
{
	return NO;
}

@end
