# 
# notification.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2009 Adam Beynon.
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

module Vienna
  
  class Notification
    
    attr_reader :name, :object, :user_info
    
    def initialize name, obj, info
      @name = name
      @object = obj
      @user_info = info
    end
    
    def self.notification_with_name name, object:obj
      notification_with_name name, object:obj, user_info:nil
    end
    
    def self.notification_with_name name, object:obj, user_info:info
      self.new(name, obj, info)
    end
  end
  
    
  
  class NotificationCenter
    
    def self.default_center
      @@default_center ||= self.new()
    end
    
    def initialize
      super
      @dispatch_table = []
    end
    
    def add_observer observer, selector:selector, name:name, object:obj
      @dispatch_table << {
        :observer => observer,
        :selector => selector,
        :name => name,
        :sender => obj,
        :active => true
      }
    end
    
    def post_notification notification
      post_notification_name notification.name, object:notification.object, user_info:notification.user_info
    end
    
    def post_notification_name name, object:obj
      post_notification_name name, object:obj, user_info:nil
    end
    
    def post_notification_name name, object:obj, user_info:info
      # fastest loop access
      length = @dispatch_table.length
      `for (var idx = 0; idx < length; idx++) {`
        # idx as xstring to avoid it being a method call instead of a variable
        the_object = @dispatch_table[`idx`] 
        if the_object.name == name
          the_object.observer.perform(the_object.selector, obj, info)
        end
      `} `
    end
    
    def remove_observer observer
      
    end
    
    def remove_observer observer, name:name, object:obj
      
    end
    
    # required block (by definiton in method name). Should be Proc?
    def add_observer_for_name name, object:obj, queue:queue, using_block:&block
      
    end
  end
end
