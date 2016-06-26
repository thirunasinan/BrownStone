var _latexInit = function () {
  //http://stackoverflow.com/questions/5200545/how-to-recall-or-restart-mathjax
  if (MathJax) {
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  }
}

$(document).ready(_latexInit)
$(document).on('page:load', _latexInit)