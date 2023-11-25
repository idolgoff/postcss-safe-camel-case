const pattern = /(?<!:[:-\w]+)[_.-]+\w/g;

const pipe = (...fs) => (arg) => fs.reduce((acc, f) => f(acc), arg);

const toCamelCase = (str) => str.replace(
    pattern,
    (match) => match[0] === '.'
        ? `.${match.slice(-1).toLowerCase()}`
        : `${match.slice(-1).toUpperCase()}`
);

const fixNestedSelectors = (str) => str.replace(/&[a-z]/, match => match.toUpperCase());

const plugin = () => ({
    postcssPlugin: 'postcss-safe-camel-case',
    Rule(rule) {
        rule.selector = pipe(
            fixNestedSelectors,
            toCamelCase,
        )(rule.selector);
    },
})

plugin.postcss = true

module.exports = plugin