/* 
 * CGColor.c
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

#include "CGColor.h"

CGColorRef CGColorCreate(CGColorSpaceRef space, CGFloat components[])
{
  
}

CGColorRef CGColorCreateGenericGray(CGFloat gray, CGFloat alpha)
{
  
}

CGColorRef CGColorCreateGenericRGB(CGFloat red, CGFloat green, CGFloat blue, CGFloat alpha)
{
  
}

CGColorRef CGColorCreateGenericCMYK(CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha)
{
  
}

CGColorRef CGColorGetConstantColor(CFStringRef colorName)
{
  
}

 //CGColorRef CGColorCreateWithPattern(CGColorSpaceRef space, CGPatternRef pattern, CGFloat components[]);

CGColorRef CGColorCreateCopy(CGColorRef color)
{
  
}

CGColorRef CGColorCreateCopyWithAlpha(CGColorRef color, CGFloat alpha)
{
  
}

CGColorRef CGColorRetain(CGColorRef color)
{
  
}

void CGColorRelease(CGColorRef color)
{
  
}

bool CGColorEqualToColor(CGColorRef color1, CGColorRef color2)
{
  
}

int CGColorGetNumberOfComponents(CGColorRef color)
{
  
}

const CGFloat *CGColorGetComponents(CGColorRef color)
{
  
}

CGFloat CGColorGetAlpha(CGColorRef color)
{
  
}

CGColorSpaceRef CGColorGetColorSpace(CGColorRef color)
{
  
}

 //CGPatternRef CGColorGetPattern(CGColorRef color);

CFTypeID CGColorGetTypeID(void)
{
  
}

CFStringRef kCGColorWhite = "kCGColorWhite";
CFStringRef kCGColorBlack = "kCGColorBlack";
CFStringRef kCGColorClear = "kCGColorClear";
