var CGSizeZero = { 
    width:0,
    height:0
};

var CGRectZero = {
    size: {
        width: 0,
        height: 0
    },
    origin: {
        x: 0,
        y: 0
    }
};

var CGRectNull = {
    size: {
        width: null,
        height: null
    },
    origin: {
        x: null,
        y: null
    }
};

var CGPointMake = function (_x, _y)
{
    return {
        x: _x,
        y: _y
    };
}

var CGSizeMake = function (_width, _height)
{
    return {
        width: _width,
        height: _height
    };
}

var CGRectMake = function (_x, _y, _width, _height)
{
    return {
        size: CGSizeMake (_width, _height),
        origin: CGPointMake (_x, _y)
    };
}

var CGRectGetMinX = function (rect)
{
    
}

var CGRectGetMidX = function (rect)
{
    
}

var CGRectGetMaxX = function (rect)
{
    
}

var CGRectGetMinY = function (rect)
{
    
}

var CGRectGetMidY = function (rect)
{
    
}

var CGRectGetMaxY = function (rect)
{
    
}

var CGRectGetWidth = function (rect)
{
    
}

var CGRectGetHeight = function (rect)
{
    
}

var CGPointEqualToPoint = function (point1, point2)
{
    
}

var CGSizeEqualToSize = function (size1, size2)
{
    
}

var CGRectEqualToRect = function (rect1, rect2)
{
    
}

var CGRectStandardize = function (rect)
{
    
}

var CGRectIsEmpty = function (rect)
{
    
}

var CGRectIsNull = function (rect)
{
    
}

var CGRectIsInfinite = function (rect)
{
    
}

var CGRectInset = function (rect, dx, dy)
{
    
}

var CGRectIntegral = function (rect)
{
    
}

var CGRectUnion = function (r1, r2)
{
    
}

var CGRectIntersection = function (r1, r2)
{
    
}

var CGRectOffset = function (rect, dx, dy)
{
    
}

var CGRectDivide = function (rect, slice, remainder, amount, edge)
{
    
}

var CGRectContainsPoint = function (rect, point)
{
    
}

var CGRectContainsRect = function (rect1, rect2)
{
    
}

var CGRectIntersectsRect = function (rect1, rect2)
{
    
}

var CGPointCreateDictionaryRepresentation = function (point)
{
    
}

var CGPointMakeWithDictionaryRepresentation = function (dict, point)
{
    
}

var CGSizeCreateDictionaryRepresentation = function (size)
{
    
}

var CGSizeMakeWithDictionaryRepresentation = function (dict, size)
{
    
}

var CGRectCreateDictionaryRepresentation = function (rect)
{
    
}

var CGRectMakeWithDictionaryRepresentation = function (dict, rect)
{
    
}
