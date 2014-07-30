# position: sticky

A polyfill for `position: sticky`, matching exactly how Chrome have it currently
implemented (as of 36.0.1985.125).

This isn't ready for production yet or in a "pluggable state" but the demo is
working in Chrome to almost the same degree as the CSS implementation.

## Installation

### Using Bower

The easiest way to install position: sticky is to use [Bower](http://bower.io/),
by simply running the following command.

```
$ bower install --save position-sticky-polyfill
```

Then simply include `dist/position-sticky.js` into your page and you're golden.
Obviously there are other ways, but that's the only file you'll need to get going.

### The ol' fashioned way

If you're not using Bower you can simply use the download or clone references
just to your right and extract the same file mentioned above.

## Usage

After you've included the polyfill the function `PositionSticky` will become
globally available to you.

This excepts to take an array of raw DOM elements. Here are some examples
of how you set things in motion.

```
// quickly setup one element
PositionSticky([document.getElementById('element')]);

// setup multiple elements
PositionSticky([
  document.getElementById('element-1'),
  document.getElementById('element-2'),
  document.getElementById('element-3')
]);

```

## Development

If you plan on helping out with the development, here's how to get started.

First make sure you have `node` and `npm` intalled along with the build tool
[Gulp](http://gulpjs.com). Now you can installed the required packages to build!

```
# installs required node packages
npm install

# this will compress dist/position-sticky.js to dist/position-sticky.min.js
gulp
```

## Caveats

- This works a lot better if you have `box-sizing: border-box;` set on everything.
