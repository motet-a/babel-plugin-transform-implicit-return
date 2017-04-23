
const plugin = require('.')
const assert = require('chai').assert
const babel = require('babel-core')

const transform = source =>
    babel.transform(
        source,

        {
            plugins: [ plugin ],
        }
    ).code

describe('plugin', () => {
    it('works with function expressions', () => {
        assert(
            transform(
`(function () {
  'implicitReturn';
});`
            ) ===
`(function () {});`
        )

        assert(
            transform(
`(function () {
  'implicitReturn';
  123;
});`
            ) ===
`(function () {
  return 123;
});`
        )

        assert(
            transform(
`(function () {
  123;
});`
            ) ===
`(function () {
  123;
});`
        )

        assert(
            transform(
`(function () {
  'implicitReturn';
  return 123;
});`
            ) ===
`(function () {
  return 123;
});`
        )

        assert(
            transform(
`(function () {
  'implicitReturn';
  if (a()) {
    b();
  };
});`
            ) ===
`(function () {
  if (a()) {
    b();
  };
});`
        )
    })

    it('works with named function expressions', () => {
        assert(
            transform(
`(function a() {
  'implicitReturn';
});`
            ) ===
`(function a() {});`
        )

        assert(
            transform(
`(function a() {
  'implicitReturn';
  123;
});`
            ) ===
`(function a() {
  return 123;
});`
        )
    })

    it('works with named functions', () => {
        assert(
            transform(
`function a() {
  'implicitReturn';
}`
            ) ===
`function a() {}`
        )

        assert(
            transform(
`function a() {
  'implicitReturn';
  123;
}`
            ) ===
`function a() {
  return 123;
}`
        )
    })

    it('works with arrow functions', () => {
        assert(
            transform(`a => 'implicitReturn';`) ===
                `a => 'implicitReturn';`
        )

        assert(
            transform(
`a => {
  'implicitReturn';
  123;
};`)
  ===
`a => {
  return 123;
};`
        )
    })

})
