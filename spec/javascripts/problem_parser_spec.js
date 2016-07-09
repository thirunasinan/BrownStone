describe('problemParser', function () {

  var subject = App.modules.problemParser

  it('works in trivial case', function () {
    result = subject("")
    expect(result).toEqual({number: null, question: null, answerChoices: []})
  })

  it('works when theres only a number', function () {
    var text = '143';
    var expected = {number: null, question: null, answerChoices: []}
    var result = subject(text)
    expect(result).toEqual(expected)
  })

  it('works when theres only a number and a dot', function () {
    var text = '143.';
    var expected = {number: '143', question: null, answerChoices: []};
    var result = subject(text)
    expect(result).toEqual(expected)
  })

  it('works when theres only a number and a question', function () {
    var text = '143. question1 word';
    var expected = {number: '143', question: 'question1 word', answerChoices: []};
    var result = subject(text)
    expect(result).toEqual(expected)
  })

  it('works in non-trivial case', function () {
    var text = "254. question word\n(A) ac1 word\n(B) ac2 word\n(C) ac3 word"
    var expected = {
      number: "254",
      question: "question word",
      answerChoices: ["ac1 word", "ac2 word", "ac3 word"]
    }
    var result = subject(text)
    expect(result).toEqual(expected)
  })
})