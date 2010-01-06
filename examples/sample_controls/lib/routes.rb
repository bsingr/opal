# web server for loading application with vn-server

# get '/' or '/index' by using the alias directive
get '/', :alias => '/index' do
  "Hey there!"
end

get '/ben' do
  "kaplunk from ben!"
end

# by default ignore favicon.ico request
# comment out this declaration to supply your own favicon
get '/favicon.ico' do
  404
end

# defines restful routes for 'Person' class
# resource :people

# custom error messages: e.g. 404 Not found.
# error 404 do
# 
# end
