
class Element  
  # Represents the 2D canvas context for HTML5. An IE compatible version is
  # being tested which will inherit this interface, but use VML for drawing
  # commands.
  class CanvasContext
    # Initialize the receiver for the given +Element+ instance
    # 
    # @example Ruby
    #     e = Element.new :canvas
    #     Document.body << e
    #     ctx = e.context
    #     # => #<Element::CanvasContext>
    # 
    # @param [Element] element the canvas element to create a context for
    # @return [CanvasContext] returns the receiver
    def initialize(element)
      @ctx = `#{element}.__element__.getContext('2d')`
      
      begin_path
      move_to 30, 30
      line_to 150, 150
      bezier_curve_to 60, 70, 60, 70, 70, 150
      line_to 30, 30
      fill :fill_style => 'blue'
    end
    
    def fill_style=(style)
      `#{self}.__ctx__.fillStyle = #{style};
      return #{self};`
    end
    
    def begin_path
      `#{self}.__ctx__.beginPath();
      return #{self};`
    end
    
    def move_to(x, y)
      `#{self}.__ctx__.moveTo(#{x}, #{y});
      return #{self};`
    end
    
    def line_to(x, y)
      `#{self}.__ctx__.lineTo(#{x}, #{y});
      return #{self};`
    end
    
    def bezier_curve_to(a, b, c, d, e, f)
      `#{self}.__ctx__.bezierCurveTo(#{a}, #{b}, #{c}, #{d}, #{e}, #{f});
      return #{self};`
    end
    
    def fill(attributes = {})
      # save current context
      save
      # apply each attribute
      set attributes
      # do our actual fill
      `#{self}.__ctx__.fill()`
      # restore back to original state
      restore
      # chainability
      self
    end
    
    def save
      `#{self}.__ctx__.save()`
      self
    end
    
    def restore
      `#{self}.__ctx__.restore()`
      self
    end
    
    def set(attributes = {})
      attributes.each do |key, value|
        puts "sending #{key}="
        __send__ "#{key}=", value
      end
      self
    end
  end
end
