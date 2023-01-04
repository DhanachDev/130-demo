export default {
  mode: "universal",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '130 ปี องค์กรอัยการ',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'ร่วมแสดงความยินดีและอวยพรเนื่องในโอกาสครบรอบ 130 ปี องค์กรอัยการ' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Prompt&display=swap" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  env: {
    ROOT_PATH: process.env.ROOT_PATH,
    HOME_PATH: process.env.HOME_PATH,
    ASSETS_PATH_IMG: process.env.ASSETS_PATH_IMG,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [  
    // Simple usage
    'nuxt-buefy',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    filenames: {
      img: 'img/[name].[ext]'
    },
    // publicPath: '/',
  },
  router: {
    base: '/library/test'
  }
}
