/* 
 * gem.js
 * opal
 * 
 * Created by Adam Beynon.
 * Copyright 2010 Adam Beynon.
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



/**
  Gem support: only for gems/bundles in the vngem format. Also provides some gem 
  methods and classes that are useful. The majority is not implemented however
  for usage patterns/reasons.
  
  name - gem name, e.g. 'vienna'
  path - bundles will be '/vendor' or similar, app will be '/' or ''
  content - string content of the vngem file. This will possibly be removed once
            the content has been parsed and the necessary files have been created.
  loaded - has this gem/bundle been required()? The content is not parsed or
            processed until it is required... which usually happens straight away.
            This property is useful to avoid loading a bundle twice.
*/
function vn_gem() {
  this.name = "";
  this.path = "";
  this.content = "";
  this.loaded = false;
};

function opal_gem_load_at_path(path, callback) {
  var r = new XMLHttpRequest();
  r.open("GET", path, false);
  r.onreadystatechange = function() {
    if(r.readyState == 4) {
      if (r.responseText == "" || r.status != 200) {
        console.log(path + " failed.");
      }
      else {
        var g = vn_gem_boot(path, r.responseText);
        callback(g);
      }
    }
  }
  r.send(null);
};

// all gems/apps/bundles, name => gem object
var vn_gem_all = { };

/**
  preload the gem at the given path so it will be ready. callbacks used for
  chaining gem loading
*/
function vn_gem_preload(path, name) {
  // preload.
}

/**
  boot a gem with the given name, path and content (i.e. process it)
*/
function vn_gem_boot(path, content) {
  var g = new vn_gem();
  // g.name = name;
  g.path = path;
  g.content = content;
  vn_gem_all[path] = g;
  vm_gem_load(g);
  return g;
}

/**
  Do actual gem processing
*/
function vm_gem_load(gem) {
  if (gem.loaded) throw "Cannot load gem twice... something silly happened"
  
  var at = 0;
  var ch = '';
  var text = gem.content;
  
  // directory of gem
  function parse_directory() {
    var f = get_next(marker_count());
    console.log("directory is " + f);
  }
  
  // parse a file
  function parse_file() {
    var f = get_next(marker_count());
    var c = get_next(marker_count());
    vn_fs_define_file(f, c);
  }
  
  // parse gem definiton
  function parse_gem_def() {
    var g = get_next(marker_count());
    var p = get_next(marker_count());
    console.log('found ' + g + ' at ' + p);
  }
  
  // parse_locales
  // parse a list of locales that this application has defined
  function parse_locales() {
    
  }
  
  // parse a css file..
  // for IE we might need to use:
  // var content = get_next(marker_count());
  // var style = document.createElement("style");
  // style.setAttribute("type", "text/css");
  // if (style.styleSheet) {
  //  // this for internet explorer.. 
  //  style.styleSheet.cssText = content;
  // }
  // else {
  //  style.appendChild(document.createTextNode(content));
  // }
  function parse_css() {
    var content = get_next(marker_count());
    var style = document.createElement('style');
    style.setAttribute("type", "text/css");
    if (style.styleSheet) {
      // ie.
      style.styleSheet.cssText = content;
    }
    else {
      // w3c
      style.appendChild(document.createTextNode(content));
    }
    
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  
  // get gem format
  var gem_format = (function() {
    var marker = text.indexOf(';', at);
    var format = text.substr(at, marker - at);
    at = marker + 1;
    return format;
  })();
  
  // get gem version
  var gem_version = (function() {
    var marker = text.indexOf(';', at);
    var version = text.substr(at, marker - at);
    at = marker + 1;
    return version;
  })();
  
  var next = function(c) {
    if (c && c !== ch) {
      console.log('bundle parse error: Expected ' + c + ', but instead got ' + ch);
    }
    ch = text.charAt(at);
    at += 1;
    return ch;
  };
  
  var get_next = function(i) {
    var result = text.substr(at, i);
    at += i;
    return result;
  };
  
  var marker_count = function() {
    var len = '';
    next();
    while (ch >= '0' && ch <= '9') {
      len += ch;
      next(); // this will also pass us through the $ at the end of length
    }
    return parseInt(len);
  };
  
  while (next()) {
    switch (ch) {
      case 'd':
        parse_directory();
        break;
      case 'f':
        parse_file();
        break;
      case 'g':
        parse_gem_def();
        break;
      case 'l':
        parse_locales();
        break;
      case 's':
        parse_string_table();
        break;
      case 'p':
        parse_platform_list();
        break;
      case 'c':
        parse_css();
        break;
      default:
        throw "unknown bundle part " + ch
    }
  }
  
  // make sure we dont do this again
  gem.loaded = true;
  return gem;
}


// /**
//   New javascript based "gem" loading
// */
// 
// /**
//   Declare this file contains the gem named 'name' which is located at the path
//   'path'
// */
// function opal_gem(name, path) {
//   
// };
// 
// /**
//   A source file - ruby, yaml etc. NOT Javascript. JS files are handled 
//   seperately so they are eval()'d instantly.
// */
// function opal_file(path, content) {
//   vn_fs_define_file(path, content);
// };
// 
// /**
//   Code - i.e. javascript. Eval these instantly. We retain the path so if an 
//   error occurs, then we can point back to the source file it originates from.
// */
// function opal_code(path, code) {
//   if (window.execScript) {
//     window.execScript(code);
//   } else {
//     with (window) { eval(code); }
//   }
// };
// 
// /**
//   CSS styles - shouldnt be a lot of these, but, if they exist, pop into head of
//   document.
// */
// function opal_style(content) {
//   
// };
