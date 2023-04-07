<div align="center">
    <img src="docs/.vuepress/public/hero-title.png">
</div>

<div align="center">
    <a href="https://github.com/chartjs/chartjs-plugin-datalabels/releases/latest"><img src="https://img.shields.io/github/release/chartjs/chartjs-plugin-datalabels.svg?style=flat-square&maxAge=600" alt="Downloads"></a>
    <a href="https://travis-ci.org/chartjs/chartjs-plugin-datalabels"><img src="https://img.shields.io/travis/chartjs/chartjs-plugin-datalabels.svg?style=flat-square&maxAge=600" alt="Builds"></a>
    <a href="https://codeclimate.com/github/chartjs/chartjs-plugin-datalabels"><img src="https://img.shields.io/codeclimate/c/chartjs/chartjs-plugin-datalabels.svg?style=flat-square&maxAge=600" alt="Coverage"></a>
    <a href="https://codeclimate.com/github/chartjs/chartjs-plugin-datalabels"><img src="https://img.shields.io/codeclimate/maintainability/chartjs/chartjs-plugin-datalabels.svg?style=flat-square&maxAge=600" alt="Maintainability"></a>
</div>

## Overview

Highly customizable [Chart.js](http://www.chartjs.org/) plugin that displays labels on data for any type of charts.

Requires [Chart.js](https://github.com/chartjs/Chart.js/releases) **2.7.0** or later.

## Documentation

- [Introduction](https://chartjs-plugin-datalabels.netlify.com/guide/)
- [Getting Started](https://chartjs-plugin-datalabels.netlify.com/guide/getting-started.html)
- [Options](https://chartjs-plugin-datalabels.netlify.com/guide/options.html)
- [Positioning](https://chartjs-plugin-datalabels.netlify.com/guide/positioning.html)
- [Formating](https://chartjs-plugin-datalabels.netlify.com/guide/formatting.html)
- [Events](https://chartjs-plugin-datalabels.netlify.com/guide/events.html)
- [Samples](https://chartjs-plugin-datalabels.netlify.com/samples/)

## Development

You first need to install node dependencies (requires [Node.js](https://nodejs.org/)):

    > npm install

The following commands will then be available from the repository root:

    > gulp build            // build dist files
    > gulp build --watch    // build and watch for changes
    > gulp test             // run unit tests
    > gulp test --coverage  // run unit tests and generate code coverage
    > gulp lint             // perform code linting
    > gulp package          // create an archive with dist files and samples
    > gulp docs             // generate documentation (`dist/docs`)
    > gulp docs --watch     // generate documentation and watch for changes

## License

`chartjs-plugin-datalabels` is available under the [MIT license](LICENSE.md).
