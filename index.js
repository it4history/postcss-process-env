var postcss = require('postcss');
var plugin = require('./package.json');
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

var functionRegex = /<%([^<]+)%>/g;

/**
 * Parses one CSS-declaration from the given AST and checks for
 * possible replacements
 *
 * @param {Declaration} decl - one CSS-Declaration from the AST
 */
function walkDeclaration(decl) {
    decl.value = decl.value.replace(functionRegex, function (match, value) {
		var prefix = 'process.env.';
		value = replaceAll(replaceAll(value, prefix,'env.'), 'env.',prefix);
		value = replaceAll(value, prefix+'(\\w+)', '(+'+prefix+'$1)'); //converting to number from string
		return eval(value);
    });
}

module.exports = postcss.plugin('postcss-env-replace', function (opts) {
    return function (css) {
        css.walkRules(function walkRule(rule) {
            rule.walkDecls(function (decl) {
                walkDeclaration(decl);
            });
        });
    };
});
