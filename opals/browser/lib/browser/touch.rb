
class Event
  
  def changed_touches
    return @changed_touches if @changed_touches
    # map them to Ruby touches (from JS touches)
    @changed_touches = `#{self}.__event__.changedTouches`.map do |touch|
      # `#{Touch}.$from_native(#{touch});`
      Touch.from_native touch
    end
  end
end
