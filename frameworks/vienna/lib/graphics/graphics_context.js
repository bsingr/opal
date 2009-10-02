/* 
 * graphics_context.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
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

Vienna.extend({
  
  // Line join
  LINE_JOIN_MITER: 'miter',
  LINE_JOIN_ROUND: 'round',
  LINE_JOIN_BEVEL: 'bevel',
  
  // Line cap
  LINE_CAP_BUTT: 'butt',
  LINE_CAP_ROUND: 'round',
  LINE_CAP_SQUARE: 'square',

  // Path Drawing mode
  PATH_FILL: 0,
  PATH_EOFILL: 1,
  PATH_STROKE: 2,
  PATH_FILL_STROKE: 3,
  EOFILL_STROKE: 4,

  // Text drawing mode
  TEXT_FILL: 0,
  TEXT_STROKE: 1,
  FILL_STROKE: 2,
  TEXT_INVISIBLE: 3,
  TEXT_FILL_CLIP: 4
  
  GraphicsContext: new Class('GraphicsContext', {
    
    initialize: function(graphicsPort, flipState) {
      this.$c = graphicsPort ;
      this.$isFlipped = flipState ;
    },
    
    graphicsPort: function() {
      return this.$c ;
    },
    
    isFlipped: function() {
      return this.$isFlipped;
    },
    
    $currentContext: function() {
      return this.$currentContext;
    },
    
    $setCurrentContext: function(ctx) {
      this.$currentContext = ctx ;
    },
    
    saveGraphicsState: function() {
      
    },
    
    restoreGraphicsState: function() {
      
    },
    
    scaleCTM: function(sx, sy) {
      
    },
    
    translateCTM: function(tx, ty) {
      
    },
    
    rotateCTM: function(angle) {
      
    },
    
    concatCTM: function(transform) {
      
    },
    
    getCTM: function() {
      
    },
    
    setLineWidth: function(width) {
      this.$c.lineWidth = width;
    },
    
    setLineCap: function(cap) {
      this.$c.lineCap = cap;
    },
    
    setLineJoin: function(join) {
      this.$c.lineJoin = join;
    },
    
    setMiterLimit: function(limit) {
      this.$c.miterLimit = limit;
    },

    setAlpha: function(alpha) {
      this.$c.globalAlpha = alpha;
    },
    
    beginPath: function() {
      this.$c.beginPath();
    },
    
    moveToPoint: function(point) {
      this.$c.moveTo(point.x, point.y);
    },
    
    addLineToPoint: function(point) {
      this.$c.lineTo(point.x, point.y);
    },
    
    addCurveToPoint: function(cp1, cp2, point) {
      this.$c.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, point.x, point.y);
    },
    
    addQuadCurveToPoint: function(cp, point) {
      this.$c.quadraticCurveTo(cp.x, cp.y, point.x, point.y);
    },
    
    closePath: function() {
      this.$c.closePath();
    },
    
    addRect: function(rect) {
      this.$c.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
    },
    
    addRects: function(rects) {
      for (var i = 0; i < rects.length; i++) {
        this.addRect(rects[i]);
      }
    },
    
    addLines: function(points) {
      for (var i = 0; i < points.length; i++) {
        this.addLineToPoint(points[i]);
      }
    },
    
    addEllipseInRect: function(rect) {
      
    },
    
    addArc: function(point, radius, startAngle, endAngle, clockwise) {
      this.$c.arc(point.x, point.y, radius, startAngle, endAngle, clockwise);
    },
    
    addArcToPoint: function(point1, point2, radius) {
      this.$c.arcTo(point1.x, point1.y, point2.x, point2.y, radius);
    },
    
    addPath: function(path) {
      // add bezier curve..
    },
    
    fillPath: function() {
      this.$c.fill();
    },
    
    strokePath: function() {
      this.$c.stroke();
    },
    
    fillRect: function(rect) {
      this.$c.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
    },
    
    fillRects: function(rects) {
      for (var i = 0; i < rect.length; i++) {
        this.fillRect(rects[i]);
      }
    },
    
    strokeRect: function(rect) {
      this.$c.strokeRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
    },
    
    strokeRects: function(rects) {
      for (var i = 0; i < rect.length; i++) {
        this.strokeRect(rects[i]);
      }
    },
    
    strokeRectWithWidth: function(rect, width) {
      this.$strokeRect(rect);
    },
    
    clearRect: function(rect) {
      // this.$c.clearRect(rect);
    },
    
    drawImage: function(rect, image) {
      this.$c.drawImage(image, rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
    }  
  })
});