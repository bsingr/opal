module Window
  
  def self.title
    `return window.title;`
  end
  
  def self.title=(a_title)
    `return window.title=#{a_title};`
  end
  
end
