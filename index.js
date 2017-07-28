var postcss = require('postcss');
var plugin = require('./package.json');
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
	var prefix = 'process.env.';
    decl.value = decl.value.replace(/<%([^<]+)%>/g, function (match, value) {
		value = replaceAll(replaceAll(value, prefix,'env.'), 'env.',prefix);
		value = replaceAll(value, prefix+'(\\w+)', 'parseFloat('+prefix+'$1)'); //converting to number from string
		return eval(value);
    });
    decl.value = decl.value.replace(/v\(([^(^-]+)\)/g, function (match, value) {
		return eval(prefix + value);
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
