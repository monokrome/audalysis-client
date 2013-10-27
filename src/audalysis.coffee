module.exports =
  watch: (elements, options) ->
    options ?= {}
    options.document ?= document

    if typeof elements is 'string'
      elements = options.document.querySelectorAll elements

    return elements
