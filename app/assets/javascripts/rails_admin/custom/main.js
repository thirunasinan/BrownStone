var processLatex = function (text) {
  var trimmed = text.trim()
  var code = trimmed.slice(0,5)
  var isLatex = (code === 'latex')
  if (isLatex) {
    actualText = trimmed.slice(6, text.length)
  } else {
    actualText = trimmed
  }
  return {isLatex: isLatex, actualText: actualText}
}

var _latexInit = function () {
  $('.latex').each(function(i) {
    var text = $(this).text()
    var latexness = processLatex(text)

    if (latexness.isLatex) {
      katex.render(latexness.actualText, this, {displayMode: true})
    }
  })
}


$(document).ready(_latexInit)
$(document).on('page:load', _latexInit)


