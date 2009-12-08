desc "Build project"
task :build do
  p = VN::Project.new()
  p.prepare!
  p.build!
end
