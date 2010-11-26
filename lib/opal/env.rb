ENV = Object.new

class << ENV
  
  def to_s
    "ENV"
  end
  
  def inspect
    result = []
    
    OpalVM.getallenv.each do |arg|
      result.push "#{arg[0].inspect}=>#{arg[1].inspect}"
    end
    
    "{" + result.join(", ") + "}"
  end
  
  def [](name)
    OpalVM.getenv name
  end
end
