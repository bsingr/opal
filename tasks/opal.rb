namespace :opal do
  # Opal test files are stored in vienna/opal/spec and are built to 
  # vienna/opal_spec, which is ignored by github
  desc "Rebuild opal test files"
  task :spec => :vienna do
    out_dir = File.join(Dir.getwd, 'opal_spec')
    opal_spec_js_file = File.join(out_dir, 'opal_spec.js')
    opal_spec_html_file = File.join(out_dir, 'opal_spec.html')
    opal_spec_css_file = File.join(out_dir, 'opal_spec.css')
    FileUtils.mkdir_p(out_dir)
    
    # spec source
    spec_dir = File.join(Vienna::Opal::PATH, 'spec')
    
    File.open(opal_spec_js_file, 'w') do |f|
      f.puts Vienna::Opal.build_opal_browser(false)
      
      # all specs for opal
      Dir[File.join(spec_dir, '**/*.rb')].each do |spec|
        # spec looks for specs in spec/**.*rb
        build_name = "examples/" + /^#{spec_dir}\/(.*)/.match(spec)[1]
        str =  Vienna::CherryKit::RubyBuilder.new(spec, nil, build_name).build!
        f.puts %{opal_define_file("#{build_name}",#{str});}
      end
      
      # spec lib
      Dir[File.join(Vienna::Opal.libpath, 'spec', '**/*.rb'), File.join(Vienna::Opal.libpath, 'spec.rb')].each do |rb|
        build_name = /^#{File.join(Vienna::Opal.libpath)}\/(.*)/.match(rb)[1]
        str =  Vienna::CherryKit::RubyBuilder.new(rb, nil, build_name).build!
        f.puts %{opal_define_file("#{build_name}",#{str});}
      end
      
      str = Vienna::CherryKit::RubyBuilder.new(File.join(spec_dir, 'spec'), nil, 'main.rb').build!
      f.puts %{opal_define_file("main.rb",#{str});}
      
      # spec.rb is main (from resoure folder)
      f.puts %{opal_browser_main("main.rb");}
    end
    
    File.open(opal_spec_html_file, 'w') do |f|
      f.puts File.read(File.join(spec_dir, 'opal_spec.html'))
    end
    
    File.open(opal_spec_css_file, 'w') do |f|
      f.puts File.read(File.join(spec_dir, 'opal_spec.css'))
    end
    
  end
end