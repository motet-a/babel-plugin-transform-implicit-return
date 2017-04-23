
# babel-plugin-transform-implicit-return

Functions that returns implicitly, like Ruby methods:

```js
function someFunction() {
  'implicitReturn';

  123;
}
```

...is transformed to:

```js
function someFunction() {
  return 123;
}
```

Arrow functions with a `{}` block are transformed too.

Functions without the `implicitReturn` directive are not transformed.

# Why?

It’s useful to create powerful REPLs.
