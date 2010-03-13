module Math
  
  PI = `Math.PI`
  
  E = `Math.E`
  
  class << self
    def atan2(y, x)
      `return Math.atan2(#{y},#{x});`
    end

    def cos(x)
      `return Math.cos(#{x});`
    end

    def sin(x)
      `return Math.sin(#{x});`
    end

    def tan(x)
      `return Math.tan(#{x});`
    end

    def acos(x)
      `return Math.acos(#{x});`
    end

    def asin(x)
      `return Math.asin(#{x});`
    end

    def atan(x)
      `return Math.atan(#{x});`
    end

    def exp(x)
      `return Math.exp(#{x});`
    end

    def log(x)
      `return Math.log(#{x});`
    end

    def sqrt(x)
      `return Math.sqrt(#{x});`
    end
  end

end
