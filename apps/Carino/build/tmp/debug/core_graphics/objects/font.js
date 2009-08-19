/* 
 * font.js
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
 

function CGFontCreate(name, size, isBold)
{
  var theFont = { };
  theFont._name = name;
  theFont._size = size;
  theFont._isBold = isBold;
  return theFont;
}

function CGFontCreateWithFontName(name)
{
  var theFont = { };
  theFont._name = name;
  theFont._size = 12;     // default size
  theFont._isBold = NO;     // default to regular typeface
  return theFont;
}

function CGFontGetFontName(font)
{
  return font._name;
}

function CGFontGetFontSize(font)
{
  return font._size;
}

function CGFontGetIsBold(font)
{
  return font._isBold;
}

function CGFontGetStringRepresentation(font)
{
  return (font._isBold ? "bold " : "") + Math.round(font._size) + "px '" + font._name + "'"; 
}
