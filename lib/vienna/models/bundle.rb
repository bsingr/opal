# 
#  base.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-20.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  # Base class for applications and frameworks. Note: this is not used for locales
  # as they require seperate behaviour, and an application and framework can have
  # locales of their own. Both apps and frameworks can also have sub frameworks
  # which they respectively contain. A framework relies on having a root project.
  # 
  # This will be extenede later to also hold bundles: kind of plugin system for 
  # cocoa and vienna.
  class Bundle

  def initialize(bundle_root, parent=nil)
    @bundle_root = bundle_root
    @parent = parent
    @prepared = false
    
    # Linking configuration
    @link_config = {}
    
    # linked files
    @linked_files = []
    
    @sub_frameworks = []
  end

  def rakefile
    @rakefile ||= Rakefile.new.load!(@bundle_root)
  end
  
  def bundle_root
    @bundle_root
  end
  
  # This looks in the project dir for all locale folders and makes an array
  # of languages that need to be processed during the build stage
  def locales
    @locales ||= Dir.glob(File.join(bundle_root, '*.lproj'))
  end
  
  # Gets a list of all Javascript source files to build. These do not really
  # have to be processed, but out list will be passed on for combining
  def javascript_sources
    @javascript_soruces ||= Dir.glob(File.join(bundle_root, '*.js'))
  end
  
  def objc_sources
    @objc_sources ||= Dir.glob(File.join(bundle_root, '*.{m,c}'))
  end
  
  def xib_sources
    @xib_sources ||= Dir.glob(File.join(bundle_root, '*.xib'))
  end
  
  def plist_sources
    @plist_sources ||= Dir.glob(File.join(bundle_root, '*.plist'))
  end
  
  def image_sources
    @image_sources ||= Dir.glob(File.join(bundle_root, 'resources', '*.png'))
  end
  
  def css_sources
    @css_sources ||= Dir.glob(File.join(bundle_root, 'resources', '*.css'))
  end
  
  def prepare!
    # build paths
    FileUtils.mkdir_p(build_prefix)
    FileUtils.mkdir_p(File.join(build_prefix, 'Frameworks'))
    FileUtils.mkdir_p(File.join(build_prefix, 'Resources'))
    FileUtils.mkdir_p(tmp_prefix)
    FileUtils.mkdir_p(File.join(tmp_prefix, project_name))
  end
  
  def is_prepared?
    @prepared
  end
  
  # builds the bundle. Basically compiles each "good" file type, and puts it into the respective
  # tmp directory. These are not combined. link! is VERY different from build!
  # 
  # build! is for each file, link! is for the bundle/framework/app.
  def build!
    prepare! unless is_prepared?
    
    puts "Building: #{bundle_name}"
    
    # Objective C Files
    objc_sources.each do |c|
    builder = ObjectiveCParser.new(c, File.join(@parent.tmp_prefix, bundle_name, 'objects', File.basename(c, '.*')) + '.js', @parent)
    builder.build!
    @link_config[File.basename(c, '.m') + '.js'] = builder.link_config
    end
    
    # Javascript files
    javascript_sources.each do |j|
    builder = Vienna::Builder::Javascript.new(j, File.join(@parent.tmp_prefix, bundle_name, 'objects', File.basename(j)), @parent)
    builder.build!
    @link_config[File.basename(j)] = builder.link_config
    builder.link_frameworks.each do |r|
      if @parent.should_build_framework? r
      required_frameworks << r
      @parent.add_built_framework r
      puts " -- Requiring #{r}"
      end
    end
    end
    
    # xib files
    xib_sources.each do |x|
    builder = Vienna::Builder::Xib.new(x, File.join(@parent.tmp_prefix, bundle_name, 'resources', File.basename(x, '.xib')) + '.json', @parent)
    builder.build!
    end
    
    # css sources
    css_sources.each do |c|
    builder = Vienna::Builder::Css.new(c, File.join(@parent.tmp_prefix, bundle_name, 'resources', File.basename(c)), @parent)
    builder.build!
    end
    
    # image_sources
    image_sources.each do |i|
    File.copy(i, File.join(@parent.tmp_prefix, bundle_name, 'resources', File.basename(i)))
    end
    
    # save link config for the bundle, to speed up compiling (avoids rebuilding everyfile all the time)
    File.open(File.join(@parent.tmp_prefix, bundle_name, 'objects') + '/Linkfile', 'w') do |out|
    YAML.dump(@link_config, out)
    end
      
    # go through all required frameworks..
    required_frameworks.each do |f|
    path = find_framework(f)
    if path
      framework = Framework.new path, @parent
      framework.build!
      @sub_frameworks << framework
    else
      puts " -- Error: cannot find framework named #{f}"
    end
    end
  end
  
  # link all JS resources into the openFile, which, by name, is open (so just write)
  def link_javascript!(openFile)
    all_objects = Dir.glob(File.join(@parent.tmp_prefix, bundle_name, 'objects', '*.js'))
    all_resources = Dir.glob(File.join(@parent.tmp_prefix, bundle_name, 'resources', '*.json'))
    all_images = Dir.glob(File.join(@parent.tmp_prefix, bundle_name, 'resources', '*.png'))
    
    # do sub frameworks first
    @sub_frameworks.each do |s|
    s.link_javascript!(openFile)
    end
    
    # this frameworks's files
    all_objects.each do |f|
    link_object_file(f, openFile)
    end
    
    # this framework's resources
    all_resources.each do |r|
    link_resource_file(r, openFile)
    end
    
    # any image resources
    all_images.each do |i|
    File.copy(i, File.join(@parent.build_prefix, 'resources', File.basename(i)))
    end
  end
  
  # link all stylesheets into the provided file
  def link_css!(openFile)
    all_stylesheets = Dir.glob(File.join(@parent.tmp_prefix, bundle_name, 'resources', '*.css'))
    
    # sub frameworks
    @sub_frameworks.each do |s|
    s.link_css!(openFile)
    end
    
    all_stylesheets.each do |c|
    f = File.new(c)
    t = f.read
    openFile.write t
    f.close()
    end
  end
  
  # link an actual object file
  def link_object_file(file, out)

    return if @linked_files.include? file

    all_objects = Dir.glob(File.join(@parent.tmp_prefix, bundle_name, 'objects', '*.js'))
    object_path = File.join(@parent.tmp_prefix, bundle_name, 'objects')
    
    return unless all_objects.include?(file)

    @linked_files << file

    if @link_config[File.basename(file)]
    # has linked files, so include (.m, not .js)
    @link_config[File.basename(file)]["dependencies"].each do |d|
      link_object_file(File.join(object_path, d), out)
    end
    end
    f = File.new(file)
    t = f.read
    out.write t
    f.close();
  end
  
  # Links a resource file into the specified file. This will only link files
  # that can be inserted as json, plain text, or a string representation. For
  # example, strings files are copied, as are xibs (in json format)
  def link_resource_file(file, out)
    f = File.new(file, 'r')
    # t = f.read
    out.write "__bootstrap_files[\"#{File.basename(file)}\"] = "
    f.readlines.map {|line| out.write line}
    # out.write IO.read(file)
    # out.write JSMin.minify(file)
    # File.open(file, 'r') {|aFile| out.write JSMin.minify(aFile) }
    # out.write t
    out.write ";"
  end
  
  def build_prefix
    @build_prefix ||= (rakefile.config_for(build_mode)[:build_prefix] || 'build')
  end
  
  def tmp_prefix
    @tmp_prefix ||= (rakefile.config_for(build_mode)[:tmp_prefix] || 'build/tmp')
  end
  
  def copyright_notice
    @copyright_notice ||= (rakefile.config_for(build_mode)[:copyright_notice] || '')
  end
  
  def user_name
    @user_name ||= (rakefile.config_for(build_mode)[:user_name] || 'Your Name')
  end
  
  def organization_name
    @organization_name ||= (rakefile.config_for(build_mode)[:organization_name] || 'My Company')
  end
  
  def bundle_name
    @project_name ||= File.basename(bundle_root)
  end
  
  def sdk_root
    @sdk_root ||= (rakefile.config_for(build_mode)[:sdk_root] || (File.join(LIBPATH, '..', 'SDKs')))
  end
  
  def project_SDK
    @project_SDK ||= (rakefile.config_for(build_mode)[:SDK] || 'javascript')
  end
  
  def system_frameworks
    @system_frameworks ||= File.expand_path(File.join(sdk_root, project_SDK, 'frameworks'))
  end
  
  def project_frameworks
    @project_frameworks ||= File.expand_path(File.join(bundle_root, 'frameworks'))
  end
  
  def required_frameworks
    @required_frameworks ||= []
  end
  
  def required
    return @required_frameworks if @required_frameworks
    
    r = rakefile.config_for(build_mode)[:required]
    if r.class == Array
    return r
    elsif r.class == String or r.class == Symbol
    return [r.to_s]
    end
    
    return []
  end
  
  # Gets the build mode. If not set, defaults to debug
  def build_mode
    @build_mode ||= :debug
  end
  
  # Sets build mode: optional.. defaults to debug if not set
  def build_mode=(build)
    @build_mode = build
  end
  
  
  def find_framework(name)
    # normalize string
    name = name.to_s.downcase
    f = Dir.new(system_frameworks)
    f.each do |x|
    if x.downcase == name
      return File.join(system_frameworks, x)
    end
    end
    # else, return nil: cant find framework
    return nil
  end
  end
end