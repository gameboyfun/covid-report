export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  router: {
    base: "/",
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "covid-report",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ["~/assets/bootstrap/style.scss", "~/assets/fontawesome/css/all.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/axios",
    "~/plugins/vueSelect",
    "~/plugins/DateTimePicker",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/moment"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/toast",
  ],
  bootstrapVue: {
    icons: true,
    bootstrapCSS: true,
    bootstrapVueCSS: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    redirectError: {
      404: "/404",
    },
  },
  proxy: {
    "/v3/": {
      target: process.env.API_URL
        ? `${process.env.API_URL}`
        : "https://disease.sh/",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    postcss: null,
  },
  moment: {
    defaultLocale: "th",
    locales: ["th"],
  },
  sweetalert: {
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    allowOutsideClick: false,
    confirmButtonText: "ตกลง",
  },
};
