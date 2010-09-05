class BindingsSpecEmail
  
  attr_accessor :properties
  
  def initialize
    @properties = {
      :address  => "test@test.com",
      :subject  => "Subject",
      :date     => "Date..",
      :body     => ""
    }
  end
end

class BindingsSpecMailbox
  
  attr_accessor :properties, :emails
  
  def initialize
    @properties = { :title => "New Mailbox " }
    @emails = []
  end
end

class BindingsSpecController
  
  def initialize
    @mailboxes = [1, 2, 3, 4]
  end
  
  attr_accessor :mailboxes
  
  def add_email(sender)
    
  end
  
  def add_mailbox(sender)
    
  end
  
  def remove_email(sender)
    
  end
  
  def remove_mailbox(sender)
    
  end
end

describe "Bindings Spec Coded demo" do
  
  it "should all be ok" do
    controller = BindingsSpecController.new
    # puts "making controller alias"
    controller_alias = CherryKit::ObjectController.new
    puts "going to set content"
    # `console.log(#{controller});`
    controller_alias.content = controller
    puts "did set content"
    # setup mailboxes array controller
    mailboxes = CherryKit::ArrayController.new
    mailboxes.bind :content_array, 
                   :to    => controller_alias,
                   :path  => 'selection.mailboxes'
                   
    mailboxes.object_class = BindingsSpecMailbox
    
    puts "mailboxes array controller:"
    `console.log(#{mailboxes.content_array});`
    
    # `console.log(#{controller_alias});`
    puts "setting mailboxes!"
    controller.mailboxes = [5, 6, 7, 8]
    puts "mailboxes array controller after change:"
    `console.log(#{mailboxes.content_array});`
    
    # setup emails array controller
    # emails = CherryKit::ArrayController.new
    #    emails.bind :content_array,
    #                :to   => mailboxes,
    #                :path => 'selection.emails'
    #    
    #    emails.object_class = BindingsSpecEmail
  end
end
