# 
# ruby.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2009 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

require 'racc/parser.rb'
require 'strscan'

class Vienna::RubyParser < Racc::Parser
  
  # Used for lex_state enum, possible values:
  #   :EXPR_BEG
  #   :EXPR_END
  #   :EXPR_ENDARG
  #   :EXPR_ARG
  #   :EXPR_CMDARG
  #   :EXPR_MID
  #   :EXPR_FNAME
  #   :EXPR_DOT
  #   :EXPR_CLASS
  #   :EXPR_VALUE 
  attr_accessor :lex_state
  
  # last read token
  attr_accessor :token
  
  # string scanner used for parser
  attr_reader :scanner
  
  
  def self.parse(file_name)
		new(file_name)
	end
	
	def initialize file_name
	  File.open(file_name) do |f|
	    @scanner = StringScanner.new(f.read)
    end
    
    do_parse
	end
	
	KEYWORDS = {
	  'class' => :kCLASS,
	  'module' => :kMODULE,
	  'def' => :kDEF,
	  'undef' => :kUNDEF,
	  'begin' => :kBEGIN,
	  'rescue' => :kRESCUE,
	  'ensure' => :kENSURE,
	  'end' => :kEND,
	  'if' => :kIF,
	  'unless' => :kUNLESS,
	  'then' => :kTHEN,
	  'elsif' => :kELSIF,
	  'else' => :kELSE,
	  'case' => :kCASE,
	  'when' => :kWHEN,
	  'while' => :kWHILE,
	  'until' => :kUNTIL,
	  'for' => :kFOR,
	  'break' => :kBREAK,
	  'next' => :kNEXT,
	  'redo' => :kREDO,
	  'retry' => :kRETRY,
	  'in' => :kIN,
	  'do' => :kDO,
	  'return' => :kRETURN,
	  'yield' => :kYIELD,
	  'super' => :kSUPER,
	  'self' => :kSELF,
	  'nil' => :kNIL,
	  'true' => :kTRUE,
	  'false' => :kFALSE,
	  'and' => :kAND,
	  'or' => :kOR,
	  'not' => :kNOT,
	  'alias' => :kALIAS,
	  'defined?' => :kDEFINED,
	  'BEGIN' => :klBEGIN,
	  'END' => :klEND,
	  '__LINE__' => :k__LINE__,
	  '__FILE__' => :k__FILE__,
	  '__ENCODING__' => :k__ENCODING__
	}

  # returns the next token (token/value array)
	def next_token
	  t = get_next_token
	  puts "#{t[0]} : #{t[1]}"
	  return t
	end
	
	def get_next_token
	  c = ''
	  space_seen = false
	  cmd_state = 0
	  last_state = lex_state
	  
    loop do
      if scanner.scan(/\ |\t|\r/)
        space_seen = true
        next
      elsif scanner.check(/[^a-zA-Z]/)
        if scanner.scan(/\n|#/)
          c = scanner.matched
          
          if c == '#'
            scanner.scan(/.*\n/)
          end
          return ['\n', '\n']
        elsif scanner.scan(/[\]\)\}]/)
          symb = {
            ')' => :tRPAREN,
            ']' => :tRBRACK,
            '}' => :tRCURLY
          }[scanner.matched]
          return [symb, scanner.matched]
        elsif scanner.check(/\./)
          if scanner.scan(/\.\.\./)
            self.lex_state = :EXPR_BEG
            return [:tDOT3, scanner.matched]
          elsif scanner.scan(/\.\./)
            self.lex_state = :EXPR_BEG
            return [:tDOT2, scanner.matched]
          elsif scanner.scan(/\./)
            self.lex_state = :EXPR_DOT
            return [:tDOT, scanner.matched]
          end
        elsif scanner.scan(/\,/)
          self.lex_state = :EXPR_BEG
          return [:tCOMMA, scanner.matched]
        elsif scanner.scan(/\(/)
          result = :tLPAREN2
          if lex_state == :EXPR_BEG || lex_state == :EXPR_MID
            result = :tLPAREN
          elsif space_seen
            if lex_state = :EXPR_CMDARG
              result = :tLPAREN_ARG
            elsif lex_state = :EXPR_ARG
              # throw warning to not put space before arguments
              result = :tLPAREN2
            end
          end
          return [result, scanner.matched]
        elsif scanner.check(/\=/)
          if scanner.scan(/\=\=\=/)
            return [:tEQQ, scanner.matched]
          elsif scanner.scan(/\=\=/)
            return [:tEQ, scanner.matched]
          elsif scanner.scan(/\=~/)
            return [:tMATCH, scanner.matched]
          elsif scanner.scan(/\=>/)
            reutrn [:tASSOC, scanner.matched]
          elsif scanner.scan(/\=/)
            return [:tEQL, scanner.matched]
          end
        elsif scanner.scan(/\"(([^\{\#\@\$\"\\])|[^\"\\\#])*\"/o)
          self.lex_state = :EXPR_END
          return [:tSTRING, scanner.matched]
        elsif scanner.scan(/\=/)
          return [:tSTRING_BEG, scanner.matched]
        elsif scanner.scan(/\:\:/)
          if lex_state == :EXPR_BEG || lex_state == :EXPR_MID || lex_state == :EXPR_CLASS
            self.lex_state = :EXPR_BEG
            return [:tCOLON3, scanner.matched]
          end
          self.lex_state = :EXPR_DOT
          return [:tCOLON2, scanner.matched]
        elsif scanner.scan(/\:/)
          if lex_state == :EXPR_END || lex_state == :EXPR_ENDARG || scanner.check(/\s/)
            self.lex_state = :EXPR_BEG
            return [:tCOLON, scanner.matched]
          end
        elsif scanner.check(/[0-9]/)
          scanner.scan(/[0-9]/)
          return [scanner.matched, scanner.matched] # need to parse number
        elsif scanner.scan(/\[/)
          result = scanner.matched
          
          if lex_state == :EXPR_FNAME || lex_state == :EXPR_DOT
            self.lex_state = :EXPR_ARG
            case 
            when scanner.scan(/\]\=/)
              return [:tASET, '[]=']
            when scanner.scan(/\]/)
              return [:tAREF, '[]']
            else
              rb_compile_error "unexpected '[' token"
            end
          end
        elsif scanner.scan(/\'(\\.|[^\'])*\'/)
          self.lex_state = :EXPR_END
          return [:tSTRING, scanner.matched[1..-2].gsub(/\\\\/, "\\").gsub(/\\'/, "'")]
        elsif scanner.check(/\|/)
          if scanner.scan(/\|\|\=/)
            self.lex_state = :EXPR_BEG
            return [:tOP_ASSIGN, scanner.matched]
          elsif scanner.scan(/\|\|/)
            self.lex_state = :EXPR_BEG
            return [:tOROP, scanner.matched]
          elsif scanner.scan(/\|\=/)
            self.lex_state = :EXPR_BEG
            return [:tOP_ASSIGN, scanner.matched]
          elsif scanner.scan(/\|/)
            self.lex_state = :EXPR_BEG
            return [:tPIPE, scanner.matched]
          end
        elsif scanner.scan(/\{/)
          result = if self.lex_state == :EXPR_END
            :tLCURLY # primary block
          elsif self.lex_state == :EXPR_ENDARG
            :tLBRACE_ARG # expr block
          else
            :tLBRACE # hash
          end
          return [result, scanner.matched]
        # +/- as methods/unary etc
        elsif scanner.scan(/[+-]/)
          result = scanner.matched
          sign = (result == "+") ? :tUPLUS : :tUMINUS
          
          # if this is a func name def, or a method of an object ( def +(other))
          if self.lex_state == :EXPR_FNAME || self.lex_state == :EXPR_DOT
            self.lex_state = :EXPR_ARG
            if scanner.scan(/@/)
              return [sign, "#{result}@"]
            else
              return [sign, result]
            end
          end
          # += or -=
          if scanner.scan(/\=/)
            self.lex_state = :EXPR_BEG
            return [:tOP_ASGN, "#{result}#{scanner.matched}"]
          end
          
          if lex_state == :EXPR_BEG || lex_state == :EXPR_MID
            self.lex_state = :EXPR_BEG
            return [sign, result]
          end
          
          return [sign, result]
        elsif scanner.scan(/\*\*\=/)
          self.lex_state = :EXPR_BEG
          return [:tOP_ASGN, '**=']
        elsif scanner.scan(/\*\*/)
          return [:tPOW, '**']
        elsif scanner.scan(/\*\=/)
          self.lex_state = :EXPR_BEG
          return [:tOP_ASGN, '*=']
        elsif scanner.scan(/\*/)
          result =  if space_seen && scanner.check(/\S/)
                      # warning: * interp as arg prefix
                      :tSTAR
                    elsif lex_state == :EXPR_BEG || lex_state == :EXPR_MID
                      :tSTAR
                    else
                      :tSTAR2
                    end
          return [result, scanner.matched]
        elsif scanner.scan(/\!\=/)
          self.lex_state = :EXPR_BEG
          return [:tNEQ, '!=']
        elsif scanner.scan(/\!\~/)
          self.lex_state = :EXPR_BEG
          return [:tNMATCH, '!~']
        elsif scanner.scan(/\!/)
          self.lex_state = :EXPR_BEG
          return [:tBANG, '!']
        
        elsif scanner.scan(/\<\=\>/)
          return [:tCMP, '<=>']
        elsif scanner.scan(/\<\=/)
          return [:tLEQ, '<=']
        elsif scanner.scan(/\<\<\=/)
          self.lex_state = :EXPR_BEG
          return [:tOP_ASGN, '<<=']
        elsif scanner.scan(/\<\</)
          if (! [:EXPR_END, :EXPR_DOT, :EXPR_ENDARG, :EXPR_CLASS].include?(lex_state) && space_seen)
            return [:tLSHFT, '<<']
          end
        elsif scanner.scan(/\</)
          return [:tLT, '<']
        
        elsif scanner.scan(/\>\=/)
          return [:tGEQ, '>=']
        elsif scanner.scan(/\>\>\=/)
          self.lex_state = :EXPR_BEG
          return [:tOP_ASGN, '>>=']
        elsif scanner.scan(/\>\>/)
          return [:tRSHFT, '>>']
        elsif scanner.scan(/\>/)
          return [:tGT, '>']
        
        elsif scanner.scan(/\`/)
          case self.lex_state
          when :EXPR_FNAME
            self.lex_state = :EXPR_END
            return [:tBACK_REF2, '`']
          when :EXPR_DOT
            self.lex_state = :EXPR_ARG
            return [:tBACK_REF2, '`']
          end
          return [:tXSTRING_BEG, '`']
        
        elsif scanner.scan(/\?/)
          if lex_state == :EXPR_END || lex_state == :EXPR_ENDARG
            self.lex_state = :EXPR_BEG
            return [:tEH, '?']
          end
          
          # if scanner.check(/\s|\v/)
            # unless lex_state == :EXPR_ARG
        
        elsif scanner.scan(/\&\&\=/)
          self.lex_state = :EXPR_BEG
          return [:tOP_ASGN, '&&=']
        elsif scanner.scan(/\&\&/)
          self.lex_state = :EXPR_BEG
          return [:tANDOP, '&&']
        elsif scanner.scan(/\&\=/)
          self.lex_state = :EXPR_BEG
          return [:tOP_ASGN, '&=']
        elsif scanner.scan(/\&/)
          result = if space_seen && !scanner.check(/\s/)
                      # warning: & as prefix
                      :tAMPER
                    elsif lex_state == :EXPR_BEG || lex_state == :EXPR_MID
                      :tAMPER
                    else
                      :tAMPER2
                    end
          
          return [result, '&']
        
        elsif scanner.scan(/\^\=/)
          self.lex_state = :EXPR_BEG
          return [:tOP_ASGN, '^=']
        elsif scanner.scan(/\^/)
          return [:tCARET, '^']
        elsif scanner.scan(/\;/)
          self.lex_state = :EXPR_BEG
          return [:tSEMI, ';']
        elsif scanner.scan(/\~/)
          return [:tTILDE, '~']
        
        elsif scanner.scan(/\\/)
          if scanner.scan(/\n/)
            space_seen = true
            next
          end
          # error: backslash only allowed before newline
        
        elsif scanner.scan(/\%/)
          if scanner.scan(/\=/)
            self.lex_state = :EXPR_BEG
            return [:tOP_ASGN, '%=']
          end
          return [:tPERCENT, '%']
        
        if scanner.scan(/(\$_)(\w+)/)
          
        end
          
        end
      end
      return [false, false]
    end
	end

	def on_error(error_token_id, error_value, value_stack)
		token_name = token_to_str(error_token_id)
		token_name.downcase!
		token = error_value.to_s.inspect

		str = 'parse error on '
		str << token_name << ' ' unless token_name == token
		str << token
    # @tokens.error(str)
    puts str
	end
	
	
	def testObjc
    anObj.set :age => 10
    my_weight = anObject.get(:age)
  end
end