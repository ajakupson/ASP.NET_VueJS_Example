const path = require('path');
module.exports = {
    entry: {
        main: './ClientSide/app.js',
    },
    output: {
        path: path.join(__dirname, './ClientSide/build'),
        filename: '[name].bundle.js'
    },
    mode: 'development'
}