class AnimatedView < CPView
  
  def initWithFrame frame
    super
    @old_point = [rand(500), rand(500)]
    @timer = CPTimer.scheduledTimerWithTimeInterval 0.1, target:self,
                   selector:'do_draw', userInfo:nil, repeats:true
    self
  end
  
  def drawRect(rect)
    c = CPGraphicsContext.currentContext.graphicsPort
    CGContextFillRect(c, CGRectMake(0, 0, 500, 500))
  end
  
  def do_draw
        
    Canvas.for_view(self) do |c|
      
      c.fill_color = CPColor.alloc._initWithRGBA [0,0,0,0.1]
      c.fill 0, 0, 500, 500
      
      c.stroke_color = CPColor[:red]
      
      CGContextSetShadowWithColor(CPGraphicsContext.currentContext.graphicsPort, CGSizeMake(0,0),10,CPColor.alloc._initWithRGBA([1,1,1,1]))
      
      c.stroke_path @old_point[0], @old_point[1] do
        p = [rand(500), rand(500)]
        @old_point = p
        c.curve_to(rand(500), rand(500), rand(500), rand(500), p[0], p[1])
        c.line_width = 5 + rand(10)
      end
    end
    
  end
  
end

# if (!_lastX)
#     _lastX = rect.size.width * rand();
# 
# if (!_lastY)
#     _lastY = rect.size.height * rand();
# 
# if (!_hue)
#     _hue = 0;
# 
# [[NSColor colorWithCalibratedRed:0 green:0 blue:0 alpha:0.1] set];
# [NSBezierPath fillRect:rect];
# 
# [NSGraphicsContext saveGraphicsState];
# 
# NSBezierPath *linePath = [NSBezierPath bezierPath];
# [linePath setLineWidth:(5 + (rand() * 10))];
# [linePath moveToPoint:NSMakePoint(_lastX, _lastY)];
# 
# _lastX = rect.size.width * rand();
# _lastY = rect.size.height * rand();
# 
# [linePath curveToPoint:NSMakePoint(_lastX, _lastY) controlPoint1:NSMakePoint(rect.size.width * rand(), rect.size.height * rand()) 
#          controlPoint2:NSMakePoint(rect.size.width * rand(), rect.size.height * rand())];
# 
# _hue = _hue + (rand() * 10);
# 
# id context = [[NSGraphicsContext currentContext] graphicsPort];
# context.strokeStyle = "hsl(" + _hue + ", 50%, 50%)";
# 
# 
# NSShadow *pathShadow = [[NSShadow alloc] init];
# [pathShadow setShadowColor:[NSColor colorWithCalibratedRed:1 green:1 blue:1 alpha:1.0]];
# [pathShadow setShadowBlurRadius:10];
# [pathShadow setShadowOffset:NSMakeSize(0, 0)];
# [pathShadow set];
# 
# [linePath stroke];
# 
# [NSGraphicsContext restoreGraphicsState];
