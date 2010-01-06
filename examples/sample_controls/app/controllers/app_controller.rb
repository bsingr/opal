# Delegate of VN::Application
class AppController
  
  VERSION = '0.0.1'
  IMAGE_PATH = File.join(File.dirname(__FILE__), '..', 'resources', 'images')
      
  def app_will_finish_launching(notification)
    # do stuff before app finishes
  end
  
  def app_did_finish_launching(notification)
    # do stuff after app finishes
  end
end
