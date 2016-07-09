App.modules.parseMarkdown = function (string) {

  var _pmHelper = function (start, end, length) {
    return function (match) {
      return start + match.slice(length, match.length - length) + end
    }
  }


  if (!string) {
    return ""
  } else {
    // bold, italic, underline
    var bRegex = /\*\*(?![^\][^(]*[\\][\)\]])[\s\S]*?\*\*/g
    var iRegex = /\*(?![^\][^(]*[\\][\)\]])[\s\S]*?\*/g
    var uRegex = /\_(?![^\][^(]*[\\][\)\]])[\s\S]*?_/g

    var parsedBold = string.replace(bRegex, _pmHelper('<strong>', '</strong>', 2))
    var parsedItalics = parsedBold.replace(iRegex, _pmHelper('<i>', '</i>', 1))
    var parsedUnderline = parsedItalics.replace(uRegex, _pmHelper('<u>', '</u>', 1))
    return parsedUnderline;
  }
}
