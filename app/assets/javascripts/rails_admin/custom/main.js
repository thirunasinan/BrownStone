
var _latexInit = function () {
  $('.latex').each(function(i) {
    var text = $(this).text()
    console.log('text', text)
    katex.render(text, this)
  })
}

$(document).ready(_latexInit)
$(document).on('page:load', _latexInit)


