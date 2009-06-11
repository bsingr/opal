// 
//  CGFont.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-10.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function CGFontRef()
{
    this._name = "Arial";
    this._size = "10"
    this._isBold = false;
}

function CGFontCreate(name, size, isBold)
{
    var theFont = new CGFontRef();
    theFont._name = name;
    theFont._size = size;
    theFont._isBold = isBold;
    return theFont;
}

function CGFontCreateWithFontName(name)
{
    var theFont = new CGFontRef();
    theFont._name = name;
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
