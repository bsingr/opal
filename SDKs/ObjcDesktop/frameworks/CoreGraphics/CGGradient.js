// 
//  CGGradient.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-06.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function CGGradientRef()
{
  this._colors = [];
  this._locations = [];
  return this;
}

// extern CGGradientRef CGGradientCreateWithColorComponents(CGColorSpaceRef space, CGFloat components[], CGFloat locations[], int count);
// 
function CGGradientCreateWithColorComponenets(space, componenets, locations, count)
{
  
}

// extern CGGradientRef CGGradientCreateWithColors(CGColorSpaceRef space, CGArrayRef colors, CGFloat locations[]);
// 
function CGGradientCreateWithColors(space, colors, locations)
{
  var theGradient = new CGGradientRef();
  theGradient._colors = colors;
  theGradient._locations = locations;
  return theGradient;
}
