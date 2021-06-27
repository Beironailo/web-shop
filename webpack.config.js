const path = require('path');

module.exports = {
    entry: '/front/src/js/index.js',
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, '/front/src/js')
    },
    mode: "development"
}