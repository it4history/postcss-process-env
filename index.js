var postcss = require('postcss');
var plugin = require('./package.json');

/**
 * Regex searching for the function-name and its parameters
 */
var functionRegex = /<%(.+)%>/gi;

/**
 * Parses one CSS-declaration from the given AST and checks for
 * possible replacements
 *
 * @param {Declaration} decl - one CSS-Declaration from the AST
 */
function walkDeclaration(decl) {
    decl.value = decl.value.replace(functionRegex, function (match, value) {
        return eval(value.replace('process.env.','env.').replace('env.','process.env.'));
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
