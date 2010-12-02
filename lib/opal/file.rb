
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
      __dirname__ path
    end

    def expand_path(path = "", dir_string = "")
      __expand_path__ path, dir_string
    end
    
    def exists?(path)
      __exists__ path
    end
    
    def read(path)
      if exists? path
        __read__ path
      else
        raise "No such file or directory - #{path}"
      end
    end
    
  end
end
