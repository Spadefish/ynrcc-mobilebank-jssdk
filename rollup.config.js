import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import istanbul from 'rollup-plugin-istanbul';
// import uglify from 'rollup-plugin-uglify';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);
/* eslint-disable no-console */
// console.log('process.env.NODE_ENV === production', process.env.BUILD)
let plugins = [
  babel(babelrc()),
  // (process.env.BUILD === 'production' && uglify()),
   // uglify()
];

if (process.env.BUILD !== 'production') {
  plugins.push(istanbul({
    exclude: ['test/**/*', 'node_modules/**/*']
  }));
}

export default {
  entry: 'lib/index.js',
  plugins: plugins,
  external: external,
  globals: {
    'es6-promise': 'ES6Promise'
  },
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'ynrcc',
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true
    }
  ]
};
