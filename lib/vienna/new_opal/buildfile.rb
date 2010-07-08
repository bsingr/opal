module Vienna
  
  class Buildfile
    
    def initialize(buildfile)
      @configs = {}
      instance_eval File.read(buildfile)
    end
    
    def config config_name, opts={}
      config_name = config_name.to_sym
      config = {}
      config.merge! opts
      @configs[config_name] = config
    end
    
    def config_for config_name
      config = {}
      config_name = config_name.to_sym
      config.merge!(@configs[:all]) if @configs.has_key? :all
      config.merge!(@configs[config_name]) if @configs.has_key? config_name
      config
    end
    
  end
end
