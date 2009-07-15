/* 
 * color.js
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

var kCGColorWhite = "kCGColorWhite";
var kCGColorBlack = "kCGColorBlack";
var kCGColorClear = "kCGColorClear";

function CGColorRef()
{
    this._red = 0;
    this._blue = 0;
    this._green = 0;
    this._alpha = 0;
}

function CGColorCreate(space, components)
{
    return { _red: components[0], _green: components[1], _blue: components[2], _alpha: components[3] };
}

function CGColorCreateGenericGray(gray, alpha)
{
    return { _red: gray, _blue: gray, _green: gray, _alpha: alpha };
}

function CGColorCreateGenericRGB(red, green, blue, alpha)
{
    return { _red: red, _blue: blue, _green: green, _alpha: alpha };
}

// CGColorRef CGColorCreateGenericCMYK(CGFloat cyan, CGFloat magenta, CGFloat yellow, CGFloat black, CGFloat alpha)
// {
// 
// }
// 
// CGColorRef CGColorGetConstantColor(CFStringRef colorName)
// {
// 
// }
// 
// //CGColorRef CGColorCreateWithPattern(CGColorSpaceRef space, CGPatternRef pattern, CGFloat components[]);
// 
// CGColorRef CGColorCreateCopy(CGColorRef color)
// {
// 
// }
// 
// CGColorRef CGColorCreateCopyWithAlpha(CGColorRef color, CGFloat alpha)
// {
// 
// }
// 
// CGColorRef CGColorRetain(CGColorRef color)
// {
// 
// }
// 
// void CGColorRelease(CGColorRef color)
// {
// 
// }
// 
// bool CGColorEqualToColor(CGColorRef color1, CGColorRef color2)
// {
// 
// }
// 
// int CGColorGetNumberOfComponents(CGColorRef color)
// {
// 
// }
// 
// const CGFloat *CGColorGetComponents(CGColorRef color)
// {
// 
// }
// 
// CGFloat CGColorGetAlpha(CGColorRef color)
// {
// 
// }
// 
// CGColorSpaceRef CGColorGetColorSpace(CGColorRef color)
// {
// 
// }
