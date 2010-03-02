# 
# canvas.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2009 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

def CGContextSaveGState(ctx)
  
end

def CGContextRestoreGState(ctx)
  
end

def CGContextScaleCTM(ctx, sx, sy)
  
end

def CGContextTranslateCTM(ctx, sy, sy)
  
end

def CGContextRotateCTM(ctx, angle)
  
end

def CGContextConcatCTM(ctx, transform)
  
end

def CGContextGetCTM(ctx)
  
end

def CGContextSetLineWidth(ctx, width)
  
end

def CGContextSetLineCap(ctx, cap)
  
end

def CGContextSetLineJoin(ctx, join)
  
end

def CGContextSetMiterLimit(ctx, limit)
  
end

def CGContextSetLineDash(ctx, phase)
  
end

def CGContextSetFlatness(ctx, flatness)
  
end

def CGContextSetAlpha(ctx, alpha)
  
end

def CGContextSetBlendMode(ctx, mode)
  
end

def CGContextBeginPath(ctx)
  
end

def CGContextMoveToPoint(ctx, x, y)
  
end

def CGContextAddLineToPoint(ctx, x, y)
  
end

def CGContextAddCurveToPoint(ctx, cp1x, cp1y, cp2x, cp2y, x, y)
  
end

def CGContextAddQuadCurveToPoint(ctx, cpx, cpy, x, y)
  
end

def CGContextClosePath(ctx)
  
end

def CGContextAddRect(ctx, rect)
  
end

def CGContextAddRects(ctx, rects)
  
end

def CGContextAddLines(ctx, points)
  
end

def CGContextAddEllipseInRect(ctx, rect)
  
end

def CGContextAddArc(ctx, x, y, radius, start_angle, end_angle, clockwise)
  
end

def CGContextAddArcToPoint(c, x1, y1, x2, y2, radius)
  
end

def CGContextAddPath(ctx, path)
  
end

def CGContextReplacePathWithStrokedPath(ctx)
  
end

def CGContextIsPathEmpty(context)
  
end

def CGContextGetPathCurrentPoint(context)
  
end

def CGContextGetPathBoundingBox(ctx)
  
end

def CGContextSetFillColor(ctx, color)
  `#{ctx}.fillStyle = #{color.rgb_string};`
end

def CGContextSetStrokeColor(ctx, color)
  `#{ctx}.strokeStyle = #{color.rgb_string};`
end

