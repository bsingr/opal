class File
  
  class << self
      
    # Expand the given path
    def expand_path(path)
      parts = path.split('/')
      result = []
      parts.each do |part|
        if part == '..'
          result.pop
        elsif part == '.' || part == ''
          # do nothing
        else
          result.push part
        end
      end
      result.join '/'
    end
    
    # The dir name of the given file path
    def dirname(path)
      `return #{path}.substr(0, #{path}.lastIndexOf('/'));`
    end
    
    # join the given parts into a single name
    def join(*parts)
      parts.join '/'
    end
  
  end
end
