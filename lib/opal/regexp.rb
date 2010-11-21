# A Regexp holds a regular expression, used to match a pattern against strings.
# Regexps are created using the `/.../` and `%r{...}` literals, and by the
# {Regexp.new} constructor.
# 
# ## Implementation
# 
# Toll free bridged with native regexp object.
# 
class Regexp  
  # Produce a nicely formatted string-version of `self`.
  # 
  # @example
  #   /^abc/.inspect
  #   # => "/^abc/"
  # 
  # @return [String] string
  def inspect
    `return #{self}.toString();`
  end
  
  # Equality - Two regexps are equal if their patterns are identical, they have
  # the same character set code, and their {#casefold?} values are the same.
  # 
  # @example
  #   /abc/ == /abc/x     # => false
  #   /abc/ == /abc/i     # => false
  #   /abc/ == /abc/n     # => false
  #   /abc/u == /abc/n    # => false
  # 
  # @param [Regexp] other_regexp another regexp to comapre
  # @return [Boolean]
  def ==(other_regexp)
    `return #{self}.toString() === #{other_regexp}.toString() ? #{true} : #{false};`
  end
  
  # Case equality - Synonym for {Regexp#=~} used in case statements.
  # 
  # @example
  #   a = "HELLO"
  #   case a
  #   when /^[a-z]*$/; puts "Lower case"
  #   when /^[A-Z]*$/; puts "Upper case"
  #   else             puts "Mixed case"
  #   end
  # 
  #   # => "Upper case"
  # 
  # @param [String] str string to test
  # @return [Boolean]
  def ===(str)
    match(str) ? true : false
  end
  
  alias_method :eql?, :==
  
  # Returns a {MatchData} object describing the match, or `nil` if there was no
  # match. This is equivalent to retrieving the value of the special variable
  # $~ following a normal match. If the second parameter is present, it 
  # specifies the position in the string to begin the search.
  # 
  # @example
  #   /(.)(.)(.)/.match("abc")[2]
  #   # => "b"
  #   /(.)(.)/.match("abc")[2]
  #   # => "c"
  # 
  # @todo Passing a block is not yet supported.
  # 
  # @param [Sring] string to match against
  # @return [MatchData, nil] result or nil
  def match(string)
    `#{m = nil}
    var test;
    if (test = #{self}.exec(#{string})) {
      #{m} = #{MatchData.new(`test`)};
      #{self}.gs('$&', test[0]);
      for (var i = 1; i < test.length; i++) {
        #{self}.gs('$' + i, test[i]);
      }
    } else {
      #{m = nil};
    }
    return #{$~ = m};`
  end
end
