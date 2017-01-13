var loaderUtils = require('loader-utils'),
    fs          = require('fs'),
    path        = require('path'),
    yaml        = require('js-yaml')

module.exports = function(content) {
  var query = loaderUtils.parseQuery(this.query).path,
      queryString = JSON.stringify(query),
      varPath = queryString.replace(/["']/g, ''),
      contentPath = path.resolve(varPath),
      obj = yaml.safeLoad(fs.readFileSync(contentPath, 'utf8'))

  this.cacheable()
  this.addDependency(contentPath)

  function yamlToSassVars (obj, indent) {
    // Make object root properties into sass variables
    var sass = ''
    for (var key in obj) sass += '$' + key + ':' + JSON.stringify(obj[key], null, indent) + ';\n'

    if (!sass) return sass

    // Store string values (so they remain unaffected)
    var storedStrings = []
    sass = sass.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, function (str) {
      var id = '___JTS' + storedStrings.length
      storedStrings.push({id: id, value: str})
      return id })

    // Convert js lists and objects into sass lists and maps
    sass = sass.replace(/[{\[]/g, '(').replace(/[}\]]/g, ')');

    // Put string values back (now that we're done converting)
    storedStrings.forEach(function (str) {
      str.value = str.value.replace(/["']/g, '')
      sass = sass.replace(str.id, str.value) })

    return sass }

  var sass = yamlToSassVars(obj)
  return sass ? sass + '\n' + content : content }
