describe('numberAndQuestionParser', function () {

  var subject = numberAndQuestionParser

  it('works in trivial case', function () {
    result = subject("")
    expect(result).toEqual({number: null, question: null})
  })

  it('works in non-trivial case', function () {
    var text = "24. This is a problem"
    var expected = {number: "24", question: "This is a problem"}
    var result = subject(text)
    expect(result).toEqual(expected)
  })
})