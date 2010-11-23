# 
# Demo parser file for racc2js
# 

class MathParser

token NUMBER

      prechigh
        nonassoc UMINUS
        left '*' '/'
        left '+' '-'
      preclow

      rule
        target: exp { result = "result = val[0];" }

        exp: exp '+' exp
              {
                result = "a, b, c"
              }
           | exp '*' exp
           | '(' exp ')'
           | NUMBER

end

---- inner
