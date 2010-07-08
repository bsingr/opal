module Vienna
  
  class Framework
    
    # Framework root. This is a dir. e.g. (..)/frameworks/opal
    attr_reader :framework_root
    
    # Buildfile object
    attr_reader :buildfile
    
    attr_reader :build_options
    
    def initialize(framework_root)
      @framework_root = framework_root
    end
    
    def framework_name
      @framework_name ||= File.basename(framework_root)
    end
    
    DEFAULT_CONFIG_OPTIONS= {
      
    }
    
    # Actually build the framework with the given options. Note, these are
    # completely different to the options contained in the Buildfile: these
    # are project specific like output dir, mode (build, release) etc
    def build!(configuration_options=nil)
      configuration_options ||= DEFAULT_CONFIG_OPTIONS
      # load build file
      @buildfile = Vienna::Buildfile.new(File.join(framework_root, 'Buildfile'))
      @build_options = @buildfile.config_for(:all)
      
      if @build_options.has_key? :build_process
        instance_eval &@build_options[:build_process]
      else
        default_build!
      end
    end
    
    def default_build!
      
    end
    
    def to_s
      "#<Framework name=#{framework_name}>"
    end
  end
end
