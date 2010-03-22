FileUtils.mkdir_p(app_dir)

Dir[File.join(source_dir, '**/*')].each do |file|
  relative_path = /^#{source_dir}\/(.*)/.match(file)[1]
  if File.directory?(file)
    FileUtils.mkdir_p(File.join(app_dir, relative_path))
  else
    relative_path.gsub!(/__APPLICATION_NAME__/, app_name)
    File.open(File.join(app_dir, relative_path), 'w') do |o|
      t = File.read(file)
      t.gsub!(/__APPLICATION_NAME__/, app_name)
      t.gsub!(/__APPLICATION_TITLE__/, app_title)
      o.write(t)
    end
  end
end
