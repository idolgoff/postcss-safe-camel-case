# postcss-safe-camel-case

This PostCSS plugin safely converts CSS selector names to camelCase, without affecting pseudo selectors and attributes.
Turns `.block__element--modifier :not(:first-child)` into `.blockElementModifier :not(:first-child)`.

## Warnings

Removing `-` and `_` characters from CSS class names may cause naming conflicts:

```css
.my-class -> .myClass
.my_class -> .myClass
```

## Why?

While both styles are valid and can be used interchangeably, camelCase selectors are more commonly used in JavaScript and other programming languages. This is because camelCase is easier to read and more consistent with the naming conventions used in those languages. 
It is mainly built for [CSS Modules](https://github.com/css-modules/css-modules).
