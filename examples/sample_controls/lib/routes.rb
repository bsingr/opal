# web server for loading application with vn-server

# get '/' or '/index'
get '/', :alias => '/index' do
  "Hey there!"
end

# defines restful routes for 'Person' class
resource :people
