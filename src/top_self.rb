def to_s
  "main"
end

def include(mod)
  `console.log("starting the include:")`
  Object.include mod
 # `(function() { throw "adding top level include..." })()`
  #
end

