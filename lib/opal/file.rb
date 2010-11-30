
class File
  
  class << self
    def basename(path)
      OpalVM.basename path
    end

    def join(*parts)
      __join__ *parts
    end
    
    # Returns all components of the filename given in `file_name` except last
    # one. The filename must be formed using forward slashed ("/") regardless of
    # the separator used on the local filesystem.
    # 
    # @example
    #   File.dirname "home/adam/work/ruby.rb"
    #   # => "/home/adam/work"
    # 
    # @param [String] path
    # @return [String]
    def dirname(path)
      # `return #{file_name}.substr(0, #{file_name}.lastIndexOf('/'));`
      __dirname__ path
    end

    def expand_path(path = "")
      # OpalVM.expand_path path
      __expand_path__ path
    end
    
  end
end
