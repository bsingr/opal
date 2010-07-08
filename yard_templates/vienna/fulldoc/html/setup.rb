include Helpers::ModuleHelper

def init
  options[:objects] = objects = run_verifier(options[:objects])
  options[:files] = ([options[:readme]] + options[:files]).compact.map do |t|
    t.to_s
  end
  options[:readme] = options[:files].first
  options[:title] ||= "Documentation by YARD #{YARD::VERSION}"
  
  generate_assets
  
  objects.each do |object|
    begin
      serialize(object)
    rescue => e
      puts "needed to resuce: #{object}"
      puts e
    end
  end
end

def generate_assets
  %w{js/a.js}.each do |file|
    asset(file, file(file, true))
  end
end

def asset(path, content)
  options[:serializer].serialize(path, content) if options[:serializer]
end

def serialize object
  options[:object] = object
  Templates::Engine.with_serializer(object, options[:serializer]) do
    T('layout').run(options)
  end
end