describe('parseNewlines', function () {

  var subject = App.modules.parseNewlines

  it('works in trivial case', function () {
    result = subject("")
    expect(result).toEqual(null)
  })

  it('works for one line', function () {
    var text = 'one two\n##\nthree four';
    var expected = 'one two\n\nthree four'
    var result = subject(text)
    expect(result).toEqual(expected)
  })

  it('works for two lines', function () ){
    var text = 'one two \n##\n##\nthree four'
    var expected = 'one two \n\n\nthree four'
    var result = subject(text)
    expect(result).toEqual(expected)
  }

})