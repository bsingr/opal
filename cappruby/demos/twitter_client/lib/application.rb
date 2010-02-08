# AppController class is the CPApp delegate
class AppController
  
  def applicationWillFinishLaunching(notification)
    main_window
  end
  
  def applicationDidFinishLaunching(notification)

  end
  
  # return or build the main window
  def main_window
    @main_window ||= window :title => "Twitter Client" do |win|
      
      button :title => "First Button" do |btn|
        btn.on_action { puts "Wow, button was clicked" }
        win << btn
      end
    end
  end
  
end
