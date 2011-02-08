class Element

  # Adds the given class or classes to each element in the receiver. Multiple
  # classes may be added by seperating them with a space. These classes do not
  # replace any previously set classes, but are instead added.
  #
  # @param [String] name the class(es) name(s)
  # @return [Element] returns the receiver
  def add_class(name)
    `return self.addClass(name);`
  end

  # Removes the given class or classes to each element in the receiver. Multiple
  # classes may be removed at once by passing in a space seperated string of
  # classnames. To remove all classes, dont pass in a parameter, which will
  # remove all set classes.
  #
  # @param [String] name the classes to remove
  # @return [Element] returns the receiver
  def remove_class(name = nil)
    if name
      `self.removeClass(name)`
    else
      `self.removeClass()`
    end
  end

  # Returns `true` if any of the matched elements contain the given `name` in
  # their classes, `false` otherwise. 
  #
  # @param [String] name class name to check for
  # @return [true, false]
  def has_class?(name)
    `return self.hasClass(name) ? Qtrue : Qfalse;`
  end
end

