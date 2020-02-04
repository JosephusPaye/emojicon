const { terser } = require('rollup-plugin-terser');

module.exports = [
  {
    input: ['index.js'],
    output: {
      name: 'emojicon',
      format: 'umd',
      file: 'dist/emojicon.js',
    },
    plugins: [terser()],
  },
];
