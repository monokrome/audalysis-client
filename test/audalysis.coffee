jsdom = require 'jsdom'
sinon = require 'sinon'
chai = require 'chai'
fs = require 'fs'

Audalysis = require '../src/audalysis.coffee'
html = fs.readFileSync('./document.html').toString()

describe 'Audalysis', ->
  describe '#watch', ->
    beforeEach (done) ->
      jsdom.env html, (errors, window) =>
        @watchOptions =
          document: window.document

        done()

    it 'returns expected elements', (done) ->
      elements = Audalysis.watch 'audio', @watchOptions

      chai.expect(elements.length).to.equal 1
      done()
