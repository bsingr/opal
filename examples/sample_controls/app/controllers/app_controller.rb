# Delegate of VN::Application
class AppController
      
  def app_will_finish_launching(notification)
    # do stuff before app finishes
  end
  
  def app_did_finish_launching(notification)
    # do stuff after app finishes
  end
end
