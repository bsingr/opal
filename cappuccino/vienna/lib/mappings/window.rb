Vienna::Mappings.map :window => :CPWindow do

  defaults  :frame => CPRect.new(0, 0, 0, 0),
            :style => [:titled, :closable, :miniaturizable, :resizable]
  
  
  constant :style, {
    :borderless         => CPBorderlessWindowMask, 
    :titled             => CPTitledWindowMask, 
    :closable           => CPClosableWindowMask, 
    :miniaturizable     => CPMiniaturizableWindowMask, 
    :resizable          => CPResizableWindowMask,
    :textured           => CPTexturedBackgroundWindowMask,
    :bridge             => CPBorderlessBridgeWindowMask,
    :hud                => CPHUDBackgroundWindowMask
  }

  def init_with_options(options)
    a_style = options.delete(:style)
    style = 0
    a_style.each do |s|
      style = style | self.class.map_constants[:style][s]
    end
    initWithContentRect options.delete(:frame).to_rect, styleMask:style
  end
  
  def <<(view)
    contentView << view
  end
end
