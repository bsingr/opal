class Dir
  
  class << self
    def glob(glob)
      `
      var result = [], eof = false;

      var scanner = new vn_ruby_string_scanner(#{glob});
      while (!eof) {
        // ** does not HAVE to include a dir, so capture **/ to match .* which 
        // will match a dir, or no dir.. allows both to work together.
        if (scanner.scan(/^\*\*\//)) {
          result.push('.*');
        }
        else if (scanner.scan(/^\*\*/)) {
          result.push('.*');
        }
        else if (scanner.scan(/^\//)) {
          result.push('\\/');
        }
        else if (scanner.scan(/^\*/)) {
          result.push('[^\\/]*');
        }
        else if (scanner.scan(/^[a-zA-Z_]+/)) {
          result.push(scanner.matched);
        }
        else if (scanner.scan(/^\./)) {
          result.push('\\.');
        }
        else {
          eof = true;
        }
        // if (result.length > 108)
        // throw result.join("") + scanner.peek(10);
      }

      var reg =  new RegExp('^' + result.join("") + '$');
      var matching = [];
      // console.log(reg);
      for (prop in opal_files) {
        if (reg.exec(prop)) {
          matching.push(prop);
        }
      }
      return matching;
      `
    end
    
    alias_method :[], :glob
  end
end
