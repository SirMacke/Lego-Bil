module.exports = {
  configureWebpack: {
		devServer: {
			proxy: {
				'/api/*': {
					target: `http://localhost:${process.env.PORT}`
				}
			}
		}
  }
}