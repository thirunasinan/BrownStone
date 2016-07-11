// this has to exist in here so its accessible to rails_admin

var _latexInit = function () {
  //http://stackoverflow.com/questions/5200545/how-to-recall-or-restart-mathjax
  if (MathJax) {
    //https://groups.google.com/forum/#!topic/mathjax-users/GrjQ-U2SX-s
    MathJax.Hub.Config({
      tex2jax: {
        ignoreClass: "mathjax-ignore"
      }
    });
    console.log('mathjax init')

    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  }
}

var _markdownParse = function () {
  $('.markdown-text').each(function (i, ele) {
    var text = $(ele).text()
    var p = App.modules.parseMarkdown(text)
    $(ele).html(p)
  })
}

var _parseThings = function () {
  _latexInit()
  _markdownParse()
}

$(document).ready(_parseThings)
$(document).on('page:load', _parseThings)