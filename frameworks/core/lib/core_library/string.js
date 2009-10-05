// 
//  string.js
//  vienna
//  
//  Created by Adam Beynon on 2009-10-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

Object.extend(String, Object.VNCoreMethods);

String.extend({
  
  capitalize: function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
  },
  
  w: function() {
    return this.split(' ');
  },
  
  toArray: function() {
    return this.split('');
  },
  
  format: function() {
    
  }
});
