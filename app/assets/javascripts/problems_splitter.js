// 19. The speed of sound in air is about 330 meters
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


var problemsSplitter = function (text) {
  //anything, answer-choice followed directly by not-an-answer-choice
  var regex = /(.+)/g

  var x = text.split(regex)

  var result = x.filter(function (ele) {
    return ele.length > 0
  })

  return result
}