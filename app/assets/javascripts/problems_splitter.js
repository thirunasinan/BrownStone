var problemsSplitter = function (text) {

  //var regex = /(\(?[ABCDEFG]\).+\n+[^()ABCDEFG\s])/
  //var regex = /(\(?[ABCDEFG]\).+\n\D?\d)/
  var regex = /\n\n/

  var result1 = text.split(regex)

  // var result2 = [];
  // for (var i=0; i<= (result1.length -1 / 2); i++) {
  //   var d = i*2;
  //   var e = d + 1;
  //   var rd = result1[d] || ''
  //   var re = result1[e] || ''
  //   result2[i] = rd + re
  // }


  // var result3 = result2.filter(function (ele) {
  //   return ele.length > 0
  // })

  // for (var i=0; i< result3.length; i++) {
  //   nextI = i + 1
  //   rd = result3[i]
  //   re = result3[nextI]
  //   if (re) {
  //     var tail = rd[rd.length - 1]
  //     var g = rd.slice(0, rd.length -1)
  //     var h = tail + re
  //     result3[i] = g
  //     result3[i+1] = h
  //   }
  // }

  var result5 = result1.filter(function (ele) {
    return ele && ele.length
  }).map(function (ele) {
    return ele.trim()
  })
  return result5;
}