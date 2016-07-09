App.modules.predictDelimiters = function (text) {

  var shouldProcess = (text.indexOf('##') === -1);

  if (shouldProcess) {
    var regex = /\n[\n]+/

    var result1 = text.split(regex)
    var result2 = result1.filter(function (ele) { return ele && ele.length })

    if (result2.length > 1 && !result2.find(function (x) { return x === '#'})) {


      var result3 = result2.slice(1, result2.length).reduce(function (acc, ele) {
        return [acc, ele].join('\n\n##\n\n')
      }, result2[0])
    } else {
      var result3 = text
    }
  } else {
    result3 = text
  }
  return result3;
}

/*

1. asdfasdf
asdfasdf
asdfasdf
A) asdfasd
B) asdfasdf

2. asdfasdf
asdfasdf
A) asdfasd
B) asdfasdf
C) asdfasdf


*/