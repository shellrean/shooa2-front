const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	pwa: {
		name: 'Shooa-LMS',
		themeColor: '#636f83',
		msTileColor: '#ffffff',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppsStatusBarStyle: 'black',
	},
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/, // this is what you are looking for
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  }
}