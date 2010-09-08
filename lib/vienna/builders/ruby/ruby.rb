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

require File.join(File.dirname(__FILE__), 'ruby_parser.rb')
require 'strscan'

puts Vienna::RubyParser

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
  
  attr_accessor :string_parse
  
  # last read token
  attr_accessor :token
  
  # string scanner used for parser
  attr_reader :scanner
  
  attr_reader :requirements
  
  
  def self.parse(file_name)
		new(file_name)
	end
	
  # Rewrite to simply return the "compiled" source as a string. This will make
  # testing incredibly easy.
  def initialize(source, build_path, build_name)
    @source = source
    @build_path = build_path
    @build_name = build_name
    File.open(@source) { |f| @scanner = StringScanner.new(f.read) }
    
    # in debug mode we tell def's what their linenumber is
    @line_number = 1
    # current def's linenumber
    @current_def_linenumber = 0
    # For generate:
    @iseq_stack = []
  end
	
  # def initialize(source, dest, project)
  #   @source = source
  #   @destination = dest
  #   @project = project
  #   @requirements = []
  #   @current_self = ['VN.self']
  #   @current_self_stack_counter = 0
  #   @context_var_stack = []
  #     # Array of arrays
  #   @nametable = []
  #   
  #   File.open(@source) do |f|
  #     @scanner = StringScanner.new(f.read)
  #     end
  #     
  #     # do_parse
  # end
	
	def build!
    # puts "building #@source"
	  do_parse
    # this will return the needed string
	  res = generate_tree @parser_result unless @parser_result.nil?
    FileUtils.mkdir_p(File.dirname(@build_path))
    File.open(@build_path, 'w') do |out|
      out.write res
    end
	end
	
  # This should simpy parse the given string, and return a syntax tree.
  # This method is heavily used for parsing ruby code within other contexts,
  # for example: processing strings containing ruby: "bob is #{@bob.to_a}"
	def self.parse_to_tree str
	  return nil
	end
	
  # parse the inpit file, to a destination file, using the given project
	def self.parse_to_file source, destination, project
	
	end
	
	def js_replacement_function_name(name)
	  @project.js_replacement_function_name(name)
	end
	
  
  # the id for the given string when used at runtime
  def js_id_for_string(str)
    @project.js_id_for_string(str)
  end
  
  # the id for the given symbol when used at runtime
  def js_id_for_symbol(sym)
    @project.js_id_for_symbol(sym)
  end

  def js_id_for_ivar(ivar)
    @project.js_id_for_ivar(ivar)
  end

  def js_id_for_const(const)
    @project.js_id_for_const(const)
  end
  
	
	# Parse the input, and return a string as output
  # def self.parse str
	  
  # end
	
  # def write(str)
   # @output_file.write str
  # end
	
  # Push new context onto the nametable (var lookup)
  # 
	def push_nametable
    @nametable << []
	end
	
  # Pop current context from nametable
  # 
  def pop_nametable
    @nametable.pop()
  end
  
  # Check if variable is named in nametable
  # 
  def nametable_include?(name)
    @nametable.each do |n|
      return true if n.include? name
    end
    false
  end
  
  # Add into current context of nametable
  # 
  def add_to_nametable(name)
    @nametable.last << name
  end
	
	
	def push_current_self
    @current_self_stack_counter += 1
    @current_self << "$VN_#{@current_self_stack_counter}"
	end
	
	def pop_current_self
	  @current_self_stack_counter -= 1
    @current_self.pop
	end
	
	def current_self_start_def
	  @current_self << 'self'
	end
	
	def current_self_end_def
	  @current_self.pop
	end
	
  # The JS var holding the 'self' within the current code context
	def current_self
    # @current_self_in_def ? 'this' : "$_vn_#{@current_self}"
	  @current_self.last
	end
	
  # Context for declared variables.... if an identifier isnt in this list,
  # thenis is assumed to be a method name for the current self
	def push_context_stack
	  @context_var_stack << []
	end
	
	def pop_context_stack
	  @context_var_stack.pop
	end
	
	def add_to_context_stack str
	  @context_var_stack.last << str 
	end
	 
	
	
	
  # returns the next token (token/value array)
	def next_token
    t = get_next_token
    # puts "#{t[0]} : #{t[1]} (#{self.lex_state})"
	  return t
	end
	
  # Returns serialized tokens for strings. these could be dvars, contents or
  # the end of string markers, and these must be returned as appropriate.
  # 
  # TODO:
  # - implement as stack, so strings contained within the embedded ruby code
  # of other strings can be accessed. string_parse_push, string_parse_pop etc
  # 
  # 
  # 
	def get_next_string_token
	  string_type = string_parse[:type]
	  string_beg = string_parse[:beg]
	  
	  allow_new_lines = [:words, :xstring].include? string_type
	  interpolate = !(string_type == :squote)
	  
    # Read end of string/xstring/regexp markers
	  if scanner.scan(/#{Regexp.escape string_beg}/)
	    if string_type == :dquote or string_type == :squote
	      self.string_parse = nil
	      self.lex_state = :EXPR_END
	      return [:tSTRING_END, scanner.matched]
	    elsif string_type == :words
	      self.string_parse = nil
	      self.lex_state = :EXPR_END
	      return [:tSTRING_END, scanner.matched]
	    elsif string_type == :regexp
	      self.string_parse = nil
	      self.lex_state = :EXPR_END
	      return [:tREGEXP_END, scanner.matched]
	    else # assume to be an xstring
	      self.string_parse = nil
	      self.lex_state = :EXPR_END
	      return [:tXSTRING_END, scanner.matched]
	    end
	  end
	  
    # not end of string, so must be contents..
    
    str_buffer = []
    
    case
    when scanner.scan(/#(\$|\@)/)
      if interpolate
        return [:tSTRING_DVAR, scanner.matched]
      else
        str_buffer << scanner.matched
      end
    when scanner.scan(/#\{/)
      if interpolate
        string_parse[:content] = false
        return [:tSTRING_DBEG, scanner.matched]
      else
        str_buffer << scanner.matched
      end
    when scanner.scan(/#/)
      str_buffer << '#'
      
      # catch regecp error..
      if string_type == :regexp && scanner.peek(1) == '/'
        # raise "error catching!"
        return [:tSTRING_CONTENT, str_buffer.join]
      end
    end
    
    # add string content here
    
    # scanner.scan(/(.|\s)/)
    
    # xstrings can have new lines: normal strings cant, so exlcude \n from normal strings
    re = (allow_new_lines) ? /[^#{Regexp.escape(string_beg)}\#\0]+|./ : /[^#{Regexp.escape(string_beg)}\#\0\n]+|./
    
    # puts re
    scanner.scan(re)
    # puts scanner.matched
    # abort @source
  
    
    str_buffer << scanner.matched
    full_buffer = str_buffer.join
    @line_number += full_buffer.count("\n")
    
    return [:tSTRING_CONTENT, full_buffer]
	  
	end
	
	
  # Next token
  # 
	def get_next_token
	  c = ''
	  space_seen = false
	  cmd_state = 0
	  last_state = lex_state
	  
	  return get_next_string_token if string_parse && string_parse[:content] == true
	  
    loop do
      # puts "starting loop with: #{self.lex_state}"
      if scanner.scan(/\ |\t|\r/)
        space_seen = true
        next
      elsif scanner.scan(/\n|#/)
        c = scanner.matched
        scanner.scan(/.*\n/) if c == '#'
        # puts self.lex_state
        scanner.scan(/\n+/)
        
        @line_number += 1
        
        @line_number += scanner.matched.length if scanner.matched
        
        if [:EXPR_BEG, :EXPR_FNAME, :EXPR_DOT, :EXPR_CLASS].include? lex_state then
          # puts 'hell yeah!'
          # @line_number += scanner.matched.length
          next
        else
          # puts 'well, i dnno'
        end
        
        # scanner.scan(/\n+/)
        self.lex_state = :EXPR_BEG
        return ['\n', '\n']
      
      # ']', ')', '}'
      elsif scanner.scan(/\]/)
        self.lex_state = :EXPR_END
        return [']', scanner.matched]
      elsif scanner.scan(/\)/)
        self.lex_state = :EXPR_END
        return [')', scanner.matched]
      elsif scanner.scan(/\}/)
        self.lex_state = :EXPR_END
        if string_parse
          string_parse[:content] = true
        end
        return ['}', scanner.matched]
      
      # '...', '..', '.'
      elsif scanner.scan(/\.\.\./)
        self.lex_state = :EXPR_BEG
        return [:tDOT3, scanner.matched]
      elsif scanner.scan(/\.\./)
        self.lex_state = :EXPR_BEG
        return [:tDOT2, scanner.matched]
      elsif scanner.scan(/\./)
        self.lex_state = :EXPR_DOT unless self.lex_state == :EXPR_FNAME
        return ['.', scanner.matched]
      
      # ','
      elsif scanner.scan(/\,/)
        self.lex_state = :EXPR_BEG
        return [',', scanner.matched]
      
      # '('
      elsif scanner.scan(/\(/)
        result = '('
        if lex_state == :EXPR_BEG || lex_state == :EXPR_MID
          result = :tLPAREN
        elsif space_seen
          if lex_state == :EXPR_CMDARG
            result = :tLPAREN_ARG
          elsif lex_state == :EXPR_ARG
            # throw warning to not put space before arguments
            result = :tLPAREN2
          end
        end
        self.lex_state = :EXPR_BEG
        return [result, scanner.matched]
      
      # '===', '==', '=~', '=>', '='
      elsif scanner.scan(/\=\=\=/)
        return [:tEQQ, scanner.matched]
      elsif scanner.scan(/\=\=/)
        self.lex_state = :EXPR_BEG
        return [:tEQ, scanner.matched]
      elsif scanner.scan(/\=\~/)
        return [:tMATCH, scanner.matched]
      elsif scanner.scan(/\=\>/)
        # puts self.lex_state
        self.lex_state = :EXPR_BEG
        return [:tASSOC, scanner.matched]
      elsif scanner.scan(/\=/)
        self.lex_state = :EXPR_BEG
        return ['=', scanner.matched]
      
      # Class variables
      elsif scanner.scan(/\@\@\w*/)
        self.lex_state = :EXPR_END
        return [:tCVAR, scanner.matched]
      
      # Instance variables
      elsif scanner.scan(/\@\w*/)
        self.lex_state = :EXPR_END
        return [:tIVAR, scanner.matched]
      
      
      
      # Strings, in order: double, single, xstring
      elsif scanner.scan(/\"/)
        self.string_parse = { :type => :dquote, :beg => '"', :content => true } 
        return [:tSTRING_BEG, scanner.matched]
      
      elsif scanner.scan(/\'/)
        self.string_parse = { :type => :squote, :beg => "'", :content => true } 
        return [:tSTRING_BEG, scanner.matched]
        
      elsif scanner.scan(/\`/)
        self.string_parse = { :type => :xstring, :beg => '`', :content => true } 
        return [:tXSTRING_BEG, scanner.matched]
      
      elsif scanner.scan(/\%W/)
        start_word = scanner.scan(/./)
        end_start_word = {'(' => ')', '[' => ']', '{' => '}'}[start_word]
        end_start_word ||= start_word
                
        self.string_parse = { :type => :words, :beg => end_start_word, :content => true}
        return [:tWORDS_BEG, scanner.matched]
      
      
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
          
          # FIXME: hack for tertiary if statements.....
          unless scanner.check(/\w/)
            return [':', scanner.matched]
          end
          # END HACK
          

  
          
          # puts "#{lex_state} ===== #{scanner.check(/\w/)}"
          self.lex_state = :EXPR_BEG
          return [:tSYMBEG, scanner.matched]
        end
        
        # FIXME: space_seen hack... ? : syaye,emts might not have space...
        # if space_seen && scanner.check(/\W/)
        #   return [':', scanner.matched]
        # else
        
        
        if scanner.scan(/\"/)
          self.string_parse = { :type => :dquote, :beg => '"', :content => true } 
          # return [:tSTRING_BEG, scanner.matched]
        end
        
          self.lex_state = :EXPR_FNAME
          # puts "here for symbeg #{scanner.peek(8)}"
          return [:tSYMBEG, ':']
        # end
      # Parse a number. 
      elsif scanner.check(/[0-9]/)
        self.lex_state = :EXPR_END
        if scanner.scan(/[\d_]+\.[\d_]+\b/)
          return [:tFLOAT, scanner.matched.gsub(/_/, '')]
        elsif scanner.scan(/[\d_]+\b/)
          return [:tINTEGER, scanner.matched.gsub(/_/, '')]
        elsif scanner.scan(/0(x|X)(\d|[a-f]|[A-F])+/)
          return [:tINTEGER, scanner.matched]
        else
          puts "error: unexpected number type: #{scanner.peek(10)}"
        end
      
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
            puts "error - unexpected '[' token"
          end
        # space_seen allows for method calls with an array as first param - otherwise it
        # thinks its calling the method []
        elsif lex_state == :EXPR_BEG || lex_state == :EXPR_MID || space_seen
          self.lex_state = :EXPR_BEG
          return [:tLBRACK, scanner.matched]
        end
        # puts 'HMHMHMHMHMHMHMHMHH'
        # puts lex_state
        self.lex_state = :EXPR_BEG
        return ['[', scanner.matched]
      elsif scanner.scan(/\'(\\.|[^\'])*\'/)
        self.lex_state = :EXPR_END
        return [:tSTRING, scanner.matched[1..-2].gsub(/\\\\/, "\\").gsub(/\\'/, "'")]
      elsif scanner.check(/\|/)
        if scanner.scan(/\|\|\=/)
          self.lex_state = :EXPR_BEG
          return [:tOP_ASGN, '||']
        elsif scanner.scan(/\|\|/)
          self.lex_state = :EXPR_BEG
          return [:tOROP, scanner.matched]
        elsif scanner.scan(/\|\=/)
          self.lex_state = :EXPR_BEG
          return [:tOP_ASSIGN, scanner.matched]
        elsif scanner.scan(/\|/)
          self.lex_state = :EXPR_BEG
          return ['|', scanner.matched]
        end
      elsif scanner.scan(/\{/)
        # puts "{ lex state is #{self.lex_state}"
        result = if (self.lex_state == :EXPR_END) || (self.lex_state == :EXPR_CMDARG)
          '{' # primary block
        elsif (self.lex_state == :EXPR_ENDARG) 
          :tLBRACE_ARG # expr block
        else
          :tLBRACE # hash
        end
        # puts "returning #{result}"
        return [result, scanner.matched]
      # +/- as methods/unary etc
      elsif scanner.scan(/[+-]/)
        result = scanner.matched
        sign = (result == "+") ? :tUPLUS : :tUMINUS
        # if this is a func name def, or a method of an object ( def +(other))
        # puts self.lex_state
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
          return [:tOP_ASGN, "#{result}"]
        end
        
        if lex_state == :EXPR_BEG || lex_state == :EXPR_MID
          self.lex_state = :EXPR_BEG
          return [sign, result]
        end
        self.lex_state = :EXPR_BEG
        return [result, result]
      
      elsif scanner.scan(/\//)
        if lex_state == :EXPR_BEG || lex_state == :EXPR_MID
          self.string_parse = { :type => :regexp,:beg => '/', :content => true }
          return [:tREGEXP_BEG, scanner.matched]
        end
        
        self.lex_state = :EXPR_BEG
        return ['/', scanner.matched]
      
      elsif scanner.scan(/\*\*\=/)
        self.lex_state = :EXPR_BEG
        return [:tOP_ASGN, '**']
      elsif scanner.scan(/\*\*/)
        return [:tPOW, '**']
      elsif scanner.scan(/\*\=/)
        self.lex_state = :EXPR_BEG
        return [:tOP_ASGN, '*']
      elsif scanner.scan(/\*/)
        result =  if lex_state == :EXPR_FNAME
                    self.lex_state = :EXPR_BEG
                    '*'
                  elsif space_seen && scanner.check(/\S/)
                    :tSTAR
                  elsif lex_state == :EXPR_BEG || lex_state == :EXPR_MID
                    :tSTAR
                  else
                    self.lex_state = :EXPR_BEG
                    '*'
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
        # puts 'HERE""""'
        return ['!', '!']
      
      elsif scanner.scan(/\<\=\>/)
        return [:tCMP, '<=>']
      elsif scanner.scan(/\<\=/)
        return [:tLEQ, '<=']
      elsif scanner.scan(/\<\<\=/)
        self.lex_state = :EXPR_BEG
        return [:tOP_ASGN, '<<']
      elsif scanner.scan(/\<\</)
        if (! [:EXPR_END, :EXPR_DOT, :EXPR_ENDARG, :EXPR_CLASS].include?(lex_state) && space_seen)
          self.lex_state = :EXPR_BEG
          return [:tLSHFT, '<<']
        end
        # self.lex_state = :EXPR_BEG
        self.lex_state = :EXPR_BEG
        # puts "HERE on ERROR"
        return [:tLSHFT, '<<']
      elsif scanner.scan(/\</)
        self.lex_state = :EXPR_BEG
        return ['<', '<']
      
      elsif scanner.scan(/\>\=/)
        return [:tGEQ, '>=']
      elsif scanner.scan(/\>\>\=/)
        self.lex_state = :EXPR_BEG
        return [:tOP_ASGN, '>>']
      elsif scanner.scan(/\>\>/)
        return [:tRSHFT, '>>']
      elsif scanner.scan(/\>/)
        self.lex_state = :EXPR_BEG
        return ['>', '>']
      
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
          
        end
        return ['?', '?']
        # if scanner.check(/\s|\v/)
          # unless lex_state == :EXPR_ARG
      
      elsif scanner.scan(/\&\&\=/)
        self.lex_state = :EXPR_BEG
        return [:tOP_ASGN, '&&']
      elsif scanner.scan(/\&\&/)
        self.lex_state = :EXPR_BEG
        return [:tANDOP, '&&']
      elsif scanner.scan(/\&\=/)
        self.lex_state = :EXPR_BEG
        return [:tOP_ASGN, '&']
      elsif scanner.scan(/\&/)
        # puts self.lex_state
        result = if space_seen && !scanner.check(/\s/)
                    if self.lex_state == :EXPR_CMDARG
                      :tAMPER
                    else
                      '&'
                    end
                    # puts "first for amper #{scanner.peek(20)}"
                    # warning: & as prefix
                    # :tAMPER
                    # '&'
                  elsif lex_state == :EXPR_BEG || lex_state == :EXPR_MID
                    # puts "got amper here..#{scanner.peek(10)}"
                    # used to be tAMPER
                    :tAMPER
                  else
                    # puts "last amper: #{scanner.peek(20)}"
                    '&'
                  end
        
        return [result, '&']
      
      elsif scanner.scan(/\^\=/)
        self.lex_state = :EXPR_BEG
        return [:tOP_ASGN, '^']
      elsif scanner.scan(/\^/)
        return ['^', '^']
      elsif scanner.scan(/\;/)
        self.lex_state = :EXPR_BEG
        return [';', ';']
      elsif scanner.scan(/\~/)
        self.lex_state = :EXPR_BEG
        return ['~', '~']
      
      elsif scanner.scan(/\\/)
        if scanner.scan(/\n/)
          space_seen = true
          next
        end
        # error: backslash only allowed before newline
      
      elsif scanner.scan(/\%/)
        if scanner.scan(/\=/)
          self.lex_state = :EXPR_BEG
          return [:tOP_ASGN, '%']
        else
          return ['%', '%']
        end
        if scanner.scan(/(\$_)(\w+)/)
        end
      
      elsif scanner.scan(/\$\:/)
        # puts "found dollar sign"
        return [:tGVAR, scanner.matched]
      
      elsif scanner.scan(/\w+[\?\!]?/)
        case scanner.matched
        when 'def'
          # puts "#{@source} def on line #{@line_number}"
          @current_def_linenumber = @line_number
          self.lex_state = :EXPR_FNAME
          return [:kDEF, scanner.matched]
        when 'end'
          self.lex_state = :EXPR_END
          return [:kEND, scanner.matched]
        when 'class'
          return [:tIDENTIFIER, scanner.matched] if self.lex_state == :EXPR_DOT
          self.lex_state = :EXPR_CLASS
          return [:kCLASS, scanner.matched]
        when 'module'
          self.lex_state = :EXPR_BEG
          return [:kMODULE, scanner.matched]
        when 'do'
          # puts "do lex state is #{self.lex_state}"
          if lex_state == :EXPR_ENDARG
            self.lex_state = :EXPR_BEG
            return [:kDO_BLOCK, scanner.matched] 
          end
          # this might be wrong
          # if lex_state == :EXPR_CMDARG
            # return [:kDO_BLOCK, scanner.matched]
          # end
          self.lex_state = :EXPR_BEG
          return [:kDO, scanner.matched]
        when 'if'
          return [:kIF, scanner.matched] if lex_state == :EXPR_BEG
          self.lex_state = :EXPR_BEG
          return [:kIF_MOD, scanner.matched]
        when 'while'
          return [:kWHILE, scanner.matched] if lex_state == :EXPR_BEG
          self.lex_state = :EXPR_BEG
          return [:kWHILE_MOD, scanner.matched]
        when 'until'
          return [:kUNTIL, scanner.matched] if lex_state == :EXPR_BEG
          self.lex_state = :EXPR_BEG
          return [:kUNTIL_MOD, scanner.matched]
        when 'lambda'
          self.lex_state = :EXPR_BEG
          return [:tLAMBDA, scanner.matched]
        when 'then'
          # self.lex_state = 
          return [:kTHEN, scanner.matched]
        when 'else'
          return [:kELSE, scanner.matched]
        when 'elsif'
          return [:kELSIF, scanner.matched]
        when 'unless'
          return [:kUNLESS, scanner.matched] if lex_state == :EXPR_BEG
          self.lex_state = :EXPR_BEG
          return [:kUNLESS_MOD, scanner.matched]
        when 'self'
          self.lex_state = :EXPR_END unless self.lex_state == :EXPR_FNAME
          return [:kSELF, scanner.matched]
        when 'super'
          self.lex_state = :EXPR_ARG
          return [:kSUPER, scanner.matched]
        when 'true'
          self.lex_state = :EXPR_END
          return [:kTRUE, scanner.matched]
        when 'block_given?'
          self.lex_state = :EXPR_END
          return [:kBLOCK_GIVEN, scanner.matched]
        when 'false'
          self.lex_state = :EXPR_END
          return [:kFALSE, scanner.matched]
        when 'nil'
          self.lex_state = :EXPR_END
          return [:kNIL, scanner.matched]
        when 'or'
          self.lex_state = :EXPR_BEG
          return [:kOR, scanner.matched]
        when 'and'
          self.lex_state = :EXPR_BEG
          return [:kAND, scanner.matched]
        when 'return'
          self.lex_state = :EXPR_MID
          return [:kRETURN, scanner.matched]
        when 'break'
          self.lex_state = :EXPR_MID
          return [:kBREAK, scanner.matched]
        when 'next'
          return [:tIDENTIFIER, scanner.matched] if self.lex_state == :EXPR_DOT
          self.lex_state = :EXPR_MID
          return [:kNEXT, scanner.matched]
        when 'redo'
          self.lex_state = :EXPR_MID
          return [:kREDO, scanner.matched]
        when 'case'
          self.lex_state = :EXPR_BEG
          return [:kCASE, scanner.matched]
        when 'when'
          self.lex_state = :EXPR_BEG
          return [:kWHEN, scanner.matched]
        when 'not'
          self.lex_state = :EXPR_BEG
          return [:kNOT, scanner.matched]
        when 'yield'
          self.lex_state = :EXPR_ARG
          return [:kYIELD, scanner.matched]
        when '__FILE__'
          self.lex_state = :EXPR_END
          return [:k__FILE__, scanner.matched]
        when '__LINE__'
          self.lex_state = :EXPR_END
          return [:k__LINE__, scanner.matched]
        when 'alias'
          self.lex_state = :EXPR_BEG
          return [:kALIAS, scanner.matched]
        when 'begin'
          self.lex_state = :EXPR_BEG
          return [:kBEGIN, scanner.matched]
        when 'rescue'
          self.lex_state = :EXPR_MID
          return [:kRESCUE, scanner.matched]
        when 'ensure'
          self.lex_state = :EXPR_BEG
          return [:kENSURE, scanner.matched]
        end
        
        matched = scanner.matched
        
        # labels
        # avoid us picking up a mod/class divide name
        if scanner.peek(2) != '::' and scanner.scan(/\:/)
          # puts "LABEL!!!!! #{matched + scanner.matched}"
          # puts self.lex_state
          return [:tLABEL, matched + scanner.matched]
        end
        
        
        if self.lex_state == :EXPR_FNAME then
          # puts "it is fname #{scanner.peek(8)}"
          if scanner.scan(/=(?:(?![~>=])|(?==>))/) then
            self.lex_state = :EXPR_END
            return [:tIDENTIFIER, matched + scanner.matched]
          end
        end
        
        
        if [:EXPR_BEG, :EXPR_DOT, :EXPR_MID, :EXPR_ARG, :EXPR_CMDARG].include?(self.lex_state)
          self.lex_state = :EXPR_CMDARG
        else
          self.lex_state = :EXPR_END
        end
        
        # self.lex_state = :EXPR_END
        return [matched =~ /^[A-Z]/ ? :tCONSTANT : :tIDENTIFIER, matched]
      
      else

        return [false, false]
        # puts 'here'
        # return [:kDEF, 'def']
      end # end of if/elsif/elsif... clauses
    end # end of loop
    
    
	end

	def on_error(error_token_id, error_value, value_stack)
		token_name = token_to_str(error_token_id)
    # token_name.downcase!
		token = error_value.to_s.inspect

		str = "#{@source}:#{@line_number}: - parse error on "
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