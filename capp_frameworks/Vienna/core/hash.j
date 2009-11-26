var Hash = CPDictionary;

function rb_hash_new() {
    var d = new objj_dictionary();
    var k, v;
    for (var i = 0; i < arguments.length; i++) {
        k = arguments[i];
        v = arguments[i+1];
        i++;
        dictionary_setValue(d, k, v);
    }
    return d;
}