// this has to exist in here so its accessible to rails_admin

var _latexInitHelper = function () {
  //http://stackoverflow.com/questions/5200545/how-to-recall-or-restart-mathjax
  if (MathJax) {
    //https://groups.google.com/forum/#!topic/mathjax-users/GrjQ-U2SX-s
    MathJax.Hub.Config({
      tex2jax: {
        ignoreClass: "mathjax-ignore"
      },
      //http://docs.mathjax.org/en/latest/tex.html
      TeX: {
        extensions: ["mhchem.js"]
      }
    });
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  }
}

var _latexInit = function () {
   _latexInitHelper()
   setTimeout(function (){
    _latexInitHelper()
   }, 10000)
}


var _markdownParse = function () {
  $('.markdown-text').each(function (i, ele) {
    var text = $(ele).text()
    var p = App.modules.parseMarkdown(text)
    $(ele).html(p)
  })
  // $('latex-text').each(function (i, ele) {
  //   var text = $(ele).text()
  //   var p = text.replace(/\(/, "\\(").replace(/\)/, "\\)")
  //   $(ele).text(p)
  // })
}

var _parseThings = function () {
  _markdownParse()
  _latexInit()
}

$(document).ready(_parseThings)
$(document).on('page:load', _parseThings)
$(document).ready(function () {
  $('a').click(_parseThings)
})