# 
# application.rb
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
  
  
  class Application
    
    attr_accessor :windows, :event_queue, :views_needing_display
    attr_reader :delegate
    
    def initialize
      super
      @windows = []
      @event_queue = []
      @views_needing_display = []
    end
    
    def run
      # attatch all events...
      finish_launching
    end
    
    def finish_launching
      nc = VN::NotificationCenter.default_center
      nc.post_notification VN::APP_WILL_FINISH_LAUNCHING, self
      nc.post_notification VN::APP_DID_FINISH_LAUNCHING, self
      display_required_views
    end
    
    # Mark view as needing display at the end of the current run loop
    # 
    def mark_view_for_display view, flag
      unless @views_needing_display.contains? view
        @views_needing_display << view
      end
    end
    
    # Redraw every 'dirty' view
    # 
    def display_required_views
      @views_needing_display.each do |view|
        view.draw_rect()
      end
      @views_needing_display = []
    end
    
    # Set App delegate
    # 
    def delegate=(obj)
      return if @dleegate == obj
      
      nc = VN::NotificationCenter.default_center
      
      if @delegate
        nc.remove_observer(@delegate, VN::APP_WILL_FINISH_LAUNCHING, self)
        nc.remove_observer(@delegate, VN::APP_DID_FINISH_LAUNCHING, self)
        nc.remove_observer(@delegate, VN::APP_DID_CHANGE_SCREEN_PARAMETERS, self)
      end
      
      @delegate = obj
      
      if @delegate.respond_to? :will_finish_launching
        nc.add_observer(@delegate, :will_finish_launching, VN::APP_WILL_FINISH_LAUNCHING, self)
      end
      
      if @delegate.respond_to? :did_finish_launching
        nc.add_observer(@delegate, :did_finish_launching, VN::APP_DID_FINISH_LAUNCHING, self)
      end
    end
    
    # Add window
    # 
    def add_window(window)
      @windows << window
    end
    
    # Get shared app
    # 
    def self.shared_application
      @@app ||= Application.new()
    end
  end
  
end
