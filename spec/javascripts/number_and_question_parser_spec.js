describe('numberAndQuestionParser', function () {

  var subject = App.modules.numberAndQuestionParser

  it('works in trivial case', function () {
    result = subject("")
    expect(result).toEqual({number: null, question: null})
  })

  it('works in non-trivial case', function () {
    var text = "24. This is a \n problem"
    var expected = {number: "24", question: "This is a \n problem"}
    var result = subject(text)
    expect(result).toEqual(expected)
  })

  it('works in case with number and dot occurring in question', function () {
    var text = "1. one  2. three"
    var expected = {number: "1", question: "one 2. three"}
    var result = subject(text)
    expect(result).toEqual(expected)

  })
})