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
      { hid: 'description', name: 'description', content: 'ร่วมแสดงความยินดีและเขียนการ์ดอวยพรเนื่องในโอกาสครบรอบ 130 ปี องค์กรอัยการ' },
      { hid: 'keywords', name: "keywords", content: "130 ปี อัยการ, 130 ปี องค์กรอัยการ, องค์กรอัยการ, อัยการ, ครบรอบ 130 ปี, ครบรอบองค์กรอัยการ, เมษายน, กฎหมาย, สำนักงานอัยการสูงสุด, อัยการสูงสุด" },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Prompt&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Charmonman&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Charm&display=swap" }
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
    API: process.env.API,
    STATIC_URL: process.env.STATIC_URL,
    ASSETS_URL: process.env.ASSETS_URL,
    CARD_URL: process.env.CARD_URL
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [  
    // Simple usage
    'nuxt-buefy',
    "@nuxtjs/axios",
  ],

  axios: {
    baseURL: 'http://localhost:4000/api/cards', // Used as fallback if no runtime config is provided
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // filenames: {
    //   img: 'img/[name].[ext]'
    // },
    // publicPath: '/',
  },
  router: {
    base: '/'
  }
}
