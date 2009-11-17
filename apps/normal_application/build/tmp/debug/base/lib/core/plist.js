
function vn_binary_plist_parse(parse_text){var hash=function(c){var result=rb_hash_new();var hash_len=marker_count();for(var i=0;i<hash_len;i++){var key=value();var val=value();rb_funcall(result,'store',key,val);}
return result;};var array=function(c){var result=[];var arr_len=marker_count();for(var i=0;i<arr_len;i++){result.push(value());}
return result;};var int_number=function(c){var int_len=marker_count();return parseInt(get_next(int_len));};var float_number=function(c){var float_len=marker_count();return parseFloat(get_next(float_len));};var string=function(c){var str_len=marker_count();var string=get_next(str_len);return string;};var true_boolean=function(c){next();return true;};var false_boolean=function(c){next();return false;};var nil_object=function(c){next();return null;};var value=function(){next();switch(ch){case'h':return hash();case'a':return array();case'i':return int_number();case'd':return float_number();case's':return string();case't':return true_boolean();case'f':return false_boolean();case'~':return nil_object();}};var next=function(c){if(c&&c!==ch){console.log("plist error! Expected "+c+" instead of "+ch)}
ch=text.charAt(at);at+=1;return ch;};var get_next=function(i){var result=text.substr(at,i);at+=i;return result;};var marker_count=function(){var len='';next();while(ch>='0'&&ch<='9'){len+=ch;next();}
return parseInt(len);};var plist_format=function(){var marker=text.indexOf('$',at);var format=text.substr(at,marker-at);at=marker+1;return format;};var plist_version=function(){var marker=text.indexOf('$',at);var version=text.substr(at,marker-at);at=marker+1;return version;};var at=0;var ch='';var text=parse_text;var format=plist_format();var version=plist_version();var result=value();return result;};