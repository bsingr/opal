# 
# key_value_observing.rb
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

class Object
    
  def will_change_value_for_key(key)
    __kvo_send_will_change_notifications key
  end
    
  def did_change_value_for_key(key)
    __kvo_send_did_change_notifications key
  end
  
  def add_observer_for_key_path(observer, path, options, context)
    # ensure we have our replaced keys hash
    @__kvo_replaced_keys ||= {}
    # we should check here if we are looking at a key_path, or just a normal
    # path. For now, we assume normal path
    __kvo_replace_setter_for_key path
    
  end
  
  # Private method to replace the setter methods for the given key.
  # 
  # @param [String] key
  # @returns nil
  # 
  def __kvo_replace_setter_for_key(key)
    # if we have already done this key, skip
    return if @__kvo_replaced_keys[key]
    
    puts "replacing methods for #{key}"
    
    methods_to_replace = {
      "#{key}=" => proc do |key, original_method|
        # we simply return a closure which takes a single param, the value. We
        # gather the key for sending will_change_value_for_key(), and keep our
        # original method so we can call it between notifications
        proc do |value|
          will_change_value_for_key(key)
          `#{original_method}.apply(#{self}, [#{value}]);`
          did_change_value_for_key(key)
        end
      end
    }
    
    methods_to_replace.each do |method_id, implementation|
      `var js_id = #{self}.mid2jsid(#{method_id.to_s}.toString());`
      # only replace method if we have implemented it
      if respond_to? method_id
        original = `#{self}[js_id];`
        # define new method as result of calling the closure
        `#{self}[js_id] = #{implementation}.__fun__(#{key}, #{original}).__fun__;`
      end
    end
    
    puts "need to look for affecting keys for #{key}"
  end
  
  # Notifications that we are about to change the key
  def __kvo_send_will_change_notifications(key)
    
  end

end
