
## 
# GCC preprocess core files with given input, and specified output
#
class Object
  def gcc(input, output)
    system "gcc -E -x c -P -C #{input} -o #{output}"
  end
end
