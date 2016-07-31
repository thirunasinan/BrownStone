var App = {
  actions: {

  },
  actionHelpers: {

  },
  components: {
    parser: {
      parsedDisplay: {

      },
      input: {

      }
    },
    editor: {

    },
    tagger: {
      problems: {
      }
    }
  },

  modules: {

  }
}

function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

var addToAppFn = function (key) {
  return function (input) {
    if (isFunction(input)) {
      hash = input()
    } else {
      hash = input
    }
    App[key] = Object.assign({}, App[key], hash)
  }
}

var addActions = addToAppFn('actions')
var addActionHelpers = addToAppFn('actionHelpers')

function camelCase (string) {
  var x = string.replace (/(?:^|[-_])(\w)/g, function (_, c) {
    return c ? c.toUpperCase () : '';
  })
  return firstToLowerCase(x)
}
function firstToLowerCase (str) {
  return str.substr(0, 1).toLowerCase() + str.substr(1);
}

function autoresizeTextareaHelper(e) {
  $(e).css({'height':'auto','overflow-y':'hidden'}).height(e.scrollHeight);
}

App.modules.autoresizeTextarea  = function () {
  $('textarea.autoresize').each(function () {
    autoresizeTextareaHelper(this);
  }).on('input', function () {
    autoresizeTextareaHelper(this);
  });
}
