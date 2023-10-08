const path = require('path');

module.exports = {
  plugins: [],
  entry: { 
	 index: './src/index.js'
  },
  mode: 'development',
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  module: {

	  rules: [
	      {
		test: /\.css$/i,        
		include: path.resolve(__dirname, 'src'),        
		use: ['style-loader', 'css-loader', 'postcss-loader'],
	      },
	  ],

  },
}
