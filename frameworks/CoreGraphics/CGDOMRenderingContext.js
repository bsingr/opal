// 
//  CGDOMRenderingContext.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-11.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

if (navigator.appName == 'Microsoft Internet Explorer') {
    Element.prototype.getContext = function(name) {
        var theContext = {
            // reference to rendering canvas
            canvas: "",
            
            // state
            save: function() {
                
            },
            
            restore: function() {
                
            },
            
            // transformation
            scale: function(x, y) {
                
            },
            
            rotate: function(angle) {
                
            },
            
            translate: function(x, y) {
                
            },
            
            trasform: function(m11, m12, m21, m22, dx, dy) {
                
            },
            
            setTransform: function(m11, m21, m12, m22, dx, dy) {
                
            },
            
            // compositing
            globalAlpha: 1.0,
            
            globalCompositeOperation: "source-over",
            
            // colors and styles
            strokeStyle: "black",
            
            fillStyle: "black",
            
            createLinearGradient: function(x0, y0, x1, y1) {
                
            },
            
            createRadialGradient: function(x0, y0, r0, x1, y1, r1) {
                
            },
            
            createPattern: function(image, repetition) {
                
            },

            // line caps/joins
            lineWidth: 1,
            
            lineCap: "butt",
            
            lineJoin: "miter",
            
            miterLimit: 10,

            // shadows
            shadowOffsetX: 0,
            
            shadowOffsetY: 0,
            
            shadowBlur: 0,
            
            shadowColor: "black",

            // rects
            clearRect: function(x, y, w, h) {
                
            },
            
            fillRect: function(x, y, w, h) {
                var theDiv = document.createElement("div");
                theDiv.style.background = "black";// = this.fillStyle;
                this.canvas.appendChild(theDiv);
            },
            
            strokeRect: function(x, y, w, h) {
                
            },

            // path API
            beginPath: function() {
                
            },
            
            closePath: function() {
                
            },
            
            moveTo: function(x, y) {
                
            },
            
            lineTo: function(x, y) {
                
            },
            
            quadraticCurveTo: function(cpx, cpy, x, y) {
                
            },
            
            bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y) {
                
            },
            
            arcTo: function(x1, y1, x2, y2, radius) {
                
            },
            
            rect: function(x, y, w, h) {
                
            },
            
            arc: function(x, y, radius, startAngle, endAngle, anticlockwise) {
                
            },
            
            fill: function() {
                
            },
            
            stroke: function() {
                
            },
            
            clip: function() {
                
            },
            
            isPointInPath: function(x, y) {
                
            },

            // text
            font: "10px Arial",
            
            textAlign: "start",
            
            textBaseline: "alphabetic",
            
            fillText: function(text, x, y, maxWidth) {
                this.strokeText(text, x, y, maxWidth);
            },
            
            strokeText: function(text, x, y, maxWidth) {
                var theSpan = document.createElement("span");
                theSpan.innerHTML = text;
                theSpan.style.font = this.font;
                this.canvas.appendChild(theSpan);
            },
            
            measureText: function(text) {
                
            },
            
            // drawing images
            drawImage: function(image, dx, dy,  dw, dh) {
                
            },
            
            drawImage: function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
                
            },

            // pixel manipulation
            createImageData: function(sw, sh) {
                
            },

            createImageData: function(imagedata) {
                
            },

            getImageData: function(sx, sy, sw, sh) {
                
            },

            putImageData: function(imagedata, dx, dy,  dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
                
            }
        };
        theContext.canvas = this;
        return theContext;
    };
}