module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/usd-vue3/' : '/',

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    404: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: '404.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },
}
