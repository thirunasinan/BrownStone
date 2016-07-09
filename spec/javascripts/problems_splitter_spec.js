// var ex1 =

// "19. The speed of sound in air is about 330 meters
// per second. A girl sees a flash of lightning and
// 10 seconds later hears the thunder from that flash.
// The distance between the girl and the location of
// the lightning is most nearly
// (A) 33 m
// (B) 100 m
// (C) 330 m
// (D) 1,000 m

// 20. A small ball is dropped from rest at a point
// 45.0 meters above the ground. Air resistance
// is negligible. The time it will take the ball to
// hit the ground is most nearly
// (A) 1.50 s
// (B) 2.12 s
// (C) 3.00 s
// (D) 4.50 s
// (E) 9.00 s
// "

describe('problemsParser', function () {

  var subject = App.modules.problemsSplitter;
  it('works in trivial case', function () {
    result = subject("")
    expect(result).toEqual([])
  })

  it('works with 1 problem', function () {
    var text = "24. This is a problem (A) answer choice 1 \n second line\n(B) answer choice 2"
    var expected = [text]
    var result = subject(text)
    expect(result).toEqual(expected)
  })

//[ '24. problem1 \n ok ', '', '', '25. problem2 (A) ac3 (B) ac4' ]


  it('works with 2 problems', function () {
    var text = "24. problem1 \nok\n(A) ac1\nac1-line2\n(B) ac2\n\n25. problem2 (A) ac3 (B) ac4"
    var expected = ["24. problem1 \nok\n(A) ac1\nac1-line2\n(B) ac2",
                    "25. problem2 (A) ac3 (B) ac4"]
    var result = subject(text)
    expect(result).toEqual(expected)
  })

  it('works with 3 problems', function () {
    var text = "24. problem1 \nok (A) ac1 \n(B) ac2\n\n25. problem2 (A) ac3 (B) ac4\n\n26. problem3\n(A) ac1"
    var expected = ["24. problem1 \nok (A) ac1 \n(B) ac2",
                    "25. problem2 (A) ac3 (B) ac4",
                    "26. problem3\n(A) ac1"]
    var result = subject(text)
    expect(result).toEqual(expected)
  })
})