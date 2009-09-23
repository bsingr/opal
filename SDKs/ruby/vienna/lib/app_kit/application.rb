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

require 'responder'
require 'window'

module Vienna
  
  class Application < Responder
    
    attr_accessor :windows, :event_queue, :views_needing_display
    attr_reader :delegate
    
    
    def init
      @windows = []
      @event_queue = []
      @views_needing_display = []
    end
    
    def delegate=(object)
      return if @delegate == object
      
      nc = VN::NotificationCenter.default_center
      
      if @delegate
        nc.remove_observer(@delegate, VN::WILL_FINISH_LAUNCHING, self)
        nc.remove_observer(@delegate, VN::DID_FINISH_LAUNCHING, self)
      end
      
      @delegate = object
      
      if @delegate.respond_to? 'will_finish_launching'
        nc.add_observer @delegate, 'will_finish_launching', VN::WILL_FINISH_LAUNCHING, self
        nc.add_observer @delegate, 'did_finish_launching', VN::DID_FINISH_LAUNCHING, self
      end
    end
    
  end
  
end