var postcss = require('postcss');
var plugin = require('./package.json');

/**
 * Regex searching for the function-name and its parameters
 */
var functionRegex = /<%([^<]+)%>/g;

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
/**
 * Parses one CSS-declaration from the given AST and checks for
 * possible replacements
 *
 * @param {Declaration} decl - one CSS-Declaration from the AST
 */
function walkDeclaration(decl) {
    decl.value = decl.value.replace(functionRegex, function (match, value) {
		value = replaceAll(replaceAll(value,'process.env.','env.') ,'env.','process.env.');
		return eval(value);
    });
}

module.exports = postcss.plugin('postcss-env-replace', function (opts) {
    return function (css) {
        opts = opts || {};

        css.walkRules(function walkRule(rule) {
            rule.walkDecls(function (decl) {
                walkDeclaration(decl);
            });
        });
    };
});
