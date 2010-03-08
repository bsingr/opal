class Hash
  
  # Equality - Two hashes are equal if they both contain the same number of
  # elements, and each key-value pair are equal according to {Object#==}. The
  # result is either true or false.
  # 
  #     a = { "a" => 10, "b" => 20 }
  #     b = { "c" => 20, "d" => 30 }
  #     c = { "a" => 20, "b" => 30 }
  #     d = { "a" => 10, "b" => 20 }
  #     a == b  # false
  #     a == c  # false
  #     a == d  # true
  #     b == c  # false
  # 
  # @param [Hash] other_hash
  # @return [Boolean]
  # 
  def ==(other_hash)
    
  end
  
  # Element reference - Using the key, returns the value object. If the key is
  # not contained within the hash, then the default is returned.
  # 
  #     hash = { "a" => 10, "b" => 20 }
  #     hash["a"]   # 10
  #     hash["d"]   # nil
  # 
  # @param [Object] key
  # @return [Object]
  def [](key)
    
  end
end
