# 
# github.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

module Github
  
  # Returns the url for getting the users info
  # 
  def self.user_info_url(username)
    "http://github.com/api/v2/json/user/show/#{username}"
  end
  
  def self.user(username)
    Ajax.get user_info_url(username), :data_type => 'jsonp' do |r|
      puts User.new(r['user'])
    end
  end
  
  # Returns the url for getting at a user's list of repos
  def self.user_repos_url(username)
    "http://github.com/api/v2/json/repos/show/#{username}"
  end
  
  def self.user_repos(user, options, &block)
    Ajax.get user_repos_url(user), :data_type => 'jsonp' do |r|
      yield r['repositories'] if block_given?
    end
  end
  
  def self.user_repo_url(username, repo)
    "http://github.com/api/v2/json/repos/show/#{username}/#{repo}"
  end
  
  def self.user_repo(user, repo, &block)
    Ajax.get user_repo_url(user, repo), :data_type => 'jsonp' do |r|
      # puts Repository.new(r['repository'])
    end
  end
  
  # Represents a Github user
  # 
  class User
    
    def initialize(hash)
      @name = hash['name']
      @company = hash['company']
      @location = hash['location']
    end
    
    # Reload data from server (force reload)
    def reload!
      
    end
    
  end
  
  # Represents a Github repository
  # 
  class Repository
    
    # Initialize the repository from a hash (dict)
    def initialize(hash)
      @name = hash['name']
      @description = hash['description']
    end
    
  end
  
end
