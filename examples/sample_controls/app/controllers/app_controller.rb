# Delegate of VN::Application
class AppController
  
  VERSION = '0.0.1'
  IMAGE_PATH = File.join(File.dirname(__FILE__), '..', 'resources', 'images')
      
  def app_will_finish_launching(notification)
    # do stuff before app finishes
    main_window
  end
  
  def app_did_finish_launching(notification)
    # do stuff after app finishes
  end
  
  def main_window
    @main_window ||= window :title => "My Window", :style => :bridged do |win|
      b = button :title => "Click me!", :frame => [100, 100, 400, 400]
      b.on_click { puts "Button was clicked" }
      b << win
    end
  end
end
