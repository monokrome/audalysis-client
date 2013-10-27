do ->
  factory = (exports) ->
    exports.Audalysis = require './audalysis.coffee'
    return exports

  if typeof define is 'function' and define.amd?
    define 'audalysis', ['exports'], factory

  # TODO: Figure out how to get around browserify's exports for CommonJS.
  # else if typeof exports is 'object'
  #   factory exports

  else
    factory @
