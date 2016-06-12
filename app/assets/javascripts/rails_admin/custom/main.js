var _latexInit = function () {
  $('.latex').each(function(i) {
    var text = $(this).text()
    var code = $.trim(text).slice(0, 5)
    console.log('text', text)
    console.log('code', code)
    var isLatex = (code == 'latex')
    if (isLatex) {
      restText = text.slice(6, text.length)
      katex.render(restText, this, {displayMode: true})
    }
  })
}


$(document).ready(_latexInit)
$(document).on('page:load', _latexInit)


