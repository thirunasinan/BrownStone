describe('problemsParser', function () {

  var subject = App.modules.problemsParser

  it('works in trivial case', function () {
    result = subject("")
    expect(result).toEqual([])
  })

  it('works in non-trivial case', function () {
    var text = "24. problem1 \nok (A) ac1 \n(B) ac2\n\n25. problem2 (A) ac3 (B) ac4\n\n26. problem3\n(A) ac1"

    var expected = [
      {number: "24", question: "problem1 \nok", answerChoices: ["ac1", "ac2"]},
      {number: "25", question: "problem2", answerChoices: ["ac3", "ac4"]},
      {number: "26", question: "problem3", answerChoices: ["ac1"]}
    ]
    var result = subject(text)
    expect(result).toEqual(expected)
  })
})
