// 
//  CGDOMRenderingContext.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-11.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function CGDOMRenderingContext()
{
    this.canvas = null;
    
    // compositing
    this.globalAlpha = 1.0;
    this.globalCompositeOperation = "source-over";
    
    // colors and styles
    this.strokeStyle = "black";
    this.fillStyle = "black";
    
    // text
    this.font = "10px Arial";
    this.textAlign = "start";
    this.textBaseline = "alphabetic";
    
    // line caps/joins
    this.lineWidth = 1;
    this.lineCap = "butt";
    this.lineJoin = "miter";
    this.miterLimit = 10;

    // shadows
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;
    this.shadowBlur = 0;
    this.shadowColor = "black";
    return this;
}

CGDOMRenderingContext.prototype.save = function()
{
    
};

CGDOMRenderingContext.prototype.restore = function()
{
    
};

CGDOMRenderingContext.prototype.scale = function(x, y)
{
    
};

CGDOMRenderingContext.prototype.rotate = function(angle)
{
    
};

CGDOMRenderingContext.prototype.translate = function(x, y)
{
    
};

CGDOMRenderingContext.prototype.transform = function(m11, m12, m21, m22, dx, dy)
{
    
};
        

            
CGDOMRenderingContext.prototype.setTransform = function(m11, m21, m12, m22, dx, dy)
{
                
};
            
CGDOMRenderingContext.prototype.createLinearGradient = function(x0, y0, x1, y1)
{
                
};
            
CGDOMRenderingContext.prototype.createRadialGradient =  function(x0, y0, r0, x1, y1, r1)
{
                
};
            
CGDOMRenderingContext.prototype.createPattern = function(image, repetition)
{
                
};

CGDOMRenderingContext.prototype.clearRect = function(x, y, w, h)
{
    if (this.canvas.hasChildNodes())
    {
        while (this.canvas.childNodes.length >= 1)
        {
            this.canvas.removeChild(this.canvas.firstChild);       
        } 
    }
};
            
CGDOMRenderingContext.prototype.fillRect = function(x, y, w, h)
{
    var theDiv = document.createElement("div");
    theDiv.style.height = h + 'px';
    theDiv.style.width = w + 'px';
    theDiv.style.background = "yellow";// = this.fillStyle;
    this.canvas.appendChild(theDiv);
};
            
CGDOMRenderingContext.prototype.strokeRect = function(x, y, w, h)
{
                
};

CGDOMRenderingContext.prototype.beginPath = function()
{
                
};
            
CGDOMRenderingContext.prototype.closePath = function()
{
                
};
            
CGDOMRenderingContext.prototype.moveTo = function(x, y)
{
                
};
            
CGDOMRenderingContext.prototype.lineTo = function(x, y)
{
                
};
            
CGDOMRenderingContext.prototype.quadraticCurveTo = function(cpx, cpy, x, y)
{
                
};
            
CGDOMRenderingContext.prototype.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y)
{
                
};
            
CGDOMRenderingContext.prototype.arcTo = function(x1, y1, x2, y2, radius)
{
                
};
            
CGDOMRenderingContext.prototype.rect = function(x, y, w, h)
{
                
};
            
CGDOMRenderingContext.prototype.arc = function(x, y, radius, startAngle, endAngle, anticlockwise)
{

};
            
CGDOMRenderingContext.prototype.fill = function()
{
                
};
            
CGDOMRenderingContext.prototype.stroke = function()
{
                
};
            
CGDOMRenderingContext.prototype.clip = function()
{
                
};
            
CGDOMRenderingContext.prototype.isPointInPath = function(x, y)
{
                
};
            
CGDOMRenderingContext.prototype.fillText = function(text, x, y, maxWidth)
{
    this.strokeText(text, x, y, maxWidth);
};
            
CGDOMRenderingContext.prototype.strokeText = function(text, x, y, maxWidth)
{
    var theSpan = document.createElement("span");
    theSpan.innerHTML = text;
    theSpan.style.font = this.font;
    this.canvas.appendChild(theSpan);
};
            
CGDOMRenderingContext.prototype.measureText = function(text)
{

};

CGDOMRenderingContext.prototype.drawImage = function(image, dx, dy,  dw, dh)
{

};

CGDOMRenderingContext.prototype.drawImage = function(image, sx, sy, sw, sh, dx, dy, dw, dh)
{

};

CGDOMRenderingContext.prototype.createImageData = function(sw, sh)
{

};
CGDOMRenderingContext.prototype.createImageData = function(imagedata)
{

};
CGDOMRenderingContext.prototype.getImageData = function(sx, sy, sw, sh)
{

};

CGDOMRenderingContext.prototype.putImageData = function(imagedata, dx, dy,  dirtyX, dirtyY, dirtyWidth, dirtyHeight)
{
    
};
