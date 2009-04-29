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