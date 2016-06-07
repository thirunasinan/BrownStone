$(document).ready(function () {

  $('.latex').each(function(i) {
    var text = $(this).text()
    console.log('text', text)
    katex.render(text, this)
  })
})
