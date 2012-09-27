/**
 * Escape the given `html`.
 *
 * Examples:
 *
 *     utils.escape('<script></script>')
 *     // => '&lt;script&gt;&lt;/script&gt;'
 *
 * @param {String} html string to be escaped
 * @param {Object|Number} obj A fake parameter
 * @return {String} escaped html
 * @api public
 */

exports.escape = function(html){
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};


/**
 * Another test
 *
 * @param {String} html Some HTML to do something with.
 * @return {String} Another string
 */

exports.anotherTest = function(html){
    // do something...
};

/**
* A declaration
*/
var decl = 'hello';