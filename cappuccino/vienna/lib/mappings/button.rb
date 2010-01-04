Vienna::Mappings.map :button => :CPButton do
  
  defaults :frame => CPRect.new(0, 0, 100, 24)
  
  constant :state, {
    :on                   => CPOnState,
    :off                  => CPOffState,
    :mixed                => CPMixedState
  }

  def init_with_options(options)
    initWithFrame options.delete(:frame).to_rect
  end
  
  def on?
    state == CPOnState
  end

  def off?
    state == CPOffState
  end

  def mixed?
    state == CPMixedState
  end
end
