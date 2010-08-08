# 
# notification.rb
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

module CherryKit
  
  class NotificationCenter
    
    def initialize
      # Dispatch table is a hash of all observed objects. Each key in the hash
      # is the observed object, and each value is an array of hashes with keys
      # for all relevant properties
      @dispatch_table = {}
    end
    
    # Add an observer with the given action for the notification name sent by
    # the object.
    # 
    #     add_observer some_object, :object_got_update, :object_updated, self
    # 
    #     def object_got_update(notification)
    #       puts "some object got an update from #{notification[:sender]}"
    #     end
    # 
    # @param {Object} observer that wants to know about notifications
    # @param {Symbol} action to send on response to the notification
    # @param {Symbol} notification name to listen for
    # @param {Object} object to watch for notifications
    # 
    # @returns self
    # 
    def add_observer(observer, action, name, object)
      # puts "in add observers"
      observers = (@dispatch_table[object] || @dispatch_table[object] = [])
      
      # puts 'observers is #{observers}'
      # `console.log(#{observers});`
      
      observers << {
        :observer => observer,
        :action   => action,
        :name     => name,
        :sender   => object
      }
      
      self
    end
    
    # Returns the default notification center for the application.
    # 
    # @returns [NotificationCenter]
    # 
    def self.default_center
      @default_center ||= self.new
    end
    
    # Post a notification. Expected options are:
    # 
    # :name - Symbol name of the notification
    # :sender - Object reference
    # :user_info - hash of any additional options that may be required
    # 
    # @param [Hash] options
    # @returns 
    # 
    def post_notification(options)
      observers = @dispatch_table[options[:sender]]
      
      # puts "all observers: #{observers}"
      # `console.log(#{@dispatch_table});`
      
      if observers
        observers.each do |observer|
          if observer[:name] == options[:name]
            observer[:observer].__send__(observer[:action], observer)
          end
        end
      end
      
      self
    end
    
  end
end
