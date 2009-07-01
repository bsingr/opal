function CGFontCreate(name,size,isBold)
{
var theFont = {_name:0,_size:0,_isBold:0,};
theFont._name = name;
theFont._size = size;
theFont._isBold = isBold;
return theFont;
}
function CGFontCreateWithFontName(name)
{
var theFont = {_name:0,_size:0,_isBold:0,};
theFont._name = name;
theFont._size = 12;
theFont._isBold = NO;
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
