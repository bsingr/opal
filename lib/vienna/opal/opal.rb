module Vienna
  
  module Opal
    
    PATH = File.join(Vienna::PATH, 'opal')

    LIBPATH = File.join(Vienna::PATH, 'opal', 'lib')
    
    def self.path
      PATH
    end
    
    def self.libpath
      LIBPATH
    end
    
    def self.core_path
      File.join(PATH, 'core')
    end
    
    def self.browser_path
      File.join(PATH, 'browser')
    end
    
    # Build pure opal core files (not including browser). Result is returned as
    # a string. By default, the result is minified, but this can be overridden.
    # 
    # Minify (can) take a while longer, so only do it for production quality
    # builds
    # 
    def self.build_opal_core(minify=true)
      buffer = []
      Dir[File.join(Opal::PATH, 'core', '**/*.js')].each do |js|
        if minify
          buffer << JSMin.minify(File.read(js))
        else
          buffer << File.read(js)
        end
      end
      Dir[File.join(Opal::PATH, 'core', '**/*.rb')].each do |rb|
        basename = /^#{Opal::PATH}\/(.*)$/.match(rb)[1]
        str = Vienna::CherryKit::RubyBuilder.new(rb, nil, basename).build!
        buffer << %{opal_boot_file("#{basename}",#{str});}
      end
      buffer.join("")
    end
    
    # Build opal core and browser together. Result returned as string
    # Again, minify by default
    # 
    def self.build_opal_browser(minify=true)
      buffer = []
      buffer << build_opal_core(minify)
      Dir[File.join(Opal::PATH, 'browser', '**/*.js')].each do |js|
        if minify
          buffer << JSMin.minify(File.read(js))
        else
          buffer << File.read(js)
        end
      end
      Dir[File.join(Opal::PATH, 'browser', '**/*.rb')].each do |rb|
        basename = /^#{Opal::PATH}\/(.*)$/.match(rb)[1]
        str = Vienna::CherryKit::RubyBuilder.new(rb, nil, basename).build!
        buffer << %{opal_boot_file("#{basename}",#{str});}
      end
      buffer.join("")
    end
    
  end
end
