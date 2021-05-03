module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: '8081'
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/sass/variables.scss"`
      }
    }
  }
}
