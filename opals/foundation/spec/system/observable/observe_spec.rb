class KVOTestSimple
  
  attr_reader :first_name
  
  attr_accessor :second_name
    
  def initialize
    @some_ivar_we_can_set = nil
  end
  
  def first_name=(first_name)
    @first_name = "setting_#{first_name}"
  end

end


class KVOMultipartClass
  attr_accessor :teacher, :students
end

class KVOMultipartPerson
  attr_accessor :name, :car
end

class KVOMultipartCar
  attr_accessor :model
end


class KVOTestRepeaterA
  attr_accessor :b
end

class KVOTestRepeaterB
  attr_accessor :c
end

class KVOTestRepeaterC
  attr_accessor :d
end

class KVOTestRepeaterD
  attr_accessor :e
end

class KVOTestRepeaterE
  attr_accessor :f
end

class KVOTestRepeaterF
  attr_accessor :g
end

describe "Observable#observe" do
  
  it "should allow a simple observer to be added" do
    a = KVOTestSimple.new
    
    old_value = nil
    new_value = nil
    did_see_notification = false
    
    a.observe :first_name do |changes|
      did_see_notification = true
      old_value = changes[:old]
      new_value = changes[:new]
    end
    
    a.first_name = 'adam'
    a.first_name.should == 'setting_adam'
    
    did_see_notification.should == true
    
    old_value.should == nil
    new_value.should == 'setting_adam'
  end
  
  
  
  it "should only observe and post notifications for observed keys" do
    b = KVOTestSimple.new
    
    did_see_notification = false
    
    b.observe :first_name do |changes|
      did_see_notification = true
    end
    
    b.second_name = "adam"
    b.second_name.should == "adam"
    did_see_notification.should == false
    
  end
  
  
  
  it "should allow multiple observers for a single key" do
    c = KVOTestSimple.new
    d = KVOTestSimple.new
    
    first_saw = false
    second_saw = false
    
    c.observe :first_name do |changes|
      first_saw = true
    end
    
    c.observe :first_name do |changes|
      second_saw = true
    end
    
    c.first_name = "some_name"
    c.first_name.should == "setting_some_name"
    
    first_saw.should == true
    second_saw.should == true

  end

  
  
  it "should be possible to observe instance variables" do
    e = KVOTestSimple.new
    
    old_value = nil
    new_value = nil
    did_see_notification = false
    
    e.observe :some_ivar_we_can_set do |changes|
      did_see_notification = true
      old_value = changes[:old]
      new_value = changes[:new]
    end
    
    e.set_attribute :some_ivar_we_can_set, 200
    
    did_see_notification.should == true
    e.get_attribute(:some_ivar_we_can_set).should == 200
    
    old_value.should == nil
    new_value.should == 200
    
  end
  
  
  
  it "should allow observers for multipart keys" do
    the_class = KVOMultipartClass.new
    fred = KVOMultipartPerson.new
    
    the_class.teacher = fred
    did_see_observation = false
    
    the_class.observe 'teacher.name' do |change|
      did_see_observation = true
    end
    
    fred.name = "Fred"
    
    the_class.get_path('teacher.name').should == "Fred"
    did_see_observation.should == true
  end
  
  
  
  it "should allow a three part key" do
    cls = KVOMultipartClass.new
    fred = KVOMultipartPerson.new
    car = KVOMultipartCar.new
    
    did_see_observation = false
    
    cls.teacher = fred
    fred.car = car
    
    cls.observe('teacher.car.model') do |info|
      info[:path].should == "teacher.car.model"
      did_see_observation = true
    end
    
    car.model = "Jaguar"
    
    did_see_observation.should == true
    cls.teacher.car.model.should == "Jaguar"
  end
  
  
  
  it "should allow long observer paths" do
    a = KVOTestRepeaterA.new
    a.set_path 'b', KVOTestRepeaterB.new
    a.set_path 'b.c', KVOTestRepeaterC.new
    a.set_path 'b.c.d', KVOTestRepeaterD.new
    a.set_path 'b.c.d.e', KVOTestRepeaterE.new
    a.set_path 'b.c.d.e.f', KVOTestRepeaterF.new
    a.set_path 'b.c.d.e.f.g', "Hey G"
    
    a.b.c.d.e.f.g.should == "Hey G"
    did_see_observation = false

    a.observe('b.c.d.e.f.g') do |info|
      did_see_observation = true
      
      info[:path].should == 'b.c'
      info[:object].class.should == KVOTestRepeaterA
    end
    
    a.b.c = nil
    did_see_observation.should == true
    
  end
  
  
  
  it "should allow long observer paths, part2" do
    a = KVOTestRepeaterA.new
    a.set_path 'b', KVOTestRepeaterB.new
    a.set_path 'b.c', KVOTestRepeaterC.new
    a.set_path 'b.c.d', KVOTestRepeaterD.new
    a.set_path 'b.c.d.e', KVOTestRepeaterE.new
    a.set_path 'b.c.d.e.f', KVOTestRepeaterF.new
    a.set_path 'b.c.d.e.f.g', "Hey G"
    
    did_see_observation = false

    a.observe('b.c.d.e.f.g') do |info|
      did_see_observation = true
      
      info[:path].should == 'b.c.d'
      info[:object].class.should == KVOTestRepeaterA
      info[:new].should == nil
    end
    
    a.b.c.d = nil
    did_see_observation.should == true
    
  end
  
  
  
  it "should allow long observer paths, part3" do
    a = KVOTestRepeaterA.new
    a.set_path 'b', KVOTestRepeaterB.new
    a.set_path 'b.c', KVOTestRepeaterC.new
    a.set_path 'b.c.d', KVOTestRepeaterD.new
    a.set_path 'b.c.d.e', KVOTestRepeaterE.new
    a.set_path 'b.c.d.e.f', KVOTestRepeaterF.new
    a.set_path 'b.c.d.e.f.g', "Hey G"
    
    did_see_observation = false

    a.observe('b.c.d.e.f.g') do |info|
      did_see_observation = true
      
      info[:path].should == 'b.c.d.e.f.g'
      info[:object].class.should == KVOTestRepeaterA
      info[:new].should == 100
    end
    
    a.b.c.d.e.f.g = 100
    did_see_observation.should == true
    
  end
  
  
  
  it "should allow long observer paths, part3" do
    a = KVOTestRepeaterA.new
    a.set_path 'b', KVOTestRepeaterB.new
    a.set_path 'b.c', KVOTestRepeaterC.new
    a.set_path 'b.c.d', KVOTestRepeaterD.new
    a.set_path 'b.c.d.e', KVOTestRepeaterE.new
    a.set_path 'b.c.d.e.f', KVOTestRepeaterF.new
    a.set_path 'b.c.d.e.f.g', "Hey G"
    
    did_see_observation = false

    a.observe('b.c.d.e.f.g') do |info|
      did_see_observation = true
      
      info[:path].should == 'b'
      info[:object].class.should == KVOTestRepeaterA
      info[:new].should == 200
    end
    
    a.b = 200
    did_see_observation.should == true
    
  end
  
end
