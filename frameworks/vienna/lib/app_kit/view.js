// 
//  view.js
//  vienna
//  
//  Created by Adam Beynon on 2009-09-29.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 


var View = new Class('View', Vienna.Responder, {
  
  setWidth: function() {
    this.$width = new VN.Point(100, 100);
    this.$height += 100000;
  }
})