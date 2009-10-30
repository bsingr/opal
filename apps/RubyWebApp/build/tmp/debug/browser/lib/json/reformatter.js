
function JSONParserReformatter(object)
{var hash=new RHash();for(var prop in object){var val=object[prop];if(val==null){val=nil;}
else if(val.$klass==cArray){val=JSONParserReformatterArray(val);}
else if(val.constructor==Object){val=JSONParserReformatter(val);}
VN$(hash,'store',prop,val);}
return hash;}
function JSONParserReformatterArray(array){for(var i=0;i<array.length;i++){if(array[i]==null){array[i]=nil;}
else if(array[i].$klass==cArray){array[i]=JSONParserReformatterArray(array[i]);}
else if(array[i].constructor==Object){array[i]=JSONParserReformatter(array[i]);}}
return array;}