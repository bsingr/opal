class Regexp
  
  def self.new(str)
    `return new RegExp(#{str});`
  end
  
  def ===(string)
    `return #{self}.exec(#{string}) ? true : false;`
  end
  
  def match(string)
    if m = `#{self}.exec(#{string})`
      MatchData.new(m)
    else
      nil
    end
  end
  
  def inspect
    `return #{self}.toString();`
  end
  
end
