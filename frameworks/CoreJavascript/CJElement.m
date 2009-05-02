// 
//  CJElement.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

typedef struct CBElementRef;

void CBElementSetFrame (CBElementRef *element, NSRect frameRect)
{
    
}

void CBElementSetHidden (CBElementRef *element, BOOL hidden)
{
    
}

void CBElementSetOpacity (CBElementRef *element, float opacity)
{
    
}

CBElementRef *CBElementCreateRef (char *elementType)
{
    
}

void CBElementAppendChild (CBElementRef *element, CBElementRef *child)
{
    element.appendChild (child);
}

void CBElementRemoveChild (CBElementRef *element, CBElementRef *child)
{
    element.removeChild (child);
}