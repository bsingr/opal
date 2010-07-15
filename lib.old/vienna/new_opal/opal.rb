module Vienna
  
  class Opal
    
    # Framework root. This is a dir. e.g. (..)/frameworks/opal
    attr_reader :framework_root
    
    # Buildfile object
    attr_reader :buildfile
    
    attr_reader :build_options
    
    attr_reader :build_dir
    
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
      
      @build_dir = configuration_options[:build_dir]
      
      if @build_options.has_key? :build_process
        instance_eval &@build_options[:build_process]
      else
        default_build!
      end
    end
    
    # Alll sources to build (ruby and js files)
    def sources
      @sources ||= []
    end
    
    # Our default build procedure. The vast majority of times this will be used.
    # Certain frameworks, e.g. vienna core uses a custom build_process as the
    # loading system is implemented in vienna itself.
    def default_build!
      
    end
    
    # Where our main js file for the framework goes
    def js_build_path
      File.join(@build_dir, framework_name) + '.js'
    end
    
    # read the file relative to the framework_root
    def read_file file_path
      File.read File.join(framework_root, file_path)
    end
    
    # Return the fully expanded path for a file relative to framework root
    def file file_path
      File.expand_path(File.join(framework_root, file_path))
    end
    
    def to_s
      "#<Opal name=#{framework_name}>"
    end
  end
end
