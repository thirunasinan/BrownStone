describe('parseMarkdown', function () {

  var subject = App.modules.parseMarkdown

  it('works in trivial case', function () {
    result = subject("")
    expect(result).toEqual("")
  })

  it('works', function () {
    var text = 'word *italic* word **bold** word _underline_ word'
    var expected = 'word <i>italic</i> word <strong>bold</strong> word <u>underline</u> word'
    var result = subject(text)
    expect(result).toEqual(expected)
  })
})
