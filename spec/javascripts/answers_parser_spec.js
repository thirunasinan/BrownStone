describe('answersParser', function () {

  var subject = App.modules.answersParser

  it('works in trivial case', function () {
    result = subject("")
    expect(result).toEqual([])
  })

  it('works in non-trivial case', function () {
    var text = "ac1 word\n(B) ac2 word\n(C) ac3 word"
    var expected = ["ac1 word", "ac2 word", "ac3 word"]
    var result = subject(text)
    expect(result).toEqual(expected)
  })
})