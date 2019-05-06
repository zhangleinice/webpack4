

// module.exports = function(source) {
//     return source.replace('hello', 'HELLO');
// };

// this.callback(
//     err: Error | null,
//     content: string | Buffer,
//     sourceMap?: SourceMap,
//     meta?: any
// );
  

const loaderUtils = require('loader-utils');

module.exports = function(source) {
    const options = loaderUtils.getOptions(this);
    const callback = this.async();

    setTimeout(() => {
        const result = source.replace('dell', options.name);
        callback(null, result);
    }, 1000);
};