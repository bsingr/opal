namespace :opal do
  # Opal test files are stored in vienna/opal/spec and are built to 
  # vienna/opal_spec, which is ignored by github
  desc "Rebuild opal test files"
  task :spec => :vienna do
    out_dir = File.join(Dir.getwd, 'opal_spec')
    opal_spec_js_file = File.join(out_dir, 'opal_spec.js')
    opal_spec_html_file = File.join(out_dir, 'opal_spec.html')
    FileUtils.mkdir_p(out_dir)
    
    # spec source
    spec_dir = File.join(Vienna::Opal::PATH, 'spec')
    
    File.open(opal_spec_js_file, 'w') do |f|
      f.puts Vienna::Opal.build_opal_browser(false)
    end
    
    File.open(opal_spec_html_file, 'w') do |f|
      f.puts File.read(File.join(spec_dir, 'opal_spec.html'))
    end
    
    
  end
end